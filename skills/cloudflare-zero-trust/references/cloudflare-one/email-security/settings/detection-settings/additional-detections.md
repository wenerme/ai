---
description: Additional detections in Email Security.
title: Additional detections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Additional detections

Last updated Aug 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Email security allows you to configure the following additional detections:

* Domain age
* Blank email detection
* [Automated Clearing House (ACH) ↗](https://en.wikipedia.org/wiki/Automated%5Fclearing%5Fhouse) change from free email detection
* HTML attachment email detection

To configure additional detections:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**.
4. On the **Settings** page, go to **Detection settings** \> **Additional detections**, and select **Edit**.

## Configure domain age

The domain age is the time since the domain has been registered.

Because of the domain age detection, [trusted domains](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/) can be used to create an exception to the age detection.

To configure a domain age:

1. On the **Edit additional detections** page:
  * Select **Malicious domain age**: Controls the threshold for a malicious disposition. Maximum of 100 days. It is recommended to set the **Malicious domain age** to 7 days.
  * Select **Suspicious domain age**: Controls the threshold for a suspicious disposition. Maximum of 100 days. It is recommended to set the **Suspicious domain age** between 30 and 45 days.
2. Select **Save**.

## Configure blank email detection

Blank email detection detects emails with blank bodies and assigns a default disposition. You can choose between **Malicious** and **Suspicious** as dispositions.

To enable blank email detection:

1. On the **Edit additional detections** page, enable **Blank email detection**.
2. Choose between **Malicious** and **Suspicious**.
3. Select **Save**.

## Configure ACH change from free email detection

[Automated Clearing House (ACH) ↗](https://en.wikipedia.org/wiki/Automated%5Fclearing%5Fhouse) is a banking term related to direct deposits. ACH change from free email detection detects payroll inquiries or change requests from free email domains and assigns a default disposition. You can choose between **Malicious** and **Suspicious** as dispositions.

To enable ACH change from free email detection:

1. On the **Edit additional detections** page, enable **ACH change from free email detection**.
2. Choose between **Malicious** and **Suspicious**.
3. Select **Save**.

## Configure HTML attachment email detection

HTML attachment email detection detects HTM and HTML attachments in emails and assigns a default disposition.

To enable HTML attachment email detection:

1. On the **Edit additional detections** page, enable **HTML attachment email detection**.
2. Choose between **Malicious** and **Suspicious**.
3. Select **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/#page","headline":"Additional detections · Cloudflare One docs","description":"Additional detections in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
