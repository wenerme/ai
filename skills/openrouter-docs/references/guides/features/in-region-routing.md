> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# In-Region Routing

> Keep prompts and completions inside the EU or the US

In-Region Routing (IRR) keeps your AI workloads inside a designated geographic region. When you send a request through a region-specific base URL, the request is decrypted within that region and is only routed to provider endpoints in that region. Prompts and completions are processed entirely in-region and never leave it at any point in the request lifecycle.

In-region routing is available for the European Union (EU) and United States (US) on the Business and Enterprise plans. Organization admins can upgrade to Business under **Account Type** in [Settings > Preferences](https://openrouter.ai/settings/preferences). For Enterprise, [contact our enterprise team](https://openrouter.ai/enterprise/form).

## Using In-Region Routing

Send API requests through the region-specific base URL:

```lines theme={null}
https://eu.openrouter.ai
https://us.openrouter.ai
```

<CodeGroup>
  ```typescript title="TypeScript SDK" lines theme={null}
  import { OpenRouter } from '@openrouter/sdk';

  const openRouter = new OpenRouter({
    apiKey: '<OPENROUTER_API_KEY>',
    serverURL: 'https://eu.openrouter.ai/api/v1',
  });

  const completion = await openRouter.chat.send({
    chatRequest: {
      model: 'anthropic/claude-sonnet-5',
      messages: [{ role: 'user', content: 'Hello' }],
      stream: false,
    },
  });
  ```

  ```typescript title="TypeScript (fetch)" lines theme={null}
  fetch('https://eu.openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-5',
      messages: [{ role: 'user', content: 'Hello' }],
    }),
  });
  ```

  ```python title="Python" lines theme={null}
  import requests

  headers = {
    'Authorization': 'Bearer <OPENROUTER_API_KEY>',
    'Content-Type': 'application/json',
  }

  response = requests.post('https://eu.openrouter.ai/api/v1/chat/completions', headers=headers, json={
    'model': 'anthropic/claude-sonnet-5',
    'messages': [{ 'role': 'user', 'content': 'Hello' }],
  })
  ```

  ```bash title="cURL" lines theme={null}
  curl https://eu.openrouter.ai/api/v1/chat/completions \
    -H "Authorization: Bearer <OPENROUTER_API_KEY>" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "anthropic/claude-sonnet-5",
      "messages": [{"role": "user", "content": "Hello"}]
    }'
  ```
</CodeGroup>

## How Requests Are Routed

On a regional domain, OpenRouter filters the candidate endpoints for your request down to those whose provider infrastructure is located in that region. If OpenRouter has not onboarded an endpoint for the requested model to that region, the request fails with an error rather than falling back to an out-of-region endpoint. A provider might serve the model from infrastructure in the region, but the endpoint is only eligible once OpenRouter has onboarded it for EU or US routing. See Finding In-Region Models for the current list. In-region routing fails closed: OpenRouter never silently routes a regional request outside the region.

Two categories of endpoints are always excluded from regional routing even if the model is otherwise available:

* **Global / cross-region deployments.** Provider deployments that can process requests in any region (for example, Bedrock `global.` cross-region inference profiles or Vertex `global` locations) do not guarantee residency and are not eligible.
* **Multi-model routers.** Router-type models (such as the Auto Router) are excluded from regional model lists.

### Finding In-Region Models

To see which models are available for in-region routing:

* Call [`/api/v1/models`](https://eu.openrouter.ai/api/v1/models) on a regional domain to get the full list programmatically, or pass a `region` query parameter (`eu` or `us`) on the main domain
* Browse [EU-eligible models](https://openrouter.ai/models?region=eu) or [US-eligible models](https://openrouter.ai/models?region=us) on the models page with the **In-Region Routing** filter

## Enforcing In-Region Routing with Guardrails

Sending requests to a regional base URL is a per-request choice. To guarantee that traffic for a key, member, or an entire workspace can only enter OpenRouter through a specific region, restrict the allowed data regions in a [guardrail](/docs/guides/features/guardrails). Each guardrail can specify `allowed_data_regions`, a list of the OpenRouter domains that requests governed by that guardrail must arrive through:

| Value    | Base URL                   |
| -------- | -------------------------- |
| `global` | `https://openrouter.ai`    |
| `europe` | `https://eu.openrouter.ai` |
| `us`     | `https://us.openrouter.ai` |

A request that arrives through a domain not in the list is rejected with a **403 Forbidden** error before any inference or endpoint selection happens, so no prompt is ever processed outside the permitted regions. Leaving the setting unrestricted (`null`) accepts requests from any domain.

Enforcement applies to every OpenRouter API surface, including chat completions, embeddings, rerank, image, audio, and video generation, server tools, the Batch API, and generation lookups.

When more than one guardrail governs a request (the workspace default guardrail, the member's guardrail, and the API key's guardrail), the effective set of regions is the intersection of every guardrail that sets one, so a lower-level guardrail can only narrow the regions permitted above it. For example, if the workspace default guardrail allows `europe` and `us` and an API key guardrail allows only `europe`, requests with that key must arrive through `https://eu.openrouter.ai`.

To enforce EU residency for a whole workspace, set `allowed_data_regions` to `["europe"]` on the [workspace default guardrail](/docs/guides/features/guardrails#updating-the-workspace-default-guardrail-via-api). This can be configured in the guardrail editor under **Data regions** or through the [Guardrails API](/docs/api/api-reference/guardrails/create-a-guardrail).

<Note>
  The guardrail value for the EU is `europe`, while the [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties) region filter takes `region=eu`. The two are not interchangeable.
</Note>

Data-region guardrails require a Business or Enterprise plan. If your plan stops including in-region routing while a region guardrail is still assigned, the guardrail keeps enforcing its region list, but the regional domains themselves reject requests from accounts without in-region routing. Requests governed by that guardrail are therefore rejected until you upgrade or clear the restriction (any region not in the list stays blocked; `global` in the list keeps `https://openrouter.ai` open).

## Feature Availability

Everything on a regional domain must uphold the same residency guarantee as inference itself. Features whose infrastructure or third-party vendors process data outside your region are therefore unavailable on regional domains today, and requests that use them return an error instead of silently processing data out of region.

**Not available with in-region routing today:**

* **Web search with external engines.** The [web search plugin](/docs/guides/features/plugins/web-search) engines Exa, Perplexity, Parallel, and Firecrawl are external vendors that process your queries outside your data region, so they are rejected on regional domains. **Native provider web search still works**: search executed by the model provider itself (e.g. `engine: "native"` on a model that supports it) stays with the region-filtered endpoint and remains available.
* **Web search and web fetch server tools.** The [`web_search`](/docs/guides/features/server-tools/web-search) and [`web_fetch`](/docs/guides/features/server-tools/web-fetch) server tools are backed by the same out-of-region search and fetch vendors, so they are not available on regional domains.
* **Other server tools with out-of-region infrastructure**, including [files](/docs/guides/features/server-tools/files), [image generation](/docs/guides/features/server-tools/image-generation), [Fusion](/docs/guides/features/server-tools/fusion), and [shell](/docs/guides/features/server-tools/shell). Server tools that execute entirely in-region (such as [tool search](/docs/guides/features/server-tools/tool-search), [apply patch](/docs/guides/features/server-tools/apply-patch), and [datetime](/docs/guides/features/server-tools/datetime)) remain available.
* **Batch API.** The [Batch API](/docs/batch-quickstart) currently runs on US-based storage and queueing infrastructure and does not yet support regional data residency. Submit batch requests through the global endpoint at `openrouter.ai`.
* **Multi-model routers** such as the Auto Router, as described above.

Zero Data Retention ([ZDR](/docs/guides/features/zdr)) enforcement and [data collection controls](/docs/guides/privacy/provider-logging) work normally with in-region routing and are commonly combined with it. See [Sovereign AI](/docs/guides/features/sovereign-ai) for how these features compose.

## Observability with In-Region Routing

[Broadcast](/docs/guides/features/broadcast) supports in-region routing. Every broadcast destination is configured with the data regions it receives traces from (global, EU, or US), and a trace from a regional request is only delivered to destinations configured for that region.

Regional broadcast delivery upholds the same data boundary as inference:

* **Traces are sent from within the data boundary.** EU and US traces are delivered to your destination directly from infrastructure inside the region, and regional trace data is never persisted to queueing infrastructure outside the region.
* **Delivery is best-effort.** Because regional traces are handled in memory only and never queued out of region, a failed delivery to a destination is not retried through the global retry queue the way global traffic is.
* **You control where the destination lives.** OpenRouter sends the trace from inside the data boundary, but the receiving endpoint is yours. If you need end-to-end residency for observability data, host the destination (e.g. your OpenTelemetry collector, Langfuse instance, or S3 bucket) inside the selected data boundary.

Configure destination regions in [Settings > Observability](https://openrouter.ai/settings/observability) when adding or editing a destination.

Separately, OpenRouter's own [input/output logging](/docs/guides/features/input-output-logging) is currently skipped for all requests through the regional endpoints, even when the feature is enabled. Requests work as normal; prompt and completion logging is simply not performed.

## BYOK with In-Region Routing

[BYOK](/docs/guides/overview/auth/byok) works with in-region routing, but there is an important boundary to understand:

* **OpenRouter controls which shared endpoints are eligible.** On a regional domain, OpenRouter only routes to shared provider endpoints whose infrastructure is located in that region. BYOK endpoints are not filtered this way: they are added for the provider your key belongs to, and OpenRouter sends the request to the resource your key is configured for.
* **You control where your own deployment runs.** For hyperscaler providers (AWS Bedrock, Azure, Google Vertex AI), your BYOK key authenticates against cloud resources in *your* account. OpenRouter cannot move or reconfigure those resources. If your deployment is provisioned in a region outside your data region, requests to it would leave the region.

Sending requests to `eu.openrouter.ai` or `us.openrouter.ai` does **not** by itself regionalize your cloud deployments. When you combine BYOK with in-region routing, you must ensure your hyperscaler deployments are provisioned in the matching region. The provider-specific behavior is below.

### AWS Bedrock

How OpenRouter chooses the Bedrock invocation region under in-region routing depends on your key type:

* **AWS credentials (JSON with a `region` field):** If your configured region is inside your data region (e.g. `eu-west-1` on the EU domain, `us-east-1` on the US domain), OpenRouter uses it. If your configured region is outside your data region, or no region is set, OpenRouter does **not** honor it; it instead invokes Bedrock in a default in-region location (`eu-west-1` for the EU, `us-east-1` for the US). Your AWS credentials must therefore have Bedrock access and model access enabled in that region, or requests will fail.
* **Bedrock API keys:** These are tied to a single AWS region at creation time and cannot be redirected. Create the key in a region inside your data region.
* **Cross-region inference profiles:** `global.` inference profiles can process requests in any AWS region, so they are excluded from regional routing entirely.

### Azure (AI Foundry and Azure OpenAI)

Azure BYOK configurations point at a specific resource you created (`resource_name` for Foundry configs, or a full `endpoint_url` for per-deployment configs). The geographic region of that resource was fixed when you created it in the Azure portal, and OpenRouter routes to the resource exactly as configured.

**You must create your Azure resource in a region within your data region** (e.g. an EU Azure region such as Sweden Central or West Europe for the EU domain). OpenRouter cannot verify or change where your Azure resource is deployed; a US-deployed Azure resource used from the EU domain would process your prompts in the US. Also review Azure's own data-processing settings: some Azure OpenAI features (such as global deployment types) process data outside the resource's region, so use regional (not global) deployment types for residency-sensitive workloads.

### Google Vertex AI

Vertex BYOK service account keys accept an optional `region` field that selects the Vertex location OpenRouter sends requests to. Under in-region routing:

* **Set `region` to a location inside your data region** (e.g. `europe-west1` for the EU, `us-central1` for the US).
* **For most Vertex models, OpenRouter enforces this**: a key region outside your data region is rejected with an error, and an unset or `"global"` region resolves to a default location inside your data region instead of Google's global endpoint. Make sure your project has model access and quota in that location.
* **Exceptions**: models served through Vertex's OpenAI-compatible endpoint (which includes non-OpenAI models such as Llama and DeepSeek) and models served through the Vertex Interactions API use the key's configured region directly, defaulting to `global` when unset, without enforcement against your data region. Because you cannot always tell from the model which path serves it, always set an explicit in-region location on your key and never use `"global"`, since the global location lets Google process the request in any region.

### Why This Matters

OpenRouter's in-region guarantee covers everything OpenRouter controls: where your request is decrypted, which provider endpoints it is routed to, and where responses are processed. For BYOK on hyperscalers, the final leg of the request runs on infrastructure in *your* cloud account, so the residency of that leg is determined by how you provisioned it. A correctly regionalized deployment plus a regional OpenRouter domain gives you end-to-end residency; a misconfigured deployment silently breaks it on the leg you control, which is why verifying your deployment regions is essential.

## Getting Started

* Organization admins can upgrade to the Business plan under **Account Type** in [Settings > Preferences](https://openrouter.ai/settings/preferences). For Enterprise, [contact our enterprise team](https://openrouter.ai/enterprise/form).
* Review [Sovereign AI](/docs/guides/features/sovereign-ai) for combining in-region routing with ZDR and data collection controls
* Configure [BYOK](/docs/guides/overview/auth/byok) keys with region-appropriate deployments as described above
