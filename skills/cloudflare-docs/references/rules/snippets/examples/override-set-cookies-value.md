---
title: Override a Set-Cookie header with a certain value
description: Get a specific `Set-Cookie` header and update it with a certain value.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers)[ Cookies ](https://developers.cloudflare.com/search/?tags=Cookies)[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

# Override a Set-Cookie header with a certain value

Get a specific `Set-Cookie` header and update it with a certain value.

JavaScript

```

export default {

  async fetch(request) {

    // Receive response from the origin

    const response = await fetch(request);


    // Create a new Headers object to modify response headers

    const newHeaders = new Headers(response.headers);


    // Get all Set-Cookie headers

    const cookieArray = response.headers.getSetCookie();

    if (cookieArray.length > 0) {

      const updatedCookies = cookieArray.map((cookie) => {

        // For example, replace the currency value with GBP

        if (cookie.trim().startsWith("currency=")) {

          return cookie.replace(/currency=[^;]+/, "currency=GBP");

        }

        return cookie;

      });


      // Delete the existing Set-Cookie headers

      newHeaders.delete("Set-Cookie");


      // Add the updated Set-Cookie headers individually

      updatedCookies.forEach((cookie) => {

        newHeaders.append("Set-Cookie", cookie.trim());

      });

    }


    // Return the modified response with updated headers

    return new Response(response.body, {

      status: response.status,

      headers: newHeaders,

    });

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/override-set-cookies-value/","name":"Override a Set-Cookie header with a certain value"}}]}
```
