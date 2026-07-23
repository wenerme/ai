---
description: Deploy a Devin Outpost that runs each Devin session in an isolated Cloudflare container.
title: Run Devin Outposts on Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Devin Outposts on Cloudflare

Last updated Jul 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/tutorials/devin-outposts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Run [Devin agents ↗](https://docs.devin.ai/onboard-devin/outposts) on Cloudflare. Each Devin session runs in its own isolated sandbox backed by Cloudflare Containers.

## Prerequisites

You need:

* A Devin Enterprise organization with permission to manage outposts and service users
* A Cloudflare account with access to Workers, Containers, and R2
* For manual deployment, [Node.js 24 ↗](https://nodejs.org/) and a running [Docker ↗](https://www.docker.com/) daemon

### Get your Devin credentials

1. Open your Devin organization outpost settings. Replace both instances of `my-org` in this URL with your organization slug:
```txt
https://my-org.devinenterprise.com/org/my-org/settings/enterprise-environment?tab=outposts
```
2. Create or select an outpost. Copy its outpost ID for `DEVIN_OUTPOST_ID` and its token for `DEVIN_API_TOKEN`.

For more information about outposts, refer to the [Devin Outposts overview ↗](https://docs.devin.ai/onboard-devin/outposts).

## Deploy with one click

The fastest setup uses the **Deploy to Cloudflare** button. The deployment flow prompts for your Devin Outpost ID and API token. It also creates and configures the required containers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/sandbox-sdk/tree/main/devin)

Enter these credentials when prompted:

| Variable           | Value                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| DEVIN\_OUTPOST\_ID | Your Devin Outpost ID                                                  |
| DEVIN\_API\_TOKEN  | A Devin service-user token with the **Run outpost workers** permission |

After the deployment finishes, your outpost is ready to run Devin sessions on Cloudflare by selecting it from the Virtual environment menu.

## Customize and deploy manually

Use the following procedure when you need to add dependencies, tools, or environment variables to the template.

1. Create a project from the Devin Outpost template:
npmyarnpnpm
```
npm create cloudflare@latest -- cloudflare-devin-outpost --template=cloudflare/sandbox-sdk/devin
```
```
yarn create cloudflare cloudflare-devin-outpost --template=cloudflare/sandbox-sdk/devin
```
```
pnpm create cloudflare@latest cloudflare-devin-outpost --template=cloudflare/sandbox-sdk/devin
```
2. Go to the project directory and log in to your Cloudflare account:
```sh
cd cloudflare-devin-outpost
npx wrangler login
```
3. Create the R2 bucket for session checkpoints:
```sh
npx wrangler r2 bucket create devin-outpost-state
```
To use another bucket name, update `bucket_name` in `wrangler.jsonc`.
4. In `wrangler.jsonc`, replace the empty `DEVIN_OUTPOST_ID` value with your outpost ID.
The default `DEVIN_API_URL` is `https://api.devin.ai/opbeta`. Change this value only if your Devin environment uses another API URL.
5. Store your Devin API token as a Worker secret:
```sh
npx wrangler secret put DEVIN_API_TOKEN
```
Enter your service-user token when Wrangler prompts you. Do not add the token to `wrangler.jsonc`.
6. Deploy the worker and container:
```sh
npm run deploy
```
Wrangler builds the container and deploys the worker, container application, and cron trigger.
7. Verify the deployment with the worker URL from the Wrangler output:
```sh
curl https://<YOUR_WORKER>.workers.dev/
```
The worker returns:
```json
{
  "service": "devin-outpost",
  "status": "ok"
}
```

## Run a Devin session

In Devin, create a session and select your outpost from the **Virtual environment** menu. The worker polls Devin once per minute, so you may need to wait up to one minute for the session container to start.

## How the template works

The template manages the lifecycle of each Devin session:

* **Poll:** A cron trigger runs once per minute. The worker checks the current session statuses for your Devin Outpost.
* **Start:** Each pending or running session receives its own container. The container runs the official Devin worker command.
* **Suspend:** When a session suspends, the container archives `/root`, `/workspace`, and `/opt/devin-persistent` to R2\. The container restores the checkpoint when the session resumes.
* **Terminate:** When a session terminates, the worker removes its container and R2 checkpoint.

The worker coordinates the containers. Devin continues to manage session assignment and the session runtime.

Note

Checkpoints provide suspend-and-resume persistence, not continuous backups. An abrupt container failure can lose recent changes. Each compressed checkpoint must fit within the R2 5 GiB single-upload limit.

## Related resources

* [Devin Outposts overview ↗](https://docs.devin.ai/onboard-devin/outposts)
* [Devin Outpost deployment template ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/devin)
* [Cloudflare Containers](https://developers.cloudflare.com/containers/)
* [R2](https://developers.cloudflare.com/r2/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/devin-outposts/#page","headline":"Run Devin Outposts on Cloudflare · Cloudflare Sandbox SDK docs","description":"Deploy a Devin Outpost that runs each Devin session in an isolated Cloudflare container.","url":"https://developers.cloudflare.com/sandbox/tutorials/devin-outposts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
