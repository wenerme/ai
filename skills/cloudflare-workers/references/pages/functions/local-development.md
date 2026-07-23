---
description: Run and test your Pages application locally using Wrangler.
title: Local development
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Local development

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/functions/local-development/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Run your Pages application locally with our Wrangler Command Line Interface (CLI).

## Install Wrangler

To get started with Wrangler, refer to the [Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Run your Pages project locally

The main command for local development on Pages is `wrangler pages dev`. This will let you run your Pages application locally, which includes serving static assets and running your Functions.

With your folder of static assets set up, run the following command to start local development:

```sh
npx wrangler pages dev <DIRECTORY-OF-ASSETS>
```

This will then start serving your Pages project. You can press `b` to open the browser on your local site, (available, by default, on [http://localhost:8788 ↗](http://localhost:8788)).

Note

If you have a [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/) file configured for your Pages project, you can run [wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev) without specifying a directory.

### HTTPS support

To serve your local development server over HTTPS with a self-signed certificate, you can \[set `local_protocol` via the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#local-development-settings) or you can pass the `--local-protocol=https` argument to [wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev):

```sh
npx wrangler pages dev --local-protocol=https <DIRECTORY-OF-ASSETS>
```

## Attach bindings to local development

To attach a binding to local development, refer to [Bindings](https://developers.cloudflare.com/pages/functions/bindings/) and find the Cloudflare Developer Platform resource you would like to work with.

## Additional Wrangler configuration

If you are using a Wrangler configuration file in your project, you can set up dev server values like: `port`, `local protocol`, `ip`, and `port`. For more information, read about [configuring local development settings](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#local-development-settings).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/local-development/#page","headline":"Local development · Cloudflare Pages docs","description":"Run and test your Pages application locally using Wrangler.","url":"https://developers.cloudflare.com/pages/functions/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
