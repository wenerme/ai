> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a Token-Efficient Review Agent

> Use a cheap executor model for routine work and call Advisor only for compact uncertainty checks

export const CopyPromptButton = ({prompt, buttonLabel = "Copy prompt"}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  return <div className="mt-3">
      <button type="button" onClick={handleClick} className="border-border inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-semibold cursor-pointer border-green-200 dark:border-green-900">
        {isCopied ? "Copied" : buttonLabel}
      </button>
    </div>;
};

**Goal:** Build a review agent that drafts routine answers with a cheap model and asks a stronger Advisor model only after the executor compresses uncertainty into a short packet.

**Outcome:** Your app sends normal review tasks to a low-cost executor, adds one compact `plan-reviewer` Advisor entry when a second model is worth the spend, and logs whether Advisor was offered without storing prompts or advice.

<Tip>
  Want your coding agent to add this workflow to your app? Copy this prompt.

  <CopyPromptButton
    prompt={`Add a token-efficient review pattern with OpenRouter Advisor.

Start by inspecting the repository. Find the existing OpenRouter request path, agent loop, model config, review or planning workflow, logging surface, and tests. If this is a new TypeScript agent loop, prefer the OpenRouter Agent SDK callModel path. Otherwise, adapt the existing Chat Completions or Responses request path. Infer which user actions can stay on the cheap executor and which ones create enough uncertainty to justify offering a second-model check. Ask follow-up questions only when the missing detail changes the budget gate or output format.

Use this Cookbook recipe as the implementation workflow:
https://openrouter.ai/docs/cookbook/building-agents/advisor-server-tool

Use these source-of-truth docs for current fields and response shapes:
- Advisor server tool: https://openrouter.ai/docs/guides/features/server-tools/advisor
- Agent SDK callModel overview: https://openrouter.ai/docs/sdks/typescript/call-model/overview
- Chat Completions request API: https://openrouter.ai/docs/api/api-reference/chat/send-chat-completion-request
- Responses request API, if this app uses Responses: https://openrouter.ai/docs/api/api-reference/responses/create-responses
- TypeScript SDK Chat reference, if this app uses @openrouter/sdk: https://openrouter.ai/docs/client-sdks/typescript/api-reference/chat
- TypeScript SDK Responses reference, if this app uses @openrouter/sdk beta responses: https://openrouter.ai/docs/client-sdks/typescript/api-reference/responses

Add this token-saving pattern to the app's existing review or planning path:
- Keep the existing cheap or default executor model for routine work.
- Offer one openrouter:advisor tool entry named plan-reviewer only behind a budget gate, such as low executor confidence, a large diff summary, unfamiliar code ownership, missing tests, or a decision that would be expensive to revisit. Do not use a nested advisor roster.
- Keep forward_transcript false unless the advisor genuinely needs the whole conversation.
- Make the advisor prompt compact. Send a short task summary, changed files, uncertainty signals, and the exact decision you want reviewed.
- Cap advisor output tokens. Log whether Advisor was offered, the selected models, finish reason, and cost or usage fields when returned. Do not log prompts, raw diffs, full advice, cookies, or API keys.
- Verify through the app's existing workflow or tests.

Return the changed files, the budget gate, the request body shape, the representative workflow you used to verify it, and any remaining cost or product tradeoffs.`}
  />
</Tip>

<Warning>
  Advisor is a beta server tool. It runs an inner model call, so it can add
  cost and latency. This recipe keeps that call behind a budget gate and sends a
  compact review prompt instead of forwarding the full transcript. Use returned
  `usage.cost` when present, or estimate spend from the selected advisor model's
  current pricing before widening the gate.
</Warning>

## Before you start

You need:

* Node.js 20 or newer
* An OpenRouter API key in `OPENROUTER_API_KEY`
* A review, planning, or agent workflow that already calls OpenRouter
* A cheap executor model for routine work
* A stronger advisor model for compact second opinions

If you are starting a new TypeScript agent, use the [Agent SDK `callModel` API](/sdks/typescript/call-model/overview) for the executor loop. The sample below uses Chat Completions so the server-tool request shape is visible, but the budget-gate pattern is the same inside an Agent SDK workflow.

Use these references for exact schemas:

* [Advisor server tool](/guides/features/server-tools/advisor)
* [Agent SDK `callModel` overview](/sdks/typescript/call-model/overview)
* [Create a chat completion](/api/api-reference/chat/send-chat-completion-request)
* [Create a response](/api/api-reference/responses/create-responses)
* [TypeScript SDK Chat reference](/client-sdks/typescript/api-reference/chat)

## What you're building

This recipe builds a tiny budget-aware implementation-plan reviewer.

The executor model handles the normal response and writes most plans by itself. The app only offers the `plan-reviewer` Advisor when the task has uncertainty signals like a large diff, missing tests, a schema change, or unfamiliar ownership. When Advisor is available, the executor can ask it for one focused second opinion before writing the final answer.

```text lines theme={null}
Review task
  → app checks whether a second model earns its cost
  → cheap executor drafts the answer
  → uncertain task: executor can call plan-reviewer with a compact prompt
  → final answer includes the plan, open questions, and next action
```

