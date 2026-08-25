---
description: Debug your Workers tests with Vitest.
title: Debugging
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Debugging

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/vitest-integration/debugging/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows you how to debug your Workers tests with Vitest and `@cloudflare/vitest-plugin`.

## Open inspector with Vitest

To start debugging, run Vitest with the following command and attach a debugger to port `9229`:

```sh
vitest --inspect --no-file-parallelism
```

## Customize the inspector port

By default, the inspector will be opened on port `9229`. If you need to use a different port (for example, `3456`), you can run the following command:

```sh
vitest --inspect=3456 --no-file-parallelism
```

Alternatively, you can define it in your Vitest configuration file:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			// ...
		}),
	],
	test: {
		inspector: {
			port: 3456,
		},
	},
});
```

## Setup VS Code to use breakpoints

To setup VS Code for breakpoint debugging in your Worker tests, create a `.vscode/launch.json` file that contains the following configuration:

```json
{
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "Open inspector with Vitest",
			"program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
			"console": "integratedTerminal",
			"args": ["--inspect=9229", "--no-file-parallelism"]
		},
		{
			"name": "Attach to Workers Runtime",
			"type": "node",
			"request": "attach",
			"port": 9229,
			"cwd": "/",
			"resolveSourceMapLocations": null,
			"attachExistingChildren": false,
			"autoAttachChildProcesses": false
		}
	],
	"compounds": [
		{
			"name": "Debug Workers tests",
			"configurations": [
				"Open inspector with Vitest",
				"Attach to Workers Runtime"
			],
			"stopAll": true
		}
	]
}
```

Select **Debug Workers tests** at the top of the **Run & Debug** panel to open an inspector with Vitest and attach a debugger to the Workers runtime. Then you can add breakpoints to your test files and start debugging.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/debugging/#page","headline":"Debugging · Cloudflare Workers docs","description":"Debug your Workers tests with Vitest.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/debugging/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
