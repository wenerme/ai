---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Add and verify the destination addresses that Email Routing forwards to and that Email Sending can send to on every plan.
title: Destination addresses
image: https://developers.cloudflare.com/email-service/configuration/destination-addresses/og.png?v=487cb5bf61356e75
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Destination addresses

A destination address is a verified email address in your account. Email Routing forwards messages to destination addresses, and Email Sending can send to them.

Destination addresses are shared at the account level and can be reused with any other domain in your account. Before you can create a [routing rule](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/), you must add and verify at least one destination address.

## Send to destination addresses

You can send to verified destination addresses directly through the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) or the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/), free of charge on any plan — including when only Email Routing is configured. From an onboarded [sending domain](https://developers.cloudflare.com/email-service/configuration/domains/), you can also send to them over [SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/). Sends to verified destination addresses do not count toward your monthly quota or daily sending limits.

On the Workers Free plan, Email Sending sends only to verified destination addresses. Refer to [Limits](https://developers.cloudflare.com/email-service/platform/limits/#verified-destination-addresses) and [Pricing](https://developers.cloudflare.com/email-service/platform/pricing/) for details.

## Add a destination address

1. Log in to the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) and select your account.
2. Go to **Compute** > **Email Service** > **Email Routing** > **Destination Addresses**. [Go to **Email Routing** ↗](https://dash.cloudflare.com/?to=/:account/email-service/routing)
3. Under **Destination addresses**, enter the email address you want to use as a destination in the inline form and submit it.
4. Cloudflare sends a verification email to that address. Open the email and select **Verify email address** to activate it.

Until a destination address is verified, any routing rule that points to it stays disabled.

## Manage destination addresses

The **Destination Addresses** page lists every address on your account, including those pending verification. From this page you can resend a verification email or delete a destination address.

Note

Deleting a destination address automatically disables all routing rules that use that address as a destination.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/configuration/destination-addresses/#page","headline":"Destination addresses","description":"Add and verify the destination addresses that Email Routing forwards to and that Email Sending can send to on every plan.","url":"https://developers.cloudflare.com/email-service/configuration/destination-addresses/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/configuration/destination-addresses/og.png?v=487cb5bf61356e75","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
