---
title: Account recovery
description: Regain access to your Cloudflare account when you have lost your 2FA device and backup codes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/user-profiles/account-recovery.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Account recovery

If you do not have access to your 2FA account or backup codes and cannot currently generate a 2FA code, use a verified device that you have logged in from before to request a temporary access code.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login).  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/user-profiles/","name":"User profiles"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/user-profiles/account-recovery/","name":"Account recovery"}}]}
```
