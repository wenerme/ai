---
description: Email Security for Zero Trust.
title: Email Security
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Email Security

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/troubleshooting/email-security/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review common troubleshooting scenarios for Cloudflare Email Security.

## Email headers and attributes

Email Security identifies threats using detections that result in a final disposition. You can inspect email headers to understand why a specific disposition was applied.

| Attribute           | Description                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CUSTOM\_BLOCK\_LIST | Matches a value defined in your custom block list.                                                                                                                           |
| NEW\_DOMAIN\_SENDER | The email was sent from a newly registered domain.                                                                                                                           |
| NEW\_DOMAIN\_LINK   | The email contains links to a newly registered domain.                                                                                                                       |
| ENCRYPTED           | The email message is encrypted.                                                                                                                                              |
| BEC                 | The sender address is in your [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/). |

## Detections and reclassification

### Handle a false positive

A false positive occurs when a legitimate email is incorrectly flagged as malicious or spam.

**Solution**:

1. In the Email Security dashboard, go to **Investigation**.
2. Find the email and select **Submit for reclassification**.
3. Choose the correct disposition (for example, `Clean`).
4. To prevent future blocks, add the sender to your [Acceptable Senders](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/) list.

### Handle a false negative

A false negative occurs when a malicious email is not detected by Email Security.

**Solution**:

1. Ensure the email actually passed through Email Security by checking for the `X-CFEmailSecurity-Disposition` header.
2. Submit the email for reclassification in the dashboard. This is the preferred method for reporting missed detections.

## Authentication errors

### DMARC failures

Email Security may mark an email as **SPAM** if it fails DMARC authentication and the sending domain has a `p=reject` or `p=quarantine` policy.

**Solution**:

* Ask the sender to fix their DMARC/SPF/DKIM records.
* Configure an [Acceptable Sender](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/) entry to suppress the failure for that specific sender.

## Delivery issues

### Emails are delayed or not arriving

If emails are not being delivered or are arriving with significant latency:

1. **Check MX records**: Ensure your [MX records](https://developers.cloudflare.com/cloudflare-one/email-security/setup/) are correctly configured and pointing to Cloudflare.
2. **Verify connectivity**: From your sending mail server, verify you can connect to Cloudflare's mailstream endpoints on port 25.
3. **Check outbound logs**: In the dashboard, use the **Mail Trace** feature to confirm if Email Security successfully delivered the email to your downstream mail server (for example, Google Workspace or Microsoft 365).

---

## More Email Security resources

For more information, refer to the full Email Security documentation.

[Email Security troubleshooting ❯](https://developers.cloudflare.com/cloudflare-one/email-security/troubleshooting/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/email-security/#page","headline":"Email Security · Cloudflare One docs","description":"Email Security for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/email-security/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
