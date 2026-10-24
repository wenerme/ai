# Computer use

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Get started with computer use

### Run code execution

Connect the API loop to your browser or desktop runtime.

```javascript
import { randomUUID } from "node:crypto";
import OpenAI from "openai";

async function runComputerUse(endpoint, prompt, model = "gpt-6-astra") {
  const client = new OpenAI();
  const sessionId = randomUUID();

  const tools = [
    {
      type: "function",
      name: "exec_js",
      description: `Run JavaScript in a persistent browser. Available: Playwright's
browser, context, and page objects; console.log(value); and display(base64Image).
Save reusable variables on globalThis. Inspect a screenshot before acting and
check the screen after a short group of actions. Keep screenshots in memory.
Use top-level await for async operations. Return images with display() and concise
text with console.log(). The context viewport is 1440x900.`,
      parameters: {
        type: "object",
        properties: { code: { type: "string" } },
        required: ["code"],
        additionalProperties: false,
      },
      strict: true,
    },
  ];

  let nextInput = [{ role: "user", content: prompt }];
  let previousResponseId;

  for (let turn = 0; turn < 20; turn++) {
    const response = await client.responses.create({
      model,
      tools,
      input: nextInput,
      previous_response_id: previousResponseId,
      reasoning: { effort: "low" },
    });
    if (response.status !== "completed") {
      throw new Error(`Response stopped with status: ${response.status}`);
    }
    const calls = response.output.filter(
      (item) => item.type === "function_call"
    );
    if (
      calls.length === 0 &&
      response.output.some(
        (item) => item.type === "message" && item.phase !== "commentary"
      )
    ) {
      console.log(response.output_text);
      return;
    }
    if (turn === 19) {
      throw new Error(
        "The task reached the 20-response limit. Inspect the last result."
      );
    }

    nextInput = [];
    for (const call of calls) {
      if (call.name !== "exec_js")
        throw new Error(`Unexpected tool: ${call.name}`);
      const { code } = JSON.parse(call.arguments);
      const output = await executeInSandbox(code, sessionId, endpoint);
      nextInput.push({
        type: "function_call_output",
        call_id: call.call_id,
        output,
      });
    }
    previousResponseId = response.id;
  }
}
```

```python
import json
import uuid

from openai import OpenAI
from openai.types.responses import (
    FunctionToolParam,
    ResponseInputParam,
)

def run_computer_use(endpoint, prompt, model="gpt-6-astra"):
    client = OpenAI()
    session_id = str(uuid.uuid4())
    tools: list[FunctionToolParam] = [
        {
            "type": "function",
            "name": "exec_py",
            "description": (
                "Run Python in a persistent desktop. Variables persist across calls. "
                "PyAutoGUI operations are synchronous. Available: pyautogui, time, "
                "log(value), and display(PIL_image). Inspect the screen with "
                "display(pyautogui.screenshot()) before acting. Use screenshot "
                "coordinates and check the screen after a short group of actions. "
                "Keep screenshots in memory and PyAutoGUI's fail-safe enabled."
            ),
            "parameters": {
                "type": "object",
                "properties": {"code": {"type": "string"}},
                "required": ["code"],
                "additionalProperties": False,
            },
            "strict": True,
        }
    ]
    next_input: ResponseInputParam = [{"role": "user", "content": prompt}]
    previous_response_id = None

    for turn in range(20):
        response = client.responses.create(
            model=model,
            tools=tools,
            input=next_input,
            previous_response_id=previous_response_id,
        )
        if response.status != "completed":
            raise RuntimeError(f"Response stopped with status: {response.status}")

        calls = [item for item in response.output if item.type == "function_call"]
        if not calls and any(
            item.type == "message" and item.phase != "commentary"
            for item in response.output
        ):
            print(response.output_text)
            return
        if turn == 19:
            raise RuntimeError(
                "The task reached the 20-response limit. Inspect the last result."
            )

        next_input = []
        for call in calls:
            if call.name != "exec_py":
                raise ValueError(f"Unexpected tool: {call.name}")
            code = json.loads(call.arguments)["code"]
            output = execute_in_sandbox(code, session_id, endpoint)
            next_input.append(
                {
                    "type": "function_call_output",
                    "call_id": call.call_id,
                    "output": output,
                }
            )
        previous_response_id = response.id
```

```go
func runComputerUse(ctx context.Context, client openai.Client, endpoint, prompt string, terminal *bufio.Scanner, output io.Writer) error {
	session := make([]byte, 16)
	if _, err := rand.Read(session); err != nil {
		return err
	}
	sessionID := hex.EncodeToString(session)
	tool := responses.ToolParamOfFunction("exec_py", map[string]any{
		"type": "object", "properties": map[string]any{"code": map[string]any{"type": "string"}},
		"required": []string{"code"}, "additionalProperties": false,
	}, true)
	tool.OfFunction.Description = openai.String("Run Python in a persistent desktop. Variables persist across calls. " +
		"PyAutoGUI operations are synchronous. Available: pyautogui, time, " +
		"log(value), and display(PIL_image). Inspect the screen with " +
		"display(pyautogui.screenshot()) before acting. Use screenshot " +
		"coordinates and check the screen after a short group of actions. " +
		"Keep screenshots in memory and PyAutoGUI's fail-safe enabled.")
	params := responses.ResponseNewParams{
		Model: "gpt-6-astra", Tools: []responses.ToolUnionParam{tool},
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String(prompt)},
	}
	for turn := 0; turn < 20; turn++ {
		response, err := client.Responses.New(ctx, params)
		if err != nil {
			return err
		}
		if response.Status != "completed" {
			return fmt.Errorf("response stopped with status: %s", response.Status)
		}
		var calls []responses.ResponseFunctionToolCall
		finalMessage := false
		for _, item := range response.Output {
			if item.Type == "function_call" {
				calls = append(calls, item.AsFunctionCall())
			}
			if item.Type == "message" && item.AsMessage().Phase != "commentary" {
				finalMessage = true
			}
		}
		if len(calls) == 0 && finalMessage {
			fmt.Fprintln(output, response.OutputText())
			return nil
		}
		if turn == 19 {
			return fmt.Errorf("task reached the 20-response limit; inspect the last result")
		}
		nextInput := responses.ResponseInputParam{}
		for _, call := range calls {
			if call.Name != "exec_py" {
				return fmt.Errorf("unexpected tool: %s", call.Name)
			}
			var arguments struct {
				Code *string `json:"code"`
			}
			if err := json.Unmarshal([]byte(call.Arguments), &arguments); err != nil {
				return err
			}
			if arguments.Code == nil {
				return fmt.Errorf("exec_py requires code")
			}
			observations, err := executeInSandbox(ctx, endpoint, sessionID, *arguments.Code, terminal, output)
			if err != nil {
				return err
			}
			nextInput = append(nextInput, responses.ResponseInputItemUnionParam{
				OfFunctionCallOutput: &responses.ResponseInputItemFunctionCallOutputParam{
					CallID: openai.String(call.CallID),
					Output: responses.ResponseInputItemFunctionCallOutputOutputUnionParam{OfResponseFunctionCallOutputItemArray: observations},
				},
			})
		}
		params.Input = responses.ResponseNewParamsInputUnion{OfInputItemList: nextInput}
		params.PreviousResponseID = openai.String(response.ID)
	}
	return nil
}
```

