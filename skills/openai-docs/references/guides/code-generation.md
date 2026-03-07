# Code generation

Writing, reviewing, editing, and answering questions about code is one of the primary use cases for OpenAI models today. This guide walks through your options for code generation with GPT-5.4 and Codex.

## Get started

<div className="mb-10 w-full max-w-full overflow-hidden">
  </div>

## Use Codex

[**Codex**](https://developers.openai.com/codex/overview) is OpenAI's coding agent for software development. It helps you write, review and debug code. Interact with Codex in a variety of interfaces: in your IDE, through the CLI, on web and mobile sites, or in your CI/CD pipelines with the SDK. Codex is the best way to get agentic software engineering on your projects.

Codex works best with the latest models from the GPT-5 family, such as [`gpt-5.4`](https://developers.openai.com/api/docs/models/gpt-5.4). We offer a range of models specifically designed to work with coding agents like Codex, such as [`gpt-5.3-codex`](https://developers.openai.com/api/docs/models/gpt-5.3-codex), but starting with `gpt-5.4`, we recommend using the general-purpose model for most code generation tasks.

See the [Codex docs](https://developers.openai.com/codex) for setup guides, reference material, pricing, and more information.

## Integrate with coding models

For most API-based code generation, start with **`gpt-5.4`**. It handles both general-purpose work and coding, which makes it a strong default when your application needs to write code, reason about requirements, inspect docs, and handle broader workflows in one place.

This example shows how you can use the [Responses API](https://developers.openai.com/api/docs/api-reference/responses) for a code generation use case:

Default model for most coding tasks

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const result = await openai.responses.create({
  model: "gpt-5.4",
  input: "Find the null pointer exception: ...your code here...",
  reasoning: { effort: "high" },
});

console.log(result.output_text);
```

```python
from openai import OpenAI
client = OpenAI()

result = client.responses.create(
    model="gpt-5.4",
    input="Find the null pointer exception: ...your code here...",
    reasoning={ "effort": "high" },
)

print(result.output_text)
```

```bash
curl https://api.openai.com/v1/responses \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "gpt-5.4",
    "input": "Find the null pointer exception: ...your code here...",
    "reasoning": { "effort": "high" }
  }'
```


## Frontend development

Our models from the GPT-5 family are especially strong at frontend development, especially when combined with a coding agent harness such as Codex.

The demo applications below were one shot generations, i.e. generated from a single prompt without hand-written code. Use them to evaluate frontend generation quality and prompt patterns for UI-heavy code generation workflows.

## Next steps

- Visit the [Codex docs](https://developers.openai.com/codex) to learn what you can do with Codex, set up Codex in whichever interface you choose, or find more details.
- Read [Using GPT-5.4](https://developers.openai.com/api/docs/guides/latest-model) for model selection, features, and migration guidance.
- See [Prompt guidance for GPT-5.4](https://developers.openai.com/api/docs/guides/prompt-guidance) for prompting patterns that work well on coding and agentic tasks.
- Compare [`gpt-5.4`](https://developers.openai.com/api/docs/models/gpt-5.4) and [`gpt-5.3-codex`](https://developers.openai.com/api/docs/models/gpt-5.3-codex) on the model pages.