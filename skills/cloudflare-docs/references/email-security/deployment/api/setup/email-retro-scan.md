---
title: Email Retro Scan
description: Email Retro Scan allows you to scan up to 14 days of old messages in your Office 365 (O365) inboxes and check if your current email security solution missed any threats. Contact your account manager to enable this feature.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/email-retro-scan.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Email Retro Scan

Email Retro Scan allows you to scan up to 14 days of old messages in your Office 365 (O365) inboxes and check if your current email security solution missed any threats. Contact your account manager to enable this feature.

Note

Email Security (formerly Area 1) supports Microsoft Office 365 Government Community Cloud (GCC). Refer to [Microsoft 365 Government Community Cloud](https://developers.cloudflare.com/email-security/reference/office365-gcc/) for more information.

## Scan for threats

To scan for threats in your Office 365 inbox:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Email security** \> **Retro Scan**.
3. Select **Generate report**.
4. Cloudflare needs authorization to access your O365 messages. Select **Authenticate with Microsoft**, and give Cloudflare the required permissions.
5. Back to Cloudflare dashboard, select **Grant mail access**. Then, select your account and give Cloudflare the required permissions.
6. Select **Grant directory sync access**.
7. Select your account and give Cloudflare the required permissions.
8. Select **Continue**.
9. In **Configure your report**, choose one or more domains to scan.
10. Under **Scan date range**, select the date range to perform the scan from the drop-down menu.
11. Choose your current email security system, from **Current email security system**.
12. Select **Continue**.
13. Select **Done**. Cloudflare will begin the task of analyzing all your emails for the chosen domains. This might take some time depending on the size of the inbox and number of domains chosen. You do not need to wait for the scan to complete. Cloudflare will send you an email alert when the scan is complete. If you decide to wait, select **View report** when the scan finishes.

## Analyze results

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Email security** \> **Retro Scan**.
3. Select **Scan report**. This tab shows the total number of emails scanned, a breakdown of the [threat types](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) found within the domains selected, the [top targeted employees](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/), and the most common places where threats originate from.
4. To create an offline copy of the threat report, select **Download Report**.
5. Select **View detections** to inspect emails found by Retro Scan. You can filter emails by threat type (for example, malicious).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/email-retro-scan/","name":"Email Retro Scan"}}]}
```
