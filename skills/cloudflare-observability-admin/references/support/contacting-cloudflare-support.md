---
description: Learn how to contact Cloudflare Support via community, chat, or phone. Get help with issues, verify identity, and understand SLAs for different plans.
title: Contacting Cloudflare Support
image: https://developers.cloudflare.com/support/contacting-cloudflare-support/og.png?v=ffa00cf097157b23
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Contacting Cloudflare Support

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/contacting-cloudflare-support/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Guidelines for contacting Cloudflare support

Cloudflare Support *cannot* perform the following actions:

- Make configuration or account changes on a customer's behalf
- Provide sensitive account info over the phone
- Troubleshoot or debug customer's code and its logic
- Troubleshoot or answer questions about domains not associated with the Cloudflare account email address used to contact support

Caution

**Do not share** any sensitive information, such as passwords, credit card numbers, private keys, or API keys with Cloudflare Support.

Before notifying Cloudflare of an issue with your site, refer to the [Cloudflare Status Page ↗︎](https://www.cloudflarestatus.com/). If reporting issues with your site, ensure you provide adequate details in the support case.

---

## Methods of contacting Cloudflare support

As a Cloudflare customer, you can contact Cloudflare for support via the community portal or by [opening a support case](#submit-a-support-case), live chat, or phone. Support options vary depending on your plan.

|  | Enterprise | Business | Pro | Free |
| --- | --- | --- | --- | --- |
| [Community ↗︎](https://community.cloudflare.com/)<br>Join the community to ask basic troubleshooting questions and to view the latest resources (such as tips for resolving common issues and configuration guidance). | Yes | Yes | Recommended | Recommended |
| [Discord ↗︎](https://discord.cloudflare.com/)<br>Join the Discord community to ask basic troubleshooting questions (mainly focused on the Developer Platform). | Yes | Yes | Recommended | Recommended |
| [Support case ↗︎](https://dash.cloudflare.com/?to=/:account/support)<br>Use to troubleshoot specific issues or errors. Response times depend on your plan. | Yes | Yes | Yes | No<sup>[1](#user-content-fn-1)</sup> |
| **Chat**<sup>[2](#user-content-fn-2)</sup><br>Use for quick questions that do not require deep technical investigation. | Yes | Yes | No | No |
| **Emergency phone**<br>Use phone support to reach out during emergencies such as site outages or DDoS attacks. | Yes | No | No | No |

---

## Phone, chat, or support case?

Use this table to choose the right channel for your situation.

| Situation | Best channel |
| --- | --- |
| Site outage, DDoS attack, or active security incident | [Emergency phone](#emergency-phone-support) (Enterprise only) |
| Urgent follow-up on an existing P1 case | [Emergency phone](#emergency-phone-support) — have your case number ready (Enterprise only) |
| Urgent technical issue (Business plan, weekdays only) | [Live chat](#live-chat-support) |
| Technical question or non-urgent issue | [Support case](#submit-a-support-case) |
| Billing, account, or registrar question | [Support case](#submit-a-support-case) |
| Basic troubleshooting question | [Community ↗︎](https://community.cloudflare.com/) or [Discord ↗︎](https://discord.cloudflare.com/) |

Keep the following in mind:

- Every chat session and phone call automatically creates a support case.
- If you already have an open case, provide your case number when you call or chat.
- If you are not sure which channel to use, [open a support case](#submit-a-support-case).

---

## Emergency phone support

Availability

Available for Enterprise plans only.

In case of an emergency, Enterprise customers can reach Cloudflare Support directly via our global emergency phone line.

For account security, you must verify your identity and account ownership before discussing account settings and sensitive details with Cloudflare Support. There are two verification options:

- A single-use token generated in the dashboard, which automatically refreshes every 30 seconds
- An [authenticator app token](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-totp-mobile-application-authentication) on your mobile device

In both cases, you also need your **Unique Customer ID**, which is displayed in the single-use token pop-up window (step 3 of the [single-use token](#single-use-token-no-setup-required) method below).

### Single-use token (no setup required)

1. In the Cloudflare dashboard, go to the **Support** page and select the account you are calling about.

[Go to Support](https://dash.cloudflare.com/?to=/:account/support)

2. Click the **Emergency hotline** tile.
3. Click **Get a single-use token**. A pop-up window appears with your **Unique Customer ID** and **One Time Passcode**. The code automatically refreshes every 30 seconds.

![](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=493,height=318,format=webp/_astro/Emergency_Phone_Support.IYDzAqH8.png)

### Authenticator app (one-time setup)

1. In the Cloudflare dashboard, go to the **Support** page and select the account you are calling about.

[Go to Support](https://dash.cloudflare.com/?to=/:account/support)

2. Click the **Emergency hotline** tile.
3. Click **Configure authenticator app** and follow the [configuration instructions](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-totp-mobile-application-authentication).
4. After configuration, the token code appears in your mobile authentication app when you need it.

---

## Submit a support case

Availability

Available for all paid plans. Free plan customers can only submit cases for billing, account, and registrar issues.

To submit a support case:

1. In the Cloudflare dashboard, go to the **Support** page and select the account you require assistance for.

[Go to Support](https://dash.cloudflare.com/?to=/:account/support)

2. Click the **Technical Support** tile, or for billing issues click **Billing** and then click **Create a Case** at the bottom of the following screen.
3. Choose the category and subcategories that best define your issue.
4. Choose the affected domains (if applicable).
5. Enter a detailed summary of the issue you are experiencing.
6. Complete the case submission fields as fully as possible. Missing information can delay your response — refer to [Gathering information for troubleshooting sites](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) for guidance. Include:
   - A detailed description of the issue, with:
     - Timestamp (UTC)
     - Zone name and Zone ID
     - Problem frequency
     - Steps to reproduce the issue
     - Actual results versus expected results
   - Any supporting technical information:
     - Exact error messages
     - [HAR files](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file)
     - Screenshots
     - Relevant logs from your origin web server
     - Output from [diagnostic tools](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) such as MTR, traceroute, dig/nslookup, and cURL
   - Priority level and impact to your service or production environment
   - Any collaborators you want CC'd on the case
7. Click **Submit Case**.

### Accepted attachment file formats

You can only upload the following file types in a case or a chat:

*Image*

- png, jpg, gif, ico, tiff

*Video*

- mp4, avi, webm

*Text*

- har, txt, csv, eml, css, html, json, tf

*Packet Capture*

- pcap, pcapng, cap

Cloudflare Support only accepts the Cloudflare One Client diagnostics as compressed files. Do not upload ZIP or RAR files when sharing [HAR files](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file), and do not share compressed documents like DOCX, XLSX, or PPTX.

The maximum file size is **20 MB**. If you need to share a larger file, provide a link using Google Drive or a similar sharing platform.

When sending Cloudflare Support packet captures:

1. Filter for relevant traffic. Use a display filter and then [export specified packets ↗︎](https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html) to reduce the file size.
2. Include the name of the device and interface/tunnel in the file name.
3. Describe what each packet capture shows.

### Manage support cases

1. In the Cloudflare dashboard, go to the **Support** page.

[Go to Support](https://dash.cloudflare.com/?to=/:account/support)

2. Click the **My Cases** tile. You are redirected to the portal where you can see your cases and any cases you are CC'd on.

To add participants to an open case:

3. Select the case you want to add a participant to.
4. Enter their email address in the **Case Participants** box in the top right and click **Add**.

---

## Live chat support

Availability

Available for Business and Enterprise plans, Monday to Friday. Chat is unavailable from Friday 17:00 PT (00:00 UTC Saturday) to Sunday 18:00 PT (01:00 UTC Monday).

Use **live chat** for quick questions that do not require deep technical investigation:

1. In the Cloudflare dashboard, go to the **Support** page.

[Go to Support](https://dash.cloudflare.com/?to=/:account/support)

2. Click the **Chat with a human** tile. The chat widget opens immediately. Enter a brief description of your problem to begin.
3. Wait for an agent to join the conversation. Response times may vary based on current chat volume.

---

## Service level agreements and objectives

### How we prioritize your issue

Cloudflare support responds to every case in the following priority order:

- Premium Enterprise
- Standard Enterprise
- Business
- Pro
- Free

Cloudflare Support strives to respond to our customers as quickly as possible. Urgent issues (site down, under attack) are prioritized for the fastest response. Explicitly specify the priority level and impact to your production service when reaching out to Cloudflare support.

The following definitions explain the priority levels Cloudflare assigns to cases and the associated Service Level Agreement (SLA) or Service Level Objective (SLO). Whenever possible, responses are provided sooner than the noted SLAs.

### Priority definitions

- P1 Urgent — Critical business impact: Severe disruption to your business operations. This issue requires immediate and ongoing attention from both Cloudflare and yourself, as it directly affects revenue, users, or business continuity.
  - *Example*: Your websites, applications, or services are completely unavailable or severely impaired across multiple regions or ISPs.
  - *Example*: A confirmed, active security attack is causing major disruptions, such as denial of service, data breaches, or account compromises.
- P2 High — High business impact: Significant but localized service or security disruption. While not a full outage, this issue affects business operations and requires urgent resolution.
  - *Example*: A recurring or persistent issue is affecting a portion of your users, such as degraded performance, intermittent outages, or limited accessibility.
  - *Example*: A past, confirmed security attack has resulted in measurable impact, requiring investigation and mitigation to prevent recurrence.
- P3 Normal — Moderate business impact: Limited service impact or suspected security concerns. The issue does not pose an immediate risk but requires attention for continued reliability.
  - *Example*: Your service is operational, but you are experiencing minor disruptions, such as performance fluctuations, unexpected behavior, or non-critical bugs.
  - *Example*: A suspected security threat has been detected but is currently mitigated (for example, an attack that Cloudflare successfully blocked).
- P4 Low — Low business impact: General inquiries and non-urgent requests. The issue does not affect your service availability or business operations.
  - *Example*: You are requesting feature enhancements or recommendations for improving security or performance.
  - *Example*: You have questions about Cloudflare products, documentation, or best practices.

### Premium SLA

- P1 Urgent — initial response in 1 hour
- P2 High — initial response in 2 hours
- P3 Normal — initial response in 24 hours
- P4 Low — initial response in 24 hours

### Enterprise SLA

- P1 Urgent — initial response in 2 hours
- P2 High — initial response in 4 hours
- P3 Normal — initial response in 48 hours
- P4 Low — initial response in 48 hours

### SLOs for other plans

Business, Pro, and Free plan customers have no contractual SLA. Cases are responded to in the order they are received. For a faster answer, search or post on the [Community forums ↗︎](https://community.cloudflare.com/).

## Supported languages

Cloudflare provides technical support in English to ensure accuracy during troubleshooting. All support cases, live chats, and phone interactions are conducted in English.

If you need help composing your request in English, browser-based translation tools such as Google Translate can assist with drafting your message.

## Supported regions

Cloudflare offers worldwide support, which covers:

- Asia-Pacific
- Europe, Middle East, and Africa
- North and South America

## Footnotes

1. Free plan customers are encouraged to use the [Cloudflare Community ↗︎](https://community.cloudflare.com/) and can only open support cases for billing, account, and registrar issues. [↩](#user-content-fnref-1)
2. Live chat is available Monday–Friday only. Chat is unavailable from Friday 17:00 PT (00:00 UTC Saturday) to Sunday 18:00 PT (01:00 UTC Monday). [↩](#user-content-fnref-2)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/contacting-cloudflare-support/#page","headline":"Contacting Cloudflare Support","description":"Learn how to contact Cloudflare Support via community, chat, or phone. Get help with issues, verify identity, and understand SLAs for different plans.","url":"https://developers.cloudflare.com/support/contacting-cloudflare-support/","inLanguage":"en","image":"https://developers.cloudflare.com/support/contacting-cloudflare-support/og.png?v=ffa00cf097157b23","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
