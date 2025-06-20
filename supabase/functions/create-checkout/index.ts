
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    // Get the requested tier from the request body
    const { tier = 'premium' } = await req.json();

    // Define subscription tiers with pricing
    const subscriptionTiers = {
      basic: {
        name: "SwapSpot Basic Connect",
        description: "Connect with up to 5 students per month",
        amount: 1500, // €15.00
      },
      premium: {
        name: "SwapSpot Premium Connect", 
        description: "Unlimited connections with premium features",
        amount: 2500, // €25.00
      },
      elite: {
        name: "SwapSpot Elite Experience",
        description: "Everything included with VIP treatment", 
        amount: 4500, // €45.00
      }
    };

    const selectedTier = subscriptionTiers[tier as keyof typeof subscriptionTiers];
    if (!selectedTier) {
      throw new Error("Invalid subscription tier");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { 
              name: selectedTier.name,
              description: selectedTier.description
            },
            unit_amount: selectedTier.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/account?success=true&tier=${tier}`,
      cancel_url: `${req.headers.get("origin")}/account?canceled=true`,
      metadata: {
        user_id: user.id,
        subscription_tier: tier,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
