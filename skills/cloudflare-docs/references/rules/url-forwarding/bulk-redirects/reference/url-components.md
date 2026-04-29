---
title: Supported URL components in Bulk Redirects
description: URL components used in Bulk Redirect source and target URLs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supported URL components in Bulk Redirects

The source and target URLs of a URL redirect support different URL components.

The provided URL component examples in the reference table are based on the following URL:

```

https://user:password@www.example.com:443/search?q=term#results


```

| URL component                                 | Supported in source URL [1](#user-content-fn-1) | Supported in target URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scheme**For example:https                   | Yes, http or https only(optional)               | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **User information**For example:user:password | No                                              | Yes (optional)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Host**For example:www.example.com           | Yes                                             | Yes (optional)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Port**For example:443                       | No                                              | Yes (optional)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Path**For example:/search                   | Yes                                             | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Query string**For example:q=term            | No                                              | Yes, if [**Preserve query string**](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/#preserve-query-string) is false (optional)You can only add a query string to the target URL if you do not keep the original query string (that is, if **Preserve query string** is false). If you set **Preserve query string** to true, the query string of the request will be passed along [when there is a match for the source URL](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/#matching-the-source-url-of-redirects). |
| **Fragment**For example:results               | No                                              | Yes (optional)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

Bulk Redirects also support target URLs without an authority component [2](#user-content-fn-2), like the following URL:

```

magnet:?xt=urn:btih:2bd9d334e8d1e5bd7768755173222db5c6dea13b&dn=archlinux-2021.07.01-x86_64.iso


```

## Footnotes

1. **Supported in source URL** \= **No** means that you cannot include the component in the source URL to match against the URL of incoming requests. [↩](#user-content-fnref-1)
2. The URL authority is the combination of user information, host, and port components. [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/bulk-redirects/","name":"Bulk Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/bulk-redirects/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/url-forwarding/bulk-redirects/reference/url-components/","name":"Supported URL components in Bulk Redirects"}}]}
```
