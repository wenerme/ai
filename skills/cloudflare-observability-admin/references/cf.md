---
description: Use one command-line interface for the public Cloudflare API and for Workers projects.
title: Cloudflare CLI
image: https://developers.cloudflare.com/cf/og.png?v=54b5e0417cfb98d9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare CLI

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare CLI, `cf`, is one command-line interface for the public Cloudflare API and for Workers projects. Use it to manage zones, DNS, storage, and security settings, and to create, develop, and deploy Workers. Coding agents run the same commands you do.

Beta

`cf` is in beta. Commands, configuration, and Build Output can change before the stable release.

Install `cf` globally:

npmyarnpnpmbun

```
npm install --global cf
```

```
yarn global add cf
```

```
pnpm add --global cf
```

```
bun add --global cf
```

To sign in and run your first command, refer to [Install and sign in](https://developers.cloudflare.com/cf/get-started/).

## Choose your path

### [Deploy a Worker](https://developers.cloudflare.com/cf/get-started/first-worker/)

Create a project with cf init, develop it locally, and deploy it.

### [Manage resources](https://developers.cloudflare.com/cf/get-started/resources/)

Find zones and create, list, and delete DNS records from the command line.

### [Coming from Wrangler](https://developers.cloudflare.com/cf/wrangler/)

Learn what changes, and move a project to cf with cf migrate.

### [Coding agents](https://developers.cloudflare.com/cf/agents/)

Set up coding agents to find and run Cloudflare commands with cf.

### [CI and automation](https://developers.cloudflare.com/cf/ci/)

Authenticate with API tokens and run cf in pipelines.

## What `cf` provides

- **Commands for the public API.** More than 2,900 commands, most of them generated from the schemas that describe the Cloudflare API.
- **Typed project configuration.** Workers projects use [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/), so editors and agents can autocomplete bindings and triggers.
- **Project commands.** `cf dev`, `cf build`, and `cf deploy` run your framework's own command, the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), or Wrangler, depending on the project. To learn more, refer to [How cf runs your project](https://developers.cloudflare.com/cf/projects/#how-cf-runs-your-project).
- **Command search.** `cf cli search` finds commands from a plain-language description of a task.

## `cf` and Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is the CLI for Workers projects configured with `wrangler.jsonc` or `wrangler.toml`. `cf` covers the public Cloudflare API and uses `cloudflare.config.ts` for Workers projects.

You can run `cf` resource commands alongside an existing Wrangler project without changing it. Before you run `cf dev`, `cf build`, or `cf deploy` in a Wrangler project, convert it with `cf migrate`. To compare the two tools and plan a move, refer to [`cf` for Wrangler users](https://developers.cloudflare.com/cf/wrangler/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cf/#page","headline":"Cloudflare CLI","description":"Use one command-line interface for the public Cloudflare API and for Workers projects.","url":"https://developers.cloudflare.com/cf/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/og.png?v=54b5e0417cfb98d9","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
