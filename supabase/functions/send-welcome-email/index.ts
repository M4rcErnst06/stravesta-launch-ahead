
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  user_name?: string;
}

const handler = async (req: Request): Promise<Response> => {
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
    const { email, user_name }: WelcomeEmailRequest = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userName = user_name || "Valued Subscriber";

    console.log(`Sending welcome email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Stravesta <noreply@stravesta.com>",
      to: [email],
      subject: "Welcome to Stravesta!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; text-align: center;">Welcome to Stravesta!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
              Hi <strong>${userName}</strong>,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
              Thank you for registering with <strong>Stravesta</strong>!<br>
              We're excited to have you on board.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
              You can now receive the latest updates, offers, and news directly from us.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 20px;">
              If you have any questions, feel free to reply to this email or contact our support team.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">
              Best regards,<br>
              The Stravesta Team
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <div style="text-align: center; padding: 20px; background-color: #f8f8f8; border-radius: 5px;">
              <h3 style="color: #333; margin: 0; font-size: 18px;">Stravesta</h3>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      message: "Welcome email sent successfully",
      id: emailResponse.data?.id 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
