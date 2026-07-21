---
description: Build durable, multi-step applications on Cloudflare Workers that automatically retry and persist state.
title: Cloudflare Workflows
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

#  Cloudflare Workflows

Last updated Jun 2, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workflows/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Build durable multi-step applications on Cloudflare Workers with Workflows.

 Available on Free and Paid plans

With Workflows, you can build applications that chain together multiple steps, automatically retry failed tasks, and persist state for minutes, hours, or even weeks - with no infrastructure to manage.

Use Workflows to build reliable AI applications, process data pipelines, manage user lifecycle with automated emails and trial expirations, and implement human-in-the-loop approval systems.

**Workflows give you:**

* Durable multi-step execution without timeouts
* The ability to pause for external events or approvals
* Automatic retries and error handling
* Built-in observability and debugging

## Example

An image processing workflow that fetches from R2, generates an AI description, waits for approval, then publishes:

```ts
export class ImageProcessingWorkflow extends WorkflowEntrypoint {
	async run(event: WorkflowEvent, step: WorkflowStep) {
		const imageData = await step.do('fetch image', async () => {
			const object = await this.env.BUCKET.get(event.payload.imageKey);
			return await object.arrayBuffer();
		});

		const description = await step.do('generate description', async () => {
			const imageArray = Array.from(new Uint8Array(imageData));
			return await this.env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', {
				image: imageArray,
				prompt: 'Describe this image in one sentence',
				max_tokens: 50,
			});
		});

		await step.waitForEvent('await approval', {
			event: 'approved',
			timeout: '24 hours',
		});

		await step.do('publish', async () => {
			await this.env.BUCKET.put(`public/${event.payload.imageKey}`, imageData);
		});
	}
}
```

[ Get started ](https://developers.cloudflare.com/workflows/get-started/guide/)[ Browse the examples ](https://developers.cloudflare.com/workflows/examples/)

---

## Features

[Durable step execution](https://developers.cloudflare.com/workflows/build/workers-api/)

Break complex operations into durable steps with automatic retries and error handling.

 Learn about steps

[Sleep and scheduling](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/)

Pause workflows for seconds, hours, or days with `step.sleep()` and `step.sleepUntil()`.

 Add delays

[Wait for external events](https://developers.cloudflare.com/workflows/build/events-and-parameters/)

Wait for webhooks, user input, or external system responses before continuing execution.

 Handle events

[Workflow lifecycle management](https://developers.cloudflare.com/workflows/build/trigger-workflows/)

Trigger, pause, resume, and terminate workflow instances programmatically or via API.

 Manage instances

---

## Related products

[Workers](https://developers.cloudflare.com/workers/)

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

[Pages](https://developers.cloudflare.com/pages/)

Deploy dynamic front-end applications in record time.

---

## More resources

### [ Pricing ](https://developers.cloudflare.com/workflows/reference/pricing/)

Learn more about how Workflows is priced.

### [ Limits ](https://developers.cloudflare.com/workflows/reference/limits/)

Learn more about Workflow limits, and how to work within them.

### [ Storage options ](https://developers.cloudflare.com/workers/platform/storage-options/)

Learn more about the storage and database options you can build on with Workers.

### [ Developer Discord ](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

### [ @CloudflareDev ](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workflows/#page","headline":"Overview · Cloudflare Workflows docs","description":"Build durable, multi-step applications on Cloudflare Workers that automatically retry and persist state.","url":"https://developers.cloudflare.com/workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
