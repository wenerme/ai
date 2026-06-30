---
title: OpenFeature SDK
description: Use the official Flagship OpenFeature SDKs to evaluate feature flags from Workers, Node.js, browsers, Python, and Go applications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# OpenFeature SDK

Evaluate Flagship feature flags using OpenFeature.

[OpenFeature ↗](https://openfeature.dev/) is the CNCF standard for feature flag interfaces. It provides a vendor-neutral API so you can switch between flag providers without changing evaluation code.

Flagship provides official OpenFeature-compatible SDKs for TypeScript, Python, and Go. The source code is available on [GitHub ↗](https://github.com/cloudflare/flagship).

| SDK        | Package                                                                                               | Runtime                    | Evaluation modes                              |
| ---------- | ----------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------- |
| TypeScript | [@cloudflare/flagship ↗](https://www.npmjs.com/package/@cloudflare/flagship)                          | Workers, Node.js, browsers | Workers binding, HTTP, browser prefetch cache |
| Python     | [cloudflare-flagship ↗](https://pypi.org/project/cloudflare-flagship/)                                | Python server applications | HTTP                                          |
| Go         | [github.com/cloudflare/flagship/sdks/go ↗](https://pkg.go.dev/github.com/cloudflare/flagship/sdks/go) | Go server applications     | HTTP                                          |

## SDKs

Flagship SDKs are organized by language. The TypeScript SDK has separate setup guides for server-side and browser usage because they use different OpenFeature packages and runtime behavior.

* [TypeScript Server SDK](https://developers.cloudflare.com/flagship/sdk/server-provider/) — For Workers, Node.js, and other server-side JavaScript runtimes.
* [TypeScript Client SDK](https://developers.cloudflare.com/flagship/sdk/client-provider/) — For browser applications that need synchronous OpenFeature web SDK evaluation.
* [Python SDK](https://developers.cloudflare.com/flagship/sdk/python/) — For Python server applications.
* [Go SDK](https://developers.cloudflare.com/flagship/sdk/go/) — For Go server applications.

Note

If you are running inside a Cloudflare Worker, the [binding](https://developers.cloudflare.com/flagship/binding/) is the recommended approach because it avoids HTTP overhead. You can also [pass the binding to the OpenFeature SDK](https://developers.cloudflare.com/flagship/sdk/server-provider/) to get the best of both. Use the SDK without a binding when running in non-Worker runtimes like Node.js or the browser.

## Installation

For TypeScript server-side usage:

 npm  yarn  pnpm  bun

```
npm i @cloudflare/flagship @openfeature/server-sdk
```

```
yarn add @cloudflare/flagship @openfeature/server-sdk
```

```
pnpm add @cloudflare/flagship @openfeature/server-sdk
```

```
bun add @cloudflare/flagship @openfeature/server-sdk
```

For TypeScript browser usage:

 npm  yarn  pnpm  bun

```
npm i @cloudflare/flagship @openfeature/web-sdk
```

```
yarn add @cloudflare/flagship @openfeature/web-sdk
```

```
pnpm add @cloudflare/flagship @openfeature/web-sdk
```

```
bun add @cloudflare/flagship @openfeature/web-sdk
```

For Python:

Terminal window

```
uv add cloudflare-flagship
```

For Go:

Terminal window

```
go get github.com/cloudflare/flagship/sdks/go
```

## Next steps

* Set up the [server provider](https://developers.cloudflare.com/flagship/sdk/server-provider/) for Workers, Node.js, or other server-side runtimes.
* Set up the [client provider](https://developers.cloudflare.com/flagship/sdk/client-provider/) for browser applications.
* Set up the [Python SDK](https://developers.cloudflare.com/flagship/sdk/python/) for Python server applications.
* Set up the [Go SDK](https://developers.cloudflare.com/flagship/sdk/go/) for Go server applications.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/flagship/sdk/#page","headline":"OpenFeature SDK · Cloudflare Flagship docs","description":"Use the official Flagship OpenFeature SDKs to evaluate feature flags from Workers, Node.js, browsers, Python, and Go applications.","url":"https://developers.cloudflare.com/flagship/sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/sdk/","name":"OpenFeature SDK"}}]}
```
