> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delegate Routine Work to Cheaper Models

> Use an orchestrator for planning and a cheap subagent worker for each subtask

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

**Goal:** Add a task-delegation pattern where a large orchestrator model fans out routine subtasks to a smaller, cheaper worker model via the `openrouter:subagent` server tool.

**Outcome:** Your app sends complex tasks to an orchestrator that automatically delegates focused work (summarization, extraction, reformatting, drafting) to a cheap worker, cutting token cost on bulk generation while keeping planning quality high.

<Tip>
  Want your coding agent to add this workflow to your app? Copy this prompt.

  <CopyPromptButton
    prompt={`Add a task-delegation pattern with OpenRouter Subagent.

Start by inspecting the repository. Find the existing OpenRouter request path (Chat Completions, Responses API, or Agent SDK callModel), model config, task workflows, logging surface, and tests. Determine the app's language and framework. Identify which operations can be delegated to a cheaper worker model and which need the orchestrator's full capability. Infer the right orchestrator/worker model pairing from the app's cost and quality requirements. Ask follow-up questions only when missing information materially changes the delegation boundary or worker configuration.

Use this Cookbook recipe as the implementation workflow:
https://openrouter.ai/docs/cookbook/building-agents/subagent-server-tool

Use these source-of-truth docs for current fields, response shapes, and SDK methods:
- Subagent server tool reference: https://openrouter.ai/docs/guides/features/server-tools/subagent
- Server tools overview: https://openrouter.ai/docs/guides/features/server-tools
- Agent SDK callModel overview: https://openrouter.ai/docs/sdks/typescript/call-model/overview
- Chat Completions API: https://openrouter.ai/docs/api/api-reference/chat/create-a-chat-completion
- Responses API: https://openrouter.ai/docs/api/api-reference/responses/create-a-response
- TypeScript SDK Chat reference: https://openrouter.ai/docs/client-sdks/typescript/sdks/chat/README
- Model pricing and capabilities: https://openrouter.ai/models

For TypeScript apps using @openrouter/sdk, prefer the SDK's client.chat.send() method over raw fetch (same request shape, but typed). For Agent SDK apps using callModel, the subagent tool entry goes in the tools array the same way. For Python or other languages, use the Chat Completions endpoint directly.

Add this delegation pattern to the app's existing workflow:
- Keep the existing orchestrator model for planning and integration.
- Add one openrouter:subagent tool entry with a cheap worker model. Use tilde-latest aliases (like ~anthropic/claude-haiku-latest) so the app tracks model updates automatically.
- Have the orchestrator delegate routine subtasks (summarization, extraction, reformatting, drafting) to the worker.
- Give the worker server tools (like openrouter:web_search) only when the subtask needs external data.
- Cap worker output tokens via max_completion_tokens. Log delegation routing: orchestrator model, worker model, whether delegation was enabled, finish reason, and usage fields when returned. Do not log prompts, task descriptions, full outcomes, cookies, or API keys.
- Verify through the app's existing workflow or tests. The response contains the orchestrator's final integrated answer in message.content; server tool calls resolve server-side and aren't visible in the response.
- Subagent works with both streaming and non-streaming requests. With streaming, server-side tool execution may add latency between SSE chunks. Handle pauses gracefully in any streaming UI.
- The openrouter:subagent tool coexists with function tools. You can include both server tools and your own function tools in the same tools array; OpenRouter resolves its server tools and passes function tool calls to your app as usual.
- To confirm delegation happened, check the Activity page (https://openrouter.ai/activity) for worker generation records linked to the request's generation ID.

Return the changed files, the delegation boundary, the request body shape, the representative workflow you used to verify it, and any remaining cost or latency tradeoffs.`}
  />
</Tip>

<Warning>
  Subagent is a beta server tool. Each delegated task runs a separate model
  call, so it adds cost and latency per delegation. This recipe keeps the worker
  model cheap and caps output tokens. Use returned `usage.cost` when present, or
  estimate spend from the worker model's current pricing before widening the
  delegation scope.
</Warning>

## Before you start

You need:

