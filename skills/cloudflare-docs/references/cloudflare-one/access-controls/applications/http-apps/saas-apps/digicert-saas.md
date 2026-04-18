---
title: Digicert
description: Integrate Digicert with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/http-apps/saas-apps/digicert-saas.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Digicert

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Digicert ↗](https://docs.digicert.com/en/certcentral/manage-account/saml-admin-single-sign-on-guide/configure-saml-single-sign-on.html) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Digicert account
* [SAML ↗](https://docs.digicert.com/en/certcentral/manage-account/saml-admin-single-sign-on-guide/saml-single-sign-on-prerequisites.html) enabled in your Digicert account

## 1\. Add a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application** \> **SaaS** \> **Select**.
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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/digicert-saas/","name":"Digicert"}}]}
```
