---
title: Office 365 journaling setup
description: For customers using Microsoft Office 365, setting up Email security via journaling is quick and easy. The following email flow shows how this works:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/office365-journaling.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Office 365 journaling setup

**Last reviewed:**  over 3 years ago 

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

For customers using Microsoft Office 365, setting up Email security via journaling is quick and easy. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Office 365 with Email security.](https://developers.cloudflare.com/_astro/office365-journaling-flow.rlt8bVLi_203hh6.webp) 

Note

Email Security (formerly Area 1) supports Microsoft Office 365 Government Community Cloud (GCC). Refer to [Microsoft 365 Government Community Cloud](https://developers.cloudflare.com/email-security/reference/office365-gcc/) for more information.

## Journaling

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/office365-journaling/","name":"Office 365 journaling setup"}}]}
```
