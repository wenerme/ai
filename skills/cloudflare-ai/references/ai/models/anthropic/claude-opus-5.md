---
description: Claude Opus 5 is Anthropic's model for complex agentic coding and enterprise work, delivering intelligence close to Claude Fable 5 at half the price. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
title: Claude Opus 5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Opus 5

Text Generation • Anthropic

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-5`

* Third-party

Claude Opus 5 is Anthropic's model for complex agentic coding and enterprise work, delivering intelligence close to Claude Fable 5 at half the price. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

| Model Info                                                                 |                                                                                                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                          |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                           |
| Request formats                                                            | Anthropic Messages                                                                                                        |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-5) |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5',
  {
    max_tokens: 1024,
    messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-opus-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

## The Three Laws (plus a "zeroth")

**First Law — Conservation of Energy**

Energy cannot be created or destroyed, only converted from one form to another or transferred between systems.

$$\Delta U = Q - W$$

The change in a system's internal energy equals the heat added to it minus the work it does. Practically: you can't get more energy out of a system than you put in — no perpetual motion machine of the "first kind."

**Second Law — Entropy Increases**

The total entropy of an isolated system never decreases; it increases in any irreversible process and stays constant only in idealized reversible ones.

$$\Delta S_{\text{universe}} \geq 0$$

Equivalent statements:
- Heat flows spontaneously from hot to cold, never the reverse (Clausius)
- No heat engine can convert heat entirely into work with no waste heat (Kelvin–Planck)

This law gives time its direction and sets hard limits on engine efficiency (the Carnot limit, $1 - T_c/T_h$).

**Third Law — Absolute Zero**

As a system's temperature approaches absolute zero, its entropy approaches a constant minimum — zero for a perfect crystal.

$$\lim_{T \to 0} S = 0$$

A consequence: absolute zero (0 K, −273.15 °C) cannot be reached in a finite number of steps, since each cooling stage removes less and less heat.

**Zeroth Law — Thermal Equilibrium**

Added later but numbered "zeroth" because it's logically prior: if A is in thermal equilibrium with B, and B with C, then A is in equilibrium with C. This is what makes temperature a meaningful, measurable quantity — it's why thermometers work.

---

A common informal summary, framed as a game you can't win:

1. You can't win (best case, you break even on energy).
2. You can't break even (entropy always takes a cut).
3. You can't quit the game (you can't reach absolute zero).

```json
{
  "model": "claude-opus-5",
  "id": "msg_011CdMGDW2LrJq4cba8GUiPY",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAIS2QkKhwEIEBgCKkCGqpD8dichIGI5lLTLTWzD2GDKF+Gen+VeCqxOaNMRZqeYfoPp7HK0cVHWubFXJf9965IIfQf9nzzv65obd9QUMg1jbGF1ZGUtb3B1cy01OAFCCHRoaW5raW5nWiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDJQqAt1B6hIXUNg92hoMn8f8ZlHzdjraBJ58IjCoPdmP+ZQgVQL5WQ0fxFWL3ypuvcKRaZyPWz3ZPRDaxGyyC/2U9eQ3wWYcVD9jfpkq/gfIcgr85vIMOp/wgzqFmC7S7m8v/Gu8FXVKd1TcBtdUrHnA50Aco+ze/xYQV8pVgllVgMW6om3v8kKDRBQ5FnC8h/5/HQ2sT4jaZnM74f1EgYD+hHF6MojpD7uKV0YUuZAfByYCvbzQvbjTrNtij7JfbfQuiYp11mbJdvf1qwOZYzNFfE6BkM8vt5wJCRF527i/+xS6gBf7NrN8nacvq7ZscjQ7NkZ4kE9i+npW7DGZ0/Bm8VxE7dsxdQJ4wHFL/iwR+EcqBk2OzwbKffji6PlFye/CYeFUC39ddwqkh4nasnv2qSJXZEB2n6SeQUrjnw2zBM8+2AhAqWyIAb4/RTkVRex4h/rLWEquKkbTl6eWjDYrOINMFl7fgdel6nH496BIkyK35r6SXA4Qzhnvhd9cPuVZvXjb3jzel1B1yNWvhbH0WxshRbQn+s8bs1ppX4jTRVy1YKKh1A1KT7rW74LQ/QgjY5OjScjv/Q181V/7VoFM7r/Bx+zZNTNFHbDFNjLyxIQyAjVi7AqiCJxjn9tIucRxSSkgix+gsgm81EER+ug5IxNuh84CbYDs/tldzXoE34zkeNFTn17GxdxiF4Q0DUc1Rq1m3ZigKUrnMhQUyE31S3lWS+ZdiXYAB8J9zGRhSsMDRjm7zbq5al0Rr3yEesOb5QtaaV1iguv8ybjUKvxPz/Y36ZV+91F8d5rWED3Nj2EEzd5jnS2759CoSXyOu6OQ7Z2DlWbYPgI8iP4To6WF2R3AIWp/3EbD7yqHIh5caA1MUog4AykTzlTyC+rM3ZTjSKAguveQwLriauP+xUe5iAbyRQsL2+QDqRbhmrOtegvq+32uM+Q7sOoqjwNuk4c9O/nrQ76Ht882YiejTyDTcU5uc7wTuxraK2r3QciQt9hB8xlP5sFGvFSdAAxLwTLQIUNy2UAMzeXez8Jrn86Dv8GiWnZDENTFq4yXn6NiaVxyEuc4Nl3HLeBD9pQcRcaIISjVtj7hlnXtJpVkPJvoHVSgQG2lLvqjU5JAaV3TZbPismWrfRrjKQ0kLhDu3Ta+b88kGWjxYooJX4zGHwnRQMloVwMgJoKNWvXAO+256IW7iyKvC36f8Xc+qoViVCf0+9fiEWn9+OPOfFmqJkkNaYNYV0IiIA17l4LjJ6G2jsqmElla9dZ0IQKl5rxPVYH1iEIONDxPAEjpgA4u3yV3n4TvhxF57CahHA0fWMFiY3FnX8k/SAHbwH8A4nYFRUHsQ3Zxwj8718DZRdg7uiTlPZAc/DpXIvjRUVn4crtT+cNatNaLIhVM7RK9VbPhai9bIZiIuZ6Tokc+TMcPrTsOHIDE/AX0q6MgGetLgJsZGB9o4WGp+FcqKimgaBgB"
    },
    {
      "type": "text",
      "text": "## The Three Laws (plus a \"zeroth\")\n\n**First Law — Conservation of Energy**\n\nEnergy cannot be created or destroyed, only converted from one form to another or transferred between systems.\n\n$$\\Delta U = Q - W$$\n\nThe change in a system's internal energy equals the heat added to it minus the work it does. Practically: you can't get more energy out of a system than you put in — no perpetual motion machine of the \"first kind.\"\n\n**Second Law — Entropy Increases**\n\nThe total entropy of an isolated system never decreases; it increases in any irreversible process and stays constant only in idealized reversible ones.\n\n$$\\Delta S_{\\text{universe}} \\geq 0$$\n\nEquivalent statements:\n- Heat flows spontaneously from hot to cold, never the reverse (Clausius)\n- No heat engine can convert heat entirely into work with no waste heat (Kelvin–Planck)\n\nThis law gives time its direction and sets hard limits on engine efficiency (the Carnot limit, $1 - T_c/T_h$).\n\n**Third Law — Absolute Zero**\n\nAs a system's temperature approaches absolute zero, its entropy approaches a constant minimum — zero for a perfect crystal.\n\n$$\\lim_{T \\to 0} S = 0$$\n\nA consequence: absolute zero (0 K, −273.15 °C) cannot be reached in a finite number of steps, since each cooling stage removes less and less heat.\n\n**Zeroth Law — Thermal Equilibrium**\n\nAdded later but numbered \"zeroth\" because it's logically prior: if A is in thermal equilibrium with B, and B with C, then A is in equilibrium with C. This is what makes temperature a meaningful, measurable quantity — it's why thermometers work.\n\n---\n\nA common informal summary, framed as a game you can't win:\n\n1. You can't win (best case, you break even on energy).\n2. You can't break even (entropy always takes a cut).\n3. You can't quit the game (you can't reach absolute zero)."
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 20,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 999,
    "output_tokens_details": {
      "thinking_tokens": 342
    },
    "service_tier": "standard",
    "inference_geo": "global"
  }
}
```

## Examples

**With System Message** — Using a system message to set context

```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5',
  {
    max_tokens: 1024,
    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],
    system: 'You are a helpful coding assistant specializing in Python.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-opus-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "system": "You are a helpful coding assistant specializing in Python."
}'
```

# Reading JSON Files in Python

Python's built-in `json` module handles this. The key function is `json.load()`.

## Basic usage

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

That's it. `data` will be a Python object — usually a `dict` or `list`, depending on the JSON's top-level structure.

## `load()` vs `loads()`

| Function | Input | Use when |
|---|---|---|
| `json.load(f)` | file object | reading from a file |
| `json.loads(s)` | string | you already have JSON text (e.g., from an API response) |

```python
# From a string
json_string = '{"name": "Ada", "age": 36}'
data = json.loads(json_string)
print(data["name"])  # Ada
```

## Type mapping

JSON values convert to Python like this:

```
object  -> dict
array   -> list
string  -> str
number  -> int / float
true    -> True
false   -> False
null    -> None
```

## A more robust version

Real files can be missing, malformed, or wrongly encoded. Handle those cases:

```python
import json
from pathlib import Path

