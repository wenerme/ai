---
title: Allow traffic from IP addresses in allowlist only
description: This example blocks incoming requests from IP addresses that are not present in an allowlist (defined using an IP list).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Allow traffic from IP addresses in allowlist only

This example blocks incoming requests from IP addresses that are not present in an allowlist (defined using an [IP list](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists)).

1. [Create an IP list](https://developers.cloudflare.com/waf/tools/lists/create-dashboard/) with the IP addresses for which you want to allow access.  
For example, create an IP list named `allowed_ips` with one or more IP addresses. For more information on the accepted IP address formats, refer to [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists).
2. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocking any requests from IPs not present in the list you created (`allowed_ips` in the current example).  
   * **When incoming requests match**:  
   | Field             | Operator       | Value        |  
   | ----------------- | -------------- | ------------ |  
   | IP Source Address | is not in list | allowed\_ips |  
   If you are using the Expression Editor:  
   `(not ip.src in $allowed_ips)`  
   * **Action**: _Block_
3. (Optional) Update your expression with any extra filters, like blocking non-allowlisted IPs only for specific URI paths:  
| Field             | Operator       | Value        |     |  
| ----------------- | -------------- | ------------ | --- |  
| IP Source Address | is not in list | allowed\_ips | And |  
| URI Path          | wildcard       | /admin/\*    |     |  
If you are using the Expression Editor:  
`(not ip.src in $allowed_ips and http.request.uri.path wildcard "/admin/*")`

## Other resources

* [Use case: Require known IP addresses in site admin area](https://developers.cloudflare.com/waf/custom-rules/use-cases/site-admin-only-known-ips/)
* [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/","name":"Allow traffic from IP addresses in allowlist only"}}]}
```
