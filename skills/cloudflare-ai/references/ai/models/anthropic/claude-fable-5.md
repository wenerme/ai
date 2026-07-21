---
title: Claude Fable 5
description: Claude Fable 5 is Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work. Adaptive thinking is always on, and the model supports a 1M token context window with up to 128k output tokens per request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

#  Claude Fable 5

Text Generation • Anthropic

`anthropic/claude-fable-5`

Claude Fable 5 is Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work. Adaptive thinking is always on, and the model supports a 1M token context window with up to 128k output tokens per request.

| Model Info                                                                 |                                                                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                           |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                 |
| More information                                                           | [link ↗](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)           |
| Request formats                                                            | Anthropic Messages                                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-fable-5) |

## Usage

* [ TypeScript ](#tab-panel-138)
* [ cURL ](#tab-panel-139)

**TypeScript**

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5',
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
  "model": "anthropic/claude-fable-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

* [ Output ](#tab-panel-142)
* [ Raw response ](#tab-panel-143)

# The Three Laws of Thermodynamics

## First Law: Conservation of Energy
Energy cannot be created or destroyed—only converted from one form to another. The total energy of an isolated system remains constant.

**Formula:** ΔU = Q − W (change in internal energy = heat added − work done by the system)

**Example:** When you burn fuel in an engine, chemical energy converts to heat and mechanical work, but the total energy is conserved.

## Second Law: Entropy Increases
The entropy (disorder) of an isolated system always increases over time. Heat flows spontaneously from hot objects to cold ones, never the reverse.

**Key implications:**
- No heat engine can be 100% efficient
- Natural processes are irreversible
- It explains why time seems to have a direction ("arrow of time")

**Example:** An ice cube melts in warm water, but you'll never see warm water spontaneously form an ice cube.

## Third Law: Absolute Zero
As a system approaches absolute zero (0 Kelvin, or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.

**Example:** Scientists can get extremely close to absolute zero (billionths of a degree above), but never quite reach it.

---

**Bonus — The Zeroth Law:** Added later but considered more fundamental: if two systems are each in thermal equilibrium with a third system, they're in equilibrium with each other. This is what makes thermometers work!

A popular summary: *"You can't win (1st), you can't break even (2nd), and you can't quit the game (3rd)."*

```json
{
  "id": "msg_01TEGjkVwYzfuHrCs5V1Q9de",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAISqAIKYggOGAIqQOscSUEIqskVCTFKJ0i4W90Fia0m32aS+8j6gvpJQkVwCImYZvUlLT0ngohDiWPGx+uORrrkI5qUFGBXijU7UVkyDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgwqVZaKUtMPjtT1ZB8aDHzMnpu8xeeshAEKESIwKiCTZBZGAysSVswoEkB20VfYeJeeMBAqcVEwop/ut0LXzwhnDUAEAYUg4kSv39yWKnTO/ICIz4jCyl7L4SMQd616l3PD2uCuyJRUtqnFLO40PxXgwz8fizzEJMSwFXcjTAkEOdo16C6bHJ7kahwYdjcrrvbQV8OFn0555bExOWsJYiTZVdRrO9XgzDVohWsByfew+FJU7cg/MhO5wA3FikOmOP01pBgB"
    },
    {
      "type": "text",
      "text": "# The Three Laws of Thermodynamics\n\n## First Law: Conservation of Energy\nEnergy cannot be created or destroyed—only converted from one form to another. The total energy of an isolated system remains constant.\n\n**Formula:** ΔU = Q − W (change in internal energy = heat added − work done by the system)\n\n**Example:** When you burn fuel in an engine, chemical energy converts to heat and mechanical work, but the total energy is conserved.\n\n## Second Law: Entropy Increases\nThe entropy (disorder) of an isolated system always increases over time. Heat flows spontaneously from hot objects to cold ones, never the reverse.\n\n**Key implications:**\n- No heat engine can be 100% efficient\n- Natural processes are irreversible\n- It explains why time seems to have a direction (\"arrow of time\")\n\n**Example:** An ice cube melts in warm water, but you'll never see warm water spontaneously form an ice cube.\n\n## Third Law: Absolute Zero\nAs a system approaches absolute zero (0 Kelvin, or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n\n**Example:** Scientists can get extremely close to absolute zero (billionths of a degree above), but never quite reach it.\n\n---\n\n**Bonus — The Zeroth Law:** Added later but considered more fundamental: if two systems are each in thermal equilibrium with a third system, they're in equilibrium with each other. This is what makes thermometers work!\n\nA popular summary: *\"You can't win (1st), you can't break even (2nd), and you can't quit the game (3rd).\"*"
    }
  ],
  "model": "claude-fable-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 20,
    "output_tokens": 577
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**With System Message**  — Using a system message to set context

* [ TypeScript ](#tab-panel-140)
* [ cURL ](#tab-panel-141)

**TypeScript**

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5',
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
  "model": "anthropic/claude-fable-5",
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

* [ Output ](#tab-panel-150)
* [ Raw response ](#tab-panel-151)

# Reading a JSON File in Python

Use the built-in `json` module with the `json.load()` function:

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

print(data)
```

## Key Points

- **`json.load(file)`** — reads JSON from a *file object*
- **`json.loads(string)`** — parses JSON from a *string* (note the "s")
- The `with` statement automatically closes the file when done

## Accessing the Data

JSON objects become Python dictionaries, and JSON arrays become lists:

```python
# Given data.json:
# {
#   "name": "Alice",
#   "age": 30,
#   "hobbies": ["reading", "coding"]
# }

print(data["name"])        # Alice
print(data["age"])         # 30
print(data["hobbies"][0])  # reading
```

## Handling Errors

```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

## Type Conversions

| JSON | Python |
|------|--------|
| object | `dict` |
| array | `list` |
| string | `str` |
| number | `int` / `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

That's all you need for most use cases. For very large files, consider streaming libraries like `ijson`.

```json
{
  "id": "msg_013oB35i6D6cJW17UoavzSEs",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAIS9wEKYggOGAIqQFeZ1YZ5RyQ9EbHCqt5fSx9vMAMrhvdbZ+CLKMjT6OXEkD0ktq1p+6St3xTcEVpxkyLpemCD799ZbfCwYd+hJ8wyDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgzx2jYo+ujge2+SskIaDHjgiplZQMyTmf+LNyIwXid3ttbHyXFgieCEovuD3vs0EsVznHmbkYlIY9NyF+a/dx04UlNIrelymYxnEZX7KkPe1UpvY5zXlRmwx3hSBIEFA9FHalSXG7jipEwzoJeyxon8+/rF/zkHacZuq8melq/TmwNzVE4jNU6rDEuvJO0C4l9dGAE="
    },
    {
      "type": "text",
      "text": "# Reading a JSON File in Python\n\nUse the built-in `json` module with the `json.load()` function:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Key Points\n\n- **`json.load(file)`** — reads JSON from a *file object*\n- **`json.loads(string)`** — parses JSON from a *string* (note the \"s\")\n- The `with` statement automatically closes the file when done\n\n## Accessing the Data\n\nJSON objects become Python dictionaries, and JSON arrays become lists:\n\n```python\n# Given data.json:\n# {\n#   \"name\": \"Alice\",\n#   \"age\": 30,\n#   \"hobbies\": [\"reading\", \"coding\"]\n# }\n\nprint(data[\"name\"])        # Alice\nprint(data[\"age\"])         # 30\nprint(data[\"hobbies\"][0])  # reading\n```\n\n## Handling Errors\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n## Type Conversions\n\n| JSON | Python |\n|------|--------|\n| object | `dict` |\n| array | `list` |\n| string | `str` |\n| number | `int` / `float` |\n| `true` / `false` | `True` / `False` |\n| `null` | `None` |\n\nThat's all you need for most use cases. For very large files, consider streaming libraries like `ijson`."
    }
  ],
  "model": "claude-fable-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 38,
    "output_tokens": 537
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Multi-turn Conversation**  — Continuing a conversation with context

* [ TypeScript ](#tab-panel-146)
* [ cURL ](#tab-panel-147)

**TypeScript**

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5',
  {
    max_tokens: 1024,
    messages: [
      {
        content: 'I need help planning a road trip from San Francisco to Los Angeles.',
        role: 'user',
      },
      {
        content:
          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
        role: 'assistant',
      },
      { content: 'Yes, what are some good places to stop?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-fable-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "I need help planning a road trip from San Francisco to Los Angeles.",
      "role": "user"
    },
    {
      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
      "role": "assistant"
    },
    {
      "content": "Yes, what are some good places to stop?",
      "role": "user"
    }
  ]
}'
```

* [ Output ](#tab-panel-152)
* [ Raw response ](#tab-panel-153)

Great question! Your stops depend a lot on which route you take, so let me break it down:

## Highway 1 / Pacific Coast Highway (Scenic Route)
This adds significant time (10+ hours of driving) but is one of the most beautiful drives in the world:

- **Half Moon Bay** – Charming coastal town, great for breakfast
- **Santa Cruz** – Beach boardwalk and surf culture
- **Monterey & Carmel** – World-class aquarium, scenic 17-Mile Drive
- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls, redwood hikes
- **San Simeon** – Hearst Castle and elephant seal viewing at Piedras Blancas
- **Morro Bay** – Iconic Morro Rock
- **Pismo Beach** – Classic beach town vibes
- **Santa Barbara** – Beautiful Spanish architecture, wine country nearby
- **Malibu** – Beaches and a great way to roll into LA

## Highway 101 (Balanced Option, ~7-8 hours)
- **San Jose** – Winchester Mystery House
- **Gilroy** – Garlic capital (and outlet shopping)
- **Paso Robles** – Excellent wine region
- **San Luis Obispo** – Cute college town, Bubblegum Alley
- **Solvang** – Quirky Danish village with bakeries and windmills
- **Santa Barbara** – Same as above

## I-5 (Fastest, ~5-6 hours)
Honestly, not much to see—mostly farmland. Best stop is **Harris Ranch** in Coalinga for a famous steak lunch.

**My suggestion:** If you have 2+ days, take Highway 1 and stay overnight in Monterey, Big Sur, or San Luis Obispo. If you only have one day, 101 gives you a nice mix of speed and scenery.

How much time do you have for the trip? That'll help narrow down the best plan!

```json
{
  "id": "msg_01JoMwDGJCvYbHtRYpMaaVCp",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAISnQIKYggOGAIqQK/zBQqMA66bUkZi524Lt0j+w8Eutw4fEZezWpC3T8DkRpnoqnfcGJL1WYXiD+kMGT1/gHSAjBTaezw2E8x5XM8yDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgzQCE8UtUZmIwbubiUaDJd3PUdinhPnsMTDyCIwM6zPNTJBliPRjAxg0rXfsMOgkpBJ2f4PsQF8Qx1/OOnBTzzeThC3LqMxwIvRLQNpKmnrVhJc59urfrUjH5w+2LZJMmRg0KiCqdpSRx65zmj0us3grXlxJ5+5KQkaZMILR038gQ1uVGAQ6IhEzj2LaC5fGMRuo9onFlGkksp3s+gb1jaNoo7hEgxzzD+1GPmhtahCBIrXsJUBctAYAQ=="
    },
    {
      "type": "text",
      "text": "Great question! Your stops depend a lot on which route you take, so let me break it down:\n\n## Highway 1 / Pacific Coast Highway (Scenic Route)\nThis adds significant time (10+ hours of driving) but is one of the most beautiful drives in the world:\n\n- **Half Moon Bay** – Charming coastal town, great for breakfast\n- **Santa Cruz** – Beach boardwalk and surf culture\n- **Monterey & Carmel** – World-class aquarium, scenic 17-Mile Drive\n- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls, redwood hikes\n- **San Simeon** – Hearst Castle and elephant seal viewing at Piedras Blancas\n- **Morro Bay** – Iconic Morro Rock\n- **Pismo Beach** – Classic beach town vibes\n- **Santa Barbara** – Beautiful Spanish architecture, wine country nearby\n- **Malibu** – Beaches and a great way to roll into LA\n\n## Highway 101 (Balanced Option, ~7-8 hours)\n- **San Jose** – Winchester Mystery House\n- **Gilroy** – Garlic capital (and outlet shopping)\n- **Paso Robles** – Excellent wine region\n- **San Luis Obispo** – Cute college town, Bubblegum Alley\n- **Solvang** – Quirky Danish village with bakeries and windmills\n- **Santa Barbara** – Same as above\n\n## I-5 (Fastest, ~5-6 hours)\nHonestly, not much to see—mostly farmland. Best stop is **Harris Ranch** in Coalinga for a famous steak lunch.\n\n**My suggestion:** If you have 2+ days, take Highway 1 and stay overnight in Monterey, Big Sur, or San Luis Obispo. If you only have one day, 101 gives you a nice mix of speed and scenery.\n\nHow much time do you have for the trip? That'll help narrow down the best plan!"
    }
  ],
  "model": "claude-fable-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 103,
    "output_tokens": 706
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Creative Writing with Adaptive Thinking**  — Use adaptive thinking with high effort to steer creative output. Adaptive thinking is always on for Claude Fable 5; use the \`effort\` parameter to control depth.

* [ TypeScript ](#tab-panel-148)
* [ cURL ](#tab-panel-149)

**TypeScript**

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5',
  {
    max_tokens: 2048,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
    output_config: { effort: 'high' },
    thinking: { type: 'adaptive' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-fable-5",
  "max_tokens": 2048,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ],
  "output_config": {
    "effort": "high"
  },
  "thinking": {
    "type": "adaptive"
  }
}'
```

* [ Output ](#tab-panel-154)
* [ Raw response ](#tab-panel-155)

# The Paper Bird

Detective Mara Voss had worked homicide for eleven years, and in that time she'd catalogued every variety of crime scene debris: shell casings, cigarette butts, the sad confetti of torn receipts. But she had never found an origami crane perched in a dead man's open palm.

The victim—Gerald Fitch, fifty-three, accountant—lay sprawled across his kitchen floor as though he'd simply decided to stop standing. No wounds. No struggle. Just the crane, folded from heavy cream paper, balanced on his hand like it had landed there of its own accord.

"Don't touch it," she said, though the rookie behind her hadn't moved. She crouched, knees popping, and angled her flashlight at the paper bird. There—faint lines beneath the folds. Writing.

She photographed it from six angles before lifting it with gloved fingers, and unfolded it wing by wing with the care of someone defusing a bomb. The creases gave up their secret slowly: a single sentence, written in tight, slanted script.

*He counted everything except his sins.*

Mara read it three times. Then she looked back at Gerald Fitch's face—peaceful, almost smug, even in death—and felt the familiar cold prickle at the base of her skull. The one that told her this wasn't an ending.

It was an invitation.

```json
{
  "id": "msg_01VaGXWd9kdzHMepPnPHTTvG",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAISxgIKYggOGAIqQCa14WJvO05NEThN13nBXzVEqA35Ki9nluIV0epwzd5nZM6Iyotcv9JA6vAh21iikvC/FNzJso0wR6JiUwir4ekyDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgz1lKb9mdSCyv6XyPsaDNpKckL3pPM/5C9mkSIwNQrKl5lQs1F2p+1lxVtoAuthy8llMmyUgpy1coZQ4fmw3wlNJI98aNDajf9r3hGoKpEBiMAXur1Qp83FUupryf2Y2xHOMcH9MWev85QNIzNZapR30GC3aD1nTWv2a2cAUy9fZN+nEnPTstS8Wga900d1vDmhu42Yv+45MaE6Oa6syHzBO3+bSCZ/jioWSQxGhxw8jwGhR6DC6mp2iDYZGKpTExw7WftcL6mYpKgBus50atpeUCWXi7/IdHqDUkPRyb1LRxgB"
    },
    {
      "type": "text",
      "text": "# The Paper Bird\n\nDetective Mara Voss had worked homicide for eleven years, and in that time she'd catalogued every variety of crime scene debris: shell casings, cigarette butts, the sad confetti of torn receipts. But she had never found an origami crane perched in a dead man's open palm.\n\nThe victim—Gerald Fitch, fifty-three, accountant—lay sprawled across his kitchen floor as though he'd simply decided to stop standing. No wounds. No struggle. Just the crane, folded from heavy cream paper, balanced on his hand like it had landed there of its own accord.\n\n\"Don't touch it,\" she said, though the rookie behind her hadn't moved. She crouched, knees popping, and angled her flashlight at the paper bird. There—faint lines beneath the folds. Writing.\n\nShe photographed it from six angles before lifting it with gloved fingers, and unfolded it wing by wing with the care of someone defusing a bomb. The creases gave up their secret slowly: a single sentence, written in tight, slanted script.\n\n*He counted everything except his sins.*\n\nMara read it three times. Then she looked back at Gerald Fitch's face—peaceful, almost smug, even in death—and felt the familiar cold prickle at the base of her skull. The one that told her this wasn't an ending.\n\nIt was an invitation."
    }
  ],
  "model": "claude-fable-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 26,
    "output_tokens": 487
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Streaming Response**  — Enable streaming for real-time output

* [ TypeScript ](#tab-panel-144)
* [ cURL ](#tab-panel-145)

**TypeScript**

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5',
  {
    max_tokens: 1024,
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-fable-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true
}'
```

* [ Output ](#tab-panel-156)
* [ Raw response ](#tab-panel-157)

# Recursion

**Recursion** is a programming concept where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components

Every recursive function needs two parts:

1. **Base case** — a condition that stops the recursion (prevents infinite loops)
2. **Recursive case** — where the function calls itself with a smaller/simpler input

## Simple Example: Factorial

The factorial of a number `n` (written `n!`) is the product of all positive integers up to `n`:

- `5! = 5 × 4 × 3 × 2 × 1 = 120`

Notice the pattern: `5! = 5 × 4!` — the problem contains a smaller version of itself. Perfect for recursion!

```python
def factorial(n):
    if n <= 1:          # Base case
        return 1
    else:               # Recursive case
        return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

## How It Unfolds

```
factorial(5)
= 5 × factorial(4)
= 5 × 4 × factorial(3)
= 5 × 4 × 3 × factorial(2)
= 5 × 4 × 3 × 2 × factorial(1)
= 5 × 4 × 3 × 2 × 1      ← base case reached
= 120
```

The calls "stack up" until hitting the base case, then results are multiplied back up the chain.

## An Intuitive Analogy

Imagine you're in a movie theater line and want to know your position. Instead of counting everyone yourself, you ask the person in front of you, "What's your position?" They ask the person in front of them... until someone at the front says "I'm first!" (base case). Then each person adds 1 and passes the answer back.

## When to Use Recursion

Recursion shines for naturally recursive structures like:
- Tree traversal
- Directory/file systems
- Divide-and-conquer algorithms (e.g., merge sort)

⚠️ **Caution:** Without a proper base case, recursion runs forever and causes a *stack overflow*.

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-fable-5",
      "id": "msg_01Rwmx9xySGeaRDPFstZ7gMV",
      "type": "message",
      "role": "assistant",
      "content": [],
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 22,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 1,
        "service_tier": "standard",
        "inference_geo": "global"
      }
    }
  },
  {
    "type": "content_block_start",
    "index": 0,
    "content_block": {
      "type": "text",
      "text": ""
    }
  },
  {
    "type": "ping"
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "#"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " Recursion\n\n**Recursion** is a programming concept where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": ".\n\n## Key Components\n\nEvery recursive function needs two parts:\n\n1. **Base case** — a condition that stops the recursion (prevents infinite loops)\n2. **"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "Recursive case** — where the function calls itself with a smaller/simpler input\n\n## Simple Example: Factorial\n\nThe factorial of a number `"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "n` (written `n!`) is the product of all positive integers up to `n`:\n\n- `5! = 5 × 4 × 3 × 2 × 1 = 120`\n\nNotice"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " the pattern: `5! = 5 × 4!` — the problem contains a smaller version of itself."
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " Perfect for recursion!\n\n```python\ndef factorial(n):\n    if n <= 1:          # Base case\n        return 1\n    else:               # Recursive case\n        "
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n## How It Unfolds\n\n```\nfactorial(5)\n= 5 × factorial("
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "4)\n= 5 × 4 × factorial(3)\n= 5 × 4 × 3 × factorial(2)\n= 5 × 4 × 3 × 2 × factorial(1)\n="
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " 5 × 4 × 3 × 2 × 1      ← base case reached\n= 120\n```\n\nThe calls \"stack up\" until h"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "itting the base case, then results are multiplied back up the chain.\n\n## An Intuitive Analogy\n\nImagine you're in"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " a movie theater line and want to know your position. Instead of counting everyone yourself, you ask the person in front of you,"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " \"What's your position?\" They ask the person in front of them... until someone at the front says \"I'm first!\" (base case). Then each person adds 1 and"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " passes the answer back.\n\n## When to Use Recursion\n\nRecursion shines for naturally recursive structures like"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": ":\n- Tree traversal\n- Directory/file systems\n- Divide-and-conquer algorithms (e.g., merge sort)"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "\n\n⚠️ **Caution:** Without a proper base case, recursion runs forever and causes a *stack overflow*."
    }
  },
  {
    "type": "content_block_stop",
    "index": 0
  },
  {
    "type": "message_delta",
    "delta": {
      "stop_reason": "end_turn",
      "stop_sequence": null,
      "stop_details": null
    },
    "usage": {
      "input_tokens": 22,
      "cache_creation_input_tokens": 0,
      "cache_read_input_tokens": 0,
      "output_tokens": 689,
      "output_tokens_details": {
        "thinking_tokens": 0
      }
    }
  },
  {
    "type": "message_stop"
  }
]
```

## Parameters

* [ Input ](#tab-panel-158)
* [ Output ](#tab-panel-159)

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

Input [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/#page","headline":"Claude Fable 5 (Anthropic) · Cloudflare AI docs · Cloudflare AI docs","description":"Claude Fable 5 is Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work. Adaptive thinking is always on, and the model supports a 1M token context window with up to 128k output tokens per request.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
