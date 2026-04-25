---
title: Local Development
description: Develop and test Cloudflare Workflows locally using Wrangler's emulated runtime.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Local Development

**Last reviewed:**  over 1 year ago 

Workflows support local development using [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers. Wrangler runs an emulated version of Workflows compared to the one that Cloudflare runs globally.

## Prerequisites

To develop locally with Workflows, you will need:

* [Wrangler v3.89.0 ↗](https://blog.cloudflare.com/wrangler3/) or later.
* Node.js version of `18.0.0` or later. Consider using a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node versions.
* If you are new to Workflows and/or Cloudflare Workers, refer to the [Workflows Guide](https://developers.cloudflare.com/workflows/get-started/guide/) to install `wrangler` and deploy their first Workflows.

## Start a local development session

Open your terminal and run the following commands to start a local development session:

Terminal window

```

# Confirm we are using wrangler v3.89.0+

npx wrangler --version


```

```

⛅️ wrangler 3.89.0


```

Start a local dev session

Terminal window

```

# Start a local dev session:

npx wrangler dev


```

```

------------------

Your worker has access to the following bindings:

- Workflows:

  - MY_WORKFLOW: MyWorkflow

⎔ Starting local server...

[wrangler:inf] Ready on http://127.0.0.1:8787/


```

Local development sessions create a standalone, local-only environment that mirrors the production environment Workflows runs in so you can test your Workflows _before_ you deploy to production.

Refer to the [wrangler dev documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to learn more about how to configure a local development session.

## Manage Workflows locally

Note

The `--local` flag for `wrangler workflows` commands requires Wrangler version `4.79.0` or greater. Use `npx wrangler@latest` to always use the latest version.

While a `wrangler dev` session is running, you can use all [wrangler workflows commands](https://developers.cloudflare.com/workers/wrangler/commands/workflows/) with the `--local` flag to interact with your local Workflow instances.

For example, to list your local Workflows:

Terminal window

```

npx wrangler workflows list --local


```

To trigger a Workflow locally:

Terminal window

```

npx wrangler workflows trigger my-workflow --local


```

To inspect a specific instance:

Terminal window

```

npx wrangler workflows instances describe my-workflow <INSTANCE_ID> --local


```

All commands accept `--port` to target a specific `wrangler dev` session (defaults to `8787`).

## Known Issues

Workflows are not supported as [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) or when using `npx wrangler dev --remote`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/build/","name":"Build with Workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/build/local-development/","name":"Local Development"}}]}
```
