---
title: Get live viewer counts
description: The Stream player has full support for live viewer counts by default. To get the viewer count for live videos for use with third party players, make a GET request to the /views endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/stream/getting-analytics/live-viewer-count.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get live viewer counts

The Stream player has full support for live viewer counts by default. To get the viewer count for live videos for use with third party players, make a `GET` request to the `/views` endpoint.

Terminal window

```

https://customer-<CODE>.cloudflarestream.com/<INPUT_ID>/views


```

Below is a response for a live video with several active viewers:

```

{ "liveViewers": 113 }


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/getting-analytics/","name":"Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/getting-analytics/live-viewer-count/","name":"Get live viewer counts"}}]}
```
