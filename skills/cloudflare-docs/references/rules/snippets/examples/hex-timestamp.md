---
title: Add HEX timestamp to a request header
description: Add a custom header to requests sent to the origin server with the current timestamp in hexadecimal format for debugging, tracking, or custom routing purposes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers)[ Request modification ](https://developers.cloudflare.com/search/?tags=Request%20modification) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/hex-timestamp.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Add HEX timestamp to a request header

Add a custom header to requests sent to the origin server with the current timestamp in hexadecimal format.

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/hex-timestamp/","name":"Add HEX timestamp to a request header"}}]}
```
