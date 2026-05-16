> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Zero Data Retention

Zero Data Retention (ZDR) means that a provider will not store your data for any period of time.

OpenRouter has [privacy settings](/settings/privacy) that, when enabled, only allow you to route to endpoints that have a Zero Data Retention policy. You can enforce ZDR globally, per model group, per guardrail, or per request.

Providers that do not retain your data are also unable to train on your data. However we do have some endpoints & providers who do not train on your data but *do* retain it (e.g. to scan for abuse or for legal reasons). OpenRouter gives you controls over both of these policies.

## How OpenRouter Manages Data Policies

OpenRouter works with providers to understand each of their data policies and structures the policy data in a way that gives you control over which providers you want to route to.

Note that a provider's general policy may differ from the specific policy for a given endpoint. OpenRouter keeps track of the specific policy for each endpoint, works with providers to keep these policies up to date, and in some cases creates special agreements with providers to ensure data retention or training policies that are more privacy-focused than their default policies.

If OpenRouter is not able to establish or ascertain a clear policy for a provider or endpoint, we take a conservative stance and assume that the endpoint both retains and trains on data and mark it as such.

A full list of providers and their data policies can be found [here](/docs/guides/privacy/provider-logging#data-retention--logging). Note that this list shows the default policy for each provider; if there is a particular endpoint that has a policy that differs from the provider default, it may not be available if "ZDR Only" is enabled.

## Per-Model-Group ZDR Enforcement

Rather than a single global toggle, OpenRouter lets you enforce ZDR independently for different model groups. This is available in both your [account-level privacy settings](/settings/privacy) and in [guardrails](/docs/guides/features/guardrails).

The four model group scopes are:

| Model group      | Effect when enabled                                                           |
| ---------------- | ----------------------------------------------------------------------------- |
| **Anthropic**    | Removes first-party Anthropic endpoints (Bedrock and Vertex remain available) |
| **OpenAI**       | Removes first-party OpenAI endpoints (Azure remains available)                |
| **Google**       | Removes AI Studio endpoints (Vertex remains available)                        |
| **Non-frontier** | Removes all other non-ZDR endpoints                                           |

Per-model-group ZDR is useful when you only need ZDR enforcement for certain model groups. For example, you may want to enforce ZDR for non-frontier models while keeping first-party Anthropic, OpenAI, and Google endpoints available without the ZDR restriction.

### Account-level settings

In your [privacy settings](/settings/privacy), each model group has its own toggle. Enabling a scope restricts all your requests to ZDR endpoints for that model group.

### Guardrail-level settings

When creating or editing a [guardrail](/docs/guides/features/guardrails), you can set ZDR independently for each model group. This lets you apply different ZDR policies to different API keys or organization members.

In the API, these are represented as separate fields on the guardrail object:

| Field                   | Description                            |
| ----------------------- | -------------------------------------- |
| `enforce_zdr_anthropic` | Enforce ZDR for Anthropic endpoints    |
| `enforce_zdr_openai`    | Enforce ZDR for OpenAI endpoints       |
| `enforce_zdr_google`    | Enforce ZDR for Google endpoints       |
| `enforce_zdr_other`     | Enforce ZDR for non-frontier endpoints |

The legacy `enforce_zdr` field is deprecated. When provided, its value is copied into any per-model-group fields that are not explicitly set on the request. Use the per-model-group fields directly for new integrations.

## Per-Request ZDR Enforcement

In addition to account-level and guardrail-level settings, you can enforce Zero Data Retention on a per-request basis using the `zdr` parameter in your API calls.

The request-level `zdr` parameter operates as an "OR" with your account-wide and guardrail ZDR settings — if any is enabled, ZDR enforcement will be applied. This means the per-request parameter can only be used to ensure ZDR is enabled for a specific request, not to override or disable account-wide or guardrail enforcement.

This is useful for customers who don't want to globally enforce ZDR but need to ensure specific requests only route to ZDR endpoints.

### Usage

Include the `zdr` parameter in your provider preferences:

```json
{
  "model": "gpt-4",
  "messages": [...],
  "provider": {
    "zdr": true
  }
}
```

When `zdr` is set to `true`, the request will only be routed to endpoints that have a Zero Data Retention policy. When `zdr` is `false` or not provided, ZDR enforcement still applies if enabled in your account or guardrail settings.

## Caching

Some endpoints/models provide implicit caching of prompts. This keeps repeated prompt data in an in-memory cache in the provider's datacenter, so that the repeated part of the prompt does not need to be re-processed. This can lead to considerable cost savings.

OpenRouter has taken the stance that in-memory caching of prompts is *not* considered "retaining" data, and we therefore allow endpoints/models with implicit caching to be hit when a ZDR routing policy is in effect.

## OpenRouter's Retention Policy

OpenRouter itself has a ZDR policy; your prompts are not retained unless you specifically opt in to prompt logging.

## Zero Retention Endpoints

The following endpoints have a ZDR policy. Note that this list is also available progammatically via [https://openrouter.ai/api/v1/endpoints/zdr](https://openrouter.ai/api/v1/endpoints/zdr). It is automatically updated when there are changes to a provider's data policy.: