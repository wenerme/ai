---
title: Append dates to cookies to use with A/B testing
description: Dynamically set a cookie expiration and test group.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ A/B testing ](https://developers.cloudflare.com/search/?tags=A/B%20testing)[ Cookies ](https://developers.cloudflare.com/search/?tags=Cookies) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/append-dates-to-cookies.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Append dates to cookies to use with A/B testing

Dynamically set a cookie expiration and test group.

JavaScript

```

export default {

  async fetch(request) {

    const response = await fetch(request);


    // Clone the response so that it is no longer immutable

    const newResponse = new Response(response.body, response);


    // Define the dynamic expiry time. 24 h * 60 m * 60 s * 1000 ms = 86,400,000 ms

    const expiry = new Date(Date.now() + 7 * 86400000).toUTCString();

    // Define the group variable. "A" if the request header "userGroup" is "premium", "B" if otherwise.

    const group = request.headers.get("userGroup") == "premium" ? "A" : "B";


    // Append the custom header with the values

    newResponse.headers.append(

      "Set-Cookie",

      `testGroup=${group}; Expires=${expiry}; Path=/`,

    );


    return newResponse;

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/append-dates-to-cookies/","name":"Append dates to cookies to use with A/B testing"}}]}
```
