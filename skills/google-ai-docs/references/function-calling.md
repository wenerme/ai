> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Function calling with the Gemini API

Function calling lets you connect models to external tools and APIs.
Instead of generating text responses, the model determines when to call specific
functions and provides the necessary parameters to execute real-world actions.
This allows the model to act as a bridge between natural language and real-world
actions and data. Function calling has 3 primary use cases:

- [**Take Actions:**](/docs/function-calling#meeting) Interact with external systems using APIs, such as
  scheduling appointments, creating invoices, sending emails, or controlling
  smart home devices.
- [**Augment Knowledge:**](/docs/function-calling#weather) Access information from external sources like
  databases, APIs, and knowledge bases.
- [**Extend Capabilities:**](/docs/function-calling#chart) Use external tools to perform computations and
  extend the limitations of the model, such as using a calculator or creating
  charts.

You can browse examples of these use cases below:

### Schedule Meeting  {% id="meeting" %}

This example shows how to define a function that schedules a meeting with attendees at a specific time, allowing the model to parse user requests and return structured arguments to trigger actions in external systems.

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  schedule_meeting_function = {
      "type": "function",
      "name": "schedule_meeting",
      "description": "Schedules a meeting with specified attendees at a given time and date.",
      "parameters": {
          "type": "object",
          "properties": {
              "attendees": {"type": "array", "items": {"type": "string"}},
              "date": {"type": "string", "description": "Date (e.g., '2024-07-29')"},
              "time": {"type": "string", "description": "Time (e.g., '15:00')"},
              "topic": {"type": "string", "description": "The meeting topic."},
          },
          "required": ["attendees", "date", "time", "topic"],
      },
  }
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Schedule a meeting with Bob and Alice for 03/14/2025 at 10:00 AM about Q3 planning.",
      tools=[{"type": "function", **schedule_meeting_function}],
  )
  
  for step in interaction.steps:
      if step.type == "function_call":
          print(f"Function to call: {step.name}")
          print(f"Arguments: {step.arguments}")
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Schedule a meeting with Bob and Alice for 03/27/2025 at 10:00 AM about Q3 planning.',
    tools: [
      {
        type: "function",
        name: "schedule_meeting",
        description: "Schedule a meeting with specified attendees, date, time, and topic.",
        parameters: {
          type: "object",
          properties: {
            attendees: {
              type: "array",
              items: { type: "string" },
              description: "List of attendee names or email addresses",
            },
            date: { type: "string", description: "Date of the meeting (YYYY-MM-DD)" },
            time: { type: "string", description: "Time of the meeting (HH:MM)" },
            topic: { type: "string", description: "Subject or topic of the meeting" },
          },
          required: ["attendees", "date", "time", "topic"],
        },
      },
    ],
  });
  
  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`Function to call: ${step.name}`);
      console.log(`Arguments: ${JSON.stringify(step.arguments)}`);
    }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Schedule a meeting with Bob and Alice for 03/27/2025 at 10:00 AM about Q3 planning.",
      "tools": [{
          "type": "function",
          "name": "schedule_meeting",
          "description": "Schedules a meeting with specified attendees at a given time and date.",
          "parameters": {
            "type": "object",
            "properties": {
              "attendees": {"type": "array", "items": {"type": "string"}},
              "date": {"type": "string"},
              "time": {"type": "string"},
              "topic": {"type": "string"}
            },
            "required": ["attendees", "date", "time", "topic"]
          }
      }]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  
  Map<String, Object> attendeesProp = new HashMap<>();
  attendeesProp.put("type", "array");
  Map<String, Object> itemsMap = new HashMap<>(); itemsMap.put("type", "string"); attendeesProp.put("items", itemsMap);
  
  Map<String, Object> dateProp = new HashMap<>();
  dateProp.put("type", "string");
  dateProp.put("description", "Date (e.g., \"2024-07-29\")");
  
  Map<String, Object> timeProp = new HashMap<>();
  timeProp.put("type", "string");
  timeProp.put("description", "Time (e.g., \"15:00\")");
  
  Map<String, Object> topicProp = new HashMap<>();
  topicProp.put("type", "string");
  topicProp.put("description", "The meeting topic.");
  
  Map<String, Object> properties = new HashMap<>();
  properties.put("attendees", attendeesProp);
  properties.put("date", dateProp);
  properties.put("time", timeProp);
  properties.put("topic", topicProp);
  
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  parameters.put("properties", properties);
  parameters.put("required", Arrays.asList("attendees", "date", "time", "topic"));
  
  Function scheduleMeetingFunction =
      Function.builder()
          .name("schedule_meeting")
          .description("Schedules a meeting with specified attendees at a given time and date.")
          .parameters(parameters)
          .build();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.6-flash"))
          .input(InteractionsInput.of("Schedule a meeting with Bob and Alice for 03/27/2025 at 10:00 AM about Q3 planning."))
          .tools(Arrays.asList(scheduleMeetingFunction))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep functionCall = (FunctionCallStep) step;
        System.out.println("Function to call: " + functionCall.name().orElse(""));
        System.out.println("Arguments: " + functionCall.arguments().orElse(null));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      scheduleMeetingFunction := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("schedule_meeting"),
          Description: genai.Ptr("Schedules a meeting with specified attendees at a given time and date."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "attendees": map[string]any{
                      "type":  "array",
                      "items": map[string]any{"type": "string"},
                  },
                  "date": map[string]any{
                      "type":        "string",
                      "description": "Date (e.g., '2024-07-29')",
                  },
                  "time": map[string]any{
                      "type":        "string",
                      "description": "Time (e.g., '15:00')",
                  },
                  "topic": map[string]any{
                      "type":        "string",
                      "description": "The meeting topic.",
                  },
              },
              "required": []string{"attendees", "date", "time", "topic"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Schedule a meeting with Bob and Alice for 03/14/2025 at 10:00 AM about Q3 planning."),
                  Tools: []interactions.Tool{scheduleMeetingFunction},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fc := step.FunctionCallStep
              fmt.Println("Function to call:", fc.Name)
              fmt.Println("Arguments:", fc.Arguments)
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

### Get Weather  {% id="weather" %}

This example shows how to define a function that retrieves temperature data for a location, enabling the model to call external APIs to answer queries requiring real-time or external information.

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  weather_function = {
      "type": "function",
      "name": "get_current_temperature",
      "description": "Gets the current temperature for a given location.",
      "parameters": {
          "type": "object",
          "properties": {
              "location": {
                  "type": "string",
                  "description": "The city name, e.g. San Francisco",
              },
          },
          "required": ["location"],
      },
  }
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="What's the temperature in London?",
      tools=[weather_function],
  )
  
  for step in interaction.steps:
      if step.type == "function_call":
          print(f"Function to call: {step.name}")
          print(f"Arguments: {step.arguments}")
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: "What's the temperature in London?",
    tools: [
      {
        type: "function",
        name: "get_current_weather",
        description: "Get the current weather for a given location",
        parameters: {
          type: "object",
          properties: {
            location: { type: "string", description: "City and state, e.g. San Francisco, CA" },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
      },
    ],
  });
  
  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`Function to call: ${step.name}`);
      console.log(`Arguments: ${JSON.stringify(step.arguments)}`);
    }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "What'\''s the temperature in London?",
      "tools": [{
        "type": "function",
        "name": "get_current_temperature",
        "description": "Gets the current temperature for a given location.",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string", "description": "The city name"}
          },
          "required": ["location"]
        }
      }]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  
  Map<String, Object> locationProp = new HashMap<>();
  locationProp.put("type", "string");
  locationProp.put("description", "The city name, e.g. San Francisco");
  
  Map<String, Object> properties = new HashMap<>();
  properties.put("location", locationProp);
  
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  parameters.put("properties", properties);
  parameters.put("required", Arrays.asList("location"));
  
  Function weatherFunction =
      Function.builder()
          .name("get_current_temperature")
          .description("Gets the current temperature for a given location.")
          .parameters(parameters)
          .build();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.6-flash"))
          .input(InteractionsInput.of("What's the temperature in London?"))
          .tools(Arrays.asList(weatherFunction))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep functionCall = (FunctionCallStep) step;
        System.out.println("Function to call: " + functionCall.name().orElse(""));
        System.out.println("Arguments: " + functionCall.arguments().orElse(null));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      weatherFunction := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("get_current_temperature"),
          Description: genai.Ptr("Gets the current temperature for a given location."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "location": map[string]any{
                      "type":        "string",
                      "description": "The city name, e.g. San Francisco",
                  },
              },
              "required": []string{"location"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("What's the temperature in London?"),
                  Tools: []interactions.Tool{weatherFunction},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fc := step.FunctionCallStep
              fmt.Println("Function to call:", fc.Name)
              fmt.Println("Arguments:", fc.Arguments)
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

### Create Chart  {% id="chart" %}

This example shows how to define a function that generates a bar chart from structured data, demonstrating how the model can use external tools to perform computations or create visual assets:

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  create_chart_function = {
      "type": "function",
      "name": "create_bar_chart",
      "description": "Creates a bar chart given a title, labels, and values.",
      "parameters": {
          "type": "object",
          "properties": {
              "title": {"type": "string", "description": "The title for the chart."},
              "labels": {"type": "array", "items": {"type": "string"}},
              "values": {"type": "array", "items": {"type": "number"}},
          },
          "required": ["title", "labels", "values"],
      },
  }
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Create a bar chart titled 'Quarterly Sales' with Q1: 50000, Q2: 75000, Q3: 60000.",
      tools=[create_chart_function],
  )
  
  for step in interaction.steps:
      if step.type == "function_call":
          print(f"Function to call: {step.name}")
          print(f"Arguments: {step.arguments}")
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: "Create a bar chart titled 'Quarterly Sales' with Q1: 50000, Q2: 75000, Q3: 60000.",
    tools: [
      {
        type: "function",
        name: "create_chart",
        description: "Create a chart based on provided data",
        parameters: {
          type: "object",
          properties: {
            chart_type: { type: "string", enum: ["bar", "line", "pie"] },
            data: { type: "string", description: "JSON string of chart data points" },
            title: { type: "string", description: "Title of the chart" },
          },
          required: ["chart_type", "data", "title"],
        },
      },
    ],
  });
  
  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`${step.name}(${JSON.stringify(step.arguments)})`);
    }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Create a bar chart titled '\''Quarterly Sales'\'' with Q1: 50000, Q2: 75000, Q3: 60000.",
      "tools": [{
          "type": "function",
          "name": "create_bar_chart",
          "description": "Creates a bar chart given a title, labels, and values.",
          "parameters": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "labels": {"type": "array", "items": {"type": "string"}},
              "values": {"type": "array", "items": {"type": "number"}}
            },
            "required": ["title", "labels", "values"]
          }
      }]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  
  Map<String, Object> properties = new HashMap<>();
  Map<String, Object> titleMap = new HashMap<>(); titleMap.put("type", "string"); titleMap.put("description", "The title for the chart."); properties.put("title", titleMap);
  Map<String, Object> labelsMap = new HashMap<>(); labelsMap.put("type", "array"); labelsMap.put("items", Collections.singletonMap("type", "string")); properties.put("labels", labelsMap);
  Map<String, Object> valuesMap = new HashMap<>(); valuesMap.put("type", "array"); valuesMap.put("items", Collections.singletonMap("type", "number")); properties.put("values", valuesMap);
  
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  parameters.put("properties", properties);
  parameters.put("required", Arrays.asList("title", "labels", "values"));
  
  Function createChartFunction =
      Function.builder()
          .name("create_bar_chart")
          .description("Creates a bar chart given a title, labels, and values.")
          .parameters(parameters)
          .build();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.6-flash"))
          .input(InteractionsInput.of("Create a bar chart titled 'Quarterly Sales' with Q1: 50000, Q2: 75000, Q3: 60000."))
          .tools(Arrays.asList(createChartFunction))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep functionCall = (FunctionCallStep) step;
        System.out.println(functionCall.name().orElse("") + "(" + functionCall.arguments().orElse(null) + ")");
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      createChartFunction := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("create_bar_chart"),
          Description: genai.Ptr("Creates a bar chart given a title, labels, and values."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "title": map[string]any{
                      "type":        "string",
                      "description": "The title for the chart.",
                  },
                  "labels": map[string]any{
                      "type":  "array",
                      "items": map[string]any{"type": "string"},
                  },
                  "values": map[string]any{
                      "type":  "array",
                      "items": map[string]any{"type": "number"},
                  },
              },
              "required": []string{"title", "labels", "values"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Create a bar chart titled 'Quarterly Sales' with Q1: 50000, Q2: 75000, Q3: 60000."),
                  Tools: []interactions.Tool{createChartFunction},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fc := step.FunctionCallStep
              fmt.Println("Function to call:", fc.Name)
              fmt.Println("Arguments:", fc.Arguments)
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## How function calling works  {% id="how-it-works" %}

![](https://www.gstatic.com/cloud-cms/6fae8435a773b720d5db0c8746efb318.png)

Function calling involves a structured interaction between your application, the
model, and external functions:

1. **Define Function Declaration:** Define the function's name, parameters, and
  purpose to the model.
2. **Call LLM with function declarations:** Send user prompt along with the
  function declaration(s) to the model.
3. **Execute Function Code (Your Responsibility):** The model *doesn't*
  execute the function itself. Extract the name and args and execute in
  your application.
4. **Create User friendly response:** Send the result back to the model for a
  final, user-friendly response.

This process can be repeated over multiple turns. The model supports calling
multiple functions in a single turn ([parallel function calling](/docs/function-calling#parallel_function_calling)) and in sequence ([compositional function calling](/docs/function-calling#compositional_function_calling)).

### Step 1: Define a function declaration  {% id="step-1" %}

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  set_light_values_declaration = {
      "type": "function",
      "name": "set_light_values",
      "description": "Sets the brightness and color temperature of a light.",
      "parameters": {
          "type": "object",
          "properties": {
              "brightness": {
                  "type": "integer",
                  "description": "Light level from 0 to 100",
              },
              "color_temp": {
                  "type": "string",
                  "enum": ["daylight", "cool", "warm"],
                  "description": "Color temperature",
              },
          },
          "required": ["brightness", "color_temp"],
      },
  }
  
  def set_light_values(brightness: int, color_temp: str) -> dict:
      """Set the brightness and color temperature of a room light."""
      return {"brightness": brightness, "colorTemperature": color_temp}
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  const setLightValuesTool = {
    type: 'function',
    name: 'set_light_values',
    description: 'Sets the brightness and color temperature of a light.',
    parameters: {
      type: 'object',
      properties: {
        brightness: { type: 'number', description: 'Light level from 0 to 100' },
        color_temp: { type: 'string', enum: ['daylight', 'cool', 'warm'] },
      },
      required: ['brightness', 'color_temp'],
    },
  };
  
  function setLightValues(brightness = 0, color_temp = 'daylight') {
    return { brightness: brightness, colorTemperature: color_temp };
  }
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
  )
  
  func setLightValues(brightness int, colorTemp string) map[string]any {
      return map[string]any{
          "brightness":       brightness,
          "colorTemperature": colorTemp,
      }
  }
  
  func main() {
      setLightValuesDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("set_light_values"),
          Description: genai.Ptr("Sets the brightness and color temperature of a light."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "brightness": map[string]any{
                      "type":        "integer",
                      "description": "Light level from 0 to 100",
                  },
                  "color_temp": map[string]any{
                      "type":        "string",
                      "enum":        []string{"daylight", "cool", "warm"},
                      "description": "Color temperature",
                  },
              },
              "required": []string{"brightness", "color_temp"},
          },
      })
      _ = setLightValuesDeclaration
  }
  ```

  {% /tab %}

{% /tabs %}

### Step 2: Call the model with function declarations  {% id="step-2" %}

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Turn the lights down to a romantic level",
      tools=[set_light_values_declaration],
  )
  
  fc_step = next(s for s in interaction.steps if s.type == "function_call")
  print(fc_step)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Turn the lights down to a romantic level',
    tools: [
      {
        type: "function",
        name: "set_light_values",
        description: "Set the brightness and color temperature of a room light.",
        parameters: {
          type: "object",
          properties: {
            brightness: { type: "number", description: "Light level from 0 to 100." },
            color_temp: { type: "string", description: "Color temperature (e.g. daylight, cool_white, warm_white)." },
          },
          required: ["brightness", "color_temp"],
        },
      },
    ],
  });
  
  let fcStep;
  for (const step of interaction.steps || []) {
    if (step.type === 'function_call') {
      fcStep = step;
      break;
    }
  }
  console.log(fcStep);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      setLightValuesDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("set_light_values"),
          Description: genai.Ptr("Sets the brightness and color temperature of a light."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "brightness": map[string]any{
                      "type":        "integer",
                      "description": "Light level from 0 to 100",
                  },
                  "color_temp": map[string]any{
                      "type":        "string",
                      "enum":        []string{"daylight", "cool", "warm"},
                      "description": "Color temperature",
                  },
              },
              "required": []string{"brightness", "color_temp"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Turn the lights down to a romantic level"),
                  Tools: []interactions.Tool{setLightValuesDeclaration},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      var fcStep *interactions.FunctionCallStep
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fcStep = step.FunctionCallStep
              break
          }
      }
      fmt.Println(fcStep)
  }
  ```

  {% /tab %}

