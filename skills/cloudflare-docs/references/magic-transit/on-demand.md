---
title: Magic Transit on-demand
description: Activate Magic Transit protection on demand during attacks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Magic Transit on-demand

If you have access to the Magic Transit on-demand option, you can [configure prefix advertisement](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#configure-dynamic-advertisement) from the **IP Prefixes** page in your Cloudflare account home or through the [Cloudflare API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement%5Fstatus/methods/edit/).

A common workflow is to enable prefix advertisement during an attack so that you can take advantage of Cloudflare protection and then disable advertisement once the incident is resolved. Dynamic advertisement (through the dashboard or API) does not support prefixes using BGP-controlled advertisements. Specify your preferred on-demand advertisement method during prefix onboarding.

To ensure smooth operation and simplify the advertisement process during an attack scenario, refer to [Dynamic advertisement: Best practices](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/).

Note

You cannot use Magic Transit on-demand with Cloudflare leased IPs.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/on-demand/","name":"Magic Transit on-demand"}}]}
```
