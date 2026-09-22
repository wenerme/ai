---
description: Configure which git branches should trigger a Workers Build
title: Build branches
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Build branches

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When you connect a git repository to Workers, commits made on the production branch produce a production build. To create [Previews](https://developers.cloudflare.com/workers/previews/) and [pull request comments](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#pull-request-comment) for branches that are not your production branch, enable preview builds.

## Change production branch

To change the production branch of your project:

1. In **Overview**, select your Workers project.
2. Go to **Settings** > **Build** > **Branch control**. Workers will default to the default branch of your git repository, but this can be changed in the dropdown.

Every push event made to this branch will trigger a build and execute the [build command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings), followed by the [deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command).

## Configure preview builds

Preview builds are builds for branches that are not your production branch.

New Workers use Worker Previews for preview builds by default. Their Preview command is `npx wrangler preview`.

To enable or disable preview builds:

1. In **Overview**, select your Workers project.
2. Go to **Settings** > **Build** > **Branch control**. The checkbox **Enable Preview Builds** allows you to enable or disable Preview Builds.

When enabled, every push to a branch that is not your production branch triggers a preview build. Workers Builds runs the [build command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings), followed by the [Preview command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#preview-command).

### Existing Workers connected to Builds

Workers that were connected to Builds before [Worker Previews](https://developers.cloudflare.com/workers/previews/) keep the previous preview model until you complete a one-time switch.

The switch cannot be reversed

After switching, you cannot return to the previous preview model, which uses production settings.

1. In the Cloudflare dashboard, go to **Workers & Pages** > your Worker > **Settings** > **Builds**. In the **Set up Worker Previews** banner, select **Set up**. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages) ![Dialog showing Preview settings confirmation and the new Worker Previews command](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1034,height=1264,format=webp/_astro/switch-to-worker-previews.X2uOGKZ3.png)
2. Configure the variables, secrets, and bindings your Worker needs for Previews. Previews do not use production settings. For instructions, refer to [Get started](https://developers.cloudflare.com/workers/previews/get-started/#step-1-configure-preview-settings).
3. Review the new Preview command. Workers Builds replaces the current command with `npx wrangler preview`. Custom commands must invoke `npx wrangler preview`.
4. Select **Switch to Worker Previews**.

After switching, pushes to branches that are not your production branch use Worker Previews.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#page","headline":"Build branches","description":"Configure which git branches should trigger a Workers Build","url":"https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
