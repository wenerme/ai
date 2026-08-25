---
description: Create custom variables for use in Zaraz actions.
title: Create a variable
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a variable

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/variables/create-variables/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Variables are reusable blocks of information. They allow you to have one source of data you can reuse across tools and triggers in the dashboard. You can then update this data in a single place.

For example, instead of typing a specific user ID in multiple fields, you can create a variable with that information instead. If there is a change and you have to update the user ID, you just need to update the variable and the change will be reflected across the dashboard.

[Worker Variables](https://developers.cloudflare.com/zaraz/variables/worker-variables/) are a special type of variable that generates value dynamically.

## Create a new variable

1. In the Cloudflare dashboard, go to the **Tag setup** page.
[Go to **Tag setup** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Go to **Tools Configuration** \> **Variables**.
3. Select **Create variable**, and give it a name.
4. In **Variable type** select between `String`, `Masked variable` or `Worker` from the drop-down menu. Use `Masked variable` when you have a private value that you do not want to share, such as an API token.
5. In **Variable value** enter the value of your variable.
6. Select **Save**.

Your variable is now ready to be used with tools and triggers.

## Next steps

Refer to [Add a third-party tool](https://developers.cloudflare.com/zaraz/get-started/) and [Create a trigger](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) for more information on how to add a variable to tools and triggers.

If you need to edit or delete variables, refer to [Edit variables](https://developers.cloudflare.com/zaraz/variables/edit-variables/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/variables/create-variables/#page","headline":"Create a variable · Cloudflare Zaraz docs","description":"Create custom variables for use in Zaraz actions.","url":"https://developers.cloudflare.com/zaraz/variables/create-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
