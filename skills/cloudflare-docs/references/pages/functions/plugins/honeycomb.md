---
title: Honeycomb
description: The Honeycomb Pages Plugin automatically sends traces to Honeycomb for analysis and observability.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/pages/functions/plugins/honeycomb.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Honeycomb

The Honeycomb Pages Plugin automatically sends traces to Honeycomb for analysis and observability.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-honeycomb
```

```
yarn add @cloudflare/pages-plugin-honeycomb
```

```
pnpm add @cloudflare/pages-plugin-honeycomb
```

```
bun add @cloudflare/pages-plugin-honeycomb
```

## Usage

The following usage example uses environment variables you will need to set in your Pages project settings.

TypeScript

```

import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";


export const onRequest: PagesFunction<{

  HONEYCOMB_API_KEY: string;

  HONEYCOMB_DATASET: string;

}> = (context) => {

  return honeycombPlugin({

    apiKey: context.env.HONEYCOMB_API_KEY,

    dataset: context.env.HONEYCOMB_DATASET,

  })(context);

};


```

Explain Code

Alternatively, you can hard-code (not advisable for API key) your settings the following way:

TypeScript

```

import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";


export const onRequest = honeycombPlugin({

  apiKey: "YOUR_HONEYCOMB_API_KEY",

  dataset: "YOUR_HONEYCOMB_DATASET_NAME",

});


```

This Plugin is based on the `@cloudflare/workers-honeycomb-logger` and accepts the same [configuration options ↗](https://github.com/cloudflare/workers-honeycomb-logger#config).

Ensure that you enable the option to **Automatically unpack nested JSON** and set the **Maximum unpacking depth** to **5** in your Honeycomb dataset settings.

![Follow the instructions above to toggle on Automatically unpack nested JSON and set the Maximum unpacking depth option to 5 in the Honeycomb dashboard](https://developers.cloudflare.com/_astro/honeycomb.MQ2Vf1tC_11GUXy.webp) 

### Additional context

`data.honeycomb.tracer` has two methods for attaching additional information about a given trace:

* `data.honeycomb.tracer.log` which takes a single argument, a `String`.
* `data.honeycomb.tracer.addData` which takes a single argument, an object of arbitrary data.

More information about these methods can be seen on [@cloudflare/workers-honeycomb-logger's documentation ↗](https://github.com/cloudflare/workers-honeycomb-logger#adding-logs-and-other-data).

For example, if you wanted to use the `addData` method to attach user information:

TypeScript

```

import type { PluginData } from "@cloudflare/pages-plugin-honeycomb";


export const onRequest: PagesFunction<unknown, any, PluginData> = async ({

  data,

  next,

  request,

}) => {

  // Authenticate the user from the request and extract user's email address

  const email = await getEmailFromRequest(request);


  data.honeycomb.tracer.addData({ email });


  return next();

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/honeycomb/","name":"Honeycomb"}}]}
```