```java
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFunctionCallOutputItem;
import com.openai.models.responses.ResponseInputImageContent;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.ResponseInputTextContent;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.UUID;

ResponseInputItem userInput =
    ResponseInputItem.ofEasyInputMessage(
        EasyInputMessage.builder()
            .role(EasyInputMessage.Role.USER)
            .content(
                "Go to Hacker News, click on the most interesting link (be prepared to "
                    + "justify your choice), take a screenshot, and give me a critique of the visual layout.")
            .build());

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .inputOfResponse(List.of(userInput))
        .addTool(
            FunctionTool.builder()
                .name("exec_py")
                .description(
                    "Execute provided interactive async Python in a persistent, isolated browser runtime.")
                .parameters(
                    FunctionTool.Parameters.builder()
                        .putAdditionalProperty("type", JsonValue.from("object"))
                        .putAdditionalProperty(
                            "properties",
                            JsonValue.from(
                                Map.of(
                                    "code",
                                    Map.of(
                                        "type",
                                        "string",
                                        "description",
                                        "Python code to execute. Write small snippets. State "
                                            + "persists across tool calls via globals(). The "
                                            + "isolated runtime supports await and provides "
                                            + "only these helpers and Playwright objects: log(x) "
                                            + "for concise text output, display(base64_png_string) "
                                            + "for image output, browser, context, and page. "
                                            + "Keep screenshots and image data in memory and "
                                            + "pass them directly to display(). Do not assume "
                                            + "other globals or packages are available."))))
                        .putAdditionalProperty("required", JsonValue.from(List.of("code")))
                        .putAdditionalProperty("additionalProperties", JsonValue.from(false))
                        .build())
                .strict(true)
                .build())
        .addTool(
            FunctionTool.builder()
                .name("ask_user")
                .description(
                    "Ask the user a clarification question and wait for their response.")
                .parameters(
                    FunctionTool.Parameters.builder()
                        .putAdditionalProperty("type", JsonValue.from("object"))
                        .putAdditionalProperty(
                            "properties",
                            JsonValue.from(
                                Map.of(
                                    "question",
                                    Map.of(
                                        "type",
                                        "string",
                                        "description",
                                        "The exact question to show the user. Use this instead "
                                            + "of asking a freeform clarifying question in a "
                                            + "final answer."))))
                        .putAdditionalProperty("required", JsonValue.from(List.of("question")))
                        .putAdditionalProperty("additionalProperties", JsonValue.from(false))
                        .build())
                .strict(true)
                .build())
        .build();

List<ResponseInputItem> conversation = new ArrayList<>(List.of(userInput));
ObjectMapper json = new ObjectMapper();
Scanner terminal = new Scanner(System.in);
String sessionId = UUID.randomUUID().toString();

for (int step = 0; step < 20; step++) {
  var response =
      client.responses().create(params.toBuilder().inputOfResponse(conversation).build());
  response.output().stream()
      .map(item -> JsonValue.from(item).convert(ResponseInputItem.class))
      .forEach(conversation::add);
  boolean calledTool = false;
  for (var item : response.output()) {
    if (item.functionCall().isPresent()) {
      var call = item.functionCall().orElseThrow();
      JsonNode arguments = json.readTree(call.arguments());
      var output = ResponseInputItem.FunctionCallOutput.builder().callId(call.callId());

      if (call.name().equals("exec_py")) {
        String code = arguments.path("code").asText();
        System.out.println(code);
        System.out.print("Send this generated Python to the isolated runtime? Type yes: ");
        String approval = terminal.hasNextLine() ? terminal.nextLine() : "";
        List<ResponseFunctionCallOutputItem> execution;
        if (approval.trim().equalsIgnoreCase("yes")) {
          try {
            execution = executeInSandbox(code, sessionId, json);
          } catch (IOException exception) {
            execution =
                List.of(
                    ResponseFunctionCallOutputItem.ofInputText(
                        ResponseInputTextContent.builder()
                            .text("Sandbox execution failed: " + exception.getMessage())
                            .build()));
          }
        } else {
          execution =
              List.of(
                  ResponseFunctionCallOutputItem.ofInputText(
                      ResponseInputTextContent.builder()
                          .text("The user declined this code execution.")
                          .build()));
        }
        output.outputOfResponseFunctionCallOutputItemList(execution);
        execution.forEach(System.out::println);
      } else if (call.name().equals("ask_user")) {
        String question = arguments.path("question").asText();
        System.out.println("MODEL QUESTION: " + question);
        output.output(terminal.hasNextLine() ? terminal.nextLine() : "");
      } else {
        throw new IllegalArgumentException("Unsupported function: " + call.name());
      }

      conversation.add(ResponseInputItem.ofFunctionCallOutput(output.build()));
      calledTool = true;
    } else if (item.message().isPresent()) {
      var message = item.message().orElseThrow();
      message.content().stream()
          .flatMap(content -> content.outputText().stream())
          .forEach(text -> System.out.println(text.text()));
    }
  }
  if (!calledTool) break;
}

private static List<ResponseFunctionCallOutputItem> executeInSandbox(
    String code, String sessionId, ObjectMapper json) throws IOException, InterruptedException {
  URI endpoint = URI.create(System.getenv("OPENAI_EXAMPLE_CODE_EXECUTION_URL"));
  if (!endpoint.getScheme().equals("https")
      && !List.of("localhost", "127.0.0.1", "::1").contains(endpoint.getHost())) {
    throw new IllegalArgumentException("The isolated sandbox endpoint must use HTTPS");
  }

  var request =
      HttpRequest.newBuilder(endpoint)
          .timeout(Duration.ofSeconds(30))
          .header("Content-Type", "application/json")
          .POST(
              HttpRequest.BodyPublishers.ofString(
                  json.writeValueAsString(
                      Map.of("session_id", sessionId, "language", "python", "code", code))));
  String token = System.getenv("OPENAI_EXAMPLE_CODE_EXECUTION_TOKEN");
  if (token != null && !token.isBlank()) request.header("Authorization", "Bearer " + token);

  HttpResponse<String> response =
      HttpClient.newBuilder()
          .connectTimeout(Duration.ofSeconds(10))
          .build()
          .send(request.build(), HttpResponse.BodyHandlers.ofString());
  if (response.statusCode() < 200 || response.statusCode() >= 300) {
    throw new IOException("Isolated sandbox rejected execution: HTTP " + response.statusCode());
  }

  JsonNode outputs = json.readTree(response.body()).path("output");
  if (!outputs.isArray()) throw new IOException("Sandbox returned an invalid output payload");
  List<ResponseFunctionCallOutputItem> result = new ArrayList<>();
  for (JsonNode item : outputs) {
    String type = item.path("type").asText();
    if (type.equals("input_text") && item.path("text").isTextual()) {
      result.add(
          ResponseFunctionCallOutputItem.ofInputText(
              ResponseInputTextContent.builder().text(item.path("text").asText()).build()));
    } else if (type.equals("input_image")
        && item.path("image_url").isTextual()
        && item.path("detail").asText().equals("original")) {
      result.add(
          ResponseFunctionCallOutputItem.ofInputImage(
              ResponseInputImageContent.builder()
                  .detail(ResponseInputImageContent.Detail.ORIGINAL)
                  .imageUrl(item.path("image_url").asText())
                  .build()));
    } else {
      throw new IOException("Sandbox returned an unsupported output item: " + type);
    }
  }
  return result;
}
```

