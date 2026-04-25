# API deployment checklist

| Contents                                                                        | Expected impact                     |
| ------------------------------------------------------------------------------- | ----------------------------------- |
| [Use the Responses API](#use-the-responses-api)                                 | Quality, cost, latency, reliability |
| [Set up `reasoning.effort`](#set-up-reasoningeffort)                            | Quality, cost, latency              |
| [Set up `text.verbosity`](#set-up-textverbosity)                                | Quality, cost, latency              |
| [Set up the assistant `phase` parameter](#set-up-the-assistant-phase-parameter) | Quality, cost                       |
| [Use `tool_search`](#use-tool_search)                                           | Cost, latency                       |
| [Leverage built-in tools](#leverage-built-in-tools)                             | Quality                             |
| [Leverage compaction](#leverage-compaction)                                     | Cost                                |
| [Use `prompt_cache_key`](#use-prompt_cache_key)                                 | Latency, cost                       |
| [Use `reasoning.encrypted_content`](#use-reasoningencrypted_content)            | Quality, latency                    |
| [Use `background=True`](#use-backgroundtrue)                                    | Resumability                        |
| [Use WebSocket mode](#use-websocket-mode)                                       | Latency                             |

## Use the Responses API

**Always start** with the
[Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses). It is OpenAI's flagship
API and the best place to access the newest model behavior, built-in tools,
stateful workflows, and agent features.

## Set up `reasoning.effort`

Use `reasoning.effort` to decide how much thinking the model should do before it
answers.

For `gpt-5.5`, the supported values are `none`, `low`, `medium`, `high`, and
`xhigh`. The default is `medium`. Lower effort is faster and uses fewer
reasoning tokens. Higher effort gives the model more time for planning,
debugging, synthesis, and multi-step tradeoffs. The right value depends on the
**task**, not just the model.

Use `low` when the job is mostly extraction, routing, classification, or a
simple rewrite. Use `medium` or `high` when the model needs to diagnose a
problem, compare options, write a plan, or reason through code. Reserve `xhigh`
for cases where your evals show the extra latency is worth it.

## Set up `text.verbosity`

`text.verbosity` is the main lever for balancing brevity against completeness.
Use lower verbosity when the product needs a quick, compact answer, and higher
verbosity when the response needs richer explanation, clearer structure, or
complete context. Lower verbosity means fewer output tokens, so the model
generates less and returns output faster.

For coding, `medium` and `high` tend to produce longer, more organized output
with clearer structure. `low` keeps the answer tighter and more minimal.

## Set up the assistant `phase` parameter

`phase` is a label on assistant messages in the conversation history. It
indicates to the model whether a prior assistant message was an intermediate
working commentary or the final answer. Use `phase: "commentary"` for progress
updates, pre-tool-call notes, and other in-between messages. Use
`phase: "final_answer"` for the completed response.

The assistant might say something like:

That is not the answer. It is a progress note. Later, the assistant might say:

This is useful in long-running or tool-heavy workflows where the assistant may
produce visible progress updates before it finishes. When you send that history
back to the model, preserve `phase` on assistant messages so the model can tell
which messages are progress updates and which message is the final result.

**Preserve and resend `phase`** on assistant messages on follow-up requests for
new models like `gpt-5.3-codex` and later. It helps address early stopping,
ensuring the agent runs until it reaches the final answer.

## Use `tool_search`

Instead of loading the full tool catalog into every request, add
`{"type": "tool_search"}` and mark expensive tool definitions with
`defer_loading: true`. The model can then load the subset it needs at runtime.
At request start, the model only sees the search tool name and description. If
the model decides it needs a deferred tool, it runs tool search, and only then
are the deferred tool definitions loaded into context. Only then will the model
call them. This saves tokens and preserves cache performance.

There are two modes:

- **Hosted tool search** is the simpler option. Use it when you already know
  which tools could be available for the request.
- **Client-executed tool search** is for cases where your app has to decide what
  tools are available, like based on the user's tenant, project, permissions, or
  internal registry.

**Start with hosted tool search** unless your app really needs to control
discovery itself.

Group your tools by user intent. Use namespaces or MCP servers when you can. It
is easier for the model to choose between a few clear groups than a long flat
list of functions. We recommend keeping each namespace under about 10 functions
for optimal token efficiency and model performance.

Keep namespace descriptions short and discriminative. Put the detailed
instructions inside the deferred tool definitions. Avoid making one giant
namespace for everything.

## Leverage built-in tools

[Built-in tools](https://developers.openai.com/api/docs/guides/tools) are the API's native capabilities.
Instead of building every tool yourself, you can give the model access to tools
that already work inside the Responses API. The model can then decide when to
use them.

OpenAI keeps adding more native tools, so start with built-in tools when they
fit your workflow. Build custom tools when native options do not cover the task.
Current built-in tools and related tool options include:

- **Web search**: Search the web for up-to-date information
- **File search**: Search uploaded files or vector stores
- **Code interpreter**: Run Python for analysis, math, charts, and file
  processing
- **Shell**: Run shell commands in a hosted container or your own runtime
- **Computer use**: Operate a UI through screenshots, clicks, typing, and
  scrolling
- **Image generation**: Generate or edit images
- **MCP/connectors**: Connect the model to external services and tools
- **Skills**: Attach reusable instruction bundles and workflow files
- **Apply patch**: Make structured code edits

There is also a model-quality reason to prefer them. Built-in tools are
in-distribution for our post-training, meaning that the models are trained and
evaluated around these tool shapes, behaviors, and outputs. With built-in tools,
OpenAI models support better tool selection, cleaner execution, and fewer
failures than with new tools.

## Leverage compaction

[Compaction](https://developers.openai.com/api/docs/guides/compaction) is a context engineering tool: it
decides what information the model carries forward across many turns. In
long-running agents, the problem is not just, "Will I hit the context limit?" It
is that old messages, tool logs, retries, and stale details crowd out the state
the model needs.

Compaction gives you a controlled way to reduce context size while preserving
state needed for subsequent turns. After a meaningful milestone, like finishing
a debugging phase or narrowing a root cause, you can compact the prior window
and continue from the compacted output. This keeps the model sharp because the
next turn is built around the important state, not every intermediate reasoning,
failed command, and obsolete branch of reasoning.

There are two ways to leverage compaction:

- **Let the server handle it**: if you use `previous_response_id`, turn on
  `context_management` with a `compact_threshold`. The server will automatically
  compact the conversation when it gets too large. You keep sending only the
  newest user message.
- **Do it yourself**: if you manage the full input array yourself, call
  `client.responses.compact()`. It gives back a smaller context window. Use that
  returned output directly in the next `responses.create()` call.

**Do not edit the compacted output.** It is not a human summary, but the machine
state that helps the model continue. Pass it forward as-is, then add the next
user message.

## Use `prompt_cache_key`

[Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) automatically reduces latency
and cost when requests reuse the same long prefix. For high-volume workflows,
set
[`prompt_cache_key`](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-prompt_cache_key)
consistently for requests that share the same stable prefix.

The cache key is combined with the prompt prefix hash, so it helps route similar
requests to the same cache without changing the model input. Keep the key stable
for genuinely shared prefixes, and choose a granularity that avoids sending too
much traffic to one prefix-key pair. If one prefix and `prompt_cache_key`
combination exceeds about 15 requests per minute, requests may overflow to
additional machines and reduce cache effectiveness.

## Use `reasoning.encrypted_content`

Always round-trip reasoning items. This helps the model by allowing it to work
from its prior reasoning. If your [Zero Data Retention
(ZDR)](https://developers.openai.com/api/docs/guides/your-data#zero-data-retention) requirements do not allow
storing response data, this is where `reasoning.encrypted_content` is important.
`reasoning.encrypted_content` gives you a stateless handoff.

Add `reasoning.encrypted_content` to `include`, and reasoning items in the
response output will include encrypted reasoning content that can be passed back
into the next request. Your app does not need to understand that value. It just
keeps the reasoning item exactly as returned and sends it back during the next
turn, so the model can use it to continue the workflow.

## Use `background=True`

Use [`background=True`](https://developers.openai.com/api/docs/guides/background) for requests that may take
a long time. Instead of keeping the client connection open, the API starts a job
and returns an ID. Your app can poll that job until it finishes, fails, or is
canceled. Use it for large analyses, long tool runs, or work that needs status
and retry behavior.

`background=True` **requires `store=True`**.

You can combine it with `stream=True` for progress events, but the first event
may take longer than a normal request.

From the UI perspective, background mode indicates, "This is running; here is
the status; the result will appear here when it's ready."

Note: `background=True` is not compatible with [Zero Data
Retention](https://developers.openai.com/api/docs/guides/your-data#zero-data-retention).

## Use WebSocket mode

[WebSocket mode](https://developers.openai.com/api/docs/guides/websocket-mode) is built for long-running,
tool-call-heavy workflows where you keep a persistent connection open and
continue by sending only new input items plus `previous_response_id`. For
rollouts with 20 or more tool calls, this approach is roughly 40% faster
end-to-end.

**How this works**: The first message will look like a normal Responses request:
model, instructions, tools, and user input. The server streams events back. If
the model asks for a tool, your app runs the tool. Then, instead of sending a new
HTTP request, you send another `response.create` event on the same socket with
the prior `previous_response_id` and the new item. That is where the latency win
comes from. In plain HTTP, every follow-up is a fresh request. In WebSocket mode,
the connection stays open and the most recent response state stays warm in
memory on that connection. When the next turn continues from that response, the
backend has to do less setup work.

If your workflow is one request, one answer, then **keep HTTP**. If your
workflow behaves like a long-running agent, try WebSocket mode.

A single WebSocket connection handles one in-flight response at a time, so
parallel work needs multiple connections. Connections currently top out at 60
minutes. Continuation uses the same `previous_response_id` semantics as HTTP
mode, with a connection-local cache for the most recent response.

Note: WebSocket mode works with ZDR because your data is not stored to disk,
only stored in memory.

The default Python sample uses `websocket-client` (`pip install
websocket-client`). The JavaScript sample uses `ws` (`npm install ws`).

## Final takeaway

Responses API is the foundation for building smarter, more capable OpenAI
applications. The real advantage is that it lets developers move from one-off
prompts to durable, tool-using, context-aware workflows that can adapt to the
complexity of the task. Follow this guide to see higher performance in real
deployments.