---
title: What is a filter?
description: A filter is a way of setting up if (traffic matches certain criteria), then do something.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-filters/what-is-a-filter.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# What is a filter?

A filter is a way of saying:

```

if (traffic matches certain criteria) then...


```

A filter contains an expression that would return `true` or `false` when evaluated against traffic passing through Cloudflare.

Filter expressions are human and machine readable, and you can compose complex logic to precisely match the traffic that you are interested in detecting and acting upon.

A filter object typically looks like the following:

```

{

  "id": "<FILTER_ID>",

  "expression": "(http.request.uri.path ~ \"^.*wp-login.php$\" or http.request.uri.path ~ \"^.*xmlrpc.php$\") and ip.src ne 93.184.216.34",

  "description": "WordPress login paths via the login page or mobile RPC endpoint"

}


```

The expression specified in this example filter is:

```

(http.request.uri.path ~ "^.*wp-login.php$" or http.request.uri.path ~ "^.*xmlrpc.php$") and ip.src ne 93.184.216.34


```

This filter expression has a `(this or that) and not this` structure designed to:

* Capture two WordPress paths that may be subject to brute force password attacks, and
* Exclude traffic that comes from the IP address `93.184.216.34`.

Imagine that this is an IP for your office. This expression demonstrates a filter that might be used (in a firewall rule) to block access to the WordPress login when accessed outside the office network.

For more information on rule expressions, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) in the Rules language documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/what-is-a-filter/","name":"What is a filter?"}}]}
```
