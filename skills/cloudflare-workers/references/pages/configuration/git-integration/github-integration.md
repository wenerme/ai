---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Connect a GitHub repository to Cloudflare Pages for automatic deployments, preview URLs, and check runs.
title: GitHub integration
image: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/og.png?v=d48f02f6b55ca500
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# GitHub integration

You can connect each Cloudflare Pages project to a GitHub repository, and Cloudflare will automatically deploy your code every time you push a change to a branch.

## Features

Beyond automatic deployments, the Cloudflare GitHub integration lets you monitor, manage, and preview deployments directly in GitHub, keeping you informed without leaving your workflow.

### Custom branches

Pages defaults to setting your [production environment](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#production-branch-control) to the branch you first push. If a branch other than the default branch (for example, `main`) represents your project's production branch, go to **Settings** > **Build** > **Branch control**, select the **Production branch** dropdown menu, and choose the desired branch.

You can also use [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) to preview versions of your project before merging your production branch and deploying to production. Pages allows you to configure which of your preview branches are automatically deployed using [branch build controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/). To configure this, go to **Settings** > **Build** > **Branch control** and select an option under **Preview branch**. Use [**Custom branches**](https://developers.cloudflare.com/pages/configuration/branch-build-controls/) to specify branches to include or exclude from automatic preview deployments.

### Preview URLs

Every time you open a new pull request on your GitHub repository, Cloudflare Pages will create a unique preview URL, which will stay updated as you continue to push new commits to the branch. Note that preview URLs will not be created for pull requests created from forks of your repository. Learn more in [Preview Deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

![GitHub Preview URLs](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1838,height=724,format=webp/_astro/ghpreviewurls.DuZwczMZ.png)

### Skipping a build via a commit message

Without any configuration required, you can choose to skip a deployment on an ad hoc basis. By adding the `[CI Skip]`, `[CI-Skip]`, `[Skip CI]`, `[Skip-CI]`, or `[CF-Pages-Skip]` flag as a prefix in your commit message, Pages will omit that deployment. The prefixes are not case sensitive.

### Check runs

If you have one or multiple projects connected to a repository (for example, a [monorepo](https://developers.cloudflare.com/pages/configuration/monorepos/)), you can check on the status of each build within GitHub via [GitHub check runs ↗︎](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks#checks).

You can view the checks by selecting the status icon next to a commit within your GitHub repository. In the following example, select the green check mark to view the results of the check run.

![GitHub status](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1804,height=122,format=webp/_astro/gh-status-check-runs.DkY_pO9C.png)

Check runs will appear like the following in your repository.

![GitHub check runs](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1020,height=316,format=webp/_astro/ghcheckrun.Cv3SMhfT.png)

If a build skips for any reason (for example, CI Skip, build watch paths, or branch deployment controls), the check run or commit status will not appear.

## Manage access

You can deploy projects to Cloudflare Pages from your company or side project on GitHub using the [Cloudflare Workers & Pages GitHub App ↗︎](https://github.com/apps/cloudflare-workers-and-pages).

### Install and authorize the app

To connect a repository, the Cloudflare Workers & Pages app must be installed on the GitHub account or organization that owns it, and you must authorize the app with your own GitHub user. These are separate steps, and they appear on separate tabs in your GitHub settings.

![Authorize: tells Cloudflare who you are, once per person, listed under Authorized GitHub Apps. Install: decides which repositories Cloudflare can access, listed under Installed GitHub Apps.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=392,format=webp/_astro/github-authorize-vs-install.DsQ5aSYE.png)

|  | Install the app | Authorize the app |
| --- | --- | --- |
| What it does | Gives Cloudflare access to repositories on a GitHub account or organization. | Tells Cloudflare who you are on GitHub, so you only see the accounts and repositories you can access. |
| Who does it | An owner of the GitHub account or organization, or a member with the [GitHub App manager role ↗︎](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#github-app-managers). | Each person who connects a repository from Cloudflare, once. |
| Choose repositories | Yes. Select **All repositories** or **Only select repositories**. | No. |
| Where to find it on GitHub | [Installed GitHub Apps ↗︎](https://github.com/settings/installations). For an organization, select **Switch settings context** first. | [Authorized GitHub Apps ↗︎](https://github.com/settings/apps/authorizations) |
| How to undo it | Select **Configure**, then **Uninstall**. | Select **Revoke**. |

Cloudflare asks you to authorize the app when needed. To install the app on another GitHub account or organization, select **Add GitHub account** when you connect a repository.

For more information, refer to [About using GitHub Apps ↗︎](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps) in the GitHub documentation.

### Repository access

When you connect a GitHub repository, you only see the GitHub accounts and repositories you can access on GitHub.

The first time you connect a repository, Cloudflare sends you to GitHub to authorize the Cloudflare Workers & Pages app. You need to do this once, even if someone else on your Cloudflare account already connected GitHub. If the app is not installed on any GitHub account you can access, you also install it on your own GitHub account or an organization.

The account list shows your own GitHub account and organizations where you can access at least one repository, if the app is installed on them. GitHub accounts that belong to other users are not listed, even if they have given you access to one of their repositories.

Authorizing the app is separate from [installing it](#install-and-authorize-the-app). If your own GitHub account or an organization is missing from the list, select **Add GitHub account** and install the app on it.

Existing repository connections keep building.

To switch GitHub users, revoke the app on the [Authorized GitHub Apps page ↗︎](https://github.com/settings/apps/authorizations) and connect again.

### Organizational access

You can deploy projects to Cloudflare Pages from your company or side project on both GitHub and GitLab.

When authorizing Cloudflare Pages to access a GitHub account, you can specify access to your individual account or an organization that you belong to on GitHub. In order to be able to add the Cloudflare Pages installation to that organization, your user account must be an owner or have the appropriate role within the organization (that is, the GitHub Apps Manager role). More information on these roles can be seen on [GitHub's documentation ↗︎](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#github-app-managers).

GitHub security consideration

A GitHub account should only point to one Cloudflare account. If you are setting up Cloudflare with GitHub for your organization, Cloudflare recommends that you limit the scope of the application to only the repositories you intend to build with Pages. To modify these permissions, go to the [Applications page ↗︎](https://github.com/settings/installations) on GitHub and select **Switch settings context** to access your GitHub organization settings. Then, select **Cloudflare Workers & Pages** > For **Repository access**, select **Only select repositories** > select your repositories.

### Remove access

You can remove Cloudflare Pages' access to your GitHub repository or account by going to the [Applications page ↗︎](https://github.com/settings/installations) on GitHub (if you are in an organization, select **Switch settings context** to access your GitHub organization settings). The GitHub App is named **Cloudflare Workers and Pages**, and it is shared between Workers and Pages projects.

#### Remove Cloudflare access to a GitHub repository

To remove access to an individual GitHub repository, go to **Repository access**. Select the **Only select repositories** option, and configure which repositories Cloudflare can access.

![GitHub Repository Access](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1900,height=810,format=webp/_astro/github-repository-access.DGHekBft.png)

#### Remove Cloudflare access to the entire GitHub account

To remove **Cloudflare Workers and Pages** access to your entire GitHub account, go to **Uninstall "Cloudflare Workers and Pages"**, then select **Uninstall**. Removing access to the **Cloudflare Workers and Pages** app revokes Cloudflare's access to *all repositories* from that GitHub account. If you only want to disable automatic builds and deployments, follow the [Disable automatic deployments](https://developers.cloudflare.com/pages/configuration/git-integration/#disable-automatic-deployments) instructions.

Removing access to GitHub disables new builds for Workers and Pages projects connected to those repositories, though your previous deployments continue to be hosted by Cloudflare.

### Reinstall the Cloudflare GitHub app

If you see errors where Cloudflare Pages cannot access your Git repository, uninstall and reinstall the **Cloudflare Workers and Pages** GitHub App.

1. Go to the installation settings page on GitHub:
   - Go to **Settings** > **Build** for the Pages project and select **Manage** under **Git Repository**.
   - Alternatively, open the GitHub installations page for an individual account ( `https://github.com/settings/installations`) or an organization ( `https://github.com/organizations/<YOUR_ORGANIZATION_NAME>/settings/installations`), find **Cloudflare Workers and Pages**, and select **Configure**.
2. In the **Cloudflare Workers and Pages** GitHub App settings page, go to **Uninstall "Cloudflare Workers and Pages"** and select **Uninstall**.
3. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
4. Select **Create application** (if prompted), select the link at the bottom of the page to continue to Cloudflare Pages (**Get started** or **Continue to Pages**), and select **Import an existing Git repository**.
5. Select **+ Add account**, choose the GitHub account you want to add, and select **Install & Authorize**.
6. You will be redirected to the create project page with your GitHub account or organization in the account list.
7. Trigger a new deployment with your previously affected project.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#page","headline":"GitHub integration","description":"Connect a GitHub repository to Cloudflare Pages for automatic deployments, preview URLs, and check runs.","url":"https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/og.png?v=d48f02f6b55ca500","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