```ruby
require "json"
require "openai"
require "securerandom"

def run_computer_use(endpoint, prompt)
  client = OpenAI::Client.new
  session_id = SecureRandom.uuid
  tools = [
    {
      type: :function,
      name: "exec_py",
      description: "Run Python in a persistent desktop. Variables persist across calls. PyAutoGUI operations are synchronous. Available: pyautogui, time, log(value), and display(PIL_image). Inspect the screen with display(pyautogui.screenshot()) before acting. Use screenshot coordinates and check the screen after a short group of actions. Keep screenshots in memory and PyAutoGUI's fail-safe enabled.",
      parameters: {
        type: :object,
        properties: { code: { type: :string } },
        required: ["code"],
        additionalProperties: false
      },
      strict: true
    }
  ]
  next_input = []
  next_input << {
    role: :user,
    content: prompt
  }
  history = {}
  20.times do |turn|
    response = client.responses.create(
      model: "gpt-6-astra", tools: tools, input: next_input, previous_response_id: history[:id]
    )
    raise "Response stopped with status: #{response.status}" unless response.status == OpenAI::Responses::ResponseStatus::COMPLETED

    calls = response.output.grep(OpenAI::Responses::ResponseFunctionToolCall)
    if calls.empty? && response.output.any? { |item| item.is_a?(OpenAI::Responses::ResponseOutputMessage) && item.phase != :commentary }
      puts(response.output_text)
      return response
    end
    raise "The task reached the 20-response limit" if turn == 19

    next_input.clear
    calls.each do |call|
      raise "Unexpected tool: #{call.name}" unless call.name == "exec_py"

      code = JSON.parse(call.arguments).fetch("code")
      raise "Expected Python source text" unless code.is_a?(String)

      output = execute_in_sandbox(code, session_id, endpoint)
      next_input << {
        type: :function_call_output,
        call_id: call.call_id,
        output: output
      }
    end
    history[:id] = response.id
  end
end
```

### Send a computer request

Use the computer tool for structured mouse and keyboard actions.

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6.1-sol",
  tools: [{ type: "computer" }],
  input:
    "Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.",
});

console.log(JSON.stringify(response.output, null, 2));
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6.1-sol",
    tools=[{"type": "computer"}],
    input="Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.",
)

print(response.output)
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
		Model: "gpt-6.1-sol",
		Tools: []responses.ToolUnionParam{{OfComputer: &responses.ComputerToolParam{}}},
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.")},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(response.Output)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.ResponseCreateParams;
import java.util.List;
import java.util.Map;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.1-sol")
        .input(
            "Open the Filters panel if needed, then search for penguin. Use the computer tool for UI interaction.")
        .putAdditionalBodyProperty("tools", JsonValue.from(List.of(Map.of("type", "computer"))))
        .build();

client.responses().create(params).output().forEach(System.out::println);
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6.1-sol",
  input: "Open the Filters panel if needed, then search for penguin. Use the computer tool for UI interaction.",
  tools: [{ type: :computer }]
)

puts(response.output)
```

### Return a screenshot

Continue the conversation with the updated screen.

```javascript
import OpenAI from "openai";

const client = new OpenAI();

async function sendComputerScreenshot(response, callId, screenshotBase64) {
  const output = {
    type: "computer_screenshot",
    image_url: `data:image/png;base64,${screenshotBase64}`,
    detail: "original",
  };

  return await client.responses.create({
    model: "gpt-6.1-sol",
    tools: [{ type: "computer" }],
    previous_response_id: response.id,
    input: [
      {
        type: "computer_call_output",
        call_id: callId,
        output,
      },
    ],
  });
}
```

```python
from openai import OpenAI

client = OpenAI()


def send_computer_screenshot(response, call_id, screenshot_base64):
    return client.responses.create(
        model="gpt-6.1-sol",
        tools=[{"type": "computer"}],
        previous_response_id=response.id,
        input=[
            {
                "type": "computer_call_output",
                "call_id": call_id,
                "output": {
                    "type": "computer_screenshot",
                    "image_url": f"data:image/png;base64,{screenshot_base64}",
                    "detail": "original",
                },
            }
        ],
    )
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
	response, err := sendComputerScreenshot(client, "resp_abc123", "call_abc123", "<base64 bytes here>")
	if err != nil {
		panic(err)
	}
	fmt.Println(response.Output)
}

func sendComputerScreenshot(client openai.Client, responseID string, callID string, screenshotBase64 string) (*responses.Response, error) {
	screenshot := responses.ResponseComputerToolCallOutputScreenshotParam{
		ImageURL: openai.String("data:image/png;base64," + screenshotBase64),
	}
	screenshot.SetExtraFields(map[string]any{"detail": "original"})
	return client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:              "gpt-6.1-sol",
		Tools:              []responses.ToolUnionParam{{OfComputer: &responses.ComputerToolParam{}}},
		PreviousResponseID: openai.String(responseID),
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfComputerCallOutput(callID, screenshot),
		}},
	})
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.ResponseComputerToolCallOutputScreenshot;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.List;
import java.util.Map;

String responseId = "resp_abc123";

String computerCallId = "call_abc123";

String screenshotBase64 = "<base64 bytes here>";

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.1-sol")
        .input(
            ResponseCreateParams.Input.ofResponse(
                List.of(
                    ResponseInputItem.ofComputerCallOutput(
                        ResponseInputItem.ComputerCallOutput.builder()
                            .callId(computerCallId)
                            .output(
                                ResponseComputerToolCallOutputScreenshot.builder()
                                    .imageUrl("data:image/png;base64," + screenshotBase64)
                                    .putAdditionalProperty("detail", JsonValue.from("original"))
                                    .build())
                            .build()))))
        .previousResponseId(responseId)
        .putAdditionalBodyProperty("tools", JsonValue.from(List.of(Map.of("type", "computer"))))
        .build();

client.responses().create(params).output().forEach(System.out::println);
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6.1-sol",
  previous_response_id: "resp_abc123",
  input: [
    {
      type: :computer_call_output,
      call_id: "call_abc123",
      output: {
        type: :computer_screenshot,
        image_url: "data:image/png;base64,<base64 bytes here>",
        detail: :original
      }
    }
  ],
  tools: [{ type: :computer }]
)

puts(response.output)
```



Computer use lets a model operate a browser or desktop interface. Use it to fill out forms, test user flows, or complete tasks in an application.

Choose a path based on what the model needs to see and who runs the environment:

| Task | Start here |
| --- | --- |
| Use screenshots and mouse or keyboard actions in your browser or desktop | Use [`ComputerToolset`](https://developers.openai.com/api/docs/guides/tools-computer-use?sdk-task=computer#run-your-first-task) with the Responses computer tool. |
| Read page text or use controls and tabs in your browser | Use [`BrowserToolset`](https://developers.openai.com/api/docs/guides/tools-computer-use?sdk-task=browser#run-your-first-task). Your driver exposes selected operations as function tools. |
| Run a browser hosted by OpenAI | Follow the separate [Agents API computer use guide](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use). |

For public information that needs no interaction, use [web search](https://developers.openai.com/api/docs/guides/tools-web-search).

## Use the SDK

The SDK runs the Responses tool loop in Python or Node. Your application supplies a **driver**: code that reads the environment or performs an allowed action. Your application owns the session, permissions, and cleanup.

### Connect a hosted environment

Use a partner's browser or desktop instead of running one yourself. Some integrations provide a driver; others expose controls that your application maps to the SDK. Follow the partner's guide for setup and supported package versions.

| Environment | Integration |
| --- | --- |
| Browserbase | Use the Stagehand browser driver with a hosted Browserbase session. Follow the [Stagehand integration guide](https://docs.stagehand.dev/v4/integrations/agent-frameworks/openai-cua-toolset-quickstart) or see the [Python and TypeScript examples](https://github.com/browserbase/openai-cua-toolset). |
| Browser Use | Use the [Browser Use library driver](https://docs.browser-use.com/open-source/customize/integrations/openai) or connect existing Playwright code with the [Browser Use Cloud integration](https://docs.browser-use.com/cloud/tutorials/integrations/openai). Both guides use Python. |
| Daytona | Use `ComputerToolset` with a Daytona desktop sandbox. Follow the [Daytona computer-use helpers guide](https://www.daytona.io/docs/en/guides/openai/openai-computer-use-helpers/) (Python). For an Agents SDK example, see the [Daytona computer-use recipe](https://developers.openai.com/cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona). |
| E2B Desktop | Run computer actions or execute code in a desktop sandbox. Follow the [E2B computer-use guide](https://docs.e2b.dev/agents/openai-computer-use) or see the [Python](https://github.com/e2b-dev/e2b-cookbook/tree/main/examples/openai-computer-use-python) and [TypeScript](https://github.com/e2b-dev/e2b-cookbook/tree/main/examples/openai-computer-use-js) examples. |

Set a session timeout and close or release the session even if the run fails. Check the provider dashboard if cleanup fails. Use provider network rules to restrict the sites and resources the session can reach.

### Run your first task

Use Python 3.11 or later, or Node.js 22.6 or later. [Create and export an API key](https://developers.openai.com/api/docs/quickstart#create-and-export-an-api-key). Both examples use a temporary local browser and make Responses API calls, which may incur charges.

Install the packages and Chromium in a new folder:

```sh
# Python
python3 -m venv .venv
.venv/bin/python -m pip install openai==3.31.0 playwright==1.61.0
.venv/bin/python -m playwright install chromium

