---
title: Auth with headers
description: Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the [WebCrypto API](/workers/runtime-apis/web-crypto/).
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Auth with headers

Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the [WebCrypto API](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/).

Caution when using in production

The example code contains a generic header key and value of `X-Custom-PSK` and `mypresharedkey`. To best protect your resources, change the header key and value in the Snippets editor before saving your code.

JavaScript

```

export default {

  async fetch(request) {

    /**

     * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key

     * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard-coded key value

     */

    const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";

    const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";

    const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);


    if (psk === PRESHARED_AUTH_HEADER_VALUE) {

      // Correct preshared header key supplied. Fetch request from origin.

      return fetch(request);

    }


    // Incorrect key supplied. Reject the request.

    return new Response("Sorry, you have supplied an invalid key.", {

      status: 403,

    });

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/auth-with-headers/","name":"Auth with headers"}}]}
```
