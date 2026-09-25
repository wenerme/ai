---
description: Allow policies in Email Security.
title: Allow policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Allow policies

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/policies/inbound/allow-policies/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Email security allows you to configure allow policies. An allow policy exempts messages that match certain patterns from normal detection scanning.

## How allow policies work

Allow policies are crucial for legitimate messages that may otherwise be blocked due to, for example, an incorrect setup.

### Example of allow policy

An example of allow policy is a phishing simulation product. You want to configure a phishing simulation product as **Accept sender** so Email security does not scan the messages (or crawl links) in these simulated messages.

Allow policies can be configured to match messages based on specific criteria such as individual email addresses, IP address ranges, or domains. This flexibility allows you to exempt legitimate messages from specific sources, even if those sources have low spam reputation or send bulk messages from their own servers.

Allow policies are used to mitigate false positives. When an email has been marked as malicious or suspicious, but you still want to receive that email, you configure that email as part of an allow policy.

### Accept sender

Allow policies in Email security give you the option to choose **Accept sender**.

Accept sender creates exceptions for messages that would otherwise be marked as spam, bulk, or spoof. However, Email security will continue to scan the message for maliciousness.

It is recommended to choose this option, as it is the safest option to protect your email inbox from malicious or suspicious activities.

### Example of a use case where marketing emails that are legitimate have been blocked

When a marketing email does not follow the correct template, it may be marked as malicious or spam. It may not be possible to change the template. However, in this scenario, the marketing email is legitimate.

To make sure that users still receive the marketing email, you will have to select **Accept sender** and add the marketing domain in **Rule Type** > **Domains**.

**Accept sender** and **Domains** combined exempt marketing emails that may not follow the correct template.

<details>

<summary>

Regular expressions and emails to add as Accept sender

</summary>

Below you can find a list of known services you can add when configuring an Accept sender. We recommend you use <a href="https://regexr.com/">RegExr Validation ↗︎</a> to validate your regular expressions.

- Google

  <code>drive-shares-noreply@google.com</code>

  <code>.*@docs\.google\.com</code>

  <code>.*@docos\.bounces\.google\.com</code>

  <code>.*@calendar-server\.bounces\.google\.com</code>

  <code>.*@alerts\.bounces\.google\.com</code>

  <code>calendar-notification@google.com</code>

  <code>.*\+bnc.*@&lt;gsuited-company-domain&gt;</code>

  <code>noreply-cloud@google.com</code>

  <code>&lt;groupname&gt;@&lt;gsuite-company-domain&gt;</code>

  <code>.*@doclist\.bounces\.google\.com</code>
- DocuSign

  <code>.*@docusign\.net</code>
- Twitter - Mentions/Retweets

  <code>notify@twitter.com</code>
- GitHub (mentions and notifications)

  <code>noreply@(github|git)\.&lt;github-enterprise-hosting-domain&gt;</code>

  <code>notifications@github.com</code>
- Apache Foundations (Developers)

  <code>.*@.*\.apache\.org</code> <code>jira@apache.org</code>
- Atlassian

  <code>jira@&lt;company-hosted-jira-domain&gt;</code>

  <code>jira@&lt;team-name&gt;.atlassian.net</code>

  <code>confluence@&lt;company-hosted-jira-domain&gt;</code>

  <code>confluence@&lt;team-name&gt;.atlassian.net</code>
- Intercom

  <code>notifications@intercom-mail.com</code>

  <code>notifications@mail.intercom.io</code>
- SharePoint

  <code>no-reply@sharepointonline.com</code>
- Box and Dropbox

  <code>.*@dropbox\.com</code> <code>noreply@box.com</code>
- Salesforce

  <code>.*@chatter\.salesforce\.com</code>

  <code>.*@.*\.(apex|bnc)\.salesforce\.com</code>

  <code>.*@.*\.bnc(\.sandbox)?\.salesforce\.com</code>
- Webex - Invites/Mentions

  <code>messenger@webex.com</code>
- Bulk mailers

  <code>.*@.*mailchimp\.com</code>

  <code>.*@mandrillapp\.com</code>

  <code>.*mailspike\.org</code>
- LinkedIn

  <code>invitations@linkedin.com</code>
- FBWork

  <code>.*@fbworkmail\.com</code>
- Asana

  <code>.*@mail\.asana\.com</code>
- EchoSign

  <code>.*@mail\.echosign\.com</code>
- HelloSign

  <code>noreply@(email|mail)\.hellosign\.com</code>
- Podio

  <code>noreply@podio.com</code>
- Quip

  <code>noreply.*@quip\.com</code>
- Zeplin

  <code>no-reply@zeplin.io</code>
- DataHug

  <code>notifications@datahug.com</code>
- Paperless

  <code>.*@paperlesspost\.com</code>
- NetSuite

  <code>.*@.*\.na\d\.netsuite\.com</code>
- FS-ISAC

  <code>cyberintel@lists.fsisac.com</code>
- Expensify

  <code>replies\+[0-9]+@expensify\.com</code>
- KnowBe4

  <code>.*@[a-z]+\.knowbe4\.com</code>

  <code>147\.160\.167\.([1-5][0-9]|6[0-2]|[1-9])</code>
- FreshDesk

  <code>.*@.*\.freshdesk\.com</code>
- Webroot

  <code>167.89.85.54</code> <code>49.72.237.117</code>
- Wombat Egress IPs

  **Training Platform**

  <code>107.20.210.250</code> <code>52.1.14.157</code>
- Phishing Assessment

  <code>107.23.16.222</code> <code>54.173.83.138</code>

</details>

## Configure allow policies

