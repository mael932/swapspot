
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");

    const { recipientName, listingTitle, listingLocation, contactInfo } = await req.json();

    // Store the match in the database
    const { error: matchError } = await supabaseClient
      .from('user_matches')
      .insert({
        requester_id: user.id,
        listing_title: listingTitle,
        listing_location: listingLocation,
        contact_info: contactInfo
      });

    if (matchError) {
      console.error("Error storing match:", matchError);
    }

    // For demo purposes, we'll simulate sending emails
    // In production, you would integrate with Resend or another email service
    console.log(`Match notification would be sent to:
    - Requester (${user.email}): Contact info for ${recipientName}
    - Recipient: Match notification from ${user.email}
    
    Listing: ${listingTitle} in ${listingLocation}
    Contact Info: ${JSON.stringify(contactInfo, null, 2)}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Match notification sent successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-match-email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
