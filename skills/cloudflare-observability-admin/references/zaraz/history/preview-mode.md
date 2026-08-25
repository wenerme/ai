---
description: Preview Zaraz configuration changes before publishing.
title: Preview mode
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Preview mode

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/history/preview-mode/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Zaraz allows you to test your configurations before publishing them. This is helpful to avoid unintended consequences when deploying a new tool or trigger.

After enabling Preview & Publish you will also have access to [Zaraz History](https://developers.cloudflare.com/zaraz/history/versions/).

## Enable Preview & Publish mode

By default, Zaraz is configured to commit changes in real time. To enable preview mode and test new features you are adding to Zaraz:

1. In the Cloudflare dashboard, go to the **History** page.
[Go to **History** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/history)
2. Enable **Preview & Publish Workflow**.

You are now working in preview mode. To commit changes and make them live, you will have to select **Publish** on your account.

### Test changes before publishing them

Now that you have Zaraz working in preview mode, you can open your website and test your settings:

1. In the Cloudflare dashboard, go to the **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/settings)
2. Navigate to the website where you want to test your new settings.
3. Access the browser’s developer tools. For example, to access developer tools in Google Chrome, select **View** \> **Developer** \> **Developer Tools**.
4. Select the **Console** pane and enter the following command to start Zaraz’s preview mode:
```js
zaraz.preview("<YOUR_DEBUG_KEY>");
```
5. Your website will reload along with Zaraz debugger, and Zaraz will use the most recent changes in preview mode.
6. If you are satisfied with your changes, go back to the dashboard and select **Publish** to apply them to all users. If not, use the dashboard to continue adjusting your configuration.

To exit preview mode, close Zaraz debugger.

## Disable Preview & Publish mode

Disable Preview & Publish mode to work in real time. When you work in real time, any changes made on the dashboard are applied instantly to the domain you are working on.

1. In the Cloudflare dashboard, go to the **History** page.
[Go to **History** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/history)
2. Disable **Preview & Publish Workflow**.
3. In the modal, decide if you want to delete all unpublished changes, or if you want to publish any change made in the meantime.

Zaraz is now working in real time. Any change you make will be immediately applied the domain you are working on.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/history/preview-mode/#page","headline":"Preview changes before publishing · Cloudflare Zaraz docs","description":"Preview Zaraz configuration changes before publishing.","url":"https://developers.cloudflare.com/zaraz/history/preview-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
