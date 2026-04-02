---
title: Dropbox
description: This guide covers how to configure Dropbox as a SAML application in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/http-apps/saas-apps/dropbox-saas.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Dropbox

**Last reviewed:**  over 1 year ago 

This guide covers how to configure [Dropbox ↗](https://help.dropbox.com/security/sso-admin) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Dropbox Advanced, Business Plus, or Enterprise account

## 1\. Add a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application** \> **SaaS** \> **Select**.
3. For **Application**, select `Dropbox`.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `Dropbox`  
   * **Assertion Consumer Service URL**: `https://www.dropbox.com/saml_login`  
   * **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Create a certificate file

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
3. Set the file extension as `.pem` and save.

## 3\. Add a SAML SSO provider to Dropbox

1. In Dropbox, go to your profile picture > **Settings** \> **Admin Console** \> **Security** \> **Single sign-on**.
2. For **Single sign-on**, select _Optional_.
3. Select **Add Identity provider sign-in URL**.
4. Paste the SSO endpoint from application configuration in Cloudflare One and select **Done**.
5. Select **Add X.509 certificate** and upload the `.pem` file from step [2\. Create a certificate file](#2-create-a-certificate-file).
6. Copy **SSO sign-in URL**. This is your custom Dropbox SSO URL.
7. Select **Save**.

## 3\. Test the integration and require SSO

1. Open an incognito browser window and go to your custom Dropbox SSO URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
2. After this is successful, you may want to require users to log in via SSO. Go to your profile picture > **Settings** \> **Admin Console** \> **Security** \> **Single sign-on**. For **Single sign-on**, select _Required_. Dropbox will send an email to your users notifying them of the change.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/dropbox-saas/","name":"Dropbox"}}]}
```
