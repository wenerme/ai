---
description: Enable Gmail BCC integration in Email Security.
title: Enable Gmail BCC integration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Gmail BCC integration

Last updated Jun 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide describes the process for enabling Email security with Google Workspace. It requires setting up a [service account ↗](https://docs.cloud.google.com/iam/docs/service-account-overview) and a JSON key in Google Cloud Platform (GCP), followed by configuring domain-wide delegation in the Google Workspace Admin Console to authorize the integration.

## Prerequisites

To use Email security, you will need to have:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization)
* A domain to protect

## Enable Gmail BCC integration:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Overview**. Select one of the following options:
* If you have not purchased Email security, select **Contact sales**.
* If you have not associated any integration:
  * Select **Set up**, then choose **BCC/Journaling**.
  * Select **Integrate with Google** \> **Authorize**.
  * Name your integration, then select **Next**.
  * Go to [step 1](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#1-create-a-service-account-in-your-gcp-project) to continue the process of associating an integration.
* If you have associated an integration, but have not connected a domain:
  * Select **Connect a domain**.
  * Choose **BCC/Journaling** \> **Integrate with Google**.
  * Refer to [Connect your domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/) to connect your domain(s).

### 1\. Create a Service Account in your GCP Project

1. Once you have named your integration, select **Next**.
2. On the [Google Cloud Console ↗](https://console.cloud.google.com/welcome/new), go to the sidebar, select **APIs & Services**, then select **Credentials**.
3. Select **CREATE CREDENTIALS** \> **Service account**. Refer to [Service accounts overview ↗](https://docs.cloud.google.com/iam/docs/service-account-overview) to learn more about service accounts.
4. Fill in the details to create a service account:
  * **Service account name**: Enter `Cloudflare Google Integration`.
  * **Service account ID**: Enter `cloudflare-google-integration`.
  * **Service account description**: Enter `Cloudflare Google Integration`.
  * Select **CREATE AND CONTINUE**.

### 2\. Create a JSON Key for your Service Account

On the [Google Cloud Console ↗](https://console.cloud.google.com/welcome/new):

1. On the sidebar, select **IAM & Admin** \> **Service Accounts**.
2. Locate your email, select the three dots, then select **Manage keys**.
3. Select **Add key** \> **Create new key**.
4. Select **JSON** \> Select **CREATE**. This downloads a `.json` file which you will use when [uploading a JSON key](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#3-upload-json-key).

### 3\. Upload JSON Key

On the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com/), upload the `.json` file downloaded on step 3.

### 4\. Enable Necessary Google Workspace APIs in GCP

Enable the following APIs on the Google Cloud Console:

* [Google Calendar API ↗](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=winter-surf-439414-h1)
* [Google Drive API ↗](https://console.cloud.google.com/apis/library/drive.googleapis.com?project=winter-surf-439414-h1)
* [Google Admin SDK API ↗](https://console.cloud.google.com/apis/library/admin.googleapis.com?project=winter-surf-439414-h1)
* [Gmail API ↗](https://console.cloud.google.com/apis/library/gmail.googleapis.com?project=winter-surf-439414-h1)
* [Google Service Usage API ↗](https://console.cloud.google.com/apis/library/serviceusage.googleapis.com?project=winter-surf-439414-h1)

### 5\. Log in to Google Workspace Admin Console

Log in to Google Workspace Admin Console: Enter your password and log in to the Google Workspace Admin Console.

### 6\. Create a Domain-Wide Delegation API Client

1. Copy the **Client ID** and **Scopes** displayed on the Cloudflare One dashboard.
2. On Google Admin, go to **Security** \> **Access and data control** \> **API controls**.
3. Select **MANAGE DOMAIN WIDE DELEGATION** \> **Add new**.
4. Use the Client ID and copy the scopes to create a new API client. Refer to [Delegate domain-wide authority to your service account ↗](https://cloud.google.com/chronicle/docs/soar/marketplace-integrations/google-alert-center?%5Fgl=1%2Askktsb%2A%5Fga%2AMTMxODg5NDExMy4xNzI5NjA1MzYy%2A%5Fga%5FWH2QY8WWF5%2AMTcyOTc3MDg2Ny40LjEuMTcyOTc3MDg5OC4yOS4wLjA.#delegate%5Fdomain-wide%5Fauthority%5Fto%5Fyour%5Fservice%5Faccount). Then, select **Next**.

### 7\. Confirm Workspace Administrator Email

Enter the email associated with the Google Workspace Administrator account. Your email must match the email associated with your Google Workspace account, or else your integration will not work.

### 8\. Create integration

1. Select **Create integration**.
2. Once you created your integration, you will be redirected to the **Review details** page, where you will be able to review **Integration details**.
3. Review your details, then select **Complete Email security set up** \> **Continue to Email security**.

## Verify integration

To verify that the integration has been successful:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations**.
2. Under **Your integrations**, locate your integration, and ensure that the integration displays **CASB+EMAIL** under **Type**.

Note

If you do not reach the step to complete the Email security set up:

1. Go to **Integrations** \> **Cloud & SaaS Integrations** \> **Integrations**.
2. Delete the integration, if present. Locate your integration, select **Configure**, then select **Delete**.
3. Follow the steps from the beginning to [enable Gmail BCC integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#enable-gmail-bcc-integration).

## Next steps

Now that you have created an integration:

* [Connect your domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/) for Email security to start scanning your inbox.
* [Enable logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/) to send detection data to an endpoint of your choice.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#page","headline":"Enable Gmail BCC integration · Cloudflare One docs","description":"Enable Gmail BCC integration in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
```
