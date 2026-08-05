---
description: Build projects stored in Artifacts repos and deploy them as Workers or Workers for Platforms User Workers.
title: Build and deploy Artifacts repos
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Build and deploy Artifacts repos

Last updated Aug 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Artifacts events can build and deploy projects stored in Artifacts repos. When a user or agent pushes a commit, the event triggers a [Workflow instance](https://developers.cloudflare.com/workflows/build/trigger-workflows/).

Within the Workflow, you define a continuous integration (CI) pipeline with the `@cloudflare/ci` SDK to cache dependencies, run checks, and build the project. The final step in your CI pipeline can deploy the output to a [Worker](https://developers.cloudflare.com/workers/) or a [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) User Worker.

This is useful when you need to:

* Automatically build and deploy application code stored in Artifacts.
* Run linting, type checking, tests, and other checks on every push.
* Reuse dependencies when the lockfile (i.e. `pnpm-lock.yaml`) has not changed.
* Stop deployment when a check or build fails.
* Restrict API token access to the deployment step.
* Deploy the output to a [Worker](https://developers.cloudflare.com/workers/) or a [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) User Worker.

## How it works

Artifacts repo changes

Repository changes

git push

CI Workflow

1Install & cache dependencies

2Run CI steps

Build

Lint

Typecheck

Format

Deploy Worker

1. **Push repo changes** — A `git push` to the Artifacts repo emits an `artifacts.repo.pushed` event that identifies the pushed repo, branch, and commit.
2. **Run the CI Workflow** — The event starts a Workflow that checks out the commit, installs and caches dependencies, and runs CI steps — build, lint, typecheck, and format — in parallel. A failed step stops the Workflow before deployment.
3. **Deploy the Worker** — The Workflow deploys the built Worker either directly to your account or as a User Worker, if using Workers for Platforms

### Run the CI Workflow

Use the `@cloudflare/ci` SDK to define the CI steps. The SDK provides two tools to help you build the pipeline:

* **Runners** — each `runner()` call spins up an isolated sandbox and executes a shell command. You use the same commands you already run locally or in another CI system. Each runner captures its own logs, status, and output files.
* **Cache** — the `cache` option on a runner caches installed dependencies so that later runs do not reinstall them. Pass the files that determine the dependencies, such as `pnpm-lock.yaml`, to `cache.inputs`. When those files have not changed, the SDK restores the cached result instead of running the command again.
![Diagram showing three sequential commits: commit 1 has a cache miss so the install step runs and its sandbox snapshot is cached; commit 2 has an unchanged pnpm-lock.yaml so the cache key matches and the cached snapshot is served, skipping install; commit 3 has a changed pnpm-lock.yaml so the cache key misses and install runs again.](https://developers.cloudflare.com/_astro/snapshot-cache-flow.DuJouCOa_1qBTM9.svg)

A cached runner takes a [snapshot](https://developers.cloudflare.com/sandbox/api/backups/) of its sandbox, which later runners reuse. Multiple runners can branch from the same cached result — for example, lint, type-check, and test runners can all reuse one cached install.

1Install and cache dependenciesRestore cache or run npm ciComplete

2Run checks in parallelAll checks must passComplete

Lint

Type-check

Test

Check failed

Retrying

All checks passed

Start build

3Run buildnpm run buildComplete

A failed runner retries according to its [step configuration](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/#retry-steps), where you can define the number of retry attempts, backoff schedule, and timeouts. Runners that depend on a previous step do not start until its retry succeeds. If the configured retry limit is reached, the Workflow terminates in an `Errored` state.

Here is an example of how to set up your Workflow to use runners and cache to install dependencies, run checks, build the project, and deploy the Worker:

```js
import { CIWorkflow } from "./src/pipeline";

export class CI extends CIWorkflow {
	async pipeline(_event, _step, ci) {
		// Install once, then run independent checks from the shared snapshot.
		const deps = await ci.runner({
			name: "install",
			command: "bun install --frozen-lockfile",
			cache: { inputs: ["package.json", "bun.lock"] },
		});

		await Promise.all([
			deps.runner({ name: "lint", command: "bun run lint" }),
			deps.runner({ name: "test", command: "bun run test" }),
			deps.runner({ name: "typecheck", command: "bun run typecheck" }),
			deps.runner({ name: "build", command: "bun run build" }),
		]);

		await deps.runner({
			name: "deploy",
			command: "bun wrangler deploy",
			cloudflareCredentials: {
				accountId: this.env.CLOUDFLARE_DEPLOY_ACCOUNT_ID,
			},
		});
	}
}
```

```ts
import { CIWorkflow } from "./src/pipeline";
import type {
	CiContext,
	CiParams,
	CiRunnerResult,
	CloudflareArtifacts,
} from "./src/pipeline";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";

export class CI extends CIWorkflow {
	protected async pipeline(
		_event: WorkflowEvent<CiParams<CloudflareArtifacts>>,
		_step: WorkflowStep,
		ci: CiContext,
	): Promise<void> {
		// Install once, then run independent checks from the shared snapshot.
		const deps: CiRunnerResult = await ci.runner({
			name: "install",
			command: "bun install --frozen-lockfile",
			cache: { inputs: ["package.json", "bun.lock"] },
		});

		await Promise.all([
			deps.runner({ name: "lint", command: "bun run lint" }),
			deps.runner({ name: "test", command: "bun run test" }),
			deps.runner({ name: "typecheck", command: "bun run typecheck" }),
			deps.runner({ name: "build", command: "bun run build" }),
		]);

		await deps.runner({
			name: "deploy",
			command: "bun wrangler deploy",
			cloudflareCredentials: {
				accountId: this.env.CLOUDFLARE_DEPLOY_ACCOUNT_ID,
			},
		});
	}
}
```

Note

The credentials on the `deploy()` step are only required when deploying the Worker to an account other than the account where the CI Workflow is running.

## Start a build when code changes

When a user or agent pushes a commit to an Artifacts repo, Artifacts emits an event that identifies the repo, branch, and commit that changed. You will use this event to trigger a Workflow instance which runs a CI pipeline by automatically checking out the commit and cloning the repo before installing dependencies, running checks, building the project, and/or deploying the Worker, according to your code.

This guide defines those CI steps in a Workflow class named `CIWorkflow`. To start this Workflow automatically after each push, add an `cf.artifacts.repo.pushed` trigger to your Wrangler configuration. You should also include:

* R2 binding: the bucket where your the snapshot of your cached dependencies will be stored
* Container (and Durable Object) binding: create a binding to your container to access sandboxes during each `runner()` step
* Workflows binding
* Artifacts binding
* Observability (optional): inspect your CI jobs as a Workflow instance with [Workers observability](https://developers.cloudflare.com/workers/observability/)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "<worker-name>",
  "main": "src/index.ts",
  "compatibility_date": "2026-06-16",
  "compatibility_flags": ["nodejs_compat"],
  "artifacts": [
    {
      "binding": "ARTIFACTS",
      "namespace": "<artifacts-namespace>"
    }
  ],
  "containers": [
    {
      "class_name": "CiSandbox",
      "image": "./Dockerfile",
      "max_instances": 10,
      "instance_type": "standard-4"
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "SANDBOX",
        "class_name": "CiSandbox"
      }
    ]
  },
  "workflows": [
    {
      "name": "<workflow-name>",
      "binding": "CI_WORKFLOW",
      "class_name": "CI"
    }
  ],
  "exports": {
    "CiSandbox": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  },
  "r2_buckets": [
    {
      "binding": "BACKUP_BUCKET",
      "bucket_name": "<backup-bucket-name>"
    }
  ],
  "triggers": {
    "events": [
      {
        "type": "cf.artifacts.repo.pushed",
        // filter is optional. If you don't set repoName we will run the same workflow for every push on any repo in your Artifacts namespace
        "filter": {
          "namespace": "CI",
          "repoName": "my-repo"
        },
        "target": {
          "scriptName": "<worker-name>",
          "workflowName": "<workflow-name>"
        }
      }
    ]
  },
  "observability": {
    "enabled": true,
    "logs": {
      "enabled": true
    }
  }
}
```

```toml
"$schema" = "node_modules/wrangler/config-schema.json"
name = "<worker-name>"
main = "src/index.ts"
compatibility_date = "2026-06-16"
compatibility_flags = [ "nodejs_compat" ]

[[artifacts]]
binding = "ARTIFACTS"
namespace = "<artifacts-namespace>"

[[containers]]
class_name = "CiSandbox"
image = "./Dockerfile"
max_instances = 10
instance_type = "standard-4"

[[durable_objects.bindings]]
name = "SANDBOX"
class_name = "CiSandbox"

[[workflows]]
name = "<workflow-name>"
binding = "CI_WORKFLOW"
class_name = "CI"

[exports.CiSandbox]
type = "durable-object"
storage = "sqlite"

[[r2_buckets]]
binding = "BACKUP_BUCKET"
bucket_name = "<backup-bucket-name>"

[[triggers.events]]
type = "cf.artifacts.repo.pushed"

  [triggers.events.filter]
  namespace = "CI"
  repoName = "my-repo"

  [triggers.events.target]
  scriptName = "<worker-name>"
  workflowName = "<workflow-name>"

[observability]
enabled = true

  [observability.logs]
  enabled = true
```

Note

If you are running CI for a User Worker, include `"dispatch_namespace": "<DISPATCH_NAMESPACE>"` in your trigger target.

### View build status

The `[observability]` setting in your Wrangler configuration records the status and logs for each pipeline run. To identify which stage failed, inspect the instance in the Workflows dashboard:

[Go to **Workflows** ↗](https://dash.cloudflare.com/?to=/:account/workers/workflows)

Each runner displays its own input, output, and status, so you can identify the command that failed. When a runner fails, the Workflow records its output and does not start stages that need its files.

## Deploy the application

To deploy a Worker, pass `wrangler deploy` to your final `runner()` step, i.e. `workspace.runner({ name: "deploy", command: "wrangler deploy" })`.

To deploy a User Worker, pass `wrangler deploy --dispatch_namespace <DISPATCH_NAMESPACE>` to your final `runner()` step.

## Run one workflow for every repo in a namespace

The `filter` in your trigger is optional. When you set `repoName`, only pushes to that specific repo start the Workflow. When you omit `repoName`, Cloudflare runs the same Workflow for every push to any repo in your Artifacts namespace.

This is useful for platforms that author and own a single CI Workflow and want to apply it uniformly across every customer repo in a namespace. Instead of maintaining a separate trigger per repo, one shared Workflow builds, checks, and deploys each repo on push.

Platform namespace

Artifact repo A

Artifact repo B

Artifact repo C

Artifact repo D

Artifact repo E

Shared CI workflowauthored & owned by platform

buildlinttesttypecheck

deploy A

deploy B

deploy C

deploy D

deploy E

deploy per repo

To run the same Workflow for every repo in a namespace, drop `repoName` from the trigger `filter` and keep only the `namespace`:

```jsonc
{
	"triggers": {
		"events": [
			{
				"type": "cf.artifacts.repo.pushed",
				"filter": {
					"namespace": "CI"
				},
				"target": {
					"scriptName": "my-ci-worker",
					"workflowName": "ci-workflow"
				}
			}
		]
	}
}
```

```toml
[[triggers.events]]
type = "cf.artifacts.repo.pushed"

  [triggers.events.filter]
  namespace = "CI"

  [triggers.events.target]
  scriptName = "my-ci-worker"
  workflowName = "ci-workflow"
```

Each push still starts its own Workflow instance for the repo, branch, and commit that changed, so you can deploy a separate Worker per repo from the same shared Workflow definition.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/#page","headline":"Build and deploy Artifacts repos · Cloudflare Artifacts docs","description":"Build projects stored in Artifacts repos and deploy them as Workers or Workers for Platforms User Workers.","url":"https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