# Node
npm install openai@7.33.0 playwright@1.61.1
npx playwright install chromium
```

On Windows, use `py -3` instead of `python3` and `.venv\Scripts\python.exe` instead of `.venv/bin/python`.



The model sees a screenshot of a fictional parcel pickup page and clicks to reveal the pickup details. The driver allows only screenshots and a left click on that control. It blocks page requests and closes the browser when the run ends. The script makes at most six Responses requests and checks the page before reporting success. Your project needs access to a model that supports the computer tool.

Save the matching example as `pickup.py` or `pickup.mjs`:

Reveal pickup details using computer actions

```javascript
import OpenAI, { ComputerToolset } from "openai";
import { chromium } from "playwright";

class PickupDriver {
  constructor(page) {
    this.page = page;
  }

  async screenshot() {
    const image = await this.page.screenshot({ type: "png" });
    return {
      type: "computer_screenshot",
      image_url: "data:image/png;base64," + image.toString("base64"),
    };
  }

  async allowed(action) {
    if (action.type === "screenshot") return true;
    if (
      action.type !== "click" ||
      action.button !== "left" ||
      action.keys?.length
    )
      return false;
    const box = await this.page.locator("summary").boundingBox();
    return Boolean(
      box &&
      box.x <= action.x &&
      action.x < box.x + box.width &&
      box.y <= action.y &&
      action.y < box.y + box.height
    );
  }

  async click(action) {
    // The page may have changed after approval, so bind the click again.
    if (!(await this.allowed(action)))
      throw new Error("Pickup details moved or the click is not allowed.");
    await this.page.mouse.click(action.x, action.y);
  }

  refuse(action) {
    throw new Error(`This exercise does not allow ${action.type}.`);
  }

  double_click = this.refuse;
  drag = this.refuse;
  keypress = this.refuse;
  move = this.refuse;
  scroll = this.refuse;
  type = this.refuse;
  wait = this.refuse;
}

async function main() {
  const client = new OpenAI({ timeout: 30_000, maxRetries: 0 });
  const browser = await chromium.launch({ env: {}, chromiumSandbox: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1024, height: 768 },
    });
    await page.route("**/*", (route) => route.abort());
    await page.setContent(
      "<title>Parcel pickup</title><main>" +
        "<h1>Parcel pickup</h1><p>Order #1042 is ready.</p>" +
        "<details><summary>Show pickup details</summary>" +
        "<p>Locker 18. Pickup code: 6249.</p></details></main>"
    );
    const driver = new PickupDriver(page);
    const tools = new ComputerToolset(driver);
    try {
      const response = await tools.run(
        client,
        {
          model: "gpt-6.1-sol",
          store: false,
          input:
            "Take a screenshot. Open 'Show pickup details' and report the locker and pickup code. Use only screenshots and left clicks.",
        },
        { beforeAction: (action) => driver.allowed(action), maxSteps: 6 }
      );
      if ((await page.locator("details").getAttribute("open")) === null) {
        throw new Error("Pickup details are still closed.");
      }
      console.log(
        "Verified pickup details:",
        await page.locator("details p").innerText()
      );
      console.log("Answer:", response.output_text);
    } finally {
      tools.close();
    }
  } finally {
    await browser.close();
  }
}

await main();
```

```python
import asyncio
import base64

from openai import AsyncComputerToolset, AsyncOpenAI
from playwright.async_api import async_playwright


class PickupDriver:
    def __init__(self, page):
        self.page = page

    async def screenshot(self):
        image = await self.page.screenshot(type="png")
        return {
            "type": "computer_screenshot",
            "image_url": "data:image/png;base64," + base64.b64encode(image).decode(),
        }

    async def allowed(self, action):
        if action.type == "screenshot":
            return True
        if action.type != "click" or action.button != "left" or action.keys:
            return False
        box = await self.page.locator("summary").bounding_box()
        return bool(
            box
            and box["x"] <= action.x < box["x"] + box["width"]
            and box["y"] <= action.y < box["y"] + box["height"]
        )

    async def click(self, action):
        # The page may have changed after approval, so bind the click again.
        if not await self.allowed(action):
            raise RuntimeError("Pickup details moved or the click is not allowed.")
        await self.page.mouse.click(action.x, action.y)

    async def refuse(self, action):
        raise RuntimeError(f"This exercise does not allow {action.type}.")

    double_click = drag = keypress = move = scroll = type = wait = refuse


async def main():
    async with (
        async_playwright() as playwright,
        AsyncOpenAI(timeout=30, max_retries=0) as client,
    ):
        browser = await playwright.chromium.launch(env={}, chromium_sandbox=True)
        try:
            page = await browser.new_page(viewport={"width": 1024, "height": 768})
            await page.route("**/*", lambda route: route.abort())
            await page.set_content(
                "<title>Parcel pickup</title><main>"
                "<h1>Parcel pickup</h1><p>Order #1042 is ready.</p>"
                "<details><summary>Show pickup details</summary>"
                "<p>Locker 18. Pickup code: 6249.</p></details></main>"
            )
            driver = PickupDriver(page)
            tools = AsyncComputerToolset(driver)
            try:
                response = await tools.run(
                    client,
                    {
                        "model": "gpt-6.1-sol",
                        "store": False,
                        "input": "Take a screenshot. Open 'Show pickup details' and report the locker and pickup code. Use only screenshots and left clicks.",
                    },
                    before_action=driver.allowed,
                    max_steps=6,
                )
                if await page.locator("details").get_attribute("open") is None:
                    raise RuntimeError("Pickup details are still closed.")
                print(
                    "Verified pickup details:",
                    await page.locator("details p").inner_text(),
                )
                print("Answer:", response.output_text)
            finally:
                tools.close()
        finally:
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
```


Run `.venv/bin/python pickup.py` or `node pickup.mjs`. On success, the script prints `Verified pickup details: Locker 18. Pickup code: 6249.`, followed by the model's answer. Pending API safety checks stop this sample; add a human approval callback only when your application can handle them.

  

  


The model types a name into a visitor badge form and clicks **Create badge**. The driver exposes only page reading, typing, and clicking. Its confirmation callback permits only this form's controls and the name Mira. The script verifies the page result before reporting success.

Save the matching example as `badge.py` or `badge.mjs`:

Create a visitor badge in a local browser

```javascript
import OpenAI from "openai";
import { BrowserToolset } from "openai/helpers/browser";
import { ResponsesToolRunner } from "openai/helpers/responses-tool-runner";
import { chromium } from "playwright";

