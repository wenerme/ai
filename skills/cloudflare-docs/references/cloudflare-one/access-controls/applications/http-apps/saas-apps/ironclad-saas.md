---
title: Ironclad
description: Integrate Ironclad with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/http-apps/saas-apps/ironclad-saas.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Ironclad

**Last reviewed:**  over 1 year ago 

This guide covers how to configure [Ironclad ↗](https://support.ironcladapp.com/hc/articles/12286012625559-Set-Up-Generic-SSO-SAML-Integration) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Ironclad site

## 1\. Add a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application** \> **SaaS**.
3. For **Application**, enter `Ironclad` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Copy the **SSO Endpoint** and **Public key**.
7. Keep this window open. You will finish this configuration in step [3\. Finish adding a SaaS application to Cloudflare One](#3-finish-adding-a-saas-application-to-cloudflare-one).

## 2\. Add a SAML SSO provider to Ironclad

1. In Ironclad, select your profile picture > **Company settings** \> **Integrations** \> **SAML**.
2. Select **Add SAML Configuration** \> **Show Additional IdP Settings**.
3. Copy the **Callback** value.
4. Fill in the following fields:  
   * **Entry Point**: SSO endpoint from application configuration in Cloudflare One.  
   * **Identity Provider Certificate**: Public key from application configuration in Cloudflare One. The key will automatically be wrapped in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
5. Select **Save**.

## 3\. Finish adding a SaaS application to Cloudflare One

1. In your open Cloudflare One window, fill in the following fields:  
   * **Entity ID**: `ironcladapp.com`  
   * **Assertion Consumer Service URL**: Callback from Ironclad SAML SSO set-up.  
   * **Name ID format**: _Email_
2. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
3. Save the application.

## 4\. Add a test user to Ironclad and test the integration

1. In Ironclad, select your profile picture > **Company settings** \> **Users & Groups**.
2. Select **Invite User**.
3. For **Email addresses**, add your desired email address for your test user.
4. For **Sign-in Method**, ensure **Sign in with (your-team-domain.cloudflareaccess.com)** is selected
5. Select **Invite**.
6. In the invitation email sent to the test user, select **Join now**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
7. Once this is successful, you can contact your account team or `support@ironcladapp.com` to migrate existing users to SSO login.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/ironclad-saas/","name":"Ironclad"}}]}
```
