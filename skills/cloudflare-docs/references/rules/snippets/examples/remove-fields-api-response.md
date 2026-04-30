---
title: Remove fields from API response
description: If origin responds with `JSON`, parse the response and delete fields to return a modified response.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

# Remove fields from API response

If origin responds with `JSON`, parse the response and delete fields to return a modified response.

JavaScript

```

export default {

  async fetch(request) {

    // Send original request to the origin

    const response = await fetch(request);

    // Check if origin responded with JSON

    try {

      // Parse API response as JSON

      var api_response = response.json();

      // Specify the fields you want to delete. For example, to delete "botManagement" array from parsed JSON:

      delete api_response.botManagement;

      // Serve modified API response

      return Response.json(api_response);

    } catch (err) {

      // On failure, serve unmodified origin's response

      return response;

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/remove-fields-api-response/","name":"Remove fields from API response"}}]}
```
