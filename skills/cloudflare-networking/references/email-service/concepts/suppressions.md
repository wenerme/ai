---
title: Suppression lists
description: Manage Email Service suppression lists to prevent sending to invalid or complaining addresses.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Suppression lists

Manage email suppression lists to prevent emails from being sent to addresses that shouldn't receive them, protecting your sender reputation with automatic and manual suppression management.

Suppression lists prevent emails from being sent to addresses that should not receive them, protecting your sender reputation and ensuring compliance with anti-spam regulations.

## Account suppression list

Cloudflare automatically manages suppressions for your account to preserve your reputation as an email sender.

Cloudflare will automatically add email addresses to your account suppression list for the following reasons:

* **Hard bounces**: Invalid or non-existent email addresses are immediately suppressed.
* **Repeated soft bounces**: Addresses that repeatedly fail delivery are temporarily or permanently suppressed based on the frequency and pattern of failures.
* **Spam complaints**: Recipients who marked emails as spam. Cloudflare integrates with Postmasters to receive spam complaints and automatically updates your account suppression list to prevent you from sending emails to this email address and preserve your email sending reputation.

You may also manually add or remove email addresses from your suppression list as needed. The removal of email addresses that have been automatically added to your suppression list as a result of a spam complaint is limited to avoid abuse.

## Best practices

### List hygiene

Maintaining clean suppression lists is essential for optimal email delivery performance and sender reputation. Regular maintenance helps identify delivery issues early and ensures legitimate recipients can receive your emails.

* Review suppression lists monthly
* Remove temporary suppressions that have expired
* Identify patterns in suppressed addresses
* Update email validation rules based on common issues

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/concepts/suppressions/#page","headline":"Suppression lists · Cloudflare Email Service docs","description":"Manage Email Service suppression lists to prevent sending to invalid or complaining addresses.","url":"https://developers.cloudflare.com/email-service/concepts/suppressions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/concepts/suppressions/","name":"Suppression lists"}}]}
```
