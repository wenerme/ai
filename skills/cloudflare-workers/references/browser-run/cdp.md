---
description: Create persistent browser sessions, manage tabs, and interact with browsers using Chrome DevTools Protocol (CDP) commands via the /devtools endpoints.
title: Chrome DevTools Protocol (CDP)
image: https://developers.cloudflare.com/browser-run/cdp/og.png?v=475bc76d86939067
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Chrome DevTools Protocol (CDP)

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/cdp/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `/devtools` endpoints provide session management capabilities that follow the [Chrome DevTools Protocol (CDP) ↗︎](https://chromedevtools.github.io/devtools-protocol/). These endpoints allow you to create persistent browser sessions, manage multiple tabs, and interact with browsers using CDP commands. This is useful for advanced automation, debugging, and remote browser control.

CDP endpoints can be accessed from any environment that supports WebSocket connections, including local development machines, external servers, and CI/CD pipelines. This means you can connect to Browser Run from Node.js scripts, Puppeteer, Playwright, or any CDP-compatible client.

Before you begin, [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.

## What is CDP?

The Chrome DevTools Protocol (CDP) is a remote debugging protocol that allows you to instrument, inspect, debug, and profile Chromium-based browsers. It is the same protocol used by Chrome DevTools to control and monitor the browser. Popular browser automation libraries like Puppeteer and Playwright provide high-level APIs over the Chrome DevTools Protocol, making it easier to automate common tasks.

## Use cases

The browser sessions endpoints enable you to:

- **Create and manage persistent browser sessions** — Launch browser instances that remain active for extended periods
- **Open, close, and list browser tabs (targets)** — Manage multiple debuggable targets (pages, iframes, etc.) within a single browser instance
- **Connect via WebSocket to send CDP commands** — Automate browser actions programmatically
- **View live browser sessions using Chrome DevTools UI** — Debug and inspect remote browser sessions visually
- **Integrate with existing CDP clients** — Use standard CDP clients like Puppeteer or custom WebSocket implementations

## How it works

Once you acquire a browser session, you can interact with it in two ways:

### CDP over WebSocket

Connect to the WebSocket endpoint `/devtools/browser` to acquire a session and send [CDP commands ↗︎](https://chromedevtools.github.io/devtools-protocol/) directly over the connection. This is the standard way to use CDP and works with any CDP client, including [Puppeteer](https://developers.cloudflare.com/browser-run/cdp/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/cdp/playwright/), and [MCP clients](https://developers.cloudflare.com/browser-run/cdp/mcp-clients/).

### HTTP API

HTTP endpoints are also available to manage the browser lifecycle without using WebSockets. These follow the standard [CDP HTTP endpoints ↗︎](https://chromedevtools.github.io/devtools-protocol/#endpoints):

1. **Create session** — `POST /devtools/browser`
2. **List tabs** — `GET /devtools/browser/{session_id}/json/list`
3. **Create tab** — `PUT /devtools/browser/{session_id}/json/new`
4. **Close tab** — `DELETE /devtools/browser/{session_id}/json/close/{target_id}`
5. **Close session** — `DELETE /devtools/browser/{session_id}`

Check the [API reference](https://developers.cloudflare.com/api/resources/browser_rendering/) for the HTTP endpoints. The WebSocket endpoints and their parameters are documented in [WebSocket endpoints](#websocket-endpoints).

## WebSocket endpoints

Browser Run provides three WebSocket endpoints. Each endpoint requires an API token in the `Authorization: Bearer <API_TOKEN>` header.

### Acquire and connect to a browser

Use this endpoint to acquire a browser session and connect to it:

```txt
wss://api.cloudflare.com/client/v4/accounts/{account_id}/browser-run/devtools/browser
```

Path parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | Cloudflare account ID. |

Query parameters:

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `keep_alive` | `number` | No | `60000` | Session lifetime in milliseconds. The value must be between `10000` and `1200000`, inclusive. |
| `lab` | `boolean` | No | `false` | Uses Browser Run's experimental pool when set to `true`. These browser instances enable experimental Chrome features for testing before they reach stable Chrome. |
| `recording` | `boolean` | No | `false` | Records the browser session when set to `true`. |
| `browser` | `string` | No | — | Selects the browser backend. The accepted value is `kitesurf`. Do not combine it with `keep_alive`, `lab`, or `recording`. |

Optional headers:

| Header | Description |
| --- | --- |
| `cf-brapi-guardrails` | Base64url-encoded session guardrails. The JSON object can contain `allowedDomains` and `allowedDomainSets`. Refer to [Guardrails](https://developers.cloudflare.com/browser-run/features/guardrails/). |

### Connect to an existing browser

Use this endpoint to connect to an existing browser session:

```txt
wss://api.cloudflare.com/client/v4/accounts/{account_id}/browser-run/devtools/browser/{session_id}
```

Path parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | Cloudflare account ID. |
| `session_id` | `string` | Yes | Browser session ID. |

Query parameters:

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `keep_alive` | `number` | No | `60000` | Only applies when acquiring a session. The value must be between `10000` and `1200000`. |
| `lab` | `boolean` | No | `false` | Only applies when acquiring a session. Uses Browser Run's experimental pool when set to `true`. These browser instances enable experimental Chrome features for testing before they reach stable Chrome. |
| `recording` | `boolean` | No | `false` | Only applies when acquiring a session. Records the browser session when set to `true`. |

Optional headers:

| Header | Description |
| --- | --- |
| `cf-brapi-guardrails` | Base64url-encoded connection guardrails. Use `{"mode":"readonly"}` before encoding to restrict the connection to read-only CDP methods. |

### Connect to a page

Use this endpoint to connect to a specific target or page:

```txt
wss://api.cloudflare.com/client/v4/accounts/{account_id}/browser-run/devtools/browser/{session_id}/page/{target_id}
```

Path parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | Cloudflare account ID. |
| `session_id` | `string` | Yes | Browser session ID. |
| `target_id` | `string` | Yes | Chrome DevTools Protocol target ID. |

Optional headers:

| Header | Description |
| --- | --- |
| `cf-brapi-guardrails` | Base64url-encoded connection guardrails. Use `{"mode":"readonly"}` before encoding to restrict the connection to read-only CDP methods. |

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/cdp/#page","headline":"Chrome DevTools Protocol (CDP)","description":"Create persistent browser sessions, manage tabs, and interact with browsers using Chrome DevTools Protocol (CDP) commands via the /devtools endpoints.","url":"https://developers.cloudflare.com/browser-run/cdp/","inLanguage":"en","image":"https://developers.cloudflare.com/browser-run/cdp/og.png?v=475bc76d86939067","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
