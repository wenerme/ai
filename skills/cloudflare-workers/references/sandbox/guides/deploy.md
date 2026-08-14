---
description: Deploy a Sandbox Worker and keep the npm package and container image on the same release line.
title: Deploy a Sandbox application
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a Sandbox application

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/guides/deploy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sandbox runs on [Containers](https://developers.cloudflare.com/containers/). For deploy commands, Workers Builds, and rollout flags, refer to [Deploy Containers](https://developers.cloudflare.com/containers/deploy/) and [Rollouts](https://developers.cloudflare.com/containers/platform-details/rollouts/).

To put `exposePort()` on a custom domain, refer to [Configure preview URLs on a custom domain](https://developers.cloudflare.com/sandbox/guides/preview-urls-custom-domain/).

Sandbox SDK 1.0 preview

This guide targets the stable `@cloudflare/sandbox` package.

On **`@cloudflare/sandbox@next`**, keep the Worker package and container image on the same preview line. For a breaking cutover, refer to [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/#deploy-the-cutover).

## Keep the package and image aligned

The Worker depends on `@cloudflare/sandbox` (or `@cloudflare/sandbox@next`). The container image must come from the same release line (Dockerfile and base image tags from the template or docs for that version).

When you bump the npm package:

1. Update the Dockerfile or image reference for the same line.
2. Run `wrangler deploy` so the new image is published.
3. If the Worker and image must cut over together, deploy with an immediate rollout:
npmyarnpnpm
```
npx wrangler deploy --containers-rollout=immediate
```
```
yarn wrangler deploy --containers-rollout=immediate
```
```
pnpm wrangler deploy --containers-rollout=immediate
```
Use this for stable to `@next` cutovers and other breaking package/image pairs. Refer to [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/#deploy-the-cutover) and [Rollouts](https://developers.cloudflare.com/containers/platform-details/rollouts/).

Do not mix a stable package with a `@next` image, or the reverse.

## Deploy from your machine

1. Start Docker if `image` is a Dockerfile path. Registry image references do not need Docker at deploy time.
2. From the project root:
npmyarnpnpm
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

Non-production Workers Builds defaults to `wrangler versions upload`, which does not publish a new image. [Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) are not generated for these Workers (they implement Durable Objects). Test with `wrangler dev`, or with a staging Worker or [environment](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments) that runs `wrangler deploy`.

More detail: [Before production](https://developers.cloudflare.com/containers/deploy/#before-production).

## Related

* [Deploy Containers](https://developers.cloudflare.com/containers/deploy/)
* [Rollouts](https://developers.cloudflare.com/containers/platform-details/rollouts/)
* [Configure preview URLs on a custom domain](https://developers.cloudflare.com/sandbox/guides/preview-urls-custom-domain/)
* [Migrate to Sandbox SDK 1.0 preview](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/deploy/#page","headline":"Deploy a Sandbox application · Cloudflare Sandbox SDK docs","description":"Deploy a Sandbox Worker and keep the npm package and container image on the same release line.","url":"https://developers.cloudflare.com/sandbox/guides/deploy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
