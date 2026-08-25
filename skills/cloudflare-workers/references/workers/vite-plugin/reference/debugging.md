---
description: Debugging with the Vite plugin
title: Debugging
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Debugging

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare Vite plugin has debugging enabled by default and listens on port `9229`. You may choose a custom port or disable debugging by setting the `inspectorPort` option in the [plugin config](https://developers.cloudflare.com/workers/vite-plugin/reference/api#interface-pluginconfig). There are two recommended methods for debugging your Workers during local development:

## DevTools

When running `vite dev` or `vite preview`, a `/__debug` route is added that provides access to [Cloudflare's implementation ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/chrome-devtools-patches) of [Chrome's DevTools ↗](https://developer.chrome.com/docs/devtools/overview). Navigating to this route will open a DevTools tab for each of the Workers in your application.

Once the tab(s) are open, you can make a request to your application and start debugging your Worker code.

Note

When debugging multiple Workers, you may need to allow your browser to open pop-ups.

## VS Code

To set up [VS Code ↗](https://code.visualstudio.com/) to support breakpoint debugging in your application, you should create a `.vscode/launch.json` file that contains the following configuration:

```json
{
	"configurations": [
		{
			"name": "<NAME_OF_WORKER>",
			"type": "node",
			"request": "attach",
			"websocketAddress": "ws://localhost:9229/<NAME_OF_WORKER>",
			"resolveSourceMapLocations": null,
			"attachExistingChildren": false,
			"autoAttachChildProcesses": false,
			"sourceMaps": true
		}
	],
	"compounds": [
		{
			"name": "Debug Workers",
			"configurations": ["<NAME_OF_WORKER>"],
			"stopAll": true
		}
	]
}
```

Here, `<NAME_OF_WORKER>` indicates the name of the Worker as specified in your Worker config file. If you have used the `inspectorPort` option to set a custom port then this should be the value provided in the `websocketaddress` field.

Note

If you have more than one Worker in your application, you should add a configuration in the `configurations` field for each and include the configuration name in the `compounds` `configurations` array.

With this set up, you can run `vite dev` or `vite preview` and then select **Debug Workers** at the top of the **Run & Debug** panel to start debugging.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/#page","headline":"Debugging · Cloudflare Workers docs","description":"Debugging with the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
