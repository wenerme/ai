# Migrate from prompt objects

OpenAI is deprecating reusable prompt objects in the API. Prompt creation will
  be de-emphasized beginning June 3, 2026, and `v1/prompts` is scheduled to shut
  down on November 30, 2026. See the [deprecations
  page](https://developers.openai.com/api/docs/deprecations#2026-06-03-reusable-prompts) for the current
  timeline.

To migrate away from **Prompts** in the OpenAI API platform, move the prompt content out of the managed `prompt` object and into your application code. This gives you more control over review, testing, deployment, and versioning.

## Before: using a Prompt Object

Use a prompt object

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  prompt: {
    prompt_id: "pmpt_123",
    version: "1",
    variables: {
      customer_name: "Acme",
      issue: "billing question",
    },
  },
});
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    prompt={
        "prompt_id": "pmpt_123",
        "version": "1",
        "variables": {
            "customer_name": "Acme",
            "issue": "billing question",
        },
    }
)
```

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "prompt": {
      "prompt_id": "pmpt_123",
      "version": "1",
      "variables": {
        "customer_name": "Acme",
        "issue": "billing question"
      }
    }
  }'
```


## After: inline the prompt in code

Inline the prompt in code

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.5",
  input: [
    {
      role: "system",
      content:
        "You are a helpful support assistant. Be concise, accurate, and friendly.",
    },
    {
      role: "user",
      content:
        "Customer name: Acme. Issue: billing question. Write a response to the customer.",
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.5",
    input=[
        {
            "role": "system",
            "content": "You are a helpful support assistant. Be concise, accurate, and friendly.",
        },
        {
            "role": "user",
            "content": "Customer name: Acme. Issue: billing question. Write a response to the customer.",
        },
    ],
)

print(response.output_text)
```

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.5",
    "input": [
      {
        "role": "system",
        "content": "You are a helpful support assistant. Be concise, accurate, and friendly."
      },
      {
        "role": "user",
        "content": "Customer name: Acme. Issue: billing question. Write a response to the customer."
      }
    ]
  }'
```


## Use Codex to migrate

Use the [OpenAI Developers plugin](https://developers.openai.com/learn/developers-codex-plugin) and [OpenAI Docs skill](https://github.com/openai/skills/tree/main/skills/.curated/openai-docs) to automate your migration and accelerate building with the OpenAI API.

```text
$openai-docs update this project to store prompts in code instead of using a prompts object
```

## What changes

Instead of referencing a saved prompt object from an API request, store the prompt text in your codebase and pass the generated messages directly as `input` in the Responses API call.

- **Move prompt content into source code** so prompt changes go through the same review and release process as product logic.
- **Replace prompt variables with function arguments** so dynamic values are explicit and typed in your application.
- **Pass messages through `input`** in the Responses API call instead of using the `prompt` object.
- **Move versioning to your repo** using git commits, PR review, and tests or evals.
- **Keep static content first and dynamic content later** to preserve prompt caching benefits, since cache hits depend on exact prefix matches.

## Example

Build prompts with a helper function

```javascript
import OpenAI from "openai";

const client = new OpenAI();

function buildSupportPrompt({ customerName, issue }) {
  return [
    {
      role: "system",
      content:
        "You are a helpful support assistant. Be concise, accurate, and friendly. Do not invent policy details.",
    },
    {
      role: "user",
      content: `Customer name: ${customerName}. Issue: ${issue}. Write a response to the customer.`,
    },
  ];
}

const response = await client.responses.create({
  model: "gpt-5.5",
  input: buildSupportPrompt({
    customerName: "Acme",
    issue: "billing question",
  }),
});
```

```python
from openai import OpenAI

client = OpenAI()

def build_support_prompt(customer_name, issue):
    return [
        {
            "role": "system",
            "content": "You are a helpful support assistant. Be concise, accurate, and friendly. Do not invent policy details.",
        },
        {
            "role": "user",
            "content": f"Customer name: {customer_name}. Issue: {issue}. Write a response to the customer.",
        },
    ]

response = client.responses.create(
    model="gpt-5.5",
    input=build_support_prompt(
        customer_name="Acme",
        issue="billing question",
    ),
)
```


## What you gain

You get tighter engineering control: prompts live with the product code, changes go through PRs, tests and evals can run in CI, and rollout or experimentation can be managed through your own config or feature flags.

Don't scatter prompts inline across the codebase. Create a small `prompts/` module, keep each prompt as a named builder function, and add lightweight eval fixtures so prompt changes are reviewed like product logic.