* Node.js 20 or newer
* An OpenRouter API key in `OPENROUTER_API_KEY`
* A workflow that already calls OpenRouter (Chat Completions, Responses, or Agent SDK)
* An orchestrator model that supports tool calling (e.g. `~anthropic/claude-opus-latest`). Check the model's capabilities on the [model page](https://openrouter.ai/models) before choosing.
* A cheaper worker model for subtasks (e.g. `~anthropic/claude-haiku-latest`). Browse [model pricing](https://openrouter.ai/models) to find the cheapest model that meets your quality bar.

Tilde-latest aliases like `~anthropic/claude-haiku-latest` auto-resolve to the newest version in that model family. Find available aliases on each model's page at [/models](https://openrouter.ai/models). You can also use exact slugs (e.g. `anthropic/claude-haiku-4.5`) when you need to pin a specific version.

If you're starting a new TypeScript agent, use the [Agent SDK `callModel` API](/docs/sdks/typescript/call-model/overview) for the orchestrator loop. The samples below use Chat Completions so the server-tool request shape is visible, but the delegation pattern works the same way inside an Agent SDK workflow.

Use these references for exact schemas:

* [Subagent server tool](/docs/guides/features/server-tools/subagent)
* [Agent SDK `callModel` overview](/docs/sdks/typescript/call-model/overview)
* [Create a chat completion](/docs/api/api-reference/chat/create-a-chat-completion)
* [Create a response](/docs/api/api-reference/responses/create-a-response)
* [TypeScript SDK Chat reference](/docs/client-sdks/typescript/sdks/chat/README)

## What you're building

This recipe adds a task-delegation layer to a multi-step workflow.

The orchestrator model receives a complex request and decides how to break it apart. For each piece that doesn't need its full capability, it calls `openrouter:subagent` with a `task_name` and a `task_description`. The worker executes the task and returns its outcome. The orchestrator integrates all outcomes into the final response.

```text lines theme={null}
Complex request
  → orchestrator plans subtasks
  → routine subtask: orchestrator delegates via subagent
  → worker completes task, returns outcome
  → orchestrator integrates outcomes into final answer
```

The cost split: the orchestrator handles planning and integration (small token budget), while the worker handles bulk generation (cheap per token). A request with 3 delegated subtasks on a 50x cheaper worker model can cut total cost by 80%+ on the generation-heavy portions.

**Why server-side delegation instead of two separate API calls?** You could orchestrate client-side: call the big model, parse its plan, call the small model yourself, feed results back. Server-side subagent collapses that into a single request. The orchestrator invokes workers mid-generation without a round-trip to your server, keeps intermediate prompts private within OpenRouter's agentic loop, and can run multiple delegations in one generation pass. Your app makes one call and gets the integrated answer back.

## 1. Add the subagent tool to your request

The minimal setup: one `openrouter:subagent` entry in the `tools` array with the worker model pinned in `parameters`.

<CodeGroup>
  ```js title="JavaScript" expandable lines theme={null}
  const buildDelegationRequest = ({ task, orchestratorModel, workerModel }) => ({
    model: orchestratorModel,
    messages: [
      {
        role: "system",
        content:
          "You are a senior orchestrator. Break complex tasks into focused subtasks. " +
          "Delegate routine work (summarization, extraction, reformatting, drafting) " +
          "to the subagent. Include all context the worker needs in task_description — " +
          "it cannot see this conversation. Keep planning and integration for yourself.",
      },
      {
        role: "user",
        content: task,
      },
    ],
    tools: [
      {
        type: "openrouter:subagent",
        parameters: {
          model: workerModel,
        },
      },
    ],
    tool_choice: "auto",
  });

  const requestBody = buildDelegationRequest({
    task: "Analyze this API changelog. Summarize each section, list all breaking changes, and draft a migration guide.",
    orchestratorModel: "~anthropic/claude-opus-latest",
    workerModel: "~anthropic/claude-haiku-latest",
  });
  ```

  ```python title="Python" expandable lines theme={null}
  import os
  import requests

  def build_delegation_request(task, orchestrator_model, worker_model):
      return {
          "model": orchestrator_model,
          "messages": [
              {
                  "role": "system",
                  "content": (
                      "You are a senior orchestrator. Break complex tasks into focused subtasks. "
                      "Delegate routine work (summarization, extraction, reformatting, drafting) "
                      "to the subagent. Include all context the worker needs in task_description "
                      "- it cannot see this conversation. Keep planning and integration for yourself."
                  ),
              },
              {"role": "user", "content": task},
          ],
          "tools": [
              {
                  "type": "openrouter:subagent",
                  "parameters": {"model": worker_model},
              }
          ],
          "tool_choice": "auto",
      }

  request_body = build_delegation_request(
      task="Analyze this API changelog. Summarize each section, list all breaking changes, and draft a migration guide.",
      orchestrator_model="~anthropic/claude-opus-latest",
      worker_model="~anthropic/claude-haiku-latest",
  )
  ```
</CodeGroup>

Wire the request body into your app's existing request path. Here's the shape of the call and response parsing:

<CodeGroup>
  ```typescript title="TypeScript SDK" lines theme={null}
  import { OpenRouter } from "@openrouter/sdk";

  const client = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

  const result = await client.chat.send({
    ...requestBody,
  });

  const message = result.choices?.[0]?.message;
  ```

  ```js title="JavaScript (fetch)" lines theme={null}
  const sendDelegationRequest = async (body) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenRouter ${response.status}: ${text}`);
    }

    return response.json();
  };

  const result = await sendDelegationRequest(requestBody);
  const message = result.choices?.[0]?.message;
  ```

  ```python title="Python" lines theme={null}
  def send_delegation_request(body):
      response = requests.post(
          "https://openrouter.ai/api/v1/chat/completions",
          headers={
              "Content-Type": "application/json",
              "Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
          },
          json=body,
      )
      response.raise_for_status()
      return response.json()

  result = send_delegation_request(request_body)
  message = result["choices"][0]["message"]
  ```

  ```bash title="cURL" lines theme={null}
  curl -s https://openrouter.ai/api/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -d '{
      "model": "~anthropic/claude-opus-latest",
      "messages": [
        {"role": "system", "content": "You are a senior orchestrator. Delegate routine subtasks to the subagent."},
        {"role": "user", "content": "Summarize each section of this changelog and list breaking changes."}
      ],
      "tools": [
        {
          "type": "openrouter:subagent",
          "parameters": {"model": "~anthropic/claude-haiku-latest"}
        }
      ],
      "tool_choice": "auto"
    }'
  ```
</CodeGroup>

The response follows the standard [Chat Completions format](/docs/api/api-reference/chat/create-a-chat-completion). Server tools resolve server-side: the orchestrator's subagent calls happen inside OpenRouter's agentic loop, so the client response contains only the final integrated answer in `message.content`. The `usage` object reflects the combined token spend per [Server tools: Usage Tracking](/docs/guides/features/server-tools#usage-tracking).

The orchestrator decides whether and when to delegate. Each delegation passes two arguments:

* `task_name`: a short label (e.g. `summarize-breaking-changes`)
* `task_description`: everything the worker needs, including all context, inputs, and the expected output format

The worker sees only `task_description`. It has no access to the parent conversation, so the orchestrator must be explicit about what it wants back.

## 2. Read the tool result

On success, the subagent returns a JSON result with the worker's output:

```json lines theme={null}
{
  "status": "ok",
  "model": "anthropic/claude-haiku-4.5",
  "task_name": "summarize-breaking-changes",
  "outcome": "Breaking changes in v3.0:\n1. Removed deprecated /v1/legacy endpoint..."
}
```

On failure:

```json lines theme={null}
{
  "status": "error",
  "task_name": "summarize-breaking-changes",
  "error": "Subagent call failed: ..."
}
```

The orchestrator receives the result as a tool response and continues generating. It can delegate more tasks, integrate outcomes it already has, or finish the response. Subagent calls are capped per request (see the [reference page](/docs/guides/features/server-tools/subagent) for current limits).

## 3. Give the worker its own tools

When a subtask needs external data, pass server tools to the worker. The worker runs as a mini agent over those tools before producing its outcome.

```js expandable lines theme={null}
const requestBody = {
  model: "~anthropic/claude-opus-latest",
  messages: [
    {
      role: "user",
      content: "Research competitors mentioned in our Q2 report and draft a competitive analysis.",
    },
  ],
  tools: [
    {
      type: "openrouter:subagent",
      parameters: {
        model: "~anthropic/claude-haiku-latest",
        instructions:
          "You are a research assistant. Use web search to find current data. " +
          "Return structured findings with sources.",
        tools: [
          { type: "openrouter:web_search" },
          { type: "openrouter:web_fetch" },
        ],
      },
    },
  ],
};
```

The worker's tool use happens inside the subagent call. Only its final text is returned to the orchestrator. The orchestrator never sees the worker's intermediate tool calls or search results, just the finished outcome.

Two constraints on nested tools:

* Only OpenRouter server tools work (e.g. `openrouter:web_search`, `openrouter:web_fetch`, `openrouter:datetime`). Function tools are rejected with a `400` because the worker has no client-side executor.
* The subagent tool can't list itself. Recursion guards prevent the worker from re-entering the subagent.

## 4. Tune the worker for cost and quality

The subagent's `parameters` let you control how the worker generates. Use them to keep cost predictable.

```js lines theme={null}
const tools = [
  {
    type: "openrouter:subagent",
    parameters: {
      model: "~anthropic/claude-haiku-latest",
      instructions:
        "Complete the task exactly as described. Be concise and structured.",
      max_completion_tokens: 1024,
      temperature: 0.2,
      reasoning: { effort: "low" },
    },
  },
];
```

| Parameter               | What it controls                                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`                 | The worker model. Pick the cheapest model that can handle the subtask quality you need.                                                                  |
| `max_completion_tokens` | Output token ceiling (including reasoning). Prevents runaway generation on open-ended tasks.                                                             |
| `temperature`           | Lower values for deterministic extraction, higher for creative drafting. Range 0 to 2.                                                                   |
| `reasoning`             | `effort` controls reasoning depth. Set to `"low"` for fast, cheap tasks. `max_tokens` is accepted and validated but **not yet forwarded** to the worker. |
| `instructions`          | System prompt for the worker. Shape its output format and behavior.                                                                                      |
| `max_tool_calls`        | Range 1 to 25. Accepted and validated but **not yet enforced** on the worker call. Plan for enforcement when relying on it as a cost guard.              |

