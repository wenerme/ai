---
description: Attach a Node.js debugger to Miniflare for setting breakpoints and inspecting Cloudflare Workers code.
title: Attaching a Debugger
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Attaching a Debugger

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/developing/debugger/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Caution

This documentation describes breakpoint debugging when using Miniflare directly, which is only relevant for advanced use cases. Instead, most users should refer to the [Workers Observability documentation for how to set this up when using Wrangler](https://developers.cloudflare.com/workers/observability/dev-tools/breakpoints/).

You can use regular Node.js tools to debug your Workers. Setting breakpoints, watching values and inspecting the call stack are all examples of things you can do with a debugger.

## Visual Studio Code

### Create configuration

The easiest way to debug a Worker in VSCode is to create a new configuration.

Open the **Run and Debug** menu in the VSCode activity bar and create a `.vscode/launch.json` file that contains the following:

```json
---
filename: .vscode/launch.json
---
{
  "configurations": [
    {
      "name": "Miniflare",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "cwd": "/",
      "resolveSourceMapLocations": null,
      "attachExistingChildren": false,
      "autoAttachChildProcesses": false,
    }
  ]
}
```

From the **Run and Debug** menu in the activity bar, select the `Miniflare`configuration, and click the green play button to start debugging.

## WebStorm

Create a new configuration, by clicking **Add Configuration** in the top right.

![WebStorm add configuration button](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=177,height=28,format=webp/_astro/debugger-webstorm-node-add.1Aka_l-1.png)

Click the **plus** button in the top left of the popup and create a new **Node.js/Chrome** configuration. Set the **Host** field to `localhost` and the **Port** field to `9229`. Then click **OK**.

![WebStorm Node.js debug configuration](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=705,height=531,format=webp/_astro/debugger-webstorm-settings.CxmegMYm.png)

With the new configuration selected, click the green debug button to start debugging.

![WebStorm configuration debug button](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=303,height=68,format=webp/_astro/debugger-webstorm-node-run.BodpA57u.png)

## DevTools

Breakpoints can also be added via the Workers DevTools. For more information, [read the guide](https://developers.cloudflare.com/workers/observability/dev-tools)in the Cloudflare Workers docs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/developing/debugger/#page","headline":"Attaching a Debugger · Cloudflare Workers docs","description":"Attach a Node.js debugger to Miniflare for setting breakpoints and inspecting Cloudflare Workers code.","url":"https://developers.cloudflare.com/workers/testing/miniflare/developing/debugger/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
