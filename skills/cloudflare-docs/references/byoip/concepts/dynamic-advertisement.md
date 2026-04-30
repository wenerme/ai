---
title: Dynamic advertisement
description: Advertise and withdraw IP prefixes on demand through the API or dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dynamic advertisement

Dynamic advertisement allows you to control when Cloudflare announces your IP prefixes via BGP. When a prefix is advertised, Cloudflare announces it to the Internet so that traffic destined for those IPs can be routed to Cloudflare. When a prefix is withdrawn, Cloudflare stops announcing it — traffic will then follow whatever other BGP routes exist for that prefix.

You can advertise and withdraw prefixes on demand using the [Cloudflare API](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#via-the-api) or the [IP Prefixes page](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#via-the-cloudflare-dashboard) in the Cloudflare dashboard. Enabling advertisement typically takes two to seven minutes, and disabling advertisement takes approximately 15 minutes.

When using the API, you can authorize the call with your email and API key or create a service token for this purpose. A successful API response indicates the service registered the request.

Both the API and the Cloudflare dashboard support [prefix delegations](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/), which allow other Cloudflare accounts to interact with your prefix. The effect of a delegation is service-specific.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/dynamic-advertisement/","name":"Dynamic advertisement"}}]}
```
