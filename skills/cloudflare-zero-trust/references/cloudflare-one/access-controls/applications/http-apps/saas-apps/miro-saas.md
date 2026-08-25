---
description: Integrate Miro with Access.
title: Miro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Miro

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/miro-saas/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [Miro ↗](https://help.miro.com/hc/articles/360017571414-Single-sign-on-SSO) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Miro Business or Enterprise plan account
* A [verified domain ↗](https://help.miro.com/hc/articles/360034831793-Domain-control) added to your Miro account (Enterprise plan), or be prepared to do so during SSO configuration (Business or Enterprise plan)

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `Miro` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
  * **Entity ID**: `https://miro.com/`
  * **Assertion Consumer Service URL**: `https://miro.com/sso/saml`
  * **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add a SAML SSO provider to Miro

1. In Miro, select your profile picture > **Settings** \> **\*\*Security\*\***.
2. Turn on **SSO/SAML**.
3. Fill in the following fields:
  * **SAML Sign-in URL**: SSO endpoint from application configuration in Cloudflare One
  * **Key x509 Certificate**: Public key from application configuration in Cloudflare One
4. In **Domain**, enter the domain you want to configure SSO for and select **Enter**.
5. Enter an email address from that domain and select **send verification**.
6. Once you receive a verification email, select the link in the email, then select **Save**. When the domain is successfully configured, the **VERIFY EMAIL** label next to the domain in the SSO/SAML configuration page will disappear.
7. If you have additional domains you want to configure SSO for, repeat steps 4-6 for each domain.

1. In Miro, select your profile picture > **Settings** \> **\*\*Security and Compliance\*\* > \*\*Authentication\*\* > \*\*Single sign-on\*\***.
2. Turn on **SSO/SAML**.
3. Fill in the following fields:
  * **SAML Sign-in URL**: SSO endpoint from application configuration in Cloudflare One
  * **Key x509 Certificate**: Public key from application configuration in Cloudflare One
4. In **Domain**, enter the domain you want to configure SSO for and select **Enter**.
5. If you have not previously \[verified the domain\](https://help.miro.com/hc/articles/360034831793-Domain-control), enter an email address from that domain and select **send verification**.
6. Once you receive a verification email, select the link in the email, then select **Save**. When the domain is successfully configured, the **VERIFY EMAIL** label next to the domain in the SSO/SAML configuration page will disappear.
7. If you have additional domains you want to configure SSO for, repeat steps 4-6 for each domain.

## 3\. Test the integration

In the Miro SAML/SSO configuration page, select **Test SSO Configuration**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. If the login is successful, you will receive a **SSO configuration test was successful** message.

Note

When testing the integration, you do not have to use an email from a domain you have configured for SSO or a user configured in Miro. The only requirement is that the user is already configured in your identity provider.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/miro-saas/#page","headline":"Miro · Cloudflare One docs","description":"Integrate Miro with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/miro-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
