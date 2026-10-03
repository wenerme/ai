---
description: GPT-5 Nano is OpenAI’s smallest GPT-5 variant, optimized for low latency and cheap, high-throughput tasks.
title: GPT-5 nano
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-5 nano

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-5-nano`

- Third-party
- Zero data retention

GPT-5 Nano is OpenAI’s smallest GPT-5 variant, optimized for low latency and cheap, high-throughput tasks.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 128,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$0.05</li><li>Output (per 1M tokens)$0.40</li><li>Cached input (per 1M tokens)$0.005</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-5-nano',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5-nano",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
There are four laws in the standard formulation, but many introductions refer to the three fundamental ones (the Zeroth law is often treated separately). Here are the three most commonly cited (plus a note about the fourth):

Three fundamental laws (often taught as the main ones)
- First Law (Energy conservation): For a closed system, the change in internal energy equals heat added minus work done by the system.
  ΔU = Q − W
  (Q is heat in, W is work done by the system on the surroundings.)

- Second Law (Entropy and direction of processes): In any spontaneous process, the total entropy of an isolated system increases (or stays the same for reversible processes).
  ΔS ≥ 0
  Equivalently, you can state that you cannot convert all heat into work in a cyclic process (Kelvin–Planck) and that heat cannot spontaneously flow from cold to hot (Clausius).

- Third Law (Asymptotic behavior at low temperature): As temperature approaches absolute zero, the entropy of a perfect crystal approaches a constant minimum (often taken as zero). Practically, absolute zero cannot be reached in a finite number of steps (unattainability).

Note on Zeroth Law
- Zeroth Law: If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This provides the definition of temperature: if A and C are in equilibrium, and B and C are in equilibrium, then A and B are in equilibrium. It underpins the concept of temperature as a property that can be compared.

If you want, I can also give a few simple examples illustrating each law.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "There are four laws in the standard formulation, but many introductions refer to the three fundamental ones (the Zeroth law is often treated separately). Here are the three most commonly cited (plus a note about the fourth):\n\nThree fundamental laws (often taught as the main ones)\n- First Law (Energy conservation): For a closed system, the change in internal energy equals heat added minus work done by the system.\n  ΔU = Q − W\n  (Q is heat in, W is work done by the system on the surroundings.)\n\n- Second Law (Entropy and direction of processes): In any spontaneous process, the total entropy of an isolated system increases (or stays the same for reversible processes).\n  ΔS ≥ 0\n  Equivalently, you can state that you cannot convert all heat into work in a cyclic process (Kelvin–Planck) and that heat cannot spontaneously flow from cold to hot (Clausius).\n\n- Third Law (Asymptotic behavior at low temperature): As temperature approaches absolute zero, the entropy of a perfect crystal approaches a constant minimum (often taken as zero). Practically, absolute zero cannot be reached in a finite number of steps (unattainability).\n\nNote on Zeroth Law\n- Zeroth Law: If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This provides the definition of temperature: if A and C are in equilibrium, and B and C are in equilibrium, then A and B are in equilibrium. It underpins the concept of temperature as a property that can be compared.\n\nIf you want, I can also give a few simple examples illustrating each law.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319975,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMP9juESnbcNqeQyt9DdJmF9QM0t",
  "model": "gpt-5-nano-2025-08-07",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 1307,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 960,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 15,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 1322
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5-nano',
  {
    messages: [
      { content: 'You are a helpful coding assistant specializing in Python.', role: 'system' },
      { content: 'How do I read a JSON file in Python?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5-nano",
  "messages": [
    {
      "content": "You are a helpful coding assistant specializing in Python.",
      "role": "system"
    },
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ]
}'
```

````
You can read a JSON file in Python using the built-in json module. Open the file and use json.load to parse it into Python objects (usually dictionaries or lists).

A simple example:
- read a JSON object from a file into a Python dict

```python
import json

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(type(data))  # dict or list
print(data)
```

Notes and variations:
- If you have a JSON string (not a file), use json.loads:
```python
import json

s = '{"name": "Alice", "age": 30}'
data = json.loads(s)
```

