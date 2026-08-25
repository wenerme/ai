---
description: Overview of Email security in Email Security.
title: Email security
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Email security

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Important

Refer to [Area 1](https://developers.cloudflare.com/email-security/) if you are looking for the Area 1 documentation.

Note

If you have not yet purchased Email security, you can try Email security with Retro Scan. Refer to [Retro Scan](https://developers.cloudflare.com/cloudflare-one/email-security/retro-scan/) to learn more.

Protect your email inbox with Email security.

Cloudflare Email Security uses AI, threat intelligence, and security rules to analyze every incoming email, protecting your organization from phishing, malware, [Business Email Compromise ↗](https://www.cloudflare.com/en-gb/learning/email-security/business-email-compromise-bec/) (where attackers impersonate executives or authority figures to commit fraud), vendor email fraud, and spam.

It integrates with your existing email provider (such as Outlook or Gmail) and can be deployed via [API](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/), [BCC](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/gmail-bcc-setup/)/[Journaling](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/m365-journaling/), or [MX/Inline](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/).

When you complete the [setup process](https://developers.cloudflare.com/cloudflare-one/email-security/setup/), the Cloudflare dashboard will display the Email security overview page.

The Email security overview provides you with:

* **Quick actions**, where you can:
  * View [submissions](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/)
  * Manage detection settings: manage [allow policies](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/), [blocked senders](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/), [trusted domains](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/), [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/) and [additional detections](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/).
  * [Run screens](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#screen-criteria): Search, filter, reclassify, and bulk-move emails
* **Recommendations**: Suggested next steps to improve your configuration. For example, submitting misclassified emails for reclassification, creating policies, or protecting users at risk of [impersonation](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/).
* **Email security metrics**: Activity from the last seven days.
* **Recently modified policies**: A list of recently changed policies.
* **Education and resources**: Links to [implementation guides](https://developers.cloudflare.com/cloudflare-one/implementation-guides/), [Email security changelogs](https://developers.cloudflare.com/cloudflare-one/changelog/email-security/), and [API documentation ↗](https://developers.cloudflare.com/api/resources/email%5Fsecurity/subresources/investigate/methods/get/)

To access the Email security overview:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Go to **Email security** \> **Overview**.

---

## Troubleshooting

For help resolving common issues with Email Security, refer to [Troubleshoot Email Security](https://developers.cloudflare.com/cloudflare-one/email-security/troubleshooting/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/#page","headline":"Email security · Cloudflare One docs","description":"Overview of Email security in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
