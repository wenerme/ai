---
title: Start from existing
description: Workers Sites require Wrangler — make sure to use the latest version.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/configuration/sites/start-from-existing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Start from existing

Use Workers Static Assets Instead

You should use [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) to host full-stack applications instead of Workers Sites. It has been deprecated in Wrangler v4, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) does not support Workers Sites. Do not use Workers Sites for new projects.

Workers Sites require [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) — make sure to use the [latest version](https://developers.cloudflare.com/workers/wrangler/install-and-update/#update-wrangler).

To deploy a pre-existing static site project, start with a pre-generated site. Workers Sites works with all static site generators, for example:

* [Hugo ↗](https://gohugo.io/getting-started/quick-start/)
* [Gatsby ↗](https://www.gatsbyjs.org/docs/quick-start/), requires Node
* [Jekyll ↗](https://jekyllrb.com/docs/), requires Ruby
* [Eleventy ↗](https://www.11ty.io/#quick-start), requires Node
* [WordPress ↗](https://wordpress.org) (refer to the tutorial on [deploying static WordPress sites with Pages](https://developers.cloudflare.com/pages/how-to/deploy-a-wordpress-site/))

## Getting started

1. Run the `wrangler init` command in the root of your project's directory to generate a basic Worker:  
Terminal window  
```  
wrangler init -y  
```  
This command adds/update the following files:  
   * `wrangler.jsonc`: The file containing project configuration.  
   * `package.json`: Wrangler `devDependencies` are added.  
   * `tsconfig.json`: Added if not already there to support writing the Worker in TypeScript.  
   * `src/index.ts`: A basic Cloudflare Worker, written in TypeScript.
2. Add your site's build/output directory to the Wrangler file:  
   * [  wrangler.jsonc ](#tab-panel-7097)  
   * [  wrangler.toml ](#tab-panel-7098)  
```  
{  
  "site": {  
    "bucket": "./public" // <-- Add your build directory name here.  
  }  
}  
```  
```  
[site]  
bucket = "./public"  
```  
The default directories for the most popular static site generators are listed below:  
   * Hugo: `public`  
   * Gatsby: `public`  
   * Jekyll: `_site`  
   * Eleventy: `_site`
3. Install the `@cloudflare/kv-asset-handler` package in your project:  
Terminal window  
```  
npm i -D @cloudflare/kv-asset-handler  
```
4. Replace the contents of `src/index.ts` with the following code snippet:

* [  Module Worker ](#tab-panel-7095)
* [  Service Worker ](#tab-panel-7096)

JavaScript

```

import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

import manifestJSON from "__STATIC_CONTENT_MANIFEST";

const assetManifest = JSON.parse(manifestJSON);


export default {

  async fetch(request, env, ctx) {

    try {

      // Add logic to decide whether to serve an asset or run your original Worker code

      return await getAssetFromKV(

        {

          request,

          waitUntil: ctx.waitUntil.bind(ctx),

        },

        {

          ASSET_NAMESPACE: env.__STATIC_CONTENT,

          ASSET_MANIFEST: assetManifest,

        },

      );

    } catch (e) {

      let pathname = new URL(request.url).pathname;

      return new Response(`"${pathname}" not found`, {

        status: 404,

        statusText: "not found",

      });

    }

  },

};


```

Service Workers are deprecated

Service Workers are deprecated, but still supported. We recommend using [Module Workers](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) instead. New features may not be supported for Service Workers.

JavaScript

```

import { getAssetFromKV } from "@cloudflare/kv-asset-handler";


addEventListener("fetch", (event) => {

  event.respondWith(handleEvent(event));

});


async function handleEvent(event) {

  try {

    // Add logic to decide whether to serve an asset or run your original Worker code

    return await getAssetFromKV(event);

  } catch (e) {

    let pathname = new URL(event.request.url).pathname;

    return new Response(`"${pathname}" not found`, {

      status: 404,

      statusText: "not found",

    });

  }

}


```

1. Run `wrangler dev` or `npx wrangler deploy` to preview or deploy your site on Cloudflare. Wrangler will automatically upload the assets found in the configured directory.  
Terminal window  
```  
npx wrangler deploy  
```
2. Deploy your site to a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) that you own and have already attached as a Cloudflare zone. Add a `route` property to the Wrangler file.  
   * [  wrangler.jsonc ](#tab-panel-7099)  
   * [  wrangler.toml ](#tab-panel-7100)  
```  
{  
  "route": "https://example.com/*"  
}  
```  
```  
route = "https://example.com/*"  
```  
Note  
Refer to the documentation on [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) to configure a `route` properly.

Learn more about [configuring your project](https://developers.cloudflare.com/workers/wrangler/configuration/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/sites/","name":"Workers Sites"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/sites/start-from-existing/","name":"Start from existing"}}]}
```