For this workflow, give the Advisor the decision being reviewed, the changed files, the uncertainty signals, and a short diff summary.

## 1. Define the compact review packet

Start with the smallest object the agent needs. This is the data your app already knows before it calls OpenRouter.

```js lines theme={null}
const reviewTask = {
  title: "Move usage-event writes to a monthly partitioned table",
  userQuestion:
    "Should we ship this migration plan, or ask for another design pass?",
  changedFiles: [
    "packages/db/migrations/2026-06-10-usage-partitions.sql",
    "services/cfw-api/src/usage/write-usage-event.ts",
  ],
  diffSummary:
    "Adds monthly partitions for usage_events and routes new writes by workspace_id and created_at.",
  uncertaintySignals: ["schema-change", "missing-rollback", "billing-path"],
};
```

Keep this packet small. Full diffs, raw conversation history, logs, and customer data belong in your own review UI or trace system, not in the Advisor prompt by default.

## 2. Add the cheap executor and budget-gated Advisor

The sample below shows the routing pattern and Chat Completions request shape. Adapt the same budget gate and `tools` shape inside your existing OpenRouter call, including Agent SDK `callModel` if that is your agent loop.

```js expandable lines theme={null}
const ADVISOR_WORTHY_SIGNALS = new Set([
  "billing-path",
  "large-diff",
  "missing-rollback",
  "missing-tests",
  "schema-change",
  "unknown-owner",
]);

const reviewTask = {
  title: "Move usage-event writes to a monthly partitioned table",
  userQuestion:
    "Should we ship this migration plan, or ask for another design pass?",
  changedFiles: [
    "packages/db/migrations/2026-06-10-usage-partitions.sql",
    "services/cfw-api/src/usage/write-usage-event.ts",
  ],
  diffSummary:
    "Adds monthly partitions for usage_events and routes new writes by workspace_id and created_at.",
  uncertaintySignals: ["schema-change", "missing-rollback", "billing-path"],
};

const shouldEnableAdvisor = (task) =>
  task.uncertaintySignals.some((signal) => ADVISOR_WORTHY_SIGNALS.has(signal));

const createAdvisorTool = (advisorModel) => ({
  type: "openrouter:advisor",
  parameters: {
    name: "plan-reviewer",
    model: advisorModel,
    instructions:
      "You are a senior engineering reviewer. Review only the compact task packet. Identify hidden assumptions, missing rollback steps, missing tests, and cheaper alternatives. Be concise.",
    forward_transcript: false,
    max_completion_tokens: 220,
    temperature: 0,
  },
});

const formatTaskPacket = (task) =>
  [
    `Title: ${task.title}`,
    `Question: ${task.userQuestion}`,
    `Changed files: ${task.changedFiles.join(", ")}`,
    `Uncertainty signals: ${task.uncertaintySignals.join(", ")}`,
    `Diff summary: ${task.diffSummary}`,
  ].join("\n");

const buildReviewRequest = ({ task, executorModel, advisorModel }) => {
  const isAdvisorEnabled = shouldEnableAdvisor(task);

  return {
    requestBody: {
      model: executorModel,
      messages: [
        {
          role: "system",
          content:
            "You are a token-efficient implementation-plan reviewer. Use the cheap executor model for routine reasoning. If the plan-reviewer tool is available, call it at most once when a compact second-model check can change the answer. Send the advisor a compact prompt only. Do not paste full diffs, logs, secrets, or chat transcripts into the advisor prompt.",
        },
        {
          role: "user",
          content: formatTaskPacket(task),
        },
      ],
      ...(isAdvisorEnabled
        ? {
            tools: [createAdvisorTool(advisorModel)],
            tool_choice: "auto",
          }
        : {}),
      max_tokens: 500,
      temperature: 0.2,
    },
    telemetryContext: {
      executor_model: executorModel,
      advisor_model: isAdvisorEnabled ? advisorModel : null,
      did_enable_advisor: isAdvisorEnabled,
    },
  };
};

const { requestBody, telemetryContext } = buildReviewRequest({
  task: reviewTask,
  executorModel: "openai/gpt-4o-mini",
  advisorModel: "~anthropic/claude-opus-latest",
});
```

Send `requestBody` through the request path your app already uses. For routine tasks, `tools` is omitted and the request stays on the cheap executor model. For uncertain tasks, the request offers one named Advisor tool:

```json lines theme={null}
{
  "type": "openrouter:advisor",
  "parameters": {
    "name": "plan-reviewer",
    "model": "~anthropic/claude-opus-latest",
    "instructions": "You are a senior engineering reviewer. Review only the compact task packet. Identify hidden assumptions, missing rollback steps, missing tests, and cheaper alternatives. Be concise.",
    "forward_transcript": false,
    "max_completion_tokens": 220,
    "temperature": 0
  }
}
```

The executor chooses whether to call `plan-reviewer`. It passes only `prompt` in the tool-call arguments because the advisor model is pinned in `parameters.model`.

## 3. Make the Advisor prompt earn its tokens

