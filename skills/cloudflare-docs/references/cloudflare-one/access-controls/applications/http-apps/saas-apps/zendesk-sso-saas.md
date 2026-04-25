---
title: Zendesk
description: Integrate Zendesk with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

# Zendesk

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Zendesk ↗](https://support.zendesk.com/hc/en-us/articles/4408887505690-Enabling-SAML-single-sign-on#topic%5Fu54%5Fwc3%5Fz2b) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to your Zendesk account

## Configure Zendesk and Cloudflare

1. Go to your Zendesk administrator dashboard, typically available at `<yourdomain>.zendesk.com/admin/security/sso`.
2. In a separate tab or window, open [Cloudflare One ↗](https://one.dash.cloudflare.com), select your account, and go to **Access controls** \> **Applications**.
3. Select **Add an application**, then choose _SaaS_.
4. Input the following values in the Cloudflare One application configuration:  
| Cloudflare One field               | Value                                           |  
| ---------------------------------- | ----------------------------------------------- |  
| **Entity ID**                      | https://<yoursubdomain>.zendesk.com             |  
| **Assertion Consumer Service URL** | contents of **SAML SSO URL** in Zendesk account |  
| **Name ID Format**                 | _Email_                                         |
5. (Optional) Configure these Attribute Statements to include a user's first and last name:  
| Cloudflare attribute name | IdP attribute value                                             |  
| ------------------------- | --------------------------------------------------------------- |  
| <first name>              | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname |  
| <last name>               | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname   |  
Zendesk will [use the user's email address as their name ↗](https://support.zendesk.com/hc/en-us/articles/203663676#topic%5Fdzb%5Fgl5%5F2v) if the name is not provided.
6. To determine who can access Zendesk, [create an Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).
7. Copy the **SSO Endpoint** and **Public Key**.
8. Transform the public key into a fingerprint:  
   1. Open a [fingerprint calculator ↗](https://www.samltool.com/fingerprint.php).  
   2. Paste the **Public Key** into **X.509 cert**.  
   3. Wrap the value with `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.  
   4. Set **Algorithm** to _SHA256_ and select **Calculate Fingerprint**.  
   5. Copy the **Formatted FingerPrint** value.
9. Add the Cloudflare values to the following Zendesk fields:  
| Cloudflare IdP field                        | Zendesk field               |  
| ------------------------------------------- | --------------------------- |  
| **SSO Endpoint**                            | **SAML SSO URL**            |  
| **Public Key** (transformed to fingerprint) | **Certificate Fingerprint** |
10. Go to `https://<yourdomain>.zendesk.com/admin/security/staff_members` and enable **External Authentication** \> **Single Sign On**.

Users should now be able to log in to Zendesk if their Email address exists in the Zendesk user list.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/zendesk-sso-saas/","name":"Zendesk"}}]}
```
