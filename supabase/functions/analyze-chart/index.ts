
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Du bist ein erfahrener technischer Analyst und Trading-Experte. Analysiere das bereitgestellte Chart-Bild und identifiziere Trading-Setups, Patterns und wichtige Level.

Antworte IMMER in folgendem JSON-Format:
{
  "pattern": "Name des erkannten Patterns (z.B. 'Bullish Flag', 'Head and Shoulders', 'Support Breakout')",
  "confidence": Konfidenz-Score von 0-100,
  "trend": "bullish" | "bearish" | "sideways",
  "entry_price": Empfohlener Entry-Preis (optional),
  "stop_loss": Empfohlener Stop-Loss (optional),
  "take_profit": Empfohlenes Take-Profit (optional),
  "risk_reward_ratio": Berechnung Risk/Reward (optional),
  "support_levels": [Array von Support-Levels],
  "resistance_levels": [Array von Resistance-Levels],
  "analysis_text": "Detaillierte Erklärung der Analyse auf Deutsch",
  "timestamp": "ISO timestamp"
}

Achte besonders auf:
- Chart-Patterns (Triangles, Flags, Head & Shoulders, etc.)
- Support- und Resistance-Levels
- Trendrichtung und Stärke
- Volumen-Indikatoren falls sichtbar
- Candlestick-Patterns
- Mögliche Entry/Exit-Punkte`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analysiere dieses Trading-Chart und identifiziere mögliche Setups:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    try {
      // Try to parse JSON response
      const analysis = JSON.parse(analysisText);
      analysis.timestamp = new Date().toISOString();
      
      return new Response(JSON.stringify(analysis), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      
      const fallbackAnalysis = {
        pattern: "Unstrukturierte Analyse",
        confidence: 50,
        trend: "sideways",
        support_levels: [],
        resistance_levels: [],
        analysis_text: analysisText,
        timestamp: new Date().toISOString()
      };
      
      return new Response(JSON.stringify(fallbackAnalysis), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in analyze-chart function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Chart analysis failed', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
