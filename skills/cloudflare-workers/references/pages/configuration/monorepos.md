---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Deploy multiple Cloudflare Pages projects from a single monorepo repository.
title: Monorepos
image: https://developers.cloudflare.com/pages/configuration/monorepos/og.png?v=05fabe1e1b4dbd18
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Monorepos

While some apps are built from a single repository, Pages also supports apps with more complex setups. A monorepo is a repository that has multiple subdirectories each containing its own application. For monorepos on Cloudflare Workers, refer to [Workers Builds monorepos](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#monorepos).

## Set up

You can create multiple projects using the same repository, [in the same way that you would create any other Pages project](https://developers.cloudflare.com/pages/get-started/git-integration/). You have the option to vary the build command and/or root directory of your project to tell Pages where you would like your build command to run. All project names must be unique even if connected to the same repository.

## Builds

When you connect a Git repository to Pages, by default a change to any file in the repository triggers a Pages build.

![Monorepo example diagram](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=3600,height=828,format=webp/_astro/pages-path.D3Q_3sei.png)

Take for example `my-monorepo` with two associated Pages projects (`marketing-app` and `ecommerce-app`) and their listed dependencies. By default, if you change a file in the project directory for `marketing-app`, then a build for the `ecommerce-app` project is also triggered, even though `ecommerce-app` and its dependencies have not changed. To avoid duplicate builds, include and exclude both [build watch paths](https://developers.cloudflare.com/pages/configuration/build-watch-paths/) and [branches](https://developers.cloudflare.com/pages/configuration/branch-build-controls/) to specify when Pages should skip a build for a given project.

## Git integration

Once you have created a separate Pages project for each of the projects within your Git repository, each Git push will issue a new build and deployment for all connected projects unless specified in your build configuration.

GitHub will display separate comments for each project with the updated project and deployment URL if there is a Pull Request associated with the branch.

### GitHub check runs and GitLab commit statuses

If you have multiple projects associated with your repository, your [GitHub check run ↗︎](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks#checks) or [GitLab commit status ↗︎](https://docs.gitlab.com/user/project/merge_requests/status_checks/) will appear like the following on your repository:

![GitHub check run](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1020,height=316,format=webp/_astro/ghcheckrun.Cv3SMhfT.png)![GitLab commit status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=584,height=176,format=webp/_astro/glcommitstatus.BXV17OMM.png)

If a build skips for any reason (for example, CI Skip, build watch paths, or branch deployment controls), the check run or commit status does not appear.

## Monorepo management tools

While Pages does not provide specialized tooling for dependency management in monorepos, you can bring additional tooling to help manage your repository. For simple subpackage management, use tools like [npm ↗︎](https://docs.npmjs.com/cli/using-npm/workspaces), [pnpm ↗︎](https://pnpm.io/workspaces), and [Yarn ↗︎](https://yarnpkg.com/features/workspaces) workspaces. You can also use tools such as [Turborepo ↗︎](https://turborepo.com/docs), [Nx ↗︎](https://nx.dev/getting-started/intro), or [Lerna ↗︎](https://lerna.js.org/docs/getting-started) to manage dependencies and task execution.

## Limitations

- Monorepo support requires the V2 or [V3 build system](https://developers.cloudflare.com/pages/configuration/build-image/#v3-build-system).
- You can configure a maximum of 5 Pages projects per repository. If you need this limit raised, contact your Cloudflare account team or use the [Limit Increase Request Form ↗︎](https://forms.gle/eX6pXvit1wBv77Yw5).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/monorepos/#page","headline":"Monorepos","description":"Deploy multiple Cloudflare Pages projects from a single monorepo repository.","url":"https://developers.cloudflare.com/pages/configuration/monorepos/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/monorepos/og.png?v=05fabe1e1b4dbd18","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
