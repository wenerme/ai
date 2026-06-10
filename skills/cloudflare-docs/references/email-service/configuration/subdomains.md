---
title: Subdomains
description: Configure Email Sending and Email Routing on subdomains within your zone.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Subdomains

Email Routing is a zone-level feature that applies to the apex domain (for example, `example.com`) by default. Email Sending treats each domain separately and is onboarded per domain. You can extend either service to subdomains of the same zone, such as `mail.example.com` or `corp.example.com`, but the onboarding flow differs between the two.

A zone can have up to 30 domains configured for Email Routing or Email Sending combined, including the apex domain. Refer to [Limits](https://developers.cloudflare.com/email-service/platform/limits/) for the full list of platform limits.

## Add a subdomain to Email Routing

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Compute** \> **Email Service** \> **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
3. Select the apex domain, then open **Settings**.
4. Under **Subdomains**, enter the subdomain you want to enable in the inline form and submit it.

Cloudflare adds the required DNS records to the subdomain. Once the records propagate, you can create [routing rules](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/) on the subdomain in the same way as on the apex domain.

## Add a subdomain to Email Sending

Email Sending treats a subdomain as a separate sending domain. Onboard the subdomain through the standard onboarding flow:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Compute** \> **Email Service** \> **Email Sending**.  
[ Go to **Email Sending** ](https://dash.cloudflare.com/?to=/:account/email-service/sending)
3. Select **Onboard Domain** and choose the subdomain you want to send from. The onboarding flow adds the `cf-bounce` MX, SPF, DKIM, and DMARC records to the subdomain.
4. Select **Done**.

Once verified, you can send emails from addresses on the subdomain (for example, `notifications@mail.example.com`) using either the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) or the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

## Next steps

* [Domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/) — manage DNS records for sending and routing.
* [Routing rules and addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/) — create routing rules on subdomains.
* [Deliverability](https://developers.cloudflare.com/email-service/concepts/deliverability/) — separate subdomains for different email types.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/configuration/subdomains/","name":"Subdomains"}}]}
```
