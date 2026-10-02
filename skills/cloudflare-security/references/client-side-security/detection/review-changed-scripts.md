---
description: Learn how to review scripts on your domain after receiving a code change alert.
title: Review changed scripts
image: https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/og.png?v=00c9c33c5a5681a7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# Review changed scripts

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Only available to customers with Client-Side Security Advanced.

Cloudflare analyzes the JavaScript dependencies in the pages of your domain over time.

## How changes are detected

Cloudflare parses each script into an abstract syntax tree (AST) and hashes its structure. A script is marked as changed when this structural hash changes.

The comparison does not use the raw file bytes. Changes that preserve the same AST structure, such as formatting changes or changing only numeric literal values, do not trigger a code change alert.

You can configure a notification for [code change alerts](https://developers.cloudflare.com/client-side-security/alerts/alert-types/#code-change-alert) to receive a daily notification about changed scripts in your domain.

When you receive such a notification:

1. In the Cloudflare dashboard, go to the **Web assets** page. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the **Client-side resources** tab.
3. Check the details of each changed script and validate if it is an expected change.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/#page","headline":"Review changed scripts","description":"Learn how to review scripts on your domain after receiving a code change alert.","url":"https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/","inLanguage":"en","image":"https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/og.png?v=00c9c33c5a5681a7","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
