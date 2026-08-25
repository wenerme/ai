---
description: View matched payload content in the Cloudflare dashboard.
title: View the payload content in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# View the payload content in the dashboard

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/payload-logging/view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

View the content of the matched rule payload in the dashboard by entering your private key.

1. Open [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/):

  1. In the Cloudflare dashboard, go to the **Analytics** page.
  [Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
  2. Select the **Events** tab.
2. Under **Sampled logs**, expand the details of an event triggered by a rule whose managed ruleset has payload logging enabled.
3. Under **Matched service**, select **Decrypt payload match**.
![Example of a security event with available payload match data \(still encrypted\)](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1084,height=335,format=webp/_astro/payload-logging-example.CMWUOj2Y.png)
4. Enter your private key in the pop-up window and select **Decrypt**.
Note
The private key is not sent to a Cloudflare server. The decryption occurs entirely in the browser.

If the private key you entered decrypts the encrypted payload successfully, the dashboard will show the name of the fields that matched and the matched string in clear text, along with some text appearing before and after the match.

![Viewing the decrypted payload match data after entering your private key in the dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=460,height=165,format=webp/_astro/payload-decrypted.DoVOmjx4.png)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/view/#page","headline":"View the payload content in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"View matched payload content in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