{% /tabs %}

The model returns a `function_call` step with `type`, `name`, and `arguments`:

```python
type='function_call'
name='set_light_values'
arguments={'color_temp': 'warm', 'brightness': 25}
```

### Step 3: Execute the function  {% id="step-3" %}

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  fc_step = next(s for s in interaction.steps if s.type == "function_call")
  
  if fc_step.name == "set_light_values":
      result = set_light_values(**fc_step.arguments)
      print(f"Function execution result: {result}")
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  function setLightValues(brightness = 0, color_temp = '') {
    return { brightness: brightness, colorTemperature: color_temp };
  }
  
  let fcStep;
  for (const step of interaction.steps || []) {
    if (step.type === 'function_call') {
      fcStep = step;
      break;
    }
  }
  
  let result;
  if (fcStep?.name === 'set_light_values') {
    result = setLightValues(fcStep.arguments?.brightness, fcStep.arguments?.color_temp);
    console.log(`Function execution result: ${JSON.stringify(result)}`);
  }
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func setLightValues(brightness int, colorTemp string) map[string]any {
      return map[string]any{
          "brightness":       brightness,
          "colorTemperature": colorTemp,
      }
  }
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      setLightValuesDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("set_light_values"),
          Description: genai.Ptr("Sets the brightness and color temperature of a light."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "brightness": map[string]any{
                      "type":        "integer",
                      "description": "Light level from 0 to 100",
                  },
                  "color_temp": map[string]any{
                      "type":        "string",
                      "enum":        []string{"daylight", "cool", "warm"},
                      "description": "Color temperature",
                  },
              },
              "required": []string{"brightness", "color_temp"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Turn the lights down to a romantic level"),
                  Tools: []interactions.Tool{setLightValuesDeclaration},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fcStep := step.FunctionCallStep
              if fcStep.Name == "set_light_values" {
                  brightness := 25
                  if b, ok := fcStep.Arguments["brightness"].(float64); ok {
                      brightness = int(b)
                  }
                  colorTemp := "warm"
                  if c, ok := fcStep.Arguments["color_temp"].(string); ok {
                      colorTemp = c
                  }
                  result := setLightValues(brightness, colorTemp)
                  fmt.Println("Function execution result:", result)
              }
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

### Step 4: Send result back to model  {% id="step-4" %}

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  final_interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {
              "type": "function_result",
              "name": fc_step.name,
              "call_id": fc_step.id,
              "result": [{"type": "text", "text": json.dumps(result)}],
          }
      ],
      tools=[set_light_values_declaration],
      previous_interaction_id=interaction.id,
  )
  
  print(final_interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  const finalInteraction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: [{
      type: 'function_result',
      name: fcStep.name,
      call_id: fcStep.id,
      result: [{ type: 'text', text: JSON.stringify(result) }]
    }],
    tools: [
      {
        type: "function",
        name: "set_light_values",
        description: "Set the brightness and color temperature of a room light.",
        parameters: {
          type: "object",
          properties: {
            brightness: { type: "number", description: "Light level from 0 to 100." },
            color_temp: { type: "string", description: "Color temperature (e.g. daylight, cool_white, warm_white)." },
          },
          required: ["brightness", "color_temp"],
        },
      },
    ],
    previous_interaction_id: interaction.id,
  });
  
  console.log(finalInteraction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      setLightValuesDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("set_light_values"),
          Description: genai.Ptr("Sets the brightness and color temperature of a light."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "brightness": map[string]any{
                      "type":        "integer",
                      "description": "Light level from 0 to 100",
                  },
                  "color_temp": map[string]any{
                      "type":        "string",
                      "enum":        []string{"daylight", "cool", "warm"},
                      "description": "Color temperature",
                  },
              },
              "required": []string{"brightness", "color_temp"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Turn the lights down to a romantic level"),
                  Tools: []interactions.Tool{setLightValuesDeclaration},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      var fcStep *interactions.FunctionCallStep
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fcStep = step.FunctionCallStep
              break
          }
      }
  
      if fcStep != nil {
          resultJson := `{"brightness": 25, "colorTemperature": "warm"}`
          resultStep := interactions.NewStep(interactions.FunctionResultStep{
              Name:   genai.Ptr(fcStep.Name),
              CallID: fcStep.ID,
              Result: interactions.NewFunctionResultStepResultUnion([]interactions.FunctionResultSubcontent{
                  interactions.NewFunctionResultSubcontent(interactions.TextContent{
                      Text: resultJson,
                  }),
              }),
          })
  
          finalResp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
              Body: operations.NewCreateInteractionRequestBody(
                  interactions.CreateModelInteraction{
                      Model:                 interactions.Model("gemini-3.8-flash"),
                      PreviousInteractionID: resp.Interaction.ID,
                      Tools:                 []interactions.Tool{setLightValuesDeclaration},
                      Input:                 interactions.NewInteractionsInput([]interactions.Step{resultStep}),
                  },
              ),
          })
          if err != nil {
              log.Fatal(err)
          }
  
          fmt.Println(finalResp.Interaction.GetOutputText())
      }
  }
  ```

  {% /tab %}

{% /tabs %}

### Stateless function calling  {% id="stateless-function-calling" %}

You can also use function calling in stateless mode by managing the conversation history on the client side and setting `store=false`.

In stateless mode, you must pass the full history of the conversation in the `input` field of each subsequent request. This history must include:

1. The initial `user_input` step.
2. All model-generated steps returned in Turn 1 (including `thought` and `function_call` steps) exactly as received.
3. The `function_result` step containing the output of your executed function.

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  import json
  
  client = genai.Client()
  
  history = [
      {
          "type": "user_input",
          "content": [{"type": "text", "text": "Turn the lights down to a romantic level"}]
      }
  ]
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      store=False,
      input=history,
      tools=[set_light_values_declaration],
  )
  
  for step in interaction.steps:
      history.append(step.model_dump())
  
  fc_step = next(s for s in interaction.steps if s.type == "function_call")
  if fc_step.name == "set_light_values":
      result = set_light_values(**fc_step.arguments)
  
  history.append({
      "type": "function_result",
      "name": fc_step.name,
      "call_id": fc_step.id,
      "result": [{"type": "text", "text": json.dumps(result)}],
  })
  
  final_interaction = client.interactions.create(
      model="gemini-3.8-flash",
      store=False,
      input=history,
      tools=[set_light_values_declaration],
  )
  
  print(final_interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const client = new GoogleGenAI({});
  
  async function main() {
    const history = [
      {
        type: "user_input",
        content: [{ type: "text", text: "Turn the lights down to a romantic level" }]
      }
    ];
  
    const interaction = await client.interactions.create({
      model: "gemini-3.8-flash",
      store: false,
      input: history,
      tools: [setLightValuesTool],
    });
  
    history.push(...interaction.steps);
  
    const fcStep = interaction.steps.find(s => s.type === 'function_call');
    let result;
    if (fcStep.name === 'set_light_values') {
      result = setLightValues(fcStep.arguments.brightness, fcStep.arguments.color_temp);
    }
  
    history.push({
      type: 'function_result',
      name: fcStep.name,
      call_id: fcStep.id,
      result: [{ type: 'text', text: JSON.stringify(result) }]
    });
  
    const finalInteraction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      store: false,
      input: history,
      tools: [setLightValuesTool],
    });
  
    console.log(finalInteraction.output_text);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  # Turn 1: Send request with tools and store: false
  RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "store": false,
      "input": [
        {
          "type": "user_input",
          "content": "Turn the lights down to a romantic level"
        }
      ],
      "tools": [{
        "type": "function",
        "name": "set_light_values",
        "description": "Sets the brightness and color temperature of a light.",
        "parameters": {
          "type": "object",
          "properties": {
            "brightness": {"type": "integer", "description": "Light level from 0 to 100"},
            "color_temp": {"type": "string", "enum": ["daylight", "cool", "warm"]}
          },
          "required": ["brightness", "color_temp"]
        }
      }]
    }')
  
  # Extract model steps (thought, function_call)
  MODEL_STEPS=$(echo "$RESPONSE1" | jq '.steps')
  
  # Extract function call details to execute
  FC_NAME=$(echo "$RESPONSE1" | jq -r '.steps[] | select(.type=="function_call") | .name')
  FC_ID=$(echo "$RESPONSE1" | jq -r '.steps[] | select(.type=="function_call") | .id')
  
  # Assume local execution returns: {"brightness": 25, "colorTemperature": "warm"}
  RESULT="{\"brightness\": 25, \"colorTemperature\": \"warm\"}"
  
  # Reconstruct history for Turn 2
  HISTORY=$(jq -n \
    --argjson first_input '[{"type": "user_input", "content": "Turn the lights down to a romantic level"}]' \
    --argjson model_steps "$MODEL_STEPS" \
    --arg fc_name "$FC_NAME" \
    --arg fc_id "$FC_ID" \
    --arg result "$RESULT" \
    '$first_input + $model_steps + [{"type": "function_result", "name": $fc_name, "call_id": $fc_id, "result": [{"type": "text", "text": $result}]}]')
  
  # Turn 2: Send the full history
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d "{
      \"model\": \"gemini-3.8-flash\",
      \"store\": false,
      \"input\": $HISTORY,
      \"tools\": [{
        \"type\": \"function\",
        \"name\": \"set_light_values\",
        \"description\": \"Sets the brightness and color temperature of a light.\",
        \"parameters\": {
          \"type\": \"object\",
          \"properties\": {
            \"brightness\": {\"type\": \"integer\"},
            \"color_temp\": {\"type\": \"string\"}
          },
          \"required\": [\"brightness\", \"color_temp\"]
        }
      }]
    }"
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      setLightValuesDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("set_light_values"),
          Description: genai.Ptr("Sets the brightness and color temperature of a light."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "brightness": map[string]any{
                      "type":        "integer",
                      "description": "Light level from 0 to 100",
                  },
                  "color_temp": map[string]any{
                      "type":        "string",
                      "enum":        []string{"daylight", "cool", "warm"},
                      "description": "Color temperature",
                  },
              },
              "required": []string{"brightness", "color_temp"},
          },
      })
  
      history := []interactions.Step{
          interactions.NewStep(interactions.UserInputStep{
              Content: []interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: "Turn the lights down to a romantic level",
                  }),
              },
          }),
      }
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Store: genai.Ptr(false),
                  Input: interactions.NewInteractionsInput(history),
                  Tools: []interactions.Tool{setLightValuesDeclaration},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      history = append(history, resp.Interaction.Steps...)
      var fcStep *interactions.FunctionCallStep
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fcStep = step.FunctionCallStep
              break
          }
      }
  
      if fcStep != nil {
          resultJson := `{"brightness": 25, "colorTemperature": "warm"}`
          history = append(history, interactions.NewStep(interactions.FunctionResultStep{
              Name:   genai.Ptr(fcStep.Name),
              CallID: fcStep.ID,
              Result: interactions.NewFunctionResultStepResultUnion([]interactions.FunctionResultSubcontent{
                  interactions.NewFunctionResultSubcontent(interactions.TextContent{
                      Text: resultJson,
                  }),
              }),
          }))
  
          finalResp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
              Body: operations.NewCreateInteractionRequestBody(
                  interactions.CreateModelInteraction{
                      Model: interactions.Model("gemini-3.8-flash"),
                      Store: genai.Ptr(false),
                      Input: interactions.NewInteractionsInput(history),
                      Tools: []interactions.Tool{setLightValuesDeclaration},
                  },
              ),
          })
          if err != nil {
              log.Fatal(err)
          }
  
          fmt.Println(finalResp.Interaction.GetOutputText())
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## Function declarations  {% id="function-declarations" %}

A function declaration is passed as a tool and includes:

* `type` (string): Must be `"function"` for custom functions.
* `name` (string): Unique function name (use underscores or camelCase).
* `description` (string): Clear explanation of the function's purpose.
* `parameters` (object): Input parameters the function expects.  *   `type` (string): Overall data type, such as `object`.
  *   `properties` (object): Individual parameters with type and description.
  *   `required` (array): Mandatory parameter names.


## Function calling with thinking models  {% id="thinking" %}

Gemini 3 series models use an internal ["thinking"](/docs/thinking) process that improves function calling. The SDKs automatically handle [thought signatures](/docs/thought-signatures) for you.

## Parallel function calling  {% id="parallel_function_calling" %}

Call multiple functions at once when they are independent:

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  power_disco_ball = {"type": "function", "name": "power_disco_ball", "description": "Powers the disco ball.",
      "parameters": {"type": "object", "properties": {"power": {"type": "boolean"}}, "required": ["power"]}}
  start_music = {"type": "function", "name": "start_music", "description": "Play music.",
      "parameters": {"type": "object", "properties": {"energetic": {"type": "boolean"}, "loud": {"type": "boolean"}}, "required": ["energetic", "loud"]}}
  dim_lights = {"type": "function", "name": "dim_lights", "description": "Dim the lights.",
      "parameters": {"type": "object", "properties": {"brightness": {"type": "number"}}, "required": ["brightness"]}}
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Turn this place into a party!",
      tools=[power_disco_ball, start_music, dim_lights],
      generation_config={"tool_choice": "any"},
  )
  
  for step in interaction.steps:
      if step.type == "function_call":
          args = ", ".join(f"{key}={val}" for key, val in step.arguments.items())
          print(f"{step.name}({args})")
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  const powerDiscoBall = { type: 'function', name: 'power_disco_ball', description: 'Powers the disco ball.',
    parameters: { type: 'object', properties: { power: { type: 'boolean' } }, required: ['power'] } };
  const startMusic = { type: 'function', name: 'start_music', description: 'Play music.',
    parameters: { type: 'object', properties: { energetic: { type: 'boolean' }, loud: { type: 'boolean' } }, required: ['energetic', 'loud'] } };
  const dimLights = { type: 'function', name: 'dim_lights', description: 'Dim the lights.',
    parameters: { type: 'object', properties: { brightness: { type: 'number' } }, required: ['brightness'] } };
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Turn this place into a party!',
    tools: [powerDiscoBall, startMusic, dimLights],
    generation_config: { tool_choice: 'any' },
  });
  
  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`${step.name}(${JSON.stringify(step.arguments)})`);
    }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Turn this place into a party!",
      "tools": [
        {
          "type": "function",
          "name": "power_disco_ball",
          "description": "Powers the disco ball.",
          "parameters": {
            "type": "object",
            "properties": {
              "power": {"type": "boolean"}
            },
            "required": ["power"]
          }
        },
        {
          "type": "function",
          "name": "start_music",
          "description": "Play music.",
          "parameters": {
            "type": "object",
            "properties": {
              "energetic": {"type": "boolean"},
              "loud": {"type": "boolean"}
            },
            "required": ["energetic", "loud"]
          }
        },
        {
          "type": "function",
          "name": "dim_lights",
          "description": "Dim the lights.",
          "parameters": {
            "type": "object",
            "properties": {
              "brightness": {"type": "number"}
            },
            "required": ["brightness"]
          }
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      powerDiscoBall := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("power_disco_ball"),
          Description: genai.Ptr("Powers the disco ball."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "power": map[string]any{"type": "boolean"},
              },
              "required": []string{"power"},
          },
      })
  
      startMusic := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("start_music"),
          Description: genai.Ptr("Play music."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "energetic": map[string]any{"type": "boolean"},
                  "loud":      map[string]any{"type": "boolean"},
              },
              "required": []string{"energetic", "loud"},
          },
      })
  
      dimLights := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("dim_lights"),
          Description: genai.Ptr("Dim the lights."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "brightness": map[string]any{"type": "number"},
              },
              "required": []string{"brightness"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Turn this place into a party!"),
                  Tools: []interactions.Tool{powerDiscoBall, startMusic, dimLights},
                  GenerationConfig: &interactions.GenerationConfig{
                      ToolChoice: genai.Ptr(interactions.NewToolChoice(interactions.ToolChoiceTypeAny)),
                  },
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fc := step.FunctionCallStep
              fmt.Printf("%s(%v)\n", fc.Name, fc.Arguments)
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## Compositional function calling  {% id="compositional_function_calling" %}

Chain multiple function calls together for complex requests (e.g., get location
first, then get weather for that location).

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  get_weather_forecast_declaration = {
      "type": "function",
      "name": "get_weather_forecast",
      "description": "Gets the current weather temperature for a given location.",
      "parameters": {
          "type": "object",
          "properties": {
              "location": {"type": "string", "description": "The location"},
          },
          "required": ["location"],
      },
  }
  
  set_thermostat_temperature_declaration = {
      "type": "function",
      "name": "set_thermostat_temperature",
      "description": "Sets the thermostat to a desired temperature.",
      "parameters": {
          "type": "object",
          "properties": {
              "temperature": {
                  "type": "integer",
                  "description": "The temperature in Celsius",
              },
          },
          "required": ["temperature"],
      },
  }
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="If it's warmer than 20°C in London, set the thermostat to 20°C, otherwise 18°C.",
      tools=[
          get_weather_forecast_declaration,
          set_thermostat_temperature_declaration,
      ],
  )
  
  for step in interaction.steps:
      if step.type == "function_call":
          print(f"Function to call: {step.name}")
          print(f"Arguments: {step.arguments}")
      elif hasattr(step, "content") and step.content:
           for part in step.content:
               if hasattr(part, "text"):
                   print(part.text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: "If it's warmer than 20°C in London, set the thermostat to 20°C, otherwise 18°C.",
    tools: [
      {
        type: "function",
        name: "get_weather_forecast",
        description: "Get the weather forecast for a given location and number of days.",
        parameters: {
          type: "object",
          properties: {
            location: { type: "string", description: "The city and state, e.g. San Francisco, CA" },
            days: { type: "number", description: "Number of days for the forecast." },
          },
          required: ["location"],
        },
      },
      {
        type: "function",
        name: "set_thermostat_temperature",
        description: "Set the target temperature for the home thermostat.",
        parameters: {
          type: "object",
          properties: {
            temperature: { type: "number", description: "Target temperature in Fahrenheit." },
          },
          required: ["temperature"],
        },
      },
    ],
  });
  
  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`Function to call: ${step.name}`);
      console.log(`Arguments: ${JSON.stringify(step.arguments)}`);
    } else if ('content' in step && Array.isArray(step.content)) {
      for (const part of step.content || []) {
        if ('text' in part && part.text) {
          console.log(part.text);
        }
      }
    }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "If it'\''s warmer than 20°C in London, set the thermostat to 20°C, otherwise 18°C.",
      "tools": [
        {
          "type": "function",
          "name": "get_weather_forecast",
          "description": "Gets the current weather temperature for a given location.",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string"}
            },
            "required": ["location"]
          }
        },
        {
          "type": "function",
          "name": "set_thermostat_temperature",
          "description": "Sets the thermostat to a desired temperature.",
          "parameters": {
            "type": "object",
            "properties": {
              "temperature": {"type": "integer"}
            },
            "required": ["temperature"]
          }
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      getWeatherForecastDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("get_weather_forecast"),
          Description: genai.Ptr("Gets the current weather temperature for a given location."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "location": map[string]any{
                      "type":        "string",
                      "description": "The location",
                  },
              },
              "required": []string{"location"},
          },
      })
  
      setThermostatTemperatureDeclaration := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("set_thermostat_temperature"),
          Description: genai.Ptr("Sets the thermostat to a desired temperature."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "temperature": map[string]any{
                      "type":        "integer",
                      "description": "The temperature in Celsius",
                  },
              },
              "required": []string{"temperature"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("If it's warmer than 20°C in London, set the thermostat to 20°C, otherwise 18°C."),
                  Tools: []interactions.Tool{getWeatherForecastDeclaration, setThermostatTemperatureDeclaration},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fc := step.FunctionCallStep
              fmt.Println("Function to call:", fc.Name)
              fmt.Println("Arguments:", fc.Arguments)
          } else if step.ModelOutputStep != nil {
              for _, part := range step.ModelOutputStep.Content {
                  if part.TextContent != nil {
                      fmt.Println(part.TextContent.Text)
                  }
              }
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## Function calling modes  {% id="function_calling_modes" %}

Control how the model uses tools using `tool_choice` in `generation_config`:

* `auto` (Default): Model decides whether to call a function or respond directly.
* `any`: Model is constrained to always predict a function call.
* `none`: Model is prohibited from making function calls.
* `validated`: Model ensures function schema adherence.

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  generation_config = {
      "tool_choice": {
          "allowed_tools": {
              "mode": "any",
              "tools": ["get_current_temperature"]
          }
      }
  }
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  const generation_config = {
    tool_choice: {
      allowed_tools: {
        mode: 'any',
        tools: ['get_current_temperature']
      }
    }
  };
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "What is the temperature in Boston?",
      "tools": [{
        "type": "function",
        "name": "get_current_temperature",
        "description": "Gets the current temperature for a given location.",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string"}
          },
          "required": ["location"]
        }
      }],
      "generation_config": {
        "tool_choice": {
          "allowed_tools": {
            "mode": "any",
            "tools": ["get_current_temperature"]
          }
        }
      }
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
  )
  
  func main() {
      generationConfig := interactions.GenerationConfig{
          ToolChoice: genai.Ptr(interactions.NewToolChoice(interactions.ToolChoiceConfig{
              AllowedTools: &interactions.AllowedTools{
                  Mode:  interactions.ToolChoiceTypeAny.ToPointer(),
                  Tools: []string{"get_current_temperature"},
              },
          })),
      }
      _ = generationConfig
  }
  ```

  {% /tab %}

