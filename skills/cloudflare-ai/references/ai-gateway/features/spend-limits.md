---
description: Set cost-based budgets on your AI Gateway to control spending by model, provider, or custom metadata dimensions like user or team.
title: Spend limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Spend limits

Last updated Aug 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/features/spend-limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Spend limits let you set cost-based budgets on your AI Gateway. When cumulative spend reaches the limit within a time window, AI Gateway blocks further requests with a `429` response until the window resets.

Unlike [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/), which caps the number of requests, spend limits track actual dollar cost per request based on model pricing. You can scope limits to any combination of model, provider, or [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) dimensions like user ID, team, or application.

Spend limits apply to both [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) requests and [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) requests for models with known pricing.

![Spend limits rules configured on a gateway](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2364,height=728,format=webp/_astro/spend-limits-rules.p6zy0Vea.png)

## How it works

Each spend limit rule defines a budget (in dollars) over a rolling or fixed time window. AI Gateway calculates the cost of each request based on token usage and model pricing, then tracks cumulative spend against the limit in real time.

Before sending a request to the provider, AI Gateway evaluates all applicable spend limit rules at once. If any individual rule is over budget, the request is blocked with a `429` response.

Spend limits are eventually consistent. The current request's cost is recorded after completion, so a burst of concurrent requests can briefly exceed the limit before enforcement catches up.

## Scoping with dimensions

Each rule can be scoped by one or more dimensions:

* **Limit by provider** — the provider used for the request.
* **Limit by model** — the model used for the request.
* **Limit by metadata** — a [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) key you attach to requests. Enter the metadata key name (for example, `agent_id` or `environment`).

Each dimension can be configured in one of two modes:

| Mode                | Behavior                                                          | Example                                                                                                    |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Split by value**  | Each distinct value gets its own independent budget bucket.       | For example, if you pass in agent\_id, splitting by agent\_id gives every agent its own budget.            |
| **Filter by value** | The rule applies only when the dimension equals a specific value. | For example, if you pass in agent\_id, filtering agent\_id to agent\_42 limits only that agent's requests. |

If a dimension is not configured on a rule, all values share one budget bucket. For example, a rule without a `provider` dimension tracks spend across all providers together.

### Dimension examples

Given a request with model `openai/gpt-5.5` and an `agent_id` metadata value of `agent_42`:

| Scenario                   | Dimensions                                                   | Budget bucket                                  |
| -------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| Global budget for everyone | None                                                         | One shared bucket                              |
| Per-agent budget           | agent\_id metadata: split by value                           | Separate bucket per agent                      |
| Per-provider, per-agent    | agent\_id metadata: split by value, provider: split by value | Separate bucket per agent+provider combination |
| Specific model only        | model: filter by value openai/gpt-5.5                        | Only applies to openai/gpt-5.5 requests        |
| Per-agent, per-model       | agent\_id metadata: split by value, model: split by value    | Separate bucket per agent+model combination    |

## Configure spend limits

Spend limits are configured on the gateway via the dashboard or the API. You can define up to 20 rules per gateway.

![Add spend limit rule form](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1350,height=1316,format=webp/_astro/spend-limits-add-rule.BnBR5VIn.png)

To scope spend limits by custom dimensions like user ID or team, attach [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) to your requests.

### Set spend limits by user

You can give every user their own budget by scoping a rule to a user identifier. How you get that identifier depends on how your gateway is authenticated.

#### With Cloudflare Access

If your gateway is protected by [Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/), AI Gateway automatically adds the authenticated Access user ID to each request as the reserved [cf.user\_id](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/#reserved-metadata) metadata key. You do not need to pass user IDs from your client application.

To set a per-user budget:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **AI** \> **AI Gateway** and select your gateway.
2. Go to the spend limits settings and add a rule.
3. Under **Limit by metadata**, select **Add metadata dimension** and enter `cf.user_id` as the key.
4. Set the dimension to **Split by value**.
5. Set the budget amount and time window, then save.

Each authenticated Access user now gets an independent budget. To instead limit a single user, set the dimension to **Filter by value** and enter that user's Access JWT `sub` claim.

Note

`cf.user_id` is only present on requests that arrive through an Access-protected [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) with a valid Access user subject. Service-token requests do not include `cf.user_id`.

#### Without Cloudflare Access

If your gateway is not behind Access, pass your own user identifier as [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) (for example, a `user_id` key). Then, under **Limit by metadata**, add a dimension with the key `user_id` and set it to **Split by value**.

## Behavior when a limit is reached

When a spend limit is exceeded, AI Gateway returns a `429 Too Many Requests` response. You have two options:

* **Block requests** (default) - The request is rejected until the budget window resets.
* **Fall back to a cheaper model** \- Create a [Dynamic Route](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) with a primary model and a fallback (for example, `anthropic/claude-opus-4.7` with a fallback to `@cf/moonshotai/kimi-k2.6`). Then set a spend limit on the primary model using this feature. When the primary model's budget is exceeded, AI Gateway automatically routes requests to the fallback model instead of blocking them.

## Monitoring spend

You can track your spend per model, provider, or any custom metadata attribute on the [Analytics dashboard](https://developers.cloudflare.com/ai-gateway/observability/analytics/). Use this to understand usage patterns and set informed budgets.

## Limitations

* Cost tracking is a best-effort estimation based on token counts and model pricing. Refer to your provider's dashboard for exact billing amounts.
* A maximum of 20 spend limit rules can be configured per gateway.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/spend-limits/#page","headline":"Spend limits · Cloudflare AI Gateway docs","description":"Set cost-based budgets on your AI Gateway to control spending by model, provider, or custom metadata dimensions like user or team.","url":"https://developers.cloudflare.com/ai-gateway/features/spend-limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