class BadgeForm {
  constructor(page) {
    this.page = page;
  }

  async state() {
    return {
      tabs: [
        {
          id: "badge",
          title: await this.page.title(),
          url: this.page.url(),
          active: true,
        },
      ],
    };
  }

  async read_page(_args) {
    return {
      version: 1,
      text: await this.page.locator("body").innerText(),
      elements: [
        { ref: "name", role: "textbox", label: "Name" },
        { ref: "save", role: "button", label: "Create badge" },
      ],
      omitted: [],
    };
  }

  async type(args) {
    await this.page.locator("#name").fill(args.text);
  }

  async click(_args) {
    await this.page.locator("#save").click();
  }

  async confirm({ member, arguments: args }) {
    if (
      this.page.url() !== "about:blank" ||
      (args.tab_id !== null && args.tab_id !== "badge")
    ) {
      return false;
    }
    return (
      (member === "type" && args.target === "name" && args.text === "Mira") ||
      (member === "click" && args.target === "save")
    );
  }
}

async function main() {
  const client = new OpenAI({ timeout: 30_000, maxRetries: 0 });
  const browser = await chromium.launch({ env: {}, chromiumSandbox: true });
  try {
    const page = await browser.newPage();
    await page.route("**/*", (route) => route.abort());
    await page.setContent(`
      <title>Visitor badge</title>
      <label>Name <input id="name"></label>
      <button id="save" onclick="document.querySelector('output').innerText =
        'Badge ready: ' + document.querySelector('#name').value">Create badge</button>
      <output></output>
    `);
    const driver = new BadgeForm(page);
    const tools = new BrowserToolset(driver, {
      members: ["read_page", "type", "click"],
      confirm: driver.confirm.bind(driver),
    });
    const response = await new ResponsesToolRunner({ browser: tools }).run(
      client,
      {
        model: "gpt-6-astra",
        store: false,
        input: "Create a visitor badge for Mira.",
      },
      { maxSteps: 6 }
    );
    const result = await page.locator("output").innerText();
    if (result !== "Badge ready: Mira") {
      throw new Error(`The badge was not created: ${JSON.stringify(result)}`);
    }
    console.log(result);
    console.log("Answer:", response.output_text);
  } finally {
    await browser.close();
  }
}

await main();
```

```python
import asyncio

from openai import AsyncOpenAI
from openai.lib.browser import AsyncBrowserToolset
from openai.lib.responses_tool_runner import AsyncResponsesToolRunner
from playwright.async_api import async_playwright


class BadgeForm:
    def __init__(self, page):
        self.page = page

    async def state(self):
        return {
            "tabs": [
                {
                    "id": "badge",
                    "title": await self.page.title(),
                    "url": self.page.url,
                    "active": True,
                }
            ]
        }

    async def read_page(self, args):
        return {
            "version": 1,
            "text": await self.page.locator("body").inner_text(),
            "elements": [
                {"ref": "name", "role": "textbox", "label": "Name"},
                {"ref": "save", "role": "button", "label": "Create badge"},
            ],
            "omitted": [],
        }

    async def type(self, args):
        await self.page.locator("#name").fill(args["text"])

    async def click(self, args):
        await self.page.locator("#save").click()

    async def confirm(self, context):
        args = context["arguments"]
        if self.page.url != "about:blank" or args["tab_id"] not in (None, "badge"):
            return False
        return (
            context["member"] == "type"
            and args["target"] == "name"
            and args["text"] == "Mira"
        ) or (context["member"] == "click" and args["target"] == "save")


async def main():
    async with (
        async_playwright() as playwright,
        AsyncOpenAI(timeout=30, max_retries=0) as client,
    ):
        browser = await playwright.chromium.launch(env={}, chromium_sandbox=True)
        try:
            page = await browser.new_page()
            await page.route("**/*", lambda route: route.abort())
            await page.set_content("""
                <title>Visitor badge</title>
                <label>Name <input id="name"></label>
                <button id="save" onclick="document.querySelector('output').innerText =
                  'Badge ready: ' + document.querySelector('#name').value">Create badge</button>
                <output></output>
            """)
            driver = BadgeForm(page)
            tools = AsyncBrowserToolset(
                driver, members=["read_page", "type", "click"], confirm=driver.confirm
            )
            response = await AsyncResponsesToolRunner(browser=tools).run(
                client,
                {
                    "model": "gpt-6-astra",
                    "store": False,
                    "input": "Create a visitor badge for Mira.",
                },
                max_steps=6,
            )
            result = await page.locator("output").inner_text()
            if result != "Badge ready: Mira":
                raise RuntimeError(f"The badge was not created: {result!r}")
            print(result)
            print("Answer:", response.output_text)
        finally:
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
```


Run `.venv/bin/python badge.py` or `node badge.mjs`. On success, the script prints `Badge ready: Mira`, followed by the model's answer.



If the API rejects the tool or Chromium cannot start, [troubleshoot the run](https://developers.openai.com/api/docs/guides/tools-computer-use-sdk-drivers#troubleshoot-a-run). If clicks miss, [check the screenshot and coordinates](https://developers.openai.com/api/docs/guides/tools-computer-use-sdk-drivers#fix-missed-clicks).

### Check model access, cost, and data

- **Model:** For browser function tools, check that the model supports Responses and function calling. If your driver returns images, check image input too. For screenshot-based computer actions, check the model's **Tools** section for computer use. See the [models catalog](https://developers.openai.com/api/docs/models) and check your project's access.
- **Cost:** Each Responses request can incur charges for input and output tokens. Screenshots count as image input. Check [API pricing](https://developers.openai.com/api/docs/pricing#built-in-tools), [estimate image input cost](https://developers.openai.com/api/docs/guides/image-cost-calculator), or [inspect request usage](https://developers.openai.com/api/docs/guides/tools-computer-use-sdk-drivers#inspect-usage-and-timing). A hosted environment may charge separately.
- **Data:** The SDK sends returned page text or screenshots to OpenAI. The examples set `store` to `false`, but that does not remove every form of data retention. Review [data controls](https://developers.openai.com/api/docs/guides/your-data#storage-requirements-and-retention-controls-per-endpoint) and [image-input exceptions](https://developers.openai.com/api/docs/guides/your-data#image-and-file-inputs). Your environment provider has its own data policy.

### See and approve changes

Next, try the booking demo in [Python](https://github.com/openai/openai-python/blob/v3.31.0/examples/browser-use-demo/README.md) or [Node](https://github.com/openai/openai-node/blob/v7.33.0/examples/browser-use-demo/README.md). It fills a fictional reservation, asks for approval before submission, and checks the saved fields and confirmation. You can watch the browser, take control, return control, or stop. Both versions include a local rehearsal with a real browser and no API call.

To watch SDK actions on a desktop, try the [visual desktop demo](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#watch-and-control-a-local-desktop).

<a id="add-a-desktop"></a>

### Adapt the driver

Replace the sample page with an environment your application controls. For a browser driver, expose only the operations the task needs with `members`. For a computer driver, implement the required methods and reject unsupported actions. Keep the session open until the run ends, then close resources your application created.

Page content can influence the model. Use a fresh browser profile or isolated desktop. Limit network access, and keep credentials out of page text and screenshots. Ask for approval before making changes, and check the saved result before reporting success. See the [driver reference](https://developers.openai.com/api/docs/guides/tools-computer-use-sdk-drivers) for method contracts, approval, URL policy, and recovery.

### Switch to Decisions for bounded choices

Use Responses when the model must choose actions and generate their arguments. Use Decisions only when your application already knows every allowed action and its complete arguments. For example, an app might offer `route_billing`, `route_technical`, and `review`. Decisions selects an option; your application still approves and performs it, then checks the result. Discard choices when the page changes. See the [Decisions guide](https://developers.openai.com/api/docs/guides/decisions).

To try it in the booking demo, use a key with Decisions access, set `OPENAI_DECISIONS_MODEL`, and restart the server. Start a new run and select **Decisions**.

## Use the API directly

Use the Responses API directly when you need to manage the tool loop yourself. You provide the environment and execute the model's requests. Choose how to connect it to your application:

<a id="choose-an-integration-path"></a>

- **Code execution:** The model writes code that uses a library such as PyAutoGUI or Playwright to operate the interface. One call can combine actions, loops, or conditional logic.
- **The computer tool:** The model returns structured mouse and keyboard actions that your application translates into browser or desktop input.

For [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra), we recommend code execution. The `computer` tool remains supported as an alternative.

<a id="option-2-use-a-custom-tool-or-harness"></a>
<a id="use-your-own-ui-tools"></a>
<a id="use-an-existing-tool-interface"></a>

If you already expose UI operations through [function calling](https://developers.openai.com/api/docs/guides/function-calling) or [remote MCP tools](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), you can keep that interface. See [Use your own UI tools](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#use-your-own-ui-tools) for the differences in how those integrations execute tools and return results.

<a id="expose-a-code-execution-tool"></a>
<a id="option-3-use-a-code-execution-harness"></a>
<a id="use-a-code-execution-harness"></a>

### Use code execution

A code-execution integration gives the model a function tool that accepts a script. Your application runs the script in an isolated browser or desktop environment and returns its output, including screenshots. Keep the environment available between calls so the model can build on earlier work.

<a id="before-running-the-examples"></a>

#### Run the sample app

The [CUA sample app](https://github.com/openai/openai-cua-sample-app#first-run) includes JavaScript/Playwright and Python/PyAutoGUI implementations, with local tasks and a shared console:

1. Follow the setup instructions for your chosen implementation in an isolated environment.
2. Choose a built-in scenario and start a run. 
3. Inspect the actions, screenshots, and final state to assess whether the task succeeded.

Use the app's README for installation, desktop permissions, and supported environments. Review [Run safely](#run-safely) before adapting it to real sites or accounts.

<a id="code-execution-harness-examples"></a>

#### Connect your own runtime

The following example shows the API loop for a runtime you provide. Python, Ruby, and Go send Python code to a desktop runtime that uses PyAutoGUI; JavaScript uses Playwright to operate a browser. Each client exposes an ordinary function tool and returns text or images with the original `call_id`.

The `execute_in_sandbox` or `executeInSandbox` helper sends code to your execution environment and returns its observations. It must preserve the browser or desktop session, enforce execution limits, and apply your permission rules. These are integration examples, separate from running the sample app.



Python

    Run computer use with code execution

```python
import json
import uuid

