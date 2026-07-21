---
description: Integrate Grafana Cloud with Access.
title: Grafana Cloud
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Grafana Cloud

Last updated May 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-cloud-saas-oidc/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [Grafana Cloud ↗](https://grafana.com/docs/grafana-cloud/account-management/authentication-and-permissions/authorization/#configure-oauth-20-with-generic-oauth) as an OIDC application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Grafana Cloud account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **SaaS application**.
4. For **Application**, enter `Grafana Cloud` and select the corresponding textbox that appears.
5. For the authentication protocol, select **OIDC**.
6. Select **Add application**.
7. In **Scopes**, select the attributes that you want Access to send in the ID token.
8. In **Redirect URLs**, enter `https://<your-grafana-domain>/login/generic_oauth`.
9. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
10. Copy the **Client secret**, **Client ID**, **Token endpoint**, and **Authorization endpoint**.
11. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
12. (Optional) In **Experience settings**, configure [App Launcher settings](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) by turning on **Enable App in App Launcher** and, in **App Launcher URL**, entering `https://<your-grafana-domain>/login`.
13. Save the application.

## 2\. Add a SSO provider to Grafana Cloud

1. In Grafana Cloud, select the **menu** icon > **Administration** \> **Authentication** \> **Generic OAuth**.
2. (Optional) For **Display name**, enter a new display name (for example, `Cloudflare Access`). Users will select **Sign in with (display name)** when signing in via SSO.
3. Fill in the following fields:
  * **Client Id**: Client ID from application configuration in Cloudflare One
  * **Client secret**: Client secret from application configuration in Cloudflare One
  * **Scopes**: Delete `user:email` and enter the scopes configured in Cloudflare One
  * **Auth URL**: Authorization endpoint from application configuration in Cloudflare One
  * **Token URL**: Token endpoint from application configuration in Cloudflare One
4. Select **Save**.

## 3\. Test the integration

Open an incognito browser window and go to your Grafana domain (`https://<your-grafana-domain>/login`). Select **Sign in with (display name)**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-cloud-saas-oidc/#page","headline":"Grafana Cloud · Cloudflare One docs","description":"Integrate Grafana Cloud with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-cloud-saas-oidc/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
```
