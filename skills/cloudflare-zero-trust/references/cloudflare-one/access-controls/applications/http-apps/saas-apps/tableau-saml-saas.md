---
description: Integrate Tableau Cloud with Access.
title: Tableau Cloud
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Tableau Cloud

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/tableau-saml-saas/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [Tableau Cloud ↗](https://help.tableau.com/current/online/en-us/saml%5Fconfig%5Fsite.htm) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Tableau Cloud site

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Tableau_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Copy the **SAML Metadata endpoint**.
7. Keep this window open. You will finish this configuration in step [4\. Finish adding a SaaS application to Cloudflare One](#4-finish-adding-a-saas-application-to-cloudflare-one).

## 2\. Download the metadata file

1. Paste the SAML Metadata endpoint from application configuration in Cloudflare One in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3\. Add a SAML SSO provider to Tableau Cloud

1. In Tableau Cloud, go to **Settings** \> **Authentication**.
2. Turn on **Enable an additional authentication method**. For **select authentication type**, select _SAML_.
3. Under **1\. Get Tableau Cloud metadata**, copy the **Tableau Cloud entity ID** and **Tableau Cloud ACS URL**.
4. Under **4\. Upload metadata to Tableau**, select **Choose a file**, and upload the `.xml` file created in step [2\. Download the metadata file](#2-download-the-metadata-file)
5. Under **5\. Map attributes**, turn on **Full name**. For **Name (full name)**, enter `name`.
6. (Optional) Choose whether users who are accessing embedded views will **Authenticate in a separate pop-up window** or **Authenticate using an inline frame**.
7. Select **Save Changes**.

## 4\. Finish adding a SaaS application to Cloudflare One

1. In your open Cloudflare One window, fill in the following fields:
  * **Entity ID**: Tableau Cloud entity ID from Tableau Cloud SAML SSO set-up.
  * **Assertion Consumer Service URL**: Tableau Cloud ACS URL from Tableau Cloud SAML SSO set-up.
  * **Name ID format**: _Email_
2. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
3. Save the application.

## 5\. Test the integration and set default authentication type

1. In Tableau Cloud, go to **Settings** \> **Authentication**.
2. Under **7\. Test Configuration**, select **Test Configuration**.
3. Sign in. If your sign-in is successful, **You are now signed in as (username)** will appear at the top of the page.
4. Close the pop-up window.
5. (Optional) Under **Default Authentication Type for Embedded Views**, turn on **cloudflareaccess.com (SAML)**. You can also configure the default authentication type for individual users under **Users** \> **Actions** \> **Authentication**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/tableau-saml-saas/#page","headline":"Tableau Cloud · Cloudflare One docs","description":"Integrate Tableau Cloud with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/tableau-saml-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
