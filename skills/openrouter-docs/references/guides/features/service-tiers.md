> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Service Tiers

## Service Tiers

The `service_tier` parameter lets you control cost and latency tradeoffs when sending requests through OpenRouter. You can pass it in your request to select a specific processing tier, and the response will indicate which tier was actually used.

<Note>
  Not every model from a provider supports service tiers. Additionally, your requested service tier is not guaranteed to be honored — the provider may serve your request on a different tier depending on availability. The `service_tier` field in the response indicates which tier was actually used, and you will be billed according to that actual tier.
</Note>

### Supported Providers

**OpenAI**

* Accepted request values: `auto`, `default`, `flex`, `priority` (default if omitted: `auto`)
* Possible response values: `default`, `flex`, `priority`

Learn more in OpenAI's [Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create#\(resource\)%20chat.completions%20%3E%20\(method\)%20create%20%3E%20\(params\)%200.non_streaming%20%3E%20\(param\)%20service_tier%20%3E%20\(schema\)) and [Responses](https://developers.openai.com/api/reference/resources/responses/methods/create#\(resource\)%20responses%20%3E%20\(method\)%20create%20%3E%20\(params\)%200.non_streaming%20%3E%20\(param\)%20service_tier%20%3E%20\(schema\)) API documentation. See OpenAI's [pricing page](https://developers.openai.com/api/docs/pricing) for details on cost differences between tiers.

**Google (Vertex AI)**

* Accepted request values: `standard`, `flex`, `priority` (default if omitted: `standard`)
* Possible response values: `standard`, `flex`, `priority`

Learn more in Google's [Flex](https://cloud.google.com/vertex-ai/generative-ai/docs/flex-paygo) and [Priority](https://cloud.google.com/vertex-ai/generative-ai/docs/priority-paygo) documentation.

**Google (AI Studio)**

* Accepted request values: `standard`, `flex`, `priority` (default if omitted: `standard`)
* Possible response values: `standard`, `flex`, `priority`

Learn more in Google's [Flex](https://ai.google.dev/gemini-api/docs/flex-inference) and [Priority](https://ai.google.dev/gemini-api/docs/priority-inference) documentation.

### API Response Differences

The API response includes a `service_tier` field that indicates which capacity tier was actually used to serve your request. The placement of this field varies by API format:

* **Chat Completions API** (`/api/v1/chat/completions`): `service_tier` is returned at the **top level** of the response object, matching OpenAI's native format.
* **Responses API** (`/api/v1/responses`): `service_tier` is returned at the **top level** of the response object, matching OpenAI's native format.
* **Messages API** (`/api/v1/messages`): `service_tier` is returned inside the **`usage` object**, matching Anthropic's native format.