To configure allow policies:

1. Log in to [Cloudflare One ↗︎](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Policies & rules**, then go to **Inbound** > **Allow policies**.
4. On the **Allow policies** page, select **Add a policy**.
5. On the **Add an allow policy** page, enter the policy information:
   - **Input method**: Choose between **Manual input**, and **Uploading an allow policy**:
     - **Manual input**:
       - **Action**: Select one of the following to choose how Email security will handle messages that match your criteria:
         - **Trust sender**: Messages will bypass all detections and link following.
         - **Exempt recipient**: Message to this recipient will bypass all detections.
         - **Accept sender**: Messages from this sender will be exempted from Spam, Spoof, and Bulk dispositions. Refer to [Allow policy configuration use cases](#use-case-1) for use case examples on how to configure allow policies for accept sender.
     - **Rule type**: Specify the scope of your policy. Choose one of the following:
       - **Email addresses**: Must be a valid email. Enter an email address whose emails are going to be exempted.
       - **IP addresses**: This is the IP address of the email server. Any email address sent from this email server is going to be allowed. The IP address can only be IPv4. IPv6 and CIDR are invalid entries.
       - **Domains**: Must be a valid domain.
     - **Regular expressions**: Must be valid Java expressions. Regular expressions are matched with fields related to the sender email address (envelope from, header from, reply-to), the originating IP address, and the server name for the email. For example, you can enter `.*@domain\.com` to exempt any email address that ends with `domain.com`.
     - **(Recommended) Sender verification**: This option enforces DMARC, SPF, or DKIM authentication. If you choose to enable this option, Email security will only honor policies that pass authentication.
       - **Notes**: Provide additional information about your allow policy.
     - **Uploading an allow policy**: Upload a file no larger than 150 KB. The file can only contain `Values`, `Rule Type`, `Is Regex`, `Sender Verification`, `Trusted Sender`, `Exempt Recipient`, `Acceptable Sender`, and `Notes` fields. The first row must be a header row. Refer to [CSV uploads](#csv-uploads) for an example file.
6. Select **Save**.

<details>

<summary>

Allow policy configuration use cases

</summary>

The following use cases show how you could configure allow policies for accept sender.

### Use case 1

<a href="#use-case-1"></a>

### Company receives emails from third-party providers not used internally. These emails are sent from the service provider, and Email security gives these emails an incorrect disposition.

This use case can affect companies such as Shopify, PayPal, and Docusign.

To solve this:

1. Create a <a href="https://developers.cloudflare.com/cloudflare-one/email-security/submissions/team-submissions/">team submission</a>.
2. Inform your Cloudflare contact about the escalation.
3. Do not set up allow policies or blocked senders. In this use case, configuring allow policies will create a security gap. Setting up blocked senders will block legitimate emails from providers such as Shopify, PayPal, and Docusign.

### Use case 2

<a href="#use-case-2"></a>

### Company receives emails via third-party providers that are used internally. These emails are sent from the company's custom domain, but Email security marks these emails as bulk, spam, or spoof.

This use case can cause the emails you want to receive to follow the auto-moves rules you set up. This use case affects emails from internal tools (such as Salesforce, Atlassian, and Figma) that are given an incorrect disposition.

To solve this, when you add an allow policy in the Cloudflare One dashboard:

1. Choose **Accept sender**.
2. Verify that **Sender verification (recommended)** is turned on.

### Use case 3

<a href="#use-case-3"></a>

### Company receives emails via third-party providers that are used internally. These emails are sent from the company's custom domain, but Email security marks these emails as bulk, spam, or spoof. The custom email domain does not support DMARC, SPF, or DKIM, and would fail Sender Verification.

This use case impacts the emails from internal tools (such as Salesforce, Atlassian, and Figma) that are given an incorrect disposition.

To solve this, when you add an allow policy in the Cloudflare One dashboard:

1. Choose **Accept sender** based on the static IP you own.
2. Ensure that **Sender verification (recommended)** is turned off.

Caution

Do not use email addresses or email domains for this policy as they can be easily spoofed without **Sender Verification (Recommended)** enabled.

</details>

### CSV uploads

You can upload a file no larger than 150 KB. The file can only contain `Values`, `Rule Type`, `Is Regex`, `Sender Verification`, `Trusted Sender`, `Exempt Recipient`, `Acceptable Sender`, and `Notes` fields. The first row must be a header row.

An example file would look like this:

```txt
Values, Rule Type, Is Regex, Sender Verification, Trusted Sender, Exempt Recipient, Acceptable Sender, Notes
whale@notaphish.com, EMAIL, false, true, true, false, true, not a phish
```

## Export allow policies

To export all allow policies:

1. On the **Allow policies** page, select **Value(s)**. Selecting **Value(s)** will select all allow policies.
2. Select **Export to CSV**.

To export specific allow policies:

1. On the **Allow policies** page, select the allow policies you want to export.
2. Select **Export to CSV**.

## Edit allow policy

To edit an allow policy:

1. On the **Allow policies** page, select the allow policy you want to edit.
2. Select the three dots > **Edit**.
3. Edit the allow policy.
4. Select **Save**.

## Delete allow policy

To delete an allow policy:

1. On the **Allow policies** page, select the allow policy you want to delete.
2. Select the three dots > **Delete**.
3. On the pop-up message, select **Delete**.

To delete multiple allow policies at once:

1. On the **Allow policies** page, select the allow policies you want to delete.
2. Select **Action**.
3. Select **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/policies/inbound/allow-policies/#page","headline":"Allow policies","description":"Allow policies in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/policies/inbound/allow-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
