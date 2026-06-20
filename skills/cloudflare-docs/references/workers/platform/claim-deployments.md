---
title: Claim deployments (temporary accounts)
description: Deploy Workers from AI agents with wrangler deploy --temporary, then claim the deployment and temporary preview account.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Claim deployments (temporary accounts)

![Diagram showing an AI agent deploying, verifying, and redeploying a Worker to a temporary account, then claiming it after authentication and moving it to a permanent account](https://developers.cloudflare.com/_astro/claim-deployments-flow.Co0tUHG4_g1dGj.webp) 

Use claim deployments when an AI agent needs to deploy a Worker without an existing Cloudflare account, and without needing to first log in and authorize the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/).

`wrangler deploy --temporary` creates or reuses a temporary preview account, deploys your Worker to a `workers.dev` URL, and prints a claim URL. Claim the temporary preview account within 60 minutes to keep the deployment and the Cloudflare resources created for it.

## Use cases

* AI-generated deployments
* Background agent sessions
* Prototyping new ideas quickly on a fresh Cloudflare account
* First-time Workers evaluations

For production and continuous integration and continuous deployment (CI/CD), use a permanent Cloudflare account with [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) or a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). Do not use `--temporary` when the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) is already authenticated.

## Get started

Use the following flow to let an AI agent discover and use temporary deploys. This flow requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 4.102.0 or later. The agent starts with the normal deploy command. If no Cloudflare credentials are available, the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) tells it to rerun with `--temporary`.

1. Install or update the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) to version 4.102.0 or later.  
For installation instructions, refer to [Install and update](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
2. Give your AI agent a deploy prompt.  
For example:  
```  
Make a very simple Hello World Cloudflare Worker in TypeScript and deploy it using the Wrangler CLI. Do not ask me questions.  
```
3. The agent will run the deploy.  
If the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) has no credentials, it prints output similar to the following:  
```  
To continue without logging in, rerun this command with `--temporary`.Wrangler will use a temporary account and print a claim URL.  
```  
This output lets the agent discover the `--temporary` flag without you explicitly telling it to use the flag.
4. The agent will rerun the deploy with `--temporary`:  
 npm  yarn  pnpm  
```  
npx wrangler deploy --temporary  
```  
```  
yarn wrangler deploy --temporary  
```  
```  
pnpm wrangler deploy --temporary  
```  
The CLI prints output similar to the following:  
```  
Continuing means you accept Cloudflare's Terms of Service (https://www.cloudflare.com/terms/) and Privacy Policy (https://www.cloudflare.com/privacypolicy/).  
Temporary account ready:  Account:        example-name (created)  Claim within:   60 minutes  Claim URL:      https://dash.cloudflare.com/claim-preview?claimToken=<TOKEN>  
Uploaded example-workerDeployed example-worker triggers  https://example-worker.example-name.workers.dev  
```
5. The agent can redeploy before you claim the temporary preview account.  
The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) caches the temporary preview account and reuses it while both the account and claim URL are valid. The output shows whether the account was created or reused. The CLI clears the cached temporary preview account when you run `wrangler login` or `wrangler logout`.  
You can keep deploying changes with `wrangler deploy --temporary` while the temporary preview account remains active. If you do not claim the temporary preview account within 60 minutes, Cloudflare deletes it and its deployments.

## Claim the deployment

To keep the deployment, open the claim URL within 60 minutes. Sign in to Cloudflare or create an account, then follow the dashboard prompts to claim the temporary preview account.

After you claim the temporary preview account, the Worker and Cloudflare resources created in that account remain available to you. To continue using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) with the claimed account, run [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login), then deploy without `--temporary`.

## Supported products and limits

Temporary preview accounts currently support the following Cloudflare products and limits only. Cloudflare will add support for more products over time.

| Supported product or resource                                                     | Temporary preview account limit                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [Workers](https://developers.cloudflare.com/workers/)                             | Deployments on workers.dev                                    |
| [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) | Up to 1,000 files, with each asset up to 5 MiB                |
| [Workers KV](https://developers.cloudflare.com/kv/)                               | Commands that use temporary credentials                       |
| [D1](https://developers.cloudflare.com/d1/)                                       | One database, with up to 100 MB per database and 100 MB total |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/)             | Commands that use temporary credentials                       |
| [Hyperdrive](https://developers.cloudflare.com/hyperdrive/)                       | Up to two database configurations and 10 connections          |
| [Queues](https://developers.cloudflare.com/queues/)                               | Up to 10 queues                                               |
| [SSL/TLS certificates](https://developers.cloudflare.com/ssl/)                    | Commands that use temporary credentials                       |

## Limits

* Temporary preview accounts expire after 60 minutes if they are not claimed.
* Before the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) creates a temporary preview account, Cloudflare requires a proof-of-work check. The CLI handles this automatically. It can add a short delay, but does not require extra input.
* Cloudflare limits how quickly you can create temporary preview accounts. If the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) cannot create an account because too many temporary preview accounts were requested too quickly, wait before retrying or authenticate the CLI with a permanent Cloudflare account.
* `--temporary` is only for unauthenticated use. If the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) can already use OAuth, `CLOUDFLARE_API_TOKEN`, or a global API key, `--temporary` returns an error.
* `--temporary` is not a global flag. It is available only on commands that can use the short-lived temporary preview account token.
* Claim URLs grant ownership of the temporary preview account. Treat them as sensitive.
* Cloudflare applies additional abuse prevention checks to temporary preview accounts.

## Related resources

[ wrangler deploy ](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) Review the full command reference for deploying Workers. 

[ Prompting ](https://developers.cloudflare.com/workers/get-started/prompting/) Build Workers apps with AI prompts and MCP servers. 

[ Deploy an existing project ](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) Learn how the Wrangler CLI automatically detects and configures projects for Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/platform/claim-deployments/#page","headline":"Claim deployments (temporary accounts) · Cloudflare Workers docs","description":"Deploy Workers from AI agents with wrangler deploy --temporary, then claim the deployment and temporary preview account.","url":"https://developers.cloudflare.com/workers/platform/claim-deployments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/platform/claim-deployments/","name":"Claim deployments (temporary accounts)"}}]}
```
