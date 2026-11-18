# Background mode

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use background mode to run long-running Responses API requests asynchronously,
including multi-step agent runs. An agent run is the full workflow your
application manages: it sends an initial request and can use the result to
decide what to do next, such as running a tool and sending its output in a
follow-up request. For independent requests you can submit together up front,
use the [Batch API](https://developers.openai.com/api/docs/guides/batch).

## Choose a completion window

Set `background_options.completion_window` based on how soon you need the
initial response. For `2h` and `8h`, the API targets completion within the
selected window after it accepts the request.

| Window              | When to use it                                                            | Model token discount |
| ------------------- | ------------------------------------------------------------------------- | -------------------- |
| `soonest` (default) | Generate an on-demand report while someone waits for the result.          | None                 |
| `2h`                | Analyze the morning’s support tickets before an afternoon triage meeting. | 30% below Standard   |
| `8h`                | Review a batch of documents overnight for the next morning.               | 40% below Standard   |

For an overnight document review, start with an `8h` request. If the first
response asks your application to look up a document, run the tool and send its
result in a [follow-up request](#run-a-workflow-with-follow-up-requests). Reuse
the window, continuation ID, model, and project to qualify for higher queue
priority.

The completion target starts when the API accepts the initial request and
applies to that response. The discount applies to model token rates on each
eligible request, including follow-ups. In this example, both requests qualify for the 40% discount.

## Start a background request

Set `background` to `true` and save the response ID returned by the API. Use a
webhook to learn when the request finishes and retrieve the response by ID.
This example uses the default completion window (`soonest`).

Generate a response in the background

```bash
curl https://api.openai.com/v1/responses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
  "model": "gpt-6.2-astra",
  "input": "Write a very long novel about otters in space.",
  "background": true
}'
```

```typescript
import OpenAI from "openai";
const client = new OpenAI();

const resp = await client.responses.create({
  model: "gpt-6.2-astra",
  input: "Write a very long novel about otters in space.",
  background: true,
});

console.log(resp.status);
```

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-6.2-astra",
    input="Write a very long novel about otters in space.",
    background=True,
)

print(resp.status)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:      "gpt-6.2-astra",
		Background: openai.Bool(true),
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Write a very long novel about otters in space."),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.Status)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.2-astra")
        .input("Write a detailed market analysis.")
        .background(true)
        .build();

var response = client.responses().create(params);
System.out.println(response.status().orElseThrow());
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new()
{
    Model = "gpt-6.2-astra",
    BackgroundModeEnabled = true,
};
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem("Write a very long novel about otters in space.")
);

ResponseResult response = await client.CreateResponseAsync(options);
Console.WriteLine(response.Status);
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6.2-astra",
  input: "Write a detailed market analysis.",
  background: true
)

