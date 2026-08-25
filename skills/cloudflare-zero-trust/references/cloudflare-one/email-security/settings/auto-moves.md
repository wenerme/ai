---
description: Auto-move events in Email Security.
title: Auto-move events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto-move events

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Auto-moves allow you to automatically move emails out of your inbox based on a [disposition](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/) that Email security assigns to each message (for example, malicious, spam, or spoof).

Use auto-moves to enforce email security policy without relying on end users to identify and act on threats themselves. After you configure auto-moves, Email security handles flagged messages according to the action you choose for each disposition.

To configure auto-move events:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**.
4. Select **Moves**.
5. Under **Auto-moves**, select **Configure**.
6. For each disposition (malicious, spam, bulk, suspicious, spoof), choose what happens to matching emails:
  * **Soft delete - user recoverable**: Moves the message to the user's **Recoverable Items - Deleted** folder. The user can still find and restore the message. This option is only available for Microsoft 365 customers. Refer to [Microsoft 365 Exchange data deletion ↗](https://learn.microsoft.com/en-us/compliance/assurance/assurance-exchange-online-data-deletion) for more information.
  * **Hard delete - admin recoverable**: Removes the message from the user's inbox entirely. Only an administrator can recover it.
  * **Move to trash**: Moves the message to the user's trash or deleted items folder. This option is only available for Google Workspace users.
  * **Move to junk**: Moves the message to the user's junk or spam folder.
  * **No action**: Leaves the message where it is. Email security still records the disposition, but does not move the message.
7. Select **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/#page","headline":"Auto-move events · Cloudflare One docs","description":"Auto-move events in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
