---
title: Bulk redirect based on a map object
description: Redirect requests to certain URLs based on a mapped object to the request's URL.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects) 

# Bulk redirect based on a map object

Redirect requests to certain URLs based on a mapped object to the request's URL.

JavaScript

```

export default {

  async fetch(request) {

    // Define a variable with the hostname that needs to be redirected.

    const externalHostname = "example.com";


    // Define the map object. Replace the sources (/pathX) and targets (/redirectX) with ones that apply to your case.

    const redirectMap = new Map([

      ["/path1", "https://" + externalHostname + "/redirect1"],

      ["/path2", "https://" + externalHostname + "/redirect2"],

      ["/path3", "https://" + externalHostname + "/redirect3"],

      ["/path4", "https://cloudflare.com"],

    ]);


    // Clone the original URL.

    const requestURL = new URL(request.url);


    // Check the request path against the map and redirect accordingly.

    const path = requestURL.pathname;

    const location = redirectMap.get(path);


    if (location) {

      return Response.redirect(location, 301);

    }


    // If request path not in map, return the original request.

    return fetch(request);

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/bulk-redirect-map/","name":"Bulk redirect based on a map object"}}]}
```