The full parameter reference is at [Subagent server tool](/docs/guides/features/server-tools/subagent).

<Info>
  Subagent works with both non-streaming and streaming requests. With streaming
  (`stream: true`), the server sends `: OPENROUTER PROCESSING` SSE comments as
  heartbeats while workers execute. Content chunks resume once the orchestrator
  continues generating. The final chunk includes the aggregated `usage` object.
  See [Server tools overview](/docs/guides/features/server-tools) for how server
  tool usage appears in the response.
</Info>

With `stream: true`, expect this pattern in the SSE stream:

```text lines theme={null}
: OPENROUTER PROCESSING      ← heartbeat comments during worker execution
: OPENROUTER PROCESSING      ← (repeats until delegation completes)
data: {"choices":[{"delta":{"content":"Here","role":"assistant"}}]}
data: {"choices":[{"delta":{"content":"'s the summary:"}}]}
...content chunks...
data: {"choices":[{"delta":{"content":""}}],"usage":{...}}  ← final chunk with aggregated usage
data: [DONE]
```

Most SSE client libraries ignore comment lines (lines starting with `:`) automatically. Here's a minimal consumer:

```js expandable lines theme={null}
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...buildDelegationRequest({
      task: "Summarize this document...",
      orchestratorModel: "~anthropic/claude-sonnet-latest",
      workerModel: "~anthropic/claude-haiku-latest",
    }),
    stream: true,
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = "";

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });

  const lines = buffer.split("\n");
  buffer = lines.pop(); // keep incomplete line in buffer

  let streamDone = false;
  for (const line of lines) {
    if (line.startsWith(": OPENROUTER PROCESSING")) continue; // heartbeat
    if (!line.startsWith("data: ")) continue;
    const payload = line.slice(6);
    if (payload === "[DONE]") { streamDone = true; break; }
    let chunk;
    try { chunk = JSON.parse(payload); } catch { continue; }
    const content = chunk.choices?.[0]?.delta?.content;
    if (content) process.stdout.write(content);
  }
  if (streamDone) break;
}
```

