---
title: Stream large JSON
description: Parse and transform large JSON request and response bodies using streaming.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ JSON ](https://developers.cloudflare.com/search/?tags=JSON)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/streaming-json.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Stream large JSON

**Last reviewed:**  4 months ago 

Parse and transform large JSON request and response bodies using streaming.

Use the [Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/) to process JSON payloads that would exceed a Worker's 128 MB memory limit if fully buffered. Streaming allows you to parse and transform JSON data incrementally as it arrives. This is faster than buffering the entire payload into memory, as your Worker can start processing data incrementally, and allows your Worker to handle multi-gigabyte payloads or files within its memory limits.

The [@streamparser/json-whatwg ↗](https://www.npmjs.com/package/@streamparser/json-whatwg) library provides a streaming JSON parser compatible with the Web Streams API.

Install the dependency:

Terminal window

```

npm install @streamparser/json-whatwg


```

## Stream a JSON request body

This example parses a large JSON request body and extracts specific fields without loading the entire payload into memory.

* [  TypeScript ](#tab-panel-9894)
* [  JavaScript ](#tab-panel-9895)

TypeScript

```

import { JSONParser } from "@streamparser/json-whatwg";


export default {

  async fetch(request): Promise<Response> {

    const parser = new JSONParser({ paths: ["$.users.*"] });


    const users: string[] = [];


    // Pipe the request body through the JSON parser

    const reader = request.body

      .pipeThrough(parser)

      .getReader();


    // Process matching JSON values as they stream in

    while (true) {

      const { done, value } = await reader.read();

      if (done) break;

      // Extract only the name field from each user object

      if (value.value?.name) {

        users.push(value.value.name);

      }

    }


    return Response.json({ userNames: users });

  },

} satisfies ExportedHandler;


```

Explain Code

JavaScript

```

import { JSONParser } from "@streamparser/json-whatwg";


export default {

  async fetch(request) {

    const parser = new JSONParser({ paths: ["$.users.*"] });


    const users = [];


    // Pipe the request body through the JSON parser

    const reader = request.body

      .pipeThrough(parser)

      .getReader();


    // Process matching JSON values as they stream in

    while (true) {

      const { done, value } = await reader.read();

      if (done) break;

      // Extract only the name field from each user object

      if (value.value?.name) {

        users.push(value.value.name);

      }

    }


    return Response.json({ userNames: users });

  },

};


```

Explain Code

## Stream and transform a JSON response

This example fetches a large JSON response from an upstream API, transforms specific fields, and streams the modified response to the client.

* [  TypeScript ](#tab-panel-9896)
* [  JavaScript ](#tab-panel-9897)

TypeScript

```

import { JSONParser } from "@streamparser/json-whatwg";


export default {

  async fetch(request): Promise<Response> {

    const response = await fetch("https://api.example.com/large-dataset.json");


    const parser = new JSONParser({ paths: ["$.items.*"] });


    const { readable, writable } = new TransformStream();

    const writer = writable.getWriter();

    const encoder = new TextEncoder();


    // Process the upstream response in the background

    (async () => {

      const reader = response.body

        .pipeThrough(parser)

        .getReader();


      await writer.write(encoder.encode('{"processedItems":['));

      let first = true;


      while (true) {

        const { done, value } = await reader.read();

        if (done) break;


        // Transform each item as it streams through

        const item = value.value;

        const transformed = {

          id: item.id,

          title: item.title.toUpperCase(),

          processed: true,

        };


        if (!first) await writer.write(encoder.encode(","));

        first = false;

        await writer.write(encoder.encode(JSON.stringify(transformed)));

      }


      await writer.write(encoder.encode("]}"));

      await writer.close();

    })();


    return new Response(readable, {

      headers: { "Content-Type": "application/json" },

    });

  },

} satisfies ExportedHandler;


```

Explain Code

JavaScript

```

import { JSONParser } from "@streamparser/json-whatwg";


export default {

  async fetch(request) {

    const response = await fetch("https://api.example.com/large-dataset.json");


    const parser = new JSONParser({ paths: ["$.items.*"] });


    const { readable, writable } = new TransformStream();

    const writer = writable.getWriter();

    const encoder = new TextEncoder();


    // Process the upstream response in the background

    (async () => {

      const reader = response.body

        .pipeThrough(parser)

        .getReader();


      await writer.write(encoder.encode('{"processedItems":['));

      let first = true;


      while (true) {

        const { done, value } = await reader.read();

        if (done) break;


        // Transform each item as it streams through

        const item = value.value;

        const transformed = {

          id: item.id,

          title: item.title.toUpperCase(),

          processed: true,

        };


        if (!first) await writer.write(encoder.encode(","));

        first = false;

        await writer.write(encoder.encode(JSON.stringify(transformed)));

      }


      await writer.write(encoder.encode("]}"));

      await writer.close();

    })();


    return new Response(readable, {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

Explain Code

## Related resources

* [Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/) \- Learn more about streaming in Workers
* [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/) \- Create custom stream transformations
* [@streamparser/json-whatwg ↗](https://www.npmjs.com/package/@streamparser/json-whatwg) \- Streaming JSON parser documentation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/streaming-json/","name":"Stream large JSON"}}]}
```
