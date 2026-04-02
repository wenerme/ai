---
title: Google Workspace - Email security (formerly Area 1) as MX Record
description: In this tutorial, you will learn how to configure Google Workspace with Email security as MX record. This tutorial is broken down into several steps.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/inline/setup/gsuite-area1-mx.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Google Workspace - Email security (formerly Area 1) as MX Record

**Last reviewed:**  over 3 years ago 

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

![A schematic showing where Email security is in the life cycle of an email received](https://developers.cloudflare.com/_astro/gsuite-area1-mx.CQEikhes_Z1e4yPm.webp) 

In this tutorial, you will learn how to configure Google Workspace with Email security as MX record. This tutorial is broken down into several steps.

Note

Email Security (formerly Area 1) does not currently manage outbound email. If you intend to remove other existing services that manage outbound email, you will have to plan accordingly on migrating outbound functions back to your email services (such as Office 365 / Google Workspace).

## Requirements

* Provisioned Email security account.
* Access to the Google administrator console ([**Google administrator console** ↗](https://admin.google.com) \> **Apps** \> **Google Workspace** \> **Gmail**).
* Access to the domain nameserver hosting the MX records for the domains that will be processed by Email security.

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

## 1\. Add Email security IP addresses to the Inbound gateway configuration

When Email security is deployed as the MX record for Google Workspace, the Inbound gateway needs to be configured such that Google Workspace is aware that it is no longer the MX record for the domain. This is a critical step as it will allow Google Workspace to accept messages from Email security.

1. Go to the [Google Administrative Console ↗](https://admin.google.com/).
2. Go to **Apps** \> **Google Workspace** \> **Gmail**.  
![Access Gmail](https://developers.cloudflare.com/_astro/step2-gmail.D8N71eim_ZecRV1.webp)
3. Select **Spam, Phishing, and Malware** and scroll to **Inbound Gateway configuration**.  
![Access the spam, phishing and malware setting](https://developers.cloudflare.com/_astro/step3-spam.TRV_ctWA_ncgXs.webp)
4. Enable **Inbound Gateway**, and configure it with the following details:  
![Enable inbound gateway](https://developers.cloudflare.com/_astro/step4-inbound-gateway.DwLu0Jgk_Z2dFOdL.webp)  
   * In **Gateway IPs**, select the **Add** link, and add the IPs mentioned in [Egress IPs](https://developers.cloudflare.com/email-security/deployment/inline/reference/egress-ips/).  
   * Select **Automatically detect external IP (recommended)**.  
   * Select **Require TLS for connections from the email gateways listed above**.  
![Inbound gateway settings](https://developers.cloudflare.com/_astro/step4-inbound-gateway-settings.UnL9joHq_Z1FytTw.webp)

Note

Do not select **Reject all mail not from gateway IPs** until the MX records have fully propagated. [Refer to step 5](#5-secure-your-email-flow) for more details.

1. Select the **Save** button at the bottom of the dialog box to save the configuration once the details have been entered. Once saved, the administrator console will show the Inbound Gateway as **enabled**.  
![Inbound gateway on](https://developers.cloudflare.com/_astro/step5-inbound-on.DPCrYf9H_20arD7.webp)

## 2\. Quarantine malicious detections

This optional step is highly recommended to prevent users from being exposed to malicious messages.

When messages are identified as malicious, Email security will insert the X-header `X-Area1Security-Disposition` into the message with the corresponding disposition. Based on the value of the `X-Area1Security-Disposition`, a content compliance filter can be configured to send malicious detections to an administrative quarantine. This section will outline the steps required to:

* Create an Email security Malicious quarantine.
* Create the content compliance filter to send malicious messages to quarantine.

### Create Email security Malicious Quarantine

If you would like to send Email security malicious detection to a separate quarantine other than the default quarantine, you will need to create a new quarantine.

1. In [Google's administrative console ↗](https://admin.google.com), select the **Manage quarantines** panel.  
![Select the manage quarantines panel](https://developers.cloudflare.com/_astro/step1-manage-quarantines.Kq6I6Yor_EUqkF.webp)
2. Select **ADD QUARANTINE** to configure the new quarantine. This will bring up a pop-up for the configuration details.  
![Select the add quarantine button](https://developers.cloudflare.com/_astro/step2-add-quarantine.CVZq1ipO_Z1QY4oI.webp)
3. In the quarantine configuration pop-up, enter the following:  
   * **Name**: `Email security Malicious`.  
   * **Description**: `Email security Malicious`.  
   * For the **Inbound denial consequence**, select **Drop Message**.  
   * For the **Outbound denial consequence**, select **Drop Message**.  
![Configure the quarantine settings](https://developers.cloudflare.com/_astro/step3-configure-quarantine.Bd4Dhxyp_Zl7m36.webp)

When you are finished entering these details, select **SAVE**.

1. To access the newly create quarantine, select **GO TO ADMIN QUARANTINE** or access the quarantine directly by pointing your browser to [https://email-quarantine.google.com/adminreview ↗](https://email-quarantine.google.com/adminreview).  
![Access the quarantine created](https://developers.cloudflare.com/_astro/step4-access-quarantine.xZBJkpYu_Z1m7loP.webp)  
Once in the Admin quarantine console, you can access the **Email security Malicious** quarantine by selecting **Quarantine:ALL** \> **Email security Malicious** in the filter section. Quarantined messages can be released as needed by an administrator.  
![Access Email security](https://developers.cloudflare.com/_astro/step4-area1.dpzSbYUX_Z242zRb.webp)

### Create a content compliance filter to send malicious messages to quarantine

1. In [Google's administrative console ↗](https://admin.google.com), select **Compliance** to configure the content compliance filter.  
![Access the compliance configuration](https://developers.cloudflare.com/_astro/step1-compliance.t3TUTyHx_1XKhv5.webp)
2. Go to the **Content compliance** area and select **CONFIGURE** to open the configuration dialog pop-up.  
![Select the configure button](https://developers.cloudflare.com/_astro/step2-configure.CLciz-bk_Z2h2dLu.webp)
3. In the **Content compliance filter** configuration, enter the following:  
   * **Name**: `Quarantine Email security Malicious`.  
   * In **1\. Email message to affect**, select **Inbound**.  
   * In **2\. Add expression that describe the content you want to search for in each message**:  
         * Select **Add** to add the condition.  
                  * In the _Simple content match_ dropdown, select **Advanced content match**.  
                  * In **Location**, select **Full headers**.  
                  * In **Match type**, select **Contains text**.  
                  * In **Content**, enter `X-Area1Security-Disposition: MALICIOUS`.  
         * Select **SAVE** to save the condition.  
   * In **3\. If the above expression match, do the following**, select the _Action_ dropdown. Then choose **Quarantine message** and the **Email security Malicious** quarantine that was created in the previous step.  
![Configure the compliance filter](https://developers.cloudflare.com/_astro/step3-compliance-filter.ChHR2c1N_T13wD.webp)  
After you enter this information, select **SAVE**.
4. Once saved, the console will update with the newly configured **content compliance filter**.  
![After configuration, the console shows the content compliance filter](https://developers.cloudflare.com/_astro/step4-compliance-filter.CXywFHVJ_2tKR78.webp)  
If you would like to quarantine the other dispositions, repeat the above steps and use the following strings for the other dispositions:  
   * `X-Area1Security-Disposition: MALICIOUS`  
   * `X-Area1Security-Disposition: SUSPICIOUS`  
   * `X-Area1Security-Disposition: SPOOF`  
   * `X-Area1Security-Disposition: UCE` (`UCE` is the equivalent of `SPAM`)  
If desired, you can create a separate quarantine for each of the dispositions.

Note

Google handles Groups (that is, distributions lists) differently from user mail accounts. The compliance filters actions are limited to the **Users** account type. If you heavily use Google Groups (that is, distribution lists), quarantining malicious messages using the Email security quarantine is the recommended method to ensure full protection.

## 3\. Add your domain to Email security

To avoid email loop errors, add your domain to your Email security dashboard.

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/home).
2. Go to **Settings** (the gear icon).
3. In **Email Configuration** \> **Domains**, select **New Domain**.
4. Enter the following settings:  
   1. **Domain**: Enter the domain you want Email security to protect.  
   2. **Configured as**: Select **MX Records**.  
   3. **Forwarding to**: Add `google.com`.  
   4. **Quarantine policy**: Select **Malicious** and **Spam**.
5. Select **Publish domain**.

## 4\. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. You need to replace the existing Google MX records with the Email security hosts. For example:

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

## 5\. Secure your email flow

After 36 hours, the MX record DNS update will have sufficiently propagated across the Internet. It is now safe to secure your email flow. This will ensure that Google only accepts messages that are first received by Email security. This step is highly recommended to prevent threat actors from using cached MX entries to bypass Email security by injecting messages directly into Gmail.

1. Access the [Google Administrative Console ↗](https://admin.google.com/), then select **Apps** \> **Google Workspace** \> **Gmail**.
2. Select **Spam, Phishing, and Malware**.
3. Go to **Inbound Gateway configuration** and select **Configure**.
4. Enable **Reject all mail not from gateway IPs** and select **Save**.
5. Select **Save** once more to commit and activate the configuration change in the Gmail advanced configuration console.

## 6\. Send Email security spam to user spam folder (optional)

Unlike the configuration in [step 2](#2-quarantine-malicious-detections) where the message can be sent to an administrative quarantine, this optional step can be configured to send messages that are identified as spam by Email security to the user’s spam folder.

1. Access [Google's Administrative Console ↗](https://admin.google.com/), then select **Apps** \> **Google Workspace** \> **Gmail**.
2. Select **Spam, Phishing, and Malware**.
3. Go to **Inbound Gateway configuration** and select **Configure**.
4. In the **Message Tagging** section, select **Message is considered spam if the following header regexp matches**.
5. In the **Regexp** section, enter the string `X-Area1Security-Disposition: UCE` (`UCE` is the equivalent of `SPAM`).
6. Select **SAVE** to save the updated configuration.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/inline/","name":"Inline"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/inline/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/inline/setup/gsuite-area1-mx/","name":"Google Workspace - Email security (formerly Area 1) as MX Record"}}]}
```
