---
description: Learn how to troubleshoot common and known issues in Workers Builds.
title: Troubleshooting builds
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting builds

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide explains how to identify and resolve build errors, as well as troubleshoot common issues in the Workers Builds deployment process.

To view your build history, go to your Worker project in the Cloudflare dashboard, select **Deployment**, select **View Build History** at the bottom of the page, and select the build you want to view. To retry a build, select the ellipses next to the build and select **Retry build**. Alternatively, you can select **Retry build** on the Build Details page.

## Known issues or limitations

Here are some common build errors that may surface in the build logs or general issues and how you can resolve them.

### Workers name requirement

`✘ [ERROR] The name in your Wrangler configuration file (<Worker name>) must match the name of your Worker. Please update the name field in your Wrangler configuration file.`

When connecting a Git repository to your Workers project, the specified name for the Worker on the Cloudflare dashboard must match the `name` argument in the Wrangler configuration file located in the specified root directory. If it does not match, update the name field in your Wrangler configuration file to match the name of the Worker on the dashboard.

The build system uses the `name` argument in the Wrangler configuration file to determine which Worker to deploy to Cloudflare's global network. This requirement ensures consistency between the Worker's name on the dashboard and the deployed Worker.

Note

This does not apply to [Wrangler Environments](https://developers.cloudflare.com/workers/wrangler/environments/) if the Worker name before the `-<env_name>` suffix matches the name in the Wrangler configuration file.

For example, a Worker named `my-worker-staging` on the dashboard can be deployed from a repository that contains a Wrangler configuration file with the arguments `name = my-worker` and `[env.staging]` using the deploy command `npx wrangler deploy --env staging`. On Wrangler v3 and up, Workers Builds automatically matches the name of the connected Worker by overriding it with the `WRANGLER_CI_OVERRIDE_NAME` environment variable.

### Missing Wrangler configuration file

`✘ [ERROR] Missing entry-point: The entry-point should be specified via the command line (e.g. wrangler deploy path/to/script) or the main config field.`

If you see this error, a Wrangler configuration file is likely missing from the root directory. Navigate to **Settings** \> **Build** \> **Build Configuration** to update the root directory, or add a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to the specified directory.

### Incorrect account\_id

`Could not route to /client/v4/accounts/<Account ID>/workers/services/<Worker name>, perhaps your object identifier is invalid? [code: 7003]`

If you see this error, the Wrangler configuration file likely has an `account_id` for a different account. Remove the `account_id` argument or update it with your account's `account_id`, available in **Workers & Pages Overview** under **Account Details**.

### Stale API token

` Failed: The build token selected for this build has been deleted or rolled and cannot be used for this build. Please update your build token in the Worker Builds settings and retry the build.`

The API Token dropdown in Build Configuration settings may show stale tokens that were edited, deleted, or rolled. If you encounter an error due to a stale token, create a new API Token and select it for the build.

### Build timed out

`Build was timed out`

There is a maximum build duration of 20 minutes. If a build exceeds this time, then the build will be terminated and the above error log is shown. For more details, see [Workers Builds limits](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/).

### Git integration issues

If you are running into errors associated with your Git integration, you can try removing access to your [GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#removing-access) or [GitLab](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/#removing-access) integration from Cloudflare, then reinstalling the [GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#reinstall-a-git-integration) or [GitLab](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/#reinstall-a-git-integration) integration.

## For additional support

If you discover additional issues or would like to provide feedback, reach out to us in the [Cloudflare Developers Discord ↗](https://discord.com/channels/595317990191398933/1052656806058528849).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/#page","headline":"Troubleshooting builds · Cloudflare Workers docs","description":"Learn how to troubleshoot common and known issues in Workers Builds.","url":"https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
