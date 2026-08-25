---
description: Outbound Data Loss Prevention (DLP) in Email Security.
title: Outbound Data Loss Prevention (DLP)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Outbound Data Loss Prevention (DLP)

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Compatibility

Outbound DLP is only compatible with Microsoft 365\. You need to have Microsoft E3 or E5 license to enable Outbound DLP.

Outbound Data Loss Prevention ensures the protection of sensitive information in outbound emails with [Cloudflare Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/). Outbound Data Loss Prevention integrates with your inbox, and it proactively monitors your email to prevent unauthorized data leaks.

To enable Outbound DLP:

1. [Create an outbound policy](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/#1-create-an-outbound-policy).
2. [Set up DLP Assist add-in](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/#2-dlp-assist-add-in).

## 1\. Create an outbound policy

An outbound policy allows you to control outbound email flow.

To create an outbound DLP policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Email security** \> **Outbound DLP**.
2. Select **Add a policy**.
3. Name your policy.
4. Build an expression to match specific email traffic. For example, you can create a policy that blocks outbound emails containing identifying numbers:

| Selector            | Operator | Value                                                     | Logic | Action |
| ------------------- | -------- | --------------------------------------------------------- | ----- | ------ |
| Recipient email     | not in   | example.com                                               | And   | Block  |
| Matched DLP profile | in       | _Social Security, Insurance, Tax, and Identifier Numbers_ |       |        |
5. (Optional) Choose whether to use the default block message or a custom message.
6. Select **Create policy**.

After creating your policy, you can modify or reorder your policies in **Email security** \> **Outbound DLP**.

### Selectors

| Selector            | Description                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recipient email     | The intended recipient of an outbound email.                                                                                                       |
| Email sender        | The user in your organization sending an email.                                                                                                    |
| Matched DLP profile | The [DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) that content of an email matches upon scan. |

## 2\. DLP Assist add-in

The Data Loss Prevention (DLP) Assist add-in allows Microsoft 365 users to deploy a DLP solution for free using Cloudflare's Email security. DLP Assist add-in protects your data egress from Outlook web and desktop client.

To set up DLP Assist add-in:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Email security** \> **Outbound DLP**.
2. Select **View Microsoft add-in instructions** \> Select **Download add-in**. This downloads a `.xml` file necessary to install the add-in on the client side.
3. Set up the add-in in Microsoft 365:
  * Log in to the [Microsoft admin panel ↗](https://security.microsoft.com/homepage) and go to **Microsoft 365 Admin Center** \> **Settings** \> **Integrated Apps**.
  * Choose **Upload custom apps** and select **Office Add-in** for the application type.
  * Select **Upload manifest file (.xml) from device**.
  * Upload the Cloudflare add-in file you downloaded in step three. Then, verify and complete the wizard. It can take up to 24 hours for an add-in to propagate.

The add-in works by inserting headers into the [EML ↗](https://en.wikipedia.org/wiki/EML) on the client side before the message is sent out.

To block, encrypt, or send approval, you can configure rules within Microsoft Purview DLP:

1. Go to [Microsoft Purview ↗](https://purview.microsoft.com/datalossprevention/overview?tid=11648e1c-3d60-40e2-bf07-f8d481e48e2d).
2. Select **Policies** \> **Create policy**.
3. Do not choose any templates or custom policy. Select **Next**.
4. Choose a name and description for the policy: You can choose any name. However, this guide will use `Cloudflare Assist Block`.
5. Select **Next** on **Admin Units**:
  * Choose to only apply to **Exchange Email**.
  * Choose **Create or customize advanced DLP Rules**.
6. Select **Create rule**:
  * Create a policy name.
  * Add the following conditions:
    * **Header contains words or phrases**: `Key: cf_outbound_dlp with Value: BLOCK`
    * Select **AND**.
    * **Content is shared from Microsoft 365**: Select **with people from outside my organization**.
7. Under **Actions**, the admin can choose what to do with the message. You can use the **Restrict access or encrypt the content in Microsoft 365 locations** to block the message or encrypt it.
8. Under **User notifications**, turn on notifications. Admins can also edit the message if they want to. You can also configure if the admin wants to receive a notification under **Incident reports** \> **Use this severity level in admin alerts and reports**.
9. Select **Save**.
10. Select **Turn the Policy On Immediately**.

Note

The Cloudflare add-in can take up to 24 hours to propagate after install.

### Limitations

Outbound DLP presents its limitations:

* Outbound DLP only protects user-managed inboxes.
* Outbound DLP offers the most consistent experience on Outlook Web App and Outlook desktop, due to limitations imposed by Microsoft.

| Platform                             | Status                                                   |
| ------------------------------------ | -------------------------------------------------------- |
| Web client                           | Stable                                                   |
| New Outlook desktop client - Windows | Stable                                                   |
| Desktop client - macOS               | Can cause scanning to be delayed due to Apple limitation |
| Old Outlook desktop client           | Does not work due to Microsoft limitation                |
| Mobile client - iOS                  | Unstable due to Apple limitation                         |
| Mobile client - Android              | Unstable due to Microsoft limitation                     |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/#page","headline":"Outbound Data Loss Prevention (DLP) · Cloudflare One docs","description":"Outbound Data Loss Prevention (DLP) in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
```
