---
description: Learn how to connect a Worker to a Git repository, manage build settings and Previews, and monitor builds using the Workers Builds API.
title: Builds API reference
image: https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/og.png?v=953239305931e5fe
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Builds API reference

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows you how to use the [Workers Builds REST API](https://developers.cloudflare.com/api/resources/workers_builds/) to connect a Worker to a Git repository, manage build settings and [Previews](https://developers.cloudflare.com/workers/previews/), and monitor builds. The examples use `curl` commands that you can run directly in your terminal or adapt to your preferred programming language. Some examples pipe output through [`jq` ↗︎](https://jqlang.org/) to filter JSON responses.

## Before you start

### Create an API token

The Builds API requires a **user-scoped** API token. Account-scoped tokens are not supported and will return "Invalid token" errors.

Create your token at [dash.cloudflare.com/profile/api-tokens ↗︎](https://dash.cloudflare.com/profile/api-tokens) with the following permissions:

| Permission | Access level | Why you need it |
| --- | --- | --- |
| Workers Builds Configuration | Edit | Manage build settings and Previews, and work with builds |
| Workers Scripts | Read | Only needed to [get your Worker tag](#get-your-worker-tag) |

Note

This API token is different from a **build token**. A build token is used by the build system to deploy your Worker. You will need a build token UUID when you [connect a Worker to a repository](#connect-a-worker-to-a-repository).

### Get your Worker tag

The Builds API identifies Workers by their **tag**, an immutable ID assigned by Cloudflare, not by their name. In API requests and responses, this value appears as `script_tag`.

To find your Worker's tag, call the [Workers Scripts API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/list/):

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts" \
  --header "Authorization: Bearer <API_TOKEN>" \
  | jq '.result[] | {name: .id, tag: .tag}'
```

```json
{
	"name": "my-worker",
	"tag": "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d"
}
```

## Connect a Worker to a repository

One request connects your Worker to a repository and sets the build settings for your production branch and your Previews.

### Prerequisites

1. **Install the Cloudflare GitHub App.** In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com), go to **Workers & Pages**, select any Worker, and go to **Settings** > **Builds** > **Connect**. Select **GitHub** and authorize the app for your account or organization. You only need to do this once.
2. **Get your GitHub account and repository IDs:**

   ```bash
   curl -s "https://api.github.com/users/<GITHUB_USERNAME>" | jq '.id'
   curl -s "https://api.github.com/repos/<GITHUB_USERNAME>/<REPO_NAME>" | jq '.id'
   ```

3. **Get a build token UUID.** Select or create a build token in your Worker's **Settings** > **Builds** > **API token**, or list your build tokens with the [`GET /builds/tokens`](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/list/) endpoint:

   ```bash
   curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/tokens" \
     --header "Authorization: Bearer <API_TOKEN>" \
     | jq '.result[] | {build_token_uuid, build_token_name}'
   ```

### Create the build configuration

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "script_tag": "<WORKER_TAG>",
    "git_repository": {
      "provider_type": "github",
      "provider_account_id": "<GITHUB_USER_ID>",
      "provider_account_name": "<GITHUB_USERNAME>",
      "repo_id": "<GITHUB_REPO_ID>",
      "repo_name": "<REPO_NAME>",
      "branch": "main"
    },
    "production_settings": {
      "build_command": "npm run build",
      "deploy_command": "npx wrangler deploy",
      "build_token_uuid": "<BUILD_TOKEN_UUID>",
      "environment_variables": {
        "NODE_ENV": {"value": "production", "is_secret": false}
      }
    },
    "previews_enabled": true,
    "previews_base_config": {
      "build_command": "npm run build",
      "deploy_command": "npx wrangler preview",
      "build_token_uuid": "<BUILD_TOKEN_UUID>",
      "environment_variables": {
        "NODE_ENV": {"value": "development", "is_secret": false}
      }
    }
  }'
```

Pushes to `main` now deploy your Worker with `wrangler deploy`. Pushes to any other branch create or update a [Preview](https://developers.cloudflare.com/workers/previews/) with `wrangler preview`, without affecting your live deployment. To connect the Worker without Previews, set `previews_enabled` to `false`.

| Field | Description |
| --- | --- |
| `git_repository` | The repository to connect. `branch` is your [production branch](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/). |
| `production_settings` | Build settings for pushes to your production branch |
| `previews_enabled` | Whether pushes to other branches create or update Previews |
| `previews_base_config` | Build settings copied to each new Preview. `deploy_command` is your [Preview command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#preview-command). |

`production_settings` and `previews_base_config` accept the same fields:

| Field | Type | Description |
| --- | --- | --- |
| `build_command` | string | Command to build your project (for example, `npm run build`) |
| `deploy_command` | string | Command to deploy your Worker (for example, `npx wrangler deploy` or `npx wrangler preview`) |
| `build_token_uuid` | string | UUID of the build token used to deploy your Worker |
| `root_directory` | string | Path to your project, relative to the repository root. Defaults to `/`. |
| `path_includes` | array | File path patterns that start a build |
| `path_excludes` | array | File path patterns that do not start a build |
| `build_caching_enabled` | boolean | Whether builds reuse cached dependencies and build artifacts. Defaults to `true`. |
| `environment_variables` | object | Build-time variables. Set `is_secret` to `true` to mask a value in build logs. |

Note

`environment_variables` are only available during the build. For runtime variables, refer to [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/). For Preview runtime variables, secrets, and bindings, refer to [Preview settings](https://developers.cloudflare.com/workers/previews/configuration/).

## View and update build settings

### Get build settings

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}" \
  --header "Authorization: Bearer <API_TOKEN>"
```

The response has the same `git_repository`, `production_settings`, `previews_enabled`, and `previews_base_config` fields you set when [creating the build configuration](#create-the-build-configuration).

### Update build settings

Send only the fields you want to change. For example, to change the production build command and add a Preview build variable:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{
    "production_settings": {
      "build_command": "npm run build:prod"
    },
    "previews_base_config": {
      "environment_variables": {
        "API_URL": {"value": "https://staging.example.com", "is_secret": false},
        "OLD_VARIABLE": null
      }
    }
  }'
```

- To delete an environment variable, set it to `null`.
- To change your production branch, send `{"git_repository": {"branch": "<BRANCH_NAME>"}}`.
- To turn Previews on or off, send `{"previews_enabled": true}` or `{"previews_enabled": false}`.
- Changes to `previews_base_config` apply to Previews created afterward. To also update every existing Preview, add `?patch_existing_previews=true` to the URL.

Note

Workers connected to Builds before [Worker Previews](https://developers.cloudflare.com/workers/previews/) use legacy branch builds, and `previews_base_config` updates those settings. To use Previews, [switch to Worker Previews in the dashboard](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#existing-workers-connected-to-builds).

## Manage Previews

When Previews are enabled, the first push to a branch that is not your production branch creates a Preview for that branch. Each Preview gets its own copy of `previews_base_config`.

### List Previews

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/previews" \
  --header "Authorization: Bearer <API_TOKEN>" \
  | jq '.result[] | {preview_id, branch, auto_build, auto_delete}'
```

| Field | Description |
| --- | --- |
| `preview_id` | Identifier of the Preview |
| `branch` | Git branch the Preview tracks |
| `auto_build` | Whether pushes to the branch build this Preview. Manual builds and Deploy Hooks run regardless. |
| `auto_delete` | Whether deleting the Git branch also deletes this Preview |

To get a single Preview and its build settings, send a `GET` request to `/builds/workers/{worker_tag}/previews/{preview_id}`.

### Update a Preview

Send only the fields you want to change. For example, to stop pushes from building a Preview and change its build command:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/previews/{preview_id}" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{
    "auto_build": false,
    "settings": {
      "build_command": "npm run build:preview"
    }
  }'
```

### Build a Preview

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/previews/{preview_id}/builds" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"branch": "feature-branch"}'
```

To list a Preview's builds, send a `GET` request to the same URL.

## Work with builds

### Start a production build

To start a production build without pushing a commit, create a [Deploy Hook](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/) for your production branch and send a `POST` request to its URL.

### List builds

Use the [`GET /builds/workers/{worker_tag}/builds`](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/methods/list/) endpoint:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/builds" \
  --header "Authorization: Bearer <API_TOKEN>" \
  | jq '.result[] | {build_uuid, status, build_outcome, branch: .build_trigger_metadata.branch, created_on}'
```

Builds older than 90 days are not returned. Refer to [Limits & pricing](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/).

### Get build logs

Use the [`GET /builds/builds/{build_uuid}/logs`](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/subresources/logs/methods/get/) endpoint with a `build_uuid` from [List builds](#list-builds):

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/builds/{build_uuid}/logs" \
  --header "Authorization: Bearer <API_TOKEN>"
```

Build logs are retained for 90 days after the build finishes. To keep them longer, save the response.

### Cancel a build

Use the [`PUT /builds/builds/{build_uuid}/cancel`](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/methods/cancel/) endpoint:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/builds/{build_uuid}/cancel" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --request PUT
```

## Related resources

- [Workers Builds REST API reference](https://developers.cloudflare.com/api/resources/workers_builds/) - Complete endpoint documentation
- [Build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) - Build settings and options
- [Previews](https://developers.cloudflare.com/workers/previews/) - Branch-isolated previews of your Worker
- [Deploy Hooks](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/) - Start builds from external systems
- [Troubleshooting builds](https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/#builds-api-errors) - Common Builds API errors

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/#page","headline":"Builds API reference","description":"Learn how to connect a Worker to a Git repository, manage build settings and Previews, and monitor builds using the Workers Builds API.","url":"https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/og.png?v=953239305931e5fe","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
