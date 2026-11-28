---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Resolve common Cloudflare Pages git integration errors related to deployments and installations.
title: Troubleshooting builds
image: https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/og.png?v=d0185cd778114abf
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting builds

If your Git integration is experiencing issues, you may find the following banners on the **Deployments** page of your Pages project.

## Project creation

### `This repository is being used for a Cloudflare Pages project on a different Cloudflare account.`

Using the same GitHub or GitLab repository across separate Cloudflare accounts is disallowed. To use the repository for a Pages project in that Cloudflare account, delete any Pages projects using the repository in other Cloudflare accounts.

### Organization repository selection does not advance on GitHub

If your GitHub organization already has the **Cloudflare Workers and Pages** app installed but the repository selection step does not load or advance:

1. In GitHub, open your organization settings and go to **Third-party Access** > **GitHub Apps**.
2. Find **Cloudflare Workers and Pages** and select **Configure**.
3. Update the **Repository access** list (for example, add or confirm the target repository) and select **Save** to refresh repository permissions.
4. Return to Cloudflare and reconnect the repository.

## Deployments

If you run into issues related to deployments failing, check your project dashboard for source control management (SCM) installation warnings.

![Git installation warning banner on the Deployments page of a Cloudflare Pages project](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1504,height=168,format=webp/_astro/git.dashboard-error.z5oiIEkZ.png)

To resolve errors displayed in the Cloudflare Pages dashboard, follow the steps for the matching message.

### `This project is disconnected from your Git account, this may cause deployments to fail.`

To resolve this issue, reinstall the Git integration for [GitHub](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#reinstall-the-cloudflare-github-app) or [GitLab](https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/#reinstall-the-cloudflare-gitlab-app). If the issue persists after uninstalling and reinstalling, [contact support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

### `Cloudflare Pages is not properly installed on your Git account, this may cause deployments to fail.`

To resolve this issue, reinstall the Git integration for [GitHub](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#reinstall-the-cloudflare-github-app) or [GitLab](https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/#reinstall-the-cloudflare-gitlab-app). If the issue persists after uninstalling and reinstalling, [contact support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

### `The Cloudflare Pages installation has been suspended, this may cause deployments to fail.`

Go to your GitHub installation settings:

- [Individual accounts ↗︎](https://github.com/settings/installations)
- Organization accounts: `https://github.com/organizations/<YOUR_ORGANIZATION_NAME>/settings/installations`

Select **Configure** on the **Cloudflare Workers and Pages** application. Scroll to the bottom of the page and select **Unsuspend** to allow Cloudflare Pages to make future deployments.

### `The project is linked to a repository that no longer exists, this may cause deployments to fail.`

You may have deleted or transferred the repository associated with this Cloudflare Pages project. For a deleted repository, create a new Cloudflare Pages project with a repository that has not been deleted. For a transferred repository, either transfer the repository back to the original Git account or create a new Cloudflare Pages project with the transferred repository.

### `The repository cannot be accessed, this may cause deployments to fail.`

You may have excluded this repository from your installation's repository access settings. Go to your GitHub installation settings:

- [Individual accounts ↗︎](https://github.com/settings/installations)
- Organization accounts: `https://github.com/organizations/<YOUR_ORGANIZATION_NAME>/settings/installations`

Select **Configure** on the **Cloudflare Workers and Pages** application. Under **Repository access**, ensure that the repository associated with your Cloudflare Pages project is included in the list.

### `There is an internal issue with your Cloudflare Pages Git installation.`

This is an internal error in the Cloudflare Pages SCM system. Reinstall the Git integration for [GitHub](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#reinstall-the-cloudflare-github-app) or [GitLab](https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/#reinstall-the-cloudflare-gitlab-app). If the issue persists, [contact support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

### `GitHub/GitLab is having an incident and push events to Cloudflare are operating in a degraded state. Check their status page for more details.`

This indicates that GitHub or GitLab may be experiencing an incident affecting push events to Cloudflare. Monitor their status pages ([GitHub ↗︎](https://www.githubstatus.com/), [GitLab ↗︎](https://status.gitlab.com/)) for updates and try deploying again later.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/#page","headline":"Troubleshooting builds","description":"Resolve common Cloudflare Pages git integration errors related to deployments and installations.","url":"https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/og.png?v=d0185cd778114abf","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
