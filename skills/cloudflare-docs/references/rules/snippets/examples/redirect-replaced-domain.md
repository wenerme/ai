---
title: Redirect from one domain to another
description: Redirect all requests from one domain to another domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirect from one domain to another

Redirect all requests from one domain to another domain.

JavaScript

```

export default {

  async fetch(request) {

    // Define variables to use in the response redirect.

    const base = "https://example.com";

    const statusCode = 301;


    // Clone the original URL.

    const url = new URL(request.url);


    // Define a "pathname" and "search" variables, extracting their values from the cloned URL.

    const { pathname, search } = url;


    // Define the destination URL using the variables you declared previously.

    const destinationURL = `${base}${pathname}${search}`;

    console.log(destinationURL);


    // Respond with the redirect.

    return Response.redirect(destinationURL, statusCode);

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/redirect-replaced-domain/","name":"Redirect from one domain to another"}}]}
```
