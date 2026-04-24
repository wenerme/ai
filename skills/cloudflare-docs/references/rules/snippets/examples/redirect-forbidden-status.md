---
title: Redirect 403 Forbidden to a different page
description: If origin responded with `403 Forbidden` error code, redirect to different page.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/redirect-forbidden-status.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Redirect 403 Forbidden to a different page

If origin responded with `403 Forbidden` error code, redirect to different page.

JavaScript

```

export default {

  async fetch(request) {

    // Send original request to the origin

    const response = await fetch(request);

    // Check if origin responded with 403 status code

    if (response.status == 403) {

      // If so, redirect to this URL

      const destinationURL = "https://example.com";

      // With this status code

      const statusCode = 301;

      // Serve redirect

      return Response.redirect(destinationURL, statusCode);

    }

    // Otherwise, serve origin's response

    else {

      return response;

    }

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/redirect-forbidden-status/","name":"Redirect 403 Forbidden to a different page"}}]}
```
