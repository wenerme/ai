---
description: Learn how to add and manage your Git integration for Workers Builds
title: Git integration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Git integration

Last updated Sep 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare supports connecting your [GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/), [GitLab](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/), or [Cursor Origin](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/) (Cursor's Git hosting platform) repository to your Cloudflare Worker, and will automatically deploy your code every time you push a change.

Adding a Git integration also lets you monitor build statuses directly in your Git provider. [GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#features) and [Cursor Origin](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/#features) use pull request comments and check runs, while [GitLab](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/#features) uses commit statuses, so you can manage deployments without leaving your workflow.

## Supported Git Providers

Cloudflare supports connecting Cloudflare Workers to your GitHub, GitLab, and Cursor Origin repositories. Workers Builds does not currently support connecting self-hosted instances of GitHub or GitLab.

If you are using a different Git provider (e.g. Bitbucket), you can use an [external CI/CD provider (e.g. GitHub Actions)](https://developers.cloudflare.com/workers/ci-cd/external-cicd/) and deploy using [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

## Add a Git Integration

Workers Builds provides direct integration with GitHub and GitLab accounts that are *not* self-hosted, as well as Cursor Origin user and team repositories.

When connecting a GitHub or GitLab repository for the first time, follow the prompts in the Cloudflare dashboard to authorize the Git provider. To connect Cursor Origin, install the [Cloudflare app in Cursor ↗](https://cursor.com/codebase/settings/apps/public/cloudflare) and follow the installation prompts.

![Connect a Git repository in Workers Builds](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1354,height=318,format=webp/_astro/builds-git-repo-connect.Do4CyWZv.png)

You can check the following pages to see if your Git integration has been installed:

- [GitHub Applications page ↗](https://github.com/settings/installations) (if you are in an organization, select **Switch settings context** to access your GitHub organization settings)
- [GitLab Authorized Applications page ↗](https://gitlab.com/-/profile/applications)
- [Cursor codebase settings ↗](https://cursor.com/codebase/settings/apps)

For details on managing provider access, refer to the [GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#organizational-access), [GitLab](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/#organizational-access), and [Cursor Origin](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/#team-access) integration guides.

## Manage a Git Integration

To manage your Git installation:

1. Go to the **Workers & Pages** page in the Cloudflare dashboard. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Go to **Settings** > **Builds**.
4. Under **Git Repository**, select **Manage**.

This can be useful for managing repository access or troubleshooting installation issues by reinstalling. For more details on how to manage your installation, refer to the [GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/), [GitLab](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/), and [Cursor Origin](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/cursor-origin-integration/) guides.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/#page","headline":"Git integration","description":"Learn how to add and manage your Git integration for Workers Builds","url":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
