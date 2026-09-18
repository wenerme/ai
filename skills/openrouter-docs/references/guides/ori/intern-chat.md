> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Chatting with Interns

> Stream a chat completion from one of your interns with an API key, and answer its questions and permission requests in a second request

`POST /api/v1/interns/{internId}/chat/completions` streams a turn from one of your interns in the OpenAI chat completions format. Your prompt runs on the intern with its own tools and context. When the intern needs something from you, a permission to run a command or an answer to a question, the stream pauses as a tool call, and you answer it with a second request that continues the same run.

This endpoint is available to members of the interns programme. A key outside the programme receives `404` for every path under `/api/v1/interns`. Provisioning keys are refused with `401`. The full request and response schema is in the [API reference](/docs/api/api-reference/interns/stream-a-chat-completion-with-an-intern).

## An ordinary turn

Send `stream: true` and a `messages` array. Streaming is required, and the request is refused with `400` without it.

```bash theme={null}
curl https://openrouter.ai/api/v1/interns/$INTERN_ID/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "stream": true,
    "messages": [{ "role": "user", "content": "Summarize the open pull requests." }]
  }'
```

The response is `text/event-stream`. Assistant text arrives as `delta.content` chunks, then a chunk with `finish_reason: "stop"`, then a final chunk with empty `choices` that carries `usage` and `session_id`, then `data: [DONE]`.

```text theme={null}
data: {"choices":[{"delta":{"content":"","role":"assistant"},"finish_reason":null,"index":0}],"created":1789543404,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: {"choices":[{"delta":{"content":"Output was permission-probe."},"finish_reason":null,"index":0}],"created":1789543404,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: {"choices":[{"delta":{},"finish_reason":"stop","index":0}],"created":1789543404,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: {"choices":[],"created":1789543404,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk","session_id":"1fbed63d-f117-4dc4-bc7c-2334e471648e","usage":{"completion_tokens":63,"cost":0.090915,"prompt_tokens":17868,"prompt_tokens_details":{"cached_tokens":0},"total_tokens":17931}}

data: [DONE]
```

Keep the `session_id`. Sending it with a later prompt continues the same intern session, so the intern remembers the earlier turns. Omit it to start a fresh session. Heartbeats arrive as SSE comment lines (`: ...`) while the intern works, and your client should ignore them.

## When the intern needs you

Some turns cannot finish without you. The intern may ask a question, or in manual approval mode it may need permission to run a command. Rather than waiting on an open stream, the endpoint pauses the run and ends the first response with one tool call named `openrouter.provide_input` and `finish_reason: "tool_calls"`. Read through `data: [DONE]`: the final chunk with empty `choices` arrives after that finish chunk and carries the `session_id` you need to reply, with `usage: null` because the turn is not over.

```text theme={null}
data: {"choices":[{"delta":{"content":"","role":"assistant"},"finish_reason":null,"index":0}],"created":1789543393,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: {"choices":[{"delta":{"tool_calls":[{"function":{"arguments":"{\"kind\":\"permission\",\"operation\":\"shell command: echo permission-probe\",\"options\":[\"allow_once\",\"allow_always\",\"reject_once\",\"reject_always\"]}","name":"openrouter.provide_input"},"id":"32f27b06-c77a-48e2-b8ed-fb518eee765b","index":0,"type":"function"}]},"finish_reason":null,"index":0}],"created":1789543393,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: {"choices":[{"delta":{},"finish_reason":"tool_calls","index":0}],"created":1789543393,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: {"choices":[],"created":1789543393,"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk","session_id":"1fbed63d-f117-4dc4-bc7c-2334e471648e","usage":null}

data: [DONE]
```

Closing the connection after this `[DONE]` is expected and does not cancel anything. The run stays paused on the intern, waiting for your answer, until the interaction deadline described below.

The tool call's `arguments` is a JSON string with a `kind` and the fields for that kind.

**Permission** (`kind: "permission"`). `operation` describes what the intern wants to do. `options` lists the answers the intern accepts for this request, drawn from `allow_once`, `allow_always`, `reject_once` and `reject_always`. Only the listed options are accepted.

