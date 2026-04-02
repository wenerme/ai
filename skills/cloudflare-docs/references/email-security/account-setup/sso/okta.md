---
title: Okta guide
description: In this tutorial you will learn how to connect your Email security (formerly Area 1) account to Okta. When single sign-on (SSO) is correctly configured, your authorized employees can connect to the Email security dashboard using a familiar user name and password.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/sso/okta.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Okta guide

In this tutorial you will learn how to connect your Email security (formerly Area 1) account to Okta. When single sign-on (SSO) is correctly configured, your authorized employees can connect to the Email security dashboard using a familiar user name and password.

## 1\. Create an Email security app in Okta

You will need to manually create an app for Email security in Okta.

1. Log in to Okta as an administrator.
2. In the Admin console, go to **Applications** \> **Applications**.  
![Go to Applications in your Okta Admin console](https://developers.cloudflare.com/_astro/step2-applications.T6lbX9rp_Zhb2Eq.webp)
3. Select **Create App Integration** \> **SAML 2.0**, and select **Next**.  
![Choose SAML 2.0 as the new app integration type](https://developers.cloudflare.com/_astro/step3-saml.C-ZfFOEP_Z2sWv7Y.webp)
4. Enter a descriptive name for your app, such as `Email security`, and select **Next**.
5. Enter the following settings for **SAML Settings**:  
| **Single sing on URL**              | https://horizon.area1security.com/api/users/saml                                                                      |  
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |  
| **Audience URI (SP Entity ID)**     | https://horizon.area1security.com/api/users/saml                                                                      |  
| **Name ID format**                  | Select _EmailAddress_ from the drop-down menu.                                                                        |  
| **Application username**            | Select _Email_ from the drop-down menu.                                                                               |  
| **Response**                        | _Signed_                                                                                                              |  
| **Assertion signature**             | _Unsigned_                                                                                                            |  
| **Signature Algorithm**             | _RSA-SHA1_                                                                                                            |  
| **Digest Algorithm**                | _SHA1_                                                                                                                |  
| **Attribute statements (optional)** |                                                                                                                       |  
| **Name**                            | Enter email addresses for your users. Should match users already added to Email security (formerly Area 1) dashboard. |  
| **Name format**                     | Select _Unspecified_ from the drop-down menu.                                                                         |  
| **Value**                           | Select user.email from the drop-down menu.                                                                            |  
![Input the correct settings in SAML settings](https://developers.cloudflare.com/_astro/step5-saml-settings.BAj5ddDR_Zj3BNY.webp)
6. Select **Next**.
7. Under **Are you a customer or a partner?**, select **I'm an Okta customer adding an internal app**.
8. In **App type**, select **This is an internal app that we have created**.
9. Select **Finish**.
10. Okta should display the app you have just created. If not, go to **Applications** \> **Applications**, and select it.
11. In the **Sign On** tab, go to **View SAML setup instructions** and select it to retrieve the SAML provider information.  
![Find the View SAML setup instructions button](https://developers.cloudflare.com/_astro/step11-saml-instructions.DbEhrhiJ_Z18kFRE.webp)
12. Copy and save the link in **Identity Provider Single Sign-On URL**. You will need it later to use in the Email security dashboard.  
![Copy and save the SSO URL to use later in the Email security dashboard](https://developers.cloudflare.com/_astro/step12-sso-url.C4qgHtJB_Z1IaK9B.webp)
13. Scroll down to **Optional**. You might need to enlarge the text box to copy and save all the XML data. You will need this information to finish configuration in the Email security dashboard. The start of the metadata should be similar to the following:  
```  
<?xml version="1.0" encoding="utf-8"?><EntityDescriptor ID="_<YOUR_DESCRIPTOR_ID>" entityID="https://<YOUR_ENTITY_ID> " xmlns="urn:oasis:names:tc:SAML:2.0:metadata">...  
```  
![Copy and save the XML metadata to use later in the Email security dashboard](https://developers.cloudflare.com/_astro/step13-optional.BPDC1TmW_Z1MkkpK.webp)

## 2\. Configure Email security to connect to Okta

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Users and Actions** \> **Users and Permissions** add the email addresses of all your authorized administrators.  
![Fill out your authorized administrators](https://developers.cloudflare.com/_astro/step3-users-actions.ysQewtS__ZxpoGq.webp)
4. Go to **SSO Settings** and enable **Single Sign On** switch.  
![Enable SSO](https://developers.cloudflare.com/_astro/step4-sso.BGGNQi5S_OOz77.webp)
5. In **SSO Enforcement**, choose one of the settings according to your specific needs:  
   * **None**: This setting allows each user to choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).  
   * **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to log in using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.  
   * **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.
6. In **SAML SSO Domain** enter the domain you saved from step 13\. For example, `area1security-examplecorp.okta.com`.
7. In **Metadata XML** paste the XML metadata you saved from step 14.
8. Select **Update Settings** to save your configuration.

Log out of any customer portal sessions. Your Okta account should now show a tile for Email security (formerly Area 1).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/sso/","name":"SSO integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/account-setup/sso/okta/","name":"Okta guide"}}]}
```
