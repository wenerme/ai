---
title: Fetch HTML
description: Send a request to a remote server, read HTML from the response, and serve that HTML.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/fetch-html.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Fetch HTML

**Last reviewed:**  over 2 years ago 

Send a request to a remote server, read HTML from the response, and serve that HTML.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/fetch-html)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-7444)
* [  TypeScript ](#tab-panel-7445)
* [  Python ](#tab-panel-7446)
* [  Hono ](#tab-panel-7447)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * Replace `remote` with the host you wish to send requests to

     */

    const remote = "https://example.com";


    return await fetch(remote, request);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAWYQHYAnAEZpAZgBMADkUAuFizbAOcLjT4CR46XKWKAsACgAwuioQApnewARKAGcY6N1Gi2VJTTwCYhIqOGB7BgAiKBp7AA8AOgArNyjSVCgwR3DImLik1KjLGztHCGwAFToYe384GBgwPgIoW2RkuAA3ODdeBFgIAGpgdFxwe0tLBM8kElx7VDhwCBIAbwsSEl66Kl4A+wheAAsACgR7AEcQezcIAEp1za2SZAAqN+eXt5IAJXsmnBePYSAADC6jBygkgAdx8xxIEGOIOOXlWdEosPcCIg6BIbkcuBIF2utwgbkR6C+WzeyGpvFsd2J9khIIYJCixwgEBgbhUyGQCXCTXsiQZwHSFmpFwgIAQVG2MLgPgORzOEPQDgANMzSXd7kRngBfLUWI1ESzqZiabS6Hj8ISiSQyKQKZQlWwOJyuDxeHxtKj+QLaUhhCLRCKEbTpAJZHLhqJkMDoMjFaye8pVGp1baNZq8VrtVK2KYWNZRYDKqgAfVG42yURU+QWhTSRstVptwTt+kdRhdbsUzEsQA)

TypeScript

```

export default {

  async fetch(request: Request): Promise<Response> {

    /**

     * Replace `remote` with the host you wish to send requests to

     */

    const remote = "https://example.com";


    return await fetch(remote, request);

  },

};


```

Explain Code

Python

```

from workers import WorkerEntrypoint

from js import fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Replace `remote` with the host you wish to send requests to

        remote = "https://example.com"

        return await fetch(remote, request)


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.all("*", async (c) => {

  /**

   * Replace `remote` with the host you wish to send requests to

   */

  const remote = "https://example.com";


  // Forward the request to the remote server

  return await fetch(remote, c.req.raw);

});


export default app;


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/fetch-html/","name":"Fetch HTML"}}]}
```
