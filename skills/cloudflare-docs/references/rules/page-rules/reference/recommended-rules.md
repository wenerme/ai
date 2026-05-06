---
title: Recommended page rules
description: Recommended Page Rules configurations for common use cases.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Caching ](https://developers.cloudflare.com/search/?tags=Caching)[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects) 

# Recommended page rules

Use Cloudflare Page Rules to improve the user experience of your domain with hardened security and enhanced site performance, while increasing reliability and minimizing bandwidth usage for your origin server.

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

Keep in mind that not all rules will be right for everyone, but these are some of the most popular.

* 301/302 Forwarding URL
* Cache Level in specific paths
* Edge Cache TTL, Always Online, and Browser Cache TTL

### 301/302 Forwarding URL

Note

Consider using [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) or [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/) to forward or redirect traffic to a different URL due to ease of use, maintenance, and cost. You should only use Page Rules when Dynamic or Bulk Redirects do not meet your use case.

Two common examples for using forwarding URLs are:

* Defining the root as the canonical version of your domain.
* Directing visitors to a specific page with an easy to remember URL.

This example page rule configuration defines the root as the canonical version of your domain:

* **If the URL matches**: `*www.example.com/*`
* **Setting**: _Forwarding URL_ | **Select status code**: _301 Permanent Redirect_
* **Enter destination URL**: `https://example.com/$2`

This example redirects visitors to a specific page with an easy to remember URL:

* **If the URL matches**: `*www.example.com/fb*`
* **Setting**: _Forwarding URL_ | **Select status code**: _302 Temporary Redirect_
* **Enter destination URL**: `https://www.facebook.com/username`

### Cache Level in specific paths

Certain sections of a website, like the login or admin section, have different security and performance requirements than your general public-facing pages.

The following example page rule configuration bypasses cache for requests targeting a specific path:

* **If the URL matches**: `example.com/user*`
* **Setting**: _Cache Level_ | **Value**: _Bypass_

### Edge Cache TTL and Browser Cache TTL

Certain resources on your domain will likely not change often. For these resources, taking advantage of aggressive caching options can significantly reduce the load on your server and bandwidth utilization.

#### Examples

In the following example page rule configuration, the target is a folder that holds the majority of the image assets as well as some other types of multimedia.

* **If the URL matches**: `example.com/sites/default/files*`
* **Setting**: _Browser Cache TTL_ | **Value**: _a day_
* **Setting**: _Cache Level |_ **Value**: _Cache Everything_
* **Setting**: _Edge Cache TTL |_ **Value**: _7 days_

The following example page rule configuration applies unique rules for critical pages that do not change very often.

* **If the URL matches**: `example.com/terms-of-service`
* **Setting**: _Browser Cache TTL_ | **Value**: _a day_
* **Setting**: _Always Online |_ **Value**: _On_
* **Setting**: _Cache Level_ | **Value**: _Cache Everything_
* **Setting**: _Edge Cache TTL_ | **Value**: _a month_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/page-rules/","name":"Page Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/page-rules/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/page-rules/reference/recommended-rules/","name":"Recommended page rules"}}]}
```
