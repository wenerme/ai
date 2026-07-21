---
description: Customize how your code is compiled, before being processed by Wrangler.
title: Custom builds
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Custom builds

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/wrangler/custom-builds/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Custom builds are a way for you to customize how your code is compiled, before being processed by Wrangler.

Note

Wrangler runs [esbuild ↗](https://esbuild.github.io/) by default as part of the `dev` and `deploy` commands, and bundles your Worker project into a single Worker script. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/).

## Configure custom builds

Custom builds are configured by adding a `[build]` section in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and using the following options for configuring your custom build.

* `command` ` string `optional

  * The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. This command will be run as part of `wrangler dev` and `npx wrangler deploy`.
* `cwd` ` string `optional

  * The directory in which the command is executed.
* `watch_dir` ` string | string\[] `optional

  * The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

Example:

```jsonc
{
	"build": {
		"command": "npm run build",
		"cwd": "build_cwd",
		"watch_dir": "build_watch_dir"
	}
}
```

```toml
[build]
command = "npm run build"
cwd = "build_cwd"
watch_dir = "build_watch_dir"
```

## `WRANGLER_COMMAND` environment variable

When Wrangler runs your custom build command, it sets the `WRANGLER_COMMAND` environment variable so your build script can detect which Wrangler command triggered the build. This allows you to customize the build process based on the deployment context.

The possible values are:

| Value           | Wrangler command triggered |
| --------------- | -------------------------- |
| dev             | wrangler dev               |
| deploy          | wrangler deploy            |
| versions upload | wrangler versions upload   |
| types           | wrangler types             |

For example, you can use this to apply different build settings for development and production:

```bash
#!/bin/bash
if [ "$WRANGLER_COMMAND" = "dev" ]; then
  echo "Building for development..."
  # run a development build
else
  echo "Building for production..."
  # run a production build
fi
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/custom-builds/#page","headline":"Custom builds · Cloudflare Workers docs","description":"Customize how your code is compiled, before being processed by Wrangler.","url":"https://developers.cloudflare.com/workers/wrangler/custom-builds/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