{% /tabs %}

## Multi-tool use  {% id="native-tools" %}

You can enable multiple tools, combining built-in tools with function calling in
the same request. Gemini 4 and Gemini 3 models can combine built-in tools with function
calling out-of-the-box in Interactions. Passing `previous_interaction_id`
automatically circulates the built-in tool context.

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  import json
  
  client = genai.Client()
  
  get_weather = {
      "type": "function",
      "name": "get_weather",
      "description": "Gets the weather for a requested city.",
      "parameters": {
          "type": "object",
          "properties": {
              "city": {
                  "type": "string",
                  "description": "The city and state, e.g. Utqiaġvik, Alaska",
              },
          },
          "required": ["city"],
      },
  }
  
  tools = [
      {"type": "google_search"},
      get_weather
  ]
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="What is the northernmost city in the United States? What's the weather like there today?",
      tools=tools
  )
  
  for step in interaction.steps:
      if step.type == "function_call":
          print(f"Function call: {step.name} (ID: {step.id})")
          result = {"response": "Very cold. 22 degrees Fahrenheit."}
          interaction_2 = client.interactions.create(
              model="gemini-3.8-flash",
              previous_interaction_id=interaction.id,
              tools=tools,
              input=[{
                  "type": "function_result",
                  "name": step.name,
                  "call_id": step.id,
                  "result": [{"type": "text", "text": json.dumps(result)}]
              }]
          )
  
          print(interaction_2.output_text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const weatherTool = {
    type: 'function',
    name: 'get_weather',
    description: 'Gets the weather for a given location.',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g. San Francisco, CA',
        },
      },
      required: ['location'],
    },
  };
  
  const tools = [
    { type: 'google_search' }, // Built-in tool
    weatherTool,
  ];
  
  const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: "What is the northernmost city in the United States? What's the weather like there today?",
    tools: tools,
  });
  
  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`Function call: ${step.name} (ID: ${step.id})`);
      const result = { response: 'Very cold. 22 degrees Fahrenheit.' };
      const interaction_2 = await client.interactions.create({
        model: 'gemini-3.8-flash',
        previous_interaction_id: interaction.id,
        tools: tools,
        input: [
          {
            type: 'function_result',
            name: step.name,
            call_id: step.id,
            result: [{ type: 'text', text: JSON.stringify(result) }],
          },
        ],
      });
  
      console.log(interaction_2.output_text);
    }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  # Turn 1: Send request with built-in google_search tool and custom weather tool
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "What is the northernmost city in the United States? What'\''s the weather like there today?",
      "tools": [
        {"type": "google_search"},
        {
          "type": "function",
          "name": "get_weather",
          "description": "Gets the weather for a given location.",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string", "description": "The city and state, e.g. San Francisco, CA"}
            },
            "required": ["location"]
          }
        }
      ]
    }'
  
  # Turn 2: Provide function result and pass previous_interaction_id
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "previous_interaction_id": "INTERACTION_ID",
      "tools": [
        {"type": "google_search"},
        {
          "type": "function",
          "name": "get_weather",
          "description": "Gets the weather for a given location.",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string", "description": "The city and state, e.g. San Francisco, CA"}
            },
            "required": ["location"]
          }
        }
      ],
      "input": [
        {
          "type": "function_result",
          "name": "get_weather",
          "call_id": "call_123",
          "result": [{"type": "text", "text": "{\"response\": \"Very cold. 22 degrees Fahrenheit.\"}"}]
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      getWeather := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("get_weather"),
          Description: genai.Ptr("Gets the weather for a requested city."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "city": map[string]any{
                      "type":        "string",
                      "description": "The city and state, e.g. Utqiaġvik, Alaska",
                  },
              },
              "required": []string{"city"},
          },
      })
  
      tools := []interactions.Tool{
          interactions.NewTool(interactions.GoogleSearch{}),
          getWeather,
      }
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("What is the northernmost city in the United States? What's the weather like there today?"),
                  Tools: tools,
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              fcStep := step.FunctionCallStep
              fmt.Printf("Function call: %s (ID: %s)\n", fcStep.Name, fcStep.ID)
              resultJson := `{"response": "Very cold. 22 degrees Fahrenheit."}`
  
              resultStep := interactions.NewStep(interactions.FunctionResultStep{
                  Name:   genai.Ptr(fcStep.Name),
                  CallID: fcStep.ID,
                  Result: interactions.NewFunctionResultStepResultUnion([]interactions.FunctionResultSubcontent{
                      interactions.NewFunctionResultSubcontent(interactions.TextContent{
                          Text: resultJson,
                      }),
                  }),
              })
  
              resp2, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
                  Body: operations.NewCreateInteractionRequestBody(
                      interactions.CreateModelInteraction{
                          Model:                 interactions.Model("gemini-3.8-flash"),
                          PreviousInteractionID: resp.Interaction.ID,
                          Tools:                 tools,
                          Input:                 interactions.NewInteractionsInput([]interactions.Step{resultStep}),
                      },
                  ),
              })
              if err != nil {
                  log.Fatal(err)
              }
  
              fmt.Println(resp2.Interaction.GetOutputText())
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## Multimodal function responses  {% id="multimodal" %}

