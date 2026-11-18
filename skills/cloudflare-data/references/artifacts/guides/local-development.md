---
description: Use the local Artifacts binding with Wrangler, Vite, or Workers Vitest without accessing your deployed repositories.
title: Local development
image: https://developers.cloudflare.com/artifacts/guides/local-development/og.png?v=2387a9a4a53aca77
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Local development

The local Artifacts simulator lets you develop against a Git-compatible repository on your machine. Local repositories and tokens are separate from deployed Artifacts resources. Creating, pushing to, or deleting a local repo does not change a deployed repo.

## Requirements

- Git 2.32 or later on the `PATH` of the process that starts your dev server or tests.
- Wrangler 4.163.0 or later, Cloudflare Vite plugin 2.0.0-rc.0 or later, or `@cloudflare/vitest-plugin` 1.8.3 or later.
- To declare events in `cloudflare.config.ts`, `cf` 1.0.0-rc.0 or later.

## Choose a binding mode

The `artifacts` binding uses the local simulator when you run a Worker locally, unless you set `remote = true`. An omitted `remote` setting and `remote = false` both select local storage. If your development workflow relied on the earlier remote default, set `remote = true` and [authenticate your dev tool](https://developers.cloudflare.com/artifacts/guides/authentication/) to keep using deployed repos. Remote bindings do not sync with local repos.

While `remote` is omitted, `wrangler dev`, `getPlatformProxy()`, and the Vite plugin warn that the binding uses the local simulator by default. Set `remote = false` to keep the local simulator and silence the warning, or `remote = true` to use deployed repos. In `cloudflare.config.ts`, the setting is `dev: { remote }`.

Note

Cloudflare Vite plugin 1.x keeps the earlier default. With remote bindings enabled, an omitted `remote` uses deployed repos. Set `remote = false` to use the local simulator with Vite plugin 1.x.

The deprecated `@cloudflare/vitest-pool-workers` package also keeps the earlier remote default and fails without Cloudflare credentials. To use the local simulator in tests, [migrate to `@cloudflare/vitest-plugin`](https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/).

| Setting | Binding destination | Local Git installation | Cloudflare credentials for local development |
| --- | --- | --- | --- |
| Omitted `remote` or `remote = false` | Local simulator | Required | Not required |
| `remote = true` | Deployed Artifacts service | Not required to start the binding | Required |

The local simulator is available through `wrangler dev`, the Cloudflare Vite plugin, and Workers Vitest. It does not provide a local REST API, Artifacts CLI, dashboard, SSH endpoint, or Git LFS server.

## Start local development

1. Install Git 2.32 or newer on your development machine. Make `git` available on the `PATH` of the process that starts your dev server or tests. Verify the version in that environment:

   ```sh
   git --version
   ```

   If Git is unavailable or older than 2.32, local Artifacts fails at startup with installation or upgrade instructions. Restart your dev tool after changing `PATH`.
2. Add a binding to your Wrangler config file. If your project already has a binding, leave `remote` unset or set it to `false`:

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "name": "artifacts-worker",
     "main": "src/index.ts",
     // Set this to today's date
     "compatibility_date": "2026-11-18",
     "artifacts": [
       {
         "binding": "ARTIFACTS",
         "namespace": "default"
       }
     ]
   }
   ```

   ```toml
   name = "artifacts-worker"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-11-18"

   [[artifacts]]
   binding = "ARTIFACTS"
   namespace = "default"
   ```

   The namespace identifies local repositories. It does not import repos from a deployed namespace with the same name.
3. Start the dev server:npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

   Use the same Wrangler config file with the Cloudflare Vite plugin or Workers Vitest. For a Worker example that creates a repo, refer to [Get started with Workers](https://developers.cloudflare.com/artifacts/get-started/workers/).
4. Use the `remote` URL and initial token returned by `env.ARTIFACTS.create()` to clone or push with Git. The local URL uses loopback HTTP:

   ```sh
   git -c http.extraHeader="Authorization: Bearer $ARTIFACTS_TOKEN" clone "$ARTIFACTS_REMOTE" artifacts-clone
   ```

   Set `ARTIFACTS_REMOTE` to the returned `remote` value and `ARTIFACTS_TOKEN` to the returned token before running this command. The token is a repo credential, not a Cloudflare API token. Keep it out of source files, Git config, and logs. You can also use HTTP Basic auth when Git prompts: enter any username, and use the part of the repo token before `?expires=` as the password.

The dev server prints each namespace's Git remote prefix at startup. The port is saved with your local state and reused after a restart, so existing clones keep working. If another process has taken the port, the dev server picks a new one. Get the new `remote` from the binding and run `git remote set-url origin <remote>` in existing clones.

## Test event subscriptions

Local namespaces publish [Artifacts events](https://developers.cloudflare.com/artifacts/guides/event-subscriptions/) as you work, so you can build and test event-driven Workflows before you deploy. For example:

- Set up a repo when it is created, imported, or forked
- Clean up related data when a repo is deleted
- Audit when repo tokens are created or revoked

Locally, Artifacts publishes these events:

- **Repo lifecycle** — `cf.artifacts.repo.created`, `cf.artifacts.repo.imported`, `cf.artifacts.repo.forked`, and `cf.artifacts.repo.deleted`.
- **Repo tokens** — `cf.artifacts.repo.token.created` and `cf.artifacts.repo.token.revoked`. Creating, importing, or forking a repo also publishes `cf.artifacts.repo.token.created` for the repo's initial token.

Push, clone, and fetch events are not published locally yet. A Workflow that [builds and deploys on push](https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/) does not start in local development.

Cloudflare Vite plugin 1.x does not start Workflows from local events yet.

### Start a Workflow from an event

Use the same `triggers.events` configuration that you deploy. Each target must be a Workflow defined by the same Worker. A matching event starts a new instance of that Workflow, and the event message is the instance's `event.payload`.

`wrangler dev` and Workers Vitest read `triggers.events` from your Wrangler config file. In `cloudflare.config.ts`, which the Vite plugin 2.x, Workers Vitest, and `cf` read, declare events on the Workflow export instead. The Workflow that declares an event receives it, so there is no `targets` list. The filter uses `repoName` instead of `repo_name`.

`exports.workflow({ events })` requires `cf` 1.0.0-rc.0 or later, or `@cloudflare/config` 1.0.0-rc.0 or later if you import it directly. With earlier versions, TypeScript reports that `events` does not exist in `WorkflowExportOptions`. To use the `cloudflare.config.ts` example, install `cf` as a development dependency:

npmyarnpnpmbun

```
npm i -D cf
```

```
yarn add -D cf
```

```
pnpm add -D cf
```

```
bun add -d cf
```

To have Workers Vitest read `cloudflare.config.ts`, pass `config: true` to `cloudflareTest()`, or pass a path to the file. You cannot combine `config` with the `wrangler` option. For details, refer to [`CloudflareTestOptions`](https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/#cloudflaretestoptions).

The following content appears twice: first for the Cloudflare CLI (`cf`), then for Wrangler. Use `cf` for new projects. In an existing project, use the CLI that the project already uses.

Cloudflare CLI

*cloudflare.config.tsts*

```ts
import { bindings, defineConfig, exports } from "cf/config";

