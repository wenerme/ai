# Latency optimization

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Measure where users wait before changing the model or prompt.

- **Time to first token (TTFT)** measures how long an API request takes to start returning content. For streaming text in the Responses API, time the request from when you send it until you receive the first nonempty `response.output_text.delta`.
- **End-to-end latency** measures how long the user waits for the complete result. Time it from the user's action through retrieval, model and tool calls, retries, and rendering.

Compare the median (p50) and the 95th percentile (p95) on representative traffic. Group similar requests by model, service tier, and task. Record input, cached input, and output tokens alongside the timings. If TTFT looks good but users still see a blank screen, time the work before the model call and check when the client displays the first text.

### Seven principles

1. [Process tokens faster.](#process-tokens-faster)
2. [Generate fewer tokens.](#generate-fewer-tokens)
3. [Use fewer input tokens.](#use-fewer-input-tokens)
4. [Make fewer requests.](#make-fewer-requests)
5. [Parallelize.](#parallelize)
6. [Make your users wait less.](#make-your-users-wait-less)
7. [Don't default to an LLM.](#dont-default-to-an-llm)

## Process tokens faster

Choose a model using examples from your workload. For a focused task like routing a support ticket, try [`gpt-6-luna`](https://developers.openai.com/api/docs/models/gpt-6-luna). For more demanding work, use the [model selection guide](https://developers.openai.com/api/docs/guides/model-selection) to choose a comparison model. Keep the fastest configuration that meets your quality target, including on difficult cases.

If you need to keep the same model, compare Standard processing with [Fast mode](https://developers.openai.com/api/docs/guides/fast-mode) or [Ultrafast mode](https://developers.openai.com/api/docs/guides/ultrafast-mode) where supported. Both charge a premium. Compare the same prompts and output lengths, and record the `service_tier` returned in each response.

For long answers, measure visible output speed in tokens per second. Count the text tokens received after the first text event and divide by the time from the first text event to the last. A streamed event can contain multiple tokens. A tokens-per-minute rate limit measures how much traffic you can send across requests.

For Chat Completions on a supported model, [Predicted Outputs](https://developers.openai.com/api/docs/guides/predicted-outputs) can reduce generation time when you already know most of the answer, such as when editing a few lines in a file. Check model and parameter compatibility before using this option.

## Generate fewer tokens

If an answer starts quickly but takes too long to finish, inspect what the model generates.

- **Visible text.** Ask for the amount of detail the user needs, such as “Give the next step in one sentence.” On supported Responses API models, lower [`text.verbosity`](https://developers.openai.com/api/docs/guides/deployment-checklist#set-up-textverbosity) for shorter answers.
- **Reasoning.** For routine extraction or classification, try a lower supported [`reasoning.effort`](https://developers.openai.com/api/docs/guides/reasoning#reasoning-effort). Compare accuracy and time to first text on the same examples. Check `usage.output_tokens_details.reasoning_tokens` to see how much reasoning the model used.
- **Structured output.** Request only the fields your application consumes. Compute values you already know, such as a message count, in application code. Use [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) when the response must follow a schema.

In the Responses API, `max_output_tokens` caps both reasoning and visible output tokens. A low cap can leave the response `incomplete`, even before it produces visible text. Use the cap as a budget and check response status before consuming a partial answer.

## Use fewer input tokens

A long prompt can delay the first token, especially when much of the input is new. Filter search results for relevance, strip markup you don't need, and send only the context required to answer accurately.

For repeated inputs, put stable instructions, examples, and tool definitions first. In multi-turn conversations, [keep the prefix unchanged](https://developers.openai.com/api/docs/guides/preserved-reasoning) and append new messages and tool results. [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) can reuse an eligible exact prefix match. In the Responses API, inspect `usage.input_tokens_details.cached_tokens` and compare TTFT for requests with and without cache hits.

## Make fewer requests

Each sequential model or tool call adds another wait. Combine steps when one request has all the information it needs. For example, a model can turn a customer's follow-up into a standalone search query and decide whether a lookup is necessary in the same response. A reply that depends on a lookup still needs its result.

If your agent makes many short, sequential tool calls, try [WebSocket mode](https://developers.openai.com/api/docs/guides/websocket-mode). Reuse the connection and continue from the prior response with `previous_response_id`, sending only new input items and tool results. This reduces overhead between turns.

## Parallelize

Run independent work concurrently. For example, once you have an order ID, you can look up its shipment status while fetching the return policy. An answer that needs both can start as soon as the slower lookup finishes. On supported models, [async tool calling](https://developers.openai.com/api/docs/guides/async-tool-calling) also lets the model continue independent work while your application runs a tool.

For a likely but uncertain branch, consider starting a read-only lookup early and discarding it if it's unnecessary. Measure the extra cost on a wrong guess. Wait for required checks before displaying a result or taking an action such as issuing a refund.

## Make your users wait less

For interactive text over HTTP, [stream the response](https://developers.openai.com/api/docs/guides/streaming-responses) with `stream: true` and display text as it arrives. Streaming lets the user start reading before generation finishes. Time to the first visible text still depends on the request, including any reasoning or tool work before the answer.

If you check or moderate output before displaying it, buffer enough text to perform that check. For longer tasks, show actual progress, such as “Looking up your order,” while the lookup runs. When the user can return later, [Background mode](https://developers.openai.com/api/docs/guides/background) lets your application submit the work and retrieve the result asynchronously.

## Don't default to an LLM

Use application code when you already know the answer. Render an order status from the order API, use a template to confirm a refund that succeeded, or show search results directly. Each of these can remove a model call from the user's wait.

## Example

### Architecture and prompts

A customer asks, “Is it still eligible for a return?” after discussing a pair of headphones. The support assistant makes three model calls in sequence. The first rewrites the question with the product name. The second decides whether to search. After retrieval, the third generates a reply plus internal fields for message count, sentiment, and tone. The customer sees nothing until the final call finishes.

### Analysis and optimizations

| Step               | Change                                                                                                                                                                                  | What to measure                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Route the question | Ask one model to decide whether to search and, if so, produce the standalone query. For this turn, the query is “headphones return policy.” An acknowledgment can skip retrieval.       | Routing accuracy on both kinds of turns and time until retrieval starts.                                 |
| Fetch the evidence | Once the router identifies a return question, fetch the policy and the customer's order details concurrently if both inputs are available.                                              | Elapsed time until both results are ready.                                                               |
| Answer             | Give the model the policy and order details, request only the customer-facing reply, and stream the text. If the policy or order lacks a fact needed to decide eligibility, ask for it. | Time to first visible text, time to the complete reply, and whether the eligibility decision is correct. |

On the return-question path, this removes one of three sequential model calls and overlaps two independent lookups. Replay the same support conversations before and after each change. Include ambiguous follow-ups and cases that need no lookup so a faster answer still sends customers to the right place.