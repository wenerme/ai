---
description: Connect your domains in Email Security.
title: Connect your domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Connect your domains

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

To connect your domains, you will need to [enable your Gmail BCC integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#enable-gmail-bcc-integration). Once you have enabled your Gmail BCC integration, the Cloudflare dashboard will redirect you to the **Set up Email security** page.

On the **Set up Email security** page:

1. **Connect domains**: Select at least one domain. Then, select **Continue**.
2. (**Optional**) **Add manual domains**: Select **Add domain name** to manually enter additional domains. Then, select **Continue**.
3. (**Optional**) **Adjust hop count**: Enter the number of hops. Then, select **Continue**. Configuring the hop count will determine where you want Cloudflare to sit in the email processing chain.
4. (**Optional**, select **Skip for now** to skip this step) **Move messages**: Refer to [Auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) to configure auto-moves. Then, select **Continue**.
5. **Select your processing location**: Configure where you want Cloudflare to process your email. **Global** will be the default option. If you choose **Global**, `<account tag>@CF-emailsecurity.com` will be your regional service address. Once you have chosen your processing location, select **Continue**. Refer to [Regional processing](https://developers.cloudflare.com/cloudflare-one/email-security/reference/regional-processing/) to learn more.
6. **Review details**: Review your connected domains and service addresses. Then, select **Go to domains.**

Your domains are now added successfully.

On the **Domains** page, select the three dots > **View integration**. The dashboard will display your [domain information](https://developers.cloudflare.com/cloudflare-one/email-security/settings/domain-management/domain/).

Under **Source**, the dashboard will display **Google integration**, along with the **Integration name**.

## Add additional domains

To add additional domains:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Email security** \> **Settings**.
2. Select **Connect an integration** \> **BCC/Journaling** \> **Integrate with Google** \> **Authorize**.
3. **Connect domains**: Select the domains you want to add, then select **Next**.
4. (Optional) Select **Add manual domains**: Enter additional domains manually, then select **Next**.
5. (Optional) Select **Adjust hop count**: Enter the number of hops.
6. **Review details**: Review your selected domains, then use the following email to configure the service address with your third-party email provider:
```txt
<account tag>@CF-emailsecurity.com
```
7. Select **Save**.

## Verify successful deployment

To verify that the deployment has been successful and that your emails are being scanned:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Under **Your domains**, locate your domain, and verify that **Status** (which describes the state of the configuration) displays **Active**.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/#page","headline":"Connect your domains · Cloudflare One docs","description":"Connect your domains in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
