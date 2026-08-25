---
description: Configure link actions in Email Security.
title: Configure link actions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure link actions

Last updated Aug 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure how Email security handles links in emails.

Note

You can only configure link actions if you deploy Email security via [MX/Inline](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/).

To configure link actions:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**, then go to **Detection settings** \> **Link actions** \> **View**.

You can configure **Link actions settings**, or **URL rewrite ignore patterns**.

## Link actions settings

To configure link actions, select **Configure**.

The dashboard will display **Open links evaluated as suspicious in a remote browser (Recommended)**. This option is turned on by default. Email security will also allow you to select message dispositions to open all the links for dispositioned emails in a remote browser.

Select one or more disposition, then select **Save**.

If **Open links evaluated as suspicious in a remote browser (Recommended)** is turned off, you can select **URL defang** or **No action** on each disposition. Select **Save** once you have completed the configuration.

When opening links, Email security will not allow you to:

* [Copy (from remote to client)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Paste (from client to remote)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* Use [keyboard](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Print](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Download files](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Uploads files](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)

## Add patterns for URLs

You can add patterns for URLs that should be rewritten.

1. Under **URL rewrite ignore patterns**, select **Add a pattern**.
2. Enter a valid IP, URL, or regular expression. You can enter up to 512 characters.
3. Select **Save**.

To edit a pattern, go to the pattern you want to edit, select the three dots, then **Edit**. Once you have finished modifying the URL patter, select **Save**.

To delete a pattern, go to the pattern you want to delete, select the three dots, then **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/#page","headline":"Configure link actions · Cloudflare One docs","description":"Configure link actions in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
