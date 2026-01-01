// Stripe Subscription Service
// Handles billing, subscriptions, and payments

export interface SubscriptionPlan {
  id: string
  name: string
  priceMonthly: number
  priceYearly: number
  features: string[]
  maxUsers: number
  stripePriceIdMonthly?: string
  stripePriceIdYearly?: string
}

export interface Subscription {
  id: string
  customerId: string
  organizationId: string
  planId: string
  status: "active" | "past_due" | "canceled" | "trialing"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  billingInterval: "month" | "year"
}

export interface Invoice {
  id: string
  customerId: string
  amount: number
  currency: string
  status: "paid" | "pending" | "failed"
  paidAt?: Date
  invoicePdf?: string
}

// Plans configuration
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 29,
    priceYearly: 290,
    maxUsers: 10,
    features: [
      "Jusqu'à 10 utilisateurs",
      "Assessments illimités",
      "5 modules de formation",
      "Support email",
    ],
  },
  {
    id: "professional",
    name: "Professionnel",
    priceMonthly: 79,
    priceYearly: 790,
    maxUsers: 50,
    features: [
      "Jusqu'à 50 utilisateurs",
      "Assessments illimités",
      "Tous les modules",
      "Analytics avancées",
      "Support prioritaire",
      "SSO inclus",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 199,
    priceYearly: 1990,
    maxUsers: -1, // unlimited
    features: [
      "Utilisateurs illimités",
      "Toutes les fonctionnalités",
      "API Access",
      "Custom branding",
      "Account manager dédié",
      "SLA 99.9%",
    ],
  },
]

export class StripeService {
  private apiKey: string
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.STRIPE_SECRET_KEY || ""
  }
  
  private async stripeRequest(endpoint: string, method: string, body?: any) {
    const response = await fetch(`https://api.stripe.com/v1${endpoint}`, {
      method,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body ? new URLSearchParams(body).toString() : undefined,
    })
    return response.json()
  }
  
  // Customer management
  async createCustomer(organization: {
    id: string
    name: string
    email: string
  }): Promise<string> {
    const customer = await this.stripeRequest("/customers", "POST", {
      name: organization.name,
      email: organization.email,
      metadata: {
        organizationId: organization.id,
      },
    })
    return customer.id
  }
  
  async getCustomer(customerId: string) {
    return this.stripeRequest(`/customers/${customerId}`, "GET")
  }
  
  // Subscription management
  async createSubscription(customerId: string, priceId: string, trialDays: number = 14): Promise<Subscription> {
    const subscription = await this.stripeRequest("/subscriptions", "POST", {
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays.toString(),
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    })
    
    return {
      id: subscription.id,
      customerId: subscription.customer,
      organizationId: subscription.metadata?.organizationId || "",
      planId: priceId,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      billingInterval: subscription.items?.data?.[0]?.price?.recurring?.interval || "month",
    }
  }
  
  async updateSubscription(subscriptionId: string, newPriceId: string): Promise<Subscription> {
    // First get the subscription to find the item id
    const currentSub = await this.stripeRequest(`/subscriptions/${subscriptionId}`, "GET")
    const itemId = currentSub.items?.data?.[0]?.id
    
    const subscription = await this.stripeRequest(`/subscriptions/${subscriptionId}`, "POST", {
      items: [{ id: itemId, price: newPriceId }],
      proration_behavior: "create_prorations",
    })
    
    return {
      id: subscription.id,
      customerId: subscription.customer,
      organizationId: subscription.metadata?.organizationId || "",
      planId: newPriceId,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      billingInterval: subscription.items?.data?.[0]?.price?.recurring?.interval || "month",
    }
  }
  
  async cancelSubscription(subscriptionId: string, immediately: boolean = false): Promise<void> {
    if (immediately) {
      await this.stripeRequest(`/subscriptions/${subscriptionId}`, "DELETE")
    } else {
      await this.stripeRequest(`/subscriptions/${subscriptionId}`, "POST", {
        cancel_at_period_end: "true",
      })
    }
  }
  
  async reactivateSubscription(subscriptionId: string): Promise<void> {
    await this.stripeRequest(`/subscriptions/${subscriptionId}`, "POST", {
      cancel_at_period_end: "false",
    })
  }
  
  // Invoices
  async getInvoices(customerId: string, limit: number = 10): Promise<Invoice[]> {
    const response = await this.stripeRequest(`/invoices?customer=${customerId}&limit=${limit}`, "GET")
    
    return response.data?.map((inv: any) => ({
      id: inv.id,
      customerId: inv.customer,
      amount: inv.amount_paid / 100,
      currency: inv.currency.toUpperCase(),
      status: inv.status === "paid" ? "paid" : inv.status === "open" ? "pending" : "failed",
      paidAt: inv.status_transitions?.paid_at ? new Date(inv.status_transitions.paid_at * 1000) : undefined,
      invoicePdf: inv.invoice_pdf,
    })) || []
  }
  
  async getUpcomingInvoice(customerId: string) {
    return this.stripeRequest(`/invoices/upcoming?customer=${customerId}`, "GET")
  }
  
  // Checkout session (for new subscriptions)
  async createCheckoutSession(params: {
    customerId: string
    priceId: string
    successUrl: string
    cancelUrl: string
  }): Promise<{ url: string; sessionId: string }> {
    const session = await this.stripeRequest("/checkout/sessions", "POST", {
      customer: params.customerId,
      line_items: [{ price: params.priceId, quantity: "1" }],
      mode: "subscription",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    })
    
    return { url: session.url, sessionId: session.id }
  }
  
  // Customer portal (for managing billing)
  async createPortalSession(customerId: string, returnUrl: string): Promise<{ url: string }> {
    const session = await this.stripeRequest("/billing_portal/sessions", "POST", {
      customer: customerId,
      return_url: returnUrl,
    })
    
    return { url: session.url }
  }
  
  // Webhook handling
  async handleWebhookEvent(payload: string, signature: string, webhookSecret: string): Promise<{
    type: string
    handled: boolean
    data?: any
  }> {
    // In production, verify the signature using Stripe's library
    // stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    
    const event = JSON.parse(payload)
    
    switch (event.type) {
      case "invoice.paid":
        return {
          type: event.type,
          handled: true,
          data: { invoiceId: event.data.object.id },
        }
        
      case "invoice.payment_failed":
        return {
          type: event.type,
          handled: true,
          data: { invoiceId: event.data.object.id, customerId: event.data.object.customer },
        }
        
      case "customer.subscription.updated":
        return {
          type: event.type,
          handled: true,
          data: { subscriptionId: event.data.object.id, status: event.data.object.status },
        }
        
      case "customer.subscription.deleted":
        return {
          type: event.type,
          handled: true,
          data: { subscriptionId: event.data.object.id },
        }
        
      default:
        return { type: event.type, handled: false }
    }
  }
}

// Export singleton
export const stripeService = new StripeService()
