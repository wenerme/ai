> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Private Models

<Note>
  Private Models are currently in **invite-only beta** for Enterprise Plan customers. To request access, email [product@openrouter.ai](mailto:product@openrouter.ai) or contact your OpenRouter account representative.
</Note>

Private Models let you route to your own custom, fine-tuned, or dedicated model deployments through OpenRouter, alongside the public models you already use. Think of it as "bring your own model" to OpenRouter, with the same API surface your team already uses.

Your private models and endpoints are only visible to the users and organizations you approve, and they will never show up in public model lists, rankings, search, charts, and benchmarks.

## How It Works

Once your private model endpoint is onboarded:

* Approved users and organizations call it through the standard OpenRouter API — the same endpoints they use for public models (chat completions and responses).
* The model slug behaves like any other OpenRouter model. It can be used with [Model Fallbacks](/docs/guides/routing/model-fallbacks), [Provider Selection](/docs/guides/routing/provider-selection), and other routing features.
* Approved private endpoints are prioritized for callers with access, while public fallback candidates remain available if you list them.

## Who It's For

Private Models is a good fit if:

* You already have a hosted model endpoint, a fine-tuned model, or a dedicated deployment of a public model that you want to route through OpenRouter.
* Your endpoint is OpenAI-compatible, or close enough that we can integrate it quickly.
* You want your team or organization to access these models through OpenRouter without exposing them publicly.
* You're on the Enterprise Plan and can share product feedback during the beta.

## Requesting Access

Email [product@openrouter.ai](mailto:product@openrouter.ai) or reach out to your account representative with:

* A short description of the model or endpoint you want to connect.
* The provider or hosting setup you use today.
* Whether the endpoint supports standard chat completions.
* The users or organization who should be given access.
* Any context on how you plan to use it, so we can prioritize the right integration work.

During the beta, the OpenRouter team handles onboarding and access management directly with you. We'll share feedback channels for setup friction, routing behavior, and anything that feels confusing.