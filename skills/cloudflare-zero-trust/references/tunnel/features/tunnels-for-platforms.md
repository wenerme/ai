---
description: Run more than 1,000 Cloudflare Tunnels in a single account to connect devices, customers, or environments at scale.
title: Tunnels for Platforms
image: https://developers.cloudflare.com/tunnel/features/tunnels-for-platforms/og.png?v=950593161990cd36
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Tunnels for Platforms

Last updated Oct 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/tunnel/features/tunnels-for-platforms/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Tunnels for Platforms lets you run more than 1,000 Cloudflare Tunnels in a single Cloudflare account. Every account includes 1,000 tunnels at no cost. With Tunnels for Platforms, you add tunnel capacity beyond that as your deployment grows, without splitting your fleet across multiple accounts.

Tunnels for Platforms uses the same `cloudflared` daemon, API, and dashboard as every other tunnel. No changes to your tunnels or `cloudflared` deployments are required.

## Use cases

Tunnels for Platforms is designed for customers who need to create one tunnel per device, end customer, or environment:

- **SaaS providers** — Create one tunnel per end customer to reach systems in their private networks or on-premises environments.
- **IoT and device manufacturers** — Create one tunnel per deployed device, such as a camera, router, sensor, or industrial controller.
- **Developer tools and ephemeral environments** — Create short-lived tunnels for local development, CI/CD pipelines, and preview environments.
- **AI and agent platforms** — Create one tunnel per customer to connect AI agents and MCP servers to private resources.

## Pricing

Tunnels for Platforms costs $4.50 per additional tunnel per month. The first 1,000 tunnels in every account remain included at no cost.

Every tunnel that exists in your account counts toward your limit. This includes tunnels that are inactive or have no connected `cloudflared` replicas. To free up capacity, [delete tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/methods/delete/) you no longer need.

Enterprise customers can purchase committed tunnel capacity or usage-based billing. To get started, contact your account team.

## Buy additional tunnels

To add tunnel capacity to your account:

1. In the Cloudflare dashboard, go to **Networking** > **Tunnels**. [Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. In the **Usage** card, select **Buy more tunnels**.
3. Enter the number of additional tunnels you need.
4. Review the order summary and payment method, then select **Activate**.

Your new limit appears in the **Usage** card within a few minutes. Your limit is 1,000 tunnels plus the number of additional tunnels you purchased.

### Change or cancel your subscription

You can increase or decrease the number of additional tunnels, or cancel your subscription, at any time. To manage your Tunnels for Platforms subscription:

1. In the Cloudflare dashboard, go to **Manage Account** > **Billing**. [Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Subscriptions**.
3. Find the **Tunnels for Platforms** subscription and change the number of additional tunnels, or cancel the subscription.

Changes do not delete any existing tunnels.

If your limit drops below the number of tunnels in your account, existing tunnels continue to work. Cloudflare blocks new tunnel creation until you delete enough tunnels or purchase more capacity.

## Tunnel limit behavior

When your account reaches its tunnel limit, existing tunnels and their connections are not affected. Requests to create a new tunnel fail until you delete a tunnel or increase your limit.

## Related limits

Tunnels for Platforms only changes the number of tunnels per account. Other Cloudflare Tunnel limits are independent:

| Limit | Default |
| --- | --- |
| [Routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/) (CIDR routes and hostname routes) per account | 50,000 |
| Virtual networks per account | 1,000 |
| [Replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) per tunnel | 25 |
| [Published applications](https://developers.cloudflare.com/tunnel/concepts/routing/#published-application-limits) per tunnel | Limited by configuration size |

Published applications do not count toward the routes limit. For all limits, refer to [Account limits](https://developers.cloudflare.com/cloudflare-one/account-limits/#cloudflare-tunnel).

## Best practices for large deployments

When you manage thousands of tunnels, automate the tunnel lifecycle with the [Cloudflare API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/) or [Terraform](https://developers.cloudflare.com/tunnel/guides/terraform/):

- **Retry with exponential backoff** — Retry failed API requests that return `429` or `5xx` status codes with exponential backoff and random jitter. Queue create and delete operations rather than sending them all at once. The Cloudflare API also applies [rate limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/).
- **Use unique, deterministic tunnel names** — For example, `tunnel-<CUSTOMER_ID>-<REGION>`. Before you retry a failed create request, check whether a tunnel with that name already exists to avoid duplicate tunnels.
- **Reconcile regularly** — Compare the tunnels in your Cloudflare account with your own records. Delete tunnels that are no longer associated with a device, customer, or environment.
- **Delete unused tunnels** — Use the [tunnel connections API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connections/methods/get/) to find tunnels with no active connections. Disconnecting `cloudflared` does not delete a tunnel.
- **Pre-create tunnels for latency-sensitive workloads** — Creating a tunnel takes a few seconds. If users need a tunnel immediately, keep a pool of pre-created tunnels and refill it in the background.
- **Run replicas for production workloads** — Run at least two [`cloudflared` replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) per tunnel for high availability.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/features/tunnels-for-platforms/#page","headline":"Tunnels for Platforms","description":"Run more than 1,000 Cloudflare Tunnels in a single account to connect devices, customers, or environments at scale.","url":"https://developers.cloudflare.com/tunnel/features/tunnels-for-platforms/","inLanguage":"en","image":"https://developers.cloudflare.com/tunnel/features/tunnels-for-platforms/og.png?v=950593161990cd36","dateModified":"2026-10-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