from openai import OpenAI
from openai.types.responses import (
    FunctionToolParam,
    ResponseInputParam,
)

def run_computer_use(endpoint, prompt, model="gpt-6-astra"):
    client = OpenAI()
    session_id = str(uuid.uuid4())
    tools: list[FunctionToolParam] = [
        {
            "type": "function",
            "name": "exec_py",
            "description": (
                "Run Python in a persistent desktop. Variables persist across calls. "
                "PyAutoGUI operations are synchronous. Available: pyautogui, time, "
                "log(value), and display(PIL_image). Inspect the screen with "
                "display(pyautogui.screenshot()) before acting. Use screenshot "
                "coordinates and check the screen after a short group of actions. "
                "Keep screenshots in memory and PyAutoGUI's fail-safe enabled."
            ),
            "parameters": {
                "type": "object",
                "properties": {"code": {"type": "string"}},
                "required": ["code"],
                "additionalProperties": False,
            },
            "strict": True,
        }
    ]
    next_input: ResponseInputParam = [{"role": "user", "content": prompt}]
    previous_response_id = None

    for turn in range(20):
        response = client.responses.create(
            model=model,
            tools=tools,
            input=next_input,
            previous_response_id=previous_response_id,
        )
        if response.status != "completed":
            raise RuntimeError(f"Response stopped with status: {response.status}")

        calls = [item for item in response.output if item.type == "function_call"]
        if not calls and any(
            item.type == "message" and item.phase != "commentary"
            for item in response.output
        ):
            print(response.output_text)
            return
        if turn == 19:
            raise RuntimeError(
                "The task reached the 20-response limit. Inspect the last result."
            )

        next_input = []
        for call in calls:
            if call.name != "exec_py":
                raise ValueError(f"Unexpected tool: {call.name}")
            code = json.loads(call.arguments)["code"]
            output = execute_in_sandbox(code, session_id, endpoint)
            next_input.append(
                {
                    "type": "function_call_output",
                    "call_id": call.call_id,
                    "output": output,
                }
            )
        previous_response_id = response.id
```

  

  

    
JavaScript

    Run computer use with code execution

```javascript
import { randomUUID } from "node:crypto";
import OpenAI from "openai";

async function runComputerUse(endpoint, prompt, model = "gpt-6-astra") {
  const client = new OpenAI();
  const sessionId = randomUUID();

  const tools = [
    {
      type: "function",
      name: "exec_js",
      description: `Run JavaScript in a persistent browser. Available: Playwright's
browser, context, and page objects; console.log(value); and display(base64Image).
Save reusable variables on globalThis. Inspect a screenshot before acting and
check the screen after a short group of actions. Keep screenshots in memory.
Use top-level await for async operations. Return images with display() and concise
text with console.log(). The context viewport is 1440x900.`,
      parameters: {
        type: "object",
        properties: { code: { type: "string" } },
        required: ["code"],
        additionalProperties: false,
      },
      strict: true,
    },
  ];

  let nextInput = [{ role: "user", content: prompt }];
  let previousResponseId;

  for (let turn = 0; turn < 20; turn++) {
    const response = await client.responses.create({
      model,
      tools,
      input: nextInput,
      previous_response_id: previousResponseId,
      reasoning: { effort: "low" },
    });
    if (response.status !== "completed") {
      throw new Error(`Response stopped with status: ${response.status}`);
    }
    const calls = response.output.filter(
      (item) => item.type === "function_call"
    );
    if (
      calls.length === 0 &&
      response.output.some(
        (item) => item.type === "message" && item.phase !== "commentary"
      )
    ) {
      console.log(response.output_text);
      return;
    }
    if (turn === 19) {
      throw new Error(
        "The task reached the 20-response limit. Inspect the last result."
      );
    }

    nextInput = [];
    for (const call of calls) {
      if (call.name !== "exec_js")
        throw new Error(`Unexpected tool: ${call.name}`);
      const { code } = JSON.parse(call.arguments);
      const output = await executeInSandbox(code, sessionId, endpoint);
      nextInput.push({
        type: "function_call_output",
        call_id: call.call_id,
        output,
      });
    }
    previousResponseId = response.id;
  }
}
```

  

  

    
Ruby

    Run computer use with code execution

```ruby
require "json"
require "openai"
require "securerandom"

