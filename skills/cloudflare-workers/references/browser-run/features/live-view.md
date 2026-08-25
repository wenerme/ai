---
description: View and interact with remote Browser Run sessions in real time using the hosted DevTools UI or native Chrome DevTools.
title: Live View
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Live View

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/features/live-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Live View lets you see and interact with a remote Browser Run session in real time. This is useful for debugging automation scripts, monitoring what a browser is doing, or manually stepping in when a task requires human intervention (see [Human in the Loop](https://developers.cloudflare.com/browser-run/features/human-in-the-loop/)).

Live View is available for any [Browser Session](https://developers.cloudflare.com/browser-run/#integration-methods), including sessions created with [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or the [CDP](https://developers.cloudflare.com/browser-run/cdp/) endpoints.

## How to access Live View

There are three ways to access Live View: through the Cloudflare dashboard, via the hosted user interface (UI) at `live.browser.run`, or using native Chrome DevTools.

### Cloudflare dashboard

In the Cloudflare dashboard, go to the **Browser Run** page and select the **Live Sessions** tab. This shows all active browser sessions in your account. Expand a session to see its tabs, then select **Open** to open the Live View for that tab.

[Go to **Browser Run** ↗](https://dash.cloudflare.com/?to=/:account/workers/browser-run)

Note

Sessions created from the dashboard default to a five-minute inactivity timeout (`keep_alive`), compared to the one-minute default when creating sessions through the API. You can adjust the timeout up to 10 minutes — in the dashboard, use the timeout field when creating a session, or in the API and Workers Bindings, use the [keep\_alive option](https://developers.cloudflare.com/browser-run/puppeteer/#keep-alive).

### Hosted UI (any browser)

When you create a session or list targets through the [CDP](https://developers.cloudflare.com/browser-run/cdp/) endpoints, the API response includes a `devtoolsFrontendUrl` for each target (tab). Open this URL in any browser to load the DevTools UI hosted at `live.browser.run`, which streams the remote session to your browser.

The hosted UI supports two viewing modes, controlled by the `mode` parameter in the URL:

| Mode      | URL pattern                                            | Description                                                 |
| --------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| Tab       | https://live.browser.run/ui/view?mode=tab&wss=...      | Standalone page view                                        |
| Full      | https://live.browser.run/ui/view?mode=full&wss=...     | Multi-tab page view                                         |
| Inspector | https://live.browser.run/ui/view?mode=devtools&wss=... | DevTools inspector panel (Elements, Console, Network, etc.) |

### Native Chrome DevTools (Chrome only)

Because Browser Run speaks standard CDP, you can connect Chrome's built-in DevTools directly to a remote session. Replace the `https://live.browser.run/ui/inspector?wss=` prefix in the `devtoolsFrontendUrl` with the `devtools://` protocol:

```txt
devtools://devtools/bundled/inspector.html?wss=live.browser.run/api/devtools/browser/SESSION_ID/page/TARGET_ID?jwt=...
```

Paste this URL into Chrome's address bar to connect native DevTools to the remote browser session. You will get the same DevTools interface you use for local debugging. The `devtools://` protocol is Chrome-only and limited to inspector viewing mode.

URL validity

The `devtoolsFrontendUrl` is valid for five minutes by default. You can change this by setting the `expiresInMs` parameter when sending the `Cloudflare.getLiveView` CDP command (max 1 hour). If you do not open the URL within this timeframe, list the targets again or send a new `Cloudflare.getLiveView` command to get a fresh URL. Once the DevTools connection is established, it remains active as long as the browser session is alive.

## View a new session

1. Create a browser session with `targets=true` to include target URLs in the response:

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

1. Copy the `devtoolsFrontendUrl` from `targets[0]` and open it in your browser. You now have a live, interactive view of the remote browser session.

## View an existing session

If you have a running session and want to connect to it:

1. List your active sessions:
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

## Get Live View URL via CDP

When using Puppeteer, Playwright, or a direct WebSocket connection, you can retrieve a Live View URL programmatically using the `Cloudflare.getLiveView` CDP command:

```js
// Create a CDP session from your page
const cdp = await page.createCDPSession();

// Get all targets
const { targetInfos } = await cdp.send("Target.getTargets");

// Find a specific target (for example, a page with a specific URL)
// or if there's only one page, just grab the first one
const target =
	targetInfos.find((t) => t.type === "page" && t.url.includes("example.com")) ||
	targetInfos[0];

if (!target) {
	throw new Error("Target not found");
}

const targetId = target.targetId;
console.log(`Selected target: ${targetId}`);

// Get the Live View URL for the selected target
const { devtoolsFrontendUrl } = await cdp.send("Cloudflare.getLiveView", {
	targetId, // use the target ID from above, this is optional, if omitted the current target will be used
	mode: "tab", // Options: "devtools", "tab", or "full"
	expiresInMs: 300000, // optional, default is 5 minutes (max 1 hour)
});

console.log(`Live View URL: ${devtoolsFrontendUrl}`);
```

Refer to the [Human in the Loop reference](https://developers.cloudflare.com/browser-run/features/human-in-the-loop/#cloudflaregetliveview) for full parameter and return details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/features/live-view/#page","headline":"Live View · Cloudflare Browser Run docs","description":"View and interact with remote Browser Run sessions in real time using the hosted DevTools UI or native Chrome DevTools.","url":"https://developers.cloudflare.com/browser-run/features/live-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
