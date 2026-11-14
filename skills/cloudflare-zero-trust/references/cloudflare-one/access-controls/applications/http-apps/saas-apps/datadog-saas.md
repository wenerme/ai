---
description: Integrate Datadog with Access.
title: Datadog
image: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/datadog-saas/og.png?v=8b27a515a9708ae1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Datadog

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/datadog-saas/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [Datadog ↗︎](https://docs.datadoghq.com/account_management/saml/) as a SAML application in Cloudflare One.

## Prerequisites

- An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
- Administrator access to a Datadog organization, or a custom role with the `Org Management` permission
- SAML turned on for your Datadog organization. If SAML is not available, contact [Datadog support ↗︎](https://docs.datadoghq.com/help/).

## 1. Get Datadog URLs

1. In Datadog, go to **Organization Settings** > **Login Methods**.
2. Under **SAML**, select **Configure**.
3. Copy the **Entity ID** and the **Assertion Consumer Service URL**. You will need these values when you configure the SaaS application in Cloudflare One.

The URLs depend on your [Datadog site ↗︎](https://docs.datadoghq.com/getting_started/site/). For example, on the US1 site the values are:

- **Entity ID**: `https://app.datadoghq.com/account/saml/metadata.xml`
- **Assertion Consumer Service URL**: `https://app.datadoghq.com/account/saml/assertion`

Note

To let users open Datadog from the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/), turn on IdP-initiated login in Datadog. Refer to [4. (Optional) Turn on IdP-initiated login](#4-optional-turn-on-idp-initiated-login).

## 2. Add a SaaS application to Cloudflare One

1. In a separate tab or window, open the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) and go to **Zero Trust** > **Access controls** > **Applications**.
2. Select **Create new application** > **SaaS application**.
3. For **Application**, select *Datadog*.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
   - **Entity ID**: Datadog **Entity ID**
   - **Assertion Consumer Service URL**: Datadog **Assertion Consumer Service URL**
   - **Name ID format**: *Email*

   Caution

   Datadog requests the `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` NameID format. Datadog uses the NameID as the Datadog username, and this username is the email address of the user.
7. (Optional) Add SAML attribute statements to update the user profile in Datadog. Datadog reads these attributes:

   | Name | Name format | IdP claim |
   | --- | --- | --- |
   | `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` | URI | `email` |
   | `urn:oid:2.5.4.42` | URI | The first name of the user |
   | `urn:oid:2.5.4.4` | URI | The last name of the user |

   The first attribute is `eduPersonPrincipalName`. If it is present, Datadog uses its value as the username instead of the NameID. Thus, its value must also be the email address of the user. The first name and last name claims must come from your identity provider. To learn more, refer to [Datadog supported attributes ↗︎](https://docs.datadoghq.com/account_management/saml/#supported-attributes).
8. (Optional) To map identity provider groups to Datadog roles or teams, use the `groups` attribute. To learn more, refer to [Datadog SAML group mapping ↗︎](https://docs.datadoghq.com/account_management/saml/mapping/).
9. Download your SAML metadata XML file from Access, and upload it to Datadog:
   1. Copy the **SAML Metadata endpoint**.
   2. In a separate browser window, go to the SAML Metadata endpoint ( `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/saml/xxx/saml-metadata`).
   3. Save the page as `access_saml_metadata.xml`.
10. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
11. Save the application.

## 3. Complete Datadog configuration

1. Return to **Organization Settings** > **Login Methods** > **SAML** in Datadog.
2. Select **Add SAML**.
3. Enter a name for this SAML provider, for example `Cloudflare Access`. Users see this name when they select a login method.
4. Upload your `access_saml_metadata.xml` file.
5. Select **Save**.

Datadog shows a **Single Sign-on URL** at the top of the SAML configuration page. Users go to this URL to start an SP-initiated login.

Important

Access for SaaS does not currently support [SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/). Make sure that:

1. Users exist in your identity provider and in Datadog, or [Just-in-time (JIT) provisioning ↗︎](https://docs.datadoghq.com/account_management/saml/#just-in-time-jit-provisioning) is on in Datadog.
2. The Datadog username of each user is the same as the email address in your identity provider.

## 4. (Optional) Turn on IdP-initiated login

IdP-initiated login lets users open Datadog from the App Launcher.

1. In Datadog, go to the SAML configuration page.
2. Under **Additional Features**, select **Identity Provider (IdP) Initiated Login**.
3. Select **Save Changes**.
4. Copy the new **Assertion Consumer Service URL**. This URL contains `/id/` followed by your company ID. For example, `https://app.datadoghq.com/account/saml/assertion/id/<company-id>`.
5. In Cloudflare One, edit the Datadog application.
6. Replace the **Assertion Consumer Service URL** with the new URL.
7. Save the application.

If you do not update the URL, Datadog cannot associate the assertion with your organization. Datadog then shows an error that the SAML response is missing the `InResponseTo` attribute.

## 5. Test the integration

1. Open an incognito browser window.
2. Go to the Datadog **Single Sign-on URL**.

Datadog redirects you to the Cloudflare Access login screen. Sign in with your identity provider. After authentication, Access redirects you to Datadog.

When the login works, you can make the organization [SAML strict ↗︎](https://docs.datadoghq.com/account_management/saml/#saml-strict). In **Login Methods**, turn off the other login methods. Users then must log in with SAML.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/datadog-saas/#page","headline":"Datadog","description":"Integrate Datadog with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/datadog-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/datadog-saas/og.png?v=8b27a515a9708ae1","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
