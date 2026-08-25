---
description: Keycloak (SAML) in Zero Trust integrations.
title: Keycloak (SAML)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Keycloak (SAML)

Last updated Aug 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/keycloak/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Keycloak is an open source identity and access management solution built by JBoss.

## Set up Keycloak (SAML)

To set up Keycloak (SAML) as your identity provider:

1. In Keycloak, select the realm that you want Cloudflare Access to use.
2. Go to **Clients** \> **Create client**.
3. For **Client type**, select **SAML**.
4. Under **Client ID**, enter your Cloudflare Access callback URL:
```txt
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
```
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
5. Select **Next**.
6. Change **Name ID format** to **email**.
7. In **Valid redirect URIs**, enter your Cloudflare Access callback URL:
```txt
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
```
8. In **Master SAML Processing URL**, enter the SAML endpoint for your Keycloak realm:
```txt
https://<keycloak_domain>/realms/<realm_name>/protocol/saml
```
Keycloak v17 and later use `/realms/<realm_name>/protocol/saml` by default. Keycloak v16 and earlier may use `/auth/realms/<realm_name>/protocol/saml` instead.
9. If you wish to enable client signatures, enable **Client Signature Required** and select **Save**.

  1. You will need to [follow the steps here to get the certificate and enable it in the Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/signed%5Fauthn/).
  2. Import the Access certificate you downloaded into the **Keys** tab. Use **Certificate PEM** as the format.
10. Configure a protocol mapper for the user's email address.

  1. Go to **Clients** \> your Cloudflare Access SAML client > **Client scopes**.
  2. Select the dedicated client scope for the client.
  3. Go to **Mappers** \> **Add mapper** \> **By configuration**.
  4. Select **User Property**.
  5. Set **Property** to `email` and **SAML Attribute Name** to `email`.
Next, you will need to integrate with Cloudflare Access.
11. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
12. Under **Your identity providers**, select **Add new identity provider**.
13. Choose **SAML** on the next page.
You will need to input the Keycloak details manually. The examples below should be replaced with the specific domains in use with Keycloak and Cloudflare Access.

| Field                       | Example                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| Single Sign-On URL          | https://<keycloak\_domain>/realms/<realm\_name>/protocol/saml     |
| IdP Entity ID or Issuer URL | https://<unique\_id>.cloudflareaccess.com/cdn-cgi/access/callback |
| Signing certificate         | Use the X509 certificate from the Keycloak realm keys             |
14. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to the login method you want to test.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/keycloak/#page","headline":"Keycloak (SAML) · Cloudflare One docs","description":"Keycloak (SAML) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/keycloak/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
