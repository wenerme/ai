---
description: Use wrangler flagship to create apps, manage feature flags, configure targeting rules, run rollouts, evaluate flags, and inspect changelog history.
title: Wrangler commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

#  Wrangler commands

Last updated Jul 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/flagship/reference/wrangler-commands/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use `wrangler flagship` to manage Flagship apps and feature flags from the command line. Every `wrangler flagship flags` command takes the app ID as the first argument. Most subcommands then take a flag key, for example `wrangler flagship flags get <APP_ID> <KEY>`. List-style commands, such as `wrangler flagship flags list <APP_ID>`, take only the app ID.

## Before you begin

### Authenticate Wrangler

`wrangler flagship` calls the Cloudflare API. Authenticate Wrangler before running commands:

```sh
wrangler login
```

For automation, set [CLOUDFLARE\_API\_TOKEN](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/) to an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the appropriate Flagship permissions.

| Permission     | Use it for                                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| flagship:read  | Listing apps, getting apps, listing flags, inspecting flags, evaluating flags, and reading changelogs.                                                |
| flagship:write | Creating apps, updating apps, deleting apps, creating flags, updating flags, changing defaults, rollouts, splits, enable/disable, and deleting flags. |

Most commands that modify an existing flag first read the current flag and then write back the updated definition. For those workflows, grant both `flagship:read` and `flagship:write`.

### Bind Flagship to your Worker

Add a Flagship binding to your Worker project so your Worker code can evaluate flags with low latency at runtime:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "flagship": [
    {
      "binding": "FLAGS",
      "app_id": "<APP_ID>"
    }
  ]
}
```

```toml
[[flagship]]
binding = "FLAGS"
app_id = "<APP_ID>"
```

Note

This binding is only used by your Worker's runtime code (`env.FLAGS`). `wrangler flagship` commands always take the app ID as an explicit argument and do not read it from this binding.

## Quick start

Create a boolean flag, evaluate it for a user, and disable it as a kill switch:

```sh
# With no variations, Wrangler creates on=true, off=false,
# and serves off by default.
wrangler flagship flags create <APP_ID> new-checkout

# Evaluate the flag for a user.
wrangler flagship flags evaluate <APP_ID> new-checkout --targeting-key user-42

# Disable the flag instantly. Disabled flags always serve their default variation.
wrangler flagship flags disable <APP_ID> new-checkout
```

## Manage apps

Apps group related flags. A common pattern is one app per service, Worker, or product surface.

| Task       | Command                                               |
| ---------- | ----------------------------------------------------- |
| Create app | wrangler flagship apps create <NAME>                  |
| List apps  | wrangler flagship apps list                           |
| Get app    | wrangler flagship apps get <APP\_ID>                  |
| Rename app | wrangler flagship apps update <APP\_ID> --name <NAME> |
| Delete app | wrangler flagship apps delete <APP\_ID>               |

`wrangler flagship apps ls` is an alias for `apps list`. `wrangler flagship apps rm` is an alias for `apps delete`.

`wrangler flagship apps list` follows pagination automatically and displays all apps in the account.

Creating an app returns the app ID and shows the binding snippet to add to your Wrangler configuration:

```sh
wrangler flagship apps create checkout-service
```

To add the new app to your `wrangler.json` or `wrangler.jsonc` file as a Worker binding, pass `--binding`:

```sh
wrangler flagship apps create checkout-service --binding FLAGS
```

Wrangler also supports `--update-config` to update your JSON or JSONC configuration after prompting for a binding name.

For non-JSON configuration files, Wrangler prints the binding snippet but does not edit the file automatically.

When `--json` is used, `apps create` prints the created app as JSON and does not prompt for or update configuration.

For scripts, capture the app ID from JSON output:

```sh
APP_ID=$(wrangler flagship apps create checkout-service --json | jq -r '.id')
```

Deleting an app deletes all of its flags and changelog history. The API rejects app deletion if a Worker still references the app through a Flagship binding.

Use `--force` or `-y` to skip the delete confirmation prompt. If you also use `--json`, you must pass `--force` so the confirmation prompt cannot appear in JSON output.

```sh
wrangler flagship apps delete <APP_ID> --force
```

Delete multiple apps by passing multiple app IDs:

```sh
wrangler flagship apps delete <APP_ID_1> <APP_ID_2> <APP_ID_3> --force
```

## Create flags

Flag keys are unique within an app. Use stable keys that describe the behavior being controlled, such as `new-checkout`, `pricing-page-layout`, or `upload-limit`.

### Boolean flags

If you omit variations, Wrangler creates a boolean flag with `on=true`, `off=false`, and `off` as the default variation.

```sh
wrangler flagship flags create <APP_ID> new-checkout
```

### Explicit variations

Use `--variation` (`-V`) to add each variation as `name=value`. Use `--default` to choose the fallback variation.

```sh
# String flag.
wrangler flagship flags create <APP_ID> checkout-flow \
	-V v1=old-checkout \
	-V v2=new-checkout \
	--default v1 \
	--type string

