# Compaction

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Overview

To support long-running interactions, you can use compaction to reduce context
size while preserving state needed for subsequent turns.

Compaction helps you balance quality, cost, and latency as conversations grow.
For guidance on preserving reasoning when changing conversation history, see
[Keep the prefix unchanged](https://developers.openai.com/api/docs/guides/preserved-reasoning).

## Server-side compaction

You can enable server-side compaction in a Responses create request
(`POST /responses` or `client.responses.create`) by setting
`context_management` with `compact_threshold`.

- When the rendered token count crosses the configured threshold, the server
  runs server-side compaction.
- No separate `/responses/compact` call is required in this mode.
- The response stream includes the encrypted compaction item.
- ZDR note: server-side compaction is ZDR-friendly when you set `store=false`
  on your Responses create requests.

The returned compaction item carries forward key prior state and reasoning into
the next run using fewer tokens. It is opaque and not intended to be
human-interpretable.

For stateless input-array chaining, append output items as usual. If you are
using `previous_response_id`, pass only the new user message each turn. In both
cases, the compaction item carries context needed for the next window.

When the conversation contains earlier `configuration_update` items, the API
emits one fresh `configuration_update` immediately after the `compaction` item.
It carries the latest explicitly set value for each updated field:
`reasoning.effort` and `text.format`. For example, a format-only update preserves
an earlier effort change. If the conversation has no configuration updates, the
API omits this item.

Replay the returned output items in order, including the fresh update when present.

Latency tip: After appending output items to the previous input items, you can
drop items that came before the most recent compaction item to keep requests
smaller and reduce long-tail latency. The latest compaction item carries the
necessary context to continue the conversation. If you use
`previous_response_id` chaining, do not manually prune.

### Developer-added tools

A developer can [add tools mid-conversation](https://developers.openai.com/api/docs/guides/prompt-caching#manage-tools-with-append-only-updates)
with an `additional_tools` input item. Automatic compaction saves these
declarations in order inside the encrypted `compaction` item. For example, if
you added a function named `lookup_ticket`, the model can call it as soon as
generation continues, or on a later turn when you replay the item or use
`previous_response_id`. The declarations survive repeated automatic compaction.

A tool declaration alone adds no extra item to `response.output`. If you also
changed the reasoning effort or output format, replay the `compaction` item
and the following `configuration_update` in order. To change a tool's schema
later, append a new `additional_tools` item for that tool. Supply tools you
defined only in the request-level `tools` array again on turns that need them.

- **Tool selection.** You can select restored functions, custom tools, and tools
  in a namespace. Naming an unavailable function in `tool_choice` returns HTTP 400.
- **Client tool search.** Restored client tool search can discover a function with
  `defer_loading: true`. Answer the `tool_search_call` with a `tool_search_output`
  using the same `call_id`. Client tool search alone cannot satisfy
  `tool_choice: "required"`.
- **Hosted MCP servers.** Automatic compaction saves the `server_label`. Supply
  the current endpoint and credentials under that label on the next request.

## User journey

1. Call `/responses` as usual, but include `context_management` with
   `compact_threshold` to enable server-side compaction.
2. As the response streams, if the context size crosses the threshold, the server
   triggers a compaction pass, emits a compaction output item in the same stream,
   and prunes context before continuing inference.
3. Continue your loop with one pattern: stateless input-array chaining (append
   output, including compaction items, to your next input array) or
   `previous_response_id` chaining (pass only the new user message each turn and
   carry that ID forward).

<a id="server-side-compaction-user-flow"></a>

## Example user flow

```typescript
import OpenAI from "openai";
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";
import { createInterface } from "node:readline";

const client = new OpenAI();

const conversation: OpenAI.Responses.ResponseInput = [
  {
    type: "message",
    role: "user",
    content: "Let's begin a long coding task.",
  },
];

// Subscribe before generation so piped follow-up turns are not lost.
const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
const turns = lines[Symbol.asyncIterator]();

async function respond() {
  const response = await client.responses.create({
    model: "gpt-5.3-codex",
    input: conversation,
    store: false,
    context_management: [{ type: "compaction", compact_threshold: 200_000 }],
  });

  conversation.push(...toResponseInputItems(response.output));
  console.log(response.output_text);
}

try {
  await respond();
  for await (const line of turns) {
    if (!line.trim()) continue;
    conversation.push({ type: "message", role: "user", content: line });
    await respond();
  }
} finally {
  lines.close();
}
```

```python
conversation = [
    {
        "type": "message",
        "role": "user",
        "content": "Let's begin a long coding task.",
    }
]

while keep_going:
    response = client.responses.create(
        model="gpt-5.3-codex",
        input=conversation,
        store=False,
        context_management=[{"type": "compaction", "compact_threshold": 200000}],
    )

    conversation.extend(response.output)

    try:
        next_input = get_next_user_input()
    except EOFError:
        break
    conversation.append(
        {
            "type": "message",
            "role": "user",
            "content": next_input,
        }
    )
```

```go
package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	conversation := []responses.ResponseInputItemUnionParam{
		responses.ResponseInputItemParamOfMessage("Let's begin a long coding task.", responses.EasyInputMessageRoleUser),
	}
	scanner := bufio.NewScanner(os.Stdin)
	for {
		response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
			Model: "gpt-5.3-codex",
			Store: openai.Bool(false),
			Input: responses.ResponseNewParamsInputUnion{OfInputItemList: conversation},
			ContextManagement: []responses.ResponseNewParamsContextManagement{{
				Type: "compaction", CompactThreshold: openai.Int(200000),
			}},
		})
		if err != nil {
			panic(err)
		}
		conversation = append(conversation, outputAsInput(response.Output)...)
		fmt.Println(response.OutputText())
		if !scanner.Scan() {
			break
		}
		conversation = append(conversation,
			responses.ResponseInputItemParamOfMessage(scanner.Text(), responses.EasyInputMessageRoleUser),
		)
	}
	if err := scanner.Err(); err != nil {
		panic(err)
	}
}

func outputAsInput(output []responses.ResponseOutputItemUnion) []responses.ResponseInputItemUnionParam {
	input := make([]responses.ResponseInputItemUnionParam, 0, len(output))
	for _, item := range output {
		var converted responses.ResponseInputItemUnion
		if err := json.Unmarshal([]byte(item.RawJSON()), &converted); err != nil {
			panic(err)
		}
		input = append(input, converted.ToParam())
	}
	return input
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

var conversation = new ArrayList<ResponseInputItem>();
conversation.add(
    ResponseInputItem.ofEasyInputMessage(
        EasyInputMessage.builder()
            .role(EasyInputMessage.Role.USER)
            .content("Let's begin a long coding task.")
            .build()));

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-5.3-codex")
        .inputOfResponse(conversation)
        .store(false)
        .putAdditionalBodyProperty(
            "context_management",
            JsonValue.from(List.of(Map.of("type", "compaction", "compact_threshold", 200000))))
        .build();

var response = client.responses().create(params);
response.output().stream()
    .map(item -> JsonValue.from(item).convert(ResponseInputItem.class))
    .forEach(conversation::add);
conversation.add(
    ResponseInputItem.ofEasyInputMessage(
        EasyInputMessage.builder()
            .role(EasyInputMessage.Role.USER)
            .content("Now implement the next step.")
            .build()));

client
    .responses()
    .create(params.toBuilder().inputOfResponse(conversation).build())
    .output()
    .stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new
conversation = [
  {
    type: :message,
    role: :user,
    content: "Let's begin a long coding task."
  }
]

loop do
  response = client.responses.create(
    model: "gpt-5.3-codex",
    input: conversation,
    store: false,
    context_management: [
      {
        type: :compaction,
        compact_threshold: 200_000
      }
    ]
  )
  conversation.concat(response.output)
  puts(response.output_text)
  line = $stdin.gets
  break unless line

  conversation << {
    type: :message,
    role: :user,
    content: line.chomp
  }
end
```


## Request compaction with an explicit trigger

To compact now, append `{"type": "compaction_trigger"}` as the last input item
in a `POST /v1/responses` request. Leave earlier `configuration_update` items in
place. Their settings apply while the model produces the summary. The API
returns a `compaction` item without a fresh `configuration_update`.

To keep your settings, append one fresh `configuration_update` after the
summary and before the next user message. Include the latest value of each
field you changed. With `previous_response_id`, the summary is already in
stored history, so send the new update followed by the user message.

The explicit trigger's compaction item doesn't carry earlier `additional_tools`
declarations. If you resume from that item, supply the tools you need in the
request's `tools` array or append a new developer `additional_tools` item
before the user message.

### Example user flow

```typescript
import OpenAI from "openai";
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";

const client = new OpenAI();
const model = "gpt-6-astra";
const lookupTicket: OpenAI.Responses.FunctionTool = {
  type: "function",
  name: "lookup_ticket",
  description: "Look up a ticket by ID.",
  parameters: {
    type: "object",
    properties: { id: { type: "string" } },
    required: ["id"],
    additionalProperties: false,
  },
  strict: true,
};
const reasoning = { effort: "high" } as const;
const text = {
  format: {
    type: "json_schema",
    name: "trip_destination",
    strict: true,
    schema: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
      additionalProperties: false,
    },
  },
} as const;

const compacted = await client.responses.create({
  model,
  reasoning: { effort: "low" },
  input: [
    { role: "user", content: "Plan a trip to Kyoto." },
    { type: "additional_tools", role: "developer", tools: [lookupTicket] },
    { type: "configuration_update", reasoning },
    { type: "configuration_update", text },
    { type: "compaction_trigger" },
  ],
  store: false,
});

const response = await client.responses.create({
  model,
  reasoning: { effort: "low" },
  tools: [lookupTicket],
  input: [
    ...toResponseInputItems(compacted.output),
    { type: "configuration_update", reasoning, text },
    { role: "user", content: "Which city is my trip to?" },
  ],
  store: false,
});
console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()
model = "gpt-6-astra"
lookup_ticket = {
    "type": "function",
    "name": "lookup_ticket",
    "description": "Look up a ticket by ID.",
    "parameters": {
        "type": "object",
        "properties": {"id": {"type": "string"}},
        "required": ["id"],
        "additionalProperties": False,
    },
    "strict": True,
}
reasoning = {"effort": "high"}
text = {
    "format": {
        "type": "json_schema",
        "name": "trip_destination",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
            "additionalProperties": False,
        },
    }
}
compacted = client.responses.create(
    model=model,
    reasoning={"effort": "low"},
    input=[
        {"role": "user", "content": "Plan a trip to Kyoto."},
        {"type": "additional_tools", "role": "developer", "tools": [lookup_ticket]},
        {"type": "configuration_update", "reasoning": reasoning},
        {"type": "configuration_update", "text": text},
        {"type": "compaction_trigger"},
    ],
    store=False,
)
response = client.responses.create(
    model=model,
    reasoning={"effort": "low"},
    tools=[lookup_ticket],
    input=[
        *compacted.output,
        {"type": "configuration_update", "reasoning": reasoning, "text": text},
        {"role": "user", "content": "Which city is my trip to?"},
    ],
    store=False,
)
print(response.output_text)
```

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
	"github.com/openai/openai-go/v3/shared"
)

func main() {
	client := openai.NewClient()
	ctx := context.Background()
	model := shared.ResponsesModel("gpt-6-astra")
	lookupTicket := responses.ToolUnionParam{OfFunction: &responses.FunctionToolParam{
		Name: "lookup_ticket", Description: openai.String("Look up a ticket by ID."),
		Parameters: map[string]any{
			"type": "object", "properties": map[string]any{"id": map[string]any{"type": "string"}},
			"required": []string{"id"}, "additionalProperties": false,
		},
		Strict: openai.Bool(true),
	}}
	reasoning := responses.ResponseConfigurationUpdateItemParamReasoning{Effort: shared.ReasoningEffortHigh}
	text := responses.ResponseConfigurationUpdateItemParamText{
		Format: responses.ResponseConfigurationUpdateItemParamTextFormatUnion{OfJSONSchema: &responses.ResponseFormatTextJSONSchemaConfigParam{
			Name: "trip_destination", Strict: openai.Bool(true),
			Schema: map[string]any{
				"type": "object", "properties": map[string]any{"city": map[string]any{"type": "string"}},
				"required": []string{"city"}, "additionalProperties": false,
			},
		}},
	}
	compacted, err := client.Responses.New(ctx, responses.ResponseNewParams{
		Model: model, Reasoning: shared.ReasoningParam{Effort: shared.ReasoningEffortLow},
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfMessage("Plan a trip to Kyoto.", responses.EasyInputMessageRoleUser),
			responses.ResponseInputItemParamOfAdditionalTools([]responses.ToolUnionParam{lookupTicket}),
			{OfConfigurationUpdate: &responses.ResponseConfigurationUpdateItemParam{Reasoning: reasoning}},
			{OfConfigurationUpdate: &responses.ResponseConfigurationUpdateItemParam{Text: text}},
			{OfCompactionTrigger: &responses.ResponseInputItemCompactionTriggerParam{}},
		}},
		Store: openai.Bool(false),
	})
	if err != nil {
		panic(err)
	}
	nextInput := outputAsInput(compacted.Output)
	nextInput = append(nextInput,
		responses.ResponseInputItemUnionParam{OfConfigurationUpdate: &responses.ResponseConfigurationUpdateItemParam{Reasoning: reasoning, Text: text}},
		responses.ResponseInputItemParamOfMessage("Which city is my trip to?", responses.EasyInputMessageRoleUser),
	)
	response, err := client.Responses.New(ctx, responses.ResponseNewParams{
		Model: model, Reasoning: shared.ReasoningParam{Effort: shared.ReasoningEffortLow},
		Tools: []responses.ToolUnionParam{lookupTicket},
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: nextInput},
		Store: openai.Bool(false),
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(response.OutputText())
}

