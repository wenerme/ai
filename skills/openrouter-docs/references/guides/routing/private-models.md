> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Private Models

> Bring your own model to OpenRouter, scoped to approved users and organizations

<Note>
  Private Models are available for Enterprise Plan customers. Talk to your OpenRouter account representative, or visit [openrouter.ai/enterprise/form](https://openrouter.ai/enterprise/form) to learn about upgrading to Enterprise.
</Note>

Private Models let you route to your own custom, fine-tuned, or dedicated model deployments through OpenRouter, alongside the public models you already use. Think of it as "bring your own model" to OpenRouter, with the same API surface your team already uses.

Your private models and endpoints are only visible to the users and organizations you approve, and they will never show up in public model lists, rankings, search, charts, and benchmarks.

## How It Works

Once your private model endpoint is onboarded:

* Approved users and organizations call it through the standard OpenRouter API — the same endpoints they use for public models (chat completions and responses).
* The model slug behaves like any other OpenRouter model. It can be used with [Model Fallbacks](/guides/routing/model-fallbacks), [Provider Selection](/guides/routing/provider-selection), and other routing features.
* Approved private endpoints are prioritized for callers with access, while public fallback candidates remain available if you list them.

## Who It's For

Private Models is a good fit if:

* You already have a hosted model endpoint, a fine-tuned model, or a dedicated deployment of a public model that you want to route through OpenRouter.
* Your endpoint is OpenAI-compatible, or close enough that we can integrate it quickly.
* You want your team or organization to access these models through OpenRouter without exposing them publicly.
* You're on the Enterprise Plan.

## Requesting an Endpoint

Reach out to your account representative with:

* A short description of the model or endpoint you want to connect.
* The provider or hosting setup you use today.
* The API shape/spec of the model you are routing to.
* The users or organization who should be given access.

The OpenRouter team will handle onboarding each endpoint and access management directly with you.
