---
title: Contacting Cloudflare Support
description: Learn how to contact Cloudflare Support via community, chat, or phone. Get help with issues, verify identity, and understand SLAs for different plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Contacting Cloudflare Support

## Guidelines for contacting Cloudflare support

Cloudflare Support _cannot_ perform the following actions:

* Make configuration or account changes on a customer’s behalf
* Provide sensitive account info over the phone
* Troubleshoot or debug customer's code and its logic
* Troubleshoot or answer questions about domains not associated with the Cloudflare account email address used to contact support

Warning

**Do not share** any sensitive information, such as passwords, credit card numbers, private keys, or API keys with Cloudflare Support.

Before notifying Cloudflare of an issue with your site, refer to the [Cloudflare Status Page ↗](https://www.cloudflarestatus.com/). If reporting issues with your site, ensure to provide adequate details in the support case _(refer to [Getting help with an issue](#getting-help-with-an-issue) for more information)_.

---

## Methods of contacting Cloudflare support

As a Cloudflare customer, you can contact Cloudflare for support via the community portal or by opening a support case, live chat, or phone. Support options can vary depending on your plan.

| Enterprise                                                                                                                                                                                                        | Business | Pro | Free        |                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --- | ----------- | ------------------------- |
| [Community ↗](https://community.cloudflare.com/)Join the community to ask basic troubleshooting questions and to view the latest resources (such as tips for resolving common issues and configuration guidance). | Yes      | Yes | Recommended | Recommended               |
| [Discord ↗](https://discord.cloudflare.com/)Join the Discord community to ask basic troubleshooting questions (mainly focused on the Developer Platform).                                                         | Yes      | Yes | Recommended | Recommended               |
| [Support case](#getting-help-with-an-issue)Use to troubleshoot specific issues or errors. Response times depend on your plan.                                                                                     | Yes      | Yes | Yes         | No[1](#user-content-fn-1) |
| **Chat**Use to troubleshoot specific issues or errors. Response times depend on your plan.                                                                                                                        | Yes      | Yes | No          | No                        |
| **Emergency Phone** Use phone support to reach out during emergencies such as site outages or DDoS attacks.                                                                                                       | Yes      | No  | No          | No                        |

---

## Emergency Phone Support

Availability

Available for Enterprise plans only.

In case of an emergency, Enterprise customers can reach Cloudflare Support directly via our global emergency phone line.

For account security, you must verify your identity and account ownership before discussing account settings and sensitive details with Cloudflare Support. There are two verification options:

* a single-use token generated in the Dashboard that automatically refreshes every thirty (30) seconds
* an [authenticator app token](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-totp-mobile-application-authentication) on your mobile device.

In both cases, you will also need your **Unique Customer ID** (refer to [Finding your Unique Customer ID](#finding-your-unique-customer-id) for more information).

### Single-use token (no setup required)

1. In the Cloudflare dashboard, go to the **Support** page and select the account you are calling about.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **Emergency hotline** tile.
2. Click **Get a single-use token**. A pop-up window will appear with your **Unique Customer ID** and **One Time Passcode**. The code automatically refreshes every 30 seconds.
![](https://developers.cloudflare.com/_astro/Emergency_Phone_Support.IYDzAqH8_Z57Dpr.webp) 

### Authenticator app (one-time setup)

1. In the Cloudflare dashboard, go to the **Support** page and select the account you are calling about.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **Emergency hotline** tile.
2. Click **Configure authenticator app** and follow the [configuration instructions](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-totp-mobile-application-authentication).
3. After configuration, the token code will appear in your mobile authentication app when you need it.

### Finding your Unique Customer ID

Your Unique Customer ID is required when calling the emergency phone line, regardless of which verification method you use.

1. In the Cloudflare dashboard, go to the **Support** page and select the account you are calling about.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **Emergency hotline** tile.
2. Click **Get a single-use token**. Your **Unique Customer ID** will appear in the pop-up window.

---

## Submit a support case

Availability

Available for all paid plans. Free users can only submit cases for billing, account, and registrar issues.

To submit a support case, follow these steps:

1. In the Cloudflare dashboard, go to the **Support** page and select the account you require assistance for.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **Technical Support** tile, or for billing issues click **Billing** and then click **Create a Case** at the bottom of the following screen.
2. Choose the category and subcategories that best define your issue.
3. Choose the affected domains (if applicable).
4. Enter a detailed summary of the issue you’re experiencing.
5. Complete the case submission fields as completely as possible with the following information. _(**Please note** that missing information will increase the time it takes to resolve your issue and our team may not be able to investigate without enough information. Please review [Gathering information for troubleshooting sites](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) and make sure you include all needed information.)_\- A detailed description of the issue with the following information:  
   * Timestamp (UTC)  
   * ZoneName/ZoneID  
   * Problem frequency  
   * Steps to reproduce the issue, with actual results vs expected results - Any necessary information for a technical investigation  
   * A description of the actual results vs expected results  
   * Steps to reproduce the issue, with example URLs  
   * Exact error messages  
   * [HAR files](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file)  
   * Screenshots  
   * Relevant logs from the origin web server  
   * Output from [test tools](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) such as MTR, traceroute, dig/nslookup, and cURL - Priority level, impact to service / production - Any collaborators whom you wish to be cc'd on the case
6. Click **Submit Case**.

### Accepted attachment file formats

You can only upload the following file types in a case or a chat:

_Image_

* png, jpg, gif, ico, tiff

_Video_

* mp4, avi, webm

_Text_

* har, txt, csv, eml, css, html, json, tf

_Packet Capture_

* pcap, pcapng, cap

Cloudflare Support only accepts the Cloudflare One Client diagnostics as compressed files. Please do not upload ZIP or RAR files when sharing [HAR files](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file), and please do not share compressed documents like DOCX, XLSX, or PPTX.

The maximum file size is **20 MB**. If you need to share a larger file, please provide a link to the file using Google Drive or a similar sharing platform of your choice.

When sending Cloudflare Support packet captures, please do the following:

1. Filter for relevant traffic. Use a display filter and then save [export specified packets ↗](https://www.wireshark.org/docs/wsug%5Fhtml%5Fchunked/ChIOExportSection.html) to reduce the file size.
2. Include the name of the device and interface/tunnel in the file name.
3. Describe what each packet capture shows.

### View open support cases

1. In the Cloudflare dashboard, go to the **Support** page.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **My Cases** tile.
2. You will be redirected to the portal where you can see your own cases and cases you are CC'd on.

### Add participants to open support tickets

1. In the Cloudflare dashboard, go to the **Support** page.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **My Cases** tile.
2. You will be redirected to the portal where you can see your own cases and cases you are CC'd on.
3. Select the case you want to add participants to.
4. Enter their email in the `Case Participants` box in the top right and click **Add**.

---

## Live chat support

Availability

Available for Business and Enterprise plans only.

Use **live chat** for quick questions that do not require deep technical investigation:

1. In the Cloudflare dashboard, go to the **Support** page.
[ Go to Support ](https://dash.cloudflare.com/?to=/:account/support) 
1. Click on the **Chat with a human** tile. The chat widget will open immediately. Enter a brief description of your problem to begin.
2. Wait for an agent to join the conversation. Response times may vary based on current chat volume.

---

## Service Level Agreements and Objectives

### How we prioritize your issue

Cloudflare support responds to every case received in the following priority order:

* Premium Enterprise
* Standard Enterprise
* Business
* Pro
* Free

Cloudflare Support strives to respond to our customers as quickly as possible. Urgent issues (site down, under attack) are prioritized for the quickest response possible. Please explicitly specify the priority level and impact to your production service when reaching out to Cloudflare support.

Below are definitions of the priority levels Cloudflare assigns to cases and the associated Service Level Agreement (SLA) or Service Level Objective (SLO). Whenever possible, responses are provided quicker than the noted SLAs.

### Priority definitions

* P1 Urgent- Critical Business Impact: Severe disruption to your business operations. This issue requires immediate and ongoing attention from both Cloudflare as well as yourself as it directly affects revenue, users, or business continuity.  
   * _Example_: Your websites, applications, or services are completely unavailable or severely impaired across multiple regions or ISPs.  
   * _Example_: A confirmed, active security attack is causing major disruptions, such as denial of service, data breaches, or account compromises.
* P2 High - High Business Impact: Significant but localized service or security disruption. While not a full outage, this issue affects business operations and requires urgent resolution.  
   * _Example_: A recurring or persistent issue is affecting a portion of your users, such as degraded performance, intermittent outages, or limited accessibility.  
   * _Example_: A past, confirmed security attack has resulted in measurable impact, requiring investigation and mitigation to prevent recurrence.
* P3 Normal - Moderate Business Impact: Limited service impact or suspected security concerns. The issue does not pose an immediate risk but requires attention for continued reliability.  
   * _Example_: Your service is operational, but you are experiencing minor disruptions, such as performance fluctuations, unexpected behavior, or non-critical bugs.  
   * _Example_: A suspected security threat has been detected but is currently mitigated (e.g., an attack that Cloudflare successfully blocked).
* P4 Low - Low Business Impact: General inquiries and non-urgent requests. The issue does not impact your service availability or business operations.  
   * _Example_: You are requesting feature enhancements or recommendations for improving security or performance.  
   * _Example_: You have questions about Cloudflare’s products, documentation, or best practices.

### Premium SLA

* P1 Urgent- initial response in 1 hour
* P2 High - initial response in 2 hours
* P3 Normal - initial response in 24 hours
* P4 Low - initial response in 24 hours

### Enterprise SLA

* P1 Urgent - initial response in 2 hours
* P2 High - initial response in 4 hours
* P3 Normal - initial response in 48 hours
* P4 Low - initial response in 48 hours

### SLOs for other plans

* Pay-as-you-go and Free customers - No SLAs are offered, but customers are responded to in the order in which their request is received. For a quicker answer, we highly recommend searching or posting on our [Community forums ↗](https://community.cloudflare.com/).

## Supported languages

For Enterprise support, Cloudflare provides support in English, but makes a best effort to offer help in the following languages:

* Chinese
* French
* German
* Japanese
* Portuguese
* Spanish

## Supported regions

Cloudflare offers worldwide support, which covers:

* Asia-Pacific
* Europe, Middle East, and Africa
* North and South America

## Footnotes

1. Customers on Free plans are encouraged to utilize our Cloudflare Community and will only receive standard case support for billing, account, and registrar issues. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/contacting-cloudflare-support/","name":"Contacting Cloudflare Support"}}]}
```
