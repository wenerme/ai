---
description: Integrate Workers development into your existing GitLab Pipelines workflows.
title: GitLab CI/CD
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# GitLab CI/CD

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can deploy Workers with [GitLab CI/CD ↗](https://docs.gitlab.com/ee/ci/pipelines/index.html). Here is how you can set up your Gitlab CI/CD pipeline.

## 1\. Authentication

When running Wrangler locally, authentication to the Cloudflare API happens via the [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) command, which initiates an interactive authentication flow. Since CI/CD environments are non-interactive, Wrangler requires a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) and [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) to authenticate with the Cloudflare API.

### Cloudflare account ID

To find your Cloudflare account ID, refer to [Find account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

### API token

To create an API token to authenticate Wrangler in your CI job:

1. In the Cloudflare dashboard, go to the **Account API tokens** page.
[Go to **Account API tokens** ↗](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Select **Create Token**.
3. Under **Permission policies**, open the **Custom** dropdown and select **Edit Cloudflare Workers**.
4. Customize your token name.
5. Scope your token.

You will need to choose the account and zone resources that the generated API token will have access to. We recommend scoping these down as much as possible to limit the access of your token. For example, if you have access to three different Cloudflare accounts, you should restrict the generated API token to only the account on which you will be deploying a Worker.

## 2\. Set up CI

The method for running Wrangler in your CI/CD environment will depend on the specific setup for your project (whether you use GitHub Actions/Jenkins/GitLab or something else entirely).

To set up your CI:

1. Go to your CI platform and add the following as secrets:
* `CLOUDFLARE_ACCOUNT_ID`: Set to the [Cloudflare account ID](#cloudflare-account-id) for the account on which you want to deploy your Worker.
* `CLOUDFLARE_API_TOKEN`: Set to the [Cloudflare API token you generated](#api-token).

Caution

Don't store the value of `CLOUDFLARE_API_TOKEN` in your repository, as it gives access to deploy Workers on your account. Instead, you should utilize your CI/CD provider's support for storing secrets.

1. Create a workflow that will be responsible for deploying the Worker. This workflow should run `wrangler deploy`. Review an example [GitHub Actions ↗](https://docs.github.com/en/actions/using-workflows/about-workflows) workflow in the following section.

### GitLab Pipelines

Refer to [GitLab's blog ↗](https://about.gitlab.com/blog/2022/11/21/deploy-remix-with-gitlab-and-cloudflare/) for an example pipeline. Under the `script` key, replace `npm run deploy` with [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/#page","headline":"GitLab CI/CD · Cloudflare Workers docs","description":"Integrate Workers development into your existing GitLab Pipelines workflows.","url":"https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
