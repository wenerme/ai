---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Use Images transformation URLs to optimize and cache remote images from allowed origins at the edge.
title: Transform via URL
image: https://developers.cloudflare.com/images/optimization/transformations/url/og.png?v=0994888894e80fb0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Transform via URL

Use transformation URLs to optimize images from any origin. [Optimization parameters](https://developers.cloudflare.com/images/optimization/features) tell Images how to process an image, such as setting its [quality](https://developers.cloudflare.com/images/optimization/features/#quality), [format](https://developers.cloudflare.com/images/optimization/features/#format), and [size](https://developers.cloudflare.com/images/optimization/features/#width), and other options.

By default, transformation URLs use the following structure:

```txt
https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
```

Before Images can process transformation URLs, you must enable the URL interface for each zone or Worker that serves them.

Choose a configuration scope based on where you serve transformation URLs:

| Scope | Use case | Behavior |
| --- | --- | --- |
| [**Zone**](#zone-configuration) | Serve transformation URLs from your Cloudflare zone. | Applies across the zone, including custom domains routed to a Worker. |
| [**Worker**](#worker-configuration) | Serve transformation URLs from your `workers.dev` subdomain or test them on a [local Worker development](#local-development) server. | Applies to that Worker and overrides the zone configuration for custom domains connected to it. |

For custom domains routed to a Worker, Worker-scoped configuration, when present, always overrides zone-scoped configuration for requests handled by that Worker.

By default, transformation URLs accept source images from the same zone. You can set up an allowlist to configure allowed origins. Refer to [Define source origins](https://developers.cloudflare.com/images/optimization/transformations/sources/) for defaults, limits, wildcard behavior, and examples.

## Configure the URL interface for a zone

Enable the URL interface on a Cloudflare zone through the [Cloudflare CLI](#zone-cli), [dashboard](#zone-dashboard), or [REST API](#zone-rest-api).

### Cloudflare CLI

Replace `example.com` with your zone, then turn on the URL interface with:

```sh
cf zones settings edit transformations \
  --zone example.com \
  --body '{"value":"on"}'
```

If your source images are outside this zone, then replace `images.example.net` with the allowed origin:

```sh
cf zones transformations-allowed-origins edit \
  --zone example.com \
  --value "images.example.net"
```

### Dashboard

1. Go to **Images** > **Transformations**. [Go to **Transformations** ↗](https://dash.cloudflare.com/?to=/:account/images/transformations)
2. Select the zone where you want to serve transformation URLs.
3. Turn on **Transformations**.
4. Optionally, configure allowed origins under **Sources**.

### REST API

Send a `PATCH` request to `/zones/{zone_id}/settings/transformations` with `"value": "on"`. Refer to the [Edit zone setting API](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/).

You can optionally configure allowed origins with [`transformations_allowed_origins`](https://developers.cloudflare.com/api/resources/zones/subresources/transformations_allowed_origins/).

## Configure the URL interface for a Worker

Enable the URL interface on a `workers.dev` subdomain through Wrangler, the [Cloudflare CLI](#worker-wrangler-cli), or [REST API](#worker-rest-api).

Worker-scoped settings also apply through Worker routes that match the transformation request. Transformation URLs use `/cdn-cgi/image/*`, so a route such as `example.com/*` matches, but `example.com/foo/*` does not.

Deployed transformation settings remain active until you explicitly change them. To disable transformation URLs, set `enabled` to `false` through your configuration or the REST API.

### Wrangler or Cloudflare CLI

Turn on the URL interface in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) or in [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/) for the [Cloudflare CLI](https://developers.cloudflare.com/cf/). The following configuration enables transformation URLs with sources from the same zone:

The following content appears twice: first for the Cloudflare CLI (`cf`), then for Wrangler. Use `cf` for new projects. In an existing project, use the CLI that the project already uses.

Cloudflare CLI

*cloudflare.config.tsts*

```ts
import { defineConfig } from "cf/config";

export default defineConfig({
worker: {
  name: "image-app",
  // Set this to today's date
  compatibilityDate: "2026-11-25",
  images: {
    urlTransformations: {
      enabled: true,
    },
  },
},
});
```

Wrangler

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "images": {
    "url_transformations": {
      "enabled": true
    }
  }
}
```

```toml
[images.url_transformations]
enabled = true
```

If your source images are outside the Worker's zone, then set an explicit allowlist with `allowed_origins` in Wrangler or `allowedOrigins` in `cloudflare.config.ts`:

The following content appears twice: first for the Cloudflare CLI (`cf`), then for Wrangler. Use `cf` for new projects. In an existing project, use the CLI that the project already uses.

Cloudflare CLI

*cloudflare.config.tsts*

```ts
import { defineConfig } from "cf/config";

export default defineConfig({
worker: {
  name: "image-app",
  // Set this to today's date
  compatibilityDate: "2026-11-25",
  images: {
    urlTransformations: {
      enabled: true,
      allowedOrigins: [
        "images.example.com",
        "image-app.<YOUR_SUBDOMAIN>.workers.dev",
      ],
    },
  },
},
});
```

Wrangler

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "images": {
    "url_transformations": {
      "enabled": true,
      "allowed_origins": [
        "images.example.com",
        "image-app.<YOUR_SUBDOMAIN>.workers.dev"
      ]
    }
  }
}
```

```toml
[images.url_transformations]
enabled = true
allowed_origins = [
  "images.example.com",
  "image-app.<YOUR_SUBDOMAIN>.workers.dev",
]
```

Run `wrangler deploy` or `cf deploy` to apply them to the deployed Worker. For local development, run `wrangler dev` or `cf dev`.

Named Wrangler environments do not inherit `images.url_transformations`.

[Version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/) support the URL interface using the Worker's deployed settings, rather than version-specific settings. `wrangler versions upload` does not update `images.url_transformations`.

### Local development

You can use the URL interface in local development through [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the command-line interface for Workers. Usage in local development does not incur billable usage.

Set `images.url_transformations.enabled` to `true` to enable URLs locally.

In local development, transformation URLs always accept relative sources; any allowed origins are additional.

Local transformations use a low-fidelity offline version that supports a limited subset of features such as resizing, rotation, and format conversion. Deploy your Worker to test complete production behavior.

### REST API

Send a `PUT` request to `/accounts/{account_id}/settings/transformations/workers/{script_name}`.

You can optionally configure allowed origins with `allowed_origins`.

## How Cloudflare processes transformations

When Cloudflare receives a transformation request, it checks for a cached result for the same source image and optimization parameters:

- **On a cache [HIT](https://developers.cloudflare.com/cache/concepts/cache-responses/#hit)** — Cloudflare serves the optimized image directly from the edge without contacting the origin or re-applying the optimization parameters.
- **On a cache [MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss)** — Cloudflare fetches the source image, applies the requested optimizations, caches the transformed result, then returns it to the browser. Cloudflare also caches the original image so future transformations can use it without another origin request.

## Next steps

After enabling transformations on your zone or Worker, you can configure how Cloudflare handles transformation requests:

- **[Define source origins](https://developers.cloudflare.com/images/optimization/transformations/sources)** — Configure origins where Cloudflare can fetch source images.
- **[Create transformation flows](https://developers.cloudflare.com/images/optimization/transformations/flows)** — Set up automated rules that apply image optimization to matching requests without requiring URL changes or custom code.
- **[Control origin access](https://developers.cloudflare.com/images/optimization/transformations/control-origin-access)** — Use [Workers](https://developers.cloudflare.com/workers/) to add custom logic for validating and controlling access to source images.
- **[Set up rewrite rules](https://developers.cloudflare.com/images/optimization/transformations/rewrite-rules)** — Use [Transform Rules](https://developers.cloudflare.com/rules/transform/) to rewrite image URLs and serve transformations from custom paths.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/transformations/url/#page","headline":"Transform via URL","description":"Use Images transformation URLs to optimize and cache remote images from allowed origins at the edge.","url":"https://developers.cloudflare.com/images/optimization/transformations/url/","inLanguage":"en","image":"https://developers.cloudflare.com/images/optimization/transformations/url/og.png?v=0994888894e80fb0","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
