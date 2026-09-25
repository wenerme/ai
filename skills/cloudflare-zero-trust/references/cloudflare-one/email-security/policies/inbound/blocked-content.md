---
description: Blocked content policies in Email Security.
title: Blocked content
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Blocked content

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/policies/inbound/blocked-content/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Blocked content policies are only available on Enterprise plans and Enterprise + [PhishGuard](https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/) plans.

Email security allows you to configure blocked content policies. A blocked content policy marks all messages containing specific words or phrases with a malicious [disposition](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/).

## How blocked content works

Blocked content policies use regular expressions to define content patterns that Email security scans for in inbound email messages. You can block content in the subject, body, or both. When a message matches a blocked content policy, Email security automatically assigns it a malicious disposition.

This is useful when your organization needs to block emails containing specific terms associated with known threats, scams, or unwanted content, regardless of who sent them.

## Create a blocked content policy

To create a blocked content policy:

1. Log in to [Cloudflare One ↗︎](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Policies & rules**, then go to **Inbound** > **Blocked content**.
4. Select **Create a policy**.
5. In **Step 1 - Name your policy**, enter a policy name and, optionally, a description in **Note**.
6. In **Step 2 - Build the pattern**, configure the content to block:
   - **Scope**: Choose where to look for the content. Select one of the following:
     - **Subject only**: Match the pattern in the email subject line only.
     - **Body only**: Match the pattern in the email body only.
     - **Subject and body**: Match the pattern in both the subject and body.
   - **Pattern**: Enter a regular expression that defines the content to block. For example, entering `pay` will match content containing that pattern.
   - **Exact word match**: Select this option to only match the exact word. For example, `pay` would match "pay" or "PAY", but not "payment" or "payable". Case is insensitive.
7. In **Step 3 - Validate your policy**, review and test your policy:
   - **Review potential matches**: Displays a list of words that your pattern could match.
   - **Test specific content against your regular expression**: Enter a sample text and select **Test policy** to verify whether your policy catches the expected content.
8. Select **Create policy**.

### Allowed regex modifiers

When building your pattern, you can use the following regex modifiers:

| Regex modifier | Description |
| --- | --- |
| `.` | Any character |
| `*` | Zero or more |
| `+` | One or more |
| `?` | Optional |
| `\d` | Digit |
| `\w` | Word character |
| `\s` | Whitespace |
| `\b` | Word boundary |
| `[abc]` | Character class |
| `[^abc]` | Negated class |
| `[a-z]` | Range |
| `{n,m}` | Quantifier (max 50) |
| \`\\ | \` |
| `^` | Start |
| `$` | End |

## Edit a blocked content policy

To edit a blocked content policy:

1. On the **Blocked content** page, select the policy you want to edit.
2. Select the three dots > **Edit**.
3. Edit the blocked content policy.
4. Select **Save**.

## Delete a blocked content policy

To delete a blocked content policy:

1. On the **Blocked content** page, select the policy you want to delete.
2. Select the three dots > **Delete**.
3. On the pop-up message, select **Delete**.

To delete multiple blocked content policies at once:

1. On the **Blocked content** page, select the policies you want to delete.
2. Select **Action**.
3. Select **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/policies/inbound/blocked-content/#page","headline":"Blocked content","description":"Blocked content policies in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/policies/inbound/blocked-content/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
