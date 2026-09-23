> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Cut LLM Cost with a Jev-Verified Cascade

> Verify cheap-model answers against retrieved context, then escalate only when the answer isn't supported by that context.

In this recipe you'll add a draft-verify-escalate cascade to a retrieval app. A cheap model drafts an answer from your retrieved context, Jev checks whether that context actually supports the draft, and your frontier model rewrites the answer only when the check fails. Most questions never reach the frontier model, so you pay its rate only for the drafts that needed it.

**Goal:** Define an async `answerWithCascade` function that returns `route: 'send'` when a tier's answer passes verification at or above the confidence threshold, and `route: 'handoff'` when context is missing or neither tier produces an accepted answer.

**Outcome:** `answerWithCascade` returns the route, the model that produced the answer, the answer itself, and Jev's verdict for each tier it ran.

You'll write three functions. `draftAnswer` asks a model for an answer from the excerpts. `verifyAnswer` sends the question, excerpts, and answer to Jev, which returns `supported`, `unsupported`, or `declined` with a confidence. `answerWithCascade` runs the draft model, then the frontier model only if needed, and decides whether to send the answer or hand off to a human.

On the 50-question benchmark in the worked example below, the cascade shipped the same zero wrong answers as running Astra on every question, at about 7% of the cost.

<Tip>
  Prerequisites:

  * Your existing TypeScript app runs on Node.js or Bun.
  * Your code makes OpenRouter chat completions using retrieved context.
  * You've configured `OPENROUTER_API_KEY`.
  * You have `@openrouter/sdk` installed.
  * You've typed `process.env` through your runtime's type definitions.
  * Keep the [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request) open for the verification endpoint.
</Tip>

## 1. Draft with the cheap model

Your existing OpenRouter client, system prompt, and retrieval are reused, but the system prompt must now explicitly instruct the model to answer only from the excerpts and to say so when they don't cover the question. The client and Northwind prompt below are shown so the snippets run as-is. Define `DRAFT_MODEL` as `~openai/gpt-luna-latest` and `ESCALATION_MODEL` as `~openai/gpt-astra-latest`. The `~` model IDs are OpenRouter aliases that resolve to a concrete model at request time.

The `draftAnswer` flow sends a chat request with the system prompt and a user message that includes the help center excerpts formatted as numbered `[i]` entries, followed by the customer question. It awaits the response and throws if the response is a stream, since Jev needs the complete answer text in step 2. Otherwise it extracts `result.choices[0]?.message.content` and verifies it's a string. Hold on to the same `excerpts` array, because Jev reads it in step 2.

```typescript lines theme={null}
import { OpenRouter } from '@openrouter/sdk';

const openrouter = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

const DRAFT_MODEL = '~openai/gpt-luna-latest';
const ESCALATION_MODEL = '~openai/gpt-astra-latest';

const SYSTEM_PROMPT =
  'You are the support assistant for Northwind. Answer only from the help center excerpts provided. If they do not cover the question, say so and offer to connect the customer with support.';

async function draftAnswer(model: string, question: string, excerpts: string[]): Promise<string> {
  const result = await openrouter.chat.send({
    chatRequest: {
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Help center excerpts:\n${excerpts.map((text, i) => `[${i + 1}] ${text}`).join('\n')}\n\nCustomer question: ${question}`,
        },
      ],
    },
  });
  if (result instanceof ReadableStream) {
    throw new Error('Expected a non-streaming response');
  }
  const content = result.choices[0]?.message.content;
  if (typeof content !== 'string') {
    throw new Error('Expected text content');
  }
  return content;
}
```

<Warning>
  Every tier is paid. The cost per question is your cheap draft plus one Jev check. An escalated question adds a frontier call plus a second Jev check.
</Warning>

## 2. Verify the draft with one Decisions request

The state object has three fields: `help_center_excerpts`, `customer_question`, and `assistant_answer`. The one choice question has three labels. `supported` means the draft addresses the question and every fact, number, and policy in it appears in the excerpts. `unsupported` means the draft states something the excerpts don't contain or contradict, or answers a different question. `declined` means the draft says the excerpts don't cover the question and adds no facts of its own.

The Decisions API is at `https://openrouter.ai/api/alpha/decisions`, outside the `/api/v1` prefix the chat client uses. Use a separate OpenRouter instance with `serverURL` set to `https://openrouter.ai`, since the default SDK base URL doesn't work for this path. `verifyAnswer` returns a verdict: the chosen label, a confidence number, and an object with a probability per label.