func outputAsInput(output []responses.ResponseOutputItemUnion) responses.ResponseInputParam {
	input := make(responses.ResponseInputParam, 0, len(output))
	for _, item := range output {
		var converted responses.ResponseInputItemUnion
		if err := json.Unmarshal([]byte(item.RawJSON()), &converted); err != nil {
			panic(err)
		}
		input = append(input, converted.ToParam())
	}
	return input
}
```

```java
import com.openai.core.JsonValue;
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.ResponseConfigurationUpdateItemParam;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFormatTextJsonSchemaConfig;
import com.openai.models.responses.ResponseInputItem;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

String model = "gpt-6-astra";
var tool =
    FunctionTool.builder()
        .name("lookup_ticket")
        .description("Look up a ticket by ID.")
        .parameters(
            JsonValue.from(
                    Map.of(
                        "type",
                        "object",
                        "properties",
                        Map.of("id", Map.of("type", "string")),
                        "required",
                        List.of("id"),
                        "additionalProperties",
                        false))
                .convert(FunctionTool.Parameters.class))
        .strict(true)
        .build();
var reasoning =
    ResponseConfigurationUpdateItemParam.Reasoning.builder()
        .effort(ReasoningEffort.HIGH)
        .build();
var format =
    ResponseFormatTextJsonSchemaConfig.builder()
        .name("trip_destination")
        .strict(true)
        .schema(
            JsonValue.from(
                    Map.of(
                        "type",
                        "object",
                        "properties",
                        Map.of("city", Map.of("type", "string")),
                        "required",
                        List.of("city"),
                        "additionalProperties",
                        false))
                .convert(ResponseFormatTextJsonSchemaConfig.Schema.class))
        .build();