The cost control comes from 3 choices:

* The app decides whether a second model is worth the spend.
* The executor stays cheap.
* The Advisor sees a compact prompt, not the whole transcript.

In this workflow, `forward_transcript: false` is deliberate. The Advisor receives the executor's compact `prompt` argument, plus its own `instructions`. If you set `forward_transcript: true`, the Advisor can see the full parent conversation, which is useful for some agents but often defeats the token-saving goal.

Use the system prompt to tell the executor what belongs in the Advisor call:

```text lines theme={null}
When calling plan-reviewer, include:
- the decision you want reviewed
- the changed files or affected modules
- the uncertainty signals
- the shortest useful plan summary

Do not include:
- full diffs
- secrets
- logs
- the entire conversation
- unrelated implementation details
```

That keeps the expensive model focused on the part where it changes the outcome.

## 4. Add specialist reviewers only when uncertainty splits

If the executor can identify different kinds of uncertainty, give it separate Advisor entries. Each entry is its own tool. Do not use a nested `parameters.advisors` roster.

```js expandable lines theme={null}
const tools = [
  {
    type: "openrouter:advisor",
    parameters: {
      name: "schema-reviewer",
      model: process.env.SCHEMA_ADVISOR_MODEL ?? "~anthropic/claude-opus-latest",
      instructions:
        "Review the compact task packet for data-model assumptions, migration order, rollback gaps, and tests. Return the most useful correction.",
      forward_transcript: false,
      max_completion_tokens: 180,
    },
  },
  {
    type: "openrouter:advisor",
    parameters: {
      name: "cost-reviewer",
      model: process.env.COST_ADVISOR_MODEL ?? "openai/gpt-4o-mini",
      instructions:
        "Review the compact task packet for token, latency, and infrastructure cost. Suggest a cheaper path if it preserves the requested behavior.",
      forward_transcript: false,
      max_completion_tokens: 180,
    },
  },
];
```

The executor chooses the matching tool without passing a `name` argument. At most one Advisor entry can omit `name`; that unnamed entry becomes the default Advisor.

If you replay the conversation across requests, keep Advisor entries in a stable order. Advisor identity comes from each entry's index in the `tools` array, so reordering or inserting entries can make `schema-reviewer` and `cost-reviewer` reconstruct each other's memory.

## 5. Log cost and routing, not private content

Add telemetry where your app already records model calls. This recipe's sample logs only model names, whether Advisor was enabled, finish reason, and usage keys.

Log:

* `executor_model`
* `advisor_model` or Advisor entry name
* `did_enable_advisor`
* `finish_reason`
* `usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens`, and `usage.cost` when returned
* route or feature name, such as `budgeted_plan_review`

Do not log:

* API keys
* cookies
* full prompts
* full advisor advice
* raw diffs
* user content unless your product already has an explicit retention policy

If your app uses the Responses API and your UI benefits from showing the second opinion as it arrives, set `stream: true` on that Advisor entry. It streams advice deltas for Responses clients, then still returns the completed advice item. Chat Completions ignores `stream`, and Messages streaming is planned.

## Check your work

Validate the workflow through the path you're adding.

Confirm:

* Routine tasks send no Advisor tool, or leave Advisor disabled by your budget gate.
* Advisor-worthy tasks include one `openrouter:advisor` entry named `plan-reviewer`.
* The Advisor entry uses flat `parameters`, not `parameters.advisors`.
* The executor model is the cheap model from your config.
* The Advisor model is separately configurable.
* The Advisor prompt contains a compact uncertainty packet, not full diffs or the full conversation.
* Logs include model names, Advisor enablement, finish reason, and usage fields when present.
* Logs do not include `OPENROUTER_API_KEY`, raw prompts, cookies, full diffs, or full generated content.

After you wire the pattern into your app, log routing telemetry like this. Treat `usage_keys` as provider-dependent. Assert the routing fields, then check that usage includes the billing fields your app depends on. `finish_reason` is typically `stop` after the server-side tool call resolves, but don't treat the literal value as a fixed contract.

```json lines theme={null}
{
  "telemetry": {
    "executor_model": "openai/gpt-4o-mini",
    "advisor_model": "~anthropic/claude-opus-latest",
    "did_enable_advisor": true,
    "finish_reason": "stop",
    "usage_keys": [
      "prompt_tokens",
      "completion_tokens",
      "total_tokens",
      "cost"
    ]
  }
}
```

Token counts, cost, answer text, and provider-specific usage detail keys vary by model and prompt. Treat the routing fields and redaction boundary as the contract.

## Next steps

* Read the [Advisor reference](/guides/features/server-tools/advisor) for exact parameters, multiple-advisor rules, memory, streaming, and API-surface details.
* Add [Web Search](/guides/features/server-tools/web-search) as an Advisor sub-tool when the reviewer needs current sources.
* Use [Response Caching](/guides/features/response-caching) for repeated stable prefixes in the executor prompt.
* Add [Human-in-the-Loop controls](/cookbook/building-agents/hitl-tools) when a second opinion should pause for a person instead of another model.
