---
description: Claude Opus 5 is Anthropic's model for complex agentic coding and enterprise work, delivering intelligence close to Claude Fable 5 at half the price. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing. Unlike Fable 5, Opus 5 has no data retention requirements for general access.
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

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-5`

- Third-party

Claude Opus 5 is Anthropic's model for complex agentic coding and enterprise work, delivering intelligence close to Claude Fable 5 at half the price. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing. Unlike Fable 5, Opus 5 has no data retention requirements for general access.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://www.anthropic.com/claude/opus) |
| Request formats | Anthropic Messages |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-5) |

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

```
The laws of thermodynamics describe how energy and heat behave in physical systems. Here are the three (plus a bonus fourth that was added later but numbered "zeroth").

**First Law — Conservation of Energy**
Energy cannot be created or destroyed, only transferred or converted between forms. For a closed system, the change in internal energy equals the heat added minus the work done by the system:

ΔU = Q − W

Practical implication: there's no such thing as a perpetual motion machine that produces energy from nothing.

**Second Law — Entropy Increases**
The total entropy (disorder, or more precisely the number of accessible microscopic states) of an isolated system never decreases over time. Equivalent formulations:

- Heat flows spontaneously from hot to cold, never the reverse
- No heat engine can convert heat entirely into work — some is always lost to a cold reservoir
- Processes have a preferred direction in time

This law is why engines have efficiency limits (the Carnot limit) and why it's often described as giving time its "arrow."

**Third Law — Absolute Zero is Unreachable**
As a system's temperature approaches absolute zero (0 K, −273.15 °C), its entropy approaches a constant minimum — zero for a perfect crystal. A consequence is that no finite number of steps can cool something all the way to absolute zero; you can only get asymptotically closer.

**Zeroth Law — Thermal Equilibrium**
If system A is in thermal equilibrium with system C, and B is also in equilibrium with C, then A and B are in equilibrium with each other. This is what makes temperature a meaningful, measurable property — it's the basis for thermometers. It was formalized after the other three, hence the odd numbering.