For Gemini 3 series models, you can include multimodal content in
the function response parts that you send to the model. The model can process
this multimodal content in its next turn to produce a more informed response.

To include multimodal data in a function response, include it as one or more content blocks in the `result` field of the `function_result` step. Each content block must specify its `type`. The following types are supported:

* **`text`**
* **`image`**: `image/png`, `image/jpeg`, `image/webp`
* **`document`**: `application/pdf`, `text/csv`, and
  [Office and OpenDocument files](/docs/document-processing#office-documents)
  (DOCX, DOC, DOTX, ODT, PPTX, PPT, ODP, XLSX, XLS, ODS)
* **`audio`**: [Supported audio formats](/docs/audio#supported-formats)
* **`video`**: [Supported video formats](/docs/video-understanding#supported-formats)
  (available in `v1beta` and `v1alpha`)

Each media block accepts either base64-encoded `data` or a `uri`, such as a
[Files API](/docs/files) URI. Files in function results are processed the same
way as the same file in a regular input. See
[Return files by URI](/docs/function-calling#file-uri) for an example.

If a block uses an unsupported MIME type, the API returns a `400
INVALID_ARGUMENT` error that names the field and lists the accepted types.

The following example shows how to send a function response containing image data back to the model in an interaction:

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  import base64
  from google import genai
  import requests
  
  client = genai.Client()
  
  tool_call = next(s for s in interaction.steps if s.type == "function_call")
  
  image_path = "https://goo.gle/instrument-img"
  image_bytes = requests.get(image_path).content
  
  base64_image_data = base64.b64encode(image_bytes).decode("utf-8")
  
  final_interaction = client.interactions.create(
      model="gemini-3.8-flash",
      previous_interaction_id=interaction.id,
      input=[
          {
              "type": "function_result",
              "name": tool_call.name,
              "call_id": tool_call.id,
              "result": [
                  {"type": "text", "text": "instrument.jpg"},
                  {
                      "type": "image",
                      "mime_type": "image/jpeg",
                      "data": base64_image_data,
                  },
              ],
          }
      ],
  )
  
  print(final_interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const client = new GoogleGenAI({});
  
  let toolCall;
  for (const s of interaction.steps || []) {
    if (s.type === 'function_call') {
      toolCall = s;
      break;
    }
  }
  
  const base64ImageData = "BASE64_IMAGE_DATA";
  
  const finalInteraction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      previous_interaction_id: interaction.id,
      input: [{
          type: 'function_result',
          name: (toolCall && toolCall.type === 'function_call' ? toolCall.name : ''),
          call_id: (toolCall && toolCall.type === 'function_call' ? toolCall.id : ''),
          result: [
              { type: 'text', text: 'instrument.jpg' },
              {
                  type: 'image',
                  mime_type: 'image/jpeg',
                  data: base64ImageData,
              }
          ]
      }]
  });
  
  console.log(finalInteraction.output_text);
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "previous_interaction_id": "INTERACTION_ID",
      "input": [
        {
          "type": "function_result",
          "name": "get_image",
          "call_id": "call_123",
          "result": [
            {"type": "text", "text": "instrument.jpg"},
            {
              "type": "image",
              "mime_type": "image/jpeg",
              "data": "BASE64_IMAGE_DATA"
            }
          ]
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      getInstrumentImage := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("get_instrument_image"),
          Description: genai.Ptr("Gets an image of an instrument."),
          Parameters: map[string]any{
              "type": "object",
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Show me the instrument."),
                  Tools: []interactions.Tool{getInstrumentImage},
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      var toolCall *interactions.FunctionCallStep
      for _, step := range resp.Interaction.Steps {
          if step.FunctionCallStep != nil {
              toolCall = step.FunctionCallStep
              break
          }
      }
  
      if toolCall != nil {
          base64ImageData := "BASE64_IMAGE_DATA"
  
          resultStep := interactions.NewStep(interactions.FunctionResultStep{
              Name:   genai.Ptr(toolCall.Name),
              CallID: toolCall.ID,
              Result: interactions.NewFunctionResultStepResultUnion([]interactions.FunctionResultSubcontent{
                  interactions.NewFunctionResultSubcontent(interactions.TextContent{
                      Text: "instrument.jpg",
                  }),
                  interactions.NewFunctionResultSubcontent(interactions.ImageContent{
                      MimeType: interactions.ImageContentMimeTypeImageJpeg.ToPointer(),
                      Data:     genai.Ptr(base64ImageData),
                  }),
              }),
          })
  
          finalResp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
              Body: operations.NewCreateInteractionRequestBody(
                  interactions.CreateModelInteraction{
                      Model:                 interactions.Model("gemini-3.8-flash"),
                      PreviousInteractionID: resp.Interaction.ID,
                      Input:                 interactions.NewInteractionsInput([]interactions.Step{resultStep}),
                  },
              ),
          })
          if err != nil {
              log.Fatal(err)
          }
  
          fmt.Println(finalResp.Interaction.GetOutputText())
      }
  }
  ```

  {% /tab %}

{% /tabs %}

### Return files by URI  {% id="file-uri" %}

Inline data counts toward the request size limit. For large files, such as
videos, long audio, or multi-page documents, upload the file with the
[Files API](/docs/files) and return its `uri` instead of inline `data`.

The following example shows a `view_file` tool that returns an Excel
spreadsheet and a video by their Files API URIs. For `video` blocks, you can set
`processing` to `"static"` or `"agentic"`. If you don't set it, the same default
applies as for an input video. For details, see
[Agentic video understanding](/docs/video-understanding#agentic-video-understanding).

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  tool_call = next(s for s in interaction.steps if s.type == "function_call")
  
  # Your tool uploads the files and returns their URIs.
  sheet = client.files.upload(
      file="q3_sales.xlsx",
      config={"mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
  )
  clip = client.files.upload(file="store_walkthrough.mp4")
  
  final_interaction = client.interactions.create(
      model="gemini-3.8-flash",
      previous_interaction_id=interaction.id,
      input=[
          {
              "type": "function_result",
              "name": tool_call.name,
              "call_id": tool_call.id,
              "result": [
                  {"type": "text", "text": "{\"status\": \"ok\"}"},
                  {
                      "type": "document",
                      "uri": sheet.uri,
                      "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  },
                  {
                      "type": "video",
                      "uri": clip.uri,
                      "mime_type": "video/mp4",
                      "processing": "agentic",
                  },
              ],
          }
      ],
  )
  
  print(final_interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const client = new GoogleGenAI({});
  
  const toolCall = interaction.steps.find(s => s.type === 'function_call');
  
  // Your tool uploads the files and returns their URIs.
  const sheet = await client.files.upload({
      file: 'q3_sales.xlsx',
      config: { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  });
  const clip = await client.files.upload({ file: 'store_walkthrough.mp4' });
  
  const finalInteraction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      previous_interaction_id: interaction.id,
      input: [{
          type: 'function_result',
          name: toolCall.name,
          call_id: toolCall.id,
          result: [
              { type: 'text', text: '{"status": "ok"}' },
              {
                  type: 'document',
                  uri: sheet.uri,
                  mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              },
              {
                  type: 'video',
                  uri: clip.uri,
                  mime_type: 'video/mp4',
                  processing: 'agentic',
              }
          ]
      }]
  });
  
  console.log(finalInteraction.output_text);
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "previous_interaction_id": "INTERACTION_ID",
      "input": [
        {
          "type": "function_result",
          "name": "view_file",
          "call_id": "call_123",
          "result": [
            {"type": "text", "text": "{\"status\": \"ok\"}"},
            {
              "type": "document",
              "uri": "https://generativelanguage.googleapis.com/v1beta/files/SHEET_FILE_ID",
              "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            },
            {
              "type": "video",
              "uri": "https://generativelanguage.googleapis.com/v1beta/files/VIDEO_FILE_ID",
              "mime_type": "video/mp4",
              "processing": "agentic"
            }
          ]
        }
      ]
    }'
  ```

  {% /tab %}

{% /tabs %}

## Function calling with Structured output  {% id="structured-output" %}

For Gemini 3 series models, combine function calling with
[structured output](/docs/structured-output) for
consistently formatted responses.

## Remote MCP (Model Context Protocol)  {% id="mcp" %}

Interactions API supports connecting to remote MCP servers to give the model access to external tools and services. You provide the server `name` and `url` in the tools configuration.

When using Remote MCP, be aware of the following constraints:

* **Server types**: Remote MCP only works with Streamable HTTP servers. SSE (Server-Sent Events) servers are not supported.
* **Naming**: MCP server names should not include the `-` character. Use `snake_case` server names instead.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | Yes | Must be `"mcp_server"`. |
| `name` | `string` | No | A display name for the MCP server. |
| `url` | `string` | No | The full URL for the MCP server endpoint. |
| `headers` | `object` | No | Key-value pairs sent as HTTP headers with every request to the server (for example, authentication tokens). |
| `allowed_tools` | `array` | No | Restrict which tools from the server the agent may call. |

### Example

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Check the weather in San Francisco.",
      tools=[
          {
              "type": "mcp_server",
              "name": "weather",
              "url": "https://gemini-api-demos.uc.r.appspot.com/mcp",
          }
      ]
  )
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      input: 'Check the weather in San Francisco.',
      tools: [
          {
              type: 'mcp_server',
              name: 'weather',
              url: 'https://gemini-api-demos.uc.r.appspot.com/mcp'
          }
      ]
  });
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
      "model": "gemini-3.8-flash",
      "input": "Check the weather in San Francisco.",
      "tools": [
          {
              "type": "mcp_server",
              "name": "weather",
              "url": "https://gemini-api-demos.uc.r.appspot.com/mcp"
          }
      ]
  }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model: interactions.Model("gemini-3.8-flash"),
                  Input: interactions.NewInteractionsInput("Check the weather in San Francisco."),
                  Tools: []interactions.Tool{
                      interactions.NewTool(interactions.MCPServer{
                          Name: genai.Ptr("weather"),
                          URL:  genai.Ptr("https://gemini-api-demos.uc.r.appspot.com/mcp"),
                      }),
                  },
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
      _ = resp
  }
  ```

  {% /tab %}

{% /tabs %}

## Stream tool calls  {% id="streaming-tool-calls" %}

When using tools with streaming, the model generates function calls as a
sequence of `step.delta` events on the stream. Tool arguments can be streamed
as partial arguments using `arguments`. You must aggregate these deltas to
reconstruct the complete tool calls before executing them.

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  import json
  from google import genai
  
  client = genai.Client()
  
  weather_tool = {
      "type": "function",
      "name": "get_weather",
      "description": "Gets the weather for a given location.",
      "parameters": {
          "type": "object",
          "properties": {
              "location": {"type": "string", "description": "The city and state"}
          },
          "required": ["location"]
      }
  }
  
  stream = client.interactions.create(
      model="gemini-3.8-flash",
      input="What is the weather in Paris?",
      tools=[weather_tool],
      stream=True
  )
  
  current_calls = {}
  tool_calls = []
  
  for event in stream:
      if event.event_type == "step.start":
          if event.step.type == "function_call":
              current_calls[event.index] = {
                  "id": event.step.id,
                  "name": event.step.name,
                  "arguments": ""
              }
              if hasattr(event.step, "arguments") and event.step.arguments:
                  if isinstance(event.step.arguments, dict):
                      current_calls[event.index]["arguments"] = json.dumps(event.step.arguments)
                  else:
                      current_calls[event.index]["arguments"] = event.step.arguments
      elif event.event_type == "step.delta":
          if event.delta.type == "arguments":
              if event.index in current_calls:
                  current_calls[event.index]["arguments"] += event.delta.partial_arguments
          elif event.delta.type == "text":
              print(event.delta.text, end="", flush=True)
  
      elif event.event_type == "interaction.completed":
          for index, call in current_calls.items():
              args = call["arguments"]
              if args:
                  args = json.loads(args)
              else:
                  args = {}
  
              tool_calls.append({
                  "type": "function_call",
                  "id": call["id"],
                  "name": call["name"],
                  "arguments": args
              })
  
          print(f"\nFinal tool calls ready to execute:")
          print(json.dumps(tool_calls, indent=2))
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from '@google/genai';
  
  const client = new GoogleGenAI({});
  
  const stream = await client.interactions.create({
      model: 'gemini-3.8-flash',
      input: 'What is the weather in Paris?',
      tools: [
          {
              type: 'function',
              name: 'get_weather',
              description: 'Gets the weather for a given location.',
              parameters: {
                  type: 'object',
                  properties: {
                      location: { type: 'string', description: 'The city and state' }
                  },
                  required: ['location']
              }
          }
      ],
      stream: true,
  });
  
  const currentCalls = [];
  let toolCalls = [];
  
  for await (const event of stream) {
      const evType = event.event_type;
      if (evType === 'step.start') {
          if (event.step.type === 'function_call') {
              currentCalls[event.index] = {
                  id: event.step.id,
                  name: event.step.name,
                  arguments: ''
              };
              if (event.step.arguments) {
                  if (typeof event.step.arguments === 'object') {
                      currentCalls[event.index].arguments = JSON.stringify(event.step.arguments);
                  } else {
                      currentCalls[event.index].arguments = event.step.arguments;
                  }
              }
          }
      } else if (evType === 'step.delta') {
          if (event.delta.type === 'arguments_delta') {
              if (currentCalls[event.index]) {
                  currentCalls[event.index].arguments += event.delta.arguments ?? '';
              }
          } else if (event.delta.type === 'text') {
              process.stdout.write(event.delta.text ?? '');
          }
      } else if (evType === 'step.stop') {
          toolCalls = currentCalls.map((call) => ({
              type: 'function_call',
              id: call.id,
              name: call.name,
              arguments: call.arguments ? JSON.parse(call.arguments) : {}
          }));
          console.log('\nFinal tool calls ready to execute:');
          console.log(JSON.stringify(toolCalls, null, 2));
      }
  }
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
      "model": "gemini-3.8-flash",
      "input": "What is the weather in Paris?",
      "tools": [{
          "type": "function",
          "name": "get_weather",
          "description": "Gets the weather for a given location.",
          "parameters": {
              "type": "object",
              "properties": {
                  "location": {"type": "string", "description": "The city and state"}
              },
              "required": ["location"]
          }
      }],
      "stream": true
  }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  
  Function function = Function.builder()
      .name("custom_function")
      .description("A custom function.")
      .parameters(parameters)
      .build();
  
  CreateModelInteraction params = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Call the function."))
      .tools(Arrays.asList(function))
      .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.steps().isPresent()) {
    for (Step step : interaction.steps().get()) {
      if (step instanceof FunctionCallStep) {
        FunctionCallStep fc = (FunctionCallStep) step;
        System.out.println("Function: " + fc.name().orElse(""));
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
      "strings"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  type callState struct {
      id        string
      name      string
      arguments *strings.Builder
  }
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      weatherTool := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("get_weather"),
          Description: genai.Ptr("Gets the weather for a given location."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "location": map[string]any{
                      "type":        "string",
                      "description": "The city and state",
                  },
              },
              "required": []string{"location"},
          },
      })
  
      resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(
              interactions.CreateModelInteraction{
                  Model:  interactions.Model("gemini-3.8-flash"),
                  Input:  interactions.NewInteractionsInput("What is the weather in Paris?"),
                  Tools:  []interactions.Tool{weatherTool},
                  Stream: genai.Ptr(true),
              },
          ),
      })
      if err != nil {
          log.Fatal(err)
      }
      defer resp.InteractionSSEStreamEvent.Close()
  
      currentCalls := make(map[int]*callState)
      var toolCalls []map[string]any
  
      for resp.InteractionSSEStreamEvent.Next() {
          event := resp.InteractionSSEStreamEvent.Value()
          if stepStart := event.GetDataStepStart(); stepStart != nil {
              if fcStep := stepStart.GetStepFunctionCall(); fcStep != nil {
                  idx := stepStart.Index
                  builder := &strings.Builder{}
                  if len(fcStep.Arguments) > 0 {
                      builder.WriteString(fmt.Sprint(fcStep.Arguments))
                  }
                  currentCalls[idx] = &callState{
                      id:        fcStep.ID,
                      name:      fcStep.Name,
                      arguments: builder,
                  }
              }
          } else if stepDelta := event.GetDataStepDelta(); stepDelta != nil {
              idx := stepDelta.Index
              if argsDelta := stepDelta.GetDeltaArgumentsDelta(); argsDelta != nil {
                  if argsDelta.Arguments != nil {
                      if call, ok := currentCalls[idx]; ok {
                          call.arguments.WriteString(*argsDelta.Arguments)
                      }
                  }
              } else if textDelta := stepDelta.GetDeltaText(); textDelta != nil {
                  fmt.Print(textDelta.GetText())
              }
          } else if completed := event.GetDataInteractionCompleted(); completed != nil {
              for _, call := range currentCalls {
                  toolCalls = append(toolCalls, map[string]any{
                      "type":      "function_call",
                      "id":        call.id,
                      "name":      call.name,
                      "arguments": call.arguments.String(),
                  })
              }
              fmt.Println("\nFinal tool calls ready to execute:")
              fmt.Println(toolCalls)
          }
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## Best practices  {% id="best-practices" %}

* **Function and Parameter Descriptions:** Be clear and specific.
* **Naming:** Use descriptive names without spaces or special characters.
* **Strong Typing:** Use specific types (integer, string, enum).
* **Tool Selection:** Keep active set to 10-20 tools maximum.
* **Prompt Engineering:** Provide context and instructions.
* **Validation:** Validate function calls before executing.
* **Error Handling:** Implement robust error handling.
* **Security:** Use appropriate authentication for external APIs.

## Workarounds for pre-tool text requirements  {% id="workarounds-for-pre-tool-text-requirements" %}

**Issue:** If your prompt requires the model to output structured text (XML, YAML, JSON, etc.) (e.g., `<UPDATE>...</UPDATE>`) immediately before making a tool call, the tool call may occasionally fail with `Malformed_Function_Call`.

**Solutions:** The following workarounds resolve this issue:

* **PREFERRED:** Instruct the model to put its pre-tool notes inside a dedicated `update()` function call instead of raw text (details below).
* Instruct the model to write notes as Markdown headers (`# UPDATE`, `## PLAN`) instead of structured text.
* Do not require the model to output text before tool calls.

