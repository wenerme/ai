---
title: Follow redirects from the origin
description: Modify the fetch request to follow redirects from the origin, ensuring the client receives the final response.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects) 

# Follow redirects from the origin

Modify the fetch request to follow redirects from the origin, ensuring the client receives the final response.

JavaScript

```

export default {

  async fetch(request) {

    // Define fetch options to follow redirects

    const fetchOptions = {

      redirect: "follow", // Ensure fetch follows redirects automatically. Each subrequest in a redirect chain counts against the subrequest limit.

    };


    // Make the fetch request to the origin

    const response = await fetch(request, fetchOptions);


    // Log the final URL after redirects (optional, for debugging)

    console.log(`Final URL after redirects: ${response.url}`);


    // Return the final response to the client

    return response;

  },

};


```

Explain Code

This template is ready for use and should fit most redirect-following scenarios.

It ensures the Snippet transparently follows redirects issued by the origin server. The `redirect: "follow"` option of the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) ensures automatic handling of `3xx` redirects, returning the final response. If the origin response is not a redirect, the original content is returned.

Note

Snippets have a [maximum number of subrequests per invocation](https://developers.cloudflare.com/rules/snippets/#availability) which depends on your plan. If the origin server issues multiple redirects, each redirect subrequest will count towards this limit. When the number of subrequests exceeds the limit for your Cloudflare plan, you will receive a [1202 error](https://developers.cloudflare.com/rules/snippets/errors/#error-1202-snippets-exceeded-subrequests-limit). Ensure your origin configuration minimizes unnecessary redirects.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/follow-redirects/","name":"Follow redirects from the origin"}}]}
```
