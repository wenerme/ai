---
description: Test routes, dispatch events, control Workflows, and assert logged behavior with createTestHarness.
title: Interact with Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Interact with Workers

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/test-harness/interact-with-workers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the test harness to send requests through configured routes or target a specific Worker directly. You can also dispatch events like scheduled events.

## Test route dispatch across Workers

When a test harness runs multiple Workers, add each Worker to the `workers` array. The first Worker is the primary Worker. `server.fetch()` sends relative URLs to the primary Worker and matches absolute URLs against configured routes. If no route matches, it falls back to the primary Worker:

```js
const server = createTestHarness({
	workers: [
		/** Includes `"routes": ["example.com/*"]` */
		{ configPath: "./workers/web/wrangler.jsonc" },
		/** Includes `"routes": ["api.example.com/v1/*"]` */
		{ configPath: "./workers/api/wrangler.jsonc" },
	],
});

const primaryResponse = await server.fetch("/");
const apiResponse = await server.fetch("http://api.example.com/v1/users/123");
const webResponse = await server.fetch("http://example.com/users/123");
```

```ts
const server = createTestHarness({
	workers: [
		/** Includes `"routes": ["example.com/*"]` */
		{ configPath: "./workers/web/wrangler.jsonc" },
		/** Includes `"routes": ["api.example.com/v1/*"]` */
		{ configPath: "./workers/api/wrangler.jsonc" },
	],
});

const primaryResponse = await server.fetch("/");
const apiResponse = await server.fetch("http://api.example.com/v1/users/123");
const webResponse = await server.fetch("http://example.com/users/123");
```

## Interact with a specific Worker

Route dispatch tests the application boundary, but some tests might want to target one Worker or trigger other event handlers. Use `server.getWorker(name)` to bypass route matching and get a handle for that Worker.

You can then use this Worker handle to send requests directly or dispatch other events, such as `scheduled()`:

```js
const apiWorker = server.getWorker("api-worker");
const response = await apiWorker.fetch("http://api.example.com/v1/users/123");

await apiWorker.scheduled({
	cron: "0 0 * * *",
	scheduledTime: new Date(),
});
```

```ts
const apiWorker = server.getWorker("api-worker");
const response = await apiWorker.fetch("http://api.example.com/v1/users/123");

await apiWorker.scheduled({
	cron: "0 0 * * *",
	scheduledTime: new Date(),
});
```

## Assert logged behavior

The test harness captures logs from the Workers runtime. To assert that a Worker logged a specific message, use `server.getLogs()` to retrieve the log entries.

Captured logs are reset when you call `server.reset()`. You can also call `server.clearLogs()` to isolate logs before and after a specific action:

```js
test("logs scheduled job results", async ({ expect }) => {
	const apiWorker = server.getWorker("api-worker");

	await apiWorker.scheduled({
		cron: "0 0 * * *",
		scheduledTime: new Date("2026-05-29T00:00:00.000Z"),
	});

	expect(server.getLogs()).toEqual([
		expect.objectContaining({
			level: "info",
			message: "Generated daily report for 2026-05-29",
		}),
	]);

	server.clearLogs();

	await apiWorker.scheduled({
		cron: "0 0 * * *",
		scheduledTime: new Date("2026-05-30T00:00:00.000Z"),
	});

	expect(server.getLogs()).toEqual([
		expect.objectContaining({
			level: "info",
			message: "Generated daily report for 2026-05-30",
		}),
	]);
});
```

```ts
test("logs scheduled job results", async ({ expect }) => {
	const apiWorker = server.getWorker("api-worker");

	await apiWorker.scheduled({
		cron: "0 0 * * *",
		scheduledTime: new Date("2026-05-29T00:00:00.000Z"),
	});

	expect(server.getLogs()).toEqual([
		expect.objectContaining({
			level: "info",
			message: "Generated daily report for 2026-05-29",
		}),
	]);

	server.clearLogs();

	await apiWorker.scheduled({
		cron: "0 0 * * *",
		scheduledTime: new Date("2026-05-30T00:00:00.000Z"),
	});

	expect(server.getLogs()).toEqual([
		expect.objectContaining({
			level: "info",
			message: "Generated daily report for 2026-05-30",
		}),
	]);
});
```

## Inspect and control Workflow execution

If your Worker starts a Workflow, you can use `worker.introspectWorkflow(bindingName)` to control new instances and inspect their state.

```js
const worker = server.getWorker("api-worker");
await using workflow = await worker.introspectWorkflow("MY_WORKFLOW");

await workflow.modifyAll(async (modifier) => {
	await modifier.disableSleeps([{ name: "wait-for-approval" }]);
});

await worker.fetch("/start-workflow");

const [instance] = await workflow.get();
await instance.waitForStatus("complete");
expect(await instance.getOutput()).toEqual({ approved: true });
```

```ts
const worker = server.getWorker<ApiEnv>("api-worker");
await using workflow = await worker.introspectWorkflow("MY_WORKFLOW");

await workflow.modifyAll(async (modifier) => {
	await modifier.disableSleeps([{ name: "wait-for-approval" }]);
});

await worker.fetch("/start-workflow");

const [instance] = await workflow.get();
await instance.waitForStatus("complete");
expect(await instance.getOutput()).toEqual({ approved: true });
```

If the test already knows the instance ID, you can also introspect that instance directly with `worker.introspectWorkflowInstance(bindingName, instanceId)`.

```js
const instance = await worker.introspectWorkflowInstance(
	"MY_WORKFLOW",
	"instance-id",
);

await instance.modify(async (modifier) => {
	await modifier.mockStepResult({ name: "load-user" }, { id: "123" });
});

await instance.waitForStatus("complete");
```

```ts
const instance = await worker.introspectWorkflowInstance(
	"MY_WORKFLOW",
	"instance-id",
);

await instance.modify(async (modifier) => {
	await modifier.mockStepResult({ name: "load-user" }, { id: "123" });
});

await instance.waitForStatus("complete");
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/test-harness/interact-with-workers/#page","headline":"Interact with Workers · Cloudflare Workers docs","description":"Test routes, dispatch events, control Workflows, and assert logged behavior with createTestHarness.","url":"https://developers.cloudflare.com/workers/testing/test-harness/interact-with-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
