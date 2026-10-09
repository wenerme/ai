---
description: Deploy Cursor self-hosted machines that run each assigned session in its own Linux sandbox on Containers.
title: Run Cursor Cloud Agents in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/cursor/og.png?v=d5367f1d93a4980d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Cursor Cloud Agents in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/cursor/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run Cursor Cloud Agents on Cloudflare through [self-hosted machines ↗︎](https://cursor.com/docs/cloud-agent/self-hosted). Each Cursor session assigned to the deployment runs in its own Linux sandbox: a [Container](https://developers.cloudflare.com/containers/) that one Durable Object starts for that session.

Cursor hosts the agent loop, inference, and planning. Cloudflare runs commands, file edits, repository operations, and other tools inside infrastructure that you control.

## Prerequisites

You need:

- A Cursor Enterprise plan with self-hosted machines turned on
- A Cursor team service-account API key with agent scope
- A Cloudflare Workers Paid account with access to Containers and R2
- [Node.js 20 ↗︎](https://nodejs.org/) or later
- A running [Docker ↗︎](https://www.docker.com/) daemon for deployment and local development

### Configure a Cursor team pool

To create a team pool, set `CURSOR_API_KEY` in your shell. Then, start a local worker with the Cursor Agent CLI:

```sh
CURSOR_API_KEY="$CURSOR_API_KEY" agent worker --pool cloudflare-test start
```

The command registers the pool and temporarily connects your local machine as a worker. After the pool appears in Cursor, stop the worker with `Ctrl+C` and run `unset CURSOR_API_KEY`. Record the pool name for `CURSOR_POOL`. Keep the local worker stopped while testing the Cloudflare deployment so it does not claim the agent request.

For more information, refer to [Cursor team pools ↗︎](https://cursor.com/docs/cloud-agent/self-hosted-guides/pool).

## Deploy the template

The template deploys a Worker, a Durable Object namespace, a container application, an R2 bucket binding, and a cron trigger.

1. Clone the template and install its dependencies:

   ```sh
   git clone https://github.com/anysphere/cloudflare-workers.git
   cd cloudflare-workers
   npm install
   ```

2. Log in to your Cloudflare account:

   ```sh
   npx wrangler login
   ```

3. Create the R2 bucket for optional repository snapshots:

   ```sh
   npx wrangler r2 bucket create cursor-pool-worker-snapshots
   ```

   To use another bucket name, update `bucket_name` in `wrangler.jsonc`.
4. Store the required Cursor service-account key as a Worker secret:

   ```sh
   npx wrangler secret put CURSOR_API_KEY
   ```

   Enter a team service-account key with agent scope. Personal API keys do not work with pool workers.
5. To access private repositories, store your Git credentials as Worker secrets:

   ```sh
   npx wrangler secret put GIT_USERNAME
   npx wrangler secret put GIT_TOKEN
   ```

   For GitHub, set `GIT_USERNAME` to `x-access-token`. Set `GIT_TOKEN` to a token with access to the repositories that the agents use.
6. In `wrangler.jsonc`, set `vars.CURSOR_POOL` to the Cursor team pool name:

   ```jsonc
   {
     "vars": {
       "CURSOR_POOL": "default"
     }
   }
   ```

7. Set `containers[].max_instances` to the maximum number of concurrent sessions that the deployment must support.
8. Deploy the Worker and container:

   ```sh
   npx wrangler deploy
   ```

   Wrangler builds the image and deploys the Worker, Durable Object, container application, and cron trigger.

   A new container image rollout stops running containers. Wait for active Cursor sessions to finish before you deploy an update.

## Run a repository-bound agent

Repository-bound agents route work by Git remote and by team pool name.

1. Go to [Cursor Cloud Agents ↗︎](https://cursor.com/agents).
2. Start an agent and select a repository.
3. Select **Self-hosted**, then select the name configured in `CURSOR_POOL`.
4. Wait for Cursor to assign the session to the deployment. The Worker then starts a container for the session. The initial scheduled controller run can take up to five minutes to begin.

The request provides the repository URL. The container restores or clones that repository into `$HOME/workspaces/repo-0`. It then starts the Cursor worker:

```sh
agent worker --worker-dir "$HOME/workspaces/repo-0" --pool "$CURSOR_POOL" start --verbose
```

The Cursor worker derives its repository label from the Git remote. Do not configure `repo=` labels manually.

## Run an any-repository agent

Any-repository agents route work by team pool name. They start with an empty working directory and no Git remote.

1. Go to [Cursor Cloud Agents ↗︎](https://cursor.com/agents).
2. Start an agent and select the **Any repo** group.
3. Select the team pool name configured in `CURSOR_POOL`.

The container creates `$HOME/workspaces/repo-0` without a Git remote. The agent or a project hook can clone a repository during the session.

## Configure repository snapshots

Repository snapshots are an optional cache for repository-bound agents. A snapshot stores the post-clone working tree in R2. An any-repository agent does not use this cache.

1. Store a secret that protects the snapshot routes:

   ```sh
   npx wrangler secret put SNAPSHOT_AUTH_TOKEN
   ```

2. In `wrangler.jsonc`, set `vars.WORKER_PUBLIC_URL` to the deployed Worker URL:

   ```jsonc
   {
     "vars": {
       "CURSOR_POOL": "default",
       "WORKER_PUBLIC_URL": "https://cursor-pool-workers.<ACCOUNT_SUBDOMAIN>.workers.dev"
     }
   }
   ```

3. Deploy the updated configuration:

   ```sh
   npx wrangler deploy
   ```

A cache miss performs a normal Git clone. It does not prevent the agent from starting.

## How the template works

The template manages one container for each assigned Cursor session.

your Cloudflare account

Cursor

claims sessions

Your Workerruns oncron trigger

sends each session

Durable Objectone persession

starts and stops

ContainerrunsCursor worker

runs the session

A cron trigger runs the Worker every five minutes. Each run lists the sessions that wait for `CURSOR_POOL`. The run then keeps the server-sent events stream from Cursor open until shortly before the next run, so the Worker also receives sessions that arrive between runs.

The Worker claims each session with a unique worker ID. Cursor then assigns the session only to that Worker. A Durable Object for the session starts one container with the session environment and repository information.

The container stops after five minutes without work, or after `WORKER_IDLE_RELEASE_TIMEOUT_SECONDS` if you set that variable. The Durable Object also stops the container after eight hours, or after `MAX_RUN_LIFETIME_SECONDS` if you set that variable.

The container connects out to Cursor, so it needs no inbound port or public IP address. The Worker exposes only its health route and the optional snapshot routes.

## Security

Each session runs in its own container and does not share files or processes with other sessions. The container receives the `CURSOR_API_KEY` service-account key. It also receives `GIT_USERNAME`, `GIT_TOKEN`, and `SNAPSHOT_AUTH_TOKEN` if you set them. Code that runs in a session can read these values. Give `GIT_TOKEN` access only to the repositories that the agents use.

For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/).

## Monitor the deployment

To stream controller and container logs, run:

```sh
npx wrangler tail
```

To list container instances, run:

```sh
npx wrangler containers list
```

To test one scheduled controller run during local development, start `wrangler` with scheduled-event testing:

```sh
npx wrangler dev --test-scheduled
```

In another terminal, invoke the scheduled route:

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*/5+*+*+*+*"
```

If you change the cron interval, update both `triggers.crons` in `wrangler.jsonc` and `CONTROLLER_RUN_BUDGET_MS` in `src/config.ts`.

## Troubleshooting

| Symptom | Cause | Resolution |
| --- | --- | --- |
| No sessions are assigned | The cron does not run, the key is missing, or the team pool name does not match | Run `npx wrangler tail`. Check controller runs, `401` responses, and the configured team pool name. |
| The controller returns `401` | The key is personal or lacks agent scope | Replace `CURSOR_API_KEY` with a team service-account key that has agent scope. |
| The team pool is absent for a repo | The worker started without repository labels | Select **Any repo**, or start a repository-bound agent with a configured Git remote. |
| The session is assigned but does not start | The container cannot start, clone the repository, or authenticate | Run `npx wrangler containers list` and inspect `npx wrangler tail`. Check capacity and Git secrets. |
| The container exits with `Error: Container exited with unexpected exit code: 1` and an earlier log reports `cursor-agent CLI not found on PATH` | Cloudflare WARP or another TLS-inspecting proxy may have prevented Docker from downloading the Cursor CLI. An unguarded shell pipeline can hide the installation failure and produce an incomplete image. | Run `npx wrangler tail` and inspect the preceding container logs. If the Cursor CLI is missing, disconnect WARP, clear the Docker build cache, and run `npx wrangler deploy` again. Or configure Docker to trust the root certificate of your organization. |
| The first repository start is slow | The snapshot cache is empty or not configured | Configure both `WORKER_PUBLIC_URL` and `SNAPSHOT_AUTH_TOKEN`, or allow a cold Git clone. |

## Related resources

- [Cursor Cloudflare Workers template ↗︎](https://github.com/anysphere/cloudflare-workers)
- [Cursor self-hosted machines overview ↗︎](https://cursor.com/docs/cloud-agent/self-hosted)
- [Cursor team pools ↗︎](https://cursor.com/docs/cloud-agent/self-hosted-guides/pool)
- [Cloudflare Containers](https://developers.cloudflare.com/containers/)
- [R2](https://developers.cloudflare.com/r2/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/coding-agents/cursor/#page","headline":"Run Cursor Cloud Agents in a sandbox","description":"Deploy Cursor self-hosted machines that run each assigned session in its own Linux sandbox on Containers.","url":"https://developers.cloudflare.com/sandbox/coding-agents/cursor/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/cursor/og.png?v=d5367f1d93a4980d","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
