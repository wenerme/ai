---
title: Send timestamp to origin as a custom header
description: Convert timestamp to hexadecimal format and send it as a custom header to the origin.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Send timestamp to origin as a custom header

Convert timestamp to hexadecimal format and send it as a custom header to the origin.

JavaScript

```

export default {

  async fetch(request) {

    // Get the current timestamp

    const timestamp = Date.now();


    // Convert the timestamp to hexadecimal format

    const hexTimestamp = timestamp.toString(16);


    // Clone the request and add the custom header

    const modifiedRequest = new Request(request, {

      headers: new Headers(request.headers),

    });

    modifiedRequest.headers.set("X-Hex-Timestamp", hexTimestamp);


    // Log the custom header for debugging

    console.log(`X-Hex-Timestamp: ${hexTimestamp}`);


    // Pass the modified request to the origin

    const response = await fetch(modifiedRequest);


    return response;

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/send-timestamp-to-origin/","name":"Send timestamp to origin as a custom header"}}]}
```
