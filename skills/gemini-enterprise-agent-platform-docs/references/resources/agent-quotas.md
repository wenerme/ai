This document lists the quotas and system limits that apply to
Gemini Enterprise Agent Platform.

- *Quotas* have default values, but you can typically request adjustments.
- *System limits* are fixed values that can't be changed.

Google Cloud uses quotas to help ensure fairness and reduce
spikes in resource use and availability. A quota restricts how much of a
Google Cloud resource your Google Cloud project can use. Quotas
apply to a range of resource types, including hardware, software, and network
components. For example, quotas can restrict the number of API calls to a
service, the number of load balancers used concurrently by your project, or the
number of projects that you can create. Quotas protect the community of
Google Cloud users by preventing the overloading of services. Quotas also
help you to manage your own Google Cloud resources.

The Cloud Quotas system does the following:

- Monitors your consumption of Google Cloud products and services
- Restricts your consumption of those resources
- Provides a way to [request changes to the quota value](https://docs.cloud.google.com/docs/quotas/help/request_increase) and [automate quota adjustments](https://docs.cloud.google.com/docs/quotas/quota-adjuster)

In most cases, when you attempt to consume more of a resource than its quota
allows, the system blocks access to the resource, and the task that
you're trying to perform fails.

Quotas generally apply at the Google Cloud project
level. Your use of a resource in one project doesn't affect
your available quota in another project. Within a Google Cloud project, quotas
are shared across all applications and IP addresses.

For more information, see the
[Cloud Quotas overview](https://docs.cloud.google.com/docs/quotas/overview).

## Quotas

The following quotas apply to agents deployed on Agent Platform for a
given project in each region:

| Description | Quota | Metric |
|---|---|---|
| Create, delete, or update Agent Platform resources per minute | 10 | `aiplatform.googleapis.com/reasoning_engine_service_write_requests` |
| Create, delete, or update Agent Platform sessions per minute | 100 | `aiplatform.googleapis.com/session_write_requests` |
| `Query` or `StreamQuery` Agent Platform per minute | 90 | `aiplatform.googleapis.com/reasoning_engine_service_query_requests` |
| Append event to Agent Platform sessions per minute | 300 | `aiplatform.googleapis.com/session_event_append_requests` |
| Create, delete, or update Agent Platform non-regional (global or multiregional) sessions per minute | 100 | `aiplatform.googleapis.com/non_regional_session_write_requests` |
| Append event to Agent Platform non-regional (global or multiregional) sessions per minute | 300 | `aiplatform.googleapis.com/non_regional_session_event_append_requests` |
| Maximum number of Agent Platform resources | 100 | `aiplatform.googleapis.com/reasoning_engine_service_entities` |
| Create, delete, or update Agent Platform memory resources per minute | 100 | `aiplatform.googleapis.com/memory_bank_write_requests` |
| Get, list, or retrieve from Agent Platform Memory Bank per minute | 300 | `aiplatform.googleapis.com/memory_bank_read_requests` |
| Create, delete, or update Agent Platform non-regional (global or multiregional) memory resources per minute | 100 | `aiplatform.googleapis.com/non_regional_memory_bank_write_requests` |
| Get, list, or retrieve from non-regional (global or multiregional) Agent Platform Memory Bank per minute | 300 | `aiplatform.googleapis.com/non_regional_memory_bank_read_requests` |
| Sandbox environment (Code Execution) execute requests per minute | 1000 | `aiplatform.googleapis.com/sandbox_environment_execute_requests` |
| Sandbox environment (Code Execution) entities per region | 1000 | `aiplatform.googleapis.com/sandbox_environment_entities` |
| Sandbox environment (Code Execution) write requests per minute | 500 | `aiplatform.googleapis.com/sandbox_environment_write_requests` |
| A2A Agent post requests like `sendMessage` and `cancelTask`per minute | 60 | `aiplatform.googleapis.com/a2a_agent_post_requests` |
| A2A Agent get requests like `getTask` and `getCard` per minute | 600 | `aiplatform.googleapis.com/a2a_agent_get_requests` |
| Concurrent live bidirectional connections using the `BidiStreamQuery` API per minute | 10 | `aiplatform.googleapis.com/reasoning_engine_service_concurrent_query_requests` |

### Quota management for production loads

As your traffic scales, you likely need to request increases for specific
Agent Platform API quotas to avoid `429 Resource Exhausted` errors. You can
proactively [configure your
runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#customized-resource-controls)
and [increase your quotas](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-quotas#request-quota-adjustment) to keep your
Agent Runtime instance responsive, scalable, and reliable under
production load.

For information about how to optimize and scale Agent Runtime performance,
see [Optimize and scale Agent Runtime
performance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale).

Use the following steps to estimate your peak quota requirements:

1. Define your variables:

   - **`U`**: Peak concurrent users (for example, 250).

   - **`X`**: Average requests per user per minute (for example, 2).

   - **`Y`**: Average session events generated per request (for example, 12 for a complex chain that involves multiple tool calls).

2. Calculate your peak load:

   - Calculate your peak queries per minute (QPM): U \* X

   - Calculate your peak session events per minute: Peak QPM \* Y

3. Request a quota with a buffer: When you request a quota increase, add a buffer (for example, 50%) on top of your calculated peak to handle unexpected spikes.

The following table shows calculations for key performance-related quotas for
Agent Platform, using the example variables of `peak concurrent users=250`,
`average requests per user per minute=2`, and `average session events generated
per request=12`:

| Quota name | Quota description | Base calculation (peak) | Recommended value (with 50% buffer) |
|---|---|---|---|
| Query Agent Engine per minute (`aiplatform.googleapis.com/reasoning_engine_service_query_requests`) | The total number of `query` or `stream_query` calls that your agent can receive per minute. | `250 users * 2 req/min = 500 QPM` | `500 * 1.5 =` **`750`** |
| Append session events per minute (`aiplatform.googleapis.com/session_event_append_requests`) | The number of turns or events within all ongoing sessions. A single query can generate multiple session events in a chain, for example: 1. Call LLM. 2. LLM response: use tool. 3. Execute tool. 4. Call the LLM with tool response. 5. LLM gives the final response. | `500 QPM * 12 events/req = 6,000` | `6,000 * 1.5 =` **`9,000`** |
| Session writes per minute (`aiplatform.googleapis.com/session_write_requests`) | The rate of creating or updating session resources. This is typically less than or equal to the query rate. | Typically \<= Peak QPM (`500`) | Typically \<= query quota (`750`) |

## Request a quota adjustment

To adjust most quotas, use the Google Cloud console.
For more information, see
[Request a quota adjustment](https://docs.cloud.google.com/docs/quotas/help/request_increase).

## Agent Platform Express mode quotas

Agent Platform Free Tier express mode users have the following quotas for Agent Platform services with no cost. See the [Agent Platform in Express mode overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview) for more information about the Free Tier and express mode.

> [!NOTE]
> **Note:** Agent Platform Free Tier express mode also has limited model call quotas. See [Available models and rate limits in express mode](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#models) for more information.

The following quotas apply to agents deployed on Agent Platform for a
given express mode project in each region:

| Description | Quota | Metric |
|---|---|---|
| Maximum number of Agent Platform resources | 10 | `aiplatform.googleapis.com/reasoning_engine_service_entities` |
| Create, delete, or update Agent Platform resources per minute | 10 | `aiplatform.googleapis.com/reasoning_engine_service_write_requests` |
| `Query` or `StreamQuery` Agent Platform per minute | 10 | `aiplatform.googleapis.com/reasoning_engine_service_query_requests` |
| Concurrent live bidirectional connections using the `BidiStreamQuery` API per minute | 1 | `aiplatform.googleapis.com/reasoning_engine_service_concurrent_query_requests` |
| Create, delete, or update Agent Platform sessions per minute | 10 | `aiplatform.googleapis.com/session_write_requests` |
| Append event to Agent Platform sessions per minute | 30 | `aiplatform.googleapis.com/session_event_append_requests` |
| Create, delete, or update Agent Platform memory resources per minute | 10 | `aiplatform.googleapis.com/memory_bank_write_requests` |
| Get, list, or retrieve from Memory Bank per minute | 10 | `aiplatform.googleapis.com/memory_bank_read_requests` |
