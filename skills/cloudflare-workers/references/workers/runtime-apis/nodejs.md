---
title: Node.js compatibility
description: Node.js APIs available in Cloudflare Workers
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Node.js compatibility

When you write a Worker, you may need to import packages from [npm ↗](https://www.npmjs.com/). Many npm packages rely on APIs from the [Node.js runtime ↗](https://nodejs.org/en/about), and will not work unless these Node.js APIs are available.

Cloudflare Workers provides a subset of Node.js APIs in two forms:

1. As built-in APIs provided by the Workers Runtime. Most of these APIs are full implementations of the corresponding Node.js APIs, while a few are partially supported.
2. As polyfill shim implementations that [Wrangler](https://developers.cloudflare.com/workers/wrangler/) adds to your Worker's code, allowing it to import the module, but calling API methods will throw errors.

## Get Started

To enable built-in Node.js APIs and add polyfills, add the `nodejs_compat` compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and ensure that your Worker's [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

* [  wrangler.jsonc ](#tab-panel-12891)
* [  wrangler.toml ](#tab-panel-12892)

**JSONC**

```jsonc
{
  "compatibility_flags": ["nodejs_compat"],
  // Set this to today's date
  "compatibility_date": "2026-07-20",
}
```

**TOML**

```toml
compatibility_flags = [ "nodejs_compat" ]
# Set this to today's date
compatibility_date = "2026-07-20"
```

## Supported Node.js APIs

The runtime APIs from Node.js listed in this section with the status "🟢 supported" are currently natively supported in the Workers Runtime. Items listed as "🟡 partially supported" include usable APIs, but do not implement the complete Node.js API surface.

[Deprecated or experimental APIs from Node.js ↗](https://nodejs.org/docs/latest/api/documentation.html#stability-index), and APIs that do not fit in a serverless context, are not included in the supported API list in this section. Some import-only stubs for these APIs are listed separately in [Non-functional stub modules](#non-functional-stub-modules).

| API Name                                                                                                          | Natively supported by the Workers Runtime                                                                          |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Assertion testing](https://developers.cloudflare.com/workers/runtime-apis/nodejs/assert/)                        | 🟢 supported                                                                                                       |
| [Asynchronous context tracking](https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/) | 🟢 supported                                                                                                       |
| [Buffer](https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/)                                   | 🟢 supported                                                                                                       |
| [Console ↗](https://nodejs.org/docs/latest/api/console.html)                                                      | 🟡 partially supported                                                                                             |
| [Crypto](https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/)                                   | 🟢 supported                                                                                                       |
| [Debugger](https://developers.cloudflare.com/workers/observability/dev-tools/)                                    | 🟢 supported via [Chrome DevTools integration](https://developers.cloudflare.com/workers/observability/dev-tools/) |
| [Diagnostics Channel](https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/)         | 🟢 supported                                                                                                       |
| [DNS](https://developers.cloudflare.com/workers/runtime-apis/nodejs/dns/)                                         | 🟡 partially supported                                                                                             |
| Errors                                                                                                            | 🟢 supported                                                                                                       |
| [Events](https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/)                             | 🟢 supported                                                                                                       |
| [File system](https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/)                                  | 🟢 supported                                                                                                       |
| Globals                                                                                                           | 🟢 supported                                                                                                       |
| [HTTP](https://developers.cloudflare.com/workers/runtime-apis/nodejs/http/)                                       | 🟢 supported                                                                                                       |
| [HTTPS](https://developers.cloudflare.com/workers/runtime-apis/nodejs/https/)                                     | 🟢 supported                                                                                                       |
| [Module ↗](https://nodejs.org/docs/latest/api/module.html)                                                        | 🟡 partially supported                                                                                             |
| [Net](https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/)                                         | 🟢 supported                                                                                                       |
| [OS ↗](https://nodejs.org/docs/latest/api/os.html)                                                                | 🟡 partially supported                                                                                             |
| [Path](https://developers.cloudflare.com/workers/runtime-apis/nodejs/path/)                                       | 🟢 supported                                                                                                       |
| [Performance hooks ↗](https://nodejs.org/docs/latest/api/perf%5Fhooks.html)                                       | 🟡 partially supported                                                                                             |
| [Process](https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/)                                 | 🟢 supported                                                                                                       |
| [Punycode ↗](https://nodejs.org/docs/latest/api/punycode.html) (deprecated)                                       | 🟢 supported                                                                                                       |
| [Query strings ↗](https://nodejs.org/docs/latest/api/querystring.html)                                            | 🟢 supported                                                                                                       |
| [Stream](https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/)                                  | 🟢 supported                                                                                                       |
| [String decoder](https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/)                   | 🟢 supported                                                                                                       |
| [Test runner](https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/)                                | 🟡 partially supported                                                                                             |
| [Timers](https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/)                                   | 🟢 supported                                                                                                       |
| [TLS/SSL](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/)                                     | 🟡 partially supported                                                                                             |
| [URL](https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/)                                         | 🟢 supported                                                                                                       |
| [Utilities](https://developers.cloudflare.com/workers/runtime-apis/nodejs/util/)                                  | 🟢 supported                                                                                                       |
| [Web Crypto API](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)                              | 🟢 supported                                                                                                       |
| [Web Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/)                                | 🟢 supported                                                                                                       |
| [Zlib](https://developers.cloudflare.com/workers/runtime-apis/nodejs/zlib/)                                       | 🟢 supported                                                                                                       |

Unless otherwise specified, native implementations of Node.js APIs in Workers are intended to match the implementation in the [Current release of Node.js ↗](https://github.com/nodejs/release#release-schedule).

If an API you wish to use is missing and you want to suggest that Workers support it, please add a post or comment in the [Node.js APIs discussions category ↗](https://github.com/cloudflare/workerd/discussions/categories/node-js-apis) on GitHub.

### Non-functional stub modules

Some Node.js modules are available as non-functional stubs. A stub can be imported or required, but does not provide a working implementation of the underlying Node.js API. These stubs exist so packages that check for the presence of a module can load in Workers, but they are not suitable for direct use in application code.

The following stubs are enabled automatically only when the `nodejs_compat` compatibility flag is enabled and your Worker's compatibility date is on or after the date shown. To enable one earlier, add the corresponding enable flag. To keep one unavailable after that date, add the corresponding disable flag.

| Stub module                                                                        | Enabled with nodejs\_compat on or after | Enable flag                             | Disable flag                             |
| ---------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------- | ---------------------------------------- |
| [node:http2 ↗](https://nodejs.org/docs/latest/api/http2.html)                      | 2025-09-01                              | enable\_nodejs\_http2\_module           | disable\_nodejs\_http2\_module           |
| [node:vm ↗](https://nodejs.org/docs/latest/api/vm.html)                            | 2025-10-01                              | enable\_nodejs\_vm\_module              | disable\_nodejs\_vm\_module              |
| [node:cluster ↗](https://nodejs.org/docs/latest/api/cluster.html)                  | 2025-12-04                              | enable\_nodejs\_cluster\_module         | disable\_nodejs\_cluster\_module         |
| [node:domain ↗](https://nodejs.org/docs/latest/api/domain.html)                    | 2025-12-04                              | enable\_nodejs\_domain\_module          | disable\_nodejs\_domain\_module          |
| [node:trace\_events ↗](https://nodejs.org/docs/latest/api/tracing.html)            | 2025-12-04                              | enable\_nodejs\_trace\_events\_module   | disable\_nodejs\_trace\_events\_module   |
| [node:wasi ↗](https://nodejs.org/docs/latest/api/wasi.html)                        | 2025-12-04                              | enable\_nodejs\_wasi\_module            | disable\_nodejs\_wasi\_module            |
| node:\_stream\_wrap                                                                | 2026-01-29                              | enable\_nodejs\_stream\_wrap\_module    | disable\_nodejs\_stream\_wrap\_module    |
| [node:dgram ↗](https://nodejs.org/docs/latest/api/dgram.html)                      | 2026-01-29                              | enable\_nodejs\_dgram\_module           | disable\_nodejs\_dgram\_module           |
| [node:inspector ↗](https://nodejs.org/docs/latest/api/inspector.html)              | 2026-01-29                              | enable\_nodejs\_inspector\_module       | disable\_nodejs\_inspector\_module       |
| [node:sqlite ↗](https://nodejs.org/docs/latest/api/sqlite.html)                    | 2026-01-29                              | enable\_nodejs\_sqlite\_module          | disable\_nodejs\_sqlite\_module          |
| [node:child\_process ↗](https://nodejs.org/docs/latest/api/child%5Fprocess.html)   | 2026-03-17                              | enable\_nodejs\_child\_process\_module  | disable\_nodejs\_child\_process\_module  |
| [node:readline ↗](https://nodejs.org/docs/latest/api/readline.html)                | 2026-03-17                              | enable\_nodejs\_readline\_module        | disable\_nodejs\_readline\_module        |
| [node:repl ↗](https://nodejs.org/docs/latest/api/repl.html)                        | 2026-03-17                              | enable\_nodejs\_repl\_module            | disable\_nodejs\_repl\_module            |
| [node:tty ↗](https://nodejs.org/docs/latest/api/tty.html)                          | 2026-03-17                              | enable\_nodejs\_tty\_module             | disable\_nodejs\_tty\_module             |
| [node:v8 ↗](https://nodejs.org/docs/latest/api/v8.html)                            | 2026-03-17                              | enable\_nodejs\_v8\_module              | disable\_nodejs\_v8\_module              |
| [node:worker\_threads ↗](https://nodejs.org/docs/latest/api/worker%5Fthreads.html) | 2026-03-17                              | enable\_nodejs\_worker\_threads\_module | disable\_nodejs\_worker\_threads\_module |

### Node.js API Polyfills

Node.js APIs that are not yet supported in the Workers runtime are polyfilled via [Wrangler](https://developers.cloudflare.com/workers/wrangler/), which uses [unenv ↗](https://github.com/unjs/unenv). If the `nodejs_compat` [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/) is enabled, and your Worker's [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) is 2024-09-23 or later, Wrangler will automatically inject polyfills into your Worker's code.

Adding polyfills maximizes compatibility with existing npm packages by providing modules with mocked methods. Calling these mocked methods will either noop or will throw an error with a message like:

```plaintext
[unenv] <method name> is not implemented yet!
```

This allows you to import packages that use these Node.js modules, even if certain methods are not supported.

## Enable only AsyncLocalStorage

If you need to enable only the Node.js `AsyncLocalStorage` API, you can enable the `nodejs_als` compatibility flag:

* [  wrangler.jsonc ](#tab-panel-12893)
* [  wrangler.toml ](#tab-panel-12894)

**JSONC**

```jsonc
{
  "compatibility_flags": ["nodejs_als"],
}
```

**TOML**

```toml
compatibility_flags = [ "nodejs_als" ]
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/#page","headline":"Node.js compatibility · Cloudflare Workers docs","description":"Node.js APIs available in Cloudflare Workers","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}}]}
```
