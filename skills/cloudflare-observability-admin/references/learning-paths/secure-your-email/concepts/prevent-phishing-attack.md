---
description: Detect phishing with AI and ML models.
title: How Cloudflare prevents email-based phishing attacks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# How Cloudflare prevents email-based phishing attacks

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-your-email/concepts/prevent-phishing-attack/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Email security uses a variety of factors to determine whether a given email message attachment, URL, or specific network traffic is part of a phishing campaign.

These small pattern assessments are dynamic in nature. Cloudflare's automated systems use a combination of factors to clearly distinguish between a valid phishing campaign and benign traffic.

Cloudflare's vast global network detects emergent campaign infrastructure and aggregates data for Cloudflare's proprietary analytics engine SPARSE.

SPARSE uses AI and ML models to make effective detections for all types of malicious emails, including Business Email Compromise (BEC).

In a BEC attack, the attacker falsifies an email message to trick the victim into performing some action - most often transferring money to an account or location the attacker controls.

To detect these low volume, malicious emails that do not contain malware, malicious links or email attachments, Cloudflare analyzes the email thread, content, sentiment and context via message lexical analysis, subject analysis and sender analysis. Display names are also compared with known executive names for similarity using several matching models.

Refer to [How we detect phish](https://developers.cloudflare.com/email-security/reference/how-we-detect-phish/#sample-attack-types-and-detections) to learn more about additional attack types and detections.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/concepts/prevent-phishing-attack/#page","headline":"How Cloudflare prevents email-based phishing attacks · Cloudflare Learning Paths","description":"Detect phishing with AI and ML models.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/concepts/prevent-phishing-attack/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