puts(response.status)
```


Background mode temporarily stores response data even when you set `store` to
  `false` or use Zero Data Retention. The API uses this data to run the request
  and make the result available for retrieval. The API encrypts temporarily
  stored request content at rest for all completion windows (`soonest`, `2h`,
  and `8h`). See [Data controls](https://developers.openai.com/api/docs/guides/your-data#v1responses) for
  details on temporary storage.

## Receive results with webhooks

1. [Create a webhook endpoint](https://developers.openai.com/api/docs/guides/webhooks#creating-webhook-endpoints)
   for the project that sends your background requests. Subscribe to
   [`response.completed`](https://developers.openai.com/api/reference/resources/webhooks)
   and to the events for failed, incomplete, or canceled responses you want to
   handle.
2. [Verify the signature](https://developers.openai.com/api/docs/guides/webhooks#verifying-webhook-signatures)
   on incoming events. Hand off any longer work to a background worker and
   return a `2xx` response as soon as you accept the event.
3. For `response.completed`, use `event.data.id` to
   [retrieve the response](https://developers.openai.com/api/reference/resources/responses/methods/retrieve). Handle other
   terminal events according to your application's workflow.

The [webhooks guide](https://developers.openai.com/api/docs/guides/webhooks) includes a server example that
verifies the signature and retrieves the completed response. If you can't receive
webhooks, [poll the response](#polling-background-responses) using its ID.

After the API accepts a `2h` or `8h` request, it automatically retries eligible
capacity errors. While the response is `queued` or `in_progress`, wait for a
webhook or poll using the same response ID.

## Use discounted completion windows

Discounted completion windows are in public beta on GPT-6.2 Astra, GPT-6.2
  Sol, GPT-6.1 Terra, and GPT-6 Luna.

Requests with `2h` or `8h` completion windows share the
[Batch/Background Rate Limit](https://developers.openai.com/api/docs/guides/rate-limits#how-do-these-rate-limits-work)
with Batch API jobs. The API counts input tokens at submission. Requests with the
default `soonest` window use the regular request and token limits.

If your application can wait for the initial response, use a two-hour or eight-hour
completion window. Set `background` to `true` and set
`background_options.completion_window` to `2h` or `8h`. Leave `stream` unset or
set it to `false`. See
[completion window pricing](https://developers.openai.com/api/docs/pricing#background-completion-windows).

Discounted windows require Standard processing. Set `service_tier` to `default`
to select Standard. With `auto`, the request qualifies only if the API selects
Standard.

Standard requests outside the discounted completion windows can’t reuse prompt
cache entries created by `2h` or `8h` background requests, even when the prompt
is identical.

For a single overnight document review, send an `8h` request to
[`POST /v1/responses`](https://developers.openai.com/api/reference/resources/responses/methods/create) with
`gpt-6.1-terra` and the document contents in `input`. Leave
`background_options.continuation_id` unset if you only need one response.

For the default completion window, omit `background_options.completion_window`
or set it to `soonest`.

### Run a workflow with follow-up requests

Use the same API project for both requests in the overnight document review.

1. Ask `gpt-6.1-terra` to look up a document by ID and review it for missing
   approvals in a [create response request](https://developers.openai.com/api/reference/resources/responses/methods/create). Set
   `background` to `true`, `service_tier` to `default`, and
   `background_options.completion_window` to `8h`. Set
   `background_options.continuation_id` to a unique ID your application
   chooses for this run. Include a [function tool](https://developers.openai.com/api/docs/guides/function-calling#defining-functions)
   that retrieves a document by ID. Save the response ID returned by the API.
2. When you receive a `response.completed` webhook,
   [deduplicate deliveries](https://developers.openai.com/api/docs/guides/webhooks#handling-webhook-requests-on-a-server)
   using the `webhook-id` header. Check that `event.data.id` matches the saved
   response ID before proceeding. Retrieve the response and run the document
   lookup requested by its `function_call` output item. If your app may need to
   continue after the response expires, save the original input and the full
   response `output` while you can still retrieve it.
3. Create a follow-up response with the same model, service tier, background
   setting, completion window, and continuation ID. Set
   `previous_response_id` to `event.data.id` to carry forward conversation
   history if the prior response is still available. In `input`, send a
   `function_call_output` item with the original function call's `call_id` and
   the retrieved document as its `output`.

Reuse `continuation_id` to make follow-ups eligible for higher queue priority.
Start times depend on scheduling. If the prior response expires, omit
`previous_response_id` and
[pass the conversation history in `input`](https://developers.openai.com/api/docs/guides/conversation-state#manually-manage-conversation-state).
Replay the original input and every item in the saved response `output` in
order, including any encrypted reasoning items and the original function call.
Then append the new `function_call_output` item.

## Polling background responses

As an alternative to webhooks, use the response ID to check the request's status
with the [retrieve endpoint](https://developers.openai.com/api/reference/resources/responses/methods/retrieve). Keep polling
while the status is `queued` or `in_progress`. When the status changes to a
terminal state, stop polling.

Retrieve a response executing in the background

```bash
curl https://api.openai.com/v1/responses/resp_123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

```typescript
import OpenAI from "openai";
const client = new OpenAI();

let resp = await client.responses.create({
  model: "gpt-6.2-astra",
  input: "Write a very long novel about otters in space.",
  background: true,
});

while (resp.status === "queued" || resp.status === "in_progress") {
  console.log("Current status: " + resp.status);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2 seconds
  resp = await client.responses.retrieve(resp.id);
}

console.log("Final status: " + resp.status + "\nOutput:\n" + resp.output_text);
```

```python
from openai import OpenAI
from time import sleep

client = OpenAI()

resp = client.responses.create(
    model="gpt-6.2-astra",
    input="Write a very long novel about otters in space.",
    background=True,
)

while resp.status in {"queued", "in_progress"}:
    print(f"Current status: {resp.status}")
    sleep(2)
    resp = client.responses.retrieve(resp.id)

print(f"Final status: {resp.status}\nOutput:\n{resp.output_text}")
```