def read_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"No such file: {path}")
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in {path}: {e}")
    return None

config = read_json("config.json")
if config is not None:
    print(config.get("debug", False))
```

`pathlib` offers a neat shortcut for small files:

```python
from pathlib import Path
import json

data = json.loads(Path("data.json").read_text(encoding="utf-8"))
```

## Accessing nested data

```python
# data.json:
# {"users": [{"name": "Ada", "roles": ["admin", "dev"]}]}

first_user = data["users"][0]
print(first_user["name"])        # Ada
print(first_user["roles"][0])    # admin

# Safer, avoids KeyError:
print(data.get("users", [{}])[0].get("email", "no email"))
```

## Writing JSON back out

```python
with open("output.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
```

- `indent=2` — pretty-prints instead of one long line
- `ensure_ascii=False` — keeps non-ASCII characters readable (é instead of `\u00e9`)

## Gotcha: JSON Lines files

If your file has **one JSON object per line** (`.jsonl` / `.ndjson`), `json.load()` will fail. Parse line by line instead:

```python
records = []
with open("data.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        line =

```json
{
  "model": "claude-opus-5",
  "id": "msg_011CdMGERnNnjqoLKUi8f5e2",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAISlwMKhwEIEBgCKkDnY3H/QvnY169K1yMmFcaHZdAHKQi7HwNFYKkIZp0wSRf/yL/nQsZDx/LLEQSY1FfhHojVKOfc/hmWW7FxVu0OMg1jbGF1ZGUtb3B1cy01OAFCCHRoaW5raW5nWiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDDMdNrNt9b+XZzJ9ThoM6/mpYVgdtMKdiz9dIjCFQYQHXEtVYcE+CVPJAnA4WmnqBups2JzH7gDGnzRdULLA+WADSrZEZzJ8bjK6PEwqvAFnL+V+NxB/M2Epn970QINI1ZgU84/DZbdlTH6pxs6Lb2vsc3UngVrPq32NU30AzTvWc5QDERI04A2deMbM9A181rB9WPcKc2as+W52tkGFYw+AEi+16HCtFge22n6ih+qYNphSX6+F3m8PIjpCerhJSRWLE/ecUeTVhpTWBBsYtOiCjgw8BVCsa7pmHg97dlZphBOOCPhy6EGWefxHmF7rH7iv977nFRgcnBTzqIYUcLVdz3RXpjdT2VntWRgB"
    },
    {
      "type": "text",
      "text": "# Reading JSON Files in Python\n\nPython's built-in `json` module handles this. The key function is `json.load()`.\n\n## Basic usage\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\nThat's it. `data` will be a Python object — usually a `dict` or `list`, depending on the JSON's top-level structure.\n\n## `load()` vs `loads()`\n\n| Function | Input | Use when |\n|---|---|---|\n| `json.load(f)` | file object | reading from a file |\n| `json.loads(s)` | string | you already have JSON text (e.g., from an API response) |\n\n```python\n# From a string\njson_string = '{\"name\": \"Ada\", \"age\": 36}'\ndata = json.loads(json_string)\nprint(data[\"name\"])  # Ada\n```\n\n## Type mapping\n\nJSON values convert to Python like this:\n\n```\nobject  -> dict\narray   -> list\nstring  -> str\nnumber  -> int / float\ntrue    -> True\nfalse   -> False\nnull    -> None\n```\n\n## A more robust version\n\nReal files can be missing, malformed, or wrongly encoded. Handle those cases:\n\n```python\nimport json\nfrom pathlib import Path\n\ndef read_json(path):\n    try:\n        with open(path, \"r\", encoding=\"utf-8\") as f:\n            return json.load(f)\n    except FileNotFoundError:\n        print(f\"No such file: {path}\")\n    except json.JSONDecodeError as e:\n        print(f\"Invalid JSON in {path}: {e}\")\n    return None\n\nconfig = read_json(\"config.json\")\nif config is not None:\n    print(config.get(\"debug\", False))\n```\n\n`pathlib` offers a neat shortcut for small files:\n\n```python\nfrom pathlib import Path\nimport json\n\ndata = json.loads(Path(\"data.json\").read_text(encoding=\"utf-8\"))\n```\n\n## Accessing nested data\n\n```python\n# data.json:\n# {\"users\": [{\"name\": \"Ada\", \"roles\": [\"admin\", \"dev\"]}]}\n\nfirst_user = data[\"users\"][0]\nprint(first_user[\"name\"])        # Ada\nprint(first_user[\"roles\"][0])    # admin\n\n# Safer, avoids KeyError:\nprint(data.get(\"users\", [{}])[0].get(\"email\", \"no email\"))\n```\n\n## Writing JSON back out\n\n```python\nwith open(\"output.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f, indent=2, ensure_ascii=False)\n```\n\n- `indent=2` — pretty-prints instead of one long line\n- `ensure_ascii=False` — keeps non-ASCII characters readable (é instead of `\\u00e9`)\n\n## Gotcha: JSON Lines files\n\nIf your file has **one JSON object per line** (`.jsonl` / `.ndjson`), `json.load()` will fail. Parse line by line instead:\n\n```python\nrecords = []\nwith open(\"data.jsonl\", \"r\", encoding=\"utf-8\") as f:\n    for line in f:\n        line ="
    }
  ],
  "stop_reason": "max_tokens",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 38,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 1024,
    "output_tokens_details": {
      "thinking_tokens": 50
    },
    "service_tier": "standard",
    "inference_geo": "global"
  }
}
```

## Parameters

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

stream

`boolean`

▶metadata{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[\]

`array`

model

`string`

stop\_reason

`string | null`

▶usage{}

`object`

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/#page","headline":"Claude Opus 5 (Anthropic) · Cloudflare AI docs · Cloudflare AI docs","description":"Claude Opus 5 is Anthropic's model for complex agentic coding and enterprise work, delivering intelligence close to Claude Fable 5 at half the price. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
