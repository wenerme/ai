---
description: Use occurrences, stack traces, logs, traces, and application context to investigate failures detected by Workers Issues.
title: Investigate issues
image: https://developers.cloudflare.com/workers/observability/issues/investigate/og.png?v=c0a462408a85b43b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Investigate issues

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/observability/issues/investigate/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can investigate an issue by comparing its occurrences and reviewing the available diagnostic context.

## Detected failures

Issues detects uncaught exceptions, failed invocations, HTTP `5xx` responses returned by the Worker, and console logs written at error level or containing an `Error` object or stack trace.

Issues detection does not require Workers Logs or tracing. Tracing is only required to add custom application context.

## Review issue details

Open the [Issues overview ↗︎](https://dash.cloudflare.com/?to=/:account/workers/services/view/:worker/production/issues?status=active), then select an issue.

The issue details page shows when the failure started, how often it occurred, and its current status.

Select an occurrence to review its available diagnostic context:

- The detected error and a stack trace, when available.
- Logs and traces related to the failure.
- The Worker version that produced the occurrence.
- Invocation and request details.
- Application context attached to the active trace span.

The available context depends on the failure type and the telemetry captured for that invocation.

![Issue details showing a handled RangeError, stack trace, occurrence chart, and destinations.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2470,height=802,format=webp/_astro/remapped-stacktrace.BOYuC7sp.png)

## Add application context

Cloudflare automatically captures platform context, but it does not know which application users, accounts, or sessions are relevant. Add these identifiers as early as possible in each invocation so they are attached when an issue occurs.

You can add attributes to the active span with `tracing.getActiveSpan()` or to a span created with the [custom spans API](https://developers.cloudflare.com/workers/observability/traces/custom-spans/). [Turn on tracing](https://developers.cloudflare.com/workers/observability/traces/#how-to-enable-tracing) before you use either method.

*src/index.jsjs*

```js
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request) {
		const { userId, accountId, sessionId } = await getAuthDetails(request);
		const span = tracing.getActiveSpan();

		span?.setAttribute("user.id", userId);
		span?.setAttribute("account.id", accountId);
		span?.setAttribute("session.id", sessionId);

		return handleRequest(request);
	},
};
```

*src/index.tsts*

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request): Promise<Response> {
		const { userId, accountId, sessionId } = await getAuthDetails(request);
		const span = tracing.getActiveSpan();

		span?.setAttribute("user.id", userId);
		span?.setAttribute("account.id", accountId);
		span?.setAttribute("session.id", sessionId);

		return handleRequest(request);
	},
} satisfies ExportedHandler;
```

These attributes appear with related occurrences.

![Issue context showing user, account, and session IDs with an execution trail and invocation metadata.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2000,height=925,format=webp/_astro/workers-issues-context-synthetic-2000x925.C0HovFGB.png)

Do not add secrets, access tokens, or sensitive request content to span attributes, logs, or error messages. Handle application identifiers and personal data according to your privacy and data-handling policies.

## Issue statuses

| Status | Behavior |
| --- | --- |
| `Active` | The issue is unresolved. New issues start with this status. |
| `Resolved` | The issue is considered fixed. A newer occurrence changes the status back to `Active`. |
| `Ignored` | The issue remains ignored when new occurrences arrive. Change the status to review it again. |

Issues do not resolve automatically. Update the status after you investigate or deploy a fix. A delayed occurrence observed before an issue was resolved does not reopen it.

## Retention

Occurrence details are available for seven days. Issues remain listed after their occurrences expire. To turn off Issues through Wrangler, set `observability.issues.enabled` to `false` and deploy your Worker. Issues stops detecting new failures.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/issues/investigate/#page","headline":"Investigate issues","description":"Use occurrences, stack traces, logs, traces, and application context to investigate failures detected by Workers Issues.","url":"https://developers.cloudflare.com/workers/observability/issues/investigate/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/observability/issues/investigate/og.png?v=c0a462408a85b43b","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
