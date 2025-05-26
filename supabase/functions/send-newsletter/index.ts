
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  content: string;
  subscribers: string[];
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter function called, method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    console.log("Auth header received:", authHeader ? "Present" : "Missing");
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Extract the JWT token from the Authorization header
    const token = authHeader.replace('Bearer ', '');
    console.log("Token extracted:", token ? "Present" : "Missing");

    // Create Supabase client with the JWT token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log("Supabase client created, checking user auth...");

    // Set the session using the JWT token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      console.error("User authentication error:", userError);
      return new Response(JSON.stringify({ error: "Authentication failed", details: userError.message }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!user) {
      console.error("No user found");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("User authenticated:", user.email);

    // Check if user is admin
    const { data: isAdminResult, error: adminError } = await supabaseClient
      .rpc('is_admin', { user_email: user.email });

    if (adminError) {
      console.error("Admin check failed:", adminError);
      return new Response(JSON.stringify({ error: "Admin verification failed", details: adminError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!isAdminResult) {
      console.error("User is not admin:", user.email);
      return new Response(JSON.stringify({ error: "Insufficient privileges" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Admin verified, processing newsletter request...");

    // Read the request body ONCE and store it
    const bodyText = await req.text();
    console.log("Request body received, length:", bodyText.length);
    console.log("Request body content:", bodyText);

    if (!bodyText || bodyText.trim() === '') {
      console.error("Empty request body");
      return new Response(JSON.stringify({ 
        error: "Empty request body received"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    let requestBody: NewsletterRequest;
    try {
      requestBody = JSON.parse(bodyText);
      console.log("Parsed request body:", requestBody);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(JSON.stringify({ 
        error: "Invalid JSON in request body", 
        details: parseError.message
      }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { subject, content, subscribers }: NewsletterRequest = requestBody;

    if (!subject || !content || !subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required fields: subject, content, and subscribers" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Sending newsletter to ${subscribers.length} subscribers`);

    // Convert markdown-like content to basic HTML
    const htmlContent = content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Send emails to all subscribers
    const emailPromises = subscribers.map(async (email) => {
      try {
        const result = await resend.emails.send({
          from: "Stravesta <noreply@stravesta.com>",
          to: [email],
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; margin-bottom: 20px;">${subject}</h2>
              <div style="line-height: 1.6; color: #555;">
                ${htmlContent}
              </div>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #888; text-align: center;">
                You're receiving this email because you subscribed to Stravesta updates.<br>
                Best regards,<br>
                The Stravesta Team
              </p>
            </div>
          `,
        });
        console.log(`Email sent successfully to ${email}:`, result);
        return { email, success: true, id: result.data?.id };
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        return { email, success: false, error: error.message };
      }
    });

    const results = await Promise.all(emailPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`Newsletter sending completed. Successful: ${successful}, Failed: ${failed}`);

    return new Response(JSON.stringify({ 
      message: `Newsletter sent successfully to ${successful} subscribers${failed > 0 ? `, ${failed} failed` : ''}`,
      results: results,
      successful,
      failed
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Unknown error occurred",
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
