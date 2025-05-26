
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== Newsletter function started ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    console.log("Auth header present:", !!authHeader);
    
    if (!authHeader) {
      console.log("No authorization header");
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        }
      }
    );

    // Verify user authentication
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      console.log("User authentication failed:", userError);
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("User authenticated:", user.email);

    // Check if user is admin
    const { data: isAdminResult, error: adminError } = await supabaseClient
      .rpc('is_admin', { user_email: user.email });

    if (adminError || !isAdminResult) {
      console.log("Admin check failed or user not admin");
      return new Response(JSON.stringify({ error: "Insufficient privileges" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Admin verified");

    // Get request body
    const bodyText = await req.text();
    console.log("Raw body length:", bodyText.length);
    
    if (!bodyText || bodyText.trim() === '') {
      console.log("Empty body received");
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Parse JSON
    let requestData;
    try {
      requestData = JSON.parse(bodyText);
      console.log("Parsed data successfully");
    } catch (parseError) {
      console.log("JSON parse error:", parseError);
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { subject, content, sendToAll, selectedSubscribers } = requestData;

    if (!subject || !content) {
      console.log("Missing subject or content");
      return new Response(JSON.stringify({ error: "Subject and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get target emails
    let targetEmails: string[] = [];
    
    if (sendToAll) {
      console.log("Sending to all subscribers");
      const { data: allSubscribers, error: subscribersError } = await supabaseClient
        .from('subscribers')
        .select('email');
      
      if (subscribersError) {
        console.log("Error fetching subscribers:", subscribersError);
        return new Response(JSON.stringify({ error: "Failed to fetch subscribers" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      
      targetEmails = allSubscribers?.map(s => s.email) || [];
    } else if (selectedSubscribers && selectedSubscribers.length > 0) {
      console.log("Sending to selected subscribers:", selectedSubscribers.length);
      targetEmails = selectedSubscribers;
    } else {
      console.log("No target emails specified");
      return new Response(JSON.stringify({ error: "No recipients specified" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Sending newsletter to ${targetEmails.length} recipients`);

    if (targetEmails.length === 0) {
      console.log("No subscribers found");
      return new Response(JSON.stringify({ error: "No subscribers found" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Convert content to HTML
    const htmlContent = content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Send emails without test email - directly to all targets
    const emailPromises = targetEmails.map(async (email) => {
      try {
        console.log(`Sending email to: ${email}`);
        const result = await resend.emails.send({
          from: "Stravesta <noreply@stravesta.com>", // Using your domain again
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
                Sie erhalten diese E-Mail, weil Sie sich für Stravesta-Updates angemeldet haben.<br>
                Mit freundlichen Grüßen,<br>
                Das Stravesta Team
              </p>
            </div>
          `,
        });
        
        if (result.error) {
          console.error(`Resend error for ${email}:`, result.error);
          return { email, success: false, error: result.error.message };
        }
        
        console.log(`Email sent successfully to ${email}:`, result.data?.id);
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

    // Always return success response with details
    return new Response(JSON.stringify({ 
      success: true,
      message: `Newsletter erfolgreich an ${successful} Abonnenten gesendet${failed > 0 ? `, ${failed} fehlgeschlagen` : ''}`,
      results: results,
      successful,
      failed
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("=== Newsletter function error ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: "Server error occurred",
      details: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
