---
description: Learn how to manage your GitLab integration for Workers Builds
title: GitLab integration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# GitLab integration

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare supports connecting your GitLab repository to your Cloudflare Worker, and will automatically deploy your code every time you push a change.

## Features

Beyond automatic builds and deployments, the Cloudflare GitLab integration lets you monitor builds directly in GitLab, keeping you informed without leaving your workflow.

### Merge request comment

If a commit is on a merge request, Cloudflare will automatically post a comment on the merge request with the status of the build.

![GitLab merge request comment](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1890,height=586,format=webp/_astro/gitlab-pull-request-comment.CQVsQ21r.png)

A [preview URL](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) will be provided for any builds which perform `wrangler versions upload`. This is particularly useful when reviewing your pull request, as it allows you to compare the code changes alongside an updated version of your Worker.

Note

Preview URLs are not generated for Workers that implement a [Durable Object](https://developers.cloudflare.com/durable-objects/), including [Containers](https://developers.cloudflare.com/containers/) and [Sandbox](https://developers.cloudflare.com/sandbox/) Workers. Refer to [Preview URL limitations](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/#limitations).

Enabling GitLab Merge Request events for existing connections

New GitLab connections are automatically configured to receive merge request events, which enable commenting functionality. For existing connections, you'll need to manually enable `Merge request events` in the Webhooks tab of your project's settings. You can follow GitLab's documentation for guidance on [managing webhooks ↗](https://docs.gitlab.com/user/project/integrations/webhooks/#manage-webhooks).

### Commit Status

If you have one or multiple Workers connected to a repository (i.e. a [monorepo](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#monorepos)), you can check on the status of each build within GitLab via [GitLab commit status ↗](https://docs.gitlab.com/ee/user/project/merge%5Frequests/status%5Fchecks.html).

You can see the statuses by selecting the status icon next to a commit or by going to **Build** \> **Pipelines** within your GitLab repository. In the example below, you can select on the green check mark to see the results of the check run.

![GitLab Status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2510,height=152,format=webp/_astro/gl-status-checks.B9jgSbf7.png)

Check runs will appear like the following in your repository. You can select one of the statuses to view the build on the Cloudflare Dashboard.

![GitLab Commit Status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=610,height=270,format=webp/_astro/gl-commit-status.BghMWpYX.png)

Note that when using [build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/), only projects that trigger a build will generate a commit status.

## Manage access

You can deploy projects to Cloudflare Workers from your company or side project on GitLab using the Cloudflare Pages app.

### Organizational access

When you authorize Cloudflare Workers to access your GitLab account, you automatically give Cloudflare Workers access to organizations, groups, and namespaces accessed by your GitLab account. Managing access to these organizations and groups is handled by GitLab.

### Remove access

You can remove Cloudflare Workers' access to your GitLab account by navigating to [Authorized Applications page ↗](https://gitlab.com/-/profile/applications) on GitLab. Find the applications called Cloudflare Pages and select the **Revoke** button to revoke access.

Note that the GitLab application Cloudflare Workers is shared between Workers and Pages projects, and removing access to GitLab will disable new builds for Workers and Pages, though your previous deployments will continue to be hosted by Cloudflare Workers.

### Reinstall the Cloudflare GitLab App

1. Go to your application settings page on GitLab: [https://gitlab.com/-/profile/applications ↗](https://gitlab.com/-/profile/applications)
2. Click the "Revoke" button on your Cloudflare Workers installation if it exists.
3. Go back to the [**Workers & Pages** overview ↗](https://dash.cloudflare.com) page. Select **Create application** \> **Pages** \> **Connect to Git**.
4. Select the **\+ Add account** button, select the GitLab account you want to add, and then select **Install & Authorize**.
5. You should be redirected to the create project page with your GitLab account or organization in the account list.
6. Attempt to make a new deployment with your project which was previously broken.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/#page","headline":"GitLab integration · Cloudflare Workers docs","description":"Learn how to manage your GitLab integration for Workers Builds","url":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
