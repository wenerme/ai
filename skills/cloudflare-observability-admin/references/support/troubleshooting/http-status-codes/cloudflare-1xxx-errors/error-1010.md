---
description: Troubleshoot Cloudflare 1010 error code.
title: Error 1010
image: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/og.png?v=6bb4d7d72bb433e0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1010

Last updated Oct 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1010: The owner of this website has banned your access based on your browser's signature

This error indicates that access to the website is denied based on your browser's signature.

### Common causes

- A website owner blocked your request based on your client's web browser.
- The request was sent to a `*.pages.dev` or `*.workers.dev` hostname, or to a custom domain of a Pages project, with a `User-Agent` header that Browser Integrity Check treats as a non-browser client (for example, the default Python `urllib` user agent). Refer to [Requests to Pages projects or workers.dev](#requests-to-pages-projects-or-workersdev).

### Resolution

Notify the website owner of the blocking. If you cannot determine how to contact the website owner, lookup contact information for the domain via the [Whois database ↗︎](https://lookup.icann.org/). Site owners can [turn off Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/#disable-browser-integrity-check) in the Security **Settings** page. This does not apply to `pages.dev` and `workers.dev` hostnames, or to custom domains of Pages projects. Refer to [Requests to Pages projects or workers.dev](#requests-to-pages-projects-or-workersdev).

Note

Cloudflare support cannot override a customer's security settings. Browser Integrity Check on `pages.dev` and `workers.dev` cannot be turned off, either by the site owner or by Cloudflare support.

### Requests to Pages projects or workers.dev

On a Cloudflare-managed zone, Browser Integrity Check also checks requests to `*.pages.dev` and `*.workers.dev` hostnames, and to custom domains of Pages projects. This happens even if you have turned off Browser Integrity Check, or skipped it with a custom rule or configuration rule, in your own zone. These blocks are not recorded in your zone's Security Events or in your Worker logs. In Security Events, you may only see your own skip rule match.

**Resolution:**

- Configure your client to send a descriptive `User-Agent` header that identifies your application (for example, `my-app/1.0`) instead of the library default. The client does not need to send a browser user agent.
- **Workers:** Serve the Worker on a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) or [route](https://developers.cloudflare.com/workers/configuration/routing/routes/) in your zone instead of `workers.dev`. Then turn off or skip Browser Integrity Check for the affected paths with a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/) or [custom rule](https://developers.cloudflare.com/waf/custom-rules/skip/). Refer to [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/).
- **Pages:** Refer to [Pages known issues](https://developers.cloudflare.com/pages/platform/known-issues/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/#page","headline":"Error 1010","description":"Troubleshoot Cloudflare 1010 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/","inLanguage":"en","image":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/og.png?v=6bb4d7d72bb433e0","dateModified":"2026-10-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
