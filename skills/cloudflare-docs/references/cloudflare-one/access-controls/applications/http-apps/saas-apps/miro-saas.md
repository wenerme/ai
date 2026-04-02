---
title: Miro
description: This guide covers how to configure Miro as a SAML application in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/http-apps/saas-apps/miro-saas.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Miro

**Last reviewed:**  over 1 year ago 

This guide covers how to configure [Miro ↗](https://help.miro.com/hc/articles/360017571414-Single-sign-on-SSO) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Miro Business or Enterprise plan account
* A [verified domain ↗](https://help.miro.com/hc/articles/360034831793-Domain-control) added to your Miro account (Enterprise plan), or be prepared to do so during SSO configuration (Business or Enterprise plan)

## 1\. Add a SaaS application to Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application** \> **SaaS**.
3. For **Application**, enter `Miro` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `https://miro.com/`  
   * **Assertion Consumer Service URL**: `https://miro.com/sso/saml`  
   * **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add a SAML SSO provider to Miro

* [ business plan ](#tab-panel-3408)
* [ enterprise plan ](#tab-panel-3409)

1. In Miro, select your profile picture > **Settings** \> **\*\*Security\*\***.
2. Turn on **SSO/SAML**.
3. Fill in the following fields:  
   * **SAML Sign-in URL**: SSO endpoint from application configuration in Cloudflare One  
   * **Key x509 Certificate**: Public key from application configuration in Cloudflare One
4. In **Domain**, enter the domain you want to configure SSO for and select **Enter**.
5. Enter an email address from that domain and select **send verification**.
6. Once you receive a verification email, select the link in the email, then select **Save**. When the domain is successfully configured, the **VERIFY EMAIL** label next to the domain in the SSO/SAML configuration page will disappear.
7. If you have additional domains you want to configure SSO for, repeat steps 4-6 for each domain.

1. In Miro, select your profile picture > **Settings** \> **\*\*Security and Compliance\*\* > \*\*Authentication\*\* > \*\*Single sign-on\*\***.
2. Turn on **SSO/SAML**.
3. Fill in the following fields:  
   * **SAML Sign-in URL**: SSO endpoint from application configuration in Cloudflare One  
   * **Key x509 Certificate**: Public key from application configuration in Cloudflare One
4. In **Domain**, enter the domain you want to configure SSO for and select **Enter**.
5. If you have not previously \[verified the domain\](https://help.miro.com/hc/articles/360034831793-Domain-control), enter an email address from that domain and select **send verification**.
6. Once you receive a verification email, select the link in the email, then select **Save**. When the domain is successfully configured, the **VERIFY EMAIL** label next to the domain in the SSO/SAML configuration page will disappear.
7. If you have additional domains you want to configure SSO for, repeat steps 4-6 for each domain.

## 3\. Test the integration

In the Miro SAML/SSO configuration page, select **Test SSO Configuration**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. If the login is successful, you will receive a **SSO configuration test was successful** message.

Note

When testing the integration, you do not have to use an email from a domain you have configured for SSO or a user configured in Miro. The only requirement is that the user is already configured in your identity provider.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/miro-saas/","name":"Miro"}}]}
```
