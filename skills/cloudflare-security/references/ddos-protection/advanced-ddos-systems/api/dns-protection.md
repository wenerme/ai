---
description: Configure Advanced DNS Protection rules and settings using the Cloudflare API.
title: Advanced DNS Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced DNS Protection

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Cloudflare API](https://developers.cloudflare.com/api/) to configure Advanced DNS Protection via API.

For examples of API calls, refer to [Common API calls](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/examples/).

## Endpoints

To obtain the complete endpoint, append the Advanced DNS Protection API endpoints listed below to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4
```

The `{account_id}` argument is the [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

| Operation                       | Verb + Endpoint                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List DNS protection rules       | GET accounts/{account\_id}/magic/advanced\_dns\_protection/configs/dns\_protection/rulesFetches all DNS protection rules in the account.                                  |
| Add a DNS protection rule       | POST accounts/{account\_id}/magic/advanced\_dns\_protection/configs/dns\_protection/rulesAdds a DNS protection rule to the account.                                       |
| Get a DNS protection rule       | GET accounts/{account\_id}/magic/advanced\_dns\_protection/configs/dns\_protection/rules/{rule\_id}Fetches the details of an existing DNS protection rule in the account. |
| Update a DNS protection rule    | PATCH accounts/{account\_id}/magic/advanced\_dns\_protection/configs/dns\_protection/rules/{rule\_id}Updates an existing DNS protection rule in the account.              |
| Delete a DNS protection rule    | DELETE accounts/{account\_id}/magic/advanced\_dns\_protection/configs/dns\_protection/rules/{rule\_id}Deletes an existing DNS protection rule from the account.           |
| Delete all DNS protection rules | DELETE accounts/{account\_id}/magic/advanced\_dns\_protection/configs/dns\_protection/rulesDeletes all existing DNS protection rules from the account.                    |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/#page","headline":"Configure Advanced DNS Protection via API · Cloudflare DDoS Protection docs","description":"Configure Advanced DNS Protection rules and settings using the Cloudflare API.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
