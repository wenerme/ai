---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Manage which origins Cloudflare Images can use as the source for image transformations.
title: Define source origins
image: https://developers.cloudflare.com/images/optimization/transformations/sources/og.png?v=7a75418215992362
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Define source origins

Transformation URLs fetch source images before applying optimizations.

By default, Images accepts sources images only from the same zone where it serves the transformation. Use an allowlist to control the origins where `/cdn-cgi/image/` transformation URLs can fetch source images.

Note

The allowlist applies only to `/cdn-cgi/image/` transformation URLs. It does not apply to the [Images binding](https://developers.cloudflare.com/images/optimization/binding/) or when a Worker uses `cf.image` on a `fetch()` subrequest.

## Configure allowed origins

Before you can specify an allowlist, you must [enable transformation URLs](https://developers.cloudflare.com/images/optimization/transformations/url/) for the zone or Worker that serves them.

Configure allowed origins at the same scope as the URL interface.

### Zone

| Interface | Setting |
| --- | --- |
| Wrangler | Not available |
| Cloudflare CLI | [`cf zones transformations-allowed-origins edit`](https://developers.cloudflare.com/images/optimization/transformations/url/#zone-cli) |
| Dashboard | [**Images** > **Transformations** > **Sources**](https://developers.cloudflare.com/images/optimization/transformations/url/#zone-dashboard) |
| REST API | [`transformations_allowed_origins`](https://developers.cloudflare.com/images/optimization/transformations/url/#zone-rest-api) |

### Worker

| Interface | Setting |
| --- | --- |
| Wrangler | [`images.url_transformations.allowed_origins`](https://developers.cloudflare.com/images/optimization/transformations/url/#worker-wrangler-cli) |
| Cloudflare CLI | [`worker.images.urlTransformations.allowedOrigins`](https://developers.cloudflare.com/images/optimization/transformations/url/#worker-wrangler-cli) |
| Dashboard | Not available |
| REST API | [`allowed_origins`](https://developers.cloudflare.com/images/optimization/transformations/url/#worker-rest-api) |

## How the allowlist works

Cloudflare rejects a transformation request when the source does not match the active allowlist.

The same hostname, wildcard, path, and redirect behaviors apply to both zone-scoped and Worker-scoped allowlists in production.

For zone-scoped transformations without an allowlist, Images accepts sources from any hostname in the same zone, including subdomains.

For custom domains routed to a Worker, the Worker's `allowed_origins` list replaces the zone-scoped allowlist handled by that Worker.

Worker allowlists

When configuring an allowlist for a Worker, explicitly include every hostname used for relative or same-host sources, including its `workers.dev` hostname and connected custom domains.

For example, consider a Worker that serves transformations from both:

- `image-app.<YOUR_SUBDOMAIN>.workers.dev`
- `images.example.com`

You must add both hostnames to the allowlist to use `/image.png` as a relative source from either hostname in production.

When developing locally, Images always accepts relative sources.

## Match hostnames and subdomains

Each hostname in an allowlist matches only that exact hostname unless you use a wildcard.

| Allowed origin | Accepted source hostnames | Rejected source hostnames |
| --- | --- | --- |
| `b.com` | `b.com` | `media.b.com`, `cdn.b.com` |
| `media.b.com` | `media.b.com` | `b.com`, `cdn.b.com` |
| `*.b.com` | `b.com`, `media.b.com`, `cdn.b.com` | `example.com` |

Add `*.` before a domain to match the domain and all of its subdomains.

## Match paths

You can restrict an allowed origin to a path. If you omit the path, then Images accepts source images from every path on that hostname.

Cloudflare matches the configured path against the beginning of the source path.

| Allowed origin | Source URL | Result |
| --- | --- | --- |
| `b.com/themes` | `https://b.com/themes/image.png` | Accepted |
| `b.com/themes` | `https://b.com/themes/icons/image.png` | Accepted |
| `b.com/themes` | `https://b.com/media/themes/image.png` | Rejected |

## Follow redirects

Cloudflare checks the initial source URL against the allowed origins. After accepting the initial URL, Images follows redirects and processes the resulting image even when they lead to an origin that is not allowed.

Only allow hostnames whose redirects you trust.

## Allow any origin

Caution

Allowing any origin lets third parties request transformations through the URL interface, which may cause unintended usage. Use this setting only when you expect arbitrary source hostnames.

To accept publicly available source images from any origin:

### Zone

- **Cloudflare CLI:** Set the value to `"*"`:

```sh
cf zones transformations-allowed-origins edit \
   --zone example.com \
   --value "*"
```

- REST API: Send "value": "\*" to the [`transformations_allowed_origins`](https://developers.cloudflare.com/api/resources/zones/subresources/transformations_allowed_origins/) endpoint.
- **Dashboard:** Select **Any origin** under **Sources**.

Changing a zone to accept any origin clears its allowlist.

### Worker

- **Wrangler**: Set `allowed_origins = ["*"]`.
- **Cloudflare CLI**: Set `allowedOrigins: ["*"]` in `cloudflare.config.ts`.
- **REST API**: Set `allowed_origins` to `["*"]` in the Worker transformation settings request.

For Worker configuration, `"*"` must be the only entry in the list.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/transformations/sources/#page","headline":"Define source origins","description":"Manage which origins Cloudflare Images can use as the source for image transformations.","url":"https://developers.cloudflare.com/images/optimization/transformations/sources/","inLanguage":"en","image":"https://developers.cloudflare.com/images/optimization/transformations/sources/og.png?v=7a75418215992362","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
