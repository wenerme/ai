---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Enable email security audit logs via Logpush.
title: Enable audit logs
image: https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/og.png?v=64bbdd761b5f36b0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable audit logs

With Email security, you can enable logs to review actions performed on your account.

To enable audit logs:

1. In the Cloudflare dashboard, go to the **Logpush** page. [Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/logs)
2. Select your storage destination.
3. Select the three dots > **Edit**.
4. Under **Configure logpush job**:
   - **Job name**: Enter the job name, if it is not already prepopulated.
   - **If logs match** > Select **Filtered logs**:
     - **Field**: Choose `ResourceType`.
     - **Operator**: Choose `starts with`.
     - **Value**: Enter `email_security`.
5. Select **Submit**.

You can now view logs via the Cloudflare dashboard.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/#page","headline":"Enable audit logs","description":"Enable email security audit logs via Logpush.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/og.png?v=64bbdd761b5f36b0","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
