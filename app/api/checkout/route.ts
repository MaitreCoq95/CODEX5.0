import { NextRequest, NextResponse } from "next/server"
import { stripe, PRICING_PLANS, PlanId } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { planId, standard, userEmail } = await request.json()

    if (!planId || !PRICING_PLANS[planId as PlanId]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const plan = PRICING_PLANS[planId as PlanId]
    const origin = request.headers.get("origin") || "http://localhost:3000"

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: plan.interval === "month" ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: {
              name: `Vyxo Codex - ${plan.name}`,
              description: plan.description,
              metadata: {
                standard: standard || "ISO_9001",
              },
            },
            unit_amount: plan.price * 100, // Stripe expects cents
            ...(plan.interval === "month" && {
              recurring: { interval: "month" },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      customer_email: userEmail,
      metadata: {
        planId,
        standard: standard || "ISO_9001",
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
