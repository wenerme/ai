---
title: Dynamic advertisement
description: Advertise and withdraw IP prefixes on demand through the API or dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Dynamic advertisement

You can use the [Cloudflare API](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#via-the-api) or [the IP Prefixes page](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#via-the-cloudflare-dashboard) in the Cloudflare dashboard to configure the Border Gateway Protocol advertisement at the Cloudflare edge.

When using the API, you can authorize an API call with your email and API key or create a service token for this purpose. A successful API response indicates the service registered the request. Enabling advertising typically takes two to seven minutes and disabling advertising takes approximately 15 minutes.

Both the API and the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) support prefix delegations, which allow other Cloudflare accounts to interact with your prefix. The effect of a delegation is service specific. For more information, refer to [prefix delegations](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/dynamic-advertisement/","name":"Dynamic advertisement"}}]}
```
