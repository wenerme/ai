---
title: Statistics overview
description: Statistics overview allows you to have an at-a-glance overview of emails processed and number of threats detected.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/statistics-overview.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Statistics overview

To access an overview of your account, total number of emails processed, a breakdown of types of threads detected, among other types of information:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/users/login).
2. Make sure you are in the Home section to review information regarding your account:

| Field                       | Description                                                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **System stats**            | Status of Area 1’s services Uptime of Area 1’s services as well as any downtime Number of processed emails and attacks prevented                                                                          |
| **Detection stats**         | Statistics regarding the total number of detections made, and emails processed.                                                                                                                           |
| **Retractions**             | Shows the distribution of messages removed from your user's mailboxes.                                                                                                                                    |
| **Phish Submissions Stats** | Statistics regarding the number of phish emails submitted by your users and security operations center (SOC)                                                                                              |
| **Threat Origins**          | Top geographical threat origins to your organization.                                                                                                                                                     |
| **Org Spoofs**              | Shows attacks where names in envelopes differ from the header, as well as spoofed domains.                                                                                                                |
| **Domain Proximity**        | List of domains similar to your own.                                                                                                                                                                      |
| **Malicious Threat Type**   | Breakdown of malicious threat types.                                                                                                                                                                      |
| **Email Link Isolation**    | How many email were processed by [Email Link Isolation](https://developers.cloudflare.com/email-security/email-configuration/email-policies/link-actions/#email-link-isolation).                          |
| **Top BEC Targets**         | What email addresses are the top targets on the [Business Email Compromise feature](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/). |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/statistics-overview/","name":"Statistics overview"}}]}
```
