---
description: Embed third-party widgets like chat and support tools with Zaraz.
title: Embeds
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Embeds

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/embeds/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Embeds are tools for incorporating external content, like social media posts, directly onto webpages, enhancing user engagement without compromising site performance and security.

Cloudflare Zaraz introduces server-side rendering for embeds, avoiding third-party JavaScript to improve security, privacy, and page speed. This method processes content on the server side, removing the need for direct communication between the user's browser and third-party servers.

To add an Embed to Your Website:

1. In the Cloudflare dashboard, go to the **Tag Setup** page.
[Go to **Tag setup** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Go to **Tools Configuration**.
3. Click "add new tool" and activate the desired tools on your Cloudflare Zaraz dashboard.
4. Add a placeholder in your HTML, specifying the necessary attributes. For a generic embed, the snippet looks like this:

```html
<componentName-embedName attribute="value"></componentName-embedName>
```

Replace `componentName`, `embedName` and `attribute="value"` with the specific Managed Component requirements. Zaraz automatically detects placeholders and replaces them with the content in a secure and efficient way.

## Examples

### X (Twitter) embed

```html
<twitter-post tweet-id="12345"></twitter-post>
```

Replace `tweet-id` with the actual tweet ID for the content you wish to embed.

### Instagram embed

```html
<instagram-post post-url="https://www.instagram.com/p/ABC/" captions="true"></instagram-post>
```

Replace `post-url` with the actual URL for the content you wish to embed. To include posts captions set captions attribute to `true`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/embeds/#page","headline":"Embeds · Cloudflare Zaraz docs","description":"Embed third-party widgets like chat and support tools with Zaraz.","url":"https://developers.cloudflare.com/zaraz/embeds/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
