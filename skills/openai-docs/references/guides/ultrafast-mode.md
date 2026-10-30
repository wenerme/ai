# Ultrafast mode

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Ultrafast mode is the fastest service tier in the OpenAI API. It is broadly available for GPT-6 Astra and GPT-6.1 Sol. Use it when speed justifies the higher cost.

We strongly recommend [WebSockets](https://developers.openai.com/api/docs/guides/websocket-mode), especially for agentic applications that make many tool calls in quick succession. Without a persistent connection, network overhead can reduce the latency gains.

Ultrafast mode for GPT-6 Astra and GPT-6.1 Sol is available to all API users.
  Ultrafast has separate rate limits from Standard and Fast modes. Check your
  organization’s limits before increasing traffic. If your organization works
  with an OpenAI account team, contact them to request higher rate limits.

## Configure your request

Set `model` to `gpt-6-astra` or `gpt-6.1-sol` and `service_tier` to `ultrafast` in each `response.create` event.

Install your language's SDK and WebSocket dependencies as described in [Connect and create responses](https://developers.openai.com/api/docs/guides/websocket-mode#connect-and-create-responses). Set `OPENAI_API_KEY` in your environment before running the example.

Use Ultrafast across turns on one WebSocket

```javascript
// Install: npm install openai ws
// Set OPENAI_API_KEY in your environment.

import OpenAI from "openai";
import { ResponsesWS } from "openai/resources/responses/ws";

const client = new OpenAI();
const ws = new ResponsesWS(client);

let previousResponseId = null;

try {
  for (const input of [
    "Explain why the sky is blue in one sentence.",
    "Now explain why sunsets look red.",
  ]) {
    let completed = false;
    const events = ws.stream();

    ws.send({
      type: "response.create",
      model: "gpt-6-astra",
      service_tier: "ultrafast",
      previous_response_id: previousResponseId,
      input,
    });

    for await (const event of events) {
      if (event.type === "error") throw event.error;
      if (event.type !== "message") continue;
      const message = event.message;
      if (message.type === "response.output_text.delta") {
        process.stdout.write(message.delta);
      } else if (message.type === "response.completed") {
        previousResponseId = message.response.id;
        completed = true;
        console.log();
        break;
      } else if (
        message.type === "response.failed" ||
        message.type === "response.incomplete"
      ) {
        throw new Error(JSON.stringify(message));
      }
    }

    if (!completed) {
      throw new Error("Connection closed before the response finished.");
    }
  }
} finally {
  ws.close();
}
```

```python
# Install: pip install --upgrade "openai[realtime]"
# Set OPENAI_API_KEY in your environment.

from openai import OpenAI

client = OpenAI()

previous_response_id: str | None = None
prompts = [
    "Explain why the sky is blue in one sentence.",
    "Now explain why sunsets look red.",
]

with client.responses.connect() as connection:
    for prompt in prompts:
        connection.response.create(
            model="gpt-6-astra",
            service_tier="ultrafast",
            previous_response_id=previous_response_id,
            input=prompt,
        )

        for event in connection:
            if event.type == "response.output_text.delta":
                print(event.delta, end="", flush=True)
            elif event.type == "response.completed":
                previous_response_id = event.response.id
                print()
                break
            elif event.type in {"response.failed", "response.incomplete", "error"}:
                raise RuntimeError(event.to_json())
        else:
            raise RuntimeError("Connection closed before the response finished.")
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
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	client := openai.NewClient()
	conn, err := client.Responses.Connect(ctx, responses.ResponseConnectionOptions{})
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	previousResponseID := ""

	for _, prompt := range []string{
		"Explain why the sky is blue in one sentence.",
		"Now explain why sunsets look red.",
	} {
		request := responses.ResponsesClientEventResponseCreateParam{
			Model:       "gpt-6-astra",
			ServiceTier: "ultrafast",
			Input: responses.ResponsesClientEventResponseCreateInputUnionParam{
				OfString: openai.String(prompt),
			},
		}
		if previousResponseID != "" {
			request.PreviousResponseID = openai.String(previousResponseID)
		}

		if err := conn.Create(ctx, request); err != nil {
			panic(err)
		}

		// FinalResponse reads events until the response finishes.
		response, err := conn.FinalResponse(ctx)
		if err != nil {
			panic(err)
		}
		if response.Status != responses.ResponseStatusCompleted {
			panic(fmt.Sprintf("Response ended with status %s", response.Status))
		}

		previousResponseID = response.ID
		fmt.Println(response.OutputText())
	}
}
```

```java
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseStatus;
import com.openai.models.responses.ResponsesClientEvent;
import java.util.List;

var client = OpenAIOkHttpClient.fromEnv();

try (var connection = client.responses().connect()) {
  String previousResponseId = null;

  for (var prompt :
      List.of(
          "Explain why the sky is blue in one sentence.",
          "Now explain why sunsets look red.")) {
    var request =
        ResponsesClientEvent.ResponseCreate.builder()
            .model("gpt-6-astra")
            .serviceTier(ResponsesClientEvent.ResponseCreate.ServiceTier.ULTRAFAST)
            .input(prompt);
    if (previousResponseId != null) {
      request.previousResponseId(previousResponseId);
    }

    connection.send(ResponsesClientEvent.ofResponseCreate(request.build()));

    var response = connection.finalResponse();
    if (response.status().filter(ResponseStatus.COMPLETED::equals).isEmpty()) {
      throw new IllegalStateException(
          "Response ended with status " + response.status().orElse(null));
    }

    previousResponseId = response.id();
    response.output().stream()
        .flatMap(item -> item.message().stream())
        .flatMap(message -> message.content().stream())
        .flatMap(content -> content.outputText().stream())
        .forEach(text -> System.out.println(text.text()));
  }
} finally {
  client.close();
}
```

```ruby
# Install: gem install openai async-websocket
# Set OPENAI_API_KEY in your environment.

require "async"
require "openai"

client = OpenAI::Client.new

request = {
  model: "gpt-6-astra",
  service_tier: :ultrafast
}
prompts = [
  "Explain why the sky is blue in one sentence.",
  "Now explain why sunsets look red."
]

Sync do |task|
  task.with_timeout(120) do
    client.responses.connect(request_options: { timeout: 10 }) do |connection|
      prompts.each do |prompt|
        connection.response.create(**request, input: prompt)

        loop do
          event = connection.receive
          raise "Connection closed before the response finished" unless event

          case event
          when OpenAI::Responses::ResponseCompletedEvent
            request[:previous_response_id] = event.response.id
            puts(event.response.output_text)
            break
          when OpenAI::Responses::ResponseFailedEvent, OpenAI::Responses::ResponseIncompleteEvent,
               OpenAI::Responses::ResponsesServerEvent::ResponseWsError
            raise "Response failed: #{event.to_json}"
          end
        end
      end
    end
  end
end
```


The examples send two requests over the same connection and print each response. The Go, Java, and Ruby examples wait for the complete response before printing it. The second request sends the new prompt and passes the first response's ID as `previous_response_id`. Reuse the connection for later turns and tool results. See [Continue with incremental inputs](https://developers.openai.com/api/docs/guides/websocket-mode#continue-with-incremental-inputs).

## HTTP alternative

Ultrafast also supports HTTP requests through the SDK. For agentic applications with frequent tool calls, use a persistent WebSocket connection to reduce overhead between requests.

Create an Ultrafast response over HTTP

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6-astra",
  service_tier: "ultrafast",
  input: "Explain why the sky is blue in one sentence.",
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Explain why the sky is blue in one sentence.",
    service_tier="ultrafast",
)

