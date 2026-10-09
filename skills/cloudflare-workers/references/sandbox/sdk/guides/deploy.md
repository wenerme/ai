---
description: Deploy a Sandbox SDK 0.x Worker and keep the npm package and container image on the same release line.
title: Deploy a Sandbox application
image: https://developers.cloudflare.com/sandbox/sdk/guides/deploy/og.png?v=7e0cef655040f98e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a Sandbox application

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/guides/deploy/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This page documents Sandbox SDK 0.x for existing applications. For new applications, refer to [Sandboxes](https://developers.cloudflare.com/sandbox/). To move an existing application to `@cloudflare/sandbox` 1.0, refer to [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

Sandbox runs on [Containers](https://developers.cloudflare.com/containers/). For deploy commands, Workers Builds, and rollout flags, refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/) and [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

To put `exposePort()` on a custom domain, refer to [Configure preview URLs on a custom domain](https://developers.cloudflare.com/sandbox/sdk/guides/preview-urls-custom-domain/).

## Keep the package and image aligned

The Worker depends on `@cloudflare/sandbox`. The container image must come from the same release line (Dockerfile and base image tags from the template or docs for that version).

When you bump the npm package:

1. Update the Dockerfile or image reference for the same line.
2. Run `wrangler deploy` so the new image is published.
3. If the Worker and image must cut over together, deploy with an immediate rollout:npmyarnpnpm

   ```
   npx wrangler deploy --containers-rollout=immediate
   ```

   ```
   yarn wrangler deploy --containers-rollout=immediate
   ```

   ```
   pnpm wrangler deploy --containers-rollout=immediate
   ```

   Use this for breaking package and image pairs. Refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

## Deploy from your machine

1. Start Docker if `image` is a Dockerfile path. Registry image references do not need Docker at deploy time.
2. From the project root:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

3. Confirm the Worker URL responds, then exercise a sandbox route.

The first deploy can take several minutes while the image provisions.

## Workers Builds

For production, use `wrangler deploy` so the package and image can update together.

Non-production Workers Builds defaults to `wrangler versions upload`, which does not publish a new image. [Version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/) are not generated for these Workers (they implement Durable Objects). Test with `wrangler dev`, or with a staging Worker or [environment](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments) that runs `wrangler deploy`.

More detail: [Before production](https://developers.cloudflare.com/containers/guides/deploy/#before-production).

## Related

- [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/)
- [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/)
- [Configure preview URLs on a custom domain](https://developers.cloudflare.com/sandbox/sdk/guides/preview-urls-custom-domain/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/guides/deploy/#page","headline":"Deploy a Sandbox application","description":"Deploy a Sandbox SDK 0.x Worker and keep the npm package and container image on the same release line.","url":"https://developers.cloudflare.com/sandbox/sdk/guides/deploy/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/guides/deploy/og.png?v=7e0cef655040f98e","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
