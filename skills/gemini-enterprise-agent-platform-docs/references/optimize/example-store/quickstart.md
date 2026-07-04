## Before you begin

To complete the steps demonstrated in this tutorial, you must first set up
your project and environment.

### Set up your project

1. If you selected a project, ensure that you have the Agent Platform user (`roles/aiplatform.user`) IAM role on the project.

### Authenticate to Agent Platform

To use the Python samples on this page in a local development environment, install and
initialize the gcloud CLI, and then set up Application Default Credentials with
your user credentials.

Install the Google Cloud CLI.

1. If you're using an external identity provider (IdP), you must first
sign in to the gcloud CLI with your federated identity.

If you're using a local shell, then create local authentication credentials for your user
account:

```bash
gcloud auth application-default login

```

You don't need to do this if you're using Cloud Shell.

If an authentication error is returned, and you are using an external identity provider
(IdP), confirm that you have
signed in to the gcloud CLI with your federated identity.

For more information, see
Set up ADC for a local development environment
in the Google Cloud authentication documentation.

### Import libraries

1. Run the following command to install the Agent Platform SDK for Example Store.

pip install --upgrade google-cloud-aiplatform>=1.87.0

1. Use the following code sample to import and initialize the SDK for Example Store.

import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
from vertexai.preview import example_stores

https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(
project="PROJECT_ID",
location="LOCATION"
)

Replace the following:

- PROJECT_ID: Your project ID.
- LOCATION: Your region. Only `us-central1` is supported.

## Create an Example Store instance

Use the following code sample to create an Example Store instance that uses the
`text-embedding-005` embedding model.

