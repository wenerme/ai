---
description: Identify expensive functions and memory allocations in deployed code.
title: Profiling in production
image: https://developers.cloudflare.com/workers/observability/profiling-in-production/og.png?v=89ee62703d97b672
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Profiling in production

Last updated Oct 8, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/observability/profiling-in-production/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Capture CPU and allocation profiles for deployed [Workers](https://developers.cloudflare.com/workers/) and [Durable Objects](https://developers.cloudflare.com/durable-objects/) using the Cloudflare dashboard, [Cloudflare CLI](https://developers.cloudflare.com/cf/) (command-line interface), or the Cloudflare API. Use profiles to find expensive functions and allocating code.

## Choose a profile type

Use a **CPU** profile to identify functions that consume CPU time. This is the default profile type.

Use a **Heap** profile to identify code that allocates memory. It collects a stack trace every 512 kB of memory allocated during capture, recording the chain of function calls responsible for each sampled allocation.

A Heap profile measures allocations, not retained memory. It is not a heap snapshot and does not show whether allocated memory remains live.

## Prepare traffic

Your Worker or Durable Object instance needs traffic before and during the capture. Capture targets a recently active, already-loaded [isolate](https://developers.cloudflare.com/workers/reference/how-workers-works/#isolates), rather than starting a new invocation.

Send requests that exercise the code you want to investigate. Capturing a profile does not invoke your code for you.

The historical log time range and filters do not control capture. A profile records activity during the selected capture duration, not past requests shown in logs.

## Capture a profile

### Use dashboard

#### Profile a Worker

1. In the Cloudflare dashboard, go to **Workers & Pages** and select your Worker: [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Observability**. In the view dropdown, select *Flamegraph*.
3. In **Profile type**, select *CPU* or *Heap*.
4. In **Duration (ms)**, enter a capture duration from 1000 to 50000 milliseconds. The default is 10000 milliseconds.
5. In **Version**, select *Latest* or a version in the active deployment.
6. Select **Capture profile**. The button displays **Capturing...** while capture is in progress.

#### Profile a Durable Object

1. In the Cloudflare dashboard, go to **Durable Objects**: [Go to **Durable Objects** ↗](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)
2. Select your namespace, then select the target instance.
3. Select **Observability**. In the view dropdown, select *Flamegraph*.
4. In **Profile type**, select *CPU* or *Heap*.
5. In **Duration (ms)**, enter a capture duration from 1000 to 50000 milliseconds. The default is 10000 milliseconds.
6. In **Version**, select *Latest* or a version in the active deployment.
7. Select **Capture profile**. The button displays **Capturing...** while capture is in progress.

When capture completes, the dashboard displays the profile as a flamegraph.

### Use Cloudflare CLI

[Install `cf` and sign in](https://developers.cloudflare.com/cf/get-started/) before capturing a profile. To select the target account, refer to [Select an account](https://developers.cloudflare.com/cf/get-started/#select-an-account).

Run the following to see all the available options for the profiling command:

```sh
cf workers versions profile --help
```

The command requires a positional version identifier and `--worker-id`. Use `latest`, a version's universally unique identifier (UUID), or a UUID prefix of at least eight characters.

`latest` selects the most recently created version, not necessarily a deployed version. If that version is not running, replace `latest` in the examples with the running version's identifier.

Set `--duration-ms` to a value from `1000` to `50000` milliseconds. For either Workers or Durable Objects, use `--profile-type cpu` for CPU profiles or `--profile-type heap` for allocation profiles.

The command writes raw binary pprof data to standard output.

#### Profile a Worker

1. Set `$WORKER_ID` to your Worker ID or name.
2. Ensure there is consistent traffic to the Worker running the selected version.
3. Capture a CPU profile for 5 seconds and save it to `worker-cpu.pprof`:

   ```bash
   cf workers versions profile latest \
     --worker-id "$WORKER_ID" \
     --duration-ms 5000 \
     --profile-type cpu > worker-cpu.pprof
   ```



#### Profile a Durable Object

1. Set `$WORKER_ID` to the ID or name of the Worker that owns your Durable Object namespace, not a Worker that only calls it through a binding.

   Set `$NAMESPACE_ID` to the namespace ID and `$DURABLE_OBJECT_ID` to the [instance ID](https://developers.cloudflare.com/durable-objects/api/id/), a 64-character hexadecimal string.
2. Ensure there is consistent traffic to the target instance. Ensure it is active and running the selected Worker version.
3. Capture a heap profile for 5 seconds and save it to `durable-object-heap.pprof`. Pass both `--namespace-id` and `--actor-id` to target that exact instance:

   ```bash
   cf workers versions profile latest \
     --worker-id "$WORKER_ID" \
     --duration-ms 5000 \
     --profile-type heap \
     --namespace-id "$NAMESPACE_ID" \
     --actor-id "$DURABLE_OBJECT_ID" > durable-object-heap.pprof
   ```



### Use API

Use an API token with **Workers Scripts Read** permission or the **Content Read-Only** [Workers role](https://developers.cloudflare.com/workers/authorization/workers/). Set `$CLOUDFLARE_API_TOKEN` to your token and `$ACCOUNT_ID` to your account ID.

The `latest` version selects the most recently created version, not necessarily a deployed version. If you uploaded a newer version without deploying it, replace `latest` in the URL with the deployed version's UUID.

The selected version must be loaded and running, with traffic during capture. The API returns a gzip-compressed pprof profile.

Use these fields in the request body:

| Field | Meaning |
| --- | --- |
| `duration_ms` | Required integer from `1000` to `50000` milliseconds. |
| `profile_type` | Optional: `cpu` (default) or `heap`. |
| `namespace_id` | Durable Object namespace ID. Required together with `actor_id` for a Durable Object capture. |
| `actor_id` | Durable Object [instance ID](https://developers.cloudflare.com/durable-objects/api/id/), a 64-character hexadecimal string. Required together with `namespace_id` for a Durable Object capture. |

#### Profile a Worker

1. Set `$WORKER_ID` to your Worker ID or name.
2. Send traffic to the Worker running the requested version.
3. Send a `POST` request to capture the profile. This example captures a CPU profile for 10 seconds and saves it to `worker-cpu.pprof.gz`.

   ```bash
   curl --fail --silent --show-error --request POST \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions/latest/profile" \
     --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     --header "Content-Type: application/json" \
     --data '{
       "duration_ms": 10000
     }' \
     --output worker-cpu.pprof.gz
   ```



#### Profile a Durable Object

1. Set `$WORKER_ID` to the ID or name of the Worker that owns your Durable Object namespace, not a Worker that only calls it through a binding.

   Set `$NAMESPACE_ID` to the namespace ID and `$DURABLE_OBJECT_ID` to the instance ID, a 64-character hexadecimal string.
2. Send traffic to the target instance. Ensure it is active and running the requested Worker version.
3. Send a `POST` request with both `namespace_id` and `actor_id`. This example captures a heap profile for 10 seconds and saves it to `durable-object-heap.pprof.gz`.

   To capture a CPU profile, change `profile_type` to `cpu`.

   ```bash
   curl --fail --silent --show-error --request POST \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions/latest/profile" \
     --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     --header "Content-Type: application/json" \
     --data "{
       \"duration_ms\": 10000,
       \"profile_type\": \"heap\",
       \"namespace_id\": \"$NAMESPACE_ID\",
       \"actor_id\": \"$DURABLE_OBJECT_ID\"
     }" \
     --output durable-object-heap.pprof.gz
   ```



## Inspect the results

In the dashboard flamegraph, each frame represents a function in the captured call stacks. Callers appear above their callees, the functions they call.

Frame width is proportional to CPU time or allocated memory, depending on the profile type. The graph is not a timeline: horizontal position does not indicate when a function ran.

Select a frame to focus on its subtree. Use the breadcrumbs to return to a parent frame, or **All frames** to reset the view.

Use **Search frames** to find function names or source locations. Switch to **Table** to compare these values:

| Value | Meaning |
| --- | --- |
| Self | CPU time or allocated memory attributed to the frame, excluding descendants |
| Total | CPU time or allocated memory attributed to the frame and its descendants |
| Percent of profile | Share of the whole capture |

Percentages remain relative to the whole capture, even when you focus on a subtree.

## Download the capture

Use pprof-compatible tools to inspect profiles captured through the CLI, API, or dashboard. In the dashboard, select **Download profile** to download the raw pprof profile.

## Limits

Capture requests are rate limited, and the API returns HTTP `429` when you exceed the limit. Wait before retrying, and follow the `Retry-After` header when present.

The API can also return these error messages:

| Error message | Meaning or action |
| --- | --- |
| `No recent executions were found for this Worker.` | Send traffic to the selected Worker version or target Durable Object instance, then retry capture. |
| `The Worker has no loaded isolate in its recent execution locations.` | Send traffic to the target version or Durable Object instance, then retry capture. |
| `Worker profiling is unavailable in this environment.` | Profiling is unavailable in the target environment. |
| `This Worker does not support runtime profiling.` | The selected Worker does not support profiling. |
| `The Worker runtime could not start profiling. Please try again.` | Retry capture. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/profiling-in-production/#page","headline":"Profiling in production","description":"Identify expensive functions and memory allocations in deployed code.","url":"https://developers.cloudflare.com/workers/observability/profiling-in-production/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/observability/profiling-in-production/og.png?v=89ee62703d97b672","dateModified":"2026-10-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
