---
description: Regain access to your Cloudflare account when you have lost your 2FA device and backup codes.
title: Account recovery
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Account recovery

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/user-profiles/account-recovery/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you do not have access to your 2FA account or backup codes and cannot currently generate a 2FA code, use a verified device that you have logged in from before to request a temporary access code.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login).
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. On the **Two-Factor Authentication** page, select **Try recovery** on **Lost all 2FA devices and backup codes?**.
3. Select **Begin recovery**.
4. An access code will be sent to the email address associated with your Cloudflare account.
5. Enter the temporary access code into the Cloudflare Dashboard and select **Verify email**.
6. Select **Verify device**. This checks whether you are using a device that has previously logged into your account.

If you see **Device verified**, you will receive an email within 3-5 days with instructions to regain access to your account. It is important to note this process cannot be expedited, so you will need to wait until that email arrives before you can proceed.

If you see **Device verification failed**, you may be able to try again considering the following:

* If you clear your cookies often or are logging in from a different IP address, you have wiped Cloudflare's memory of your device and will need to use a different device to verify.
* Your browser may be set to clear cookies on exit or after browser or OS upgrades. This interferes with the device verification process.
* You may be using anti-malware or other software that automatically clears your browser cookies and makes your device unregognizable by Cloudflare's Dashboard.

If you are still unable to verify your device, follow the instructions to _Request manual verification_ on the **Device verification failed** page.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/user-profiles/account-recovery/#page","headline":"Account recovery · Cloudflare Fundamentals docs","description":"Regain access to your Cloudflare account when you have lost your 2FA device and backup codes.","url":"https://developers.cloudflare.com/fundamentals/user-profiles/account-recovery/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