**Question** (`kind: "elicitation"`). `message` is the question. `fields` lists what to answer, each with a `name`, a `type`, whether it is `required`, and optionally the `options` the intern suggests.

```json theme={null}
{
  "kind": "elicitation",
  "message": "Which colour do you prefer?",
  "fields": [
    { "name": "answer", "type": "string", "required": true, "options": ["red", "blue", "Other"] }
  ]
}
```

## Answering in a second request

Send a new request with the same `session_id`, the conversation so far, the assistant message that carried the tool call, and a `tool` message whose `tool_call_id` matches the tool call's `id`. The `content` of the tool message is your answer. Send only the `stream`, `session_id` and `messages` fields. The reply continues the run in the approval mode it started with, so `approval_mode` is ignored here.

```json theme={null}
{
  "stream": true,
  "session_id": "1fbed63d-f117-4dc4-bc7c-2334e471648e",
  "messages": [
    { "role": "user", "content": "Run echo permission-probe and report the output." },
    {
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "32f27b06-c77a-48e2-b8ed-fb518eee765b",
          "type": "function",
          "function": {
            "name": "openrouter.provide_input",
            "arguments": "{\"kind\":\"permission\",\"operation\":\"shell command: echo permission-probe\",\"options\":[\"allow_once\",\"allow_always\",\"reject_once\",\"reject_always\"]}"
          }
        }
      ]
    },
    { "role": "tool", "tool_call_id": "32f27b06-c77a-48e2-b8ed-fb518eee765b", "content": "allow_once" }
  ]
}
```

The response streams the rest of the same run, in the same shape as an ordinary turn, and ends with `finish_reason: "stop"`, `usage` and the same `session_id`. If the intern needs you again, it pauses again with a new tool call and you repeat this step. The reply is delivered to the paused run itself. It does not start a new turn and it does not replay your prompt.

The tool message `content` depends on the kind of request.

**Permission.** One of the offered options as a plain string, for example `"allow_once"` or `"reject_once"`. To abandon the operation, send `"cancel"`. After `reject_once` or `cancel` the intern continues without running that operation and reports what it did instead.

**Question.** A JSON string with an `action`. To answer, send `{"action":"accept","content":{...}}` with one property per field name. To decline the question, send `{"action":"decline"}`. To cancel it, send `{"action":"cancel"}`. The intern continues either way, without an answer when you decline or cancel.

```json theme={null}
{ "role": "tool", "tool_call_id": "15e90ad6-5320-4a59-af4f-b371428154fa", "content": "{\"action\":\"accept\",\"content\":{\"answer\":\"blue\"}}" }
```

A request containing a tool reply must carry `session_id`, and the `tool_call_id` must belong to a paused run in that session. An answer the intern does not accept, such as a permission option it did not offer or a question answer sent to a permission request, is refused with `400` and the run stays paused for a corrected reply.

## Approval mode

`approval_mode` is an optional request field with two values.

**`self-drive`** is the default when the field is omitted. The intern consents to its own tool use, so it does not pause for permission. It still pauses for questions.

**`manual`** makes the intern ask you before it uses a tool that needs approval, through the permission tool call above. It also changes the shell tool. Commands run inside a sandbox until you allow the escalation the intern asks for.

```json theme={null}
{
  "stream": true,
  "approval_mode": "manual",
  "messages": [{ "role": "user", "content": "Run the test suite and fix what fails." }]
}
```

Approval mode applies to the prompt that carries it. It is not stored on the session. A later prompt with the same `session_id` runs in `self-drive` unless it repeats `approval_mode: "manual"`. Tool replies always continue the run in the mode it started with. Any other value is refused with `400`.

## Deadlines and disconnects

**A paused run waits five minutes for your answer.** The interaction deadline is measured from the moment the intern asked, and a rejected reply does not extend it. When it passes, the intern ends the run, and a reply after that is refused with `409` and reason `interaction_not_pending`.

**Closing an active stream cancels the run.** The only close that preserves the run is the one after the `data: [DONE]` that follows `finish_reason: "tool_calls"`. If your client disconnects while the intern is still working, either on the first request or on the request that carried your answer, the run is cancelled, including any command it is running. Detection is not immediate. While the intern is silent, the disconnect is noticed on a later heartbeat, and that may take more than one heartbeat interval. Do not rely on cancellation timing for anything the intern must not do.

