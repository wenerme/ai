# Delegation and tools in GPT-Live

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

GPT-Live delegates reasoning and tool use to a backend while it manages the spoken conversation. Backend work can run through the configured Responses model or, with client delegation, any model, agent, or service your application operates. In either mode, your application owns permissions, confirmations, business records, and task state.

Read more about [steering the live model for delegation and tools](https://developers.openai.com/api/docs/guides/live-prompting#delegation) in the prompting guide.

The event examples on this page use `connection`, a connected primary Live WebSocket or sideband from the [connection guides](https://developers.openai.com/api/docs/guides/voice-websockets?api=live). On a primary connection, wait for `session.started` before calling an event helper. An attached sideband already belongs to a running session.





## Choose a delegation mode

With **[Responses delegation](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=responses#configure-responses-delegation)**, GPT-Live calls the Responses model you choose, supplies conversation context, and returns backend results to the live conversation. With **[client delegation](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=client#configure-client-delegation)**, your application prepares the context, runs an agent or workflow, and sends results back to GPT-Live.

Start with Responses delegation if you want GPT-Live to manage requests. Choose client delegation when you need to run your own workflow or review results before sending them to GPT-Live.




| Consideration                 | Favor Responses delegation when…                                                                           | Favor client delegation when…                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Implementation effort**     | You want GPT-Live to prepare backend requests, manage connections, and return results to the conversation. | You want to build and operate those pieces yourself.                                                      |
| **Reviewing backend results** | Backend output can return directly to GPT-Live.                                                            | Your application must validate, redact, combine, or discard results before they reach GPT-Live.           |
| **Backend capabilities**      | Your workflow fits the Responses settings and tools supported by GPT-Live.                                 | You need another backend, multiple models, or API capabilities beyond the managed configuration.          |
| **Context ownership**         | The conversation context supplied by GPT-Live fits your application.                                       | You need to choose exactly which history, memory, and application state each backend request receives.    |
| **Execution policy**          | A configured model and tool loop fits the task.                                                            | You need custom routing between code and models, fallbacks, checkpoints, or budgets across backend steps. |




For example, a travel assistant can send flight-status questions to an airline service and itinerary changes to a separate planning agent. The application chooses which backend to call and what verified result to return to GPT-Live.

In both modes, your application tracks task progress and checks permissions and required user confirmations before running custom tools. GPT-Live can continue speaking while your application reviews a backend result. If your application must control when the user hears audio, add [playback controls](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#control-playback-when-needed).

Client delegation also requires your application to [maintain conversation context](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=client#keep-the-conversation-context-in-your-application). The delegation event contains metadata, not task text; use transcript events and application state to prepare the backend request.

Compare latency, task success, and cost on your own workload when [evaluating your voice agent](https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation). For guidance specific to your existing architecture, see [Migrate to GPT-Live](https://developers.openai.com/api/docs/guides/live-migration#choose-your-delegation-mode).

Choose the mode when you create the session; to change modes, start a new session.

## Configure Responses delegation

Add this delegation configuration when [creating your Live session](https://developers.openai.com/api/docs/guides/live). Choose the Responses model independently of the voice model:

```javascript
export const session = {
  model: "gpt-live-1",
  delegation: {
    type: "responses",
    responses: {
      model: "gpt-6-luna",
      instructions: "[Your backend prompt]",
    },
  },
};
```

```python
from openai.types.live.session_config_param import SessionConfigParam

session: SessionConfigParam = {
    "model": "gpt-live-1",
    "delegation": {
        "type": "responses",
        "responses": {
            "model": "gpt-6-luna",
            "instructions": "[Your backend prompt]",
        },
    },
}
```

```go
import (
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
)

var session = live.SessionConfigParam{Model: "gpt-live-1", Delegation: live.SessionConfigDelegationUnionParam{OfResponses: &live.SessionConfigDelegationResponsesParam{Responses: live.ResponsesDelegationConfigParam{Model: "gpt-6-luna", Instructions: openai.String("[Your backend prompt]")}}}}
```

```java
import com.openai.models.live.*;

var session =
    SessionConfig.builder()
        .model("gpt-live-1")
        .responsesDelegation(
            ResponsesDelegationConfig.builder()
                .model("gpt-6-luna")
                .instructions("[Your backend prompt]")
                .build())
        .build();
```

```ruby
require "openai"
session = OpenAI::Models::Live::SessionConfig.new(
  model: "gpt-live-1", delegation: {
    type: :responses,
    responses: {
      model: "gpt-6-luna",
      instructions: "[Your backend prompt]"
    }
  }
)
```


Start with [`gpt-6-luna`](https://developers.openai.com/api/docs/models/gpt-6-luna), or try [`gpt-6-sol`](https://developers.openai.com/api/docs/models/gpt-6-sol) for more complex backend tasks. Compare answer quality and latency on your tasks before choosing a backend model.

Register supported tools in `delegation.responses.tools`. Set `delegation.responses.tool_choice` to `"auto"` to let the backend choose a tool, `"required"` to require a tool call, or `"none"` to disable tool calls. You can also select a named function.

Set `delegation.responses.parallel_tool_calls` to `true` to allow multiple tool calls in a response, or `false` for sequential calls. Your application executes custom functions and checks their dependencies and required approvals. These settings apply after GPT-Live delegates; use the [live prompt](https://developers.openai.com/api/docs/guides/live-prompting#delegation) to guide when it should delegate.

The Responses configuration requires a backend `model` at creation. In addition to the tools below, it exposes `max_output_tokens` (at least 16 when set), `service_tier`, and the `reasoning` and `text` settings supported by the selected backend model. See [Reduce backend latency](#reduce-backend-latency) for settings you can tune.

If [Fast mode](https://developers.openai.com/api/docs/guides/fast-mode) is available for your model and project, consider it for latency-sensitive calls. For GPT-Live, select it with `delegation.responses.service_tier: "priority"`.

Send `session.update` with changes in `session.delegation.responses` to update the backend model, instructions, tools, `tool_choice`, or other supported settings during the conversation. Omitted settings keep their current values.

To switch between Responses and client delegation, create a new Live session. Updating `delegation` to `null` selects client mode, so sending it to a running Responses session fails with `immutable_field_update`.

These settings use familiar Responses concepts, but Live supports a subset of the standalone Responses API. Live supplies conversation context and initiates delegated work. Configure the backend through the session; the Live `response.create` command uses that configuration and does not accept a standalone Responses request body.

### Add hosted tools

Add [web search](https://developers.openai.com/api/docs/guides/tools-web-search), [file search](https://developers.openai.com/api/docs/guides/tools-file-search), [Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter), [hosted shell](https://developers.openai.com/api/docs/guides/tools-shell), or [image generation](https://developers.openai.com/api/docs/guides/tools-image-generation) to `delegation.responses.tools`. Follow the linked guides for configuration, model support, and required resources. Responses runs these tools and returns their results automatically.

For shell, use a hosted container, optionally with [Skills](https://developers.openai.com/api/docs/guides/tools-skills). For newly uploaded Skills, [wait until the referenced version is readable](https://developers.openai.com/api/docs/guides/tools-skills#wait-for-an-uploaded-version) before starting the Live session. Local shell requires your application to run calls. Live does not support shell `domain_secrets`.

### Add MCP and other tools

Responses delegation also supports [MCP](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), [tool search](https://developers.openai.com/api/docs/guides/tools-tool-search), [programmatic tool calling](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling), [functions and custom tools](https://developers.openai.com/api/docs/guides/function-calling), [computer use](https://developers.openai.com/api/docs/guides/tools-computer-use), [local shell](https://developers.openai.com/api/docs/guides/tools-shell#local-shell-mode), and [apply patch](https://developers.openai.com/api/docs/guides/tools-apply-patch). Use the linked guides for setup. Return application results and approval decisions through the [Live continuation flow](#return-tool-results-and-approvals).

Live passes the MCP `authorization` and `headers` you provide to Responses, but doesn't include those values in the session configuration it sends back to your application. You don't need to resend them when updating other settings, such as instructions. If you replace `delegation.responses.tools`, include the MCP credentials again.

### Handle configuration errors

Live validates Responses settings asynchronously after startup and when the settings change. `session.started` and `session.updated` do not wait for this validation. Listen for an `error` with code `responses_validation_failed` and check its message for the unsupported setting or inaccessible resource. The session stays open and the settings are not rolled back; correct them with `session.update`.

For example, a numeric Skill `version`, such as `1`, produces a nonfatal `responses_validation_failed` error for `session.start` or `session.update`. The error message identifies the invalid field and expected type without waiting for `response.create`. Match `error.client_event_id` to the settings event. To recover in the same session, remove the invalid tool configuration with `session.update`. Use string versions, such as `"1"`.

Validation does not guarantee later tool execution. Resource access and tool availability can change, so continue handling backend errors during delegated work. Configuring hosted tools can initialize resources such as containers during validation.

## Steer the live conversation from your application

Responses delegation manages the backend workflow, but your application can still send context directly to the GPT-Live model. If you monitor the call through a sideband WebSocket or the main event connection, you can use `session.instructions.append`, `session.thinking.append`, or `session.commentary.append` with `delegation_id: null`. For example, a transcript-based guardrail can append an instruction to redirect the conversation. This steers the live model; it does not change the Responses backend prompt or cancel work already in progress.

## Handle Responses delegation

For Responses-backed work, `session.delegation.created` has `target: "responses"` and a `response_id`. Subsequent Responses events arrive inside a `response.event` envelope:

```json
{
  "type": "response.event",
  "event_id": "event_response_1",
  "delegation_id": "item_9tA2cB6n2V8c4X1z7Q5r9",
  "event": {
    "type": "response.output_text.delta",
    "sequence_number": 4,
    "item_id": "msg_123",
    "output_index": 0,
    "content_index": 0,
    "delta": "The forecast is",
    "logprobs": []
  }
}
```

When the top-level event type is `response.event`, dispatch on `envelope.event.type`. Save the outer `delegation_id` to associate the backend event with its delegation. Your handler may also receive nested Responses lifecycle events beyond those shown here.

Hosted tool progress, citations, files, and generated images arrive in these nested events. Read individual output-item and partial-image events to collect results; the forwarded lifecycle snapshots omit their output arrays. Use the corresponding Responses file or container APIs to download files. For large image or artifact events, use a WebSocket or sideband connection because a WebRTC data channel's message limit can be smaller.

Live speech and delegated work continue independently. A completed backend response does not itself mean the user heard the answer. Use the Live output transcript and audio for the spoken part of the interaction.

### Return tool results and approvals

For tools that need application input, collect completed calls from nested `response.output_item.done` events. Perform the authorized action or approval check, then send the matching item with `response.item.create`:

| Received item                                 | Result item                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `function_call`                               | `function_call_output`                                                 |
| `custom_tool_call`                            | `custom_tool_call_output`                                              |
| `computer_call`                               | `computer_call_output`                                                 |
| Local `shell_call`                            | `shell_call_output`                                                    |
| `apply_patch_call`                            | `apply_patch_call_output`                                              |
| `tool_search_call` with `execution: "client"` | `tool_search_output` with `execution: "client"` and discovered `tools` |
| `mcp_approval_request`                        | `mcp_approval_response`                                                |

Match results to calls with `call_id`. For MCP approval decisions, instead set `approval_request_id` to the approval request's `id`, and set `approve` to `true` or `false`. A completed `mcp_call` does not itself require a client result. Follow each tool's result schema, including `caller` metadata for programmatic function calls and any required computer safety acknowledgments.

Submit results for every pending call, then send `response.create`. Appending an item alone does not resume the backend. Missing results produce `tool_outputs_required`, or `function_call_outputs_required` when only function results are missing. Duplicate results and mismatched result types are rejected.

You can submit results and request continuation before the current backend response completes. An accepted `response.create` waits for that completion; do not resend it. If the backend emits more calls afterward, submit their results and send another `response.create`.





### Run a custom function and return its result

Read completed function calls from nested `response.output_item.done` events. The finished function item contains `call_id`, `name`, and `arguments`; an arguments-done event alone is not sufficient to identify the call.

Track the response ID from nested `response.created` alongside the outer `delegation_id`. Collect the response's function calls from `response.output_item.done`, and use that collection to determine which tool results to submit before continuing.

The forwarded lifecycle events, including `response.completed`, contain `response.output: []` even when function calls need results. These events also have an empty `tools` array, `instructions: null`, and no `input` field. Read the individual output-item events for the function calls.

After executing the authorized operation, append the result as a Responses item:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "response.item.create",
    event_id: "tool_result_1",
    item: {
      type: "function_call_output",
      call_id: "call_123",
      output: '{"status":"confirmed","order_id":"order_123"}',
    },
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection
from openai.types.responses.response_input_item_param import ResponseInputItemParam


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    item: ResponseInputItemParam = {
        "type": "function_call_output",
        "call_id": "call_123",
        "output": '{"status":"confirmed","order_id":"order_123"}',
    }
    await connection.response.item.create(
        event_id="tool_result_1",
        item=item,
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
	"github.com/openai/openai-go/v3/responses"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfResponseItemCreate: &live.ResponseItemCreateEventParam{
		EventID: openai.String("tool_result_1"),
		Item:    responses.ResponseInputItemUnionParam{OfFunctionCallOutput: &responses.ResponseInputItemFunctionCallOutputParam{CallID: openai.String("call_123"), Output: responses.ResponseInputItemFunctionCallOutputOutputUnionParam{OfString: openai.String("{\"status\":\"confirmed\",\"order_id\":\"order_123\"}")}}},
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;
import com.openai.models.responses.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofResponseItemCreate(
          ResponseItemCreateEvent.builder()
              .eventId("tool_result_1")
              .item(
                  ResponseInputItem.FunctionCallOutput.builder()
                      .callId("call_123")
                      .output("{\"status\":\"confirmed\",\"order_id\":\"order_123\"}")
                      .build())
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(
    type: "response.item.create", event_id: "tool_result_1", item: {
      type: "function_call_output",
      call_id: "call_123",
      output: "{\"status\":\"confirmed\",\"order_id\":\"order_123\"}"
    }
  )
end
```


Then explicitly continue the response:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "response.create",
    event_id: "continue_1",
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    await connection.response.create(
        event_id="continue_1",
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfResponseCreate: &live.ResponseCreateEventParam{
		EventID: openai.String("continue_1"),
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofResponseCreate(ResponseCreateEvent.builder().eventId("continue_1").build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(type: "response.create", event_id: "continue_1")
end
```


Send a `response.item.create` result for every pending function call, then send `response.create` to continue the backend response. `response.item.create` has no separate success acknowledgment; keep processing errors and nested Responses lifecycle events.

Both commands require Responses delegation. The Live `response.create` command uses the backend configuration stored in the session. Use the event payload shown above, and configure the backend model and other settings through the session.

  

  


## Configure client delegation

Set `delegation` when [creating your Live session](https://developers.openai.com/api/docs/guides/live):

```javascript
export const session = {
  model: "gpt-live-1",
  delegation: {
    type: "client",
  },
};
```

```python
from openai.types.live.session_config_param import SessionConfigParam

session: SessionConfigParam = {"model": "gpt-live-1", "delegation": {"type": "client"}}
```

```go
import (
	"github.com/openai/openai-go/v3/live"
)

var session = live.SessionConfigParam{Model: "gpt-live-1", Delegation: live.SessionConfigDelegationUnionParam{OfClient: &live.ClientDelegationParam{}}}
```

```java
import com.openai.models.live.*;

var session =
    SessionConfig.builder()
        .model("gpt-live-1")
        .delegation(ClientDelegation.builder().build())
        .build();
```

```ruby
require "openai"
session = OpenAI::Models::Live::SessionConfig.new(model: "gpt-live-1", delegation: { type: :client })
```


Your application configures and runs the backend: choose its model or service, instructions, tools, and routing. If the backend uses the Responses API, set its model and tools in your application's Responses requests.

When GPT-Live requests help, build the backend request from your saved conversation history and current task state. Check permissions and required confirmations, run the work, and choose which results to return.

## Keep the conversation context in your application

For client delegation, **collect transcripts and keep the current task state yourself**.

Listen for `session.input_transcript.delta` and `session.output_transcript.delta`. These events contain transcript text in `delta`, along with `start_ms` and `end_ms` timestamps. Keep enough history to understand short replies such as “yes,” corrections such as “Thursday, not Friday,” and details supplied earlier. A transcript fragment is not a complete user turn, and transcripts may contain mistakes.

The separate `session.delegation.created` event contains an `offset_ms` timestamp and delegation metadata, including `delegation.id` and `delegation.target`. It does **not** contain the user's utterance or task text. Use the transcript events and application state to work out what the user wants. Save `delegation.id` so you can match updates to that request.

Keep long records and full tool output in the backend. If you create a replacement session, restore the relevant context from your application and check which actions already ran before repeating any work.

### Receive a client delegation

`session.delegation.created` identifies a delegation:

```json
{
  "type": "session.delegation.created",
  "event_id": "event_delegation",
  "offset_ms": 1000,
  "delegation": {
    "id": "item_9tA2bF3h7K9m2P5q8R1s4",
    "type": "delegation",
    "target": "client"
  }
}
```

Save `event.delegation.id` and include it unchanged in updates about this task.

Return a result using that ID:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "session.commentary.append",
    event_id: "result_123",
    delegation_id: "item_9tA2bF3h7K9m2P5q8R1s4",
    content: "The order shipped today and should arrive tomorrow.",
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    await connection.session.commentary.append(
        event_id="result_123",
        delegation_id="item_9tA2bF3h7K9m2P5q8R1s4",
        content="The order shipped today and should arrive tomorrow.",
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfSessionCommentaryAppend: &live.CommentaryAppendEventParam{
		EventID:      openai.String("result_123"),
		DelegationID: openai.String("item_9tA2bF3h7K9m2P5q8R1s4"),
		Content:      "The order shipped today and should arrive tomorrow.",
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofSessionCommentaryAppend(
          CommentaryAppendEvent.builder()
              .eventId("result_123")
              .delegationId("item_9tA2bF3h7K9m2P5q8R1s4")
              .content("The order shipped today and should arrive tomorrow.")
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(type: "session.commentary.append", event_id: "result_123", delegation_id: "item_9tA2bF3h7K9m2P5q8R1s4", content: "The order shipped today and should arrive tomorrow.")
end
```


Use `session.commentary.append` for results GPT-Live should say aloud; it is trained to paraphrase the text. Use `session.thinking.append` for facts or progress that it can use in later replies without saying them when they arrive. You can send multiple updates with the same client delegation ID.

See [Send the right kind of update](#send-the-right-kind-of-update) for content limits and required fields. To avoid a spoken acknowledgment while your backend runs, see [Suppress automatic acknowledgments while tools run](#suppress-automatic-acknowledgments-while-tools-run).

  




## Start with your existing backend prompt

Use your existing text-agent prompt as a starting point. Keep its task instructions and business rules with the backend, and adapt instructions that assume a text chat or direct control of speech. Explain how to handle voice transcripts and return useful results. Enforce permissions and required confirmations in your application.

```text
## Voice conversation context
You are helping an assistant in a live voice conversation. Transcripts
can contain mistakes, unfinished phrases, and later corrections. Use
the latest context and verified records. If a needed detail is still
unclear, ask for that detail instead of guessing.

## Task instructions
[Your task instructions, business rules, available tools,
and confirmation requirements.]

## Return the result
Return the relevant facts, the task's current status, and the next step.
Report an action as complete after the tool or service confirms success.
If the outcome is unclear, state that and explain what needs to be checked.
```

Keep large structured payloads, lengthy tool output, and Markdown intended for display in the backend. Give GPT-Live the relevant facts and let it choose how to say them. A concise tool result doesn't need an additional model call to rewrite it for speech.

With client delegation, [return the result directly to GPT-Live](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=client#receive-a-client-delegation). With Responses delegation, [return any required tool results or approvals](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=responses#return-tool-results-and-approvals) to continue backend work. Hosted tools continue without application-supplied results.

## Send the right kind of update

Choose an event based on how GPT-Live should use the content:

| What you want to send                                                                             | Event                         |
| ------------------------------------------------------------------------------------------------- | ----------------------------- |
| Instructions for an ongoing live conversation, such as a disclosure or direction to stop speaking | `session.instructions.append` |
| Information for internal reasoning, not spoken on append but usable for relevant user questions   | `session.thinking.append`     |
| Information the model should speak aloud, paraphrasing the appended text                          | `session.commentary.append`   |

All three use a plain-string `content`, limited to 500 tokens per append. Include `delegation_id`: use the original client delegation ID for an update about that task, or `null` for general session context. A non-null ID must identify a known client delegation. Instructions still apply to the live session; an ID does not turn them into a separate backend prompt.

For an opening greeting, include greeting instructions in a `developer` message in `session.input` when creating the session. After `session.started`, send the same instructions once through `session.commentary.append`, with input audio active, a unique `event_id`, and `delegation_id: null`. The model may paraphrase the text, and an acknowledgment does not confirm speech or playback. See [Greet before the caller speaks](https://developers.openai.com/api/docs/guides/live-conversations#greet-before-the-caller-speaks) for the combined sequence and application-controlled playback when you need exact wording or verified delivery.

An appended instruction can interrupt the model's current speech or behavior. Use it when the application needs to redirect the conversation; enforce any related tool or action block in application state.

For quiet progress during a client-managed task:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "session.thinking.append",
    event_id: "availability_progress",
    delegation_id: "item_123",
    content: "Checking Thursday availability. No appointment has been booked.",
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    await connection.session.thinking.append(
        event_id="availability_progress",
        delegation_id="item_123",
        content="Checking Thursday availability. No appointment has been booked.",
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfSessionThinkingAppend: &live.ThinkingAppendEventParam{
		EventID:      openai.String("availability_progress"),
		DelegationID: openai.String("item_123"),
		Content:      "Checking Thursday availability. No appointment has been booked.",
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofSessionThinkingAppend(
          ThinkingAppendEvent.builder()
              .eventId("availability_progress")
              .delegationId("item_123")
              .content("Checking Thursday availability. No appointment has been booked.")
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(type: "session.thinking.append", event_id: "availability_progress", delegation_id: "item_123", content: "Checking Thursday availability. No appointment has been booked.")
end
```


For a confirmed booking, send the result the user should hear:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "session.commentary.append",
    event_id: "appointment_result",
    delegation_id: "item_123",
    content: "Your appointment is confirmed for Thursday at 2:00 PM",
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    await connection.session.commentary.append(
        event_id="appointment_result",
        delegation_id="item_123",
        content="Your appointment is confirmed for Thursday at 2:00 PM",
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfSessionCommentaryAppend: &live.CommentaryAppendEventParam{
		EventID:      openai.String("appointment_result"),
		DelegationID: openai.String("item_123"),
		Content:      "Your appointment is confirmed for Thursday at 2:00 PM",
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofSessionCommentaryAppend(
          CommentaryAppendEvent.builder()
              .eventId("appointment_result")
              .delegationId("item_123")
              .content("Your appointment is confirmed for Thursday at 2:00 PM")
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(type: "session.commentary.append", event_id: "appointment_result", delegation_id: "item_123", content: "Your appointment is confirmed for Thursday at 2:00 PM")
end
```


Only send that result after the booking has actually succeeded. For a session-wide instruction, use `session.instructions.append` with `delegation_id: null`.

For example, after your application blocks a request under its guardrails, you can redirect the conversation:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "session.instructions.append",
    event_id: "guardrail_block_17",
    delegation_id: null,
    content:
      "Stop speaking about that request. Briefly explain that you cannot help with it, then wait for the user.",
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    await connection.session.instructions.append(
        event_id="guardrail_block_17",
        delegation_id=None,
        content=(
            "Stop speaking about that request. Briefly explain that you cannot help "
            "with it, then wait for the user."
        ),
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
	"github.com/openai/openai-go/v3/packages/param"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfSessionInstructionsAppend: &live.InstructionsAppendEventParam{
		EventID:      openai.String("guardrail_block_17"),
		DelegationID: param.Null[string](),
		Content:      "Stop speaking about that request. Briefly explain that you cannot help with it, then wait for the user.",
	}})
}
```

```java
import com.openai.core.JsonField;
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofSessionInstructionsAppend(
          InstructionsAppendEvent.builder()
              .eventId("guardrail_block_17")
              .delegationId(JsonField.<String>ofNullable(null))
              .content(
                  "Stop speaking about that request. Briefly explain that you cannot help with it, then wait for the user.")
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(type: "session.instructions.append", event_id: "guardrail_block_17", delegation_id: nil, content: "Stop speaking about that request. Briefly explain that you cannot help with it, then wait for the user.")
end
```


The instruction does not cancel backend work. [Block the affected action and handle any work already running](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#apply-conversation-guardrails) in your application.

The corresponding acknowledgements are `session.thinking.appended`, `session.commentary.appended`, and `session.instructions.appended`. Match their `client_event_id` to your outgoing `event_id`. The acknowledgment waits for estimated context injection, not for speech or playback to finish. See [when context reaches the model](https://developers.openai.com/api/docs/guides/live-conversations#understand-when-context-reaches-the-model) for timing and error handling.

Send facts and brief progress summaries that GPT-Live can use in the conversation. Content sent with `session.thinking.append` can influence later spoken replies; keep secrets and private backend reasoning in your application.

### Suppress automatic acknowledgments while tools run

With client delegation, you can cancel the pending automatic acknowledgment by sending a silent context update before the acknowledgment is generated.

Set `delegation.acknowledgement_delay_ms` when creating the session to give your application time to send the update. For example, use this client delegation configuration:

```json
{
  "delegation": {
    "type": "client",
    "acknowledgement_delay_ms": 800
  }
}
```

As soon as you receive `session.delegation.created`, send `session.thinking.append` with empty `content`. Use a unique `event_id` and copy `event.delegation.id` into `delegation_id`. Send this before waiting for the backend result:

```json
{
  "type": "session.thinking.append",
  "event_id": "event_quiet_progress_1",
  "delegation_id": "item_9tA2bF3h7K9m2P5q8R1s4",
  "content": ""
}
```

Continue the backend work, then send the verified result through `session.commentary.append` with the same delegation ID when it is ready to be spoken. If you want to provide progress context, a factual message such as `"Lookup in progress."` in the thinking append also cancels the pending acknowledgment without asking the model to speak that update.

Any thinking or commentary append cancels **all pending automatic acknowledgments in the session**, including those for other delegations. It does not stop audio already generated or prevent independent model speech. The delay controls when the automatic acknowledgment is requested; the model may still speak earlier. Check the [client delegation configuration and thinking append reference](https://developers.openai.com/api/reference/resources/live/primary-websocket) for the event contract.

Match the `session.thinking.appended` event's `client_event_id` to your outgoing event. This confirms context delivery, not silence. Test the resulting audio on your workload; use [application-controlled playback](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#control-playback-when-needed) when silence must be guaranteed.

## Keep updates accurate and useful

During longer tasks, send an update when something useful changes: a step finishes, a delay matters, or the user needs to answer a question.

Use `session.thinking.append` for background progress in client mode. Use `session.commentary.append` when the update is useful to say aloud.

For spoken updates, send `session.commentary.append` with content that matches the task's verified state:

| State                  | Example content                            |
| ---------------------- | ------------------------------------------ |
| Still working          | “I'm checking the available appointments.” |
| Completed              | “You're booked for Thursday at 2:00 PM.”   |
| Failed                 | “That time is no longer available.”        |
| Cancellation confirmed | “Your appointment has been canceled.”      |

When the user changes a request, update the active task in your application. For example, if they change Friday to Thursday, use Thursday for subsequent work and ignore results from the outdated Friday request. Manage any cancellation in the backend, and confirm it succeeded before telling the user that the work was canceled. Interrupting the spoken conversation leaves backend work running.

Before retrying a failed tool call, check whether the original action already happened. For example, a lost response should not cause a second booking. If the outcome is unclear, say so and offer the next useful step.

## Share UI context

Give GPT-Live a concise summary of the current page or task, relevant selections, and facts that help interpret references such as “this option.” Build the summary directly from application state; no extra model call is needed to format it.

Send UI context at session start and when relevant state changes. Skip unchanged updates and combine rapid changes into a short summary of the latest state. Make changes to previous selections explicit:

- **Initial context:** “The user is reviewing a restaurant reservation: August 6 at 7 PM, two guests. No reservation has been made.”
- **Correction:** “The selected time is now 8 PM; the previous selection was 7 PM.”

In either delegation mode, use `session.thinking.append` with `delegation_id: null` for [background context updates](https://developers.openai.com/api/docs/guides/live-conversations#add-context-during-the-conversation). Keep full HTML, DOM trees, large JSON payloads, and interaction logs in your application or backend. Treat page content as reference data, not instructions.

### Accept typed input

Send typed values, such as order numbers, to the backend as user-provided data so it can use the exact text.



  


With Responses delegation, queue a user message for the backend:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "response.item.create",
    event_id: "typed_order_number",
    item: {
      type: "message",
      role: "user",
      content: [
        {
          type: "input_text",
          text: "My order number is A0042.",
        },
      ],
    },
  });
}
```

```python
from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection
from openai.types.responses.response_input_item_param import ResponseInputItemParam


async def send_update(
    connection: AsyncLiveConnection | AsyncSidebandConnection,
) -> None:
    item: ResponseInputItemParam = {
        "type": "message",
        "role": "user",
        "content": [{"type": "input_text", "text": "My order number is A0042."}],
    }
    await connection.response.item.create(
        event_id="typed_order_number",
        item=item,
    )
```

```go
import (
	"context"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
	"github.com/openai/openai-go/v3/responses"
)

// SendUpdate requires a started Live session.
func SendUpdate(ctx context.Context, connection *live.LiveConnection) error {
	return connection.Send(ctx, live.ClientEventUnionParam{OfResponseItemCreate: &live.ResponseItemCreateEventParam{
		EventID: openai.String("typed_order_number"),
		Item:    responses.ResponseInputItemUnionParam{OfMessage: &responses.EasyInputMessageParam{Role: "user", Content: responses.EasyInputMessageContentUnionParam{OfInputItemContentList: responses.ResponseInputMessageContentListParam{responses.ResponseInputContentParamOfInputText("My order number is A0042.")}}}},
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;
import com.openai.models.responses.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofResponseItemCreate(
          ResponseItemCreateEvent.builder()
              .eventId("typed_order_number")
              .item(
                  EasyInputMessage.builder()
                      .role(EasyInputMessage.Role.USER)
                      .contentOfResponseInputMessageContentList(
                          java.util.List.of(
                              ResponseInputContent.ofInputText(
                                  ResponseInputText.builder()
                                      .text("My order number is A0042.")
                                      .build())))
                      .build())
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(
    type: "response.item.create", event_id: "typed_order_number", item: {
      type: "message",
      role: "user",
      content: [
        {
          type: "input_text",
          text: "My order number is A0042."
        }
      ]
    }
  )
end
```


Send `response.create` when ready to run or continue the backend. If it is waiting for function results, return all required results first. Queuing text does not itself cancel work already running.

  

  


With client delegation, send the typed value directly to the backend that handles the conversation. If it corrects a running task, update that task instead of starting the same work again. You can mirror a short factual summary into the live session with `session.thinking.append`, or use `session.commentary.append` for a result the user should hear.

  




## Add images and visual context

To help a caller discuss a photo or screen, send the image and relevant context from your application to a vision-capable backend. The backend interprets the image and returns relevant text for GPT-Live to use in conversation. The Live audio frontend does not accept images directly.



  


With Responses delegation, configure a vision-capable backend model. Queue a supported Responses image input item with `response.item.create`, then send `response.create` to run or resume backend work. Return all required pending tool results and approvals before continuing. See [Handle Responses delegation](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=responses#handle-responses-delegation).

  

  


With client delegation, send visual input to the backend that handles delegated requests, alongside the relevant conversation and application state. Return concise findings using the [client result flow](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=client#receive-a-client-delegation).

  




Keep backend image input separate from `session.input`, which seeds the Live frontend with text history at startup. See [Images and vision](https://developers.openai.com/api/docs/guides/images-vision) for supported image formats and model limitations.

## Reduce backend latency

Reduce the time between a request for backend work and a useful result for the conversation. Measure [latency at each stage](https://developers.openai.com/api/docs/guides/voice-agents#measure-latency) to locate delays. Compare useful spoken response time and task success on the same scenarios, and see the [voice agent evaluation Cookbook](https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation) for evaluation guidance.



  


### Responses delegation

Live manages persistent WebSocket connections to Responses and prepares known request configuration in advance. It can also reuse prior response state when the active connection and state support it. Measure response time and reported cache usage on your workload to see the effect.

Tune the backend through `delegation.responses`:

- `model`: choose the model that handles reasoning and tool selection independently of the voice model.
- `reasoning.effort`: balance reasoning time and task quality using values supported by that model.
- `service_tier`: use `auto`, `default`, `flex`, or `priority`, subject to model support and project access. `auto` follows the project's configuration. Evaluate the performance and cost of the tier you choose.

Update supported settings during the session with `session.update`. Your custom tools still run in your application, so slow service calls, queues, and tool-result buffering can delay the answer even when Live manages the Responses connection. Return each required tool result promptly and [continue the backend response](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=responses#complete-a-client-actionable-function-call).

  

  


### Client delegation

Your application owns the path from delegation receipt to returning a result. Prepare that path while the voice session runs:

- **Reuse backend connections.** Keep the API client and its connection pool alive across delegations. For repeated Responses calls, consider a persistent [Responses WebSocket](https://developers.openai.com/api/docs/guides/websocket-mode).
- **Prepare known configuration.** Initialize instructions, tools, and connections before the first request needs them. Responses WebSocket mode also supports warming up known request state before generation; follow its [setup guidance](https://developers.openai.com/api/docs/guides/websocket-mode#connect-and-create-responses).
- **Stream useful results.** Return coherent, verified chunks with `session.commentary.append`. Use `session.thinking.append` for quiet progress. Preserve the client delegation ID and the 500-token limit per append. Keep private reasoning in the backend and confirm actions before announcing success.
- **Keep reusable input stable.** Preserve instructions, tool definitions and ordering, and unchanged history prefixes. Append new information after reusable content when your backend supports caching and continuation.
- **Forward complete, useful updates.** Send each result as soon as you have enough text to understand it on its own. Have your backend label updates as progress or results so your application can choose the appropriate append event. If it marks these categories with a text prefix, wait for the full prefix before forwarding the update.

Measure the first useful spoken answer when comparing this path with Responses delegation.

  




### React to transcript fragments

Processing transcript fragments in your application is optional and works with either delegation mode. User and assistant [transcript fragments](https://developers.openai.com/api/docs/guides/live-conversations#transcript-deltas) arrive over WebSocket or the WebRTC data channel. You can process them with application logic or a lightweight model to start work before a delegation event arrives, or use the transcript itself to trigger application-owned work.

Use this pattern to:

- **Reduce waiting.** Start a speculative lookup when enough information is available—for example, checking availability while the user continues describing their preferences.
- **Run guardrails.** Check the growing transcript for requests or responses that need intervention. See [Apply conversation guardrails](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#apply-conversation-guardrails).
- **Adapt the conversation.** Look for wording that suggests confusion or frustration, then adjust the experience or send a focused instruction.
- **Update the interface.** Highlight relevant controls, populate suggested fields, or show results as they become available.

For browser applications, use the WebRTC data channel for captions and local UI updates. When transcript processing runs on your server—for guardrails, lightweight model checks, or speculative tool calls—use a [sideband WebSocket](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#decide-whether-you-need-a-sideband) to receive events and steer the same GPT-Live session directly.

Process accumulated text when meaningful new information arrives. A fragment may be incomplete, and later speech can change the request. Discard outdated results, coordinate with subsequent delegated work to avoid duplicate actions, and apply your usual permission and confirmation checks before consequential actions.

Send findings or instructions back to GPT-Live using the [append event that matches the update](#send-the-right-kind-of-update). For work started outside a client delegation, use `delegation_id: null`. Your application applies UI changes and manages tool execution and cancellation.

### Shared optimizations

Both delegation modes benefit from the same backend improvements:

- **Choose the model and reasoning effort for the task.** Compare configurations that meet your accuracy requirements. Use lower reasoning effort when it completes the task reliably.
- **Keep answers concise.** Return the facts and status GPT-Live needs to continue the conversation. Avoid long explanations and extra model calls just to rewrite results for speech.
- **Reduce tool delays and unnecessary calls.** Start authorized work when its inputs are ready, reuse results while they remain valid, and avoid repeating a completed lookup.
- **Run independent work concurrently.** Independent lookup calls can run together. Respect dependencies and required confirmations for actions. `parallel_tool_calls` lets a model request multiple calls; your application still schedules and executes its custom functions.

See [Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization) for general Responses guidance and [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) for reusing stable input.

## Verify the complete interaction

Verify that the backend completed the intended action and that the client played the expected spoken result. For example, check both the booking record and the audio played after a successful reservation. The backend can finish while the spoken answer is interrupted, so test these outcomes separately.

Track each application action with its own operation ID and each changed request with a task revision, alongside the GPT-Live delegation ID. Use those records to recognize completed work after reconnects or retries and to discard results for outdated requests.

Use [Evaluating voice agents](https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation) for repeatable tests. For an existing Realtime tool loop or chained backend, follow [Migrate to GPT-Live](https://developers.openai.com/api/docs/guides/live-migration).