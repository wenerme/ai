---
title: Send suspect bots to a honeypot
description: Use the [bot score field](/workers/runtime-apis/request/#incomingrequestcfproperties) to send bots to a honeypot.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Send suspect bots to a honeypot

Use the [bot score field](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) to send bots to a honeypot.

JavaScript

```

export default {

  async fetch(request) {

    const response = await fetch(request);


    // Clone the response so that it is no longer immutable

    const newResponse = new Response(response.body, response);


    if (request.cf.botManagement.score < 30) {

      const honeypot = "https://example.com/";

      return await fetch(honeypot, request);

    } else {

      return newResponse;

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/bots-to-honeypot/","name":"Send suspect bots to a honeypot"}}]}
```
