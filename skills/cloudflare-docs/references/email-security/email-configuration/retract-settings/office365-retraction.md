---
title: Office 365 retraction
description: In this tutorial you will learn how to set up email retraction for Microsoft Office 365.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/retract-settings/office365-retraction.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Office 365 retraction

![Email workflow for retracting emails with Microsoft Office 365](https://developers.cloudflare.com/_astro/opening_img-o365-retraction.C_LqKorB_Z1i6MMV.webp) 

In this tutorial you will learn how to set up email retraction for Microsoft Office 365.

## 1\. Authorize Email security with Office 365 for retraction

For message retraction to successfully execute, Email security needs to be authorized to make API calls into the Office 365 Graph API architecture. The account used to authorize Email security requires the **Privileged role admin** role.

When assigning user roles in the Office 365 console, you will find these roles in **User permissions** \> **Roles configuration** \> **Identity admin roles**.

### How does the authorization work?

The authorization process grants Email security access to the Azure environment with the least applicable privileges required to function. The Enterprise Application that Email security registers (the Email security Synchronator) is not tied to any administrator account. Inside of the Azure Active Directory admin center you can review the permissions granted to the application in the Enterprise Application section.

![Permissions required for Email security to access Office 365](https://developers.cloudflare.com/_astro/area1-synchronator.BRuH1YHI_1mXLEv.webp) 
1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/), and select **Settings** (the gear icon).
2. Go to **Email Configuration** \> **RETRACT SETTINGS**.  
![Access the retract settings in Email security](https://developers.cloudflare.com/_astro/step2-retract-settings.D82uNTRl_fREBX.webp)

Note

If you do not see the Retract Settings option, [contact customer support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to enable the feature.

1. You need to authorize Email security to execute retractions through the Graph API of Office 365\. Make sure that the account that you will be using to authenticate has the appropriate administrative roles assigned. Select **Authorize** to start the process.  
![Select Authorize to start the process of authorizing Email security to access Office 365](https://developers.cloudflare.com/_astro/step3-authorize-o365.CYT8uKj7_Z1g1teu.webp)
2. The Email security dashboard will redirect you to a Microsoft login page. Select or enter the appropriate account to initiate the authentication process.  
![Select an account or enter a new account to authorize Email security](https://developers.cloudflare.com/_astro/step4-authorize-login.B8IoM6lw_26RR0d.webp)
3. Once authenticated, the system will show a dialog box with a list of the requested permissions. Select **Accept** to authorize the change.  
![Select Accept to authorize Email security in Office 365](https://developers.cloudflare.com/_astro/step5-authorize.DPGKVf-y_1jG2nx.webp)
4. Upon authorization, you will be automatically redirected to the Email security dashboard, with a notification that the authorization completed successfully. Select **Dismiss** to clear the notification.  
![Select Dismiss to dismiss the success notification](https://developers.cloudflare.com/_astro/step6-dismiss.B5C58pXd_EmJUa.webp)

## 2\. Configure auto-retraction actions

You can set up auto-retraction to automatically move messages matching certain dispositions to specific folders within a user's mailbox.

To set up automatic retraction:

1. Log in to the [Email Security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Retract Settings** \> **Auto-Retract**.
4. Select **Edit**.
5. For each disposition, choose which folder the message should be sent to:  
   * **No Action**: Do not move the message.  
   * **Junk Email**: Sends the message to the junk or spam email folder.  
   * **Trash**: Sends the message to the trash or deleted items email folder.  
   * **Soft Delete — user recoverable** (Microsoft only): Sends the message to the user's **Deleted Items** folder. Messages can be recovered by the user.  
   * **Hard Delete — admin recoverable**: Completely deletes messages from a user's inbox. Office 365 messages cannot be recovered without using the eDiscovery feature or the Exchange admin center. Refer to \[Recover hard deleted messages\](#recover-hard-deleted-messages) for more information.
6. Select **Update Auto-retract Settings**.

### Post delivery retractions for new threats

Email Security (formerly Area 1) is continuously gathering new information about phishing campaigns. Users might have email messages in their inboxes that were scanned by Email Security (formerly Area 1) but not retracted initially because, at the time of scan, these email messages had not been identified as a threat. To mitigate risk, Email Security (formerly Area 1) offers you tools to re-evaluate email messages at a fixed time interval based on knowledge Cloudflare may have acquired since initial delivery. Any email messages that fit this new threat knowledge will be retracted.

You can enable two options:

* **Post Delivery Response**: Email Security (formerly Area 1) will continue to re-evaluate emails already delivered to your users' inboxes at a fixed time interval in search for phishing sites or campaigns not previously known to Cloudflare. If any email messages fitting these new criteria are found, Email Security (formerly Area 1) retracts them. Rescans occur at a five minute, 12 hour, and 24 hour intervals.
* **Phish Submission Response**: Email Security (formerly Area 1) will retract emails already delivered that are reported by your users as phishing, and are found to be malicious by Email Security (formerly Area 1). Retraction will occur according to your configuration.

## 3\. Configure journaling

### 1\. Configure connector for delivery to Email security (formerly Area 1) (if required)

Note

Email security only scans inbound emails.

If your email architecture does not include an outbound gateway, you can skip this step and [proceed to the next one](#2-configure-journal-rule).

On the other hand, if your email architecture requires outbound messages to traverse your email gateway, you may want to consider configuring a connector to send the journal messages directly to Email security.

1. Log in to the [Exchange admin center ↗](https://admin.exchange.microsoft.com), and go to **Mail flow** \> **Connectors**.  
![Go to the connectors area](https://developers.cloudflare.com/_astro/step1-connector.GHhUwTxU_YDrGq.webp)
2. Select **Add a connector**.
3. Configure the new connector as follows:  
   * **Connection From**: Office 365  
   * **Connection to**: Partner Organization  
![Configure the connector](https://developers.cloudflare.com/_astro/step3-configure-connector.RocOY8nI_113JBr.webp)
4. Select **Next**.
5. Configure the connector as follows:  
   * **Name**: `Deliver journal directly to Area 1`  
   * **Description**: `Deliver journal directly to Area 1`  
   * **Turn it on**: Enabled.  
![Name the connector and give it a description](https://developers.cloudflare.com/_astro/step5-name-connector.DNWbIeO__1FxRhq.webp)
6. Select **Next**.
7. Configure the **Use of connector** setting as follows:  
   * Select **Only when email messages are sent to these domains**.  
   * In the text field, enter `journaling.mxrecord.io` as the host address, and select **+** to add the domain.  
![Configure use of connector](https://developers.cloudflare.com/_astro/step7-use-of-connector.PKXxl3_L_2qqJ7r.webp)
8. Select **Next**.
9. Configure the **Routing** setting as follows:  
   * Select **Route email through these smart hosts**.  
   * In the text field, enter `journaling.mxrecord.io` as the [smart host ↗](https://en.wikipedia.org/wiki/Smart%5Fhost) address, and select **+** to add the domain.  
![Configure the routing setting](https://developers.cloudflare.com/_astro/step9-routing.CavgMOZT_1fAxJa.webp)
10. Select **Next**.
11. In **Security restrictions**, you need to keep the default TLS configuration. Review the following settings:  
   * Make sure the **Always use Transport Layer Security (TLS) to secure the connection (recommended)** checkbox is selected.  
   * In **Connect only if the recipients email server certificate matches this criteria** select **Issued by a trusted certificate authority (CA)**.  
![Configure security restrictions](https://developers.cloudflare.com/_astro/step11-security.DeBlzdPS_1AlO4G.webp)
12. Select **Next**.
13. You need to validate the connector by using your tenant’s specific journaling address. To find this address, go to the [Email security dashboard ↗](https://horizon.area1security.com/support/service-addresses) \> **Support** \> **Service Addresses page**.  
![Validate the connector](https://developers.cloudflare.com/_astro/step13-validate-email.BJ8ELGKR_Z15FEIf.webp)
14. Add the address and select **Validate**.
15. Once the validation completes, you should receive a **Succeed** status for all the tasks. Select **Next**.  
![Validation success if all goes well](https://developers.cloudflare.com/_astro/step15-validation-success.C5eGCdwd_ZcFiVR.webp)
16. Review the configuration and select **Create connector**.  
![Review your connector](https://developers.cloudflare.com/_astro/step16-review-connector.BrDPEYnr_1AoaE6.webp)

Your connector is now active. You can find it in **Exchange admin center** \> **Mail flow** \> **Connectors**.

![Connector active](https://developers.cloudflare.com/_astro/connector-active.CSWoF3B__AfwHD.webp) 

### 2\. Configure journal rule

1. Log in to the [Microsoft Purview compliance portal ↗](https://compliance.microsoft.com/homepage).
2. Go to **Data lifecycle management** \> **Exchange (legacy)**.
3. Select **Settings** (the gear icon).
4. In **Send undeliverable journal reports to** enter the email address of a valid user account. Note that you cannot use a team or group address.  
![Configure undeliverable emails](https://developers.cloudflare.com/_astro/step4-undeliverable.BIHyokWn_2jjt6y.webp)
5. Select **Save**.
6. Still in the Exchange (legacy) screen, select **Journal Rules**.  
![Select journal rules](https://developers.cloudflare.com/_astro/step6-journal-rules.C9jnQb2-_Z1Sgm9r.webp)
7. Select **New rule** to configure a journaling rule, and configure it as follows:  
   * **Send journal reports to**: This address is specific to each customer tenant, and can be found in your [Email security dashboard ↗](https://horizon.area1security.com/support/service-addresses). For example, `<customer_name>@journaling.mxrecord.io`.  
   * **Journal Rule Name**: `Journal Messages to CloudflareArea 1`  
   * **Journal messages sent or received from**: _Everyone_  
   * **Type of message to journal**: _External messages only_
8. Select **Next**.
9. Verify the information is correct, and select **Submit** \> **Done**.  
![Verify the journal rule information](https://developers.cloudflare.com/_astro/step9-verify-journal-rules.CX-hBGCL_Z2cm0nx.webp)

Once saved, the rule is automatically active. However, it may take a few minutes for the configuration to propagate and start pushing messages to Cloudflare Email security. After it propagates, you can access the Cloudflare Email security dashboard to check the number of messages processed. This number will grow as journaled messages are sent to Cloudflare Email security from your Exchange server.

### 3\. Compliance

#### Create Office 365 distribution lists

For compliance purposes, you might be required to process emails in certain geographic regions such as India or the EU. If that is your case, you should [create Office 365 distribution lists ↗](https://learn.microsoft.com/en-us/microsoft-365/admin/setup/create-distribution-lists?view=o365-worldwide#create-a-distribution-group-list) for each geographic region where you need to process your emails, before configuring your journal rule.

#### Configure journal rule

After creating the distribution lists based on regions for your users, configure your journal rule:

1. Log in to the [Microsoft Purview compliance portal ↗](https://compliance.microsoft.com/homepage).
2. Go to **Data lifecycle management** \> **Exchange (legacy)**.
3. Select **Settings** (the gear icon).
4. In **Send undeliverable journal reports to** enter the email address of a valid user account. Note that you cannot use a team or group address.  
![Configure undeliverable emails](https://developers.cloudflare.com/_astro/step4-undeliverable.BIHyokWn_2jjt6y.webp)
5. Select **Save**.
6. Still in the Exchange (legacy) screen, select **Journal Rules**.  
![Select journal rules](https://developers.cloudflare.com/_astro/step6-journal-rules.C9jnQb2-_Z1Sgm9r.webp)
7. Select **New rule** to configure a journaling rule, and configure it as follows:  
   * **Send journal reports to**: This address is specific to each customer tenant, and can be found in your [Email security dashboard ↗](https://horizon.area1security.com/support/service-addresses). If you need to process emails in certain geographic regions, refer to the [Geographic locations](#geographic-locations) table for more information on what address you should use.  
   * **Journal Rule Name**: `Journal Messages to CloudflareArea 1`  
   * **Journal messages sent or received from**: _A specific user or group_ and select the user group you [created above](#3-compliance).  
   * **Type of message to journal**: _External messages only_
8. Select **Next**.
9. Verify the information is correct, and select **Submit** \> **Done**.  
![Verify the journal rule information](https://developers.cloudflare.com/_astro/step9-verify-journal-rules.CX-hBGCL_Z2cm0nx.webp)

Once saved, the rule is automatically active. However, it may take a few minutes for the configuration to propagate and start pushing messages to Cloudflare Email security. After it propagates, you can access the Cloudflare Email security dashboard to check the number of messages processed. This number will grow as journaled messages are sent to Cloudflare Email security from your Exchange server.

## 4\. Manual message retraction

When retraction is enabled, you can manually retract messages that were not automatically retracted.

1. Log in to the [Email Security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Select the search bar and enter the search parameters to find the emails you are looking for.
3. To retract a single message, select **Retract**. To retract multiple messages, first select the checkboxes on the messages you want to retract. Then, select **Retract**.
4. Choose where you want to retract the message to, and select **Retract message**.  
![Choose your retraction destination](https://developers.cloudflare.com/_astro/step5-retract-destination.ao-rtVzS_Y7VaF.webp)
5. If the retraction was successful, there will be positive confirmation on Email Security (formerly Area 1) dashboard.

## Recover hard deleted messages

Office 365 has two ways for recovering hard deleted email messages:

* **[eDiscovery ↗](https://learn.microsoft.com/en-us/purview/ediscovery?view=o365-worldwide)**
* **[Exchange admin center ↗](https://learn.microsoft.com/en-us/exchange/recipients-in-exchange-online/manage-user-mailboxes/recover-deleted-messages)**

Refer to Microsoft's documentation to learn more about how to use these tools to recover deleted email messages.

## Geographic locations

Select from the following BCC addresses to process email in the correct geographic location.

| Host                                                                  | Location                | Note                                                                                                               |
| --------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| <customer\_name>@journaling.mxrecord.io                               | US                      | Best option to ensure all email traffic processing happens US data centers.                                        |
| <customer\_name>@journaling.mailstream-eu-primary.mxrecord.io         | EU                      | Best option to ensure all email traffic processing happens in Germany, with backup to US data centers.             |
| <customer\_name>@journaling.mailstream-eu1.mxrecord.io                | EU                      | Best option to ensure all email traffic processing happens within the EU without backup to US data centers.        |
| <customer\_name>@journaling.mailstream-bom.mxrecord.mx                | India                   | Best option to ensure all email traffic processing happens within India.                                           |
| <customer\_name>@journaling.mailstream-india-primary.mxrecord.mx      | India                   | Same as mailstream-bom.mxrecord.mx, with backup to US data centers.                                                |
| <customer\_name>@journaling.mailstream-asia.mxrecord.mx               | India                   | Best option to ensure all email traffic processing happens in India, with Australia data centers as backup.        |
| <customer\_name>@journaling.mailstream-syd.area1.cloudflare.net       | Australia / New Zealand | Best option to ensure all email traffic processing happens within Australia.                                       |
| <customer\_name>@journaling.mailstream-australia.area1.cloudflare.net | Australia / New Zealand | Best option to ensure all email traffic processing happens in Australia, with India and US data centers as backup. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/retract-settings/","name":"Retract settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/retract-settings/office365-retraction/","name":"Office 365 retraction"}}]}
```
