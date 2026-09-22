---
description: Understand the difference between Previews, Version URLs, and Wrangler environments.
title: Compare workflows
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Compare workflows

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/previews/compare-workflows/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Previews are the recommended way to test changes before production.

## Quick comparison

| Workflow | Best for | Command |
| --- | --- | --- |
| **Previews** | Full environments for branches and pull requests under the same Worker. | `npx wrangler preview` |
| **[Version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/)** | An uploaded version of your code that uses production resources. | `wrangler versions upload` |
| **[Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/)** | Separately deployed Workers. | `wrangler deploy --env <name>` |

## Version URLs

Version URLs use production resources

A Version URL runs one uploaded Worker version with the production resources configured for that version. It does not create isolated branch resources.

Do not use Version URLs for branch or pull request testing. Use [Previews](https://developers.cloudflare.com/workers/previews/) instead.

Use Version URLs only when you need to inspect one specific uploaded version before deploying it to production traffic.

Version URLs are created from Worker versions, including versions uploaded with `wrangler versions upload`. They are tied to the [Versions and Deployments](https://developers.cloudflare.com/workers/versions-and-deployments/) workflow.

Version URLs are the right fit for:

- Inspecting one uploaded version before a production deployment or gradual deployment.
- Workflows built around `wrangler versions upload` and `wrangler versions deploy`.

### Migrate from aliased Version URLs to Previews

If you are using aliased Version URLs created with `wrangler versions upload --preview-alias` for branch or pull request previews, switch to Previews instead. Aliased Version URLs do not create branch-isolated resources.

| What you do today | What to do instead |
| --- | --- |
| `wrangler versions upload --preview-alias staging` | `npx wrangler preview --name staging` |
| Share an aliased Version URL for PR review | Share a [Preview URL](https://developers.cloudflare.com/workers/previews/) or [custom domain Preview URL](https://developers.cloudflare.com/workers/previews/custom-domains/). |
| Set `preview_urls = true` for aliased Version URLs | Use [Preview settings](https://developers.cloudflare.com/workers/previews/configuration/) for branch-specific variables, secrets, and bindings. |

Previews give you branch isolation, Preview-specific settings, custom domain support, and automatic resource isolation for Durable Objects and Containers.

## Wrangler environments

Wrangler environments create separately named Workers, such as `my-worker-staging`. Use them when development, staging, or other environments need persistent Workers with different settings, routes, or custom domains.

You can create branch Previews under a Wrangler environment. Define its Preview settings in `env.staging.previews`:

```jsonc
{
  "name": "my-worker",
  "env": {
    "dev": {
      "name": "my-worker-dev",
      "vars": {
        "ENVIRONMENT": "development"
      }
    },
    "staging": {
      "name": "my-worker-staging",
      "vars": {
        "ENVIRONMENT": "staging"
      },
      "previews": {
        "vars": {
          "ENVIRONMENT": "staging-preview"
        }
      }
    }
  }
}
```

```toml
name = "my-worker"

[env.dev]
name = "my-worker-dev"

  [env.dev.vars]
  ENVIRONMENT = "development"

[env.staging]
name = "my-worker-staging"

  [env.staging.vars]
  ENVIRONMENT = "staging"

[env.staging.previews.vars]
ENVIRONMENT = "staging-preview"
```

In this example, `dev` has no `previews` block and remains a persistent Worker environment. `staging` includes a `previews` block for branch Previews.

Then include the environment when you run the Preview command:

```sh
npx wrangler preview --env staging
```

This creates or updates the branch Preview under the staging Worker. The Wrangler environment provides the persistent boundary, and Previews provide branch isolation within it.

Include the environment in every Preview command

Use the same `--env` value when you create, update, manage, or delete a Preview. For example:

```sh
npx wrangler preview delete --env staging --name <PREVIEW_NAME>
```

If you omit `--env staging`, Wrangler targets the top-level Worker instead of the staging Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/previews/compare-workflows/#page","headline":"Compare workflows","description":"Understand the difference between Previews, Version URLs, and Wrangler environments.","url":"https://developers.cloudflare.com/workers/previews/compare-workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