example_store = example_stores.ExampleStore.create(
example_store_config=example_stores.ExampleStoreConfig(
vertex_embedding_model="text-embedding-005"

Note that creating an Example Store takes a few minutes.

For more information about creating or reusing Example Store instances,
see Create an Example Store instance.

## Upload examples to the Example Store instance

Perform the following steps to author and upload examples to the Example Store
instance. You can upload a maximum of five examples per request.

1. Define the `get_current_weather` function tool. The examples you create in
the subsequent steps will guide the model on when to invoke this function and
what arguments to pass to it.

For more information about how examples can improve function calling
performance and model responses, see
Use examples to improve function calling performance.
For more information about how to create a function calling application, see
Introduction to function calling.

from google.genai import types as genai_types

get_current_weather_func = genai_types.FunctionDeclaration(
name="get_current_weather",
description="Get the current weather in a given location",
parameters={
"type": "object",
"properties": {
"location": {
"type": "string",
"description": "The city name of the location for which to get the weather."
}
},

1. Send a request to Gemini to generate content using the
`get_current_weather` function.

See Create a client
for the Gen AI SDK.

from google import genai

client = genai.Client(
http_options=genai_types.HttpOptions(api_version="v1"),
vertexai=True,
location="LOCATION")

user_content = genai_types.Content(
role="user",
parts=[genai_types.Part(text="What is the weather like in Boston?")],
response = client.models.generate_content(
model="gemini-2.0-flash",
user_content,
config=genai_types.GenerateContentConfig(
tools=[
genai_types.Tool(function_declarations=[get_current_weather_func])]

1. Do any one of the following to create and upload an example.

- If the response from the LLM shows the expected behavior, use the
following code sample to author an example based on the response and upload
it to Example Store.

function_response = genai_types.Content(
parts=[
genai_types.Part(
function_response={
"name": "get_current_weather",
"response": {
"location": "New York, NY", "temperature": 38,
"description": "Partly Cloudy",
"icon": "partly-cloudy", "humidity": 65,
"wind": { "speed": 10, "direction": "NW" }
]
final_model_response = genai_types.Content(
role="model",
parts=[genai_types.Part(text="The weather in NYC is 38 degrees and partly cloudy.")],
example = {
"contents_example": {
"contents": [user_content.to_json_dict()],
"expected_contents": [
{"content": response.candidates[0].content.to_json_dict()},
{"content": function_response.to_json_dict()},
{"content": final_model_response.to_json_dict()},
],
"search_key": user_content.parts[0].text,
example_store.upsert_examples(examples=[example])

- Alternatively, if the response doesn't cover all the functions or outcomes
you expected or you see the model struggling with reasoning, use the following
code sample to author a response to correct model behavior.

expected_function_call = genai_types.Content(
function_call={
"args": {"location": "New York, NY"}
parts=[genai_types.Part(text="The weather in NYC is 38 degrees and partly cloudy.")],
{"content": expected_function_call.to_json_dict()},

1. Repeat steps 2 and 3 to author and upload multiple examples, as required.
You can upload additional examples if the model shows unexpected behavior or
the uploaded examples don't cover all the functions, outcomes, or reasoning
that you expect. For more information about when you need to upload additional
examples, see Upload examples.

## Retrieve and use examples with Gemini

Search for examples based on their similarity with
your prompt. You can then include these examples in your prompt to
guide the LLM towards the expected behavior.

### Define helper functions to format examples

Use the following code sample to define a `ExampleStorePrompt` class and helper
functions that let you search and fetch examples.

import abc
import jinja2
import json

from google.protobuf import json_format

# --BOILERPLATE CODE FOR FORMATTING--

EXAMPLES_PREAMBLE = """
The following are examples of user queries and model responses using the available python libraries.

Begin few-shot
"""

EXAMPLES_POSTAMBLE = """
End few-shot

Now, try to follow these examples and complete the following conversation:

EXAMPLE_PREAMBLE = "EXAMPLE"

TEMPLATE = """

class ExampleStorePrompt:

def init(
self, template = TEMPLATE, example_preamble = EXAMPLE_PREAMBLE,
examples_preamble = EXAMPLES_PREAMBLE,
examples_postamble = EXAMPLES_POSTAMBLE):

self.template = jinja2.Template(template)
self.example_preamble = example_preamble
self.examples_preamble = examples_preamble
self.examples_postamble = examples_postamble

@abc.abstractmethod
def process_function_response(self, function_response):
return json.dumps(function_response)

def process_function_call(self, function_call):
args_list = []
for key, value in function_call.get("args", []).items():
if isinstance(value, str):

# Wrap strings in quotes.

value = f'"{value}"'
if isinstance(value, list):
value = ', '.join(
f'"{item}"' if isinstance(item, str)
else str(item) for item in value)
value = f"[{value}]"
if isinstance(value, dict):
value = json.dumps(value)
args_list.append(f'{key}={value}')
args = ", ".join(args_list)
return f"`\n{function_call.get('name')}({args})\n`"

def process_part(self, part):
if "function_call" in part:
return self.process_function_call(part["function_call"])
if "text" in part:
return part.get("text")
if "function_response" in part:
return self.process_function_response(part["function_response"])

def process_content(self, content):
response = []
for part in content.get("parts", []):
response.append(self.process_part(part))
return [content.get("role"), response]

def example_formatter(self, example: dict):
for content in example.get("contents", []):
response.append(self.process_content(content))
for content in example.get("expected_contents", []):
content = content.get("content", {})
return response

def get_prompt(self, examples: list):
if not examples:
return ""
examples = [self.example_formatter(example) for example in examples]
return self.template.render(
examples=examples,
example_preamble=self.example_preamble,
examples_preamble=self.examples_preamble,
examples_postamble=self.examples_postamble

### Search for relevant examples

Use the following code sample to search for examples that are
relevant to the ongoing conversation with the LLM. You can then use the
helper functions to include these examples in your prompts.

query = "what's the fastest way to get to disney from lax"

# Search for relevant examples.

examples = example_store.search_examples(
{"stored_contents_example_key": query}, top_k=3)

prompt = ExampleStorePrompt().get_prompt(examples.get("results", []))

model_response = client.models.generate_content(
contents="How do I get to LAX?",
system_instruction=prompt,

## Iteratively improve response quality

To improve the response patterns of Gemini using few-shot examples,
repeat the steps in the following sections:

1. Author and upload examples to the Example Store instance.
2. Retrieve and use examples with Gemini

## Clean up

To clean up all resources used in this project, you can
delete the Google Cloud project
you used for the quickstart.

Otherwise, you can delete the individual resources you created in this tutorial,
as follows:

1. Use the following code sample to delete the Example Store instance.

example_store.delete()

1. Delete any locally created files.

## What's next

- Learn how to create an Example Store instance.