print(response.output_text)
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
		Model:       "gpt-6-astra",
		ServiceTier: responses.ResponseNewParamsServiceTierUltrafast,
		Input:       responses.ResponseNewParamsInputUnion{OfString: openai.String("Explain why the sky is blue in one sentence.")},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input("Explain why the sky is blue in one sentence.")
        .serviceTier(ResponseCreateParams.ServiceTier.ULTRAFAST)
        .build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new

response = client.responses.create(
  model: "gpt-6-astra",
  service_tier: :ultrafast,
  input: "Explain why the sky is blue in one sentence."
)

puts(response.output_text)
```

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-astra",
    "input": "Explain why the sky is blue in one sentence.",
    "service_tier": "ultrafast"
  }'
```


This example waits for the complete response. To display output as it arrives, enable [streaming](https://developers.openai.com/api/docs/guides/streaming-responses?api-mode=responses).

## Availability

GPT-6.1 Sol has the following default Ultrafast token rate limits:

| API usage tier | Tokens per minute (TPM) |
| -------------- | ----------------------- |
| Build          | 1,000,000               |
| Launch         | 4,000,000               |
| Grow           | 40,000,000              |

GPT-6 Astra has the following default Ultrafast token rate limits:

| API usage tier | Tokens per minute (TPM) |
| -------------- | ----------------------- |
| Build          | 500,000                 |
| Launch         | 1,000,000               |
| Grow           | 5,000,000               |

See the [Ultrafast pricing table](https://developers.openai.com/api/docs/pricing?latest-pricing=ultrafast) for input, cached input, cache write, and output prices.

Ultrafast mode for GPT-6.1 Sol supports US and EU data residency and global processing. GPT-6 Astra Ultrafast supports US data residency and global processing only.