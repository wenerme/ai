---
title: Grafana Cloud
description: Integrate Grafana Cloud with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SSO ](https://developers.cloudflare.com/search/?tags=SSO) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-cloud-saas-oidc.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Grafana Cloud

**Last reviewed:**  over 1 year ago 

This guide covers how to configure [Grafana Cloud ↗](https://grafana.com/docs/grafana-cloud/account-management/authentication-and-permissions/authorization/#configure-oauth-20-with-generic-oauth) as an OIDC application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Grafana Cloud account

## 1\. Add a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application**.
3. Select **SaaS**.
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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-cloud-saas-oidc/","name":"Grafana Cloud"}}]}
```
