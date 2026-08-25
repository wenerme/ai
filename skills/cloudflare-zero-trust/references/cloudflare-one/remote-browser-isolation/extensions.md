---
description: Reference information for Extensions in Browser Isolation.
title: Extensions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Extensions

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/extensions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Browser Isolation supports running native Chromium Web Extensions in the remote browser.

When a page is isolated, it runs in a remote browser — not in the user's local browser. Extensions installed locally cannot interact with isolated pages because the page content exists only on the remote side. This capability allows extending tools that require DOM access (the ability to read and modify page content and structure), such as password managers and ad blockers, to isolated pages.

## Install an extension inside the remote browser

### Prerequisite: Isolate Chrome Web Store

Note

This step is not required when browsing via Clientless Web Isolation. You can access the Chrome Web Store at `https://<authdomain>.cloudflareaccess.com/browser/https://chromewebstore.google.com/`.

Installing extensions requires Chrome Web Store isolation. Create an [HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to isolate the Chrome Web Store (chromewebstore.google.com).

### Install an extension

1. Go to `https://chromewebstore.google.com/` while isolated.
2. Choose your desired extension.
3. Select **Add to Chrome**. To confirm extension installation, select **Add extension**.

Remote browser extensions are automatically reinstalled across isolated sessions.

## Remove an extension from the remote browser

1. Go to any isolated webpage.
2. Right-click anywhere to open the context menu and select **Show isolation toolbar**.
3. Select the jigsaw icon in the isolation toolbar to open the extension manager.
4. Select the hamburger icon for the desired extension to open the extension controls.
5. Select **Remove from Chromium**. To confirm removal, select **Remove**.

## Useful extensions

### Modify remote browser user agent

[User-Agent Switcher for Chrome ↗](https://chromewebstore.google.com/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg) enables controlling the User Agent sent from the remote browser to an isolated website.

### Control remote browser request headers

[ModHeader ↗](https://chromewebstore.google.com/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) enables controlling arbitrary request headers sent from the remote browser to an isolated website.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/extensions/#page","headline":"Extensions · Cloudflare One docs","description":"Reference information for Extensions in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/extensions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
```
