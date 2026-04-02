---
title: Verify connection
description: After setting up 1.1.1.1, you can check if you are correctly connected to Cloudflare's resolver.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/check.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Verify connection

After setting up `1.1.1.1`, you can check if you are correctly connected to Cloudflare's resolver.

1. Open a web browser on a configured device (smartphone or computer) or on a device connected to your configured router.
2. Enter [https://1.1.1.1/help ↗](https://one.one.one.one/help) on the browser address bar.

Wait for the page to load and run its tests. The page will present you a summary of the type of connection you have to `1.1.1.1`, as well as the Cloudflare data center you are connected to.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/check/","name":"Verify connection"}}]}
```