### Preferred workaround: Wrap working notes in a dedicated function call  {% id="preferred-workaround" %}

Instead of the original instruction:

```html
Before calling a tool, in every response you MUST first output a single `<UPDATE>` part as specified, don't skip this part or any of required sub-tags within `<UPDATE>`.
```

Use this updated instruction:

```html
Before calling any other tool, in every response you MUST first call `update` with all required parameters (previous_step, plan, next_step, external).
```

And update all references to the old `<UPDATE>` XML format in the customer request. Then add the corresponding function declaration for the update function:

```json
{
  "name": "update",
  "description": "Update working notes (previous step analysis, plan, next step, external note).",
  "parameters": {
    "type": "OBJECT",
    "properties": {
      "previous_step": {
        "type": "STRING",
        "description": "Key findings and outcomes since the previous step."
      },
      "plan": {
        "type": "STRING",
        "description": "The current status of the plan."
      },
      "next_step": {
        "type": "STRING",
        "description": "Brief explanation of the immediate next action according to the plan."
      },
      "external": {
        "type": "STRING",
        "description": "A short, plain-language note shown to the User about what you are ABOUT TO DO next."
      }
    },
    "required": [
      "previous_step",
      "plan",
      "next_step",
      "external"
    ]
  }
}
```

Then the model will make two calls in the same step: the `update()` call that replaces the structured XML, and the actual function call it wants to make.

