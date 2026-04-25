---
title: How Cloudflare prevents email-based phishing attacks
description: Detect phishing with AI and ML models.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# How Cloudflare prevents email-based phishing attacks

Cloudflare Email security uses a variety of factors to determine whether a given email message attachment, URL, or specific network traffic is part of a phishing campaign.

These small pattern assessments are dynamic in nature. Cloudflare's automated systems use a combination of factors to clearly distinguish between a valid phishing campaign and benign traffic.

Cloudflare's vast global network detects emergent campaign infrastructure and aggregates data for Cloudflare's proprietary analytics engine SPARSE.

SPARSE uses AI and ML models to make effective detections for all types of malicious emails, including Business Email Compromise (BEC).

In a BEC attack, the attacker falsifies an email message to trick the victim into performing some action - most often transferring money to an account or location the attacker controls.

To detect these low volume, malicious emails that do not contain malware, malicious links or email attachments, Cloudflare analyzes the email thread, content, sentiment and context via message lexical analysis, subject analysis and sender analysis. Display names are also compared with known executive names for similarity using several matching models.

Refer to [How we detect phish](https://developers.cloudflare.com/email-security/reference/how-we-detect-phish/#sample-attack-types-and-detections) to learn more about additional attack types and detections.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/concepts/prevent-phishing-attack/","name":"How Cloudflare prevents email-based phishing attacks"}}]}
```