def run_computer_use(endpoint, prompt)
  client = OpenAI::Client.new
  session_id = SecureRandom.uuid
  tools = [
    {
      type: :function,
      name: "exec_py",
      description: "Run Python in a persistent desktop. Variables persist across calls. PyAutoGUI operations are synchronous. Available: pyautogui, time, log(value), and display(PIL_image). Inspect the screen with display(pyautogui.screenshot()) before acting. Use screenshot coordinates and check the screen after a short group of actions. Keep screenshots in memory and PyAutoGUI's fail-safe enabled.",
      parameters: {
        type: :object,
        properties: { code: { type: :string } },
        required: ["code"],
        additionalProperties: false
      },
      strict: true
    }
  ]
  next_input = []
  next_input << {
    role: :user,
    content: prompt
  }
  history = {}
  20.times do |turn|
    response = client.responses.create(
      model: "gpt-6-astra", tools: tools, input: next_input, previous_response_id: history[:id]
    )
    raise "Response stopped with status: #{response.status}" unless response.status == OpenAI::Responses::ResponseStatus::COMPLETED

    calls = response.output.grep(OpenAI::Responses::ResponseFunctionToolCall)
    if calls.empty? && response.output.any? { |item| item.is_a?(OpenAI::Responses::ResponseOutputMessage) && item.phase != :commentary }
      puts(response.output_text)
      return response
    end
    raise "The task reached the 20-response limit" if turn == 19

    next_input.clear
    calls.each do |call|
      raise "Unexpected tool: #{call.name}" unless call.name == "exec_py"

      code = JSON.parse(call.arguments).fetch("code")
      raise "Expected Python source text" unless code.is_a?(String)

      output = execute_in_sandbox(code, session_id, endpoint)
      next_input << {
        type: :function_call_output,
        call_id: call.call_id,
        output: output
      }
    end
    history[:id] = response.id
  end
end
```

  

  

    
Go

    Run computer use with code execution

```go
func runComputerUse(ctx context.Context, client openai.Client, endpoint, prompt string, terminal *bufio.Scanner, output io.Writer) error {
	session := make([]byte, 16)
	if _, err := rand.Read(session); err != nil {
		return err
	}
	sessionID := hex.EncodeToString(session)
	tool := responses.ToolParamOfFunction("exec_py", map[string]any{
		"type": "object", "properties": map[string]any{"code": map[string]any{"type": "string"}},
		"required": []string{"code"}, "additionalProperties": false,
	}, true)
	tool.OfFunction.Description = openai.String("Run Python in a persistent desktop. Variables persist across calls. " +
		"PyAutoGUI operations are synchronous. Available: pyautogui, time, " +
		"log(value), and display(PIL_image). Inspect the screen with " +
		"display(pyautogui.screenshot()) before acting. Use screenshot " +
		"coordinates and check the screen after a short group of actions. " +
		"Keep screenshots in memory and PyAutoGUI's fail-safe enabled.")
	params := responses.ResponseNewParams{
		Model: "gpt-6-astra", Tools: []responses.ToolUnionParam{tool},
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String(prompt)},
	}
	for turn := 0; turn < 20; turn++ {
		response, err := client.Responses.New(ctx, params)
		if err != nil {
			return err
		}
		if response.Status != "completed" {
			return fmt.Errorf("response stopped with status: %s", response.Status)
		}
		var calls []responses.ResponseFunctionToolCall
		finalMessage := false
		for _, item := range response.Output {
			if item.Type == "function_call" {
				calls = append(calls, item.AsFunctionCall())
			}
			if item.Type == "message" && item.AsMessage().Phase != "commentary" {
				finalMessage = true
			}
		}
		if len(calls) == 0 && finalMessage {
			fmt.Fprintln(output, response.OutputText())
			return nil
		}
		if turn == 19 {
			return fmt.Errorf("task reached the 20-response limit; inspect the last result")
		}
		nextInput := responses.ResponseInputParam{}
		for _, call := range calls {
			if call.Name != "exec_py" {
				return fmt.Errorf("unexpected tool: %s", call.Name)
			}
			var arguments struct {
				Code *string `json:"code"`
			}
			if err := json.Unmarshal([]byte(call.Arguments), &arguments); err != nil {
				return err
			}
			if arguments.Code == nil {
				return fmt.Errorf("exec_py requires code")
			}
			observations, err := executeInSandbox(ctx, endpoint, sessionID, *arguments.Code, terminal, output)
			if err != nil {
				return err
			}
			nextInput = append(nextInput, responses.ResponseInputItemUnionParam{
				OfFunctionCallOutput: &responses.ResponseInputItemFunctionCallOutputParam{
					CallID: openai.String(call.CallID),
					Output: responses.ResponseInputItemFunctionCallOutputOutputUnionParam{OfResponseFunctionCallOutputItemArray: observations},
				},
			})
		}
		params.Input = responses.ResponseNewParamsInputUnion{OfInputItemList: nextInput}
		params.PreviousResponseID = openai.String(response.ID)
	}
	return nil
}
```



<a id="connect-to-your-execution-service"></a>

For a complete client adapter and the expected text and image output shape, see [Connect to your execution service](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#connect-to-your-execution-service). The service interface in those examples belongs to your application; it is not an OpenAI-hosted endpoint.

#### Preserve state and return observations

Keep the browser or desktop session alive between calls. A persistent Python or JavaScript namespace can also preserve variables. Describe the available objects and helpers in the tool definition so the model knows what it can use.

Give the model a current screenshot when the UI state is unknown. After a short group of actions, return another screenshot so it can check the result. Keep images in memory and use `detail: "original"` to preserve resolution. If you downscale a screenshot, map the model's coordinates back to the environment's coordinate space before executing actions. See [Screenshot capture and resolution](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#capture-screenshots).

The API conversation and the execution environment have separate state. Preserve tool calls and their outputs in the conversation, and keep the corresponding environment available in your application. Continuing a response does not restore a browser session, login state, or runtime variables.

<a id="provide-the-environment-and-control-the-loop"></a>
<a id="option-1-run-the-built-in-computer-use-loop"></a>

### Use the computer tool

Use this alternative when your integration expects structured actions instead of generated code.

To try this path, follow the [same sample-app setup](https://github.com/openai/openai-cua-sample-app#first-run), select **Native** mode, and run a built-in scenario. Use a model that supports the [computer tool](https://developers.openai.com/api/docs/models).

The API exchange has three steps: send a task, execute the returned actions, and return a screenshot. The snippets here use a page with a **Show filters** control and a search field. Adapt that task to your own interface when integrating the tool.

<a id="prepare-a-safe-environment"></a>
<a id="1-prepare-your-browser-or-desktop"></a>
<a id="create-a-docker-image"></a>

For environment setup and action handlers, use the [integration recipes](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#prepare-an-environment).

<a id="1-send-the-first-request"></a>
<a id="2-send-the-task"></a>
<a id="1-send-the-task"></a>

#### Send the task

Enable `computer` in the `tools` array and describe the result you want:

Send a computer request

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6.1-sol",
  tools: [{ type: "computer" }],
  input:
    "Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.",
});

console.log(JSON.stringify(response.output, null, 2));
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6.1-sol",
    tools=[{"type": "computer"}],
    input="Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.",
)

print(response.output)
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
		Model: "gpt-6.1-sol",
		Tools: []responses.ToolUnionParam{{OfComputer: &responses.ComputerToolParam{}}},
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.")},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(response.Output)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.ResponseCreateParams;
import java.util.List;
import java.util.Map;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.1-sol")
        .input(
            "Open the Filters panel if needed, then search for penguin. Use the computer tool for UI interaction.")
        .putAdditionalBodyProperty("tools", JsonValue.from(List.of(Map.of("type", "computer"))))
        .build();

client.responses().create(params).output().forEach(System.out::println);
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6.1-sol",
  input: "Open the Filters panel if needed, then search for penguin. Use the computer tool for UI interaction.",
  tools: [{ type: :computer }]
)

puts(response.output)
```


