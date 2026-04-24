---
title: Testing your Agents
description: Write and run tests for Cloudflare Agents using Vitest and the Workers test pool.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/getting-started/testing-your-agent.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Testing your Agents

Because Agents run on Cloudflare Workers and Durable Objects, they can be tested using the same tools and techniques as Workers and Durable Objects.

## Writing and running tests

### Setup

Note

The `agents-starter` template and new Cloudflare Workers projects already include the relevant `vitest` and `@cloudflare/vitest-pool-workers` packages, as well as a valid `vitest.config.js` file.

Before you write your first test, install the necessary packages:

Terminal window

```

npm install vitest@~3.0.0 --save-dev --save-exact

npm install @cloudflare/vitest-pool-workers --save-dev


```

Ensure that your `vitest.config.js` file is identical to the following:

JavaScript

```

import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";


export default defineWorkersConfig({

  test: {

    poolOptions: {

      workers: {

        wrangler: { configPath: "./wrangler.jsonc" },

      },

    },

  },

});


```

Explain Code

### Add the Agent configuration

Add a `durableObjects` configuration to `vitest.config.js` with the name of your Agent class:

JavaScript

```

import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";


export default defineWorkersConfig({

  test: {

    poolOptions: {

      workers: {

        main: "./src/index.ts",

        miniflare: {

          durableObjects: {

            NAME: "MyAgent",

          },

        },

      },

    },

  },

});


```

Explain Code

### Write a test

Note

Review the [Vitest documentation ↗](https://vitest.dev/) for more information on testing, including the test API reference and advanced testing techniques.

Tests use the `vitest` framework. A basic test suite for your Agent can validate how your Agent responds to requests, but can also unit test your Agent's methods and state.

TypeScript

```

import {

  env,

  createExecutionContext,

  waitOnExecutionContext,

  SELF,

} from "cloudflare:test";

import { describe, it, expect } from "vitest";

import worker from "../src";

import { Env } from "../src";


interface ProvidedEnv extends Env {}


describe("make a request to my Agent", () => {

  // Unit testing approach

  it("responds with state", async () => {

    // Provide a valid URL that your Worker can use to route to your Agent

    // If you are using routeAgentRequest, this will be /agent/:agent/:name

    const request = new Request<unknown, IncomingRequestCfProperties>(

      "http://example.com/agent/my-agent/agent-123",

    );

    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);

    await waitOnExecutionContext(ctx);

    expect(await response.text()).toMatchObject({ hello: "from your agent" });

  });


  it("also responds with state", async () => {

    const request = new Request("http://example.com/agent/my-agent/agent-123");

    const response = await SELF.fetch(request);

    expect(await response.text()).toMatchObject({ hello: "from your agent" });

  });

});


```

Explain Code

### Run tests

Running tests is done using the `vitest` CLI:

Terminal window

```

$ npm run test

# or run vitest directly

$ npx vitest


```

```

  MyAgent

    ✓ should return a greeting (1 ms)


Test Files  1 passed (1)


```

Review the [documentation on testing](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/) for additional examples and test configuration.

## Running Agents locally

You can also run an Agent locally using the `wrangler` CLI:

Terminal window

```

$ npx wrangler dev


```

```

Your Worker and resources are simulated locally via Miniflare. For more information, see: https://developers.cloudflare.com/workers/testing/local-development.


Your worker has access to the following bindings:

- Durable Objects:

  - MyAgent: MyAgent

  Starting local server...

[wrangler:inf] Ready on http://localhost:53645


```

This spins up a local development server that runs the same runtime as Cloudflare Workers, and allows you to iterate on your Agent's code and test it locally without deploying it.

Visit the [wrangler dev ↗](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) docs to review the CLI flags and configuration options.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/getting-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/getting-started/testing-your-agent/","name":"Testing your Agents"}}]}
```
