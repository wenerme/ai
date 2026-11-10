---
description: Cap how many instances of a single Workflow run at the same time, and learn how per-Workflow limits interact with your account's concurrency limit.
title: Concurrency limits
image: https://developers.cloudflare.com/workflows/build/concurrency-limits/og.png?v=12eb5d7570954de1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Concurrency limits

Last updated Nov 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workflows/build/concurrency-limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Per-Workflow concurrency limits

By default, instances of a Workflow can run concurrently up to your account's [concurrency limit](https://developers.cloudflare.com/workflows/reference/limits/), which is shared by every Workflow in the account. A per-Workflow concurrency limit caps how many instances of a single Workflow run at the same time. Instances above the limit are not rejected. They are queued and start automatically as running instances finish.

Use a per-Workflow concurrency limit to:

- Protect a downstream dependency, such as a database or third-party API, that degrades or rate limits past a certain number of concurrent requests.
- Spread bursts of expensive calls over time, instead of making them all at once.
- Stop one high-volume Workflow from using all of your account's concurrency and delaying instances of your other Workflows.

### Set a per-Workflow concurrency limit

Configure `limit` within the `concurrency` property of your Workflow definition in your Wrangler configuration, then deploy your Worker:

```jsonc
{
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"concurrency": {
				"limit": 10,
			},
		},
	],
}
```

```toml
[[workflows]]
name = "my-workflow"
binding = "MY_WORKFLOW"
class_name = "MyWorkflow"

  [workflows.concurrency]
  limit = 10
```

With this configuration, no more than 10 instances of `MyWorkflow` run at once, no matter how many you create.

You can also set `concurrency` on a Workflow declared in [`exports`](https://developers.cloudflare.com/workflows/build/workers-api/#declare-workflows-in-exports). For all the fields, refer to the [Wrangler configuration reference](https://developers.cloudflare.com/workers/wrangler/configuration/#workflows).

`limit` must be a positive integer, and cannot be higher than your account's concurrency limit. A Workflow's concurrency limit can only make it more restrictive. It does not raise your account limit.

When you choose a limit, count instances that sleep or retry briefly as using a slot while they wait.

Concurrency limits require Wrangler 4.127.0 or above.

Note

`concurrency` cannot be combined with `script_name`. If you bind to a Workflow defined in another Worker, set `concurrency` on the Worker that defines the Workflow.

Concurrency limits are not applied in local development.

### How per-Workflow concurrency limits are applied

- **Instances above the limit are queued, not rejected.** They have the `queued` [status](https://developers.cloudflare.com/workflows/build/workers-api/#instancestatus) and start automatically as running instances finish. Queued instances start in the order they were queued, on a best-effort basis.
- **`waiting` and `paused` instances do not count towards the limit.** An instance that sleeps, waits to retry a step, or waits for an event with `step.waitForEvent` moves to the `waiting` status and frees its slot, but not immediately. During short waits, the instance stays `running` and keeps its slot. `paused` instances do not count either. Instances that are `running`, finishing their current work before pausing ( `waitingForPause`), or running rollback handlers count towards the limit. When a `waiting` or `paused` instance is ready to continue, it is queued again if your account or the Workflow is at its limit.
- **Both limits apply.** An instance starts only when your account and the Workflow both have capacity. If your account is at its concurrency limit, instances are queued even if the Workflow is below its own limit.
- **Limits are caps, not reservations.** The concurrency limits of your Workflows can add up to more than your account limit. Setting a limit does not reserve capacity for a Workflow. To leave capacity for an important Workflow, set limits on your other Workflows so they cannot use all of your account's concurrency.
- **Lowering the limit does not stop running instances.** If more instances than the new limit are already running, they continue to completion. No new instance of the Workflow starts until the number of running instances drops below the new limit.
- **Workflows without a limit are not affected.** Only your account's concurrency limit applies to them.
- **Instances created by `schedules` are not held back during their cron concurrency budget.** On Workers Paid, an instance created by a [cron schedule](https://developers.cloudflare.com/workflows/build/trigger-workflows/#schedule-a-workflow-directly) is not held back by the limit and does not use a slot for up to one hour per firing, so it can run even when the Workflow is at its limit. After that budget is used, the instance yields and is queued until both your account and the Workflow have a free slot.

### Change or remove a per-Workflow concurrency limit

To change the limit, update `concurrency.limit` and redeploy your Worker.

To remove the limit, remove `concurrency` from your Wrangler configuration and run `wrangler deploy`.

Caution

Each deploy sets the limit from your configuration. Keep `concurrency.limit` in your configuration on every deploy. If you deploy without it, the Workflow's concurrency limit is removed.

## Related resources

- [Workflow limits](https://developers.cloudflare.com/workflows/reference/limits/): account-level concurrency and other limits.
- [Metrics and analytics](https://developers.cloudflare.com/workflows/observability/metrics-analytics/): track `WORKFLOW_QUEUED` events to see when instances are waiting for capacity.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/concurrency-limits/#page","headline":"Concurrency limits","description":"Cap how many instances of a single Workflow run at the same time, and learn how per-Workflow limits interact with your account's concurrency limit.","url":"https://developers.cloudflare.com/workflows/build/concurrency-limits/","inLanguage":"en","image":"https://developers.cloudflare.com/workflows/build/concurrency-limits/og.png?v=12eb5d7570954de1","dateModified":"2026-11-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
