---
title: Changelog
description: There are no scheduled entries at this time.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dns.xml) 

There are no scheduled entries at this time.

## 2025-01-27

**Zone IDs and names on individual DNS records**

Records returned by the API will no longer contain the `zone_id` and `zone_name` fields. This change may take up to four weeks to fully roll out. The affected fields were deprecated with an End of Life (EOL) date of November 30, 2024.

## 2024-10-15

**Quote validation for TXT records added via dashboard**

When creating [TXT records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#txt) via the dashboard you will now find:

* Field validation errors if double quotes `"` are added inconsistently.
* Automatically quoted TXT content upon save if no quotes exist in the record content field.

## 2024-10-07

**API support for per-record CNAME flattening**

Paid zones now have the option to flatten specific CNAME records. When using the API, specify the setting `cname_flatten` as `true` or `false`. Refer to the [documentation](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#per-record) for details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/changelog/","name":"Changelog"}}]}
```