export default defineConfig({
  worker: {
  	name: "artifacts-worker",
  	entrypoint: "./src/index.ts",
  	// Set this to today's date
  	compatibilityDate: "2026-11-18",
  	env: {
  		ARTIFACTS: bindings.artifacts({ namespace: "default" }),
  	},
  	exports: {
  		OnRepoCreated: exports.workflow({
  			name: "on-repo-created",
  			events: [
  				{
  					type: "cf.artifacts.repo.created",
  					filter: { namespace: "default" },
  				},
  			],
  		}),
  	},
  },
});
```

Wrangler

```jsonc
{
	"name": "artifacts-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-18",
	"artifacts": [{ "binding": "ARTIFACTS", "namespace": "default" }],
	"workflows": [
		{
			"binding": "ON_REPO_CREATED",
			"name": "on-repo-created",
			"class_name": "OnRepoCreated",
		},
	],
	"triggers": {
		"events": [
			{
				"type": "cf.artifacts.repo.created",
				"filter": { "namespace": "default" },
				"targets": [{ "type": "workflow", "workflow_name": "on-repo-created" }],
			},
		],
	},
}
```

```toml
name = "artifacts-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-11-18"

[[artifacts]]
binding = "ARTIFACTS"
namespace = "default"

[[workflows]]
binding = "ON_REPO_CREATED"
name = "on-repo-created"
class_name = "OnRepoCreated"

