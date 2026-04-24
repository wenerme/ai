---
title: cf.timings.client_tcp_rtt_msec
description: The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.
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

#  cf.timings.client\_tcp\_rtt\_msec 

`cf.timings.client_tcp_rtt_msec` ` Number ` 

The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.

This field is only populated for TCP (HTTP/1, HTTP/2) connections. For QUIC connections, the value is `0`.

Example value:

```

20


```

Example usage:

```

# Match requests over TCP where the RTT exceeds 200 ms

cf.timings.client_quic_rtt_msec > 200


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
