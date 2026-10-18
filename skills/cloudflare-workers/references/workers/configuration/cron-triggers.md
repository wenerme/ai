---
description: Enable your Worker to be executed on a schedule.
title: Cron Triggers
image: https://developers.cloudflare.com/workers/configuration/cron-triggers/og.png?v=b85b0c1fb54550ff
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cron Triggers

Last updated Oct 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/configuration/cron-triggers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

Cron Triggers allow users to map a cron expression to a Worker using a [`scheduled()` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) that enables Workers to be executed on a schedule.

Cron Triggers are ideal for running periodic jobs, such as for maintenance or calling third-party APIs to collect up-to-date data. Workers scheduled by Cron Triggers will run on underutilized machines to make the best use of Cloudflare's capacity and route traffic efficiently.

Note

Cron Triggers are also available directly in [Workflows](https://developers.cloudflare.com/workflows/) via `schedules` on the Workflow binding instead. Refer to [Trigger Workflows](https://developers.cloudflare.com/workflows/build/trigger-workflows/) for details, and use a Wrangler release that supports Workflow schedules.

Cron Triggers execute on UTC time.

## Add a Cron Trigger

### 1. Define a scheduled event listener

To respond to a Cron Trigger, you must add a [`"scheduled"` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) to your Worker.

```js
export default {
	async scheduled(controller, env, ctx) {
		console.log("cron processed");
	},
};
```

```ts
interface Env {}
export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		console.log("cron processed");
	},
};
```

```python
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def scheduled(self, controller, env, ctx):
        # All four parameters (self, controller, env, ctx) are required
        print("cron processed")
```

Refer to the following additional examples to write your code:

- [Setting Cron Triggers](https://developers.cloudflare.com/workers/examples/cron-trigger/)
- [Multiple Cron Triggers](https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/)

### 2. Update configuration

Cron Trigger changes take time to propagate.

Changes such as adding a new Cron Trigger, updating an old Cron Trigger, or deleting a Cron Trigger may take several minutes (up to 15 minutes) to propagate to the Cloudflare global network.

After you have updated your Worker code to include a `"scheduled"` event, you must update your Worker project configuration.

#### Via cloudflare.config.ts

For projects managed with the [Cloudflare CLI](https://developers.cloudflare.com/cf/), add `triggers.scheduled()` entries to `worker.triggers` in [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/#declare-triggers):

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig, triggers } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#cron-triggers-config-defineconfig">Link to defineConfig</a>

<code>defineConfig&lt;T extends ConfigInput&lt;CloudflareConfig&gt;&gt;(config: T): T;</code>

Defines the default export of <code>cloudflare.config.ts</code>. Pass a configuration object, a promise that resolves to one, or a function that receives the config context (<code>isPreview</code> and <code>mode</code>) and returns either.

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>accountId?: string</code></dt>
<dd>This is the ID of the account associated with your zone. It can also be specified through the <code>CLOUDFLARE_ACCOUNT_ID</code> environment variable.</dd>

<dt><code>complianceRegion?: "public" | "fedramp-high"</code></dt>
<dd>The compliance boundary in which commands should operate. When omitted, this can be supplied through <code>CLOUDFLARE_COMPLIANCE_REGION</code>.</dd>

<dt><code>worker?: ConfigInput&lt;WorkerConfig&gt;</code></dt>
<dd>The Worker defined by this configuration.</dd>

<dt><code>containers?: ConfigInput&lt;ContainerConfig&gt;[]</code></dt>
<dd>Container applications defined by this configuration.</dd></dl></details>



</details>

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#cron-triggers-config-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "my-worker", (name reference)</summary>



<code>name</code>Required<a href="#cron-triggers-config-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#cron-triggers-config-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#cron-triggers-config-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>triggers: [triggers.scheduled({ schedule: "0 * * * *" })], (triggers, scheduled, schedule reference)</summary>



<code>triggers</code>Optional<a href="#cron-triggers-config-workerconfig-triggers">Link to triggers</a>

<code>triggers?: Trigger[]</code>

Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a>

<code>scheduled</code>Builder<a href="#cron-triggers-config-workerconfig-triggers">Link to scheduled</a>

<code>scheduled(options: ScheduledTriggerOptions): ScheduledTrigger;</code>

Scheduled (cron) trigger — invokes this Worker on the given schedules. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>schedule: string</code></dt>
<dd>A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a></dd>

</dl></details>



<code>schedule</code>Required<a href="#cron-triggers-config-workerconfig-triggers">Link to schedule</a>

<code>schedule: string</code>

A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

</details>

},

});