# Number flag.
wrangler flagship flags create <APP_ID> upload-limit \
	-V free=10 \
	-V pro=100 \
	-V enterprise=1000 \
	--default free \
	--type number

# JSON flag.
wrangler flagship flags create <APP_ID> theme-config \
	-V 'light={"bg":"#ffffff","fg":"#111111"}' \
	-V 'dark={"bg":"#111111","fg":"#ffffff"}' \
	--default light \
	--type json
```

Supported value types are `boolean`, `string`, `number`, and `json`. If `--type` is omitted, Wrangler infers each value's scalar type independently.

All variations on a flag must use the same value type. Wrangler rejects a flag whose variations resolve to mixed types, for example one boolean and one number, before sending the request. Pass `--type` explicitly to coerce every variation to the same type.

Use `--description` (`-d`) to document the purpose of a flag:

```sh
wrangler flagship flags create <APP_ID> checkout-flow \
	-V v1=old-checkout \
	-V v2=new-checkout \
	--default v1 \
	--type string \
	--description "Controls which checkout experience is served"
```

Flag keys and variation names can contain letters, numbers, hyphens, and underscores. Keep keys stable, because application code evaluates flags by key.

### Disabled flags

Use `--disabled` to create a flag that serves its default variation until you enable it.

```sh
wrangler flagship flags create <APP_ID> coming-soon \
	-V on=true \
	-V off=false \
	--default off \
	--disabled
```

## Target users with rules

Targeting rules decide which variation to serve for a given evaluation context. Pass rules with `--rule` or `--rule-json`.

### Rule syntax

The compact `--rule` syntax uses semicolon-separated segments:

```txt
serve=<VARIATION>; when=<CONDITIONS>; rollout=<PERCENT>%@<ATTRIBUTE>; priority=<NUMBER>
```

| Segment  | Required | Description                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------- |
| serve    | Yes      | Variation served when the rule matches. Must reference an existing variation.                     |
| when     | No       | Conditions matched against evaluation context. If omitted, the rule matches every context.        |
| rollout  | No       | Percentage of matching traffic to receive the variation. The attribute controls sticky bucketing. |
| priority | No       | Evaluation order. Lower numbers run first. If omitted, Wrangler assigns priorities by order.      |

```sh
wrangler flagship flags create <APP_ID> premium-banner \
	-V on=true \
	-V off=false \
	--default off \
	--rule "serve=on; when=plan equals enterprise AND country in [US,CA]; rollout=25%@user_id"
```

### Conditions

Conditions compare attributes from the evaluation context with rule values. The compact syntax supports all [Flagship operators](https://developers.cloudflare.com/flagship/targeting/operators/):

```sh
--rule "serve=on; when=plan equals pro"
--rule "serve=on; when=country in [US,CA,UK]"
--rule "serve=off; when=email ends_with @example.com"
--rule "serve=strict; when=score less_than 20"
```

Use `AND` and `OR` to combine conditions. `AND` has higher precedence than `OR`.

```sh
# Both conditions must match.
--rule "serve=on; when=plan equals pro AND country equals US"

# Either condition can match.
--rule "serve=on; when=plan equals enterprise OR plan equals team"

