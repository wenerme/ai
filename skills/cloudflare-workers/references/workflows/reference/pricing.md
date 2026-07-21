---
description: Cloudflare Workflows pricing based on CPU time, requests, storage, and steps, included in Workers Free and Paid plans.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

#  Pricing

Last updated Jul 7, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workflows/reference/pricing/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Note

Workflows is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/#workers). Billing for Workflows steps and storage will apply [starting August 10th, 2026](https://developers.cloudflare.com/changelog/post/2026-07-07-workflows-billing-updates/).

Workflows uses [Workers Standard pricing](https://developers.cloudflare.com/workers/platform/pricing/#workers) for CPU time and requests. Workflows are billed on four dimensions:

* **CPU time**: the total amount of compute (measured in milliseconds) consumed by a given Workflow.
* **Requests** (invocations): the number of Workflow invocations. [Subrequests](https://developers.cloudflare.com/workers/platform/limits/#subrequests) made from a Workflow do not incur additional request costs.
* **Storage**: the total amount of storage (measured in GB) persisted by your Workflows.
* **Steps**: the number of steps executed by your Workflows.

A Workflow that is waiting on a response to an API call, paused as a result of calling `step.sleep`, or otherwise idle, does not incur CPU time.

### Workflows pricing

| Unit                | Workers Free                                                                                                          | Workers Paid                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Requests (millions) | 100,000 per day ([shared with Workers requests](https://developers.cloudflare.com/workers/platform/pricing/#workers)) | 10 million included per month + $0.30 per additional million                                   |
| CPU time (ms)       | 10 milliseconds of CPU time per invocation                                                                            | 30 million CPU milliseconds included per month + $0.02 per additional million CPU milliseconds |
| Storage (GB-mo)     | 1 GB                                                                                                                  | 1 GB included per month + $0.20/ GB-month                                                      |
| Steps               | 3,000 per day                                                                                                         | 500,000 included per month + $0.80/ additional 100,000 per month                               |

Cloudflare will not bill step and storage usage before the start date announced in the [Workflows billing changelog](https://developers.cloudflare.com/changelog/post/2026-07-07-workflows-billing-updates/).

CPU limits

You can increase the CPU limit available to your Workflow instances up to 5 minutes per Workflow by [setting the limits.cpu\_ms property](https://developers.cloudflare.com/workers/wrangler/configuration/#limits) in your Wrangler configuration.

### Storage Usage

Storage is billed using gigabyte-month (GB-month) as the billing metric, identical to [Durable Objects SQL storage](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend). A GB-month is calculated by averaging the peak storage per day over a billing period (30 days).

* Storage is calculated across all instances, and includes running, errored, sleeping, and completed instances.
* By default, instance state is retained for [3 days on the Free plan](https://developers.cloudflare.com/workflows/reference/limits/) and [30 days on the Paid plan](https://developers.cloudflare.com/workflows/reference/limits/).
* When creating a Workflow instance, you can set a shorter state retention period if you do not need to retain state for errored or completed Workflows. Refer to the [retention option in WorkflowInstanceCreateOptions](https://developers.cloudflare.com/workflows/build/workers-api/#workflowinstancecreateoptions) for more information.
* Deleting instances via the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/), [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/commands/workflows/#workflows), REST API, or dashboard will free up storage. It may take a few minutes for storage limits to update.

An instance that attempts to store state when you have reached the storage limit on the Free plan will throw an error.

## Frequently Asked Questions

Frequently asked questions related to Workflows pricing:

### Are there additional costs for Workflows?

Yes. Workflows are priced based on the same compute (CPU time) and requests (invocations) as Workers, as well as storage (state from a Workflow) and steps.

### Are Workflows available on the [Workers Free](https://developers.cloudflare.com/workers/platform/pricing/#workers) plan?

Yes.

### What is a Workflow invocation?

A Workflow invocation is when you trigger a new Workflow instance: for example, via the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/), wrangler CLI, or REST API. Steps within a Workflow are not invocations.

### How do Workflows show up on my bill?

Workflows are billed as Workers, and share the same CPU time and request SKUs. Workflows billing also includes storage and step usage.

### Are there any limits to Workflows?

Refer to the published [limits](https://developers.cloudflare.com/workflows/reference/limits/) documentation.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/reference/pricing/#page","headline":"Pricing · Cloudflare Workflows docs","description":"Cloudflare Workflows pricing based on CPU time, requests, storage, and steps, included in Workers Free and Paid plans.","url":"https://developers.cloudflare.com/workflows/reference/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
