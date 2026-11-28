---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Configure which file paths trigger or skip a Cloudflare Pages build when changes are pushed.
title: Build watch paths
image: https://developers.cloudflare.com/pages/configuration/build-watch-paths/og.png?v=9ff01f6f6352fda3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Build watch paths

When you connect a Git repository to Pages, by default a change to any file in the repository triggers a Pages build. You can configure Pages to include or exclude specific paths to skip builds for unrelated changes. This is useful in a monorepo project structure to limit unnecessary builds. For build watch paths on Cloudflare Workers, refer to [Workers Builds build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/).

## Configure paths

To configure which paths are included and excluded:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** > **Build** > **Build watch paths**. Pages defaults to including all paths ( `[*]`) and excluding none ( `[]`).

The configuration fields can be filled in two ways:

- **Static filepaths**: Enter the precise name of the file you are looking to include or exclude (for example, `docs/README.md`).
- **Wildcard syntax:** Use wildcards to match multiple paths. You can specify wildcards at the start or end of your rule.

Wildcard syntax

A wildcard (`*`) matches zero or more characters, **including path separators (`/`)**. This means a single `*` at the end of a path pattern will match files in nested subdirectories as well. For example:

- `docs/*` matches `docs/README.md`, `docs/guides/setup.md`, and `docs/guides/advanced/config.md`.
- `*.md` matches `README.md`, `docs/README.md`, and `src/content/guide.md`.
- `*` alone matches all files in the repository.

For each path in a push event, build watch paths will be evaluated as follows:

- Paths satisfying excludes conditions are ignored first
- Any remaining paths are checked against includes conditions
- If any matching path is found, a build is triggered. Otherwise the build is skipped

Pages will bypass the path matching for a push event and default to building the project if:

- A push event contains 0 file changes, in case a user pushes an empty push event to trigger a build
- A push event contains 3000+ file changes or 20+ commits

## Examples

### Trigger builds for specific directories (monorepo)

To trigger a build only when files change within specific directories, such as `project-a/` and `packages/`, use the following rules. Because `*` matches across path separators, this includes changes in nested subdirectories like `project-a/src/index.js` or `packages/utils/lib/helpers.ts`:

- Include paths: `project-a/*`, `packages/*`
- Exclude paths: *(leave empty)*

### Exclude a directory from triggering builds

To trigger a build for any changes except those in a specific directory, such as `docs/` (including nested paths like `docs/guides/setup.md`), use the following rules:

- Include paths: `*`
- Exclude paths: `docs/*`

### Trigger builds for a specific filetype

To trigger a build only when a specific file or filetype changes, such as any `.md` file in the repository, use the following rules:

- Include paths: `*.md`
- Exclude paths: *(leave empty)*

### Trigger builds for a directory but exclude a subdirectory

To trigger a build for changes in `src/` while ignoring changes in `src/tests/`, use the following rules:

- Include paths: `src/*`
- Exclude paths: `src/tests/*`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/build-watch-paths/#page","headline":"Build watch paths","description":"Configure which file paths trigger or skip a Cloudflare Pages build when changes are pushed.","url":"https://developers.cloudflare.com/pages/configuration/build-watch-paths/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/build-watch-paths/og.png?v=9ff01f6f6352fda3","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