var text = ResponseConfigurationUpdateItemParam.Text.builder().format(format).build();
var compacted =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model(model)
                .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
                .inputOfResponse(
                    List.of(
                        ResponseInputItem.ofEasyInputMessage(
                            EasyInputMessage.builder()
                                .role(EasyInputMessage.Role.USER)
                                .content("Plan a trip to Kyoto.")
                                .build()),
                        ResponseInputItem.ofAdditionalTools(
                            ResponseInputItem.AdditionalTools.builder().addTool(tool).build()),
                        ResponseInputItem.ofConfigurationUpdate(
                            ResponseConfigurationUpdateItemParam.builder()
                                .reasoning(reasoning)
                                .build()),
                        ResponseInputItem.ofConfigurationUpdate(
                            ResponseConfigurationUpdateItemParam.builder().text(text).build()),
                        ResponseInputItem.ofCompactionTrigger()))
                .store(false)
                .build());
var input = new ArrayList<ResponseInputItem>();
for (var item : compacted.output())
  input.add(JsonValue.from(item).convert(ResponseInputItem.class));
input.add(
    ResponseInputItem.ofConfigurationUpdate(
        ResponseConfigurationUpdateItemParam.builder()
            .reasoning(reasoning)
            .text(text)
            .build()));
input.add(
    ResponseInputItem.ofEasyInputMessage(
        EasyInputMessage.builder()
            .role(EasyInputMessage.Role.USER)
            .content("Which city is my trip to?")
            .build()));