**A cancellation you are still connected for is reported.** When the intern ends a run you are streaming, by cancellation or by a deadline, the stream ends with a `finish_reason: "error"` chunk carrying `410` and reason `run_ended`, then the final empty-`choices` chunk and `data: [DONE]`. That error is sent only for an ending the intern confirmed. A connection that simply breaks carries no such confirmation and ends with reason `stream_severed`, so the two are never confused. A client that has already disconnected is promised no final event at all.

**Each request has its own budget.** A single request streams for at most five minutes. A turn that outlives its request ends with a streamed `504` error and reason `timeout`.

## Errors

Errors arrive in two ways, depending on whether the response headers were already sent.

**Refused requests** return a JSON body with a non-2xx status. The `error.metadata.reason` field is stable and is the value to branch on. The `message` is safe to show to a person.

```json theme={null}
{ "error": { "code": 409, "message": "The run that asked this question has already ended.", "metadata": { "reason": "interaction_not_pending" } } }
```

| Status | Reason                                                                   | Meaning                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `bad_request`                                                            | The body is invalid, `stream` is not `true`, `approval_mode` is not a known value, a tool reply has no `session_id`, or the intern did not accept the answer. |
| `401`  | none                                                                     | No valid API key, or a provisioning key.                                                                                                                      |
| `403`  | none                                                                     | The key's creator has left the organization. Ask an admin to reassign the key.                                                                                |
| `404`  | `not_found`                                                              | No intern with this ID is visible to this key. Callers outside the interns programme also receive `404` for every intern path.                                |
| `404`  | `interaction_unknown`                                                    | No paused run in this session has this `tool_call_id`.                                                                                                        |
| `409`  | `intern_not_ready`                                                       | The intern is not running, or was provisioned before chat was available.                                                                                      |
| `409`  | `busy`                                                                   | Another turn is running in this session.                                                                                                                      |
| `409`  | `interaction_not_pending`                                                | The run that asked has ended, or the question was already answered.                                                                                           |
| `409`  | `attachment_failed`                                                      | Another request is already attached to this run.                                                                                                              |
| `410`  | `attachment_failed`                                                      | The paused run produced more output than the intern retains, so it cannot be resumed.                                                                         |
| `413`  | `payload_too_large`                                                      | The body exceeds 1 MiB.                                                                                                                                       |
| `429`  | `rate_limited`                                                           | Too many turns for the user or organization this key acts as. Wait and retry.                                                                                 |
| `502`  | `intern_unreachable`, `intern_rejected`, `turn_failed`, `stream_severed` | The intern could not be reached or rejected the request, refused the turn before any output, or its stream ended before the turn started.                     |
| `503`  | `busy`                                                                   | The intern cannot hold another run open across a question right now. Retry later.                                                                             |
| `504`  | `timeout`                                                                | The intern did not answer within the request budget.                                                                                                          |

Responses from the shared authentication and membership checks (`401`, `403`, and the programme `404`) carry `error.code` and `error.message` without `metadata`.

**Failures after the stream started** arrive as a chunk with `finish_reason: "error"` and an `error` object in the same shape, followed by the final empty-`choices` chunk and `data: [DONE]`. The reasons are `attachment_failed`, `busy`, `client_closed_request`, `interaction_not_pending`, `interaction_unknown`, `intern_unreachable`, `run_ended`, `stream_severed`, `timeout` and `turn_failed`.

```text theme={null}
data: {"choices":[{"delta":{},"finish_reason":"error","index":0}],"created":1789543404,"error":{"code":504,"message":"The intern did not answer in time.","metadata":{"reason":"timeout"}},"id":"chatcmpl-54728d7e-c2cc-4887-b1f4-7d94d41351a8","model":"openrouter/intern","object":"chat.completion.chunk"}

data: [DONE]
```

There is no recovery for a stream that ends this way. Start a new prompt, with the `session_id` if you want the intern to keep the session's context.
