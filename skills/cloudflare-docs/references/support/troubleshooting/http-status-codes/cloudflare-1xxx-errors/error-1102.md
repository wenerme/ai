---
title: Error 1102
description: Troubleshoot Cloudflare 1102 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1102

## Error 1102: Worker exceeded resource limits

This error indicates that a Cloudflare Worker has exceeded its CPU time limit or memory limit.

### Exceeded CPU time

A Cloudflare Worker exceeds a [CPU time limit](https://developers.cloudflare.com/workers/platform/limits/#cpu-time). CPU time is the time spent executing code (for example, loops, parsing JSON, etc). Time spent on network requests (fetching, responding) does not count towards CPU time.

#### Debugging

To identify CPU-intensive code:

1. Use [CPU profiling with DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/) locally to identify expensive operations.
2. Review [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) \- CPU time is surfaced in the invocation log. This can help find if specific routes or requests are consuming high CPU time.

#### Resolution

Contact the developer of your Workers code to optimize code for a reduction in CPU usage. Common optimization strategies include:

* Reducing the number of iterations in loops
* Optimizing JSON parsing operations
* Caching computed values
* Breaking up large operations into smaller chunks

You can also [increase the CPU time limit](https://developers.cloudflare.com/workers/platform/limits/#cpu-time) on the Workers Paid plan up to 5 minutes for CPU-bound tasks.

### Exceeded memory

A Cloudflare Worker exceeds the [128 MB memory limit](https://developers.cloudflare.com/workers/platform/limits/#memory). This is a per-isolate limit, an isolate may be handling multiple requests concurrently.

#### Debugging

To identify memory issues:

1. Use [memory profiling with DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/) locally to take memory snapshots and identify leaks.
2. Look for patterns like buffering a body which could be large (request or response), large objects stored in global scope or accumulating data in arrays.

#### Resolution

To avoid exceeding memory limits:

* Avoid buffering large objects or responses in memory
* Use streaming APIs such as [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/) or [node:stream](https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/) to process data without buffering
* Avoid storing large objects in global scope
* Be cautious with operations that accumulate data (e.g., appending to strings or arrays repeatedly)

### Related errors

* [Error 1101](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1101/) \- Workers JavaScript runtime exception
* [Error 503](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-503/) \- Service temporarily unavailable (can be caused by Workers CPU or memory limits)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1102/","name":"Error 1102"}}]}
```
