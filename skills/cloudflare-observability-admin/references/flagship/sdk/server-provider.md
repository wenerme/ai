---
title: TypeScript Server SDK
description: Set up the FlagshipServerProvider to evaluate feature flags from Workers, Node.js, or other server-side JavaScript runtimes using OpenFeature.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# TypeScript Server SDK

The `FlagshipServerProvider` implements the OpenFeature server provider interface. The provider works in [Cloudflare Workers](https://developers.cloudflare.com/workers/), Node.js, and any server-side JavaScript runtime that supports the Fetch API.

Inside a Cloudflare Worker, you can pass the Flagship [binding](https://developers.cloudflare.com/flagship/binding/) directly to the provider. This avoids HTTP overhead and is the recommended approach. Outside of Workers, initialize the provider with an app ID and account ID.

## Setup

* [ With binding ](#tab-panel-8934)
* [ With app ID ](#tab-panel-8935)

Pass the Flagship binding directly to the provider. This is the recommended approach inside a Worker.

* [  JavaScript ](#tab-panel-8932)
* [  TypeScript ](#tab-panel-8933)

**JavaScript**

```js
import { OpenFeature } from "@openfeature/server-sdk";
import { FlagshipServerProvider } from "@cloudflare/flagship/server";


export default {
  async fetch(request, env) {
    await OpenFeature.setProviderAndWait(
      new FlagshipServerProvider({ binding: env.FLAGS }),
    );


    const client = OpenFeature.getClient();


    const showNewCheckout = await client.getBooleanValue(
      "new-checkout",
      false,
      { targetingKey: "user-42", plan: "enterprise" },
    );


    if (showNewCheckout) {
      return new Response("New checkout enabled!");
    }


    return new Response("Standard checkout.");
  },
};
```

**TypeScript**

```ts
import { OpenFeature } from "@openfeature/server-sdk";
import { FlagshipServerProvider } from "@cloudflare/flagship/server";


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    await OpenFeature.setProviderAndWait(
      new FlagshipServerProvider({ binding: env.FLAGS }),
    );


    const client = OpenFeature.getClient();


    const showNewCheckout = await client.getBooleanValue(
      "new-checkout",
      false,
      { targetingKey: "user-42", plan: "enterprise" },
    );


    if (showNewCheckout) {
      return new Response("New checkout enabled!");
    }


    return new Response("Standard checkout.");
  },
};
```

Use an app ID, account ID, and an API token when running outside of a Worker (for example, in Node.js). Generate an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) from your Cloudflare account with Flagship read permissions.

* [  JavaScript ](#tab-panel-8928)
* [  TypeScript ](#tab-panel-8929)

**JavaScript**

```js
import { OpenFeature } from "@openfeature/server-sdk";
import { FlagshipServerProvider } from "@cloudflare/flagship/server";


await OpenFeature.setProviderAndWait(
  new FlagshipServerProvider({
    appId: "<APP_ID>",
    accountId: "<ACCOUNT_ID>",
    authToken: "<API_TOKEN>",
  }),
);


const client = OpenFeature.getClient();


const showNewCheckout = await client.getBooleanValue("new-checkout", false, {
  targetingKey: "user-42",
  plan: "enterprise",
});
```

**TypeScript**

```ts
import { OpenFeature } from "@openfeature/server-sdk";
import { FlagshipServerProvider } from "@cloudflare/flagship/server";


await OpenFeature.setProviderAndWait(
  new FlagshipServerProvider({
    appId: "<APP_ID>",
    accountId: "<ACCOUNT_ID>",
    authToken: "<API_TOKEN>",
  }),
);


const client = OpenFeature.getClient();


const showNewCheckout = await client.getBooleanValue("new-checkout", false, {
  targetingKey: "user-42",
  plan: "enterprise",
});
```

## Configuration options

| Option       | Type        | Required | Description                                                                                                                                                               |
| ------------ | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| binding      | Flagship    | No       | The Flagship binding from env.FLAGS. Use this inside a Worker for best performance. The binding handles authentication automatically.                                     |
| appId        | string      | No       | The Flagship app ID from the Cloudflare dashboard. Required when not using a binding.                                                                                     |
| accountId    | string      | No       | Your Cloudflare account ID. Required when using appId.                                                                                                                    |
| authToken    | string      | No       | A Cloudflare [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with Flagship read permissions. Required when not using a binding. |
| fetchOptions | RequestInit | No       | Custom fetch options applied to HTTP requests.                                                                                                                            |
| timeout      | number      | No       | Request timeout in milliseconds. Defaults to 5000.                                                                                                                        |
| retries      | number      | No       | Retry attempts on transient errors. Defaults to 1 and is capped at 10.                                                                                                    |
| retryDelay   | number      | No       | Delay between retries in milliseconds. Defaults to 1000 and is capped at 30000.                                                                                           |
| cacheTtl     | number      | No       | Cache TTL in milliseconds. Enables response caching when greater than 0.                                                                                                  |
| cacheMaxSize | number      | No       | Maximum cached entries. Defaults to 1000 when cacheTtl is set.                                                                                                            |

Provide either `binding` or `appId`, `accountId`, and `authToken`.

## Response caching

Server-side response caching is off by default. Enable it with `cacheTtl` when you want repeated evaluations for the same flag, type, and evaluation context to reuse a recent result.

**TypeScript**

```ts
new FlagshipServerProvider({
  appId: "<APP_ID>",
  accountId: "<ACCOUNT_ID>",
  authToken: "<API_TOKEN>",
  cacheTtl: 30_000,
  cacheMaxSize: 1000,
});
```

Use caching for high-traffic server applications that repeatedly evaluate the same flags for the same contexts. Cached values may be stale until the TTL expires, so keep the TTL short for flags that you expect to change during active rollouts. The provider does not cache disabled flags or errors.

## Evaluation context

OpenFeature uses an evaluation context to pass user attributes to the flag provider. The `targetingKey` field is the primary user identifier.

Pass additional attributes alongside `targetingKey` to match [targeting rules](https://developers.cloudflare.com/flagship/targeting/). For example, you can include `plan`, `country`, or any custom attribute your rules reference.

Use primitive context values such as strings, numbers, booleans, and `Date` objects. The provider rejects objects and arrays as invalid context.

* [  JavaScript ](#tab-panel-8924)
* [  TypeScript ](#tab-panel-8925)

**JavaScript**

```js
const value = await client.getBooleanValue("new-checkout", false, {
  targetingKey: "user-42",
  plan: "enterprise",
  country: "US",
});
```

**TypeScript**

```ts
const value = await client.getBooleanValue("new-checkout", false, {
  targetingKey: "user-42",
  plan: "enterprise",
  country: "US",
});
```

## Available hooks

The SDK ships with two hooks that you can attach to the OpenFeature client.

* **LoggingHook** — Logs structured information for every evaluation.
* **TelemetryHook** — Captures timing and event data for observability.

* [  JavaScript ](#tab-panel-8926)
* [  TypeScript ](#tab-panel-8927)

**JavaScript**

```js
import { LoggingHook, TelemetryHook } from "@cloudflare/flagship/server";


OpenFeature.addHooks(new LoggingHook(), new TelemetryHook());
```

**TypeScript**

```ts
import { LoggingHook, TelemetryHook } from "@cloudflare/flagship/server";


OpenFeature.addHooks(new LoggingHook(), new TelemetryHook());
```

## Migrate from another provider

If you use another OpenFeature-compatible provider (for example, LaunchDarkly or Flagsmith), switch to Flagship by replacing the provider initialization. No changes are needed at evaluation call sites.

* [  JavaScript ](#tab-panel-8930)
* [  TypeScript ](#tab-panel-8931)

**JavaScript**

```js
// Before
await OpenFeature.setProviderAndWait(
  new LaunchDarklyProvider({ sdkKey: "..." }),
);


// After
await OpenFeature.setProviderAndWait(
  new FlagshipServerProvider({
    appId: "<APP_ID>",
    accountId: "<ACCOUNT_ID>",
    authToken: "<API_TOKEN>",
  }),
);
```

**TypeScript**

```ts
// Before
await OpenFeature.setProviderAndWait(
  new LaunchDarklyProvider({ sdkKey: "..." }),
);


// After
await OpenFeature.setProviderAndWait(
  new FlagshipServerProvider({
    appId: "<APP_ID>",
    accountId: "<ACCOUNT_ID>",
    authToken: "<API_TOKEN>",
  }),
);
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/sdk/server-provider/#page","headline":"TypeScript Server SDK · Cloudflare Flagship docs","description":"Set up the FlagshipServerProvider to evaluate feature flags from Workers, Node.js, or other server-side JavaScript runtimes using OpenFeature.","url":"https://developers.cloudflare.com/flagship/sdk/server-provider/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/sdk/","name":"OpenFeature SDK"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/sdk/server-provider/","name":"TypeScript Server SDK"}}]}
```
