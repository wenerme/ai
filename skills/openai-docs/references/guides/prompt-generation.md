# Prompt generation

import {
  FUNCTION_META_SCHEMA,
  FUNCTION_META_SCHEMA_PROMPT,
  GENERAL_META_PROMPT,
  GENERAL_META_PROMPT_EDIT,
  META_SCHEMA,
  META_SCHEMA_PROMPT,
  REALTIME_META_PROMPT,
  REALTIME_META_PROMPT_EDIT,
} from "./prompts";

The **Generate** button in the [Playground](https://platform.openai.com/chat/edit) lets you generate prompts, [functions](https://developers.openai.com/api/docs/guides/function-calling), and [schemas](https://developers.openai.com/api/docs/guides/structured-outputs#supported-schemas) from just a description of your task. This guide will walk through exactly how it works.

## Overview

Creating prompts and schemas from scratch can be time-consuming, so generating them can help you get started quickly. The Generate button uses two main approaches:

1. **Prompts:** We use **meta-prompts** that incorporate best practices to generate or improve prompts.
1. **Schemas:** We use **meta-schemas** that produce valid JSON and function syntax.

While we currently use meta prompts and schemas, we may integrate more advanced techniques in the future like [DSPy](https://arxiv.org/abs/2310.03714) and ["Gradient Descent"](https://arxiv.org/abs/2305.03495).

## Prompts

A **meta-prompt** instructs the model to create a good prompt based on your task description or improve an existing one. The meta-prompts in the Playground draw from our [prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) best practices and real-world experience with users.

We use specific meta-prompts for different output types, like audio, to ensure the generated prompts meet the expected format.

### Meta-prompts

export const textMeta = {
        python:`
from openai import OpenAI

client = OpenAI()

META_PROMPT = """\n`+
GENERAL_META_PROMPT + "\n" +`""".strip()

def generate_prompt(task_or_prompt: str):
completion = client.chat.completions.create(
model="gpt-4o",
messages=[
{
"role": "system",
"content": META_PROMPT,
},
{
"role": "user",
"content": "Task, Goal, or Current Prompt:\\n" + task_or_prompt,
},
],
)

    return completion.choices[0].message.content

`.trim(),
};

export const audioMeta = {
        python:`
from openai import OpenAI

client = OpenAI()

META_PROMPT = """\n`+
REALTIME_META_PROMPT + "\n" +`""".strip()

def generate_prompt(task_or_prompt: str):
completion = client.chat.completions.create(
model="gpt-4o",
messages=[
{
"role": "system",
"content": META_PROMPT,
},
{
"role": "user",
"content": "Task, Goal, or Current Prompt:\\n" + task_or_prompt,
},
],
)

    return completion.choices[0].message.content

`.trim(),
};



<div data-content-switcher-pane data-value="text-out">
    <div class="hidden">Text-out</div>
    </div>
  <div data-content-switcher-pane data-value="audio-out" hidden>
    <div class="hidden">Audio-out</div>
    </div>



### Prompt edits

To edit prompts, we use a slightly modified meta-prompt. While direct edits are straightforward to apply, identifying necessary changes for more open-ended revisions can be challenging. To address this, we include a **reasoning section** at the beginning of the response. This section helps guide the model in determining what changes are needed by evaluating the existing prompt's clarity, chain-of-thought ordering, overall structure, and specificity, among other factors. The reasoning section makes suggestions for improvements and is then parsed out from the final response.

export const textMetaEdits = {
        python:`
from openai import OpenAI

client = OpenAI()

META_PROMPT = """\n`+
GENERAL_META_PROMPT_EDIT + "\n" +`""".strip()

def generate_prompt(task_or_prompt: str):
completion = client.chat.completions.create(
model="gpt-4o",
messages=[
{
"role": "system",
"content": META_PROMPT,
},
{
"role": "user",
"content": "Task, Goal, or Current Prompt:\\n" + task_or_prompt,
},
],
)

    return completion.choices[0].message.content

`.trim(),
};

export const audioMetaEdits = {
        python:`
from openai import OpenAI

client = OpenAI()

META_PROMPT = """\n`+
REALTIME_META_PROMPT_EDIT + "\n" +`""".strip()

def generate_prompt(task_or_prompt: str):
completion = client.chat.completions.create(
model="gpt-4o",
messages=[
{
"role": "system",
"content": META_PROMPT,
},
{
"role": "user",
"content": "Task, Goal, or Current Prompt:\\n" + task_or_prompt,
},
],
)

    return completion.choices[0].message.content

`.trim(),
};



<div data-content-switcher-pane data-value="text-out">
    <div class="hidden">Text-out</div>
    </div>
  <div data-content-switcher-pane data-value="audio-out" hidden>
    <div class="hidden">Audio-out</div>
    </div>



## Schemas

[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) schemas and function schemas are themselves JSON objects, so we leverage Structured Outputs to generate them.
This requires defining a schema for the desired output, which in this case is itself a schema. To do this, we use a self-describing schema – a **meta-schema**.

Because the `parameters` field in a function schema is itself a schema, we use the same meta-schema to generate functions.

### Defining a constrained meta-schema

[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) supports two modes: `strict=true` and `strict=false`. Both modes use the same model trained to follow the provided schema, but only "strict mode" guarantees perfect adherence through constrained sampling.

Our goal is to generate schemas for strict mode using strict mode itself. However, the official meta-schemas provided by the [JSON Schema Specification](https://json-schema.org/specification#meta-schemas) rely on features [not currently supported](https://developers.openai.com/api/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported) in strict mode. This poses challenges that affect both input and output schemas.

1. **Input schema:** We can't use [unsupported features](https://developers.openai.com/api/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported) in the input schema to describe the output schema.
2. **Output schema:** The generated schema must not include [unsupported features](https://developers.openai.com/api/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported).

Because we need to generate new keys in the output schema, the input meta-schema must use `additionalProperties`. This means we can't currently use strict mode to generate schemas. However, we still want the generated schema to conform to strict mode constraints.

To overcome this limitation, we define a **pseudo-meta-schema** — a meta-schema that uses features not supported in strict mode to describe only the features that are supported in strict mode. Essentially, this approach steps outside strict mode for the meta-schema definition while still ensuring that the generated schemas adhere to strict mode constraints.



Constructing a constrained meta-schema is a challenging task, so we leveraged our models to help.

We began by giving `o1-preview` and `gpt-4o` in JSON mode a description of our goal using the Structured Outputs documentation.
After a few iterations, we developed our first functional meta-schema.

We then used `gpt-4o` with Structured Outputs and provided _that initial schema_ along with our task description and documentation, to generate better candidates. With each iteration we used a better schema to generate the next, until we finally reviewed it carefully by hand.

Finally, after cleaning the output, we validated the schemas against a set of evals for schemas and functions.



### Output cleaning

Strict mode guarantees perfect schema adherence. Because we can't use it during generation, however, we need to validate and transform the output after generating it.

After generating a schema, we perform the following steps:

1. **Set `additionalProperties` to `false`** for all objects.
1. **Mark all properties as required**.
1. **For structured output schemas**, wrap them in [`json_schema`](https://developers.openai.com/api/docs/guides/structured-outputs#how-to-use?context=without_parse) object.
1. **For functions**, wrap them in a [`function`](https://developers.openai.com/api/docs/guides/function-calling#step-3-pass-your-function-definitions-as-available-tools-to-the-model-along-with-the-messages) object.

The Realtime API [function](https://developers.openai.com/api/docs/guides/realtime#function-calls) object
  differs slightly from the Chat Completions API, but uses the same schema.

### Meta-schemas

Each meta-schema has a corresponding prompt which includes few-shot examples. When combined with the reliability of Structured Outputs — even without strict mode — we were able to use `gpt-4o-mini` for schema generation.

export const soMetaSchema = {
        python:`
from openai import OpenAI
import json

client = OpenAI()

META_SCHEMA = ` +
JSON.stringify(META_SCHEMA, null, 2).replaceAll("false", "False") + "\n" +

`
META_PROMPT = """\n` +
META_SCHEMA_PROMPT + "\n" + `""".strip()

def generate_schema(description: str):
completion = client.chat.completions.create(
model="gpt-4o-mini",
response_format={"type": "json_schema", "json_schema": META_SCHEMA},
messages=[
{
"role": "system",
"content": META_PROMPT,
},
{
"role": "user",
"content": "Description:\\n" + description,
},
],
)

    return json.loads(completion.choices[0].message.content)

`.trim(),
};

export const soFunctionSchema = {
        python:`
from openai import OpenAI
import json

client = OpenAI()

META_SCHEMA = ` +
JSON.stringify(FUNCTION_META_SCHEMA, null, 2).replaceAll("false", "False") + "\n" +

`
META_PROMPT = """\n` +
FUNCTION_META_SCHEMA_PROMPT + "\n" + `""".strip()

def generate_function_schema(description: str):
completion = client.chat.completions.create(
model="gpt-4o-mini",
response_format={"type": "json_schema", "json_schema": META_SCHEMA},
messages=[
{
"role": "system",
"content": META_PROMPT,
},
{
"role": "user",
"content": "Description:\\n" + description,
},
],
)

    return json.loads(completion.choices[0].message.content)

`.trim(),
};



<div data-content-switcher-pane data-value="structured-output">
    <div class="hidden">Structured output schema</div>
    </div>
  <div data-content-switcher-pane data-value="function" hidden>
    <div class="hidden">Function schema</div>
    </div>