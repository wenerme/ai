---
description: Deploy from your machine or Workers Builds, including how images and container instances update.
title: Deploy Containers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy Containers

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/guides/deploy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Deploy from your machine

1. If `image` in your Wrangler config is a path to a Dockerfile, start [Docker ↗](https://www.docker.com/) or another Docker-compatible engine. Specify the Dockerfile itself, not its directory. If `image` is a registry reference (Cloudflare Registry, Docker Hub, Amazon ECR, or Google Artifact Registry), you do not need Docker at deploy time. Refer to [Image management](https://developers.cloudflare.com/containers/guides/image-management/).
2. From your project directory, run:
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
3. Wait for the command to finish.

`wrangler deploy` uploads and activates your Worker before it processes the container configuration. For a Dockerfile image, Wrangler then builds and pushes the image when needed. For a registry image, it uses the configured image reference. These steps are not transactional: an image build, image push, or [rollout](https://developers.cloudflare.com/containers/configuration/rollouts/) error can happen after the new Worker is already live.

For an existing container application, Wrangler starts a rollout when the effective container configuration changes. The command does not wait for every container instance to be replaced, so new Worker code may briefly talk to containers that still run the previous image. The first deploy creates the container application directly, and a deploy with no effective container changes starts no rollout.

First deploy

The first deploy can take several minutes while Cloudflare provisions the image. The Worker URL may respond before container routes succeed.

For rollout flags and step configuration, refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

## Deploy with Workers Builds

[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) runs the build and deploy commands you configure for the Worker that is connected to your Git repository.

| Git branch                                                                                                                             | Default deploy command       | Containers                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Production branch                                                                                                                      | npx wrangler deploy          | Publishes the image when needed and rolls out container instances. Dockerfile builds can run in the Workers Builds environment. |
| Other branches (if [non-production branch builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/) are enabled) | npx wrangler versions upload | Uploads Worker code only. Does not publish a new image or roll out container instances.                                         |

### Production

1. In the Cloudflare dashboard, go to **Workers & Pages**, open the Worker you want to deploy, then go to **Settings** \> **Builds**.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Set **Deploy command** to `npx wrangler deploy`, or to a package script that runs a full deploy.
3. Keep your Wrangler config and Dockerfile or image reference under the Workers Builds [root directory](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).
4. Push to your [production branch](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/).
5. Confirm the build succeeds, then [check the deploy](#check-your-deploy).

To connect a repository, refer to [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).

### Before production

* **`wrangler deploy`** publishes container images (when needed) and rolls out container instances for the Worker you deploy.
* **`wrangler versions upload`** (the default non-production branch deploy command in Workers Builds) uploads a new Worker version only. It does not publish a new image or roll out container instances.
* **[Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) are not generated for Workers that implement [Durable Objects](https://developers.cloudflare.com/durable-objects/)**, which includes Containers Workers. A successful non-production Workers Builds run still creates a Worker version, but not a full-app preview URL.

| Goal                                                                    | What to do                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Change Worker and container together on your machine                    | [Local development](https://developers.cloudflare.com/containers/guides/local-dev/) with wrangler dev                                                                                                                                                                                                                                                                       |
| Share a deployed environment with its own image and container instances | A [Wrangler environment](https://developers.cloudflare.com/workers/wrangler/environments/) or a separate Worker, each connected to Workers Builds with a full deploy command such as npx wrangler deploy --env staging. Refer to [Workers Builds and Wrangler environments](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments). |
| Update production                                                       | Merge to the production branch (or run wrangler deploy locally)                                                                                                                                                                                                                                                                                                             |

Caution

Do not set the Workers Builds **non-production branch deploy command** on your production Worker to `wrangler deploy` only to try a new image from a feature branch. That command deploys the same Worker that already serves production traffic, so it can roll the container instances users already hit. Use local development, or connect a separate staging Worker or Wrangler environment to Workers Builds instead.

## Check your deploy

After `wrangler deploy` or a production Workers Builds deploy:

1. Confirm the new Worker deployment is active in the dashboard.
2. Send a request that must reach the container and confirm the behavior you expect.
3. Optionally run `npx wrangler containers list` and `npx wrangler containers images list`, or open the Containers dashboard:
[Go to **Containers** ↗](https://dash.cloudflare.com/?to=/:account/workers/containers)

For gradual steps, grace periods, and rollout modes, refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

## Troubleshooting

| Problem                                                                         | What to do                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Non-production Workers Builds run succeeds but you cannot fully preview the app | Use [local development](https://developers.cloudflare.com/containers/guides/local-dev/) or a staging Worker or environment with wrangler deploy. Refer to [Before production](#before-production).                                                                               |
| Deploy or Workers Builds run succeeds but container instances look unchanged    | A gradual rollout may still be running, or the command did not update containers (versions upload or \--containers-rollout=none). Refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).                                                     |
| Deploy fails because Docker is missing                                          | Required only when image is a Dockerfile path. Start Docker, use Workers Builds, switch to a [registry image](https://developers.cloudflare.com/containers/guides/image-management/#use-pre-built-container-images), or use \--containers-rollout=none for a Worker-only deploy. |
| First deploy: Worker works, container routes error                              | Wait several minutes for provisioning, then check logs.                                                                                                                                                                                                                          |

## Related

* [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/)
* [Image management](https://developers.cloudflare.com/containers/guides/image-management/)
* [Local development](https://developers.cloudflare.com/containers/guides/local-dev/)
* [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
* [Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/guides/deploy/#page","headline":"Deploy Containers · Cloudflare Containers docs","description":"Deploy from your machine or Workers Builds, including how images and container instances update.","url":"https://developers.cloudflare.com/containers/guides/deploy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
