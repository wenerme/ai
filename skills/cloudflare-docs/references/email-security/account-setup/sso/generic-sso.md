---
title: Generic SSO guide
description: Below is a generic guide to successfully set up an identity provider based SAML. These options might change depending on your identity provider (IDP). However, make sure you set up the options below or their equivalent.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/sso/generic-sso.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Generic SSO guide

Below is a generic guide to successfully set up an identity provider based SAML. These options might change depending on your identity provider (IDP). However, make sure you set up the options below or their equivalent.

## 1\. Identity Provider SAML setup

1. Log in to your SAML provider and access its setup section.
2. Enter the following values to configure your IDP provider:  
| **Single sign on URL**          | https://horizon.area1security.com/api/users/saml |  
| ------------------------------- | ------------------------------------------------ |  
| **Audience URI (SP Entity ID)** | https://horizon.area1security.com                |  
| **Name ID format**              | _Email Address_                                  |  
| **Application username**        | _Email_                                          |  
| **Response**                    | _Signed_                                         |  
| **Assertion signature**         | _Unsigned_                                       |  
| **Signature Algorithm**         | _RSA_\-SHA1                                      |  
| **Digest Algorithm**            | _SHA1_                                           |
3. In the **Attribute Statements**, add your application users. Emails you add here should match emails users already have in the Email security dashboard.
4. After finishing the setup, download the IDP metadata file. Copy and paste it into the **METADATA XML** field in the SSO section of Email security’s dashboard. Refer to **step 4** in the guide below for more details.

## 2\. Email security SAML setup

After configuring settings in your SSO provider, log in to the Email security dashboard to finish setting up.

1. Log in to the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Users and Actions** \> **Users and Permissions** add the email addresses of all your authorized administrators.  
![Fill out your authorized administrators](https://developers.cloudflare.com/_astro/step3-users-actions.ysQewtS__ZxpoGq.webp)
4. Go to **SSO**, and enable **Single Sign on**.  
![Enable SSO](https://developers.cloudflare.com/_astro/step4-sso.BGGNQi5S_OOz77.webp)
5. In **SSO Enforcement**, choose one of the settings, according to your specific needs:  
   * **None**: This setting allows each user to choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).  
   * **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to log in using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.  
   * **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.
6. In **SAML SSO Domain** enter the domain that points to your SSO provider.
7. In **METADATA XML** paste the SAML XML metadata settings from your provider. These settings (and even their exact text descriptions) are in different locations depending on your SSO provider.
8. Select **Update Settings** to save your configuration.

## Troubleshooting

If you have trouble connecting your SAML provider to Email security, make sure that:

* The users you have configured in your SAML provider exist in the Email security dashboard.
* You are using email address as an attribute (in step 2, refer to **Name ID format** and **Application username**).
* You are using the SHA-1 algorithm.
* Your encryption is set to 2048 bits.

If all else fails, enable Chrome browser debug logs. Then, log your activity when SSO is initiated, and contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/sso/","name":"SSO integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/account-setup/sso/generic-sso/","name":"Generic SSO guide"}}]}
```
