---
title: Limits
description: 1 1 KB is measured as 1000 bytes. Messages can include up to ~100 bytes of internal metadata that counts towards total message limits.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/queues/platform/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Limits

Warning

The following limits apply to both Workers Paid and Workers Free plans with the exception of **Message Retention**, which is non-configurable at 24 hours for the Workers Free plan.

| Feature                                                                                  | Limit                                                                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Queues                                                                                   | 10,000 per account                                                                                                                 |
| Message size                                                                             | 128 KB 1                                                                                                                           |
| Message retries                                                                          | 100                                                                                                                                |
| Maximum consumer batch size                                                              | 100 messages                                                                                                                       |
| Maximum messages per sendBatch call                                                      | 100 (or 256KB in total)                                                                                                            |
| Maximum Batch wait time                                                                  | 60 seconds                                                                                                                         |
| Per-queue message throughput                                                             | 5,000 messages per second 2                                                                                                        |
| Message retention period 3                                                               | [Configurable up to 14 days](https://developers.cloudflare.com/queues/configuration/configure-queues/#queue-configuration).        |
| Per-queue backlog size 4                                                                 | 25GB                                                                                                                               |
| Concurrent consumer invocations                                                          | 250 push-based only                                                                                                                |
| Consumer duration (wall clock time)                                                      | 15 minutes 5                                                                                                                       |
| [Consumer CPU time](https://developers.cloudflare.com/workers/platform/limits/#cpu-time) | [Configurable to 5 minutes](https://developers.cloudflare.com/queues/platform/limits/#increasing-queue-consumer-worker-cpu-limits) |
| visibilityTimeout (pull-based queues)                                                    | 12 hours                                                                                                                           |
| delaySeconds (when sending or retrying)                                                  | 24 hours                                                                                                                           |

1 1 KB is measured as 1000 bytes. Messages can include up to \~100 bytes of internal metadata that counts towards total message limits.

2 Exceeding the maximum message throughput will cause the `send()` and `sendBatch()` methods to throw an exception with a `Too Many Requests` error until your producer falls below the limit.

3 Messages in a queue that reach the maximum message retention are deleted from the queue. Queues does not delete messages in the same queue that have not reached this limit.

4 Individual queues that reach this limit will receive a `Storage Limit Exceeded` error when calling `send()` or `sendBatch()` on the queue.

5 Refer to [Workers limits](https://developers.cloudflare.com/workers/platform/limits/#cpu-time).

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/ukpeZVLWLnKeixDu7). If the limit can be increased, Cloudflare will contact you with next steps.

### Increasing Queue Consumer Worker CPU Limits

[Queue consumer Workers](https://developers.cloudflare.com/queues/reference/how-queues-works/#consumers) are Worker scripts, and share the same [per invocation CPU limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) as any Workers do. Note that CPU time is active processing time: not time spent waiting on network requests, storage calls, or other general I/O.

By default, the maximum CPU time per consumer Worker invocation is set to 30 seconds, but can be increased by setting `limits.cpu_ms` in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-5658)
* [  wrangler.toml ](#tab-panel-5659)

```

{

  // ...rest of your configuration...

  "limits": {

    "cpu_ms": 300000, // 300,000 milliseconds = 5 minutes

  },

  // ...rest of your configuration...

}


```

```

[limits]

cpu_ms = 300_000


```

To learn more about CPU time and limits, [review the Workers documentation](https://developers.cloudflare.com/workers/platform/limits/#cpu-time).

## Wall time limits by invocation type

Wall time (also called wall-clock time) is the total elapsed time from the start to end of an invocation, including time spent waiting on network requests, I/O, and other asynchronous operations. This is distinct from [CPU time](https://developers.cloudflare.com/workers/platform/limits/#cpu-time), which only measures time the CPU spends actively executing your code.

The following table summarizes the wall time limits for different types of Worker invocations across the developer platform:

| Invocation type                                                                                     | Wall time limit | Details                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Incoming HTTP request                                                                               | Unlimited       | No hard limit while the client remains connected. When the client disconnects, tasks are canceled unless you call [waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) to extend execution by up to 30 seconds. |
| [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)             | 15 minutes      | Scheduled Workers have a maximum wall time of 15 minutes per invocation.                                                                                                                                                                         |
| [Queue consumers](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) | 15 minutes      | Each consumer invocation has a maximum wall time of 15 minutes.                                                                                                                                                                                  |
| [Durable Object alarm handlers](https://developers.cloudflare.com/durable-objects/api/alarms/)      | 15 minutes      | Alarm handler invocations have a maximum wall time of 15 minutes.                                                                                                                                                                                |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/) (RPC / HTTP)                  | Unlimited       | No hard limit while the caller stays connected to the Durable Object.                                                                                                                                                                            |
| [Workflows](https://developers.cloudflare.com/workflows/) (per step)                                | Unlimited       | Each step can run for an unlimited wall time. Individual steps are subject to the configured [CPU time limit](https://developers.cloudflare.com/workers/platform/limits/#cpu-time).                                                              |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/platform/limits/","name":"Limits"}}]}
```