var response =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model(model)
                .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
                .addTool(tool)
                .inputOfResponse(input)
                .store(false)
                .build());
response.output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(value -> System.out.println(value.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new
model = "gpt-6-astra"
lookup_ticket = {
  type: :function,

  name: "lookup_ticket",

  description: "Look up a ticket by ID.",
  parameters: {
    type: "object",

    properties: { id: { type: "string" } },
    required: ["id"],

    additionalProperties: false
  },
  strict: true
}
reasoning = { effort: :high }
text = {
  format: {
    type: :json_schema,

    name: "trip_destination",

    strict: true,
    schema: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
      additionalProperties: false
    }
  }
}
compacted = client.responses.create(
  model: model, reasoning: { effort: :low },
  input: [
    {
      role: :user,
      content: "Plan a trip to Kyoto."
    },
    {
      type: :additional_tools,
      role: :developer,
      tools: [lookup_ticket]
    },
    {
      type: :configuration_update,
      reasoning: reasoning
    },
    {
      type: :configuration_update,
      text: text
    },
    { type: :compaction_trigger }
  ],
  store: false
)
response = client.responses.create(
  model: model, reasoning: { effort: :low }, tools: [lookup_ticket],
  input: [
    *compacted.output,
    {
      type: :configuration_update,
      reasoning: reasoning,
      text: text
    },
    {
      role: :user,
      content: "Which city is my trip to?"
    }
  ],
  store: false
)
puts(response.output_text)
```


## Standalone compact endpoint

For explicit control, use the
[standalone compact endpoint](https://developers.openai.com/api/reference/resources/responses/methods/compact) for
stateless compaction in long-running workflows.

This endpoint is fully stateless and ZDR-friendly.

You send a full context window (messages, tools, and other items), and the
endpoint returns a new compacted context window you can pass to your next
`/responses` call.

The returned compacted window includes an encrypted compaction item that carries
forward key prior state and reasoning using fewer tokens. It is opaque and not
intended to be human-interpretable.

Note: the compacted window generally contains more than just the compaction
item. It can also include retained items from the previous window.

Output handling: do not prune `/responses/compact` output. The returned window
is the canonical next context window, so pass it into your next `/responses`
call as-is.

### User journey for standalone compaction

1. Use `/responses` normally, sending input items that include user messages,
   assistant outputs, and tool interactions.
2. When your context window grows large, call `/responses/compact` to generate a
   new compacted context window. The window you send to `/responses/compact`
   must still fit within your model's context window.
3. For subsequent `/responses` calls, pass the returned compacted window
   (including the compaction item) as input instead of the full transcript.

<a id="standalone-compact-endpoint-user-flow"></a>

### Example user flow

```typescript
import OpenAI from "openai";
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";

const client = new OpenAI();

const conversation: OpenAI.Responses.ResponseInput = [
  { role: "user", content: "Plan a trip to Kyoto." },
];

const compacted = await client.responses.compact({
  model: "gpt-6-astra",
  input: conversation,
});

const nextInput: OpenAI.Responses.ResponseInput = [
  ...toResponseInputItems(compacted.output),
  { role: "user", content: "Add two more days to the itinerary." },
];

const response = await client.responses.create({
  model: "gpt-6-astra",
  input: nextInput,
  store: false,
});

console.log(response.output_text);
```

```python
# Full window collected from prior turns
long_input_items_array = [{"role": "user", "content": "Plan a trip to Kyoto."}]

# 1) Compact the current window
compacted = client.responses.compact(
    model="gpt-6-astra",
    input=long_input_items_array,
)

# 2) Start the next turn by appending a new user message
next_input = [
    *compacted.output,  # Use compact output as-is
    {
        "type": "message",
        "role": "user",
        "content": user_input_message(),
    },
]

next_response = client.responses.create(
    model="gpt-6-astra",
    input=next_input,
    store=False,  # Keep the flow ZDR-friendly
)
```

```go
package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	longInputItems := []responses.ResponseInputItemUnionParam{
		responses.ResponseInputItemParamOfMessage("Plan a trip to Kyoto.", responses.EasyInputMessageRoleUser),
	}
	compacted, err := client.Responses.Compact(context.Background(), responses.ResponseCompactParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseCompactParamsInputUnion{OfResponseInputItemArray: longInputItems},
	})
	if err != nil {
		panic(err)
	}
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	nextInput := append(outputAsInput(compacted.Output),
		responses.ResponseInputItemParamOfMessage(scanner.Text(), responses.EasyInputMessageRoleUser),
	)
	nextResponse, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Store: openai.Bool(false),
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: nextInput},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(nextResponse.OutputText())
}

