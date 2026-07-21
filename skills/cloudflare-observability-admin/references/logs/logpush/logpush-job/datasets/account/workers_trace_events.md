---
description: The descriptions below detail the fields available for workers_trace_events.
title: Workers Trace Events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

#  Workers Trace Events

Last updated Jul 8, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers%5Ftrace%5Fevents/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `workers_trace_events`.

## CPUTimeMs

Type: `int`

The amount of CPU time used by the Worker script, in milliseconds.

## DispatchNamespace

Type: `string`

The Cloudflare Worker dispatch namespace.

## Entrypoint

Type: `string`

The name of the entrypoint class in which the Worker began execution.

## Event

Type: `object`

Details about the source event.

## EventTimestampMs

Type: `int`

The timestamp of when the event was received, in milliseconds.

## EventType

Type: `string`

The event type that triggered the invocation.
Possible values are _fetch_ | _scheduled_ | _alarm_ | _queue_ | _email_ | _worker\_rpc_ | _hibernatable\_web\_socket_.

## Exceptions

Type: `array[object]`

List of uncaught exceptions during the invocation.

## Logs

Type: `array[object]`

List of console messages emitted during the invocation.

## Outcome

Type: `string`

The outcome of the Worker script invocation.
Possible values are _ok_ | _canceled_ | _exception_ | _unknown_.

## ScriptName

Type: `string`

The Cloudflare Worker script name.

## ScriptTags

Type: `array[string]`

A list of user-defined tags used to categorize the Worker.

## ScriptVersion

Type: `object`

The version of the script that was invoked.

## WallTimeMs

Type: `int`

The elapsed time in milliseconds between the start of a Worker invocation, and when the Workers Runtime determines that no more JavaScript needs to run. Specifically, this measures the wall-clock time that the JavaScript context remained open. For example, when returning a response with a large body, the Workers runtime can, in some cases, determine that no more JavaScript needs to run, and closes the JS context before all the bytes have passed through and been sent. Alternatively, if you use the `waitUntil()` API to perform work without blocking the return of a response, this work may continue executing after the response has been returned, and will be included in `WallTimeMs`.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers_trace_events/#page","headline":"Workers Trace Events · Cloudflare Logs docs","description":"The descriptions below detail the fields available for workers_trace_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers_trace_events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
