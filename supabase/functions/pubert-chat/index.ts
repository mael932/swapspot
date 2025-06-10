
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    console.log('John received message:', message);
    console.log('OpenAI API Key exists:', !!openAIApiKey);
    console.log('OpenAI API Key length:', openAIApiKey ? openAIApiKey.length : 0);

    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key is not configured. Please check your Supabase secrets.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build the conversation with system prompt
    const messages = [
      {
        role: 'system',
        content: `You are John, the friendly AI assistant for SwapSpot - a student accommodation exchange platform. Your personality is helpful, knowledgeable, and slightly quirky. You help students with:

- How to use the SwapSpot platform
- Creating effective swap listings
- Finding the perfect accommodation matches
- Understanding safety features and verification
- Account management and premium features
- Swap etiquette and cultural considerations
- What to do if plans fall through
- General troubleshooting

Keep responses concise but helpful. If users ask about complex issues, guide them to contact human support. Always maintain a friendly, encouraging tone that makes students feel confident about their accommodation swaps.

Key platform features to mention when relevant:
- Smart matching algorithm
- Verification system for safety
- Premium features for better visibility
- Community wiki and peer support
- Insurance and safety resources
- Multi-step onboarding process`
      },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    console.log('Making request to OpenAI with model: gpt-4o-mini');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error details:', errorText);
      
      if (response.status === 401) {
        return new Response(JSON.stringify({ 
          error: 'OpenAI API key is invalid. Please check your API key in Supabase secrets.' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'OpenAI API rate limit reached. Please try again in a moment.' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    console.log('John response generated successfully, length:', reply.length);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in pubert-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Sorry, I encountered an issue. Please try again or contact support if the problem persists.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
