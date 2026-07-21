---
description: Integrate ServiceNow (SAML) with Access.
title: ServiceNow (SAML)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  ServiceNow (SAML)

Last updated May 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [ServiceNow ↗](https://docs.servicenow.com/bundle/washingtondc-platform-security/page/integrate/single-sign-on/task/t%5FCreateASAML2Upd1SSOConfigMultiSSO.html) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a ServiceNow account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `ServiceNow` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
  * **Entity ID**: `https://<INSTANCE-NAME>.service-now.com`
  * **Assertion Consumer Service URL**: `https://<INSTANCE-NAME>.service-now.com/navpage.do`
  * **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add the Multiple Provider Single Sign-On Installer Plugin to ServiceNow

1. In ServiceNow, select **All**.
2. In the search bar, enter `System Applications`, and under **All Available Applications**, select **All**.
3. In the search bar, enter `Integration - Multiple Provider Single Sign-On Installer`.
4. Select **Install**.
5. Ensure that **Install now** is selected, and select **Install**.

## 3\. Add and Test a SAML SSO provider in ServiceNow

1. Select **All**.
2. In the search bar enter `Multi-Provider SSO`, and select **Identity Providers**.
3. Select **New** \> **SAML**.
4. In the pop-up, ensure that **URL** is selected.
5. Paste the **SAML Metadata endpoint** from application configuration in Cloudflare One in the empty field.
6. Select **Import**.
7. (Optional) Change the **Name** field to a more recognizable name.
8. Turn off **Sign AuthnRequest**.
9. Select **Update**.
10. In the pop-up, select **Cancel** and then **\>**.
11. Select the **Name** of the configuration you just completed.
12. Select **Test Connection**.
13. If the test succeeds, select **Activate**.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/#page","headline":"ServiceNow (SAML) · Cloudflare One docs","description":"Integrate ServiceNow (SAML) with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","ServiceNow"]}
```
