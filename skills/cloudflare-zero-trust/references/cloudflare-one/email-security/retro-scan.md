---
description: Retro Scan in Email Security.
title: Retro Scan
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Retro Scan

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/email-security/retro-scan/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use Retro Scan to check whether your current email security provider has missed any threats. Cloudflare scans up to 14 days of emails in your Microsoft 365 mailbox and generates a report of malicious messages. Once the scan is complete, you will receive an email notification with a link to the report.

Note

Retro Scan is only available for Microsoft 365 accounts.

To start a free scan:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Overview**.
3. Select **Start a free scan** \> **Generate report**.
4. Enable your [Microsoft integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#enable-microsoft-integration). Once you have enabled your Microsoft integration, you will be redirected to a page where you will add your domains and specify your current email security system.
5. Generate Retro Scan report:
  * **Connect domains**: Select at least one domain from your integration, then select **Continue**.
  * **Select current solution**: Select the email security tool you are currently using, then select **Continue**.
  * **Review details**: Confirm the domain and current solution you selected, then select **Continue**. You will receive an email notification once the report is ready.
6. When you receive the notification email, select the link to view the full report.
7. On the Cloudflare dashboard, select **View report**.

The dashboard will display **Overview** and **Details** pages.

### Overview

The **Overview** page shows a summary of the scan results across your selected domains, including:

* [Disposition evaluation](https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/#disposition-evaluation), the verdict assigned to each scanned message (for example: malicious, suspicious, or spam)
* Malicious threat types
* Malicious targets, the top recipients targeted by malicious messages
* Malicious threat origins

### Details

The **Details** page lists up to 1,000 emails that were assigned a disposition during the scan. Select any email to review [details](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#details) about the message.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/retro-scan/#page","headline":"Retro Scan · Cloudflare One docs","description":"Retro Scan in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/retro-scan/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
```
