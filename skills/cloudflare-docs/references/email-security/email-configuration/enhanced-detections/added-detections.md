---
title: Added Detections
description: With Added Detections, you can manage various configurations applied at the time of analyzing email traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/enhanced-detections/added-detections.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Added Detections

With **Added Detections**, you can manage various configurations applied at the time of analyzing email traffic.

These settings apply particularly to trusted business partners that your organization may do business with (vendors, external providers, and more).

## Available configurations

| Feature                                                                                              | Description                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Malicious Domain Age                                                                                 | Controls the threshold for a **Malicious** [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#dispositions) based on domain age. Maximum of 120 days.                                               |
| Suspicious Domain Age                                                                                | Controls the threshold for a **Suspicious** [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#dispositions) based on domain age. Maximum of 120 days.                                              |
| Encrypted Attachment Scanning                                                                        | Auto-scans encrypted attachments to detect sophisticated malware campaigns.                                                                                                                                                                            |
| Anti-Spam Engine                                                                                     | Detects bulk emails or unsolicited commercial emails and marks them with a **Bulk** [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#dispositions).                                               |
| Active Fraud Prevention                                                                              | Inspects and assesses new domain traffic that could be launched from third-party partners or similar organizations.                                                                                                                                    |
| Blank Email Detection                                                                                | Detects emails with blank bodies and assigns a default disposition. You can choose between **Malicious** and **Suspicious** as [dispositions](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#dispositions).   |
| [ACH ↗](https://en.wikipedia.org/wiki/Automated%5Fclearing%5Fhouse) change from free email detection | Detects payroll inquiries or change requests from free email domains. You can choose between **Malicious** and **Suspicious** as [dispositions](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#dispositions). |
| HTML attachment email detection                                                                      | Detects HTM and HTML attachments in emails. You can choose between **Malicious** and **Suspicious** as [dispositions](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#dispositions).                           |

## Access Added Detections

To access **Added Detections** and potentially adjust your settings:

1. Log in to the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Enhanced Detections** \> **Added Detections**.

From this view, you can adjust [various configurations](#available-configurations).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/enhanced-detections/","name":"Enhanced detections"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/enhanced-detections/added-detections/","name":"Added Detections"}}]}
```
