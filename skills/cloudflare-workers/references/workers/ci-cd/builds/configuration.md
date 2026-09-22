---
description: Understand the different settings associated with your build.
title: Configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When connecting your Git repository to your Worker, you can customize the configurations needed to build and deploy your Worker.

## How Workers Builds works

When a commit is pushed to your connected repository, Workers Builds runs a two-step process:

1. **Build command** *(optional)* - Compiles your project (for example, `npm run build` for frameworks like Next.js or Astro)
2. **Deploy command** - Deploys your Worker to Cloudflare (defaults to `npx wrangler deploy`)

For preview builds, a **Preview command** runs instead (defaults to `npx wrangler preview`), which creates or updates a [Preview](https://developers.cloudflare.com/workers/previews/) without promoting it to production.

Workers that use Containers

`wrangler deploy` can build and publish container images and roll out container instances. `wrangler versions upload` does not update container images. Version URLs are not generated for Workers that implement Durable Objects, including Containers. Refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/#before-production).

## Build settings

Build settings can be found by navigating to **Settings** > **Build** within your Worker.

Note that when you update and save build settings, the updated settings will be applied to your *next* build. When you *retry* a build, the build configurations that exist when the build is retried will be applied.

### Overview

| Setting | Description |
| --- | --- |
| **Git account** | Select the Git account you would like to use. After the initial connection, you can continue to use this Git account for future projects. |
| **Git repository** | Choose the Git repository you would like to connect your Worker to. |
| **Git branch** | Select the branch you would like Cloudflare to listen to for new commits. This will be defaulted to `main`. |
| **Build command** *(Optional)* | Set a build command if your project requires a build step (e.g. `npm run build`). This is necessary, for example, when using a [front-end framework](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#framework-support) such as Next.js or Remix. |
| **[Deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command)** | The deploy command lets you set the [specific Wrangler command](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) used to deploy your Worker. Your deploy command will default to `npx wrangler deploy` but you may customize this command. Workers Builds will use the Wrangler version set in your `package.json`. |
| **[Preview command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#preview-command)** | Set the command to run for [preview builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#configure-preview-builds). Defaults to `npx wrangler preview`. Workers Builds will use the Wrangler version set in your `package.json`. |
| **Root directory** *(Optional)* | Specify the path to your project. The root directory defines where the build command will be run and can be helpful in [monorepos](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#monorepos) to isolate a specific project within the repository for builds. |
| **[API token](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#api-token)** *(Optional)* | The API token is used to authenticate your build request and authorize the upload and deployment of your Worker to Cloudflare. By default, Cloudflare will automatically generate an API token for your account when using Workers Builds, and continue to use this API token for all subsequent builds. Alternatively, you can [create your own API token](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/authentication/#generate-tokens), or select one that you already own. |
| **Build variables and secrets** *(Optional)* | Add environment variables and secrets accessible only to your build. Build variables will not be accessible at runtime. If you would like to configure runtime variables you can do so in **Settings** > **Variables & Secrets** |

Note

Currently, Workers Builds does not honor the configurations set in [Custom Builds](https://developers.cloudflare.com/workers/wrangler/custom-builds/) within your Wrangler configuration file.

### Deploy command

You can run your deploy command using the package manager of your choice.

If you have added a Wrangler deploy command as a script in your `package.json`, then you can run it by setting it as your deploy command. For example, `npm run deploy`.

Examples of other deploy commands you can set include:

| Example Command | Description |
| --- | --- |
| `npx wrangler deploy --assets ./public/` | Deploy your Worker along with static assets from the specified directory. Alternatively, you can use the [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/). |
| `npx wrangler deploy --env staging` | If you have a [Wrangler environment](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments) Worker, you should set your deploy command with the environment flag. For more details, see [Advanced Setups](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments). |
| `npx wrangler deploy --containers-rollout=immediate` | [Containers](https://developers.cloudflare.com/containers/) rollout mode for this deploy. Refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/). |
| `npx wrangler deploy --containers-rollout=none` | Deploy the Worker only. Skip container image build/push and instance rollout. |

### Preview command

The Preview command runs when you have enabled [preview builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#configure-preview-builds). Preview builds run for branches that are not your production branch.

It defaults to `npx wrangler preview`, which creates or updates a [Preview](https://developers.cloudflare.com/workers/previews/) and produces a Preview URL. Like the build and deploy commands, it can be customized.

If you change this command to `npx wrangler versions upload`, the build creates a Worker version and [Version URL](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/) instead of a Preview. Version URLs use the resources configured for that Worker version and do not create branch-isolated resources.

Examples of other Preview commands you can set include:

| Example Command | Description |
| --- | --- |
| `yarn exec wrangler preview` | You can customize the package manager used to run Wrangler. |
| `npx wrangler preview --env staging` | If you have a [Wrangler environment](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments) Worker, you should set your Preview command with the environment flag. For more details, see [Advanced Setups](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#wrangler-environments). |

To configure what variables, secrets, and bindings your Preview uses, refer to [Preview settings](https://developers.cloudflare.com/workers/previews/configuration/).

### Automatic configuration for new projects

If your repository does not have a Wrangler configuration file, the deploy command (`wrangler deploy`) will trigger [automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/). This detects your framework, creates the necessary configuration, and opens a [pull request](https://developers.cloudflare.com/workers/ci-cd/builds/automatic-prs/) for you to review. Once you merge the PR, your project is configured and future builds will deploy normally.

For new Workers Builds projects, preview builds use `wrangler preview` by default and can use [Preview settings](https://developers.cloudflare.com/workers/previews/configuration/) for preview-specific bindings, variables, secrets, and resources.

### API token

The API token in Workers Builds defines the access granted to Workers Builds for interacting with your account's resources. Currently, only user tokens are supported, with account-owned token support coming soon.

When you select **Create new token**, a new API token will be created automatically with the following permissions:

- **Account:** Account Settings (read), Workers Scripts (edit), Workers KV Storage (edit), Workers R2 Storage (edit)
- **Zone:** Workers Routes (edit) for all zones on the account
- **User:** User Details (read), Memberships (read)

You can configure the permissions of this API token by navigating to **My Profile** > **API Tokens** for user tokens.

It is recommended to consistently use the same API token across all uploads and deployments of your Worker to maintain consistent access permissions.

## Framework support

[Static assets](https://developers.cloudflare.com/workers/static-assets/) and [frameworks](https://developers.cloudflare.com/workers/framework-guides/) are now supported in Cloudflare Workers. Learn to set up Workers projects and the commands for each framework in the framework guides:

- [Deploy an existing project](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/)
- [Web applications](https://developers.cloudflare.com/workers/framework-guides/web-apps/)
  - [React + Vite](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/)
  - [Astro](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
  - [React Router (formerly Remix)](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
  - [Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
  - [OpenNext adapter](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/)
  - [Vue](https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/)
  - [RedwoodSDK](https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/)
  - [TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
  - [Microfrontends](https://developers.cloudflare.com/workers/framework-guides/web-apps/microfrontends/)
  - [SvelteKit](https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/)
  - [Vike](https://developers.cloudflare.com/workers/framework-guides/web-apps/vike/)
  - [More guides...](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/)
    - [Analog](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/)
    - [Angular](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/angular/)
    - [Docusaurus](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/docusaurus/)
    - [Gatsby](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/gatsby/)
    - [Hono](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/hono/)
    - [Nuxt](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/)
    - [Qwik](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/qwik/)
    - [Solid](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/solid/)
    - [Waku](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/waku/)
- [Mobile applications](https://developers.cloudflare.com/workers/framework-guides/mobile-apps/)
  - [Expo](https://docs.expo.dev/eas/hosting/reference/worker-runtime/)
- [APIs](https://developers.cloudflare.com/workers/framework-guides/apis/)
  - [FastAPI](https://developers.cloudflare.com/workers/languages/python/packages/fastapi/)
  - [Flask](https://developers.cloudflare.com/workers/languages/python/packages/flask/)
  - [Hono](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/hono/)
- [AI & agents](https://developers.cloudflare.com/workers/framework-guides/ai-and-agents/)
  - [Agents SDK](https://developers.cloudflare.com/agents/)
  - [LangChain](https://developers.cloudflare.com/workers/languages/python/packages/langchain/)

## Environment variables

You can provide custom environment variables to your build.

To add environment variables via the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.

[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)

2. In **Overview**, select your Worker.
3. Select **Settings** > **Environment variables**.

To add env variables using Wrangler, define text and JSON via the `[vars]` configuration in your Wrangler file.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker-dev",
	"vars": {
		"API_HOST": "example.com",
		"API_ACCOUNT_ID": "example_user",
		"SERVICE_X_DATA": {
			"URL": "service-x-api.dev.example",
			"MY_ID": 123
		}
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker-dev"

[vars]
API_HOST = "example.com"
API_ACCOUNT_ID = "example_user"

  [vars.SERVICE_X_DATA]
  URL = "service-x-api.dev.example"
  MY_ID = 123
```

### Default variables

The following system environment variables are injected by default (but can be overridden):

| Environment Variable | Injected value | Example use-case |
| --- | --- | --- |
| `CI` | `true` | Changing build behaviour when run on CI versus locally |
| `WORKERS_CI` | `1` | Changing build behaviour when run on Workers Builds versus locally |
| `WORKERS_CI_BUILD_UUID` | `<build-uuid-of-current-build>` | Passing the Build UUID along to custom workflows |
| `WORKERS_CI_COMMIT_SHA` | `<sha1-hash-of-current-commit>` | Passing current commit ID to error reporting, for example, Sentry |
| `WORKERS_CI_BRANCH` | `<branch-name-from-push-event` | Customizing build based on branch, for example, disabling debug logging on `production` |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#page","headline":"Configuration","description":"Understand the different settings associated with your build.","url":"https://developers.cloudflare.com/workers/ci-cd/builds/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
