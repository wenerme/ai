---
title: A/B testing with same-URL direct access
description: Set up an A/B test by controlling what response is served based on cookies.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ A/B testing ](https://developers.cloudflare.com/search/?tags=A/B%20testing)[ Cookies ](https://developers.cloudflare.com/search/?tags=Cookies)[ URL rewrite ](https://developers.cloudflare.com/search/?tags=URL%20rewrite) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/ab-testing-same-url.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# A/B testing with same-URL direct access

Set up an A/B test by controlling what response is served based on cookies.

This version passes through requests for `/test/*` and `/control/*` URI paths to the origin server, bypassing random assignment.

JavaScript

```

const NAME = "myExampleABTest";


export default {

  async fetch(request) {

    // Clone the original URL

    const url = new URL(request.url);


    // Enable Passthrough to allow direct access to control and test routes.

    if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))

      return fetch(request);


    // Determine which group this requester is in.

    const cookie = request.headers.get("cookie");


    if (cookie && cookie.includes(`${NAME}=control`)) {

      url.pathname = "/control" + url.pathname;

    } else if (cookie && cookie.includes(`${NAME}=test`)) {

      url.pathname = "/test" + url.pathname;

    } else {

      // If there is no cookie, this is a new client. Choose a group and set the cookie.

      const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split

      if (group === "control") {

        url.pathname = "/control" + url.pathname;

      } else {

        url.pathname = "/test" + url.pathname;

      }

      // Reconstruct response to avoid immutability

      let response = await fetch(url);

      response = new Response(response.body, response);

      // Set cookie to enable persistent A/B sessions.

      response.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);

      return response;

    }

    return fetch(url);

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/ab-testing-same-url/","name":"A/B testing with same-URL direct access"}}]}
```
