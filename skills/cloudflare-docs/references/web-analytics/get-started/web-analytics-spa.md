---
title: Web Analytics for SPAs
description: Configure Web Analytics for single-page applications.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SPA ](https://developers.cloudflare.com/search/?tags=SPA) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web-analytics/get-started/web-analytics-spa.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Web Analytics for SPAs

Cloudflare Web Analytics can automatically track user interactions on Single Page Applications (SPAs) by overriding the History API's `pushState` function and listening to the `onpopstate` event. Note that hash-based routers are not supported.

## Disable SPA measurement

If you want to disable the automatic tracking for SPAs, you can do so by adding the `spa` option with a value of `false` in the data attribute of the script tag, as shown below:

```

<script

  defer

  src="https://static.cloudflareinsights.com/beacon.min.js"

  data-cf-beacon=' {"token": "42e216b9090ru59384ygu891dce9eecde", "spa": false} '

></script>


```

### Google Tag Manager (GTM)

If you are using Google Tag Manager (GTM), you can disable SPA tracking by passing the spa option via the query string in the script URL:

```

<script

  defer

  src="https://static.cloudflareinsights.com/beacon.min.js?token=42e216b9090ru59384ygu891dce9eecde&spa=false"

></script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web-analytics/","name":"Cloudflare Web Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/web-analytics/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/web-analytics/get-started/web-analytics-spa/","name":"Web Analytics for SPAs"}}]}
```
