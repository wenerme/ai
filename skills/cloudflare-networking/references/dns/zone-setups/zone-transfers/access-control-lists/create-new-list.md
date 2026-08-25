---
description: Create an ACL for DNS zone transfers.
title: Create ACL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Create ACL

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You need to create an Access Control List (ACL) if Cloudflare is your [secondary DNS provider](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/). The ACL will specify additional NOTIFY IPs that Cloudflare should listen to.

An ACL is configured at the account level, which means that it will apply to every primary and secondary zone in your account.

To create a new ACL using the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.
[Go to **Configurations** ↗](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. Under **DNS Zone Transfers**, for **ACL**, select **Create**.
4. Enter the following information:

  * **ACL name**: Provide a descriptive name.
  * **IP range**: Enter a range of IPv4 or IPv6 addresses (limited to a maximum of /24 for IPv4 and /64 for IPv6).
5. Select **Create**.

To create a new ACL using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/acls/methods/create/) request.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/#page","headline":"Create a new Access Control List · Cloudflare DNS docs","description":"Create an ACL for DNS zone transfers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