Run `cf dev` to test the handler locally. Run `cf deploy` to deploy the configured schedule.

#### Via the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)

If a Worker is managed with Wrangler, Cron Triggers should be exclusively managed through the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

Refer to the example below for a Cron Triggers configuration:

```jsonc
{
	"triggers": {
		// Schedule cron triggers:
		// - At every 3rd minute
		// - At 15:00 (UTC) on first day of the month
		// - At 23:59 (UTC) on the last weekday of the month
		"crons": [
			"*/3 * * * *",
			"0 15 1 * *",
			"59 23 LW * *"
		]
	}
}
```

```toml
[triggers]
crons = [ "*/3 * * * *", "0 15 1 * *", "59 23 LW * *" ]
```

You also can set a different Cron Trigger for each [environment](https://developers.cloudflare.com/workers/wrangler/environments/) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). You need to put the `triggers` array under your chosen environment. For example:

```jsonc
{
	"env": {
		"dev": {
			"triggers": {
				"crons": [
					"0 * * * *"
				]
			}
		}
	}
}
```

```toml
[env.dev.triggers]
crons = [ "0 * * * *" ]
```

#### Via the dashboard

To add Cron Triggers in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker > **Settings** > **Triggers** > **Cron Triggers**.

## Supported cron expressions

Cloudflare supports cron expressions with five fields, along with most [Quartz scheduler ↗︎](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#introduction)-like cron syntax extensions:

| Field | Values | Characters |
| --- | --- | --- |
| Minute | 0-59 | \* , - / |
| Hours | 0-23 | \* , - / |
| Days of Month | 1-31 | \* , - / L W |
| Months | 1-12, case-insensitive 3-letter abbreviations ("JAN", "aug", etc.) | \* , - / |
| Weekdays | 1-7, case-insensitive 3-letter abbreviations ("MON", "fri", etc.) | \* , - / L # |

Note

Days of the week go from 1 = Sunday to 7 = Saturday, which is different on some other cron systems (where 0 = Sunday and 6 = Saturday). To avoid ambiguity you may prefer to use the three-letter abbreviations (e.g. `SUN` rather than 1).

### Examples

Some common time intervals that may be useful for setting up your Cron Trigger:

- `* * * * *`
  - At every minute
- `*/30 * * * *`
  - At every 30th minute
- `45 * * * *`
  - On the 45th minute of every hour
- `0 17 * * sun` or `0 17 * * 1`
  - 17:00 (UTC) on Sunday
- `10 7 * * mon-fri` or `10 7 * * 2-6`
  - 07:10 (UTC) on weekdays
- `0 15 1 * *`
  - 15:00 (UTC) on first day of the month
- `0 18 * * 6L` or `0 18 * * friL`
  - 18:00 (UTC) on the last Friday of the month
- `59 23 LW * *`
  - 23:59 (UTC) on the last weekday of the month

## Test Cron Triggers locally

Use [`cf dev`](https://developers.cloudflare.com/cf/projects/#start-development), [`wrangler dev`](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev), or the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) to test Cron Triggers locally. You can use Local Explorer or send an HTTP request.

Cron Trigger testing in Local Explorer requires Wrangler 4.139.0 or later, or Cloudflare Vite plugin 1.60.0 or later. These requirements also apply to the development server started by `cf dev`.

### Use Local Explorer

[Local Explorer](https://developers.cloudflare.com/workers/local-development/local-explorer/) displays the exact Cron Triggers configured for the active environment. It can also test ad hoc expressions without changing your configuration.

To test a configured expression, define at least one Cron Trigger for the active environment. You can test an ad hoc expression without configuring one.

1. [Open Local Explorer](https://developers.cloudflare.com/workers/local-development/local-explorer/#open-local-explorer) and select the Worker you want to test.
2. Select **Cron Triggers** > **Configured Crons**.
3. Select *Now* or add a scheduled time preset.
4. Select **Trigger** next to the expression you want to test.
5. Review the handler outcome, `noRetry()` status, dispatched expression, and scheduled time.

Full invocation logs are available in the development session that owns the Worker. That session must have **Observability** turned on.

Each invocation is a one-off local test. Local development does not run Cron Triggers automatically.

To test an expression that is not configured, select **Cron Triggers** > **Ad-Hoc Triggers**. Ad hoc triggers stay in your browser and do not modify deployed Cron Triggers.

### Use an HTTP request

Your local development server exposes two endpoints for scheduled invocations. The following examples use port `8787`. Use the port printed by your development server, including when you start it with `cf dev`. Vite uses port `5173` by default.

#### Use the scheduled route

Send a request to `/cdn-cgi/local/scheduled` to invoke a scheduled handler.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled"
```

By default, the endpoint returns the scheduled handler outcome as text. To return the structured scheduled handler result as JSON, pass `?format=json`.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled?format=json"
```

```json
{
  "outcome": "ok",
  "noRetry": false
}
```

The `noRetry` field is `true` when the scheduled handler calls `controller.noRetry()`.

To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*"
```

Optionally, you can also pass a `time` query parameter to override `controller.scheduledTime` in your scheduled event listener.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*&time=1745856238000"
```

#### Use the Local Explorer API

To target an exact Worker available to Local Explorer, send a `POST` request to `/cdn-cgi/local/explorer/api/local/scheduled?worker=<WORKER_NAME>`. The `worker` query parameter must match the exact Worker name. To find available Worker names, send a `GET` request to `/cdn-cgi/local/explorer/api/local/workers`.

The JSON body requires a non-empty `cron` field. The optional `scheduled_time` field sets `controller.scheduledTime` using epoch milliseconds. If omitted, it defaults to the current time.

```sh
curl -X POST \
  "http://localhost:8787/cdn-cgi/local/explorer/api/local/scheduled?worker=my-worker" \
  -H "Content-Type: application/json" \
  --data '{"cron":"0 * * * *","scheduled_time":1745856238000}'
```

The response uses the Local Explorer API envelope. Its `result` includes the handler `outcome` and `noRetry` value. A successful API request does not necessarily mean the handler succeeded. Check `result.outcome` for the invocation result.

## View past events

To view the execution history of Cron Triggers, view **Cron Events**:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your **Worker**.
3. Select **Settings**.
4. Under **Trigger Events**, select **View events**.

Cron Events stores the 100 most recent invocations of the Cron scheduled event. [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs) also records invocation logs for the Cron Trigger with a longer retention period and a filter & query interface. If you are interested in an API to access Cron Events, use Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api).

Note

It can take up to 30 minutes before events are displayed in **Past Cron Events** when creating a new Worker or changing a Worker's name.

Refer to [Metrics and Analytics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/) for more information.

## Remove a Cron Trigger

### Via the dashboard

To delete a Cron Trigger on a deployed Worker via the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Go to **Triggers** > select the three dot icon next to the Cron Trigger you want to remove > **Delete**.

#### Via the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)

If a Worker is managed with Wrangler, Cron Triggers should be exclusively managed through the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

When deploying a Worker with Wrangler any previous Cron Triggers are replaced with those specified in the `triggers` array.

- If the `crons` property is an empty array then all the Cron Triggers are removed.
- If the `triggers` or `crons` property are `undefined` then the currently deploy Cron Triggers are left in-place.

```jsonc
{
	"triggers": {
		// Remove all cron triggers:
		"crons": []
	}
}
```

```toml
[triggers]
crons = [ ]
```

## Limits

Refer to [Workers limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) for the maximum number of Cron Triggers per account.

## Green Compute

With Green Compute enabled, your Cron Triggers will only run on Cloudflare points of presence that are located in data centers that are powered purely by renewable energy. Organizations may claim that they are powered by 100 percent renewable energy if they have procured sufficient renewable energy to account for their overall energy use.

Renewable energy can be purchased in a number of ways, including through on-site generation (wind turbines, solar panels), directly from renewable energy producers through contractual agreements called Power Purchase Agreements (PPA), or in the form of Renewable Energy Credits (REC, IRECs, GoOs) from an energy credit market.

Green Compute can be configured at the account level:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In the **Account details** section, find **Compute Setting**.
3. Select **Change**.
4. Select **Green Compute**.
5. Select **Confirm**.

## Related resources

- [Triggers](https://developers.cloudflare.com/workers/wrangler/configuration/#triggers) - Review Wrangler configuration file syntax for Cron Triggers.
- Learn how to access Cron Triggers in [ES modules syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) for an optimized experience.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/cron-triggers/#page","headline":"Cron Triggers","description":"Enable your Worker to be executed on a schedule.","url":"https://developers.cloudflare.com/workers/configuration/cron-triggers/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/configuration/cron-triggers/og.png?v=b85b0c1fb54550ff","dateModified":"2026-10-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
