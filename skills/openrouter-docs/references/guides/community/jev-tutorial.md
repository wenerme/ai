> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Jev Tutorial: Make Your First Decision Call on OpenRouter

> Step-by-step Jev tutorial. Send a typed decision request to the TypeSafe model on OpenRouter with curl, TypeScript, or Python and read the probabilities it returns

## Jev Tutorial

This tutorial takes you from zero to a first typed decision from Jev in three steps. Jev is available as `typesafe/jev-1.13` on OpenRouter, and all you need is an OpenRouter API key.

If you want a few concepts before diving into code, start with the [Jev documentation hub](/docs/guides/community/jev). If you already know Jev and want the full request schema, go to the [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request).

### What Jev returns

Jev is a [System One](https://docs.typesafe.ai/concepts/system-one) decision model from [TypeSafe](https://docs.typesafe.ai). Instead of generating text, Jev answers typed questions about the state you send it:

* **Choice** picks one option from a set you define and returns a probability for each option.
* **Noul** answers a yes or no question and returns the probability of yes.
* **Score** places the input on an ordered scale you define and returns a probability-weighted position.

Because the answer is a typed value with an associated probability, your implementation can branch on it directly. There is no free-form text to parse.

### Step 1: Get an OpenRouter API key

Create a key at [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys), then export it:

```bash theme={null}
export OPENROUTER_API_KEY=sk-or-...
```

<Warning>
  Jev calls are billed to your OpenRouter account at the input price shown on the [Jev model page](https://openrouter.ai/typesafe/jev-1.13). Keep the key server-side and never ship it in browser code.
</Warning>

### Step 2: Make your first decision call

The example below routes a support ticket. It asks Jev three independent questions in one request, whether the ticket is a bug (Noul), which team owns it (Choice), and how urgent it is (Score).

<CodeGroup>
  ```bash curl theme={null}
  curl https://openrouter.ai/api/alpha/decisions \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "typesafe/jev-1.13",
      "state": {
        "customer_tier": "enterprise",
        "ticket": "My checkout page shows a blank screen after I click Pay. I have tried two browsers."
      },
      "questions": {
        "is_bug": {
          "type": "noul",
          "instructions": "Is the customer reporting a software defect?",
          "criteria": {
            "true": "The customer describes broken or unexpected product behavior.",
            "false": "The customer is asking a question or requesting a feature."
          }
        },
        "team": {
          "type": "choice",
          "instructions": "Which team should own this ticket?",
          "criteria": {
            "payments": "Checkout, billing, or payment processing issues.",
            "frontend": "Rendering, layout, or browser compatibility issues.",
            "account": "Login, permissions, or profile issues."
          }
        },
        "urgency": {
          "type": "score",
          "instructions": "How urgent is this ticket?",
          "criteria": [
            "Can wait for the next release",
            "Should be fixed this week",
            "Blocking revenue right now"
          ]
        }
      }
    }'
  ```

  ```typescript TypeScript theme={null}
  const response = await fetch('https://openrouter.ai/api/alpha/decisions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'typesafe/jev-1.13',
      state: {
        customer_tier: 'enterprise',
        ticket:
          'My checkout page shows a blank screen after I click Pay. I have tried two browsers.',
      },
      questions: {
        is_bug: {
          type: 'noul',
          instructions: 'Is the customer reporting a software defect?',
          criteria: {
            true: 'The customer describes broken or unexpected product behavior.',
            false: 'The customer is asking a question or requesting a feature.',
          },
        },
        team: {
          type: 'choice',
          instructions: 'Which team should own this ticket?',
          criteria: {
            payments: 'Checkout, billing, or payment processing issues.',
            frontend: 'Rendering, layout, or browser compatibility issues.',
            account: 'Login, permissions, or profile issues.',
          },
        },
        urgency: {
          type: 'score',
          instructions: 'How urgent is this ticket?',
          criteria: [
            'Can wait for the next release',
            'Should be fixed this week',
            'Blocking revenue right now',
          ],
        },
      },
    }),
  });

  const result = await response.json();
  console.log(result.answers);
  ```

  ```python Python theme={null}
  import os

  import requests

  response = requests.post(
      "https://openrouter.ai/api/alpha/decisions",
      headers={
          "Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
          "Content-Type": "application/json",
      },
      json={
          "model": "typesafe/jev-1.13",
          "state": {
              "customer_tier": "enterprise",
              "ticket": "My checkout page shows a blank screen after I click Pay. I have tried two browsers.",
          },
          "questions": {
              "is_bug": {
                  "type": "noul",
                  "instructions": "Is the customer reporting a software defect?",
                  "criteria": {
                      "true": "The customer describes broken or unexpected product behavior.",
                      "false": "The customer is asking a question or requesting a feature.",
                  },
              },
              "team": {
                  "type": "choice",
                  "instructions": "Which team should own this ticket?",
                  "criteria": {
                      "payments": "Checkout, billing, or payment processing issues.",
                      "frontend": "Rendering, layout, or browser compatibility issues.",
                      "account": "Login, permissions, or profile issues.",
                  },
              },
              "urgency": {
                  "type": "score",
                  "instructions": "How urgent is this ticket?",
                  "criteria": [
                      "Can wait for the next release",
                      "Should be fixed this week",
                      "Blocking revenue right now",
                  ],
              },
          },
      },
  )

  print(response.json()["answers"])
  ```
</CodeGroup>

### Step 3: Read the answers

The response contains one typed answer per question, plus usage. This is an actual response to the request above, captured from the live API. Your probabilities will differ slightly from run to run, and the field shapes are documented in the [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request):

```json theme={null}
{
  "id": "gen-dec-1790015143-AIaTutprXsJ5EwohRSjb",
  "model": "typesafe/jev-1.13-20260917",
  "provider": "TypeSafe",
  "answers": {
    "is_bug": { "type": "noul", "noul": 0.96 },
    "team": {
      "type": "choice",
      "choice": "payments",
      "confidence": 0.67,
      "probabilities": { "payments": 0.78, "frontend": 0.22, "account": 0 }
    },
    "urgency": {
      "type": "score",
      "score": 1.99,
      "confidence": 0.99,
      "probabilities": { "0": 0, "1": 0, "2": 1 },
      "legend": {
        "0": "Can wait for the next release",
        "1": "Should be fixed this week",
        "2": "Blocking revenue right now"
      }
    }
  },
  "usage": { "input_tokens": 476, "output_tokens": 70, "cost": 0.000019992 }
}
```

The `model` field in the response names the dated snapshot that served your request. Sending `typesafe/jev-1.13` resolves to the current `1.13` release, so a dated suffix here is expected.

How to read each field:

* `is_bug.noul` is the probability that the answer is yes, a number between `0` and `1`. A value of `0.96` means Jev is pretty sure this is a defect. Values near `0.5` mean the answer is about equally likely to be yes or no. It doesn't mean the bug is "medium."
* `team.choice` is the selected option. `team.probabilities` compares the different options you listed as alternatives. `team.confidence` summarizes how concentrated that distribution is.
* `urgency.score` is the probability-weighted position on your ordered scale, with index `0` corresponding to the first criterion you listed. A score of `1.99` sits almost exactly on "Blocking revenue right now."

You'll need to branch on these values in your code. For example, you might auto-route tickets where `team.confidence` is above a threshold tuned on labeled tickets, and send the rest to a human queue. Confidence describes the distribution of the alternatives, not whether the workflow is safe to run, so pick thresholds from the cost of each kind of mistake rather than from a round number.

### Use the TypeSafe SDK instead

If you're already using the TypeSafe JavaScript or Python SDK, you'll just need to point it at OpenRouter and keep your existing code. The [Jev SDK guide](/docs/guides/community/typesafe-sdk) covers setting the base URL, authentication, and the expected response shape.

```typescript theme={null}
import { TypeSafeClient } from '@typesafe-ai/sdk';

const client = new TypeSafeClient({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api',
});
```

```python theme={null}
import os

from typesafe_sdk import TypeSafeClient

client = TypeSafeClient(
    api_key=os.environ["OPENROUTER_API_KEY"],
    base_url="https://openrouter.ai/api",
)
```

You can also call the Decisions API through the OpenRouter [TypeScript](/docs/client-sdks/typescript/sdks/decisions/README), [Python](/docs/client-sdks/python/sdks/decisions/README), or [Go](/docs/client-sdks/go/sdks/decisions/README) SDK.

### Frequently asked questions

**How do I get access to Jev?**
Simply create an OpenRouter API key and send a request to the Decisions API with `model` set to `typesafe/jev-1.13`. You don't need a separate signup, a waitlist, or a TypeSafe account.

**What does Jev cost?**
Jev is billed based on the number of input tokens, and output tokens are free. On the [Jev model page](https://openrouter.ai/typesafe/jev-1.13), you can find the current price and the context length. Finally, each response has a `usage.cost` field that reports what that call cost you in USD.

**Is Jev an LLM?**
No, Jev is a System One decision model which returns answers that are typed with probabilities rather than generated text, and does not return any reasoning trace or explanation for the answer.

**Can I ask more than one question per request?**
Yes, put every independent question about the same state in one request. All questions in the request are answered in parallel and cannot see each other's answers.

**Can I use `~typesafe/jev-latest`?**
Yes. The current Jev release is tracked under the `~typesafe/jev-latest` alias. Pin `typesafe/jev-1.13` when you need thresholds tuned against one specific version to stay stable.

### Next steps

* [Jev documentation hub](/docs/guides/community/jev) for concepts, every Jev page on OpenRouter, and links to the TypeSafe docs
* [Gate Agent Tool Calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) to approve, block, or escalate agent tool calls
* [Cut LLM Cost with a Jev-Verified Cascade](/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) to verify cheap-model answers before escalating
* [Jev Lab](https://openrouter.ai/labs/jev) for interactive demos of triage, extraction, and oversight
* [TypeSafe primitives](https://docs.typesafe.ai/primitives) and [confidence](https://docs.typesafe.ai/confidence) docs for writing better questions and choosing thresholds
