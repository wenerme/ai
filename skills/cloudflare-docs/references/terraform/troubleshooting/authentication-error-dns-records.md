---
title: 403 Authentication error when creating DNS records
description: Fix the 403 authentication error caused by incorrect zone data source indexing in Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/terraform/troubleshooting/authentication-error-dns-records.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# 403 Authentication error when creating DNS records

When creating DNS records using Terraform, the API returns the following error:

`Error: failed to create DNS record: HTTP status 403: Authentication error (10000)`

This is caused by an error in your code syntax, when you are not using index `[0]` for the zones. Find an example below and a more detailed thread on [GitHub ↗](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913).

Instead of this:

```

zone_id = data.cloudflare_zones.example_com.id


```

Use this:

```

zone_id = data.cloudflare_zones.example_com.zones[0].id`


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/troubleshooting/authentication-error-dns-records/","name":"403 Authentication error when creating DNS records"}}]}
```