# Equivalent to: (plan=pro AND country=US) OR plan=enterprise.
--rule "serve=on; when=plan equals pro AND country equals US OR plan equals enterprise"
```

`AND` and `OR` are reserved as logical operators when they appear outside quoted values or lists. Wrap values in single or double quotes when they contain reserved words or separators such as `AND`, `OR`, `;`, or `,`:

```sh
--rule 'serve=on; when=title equals "WAR AND PEACE" OR title equals "tom; jerry"'
--rule 'serve=on; when=country in ["US","CA"]'
```

For `in` and `not_in`, pass a bracketed list. Wrangler rejects malformed lists, empty list items, unterminated quotes, and unbalanced brackets before sending the request.

Use `--rule-json` for deeply nested logical groups or if you prefer to pass the API rule shape directly. Wrangler validates `--rule-json` against the Flagship rule schema and rejects unknown or conflicting fields.

```sh
wrangler flagship flags create <APP_ID> beta-features \
	-V on=true \
	-V off=false \
	--default off \
	--rule-json '{"serve_variation":"on","conditions":[{"logical_operator":"OR","clauses":[{"attribute":"beta","operator":"equals","value":true},{"attribute":"plan","operator":"equals","value":"enterprise"}]}]}'
```

### Multiple rules

Repeat `--rule` or `--rule-json` to declare multiple rules. Rules are evaluated in priority order. The first matching rule wins.

```sh
wrangler flagship flags create <APP_ID> rate-limit-tier \
	-V strict=50 \
	-V normal=200 \
	-V relaxed=1000 \
	--default normal \
	--type number \
	--rule "serve=strict; when=score less_than 20" \
	--rule "serve=relaxed; when=score greater_than_or_equals 90"
```

Wrangler validates duplicate rule priorities, duplicate variation names, malformed lists, non-finite numeric values such as `Infinity`, and unknown variation names before sending the request.

## Inspect flags

List flags in an app:

```sh
wrangler flagship flags list <APP_ID>
```

The list command is paginated. Use `--limit` and `--cursor` for manual pagination, or `--all` to fetch every page.

```sh
wrangler flagship flags list <APP_ID> --limit 50
wrangler flagship flags list <APP_ID> --cursor <CURSOR>
wrangler flagship flags list <APP_ID> --all
```

Inspect a full flag definition:

```sh
wrangler flagship flags get <APP_ID> new-checkout
```

`wrangler flagship flags ls` is an alias for `flags list`. `wrangler flagship flags inspect` is an alias for `flags get`.

## Update flags

`wrangler flagship flags update` reads the current flag, applies your changes, and writes the full flag definition back to the API.

### Update metadata and variations

```sh
wrangler flagship flags update <APP_ID> new-checkout \
	--description "Redesigned checkout experience"

wrangler flagship flags update <APP_ID> upload-limit \
	--set-variation team=500

wrangler flagship flags update <APP_ID> upload-limit \
	--remove-variation team
```

To add a variant to an existing flag, set a new variation name and value:

```sh
wrangler flagship flags update <APP_ID> checkout-flow \
	--set-variation experiment=new-checkout-v2
```

Pass an empty description to clear it:

```sh
wrangler flagship flags update <APP_ID> new-checkout --description ""
```

When you add or replace variations on an existing flag, use `--type` if Wrangler should coerce the new values to a specific type:

```sh
wrangler flagship flags update <APP_ID> upload-limit \
	--type number \
	--set-variation team=500
```

Wrangler validates that the resulting variation set still has a single value type and that the default variation and targeting rules still reference known variations.

You can also enable or disable a flag through `flags update`, although `flags enable` and `flags disable` are shorter for kill-switch workflows:

```sh
wrangler flagship flags update <APP_ID> new-checkout --disable
wrangler flagship flags update <APP_ID> new-checkout --enable
```

### Change the default variation

```sh
wrangler flagship flags set <APP_ID> checkout-flow --variation v2
```

Use `--clear-rules` if the new default should be served to everyone.

```sh
wrangler flagship flags set <APP_ID> checkout-flow --variation v2 --clear-rules
```

### Replace, append, or clear all rules

Use `--rule` or `--rule-json` to replace the full rule set:

```sh
wrangler flagship flags update <APP_ID> premium-banner \
	--rule "serve=on; when=plan equals pro AND country not_in [CN,RU]"
```

Use `--add-rule` or `--add-rule-json` to append rules without changing existing rules:

```sh
wrangler flagship flags update <APP_ID> premium-banner \
	--add-rule "serve=off; when=account_age less_than 7"

wrangler flagship flags update <APP_ID> premium-banner \
	--add-rule-json '{"serve_variation":"off","conditions":[{"attribute":"country","operator":"in","value":["CN","RU"]}]}'