A common informal summary: *you can't win (1st), you can't break even (2nd), and you can't get out of the game (3rd).*
```

```json
{
  "id": "msg_011CdMcWsWTt6YQBsVgBJKET",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAIS+wkKhwEIEBgCKkCQkqK6v16N37+5nxwsLhxrzfCzIPF8EtZFUMp15QDBKBAUGSIu2rqp+X6/Hi8Ul8I6R5cRA5sW1cubAR0uFsttMg1jbGF1ZGUtb3B1cy01OAFCCHRoaW5raW5nWiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDBjGGGXscwelkjSVsRoM76EmL+Pl2dtvcTfkIjBy2Ayh9NZsLWod+geEtrv0CZx22kjdWmRHFED/zy3kvHn4eM1OJrP3lhPjNTckDU0qoAh+2jG1EqZNl6grp923Shc5W4S3srKv4zy7w4z6n150KajRAZSSpC/BYrGJb6lq6nVEsgjvnrOHIeF3mq1Y3/3rPJ346UB5iJRwP+rpm6lA4LkUVQZZGYeKqUhplIEMOdQdajx2iPjmTMTV0DjdiB0bHWA776a1SXuK5VjTpcnn77iwz8okVSbhqL6annDIiWET5Z9kHhjuqHhxdAXMeGkmYWbD2i0ttDdpaHgmrvW0FRYHDEDSQr/zUT6sXgke+AIG/jWwe5SmqZIIlHhOHufoW549PnXx/W6fkiiu/sNwYL85/3toWXePQkDKnD4GEFClcdCHVOEdOh45aC7XxtRwSMTBtRDz5DeAQvHwosoZoM/dJYru0s00EkG9pAq7I15ED7XTtJkUCE61wMdqifXkOSsAHbKxH6nJemHfSpS+14jaAZdWydahPq1j8wJVppQ1KC73HJZJ1wgKHT2ZCT1WlV9FuE+hmqp13NUirZRe+o7DEJiNSenND0L1GZ13FWFXiFFSXMQiAwDJTk4yWk8cLCGt45dFtAW/m8QoKKxcx+JctfpE21IMKnOG9mPJjvUdNsP3s5bk3ZkD2dcpbv4jfdJsZdz7DqNnR0tQS0TGFAc+hBuYM0ftPJlfyhKlwpi227CIVmhlxKKAUkODCMrdjevZhyJ/JZKbAJ2yzGQ2TaLxlmkbhM4XH0RBaQ+ALv5tg+oNZ0vA9OA5uKwbN9u9yKDq7hYBQeSatyPoJ+pGxEoeGeFOP4bZHvOplm/5V67E90HzDf0k/EVvjkj0P5nqVHsUb9N6IYNkMPdsNAAenNWBNk3Z8kW1xGxRw/JXZGKUr1Ql6nD5dUMw3DIDKG1c1+8QPaata4WzR/zMO8+btn3VObUDjekjC72bKMfsAjMMkX7dWYojE94Hg2rAFRQ20hmbjYDAwt8x/k8LD8bGBa/xw5WHY1Fa64r5YvJgK98sCtJbo68axk6/Tf8AgnzwVzjDugI+pQJ2oAoC22iqQQVzTwmsoLnqi9i3F/fe9wHqITf+jGytEfT0AG73R9dFD73mac0QVIbWXkm8Weld3twIvtzC3W0IPb2v1rhQkRCCJM/s6IBvRP2N0PIwCE2oexDeW+rw59vL8d/tsZ1Woogo1+76ldngoeLF4rEV4VjfP22rTN6ZLcfnerdYbF1lDXfQhTHgs+4LvMuHfYX8lMIq/wJssPyIpnXhXtmxgd9/ce2OInU3dUHXqISUHXIeiHeDxglxblzSK9B0rAzk1UaVJn4PMNGF3M1wguw6i9AAx8s+1AU5hLOinfZ166Az9HUYz/uHkQ6d0JYRx5L6xHXaWXF51ZifLRtfoeNqLdHGKxrfjSNQK8Ouuce7SzLMGi4YH5W2rED1XmpwI69xXnssHuQKHqt7ggSV5P26e5EYAQ=="
    },
    {
      "type": "text",
      "text": "The laws of thermodynamics describe how energy and heat behave in physical systems. Here are the three (plus a bonus fourth that was added later but numbered \"zeroth\").\n\n**First Law — Conservation of Energy**\nEnergy cannot be created or destroyed, only transferred or converted between forms. For a closed system, the change in internal energy equals the heat added minus the work done by the system:\n\nΔU = Q − W\n\nPractical implication: there's no such thing as a perpetual motion machine that produces energy from nothing.\n\n**Second Law — Entropy Increases**\nThe total entropy (disorder, or more precisely the number of accessible microscopic states) of an isolated system never decreases over time. Equivalent formulations:\n\n- Heat flows spontaneously from hot to cold, never the reverse\n- No heat engine can convert heat entirely into work — some is always lost to a cold reservoir\n- Processes have a preferred direction in time\n\nThis law is why engines have efficiency limits (the Carnot limit) and why it's often described as giving time its \"arrow.\"\n\n**Third Law — Absolute Zero is Unreachable**\nAs a system's temperature approaches absolute zero (0 K, −273.15 °C), its entropy approaches a constant minimum — zero for a perfect crystal. A consequence is that no finite number of steps can cool something all the way to absolute zero; you can only get asymptotically closer.\n\n**Zeroth Law — Thermal Equilibrium**\nIf system A is in thermal equilibrium with system C, and B is also in equilibrium with C, then A and B are in equilibrium with each other. This is what makes temperature a meaningful, measurable property — it's the basis for thermometers. It was formalized after the other three, hence the odd numbering.\n\nA common informal summary: *you can't win (1st), you can't break even (2nd), and you can't get out of the game (3rd).*"
    }
  ],
  "model": "claude-opus-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 20,
    "output_tokens": 969,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5',
  {
    max_tokens: 2048,
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
  "max_tokens": 2048,
  "messages": [
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "system": "You are a helpful coding assistant specializing in Python."
}'
```

````
# Reading JSON Files in Python

Python's built-in `json` module handles this. The key function is `json.load()`.

## The basic pattern

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

That's it. `json.load()` reads from a file object; the `with` statement ensures the file gets closed even if something goes wrong.

## `load()` vs `loads()`

This trips people up constantly:

| Function | Input | Use when |
|---|---|---|
| `json.load(f)` | file object | reading from a file |
| `json.loads(s)` | string (or bytes) | you already have JSON text |

```python
# From a string
text = '{"name": "Ada", "age": 36}'
data = json.loads(text)

# Equivalent to the file version
with open("data.json", encoding="utf-8") as f:
    data = json.loads(f.read())   # works, but load(f) is cleaner
```

## What you get back

JSON types map to Python types like this:

```
object  -> dict
array   -> list
string  -> str
number  -> int / float
true    -> True
false   -> False
null    -> None
```

So access it like any nested dict/list:

```python
# data.json: {"users": [{"name": "Ada", "roles": ["admin"]}]}
data["users"][0]["name"]        # "Ada"
data["users"][0]["roles"][0]    # "admin"
```

Use `.get()` for keys that might be missing:

```python
email = data["users"][0].get("email", "unknown")
```

## Handling errors properly

Real-world files are messy. Catch the two things that actually go wrong:

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
        print(f"Invalid JSON in {path} at line {e.lineno}, column {e.colno}: {e.msg}")
    return None

data = read_json("data.json")
```

`JSONDecodeError` is a subclass of `ValueError`, and it carries `lineno`, `colno`, and `pos` — genuinely useful for pinpointing a bad comma.

## Using `pathlib` (slightly tidier)

```python
import json
from pathlib import Path

data = json.loads(Path("data.json").read_text(encoding="utf-8"))
```

## Common gotchas

**Always specify `encoding="utf-8"`.** Without it, Python uses the platform default, which on some Windows setups is cp1252 and will blow up on non-ASCII characters. JSON is UTF-8 by spec.

**JSON Lines (`.jsonl`) is a different format.** One JSON object per line — `json.load()` will fail. Parse line by line:

```python
with open("data.jsonl", encoding="utf-8") as f:
    records = [json.loads(line) for line in f if line.strip()]
```

**Trailing commas and comments aren't valid JSON.** `{"a": 1,}` or `// comment` will raise `JSONDecodeError`. If you're stuck with such files, use the `json5` or `commentjson` package.

**Huge files:** `json.load()` builds the whole structure in memory. For files that don't fit, use a streaming parser like [`ijson`](https://pypi.org/project/ijson/):

```python
import ijson

with open("huge.json", "rb") as f:
    for record in ijson.items(f, "users.item"):
        process(record)
```

## Writing it back out

For completeness:

```python
with open("out.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
```

`indent=2` makes it human-readable; `ensure_ascii=False` keeps non-ASCII characters as-is instead of escaping them to `\uXXXX`.
````

```json
{
  "id": "msg_011CdMcXtLbe6orhyjErTMK4",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAISlgMKhwEIEBgCKkAMw2x29hUCKlXqNB76pH+D/yqNHzKCZSWl13/1q5MvcRHqGBsMYVt5OPNJRBpoK96H4yBdLeYFynRrC3brOl8VMg1jbGF1ZGUtb3B1cy01OAFCCHRoaW5raW5nWiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDPHl470mvTSS/VVloBoMjuO0rbloh1ffzl7/IjCQVDk88te+JO4ShyaKbxvx7tByViz6N6zO3AnWMoRShuVZmByIC9M123krmAR3d0squwH0oba6v809aPGBRis6zXZjjkxj9xUPeK9bIiAs2F4LqShktrO0enUaJGxlcocxt2tmwdkC5SF7XOy5lKpcBDf6XvOTeaV0bYyxgAQ6L2FkiOU9NtnSGiZZ0VmKz2v8RZ9nVisaD6kA15+UOqX8SO5ZYny+Ttrgue6Cx5DJ7MfBcRcE6SsSsuyLnrRFY1S7XNsCcd0lY1rv1CzkYOnItoxD6fDWab8uxQGGXWBhUnSy4XxtZ0+TR/2fRTuXGAE="
    },
    {
      "type": "text",
      "text": "# Reading JSON Files in Python\n\nPython's built-in `json` module handles this. The key function is `json.load()`.\n\n## The basic pattern\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\nThat's it. `json.load()` reads from a file object; the `with` statement ensures the file gets closed even if something goes wrong.\n\n## `load()` vs `loads()`\n\nThis trips people up constantly:\n\n| Function | Input | Use when |\n|---|---|---|\n| `json.load(f)` | file object | reading from a file |\n| `json.loads(s)` | string (or bytes) | you already have JSON text |\n\n```python\n# From a string\ntext = '{\"name\": \"Ada\", \"age\": 36}'\ndata = json.loads(text)\n\n# Equivalent to the file version\nwith open(\"data.json\", encoding=\"utf-8\") as f:\n    data = json.loads(f.read())   # works, but load(f) is cleaner\n```\n\n## What you get back\n\nJSON types map to Python types like this:\n\n```\nobject  -> dict\narray   -> list\nstring  -> str\nnumber  -> int / float\ntrue    -> True\nfalse   -> False\nnull    -> None\n```\n\nSo access it like any nested dict/list:\n\n```python\n# data.json: {\"users\": [{\"name\": \"Ada\", \"roles\": [\"admin\"]}]}\ndata[\"users\"][0][\"name\"]        # \"Ada\"\ndata[\"users\"][0][\"roles\"][0]    # \"admin\"\n```\n\nUse `.get()` for keys that might be missing:\n\n```python\nemail = data[\"users\"][0].get(\"email\", \"unknown\")\n```\n\n## Handling errors properly\n\nReal-world files are messy. Catch the two things that actually go wrong:\n\n```python\nimport json\nfrom pathlib import Path\n\ndef read_json(path):\n    try:\n        with open(path, \"r\", encoding=\"utf-8\") as f:\n            return json.load(f)\n    except FileNotFoundError:\n        print(f\"No such file: {path}\")\n    except json.JSONDecodeError as e:\n        print(f\"Invalid JSON in {path} at line {e.lineno}, column {e.colno}: {e.msg}\")\n    return None\n\ndata = read_json(\"data.json\")\n```\n\n`JSONDecodeError` is a subclass of `ValueError`, and it carries `lineno`, `colno`, and `pos` — genuinely useful for pinpointing a bad comma.\n\n## Using `pathlib` (slightly tidier)\n\n```python\nimport json\nfrom pathlib import Path\n\ndata = json.loads(Path(\"data.json\").read_text(encoding=\"utf-8\"))\n```\n\n## Common gotchas\n\n**Always specify `encoding=\"utf-8\"`.** Without it, Python uses the platform default, which on some Windows setups is cp1252 and will blow up on non-ASCII characters. JSON is UTF-8 by spec.\n\n**JSON Lines (`.jsonl`) is a different format.** One JSON object per line — `json.load()` will fail. Parse line by line:\n\n```python\nwith open(\"data.jsonl\", encoding=\"utf-8\") as f:\n    records = [json.loads(line) for line in f if line.strip()]\n```\n\n**Trailing commas and comments aren't valid JSON.** `{\"a\": 1,}` or `// comment` will raise `JSONDecodeError`. If you're stuck with such files, use the `json5` or `commentjson` package.\n\n**Huge files:** `json.load()` builds the whole structure in memory. For files that don't fit, use a streaming parser like [`ijson`](https://pypi.org/project/ijson/):\n\n```python\nimport ijson\n\nwith open(\"huge.json\", \"rb\") as f:\n    for record in ijson.items(f, \"users.item\"):\n        process(record)\n```\n\n## Writing it back out\n\nFor completeness:\n\n```python\nwith open(\"out.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f, indent=2, ensure_ascii=False)\n```\n\n`indent=2` makes it human-readable; `ensure_ascii=False` keeps non-ASCII characters as-is instead of escaping them to `\\uXXXX`."
    }
  ],
  "model": "claude-opus-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 38,
    "output_tokens": 1398,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

▶messages\[]

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

▶content\[]

`array`

model

`string`

stop\_reason

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/#page","headline":"Claude Opus 5 (Anthropic) · Cloudflare AI docs · Cloudflare AI docs","description":"Claude Opus 5 is Anthropic's model for complex agentic coding and enterprise work, delivering intelligence close to Claude Fable 5 at half the price. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing. Unlike Fable 5, Opus 5 has no data retention requirements for general access.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
