---
description: Amazon Cognito in Zero Trust integrations.
title: Amazon Cognito
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Amazon Cognito

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/awscognito-oidc/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Amazon Cognito provides SSO identity management for end users of web and mobile apps. You can integrate Amazon Cognito as an OIDC identity provider for Cloudflare One.

## Prerequisites

* An Amazon Cognito [user pool ↗](https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html)

## Set up Amazon Cognito (OIDC)

### 1\. Obtain Amazon Cognito settings

The following Amazon Cognito values are required to set up the integration:

* App (client) ID
* Client secret
* Auth URL
* Token URL
* Certificate (key) URL

To retrieve those values:

1. Log in to your Amazon Cognito admin portal.
2. Go to **User pools** and select your user pool.
3. Select the **App integration** tab.
4. Under **Domain**, copy your user pool domain or [configure a new domain ↗](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-assign-domain.html).
5. Make note of the following [Amazon Cognito OIDC endpoints ↗](https://docs.aws.amazon.com/cognito/latest/developerguide/federation-endpoints.html):

  * **Auth URL**: `https://<your user pool domain>/oauth2/authorize`
  * **Token URL**: `https://<your user pool domain>/oauth2/token`
  * **Certificate (key) URL**: `https://cognito-idp.<region>.amazonaws.com/<your user pool ID>/.well-known/jwks.json` (This is the **Token signing key URL** shown in **User pool overview**.)
6. Under **App client list**, select **Create app client**.
7. For **App type**, select **Confidential client**.
8. Enter an **App client name** for your application.
9. Ensure that **Generate a client secret** is selected.
10. Configure the following **Hosted UI settings**:

  1. In **Allowed callback URLs**, add the following URL:
  ```txt
  https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
  ```
  You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
  2. Select **Identity providers** to use with this app client. At minimum, enable **Cognito user pool** as a provider.
  3. For **OAuth 2.0 grant types**, select **Authorization code grant**.
  4. For **OpenID Connect scopes**, select **OpenID**, **Email**, and **Profile**.
11. Select **Create app client**.
12. Next, select the app client you just created.
13. Copy its **Client ID** and **Client secret**.

### 2\. Add Amazon Cognito as an identity provider

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **OpenID Connect**.
4. Name your identity provider and fill in the required fields with the information obtained from Amazon Cognito.
5. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
6. (Optional) Under **Optional configurations**, enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to users' identity.
7. Select **Save**.

To [test](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) that your connection is working, select **Test**.

## Example API Configuration

```json
{
	"config": {
		"client_id": "<your client id>",
		"client_secret": "<your client secret>",
		"auth_url": "https://<your user pool domain>/oauth2/authorize",
		"token_url": "https://<your user pool domain>/oauth2/token",
		"certs_url": "https://cognito-idp.<region>.amazonaws.com/<your user pool ID>/.well-known/jwks.json",
		"scopes": ["openid", "email", "profile"],
		"claims": ["sub", "cognito:username", "name", "cognito:groups"]
	},
	"type": "oidc",
	"name": "Amazon Cognito example"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/awscognito-oidc/#page","headline":"Amazon Cognito · Cloudflare One docs","description":"Amazon Cognito in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/awscognito-oidc/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS"]}
```
