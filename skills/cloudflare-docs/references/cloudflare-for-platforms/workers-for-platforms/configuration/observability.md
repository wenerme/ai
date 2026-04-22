---
title: Observability
description: Collect logs, traces, and analytics across all user Workers in a Workers for Platforms dispatch namespace.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/workers-for-platforms/configuration/observability.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Observability

Workers for Platforms provides you with logs and analytics that can be used to share data with end users.

## Logs

Learn how to access logs with Workers for Platforms.

### Workers Trace Events Logpush

Workers Trace Events logpush is used to get raw Workers execution logs. Refer to [Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) for more information.

Logpush can be enabled for an entire dispatch namespace or a single user Worker. To capture logs for all of the user Workers in a dispatch namespace:

1. Create a [Logpush job](https://developers.cloudflare.com/workers/observability/logs/logpush/#create-a-logpush-job).
2. Enable [logging](https://developers.cloudflare.com/workers/observability/logs/logpush/#enable-logging-on-your-worker) on your dispatch Worker.

Enabling logging on your dispatch Worker collects logs for both the dispatch Worker and for any user Workers in the dispatch namespace. Logs are automatically collected for all new Workers added to a dispatch namespace. To enable logging for an individual user Worker rather than an entire dispatch namespace, skip step 1 and complete step 2 on your user Worker.

All logs are forwarded to the Logpush job that you have setup for your account. Logpush filters can be used on the `Outcome` or `Script Name` field to include or exclude specific values or send logs to different destinations.

### Tail Workers

A [Tail Worker](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) receives information about the execution of other Workers (known as producer Workers), such as HTTP statuses, data passed to `console.log()` or uncaught exceptions.

Use [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) instead of Logpush if you want granular control over formatting before logs are sent to their destination to receive [diagnostics channel events](https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel), or if you want logs delivered in real-time.

Adding a Tail Worker to your dispatch Worker collects logs for both the dispatch Worker and for any user Workers in the dispatch namespace. Logs are automatically collected for all new Workers added to a dispatch namespace. To enable logging for an individual user Worker rather than an entire dispatch namespace, add the [Tail Worker configuration](https://developers.cloudflare.com/workers/observability/logs/tail-workers/#configure-tail-workers) directly to the user Worker.

## Analytics

There are two ways for you to review your Workers for Platforms analytics.

### Workers Analytics Engine

[Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) can be used with Workers for Platforms to provide analytics to end users. It can be used to expose events relating to a Workers invocation or custom user-defined events. Platforms can write/query events by script tag to get aggregates over a user’s usage.

### GraphQL Analytics API

Use Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api) to get metrics relating to your Dispatch Namespaces. Use the `dispatchNamespaceName` dimension in the `workersInvocationsAdaptive` node to query usage by namespace.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/","name":"Configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/observability/","name":"Observability"}}]}
```
