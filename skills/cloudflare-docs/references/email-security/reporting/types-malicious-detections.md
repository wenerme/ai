---
title: Types of malicious detections
description: Types of malicious detections shows you information related to the number and types of malicious detections made on your account.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/types-malicious-detections.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Types of malicious detections

To review the number and type of malicious detections made on your account:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/users/login).
2. Select the **Email** tab.
3. The **Overview** section will show you graphs with the total number of emails processed, as well as how many of those pertain to different threat categories - such as Malicious or Spam, among others. Refer to [Dispositions and attributes](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) for more information. Select **View Details**.
4. You will open the **Detections** page. This page breaks down the information regarding the various types of threats detected. You have access to:

| Field              | Description                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Attachments**    | How many of the malicious emails received have an attachment. Of these, what are the top types of malicious files received (for example, PDF files).         |
| **Senders**        | Total number of malicious senders, as well as a graph showing how they are distributed throughout the month. Top malicious domains.                          |
| **Targets**        | Top email targets on the [BEC feature](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/). |
| **New domains**    | Total number of malicious domains registered in the past month. Most common top level malicious domains.                                                     |
| **Links**          | Total number of malicious links and their distribution throughout the month. Top threat types (for example, credential harvester).                           |
| **Threat types**   | Top malicious threat types, and their percentage relatively to the total amount of threats received.                                                         |
| **Threat origins** | A graph representing where in the world are your top threat origins.                                                                                         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/types-malicious-detections/","name":"Types of malicious detections"}}]}
```