```typescript lines theme={null}
const decisions = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY, serverURL: 'https://openrouter.ai' });

type Verdict = {
  choice: 'supported' | 'unsupported' | 'declined';
  confidence: number;
  probabilities: Record<string, number>;
};

function isLabel(choice: string): choice is Verdict['choice'] {
  return choice === 'supported' || choice === 'unsupported' || choice === 'declined';
}

async function verifyAnswer(question: string, excerpts: string[], answer: string): Promise<Verdict> {
  const response = await decisions.alpha.decisions.create({
    decisionsRequest: {
      model: 'typesafe/jev-1.13',
      state: { help_center_excerpts: excerpts, customer_question: question, assistant_answer: answer },
      questions: {
        support: {
          type: 'choice',
          instructions: 'Compare assistant_answer against help_center_excerpts. Which one describes it?',
          criteria: {
            supported: 'The answer addresses customer_question, and every fact, number, and policy in it is stated in the excerpts.',
            unsupported: 'The answer states at least one fact, number, or policy that the excerpts do not contain or that contradicts them, or it answers a different question than customer_question.',
            declined: 'The answer says the excerpts do not cover the question and does not assert facts of its own.',
          },
        },
      },
    },
  });
  const verdict = response.answers.support;
  if (verdict.type !== 'choice' || !isLabel(verdict.choice)) {
    throw new Error('Expected a choice answer with a known label');
  }
  return { choice: verdict.choice, confidence: verdict.confidence ?? 0, probabilities: verdict.probabilities ?? {} };
}
```

<Info>
  **Confidence.** Confidence is Jev's probability that the chosen label is correct. It ranges from 0 to 1 and appears only with `choice` and `score` answers. `probabilities` has one value per label. The [Decisions schema](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request) marks both optional, so the code above defaults a missing confidence to `0`, which fails acceptance in step 3, and a missing probabilities object to `{}`.
</Info>

## 3. Route on the verdict

The acceptance threshold is `ACCEPT_CONFIDENCE = 0.8`. The `CascadeResult` object has four fields: `route` is either `send` or `handoff`, `model` is the tier that produced the answer, `answer` is the final answer, and `verdicts` is the list of verdict records from each tier that ran.

`answerWithCascade` loops over `[DRAFT_MODEL, ESCALATION_MODEL]`. Each iteration runs `draftAnswer` then `verifyAnswer` and appends the verdict. Send if the verdict is `supported` and confidence is at or above `ACCEPT_CONFIDENCE`: `route` is `send`, `model` is the current tier, and `verdicts` has one entry from the draft tier. Hand off immediately if the verdict is `declined`: `route` is `handoff`, there's no frontier call, and `answer` keeps the draft's wording for human reuse. Any other verdict gets one escalation. If the frontier answer fails too, `route` is `handoff` with the frontier model, its rejected answer, and both verdicts.

Call `answerWithCascade` where your app currently calls the chat completion. On `send`, reply with `answer`. On `handoff`, create a ticket or queue item and attach `answer` and `verdicts` for human handling.

```typescript lines theme={null}
const ACCEPT_CONFIDENCE = 0.8;

type CascadeResult = {
  route: 'send' | 'handoff';
  model: string;
  answer: string;
  verdicts: Verdict[];
};

async function answerWithCascade(question: string, excerpts: string[]): Promise<CascadeResult> {
  const verdicts: Verdict[] = [];
  let answer = '';
  for (const model of [DRAFT_MODEL, ESCALATION_MODEL]) {
    answer = await draftAnswer(model, question, excerpts);
    const verdict = await verifyAnswer(question, excerpts, answer);
    verdicts.push(verdict);
    if (verdict.choice === 'supported' && verdict.confidence >= ACCEPT_CONFIDENCE) {
      return { route: 'send', model, answer, verdicts };
    }
    if (verdict.choice === 'declined') {
      return { route: 'handoff', model, answer, verdicts };
    }
  }
  return { route: 'handoff', model: ESCALATION_MODEL, answer, verdicts };
}
```

## 4. Log verdicts and tune the threshold (optional)

