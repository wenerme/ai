---
description: Share deployable Worker artifacts across Cloudflare tools.
title: Build Output
image: https://developers.cloudflare.com/workers/build-output/og.png?v=7f9e37aed36c80bb
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Build Output

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/build-output/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build Output is the deployable artifact produced by a Workers build implementation. It separates configuration evaluation and bundling from upload and deployment.

`cf build` validates Build Output after the project build finishes. `cf deploy`, `cf previews deploy`, `cf workers versions create`, `cf workers triggers deploy`, and `cf workers check` can reuse an existing artifact with `--prebuilt`.

Beta

`cf` is in beta. Commands, configuration, and Build Output can change before the stable release.

Build Output is versioned at `v0`.

## Inspect the directory

Build implementations write this project-relative structure:

- .cloudflare/
  - output/
    - v0/
      - config.json
      - workers/
        - default/
          - worker.config.json
          - bundle/
          - assets/
      - containers/
        - image-processor/
          - container.config.json

The top-level `config.json` is required. Each Worker directory contains `worker.config.json` and at least one of `bundle/` or `assets/`. Each Container directory contains `container.config.json`.

The reader accepts additional Worker directories. Commands use the Worker in `workers/default/` unless you pass `--worker <NAME>`, which selects the Worker whose `worker.config.json` has that `name`. An unknown name fails before `cf` sends any API request, and the error lists the available Workers.

## Read the root configuration

The root `config.json` contains the account settings from the default export of `cloudflare.config.ts`. It also records the context used for the build.

*.cloudflare/output/v0/config.jsonjson*

```json
{
	"accountId": "<ACCOUNT_ID>",
	"complianceRegion": "public",
	"buildContext": {
		"isPreview": false,
		"mode": "production"
	}
}
```

Commands that take `--prebuilt` compare their `--mode` value with `buildContext.mode`:

- When Build Output records a mode, pass exactly that mode with `--mode`.
- When Build Output records no mode, do not pass `--mode`.

Vite builds always record a mode, and `cf build` without `--mode` records `production`. Builds through Wrangler record a mode only when you pass `--mode` to `cf build`.

`buildContext.isPreview` is `true` for output built by `cf previews deploy`. `cf deploy`, `cf workers versions create`, and `cf workers triggers deploy` refuse preview output.

## Read Worker configuration

`worker.config.json` contains the resolved Worker configuration. It replaces the source `entrypoint` with a build manifest.

The manifest identifies the main module and bundled module types. Supported types are `esm`, `cjs`, `python`, `python-requirement`, `wasm`, `text`, `data`, `json`, and `sourcemap`.

Declare a source map as a module with type `sourcemap`:

*.cloudflare/output/v0/workers/default/worker.config.jsonjson*

```json
{
	"manifest": {
		"type": "complete",
		"mainModule": "index.js",
		"modules": {
			"index.js": { "type": "esm" },
			"index.js.map": { "type": "sourcemap" }
		}
	}
}
```

Set `type` to `partial` when the reader should discover additional modules in `bundle/`. A partial manifest must still identify an ES module as its main module.

The declared source map must exist under `bundle/`, such as `bundle/index.js.map`. `cf deploy` and `cf workers versions create` validate and upload declared source maps. A manifest cannot use a source map as its main module.

## Store bundles and assets

`bundle/` contains compiled Worker modules. `assets/` contains static files served with the Worker.

A Worker must contain a bundle, assets, or both.

## Read Container configuration

`container.config.json` contains the resolved Container application configuration. The build implementation must build any local Dockerfile first and record the resulting image as a local reference.

`cf deploy` uploads local images and applies supported application settings for Containers referenced by the Worker. `cf workers versions create` records Container metadata and prepares images for Durable Object-managed Containers, but it does not apply Container applications.

## Build with Vite

The Cloudflare Vite plugin reads `cloudflare.config.ts`, builds each Vite environment, and writes Build Output. `cf` uses the plugin's 2.0 beta (`@cloudflare/vite-plugin@beta`), which writes Build Output whether `cf build` or `vite build` runs the build.

The plugin cleans previous output before a full build. It writes bundles and assets to the standard Build Output paths.

## Deploy a prebuilt artifact

Use `--prebuilt` to deploy an existing artifact without running another build. Preserve the complete `.cloudflare/output/v0/` directory, and pass the mode that Build Output records:

```sh
cf deploy --prebuilt --mode production
```

For the mode rule and more examples, refer to [Deploy a prebuilt build](https://developers.cloudflare.com/cf/projects/#deploy-a-prebuilt-build). For a pipeline that builds in one job and deploys in another, refer to [Use cf in CI](https://developers.cloudflare.com/cf/ci/).

## Validate the artifact

The Build Output reader validates the root, Worker, and Container configuration files against shared schemas. It requires the default Worker and at least one bundle or asset directory for each Worker.

After reading the artifact, `cf` converts the Worker configuration to the deployment helper format. `cf` reports configuration and upload errors separately from malformed Build Output errors.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/build-output/#page","headline":"Build Output","description":"Share deployable Worker artifacts across Cloudflare tools.","url":"https://developers.cloudflare.com/workers/build-output/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/build-output/og.png?v=7f9e37aed36c80bb","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
