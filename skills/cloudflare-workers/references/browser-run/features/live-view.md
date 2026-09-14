---
description: Watch and control active Browser Run sessions from the dashboard, a generated Live View URL, or Chrome DevTools.
title: Live View
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Live View

Last updated Sep 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/features/live-view/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Live View lets you see and interact with a remote Browser Run session in real time. This is useful for debugging automation scripts, monitoring what a browser is doing, or manually stepping in when a task requires human intervention (see [Human in the Loop](https://developers.cloudflare.com/browser-run/features/human-in-the-loop/)).

Live View is available for any [Browser Session](https://developers.cloudflare.com/browser-run/#integration-methods), including sessions created with [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or the [Chrome DevTools Protocol (CDP)](https://developers.cloudflare.com/browser-run/cdp/) endpoints.

A browser session is one remote Chrome instance. A session can contain multiple tabs. CDP calls each debuggable item a target, and a page target usually represents one browser tab. Live View connects to a page target.

## Access Live View

Open Live View from the Cloudflare dashboard or with a generated `devtoolsFrontendUrl`. A generated URL opens Cloudflare's hosted interface in any browser. Chrome users can instead open the connection in Chrome DevTools.

### Cloudflare dashboard

In the Cloudflare dashboard, go to the **Browser Run** page and select the **Live Sessions** tab. This shows all active browser sessions in your account. Expand a session to see its tabs, then select **Open** to open the Live View for that tab.

[Go to **Browser Run** ↗](https://dash.cloudflare.com/?to=/:account/workers/browser-run)

Note

Sessions created from the dashboard default to a five-minute inactivity timeout (`keep_alive`), compared to the one-minute default when creating sessions through the API. You can adjust the timeout up to 10 minutes — in the dashboard, use the timeout field when creating a session, or in the API and Workers Bindings, use the [`keep_alive` option](https://developers.cloudflare.com/browser-run/puppeteer/#keep-alive).

### Generated URL (any browser)

When you create a session with `targets=true` or list a session's targets, the API response includes a `devtoolsFrontendUrl` for each page target. Open this URL in any browser to watch or control that tab through Cloudflare's hosted interface. The generated URL uses `live.browser.run`; you do not visit that hostname directly.

The hosted UI supports three viewing modes, controlled by the `mode` parameter in the URL:

| Mode | URL pattern | Description |
| --- | --- | --- |
| `tab` | `https://live.browser.run/ui/view?mode=tab&wss=...` | Shows and controls one selected page without DevTools panels |
| `full` | `https://live.browser.run/ui/view?mode=full&wss=...` | Shows the browser interface and its open page tabs |
| `devtools` | `https://live.browser.run/ui/view?mode=devtools&wss=...` | Opens DevTools panels for one page, including Elements and the Console |

### Native Chrome DevTools (Chrome only)

Browser Run supports CDP, the protocol that powers Chrome DevTools. If a generated `devtoolsFrontendUrl` starts with `https://live.browser.run/ui/inspector?wss=`, replace that prefix with `devtools://devtools/bundled/inspector.html?wss=`:

```txt
devtools://devtools/bundled/inspector.html?wss=live.browser.run/api/devtools/browser/SESSION_ID/page/TARGET_ID?jwt=...
```

Paste the updated URL into Chrome's address bar. Chrome opens its built-in DevTools interface for the remote tab. The `devtools://` protocol works only in Chrome and supports only the `devtools` viewing mode.

URL validity

The `devtoolsFrontendUrl` is valid for five minutes by default. This is the deadline for starting a connection, not the duration of an established connection or browser session. Set `expiresInMs` when generating a custom URL to change the deadline, up to one hour. If the URL expires before you connect, generate a new one. An established connection remains active while the browser session is alive.

The API examples in the following sections assume `$ACCOUNT_ID` is set and `$CLOUDFLARE_API_TOKEN` has Browser Rendering Write permission.

## View a new session

1. Create a browser session with `targets=true` to include its current page targets and generated Live View URLs in the response:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser?keep_alive=600000&targets=true" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"sessionId": "1909cef7-23e8-4394-bc31-27404bf4348f",
	"targets": [
		{
			"description": "",
			"devtoolsFrontendUrl": "https://live.browser.run/ui/inspector?wss=live.browser.run/api/devtools/browser/1909cef7-.../page/8E598E99...?jwt=...",
			"id": "8E598E996530FB09E46A22B8B7754F7F",
			"title": "about:blank",
			"type": "page",
			"url": "about:blank",
			"webSocketDebuggerUrl": "wss://live.browser.run/api/devtools/browser/1909cef7-.../page/8E598E99...?jwt=..."
		}
	],
	"webSocketDebuggerUrl": "wss://api.cloudflare.com/client/v4/accounts/{account_id}/browser-rendering/devtools/browser/1909cef7-..."
}
```

The `targets[].devtoolsFrontendUrl` opens the hosted interface for a page. The `targets[].webSocketDebuggerUrl` connects a CDP client to that page. The top-level `webSocketDebuggerUrl` connects a CDP client to the browser session.

2. Find the page target you want by its `title` or `url`. Copy its `devtoolsFrontendUrl` and open it in your browser. A new session initially contains an `about:blank` page.

## View an existing session

If you have a running session and want to connect to it:

1. List your active sessions and copy the ID of the session you want to view:

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/session" \
   	--request GET \
   	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
   ```


2. Using the session ID, list the targets in that session:

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/list" \
   	--request GET \
   	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
   ```

   ```json
   [
   	{
   		"id": "110850A800BDB8B593CDDA30676635CF",
   		"type": "page",
   		"url": "https://example.com",
   		"title": "Example Domain",
   		"description": "",
   		"devtoolsFrontendUrl": "https://live.browser.run/ui/view?wss=live.browser.run/api/devtools/browser/28d75446-.../page/110850A8...?jwt=...",
   		"webSocketDebuggerUrl": "wss://live.browser.run/api/devtools/browser/28d75446-.../page/110850A8...?jwt=..."
   	}
   ]
   ```


3. Copy the `devtoolsFrontendUrl` and open it in your browser.

## Generate a Live View URL

Listing targets returns a default `devtoolsFrontendUrl` for every page target. Generate a custom URL to change its viewing mode, connection deadline, or viewer permissions.

### Set parameters

The following optional parameters configure generated links:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `string` | `devtools` | Viewing mode: `devtools`, `tab`, or `full` |
| `expiresInMs` | `number` | `300,000` (five minutes) | Deadline for starting a connection, in milliseconds. Minimum `60,000` and maximum `3,600,000` |
| `targetId` | `string` | Current CDP target or first page target | Page target to view |
| `guardrails` | `object` | — | REST API only. Viewer restrictions for this connection. Set `{ "mode": "readonly" }` to block interaction |

The REST API response includes `id`, `options`, `devtoolsFrontendUrl`, and `webSocketDebuggerUrl`. Open the frontend URL in a browser or use the WebSocket URL with a CDP client. The `Cloudflare.getLiveView` CDP command returns `devtoolsFrontendUrl`.

Treat Live View URLs as credentials

A Live View URL contains a signed `jwt` value. Anyone with the complete URL can access the permitted connection. Share it only through trusted channels. A read-only link still exposes visible page data.

Generate Live View URLs from trusted server-side code. Never expose `$CLOUDFLARE_API_TOKEN` in browser code.

A read-only Live View guardrail applies only to the generated connection. Other connections and automation scripts can still control the session. Session [guardrails](https://developers.cloudflare.com/browser-run/features/guardrails/) restrict HTTP and HTTPS destinations for the entire session and remain active for every Live View connection.

### REST API

Use the [Live View endpoint](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/live_view/methods/create/) to generate a URL:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/live_view" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"mode": "tab",
		"expiresInMs": 300000
	}'
```

#### Share a view-only link

To block viewer interaction, set `guardrails` to `{ "mode": "readonly" }`:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/live_view" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"mode": "tab",
		"guardrails": {
				"mode": "readonly"
		}
	}'
```

The link streams the session but blocks navigation, input, and JavaScript evaluation. The tab title starts with `READ ONLY -` .

Caution

A view-only link is for humans, not automation. Puppeteer and Playwright cannot drive a read-only connection because the required commands are blocked.

### CDP

CDP is Chrome's remote debugging protocol. `Cloudflare.getLiveView` is a Cloudflare extension that generates a Live View URL over an existing CDP connection. This Puppeteer example generates a URL for the current page:

```js
export async function getLiveViewUrl(page) {
	const cdp = await page.createCDPSession();

	const { devtoolsFrontendUrl } = await cdp.send("Cloudflare.getLiveView", {
		mode: "tab",
		expiresInMs: 300000,
	});

	return devtoolsFrontendUrl;
}
```

```ts
import type { Page } from "@cloudflare/puppeteer";

export async function getLiveViewUrl(page: Page): Promise<string> {
	const cdp = await page.createCDPSession();

	const { devtoolsFrontendUrl } = await cdp.send("Cloudflare.getLiveView", {
		mode: "tab",
		expiresInMs: 300000,
	});

	return devtoolsFrontendUrl;
}
```

To use Live View for a human operator handoff, refer to the [Human in the Loop workflow](https://developers.cloudflare.com/browser-run/features/human-in-the-loop/#cloudflaregetliveview).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/features/live-view/#page","headline":"Live View · Cloudflare Browser Run docs","description":"Watch and control active Browser Run sessions from the dashboard, a generated Live View URL, or Chrome DevTools.","url":"https://developers.cloudflare.com/browser-run/features/live-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
