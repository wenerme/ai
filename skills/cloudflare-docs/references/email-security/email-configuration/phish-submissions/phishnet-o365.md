---
title: PhishNet for Office 365
description: PhishNet is an add-in button that helps users to submit directly to Email security (formerly Area 1) phish samples missed by Email security detection. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Email security.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/phish-submissions/phishnet-o365.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# PhishNet for Office 365

PhishNet is an add-in button that helps users to submit directly to Email security (formerly Area 1) phish samples missed by Email security detection. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Email security.

## Prerequisites

To set up PhishNet with Office 365, you will need:

* An Email security account with admin access.
* Admin access to Microsoft.com.

Note

Only admin users can deploy PhishNet for all users in Office 365\. Non-admin users can deploy PhishNet for themselves, but no other users will have access to it.

## Set up PhishNet for Office 365

1. Log in to [admin.microsoft.com ↗](https://admin.microsoft.com/) with your admin account.
2. Select the three-line button to open the menu.
3. Go to **Settings** \> **Integrated Apps**.  
![Select Integrated apps from the menu](https://developers.cloudflare.com/_astro/step3-apps.s-PS_Kr7_ZXaRKV.webp)
4. Select **Upload custom apps**.  
![Select upload custom apps](https://developers.cloudflare.com/_astro/step4-custom-apps.JYA_LtiR_Z7y7O8.webp)
5. On a new browser tab, [log in to Email security (formerly Area 1) ↗](https://horizon.area1security.com) with an admin account.
6. Select **Settings** (gear icon).  
![Select settings \(the gear icon\)](https://developers.cloudflare.com/_astro/step6-settings.Cz7onxDa_Z119Srf.webp)
7. Go to **Email Configuration** \> **Phish Submissions** \> **PhishNet O365**.  
![The PhishNet settings will let you copy the appropriate URL to install it on Office 365](https://developers.cloudflare.com/_astro/step7-phishnet.Bvni2lnP_Z1oiIoe.webp)
8. Select **Copy** to copy the URL. This URL will let you install PhishNet in Office 365.
9. Go back to the Microsoft admin browser tab.
10. From **Upload Apps to deploy**, select **Provide link to manifest file**, and paste the URL you copied from your Email security dashboard.  
![Paste the URL you have copied from Email security.](https://developers.cloudflare.com/_astro/step10-upload-apps.ChSsbuAN_tRGNJ.webp)
11. Select **Validate**. Wait for a success message to appear below the input. Then, select **Next**.
12. Under **Assign users**, select **Entire Organization**, and then select **Next**.  
![Paste the URL you have copied from Email security.](https://developers.cloudflare.com/_astro/step12.0f5KI0r__Z2nb5sF.webp)
13. In **App Permissions and Capabilities**, make sure PhishNet has the correct permissions: `Outlook: ReadWriteMailbox, SendReceiveData`. Then, select **Next**.  
![Make sure PhishNet has the correct permissions.](https://developers.cloudflare.com/_astro/step13.BEUwxMP1_Z2wU419.webp)
14. In the next screen, make sure that in **Assigned Users** you have **Entire organization**. Then, select **Finish Deployment**.
15. Once deployment is complete, you should see a message confirming it. Note that it can take up to six hours for PhishNet to appear in Office 365 (or six hours to update if previously installed.) Select **Done**.  
![PhishNet might take up to six hours to appear in Office 365.](https://developers.cloudflare.com/_astro/step15.DDnoAZQp_27UdeA.webp)

You have now installed PhishNet for Office 365\. After the process is complete, PhishNet will show up on the Integrated Apps screen.

![Search for PhishNet in the Integrated Apps screen.](https://developers.cloudflare.com/_astro/phishnet-installed-apps.DoPw9UHj_Z2pMJh5.webp) 

## Submit phish with PhishNet

1. Open the message you would like to flag as either spam or phish.
2. Select the PhishNet logo in the task pane, near the other action buttons - such as reply and forward.

Note

If you cannot find the PhishNet icon, select the **More actions** menu (the three dots menu).

1. Under **Select Submission Type**, select the type of your submission - Spam or Phish.  
![Choose the type of submission you would like to make](https://developers.cloudflare.com/_astro/step3-submit-phish.yQX4V1G3_FiYMg.webp)
2. Select **Submit Report**.

Once the email has been successfully submitted to Email security for review, PhishNet will show you a **Submission Complete** message.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/phish-submissions/","name":"Phish submissions"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/phish-submissions/phishnet-o365/","name":"PhishNet for Office 365"}}]}
```
