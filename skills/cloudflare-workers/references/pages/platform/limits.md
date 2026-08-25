---
description: Build, deployment, and custom domain limits for Cloudflare Pages by plan type.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Jul 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/platform/limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below are limits observed by the Cloudflare Free plan. For more details on removing these limits, refer to the [Cloudflare plans ↗](https://www.cloudflare.com/plans) page.

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Builds

Each time you push new code to your Git repository, Pages will build and deploy your site. Build limits depend on your plan:

|                  | Free              | Pro                 | Business             |
| ---------------- | ----------------- | ------------------- | -------------------- |
| Builds           | 1 build at a time | 5 concurrent builds | 20 concurrent builds |
| Builds per month | 500               | 5,000               | 20,000               |

Builds will timeout after 20 minutes. Concurrent builds are counted per account.

## Custom domains

Based on your Cloudflare plan type, a Pages project is limited to a specific number of custom domains. This limit is on a per-project basis.

| Free | Pro | Business | Enterprise                 |
| ---- | --- | -------- | -------------------------- |
| 100  | 250 | 500      | 500[1](#user-content-fn-1) |

## Files

Pages uploads each file on your site to Cloudflare's globally distributed network to deliver a low latency experience to every user that visits your site. Cloudflare Pages sites can contain up to 20,000 files on the Free plan.

Paid plans (such as Pro, Business, and Enterprise plans) can have up to 100,000 files per site. To enable this increased limit, set the environment variable `PAGES_WRANGLER_MAJOR_VERSION=4` in your Pages project settings.

## File size

The maximum file size for a single Cloudflare Pages site asset is 25 MiB.

Larger Files

To serve larger files, consider uploading them to [R2](https://developers.cloudflare.com/r2/) and utilizing the [public bucket](https://developers.cloudflare.com/r2/buckets/public-buckets/) feature. You can also use [custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain), such as `static.example.com`, for serving these files.

## Functions

Requests to [Pages functions](https://developers.cloudflare.com/pages/functions/) count towards your quota for Workers plans, including requests from your Function to KV or Durable Object bindings.

Pages supports the [Standard usage model](https://developers.cloudflare.com/workers/platform/pricing/#example-pricing-standard-usage-model).

## Headers

A `_headers` file can have a maximum of 100 header rules.

An individual header in a `_headers` file can have a maximum of 2,000 characters. For managing larger headers, it is recommended to implement [Pages Functions](https://developers.cloudflare.com/pages/functions/).

## Preview deployments

You can have an unlimited number of [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) active on your project at a time.

## Redirects

A `_redirects` file can have a maximum of 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. It is recommended to use [Bulk Redirects](https://developers.cloudflare.com/pages/configuration/redirects/#surpass-%5Fredirects-limits) when you have a need for more than the `_redirects` file supports.

## Users

Your Pages site can be managed by an unlimited number of users via the Cloudflare dashboard. Note that this does not correlate with your Git project – you can manage both public and private repositories, open issues, and accept pull requests via without impacting your Pages site.

## Projects

Cloudflare Pages has a limit of 100 projects per account. This limit is not routinely increased.

If you need to host more than 100 sites, use one of these products designed for scale:

* **[Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/)** — Deploy sites and applications at scale with no project limit. Supports [static assets](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/static-assets/).
* **[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)** — Deploy static sites as individual Workers. Paid plans support up to 500 Workers per account, each serving up to 100,000 static asset files.

Note

The Workers project limit (100 on Free, 500 on paid plans) is separate from the Pages project limit. Refer to [Workers limits](https://developers.cloudflare.com/workers/platform/limits/#number-of-workers) for details.

In order to protect against abuse of the service, Cloudflare limits the number of new Pages projects you can create within your first 48 hours of using the service. If you are temporarily blocked from creating new projects, this restriction will automatically lift once the initial 48-hour window has passed.

## Footnotes

1. If you need more custom domains, contact your account team. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/platform/limits/#page","headline":"Limits · Cloudflare Pages docs","description":"Build, deployment, and custom domain limits for Cloudflare Pages by plan type.","url":"https://developers.cloudflare.com/pages/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
