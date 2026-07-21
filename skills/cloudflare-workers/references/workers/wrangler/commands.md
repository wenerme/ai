---
description: Create, develop, and deploy your Cloudflare Workers with Wrangler commands.
title: Commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Commands

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/wrangler/commands/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) offers a number of commands to manage your Cloudflare Workers.

## Workers commands

The core Wrangler commands for creating, developing, and deploying Workers are on the [Workers commands page](https://developers.cloudflare.com/workers/wrangler/commands/workers/). This includes `wrangler dev`, `wrangler deploy`, `wrangler versions`, and more.

## All commands

* [ Workers ](https://developers.cloudflare.com/workers/wrangler/commands/workers/)
* [ General commands ](https://developers.cloudflare.com/workers/wrangler/commands/general/)
* [ Artifacts ](https://developers.cloudflare.com/workers/wrangler/commands/artifacts/)
* [ Browser ](https://developers.cloudflare.com/workers/wrangler/commands/browser/)
* [ Certificates ](https://developers.cloudflare.com/workers/wrangler/commands/certificates/)
* [ Containers ](https://developers.cloudflare.com/workers/wrangler/commands/containers/)
* [ D1 ](https://developers.cloudflare.com/workers/wrangler/commands/d1/)
* [ Flagship ](https://developers.cloudflare.com/workers/wrangler/commands/flagship/)
* [ Hyperdrive ](https://developers.cloudflare.com/workers/wrangler/commands/hyperdrive/)
* [ KV ](https://developers.cloudflare.com/workers/wrangler/commands/kv/)
* [ Pages ](https://developers.cloudflare.com/workers/wrangler/commands/pages/)
* [ Pipelines ](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/)
* [ Queues ](https://developers.cloudflare.com/workers/wrangler/commands/queues/)
* [ R2 ](https://developers.cloudflare.com/workers/wrangler/commands/r2/)
* [ Secrets Store ](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/)
* [ Tunnel ](https://developers.cloudflare.com/workers/wrangler/commands/tunnel/)
* [ Vectorize ](https://developers.cloudflare.com/workers/wrangler/commands/vectorize/)
* [ VPC ](https://developers.cloudflare.com/workers/wrangler/commands/vpc/)
* [ Workers for Platforms ](https://developers.cloudflare.com/workers/wrangler/commands/workers-for-platforms/)
* [ Workflows ](https://developers.cloudflare.com/workers/wrangler/commands/workflows/)

## How to run Wrangler commands

```txt
wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

Since Cloudflare recommends [installing Wrangler locally](https://developers.cloudflare.com/workers/wrangler/install-and-update/) in your project (rather than globally), the way to run Wrangler will depend on your specific setup and package manager.

 npm  yarn  pnpm

```
npx wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

```
yarn wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

```
pnpm wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

You can add Wrangler commands that you use often as scripts in your project's `package.json` file:

```json
{
  ...
  "scripts": {
    "deploy": "wrangler deploy",
    "dev": "wrangler dev"
  }
  ...
}
```

You can then run them using your package manager of choice:

 npm  yarn  pnpm

```
npm run deploy
```

```
yarn run deploy
```

```
pnpm run deploy
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/wrangler/commands/#page","headline":"Commands - Wrangler · Cloudflare Workers docs","description":"Create, develop, and deploy your Cloudflare Workers with Wrangler commands.","url":"https://developers.cloudflare.com/workers/wrangler/commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
