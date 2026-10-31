---
description: Configure a Durable Object code update strategy to give active objects time to finish work before applying new code.
title: Durable Objects code updates
image: https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/og.png?v=5d33cc7d68c763f3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

# Durable Objects code updates

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

By default, Durable Objects defer code updates for up to 300 seconds (5 minutes) to give in-flight requests time to finish. An active object can keep running its current code until it hibernates or reaches this delay. Deferral is best effort and does not guarantee that every operation finishes.

Deploy a Worker with `--durable-objects-code-update-mode immediate` to apply a code update right away instead of waiting. For more information on when an object hibernates, refer to [Lifecycle of a Durable Object](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/).

## Code update strategy

| Mode | Default `max_delay` | Behavior |
| --- | --- | --- |
| `deferred` | 300 seconds (5 minutes) | An active Durable Object can continue running its current code until it hibernates. If it is still active when `max_delay` is reached (86400 seconds maximum), the object resets and adopts the new code. |
| `immediate` | Not applicable | An active Durable Object resets and adopts the new code immediately, without waiting to hibernate. |

`deferred` with a 300-second `max_delay` is the default code update strategy. No configuration is required to use this default.

An explicit `code_update_strategy` — whether in your Wrangler configuration, passed as a CLI flag, or sent through the REST API — always overrides the default.

## How it works

1. You deploy a new version to 100% of traffic.
2. A client makes a request to a Durable Object that is not running. This uses the latest version of your code.
3. If a Durable Object is active with a `deferred` code update strategy, it can keep running its existing version and accepting new requests while it waits to hibernate. If the object hibernates before `max_delay` is reached, it starts on the new version on the next request.
4. If the object is still active when `max_delay` is reached, it resets and adopts the new code.

```
flowchart TD
    A["You deploy a new version"] --> B{"Is the Durable Object<br/>currently running?"}
    B -->|Inactive| C["Starts on the new version<br/>on the next request"]
    B -->|Active| D{"code_update_strategy<br/>mode?"}
    D -->|immediate| E["The object resets and<br/>adopts the new code"]
    D -->|deferred| F["Starts a max_delay timer,<br/>keeps running its current version"]
    F --> G{"Hibernates before<br/>max_delay timer ends?"}
    G -->|Yes| H["Starts on new version<br/>on next request"]
    G -->|"No"| E

```

For each active Durable Object, consecutive Worker deployments have the following behavior:

- Each deployment starts a separate `max_delay` timer for that object.
- When the first timer expires, the object resets and adopts the latest deployed version, not necessarily the version that started that timer.

For example, consider an active Durable Object. You deploy version A with `max_delay: 30`, starting a 30-second timer for that object. Ten seconds later, you deploy version B with `max_delay: 60`, starting a separate 60-second timer for the same object. Version A's timer expires first, at the 30-second mark. When it expires, the object resets and adopts version B, the latest deployed version. If the object hibernates before either timer expires, it starts on the latest deployed version on the next request.

```
flowchart LR
    A["Deploy version A<br/>max_delay: 30s"] --> B["Timer A:<br/>expires in 30s"]
    C["Deploy version B<br/>10s later<br/>max_delay: 60s"] --> D["Timer B:<br/>expires in 60s"]
    B --> E["Timer A expires first"]
    D -.->|"superseded, never expires"| E
    E --> F["The object resets and<br/>adopts version B,<br/>the latest deployed version"]

```

This means an `immediate` deploy always forces the update right away, even while an earlier `deferred` deploy's timer is still running, and it might skip versions you deployed in between.

## Configure a code update strategy

Set `code_update_strategy` for a deployment through your Wrangler configuration, the CLI flag, or the REST API. Wrangler supplies the configured strategy each time you deploy. The strategy does not carry over between deployments: a later deployment that omits it uses the default strategy.

`code_update_strategy` applies to every Durable Object class this Worker exports — you cannot set a different strategy for one class than another in the same Worker. This includes classes exported through [`ctx.exports`](https://developers.cloudflare.com/workers/runtime-apis/context/#exports) without an explicit `bindings` entry.

If a Durable Objects binding uses `script_name` to reference a class defined in a different Worker, that class's code updates are controlled by that other Worker's own `code_update_strategy`, not the Worker with the binding.

### Options

| `code_update_strategy` | Result |
| --- | --- |
| *(omitted)* | Defaults to `deferred` with a 300-second `max_delay`. |
| `{ "mode": "deferred" }` | Uses the default `max_delay` of 300 seconds (5 minutes). |
| `{ "mode": "deferred", "max_delay": 0 }` | Applies the update immediately. |
| `{ "mode": "deferred", "max_delay": 120 }` | The code update is deferred for up to 120 seconds to give the object time to hibernate. |
| `{ "mode": "immediate" }` | The object adopts the new code immediately, without waiting to hibernate. |
| `{ "mode": "immediate", "max_delay": 60 }` | The REST API returns an error. Wrangler silently drops `max_delay`; the object adopts the new code immediately. |

### Wrangler

Add `code_update_strategy` alongside `bindings` in the `durable_objects` object of your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects):

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"name": "CHAT_ROOM",
				"class_name": "ChatRoom",
			},
		],
		"code_update_strategy": {
			"mode": "deferred",
			"max_delay": 60,
		},
	},
}
```

```toml
[[durable_objects.bindings]]
name = "CHAT_ROOM"
class_name = "ChatRoom"

