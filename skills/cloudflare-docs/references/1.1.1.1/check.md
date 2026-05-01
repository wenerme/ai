---
title: Verify connection
description: Verify your device is connected to 1.1.1.1.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verify connection

After [setting up 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/setup/), you can verify that your DNS queries are going through Cloudflare's resolver.

1. Open a web browser on a device that you configured to use 1.1.1.1, or on a device connected to a router you configured.
2. Go to [https://1.1.1.1/help ↗](https://one.one.one.one/help).

The page runs a series of tests and shows whether your connection to 1.1.1.1 is working. It also displays which Cloudflare data center is serving your requests.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/check/","name":"Verify connection"}}]}
```
