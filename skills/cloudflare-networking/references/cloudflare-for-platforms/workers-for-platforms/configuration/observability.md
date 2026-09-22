---
description: Collect logs, traces, and analytics across all user Workers in a Workers for Platforms dispatch namespace.
title: Observability
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Observability

Last updated Sep 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/observability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Workers for Platforms provides you with logs and analytics that can be used to share data with end users.

## Logs

There are a few ways to access logs with Workers for Platforms. They differ in how much of the logging stack Cloudflare runs for you:

- [Workers Logs](#workers-logs) — Cloudflare stores and indexes your logs, and you query them through the API. Nothing else to run. This is the best starting point for most platforms.
- [Logpush](#workers-trace-events-logpush) — Cloudflare delivers your logs to a storage destination that you own and manage.
- [Tail Workers](#tail-workers) — Cloudflare streams your logs to a Worker in real time, and you decide what to do with them.

### Workers Logs

[Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) automatically stores logs from your user Workers in your Cloudflare account, where you can query them with the [Query Builder](https://developers.cloudflare.com/workers/observability/query-builder/) or the [Workers Observability API](https://developers.cloudflare.com/api/resources/workers/subresources/observability/). Because it is fully managed, you can surface a per-user view of logs in your own dashboard without standing up a database, setting up Logpush, or deploying a Tail Worker.

Enable Workers Logs on a user Worker by including the `observability` setting in the [metadata](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/metadata/) when you [upload the script](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/methods/update/) to your dispatch namespace:

```json
{
	"main_module": "index.js",
	"observability": {
		"enabled": true,
		"logs": {
			"enabled": true,
			"invocation_logs": true,
			"head_sampling_rate": 1
		}
	}
}
```

Because you control the upload metadata, you decide whether logging is enabled for each user Worker. Set `head_sampling_rate` to a value between 0 and 1 to log a percentage of requests, or set `observability.enabled` to `false` to turn off collection.

#### Query logs for a single user Worker

Workers Logs are stored in the `cloudflare-workers` dataset. When you query the [Workers Observability API](https://developers.cloudflare.com/api/resources/workers/subresources/observability/) on behalf of an end user, scope every query to the specific user Worker so that one tenant cannot read another tenant's telemetry. Filter on `dataset` (set to `cloudflare-workers`) and `$metadata.service` (the user Worker's script name).

Apply these filters on the server using the script name you control, rather than accepting a script name, dataset, or raw filter from the browser. This keeps each user's logs isolated even when the query is triggered by end-user input such as a search term or time range.

### Workers Trace Events Logpush

Workers Trace Events logpush is used to get raw Workers execution logs. Refer to [Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) for more information.

Logpush can be enabled for an entire dispatch namespace or a single user Worker. To capture logs for all of the user Workers in a dispatch namespace:

1. Create a [Logpush job](https://developers.cloudflare.com/workers/observability/logs/logpush/#create-a-logpush-job).
2. Enable [logging](https://developers.cloudflare.com/workers/observability/logs/logpush/#enable-logging-on-your-worker) on your dispatch Worker.

Enabling logging on your dispatch Worker collects logs for both the dispatch Worker and for any user Workers in the dispatch namespace. Logs are automatically collected for all new Workers added to a dispatch namespace. To enable logging for an individual user Worker rather than an entire dispatch namespace, skip step 1 and complete step 2 on your user Worker.

All logs are forwarded to the Logpush job that you have setup for your account. Logpush filters can be used on the `Outcome` or `Script Name` field to include or exclude specific values or send logs to different destinations.

### Tail Workers

A [Tail Worker](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) receives information about the execution of other Workers (known as producer Workers), such as HTTP statuses, data passed to `console.log()` or uncaught exceptions.

Use [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) instead of Logpush if you want to format logs before they leave Cloudflare, receive [diagnostics channel events](https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel), or get logs in real time.

To collect logs from a user Worker, add the [Tail Worker configuration](https://developers.cloudflare.com/workers/observability/logs/tail-workers/#configure-tail-workers) directly to that user Worker.

## Analytics

There are two ways for you to review your Workers for Platforms analytics.

### Workers Analytics Engine

[Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) can be used with Workers for Platforms to provide analytics to end users. It can be used to expose events relating to a Workers invocation or custom user-defined events. Platforms can write/query events by script tag to get aggregates over a user’s usage.

### GraphQL Analytics API

Use Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api) to get metrics relating to your Dispatch Namespaces. Use the `dispatchNamespaceName` dimension in the `workersInvocationsAdaptive` node to query usage by namespace.

To show metrics for a single user Worker, filter `workersInvocationsAdaptive` by the `scriptName` of that user Worker. This returns request counts, error counts, and CPU time quantiles without requiring Workers Logs to be enabled, so you can display per-user metrics even when log collection is turned off.

```graphql
query UserWorkerMetrics($accountTag: string!, $scriptName: string!, $start: Time!, $end: Time!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      workersInvocationsAdaptive(
        limit: 1
        filter: { scriptName: $scriptName, datetime_geq: $start, datetime_leq: $end }
      ) {
        sum {
          requests
          errors
        }
        quantiles {
          cpuTimeP50
          cpuTimeP99
        }
      }
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/observability/#page","headline":"Observability","description":"Collect logs, traces, and analytics across all user Workers in a Workers for Platforms dispatch namespace.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/observability/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
