---
description: PingOne in Zero Trust integrations.
title: PingOne
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# PingOne

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingone-oidc/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The PingOne cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as an OIDC identity provider.

## Set up PingOne as an OIDC provider

### 1\. Create an application in PingOne

1. In your PingIdentity environment, go to **Connections** \> **Applications**.
2. Select **Add Application**.
3. Enter an **Application Name**.
4. Select **OIDC Web App** and then **Save**.
5. Select **Resource Access** and add the **email** and **profile** scopes.
6. In the **Configuration** tab, select **General**.
7. Copy the **Client ID**, **Client Secret**, and **Environment ID** to a safe place. These IDs will be used in a later step to add PingOne to Cloudflare One.
8. In the **Configuration** tab, select the pencil icon.
9. In the **Redirect URIs** field, enter the following URL:
```txt
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
```
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
10. Select **Save**.

### 2\. Add PingOne to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **PingOne**.
4. Input the **Client ID**, **Client Secret**, and **Environment ID** generated previously.
5. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
6. (Optional) To enable SCIM, refer to [Synchronize users and groups](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#synchronize-users-and-groups).
7. (Optional) Under **Optional configurations**, enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to your users' identity.
8. Select **Save**.

You can now [test your connection](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) and create [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) based on the configured login method.

## Example API configuration

```json
{
	"config": {
		"client_id": "<your client id>",
		"client_secret": "<your client secret>",
		"ping_env_id": "<your ping environment id>"
	},
	"type": "ping",
	"name": "my example idp"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingone-oidc/#page","headline":"PingOne · Cloudflare One docs","description":"PingOne in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingone-oidc/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["OIDC","SSO"]}
```