<a id="2-handle-screenshot-first-turns"></a>
<a id="3-inspect-the-requested-actions"></a>
<a id="3-run-every-returned-action"></a>
<a id="2-execute-the-requested-actions"></a>

#### Execute the requested actions

A `computer_call` contains an ordered `actions` array. For example, this call selects the search field and types `penguin`:

Batched actions in one turn

```json
{
  "output": [
    {
      "type": "computer_call",
      "call_id": "call_002",
      "actions": [
        { "type": "click", "button": "left", "x": 405, "y": 157 },
        { "type": "type", "text": "penguin" }
      ],
      "status": "completed"
    }
  ]
}
```


Your action handler translates these requests into browser or operating system input. Execute permitted actions in order, then capture the updated screen. The model can request `click`, `double_click`, `drag`, `move`, `scroll`, `keypress`, `type`, `wait`, or `screenshot`.

The first call may contain only a `screenshot` action. In that case, capture the current screen and return it without changing the UI. A call's `status: "completed"` means the model has finished generating that call; your application still needs to execute it.

<a id="possible-computer-use-actions"></a>
<a id="supported-actions"></a>
<a id="implement-action-handlers"></a>

Use the [action-handler examples](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#implement-action-handlers) for key mappings, drag paths, and modifier keys.

<a id="4-capture-and-return-the-updated-screenshot"></a>
<a id="4-return-the-updated-screen"></a>
<a id="3-return-the-screenshot"></a>

#### Return the screenshot

Return a `computer_call_output` whose `call_id` matches the call you handled. Use `previous_response_id` to continue the model conversation:

Send the updated screenshot

```javascript
import OpenAI from "openai";

const client = new OpenAI();

async function sendComputerScreenshot(response, callId, screenshotBase64) {
  const output = {
    type: "computer_screenshot",
    image_url: `data:image/png;base64,${screenshotBase64}`,
    detail: "original",
  };

  return await client.responses.create({
    model: "gpt-6.1-sol",
    tools: [{ type: "computer" }],
    previous_response_id: response.id,
    input: [
      {
        type: "computer_call_output",
        call_id: callId,
        output,
      },
    ],
  });
}
```

```python
from openai import OpenAI

client = OpenAI()


def send_computer_screenshot(response, call_id, screenshot_base64):
    return client.responses.create(
        model="gpt-6.1-sol",
        tools=[{"type": "computer"}],
        previous_response_id=response.id,
        input=[
            {
                "type": "computer_call_output",
                "call_id": call_id,
                "output": {
                    "type": "computer_screenshot",
                    "image_url": f"data:image/png;base64,{screenshot_base64}",
                    "detail": "original",
                },
            }
        ],
    )
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
	response, err := sendComputerScreenshot(client, "resp_abc123", "call_abc123", "<base64 bytes here>")
	if err != nil {
		panic(err)
	}
	fmt.Println(response.Output)
}

func sendComputerScreenshot(client openai.Client, responseID string, callID string, screenshotBase64 string) (*responses.Response, error) {
	screenshot := responses.ResponseComputerToolCallOutputScreenshotParam{
		ImageURL: openai.String("data:image/png;base64," + screenshotBase64),
	}
	screenshot.SetExtraFields(map[string]any{"detail": "original"})
	return client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:              "gpt-6.1-sol",
		Tools:              []responses.ToolUnionParam{{OfComputer: &responses.ComputerToolParam{}}},
		PreviousResponseID: openai.String(responseID),
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfComputerCallOutput(callID, screenshot),
		}},
	})
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.ResponseComputerToolCallOutputScreenshot;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.List;
import java.util.Map;

String responseId = "resp_abc123";

String computerCallId = "call_abc123";

String screenshotBase64 = "<base64 bytes here>";

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6.1-sol")
        .input(
            ResponseCreateParams.Input.ofResponse(
                List.of(
                    ResponseInputItem.ofComputerCallOutput(
                        ResponseInputItem.ComputerCallOutput.builder()
                            .callId(computerCallId)
                            .output(
                                ResponseComputerToolCallOutputScreenshot.builder()
                                    .imageUrl("data:image/png;base64," + screenshotBase64)
                                    .putAdditionalProperty("detail", JsonValue.from("original"))
                                    .build())
                            .build()))))
        .previousResponseId(responseId)
        .putAdditionalBodyProperty("tools", JsonValue.from(List.of(Map.of("type", "computer"))))
        .build();

client.responses().create(params).output().forEach(System.out::println);
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6.1-sol",
  previous_response_id: "resp_abc123",
  input: [
    {
      type: :computer_call_output,
      call_id: "call_abc123",
      output: {
        type: :computer_screenshot,
        image_url: "data:image/png;base64,<base64 bytes here>",
        detail: :original
      }
    }
  ],
  tools: [{ type: :computer }]
)

puts(response.output)
```


The same [screenshot and state guidance](#preserve-state-and-return-observations) applies to this loop. Keep the environment available while `previous_response_id` continues the model conversation.

<a id="5-repeat-until-the-tool-stops-calling"></a>
<a id="5-continue-and-verify-the-result"></a>

Continue until the model stops returning `computer_call` items. Inspect the remaining output for an answer, a request for help, or another tool call, and verify the result in the application. For this example, the Filters panel should be open and the search field should contain `penguin`.

See [Repeat the computer-use loop](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#repeat-the-computer-use-loop) for the loop skeleton, including its required action and screenshot helpers.

<a id="handle-user-confirmation-and-consent"></a>
<a id="keep-a-human-in-the-loop"></a>
<a id="restrict-the-environment"></a>

## Run safely

Computer use can affect real accounts and data. Apply these controls in your application and execution environment as well as in the model's instructions:

- **Restrict the environment.** Use an isolated browser or VM and an allow list of sites and actions. Keep access limited to what the task needs.
- **Treat screen content as untrusted.** Text in a page, document, or tool result cannot grant permission or override the user's instructions.
- **Confirm consequential actions.** Keep users in control of purchases, data transmission, destructive changes, and other actions that are hard to reverse. Typing sensitive information into a form counts as transmission.
- **Bound and verify the run.** Set step, time, or cost limits, support cancellation, and check the actual outcome instead of relying only on the model's final answer.

<a id="treat-only-direct-user-instructions-as-permission"></a>
<a id="confirm-at-the-point-of-risk"></a>
<a id="use-the-right-confirmation-level"></a>
<a id="hand-off-required"></a>
<a id="always-confirm-at-action-time"></a>
<a id="pre-approval-can-be-enough"></a>
<a id="protect-sensitive-data"></a>
<a id="prompt-patterns-you-can-add-to-your-agent-instructions"></a>
<a id="distinguish-direct-user-intent-from-untrusted-third-party-content"></a>
<a id="delay-confirmation-until-the-exact-risky-action"></a>
<a id="require-explicit-consent-before-transmitting-sensitive-data"></a>
<a id="stop-and-escalate-when-the-model-sees-prompt-injection-or-suspicious-instructions"></a>

See the [confirmation and consent guidance](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#handle-user-confirmation-and-consent) for specific approval requirements, human handoff, and prompt examples.

<a id="migration-from-computer-use-preview"></a>
<a id="explore-more-examples"></a>

## Next steps

- Use the [integration recipes](https://developers.openai.com/api/docs/guides/tools-computer-use-integration) for environment setup, action handlers, screenshot capture, and execution-service adapters.
- Follow [Migration from computer-use-preview](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#migration-from-computer-use-preview) when updating an older integration.
- Explore the [CUA sample app](https://github.com/openai/openai-cua-sample-app) for complete browser and desktop workflows.