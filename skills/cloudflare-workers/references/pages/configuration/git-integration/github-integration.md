---
description: Connect a GitHub repository to Cloudflare Pages for automatic deployments, preview URLs, and check runs.
title: GitHub integration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# GitHub integration

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can connect each Cloudflare Pages project to a GitHub repository, and Cloudflare will automatically deploy your code every time you push a change to a branch.

## Features

Beyond automatic deployments, the Cloudflare GitHub integration lets you monitor, manage, and preview deployments directly in GitHub, keeping you informed without leaving your workflow.

### Custom branches

Pages will default to setting your [production environment](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#production-branch-control) to the branch you first push. If a branch other than the default branch (e.g. `main`) represents your project's production branch, then go to **Settings** \> **Builds** \> **Branch control**, change the production branch by clicking the **Production branch** dropdown menu and choose any other branch.

You can also use [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) to preview versions of your project before merging your production branch, and deploying to production. Pages allows you to configure which of your preview branches are automatically deployed using [branch build controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/). To configure, go to **Settings** \> **Builds** \> **Branch control** and select an option under **Preview branch**. Use [**Custom branches**](https://developers.cloudflare.com/pages/configuration/branch-build-controls/) to specify branches you wish to include or exclude from automatic preview deployments.

### Preview URLs

Every time you open a new pull request on your GitHub repository, Cloudflare Pages will create a unique preview URL, which will stay updated as you continue to push new commits to the branch. Note that preview URLs will not be created for pull requests created from forks of your repository. Learn more in [Preview Deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

![GitHub Preview URLs](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1838,height=724,format=webp/_astro/ghpreviewurls.DuZwczMZ.png)

### Skipping a build via a commit message

Without any configuration required, you can choose to skip a deployment on an ad hoc basis. By adding the `[CI Skip]`, `[CI-Skip]`, `[Skip CI]`, `[Skip-CI]`, or `[CF-Pages-Skip]` flag as a prefix in your commit message, Pages will omit that deployment. The prefixes are not case sensitive.

### Check runs

If you have one or multiple projects connected to a repository (i.e. a [monorepo](https://developers.cloudflare.com/pages/configuration/monorepos/)), you can check on the status of each build within GitHub via [GitHub check runs ↗](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks#checks).

You can see the checks by selecting the status icon next to a commit within your GitHub repository. In the example below, you can select the green check mark to see the results of the check run.

![GitHub status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1804,height=122,format=webp/_astro/gh-status-check-runs.DkY_pO9C.png)

Check runs will appear like the following in your repository.

![GitHub check runs](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1020,height=316,format=webp/_astro/ghcheckrun.Cv3SMhfT.png)

If a build skips for any reason (i.e. CI Skip, build watch paths, or branch deployment controls), the check run/commit status will not appear.

## Manage access

You can deploy projects to Cloudflare Workers from your company or side project on GitHub using the [Cloudflare Workers & Pages GitHub App ↗](https://github.com/apps/cloudflare-workers-and-pages).

### Organizational access

You can deploy projects to Cloudflare Pages from your company or side project on both GitHub and GitLab.

When authorizing Cloudflare Pages to access a GitHub account, you can specify access to your individual account or an organization that you belong to on GitHub. In order to be able to add the Cloudflare Pages installation to that organization, your user account must be an owner or have the appropriate role within the organization (that is, the GitHub Apps Manager role). More information on these roles can be seen on [GitHub's documentation ↗](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#github-app-managers).

GitHub security consideration

A GitHub account should only point to one Cloudflare account. If you are setting up Cloudflare with GitHub for your organization, Cloudflare recommends that you limit the scope of the application to only the repositories you intend to build with Pages. To modify these permissions, go to the [Applications page ↗](https://github.com/settings/installations) on GitHub and select **Switch settings context** to access your GitHub organization settings. Then, select **Cloudflare Workers & Pages** \> For **Repository access**, select **Only select repositories** \> select your repositories.

### Remove access

You can remove Cloudflare Pages' access to your GitHub repository or account by going to the [Applications page ↗](https://github.com/settings/installations) on GitHub (if you are in an organization, select Switch settings context to access your GitHub organization settings). The GitHub App is named Cloudflare Workers and Pages, and it is shared between Workers and Pages projects.

#### Remove Cloudflare access to a GitHub repository

To remove access to an individual GitHub repository, you can navigate to **Repository access**. Select the **Only select repositories** option, and configure which repositories you would like Cloudflare to have access to.

![GitHub Repository Access](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1900,height=810,format=webp/_astro/github-repository-access.DGHekBft.png)

#### Remove Cloudflare access to the entire GitHub account

To remove Cloudflare Workers and Pages access to your entire Git account, you can navigate to **Uninstall "Cloudflare Workers and Pages"**, then select **Uninstall**. Removing access to the Cloudflare Workers and Pages app will revoke Cloudflare's access to _all repositories_ from that GitHub account. If you want to only disable automatic builds and deployments, follow the [Disable Build](https://developers.cloudflare.com/workers/ci-cd/builds/#disconnecting-builds) instructions.

Note that removing access to GitHub will disable new builds for Workers and Pages project that were connected to those repositories, though your previous deployments will continue to be hosted by Cloudflare Workers.

### Reinstall the Cloudflare GitHub app

If you see errors where Cloudflare Pages cannot access your git repository, you should attempt to uninstall and reinstall the GitHub application associated with the Cloudflare Pages installation.

1. Go to the installation settings page on GitHub:
  * Navigate to **Settings > Builds** for the Pages project and select **Manage** under Git Repository.
  * Alternatively, visit these links to find the Cloudflare Workers and Pages installation and select **Configure**:

| **Individual**   | https://github.com/settings/installations                                          |
| ---------------- | ---------------------------------------------------------------------------------- |
| **Organization** | https://github.com/organizations/<YOUR\_ORGANIZATION\_NAME>/settings/installations |

1. In the Cloudflare Workers and Pages GitHub App settings page, navigate to **Uninstall "Cloudflare Workers and Pages"** and select **Uninstall**.
2. Go back to the [**Workers & Pages** overview ↗](https://dash.cloudflare.com) page. Select **Create application** \> **Pages** \> **Connect to Git**.
3. Select the **\+ Add account** button, select the GitHub account you want to add, and then select **Install & Authorize**.
4. You should be redirected to the create project page with your GitHub account or organization in the account list.
5. Attempt to make a new deployment with your project which was previously broken.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#page","headline":"GitHub integration · Cloudflare Pages docs","description":"Connect a GitHub repository to Cloudflare Pages for automatic deployments, preview URLs, and check runs.","url":"https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
