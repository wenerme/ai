---
title: Load Balancing
description: If your network has multiple paths to the same destination — for example, redundant tunnels to a data center — you can use Cloudflare Load Balancing to distribute traffic across those paths. This prevents any single path from becoming a bottleneck and allows traffic to fail over automatically if a path goes down.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/load-balancing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Load Balancing

If your network has multiple paths to the same destination — for example, redundant tunnels to a data center — you can use Cloudflare Load Balancing to distribute traffic across those paths. This prevents any single path from becoming a bottleneck and allows traffic to fail over automatically if a path goes down.

Cloudflare WAN (formerly Magic WAN) uses Private Network Load Balancing, which balances traffic across your private network endpoints. It supports both on-ramping (traffic entering Cloudflare's network) and off-ramping (traffic exiting to your sites).

Refer to [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) for more information about the feature and how to set it up. Before using this feature, [enable Load Balancing](https://developers.cloudflare.com/load-balancing/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/load-balancing/","name":"Load Balancing"}}]}
```
