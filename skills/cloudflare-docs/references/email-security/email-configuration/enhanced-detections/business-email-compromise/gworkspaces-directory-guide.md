---
title: Google Workspaces directory integration
description: Email security can integrate with Google to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/enhanced-detections/business-email-compromise/gworkspaces-directory-guide.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Google Workspaces directory integration

Email security can integrate with Google to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1\. Create a service account in Google for Email security Directory Integration

You need to authorize Email security to make connections into your Google tenant to retrieve your directory details. Cloudflare recommends that you create a service account for this purpose. This account will require the following following privileges:

* View group subscriptions on your domain.
* View organization units on your domain.
* View groups on your domain.
* See info about users on your domain.

Start by creating a service account. If you already have one, you can skip this step.

1. Access your [Google admin console ↗](https://admin.google.com/), and go to **Account** \> **Admin roles**.  
![Access the admin console in your Google account](https://developers.cloudflare.com/_astro/step1-access-gadmin.CQkN9gbr_2pnhCe.webp)
2. Select **Create new role**, and give it a descriptive name and description. When you are finished, select **Continue**.
3. In **Admin console privileges**, select the following privileges:  
   * _Organizational Units > Read_  
   * _Users > Read_  
   * _Directory Settings > Settings >Google Support Settings_  
   * _Directory Sync > Manage Directory Sync Settings > Read Directory Sync Settings_  
![Select only the privileges mentioned here](https://developers.cloudflare.com/_astro/step3-console-privileges.vFqEU1es_NDYlM.webp)
4. When you specify Admin console privileges, you also grant the corresponding Admin API privileges. In any case, make sure the following privileges are selected for **Admin API privileges**:  
   * _Organizational Units > Read_  
   * _Users > Read_  
   * _Groups > Read_  
![Select only the privileges mentioned here](https://developers.cloudflare.com/_astro/step4-api-privileges.Cd1euJz-_Z2rWBqY.webp)
5. Select **Continue**.
6. Review your information and select **Create Role**.

## 2\. Authorize Email security for Directory Access with Google

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/), and select **Settings** (the gear icon).
2. Go to **Directories**, and select **Add Directory** to start the authorization process.  
![Go to Directories in the dashboard of Email security, and then select Add Directory to start the authorization process](https://developers.cloudflare.com/_astro/step2-directories.D22k3b5I_2pbMGj.webp)
3. In the Add Directory configuration panel, enter the following details:  
   * **Directory Type**: Open the drop-down menu and select **Google**.  
   * **Directory Name**: Enter a string that represents the directory. This value will be referenced in the Business Email Compromise List configuration section. For example, `Gmail`.  
   * **Sync Frequency**: Update the value to your preference.  
Select **Authorize** when you are done.
4. The Email security dashboard will redirect you to a Google login page. Select or enter the appropriate account to initiate the authentication process.
5. Once authenticated, the system will show a dialog box with a list of the required permissions. Check all the checkboxes, and select **Continue** to authorize the change.  
![Select all the settings to authorize Google](https://developers.cloudflare.com/_astro/step5-authorize-google.BLbvhcCy_N0yLd.webp)
6. Upon authorization, you will be automatically redirected back to the Add Directory configuration panel. Select **Save** to complete the authorization process.  
![Select Save to complete the authorization process](https://developers.cloudflare.com/_astro/step6-save.D3QFRqJX_ZerEYD.webp)
7. Once saved, your newly configured directory will appear in the configured directories table.  
![Your directory will appear in the configured directories table](https://developers.cloudflare.com/_astro/step7-directories.X-76CIOe_SIR5K.webp)

## 3\. Configure the Business Email Compromise list

Now that Email Security (formerly Area 1) has been authorized to access and retrieve directory information, you will need to configure the Business Email Compromise list.

1. Log in to the [Email Security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/), and select **Settings** (the gear icon).
2. Go to **Email Configuration** \> **Enhanced Detections** \> **Business Email Compromise**.  
![Access Business Email Compromise in Email Security \(formerly Area 1\) dashboard to start setting up this feature](https://developers.cloudflare.com/_astro/step2-business-email-compromise.JLn7Jc_Z_1PuBTR.webp)
3. Open the drop-down menu and select the directory you have created in the previous step 3.  
![Select the directory you have created in the previous step 3](https://developers.cloudflare.com/_astro/step3-office365.DovwiIDh_Z1ImYO2.webp)
4. If the initial directory synchronization has completed, the page will refresh and list groups and users. If you do not see any information, wait a few minutes as the system completes processing the initial synchronization.  
![The screen should refresh and show a list of users and groups](https://developers.cloudflare.com/_astro/step4-business-list.CpO6oJT4_Z1nVU74.webp)
5. Select the arrow next to a group to expand it and show its members.  
![Select the arrow to expand it and show a list of its members](https://developers.cloudflare.com/_astro/step5-show-members.DDOL6mZ3_Z26bTvm.webp)
6. To protect an entire group, select the three-dots button next to it, and then select **Protect**. When you protect a group, all of its members will be automatically protected. The protection markers will turn green to indicate that protection is active.  
![You can protect an entire group of users. The protection markers will turn green to show that protection is active](https://developers.cloudflare.com/_astro/step6-protect-group.Dp7Ice3T_ZN3WOe.webp)
7. You can also protect individual users. Select the three-dots button next to each user you want to protect, and then select **Protect**.

## 4\. Configure secondary email address (if required)

When the Business Email Compromise list is configured, Email Security (formerly Area 1) will enforce the proper match of the sender’s display name and email address. Any variation from this strict requirement will raise a detection event. The reason of detection will be `Protected Name <NAME> should not appear as <non-configured email address>`.

In some instances, you may want to allow your protected users to send emails from an alternate email address (like their personal email address). To configure this alternate address, you will have to add it to their directory entry.

1. Log in to the [Email Security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/), and select **Settings** (the gear icon).
2. Go to **Email Configuration** \> **Enhanced Detections** \> **Business Email Compromise**.
3. Search for the user you want to allow an alternate email address.
4. Select the three-dots button > **Edit**.  
![Select edit to add alternate email addresses to your user](https://developers.cloudflare.com/_astro/step4-edit-user.DL6F3KAq_ZSyDoL.webp)
5. In **Secondary Emails** add the additional email addresses. Place each entry on a new line.  
![Add each new email address to the Secondary Emails field. Place each address on a separate line](https://developers.cloudflare.com/_astro/step5-new-email.B-eIH6gr_Z19ndYu.webp)
6. Select **Save** to finish.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/enhanced-detections/","name":"Enhanced detections"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/enhanced-detections/business-email-compromise/","name":"Business email compromise (BEC)"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/email-configuration/enhanced-detections/business-email-compromise/gworkspaces-directory-guide/","name":"Google Workspaces directory integration"}}]}
```
