---
description: Schedule delayed, dated, cron, and interval callbacks on an Agent with this.schedule(), and keep an Agent alive during long work.
title: Schedule tasks
image: https://developers.cloudflare.com/agents/agent-class/schedule-tasks/og.png?v=dc9be7068b6b2c24
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Schedule tasks

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/agent-class/schedule-tasks/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `Agent` class installs the [`Scheduler` capability](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/). Its scheduling methods call the scheduler, and a callback name is the name of a method on your Agent. Schedules are stored in SQLite and run from the Lifecycle's job queue, so they survive restarts and evictions. For schedule options, retries, limits, and natural-language parsing, refer to the [`Scheduler` capability](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/).

## Schedule a callback

```js
import { Agent } from "agents";

export class ReminderAgent extends Agent {
	async onStart() {
		// Recurring schedules are idempotent, so this adds one row however often the Agent starts.
		await this.schedule("0 8 * * *", "dailyDigest");
	}

	async remindLater(message) {
		await this.schedule(30, "sendReminder", { message }); // in 30 seconds
		await this.schedule(new Date("2026-12-01T09:00:00Z"), "sendReminder", {
			message,
		});
		await this.scheduleEvery(300, "checkInbox"); // every 5 minutes
	}

	async sendReminder(payload) {
		console.log(payload.message);
	}

	async dailyDigest() {}

	async checkInbox() {}
}
```

```ts
import { Agent } from "agents";

export class ReminderAgent extends Agent<Env> {
	async onStart() {
		// Recurring schedules are idempotent, so this adds one row however often the Agent starts.
		await this.schedule("0 8 * * *", "dailyDigest");
	}

	async remindLater(message: string) {
		await this.schedule(30, "sendReminder", { message }); // in 30 seconds
		await this.schedule(new Date("2026-12-01T09:00:00Z"), "sendReminder", {
			message,
		});
		await this.scheduleEvery(300, "checkInbox"); // every 5 minutes
	}

	async sendReminder(payload: { message: string }) {
		console.log(payload.message);
	}

	async dailyDigest() {}

	async checkInbox() {}
}
```

## Agent methods

| Agent method | Scheduler equivalent |
| --- | --- |
| `schedule(when, callback, payload?, options?)` | `scheduler.set()` |
| `scheduleEvery(intervalSeconds, callback, payload?, options?)` | `scheduler.every()` |
| `getScheduleById(id)` | `scheduler.get()` |
| `listSchedules(criteria?)` | `scheduler.list()` |
| `cancelSchedule(id)` | `scheduler.cancel()` |

`when` is a delay in seconds, a `Date`, or a cron string. `callback` must name a method on the Agent. `getSchedule()` and `getSchedules()` are deprecated synchronous versions of `getScheduleById()` and `listSchedules()`.

## Keeping the agent alive

An idle Durable Object is evicted after about 70 to 140 seconds without requests, messages, or alarms. Work in flight at that moment stops. `keepAliveWhile()` holds a heartbeat on the shared alarm while a function runs, and releases it when the function settles:

```js
import { Agent } from "agents";

export class ReportAgent extends Agent {
	async buildReport() {
		return this.keepAliveWhile(async () => {
			// Long work that must not be interrupted by idle eviction.
			return "done";
		});
	}
}
```

```ts
import { Agent } from "agents";

export class ReportAgent extends Agent<Env> {
	async buildReport() {
		return this.keepAliveWhile(async () => {
			// Long work that must not be interrupted by idle eviction.
			return "done";
		});
	}
}
```

`keepAlive()` returns a disposer instead, for work that does not fit one function. Always call the disposer. `AIChatAgent` keeps itself alive while it streams a reply. Scheduled callbacks and Workflows do not need it.

A heartbeat only prevents idle eviction. A deploy or crash still stops the work, so schedule a job or use a [Workflow](https://developers.cloudflare.com/agents/agent-class/run-workflows/) for work that must finish.

## Next steps

### [Scheduler capability](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/)

Schedule options, retries, limits, and parsing schedules from natural language.

### [Queue tasks](https://developers.cloudflare.com/agents/agent-class/queue-tasks/)

Run background work one item at a time.

### [Run Workflows](https://developers.cloudflare.com/agents/agent-class/run-workflows/)

Durable multi-step work with retries.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/agent-class/schedule-tasks/#page","headline":"Schedule tasks","description":"Schedule delayed, dated, cron, and interval callbacks on an Agent with this.schedule(), and keep an Agent alive during long work.","url":"https://developers.cloudflare.com/agents/agent-class/schedule-tasks/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/agent-class/schedule-tasks/og.png?v=dc9be7068b6b2c24","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
