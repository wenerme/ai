---
description: Connect authentik to Cloudflare Access as a SAML 2.0 identity provider.
title: authentik (SAML)
image: https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/authentik-saml/og.png?v=3bb21fac756c7da9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# authentik (SAML)

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/authentik-saml/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect authentik to Cloudflare Access with Security Assertion Markup Language (SAML) 2.0.

## Prerequisites

- An authentik account with administrator access
- A Cloudflare account with Zero Trust access
- A publicly accessible authentik deployment with a trusted TLS certificate

## 1. Create an application in authentik

Your Cloudflare Access team name is part of the Assertion Consumer Service (ACS) URL. Locate your team name before you configure authentik.

You can find your team name in the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com) under **Settings** > **Team name and domain** > **Team name**.

1. Log in to authentik as an administrator and open the Admin interface.
2. Go to **Applications** > **Applications** and select **New Application**.
3. Enter the application details and select **Next**.
4. For the provider type, select **SAML Provider**.
5. Configure the provider:
   1. Enter a provider name and select an authorization flow.
   2. For **ACS URL**, enter:

      ```txt
      https://<YOUR_TEAM_NAME>.cloudflareaccess.com/cdn-cgi/access/callback
      ```

   3. For **Audience**, enter the same Cloudflare Access callback URL.
   4. Select a **Signing Certificate** and keep **Sign assertions** turned on.
   5. For **Service Provider Binding**, select *Post*.
   6. For **Default NameID Policy**, select *Email address*.
6. Select **Create Application**.

For more information about authentik provider settings, refer to [Create a SAML provider ↗︎](https://docs.goauthentik.io/add-secure-apps/providers/saml/create-saml-provider/).

## 2. Get the authentik provider details

1. In the authentik Admin interface, go to **Applications** > **Providers**.
2. Select the SAML provider that you created for Cloudflare Access.
3. Record the following values. Replace `<AUTHENTIK_DOMAIN>` with your authentik hostname and `<APPLICATION_SLUG>` with the associated application slug.

   | Cloudflare field | authentik value |
   | --- | --- |
   | Single Sign-On URL | `https://<AUTHENTIK_DOMAIN>/application/saml/<APPLICATION_SLUG>/` |
   | IdP Entity ID or Issuer URL | `https://<AUTHENTIK_DOMAIN>/application/saml/<APPLICATION_SLUG>/metadata/` |
4. Under **Download signing certificate**, select **Download**. Save the certificate for the Cloudflare configuration.

The metadata tab also contains the SAML endpoint, entity ID, and signing certificate. For more information, refer to [SAML Provider ↗︎](https://docs.goauthentik.io/add-secure-apps/providers/saml/).

## 3. Add authentik to Cloudflare Access

1. In Cloudflare Zero Trust, go to **Integrations** > **Identity providers**. [Go to **Identity providers** ↗](https://one.dash.cloudflare.com/?to=/:account/one/integrations/identity-providers)
2. Select **Add new identity provider** > **SAML**.
3. Enter a name for the identity provider.
4. Enter the **Single Sign-On URL** and **IdP Entity ID or Issuer URL** from authentik.
5. For **Signing certificate**, paste the certificate downloaded from authentik.
6. Select **Save**.

Caution

Access cannot verify SAML responses after the authentik signing certificate expires or changes. Update the certificate in Cloudflare Access before you rotate it in authentik.

## 4. Test the integration

1. In Cloudflare Zero Trust, go to **Integrations** > **Identity providers**. [Go to **Identity providers** ↗](https://one.dash.cloudflare.com/?to=/:account/one/integrations/identity-providers)
2. Find the authentik identity provider and select **Test**.
3. Complete the authentik login flow.
4. Verify that Cloudflare displays a successful test result and the expected email address.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/authentik-saml/#page","headline":"authentik (SAML)","description":"Connect authentik to Cloudflare Access as a SAML 2.0 identity provider.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/authentik-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/authentik-saml/og.png?v=3bb21fac756c7da9","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