## 5. Log delegation routing, not task content

Add telemetry where your app already records model calls. Log the routing decision and cost, not the content.

Log:

* `orchestrator_model`
* `worker_model`
* `did_enable_delegation` (whether you configured the subagent tool on this request)
* `finish_reason`
* `usage.prompt_tokens` (or `usage.input_tokens`), `usage.completion_tokens` (or `usage.output_tokens`), `usage.total_tokens`, and `usage.cost` when returned
* route or feature name, such as `delegated_analysis`

Do not log:

* API keys
* cookies
* full task descriptions
* full worker outcomes
* user content (unless your product already has an explicit retention policy)

The `usage` object in the response reflects the combined token spend of the orchestrator plus all worker calls, per [Server tools: Usage Tracking](/docs/guides/features/server-tools#usage-tracking). You don't need to track inner costs separately.

```js lines theme={null}
const logDelegation = (response, context) => {
  const choice = response.choices?.[0];
  const usage = response.usage ?? {};
  return {
    orchestrator_model: context.orchestratorModel,
    worker_model: context.workerModel,
    did_enable_delegation: true,
    finish_reason: choice?.finish_reason,
    // Chat Completions uses prompt_tokens/completion_tokens;
    // some responses also include input_tokens/output_tokens.
    usage_prompt_tokens: usage.prompt_tokens ?? usage.input_tokens,
    usage_completion_tokens: usage.completion_tokens ?? usage.output_tokens,
    usage_total_tokens: usage.total_tokens,
    usage_cost: usage.cost,
    route: "delegated_analysis",
  };
};
```

## Next steps

* Read the [Subagent reference](/docs/guides/features/server-tools/subagent) for exact parameters, recursion guards, worker tool constraints, and invocation caps.
* Pair subagent with [Advisor](/docs/cookbook/building-agents/advisor-server-tool) for a two-tier pattern: cheap worker for routine tasks, strong advisor for uncertain decisions.
* Give the worker [Web Search](/docs/guides/features/server-tools/web-search) when subtasks need current data.
* Add [Response Caching](/docs/guides/features/response-caching) for repeated orchestrator prefixes across similar tasks.
* Use [Fusion](/docs/guides/features/server-tools/fusion) when subtasks need multi-model deliberation instead of single-worker execution.
* Browse the [Model list](https://openrouter.ai/models) to compare worker model pricing and find the cheapest model that meets your subtask quality bar.
* Add [Structured Outputs](/docs/structured-outputs) to the orchestrator request when you need the final answer in a specific JSON schema.
