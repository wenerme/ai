---
title: Office 365 - Email security (formerly Area 1) as MX Record
description: In this tutorial, you will learn how to configure Microsoft Office 365 with Email security as its MX record. This tutorial is broken down into several steps. If at any steps during this tutorial you receive a message saying that you need to run the Enable-OrganizationCustomization cmdlet, refer to section 6.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/inline/setup/office-365-area1-mx/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Office 365 - Email security (formerly Area 1) as MX Record

**Last reviewed:**  about 3 years ago 

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

![A schematic showing where Email security is in the life cycle of an email received](https://developers.cloudflare.com/_astro/office365-mx.DyNuwhSm_3difj.webp) 

In this tutorial, you will learn how to configure Microsoft Office 365 with Email security as its MX record. This tutorial is broken down into several steps. If at any steps during this tutorial you receive a message saying that you need to run the `Enable-OrganizationCustomization` cmdlet, [refer to section 6](#6-execute-enable-organizationcustomization-if-required).

Note

Email Security (formerly Area 1) supports Microsoft Office 365 Government Community Cloud (GCC). Refer to [Microsoft 365 Government Community Cloud](https://developers.cloudflare.com/email-security/reference/office365-gcc/) for more information.

For the purposes of this guide, Office 365 and Microsoft 365 are equivalent.

Note

Email Security (formerly Area 1) does not currently manage outbound email. If you intend to remove other existing services that manage outbound email, you will have to plan accordingly on migrating outbound functions back to your email services (such as Office 365 / Google Workspace).

## Prerequisites

To ensure changes made in this tutorial take effect quickly, update the Time to Live (TTL) value of the existing MX records on your domains to five minutes. Do this on all the domains you will be deploying.

Changing the TTL value instructs DNS servers on how long to cache this value before requesting an update from the responsible nameserver. You need to change the TTL value before changing your MX records to Cloudflare Email Security (formerly Area 1). This will ensure that changes take effect quickly and can also be reverted quickly if needed. If your DNS manager does not allow for a TTL of five minutes, set it to the lowest possible setting.

To check your existing TTL, open a terminal window and run the following command against your domain:

Terminal window

```

dig mx <YOUR_DOMAIN>


```

```

; <<>> DiG 9.10.6 <<>> mx <YOUR_DOMAIN>

;; global options: +cmd

;; Got answer:

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39938

;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:

; EDNS: version: 0, flags:; udp: 4096

;; QUESTION SECTION:

;domain.    IN  MX


;; ANSWER SECTION:

<YOUR_DOMAIN>.  300  IN  MX  5 mailstream-central.mxrecord.mx.

<YOUR_DOMAIN>.  300  IN  MX  10 mailstream-east.mxrecord.io.

<YOUR_DOMAIN>.  300  IN  MX  10 mailstream-west.mxrecord.io.


```

In the above example, TTL is shown in seconds as `300` (or five minutes).

If you are using Cloudflare for DNS, you can leave the [TTL setting as **Auto**](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/).

Below is a list with instructions on how to edit MX records for some popular services:

* **Cloudflare**: [Set up email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)
* **GoDaddy**: [Edit an MX Record ↗](https://www.godaddy.com/help/edit-an-mx-record-19235)
* **AWS**: [Creating records by using the Amazon Route 53 console ↗](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)
* **Azure**: [Create DNS records in a custom domain for a web app ↗](https://learn.microsoft.com/en-us/azure/dns/dns-web-sites-custom-domain)

## 1\. Add Email security IP addresses to Allow List

1. Go to the [Microsoft Security admin center ↗](https://security.microsoft.com/homepage).
2. Go to **Email & collaboration** \> **Policies & Rules** \> **Threat policies**.
3. Select the [Anti-spam option ↗](https://security.microsoft.com/antispam).  
![Select the anti-spam option](https://developers.cloudflare.com/_astro/step3-anti-spam.BX6vR5_z_Z1VBPap.webp)
4. Select **Connection filter policy (Default)** \> **Edit connection filter policy**.  
![Select edit connection filter policy](https://developers.cloudflare.com/_astro/step4-edit-filter-policy.A8Ro0_Pg_Z21r1tI.webp)
5. In **Always allow messages from the following IP addresses or address range** add the IP addresses and CIDR blocks mentioned in [Egress IPs](https://developers.cloudflare.com/email-security/deployment/inline/reference/egress-ips/).  
![Enter the egress IP addresses](https://developers.cloudflare.com/_astro/step5-egress-ips.C6oS_7kc_ZtbYAi.webp)
6. Select **Save**.
7. Microsoft recommends disabling SPF Hard fail when an email solution is placed in front of it. Return to the [Anti-spam option ↗](https://security.microsoft.com/antispam).
8. Select **Anti-spam inbound policy (Default)**.
9. At the end of the **Bulk email threshold & spam properties** section, select **Edit spam threshold and properties**.  
![Select the spam threshold and properties button](https://developers.cloudflare.com/_astro/step9-spam-threshold.DQEQPUiI_28BI2v.webp)
10. Scroll to **Mark as spam** \> **SPF record: hard fail**, and ensure it is set to **Off**.  
![Make sure SPF record: hard fail is set to off](https://developers.cloudflare.com/_astro/step10-spf-record-hard-fail.BuwVzD6k_1Hsyug.webp)
11. Select **Save**.

## 2\. Enhanced Filtering configuration

This option will allow Office 365 to properly identify the original connecting IP before the message was received by Email security (formerly Area 1). This helps with SPF analysis. This has two steps:

* Creating an inbound connector.
* Enabling the enhanced filtering configuration of the connector.

### Create an inbound connector

1. Go to the new [**Exchange admin center** ↗](https://admin.exchange.microsoft.com/#/homepage).
2. Select **Mail flow** \> **Connectors**.  
![Select Connectors from Mail flow](https://developers.cloudflare.com/_astro/step2-mailflow-conectors.D-_KSNgO_Zjwgj2.webp)
3. Select **Add a connector**.
4. In **Connection from**, select **Partner organization**.
5. Select **Next**.
6. Set the following options:  
   * **Name** \- `Email security Inbound Connector`  
   * **Description** \- `Inbound connector for Enhanced Filtering`  
![Enter a name and descriptions for your connector](https://developers.cloudflare.com/_astro/step6-connector-options.ED0n-5il_Z1f5i8d.webp)
7. Select **Next**.
8. In **Authenticating sent email**, select **By verifying that the IP address of the sending server matches one of the following IP addresses, which belongs to your partner organization.**
9. Enter all of the egress IPs in the [Egress IPs](https://developers.cloudflare.com/email-security/deployment/inline/reference/egress-ips/) page.  
![Enter all of Email security's Egress IPs](https://developers.cloudflare.com/_astro/step9-egress-ips.4C-zVla8_Zf6nyK.webp)
10. Select **Next**.
11. In **Security restrictions**, accept the default **Reject email messages if they aren't sent over TLS** setting.
12. Select **Next**.
13. Review your settings and select **Create connector**.

### Enable enhanced filtering

Now that the inbound connector has been configured, you will need to enable the enhanced filtering configuration of the connector in the [Security admin console ↗](https://security.microsoft.com/homepage).

1. Go to [Security Admin console ↗](https://security.microsoft.com/homepage) \> **Email & collaboration** \> **Policy & Rules**.
2. Go to **Threat policies** \> **Rules**, and select **Enhanced filtering**.  
![Go to Enhanced filtering](https://developers.cloudflare.com/_astro/step2-enhanced-filtering.DzDMbFoR_Z16LNHR.webp)
3. Select the `Email security Inbound Connector` that you configured previously to edit its configuration parameters.
4. Select **Automatically detect and skip the last IP address** and **Apply to entire organization**.  
![Select Automatically detect and skip the last IP address, and Apply to entire organization](https://developers.cloudflare.com/_astro/step3-selectors.DU-k5j1W_1hQhNt.webp)
5. Select **Save**.

## 3\. Configure Email security quarantine policies

### Select the disposition you want to quarantine

Quarantining messages is a per domain configuration. To modify which domains will have their messages quarantined, access the domain configuration:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon) > **Domains**.
3. Locate the domain you want to edit.
4. Select the **...** \> **Edit**.
5. Select the additional dispositions you want to quarantine.  
![Manage domain quarantines](https://developers.cloudflare.com/_astro/step4-area1-dispositions.lsa9cYbq_ZHhCg1.webp)

Note

When Email security is deployed as the MX record and protecting Office 365, `MALICIOUS` and `SPAM` detections will automatically be quarantined. This behavior cannot be modified.

### Manage the Admin Quarantine

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Email** \> **Admin Quarantine**.
3. Locate the message you want to manage, and select the `...` icon next to it. This will let you preview, download, or release the quarantined message.  
![Manage admin quarantines](https://developers.cloudflare.com/_astro/step4-manage-admin-quarantine.DWu8KCg6_Z4llud.webp)

## 4\. Message handling

There may be scenarios where use of the Office 365 (O365) email quarantine or a combination with Email security is preferred. The following are the best practices for using the O365 quarantine [by disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/):

| Disposition | Action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MALICIOUS   | Should always be quarantined. If the user requires notification, they should require administrator approval to release messages. Users should never have the ability to self remediate MALICIOUS emails without approval from an administrator. Emails should be body and subject tagged.                                                                                                                                                                                                                                    |
| SUSPICIOUS  | Should not be quarantined. Emails should be body and subject tagged, and delivered to the user’s inbox or junk mail folder. Advantage customers should use [URL defang](https://developers.cloudflare.com/email-security/email-configuration/email-policies/link-actions/) with this disposition, while all Enterprise customers should always enable [Email Link Isolation](https://developers.cloudflare.com/email-security/email-configuration/email-policies/link-actions/#email-link-isolation).                        |
| SPAM        | Should always be quarantined. If the user requires notification, they may or may not require administrator approval to release emails. Emails should be subject tagged.                                                                                                                                                                                                                                                                                                                                                      |
| BULK        | Should not be quarantined. Emails should be subject tagged and delivered to the inbox or junk mail folder.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SPOOF       | If SPOOF detections are clean and well managed [in the Allow List](https://developers.cloudflare.com/email-security/email-configuration/lists/), emails should always be quarantined. If the SPOOF detections are not clean, they should have the same treatment as SPAM dispositions if you have [Enhanced Detections](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/) configured. If not, SPOOF detections should be treated as BULK. Emails should be body and subject tagged. |

Office 365 (O365) has various options, as well as limitations, as to how quarantine email messages. Refer to [Office 365 use cases](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/) for more information.

The Email security dashboard has an [Admin quarantine](https://developers.cloudflare.com/email-security/email-configuration/admin-quarantine/), and you can also use the Office 365 quarantine for when a user quarantine is needed. While there are many quarantine options, the following are the primary use cases the Office 365 [example tutorials](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/) will cover:

* **Use case 1**: Deliver emails to Office 365 junk email folder and Admin Quarantine in Email security (Recommended)
* **Use case 2**: Deliver emails to junk email folder and user managed quarantine (this use case requires that `MALICIOUS` emails be quarantined within the Email security dashboard)
* **Use case 3**: Deliver emails to junk email and administrative quarantine
* **Use case 4**: Deliver emails to the user managed quarantine and administrative quarantine
* **Use case 5**: Deliver emails to the user junk email folder and administrative quarantine

## 5\. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. You will need to update and replace your existing MX record with the Email security hosts. For example:

| MX Priority | Host                           |
| ----------- | ------------------------------ |
| 5           | mailstream-eu1.mxrecord.io     |
| 10          | mailstream-central.mxrecord.mx |
| 20          | mailstream-east.mxrecord.io    |
| 20          | mailstream-west.mxrecord.io    |

When configuring the Email Security (formerly Area 1) MX records, it is important to configure hosts with the correct MX priority. This will allow mail flows to the preferred hosts and fail over as needed.

Choose from the following Email Security MX hosts, and order them by priority. For example, if you are located outside the US and want to prioritize email processing in the EU, add `mailstream-eu1.mxrecord.io` as your first host, and then the US servers.

| Host                                                                                   | Location                | Note                                                                                                               |
| -------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| mailstream-central.mxrecord.mx mailstream-east.mxrecord.io mailstream-west.mxrecord.io | US                      | Best option to ensure all email traffic processing happens in the US.                                              |
| mailstream-eu1.mxrecord.io                                                             | EU                      | Best option to ensure all email traffic processing happens in Germany, with backup to US data centers.             |
| mailstream-bom.mxrecord.mx                                                             | India                   | Best option to ensure all email traffic processing happens within India.                                           |
| mailstream-india-primary.mxrecord.mx                                                   | India                   | Same as mailstream-bom.mxrecord.mx, with backup to US data centers.                                                |
| mailstream-asia.mxrecord.mx                                                            | India                   | Best option to ensure all email traffic processing happens in India, with Australia data centers as backup.        |
| mailstream-syd.area1.cloudflare.net                                                    | Australia / New Zealand | Best option to ensure all email traffic processing happens within Australia.                                       |
| mailstream-australia-primary.area1.cloudflare.net                                      | Australia / New Zealand | Best option to ensure all email traffic processing happens in Australia, with India and US data centers as backup. |

DNS changes will reach the major DNS servers in about an hour or follow the TTL value as described in the [Prerequisites section](#prerequisites).

### Secure Office 365 from MX records bypass (recommended)

One method of DNS attacks is to search for old MX records and send phishing emails directly to the mail server. To secure the email flow, you will want to enforce an email flow where inbound messages are accepted by Office 365 only when they originate from Email security. This can be done by adding a connector to only allow email from Email security with TLS encryption. This step is optional but recommended.

Important

This step should not be performed until 24 hours after all domains (excluding your `<on_microsoft.com>` domain) in your Office 365 organization have been onboarded to Email security, and Email security is their MX record. If a domain has not been onboarded or DNS is still propagating, you will impact production email flow for that domain.

#### Configure domains

1. Log in to the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Email Configuration** \> **Domains**, make sure each domain you are onboarding has been added.
4. Set the following options for each domain:  
   * **Domain**: `<YOUR_DOMAIN>`  
   * **Configured as**: `MX Records`  
   * **Forwarding to**: This should match the expected MX record for each domain in the [Domains section ↗](https://admin.microsoft.com/#/Domains/) of Office 365  
   * **IP Restrictions**: Leave empty  
   * **Outbound TLS**: `Forward all messages over TLS`  
   * **Quarantine Policy**: Varies by deployment.

#### Create Connector

1. Go to the new [Exchange admin center ↗](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** \> **Connectors**.
3. Select **Add a connector**.
4. Select **Connection from** \> **Partner organization**.
5. Select **Next**.
6. Set the following options:  
   * **Name** \- `Secure O365 Inbound`  
   * **Description** \- `Only accept inbound email from Email security (formerly Area 1)`
7. Select **Next**.
8. Make sure **By Verifying that the sender domain matches one of the following domains** is selected.
9. Enter `*` in the text field, and select **+**.  
![Enter an asterisk in the text box, and select the plus button](https://developers.cloudflare.com/_astro/step9-create-conector.CrgG_ZCE_ZbqHbw.webp)
10. Select **Next**.
11. Make sure **Reject email messages if they aren't sent over TLS** is selected.
12. Still in the same screen, select **Reject email messages if they aren’t sent from within this IP address range**, and enter all the egress IPs in the [Egress IPs page](https://developers.cloudflare.com/email-security/deployment/inline/reference/egress-ips/).  
![Enter all the egress IPs for Office 365](https://developers.cloudflare.com/_astro/step12-egress-ips.DjrzRr8f_6lGUK.webp)
13. Select **Next**.
14. Review your settings and select **Create connector**.

## 6 Execute `Enable-OrganizationCustomization` (if required)

The following steps are only required if you have not previously customized your Office 365 instance. If you received the message to run this cmdlet in any of the previous steps, you will need to execute it in order to proceed with the configuration. This change may take as long as 24 hours to take effect.

1. Run PowerShell as administrator, and execute the following command. Reply `Yes` when prompted:

PowerShell

```

Install-Module ExchangeOnlineManagement


```

![Run the install-module command in PowerShell](https://developers.cloudflare.com/_astro/step1-install-module.B-3lzoxd_14y1E8.webp) 

Note

This module is a Microsoft module.

1. Run the following commands to execute the policy change and connect to the Office 365 instance:  
PowerShell  
```  
set-executionpolicy remotesigned  
```  
Confirm that you want to execute the policy change, and then run the following command:  
PowerShell  
```  
Import-Module ExchangeOnlineManagement  
```  
Finally, run the following to authenticate against your Office 365 instance:  
PowerShell  
```  
Connect-ExchangeOnline  
```  
![Run the commands to execute the policy change](https://developers.cloudflare.com/_astro/step2-set-executionpolicy.BpqpygoE_Z10HIB3.webp)
2. The `Connect-ExchangeOnline` cmdlet will prompt you to login. Log in using an Office 365 administrator account. Once authenticated, you will be returned to the PowerShell prompt.  
![Log in with an Office 365 admin account](https://developers.cloudflare.com/_astro/step3-connect-exchange.MD9DPBT__Z1zKj7S.webp)
3. You can verify that the `OrganizationCustomization` is enabled by running the command:

PowerShell

```

Get-OrganizationConfig | FL isDehydrated


```

![Run the get-organizationconfig command](https://developers.cloudflare.com/_astro/step4-get-organizationconfig.BulZ0upk_1GA5ON.webp) 

If the result is `false`, `OrganizationCustomization` is already enabled and no further actions are required. If it is true, you need to enable it:

PowerShell

```

Enable-OrganizationCustomization


```

![If the previous result is true, enable the organization customization mode](https://developers.cloudflare.com/_astro/step4-enable-organizationcustomization.D2DkAgo3_2okc0r.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/inline/","name":"Inline"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/inline/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/inline/setup/office-365-area1-mx/","name":"Office 365 - Email security (formerly Area 1) as MX Record"}}]}
```