[[triggers.events]]
type = "cf.artifacts.repo.created"

  [triggers.events.filter]
  namespace = "default"

  [[triggers.events.targets]]
  type = "workflow"
  workflow_name = "on-repo-created"
```

Both configurations use the same Workflow class:

*src/index.jsjs*

```js
import { WorkflowEntrypoint } from "cloudflare:workers";

export class OnRepoCreated extends WorkflowEntrypoint {
	async run(event, step) {
		const { source } = event.payload;
		await step.do("read repo info", async () => {
			const repo = await this.env.ARTIFACTS.get(source.repoName);
			return await repo.info();
		});
	}
}
```

*src/index.tsts*

```ts
import {
	WorkflowEntrypoint,
	type WorkflowEvent,
	type WorkflowStep,
} from "cloudflare:workers";

interface RepoCreated {
	type: "cf.artifacts.repo.created";
	source: { type: "artifacts"; namespace: string; repoName: string };
	payload: { repoId: string; defaultBranch: string };
}

export class OnRepoCreated extends WorkflowEntrypoint<Env, RepoCreated> {
	async run(event: WorkflowEvent<RepoCreated>, step: WorkflowStep) {
		const { source } = event.payload;
		await step.do("read repo info", async () => {
			const repo = await this.env.ARTIFACTS.get(source.repoName);
			return await repo.info();
		});
	}
}
```

To observe these instances in Workers Vitest, pass a Workflow binding to `introspectWorkflow()`. The Wrangler example declares the `ON_REPO_CREATED` binding, but the `cloudflare.config.ts` example declares no Workflow binding. Add one, such as a test-only binding in the `miniflare.workflows` option. For an example, refer to [Introspect Workflows declared in `exports`](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/#introspect-workflows-declared-in-exports).

### How local delivery works

- **Same message shape** — Each message has the deployed `type`, `source`, `payload`, and `metadata` fields. Locally, `metadata.accountId` is `"local"`.
- **Unordered** — Events can arrive in any order, even for back-to-back operations such as creating a repo and its initial token.
- **Does not block repo changes** — Artifacts publishes an event after the repo change completes. If delivery fails, the dev server logs the error and does not retry. The repo operation still succeeds.
- **Workflows only** — Local Artifacts does not deliver events to queues.

## Limits

As in production, a push that contains a file larger than 32 MiB is rejected, and reading a larger file throws an `ArtifactsError` with code `MEMORY_LIMIT`. `listTokens()` includes revoked and expired tokens with their `state`.

## Keep or reset local repositories

Local repository metadata and Git objects persist under your dev tool's resource persistence directory. For Wrangler and Vite plugin 1.x, this is typically `.wrangler/state/` when persistence is on. Vite plugin 2.x uses `.cloudflare/state/`. Use the same project root and persistence settings to keep data across restarts. Turning off persistence, such as with Vite's `persistState: false`, makes the data temporary.

To reset local Artifacts, stop the dev server, back up any repositories you need, and delete only the `artifacts/` directory inside that tool's resource persistence directory. Local tokens and repository data do not transfer to a remote binding.

## Import repositories over HTTPS

Calling `env.ARTIFACTS.import()` with an HTTPS URL runs Git on your development machine to fetch from that host, so the host must be reachable from your machine. Only import from URLs you trust. Imports do not follow HTTP redirects, so use the final HTTPS Git URL. To trust a private certificate authority, set `GIT_SSL_CAINFO` in your dev tool's environment before it starts. Local repos do not store import credentials in repository metadata or Git configuration.

For the binding arguments, refer to [Workers binding](https://developers.cloudflare.com/artifacts/api/workers-binding/#importparams).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/guides/local-development/#page","headline":"Local development","description":"Use the local Artifacts binding with Wrangler, Vite, or Workers Vitest without accessing your deployed repositories.","url":"https://developers.cloudflare.com/artifacts/guides/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/artifacts/guides/local-development/og.png?v=2387a9a4a53aca77","dateModified":"2026-11-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