[durable_objects.code_update_strategy]
mode = "deferred"
max_delay = 60
```

`max_delay` is in seconds and only applies when `mode` is `deferred`. It accepts values from `0` to `86400` (24 hours), with millisecond precision, such as `45.678`. Omit `max_delay` to use the default of `300` seconds (5 minutes).

If you're using [`ctx.exports`](https://developers.cloudflare.com/workers/runtime-apis/context/#exports) and don't need an explicit `bindings` entry, `code_update_strategy` still applies on its own:

```jsonc
{
	"durable_objects": {
		"code_update_strategy": {
			"mode": "deferred",
			"max_delay": 60,
		},
	},
}
```

```toml
[durable_objects.code_update_strategy]
mode = "deferred"
max_delay = 60
```

### REST

Add `code_update_strategy` to a [Create deployment](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/methods/create/) request. This field belongs to the deployment, not the Worker version:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "strategy": "percentage",
    "versions": [
      {
        "version_id": "f3b5b2d2-75d6-4c3f-ae3d-4df2f9cfeb7a",
        "percentage": 100
      }
    ],
    "code_update_strategy": {
      "mode": "deferred",
      "max_delay": 60
    }
  }'
```

`code_update_strategy` is write-only. Create, get, and list deployment responses do not include it.

### Set strategy for a single deployment

Pass `--durable-objects-code-update-mode` to `wrangler deploy`, `wrangler versions deploy`, or `wrangler rollback` to replace the entire configured strategy for a single deployment. The flag accepts `immediate` or `deferred <duration>`. A duration is required with `deferred`:

npmyarnpnpm

```
npx wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode immediate
```

```
yarn wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode immediate
```

```
pnpm wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode immediate
```

npmyarnpnpm

```
npx wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode deferred 30s
```

```
yarn wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode deferred 30s
```

```
pnpm wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode deferred 30s
```

Wrangler selects the entire code update strategy in this order:

1. The `--durable-objects-code-update-mode` flag, including its duration when `deferred`.
2. `durable_objects.code_update_strategy` in your Wrangler configuration.
3. The default: `{ "mode": "deferred", "max_delay": 300 }`.

For a `deferred` strategy in your Wrangler configuration, omitting `max_delay` uses `300` seconds. Setting `max_delay` to `0` applies the update immediately. Flag values do not inherit `max_delay` from the configuration file.

A single-deployment override is most useful when waiting is worse than resetting. For example, set `code_update_strategy` to `{ "mode": "immediate" }` (or pass `--durable-objects-code-update-mode immediate`) when:

- You need to ship a correctness or security fix immediately, even if it interrupts active objects.
- Some of your objects rarely or never hibernate, and you need to force them onto new code, or reduce their duration costs, without waiting.

## Gradual deployments

During a [gradual deployment](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/with-durable-objects/), Cloudflare assigns each Durable Object to one of the versions in the deployment. Increasing a version's traffic percentage assigns more objects to that version. Only the newly assigned objects follow the mechanism described in [How it works](https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/#how-it-works) above — for example, increasing a version's traffic percentage from 20% to 50% starts a `max_delay` wait only for the additional 30% of objects newly assigned to it. Objects that already run that version are not affected.

Keep your Worker and Durable Object code forward and backward compatible for as long as any version might still be running, not just for the length of the deployment. Refer to [Code updates](https://developers.cloudflare.com/durable-objects/platform/known-issues/#code-updates).

## Limitations

- A `deferred` code update strategy is best effort. Cloudflare does not guarantee that every operation finishes or that an object keeps running its current code for the entire `max_delay`.
- A code update strategy does not delay restarts unrelated to code updates, such as Workers runtime updates.

## Related resources

- [Lifecycle of a Durable Object](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/)
- [Gradual deployments with Durable Objects](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/with-durable-objects/)
- [Code updates](https://developers.cloudflare.com/durable-objects/platform/known-issues/#code-updates)
- [Troubleshoot Durable Object resets](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/#durable-object-reset-because-its-code-was-updated)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/#page","headline":"Durable Objects code updates","description":"Configure a Durable Object code update strategy to give active objects time to finish work before applying new code.","url":"https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/","inLanguage":"en","image":"https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/og.png?v=5d33cc7d68c763f3","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