```

Clear all rules:

```sh
wrangler flagship flags update <APP_ID> premium-banner --clear-rules
```

Note

Do not combine replacement flags (`--rule`, `--rule-json`) with append flags (`--add-rule`, `--add-rule-json`), or with `--clear-rules`, in the same command.

### List rules

Use `rules list` to see the priorities you can target with rule-specific commands:

```sh
wrangler flagship flags rules list <APP_ID> premium-banner
```

### Reorder rules

Flagship evaluates rules by ascending `priority`; the first matching rule wins. Use `rules reorder` to reorder existing rules without rewriting every condition.

Pass the existing priorities in the new order. Wrangler renumbers them to `1..n` in that order:

```sh
wrangler flagship flags rules reorder <APP_ID> rate-limit-tier --order 2,1
```

If the existing priorities were `1=strict` and `2=relaxed`, this makes `relaxed` priority `1` and `strict` priority `2`.

### Change one rule

Use `rules update` to edit one rule by priority while preserving the rest of the rule set.

Change only a rollout percentage:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--rollout 50%@user_id
```

Change the variation served by a rule:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--serve off
```

Change the conditions on a rule:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--when "plan equals enterprise OR plan equals team"
```

Remove conditions from a rule so it matches every evaluation context:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--clear-conditions
```

Caution

A rule with no conditions matches every evaluation context. Flagship requires unconditional rules to come after all rules that have conditions. If the rule you are clearing is not the last rule in the set, the API will reject the update with `Rules with empty conditions must come after rules with conditions`.

Use `rules reorder` first to move the rule to the last position, then clear its conditions. If you want to serve a single variation to everyone and discard all other rules, use `--clear-rules` on `flags set` instead.

Remove a rollout from a rule:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--clear-rollout
```

### Delete one rule

Use `rules delete` to remove one rule by priority:

```sh
wrangler flagship flags rules delete <APP_ID> premium-banner --priority 2
```

After deleting a rule, Wrangler renumbers the remaining rules so priorities stay contiguous.

## Run releases and kill switches

Note

After you change a flag, it can take up to 30 seconds for the updated value to reflect globally. During this propagation window, some evaluations may still return the previous flag value.

### Enable and disable

Disabling a flag is an immediate kill switch. A disabled flag ignores targeting rules and serves its default variation.

```sh
wrangler flagship flags disable <APP_ID> new-checkout
wrangler flagship flags enable <APP_ID> new-checkout
```

Enable or disable multiple flags in an app by passing the app ID followed by multiple keys:

```sh
wrangler flagship flags disable <APP_ID> new-checkout dark-mode premium-banner
wrangler flagship flags enable <APP_ID> new-checkout dark-mode premium-banner
```

### Roll out one variation

Use `rollout` to serve one variation to a percentage of traffic.

```sh
wrangler flagship flags rollout <APP_ID> new-checkout \
	--to on \
	--percentage 25 \
	--by user_id
```

Use `--from-variation` (alias `--from`) to choose the fallback variation for the remaining traffic. A rollout percentage of `0` removes the rollout rule and keeps the flag's current default variation unchanged.

`rollout` sends the percentage you provide directly to Flagship. For example, `--percentage 25 --to on` serves the `on` variation to 25% of bucketed traffic. The remaining traffic falls through to the flag's default variation.

### Split traffic across variations

Use `split` for A/B tests or multi-way traffic allocation. Wrangler converts weights into cumulative rollout thresholds.

```sh
wrangler flagship flags split <APP_ID> checkout-flow \
	--weight v1=80 \
	--weight v2=20 \
	--by user_id
```

`-w` is an alias for `--weight`. Each variation can only be weighted once, and weights must be finite, non-negative numbers.

Weights are relative. Wrangler totals the weights, converts each one into a percentage of the total, and sends cumulative thresholds to Flagship. For example, `--weight v1=80 --weight v2=20` sends two generated rules: one for `v1` with a rollout percentage of `80`, and one for `v2` with a rollout percentage of `100`. This creates bucket ranges of `0-80` for `v1` and `80-100` for `v2`.

With three weights, `--weight a=50 --weight b=30 --weight c=20` becomes cumulative thresholds of `50`, `80`, and `100`. Zero-weight variations are skipped.

Use `--default` with `split` to choose the fallback variation when bucketing cannot run:

```sh
wrangler flagship flags split <APP_ID> checkout-flow \
	--weight v1=80 \
	--weight v2=20 \
	--default v1 \
	--by user_id
```