```go
package main

import (
	"context"
	"fmt"
	"time"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:      "gpt-6.2-astra",
		Background: openai.Bool(true),
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Write a very long novel about otters in space."),
		},
	})
	if err != nil {
		panic(err)
	}

	for response.Status == "queued" || response.Status == "in_progress" {
		fmt.Println("Current status:", response.Status)
		time.Sleep(2 * time.Second)
		response, err = client.Responses.Get(context.Background(), response.ID, responses.ResponseGetParams{})
		if err != nil {
			panic(err)
		}
	}

	fmt.Printf("Final status: %s\nOutput:\n%s\n", response.Status, response.OutputText())
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseStatus;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.2-astra")
        .input("Write a very long novel about otters in space.")
        .background(true)
        .build();

var response = client.responses().create(params);
while (response.status().filter(ResponseStatus.QUEUED::equals).isPresent()
    || response.status().filter(ResponseStatus.IN_PROGRESS::equals).isPresent()) {
  System.out.println("Current status: " + response.status().orElseThrow());
  Thread.sleep(1000);
  response = client.responses().retrieve(response.id());
}
System.out.println("Final status: " + response.status().orElseThrow());
response.output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new()
{
    Model = "gpt-6.2-astra",
    BackgroundModeEnabled = true,
};
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem("Write a very long novel about otters in space.")
);

ResponseResult response = await client.CreateResponseAsync(options);
while (response.Status is ResponseStatus.Queued or ResponseStatus.InProgress)
{
    await Task.Delay(TimeSpan.FromSeconds(1));
    response = await client.GetResponseAsync(response.Id);
}
if (response.Status != ResponseStatus.Completed)
{
    throw new InvalidOperationException($"Background response ended with status: {response.Status}");
}
Console.WriteLine($"Status: {response.Status}");
Console.WriteLine(response.GetOutputText());
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6.2-astra",
  input: "Write a very long novel about otters in space.",
  background: true
)

while [:queued, :in_progress].include?(response.status)
  puts("Current status: #{response.status}")
  sleep(2)
  response = client.responses.retrieve(response.id)
end

puts("Final status: #{response.status}")
puts("Output:")
puts(response.output_text)
```


## Cancelling a background response

You can also cancel an in-flight response like this:

Cancel an ongoing response

```bash
curl -X POST https://api.openai.com/v1/responses/resp_123/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

```typescript
import OpenAI from "openai";
const client = new OpenAI();

const resp = await client.responses.cancel("resp_123");

console.log(resp.status);
```

```python
import os

from openai import OpenAI

response_id = os.environ["OPENAI_RESPONSE_ID"]
client = OpenAI()

resp = client.responses.cancel(response_id)

print(resp.status)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()

	canceled, err := client.Responses.Cancel(context.Background(), "resp_123")
	if err != nil {
		panic(err)
	}

	fmt.Println(canceled.Status)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;

String responseId = "resp_123";

var response = client.responses().cancel(responseId);

System.out.println(response.status());
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

// Replace this illustrative ID with the background response to cancel.
string responseId = "resp_123";

ResponseResult response = await client.CancelResponseAsync(responseId);
Console.WriteLine(response.Status);
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.cancel("resp_123")
puts(response.status)
```


Canceling twice is idempotent. Later calls return the final `Response` object.
For a synchronous response, close the connection instead.

## Streaming a background response

To stream a background response, use the default completion window (`soonest`)
and set `stream: true` when you create it. For `2h` and `8h` requests, omit
`stream` or set it to `false`.

If the connection drops, resume the stream by passing the last event's
`sequence_number` as `starting_after`. You can't stream a response later if
it was created without streaming.

Time to first token can be higher for a background response than for a
  synchronous response.

Generate and stream a background response

```bash
curl https://api.openai.com/v1/responses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
  "model": "gpt-6.2-astra",
  "input": "Write a very long novel about otters in space.",
  "background": true,
  "stream": true
}'

# To resume:
curl "https://api.openai.com/v1/responses/resp_123?stream=true&starting_after=42" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY"
```

```typescript
import OpenAI from "openai";
const client = new OpenAI();

