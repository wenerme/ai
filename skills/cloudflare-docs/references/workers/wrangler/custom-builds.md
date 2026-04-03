---
title: Custom builds
description: Customize how your code is compiled, before being processed by Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/wrangler/custom-builds.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom builds

Custom builds are a way for you to customize how your code is compiled, before being processed by Wrangler.

Note

Wrangler runs [esbuild ↗](https://esbuild.github.io/) by default as part of the `dev` and `deploy` commands, and bundles your Worker project into a single Worker script. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/).

## Configure custom builds

Custom builds are configured by adding a `[build]` section in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and using the following options for configuring your custom build.

* `command` ` string ` optional  
   * The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. This command will be run as part of `wrangler dev` and `npx wrangler deploy`.
* `cwd` ` string ` optional  
   * The directory in which the command is executed.
* `watch_dir` ` string | string\[] ` optional  
   * The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

Example:

* [  wrangler.jsonc ](#tab-panel-8466)
* [  wrangler.toml ](#tab-panel-8467)

```

{

  "build": {

    "command": "npm run build",

    "cwd": "build_cwd",

    "watch_dir": "build_watch_dir"

  }

}


```

```

[build]

command = "npm run build"

cwd = "build_cwd"

watch_dir = "build_watch_dir"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/custom-builds/","name":"Custom builds"}}]}
```
