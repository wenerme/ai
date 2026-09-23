> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Jev SDK for TypeScript and Python (TypeSafe SDK)

> Point the official TypeSafe JavaScript or Python SDK at OpenRouter to call Jev with your OpenRouter API key

## TypeSafe SDK

You can point an existing [TypeSafe](https://docs.typesafe.ai) client at OpenRouter by changing its base URL. Requests to System One models such as [Jev](https://openrouter.ai/typesafe/jev-1.13) are then billed to your OpenRouter account and routed through OpenRouter's System One API. The TypeSafe SDK is available for JavaScript and TypeScript (`@typesafe-ai/sdk`) and for Python (`typesafe_sdk`).

If you would rather call Jev without the TypeSafe SDK, use the [Decisions API](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request) directly or through the OpenRouter [TypeScript](/docs/client-sdks/typescript/sdks/decisions/README), [Python](/docs/client-sdks/python/sdks/decisions/README), or [Go](/docs/client-sdks/go/sdks/decisions/README) SDK.

### Base URL

OpenRouter's System One API is available at the following base URL:

```text theme={null}
https://openrouter.ai/api
```

The SDK appends `/v1/systemone` to the base URL, so requests are sent to `https://openrouter.ai/api/v1/systemone`.

### Authentication

Use your [OpenRouter API key](https://openrouter.ai/settings/keys) as the `Authorization: Bearer <token>` header. The SDK sets this header from the `apiKey` option (`api_key` in Python) or the `TYPESAFE_API_KEY` environment variable.

### Migrating an existing client

Change the base URL and the API key. Everything else stays the same.

<CodeGroup>
  ```typescript title="client.ts" lines theme={null}
  import { TypeSafeClient } from '@typesafe-ai/sdk';

  const client = new TypeSafeClient({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api',
  });
  ```

  ```python title="client.py" lines theme={null}
  import os

  from typesafe_sdk import TypeSafeClient

  client = TypeSafeClient(
      api_key=os.environ["OPENROUTER_API_KEY"],
      base_url="https://openrouter.ai/api",
  )
  ```
</CodeGroup>

Both SDKs also read the base URL from the `TYPESAFE_BASE_URL` environment variable, so you can leave the constructor unchanged and set `TYPESAFE_BASE_URL=https://openrouter.ai/api` and `TYPESAFE_API_KEY=<your OpenRouter API key>` instead.

### Evaluating state against questions

<CodeGroup>
  ```typescript title="triage.ts" lines theme={null}
  const result = await client.systemOne({
    model: 'jev-1.13',
    state: 'I was charged twice for my subscription.',
    questions: {
      refund: { type: 'noul', instructions: 'Is the customer asking for money back?' },
      department: {
        type: 'choice',
        instructions: 'Which team should handle this?',
        criteria: { billing: 'Charges and refunds', technical: 'Bugs and outages' },
      },
    },
  });

  console.log(result.answers.refund); // { type: 'noul', noul: 0.98 }
  ```

  ```python title="triage.py" lines theme={null}
  result = client.system_one(
      model="jev-1.13",
      state="I was charged twice for my subscription.",
      questions={
          "refund": {"type": "noul", "instructions": "Is the customer asking for money back?"},
          "department": {
              "type": "choice",
              "instructions": "Which team should handle this?",
              "criteria": {"billing": "Charges and refunds", "technical": "Bugs and outages"},
          },
      },
  )

  print(result.answers["refund"])
  ```
</CodeGroup>

### Model IDs

The System One API accepts TypeSafe's bare System One model IDs and maps them onto OpenRouter's `typesafe/` namespace before routing:

* `jev-1.13` is routed as `typesafe/jev-1.13`.
* `jev-latest` is routed as `~typesafe/jev-latest`, OpenRouter's alias for the newest Jev release.
* IDs that already carry an author prefix, such as `typesafe/jev-1.13`, are used as-is.

The `model` field in the response contains the OpenRouter model ID of the System One model that served the request.

### Supported endpoints

* `POST /api/v1/systemone` sends state and typed questions to a System One model and returns its answers.

The TypeSafe SDK's model listing (`client.models.list()` in JavaScript) calls `GET /api/v1/models`, which is OpenRouter's [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties) and returns OpenRouter's response shape rather than TypeSafe's, so the SDK rejects it. Browse [OpenRouter's System One models](https://openrouter.ai/typesafe) or call the Models API directly instead.

### Request and response format

The System One API implements TypeSafe's request and response shapes. Requests require `model`, `state`, and `questions`, and responses contain `model`, `answers`, and `usage`. OpenRouter additionally returns `id`, `provider`, and `usage.cost`, which both SDKs pass through without error.

```bash title="systemone.sh" lines theme={null}
curl https://openrouter.ai/api/v1/systemone \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jev-1.13",
    "state": "I was charged twice for my subscription.",
    "questions": {
      "refund": {
        "type": "noul",
        "instructions": "Is the customer asking for money back?"
      }
    }
  }'
```

```json title="Response" theme={null}
{
  "id": "gen-dec-1789738314-X5e5eKGQdvR9rblyX250",
  "model": "typesafe/jev-1.13-20260917",
  "provider": "TypeSafe",
  "answers": {
    "refund": { "type": "noul", "noul": 0.98 }
  },
  "usage": { "input_tokens": 275, "output_tokens": 20, "cost": 0.00003 }
}
```

### Jev resources on OpenRouter

* [Jev model page](https://openrouter.ai/typesafe/jev-1.13) for pricing, context length, and provider details
* [Gate Agent Tool Calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) for approving, blocking, or escalating agent tool calls
* [Cut LLM Cost with a Jev-Verified Cascade](/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) for verifying cheap-model answers before escalating
* [Jev Lab](https://openrouter.ai/labs/jev) for interactive demos of Jev's triage, extraction, and oversight patterns
* [TypeSafe documentation](https://docs.typesafe.ai) for System One concepts, question types, and SDK reference
