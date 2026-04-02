---
title: Azure guide
description: This tutorial will walk you through the steps for configuring a non-gallery enterprise application within Azure Active Directory to establish a SAML SSO connection with Email security (formerly Area 1).
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/sso/azure.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Azure guide

This tutorial will walk you through the steps for configuring a non-gallery enterprise application within Azure Active Directory to establish a SAML SSO connection with Email security (formerly Area 1).

## 1\. Azure Active Directory configuration

1. [Log in to Azure portal ↗](https://portal.azure.com/) and open **Enterprise Applications**.
2. Select **New Application**.  
![Create a new application](https://developers.cloudflare.com/_astro/step2-new-app.GbwSoYTv_1hoF3R.webp)
3. Select **Create your own application**.  
![Select create your own application](https://developers.cloudflare.com/_astro/step3-create-your-own-app.D_nI3P_9_N1ers.webp)
4. Input a descriptive name for your app and select **Integrate any other application you don't find in the gallery (Non-gallery)** \> **Create**.  
![Give your application a descriptive name](https://developers.cloudflare.com/_astro/step4-name.ST_JQGXc_tCbIk.webp)
5. On the application **Overview** page that opens, select **2\. Set up single sign on**.  
![Select single sign-on as the type of app](https://developers.cloudflare.com/_astro/step5-sso.nYBI7rx0_Z1jy2tQ.webp)
6. Select **SAML** as your single sign-on method.  
![Select SAML as the sign-on method](https://developers.cloudflare.com/_astro/step6-saml.BDfJqTFf_1zkr76.webp)
7. Select the pencil icon to edit the **Basic SAML Configuration**.  
![Select the pencil icon to edit Basic SAML Configuration](https://developers.cloudflare.com/_astro/step7-basic-saml.BgjLMb_o_Zyyl99.webp)
8. Enter the following configuration settings:  
| **Identifier (Entity ID)**                     | https://horizon.area1security.com                |  
| ---------------------------------------------- | ------------------------------------------------ |  
| **Reply URL (Assertion Consumer Service URL)** | https://horizon.area1security.com/api/users/saml |  
| **Sign-On URL**                                | Leave blank                                      |  
| **Relay State**                                | Leave blank                                      |  
| **Logout URL**                                 | Leave blank                                      |
9. Select **Save** and the cross button to exit **Basic SAML Configuration**.
10. Select the pencil icon to edit **SAML Certificates** and make the following changes:  
   * **Signing Option**: Select _Sign SAML response_ from the drop-down menu.  
   * **Signing Algorithm**: Select _SHA-1_ from the drop-down menu.  
![Select Sign SAML response and SHA-1 from the menu](https://developers.cloudflare.com/_astro/step10-saml-signing-certificate.CFnr5Wkl_ZBfFkX.webp)
11. Select **Save** and the cross button to exit **SAML Certificates**.
12. Still in the **SAML Certificates** section, find **Federation Metadata XML** and select **Download**. You will need this information for the SSO Configuration in the Email security dashboard.  
![Download the Metadata XML information](https://developers.cloudflare.com/_astro/step12-download.Cczu7P0M_S3iQJ.webp)

Your Azure configuration is now complete. It should look similar to this:

![Your Azure configuration should be similar to this one](https://developers.cloudflare.com/_astro/config-finished.DxhgsmQg_1nnUvz.webp) 

Note

Now that the application configuration is complete, update **User Assignments** and **Application Properties** as needed to ensure that authorized personnel are able to access the new application from their Apps Catalog. Additionally, you may choose to update the application logo image file or the privacy policy URL.

## 2\. Configure Email security to connect to Azure

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Users and Actions** \> **Users and Permissions** add the email addresses of all your authorized administrators.  
![Fill out your authorized administrators](https://developers.cloudflare.com/_astro/step3-users-actions.ysQewtS__ZxpoGq.webp)
4. Go to **SSO Settings**, and enable **Single Sign On**.  
![Enable SSO](https://developers.cloudflare.com/_astro/step4-sso.BGGNQi5S_OOz77.webp)
5. In **SSO Enforcement**, choose one of the settings according to your specific needs:  
   * **None**: This setting allows each user to choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).  
   * **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to log in using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.  
   * **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.
6. For **SAML SSO Domain**, enter `login.microsoftonline.com`.
7. In **Metadata XML** paste the XML metadata you downloaded in the previous step 11\. You can open the downloaded file with a text editor to copy all the text. Make sure there are no leading carriage returns or spaces when you copy the text. Your copied text should begin with:  
```  
<?xml version="1.0" encoding="utf-8"?><EntityDescriptor ID="_<YOUR_DESCRIPTOR_ID>" entityID="https://<YOUR_ENTITY_ID> " xmlns="urn:oasis:names:tc:SAML:2.0:metadata">...  
```
8. Select **Update Settings** to save your configuration.

## 3\. Test SSO configuration

After completing both the Azure and Email security setups, you can test your SSO access. In this example, the logo for Email security has been updated.

Note

Verify that the User Assignments and Application Properties of your new Azure AD application have been updated accordingly to ensure that authorized personnel are able to access the new application from their Office 365/Azure Apps Catalog page. Application logos and privacy policy URL can also be updated as needed.

1. Log in to your [Office 365 portal ↗](https://portal.office.com).
2. Select **All Apps**.
3. Go to **Settings** \> **SSO**.
4. Locate the Email security Horizon application (or whichever name you gave your application), and select it to initiate your SSO login with Email security.
5. If you configured everything correctly, you should be signed in to the Email security Portal and redirected to the dashboard.

## Troubleshooting

If you have trouble connecting your Azure account to Email security, make sure that:

* The user exists in the Email security dashboard.
* The **Identifier** and **Reply URLs** in Azure AD are correct (refer to **Basic SAML Configuration** in step 7 of [Azure Active Directory configuration](#1-azure-active-directory-configuration)).
* **Sign SAML response** and **SHA-1** are selected in Azure AD (refer to **SAML Certificates** in step 9 of [Azure Active Directory configuration](#1-azure-active-directory-configuration)).
* The SAML SSO Domain is set correctly in the Email security dashboard (refer to step 6 in [Configure Email security to connect to Azure](#2-configure-email-security-to-connect-to-azure)).
* The name ID identifier is set to **Email Address**.

If all else fails, enable Chrome browser debug logs. Then, log your activity when SSO is initiated, and contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/sso/","name":"SSO integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/account-setup/sso/azure/","name":"Azure guide"}}]}
```
