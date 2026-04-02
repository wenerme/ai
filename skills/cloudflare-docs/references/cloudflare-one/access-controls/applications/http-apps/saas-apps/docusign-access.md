---
title: DocuSign
description: This guide covers how to configure Docusign as a SAML application in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SAML ](https://developers.cloudflare.com/search/?tags=SAML) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/http-apps/saas-apps/docusign-access.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DocuSign

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Docusign ↗](https://support.docusign.com/s/document-item?bundleId=rrf1583359212854&topicId=ozd1583359139126.html) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Docusign account that has Single Sign-On available
* A [domain ↗](https://support.docusign.com/s/document-item?bundleId=rrf1583359212854&topicId=gso1583359141256.html) verified in Docusign

## 1\. Create the Access for SaaS application

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an Application**.
3. Select **SaaS**.
4. Use the following configuration:  
   * Set the **Application** to _DocuSign_.  
   * Put placeholder values in **EntityID** and **Assertion Consumer Service URL** (for example, `https://example.com`). We'll come back and update these.  
   * Set **Name ID Format** to: _Unique ID_.
5. DocuSign requires SAML attributes to do Just In Time user provisioning. Ensure you are collecting SAML attributes from your IdP:  
   * Group  
   * username  
   * department  
   * firstName  
   * lastName  
   * phone
6. These IdP SAML values can then be mapped to the following DocuSign SAML attributes:  
   * Email  
   * Surname  
   * Givenname
7. Set an Access policy (for example, create a policy based on _Emails ending in @example.com_).
8. Copy and save the **SSO Endpoint**, **Entity ID** and **Public Key**.
9. Transform the **Public Key** into a fingerprint:  
   1. Copy the **Public Key** Value.  
   2. Paste the **Public Key** into VIM or another code editor.  
   3. Wrap the value in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.  
   4. Set the file extension to `.crt` and save.

## 2\. Configure your DocuSign SSO instance

1. Ensure you have a domain claimed in DocuSign.
2. From the DocuSign Admin dashboard, select **Identity Providers**.
3. On the Identity Providers page, select **ADD IDENTITY PROVIDER**. Use the following mappings from the saved Access Application values:  
   * **Name**: Pick your desired name.  
   * **Identity Provider Issuer**: Entity ID.  
   * **Identity Provider Login URL**: Assertion Consumer Service URL.
4. Save the Identity Provider.
5. Upload your certificate to the _DocuSign Identity Provider_ menu.
6. Configure your SAML Attribute mappings. The Attribute Names should match the values in **IdP Value** in your Access application.
7. Go back to the Identity Provider's screen and select **Actions** \> **Endpoints**. Copy and save the following:  
   * Service Provider Issuer URL.  
   * Service Provider Assertion Consumer Service URL.

## 3\. Finalize your Cloudflare configuration

1. Go back to your DocuSign application under **Access controls** \> **Applications**.
2. Select **Edit**.
3. Use the following mappings:  
   * EntityID->Service Provider Issuer URL.  
   * Assertion Consumer Service URL -> Service Provider Assertion Consumer Service URL.
4. Save the application.

When ready, enable the SSO for your DocuSign account and you will be able to login to DocuSign via Cloudflare SSO and your Identity Provider.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/docusign-access/","name":"DocuSign"}}]}
```