Caution

`rollout` and `split` replace the flag's entire rule set with the rollout or split rules they generate. If the flag has other targeting rules built with `--rule`, `--rule-json`, `--add-rule`, or `rules update` (rules with real conditions, not just a previous rollout or split), Wrangler asks for confirmation before overwriting them. Pass `--force` (`-y`) to skip the prompt, or use `--json` with `--force` in scripts. Rules with no conditions, such as ones created by an earlier `rollout` or `split` call, are replaced without a prompt.

```sh
wrangler flagship flags rollout <APP_ID> new-checkout --to on --percentage 100 --force
```

## Evaluate flags

Evaluate a flag from the CLI to verify what a specific context receives.

```sh
wrangler flagship flags evaluate <APP_ID> new-checkout

wrangler flagship flags evaluate <APP_ID> new-checkout \
	--targeting-key user-42

wrangler flagship flags evaluate <APP_ID> premium-banner \
	--context plan=enterprise \
	--context country=US \
	--targeting-key user-99
```

Use `--targeting-key` for stable percentage rollout bucketing. Pass each context attribute with `--context name=value`. `wrangler flagship flags eval` is an alias for `flags evaluate`.

`--context` can be repeated. `--ctx` and `-C` are aliases:

```sh
wrangler flagship flags evaluate <APP_ID> premium-banner \
	-C plan=enterprise \
	-C country=US \
	--targeting-key user-99
```

Context values are sent to the evaluation endpoint as strings. Use the same attribute names that your targeting rules expect.

Evaluation output includes:

| Field   | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| value   | The flag value returned for the context.                                   |
| variant | The variation selected for the context.                                    |
| reason  | Why the value was returned: TARGETING\_MATCH, DEFAULT, DISABLED, or SPLIT. |

## Audit changes

Flagship records create, update, and delete events for each flag. View changelog history newest first:

```sh
wrangler flagship flags changelog <APP_ID> new-checkout
```

Use pagination controls for long histories:

```sh
wrangler flagship flags changelog <APP_ID> new-checkout --limit 10
wrangler flagship flags changelog <APP_ID> new-checkout --cursor <CURSOR>
wrangler flagship flags changelog <APP_ID> new-checkout --all
```

`wrangler flagship flags history` is an alias for `flags changelog`.

## Delete flags

```sh
wrangler flagship flags delete <APP_ID> coming-soon
```

Use `--force` or `-y` to skip the confirmation prompt. If you also use `--json`, you must pass `--force` so the confirmation prompt cannot appear in JSON output.

```sh
wrangler flagship flags delete <APP_ID> coming-soon --force
```

`wrangler flagship flags rm` is an alias for `flags delete`.

Delete multiple flags by passing the app ID followed by multiple keys:

```sh
wrangler flagship flags delete <APP_ID> coming-soon old-checkout temporary-banner --force
```

## Automate with JSON output

Every `wrangler flagship` command accepts `--json`. JSON output suppresses the Wrangler banner and is intended for scripts.

Delete commands require `--force` with `--json` to keep stdout valid JSON. `rollout` and `split` also require `--force` with `--json` if they would replace existing targeting rules that have conditions.

Bulk commands, such as `flags delete`, `flags enable`, and `flags disable`, continue processing remaining flags if one flag fails. In JSON mode, partial failures return a JSON error object containing successful `results` and per-flag `failures`.

Commands that can update `wrangler.json` or `wrangler.jsonc`, such as `apps create --binding`, do not prompt for or update configuration when `--json` is used.

Create an app, capture its ID, then create a flag:

```sh
APP_ID=$(wrangler flagship apps create checkout-service --json | jq -r '.id')

wrangler flagship flags create "$APP_ID" new-checkout --json
```

Delete several apps in a loop:

```sh
for app_id in <APP_ID_1> <APP_ID_2> <APP_ID_3>; do
	wrangler flagship apps delete "$app_id" --force
done
```

Or pass the app IDs directly:

```sh
wrangler flagship apps delete <APP_ID_1> <APP_ID_2> <APP_ID_3> --force
```

## Command reference

The following reference is generated from Wrangler's `flagship` command definitions.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Flagship docs","description":"Use wrangler flagship to create apps, manage feature flags, configure targeting rules, run rollouts, evaluate flags, and inspect changelog history.","url":"https://developers.cloudflare.com/flagship/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
