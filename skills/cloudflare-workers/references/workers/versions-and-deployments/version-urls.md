---
description: Test a specific Worker version uploaded with wrangler versions upload.
title: Version URLs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Version URLs

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Version URLs, previously called preview URLs, let you access an uploaded version of your Worker before deploying it to production. A Version URL uses that Worker version's existing configuration and resources instead of creating a separate environment.

This is useful for testing a specific version directly. To test the version with your zone's performance or security settings, use [version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/).

For isolated branch or pull request testing, use [Previews](https://developers.cloudflare.com/workers/previews/). To compare Previews, Version URLs, and Wrangler environments, refer to [Compare workflows](https://developers.cloudflare.com/workers/previews/compare-workflows/).

## URL format

Version URLs use this format:

```txt
<version-prefix>-<worker-name>.<subdomain>.workers.dev
```

Aliased Version URLs use this format:

```txt
<alias>-<worker-name>.<subdomain>.workers.dev
```

## Version URLs

Every time you create a new [version](https://developers.cloudflare.com/workers/versions-and-deployments/#versions) of your Worker, Cloudflare can generate a unique Version URL for that version.

New versions are created when you run:

- [`wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy)
- [`wrangler versions upload`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload)
- Dashboard code edits that save a new version

If Version URLs are enabled, the URL is public and available after version creation.

### View Version URLs with Wrangler

The [`wrangler versions upload`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload) command uploads a new version of your Worker and returns a Version URL for that version.

```sh
npx wrangler versions upload
```

### View Version URLs in the dashboard

1. In the Cloudflare dashboard, go to **Workers & Pages**. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Go to **Deployments**.
4. Find the version you want to test.

## Aliased Version URLs

Aliased Version URLs let you assign a readable alias to a specific Worker version. This can be useful when you want a stable URL for a manually uploaded version.

Create an alias during version upload with `--preview-alias`:

```sh
npx wrangler versions upload --preview-alias staging
```

The alias points at the version uploaded by that command:

```txt
staging-<worker-name>.<subdomain>.workers.dev
```

Aliases may only be created during version upload.

## Manage access to Version URLs

When enabled, Version URLs are publicly available. To require visitors to sign in, use [Cloudflare Access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/).

Access can protect Version URLs for one Worker or every Worker in an account. You can also protect both production and version deployments.

To use details about the signed-in user in your Worker, read the [user identity](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/#user-identity) from the validated JSON Web Token (JWT) or the `/cdn-cgi/access/get-identity` endpoint.

## Enable or disable Version URLs

When no Version URL setting exists, Version URLs follow the same default as your `workers.dev` route:

- If `workers_dev` is enabled, Version URLs are enabled by default.
- If `workers_dev` is disabled, Version URLs are disabled by default.
- Disabling Version URLs disables routing to Version URLs and aliased Version URLs.

### From the dashboard

1. In the Cloudflare dashboard, go to **Workers & Pages**.
2. Select your Worker.
3. Go to **Settings** > **Domains & Routes**.
4. Find **Version URLs**.
5. Select **Enable** or **Disable**.

### From Wrangler config

To enable Version URLs, add `preview_urls` to your Wrangler config:

Note

The Wrangler configuration field is still named `preview_urls`.

```jsonc
{
  "preview_urls": true
}
```

```toml
preview_urls = true
```

To disable Version URLs:

```jsonc
{
  "preview_urls": false
}
```

```toml
preview_urls = false
```

If `preview_urls` is omitted, Wrangler does not change an existing Version URL setting. Set `preview_urls` explicitly to change it.

## Limits

- Aliases may only be created during version upload.
- Aliases must use only lowercase letters, numbers, and dashes.
- Aliases must begin with a lowercase letter.
- The alias and Worker name combined with a dash must not exceed 63 characters due to DNS label limits.
- Only the 1000 most recently deployed aliases are retained. When a new alias is created beyond this limit, the least recently deployed alias is deleted.

## Limitations

- Version URLs are not generated for Workers that implement a [Durable Object](https://developers.cloudflare.com/durable-objects/), including [Containers](https://developers.cloudflare.com/containers/) and [Sandbox](https://developers.cloudflare.com/sandbox/) Workers. For Containers testing options, refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/#before-production).
- Version URLs are not generated for [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) [user Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers).
- You cannot configure Version URLs to run on a subdomain other than [`workers.dev`](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/).
- You cannot view logs for Version URLs with Workers Logs, Wrangler tail, or Logpush.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/#page","headline":"Version URLs","description":"Test a specific Worker version uploaded with wrangler versions upload.","url":"https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