- Handle errors:
```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
except json.JSONDecodeError as e:
    print("Invalid JSON:", e)
```

- Use pathlib for nicer path handling:
```python
from pathlib import Path
import json

p = Path('data.json')
with p.open('r', encoding='utf-8') as f:
    data = json.load(f)
```

- Large files: json.load reads the whole file into memory. If the file is huge, consider:
  - processing a newline-delimited JSON (NDJSON) file line by line
  - or using a streaming parser like ijson

Example for NDJSON:
```python
import json

with open('data.ndjson', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        # process obj
```

- Optional customization: you can use object_hook to customize how dicts are turned into objects:
```python
import json
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

def decode_person(d):
    if 'name' in d and 'age' in d:
        return Person(d['name'], d['age'])
    return d

with open('people.json', 'r', encoding='utf-8') as f:
    data = json.load(f, object_hook=decode_person)
```

If you tell me the shape of your JSON (dict vs list, any large size concerns), I can tailor the example.
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "You can read a JSON file in Python using the built-in json module. Open the file and use json.load to parse it into Python objects (usually dictionaries or lists).\n\nA simple example:\n- read a JSON object from a file into a Python dict\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as f:\n    data = json.load(f)\n\nprint(type(data))  # dict or list\nprint(data)\n```\n\nNotes and variations:\n- If you have a JSON string (not a file), use json.loads:\n```python\nimport json\n\ns = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(s)\n```\n\n- Handle errors:\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as f:\n        data = json.load(f)\nexcept json.JSONDecodeError as e:\n    print(\"Invalid JSON:\", e)\n```\n\n- Use pathlib for nicer path handling:\n```python\nfrom pathlib import Path\nimport json\n\np = Path('data.json')\nwith p.open('r', encoding='utf-8') as f:\n    data = json.load(f)\n```\n\n- Large files: json.load reads the whole file into memory. If the file is huge, consider:\n  - processing a newline-delimited JSON (NDJSON) file line by line\n  - or using a streaming parser like ijson\n\nExample for NDJSON:\n```python\nimport json\n\nwith open('data.ndjson', 'r', encoding='utf-8') as f:\n    for line in f:\n        obj = json.loads(line)\n        # process obj\n```\n\n- Optional customization: you can use object_hook to customize how dicts are turned into objects:\n```python\nimport json\nfrom dataclasses import dataclass\n\n@dataclass\nclass Person:\n    name: str\n    age: int\n\ndef decode_person(d):\n    if 'name' in d and 'age' in d:\n        return Person(d['name'], d['age'])\n    return d\n\nwith open('people.json', 'r', encoding='utf-8') as f:\n    data = json.load(f, object_hook=decode_person)\n```\n\nIf you tell me the shape of your JSON (dict vs list, any large size concerns), I can tailor the example.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319979,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMPDVD85J31ue22YYuw6KL8rE5q5",
  "model": "gpt-5-nano-2025-08-07",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 2035,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 1536,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 30,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 2065
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5-nano',
  {
    max_completion_tokens: 8192,
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5-nano",
  "max_completion_tokens": 8192,
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

```
Great question. Here are some standout stops for two popular SF-to-LA routes. Pick the vibe you want and I can tailor a day-by-day plan.

Option 1 — Scenic Pacific Coast Highway (CA-1 / US-101)
- Santa Cruz: Beach boardwalk, Wharf, redwood forests nearby (Henry Cowell Redwoods State Park).
- Monterey: Monterey Bay Aquarium, Cannery Row, Old Fisherman’s Wharf; consider the 17-Mile Drive for spectacular coastal scenery.
- Carmel-by-the-Sea: Charming village, art galleries, white-sand beaches; great for a stroll and lunch.
- Big Sur: Breathtaking coastline. Must-see spots include Bixby Creek Bridge, Pfeiffer Beach, and McWay Falls (Julia Pfeiffer Burns State Park).
- San Simeon: Hearst Castle tours (book in advance); possible elephant seal viewing at Piedras Blancas Beach.
- Morro Bay / San Luis Obispo: Morro Rock views, water activities in Morro Bay; stroll SLO’s downtown and Bubblegum Alley.
- Pismo Beach or Santa Barbara: Long beaches, pier, and laid-back coastal vibes; Santa Barbara adds Mission, Stearns Wharf, and the Funk Zone wine area (or detour to Solvang, a Danish-style village).
- Santa Barbara to Malibu/Ventura: Beautiful coastal towns and beaches; good for a lunch stop.
- Malibu to Santa Monica / Venice Beach: Classic Southern California coast with great seafood spots and iconic piers.
- Los Angeles area: If you’re ending in LA, you’ll have countless options for museums, beaches, and dining.

Option 2 — Inland I-5 Corridor (fastest, more practical for a quick trip)
- Gilroy: Garlic farms and a solid stop for a quick bite or a stroll through the outlets.
- Harris Ranch (Coalinga area): Famous steakhouse lunch stop; a handy fuel/thematic break.
- Kettleman City / Buttonwillow: Quick rest stops with gas, snacks, and bathrooms.
- Bakersfield: A larger stop with a few cultural options (Buck Owens Crystal Palace, Kern County Museum, downtown stroll).
- (Optional detour if you want a wine break) Paso Robles or Santa Ynez wine country a short detour off the main I-5 route.
- Santa Clarita / Valencia (near LA): If you want a theme-park or city-break break before hitting the LA basin.
- Then onward to the Los Angeles area (Malibu, Santa Monica, Venice, or downtown LA depending on your end point).

A few ready-made itinerary ideas
- 3-day coastal loop (full coast life, slower pace):
  Day 1: SF → Santa Cruz → Monterey/Carmel (overnight in Monterey or Carmel)
  Day 2: Big Sur coast → San Simeon (Hearst Castle) → Morro Bay (overnight)
  Day 3: Morro Bay → Santa Barbara → Malibu/Santa Monica (overnight or continue to LA)
- 4–5 days for a relaxed coastal trip:
  Add: Pismo Beach, Santa Barbara wine country detour (Solvang nearby), a longer stay in Santa Monica or Malibu, plus time in LA’s beach areas or neighborhoods.

Tips to make it smooth
- Book ahead for popular spots (Hearst Castle tours, 17-Mile Drive if you plan to stop there).
- Check CA-1 conditions in winter and after storms; some sections can close or have slower speeds due to rockfalls.
- If you’re doing the coast, allow extra time for scenic stops and viewpoints.
- Bring layers, especially along the coast where it can be cool and windy, even on sunny days.
- For meals, Harris Ranch is a classic inland lunch stop on I-5; along the coast you’ll find many casual to upscale options in each town.

Would you like me to tailor a day-by-day plan based on:
- How many days you have
- Whether you prefer the coastal route or the inland route
- Your interests (wine, hiking, beaches, food, photography)
- Any must-see stops or budget/overnight constraints?
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Great question. Here are some standout stops for two popular SF-to-LA routes. Pick the vibe you want and I can tailor a day-by-day plan.\n\nOption 1 — Scenic Pacific Coast Highway (CA-1 / US-101)\n- Santa Cruz: Beach boardwalk, Wharf, redwood forests nearby (Henry Cowell Redwoods State Park).\n- Monterey: Monterey Bay Aquarium, Cannery Row, Old Fisherman’s Wharf; consider the 17-Mile Drive for spectacular coastal scenery.\n- Carmel-by-the-Sea: Charming village, art galleries, white-sand beaches; great for a stroll and lunch.\n- Big Sur: Breathtaking coastline. Must-see spots include Bixby Creek Bridge, Pfeiffer Beach, and McWay Falls (Julia Pfeiffer Burns State Park).\n- San Simeon: Hearst Castle tours (book in advance); possible elephant seal viewing at Piedras Blancas Beach.\n- Morro Bay / San Luis Obispo: Morro Rock views, water activities in Morro Bay; stroll SLO’s downtown and Bubblegum Alley.\n- Pismo Beach or Santa Barbara: Long beaches, pier, and laid-back coastal vibes; Santa Barbara adds Mission, Stearns Wharf, and the Funk Zone wine area (or detour to Solvang, a Danish-style village).\n- Santa Barbara to Malibu/Ventura: Beautiful coastal towns and beaches; good for a lunch stop.\n- Malibu to Santa Monica / Venice Beach: Classic Southern California coast with great seafood spots and iconic piers.\n- Los Angeles area: If you’re ending in LA, you’ll have countless options for museums, beaches, and dining.\n\nOption 2 — Inland I-5 Corridor (fastest, more practical for a quick trip)\n- Gilroy: Garlic farms and a solid stop for a quick bite or a stroll through the outlets.\n- Harris Ranch (Coalinga area): Famous steakhouse lunch stop; a handy fuel/thematic break.\n- Kettleman City / Buttonwillow: Quick rest stops with gas, snacks, and bathrooms.\n- Bakersfield: A larger stop with a few cultural options (Buck Owens Crystal Palace, Kern County Museum, downtown stroll).\n- (Optional detour if you want a wine break) Paso Robles or Santa Ynez wine country a short detour off the main I-5 route.\n- Santa Clarita / Valencia (near LA): If you want a theme-park or city-break break before hitting the LA basin.\n- Then onward to the Los Angeles area (Malibu, Santa Monica, Venice, or downtown LA depending on your end point).\n\nA few ready-made itinerary ideas\n- 3-day coastal loop (full coast life, slower pace):\n  Day 1: SF → Santa Cruz → Monterey/Carmel (overnight in Monterey or Carmel)\n  Day 2: Big Sur coast → San Simeon (Hearst Castle) → Morro Bay (overnight)\n  Day 3: Morro Bay → Santa Barbara → Malibu/Santa Monica (overnight or continue to LA)\n- 4–5 days for a relaxed coastal trip:\n  Add: Pismo Beach, Santa Barbara wine country detour (Solvang nearby), a longer stay in Santa Monica or Malibu, plus time in LA’s beach areas or neighborhoods.\n\nTips to make it smooth\n- Book ahead for popular spots (Hearst Castle tours, 17-Mile Drive if you plan to stop there).\n- Check CA-1 conditions in winter and after storms; some sections can close or have slower speeds due to rockfalls.\n- If you’re doing the coast, allow extra time for scenic stops and viewpoints.\n- Bring layers, especially along the coast where it can be cool and windy, even on sunny days.\n- For meals, Harris Ranch is a classic inland lunch stop on I-5; along the coast you’ll find many casual to upscale options in each town.\n\nWould you like me to tailor a day-by-day plan based on:\n- How many days you have\n- Whether you prefer the coastal route or the inland route\n- Your interests (wine, hiking, beaches, food, photography)\n- Any must-see stops or budget/overnight constraints?",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777421265,
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "chatcmpl-DZmkrO6ReFPBgbE0saPZqQIRxy3pu",
  "model": "gpt-5-nano-2025-08-07",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 5919,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 5056,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 76,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 5995
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5-nano',
  {
    max_completion_tokens: 8192,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5-nano",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ]
}'
```

```
The rain turned the city into a bleary watercolor, every streetlight smeared into halos that bled down the sidewalks. Detective Isla Voss slipped into the alley behind the Glasswright Gallery, where the security guard stood under a lone lamp, shaking out a soggy notebook. The building loomed quiet and serene, the way a locked box does after a storm. Inside, something had happened, but nothing obvious remained.

“Not a thing missing,” the guard said, eyes wary. “Doors were closed, windows intact. Nothing broken, nothing stolen. Just… not right.”

Isla nodded, stepping under the gallery’s arched doorway where the vestibule held a stale room-temperature hush. The air smelled faintly of varnish and rain—less a crime scene and more a paused painting. The security alarm blinked from red to green as she moved past the lobby into the main hall, where the telltale tremor of a disturbance usually left a visible trace. Here, though, the room wore its normalities as if nothing at all had happened.

In the center of the hall, where the monumental skylight draped the floor in pale glass, lay the oddity: a perfect ring of soot on the white marble, as if someone had circled the space with a tiny, patient brush of charcoal. No dent in the glass, no broken frame, no shard of glass anywhere to indicate a break-in. Just that ring. And inside the ring, the soot had arranged itself into a meticulous, minuscule map—an urban silhouette, a cityscape drawn in black granules and negative space.

Isla crouched, pulled out her ultraviolet flashlight, and leaned close. The soot glowed faintly blue under the peculiar light, the color of a firefly trapped in dusk. The ring itself wasn’t random; the pattern suggested streets, rooftops, a river that ran like a blue thread through the middle of the composition. It wasn’t a doodle, not a mere prank. It was a clue, and a strange one at that.

The gallery’s curator, a thin man with a voice like a piano wire, appeared at Isla’s shoulder. “You see?” he whispered. “We deal with paintings here, not disguises. But this—this feels like a message.”

Isla stood, letting the light wash over the ring again. A city map drawn in soot—how could that be? She’d seen fingerprints that spelled out names, footprints that traced a route, but a map formed by ash and pigment and gravity’s small mercy was something else entirely. It demanded a different kind of attention, the sort she reserved for echoes and memory rather than objects.

“Who had access to this room after hours?” she asked the curator, keeping her tone light, as if discussing a curious trick rather than a possible crime.

The curator scanned the room, as if the answer might be hiding in the corners, the way a receipt might hide between two books on a shelf. “We lock up at six. The security feed is clean. The assistant, Mina, is the only other person who might have wandered in—she cleans up after close. But Mina’s never late, never stops to sketch.” He hesitated. “And she’s… unreliable to strangers’ eyes, if you’ll forgive the honesty.”

Isla offered a small, almost-smile. “People aren’t always what they seem. We’ll talk to Mina. And the feed will tell us whether someone else tried to tamper with the room. But tell me, why a map? Why this room?”

The curator shrugged, his lips thinning. “We publish nothing here that could draw a map of the city exactly. It’s too precise. The only thing that’s ever aligned as neatly as this is a plan for a private tour—one that never happened, not officially.”

Her eyes drifted to the ring again. The map was too precise to be a prank, too delicate to be a mere coincidence. That was good. Clues should be precise enough to be trusted, but not so obvious they screamed.

Isla stood slowly, letting another breath of rain-salted air slip past her lips. She looked up at the skylight, where the rain pattered on the glass in a pattern that made the room feel almost musical. The glow from the map deepened when she traced a line with her finger, right along the imagined avenue that would pass beneath the museum’s floor if the city’s hidden corridors existed.

“Tell me about the last event here,” she said, her voice deliberately casual. “The last exhibit, the last guest, the last thing anyone talked about.”

The curator drew in a sharp breath. “A storm of artists. A show that never quite ended. The last thing—the piece that the thief would want: a single painting—a landscape of a street in a city that isn’t ours, a city made of shadows and rumor. The piece was insured for a fortune, yet nobody claimed it as theirs.”

A city map in soot, a password of sorts etched without anyone realizing. Isla turned the ring of ashes, watching the map shift as the light moved, the river’s blue thread glimmering more clearly at one angle than another. The clue wasn’t merely a map; it was a sign that someone who knew the city intimately had walked into this room and left a message that only a person with that same intimacy could decipher.

Her instincts nudged her toward the back corridor, where the staff’s break room met the service stairs. The door had a thin smear of dust along its edge, the kind that builds up when a space isn’t used often enough by more than two or three people. She pressed her gloved finger to the dust, then to her lips, a quick, almost subconscious ritual. The dust retained a faint metallic tang—not obvious, but clear to someone who paid attention to such traces.

Back in the main hall, the guard spoke up again. “Mina, you’re thinking Mina, right? She’s the one who cleans the room and who night shifts some weeks. If anyone could conjure a map out of ash, it would be her.”

Isla considered Mina’s possible motives with the cool precision of a clockmaker adjusting a gear. A map drawn in soot could be a confession, a direction, or a trap. An invitation to follow a path that only someone who knows the city’s more intimate lies would recognize.

She walked toward the break room doorway, every step measured, listening for the smallest sound—a floorboard sigh, a shifted chair, the whisper of a lung trying not to betray fear. In the quiet, she heard not a noise but a breath—someone’s subtle exhale, a sign of life where there shouldn’t be life in the dead of night.

Inside, Mina stood with her back to the door, cleaning a coffee mug with a rag that had seen better days. The mug’s handle rattled faintly as she moved, the sound crisp in the hushed room.

“Good evening,” Isla said, still almost polite, though the room’s air felt charged, like a string about to snap.

Mina turned slowly, eyes widening at the sight of the glow from the map still faintly visible on the marble floor. She swallowed, the tremor in her throat betraying her attempt at calm. “I didn’t mean to—” she began, but trailed off when Isla raised a hand.

“Tell me about the map,” Isla said softly. “Why draw a city here, in a place that doesn’t even belong to this room?”

Mina’s lips pressed together. She looked at the map, then at Isla, as if weighing whether honesty would survive in the space between them. When she spoke, her voice was little more than a whisper, but it carried the weight of a confession long rehearsed in the quiet corners of the city.

And then the room’s lights flickered, briefly bathing them in a cold, blue glare. The map’s glow intensified on the marble floor, suggesting a route, a password, a path through the city’s hidden veins. It wasn’t a trap, not yet. It was an invitation.

Isla realized then what the clue was truly asking: not who would steal or why, but where to begin. The map wasn’t just a message; it was a map of the city’s memory, drawn by someone who knew where every shadow slept and which doors remained unlocked after hours.

In that moment, she understood that the unusual clue wasn’t merely the soot, or the glow of the map, or even Mina’s whispered confession. It was the promise of a trail that stretched beyond the gallery walls and into the heart of a city that spoke in smoke, light, and memory. And she intended to follow it, one precise step at a time.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "The rain turned the city into a bleary watercolor, every streetlight smeared into halos that bled down the sidewalks. Detective Isla Voss slipped into the alley behind the Glasswright Gallery, where the security guard stood under a lone lamp, shaking out a soggy notebook. The building loomed quiet and serene, the way a locked box does after a storm. Inside, something had happened, but nothing obvious remained.\n\n“Not a thing missing,” the guard said, eyes wary. “Doors were closed, windows intact. Nothing broken, nothing stolen. Just… not right.”\n\nIsla nodded, stepping under the gallery’s arched doorway where the vestibule held a stale room-temperature hush. The air smelled faintly of varnish and rain—less a crime scene and more a paused painting. The security alarm blinked from red to green as she moved past the lobby into the main hall, where the telltale tremor of a disturbance usually left a visible trace. Here, though, the room wore its normalities as if nothing at all had happened.\n\nIn the center of the hall, where the monumental skylight draped the floor in pale glass, lay the oddity: a perfect ring of soot on the white marble, as if someone had circled the space with a tiny, patient brush of charcoal. No dent in the glass, no broken frame, no shard of glass anywhere to indicate a break-in. Just that ring. And inside the ring, the soot had arranged itself into a meticulous, minuscule map—an urban silhouette, a cityscape drawn in black granules and negative space.\n\nIsla crouched, pulled out her ultraviolet flashlight, and leaned close. The soot glowed faintly blue under the peculiar light, the color of a firefly trapped in dusk. The ring itself wasn’t random; the pattern suggested streets, rooftops, a river that ran like a blue thread through the middle of the composition. It wasn’t a doodle, not a mere prank. It was a clue, and a strange one at that.\n\nThe gallery’s curator, a thin man with a voice like a piano wire, appeared at Isla’s shoulder. “You see?” he whispered. “We deal with paintings here, not disguises. But this—this feels like a message.”\n\nIsla stood, letting the light wash over the ring again. A city map drawn in soot—how could that be? She’d seen fingerprints that spelled out names, footprints that traced a route, but a map formed by ash and pigment and gravity’s small mercy was something else entirely. It demanded a different kind of attention, the sort she reserved for echoes and memory rather than objects.\n\n“Who had access to this room after hours?” she asked the curator, keeping her tone light, as if discussing a curious trick rather than a possible crime.\n\nThe curator scanned the room, as if the answer might be hiding in the corners, the way a receipt might hide between two books on a shelf. “We lock up at six. The security feed is clean. The assistant, Mina, is the only other person who might have wandered in—she cleans up after close. But Mina’s never late, never stops to sketch.” He hesitated. “And she’s… unreliable to strangers’ eyes, if you’ll forgive the honesty.”\n\nIsla offered a small, almost-smile. “People aren’t always what they seem. We’ll talk to Mina. And the feed will tell us whether someone else tried to tamper with the room. But tell me, why a map? Why this room?”\n\nThe curator shrugged, his lips thinning. “We publish nothing here that could draw a map of the city exactly. It’s too precise. The only thing that’s ever aligned as neatly as this is a plan for a private tour—one that never happened, not officially.”\n\nHer eyes drifted to the ring again. The map was too precise to be a prank, too delicate to be a mere coincidence. That was good. Clues should be precise enough to be trusted, but not so obvious they screamed.\n\nIsla stood slowly, letting another breath of rain-salted air slip past her lips. She looked up at the skylight, where the rain pattered on the glass in a pattern that made the room feel almost musical. The glow from the map deepened when she traced a line with her finger, right along the imagined avenue that would pass beneath the museum’s floor if the city’s hidden corridors existed.\n\n“Tell me about the last event here,” she said, her voice deliberately casual. “The last exhibit, the last guest, the last thing anyone talked about.”\n\nThe curator drew in a sharp breath. “A storm of artists. A show that never quite ended. The last thing—the piece that the thief would want: a single painting—a landscape of a street in a city that isn’t ours, a city made of shadows and rumor. The piece was insured for a fortune, yet nobody claimed it as theirs.”\n\nA city map in soot, a password of sorts etched without anyone realizing. Isla turned the ring of ashes, watching the map shift as the light moved, the river’s blue thread glimmering more clearly at one angle than another. The clue wasn’t merely a map; it was a sign that someone who knew the city intimately had walked into this room and left a message that only a person with that same intimacy could decipher.\n\nHer instincts nudged her toward the back corridor, where the staff’s break room met the service stairs. The door had a thin smear of dust along its edge, the kind that builds up when a space isn’t used often enough by more than two or three people. She pressed her gloved finger to the dust, then to her lips, a quick, almost subconscious ritual. The dust retained a faint metallic tang—not obvious, but clear to someone who paid attention to such traces.\n\nBack in the main hall, the guard spoke up again. “Mina, you’re thinking Mina, right? She’s the one who cleans the room and who night shifts some weeks. If anyone could conjure a map out of ash, it would be her.”\n\nIsla considered Mina’s possible motives with the cool precision of a clockmaker adjusting a gear. A map drawn in soot could be a confession, a direction, or a trap. An invitation to follow a path that only someone who knows the city’s more intimate lies would recognize.\n\nShe walked toward the break room doorway, every step measured, listening for the smallest sound—a floorboard sigh, a shifted chair, the whisper of a lung trying not to betray fear. In the quiet, she heard not a noise but a breath—someone’s subtle exhale, a sign of life where there shouldn’t be life in the dead of night.\n\nInside, Mina stood with her back to the door, cleaning a coffee mug with a rag that had seen better days. The mug’s handle rattled faintly as she moved, the sound crisp in the hushed room.\n\n“Good evening,” Isla said, still almost polite, though the room’s air felt charged, like a string about to snap.\n\nMina turned slowly, eyes widening at the sight of the glow from the map still faintly visible on the marble floor. She swallowed, the tremor in her throat betraying her attempt at calm. “I didn’t mean to—” she began, but trailed off when Isla raised a hand.\n\n“Tell me about the map,” Isla said softly. “Why draw a city here, in a place that doesn’t even belong to this room?”\n\nMina’s lips pressed together. She looked at the map, then at Isla, as if weighing whether honesty would survive in the space between them. When she spoke, her voice was little more than a whisper, but it carried the weight of a confession long rehearsed in the quiet corners of the city.\n\nAnd then the room’s lights flickered, briefly bathing them in a cold, blue glare. The map’s glow intensified on the marble floor, suggesting a route, a password, a path through the city’s hidden veins. It wasn’t a trap, not yet. It was an invitation.\n\nIsla realized then what the clue was truly asking: not who would steal or why, but where to begin. The map wasn’t just a message; it was a map of the city’s memory, drawn by someone who knew where every shadow slept and which doors remained unlocked after hours.\n\nIn that moment, she understood that the unusual clue wasn’t merel
... response truncated ...
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5-nano',
  {
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
    stream_options: { include_usage: true },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5-nano",
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true,
  "stream_options": {
    "include_usage": true
  }
}'
```

```
Recursion is when a function solves a problem by calling itself to solve a smaller version of the same problem, and it uses a simple base case to stop.

Key ideas:
- Base case: a simple, known result that ends the recursion.
- Recursive step: the function calls itself with a smaller problem.
- Each call adds a new frame to the call stack, and results are returned back up once the base case is reached.
- Recursion eventually terminates when the base case is reached.

Simple example: factorial
- The factorial of n (written n!) is defined as:
  - n! = n × (n-1)! for n > 0
  - 0! = 1 (base case)

Example trace for n = 4:
- 4! = 4 × 3!
- 3! = 3 × 2!
- 2! = 2 × 1!
- 1! = 1 × 0!
- 0! = 1
Now compute back up:
- 1! = 1
- 2! = 2 × 1 = 2
- 3! = 3 × 2 = 6
- 4! = 4 × 6 = 24

Python code:

def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))  # 120

Notes:
- Recursion is elegant and easy to express for problems like factorial, tree traversals, or divide-and-conquer tasks.
- It can use more memory due to the call stack and can hit a recursion depth limit for large inputs.
- An iterative version (loop) can be more memory-efficient if needed. Example:

def factorial_iter(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

If you’d like, I can tailor a recursion example to a different problem.
```

```json
[
  {
    "choices": [
      {
        "delta": {
          "content": "",
          "refusal": null,
          "role": "assistant"
        },
        "finish_reason": null,
        "index": 0
      }
    ],
    "created": 1777320010,
    "id": "chatcmpl-DZMPiZzou66Tn3iPi5undITqdrV1R",
    "model": "gpt-5-nano-2025-08-07",
    "obfuscation": "QaiOK",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": null
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Rec"
        },
        "finish_reason": null,
        "index": 0
      }
    ],
    "created": 1777320010,
    "id": "chatcmpl-DZMPiZzou66Tn3iPi5undITqdrV1R",
    "model": "gpt-5-nano-2025-08-07",
    "obfuscation": "3fFP",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": null
  },
  "... 422 more chunks omitted ...",
  {
    "choices": [],
    "created": 1777320010,
    "id": "chatcmpl-DZMPiZzou66Tn3iPi5undITqdrV1R",
    "model": "gpt-5-nano-2025-08-07",
    "obfuscation": "mfrEA02JD9ew9sU",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": {
      "completion_tokens": 2031,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 1600,
        "rejected_prediction_tokens": 0
      },
      "prompt_tokens": 16,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 0
      },
      "total_tokens": 2047
    }
  }
]
```

</details>

## Parameters

Schema variant

ResponsesChat Completions

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

▶messages\[]

`array`required

temperature

`number`minimum: 0maximum: 2

max\_tokens

`number`exclusiveMinimum: 0

max\_completion\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

frequency\_penalty

`number`minimum: -2maximum: 2

presence\_penalty

`number`minimum: -2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[]

`array`

tool\_choice

response\_format

▶modalities\[]

`array`

▶audio{}

`object`

reasoning\_effort

`string`Optional reasoning control; availability and accepted values are model-dependent.

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[]

`array`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/#page","headline":"GPT-5 nano","description":"GPT-5 Nano is OpenAI’s smallest GPT-5 variant, optimized for low latency and cheap, high-throughput tasks.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5-nano/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
