---
description: Configure Advanced TCP Protection prefixes, allowlists, and rules using the API.
title: Advanced TCP Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced TCP Protection

Last updated May 7, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure Advanced TCP Protection using the Advanced TCP Protection API.

The Advanced TCP Protection API only supports [API token authentication](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

For examples of API calls, refer to [Common API calls](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/examples/).

## Endpoints

To obtain the complete endpoint, append the Advanced TCP Protection API endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `{account_id}` argument is the account ID (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The tables in the following sections summarize the available operations.

### General operations

| Operation | Method and endpoint / Description |
| --- | --- |
| Get Advanced TCP Protection status | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_protection_status` Gets the global Advanced TCP Protection status (enabled or disabled). |
| Update Advanced TCP Protection status | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_protection_status` Enables or disables Advanced TCP Protection. |

### Prefix operations

| Operation | Method and endpoint / Description |
| --- | --- |
| List prefixes | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes` Fetches all Advanced TCP Protection prefixes in the account. |
| Add prefixes in bulk | `POST accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/bulk` Adds prefixes in bulk to the account (up to 300 prefixes per request). |
| Get a prefix | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}` Fetches the details of an existing prefix. |
| Update a prefix | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}` Updates an existing prefix. |
| Delete a prefix | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}` Deletes an existing prefix. |
| Delete all prefixes | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes` Deletes all existing prefixes from the account. |

### Allowlist operations

| Operation | Method and endpoint / Description |
| --- | --- |
| List allowlisted prefixes | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist` Fetches all prefixes in the account allowlist. |
| Add an allowlisted prefix | `POST accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist` Adds a prefix to the allowlist. |
| Get an allowlisted prefix | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{allowlist_id}` Fetches the details of an existing prefix in the allowlist. |
| Update an allowlisted prefix | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{allowlist_id}` Updates an existing prefix in the allowlist. |
| Delete an allowlisted prefix | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{allowlist_id}` Deletes an existing prefix from the allowlist. |
| Delete all allowlisted prefixes | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist` Deletes all existing prefixes from the allowlist. |

### SYN Flood Protection operations

#### Rules

| Operation | Method and endpoint / Description |
| --- | --- |
| List SYN flood rules | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules` Fetches all SYN flood rules in the account. |
| Add a SYN flood rule | `POST accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules` Adds a SYN flood rule to the account. |
| Get a SYN flood rule | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}` Fetches the details of an existing SYN flood rule in the account. |
| Update a SYN flood rule | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}` Updates an existing SYN flood rule in the account. |
| Delete a SYN flood rule | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}` Deletes an existing SYN flood rule from the account. |
| Delete all SYN flood rules | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules` Deletes all existing SYN flood rules from the account. |

#### Filters

| Operation | Method and endpoint / Description |
| --- | --- |
| List SYN flood filters | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters` Fetches all SYN flood filters in the account. |
| Add a SYN flood filter | `POST accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters` Adds a SYN flood filter to the account. |
| Get a SYN flood filter | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}` Fetches the details of an existing SYN flood filter in the account. |
| Update a SYN flood filter | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}` Updates an existing SYN flood filter in the account. |
| Delete a SYN flood filter | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}` Deletes an existing SYN flood filter from the account. |
| Delete all SYN flood filters | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters` Deletes all existing SYN flood filters from the account. |

### Out-of-state TCP Protection operations

#### Rules

| Operation | Method and endpoint / Description |
| --- | --- |
| List out-of-state TCP rules | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules` Fetches all out-of-state TCP rules in the account. |
| Add an out-of-state TCP rule | `POST accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules` Adds an out-of-state TCP rule to the account. |
| Get an out-of-state TCP rule | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}` Fetches the details of an existing out-of-state TCP rule in the account. |
| Update an out-of-state TCP rule | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}` Updates an existing out-of-state TCP rule in the account. |
| Delete an out-of-state TCP rule | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}` Deletes an existing out-of-state TCP rule from the account. |
| Delete all out-of-state TCP rules | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules` Deletes all existing out-of-state TCP rules from the account. |

#### Filters

| Operation | Method and endpoint / Description |
| --- | --- |
| List out-of-state TCP filters | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters` Fetches all out-of-state TCP filters in the account. |
| Add an out-of-state TCP filter | `POST accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters` Adds an out-of-state TCP filter to the account. |
| Get an out-of-state TCP filter | `GET accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}` Fetches the details of an existing out-of-state TCP filter in the account. |
| Update an out-of-state TCP filter | `PATCH accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}` Updates an existing out-of-state TCP filter in the account. |
| Delete an out-of-state TCP filter | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}` Deletes an existing out-of-state TCP filter from the account. |
| Delete all out-of-state TCP filters | `DELETE accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters` Deletes all existing out-of-state TCP filters from the account. |

## Pagination

The API operations that return a list of items use pagination. For more information on the available pagination query parameters, refer to [Pagination](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/#pagination).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/#page","headline":"Configure Advanced TCP Protection via API · Cloudflare DDoS Protection docs","description":"Configure Advanced TCP Protection prefixes, allowlists, and rules using the API.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP"]}
```
