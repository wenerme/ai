---
description: Prevent other teams from adding your active Cloudflare zones to a different account by enabling zone holds.
title: Zone holds
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Zone holds

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Zone holds prevent other teams in your organization from adding zones that are already active in another account.

For example, you might already have an active Cloudflare zone for `example.com`. If another team does not realize this, they could add and activate `example.com` in another Cloudflare account, which may cause downtimes or security issues until the original zone could be re-activated.

Note

Zone holds are enabled by default for all Enterprise zones.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | No   | No  | No       | Yes        |

## Enable zone holds

When you enable a zone hold, no one else can [add your zone](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to their Cloudflare account. If they attempt to, they will receive the following message:

_The zone name provided is subject to a hold which disallows the creation of this zone. Please contact the domain owner to have this hold removed._

To enable a zone hold:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. On the zone homepage, go to **Quick Actions**.
4. For **Zone Hold**, switch the toggle to **On**.

You also have the option to **Also prevent subdomains**, which prevents anyone in your organization from creating subdomains or custom hostnames related to your zone.

## Release zone holds

You may want to temporarily release a zone hold to allow another team to [register a subdomain](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) in a separate Cloudflare account, such as `docs.example.com`.

To release a zone hold:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. On the zone homepage, go to **Quick Actions**.
4. For **Zone Hold**, switch the toggle to **Off**.
5. Choose the length of your release.
6. Select **Release hold**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/#page","headline":"Zone holds · Cloudflare Fundamentals docs","description":"Prevent other teams from adding your active Cloudflare zones to a different account by enabling zone holds.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
