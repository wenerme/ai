---
description: Integrate Digicert with Access.
title: Digicert
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Digicert

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/digicert-saas/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [Digicert ↗](https://docs.digicert.com/en/certcentral/manage-account/saml-admin-single-sign-on-guide/configure-saml-single-sign-on.html) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Digicert account
* [SAML ↗](https://docs.digicert.com/en/certcentral/manage-account/saml-admin-single-sign-on-guide/saml-single-sign-on-prerequisites.html) enabled in your Digicert account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `Digicert` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
  * **Entity ID**: `https://www.digicert.com/account/sso/metadata`
  * **Assertion Consumer Service URL**: `https://www.digicert.com/account/sso/`
  * **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add a SAML SSO provider in Digicert

1. In Digicert, select **Settings** \> **Single Sign-On** \> **Set up SAML**.
2. Under **How will you send data from your IDP?**, turn on **Use a dynamic URL**.
3. Under **Use a dynamic URL**, paste the SAML Metadata endpoint from application configuration in Cloudflare One.
4. Under **How will you identify a user?**, turn on **NameID**.
5. Under **Federation Name**, enter a name (for example, `Cloudflare Access`). Your users will select this name when signing in.
6. Select **Save SAML Settings**.

## 3\. Test and Enable SSO in Digicert

1. In Digicert, select **Settings** \> **Single Sign-On**.
2. Copy the **SP Initiated Custom SSO URL**.
3. Paste the URL into an incognito browser window and sign in. Upon successful sign in, SAML SSO is fully enabled.
4. (Optional) By default, users can choose to sign in directly or with SSO. To require SSO sign in, go to **Account** \> **Users**. Turn on **Only allow this user to log in through SAML/OIDC SSO** in the user details of the desired user.

Note

Users can sign in using service provider initiated SSO by using the **SP Initiated Custom SSO URL**. Alternatively, users can go to `www.digicert.com/account`, select **Sign in with SSO**, and enter the name of the identity provider configured in step [2\. Add a SAML SSO provider in Digicert](#2-add-a-saml-sso-provider-in-digicert).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/digicert-saas/#page","headline":"Digicert · Cloudflare One docs","description":"Integrate Digicert with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/digicert-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
