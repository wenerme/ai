---
description: Wrangler commands for managing Flagship apps, feature flags, targeting rules, rollouts, evaluations, and changelog history.
title: Flagship
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Flagship

Last updated Jul 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/wrangler/commands/flagship/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use `wrangler flagship` to manage [Flagship](https://developers.cloudflare.com/flagship/) apps and feature flags from the command line.

`wrangler flagship` is available in Wrangler v4.107.0 and later.

## Authentication

Run `wrangler login`, or set [CLOUDFLARE\_API\_TOKEN](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/) to an API token with Flagship permissions.

| Permission     | Required for                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------- |
| flagship:read  | Listing apps, inspecting flags, evaluating flags, and reading changelogs.                    |
| flagship:write | Creating, updating, deleting, enabling, disabling, rolling out, and splitting apps or flags. |

Most write workflows also read the current flag before writing the updated definition, so grant both permissions for operational use.

## App IDs

`wrangler flagship flags` commands always take the app ID as the first argument. Most subcommands then take a flag key; list-style commands, such as `flags list`, take only the app ID:

```sh
wrangler flagship flags get <APP_ID> new-checkout
wrangler flagship flags disable <APP_ID> new-checkout
wrangler flagship flags list <APP_ID>
```

Create an app first if you do not already have one:

```sh
wrangler flagship apps create checkout-service
```

Pass `--binding <NAME>` when creating an app to add it to your `wrangler.json` or `wrangler.jsonc` file as a Worker binding.

## Common workflows

Create a boolean flag. With no variations, Wrangler creates `on=true`, `off=false`, and serves `off` by default:

```sh
wrangler flagship flags create <APP_ID> new-checkout
```

Add targeting rules with the compact rule syntax:

```sh
wrangler flagship flags create <APP_ID> premium-banner \
	-V on=true \
	-V off=false \
	--default off \
	--rule "serve=on; when=plan equals enterprise AND country in [US,CA]; rollout=25%@user_id"
```

Use uppercase `AND` and `OR` outside quoted values to combine conditions. Quote values that contain reserved words or separators:

```sh
wrangler flagship flags create <APP_ID> banner-copy \
	-V shown=true \
	-V hidden=false \
	--default hidden \
	--rule 'serve=shown; when=title equals "WAR AND PEACE" OR country in ["US","CA"]'
```

For deeply nested condition groups, use `--rule-json`. Wrangler validates both compact rules and JSON rules before sending requests.

Change one existing rule without rewriting the full rule set:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--rollout 50%@user_id
```

Evaluate a flag for a user:

```sh
wrangler flagship flags evaluate <APP_ID> premium-banner \
	--context plan=enterprise \
	--context country=US \
	--targeting-key user-42
```

Use `disable` as an immediate kill switch:

```sh
wrangler flagship flags disable <APP_ID> premium-banner
```

Enable, disable, or delete multiple flags by passing the app ID followed by multiple keys:

```sh
wrangler flagship flags disable <APP_ID> new-checkout dark-mode premium-banner
wrangler flagship flags delete <APP_ID> coming-soon old-banner --force
```

Delete commands require `--force` when used with `--json` so prompts cannot corrupt JSON output. `rollout` and `split` require the same when they would replace existing targeting rules that have conditions.

Refer to the [Flagship Wrangler commands reference](https://developers.cloudflare.com/flagship/reference/wrangler-commands/) for a complete workflow guide covering targeting rules, rollouts, traffic splits, changelogs, and scripting with `--json`.

## Commands

## `flagship apps create`

Create a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship apps create [NAME]
```

```
yarn wrangler flagship apps create [NAME]
```

```
pnpm wrangler flagship apps create [NAME]
```

* `[NAME]` ` string ` required
The name of the app
* `--json` ` boolean ` default: false
Return output as JSON
* `--use-remote` ` boolean `
Use a remote binding when adding the newly created resource to your config
* `--update-config` ` boolean `
Automatically update your config file with the newly added resource
* `--binding` ` string `
The binding name of this resource in your Worker

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship apps list`

List Flagship apps

 npm  yarn  pnpm

```
npx wrangler flagship apps list
```

```
yarn wrangler flagship apps list
```

```
pnpm wrangler flagship apps list
```

* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship apps get`

Get a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship apps get [APP-ID]
```

```
yarn wrangler flagship apps get [APP-ID]
```

```
pnpm wrangler flagship apps get [APP-ID]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship apps update`

Update a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship apps update [APP-ID]
```

```
yarn wrangler flagship apps update [APP-ID]
```

```
pnpm wrangler flagship apps update [APP-ID]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `--name` ` string ` required
The new name of the app
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship apps delete`

Delete a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship apps delete [APP-ID]
```

```
yarn wrangler flagship apps delete [APP-ID]
```

```
pnpm wrangler flagship apps delete [APP-ID]
```

* `[APP-ID]` ` string ` required
One or more app IDs to delete
* `--force` ` boolean ` alias: --y default: false
Skip the confirmation prompt
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags create`

Create a feature flag in a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship flags create [APP-ID] [KEY]
```

```
yarn wrangler flagship flags create [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags create [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--variation` ` string ` alias: --V
A flag variation, in the form "name=value" (repeatable)
* `--default-variation` ` string ` alias: --default
The name of the variation to serve by default (defaults to off for boolean flags, otherwise the first variation)
* `--type` ` string ` alias: --t
The variation value type (inferred when omitted)
* `--description` ` string ` alias: --d
A description of the flag
* `--disabled` ` boolean ` default: false
Create the flag in a disabled state
* `--rule` ` string `
A targeting rule, e.g. "serve=on; when=plan equals pro AND region in \[US,CA\]; rollout=30%@user\_id". Conditions support AND/OR; priority is optional and defaults to declaration order (repeatable)
* `--rule-json` ` string `
A targeting rule as a JSON object (repeatable)
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags list`

List feature flags in a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship flags list [APP-ID]
```

```
yarn wrangler flagship flags list [APP-ID]
```

```
pnpm wrangler flagship flags list [APP-ID]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `--limit` ` number `
The maximum number of flags to return (1-200)
* `--cursor` ` string `
The pagination cursor from a previous list call
* `--all` ` boolean ` default: false
Fetch every flag, following pagination automatically
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags get`

Get a feature flag from a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship flags get [APP-ID] [KEY]
```

```
yarn wrangler flagship flags get [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags get [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags update`

Update a feature flag in a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship flags update [APP-ID] [KEY]
```

```
yarn wrangler flagship flags update [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags update [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--enable` ` boolean `
Enable the flag
* `--disable` ` boolean `
Disable the flag
* `--description` ` string ` alias: --d
A new description for the flag (pass "" to clear it)
* `--default-variation` ` string ` alias: --default
The name of the variation to serve by default
* `--type` ` string ` alias: --t
The value type used to coerce --set-variation values
* `--set-variation` ` string `
Add or replace a variation, in the form "name=value"
* `--remove-variation` ` string `
Remove a variation by name
* `--rule` ` string `
Replace the flag's targeting rules (repeatable)
* `--rule-json` ` string `
Replace the flag's targeting rules using JSON (repeatable)
* `--add-rule` ` string `
Append a targeting rule, keeping the existing rules (repeatable)
* `--add-rule-json` ` string `
Append a targeting rule using JSON, keeping the existing rules (repeatable)
* `--clear-rules` ` boolean ` default: false
Remove all targeting rules
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags set`

Set the default variation served by a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags set [APP-ID] [KEY]
```

```
yarn wrangler flagship flags set [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags set [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--variation` ` string ` aliases: --variant, --V required
The variation to serve by default
* `--clear-rules` ` boolean ` default: false
Clear targeting rules so this variation is always served
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags rules list`

List targeting rules for a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags rules list [APP-ID] [KEY]
```

```
yarn wrangler flagship flags rules list [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags rules list [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags rules update`

Update one targeting rule for a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags rules update [APP-ID] [KEY]
```

```
yarn wrangler flagship flags rules update [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags rules update [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--priority` ` number ` required
The priority of the rule to update
* `--serve` ` string `
The variation to serve when this rule matches
* `--when` ` string `
The rule conditions, using the same syntax as --rule when=...
* `--clear-conditions` ` boolean ` default: false
Remove conditions so the rule matches all contexts
* `--rollout` ` string `
The rollout, in the form "percentage" or "percentage%@attribute"
* `--clear-rollout` ` boolean ` default: false
Remove the rollout from this rule
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags rules delete`

Delete one targeting rule from a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags rules delete [APP-ID] [KEY]
```

```
yarn wrangler flagship flags rules delete [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags rules delete [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--priority` ` number ` required
The priority of the rule to delete
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags rules reorder`

Reorder targeting rules for a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags rules reorder [APP-ID] [KEY]
```

```
yarn wrangler flagship flags rules reorder [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags rules reorder [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--order` ` string ` required
Comma-separated existing rule priorities in their new order, for example 2,1,3
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags split`

Split traffic across variations by percentage

 npm  yarn  pnpm

```
npx wrangler flagship flags split [APP-ID] [KEY]
```

```
yarn wrangler flagship flags split [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags split [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--weight` ` string ` alias: --w
A variation weight, in the form "variation=weight" (repeatable)
* `--by` ` string `
Context attribute used for sticky bucketing
* `--default-variation` ` string ` alias: --default
Fallback variation when bucketing cannot run
* `--force` ` boolean ` alias: --y default: false
Skip the confirmation prompt when this split replaces existing targeting rules
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags rollout`

Roll out one variation to a percentage of traffic

 npm  yarn  pnpm

```
npx wrangler flagship flags rollout [APP-ID] [KEY]
```

```
yarn wrangler flagship flags rollout [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags rollout [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--to` ` string ` required
Variation to roll out
* `--percentage` ` number ` required
Percentage of traffic to serve the rollout variation (0-100)
* `--by` ` string `
Context attribute used for sticky bucketing
* `--from-variation` ` string ` alias: --from
Fallback variation for the remaining traffic
* `--force` ` boolean ` alias: --y default: false
Skip the confirmation prompt when this rollout replaces existing targeting rules
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags enable`

Enable a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags enable [APP-ID] [KEY]
```

```
yarn wrangler flagship flags enable [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags enable [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
One or more flag keys to enable
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags disable`

Disable a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags disable [APP-ID] [KEY]
```

```
yarn wrangler flagship flags disable [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags disable [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
One or more flag keys to disable
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags evaluate`

Evaluate a feature flag with optional context

 npm  yarn  pnpm

```
npx wrangler flagship flags evaluate [APP-ID] [KEY]
```

```
yarn wrangler flagship flags evaluate [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags evaluate [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--context` ` string ` aliases: --ctx, --C
Evaluation context, in the form "name=value" (repeatable)
* `--targeting-key` ` string `
Stable bucketing key for percentage rollouts
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags delete`

Delete a feature flag from a Flagship app

 npm  yarn  pnpm

```
npx wrangler flagship flags delete [APP-ID] [KEY]
```

```
yarn wrangler flagship flags delete [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags delete [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
One or more flag keys to delete
* `--force` ` boolean ` alias: --y default: false
Skip the confirmation prompt
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `flagship flags changelog`

Show the changelog for a feature flag

 npm  yarn  pnpm

```
npx wrangler flagship flags changelog [APP-ID] [KEY]
```

```
yarn wrangler flagship flags changelog [APP-ID] [KEY]
```

```
pnpm wrangler flagship flags changelog [APP-ID] [KEY]
```

* `[APP-ID]` ` string ` required
The ID of the app
* `[KEY]` ` string ` required
The key of the flag
* `--limit` ` number `
The maximum number of entries to return (1-200)
* `--cursor` ` string `
The pagination cursor from a previous changelog call
* `--all` ` boolean ` default: false
Fetch every entry, following pagination automatically
* `--json` ` boolean ` default: false
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/flagship/#page","headline":"Flagship · Cloudflare Workers docs","description":"Wrangler commands for managing Flagship apps, feature flags, targeting rules, rollouts, evaluations, and changelog history.","url":"https://developers.cloudflare.com/workers/wrangler/commands/flagship/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
