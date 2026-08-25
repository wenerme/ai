---
description: Cloud and SaaS findings in Cloudflare One.
title: Cloud and SaaS findings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloud and SaaS findings

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Availability

Available for all Zero Trust users.

Free users can configure up to two CASB integrations. You must upgrade to an Enterprise plan to view the details of a finding instance.

Cloudflare's [Cloud Access Security Broker ↗](https://www.cloudflare.com/learning/access-management/what-is-a-casb/) (CASB) connects to SaaS application and cloud environment APIs to scan for security issues that can occur after a user has successfully logged in. These include misconfigurations (such as overly permissive sharing settings), unauthorized user activity, [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/), and other data security issues.

For a list of available findings, refer to [Cloud and SaaS integrations](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/). You can also send posture finding instances to external systems with [CASB webhooks](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/).

## Manage CASB integrations

When you integrate a third-party SaaS application or cloud environment with Cloudflare CASB, you allow CASB to make API calls to its endpoint and read relevant data on your behalf. The CASB integration permissions are read-only and follow the least privileged model. In other words, only the minimum access required to perform a scan is granted.

### Prerequisites

Before you can integrate a SaaS application or cloud environment with CASB, your account with that integration must meet certain requirements. Refer to the SaaS application or cloud environment's [integration guide](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) to learn more about the prerequisites and permissions.

### Add an integration

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Select **Connect an integration** or **Add integration**.
3. Browse the available integrations and select the application you would like to add.
4. Follow the step-by-step integration instructions in the UI.
5. To run your first scan, select **Save integration**.

After the first scan, CASB will automatically scan your SaaS application or cloud environment on a frequent basis to keep up with any changes. Scan intervals will vary due to each application having their own set of requirements, but the frequency is typically between every 1 hour and every 24 hours.

Once CASB detects at least one finding, you can [view and manage your findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/).

### Pause an integration

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Find the integration you would like to pause and select **Configure**.
3. To stop scanning the application, turn off **Scan for findings**.
4. Select **Save integration**.

You can resume CASB scanning at any time by turning on **Scan for findings**.

### Delete an integration

Caution

When you delete an integration, all keys and OAuth data will be deleted. This means you cannot restore a deleted integration or its scanned data.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Find the integration you would like to delete and select **Configure**.
3. Select **Disenroll**.

To resume scanning the integration for findings, you will need to [add the integration](#add-an-integration) again.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/#page","headline":"Cloud and SaaS findings · Cloudflare One docs","description":"Cloud and SaaS findings in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
```
