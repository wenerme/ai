---
title: Phish submissions
description: Phish submissions in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/email-security/settings/phish-submissions/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Phish submissions

As part of your continuous email security posture, administrators and security analysts need to submit missed phishing samples to Email security, so Cloudflare can process them and take necessary action.

Submitting missed phish samples to Cloudflare is of paramount importance and necessary for continuous protection. Submitting missed phish samples helps Cloudflare improve our machine learning (ML) models, and alerts us of new attack vectors before they become prevalent.

There are three routes you can use to report an email as a phish:

* Via Investigation, by [reclassifying an email](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/#reclassify-an-email).
* Via [PhishNet 365](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/phishnet-365/).
* Via [Submission addresses](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/submission-addresses/).

## Reclassify an email

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Investigation**.
3. On the **Investigation** page, under **Your matching messages**, select the message you want to reclassify. Select the three dots, then select **Submit for review**. By selecting **Submit for review**, you are requesting a new disposition for the message.
4. Select the new disposition, then select **Save**.

When you report an email as phish, this email will be displayed under [User submissions](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/user-submissions/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/settings/","name":"Settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/settings/phish-submissions/","name":"Phish submissions"}}]}
```
