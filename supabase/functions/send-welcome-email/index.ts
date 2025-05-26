
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
      from: "Stravesta <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Stravesta - Your Trading Journey Begins!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0f1c;">
          <div style="background-color: #1a2332; padding: 30px; border-radius: 10px; border: 1px solid #2a3441;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4fd1c7; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Stravesta!</h1>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 15px;">
              Hi <strong style="color: #4fd1c7;">${userName}</strong>,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 15px;">
              Thank you for subscribing to <strong style="color: #4fd1c7;">Stravesta</strong>!<br>
              We're excited to have you join our community of traders.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 15px;">
              Stravesta is your upcoming trading companion with smart journal alerts and powerful analytics designed to elevate your trading game.
            </p>
            
            <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4fd1c7;">
              <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin: 0;">
                <strong style="color: #4fd1c7;">What's coming:</strong><br>
                • Smart trading journal with automated alerts<br>
                • Advanced analytics and performance tracking<br>
                • Real-time market insights<br>
                • Risk management tools
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 15px;">
              You'll be the first to know when we launch and get exclusive early access to our platform.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 20px;">
              If you have any questions, feel free to reply to this email or contact our support team.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 10px;">
              Best regards,<br>
              <strong style="color: #4fd1c7;">The Stravesta Team</strong>
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #2a3441;">
            
            <div style="text-align: center; padding: 20px; background-color: #0f172a; border-radius: 5px;">
              <h3 style="color: #4fd1c7; margin: 0; font-size: 18px;">Stravesta</h3>
              <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px;">Your Trading Companion</p>
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
