---
description: Configure which git branches should trigger a Workers Build
title: Build branches
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Build branches

Last updated Jul 3, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

When you connect a git repository to Workers, commits made on the production git branch will produce a Workers Build. If you want to take advantage of [preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) and [pull request comments](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#pull-request-comment), you can additionally enable "non-production branch builds" in order to trigger a build on all branches of your repository.

## Change production branch

To change the production branch of your project:

1. In **Overview**, select your Workers project.
2. Go to **Settings** \> **Build** \> **Branch control**. Workers will default to the default branch of your git repository, but this can be changed in the dropdown.

Every push event made to this branch will trigger a build and execute the [build command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command), followed by the [deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command).

## Configure non-production branch builds

To enable or disable non-production branch builds:

1. In **Overview**, select your Workers project.
2. Go to **Settings** \> **Build** \> **Branch control**. The checkbox **Builds for non-production branches** allows you to enable or disable builds for non-production branches.

When enabled, every push event made to a non-production branch will trigger a build and execute the [build command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command), followed by the [non-production branch deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#non-production-branch-deploy-command).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#page","headline":"Build branches · Cloudflare Workers docs","description":"Configure which git branches should trigger a Workers Build","url":"https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
