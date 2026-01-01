import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

// Stripe webhook secret for signature verification
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature") || ""

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      console.log("✅ Checkout completed:", {
        sessionId: session.id,
        customerEmail: session.customer_email,
        metadata: session.metadata,
        amountTotal: session.amount_total,
      })
      
      // TODO: Update user subscription in database
      // const userId = session.metadata?.userId
      // const planId = session.metadata?.planId
      // await prisma.user.update({ where: { id: userId }, data: { subscriptionStatus: 'active' } })
      break
    }

    case "customer.subscription.created": {
      const subscription = event.data.object
      console.log("✅ Subscription created:", subscription.id)
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object
      console.log("📝 Subscription updated:", subscription.id, subscription.status)
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object
      console.log("❌ Subscription canceled:", subscription.id)
      // TODO: Update user subscription status to 'canceled'
      break
    }

    case "invoice.paid": {
      const invoice = event.data.object
      console.log("💰 Invoice paid:", invoice.id)
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object
      console.log("⚠️ Payment failed:", invoice.id)
      // TODO: Notify user of failed payment
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Disable body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