## Notes and limitations  {% id="limitations" %}

* Only a [subset of the OpenAPI schema](/api-reference/generate-content#Resource:Tool) is supported.
* For `any` mode, very large or deeply nested schemas may be rejected.
* Supported parameter types in Python are limited.

### Simplifying complex function schemas  {% id="simplifying-complex-schemas" %}

When you use `any` mode or define complex parameter schemas, the API compiles
your function declarations into a state machine that constrains token
generation. This state machine enforces limits on total states, branching
paths, and nesting depth. If the combined complexity of your tools exceeds
these limits, the API rejects the request with a `400 INVALID_ARGUMENT` error.

To fix schema rejection errors, reduce the structural depth and branching
factor of your declarations. You can simplify complex function schemas in
several ways:

* **Split large tool sets and move rules to descriptions:** Constrained
  decoding evaluates all declared tools together. Limit the number of functions
  in a single request and split monolithic functions into smaller, focused
  tools. Move complex formatting rules into field `description` properties or
  system instructions, which guide the model without expanding the grammar.
* **Flatten nested objects and bound recursion:** Replace deeply nested object
  hierarchies with flatter structures. If you use `$defs` and `$ref` for
  recursive types, make the recursive reference optional or nullable. Avoid
  recursing through required properties or arrays with `minItems` greater than
  zero.
* **Reduce branching from optional fields, enums, and unions:** Optional
  properties, `enum` values, and `anyOf` branches multiply the branching paths
  in the output grammar. Mark properties as `required` where possible and allow
  `null` values when a field can be empty. Trim large `enum` lists and simplify
  `anyOf` unions, or include the constraint in your prompt (for example, with a
  Pydantic schema) as a softer restriction.
* **Shorten property names and drop array bounds:** Property keys consume
  states proportional to their character length. Array bounds such as
  `minItems` and `maxItems` also duplicate the item schema for each counted
  position. Use concise property names, remove unused fields, and either
  include array bounds in your prompt (for example, with a Pydantic schema) as
  a softer restriction or check array lengths in your application code.

