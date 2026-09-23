> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Jev Documentation: Using the TypeSafe Decision Model on OpenRouter

> The OpenRouter hub for Jev, the TypeSafe decision model. What Jev is, how to get access, the Decisions API, TypeScript and Python SDKs, cookbooks, pricing, and demos

## Jev on OpenRouter

Jev is a structured decision model from [TypeSafe](https://docs.typesafe.ai), and the first of its System One models. Send it application state and one or more typed questions, and get back a typed answer with probabilities instead of generated text. `typesafe/jev-1.13` (or the `~typesafe/jev-latest` alias) is available to anyone with an [OpenRouter API key](https://openrouter.ai/settings/keys), and billed to your OpenRouter account.

This is the index for every Jev resource on OpenRouter, and your entry point to the upstream TypeSafe documentation.

<CardGroup cols={2}>
  <Card title="Jev Tutorial" icon="bolt" href="/docs/guides/community/jev-tutorial">
    Step-by-step quickstart. Make your first Choice, Noul, and Score call with curl, TypeScript, or Python.
  </Card>

  <Card title="Jev model page" icon="cube" href="https://openrouter.ai/typesafe/jev-1.13">
    Current pricing, context length, provider, and data policy.
  </Card>

  <Card title="Decisions API reference" icon="code" href="/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request">
    Full request and response schema for `POST /api/alpha/decisions`.
  </Card>

  <Card title="Jev SDK for TypeScript and Python" icon="puzzle-piece" href="/docs/guides/community/typesafe-sdk">
    Point the official TypeSafe SDK at OpenRouter with a one-line base URL change.
  </Card>
</CardGroup>

### What Jev is

Jev is a [System One](https://docs.typesafe.ai/concepts/system-one) model. System One models make fast, structured decisions for software. They are suited for any routing, classification, verification, ranking, or other decision point in your app where a predictable typed answer matters more than generated prose.

Jev answers three kinds of question, called primitives:

| Primitive                                            | Question it answers                       | What comes back                                                                       |
| ---------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| [Choice](https://docs.typesafe.ai/primitives/choice) | Which one of these options?               | The selected option, a probability for each option, and a confidence value            |
| [Noul](https://docs.typesafe.ai/primitives/noul)     | Does this condition hold?                 | The probability of yes                                                                |
| [Score](https://docs.typesafe.ai/primitives/score)   | Where does this fall on an ordered scale? | A probability-weighted position, a probability for each level, and a confidence value |

Because the output is typed, code branches on it directly. Jev does not produce reasoning traces, explanations, or free-form text. It is not a drop-in replacement for a chat model. It replaces the prompt-and-parse step where you were asking an LLM a narrow question and extracting a label from its answer.

Below are the key facts, current as of the [Jev model page](https://openrouter.ai/typesafe/jev-1.13):

* **Model ID:** `typesafe/jev-1.13`. The `~typesafe/jev-latest` alias tracks the newest release.
* **Input:** text, as a `state` object plus your `questions`. Context length is 32,000 tokens.
* **Output:** typed decisions. Output tokens are free. You pay per input token at the price on the model page.
* **Provider:** TypeSafe, routed through OpenRouter.

### Get access to Jev

There's no waitlist or separate TypeSafe account. Just create an [OpenRouter API key](https://openrouter.ai/settings/keys), and then follow the [Jev tutorial](/docs/guides/community/jev-tutorial). Your first call takes under five minutes.

### Two ways to call Jev

Jev is exposed via two OpenRouter API surfaces, the Decisions API and the System One API. Both surfaces require the same OpenRouter API key and are billed to the same OpenRouter account.

| Surface        | Endpoint                                         | Use it when                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Decisions API  | `POST https://openrouter.ai/api/alpha/decisions` | You are calling Jev from any language with plain HTTP, or through the OpenRouter [TypeScript](/docs/client-sdks/typescript/sdks/decisions/README), [Python](/docs/client-sdks/python/sdks/decisions/README), or [Go](/docs/client-sdks/go/sdks/decisions/README) SDK |
| System One API | `POST https://openrouter.ai/api/v1/systemone`    | You already use the TypeSafe JavaScript or Python SDK and want to switch it to OpenRouter by changing the base URL                                                                                                                                    |

The [Jev SDK guide](/docs/guides/community/typesafe-sdk) documents the System One path. The [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request) covers the Decisions path.

### Cookbooks

Step-by-step recipes with runnable code:

* [Gate Agent Tool Calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) checks each risky agent tool call against the user's request so safe calls run, unsupported calls are refused, and only ambiguous calls pause for a human.
* [Cut LLM Cost with a Jev-Verified Cascade](/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) drafts with a cheap model, verifies the draft against retrieved context with Jev, and escalates to a stronger model only when the check fails.

### Interactive demos

[Jev Lab](https://openrouter.ai/labs/jev) runs Jev live in the browser across several patterns, including [ticket triage](https://openrouter.ai/labs/jev/triage), [agent oversight](https://openrouter.ai/labs/jev/overseer), and [structured extraction](https://openrouter.ai/labs/jev/extract). Each demo shows you the state, the questions, and the raw probabilities Jev returns.

### TypeSafe documentation

TypeSafe maintains the concept, prompting, and SDK documentation for Jev. These are the pages to read when designing questions and thresholds:

* [System One](https://docs.typesafe.ai/concepts/system-one) explains the model family and how it differs from generative models.
* [How to build with System One](https://docs.typesafe.ai/concepts/how-to-build-with-system-one) covers decomposing a workflow into judgments.
* [State](https://docs.typesafe.ai/concepts/state) covers what to send as context and how to reference nested fields.
* [Primitives](https://docs.typesafe.ai/primitives) covers Choice, Noul, and Score in detail.
* [Confidence](https://docs.typesafe.ai/confidence) covers reading probabilities and choosing thresholds.
* [JavaScript SDK](https://docs.typesafe.ai/sdk/javascript) and [Python SDK](https://docs.typesafe.ai/sdk/python) are the official client references.

### Frequently asked questions

**Is Jev an LLM?**
No. Jev is a System One decision model. It returns typed answers, with probabilities associated with them. Jev doesn't return text, reasoning, or explanations. When you need prose, use a chat model. When you need a decision that your code can act on, use Jev.

**Who makes Jev?**
TypeSafe. OpenRouter routes your request to TypeSafe, then bills it to your OpenRouter account.

**How much does Jev cost?**
Jev charges for input tokens, and output tokens are free. To find the current input token price, see the [Jev model page](https://openrouter.ai/typesafe/jev-1.13). Every Jev response includes a `usage.cost` field that tells you the cost of the response in USD.

**What is Jev's context window?**
32,000 tokens. That's the `state` you send plus the questions.

**Do I need a TypeSafe account or API key?**
No, an OpenRouter API key authenticates both the Decisions API and the TypeSafe SDK pointed at OpenRouter.

**Can Jev explain its answers?**
No, Jev doesn't return the reasoning it goes through to make its decision. It returns probabilities. If you need a written justification for the decision, you can use Jev to make the decision, then use a chat model to explain it, or if the confidence is low, you can route that case to a human.

**Where are the Jev docs?**
It's all here on OpenRouter. Once you're in, use the [TypeSafe documentation](https://docs.typesafe.ai) to dig deeper into the concepts and for the SDK reference.
