---
title: cf.timings.origin_ttfb_msec
description: The round-trip time (RTT) between the Cloudflare global network and the origin server in milliseconds.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

#  cf.timings.origin\_ttfb\_msec 

`cf.timings.origin_ttfb_msec` ` Integer ` 

The round-trip time (RTT) between the Cloudflare global network and the origin server in milliseconds.

This field provides insight into origin server latency. It represents the Time to First Byte (TTFB) from the perspective of the Cloudflare edge server.

This metric includes both the network RTT and the time the origin server spent handling the request.

If the request was served from the Cloudflare CDN cache and the origin server was not reached, the value of this field will be `0`.

Example value:

```

150


```

Example usage:

```

# Matches requests where the origin response time (TTFB) was greater than 2 seconds:

cf.timings.origin_ttfb_msec > 2000


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
