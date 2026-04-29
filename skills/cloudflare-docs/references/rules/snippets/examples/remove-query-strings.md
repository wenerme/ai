---
title: Remove query strings before sending request to origin
description: Remove certain query strings from a request before passing to the origin.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Request modification ](https://developers.cloudflare.com/search/?tags=Request%20modification) 

# Remove query strings before sending request to origin

Remove certain query strings from a request before passing to the origin.

JavaScript

```

export default {

  async fetch(request) {

    // Define the query strings you want to remove

    const queryStringsToRemove = ["utm_source", "utm_medium", "utm_campaign"];


    // Get the URL from the request

    const url = new URL(request.url);


    // Remove the specified query strings

    queryStringsToRemove.forEach((query) => {

      url.searchParams.delete(query);

    });


    // Create a new request with the modified URL

    const modifiedRequest = new Request(url, request);


    // Pass the modified request to the origin

    const response = await fetch(modifiedRequest);


    return response;

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/remove-query-strings/","name":"Remove query strings before sending request to origin"}}]}
```
