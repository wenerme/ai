---
title: Business email compromise (BEC)
description: Attackers often try to impersonate executives within an organization when sending malicious emails (with requests about banking information, trade secrets, etc.).
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/enhanced-detections/business-email-compromise/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Business email compromise (BEC)

Attackers often try to impersonate executives within an organization when sending malicious emails (with requests about banking information, trade secrets, etc.).

The **Business email compromise (BEC)** feature protects against these attacks by adding [an attribute](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#attributes) to any spoofed email messages matching these sensitive email addresses. Information about key users you enter in the dashboard is used by Email security to run enhanced scan techniques and find these spoofed emails.

## Setup

You have several options for adding email addresses to BEC protection.

### Using the dashboard

Using the dashboard, you can add email addresses individually or upload a CSV file:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Enhanced Detections**.
4. Select **New Display Name**.
5. Enter an email address manually or upload a CSV file.

#### CSV uploads

You can also upload a CSV file of multiple email addresses. The CSV file must be smaller than 150 KB, start with a header row of all required values, and contain no additional fields.

An example file would look like this:

```

Display_Name, Email

Star Phish, star@nophish.com

Phish Ee, phishee@nophish.com


```

### Integrating a directory

If you want your BEC contacts automatically synced, Email security also supports directory integration for Microsoft and Gmail. Refer to [Office 365 directory guide](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/o365-directory-guide/) and [Google Workspaces directory integration](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/gworkspaces-directory-guide/) for more information.

### Review threats

Email security's dashboard has at-a-glance insights regarding BEC attacks, such as top email addresses targeted. Refer to [Statistics overview](https://developers.cloudflare.com/email-security/reporting/statistics-overview/) and [Types of malicious detections](https://developers.cloudflare.com/email-security/reporting/types-malicious-detections/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/enhanced-detections/","name":"Enhanced detections"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/enhanced-detections/business-email-compromise/","name":"Business email compromise (BEC)"}}]}
```
