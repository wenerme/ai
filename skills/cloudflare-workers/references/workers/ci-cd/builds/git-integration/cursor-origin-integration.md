---
description: Learn how to manage your Cursor Origin integration for Workers Builds
title: Cursor Origin integration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cursor Origin integration

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare supports connecting a Cursor Origin repository to your Cloudflare Worker. Workers Builds automatically builds and deploys your Worker when you push a change to the configured production branch. You can also enable [non-production branch builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#configure-non-production-branch-builds) to preview changes without deploying them to production.

## Features

Beyond automatic builds and deployments, the Cloudflare Cursor Origin integration reports build activity in Origin so you can follow a deployment without leaving your repository.

### Pull request comments

When a commit is part of a pull request, Cloudflare posts a comment on the pull request with the build status and links to the build.

When a non-production build runs `wrangler versions upload`, the comment also includes two [preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/):

- A versioned preview URL for the specific version created by the build.
- An aliased preview URL that follows the latest version built from the branch.

The versioned URL does not change. The aliased URL remains stable as you push additional commits to the same branch, making it useful for reviewing an active pull request.

Note

Preview URLs must be enabled for the Worker. Preview URLs are not generated for Workers that implement a [Durable Object](https://developers.cloudflare.com/durable-objects/), including [Containers](https://developers.cloudflare.com/containers/) and [Sandbox](https://developers.cloudflare.com/sandbox/) Workers. Refer to [Preview URL limitations](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/#limitations).

### Check runs

Cloudflare creates an Origin check run for each build triggered from the repository. Check runs show whether a build is queued, in progress, or complete. Select the check run details to open the build in the Cloudflare dashboard.

If multiple Workers are connected to one repository, such as in a [monorepo](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#monorepos), each triggered build appears as a separate check run.

When you use [build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/), Cloudflare only creates check runs for Workers whose configured paths trigger a build.

## Install the Cloudflare app

To install the Cloudflare app for Cursor Origin:

1. Open the [Cloudflare app in Cursor ↗](https://cursor.com/codebase/settings/apps/public/cloudflare).
2. Select **Install**.
3. Choose the Origin owner and grant access to either all repositories or selected repositories.
4. Follow the prompts to connect the installation to your Cloudflare account and configure the Worker build.

## Manage access

You can manage the Cloudflare app from [Cursor codebase settings ↗](https://cursor.com/codebase/settings/apps).

### Team access

The Cursor workspace administrator who installs the app chooses the user or team that owns the repositories Cloudflare can access. The administrator can grant access to all repositories owned by that user or team, or limit access to selected repositories.

Cloudflare recommends granting access only to repositories that you intend to connect to Workers Builds.

### Change repository access

To change the repositories available to Cloudflare:

1. Open [Cursor codebase settings ↗](https://cursor.com/codebase/settings/apps).
2. Select the Cloudflare app.
3. Update the repositories that the installation can access.

Removing a repository from the installation disables new builds for Workers connected to that repository. Previous deployments continue to run on Cloudflare.

### Remove access

To remove Cloudflare's access to all repositories owned by the selected Origin user or team, uninstall the Cloudflare app from [Cursor codebase settings ↗](https://cursor.com/codebase/settings/apps).

Uninstalling the app disables new builds for every Worker connected through that installation. Previous deployments continue to run on Cloudflare.

If you only want to stop automatic builds for one Worker, [disconnect the Git repository](https://developers.cloudflare.com/workers/ci-cd/builds/#disconnecting-builds) from the Worker instead.

### Reinstall the Cloudflare Cursor Origin app

If the Origin connection cannot access a repository or receive new changes, reinstall the app:

1. Open [Cursor codebase settings ↗](https://cursor.com/codebase/settings/apps).
2. Select the Cloudflare app and uninstall it.
3. Open the [Cloudflare app in Cursor ↗](https://cursor.com/codebase/settings/apps/public/cloudflare).
4. Select **Install**, choose the Origin owner, and grant repository access.
5. Follow the prompts to reconnect the installation to Cloudflare.
6. Retry the build.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/#page","headline":"Cursor Origin integration","description":"Learn how to manage your Cursor Origin integration for Workers Builds","url":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