func outputAsInput(output []responses.ResponseOutputItemUnion) []responses.ResponseInputItemUnionParam {
	input := make([]responses.ResponseInputItemUnionParam, 0, len(output))
	for _, item := range output {
		var converted responses.ResponseInputItemUnion
		if err := json.Unmarshal([]byte(item.RawJSON()), &converted); err != nil {
			panic(err)
		}
		input = append(input, converted.ToParam())
	}
	return input
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.ResponseCompactParams;
import com.openai.models.responses.ResponseCompactionItemParam;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.ArrayList;

var compacted =
    client
        .responses()
        .compact(
            ResponseCompactParams.builder()
                .model("gpt-6-astra")
                .input("Plan a trip to Kyoto.")
                .build());
var input = new ArrayList<ResponseInputItem>();
for (var item : compacted.output()) {
  item.message().map(ResponseInputItem::ofResponseOutputMessage).ifPresent(input::add);
  item.reasoning().map(ResponseInputItem::ofReasoning).ifPresent(input::add);
  item.compaction()
      .map(
          value ->
              ResponseInputItem.ofCompaction(
                  ResponseCompactionItemParam.builder()
                      .id(value.id())
                      .encryptedContent(value.encryptedContent())
                      .build()))
      .ifPresent(input::add);
}
input.add(
    ResponseInputItem.ofEasyInputMessage(
        EasyInputMessage.builder()
            .role(EasyInputMessage.Role.USER)
            .content("Add restaurant recommendations.")
            .build()));

client
    .responses()
    .create(
        ResponseCreateParams.builder()
            .model("gpt-6-astra")
            .inputOfResponse(input)
            .store(false)
            .build())
    .output()
    .stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new
long_input = [
  {
    role: :user,
    content: "Plan a trip to Kyoto."
  }
]
compaction = client.responses.compact(
  model: "gpt-6-astra",
  input: long_input
)
next_input = [
  *compaction.output,
  {
    type: :message,
    role: :user,
    content: "Add restaurant recommendations."
  }
]
response = client.responses.create(
  model: "gpt-6-astra",
  input: next_input,
  store: false
)
puts(response.output_text)
```


### Continue with configuration updates and tools

`POST /v1/responses/compact` rejects histories containing
`configuration_update` items, including updates inherited through
`previous_response_id`. If your history contains updates:

1. Start from your full history of input and output items. Save the latest
   explicit `reasoning.effort` and `text.format` separately. Send the remaining
   items to the compact endpoint in their original order, omitting only the
   configuration updates.
2. Keep the entire returned window. Append one fresh `configuration_update`
   with the fields you saved, then append the next user message. Keep the
   original request-level settings on the next `/v1/responses` call.
3. If you previously added tools with `additional_tools`, supply the definitions
   the next turn needs in `tools`, or append a new developer declaration before
   the user message. The standalone summary doesn't restore these tools.

In this example, the conversation started with low effort and plain text. One
update raised effort to high and a later update supplied a JSON schema.
`compactAndContinue` restores both in a single item. Pass the tools needed for
the next turn in `nextTools`.

```typescript
import OpenAI from "openai";
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";

const client = new OpenAI();

async function compactAndContinue(
  model: string,
  history: OpenAI.Responses.ResponseInput,
  nextMessage: string,
  nextTools: OpenAI.Responses.Tool[]
) {
  const input: OpenAI.Responses.ResponseInput = [];
  const latest: OpenAI.Responses.ResponseConfigurationUpdateItemParam = {
    type: "configuration_update",
  };
  for (const item of history) {
    if (item.type === "configuration_update") {
      if (item.reasoning?.effort != null) latest.reasoning = item.reasoning;
      if (item.text?.format) latest.text = item.text;
    } else {
      input.push(item);
    }
  }

  const compacted = await client.responses.compact({ model, input });
  const nextInput = toResponseInputItems(compacted.output);
  if (latest.reasoning || latest.text) nextInput.push(latest);
  nextInput.push({ role: "user", content: nextMessage });

  return client.responses.create({
    model,
    reasoning: { effort: "low" },
    tools: nextTools,
    input: nextInput,
    store: false,
  });
}
```

```python
from openai import OpenAI

client = OpenAI()


def compact_and_continue(model, history, next_message, next_tools):
    compact_input = []
    latest = {"type": "configuration_update"}
    for item in history:
        data = item if isinstance(item, dict) else item.model_dump(exclude_unset=True)
        if data.get("type") == "configuration_update":
            if (data.get("reasoning") or {}).get("effort") is not None:
                latest["reasoning"] = data["reasoning"]
            if (data.get("text") or {}).get("format") is not None:
                latest["text"] = data["text"]
        else:
            compact_input.append(item)

    compacted = client.responses.compact(model=model, input=compact_input)
    next_input = list(compacted.output)
    if len(latest) > 1:
        next_input.append(latest)
    next_input.append({"role": "user", "content": next_message})
    return client.responses.create(
        model=model,
        reasoning={"effort": "low"},
        tools=next_tools,
        input=next_input,
        store=False,
    )
```

```go
func compactAndContinue(
	ctx context.Context,
	client *openai.Client,
	model string,
	history responses.ResponseInputParam,
	nextMessage string,
	nextTools []responses.ToolUnionParam,
) (*responses.Response, error) {
	input := responses.ResponseInputParam{}
	latest := responses.ResponseConfigurationUpdateItemParam{}
	for _, item := range history {
		if _, overridden := item.Overrides(); overridden {
			raw, err := json.Marshal(item)
			if err != nil {
				return nil, err
			}
			var normalized responses.ResponseInputItemUnionParam
			if err := json.Unmarshal(raw, &normalized); err != nil {
				return nil, err
			}
			if normalized.OfConfigurationUpdate != nil {
				item = normalized
			}
		}
		if update := item.OfConfigurationUpdate; update != nil {
			if update.Reasoning.Effort != "" {
				latest.Reasoning = update.Reasoning
			}
			if update.Text.Format.OfText != nil || update.Text.Format.OfJSONSchema != nil {
				latest.Text = update.Text
			}
		} else {
			input = append(input, item)
		}
	}

	compacted, err := client.Responses.Compact(ctx, responses.ResponseCompactParams{
		Model: responses.ResponseCompactParamsModel(model),
		Input: responses.ResponseCompactParamsInputUnion{OfResponseInputItemArray: input},
	})
	if err != nil {
		return nil, err
	}
	nextInput := outputAsInput(compacted.Output)
	if latest.Reasoning.Effort != "" || latest.Text.Format.OfText != nil || latest.Text.Format.OfJSONSchema != nil {
		nextInput = append(nextInput, responses.ResponseInputItemUnionParam{OfConfigurationUpdate: &latest})
	}
	nextInput = append(nextInput, responses.ResponseInputItemParamOfMessage(nextMessage, responses.EasyInputMessageRoleUser))

	return client.Responses.New(ctx, responses.ResponseNewParams{
		Model:     shared.ResponsesModel(model),
		Reasoning: shared.ReasoningParam{Effort: shared.ReasoningEffortLow},
		Tools:     nextTools,
		Input:     responses.ResponseNewParamsInputUnion{OfInputItemList: nextInput},
		Store:     openai.Bool(false),
	})
}

func outputAsInput(output []responses.ResponseOutputItemUnion) responses.ResponseInputParam {
	input := make(responses.ResponseInputParam, 0, len(output))
	for _, item := range output {
		var converted responses.ResponseInputItemUnion
		if err := json.Unmarshal([]byte(item.RawJSON()), &converted); err != nil {
			panic(err)
		}
		input = append(input, converted.ToParam())
	}
	return input
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.core.JsonValue;
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCompactParams;
import com.openai.models.responses.ResponseConfigurationUpdateItemParam;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFormatTextJsonSchemaConfig;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.Tool;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

static Response compactAndContinue(
    OpenAIClient client,
    String model,
    List<ResponseInputItem> history,
    String nextMessage,
    List<Tool> nextTools) {
  var input = new ArrayList<ResponseInputItem>();
  var latest = ResponseConfigurationUpdateItemParam.builder();
  boolean hasUpdate = false;
  for (var item : history) {
    if (item.configurationUpdate().isPresent()) {
      var update = item.configurationUpdate().get();
      if (update.reasoning().isPresent() && update.reasoning().get().effort().isPresent()) {
        latest.reasoning(update.reasoning().get());
        hasUpdate = true;
      }
      if (update.text().isPresent()) {
        latest.text(update.text().get());
        hasUpdate = true;
      }
    } else {
      input.add(item);
    }
  }
  var compacted =
      client
          .responses()
          .compact(
              ResponseCompactParams.builder()
                  .model(model)
                  .inputOfResponseInputItems(input)
                  .build());
  var nextInput = new ArrayList<ResponseInputItem>();
  for (var item : compacted.output()) {
    nextInput.add(JsonValue.from(item).convert(ResponseInputItem.class));
  }
  if (hasUpdate) nextInput.add(ResponseInputItem.ofConfigurationUpdate(latest.build()));
  nextInput.add(
      ResponseInputItem.ofEasyInputMessage(
          EasyInputMessage.builder()
              .role(EasyInputMessage.Role.USER)
              .content(nextMessage)
              .build()));
  return client
      .responses()
      .create(
          ResponseCreateParams.builder()
              .model(model)
              .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
              .tools(nextTools)
              .inputOfResponse(nextInput)
              .store(false)
              .build());
}
```

```ruby
require "openai"

client = OpenAI::Client.new

def compact_and_continue(client, model, history, next_message, next_tools)
  input = []
  latest = { type: :configuration_update }
  history.each do |item|
    if item[:type].to_s == "configuration_update"
      latest[:reasoning] = item[:reasoning] unless item[:reasoning]&.[](:effort).nil?
      latest[:text] = item[:text] unless item[:text]&.[](:format).nil?
    else
      input << item
    end
  end

  compacted = client.responses.compact(model: model, input: input)
  next_input = compacted.output.dup
  next_input << latest if latest.size > 1
  next_input << {
    role: :user,
    content: next_message
  }
  client.responses.create(
    model: model, reasoning: { effort: :low }, tools: next_tools, input: next_input, store: false
  )
end
```