const stream = await client.responses.create({
  model: "gpt-6.2-astra",
  input: "Write a very long novel about otters in space.",
  background: true,
  stream: true,
});

let cursor = null;
let responseId = null;
for await (const event of stream) {
  console.log(event);
  // Keepalives use connection counters, not stored-event resume positions.
  if (String(event.type) !== "keepalive") cursor = event.sequence_number;
  if ("response" in event && event.response?.id) responseId = event.response.id;
}

// If the connection drops, resume streaming from the last stored-event cursor:
// const resumedStream = await client.responses.retrieve(responseId, {
//   stream: true,
//   starting_after: cursor,
// });
// for await (const event of resumedStream) { ... }
```

```python
from openai import OpenAI

client = OpenAI()

# Fire off an async response but also start streaming immediately
stream = client.responses.create(
    model="gpt-6.2-astra",
    input="Write a very long novel about otters in space.",
    background=True,
    stream=True,
)

cursor = None
response_id = None
for event in stream:
    print(event)
    if event.type == "response.created":
        response_id = event.response.id
    # Keepalives use connection counters, not stored-event resume positions.
    if event.type != "keepalive":
        cursor = event.sequence_number

    # If your connection drops, the response continues running and you can reconnect:
    # with client.responses.stream(response_id=response_id, starting_after=cursor) as resumed:
    #     for event in resumed:
    #         print(event)
    if event.type == "response.created":
        response_id = event.response.id
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	stream := client.Responses.NewStreaming(context.Background(), responses.ResponseNewParams{
		Model:      "gpt-6.2-astra",
		Background: openai.Bool(true),
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Write a very long novel about otters in space."),
		},
	})
	defer stream.Close()
	var cursor int64
	var responseID string
	for stream.Next() {
		event := stream.Current()
		fmt.Println(event.Type)
		// Keepalives use connection counters, not stored-event resume positions.
		if event.Type != "keepalive" {
			cursor = event.SequenceNumber
		}
		if event.Response.ID != "" {
			responseID = event.Response.ID
		}
	}
	if err := stream.Err(); err != nil {
		panic(err)
	}
	fmt.Printf("response %s last cursor %d\n", responseID, cursor)

	// If the connection drops, resume streaming from the last cursor:
	// resumed := client.Responses.GetStreaming(
	// 	context.Background(),
	// 	responseID,
	// 	responses.ResponseGetParams{StartingAfter: openai.Int(cursor)},
	// )
	// for resumed.Next() {
	// 	fmt.Println(resumed.Current().Type)
	// }
}
```

```java
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.RequestOptions;
import com.openai.core.http.StreamResponse;
import com.openai.errors.OpenAIIoException;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseRetrieveParams;
import com.openai.models.responses.ResponseStreamEvent;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.2-astra")
        .input("Write a very long novel about otters in space.")
        .background(true)
        .build();

AtomicLong lastSequenceNumber = new AtomicLong(-1);
AtomicReference<String> responseId = new AtomicReference<>("");
AtomicBoolean streamCompleted = new AtomicBoolean(false);
JsonMapper json = new JsonMapper();
// This long-running response can exceed the SDK's default request deadline.
RequestOptions streamOptions = RequestOptions.builder().timeout(Duration.ofMinutes(30)).build();
try (StreamResponse<ResponseStreamEvent> stream =
    client.responses().createStreaming(params, streamOptions)) {
  stream.stream()
      .forEach(
          event -> {
            if (event.failed().isPresent()
                || event.incomplete().isPresent()
                || event.error().isPresent()) {
              throw new IllegalStateException("Background response did not complete");
            }
            var data = json.valueToTree(event);
            // Keepalives count connection traffic, not stored response events.
            if (data.path("type").asText().startsWith("response.")
                && data.path("sequence_number").isIntegralNumber()) {
              lastSequenceNumber.set(data.path("sequence_number").asLong());
            }
            event
                .created()
                .ifPresent(
                    created -> {
                      responseId.set(created.response().id());
                      System.out.println("response.created");
                    });
            event
                .outputTextDelta()
                .ifPresent(
                    delta -> {
                      System.out.println("response.output_text.delta");
                    });
            event
                .completed()
                .ifPresent(
                    completed -> {
                      streamCompleted.set(true);
                      System.out.println("response.completed");
                    });
          });
} catch (OpenAIIoException error) {
  // Resume an interrupted stream once, from its stored-event checkpoint.
  if (Thread.currentThread().isInterrupted()
      || streamCompleted.get()
      || responseId.get().isBlank()
      || lastSequenceNumber.get() < 0) {
    throw error;
  }
}
System.out.println(
    "Response " + responseId.get() + "; last sequence number " + lastSequenceNumber.get());
