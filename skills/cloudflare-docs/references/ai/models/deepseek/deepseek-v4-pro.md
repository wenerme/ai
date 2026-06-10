---
title: DeepSeek V4 Pro
description: DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

 d 

#  DeepSeek V4 Pro 

Text Generation • deepseek 

`deepseek/deepseek-v4-pro` 

DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.

| Model Info                                                                 |                                                                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 131,072 tokens                                                                                                             |
| More information                                                           | [link ↗](https://api-docs.deepseek.com)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/deepseek/deepseek-v4-pro) |

## Usage

* [ TypeScript ](#tab-panel-458)
* [ cURL ](#tab-panel-459)

TypeScript

```

const response = await env.AI.run(

  'deepseek/deepseek-v4-pro',

  {

    messages: [{ content: 'What is the capital of France?', role: 'user' }],

    model: 'deepseek/deepseek-v4-pro',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "deepseek/deepseek-v4-pro",

  "messages": [

    {

      "content": "What is the capital of France?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-462)
* [ Raw response ](#tab-panel-463)

The capital of France is **Paris**.

```

{

  "id": "chatcmpl-130c261b00a14fffa8f3e238ad0fc2c1",

  "object": "chat.completion",

  "created": 1780697607,

  "model": "deepseek/deepseek-v4-pro",

  "choices": [

    {

      "index": 0,

      "message": {

        "role": "assistant",

        "content": "The capital of France is **Paris**.",

        "reasoning_content": "We are asked: \"What is the capital of France?\" This is a straightforward factual question. The answer is Paris. I should respond with just that."

      },

      "finish_reason": "stop"

    }

  ],

  "usage": {

    "prompt_tokens": 11,

    "completion_tokens": 41,

    "total_tokens": 52,

    "prompt_tokens_details": {

      "cached_tokens": 10

    }

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-460)
* [ cURL ](#tab-panel-461)

TypeScript

```

const response = await env.AI.run(

  'deepseek/deepseek-v4-pro',

  {

    messages: [

      { content: 'You are a helpful coding assistant specializing in Python.', role: 'system' },

      { content: 'How do I read a JSON file in Python?', role: 'user' },

    ],

    model: 'deepseek/deepseek-v4-pro',

    temperature: 0.3,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "deepseek/deepseek-v4-pro",

  "messages": [

    {

      "content": "You are a helpful coding assistant specializing in Python.",

      "role": "system"

    },

    {

      "content": "How do I read a JSON file in Python?",

      "role": "user"

    }

  ],

  "temperature": 0.3

}'


```

* [ Output ](#tab-panel-464)
* [ Raw response ](#tab-panel-465)

To read a JSON file in Python, use the built-in `json` module. Here’s a quick guide:

## 1. Basic reading from a file

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)   # parse the file object directly

print(data)
```

- `json.load(file)` reads the file and converts JSON to Python objects (dict, list, str, int, float, bool, None).
- Always use `with open(...)` to ensure the file is closed properly.
- Specify `encoding='utf-8'` if your JSON contains non-ASCII characters (recommended).

## 2. Reading from a JSON string

If you already have a JSON string (e.g., from an API response), use `json.loads()`:

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)   # 's' stands for 'string'
```

## 3. Error handling

JSON might be malformed. Catch exceptions:

```python
import json

try:
    with open('data.json', 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

## 4. Pretty-printing the result

To see the data nicely formatted:

```python
print(json.dumps(data, indent=2, ensure_ascii=False))
```

- `indent=2` adds indentation.
- `ensure_ascii=False` preserves non-ASCII characters (like accented letters).

## Complete example

```python
import json

def read_json_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: '{filepath}' not found.")
    except json.JSONDecodeError:
        print(f"Error: '{filepath}' contains invalid JSON.")
    return None

data = read_json_file('config.json')
if data:
    print(json.dumps(data, indent=2))
```

That’s all you need to get started!

```

{

  "id": "chatcmpl-8a4245b4df754a26b66d553c26b34370",

  "object": "chat.completion",

  "created": 1780697608,

  "model": "deepseek/deepseek-v4-pro",

  "choices": [

    {

      "index": 0,

      "message": {

        "role": "assistant",

        "content": "To read a JSON file in Python, use the built-in `json` module. Here’s a quick guide:\n\n## 1. Basic reading from a file\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)   # parse the file object directly\n\nprint(data)\n```\n\n- `json.load(file)` reads the file and converts JSON to Python objects (dict, list, str, int, float, bool, None).\n- Always use `with open(...)` to ensure the file is closed properly.\n- Specify `encoding='utf-8'` if your JSON contains non-ASCII characters (recommended).\n\n## 2. Reading from a JSON string\n\nIf you already have a JSON string (e.g., from an API response), use `json.loads()`:\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)   # 's' stands for 'string'\n```\n\n## 3. Error handling\n\nJSON might be malformed. Catch exceptions:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n## 4. Pretty-printing the result\n\nTo see the data nicely formatted:\n\n```python\nprint(json.dumps(data, indent=2, ensure_ascii=False))\n```\n\n- `indent=2` adds indentation.\n- `ensure_ascii=False` preserves non-ASCII characters (like accented letters).\n\n## Complete example\n\n```python\nimport json\n\ndef read_json_file(filepath):\n    try:\n        with open(filepath, 'r', encoding='utf-8') as f:\n            return json.load(f)\n    except FileNotFoundError:\n        print(f\"Error: '{filepath}' not found.\")\n    except json.JSONDecodeError:\n        print(f\"Error: '{filepath}' contains invalid JSON.\")\n    return None\n\ndata = read_json_file('config.json')\nif data:\n    print(json.dumps(data, indent=2))\n```\n\nThat’s all you need to get started!",

        "reasoning_content": "We need to provide a helpful answer on how to read a JSON file in Python. The user is likely a beginner. We should explain the json module, open the file, json.load() vs json.loads(), handle errors, maybe show examples. Keep it concise but thorough. Include code snippets. Also mention reading from a string vs file. Possibly mention encoding. Provide a simple example."

      },

      "finish_reason": "stop"

    }

  ],

  "usage": {

    "prompt_tokens": 24,

    "completion_tokens": 566,

    "total_tokens": 590,

    "prompt_tokens_details": {

      "cached_tokens": 0

    }

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-466)
* [ Output ](#tab-panel-467)

▶audio{}

`object`

frequency\_penalty

`number`maximum: 2minimum: \-2

max\_completion\_tokens

`number`exclusiveMinimum: 0

max\_tokens

`number`exclusiveMinimum: 0

▶messages\[\]

`array`required

▶modalities\[\]

`array`

presence\_penalty

`number`maximum: 2minimum: \-2

response\_format

``

stream

`boolean`

▶stream\_options{}

`object`

temperature

`number`maximum: 2minimum: 0

tool\_choice

``

▶tools\[\]

`array`

top\_p

`number`maximum: 1minimum: 0

▶choices\[\]

`array`

created

`number`

id

`string`

model

`string`

object

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
