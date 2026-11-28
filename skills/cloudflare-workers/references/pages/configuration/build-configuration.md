---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Set build commands, output directories, and framework presets for Cloudflare Pages projects.
title: Build configuration
image: https://developers.cloudflare.com/pages/configuration/build-configuration/og.png?v=3b81c7eb16f14ab8
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Build configuration

You can configure how Cloudflare Pages builds your site and where its output files are located. For build configuration on Cloudflare Workers, refer to [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

## Build commands and directories

Provide a build command to tell Cloudflare Pages how to build your application. For projects not listed in the presets table, refer to your framework's documentation.

The build output directory indicates where your project's build command outputs the built version of your Cloudflare Pages site. Often, this defaults to `dist` or `public`, but you can customize it.

<details>

<summary>

Understanding your build configuration

</summary>

The build command is provided by your framework. For example, a Vite project uses <code>npm run build</code> as its build command. When you are working without a framework and do not need a build step, leave the **Build command** field blank. Pages determines whether a build has succeeded or failed by reading the exit code returned from the user-supplied build command. Any non-zero return code causes a build to fail. An exit code of <code>0</code> marks the Pages build as successful and uploads assets regardless of whether logs are written to standard error.

The build output directory is generated from the build command. Each framework has its own naming convention. For example, the build output directory is <code>dist</code> or <code>public</code> for many frameworks.

The root directory is where your site's content lives. If not specified, Cloudflare assumes that your linked Git repository is the root directory. Specify the root directory for cases like monorepos, where multiple projects live in one repository.

</details>

## Framework presets

Cloudflare maintains a list of build configurations for popular frameworks and tools. These are accessible during project creation. The following table lists the standard build commands and output directories for each preset.

If you are not using a preset and do not need a build step, leave the **Build command** field blank (or use `exit 0` if your workflow requires a non-empty command).

| Framework/tool | Build command | Build directory |
| --- | --- | --- |
| React (Vite) | `npm run build` | `dist` |
| Gatsby | `npx gatsby build` | `public` |
| Next.js (Static HTML Export) | `npx next build` | `out` |
| Nuxt.js | `npm run build` | `dist` |
| Qwik | `npm run build` | `dist` |
| Remix | `npm run build` | `build/client` |
| Svelte | `npm run build` | `public` |
| SvelteKit | `npm run build` | `.svelte-kit/cloudflare` |
| Vue | `npm run build` | `dist` |
| Analog | `npm run build` | `dist/analog/public` |
| Astro | `npm run build` | `dist` |
| Angular | `npm run build` | `dist/cloudflare` |
| Brunch | `npx brunch build --production` | `public` |
| Docusaurus | `npm run build` | `build` |
| Elder.js | `npm run build` | `public` |
| Eleventy | `npx @11ty/eleventy` | `_site` |
| Ember.js | `npx ember-cli build` | `dist` |
| GitBook | `npx gitbook-cli build` | `_book` |
| Gridsome | `npx gridsome build` | `dist` |
| Hugo | `hugo` | `public` |
| Jekyll | `jekyll build` | `_site` |
| MkDocs | `mkdocs build` | `site` |
| Pelican | `pelican content` | `output` |
| React Static | `react-static build` | `dist` |
| Slate | `./deploy.sh` | `build` |
| Umi | `npx umi build` | `dist` |
| VitePress | `npx vitepress build` | `.vitepress/dist` |
| Zola | `zola build` | `public` |

## Environment variables

If your project uses environment variables during builds, you can configure them in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Select **Settings** > **Variables and Secrets**.

Note

Environment variables configured under **Settings** > **Variables and Secrets** are available at build time and at runtime for Pages Functions. Changes take effect on the next deployment.

The following system environment variables are injected by default (but can be overridden):

| Environment Variable | Injected value | Example use-case |
| --- | --- | --- |
| `CI` | `true` | Changing build behaviour when run on CI versus locally |
| `CF_PAGES` | `1` | Changing build behaviour when run on Pages versus locally |
| `CF_PAGES_COMMIT_SHA` | `<sha1-hash-of-current-commit>` | Passing current commit ID to error reporting, for example, Sentry |
| `CF_PAGES_BRANCH` | `<branch-name-of-current-deployment>` | Customizing build based on branch, for example, disabling debug logging on `production` |
| `CF_PAGES_URL` | `<url-of-current-deployment>` | Allowing build tools to know the URL the page will be deployed at |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/build-configuration/#page","headline":"Build configuration","description":"Set build commands, output directories, and framework presets for Cloudflare Pages projects.","url":"https://developers.cloudflare.com/pages/configuration/build-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/build-configuration/og.png?v=3b81c7eb16f14ab8","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
