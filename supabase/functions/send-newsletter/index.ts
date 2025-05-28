
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
  console.log("Headers:", Object.fromEntries(req.headers.entries()));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405, 
      headers: { "Content-Type": "application/json", ...corsHeaders }
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
      console.log("Admin check failed or user not admin:", adminError);
      return new Response(JSON.stringify({ error: "Admin privileges required" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Admin verified");

    // Parse request body
    let requestData;
    try {
      const bodyText = await req.text();
      console.log("Raw body received:", bodyText);
      
      if (!bodyText || bodyText.trim() === '') {
        return new Response(JSON.stringify({ error: "Empty request body" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      requestData = JSON.parse(bodyText);
      console.log("Parsed request data:", requestData);
    } catch (parseError) {
      console.log("JSON parse error:", parseError);
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { subject, content, sendToAll, selectedSubscribers } = requestData;

    // Validate required fields
    if (!subject || !content) {
      console.log("Missing required fields - subject:", !!subject, "content:", !!content);
      return new Response(JSON.stringify({ error: "Subject and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get target emails
    let targetEmails: string[] = [];
    
    if (sendToAll) {
      console.log("Fetching all subscribers");
      const { data: allSubscribers, error: subscribersError } = await supabaseClient
        .from('subscribers')
        .select('email')
        .order('created_at', { ascending: false });
      
      if (subscribersError) {
        console.log("Error fetching subscribers:", subscribersError);
        throw new Error(`Database error: ${subscribersError.message}`);
      }
      
      targetEmails = allSubscribers?.map(s => s.email) || [];
      console.log(`Found ${targetEmails.length} subscribers total`);
    } else if (selectedSubscribers && Array.isArray(selectedSubscribers) && selectedSubscribers.length > 0) {
      targetEmails = selectedSubscribers;
      console.log(`Sending to ${targetEmails.length} selected subscribers`);
    } else {
      console.log("No recipients specified");
      return new Response(JSON.stringify({ error: "No recipients specified. Either enable 'send to all' or select specific subscribers." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (targetEmails.length === 0) {
      console.log("No target emails found");
      return new Response(JSON.stringify({ error: "No email addresses found to send to" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Preparing to send newsletter to ${targetEmails.length} recipients`);
    console.log("Subject:", subject);
    console.log("Content preview:", content.substring(0, 100));

    // Validate Resend API key
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.log("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Resend API key is configured");

    // Convert content to HTML with better formatting
    const htmlContent = content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');

    // Send emails with better error handling
    const emailResults = [];
    let successCount = 0;
    let failCount = 0;

    for (const email of targetEmails) {
      try {
        console.log(`Sending email to: ${email}`);
        
        const result = await resend.emails.send({
          from: "Stravesta <noreply@stravesta.com>",
          to: [email],
          subject: subject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1a1a1a; font-size: 24px; margin: 0; font-weight: 600;">Stravesta</h1>
              </div>
              
              <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">${subject}</h2>
                <div style="line-height: 1.6; color: #334155; font-size: 16px;">
                  ${htmlContent}
                </div>
              </div>
              
              <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0;">
                <p style="font-size: 14px; color: #64748b; margin: 0 0 10px 0;">
                  Sie erhalten diese E-Mail, weil Sie sich für Stravesta-Updates angemeldet haben.
                </p>
                <p style="font-size: 14px; color: #64748b; margin: 0;">
                  Mit freundlichen Grüßen,<br>
                  <strong>Das Stravesta Team</strong>
                </p>
              </div>
            </div>
          `,
          text: `${subject}\n\n${content}\n\n---\nSie erhalten diese E-Mail, weil Sie sich für Stravesta-Updates angemeldet haben.\n\nMit freundlichen Grüßen,\nDas Stravesta Team`
        });
        
        console.log(`Email sent successfully to ${email}, ID: ${result.data?.id}`);
        emailResults.push({ email, success: true, id: result.data?.id });
        successCount++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        emailResults.push({ 
          email, 
          success: false, 
          error: error.message || 'Unknown error'
        });
        failCount++;
      }
    }

    console.log(`Newsletter sending completed. Success: ${successCount}, Failed: ${failCount}`);

    const responseMessage = failCount > 0 
      ? `Newsletter erfolgreich an ${successCount} von ${targetEmails.length} Abonnenten gesendet. ${failCount} fehlgeschlagen.`
      : `Newsletter erfolgreich an alle ${successCount} Abonnenten gesendet!`;

    return new Response(JSON.stringify({ 
      success: true,
      message: responseMessage,
      results: emailResults,
      successful: successCount,
      failed: failCount,
      total: targetEmails.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("=== Newsletter function error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error details:", error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: "Newsletter sending failed",
      details: error.message || "Unknown server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