if (!streamCompleted.get()) {
  if (Thread.currentThread().isInterrupted()
      || responseId.get().isBlank()
      || lastSequenceNumber.get() < 0) {
    throw new IllegalStateException("Stream ended without a resumable checkpoint");
  }
  try (StreamResponse<ResponseStreamEvent> resumed =
      client
          .responses()
          .retrieveStreaming(
              ResponseRetrieveParams.builder()
                  .responseId(responseId.get())
                  .startingAfter(lastSequenceNumber.get())
                  .build(),
              streamOptions)) {
    resumed.stream()
        .forEach(
            event -> {
              if (event.failed().isPresent()
                  || event.incomplete().isPresent()
                  || event.error().isPresent()) {
                throw new IllegalStateException("Resumed response did not complete");
              }
              event.outputTextDelta().ifPresent(delta -> System.out.println(delta.delta()));
              event.completed().ifPresent(completed -> streamCompleted.set(true));
            });
  }
  if (!streamCompleted.get()) {
    throw new IllegalStateException("Resumed response did not complete");
  }
}
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new()
{
    Model = "gpt-6.2-astra",
    BackgroundModeEnabled = true,
    StreamingEnabled = true,
};
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem("Write a very long novel about otters in space.")
);

string? responseId = null;
int lastSequenceNumber = -1;
bool completed = false;

void HandleUpdate(StreamingResponseUpdate update)
{
    lastSequenceNumber = update.SequenceNumber;
    switch (update)
    {
        case StreamingResponseCreatedUpdate created:
            responseId = created.Response.Id;
            break;
        case StreamingResponseOutputTextDeltaUpdate text:
            Console.Write(text.Delta);
            break;
        case StreamingResponseCompletedUpdate:
            completed = true;
            break;
        case StreamingResponseFailedUpdate:
            throw new InvalidOperationException("The background response failed.");
        case StreamingResponseIncompleteUpdate:
            throw new InvalidOperationException("The background response was incomplete.");
        case StreamingResponseErrorUpdate error:
            throw new InvalidOperationException($"The response stream failed: {error.Message}");
    }
}

try
{
    await foreach (
        StreamingResponseUpdate update in client.CreateResponseStreamingAsync(options)
    )
    {
        HandleUpdate(update);
    }
}
catch (Exception error)
    when (error is HttpRequestException or IOException && responseId is not null)
{
    // The background response continues after its streaming connection is interrupted.
}

if (!completed)
{
    if (responseId is null)
    {
        throw new InvalidOperationException("The response stream ended before providing its ID.");
    }

    GetResponseOptions resumeOptions = new(responseId)
    {
        StartingAfter = lastSequenceNumber,
        StreamingEnabled = true,
    };
    await foreach (StreamingResponseUpdate update in client.GetResponseStreamingAsync(resumeOptions))
    {
        HandleUpdate(update);
    }

    if (!completed)
    {
        throw new InvalidOperationException(
            "The resumed response stream ended before the background response completed."
        );
    }
}
```

```ruby
require "openai"

# An uncapped background novel can run beyond the SDK's default ten minutes.
client = OpenAI::Client.new(timeout: 30 * 60)
stream = client.responses.stream(
  model: "gpt-6.2-astra",
  input: "Write a very long novel about otters in space.",
  background: true
)

last_sequence_number = -1
response_id = ""
begin
  stream.each do |event|
    puts(event.type)
    # The SDK filters transport keepalives before yielding stored events.
    last_sequence_number = event.sequence_number || last_sequence_number
    if event.is_a?(OpenAI::Models::Responses::ResponseCreatedEvent)
      response_id = event.response.id
    end
  end
ensure
  stream.close
end

puts("response #{response_id} last cursor #{last_sequence_number}")

# If the connection drops, resume from the last sequence number:
# client.responses.stream(response_id: response_id, starting_after: last_sequence_number).each do |event|
#   puts(event.type)
# end
```