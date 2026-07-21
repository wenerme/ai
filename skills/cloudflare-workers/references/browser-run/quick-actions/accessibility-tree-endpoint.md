---
description: Capture the accessibility tree from a webpage after JavaScript execution using the Browser Run /accessibilityTree endpoint.
title: /accessibilityTree - Capture accessibility tree
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

#  /accessibilityTree - Capture accessibility tree

Last updated Jul 7, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/browser-run/quick-actions/accessibility-tree-endpoint/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The `/accessibilityTree` endpoint instructs the browser to navigate to a website and capture the page's accessibility tree after JavaScript execution. The accessibility tree includes accessibility-related information such as roles, names, values, states, and hierarchy.

## Endpoint

```txt
https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-run/accessibilityTree
```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Provide AI agents with a structured page representation for navigation and browser automation workflows
* Check roles, accessible names, values, and states exposed to assistive technologies
* Identify interactive elements, such as buttons, links, menus, and form fields, that an automation workflow can act on

## Basic usage

### Capture the accessibility tree from a URL

Go to `https://example.com/` and return the page's accessibility tree.

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-run/accessibilityTree' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/"
}'
```

```json
{
	"success": true,
	"result": {
		"accessibilityTree": {
			"role": "RootWebArea",
			"name": "Example Domain",
			"children": [
				{
					"role": "heading",
					"name": "Example Domain",
					"level": 1
				},
				{
					"role": "StaticText",
					"name": "This domain is for use in documentation examples without needing permission. Avoid use in operations."
				},
				{
					"role": "link",
					"name": "Learn more"
				}
			]
		}
	},
	"meta": {
		"status": 200,
		"title": "Example Domain"
	}
}
```

```typescript
import Cloudflare from "cloudflare";

const client = new Cloudflare({
	apiToken: process.env["CLOUDFLARE_API_TOKEN"],
});

const accessibilityTree = await client.browserRendering.accessibilityTree.create({
	account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],
	url: "https://example.com/",
});

console.log(accessibilityTree.accessibilityTree);
```

```typescript
interface Env {
	BROWSER: BrowserRun;
}

export default {
	async fetch(request, env): Promise<Response> {
		return await env.BROWSER.quickAction("accessibilityTree", {
			url: "https://example.com/",
		});
	},
} satisfies ExportedHandler<Env>;
```

## Optional parameters

The following optional parameters can be used in your `/accessibilityTree` request, in addition to the required `url` or `html` parameter.

| Optional parameter | Type    | Description                                                                                                                                                                                                                                        |
| ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| interestingOnly    | Boolean | When true, returns only semantically meaningful nodes. Defaults to true. If root is set and interestingOnly is omitted, defaults to false.                                                                                                         |
| root               | String  | CSS selector that anchors the accessibility tree to a subtree. If the selector does not match an element, accessibilityTree returns null. To return only semantically meaningful nodes within the subtree, set interestingOnly to true explicitly. |

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Include all nodes

By default, `interestingOnly` is `true`, which filters the response to semantically meaningful nodes. Set `interestingOnly` to `false` to include every node in the accessibility tree, including generic and presentational nodes.

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-run/accessibilityTree' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "interestingOnly": false
}'
```

Response example

```json
{
	"success": true,
	"result": {
		"accessibilityTree": {
			"role": "RootWebArea",
			"name": "Example Domain",
			"children": [
				{
					"role": "generic",
					"name": "",
					"children": [
						{
							"role": "heading",
							"name": "Example Domain",
							"level": 1
						},
						{
							"role": "paragraph",
							"name": "",
							"children": [
								{
									"role": "StaticText",
									"name": "This domain is for use in documentation examples without needing permission. Avoid use in operations."
								}
							]
						},
						{
							"role": "paragraph",
							"name": "",
							"children": [
								{
									"role": "link",
									"name": "Learn more"
								}
							]
						}
					]
				}
			]
		}
	},
	"meta": {
		"status": 200,
		"title": "Example Domain"
	}
}
```

### Capture a subtree

Set `root` to a CSS selector string to return the accessibility tree for a specific part of the page.

When `root` is set and `interestingOnly` is not provided, `interestingOnly` defaults to `false`. To filter a subtree to semantically meaningful nodes, set `interestingOnly` to `true` explicitly.

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-run/accessibilityTree' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "root": "h1",
    "interestingOnly": true
}'
```

```json
{
	"success": true,
	"result": {
		"accessibilityTree": {
			"role": "heading",
			"name": "Example Domain",
			"level": 1
		}
	},
	"meta": {
		"status": 200,
		"title": "Example Domain"
	}
}
```

### Handle a root selector with no match

If `root` does not match any element on the page, the request returns HTTP `200` and `accessibilityTree` is `null`.

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-run/accessibilityTree' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "root": "#does-not-exist"
}'
```

```json
{
	"success": true,
	"result": {
		"accessibilityTree": null
	},
	"meta": {
		"status": 200,
		"title": "Example Domain"
	}
}
```

### Handling JavaScript-heavy pages

For JavaScript-heavy pages or Single Page Applications (SPAs), the default page load behavior may return empty or incomplete results. This happens because the browser considers the page loaded before JavaScript has finished rendering the content.

The simplest solution is to use the `gotoOptions.waitUntil` parameter set to `networkidle0` or `networkidle2`:

```json
{
	"url": "https://example.com",
	"gotoOptions": {
		"waitUntil": "networkidle0"
	}
}
```

For faster responses, advanced users can use `waitForSelector` to wait for a specific element instead of waiting for all network activity to stop. This requires knowing which CSS selector indicates the content you need has loaded. For more details, refer to [Quick Actions timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/).

### Set a custom user agent

You can change the user agent at the page level by passing `userAgent` as a top-level parameter in the JSON body. This is useful if the target website serves different content based on the user agent.

Note

The `userAgent` parameter does not bypass bot protection. Requests from Browser Run will always be identified as a bot. Because the User-Agent is configurable, destination servers looking to identify or block Browser Run requests should use the [non-configurable headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#non-configurable-headers) rather than relying on the User-Agent string.

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/accessibility-tree-endpoint/#page","headline":"/accessibilityTree - Capture accessibility tree · Cloudflare Browser Run docs","description":"Capture the accessibility tree from a webpage after JavaScript execution using the Browser Run /accessibilityTree endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/accessibility-tree-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
