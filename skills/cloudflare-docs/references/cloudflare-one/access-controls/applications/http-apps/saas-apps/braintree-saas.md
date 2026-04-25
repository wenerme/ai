---
title: Braintree
description: Integrate Braintree with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

# Braintree

**Last reviewed:**  over 1 year ago 

This guide covers how to configure [Braintree ↗](https://developer.paypal.com/braintree/articles/guides/single-sign-on-sso) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Braintree production or sandbox account

## 1\. Add a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application** \> **SaaS** \> **Select**.
3. For **Application**, enter `Braintree` and select the textbox that appears below.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields with temporary values:  
   * **Entity ID**: `placeholder`  
   * **Assertion Consumer Service URL**: `https://www.placeholder.com`  
   * **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Enable SSO Configuration in Braintree

1. In Braintree, create a [support ticket ↗](https://developer.paypal.com/braintree/help).
2. In **Search Issues**, enter `Login and password issues` and select the corresponding value.
3. In **Issue Details**, fill in the following:  
   * **Merchant ID**: Your Braintree Merchant ID. This is the 16-digit value that follows `/merchants/`in your Braintree Control Panel URL.  
   * **Email domain(s) to be used in user IDs**: The email domain(s) that should be allowed to sign in to your account via SSO.  
   * **Single Sign-on HTTP POST Binding URL**: SSO endpoint from application configuration in Cloudflare One  
   * **Certificate for validation**: Public key from application configuration in Cloudflare One.
4. Select whether you are using a **Production** or **Sandbox** account.
5. Fill out the **Your contact information** fields and select **Submit a help request**.
6. When you receive an email stating SSO has been successfully configured for your account, you can proceed to the next step.

## 3\. Finish adding a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Braintree** \> **Edit** \> **Overview**.
3. Replace the temporary values for **Entity ID** and **Assertion Consumer Service URL** with the link provided in the successful SSO configuration email from Braintree support. You will use the same link for both values.
4. Select **Save Application**.

## 4\. Test the integration and add SSO users

1. In your Braintree Control Panel, select the **settings** icon > **Team**.
2. Select your desired test user.
3. Under **Single Sign-On**, select **Enable**.
4. Open an incognito browser window. In the address bar, paste `https://id.sandbox.braintreegateway.com` for a sandbox account or`https://id.braintreegateway.com` for a production account.
5. In **Your corporate email address** field, type your test user's email. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
6. Upon successful sign-in, you can enable SSO for other users using steps 4.1 - 4.3.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/braintree-saas/","name":"Braintree"}}]}
```