You'll probably want to log `route`, `model`, and `verdicts`. You can use this to set the `ACCEPT_CONFIDENCE` threshold from your own traffic. Start with `0.8` and review the handoff queue for a week. If any wrong `supported` answers got shipped, raise the threshold to `0.9`. If the handoff queue is mostly correct answers, you can lower it to `0.7`. TypeSafe's [confidence guide](https://docs.typesafe.ai/confidence) explains how the probability distribution collapses into this number.

## Worked example

**Captured output.** The retrieved context for these runs is three excerpts: one on Free and Team workspace member and project limits, one on billing and downgrades, and one on data export. The code above ran unchanged. `question` is added to each result for readability.

```typescript lines theme={null}
const excerpts = [
  'Plan limits: Free workspaces have up to 5 members and 3 projects. Team workspaces ($8 per member per month, billed annually) have unlimited projects and up to 250 members.',
  'Billing: Team plans are billed annually. Downgrading to Free takes effect at the end of the current billing period. We do not issue prorated refunds for unused time.',
  'Data export: Workspace owners can export all projects as CSV or JSON from Settings > Data. Exports include tasks, comments, and attachment metadata but not attachment files.',
];

const result = await answerWithCascade('How many people can I add on the free plan?', excerpts);
```

The free-plan question is answerable from the excerpts. The system sends from `DRAFT_MODEL` with a `supported` verdict at confidence 1.

```json lines theme={null}
{
  "question": "How many people can I add on the free plan?",
  "route": "send",
  "model": "~openai/gpt-luna-latest",
  "answer": "The Free plan allows up to 5 members per workspace.",
  "verdicts": [
    {
      "choice": "supported",
      "confidence": 1,
      "probabilities": {
        "supported": 1,
        "unsupported": 0,
        "declined": 0
      }
    }
  ]
}
```

Here's the handoff response for `Do you integrate with Jira?`. The route is `handoff`, the model is `~openai/gpt-luna-latest`, the answer says none of the excerpts mention Jira and offers to connect the customer with support, and the verdict is `declined` at confidence 0.97 with a `declined` probability of 0.98.

```json lines theme={null}
{
  "question": "Do you integrate with Jira?",
  "route": "handoff",
  "model": "~openai/gpt-luna-latest",
  "answer": "The provided help center excerpts don’t mention Jira integrations. I can connect you with support to confirm whether Jira is supported.",
  "verdicts": [
    {
      "choice": "declined",
      "confidence": 0.97,
      "probabilities": {
        "supported": 0,
        "unsupported": 0.02,
        "declined": 0.98
      }
    }
  ]
}
```

**Performance summary.** On a 50-question set written against these excerpts (27 answerable, 23 not covered), graded by `~anthropic/claude-opus-latest` against hand-written gold answers, the cascade shipped 0 wrong answers at a total of \$0.012. Using Astra on every question shipped 2 wrong at \$0.175. Luna only shipped 0 wrong at \$0.004. The cascade escalated 2 questions and handed off 2 answerable ones, 1 where both tiers were right but Jev confidence stayed below `0.8` and 1 where the draft itself declined.

**Noise and the relevance clause.** An earlier run, before the `supported` criterion required the answer to address `customer_question`, came out cascade 0 wrong, Astra-only 0 wrong, Luna-only 2 wrong. A difference of 2 answers between runs is attributable to model and judge noise. The cascade was the only configuration with 0 wrong in both runs.

To test the escalation path, replace the `draftAnswer` call for `DRAFT_MODEL` with a fixed unsupported string, `The free plan allows up to 10 members per workspace.`, and run the cascade again. Jev marks the draft `unsupported`, `ESCALATION_MODEL` answers, and Jev marks that answer `supported`. In the captured runs no real Luna draft against these excerpts escalated on its own, which is why the draft is forced here. The forced-escalation result: `route` is `send`, `model` is `~openai/gpt-astra-latest`, and `verdicts` contains `unsupported` then `supported`.

```json lines theme={null}
{
  "question": "How many people can I add on the free plan?",
  "route": "send",
  "model": "~openai/gpt-astra-latest",
  "answer": "The Free plan supports up to **5 members** per workspace.",
  "verdicts": [
    {
      "choice": "unsupported",
      "confidence": 1,
      "probabilities": {
        "supported": 0,
        "unsupported": 1,
        "declined": 0
      }
    },
    {
      "choice": "supported",
      "confidence": 1,
      "probabilities": {
        "supported": 1,
        "unsupported": 0,
        "declined": 0
      }
    }
  ]
}
```

Another thing `supported` requires is that the answer addresses `customer_question`. This ensures a grounded but off-topic draft doesn't pass. To test this, replace the `draftAnswer` call for `DRAFT_MODEL` with a string that is fully grounded but answers a different question, for example `Free workspaces have up to 5 members.` for `Can I get a refund if I downgrade mid-year?`. Jev returned `unsupported` at confidence `0.98` in a captured run.

## Check your work

The following are things to check about the behavior you've implemented.

* **Decisions response.** `answers.support.type` equals `'choice'`, `answers.support.choice` is one of `'supported'`, `'unsupported'`, or `'declined'`, `confidence` is between 0 and 1, and `probabilities` has one entry per label, including labels at 0.
* **Endpoint.** Requests from the `decisions` client reach `https://openrouter.ai/api/alpha/decisions`. A client without `serverURL` gets a 404 for this call in `@openrouter/sdk` 1.2.146.
* **Routing.** A `supported` draft at or above `ACCEPT_CONFIDENCE` returns `route: 'send'` with one verdict entry and `model` equal to `DRAFT_MODEL`.
* **Declined.** A `declined` draft returns `route: 'handoff'` with one verdict entry and no call to `ESCALATION_MODEL`.
* **Escalation.** A wrong draft returns `choice: 'unsupported'`, and the result then has two verdict entries and `model` equal to `ESCALATION_MODEL`.
* **Double failure.** When both tiers fail, the result is `route: 'handoff'` with the frontier model's rejected `answer` and two verdict entries.
* **Threshold tuning.** Changing `ACCEPT_CONFIDENCE` changes which `supported` answers send, with no other code change.

## Next steps

Here are a few things you can try next:

* [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request)
* [Gate Agent Tool Calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) to apply the same approve, block, or review pattern to agent tool calls
* [Jev SDK for TypeScript and Python](/docs/guides/community/typesafe-sdk) to call Jev through the TypeSafe SDK
* [Jev model page](https://openrouter.ai/typesafe/jev-1.13) and [Jev Lab](https://openrouter.ai/labs/jev) for pricing and interactive demos
* [RAG with Embeddings & Rerank](/docs/cookbook/evaluate-and-optimize/rag)
* [Add Human-in-the-Loop Controls to an Agent SDK Agent](/docs/cookbook/building-agents/hitl-tools)
