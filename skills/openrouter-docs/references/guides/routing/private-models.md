> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Private Models

> Bring your own model to OpenRouter, scoped to approved users and organizations

<Note>
  Private Models are available for Enterprise Plan customers. Talk to your OpenRouter account representative, or visit [openrouter.ai/enterprise/form](https://openrouter.ai/enterprise/form) to learn about upgrading to Enterprise.
</Note>

Private Models let you route to your own custom, fine-tuned, or dedicated model endpoints through OpenRouter, alongside the public models you already use. Think of it as "bring your own model" to OpenRouter, with the same API surface your team already uses.

Your private models and endpoints are only visible to the users and organizations you approve, and they will never show up in public model lists, rankings, search, charts, and benchmarks.

## How it works

Once your private model endpoint is onboarded:

* Approved users and organizations call it through the standard OpenRouter API, the same endpoints they use for public models (chat completions and responses).
* The model slug behaves like any other OpenRouter model. It can be used with [Model Fallbacks](/docs/guides/routing/model-fallbacks), [Provider Selection](/docs/guides/routing/provider-selection), and other routing features.
* Approved private endpoints are prioritized for callers with access, while public fallback candidates remain available if you list them.

## Adding a private endpoint

A private endpoint must meet two requirements:

* It is hosted by a provider that OpenRouter supports for [BYOK](/docs/guides/overview/auth/byok), since requests are authenticated with your own provider key.
* It serves a model that already exists in the OpenRouter catalog, with the same request and response shape and the same behaviors as that model. The private endpoint inherits the model's slug and capabilities.

Organization admins on the Enterprise Plan can add private endpoints themselves from [Settings > Private Endpoints](https://openrouter.ai/settings/private-endpoints). Each endpoint goes through four steps:

1. **Blueprint.** Select the model from the catalog that your endpoint is providing, and the BYOK provider that hosts your capacity.
2. **Connect.** Enter the HTTPS base URL of your endpoint and the upstream model or deployment ID it serves. You can also set pricing for cost reporting and declare whether the endpoint retains prompts (see [ZDR](/docs/guides/features/zdr)).
3. **Test.** OpenRouter sends a request to your endpoint using the provider key saved in one of your workspaces under [BYOK](/docs/guides/overview/auth/byok). The checks confirm the key is accepted, the response is OpenAI-compatible, streaming works, usage fields are returned, and the served model ID matches what you entered.
4. **Activate.** Once the checks pass, activation makes the model callable by workspaces in your organization.

Until it is activated, an endpoint stays hidden and is not routable. You can leave the wizard and resume setup later from the Private Endpoints list.

Requests to a private endpoint are authenticated with your own provider key, so BYOK keys must be configured in each workspace that calls it.

## Endpoint limit

Each organization can have up to 10 private endpoints by default. Every endpoint you have created counts toward the limit, including endpoints that are still hidden because setup is not finished.

If you think you will need more than 10 private endpoints, talk to your OpenRouter account representative about raising the limit for your organization.

## Who it's for

Private Models is a good fit if:

* You already have a hosted model endpoint, a fine-tuned model, or a dedicated deployment of a public model that you want to route through OpenRouter.
* Your endpoint is OpenAI-compatible, or close enough that we can integrate it quickly.
* You want your team or organization to access these models through OpenRouter without exposing them publicly.
* You're on the Enterprise Plan.

## In-Region Routing

A private endpoint may be eligible for in-region routing when OpenRouter is able to derive a region from its base URL. Endpoints without a derived region are routed on the global `openrouter.ai` domain. See the [In-Region Routing guide](/docs/guides/features/in-region-routing#byok-with-in-region-routing) for supported providers.

## Requesting access

Private Endpoints is an add-on to the Enterprise Plan. To enable it for your organization, reach out to your account representative. Once it is enabled, organization admins can add and manage endpoints from [Settings > Private Endpoints](https://openrouter.ai/settings/private-endpoints).
