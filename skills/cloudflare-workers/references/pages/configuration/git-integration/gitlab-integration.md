---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Connect a GitLab repository to Cloudflare Pages for automatic deployments and commit status checks.
title: GitLab integration
image: https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/og.png?v=5281d3813d2b1246
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# GitLab integration

You can connect each Cloudflare Pages project to a GitLab repository, and Cloudflare will automatically deploy your code every time you push a change to a branch.

## Features

Beyond automatic deployments, the Cloudflare GitLab integration lets you monitor, manage, and preview deployments directly in GitLab, keeping you informed without leaving your workflow.

### Custom branches

Pages defaults to setting your [production environment](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#production-branch-control) to the branch you first push. If a branch other than the default branch (for example, `main`) represents your project's production branch, go to **Settings** > **Build** > **Branch control**, select the **Production branch** dropdown menu, and choose the desired branch.

You can also use [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) to preview versions of your project before merging your production branch and deploying to production. Pages allows you to configure which of your preview branches are automatically deployed using [branch build controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/). To configure this, go to **Settings** > **Build** > **Branch control** and select an option under **Preview branch**. Use [**Custom branches**](https://developers.cloudflare.com/pages/configuration/branch-build-controls/) to specify branches to include or exclude from automatic preview deployments.

### Skipping a specific build via a commit message

Without any configuration required, you can choose to skip a deployment on an ad hoc basis. By adding the `[CI Skip]`, `[CI-Skip]`, `[Skip CI]`, `[Skip-CI]`, or `[CF-Pages-Skip]` flag as a prefix in your commit message, Pages will omit that deployment. The prefixes are not case sensitive.

### Check runs and preview URLs

If you have one or multiple projects connected to a repository (for example, a [monorepo](https://developers.cloudflare.com/pages/configuration/monorepos/)), you can check on the status of each build within GitLab via [GitLab commit status ↗︎](https://docs.gitlab.com/user/project/merge_requests/status_checks/).

You can view the statuses by selecting the status icon next to a commit or by going to **Build** > **Pipelines** within your GitLab repository. In the following example, select the green check mark to view the results of the check run.

![GitLab Status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2510,height=152,format=webp/_astro/gl-status-checks.B9jgSbf7.png)

Check runs will appear like the following in your repository. You can select one of the statuses to view the [preview URL](https://developers.cloudflare.com/pages/configuration/preview-deployments/) for that deployment.

![GitLab Commit Status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=584,height=176,format=webp/_astro/glcommitstatus.BXV17OMM.png)

If a build skips for any reason (for example, CI Skip, build watch paths, or branch deployment controls), the check run or commit status will not appear.

## Manage access

You can deploy projects to Cloudflare Pages from your personal account or group on GitLab using the Cloudflare GitLab integration.

### Organizational access

You can deploy projects to Cloudflare Pages from your personal account or organization on both GitHub and GitLab.

When you authorize Cloudflare Pages to access your GitLab account, you automatically give Cloudflare Pages access to organizations, groups, and namespaces accessed by your GitLab account. Managing access to these organizations and groups is handled by GitLab.

### Remove access

You can remove Cloudflare Pages' access to your GitLab account by going to the [Authorized Applications page ↗︎](https://gitlab.com/-/profile/applications) on GitLab. Find the application called **Cloudflare Pages** (or **Cloudflare Workers**) and select **Revoke**.

The GitLab application is shared between Workers and Pages projects. Removing access to GitLab disables new builds for both Workers and Pages, though your previous deployments continue to be hosted by Cloudflare.

### Reinstall the Cloudflare GitLab app

When encountering Git integration issues, uninstall and reinstall the GitLab application associated with your Cloudflare account.

1. Go to the [Authorized Applications page ↗︎](https://gitlab.com/-/profile/applications) on GitLab.
2. Select **Revoke** on your **Cloudflare Pages** (or **Cloudflare Workers**) installation if it exists.
3. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
4. Select **Create application** (if prompted), select the link at the bottom of the page to continue to Cloudflare Pages (**Get started** or **Continue to Pages**), and select **Import an existing Git repository**.
5. Select the **GitLab** tab, select **+ Add account**, choose the GitLab account you want to add, and select **Authorize** on the confirmation prompt.
6. You will be redirected to the create project page with your GitLab account or organization in the account list.
7. Trigger a new deployment with your previously affected project.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/#page","headline":"GitLab integration","description":"Connect a GitLab repository to Cloudflare Pages for automatic deployments and commit status checks.","url":"https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/og.png?v=5281d3813d2b1246","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
