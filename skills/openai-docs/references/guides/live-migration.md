# Migrate to GPT-Live

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

GPT-Live handles listening and speaking. A backend decides how to complete tasks and which tools to call. Keep your existing tool implementations, permission checks, and saved task records. During migration, connect that backend to GPT-Live and decide which instructions belong in each model.

This guide uses an appointment assistant: check availability, ask the user to confirm a slot, then book it. Start with a connected session from [Getting started](https://developers.openai.com/api/docs/guides/live), and keep representative conversations from your existing application for comparison.

## Before you migrate

Record the requirements your migrated application must preserve:

- **Tools and business rules:** List your existing prompts, tools, and workflows, including the conditions for each action.
- **Input types:** Identify where audio, typed text, and images enter your application and which backend needs them. See [Add images and visual context](https://developers.openai.com/api/docs/guides/live-delegation#add-images-and-visual-context).
- **Decisions that depend on audio:** Identify decisions that need the original sound, beyond the words in a transcript. See [Preserve decisions that depend on audio](https://developers.openai.com/api/docs/guides/live-migration?migration-path=realtime#preserve-decisions-that-depend-on-audio).
- **Speech and playback:** Specify when speech may start, when it must stop, and which checks must finish before audio plays.
- **Permissions and guardrails:** List authorization, confirmation, and input/output checks, and where your application enforces them. See [Adapt your guardrails](#adapt-your-guardrails).
- **Durable state:** Identify the records, task progress, and pending actions your application must keep across disconnects and new sessions.
- **Baseline conversations:** Save representative conversations and their starting state, expected tool actions, final application state, and spoken responses from your current application.

Use [Getting started](https://developers.openai.com/api/docs/guides/live) for session setup and the [voice agent evaluation Cookbook](https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation) to plan your comparison.

## Choose your delegation mode

Choose who will run the backend:

- **Responses delegation:** Configure a hosted Responses model to reason about tasks and select tools. Your application executes custom functions and returns their results. This is a useful starting point when your Realtime model currently selects those functions.
- **Client delegation:** Keep your existing agent or orchestrator. Your application supplies its conversation context, starts its work, and decides which results to send to GPT-Live.

Either mode can support either migration path. For example, a Realtime application with a separate backend agent can keep that agent through client delegation. See [Choose a delegation mode](https://developers.openai.com/api/docs/guides/live-delegation#choose-a-delegation-mode) for the full comparison.

## Choose your migration path

Start with [From Realtime API](https://developers.openai.com/api/docs/guides/live-migration?migration-path=realtime#from-realtime-api) if your current voice model selects tools. Start with [From a text agent or chained pipeline](https://developers.openai.com/api/docs/guides/live-migration?migration-path=text-agent#from-a-text-agent-or-chained-pipeline) if you are keeping an existing agent and adding GPT-Live as its voice interface.



## From Realtime API

Start with the [GPT-Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting). Split your existing prompt between the voice model and the backend instead of copying it wholesale into `session.instructions`. Keep conversation style and delegation guidance in the voice prompt; move detailed workflows and tool-use instructions to the backend.

**Before:** the Realtime model handles speech and selects functions such as `check_availability` and `book_appointment`. Your application executes the functions and returns their results.

**After:** GPT-Live handles speech and delegates task work. The backend selects the same functions; your application still validates and executes them. The steps here use Responses delegation. If you retain an external agent, use the [client adapter](https://developers.openai.com/api/docs/guides/live-migration?migration-path=text-agent#connect-your-existing-agent) instead.

### How Responses delegation works

Configure the backend model, instructions, and tools in `delegation.responses`. When GPT-Live decides a request needs backend work, the Live service calls that Responses model and supplies relevant conversation context. The backend reasons about the task and selects tools. Your application still runs custom functions, enforces permissions, and returns their results.

For the appointment assistant:

1. The user asks which appointments are available on Friday, and GPT-Live delegates the request.
2. The Responses backend requests `check_availability`.
3. Your application runs the function, returns its result, and continues the backend response.
4. GPT-Live uses the answer from the backend to discuss available slots with the user.

GPT-Live can continue speaking while the backend works. Track the backend task and audio playback separately: use tool results to update task status and your player’s state to update the speaking indicator. See [Delegation and tools](https://developers.openai.com/api/docs/guides/live-delegation#configure-responses-delegation) for configuration and the full event flow.

### Adapt the connection and audio lifecycle

Replace Realtime session setup with the [GPT-Live connection procedure](https://developers.openai.com/api/docs/guides/live). Recheck your transport's startup and audio format. WebRTC carries audio on media tracks and JSON events on the data channel. A primary WebSocket carries audio in JSON events.

If your Realtime application uses a server connection to monitor the call or enforce guardrails, adapt it to the [GPT-Live sideband connection](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#attach-to-the-existing-session). Follow [Adapt your guardrails](#adapt-your-guardrails) for the changes to conversation checks and playback.

| Existing Realtime behavior                                                                            | GPT-Live adaptation                                                                                             |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Send WebSocket audio with `input_audio_buffer.append`.                                                | Send `session.input_audio.append`; its `audio` field contains base64 raw audio.                                 |
| Play `response.output_audio.delta` from its `delta` field.                                            | Play `session.output_audio.delta` from its `delta` field, in order.                                             |
| Commit audio or create a response to start a turn when using manual turn control.                     | Stream audio continuously. GPT-Live decides when to speak; remove manual audio commits and voice-turn triggers. |
| Track audio generation and response completion with `response.output_audio.done` and `response.done`. | GPT-Live has no corresponding event marking the end of each spoken response. Track playback in your client.     |
| Display user captions from input transcription events.                                                | Append `session.input_transcript.delta` text to the user's captions.                                            |
| Display assistant captions from `response.output_audio_transcript.delta`.                             | Append `session.output_transcript.delta` text to the assistant's captions.                                      |

**Generation and playback:** Drive the speaking indicator from your audio player. The server can finish generating while the player still has a second of audio queued. In Realtime, `response.output_audio.done` marks the end of generation and `response.done` ends the response stream; check `response.status` for interruption or failure. GPT-Live has no equivalent event for the end of each spoken response.

**Captions:** When input transcription is enabled, Realtime sends text fragments through `conversation.item.input_audio_transcription.delta` and a final transcript through `conversation.item.input_audio_transcription.completed`. In GPT-Live, append each fragment to the caller’s or assistant’s captions; both can change at once. Your application decides how to group text and tracks playback through the audio player. See [Display captions](https://developers.openai.com/api/docs/guides/live-conversations#display-captions).

Use `response.create` to start or continue delegated Responses work. GPT-Live manages when to speak as it listens to the conversation. For startup, greetings, interruptions, and closing a session, follow [Managing sessions](https://developers.openai.com/api/docs/guides/live-conversations).

### Split conversation and backend instructions

When migrating a Realtime assistant to GPT-Live, start with your existing prompt. Move speaking style and turn-taking instructions into the Live prompt, and add rules for when to delegate. Keep task instructions and tool-use procedures in the backend prompt.

If you're adding voice to a text agent, [reuse its existing backend prompt](https://developers.openai.com/api/docs/guides/live-delegation#start-with-your-existing-backend-prompt) and write a Live prompt for the spoken interaction.

#### Keep the experience consistent

Keep your assistant’s role, audience, and purpose, and preserve the details that shape the conversation:

- Greetings, introductions, and spoken disclosures, including any required wording or order.
- Language and pronunciation requirements, such as “Speak English.”
- Personality, warmth, empathy, formality, and pacing.
- The level of detail in spoken answers and examples that show the intended style.
- How it acknowledges the user, pauses to listen, and responds to interruptions.

A short Live prompt can still ask for detailed spoken answers.

#### Write the Live prompt

Use the [recommended prompt structure](https://developers.openai.com/api/docs/guides/live-prompting#recommended-prompt-structure) for the assistant's identity, speaking style, and conversational behavior. Keep `Backchannel policy` and `Interruption policy` to describe listening acknowledgments and how the assistant responds when someone speaks over it.

Live needs to know what the backend can do so it can delegate accurately. Describe those capabilities in plain language. Function names and tool schemas belong in the backend, which handles tool calls.

Under `Delegation policy`, adapt these sections to your application:

- **`Backend tools`:** List the capabilities your application supports, using the same terms as your existing prompt. For example: “Check appointment availability and schedule callbacks.”
- **`Delegate to the backend when`:** State when to use those capabilities, such as “Delegate when the user asks to schedule a callback.” Include corrections, confirmations, and new details needed for work already in progress.
- **`Do not delegate to the backend when`:** Describe what Live can handle directly, such as a greeting, a brief clarification, or repeating information from the conversation or a still-current backend result.

Describe how Live should communicate progress, ask the backend's next question, or relay a verified result.

If your assistant ends calls, give Live instructions for the farewell and for delegating the end-call request. Put the actual end-call tool and sequence in the backend. For example, a procedure might require the application to finish playing the farewell, disconnect, cancel pending calculations, and block further saves. Live handles the farewell and delegation; the backend and application handle those remaining steps.

#### Adapt your backend prompt

Use your original prompt as the starting point. Keep its wording, order, examples, and structure wherever they still apply. If it mainly describes tasks, most of it can stay as written.

Keep instructions here for:

- Interpreting the user's request, applying corrections, collecting missing information, and tracking task progress.
- Using domain facts, checking eligibility, and consulting the records or services that establish the answer.
- Following procedures for searches, updates, confirmations, routing, transfers, callbacks, and other supported actions.
- Applying safety, privacy, and authorization rules, handling failures, and restricting actions after a transfer or call end.
- Preparing accurate facts, task status, and the next question for Live to communicate.

Move instructions for voice, greetings, turn-taking, and when to delegate into the Live prompt. Adapt instructions that assume the backend speaks directly to the user so it returns information for Live instead. Keep safety and privacy limits in both prompts wherever they affect what that model may say, ask, or do.

Keep function names, argument requirements, and tool-use procedures in backend instructions. Put tool definitions in your backend's tool configuration. Your application executes its tools and enforces permissions, argument validation, and required confirmations against the current task state.

Use the backend model to understand requests, corrections, and confirmations from the conversation. Regular expressions, keyword lists, and exact-phrase rules miss meaning that depends on earlier speech or a correction. For example, “yes” may confirm a slot, acknowledge a question, or refer to an earlier suggestion.

Preserve the rules for work already running when the caller interrupts or the call is transferred or ended. Stopping speech leaves backend work running. If the caller asks to cancel, the backend and application need to handle that cancellation and report its outcome to Live.

#### Resolve conflicting instructions

Review the original prompt and both new prompts for instructions that disagree. Combine repeated instructions, and keep specific conditions and exceptions alongside the rules they qualify. Check permissions, question limits, confirmations, and what may happen after a call ends.

Separate what the user wants from what has happened. If a caller changes Friday to Thursday, the latest request tells the backend to work on Thursday. The booking record tells it whether Friday was already booked. Your existing confirmation and authorization rules determine which changes it can make next.

Resolve product choices with the people responsible for them before using the prompts. For example, if one instruction says to continue a booking and another says to stop all work when the caller interrupts, decide which behavior the application should provide. Record the agreed behavior in the prompts and the application logic that enforces it.

Check that each required action has an implementation. Ending a call requires an end-call capability; a spoken goodbye alone leaves the connection open. If a capability is missing, decide whether to implement it or agree on a supported alternative with the team that owns the workflow.

#### Review both prompts

Compare both prompts with the original and check that every required behavior has a place:

- The Live prompt preserves the assistant's identity, vocabulary, speaking style, disclosures, and interruption behavior.
- The backend prompt preserves the task procedures, facts, conditions, examples, permissions, and failure handling.
- Delegation covers new requests, corrections, confirmations, and requests that combine conversation with task information.
- The two prompts agree on question limits, when an action is confirmed, and how to handle continuing work, cancellation, transfers, and call ending.

Put the Live prompt in `session.instructions`. For Responses delegation, put the backend prompt in `session.delegation.responses.instructions`; for client delegation, keep it in your existing agent's configuration. Keep tool definitions with the backend. See [Delegation and tools](https://developers.openai.com/api/docs/guides/live-delegation) for configuration and result handling.

<details>
<summary>Example: split an appointment prompt</summary>

This appointment assistant already has `check_availability` and `book_appointment` tools. Its original prompt combines speaking style with a booking procedure. The split keeps the same greeting, confirmation requirements, and correction handling.

**Original prompt**

```text
You are Rowan, the appointment assistant for Northstar Repairs.
Speak English, calmly and briefly. Greet the caller once with:
"Hello, this is Rowan from Northstar Repairs. How can I help?"
Use brief listening acknowledgments. Stop speaking when interrupted.

Help callers find and book appointments. Ask for the preferred date
and time zone if missing, then use check_availability.
Offer only returned slots. Ask the caller to confirm the exact slot
before calling book_appointment.
If the caller changes the date, time zone, or slot, discard the earlier
confirmation and check availability again.
Report a booking only after the tool confirms success. If the outcome
is unclear, say it is unconfirmed and do not retry automatically.
```

**Live prompt**

```text
You are Rowan, the appointment assistant for Northstar Repairs.
Speak English, calmly and briefly. Greet the caller once with:
"Hello, this is Rowan from Northstar Repairs. How can I help?"

Backchannel policy: Use brief listening acknowledgments.

Interruption policy: Stop speaking when interrupted and listen.

Delegation policy:
Backend tools:
- Appointments: check available times and book appointments.

Delegate to the backend when:
- The caller wants to find or book an appointment.
- The caller supplies or corrects a date, time zone, or slot, or
  answers a booking question, including confirming a slot.

Do not delegate to the backend when:
- The caller greets you or asks you to repeat a still-current result.
- You need a brief clarification to understand what they are asking.

Relay the backend's questions and results. Offer only slots it returns.
Do not claim a booking is complete until the backend confirms success.
If the backend reports an unclear outcome, say it is unconfirmed.
```

**Backend prompt**

```text
Help callers find and book appointments for Northstar Repairs.
Ask for the preferred date and time zone if missing, then use
check_availability. Offer only returned slots.
Ask the caller to confirm the exact slot before calling book_appointment.
If the caller changes the date, time zone, or slot, discard the earlier
confirmation and check availability again.
Report a booking only after the tool confirms success. If the outcome
is unclear, report it as unconfirmed and do not retry automatically.

Return the available slots, booking outcome, or next question for the
voice assistant to communicate. Interpret the caller's latest answers
and corrections using the conversation and current task state.
```

</details>

### Adapt your function handlers

Keep the implementation of `check_availability` and `book_appointment`. Move their definitions from Realtime's `session.tools` or `response.tools` to `delegation.responses.tools`, using the Responses function schema. Move tool-selection settings to `delegation.responses.tool_choice` and `delegation.responses.parallel_tool_calls`. See [Configure Responses delegation](https://developers.openai.com/api/docs/guides/live-delegation#configure-responses-delegation).

The function still returns a result for its original `call_id`. What changes is where your handler receives the call and sends the result:

| Step                                 | Realtime API                                                                     | GPT-Live with Responses delegation                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Receive the completed function call. | Read `response.output_item.done`.                                                | Unwrap `response.event`, then read its inner `response.output_item.done`.                                         |
| Identify and execute the operation.  | Read the item's `name`, `arguments`, and `call_id`; run your authorized handler. | Keep that handler and its checks. Preserve the outer `delegation_id` and backend response ID in your application. |
| Return each function result.         | Send `conversation.item.create`.                                                 | Send `response.item.create`.                                                                                      |
| Continue after all required results. | Send `response.create`.                                                          | Send `response.create` to continue backend work.                                                                  |

For example, after `check_availability` returns a verified slot, send the following on your connected session. Replace `call_availability` with the call ID you received.

**Before: Realtime result**

```json
{
  "type": "conversation.item.create",
  "item": {
    "type": "function_call_output",
    "call_id": "call_availability",
    "output": "{\"available\":true,\"slot_id\":\"slot_friday_14\",\"booked\":false}"
  }
}
```

**After: GPT-Live result**

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "response.item.create",
    event_id: "availability_result_1",
    item: {
      type: "function_call_output",
      call_id: "call_availability",
      output: '{"available":true,"slot_id":"slot_friday_14","booked":false}',
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
        "call_id": "call_availability",
        "output": '{"available":true,"slot_id":"slot_friday_14","booked":false}',
    }
    await connection.response.item.create(
        event_id="availability_result_1",
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
		EventID: openai.String("availability_result_1"),
		Item:    responses.ResponseInputItemUnionParam{OfFunctionCallOutput: &responses.ResponseInputItemFunctionCallOutputParam{CallID: openai.String("call_availability"), Output: responses.ResponseInputItemFunctionCallOutputOutputUnionParam{OfString: openai.String("{\"available\":true,\"slot_id\":\"slot_friday_14\",\"booked\":false}")}}},
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
              .eventId("availability_result_1")
              .item(
                  ResponseInputItem.FunctionCallOutput.builder()
                      .callId("call_availability")
                      .output(
                          "{\"available\":true,\"slot_id\":\"slot_friday_14\",\"booked\":false}")
                      .build())
              .build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(
    type: "response.item.create", event_id: "availability_result_1", item: {
      type: "function_call_output",
      call_id: "call_availability",
      output: "{\"available\":true,\"slot_id\":\"slot_friday_14\",\"booked\":false}"
    }
  )
end
```


After submitting every required function result, continue the backend:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "response.create",
    event_id: "continue_availability_1",
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
        event_id="continue_availability_1",
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
		EventID: openai.String("continue_availability_1"),
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;

public static void sendUpdate(LiveConnection connection) {
  connection.send(
      ClientEvent.ofResponseCreate(
          ResponseCreateEvent.builder().eventId("continue_availability_1").build()));
}
```

```ruby
def send_update(connection)
  connection.send_event(type: "response.create", event_id: "continue_availability_1")
end
```


For the initial migration, set `parallel_tool_calls` to `false` to handle one tool call at a time. Collect each function call from the inner `response.output_item.done` event and keep its name, arguments, and `call_id`. Keep that record even if a later completion event contains `output: []`. Wait for the completed item before running the handler; the arguments-done event alone lacks the function name and `call_id`. Follow the complete [function-result procedure](https://developers.openai.com/api/docs/guides/live-delegation#complete-a-client-actionable-function-call) for collection, output submission, and errors.

### Preserve context and apply corrections

Responses delegation supplies relevant voice conversation context to the backend. Keep the authoritative appointment state in your application: selected slot, confirmed slot, permissions, active operation, and outcome. Live conversation history can be compacted; it is not your booking record.

When the user says “Actually, Friday instead,” record Friday as the current request and clear any confirmation for Thursday. Give the task a new version number, such as revision 2, so your application can recognize results from the earlier request.

Before booking, check that the date, slot, and confirmation still match the current request. If you decline a pending function call because the user changed the request, return a result that explains it was skipped or cancelled, matching what actually happened. Submit a result for every required call before continuing the backend.

If the Thursday booking already succeeded, check its current status and handle the requested change before attempting another booking.

Keep each transcript fragment exactly as received, along with its speaker, `start_ms`, and `end_ms`. Use that information to update the appropriate caller or assistant caption or chat bubble, including when a fragment arrives late or both people speak at once. Choose message boundaries in your application and track audio playback in your player; the transcript timestamps do not identify exact word playback times. Clarify important dates, names, and numbers when intent is uncertain. See [Managing sessions](https://developers.openai.com/api/docs/guides/live-conversations) for transcript and context handling.

**Images and screen context:** If your Realtime application accepts images, route them to a vision-capable backend and return relevant text to GPT-Live. Both client and Responses delegation support this pattern. See [Add images and visual context](https://developers.openai.com/api/docs/guides/live-delegation#add-images-and-visual-context).

### Preserve decisions that depend on audio

Some decisions require the sound itself, such as detecting a voicemail beep or recognizing a recorded greeting from its timing. GPT-Live hears the call, but delegation does not automatically send audio to your backend. In client mode, `session.delegation.created` contains an ID and timing information; your application supplies the request context and any audio the backend needs.

For answering-machine detection, explicitly route incoming audio to an audio-capable detector. One application-managed architecture to evaluate runs a separate Realtime session alongside GPT-Live for part of the call:

1. Send a copy of the incoming call audio to both sessions.
2. Have the detector report its classification through a structured function call. Check each result against your schema, reject stale results, and keep an unknown state when evidence is insufficient. Allow later evidence to revise the decision.
3. Send relevant trusted context to GPT-Live, and apply your application's policy to outgoing audio playback.

Track two decisions: whether you are speaking to a person or a machine, and whether the destination is ready to record your message. A detector may recognize voicemail while the greeting is still playing. Wait for the evidence your application requires before allowing outgoing audio. A context acknowledgment records acceptance of the update; your application still makes the playback decision. Use [Adapt your guardrails](#adapt-your-guardrails) and the [playback controls](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#control-playback-when-needed) to enforce that decision in the audio path your application controls.

Test a short “hello” that develops into a voicemail greeting, call-screening prompts, and a person picking up during voicemail. If you plan to stop the detector before the call ends, test what happens when a person picks up afterward. Use those results and the detector’s added cost to choose how long it should run. Include cases where an initial “human” classification changes as more audio arrives.

  


  


## From a text agent or chained pipeline

**Before:** a text agent receives written requests and uses its tools and saved state. A chained, or cascaded, voice pipeline adds speech-to-text before that agent and text-to-speech after it.

**After:** GPT-Live provides the voice interface and delegates task work to your existing agent. For a chained pipeline, it replaces the separate speech-to-text and text-to-speech stages. Keep the models, instructions, tools, workflow, and durable state in your backend where they still fit the task.

### Connect your existing agent

Configure `delegation` as `{"type":"client"}` during [session setup](https://developers.openai.com/api/docs/guides/live). Your application receives a notification such as this:

```json
{
  "type": "session.delegation.created",
  "offset_ms": 1000,
  "delegation": {
    "id": "item_appointment_1",
    "type": "delegation",
    "target": "client"
  }
}
```

Use this notification to start your application’s delegation handler. Preserve `delegation.id` so you can attach the result to the same request. Your handler prepares the agent’s input from caller and assistant transcripts plus the task records your application holds; the notification itself contains no request text or tool arguments.

For example, the appointment agent might receive:

> Caller: “Actually, Friday instead.”
>
> Current request: Find an appointment on Friday in the caller’s time zone.
>
> Previous result: Thursday at 2 PM was offered.
>
> Confirmation: No Friday slot has been confirmed.
>
> Task revision: 2.

The notification may arrive before the full sentence is transcribed. Keep it until you have enough context, or ask the caller to clarify before taking action.

In a text application, you might pass the user's latest message directly to your agent. With GPT-Live, add an adapter that supplies that context and returns a concise, verified result.

Before calling the adapter, record the delegation ID so only one handler starts work for it. If the request is unclear, call the adapter again when the context is ready.

Your backend remains responsible for authorization, confirmation, operation IDs, and retries. Check the task’s current revision before changing a booking. The adapter’s later revision check only prevents an outdated result from being announced; it cannot undo a booking already made.

Connect a client delegation to your agent

```javascript
async function handleDelegation(event, app) {
  if (
    event.type !== "session.delegation.created" ||
    event.delegation?.target !== "client"
  )
    return;

  const context = app.readContext();
  if (!context) return; // Retain the notice; resolve the request before acting.

  const summary = await app.runAgent({
    revision: context.revision,
    recentConversation: context.recentConversation,
    task: context.task,
  });

  if (app.currentRevision() !== context.revision) return;

  app.send({
    type: "session.commentary.append",
    event_id: crypto.randomUUID(),
    delegation_id: event.delegation.id,
    content: summary,
  });
}
```

```python
from collections.abc import Awaitable, Callable
from dataclasses import dataclass
from uuid import uuid4

from openai.resources.live.live import AsyncLiveConnection
from openai.resources.live.sideband import AsyncSidebandConnection
from openai.types.live.server_event import ServerEvent


@dataclass(frozen=True)
class Context:
    revision: int
    recent_conversation: str
    task: str


async def handle_delegation(
    event: ServerEvent,
    connection: AsyncLiveConnection | AsyncSidebandConnection,
    *,
    read_context: Callable[[], Context | None],
    run_agent: Callable[[Context], Awaitable[str]],
    current_revision: Callable[[], int],
) -> None:
    if (
        event.type != "session.delegation.created"
        or event.delegation.target != "client"
    ):
        return
    context = read_context()
    if context is None:
        return  # Retain the notice; resolve the request before acting.
    summary = await run_agent(context)
    if current_revision() != context.revision:
        return
    await connection.session.commentary.append(
        event_id=str(uuid4()),
        delegation_id=event.delegation.id,
        content=summary,
    )
```

```go
import (
	"context"
	"crypto/rand"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/live"
)

type Context struct {
	Revision           int
	RecentConversation string
	Task               string
}

func handleDelegation(ctx context.Context, event live.ServerEventUnion, connection *live.LiveConnection,
	readContext func() *Context, runAgent func(context.Context, Context) (string, error), currentRevision func() int) error {
	if event.Type != "session.delegation.created" || event.AsDelegationCreatedEvent().Delegation.Target != "client" {
		return nil
	}
	snapshot := readContext()
	if snapshot == nil {
		return nil
	} // Retain the notice; resolve the request before acting.
	saved := *snapshot
	summary, err := runAgent(ctx, saved)
	if err != nil {
		return err
	}
	if currentRevision() != saved.Revision {
		return nil
	}
	return connection.Send(ctx, live.ClientEventUnionParam{OfSessionCommentaryAppend: &live.CommentaryAppendEventParam{
		EventID: openai.String(rand.Text()), DelegationID: openai.String(event.AsDelegationCreatedEvent().Delegation.ID), Content: summary,
	}})
}
```

```java
import com.openai.helpers.LiveConnection;
import com.openai.models.live.*;
import java.util.UUID;
import java.util.concurrent.CompletionStage;
import java.util.function.*;

public record Context(int revision, String recentConversation, String task) {}

public static CompletionStage<Void> handleDelegation(
    ServerEvent event,
    LiveConnection connection,
    Supplier<Context> readContext,
    Function<Context, CompletionStage<String>> runAgent,
    IntSupplier currentRevision) {
  if (!event.isSessionDelegationCreated()
      || !event.asSessionDelegationCreated().delegation().target().toString().equals("client"))
    return java.util.concurrent.CompletableFuture.completedFuture(null);
  var snapshot = readContext.get();
  // Retain the notice; resolve the request before acting.
  if (snapshot == null) return java.util.concurrent.CompletableFuture.completedFuture(null);
  return runAgent
      .apply(snapshot)
      .thenAccept(
          summary -> {
            if (currentRevision.getAsInt() != snapshot.revision()) return;
            connection.send(
                ClientEvent.ofSessionCommentaryAppend(
                    CommentaryAppendEvent.builder()
                        .eventId(UUID.randomUUID().toString())
                        .delegationId(event.asSessionDelegationCreated().delegation().id())
                        .content(summary)
                        .build()));
          });
}
```

```ruby
require "openai"
require "securerandom"
Context = Data.define(:revision, :recent_conversation, :task)

def handle_delegation(event, connection, read_context:, run_agent:, current_revision:)
  return unless event.type == :"session.delegation.created" && event.delegation.target == :client

  context = read_context.call
  return if context.nil? # Retain the notice; resolve the request before acting.

  summary = run_agent.call(context)
  return unless current_revision.call == context.revision

  connection.send_event(
    type: :"session.commentary.append", event_id: SecureRandom.uuid,
    delegation_id: event.delegation.id, content: summary
  )
end
```


Implement the context and agent callbacks in your application. The context callback returns recent conversation and the current task, or no value while the request is still unclear. The agent callback runs your existing backend and returns a verified summary of at most 500 tokens. In JavaScript, the application-provided `send` callback sends the JSON event on your Live connection. In Python, the adapter sends the update through the SDK `connection` directly.

For the appointment assistant, the context should establish the requested date and time zone, previously offered slots, any confirmed slot, and the latest correction. An availability result should say that a slot is available and that no booking has been made. Only return a booking confirmation after the booking succeeds. See [Client delegation](https://developers.openai.com/api/docs/guides/live-delegation#receive-a-client-delegation) for the full setup and result flow.

### Route updates and corrections

Keep structured tool output and workflow details in your backend. Return short factual updates to GPT-Live:

- Use `session.thinking.append` for background progress, such as a lookup that is still running.
- Use `session.commentary.append` for a verified result the user should hear.
- Use `session.instructions.append` for application-authored behavioral guidance.

All three take plain-string `content` of at most 500 tokens and require `delegation_id`. Use the original client delegation ID for related work or `null` for general session context. Match each acknowledgment to the command you sent using `client_event_id`. This confirms that the update was accepted. Use assistant transcript events to observe generated speech and your player’s state to track playback. See [Send the right kind of update](https://developers.openai.com/api/docs/guides/live-delegation#send-the-right-kind-of-update).

When the user says “Actually, Friday instead,” save Friday as the current request, advance its version number, and clear any confirmation for Thursday. Send that correction to your existing agent. Decide whether to request cancellation of the Thursday lookup, change it, or let it finish and discard its result.

Track the status of the lookup before reporting it as cancelled. Handle that backend decision even if the user’s interruption has already stopped the assistant’s speech.

Backend work may outlive the voice session. Persist its status in your application. In a later voice interaction, start a new session with the relevant saved context; see [Managing sessions](https://developers.openai.com/api/docs/guides/live-conversations).

### Keep typed input connected to your agent

Keep typed input connected to your existing backend. Treat a typed correction as an update to the same task, and send relevant verified context to the voice session. See [Accept typed input](https://developers.openai.com/api/docs/guides/live-delegation#accept-typed-input) and [Keep updates accurate and useful](https://developers.openai.com/api/docs/guides/live-delegation#keep-updates-accurate-and-useful).

### Adapt text and speech safeguards

A text agent or chained pipeline can validate a complete reply before displaying or speaking it. With GPT-Live, conversation and backend work run at the same time. If every spoken response must pass a check before the user hears it, put that check in the audio playback path your application controls. Holding a backend result alone will not pause all speech.

Follow [Adapt your guardrails](#adapt-your-guardrails) to retain your checks and account for continuous speech.



## Adapt your guardrails

Keep the input and output safeguards from your existing application when migrating from either architecture. GPT-Live can continue speaking while backend work and policy checks run, so apply checks to both the conversation and the actions your backend takes.

If your server needs to monitor or control a browser’s WebRTC session, attach a [sideband WebSocket](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#decide-whether-you-need-a-sideband) to receive transcripts and send corrective instructions. Audio continues over WebRTC. If your server already streams audio through the primary WebSocket, use that connection’s event stream for these checks. Choosing Responses delegation does not by itself require a sideband.

1. Monitor user and assistant transcript events and run your checks alongside the conversation.
2. Block affected tools and external actions in application code. Cancel related application-owned work where supported, and prevent late results from continuing a blocked request.
3. Send `session.instructions.append` to redirect the assistant, and record the decision in your application.

For example, if a caller asks the appointment assistant to change another person's booking without permission, block the booking operation before it runs. Then instruct the assistant to explain that it cannot make the change. Verify both the unchanged booking record and the spoken response; the refusal alone does not enforce authorization.

A corrective instruction cannot retract audio already heard. If your application needs to check assistant speech before playback, follow [Check speech before playback](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#check-speech-before-playback) for buffering, approval, interruption, and recovery handling. See [Apply conversation guardrails](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#apply-conversation-guardrails) for action controls and a corrective instruction example. For required opening wording, see [Deliver a disclosure](https://developers.openai.com/api/docs/guides/live-conversations#deliver-a-disclosure).

## Validate the migration

Compare the migrated assistant with representative conversations from your current application. Keep the scenarios, backend tools, and success criteria consistent, repeat each scenario, and record intentional behavior changes alongside regressions:

- **Actions and spoken confirmations:** Check availability, ask for confirmation, and book only the confirmed slot. Verify the backend outcome, spoken answer, and client playback separately.
- **Corrections and duplicate prevention:** Change Thursday to Friday during a pending request. Discard outdated results and ensure retries cannot create a second booking.
- **Permissions:** Try an unauthorized action and a booking without confirmation. Check that application policy blocks execution.
- **Guardrail interventions:** Trigger checks during speech and tool execution. Verify that the assistant receives the correction, affected actions stay blocked even if a tool result arrives late, and playback resumes as intended. Check whether a running operation actually stopped. Include slow checks and false positives.
- **Interruptions:** Speak while the assistant is talking or working. Verify the conversation, audio playback, and backend task state independently.
- **Failures and reconnects:** Test tool errors, lost results, and disconnects. If a booking request loses its response, check whether the booking succeeded before retrying. Start the next voice session with the saved task context and verify that it continues from the established outcome.

Use [Reduce backend latency](https://developers.openai.com/api/docs/guides/live-delegation#reduce-backend-latency) to tune the migrated backend. Compare useful spoken response time and task success with the [voice agent evaluation Cookbook](https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation), and use [Cost optimization](https://developers.openai.com/api/docs/guides/voice-latency-cost) to compare usage and cost.