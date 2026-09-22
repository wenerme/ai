---
description: Manage account-wide Email Sending suppression entries.
title: Manage suppressions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage suppressions

Last updated Sep 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/configuration/suppressions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Manage recipients that Email Service must not contact. For suppression triggers and expiration rules, refer to [Suppression lists](https://developers.cloudflare.com/email-service/concepts/suppressions/).

The dashboard and API are account-scoped. Entries apply to every sending domain and subdomain in the account.

## View suppressions

1. In the Cloudflare dashboard, go to **Compute** > **Email Service** > **Email Sending**. [Go to **Email Sending** ↗](https://dash.cloudflare.com/?to=/:account/email-service/sending)
2. Select **Suppressions**.

The table displays each recipient, reason, creation time, and expiration. **Never** means the entry has no scheduled expiration.

## Add a suppression

1. In **Suppressions**, enter the recipient email address.
2. Select an expiration preset, a custom future time, or **Never**.
3. Select **Add**.

Entries created in the dashboard have the `manual` reason. They apply to every sending domain in the account.

## Import suppressions

You can paste addresses or upload `.csv`, `.json`, or `.txt` files. Supported file contents are:

- `.csv` or `.txt`: Put one entry on each line as `<EMAIL_ADDRESS>` or `<EMAIL_ADDRESS>,<EXPIRATION_TIMESTAMP>`. Use an [RFC 3339 ↗](https://datatracker.ietf.org/doc/html/rfc3339) timestamp and omit the header row.
- `.json`: Use an array of address strings or objects. Each object requires `email` and can include an RFC 3339 `expires_at` timestamp.

1. In **Suppressions**, select **Import**.
2. Upload a supported file or paste the addresses.
3. Choose a default expiration for entries that omit one.
4. Select **Import**. Larger imports run in batches, so keep the dialog open until every batch finishes.

## Remove a suppression

To remove a mutable entry, select **Delete** for that recipient. Read-only entries do not provide a delete action.

Deleting an entry permits future delivery attempts. Verify that the recipient should receive mail before deleting an automatic suppression.

## Use the API

The [account Email Sending suppression management REST API](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/) supports listing, adding, importing, updating, and deleting entries. Requests require an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the **Email Sending: Edit** permission.

API clients must use `read_only` to determine whether an entry is mutable. Do not infer mutability from the `reason` value.

Caution

Deleting a hard-bounce or complaint suppression permits delivery attempts to an address that already failed or reported your mail as spam. Verify the recipient before deleting the entry.

## Limits

Each account can have one active entry per address. For page size, import, and rate limits, refer to [Suppression list limits](https://developers.cloudflare.com/email-service/platform/limits/#suppression-list-limits).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/configuration/suppressions/#page","headline":"Manage suppressions","description":"Manage account-wide Email Sending suppression entries.","url":"https://developers.cloudflare.com/email-service/configuration/suppressions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
