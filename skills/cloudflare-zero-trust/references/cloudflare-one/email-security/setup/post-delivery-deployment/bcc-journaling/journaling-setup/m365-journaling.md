---
description: Microsoft 365 journaling setup in Email Security.
title: Microsoft 365 journaling setup
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Microsoft 365 journaling setup

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/m365-journaling/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Microsoft 365 journaling is a post-delivery setup method that ensures a copy of every incoming and outgoing email is forwarded to Cloudflare for analysis. When you create a [journal rule ↗](https://learn.microsoft.com/en-us/exchange/security-and-compliance/journaling/journaling#journal-rules) in the Microsoft Purview compliance portal, Cloudflare can scan messages that have already landed in your inbox.

The following diagram shows how this works:

![Email flow when setting up Microsoft 365 with Email security.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=606,height=466,format=webp/_astro/M365Deployment_Journaling.C-FeMlSK.png)

To enable Microsoft 365 journaling deployment:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Select **Overview**. If you have not purchased Email security, select **Contact Sales**. Otherwise, select **Set up** \> **BCC/Journaling**.
3. Select **Integrate with MS** \> **Authorize**.
4. Continue with [Integrate with Microsoft 365](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/m365-journaling/#1-integrate-with-microsoft-365) to connect your Microsoft integration.

## 1\. Integrate with Microsoft 365

To integrate with Microsoft 365:

1. **Name integration**: Add your integration name, then select **Continue**.
2. **Authorize integration**:
  * Select **Authorize**. Selecting **Authorize** will take you to the **Microsoft Sign in** page where you will have to enter your email address.
  * Once you enter your email address, select **Next**.
  * After selecting **Next**, the dashboard will show you a dialog box with a list of requested permissions. Select **Accept to authorize Email security**. Upon authorization, you will be redirected to a page where you can review details and enroll the integration.
3. **Review details**: Review your integration details, then:
  * Select **Complete Email security set up** where you will be able to connect your domains and configure auto-moves.
  * Select **Continue to Email security**.

Continue with [Connect your domains](#connect-your-domains) for the next steps.

### Connect your domains

On the **Set up Email security** page:

1. **Connect domains**: Select at least one domain. Then, select **Continue**.
2. (**Optional**) **Add manual domains**: Select **Add domain name** to manually enter additional domains. Then, select **Continue**.
3. (**Optional**) **Adjust hop count**: Enter the number of hops. Then, select **Continue**.
4. (**Optional**, select **Skip for now** to skip this step) **Move messages**: Refer to [Auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) to configure auto-moves. Then, select **Continue**.
5. **Select your processing location**: Configure where you want Cloudflare to [process your email](https://developers.cloudflare.com/cloudflare-one/email-security/reference/regional-processing/). **Global** will be the default option. If you choose **Global**, `<account tag>@CF-emailsecurity.com` will be your regional service address. Once you have chosen your processing location, select **Continue**.
6. **Review details**: Review your connected domains and service addresses. Then, select **Go to domains.**

Your domains are now added successfully.

To view your connected domains:

1. Go to **Settings**.
2. Locate your domain, select the three dots > **View domain**. Selecting **View domain** will display information about your domain.

## 2\. Configure journal rule

1. Log in to the [Microsoft Purview compliance portal ↗](https://compliance.microsoft.com/homepage).
2. On the sidebar, go to **Settings** (the gear icon) > **Data Lifecycle Management** \> **Exchange (legacy)**.
3. In **Send undeliverable journal reports to** enter the email address of a valid user account. Note that you cannot use a team or group address. Select **Save** once you entered the email address.
4. On the sidebar, go to **Solutions** \> **Data Lifecycle Management** \> **Exchange (legacy)**.
5. Select **Journal rules**.
6. Select **New rule** to configure a journaling rule, and configure it as follows:

  * **Send journal reports to**: This is the address you copied and pasted in step 5 of [Connect your domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/m365-journaling/#connect-your-domains).
  * **Journal rule name**: `Journal Messages to Email security`
  * **Journal messages sent or received from**: _Everyone_
  * **Type of message to journal**: _External messages only_
7. Select **Next**.
8. Verify the information is correct, and select **Submit** \> **Done**.

Once saved, the rule is automatically active. However, it may take a few minutes for the configuration to propagate and start pushing messages to Email security. After it propagates, you can [monitor your inbox](https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/) in the Cloudflare dashboard to check the number of messages processed. This number will grow as journaled messages are sent to Email security from your Exchange server.

## Verify successful deployment

To verify that the deployment has been successful and that your emails are being scanned:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Under **Your domains**, locate your domain, and verify that **Status** (which describes the state of the configuration) displays **Active**.

## Verify successful addition

To verift that your domain has been added successfully and that your emails are being scanned:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Under **Your domains**, locate your domain, and verify that **Status** is set to **Active**. The **Configured method** should be **BCC/Journaling**.

## Next steps

[Enable logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/) to send detection data to an endpoint of your choice.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/m365-journaling/#page","headline":"Microsoft 365 journaling setup · Cloudflare One docs","description":"Microsoft 365 journaling setup in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/m365-journaling/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
```
