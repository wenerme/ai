---
title: Random
description: Distribute requests randomly across origins.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Random

**Random steering** sends requests to endpoints purely based on [endpoint weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights). Distributes traffic more accurately, but may cause requests from the same IP to hit different endpoints.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/origin-level-steering/","name":"Local traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/origin-level-steering/random-origin-steering/","name":"Random"}}]}
```
