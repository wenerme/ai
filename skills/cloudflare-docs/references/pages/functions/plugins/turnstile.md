---
title: Turnstile
description: Validate Cloudflare Turnstile tokens in Pages Functions using the Turnstile Plugin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/pages/functions/plugins/turnstile.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Turnstile

[Turnstile](https://developers.cloudflare.com/turnstile/) is Cloudflare's smart CAPTCHA alternative.

The Turnstile Pages Plugin validates Cloudflare Turnstile tokens.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-turnstile
```

```
yarn add @cloudflare/pages-plugin-turnstile
```

```
pnpm add @cloudflare/pages-plugin-turnstile
```

```
bun add @cloudflare/pages-plugin-turnstile
```

## Usage

TypeScript

```

import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";


/**

 * POST /api/submit-with-plugin

 */


export const onRequestPost = [

  turnstilePlugin({

    // This is the demo secret key. In prod, we recommend you store

    // your secret key(s) safely.

    secret: "0x4AAAAAAASh4E5cwHGsTTePnwcPbnFru6Y",

  }),

  // Alternatively, this is how you can use a secret key which has been stored as an environment variable

  // (async (context) => {

  //   return turnstilePlugin({secret: context.env.SECRET_KEY})(context)

  // }),

  async (context) => {

    // Request has been validated as coming from a human

    const formData = await context.request.formData();

    // Additional solve metadata data is available at context.data.turnstile

    return new Response(

      `Successfully verified! ${JSON.stringify(context.data.turnstile)}`,

    );

  },

];


```

Explain Code

This Plugin only exposes a single route to verify an incoming Turnstile response in a `POST` as the `cf-turnstile-response` parameter. It will be available wherever it is mounted. In the example above, it is mounted in `functions/register.ts`. As a result, it will validate requests to `/register`.

## Properties

The Plugin is mounted with a single object parameter with the following properties:

[secret ↗](https://dash.cloudflare.com/login) is mandatory and can both be found in your Turnstile dashboard.

`response` and `remoteip` are optional strings. `response` is the Turnstile token to verify. If it is not provided, the plugin will default to extracting `cf-turnstile-response` value from a `multipart/form-data` request). `remoteip` is the requester's IP address. This defaults to the `CF-Connecting-IP` header of the request.

`onError` is an optional function which takes the Pages Function context object and returns a `Promise` of a `Response`. By default, it will return a human-readable error `Response`.

`context.data.turnstile` will be populated in subsequent Pages Functions (including for the `onError` function) with [the Turnstile Siteverify response object](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/turnstile/","name":"Turnstile"}}]}
```
