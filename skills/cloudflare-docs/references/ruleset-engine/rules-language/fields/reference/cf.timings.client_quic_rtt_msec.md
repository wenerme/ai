---
title: cf.timings.client_quic_rtt_msec
description: The smoothed QUIC round-trip time (RTT) between Cloudflare and the client in milliseconds.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.timings.client\_quic\_rtt\_msec 

`cf.timings.client_quic_rtt_msec` ` Integer ` 

The smoothed QUIC round-trip time (RTT) between Cloudflare and the client in milliseconds.

This field is only populated for QUIC (HTTP/3) connections. For TCP connections, the value is `0`.

Example value:

```

42


```

Example usage:

```

# Match requests over QUIC where the RTT exceeds 200 ms

cf.timings.client_quic_rtt_msec > 200


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
