---
description: OpenAI's model excelling at coding, writing, and reasoning.
title: GPT-5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-5

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-5`

- Third-party
- Zero data retention

OpenAI's model excelling at coding, writing, and reasoning.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 128,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.25</li><li>Output (per 1M tokens)$10.00</li><li>Cached input (per 1M tokens)$0.125</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-5',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
- First law (energy conservation): The change in a system’s internal energy equals the heat added to the system minus the work done by the system. In symbols: ΔU = Q − W (with W defined as work done by the system).

- Second law (entropy increase): In any real process, the total entropy of an isolated system never decreases (ΔS ≥ 0). Equivalently, heat flows spontaneously from hot to cold and no heat engine can be 100% efficient.

- Third law (absolute zero/entropy): As temperature approaches 0 K, the entropy of a perfect crystalline substance approaches zero, and absolute zero cannot be reached in a finite number of steps.

Note: There is also a “zeroth law,” which defines temperature via thermal equilibrium.
```

```json
{
  "id": "chatcmpl-DpLAeLKqEscvTBF6Cy8PzvroAyj7Q",
  "object": "chat.completion",
  "created": 1781128480,
  "model": "gpt-5-2025-08-07",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "- First law (energy conservation): The change in a system’s internal energy equals the heat added to the system minus the work done by the system. In symbols: ΔU = Q − W (with W defined as work done by the system).\n\n- Second law (entropy increase): In any real process, the total entropy of an isolated system never decreases (ΔS ≥ 0). Equivalently, heat flows spontaneously from hot to cold and no heat engine can be 100% efficient.\n\n- Third law (absolute zero/entropy): As temperature approaches 0 K, the entropy of a perfect crystalline substance approaches zero, and absolute zero cannot be reached in a finite number of steps.\n\nNote: There is also a “zeroth law,” which defines temperature via thermal equilibrium.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 550,
    "total_tokens": 565,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 384,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
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
  'openai/gpt-5',
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
  "model": "openai/gpt-5",
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

```
The built-in json module is the standard way.

Basic: read an entire JSON file into a Python object (dict/list)
import json

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Use it
# e.g., if data is a dict:
# print(data['some_key'])

From a JSON string instead of a file
import json

s = '{"a": 1, "b": [1, 2, 3]}'
data = json.loads(s)

Robust version with error handling
import json
from pathlib import Path

path = Path('data.json')
try:
    with path.open('r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"File not found: {path}")
except json.JSONDecodeError as e:
    print(f"Bad JSON at line {e.lineno}, col {e.colno}: {e.msg}")

Notes and variants:
- Encoding: JSON is UTF-8 by default; specify encoding='utf-8' to be explicit.
- Large files: json.load reads the whole file into memory. For very large JSON, consider streaming parsers like ijson:
  import ijson
  with open('big.json', 'r', encoding='utf-8') as f:
      for item in ijson.items(f, 'items.item'):  # adjust prefix to your structure
          process(item)
- JSON Lines (NDJSON): one JSON object per line
  import json
  with open('data.jsonl', 'r', encoding='utf-8') as f:
      for line in f:
          line = line.strip()
          if line:
              obj = json.loads(line)
              process(obj)
- With pathlib without json.load (alternative style)
  from pathlib import Path
  import json
  data = json.loads(Path('data.json').read_text(encoding='utf-8'))
- Pandas (tabular data)
  import pandas as pd
  df = pd.read_json('data.json')           # for array-of-objects
  # or for JSON Lines:
  df = pd.read_json('data.jsonl', lines=True)

Common pitfalls:
- Trailing commas or comments are not valid JSON. If you must handle commented JSON, look at json5 or commentjson.
```

```json
{
  "id": "chatcmpl-DpLApEjnJrCwFeYGPMnwKoqO9Xpby",
  "object": "chat.completion",
  "created": 1781128491,
  "model": "gpt-5-2025-08-07",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The built-in json module is the standard way.\n\nBasic: read an entire JSON file into a Python object (dict/list)\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as f:\n    data = json.load(f)\n\n# Use it\n# e.g., if data is a dict:\n# print(data['some_key'])\n\nFrom a JSON string instead of a file\nimport json\n\ns = '{\"a\": 1, \"b\": [1, 2, 3]}'\ndata = json.loads(s)\n\nRobust version with error handling\nimport json\nfrom pathlib import Path\n\npath = Path('data.json')\ntry:\n    with path.open('r', encoding='utf-8') as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(f\"File not found: {path}\")\nexcept json.JSONDecodeError as e:\n    print(f\"Bad JSON at line {e.lineno}, col {e.colno}: {e.msg}\")\n\nNotes and variants:\n- Encoding: JSON is UTF-8 by default; specify encoding='utf-8' to be explicit.\n- Large files: json.load reads the whole file into memory. For very large JSON, consider streaming parsers like ijson:\n  import ijson\n  with open('big.json', 'r', encoding='utf-8') as f:\n      for item in ijson.items(f, 'items.item'):  # adjust prefix to your structure\n          process(item)\n- JSON Lines (NDJSON): one JSON object per line\n  import json\n  with open('data.jsonl', 'r', encoding='utf-8') as f:\n      for line in f:\n          line = line.strip()\n          if line:\n              obj = json.loads(line)\n              process(obj)\n- With pathlib without json.load (alternative style)\n  from pathlib import Path\n  import json\n  data = json.loads(Path('data.json').read_text(encoding='utf-8'))\n- Pandas (tabular data)\n  import pandas as pd\n  df = pd.read_json('data.json')           # for array-of-objects\n  # or for JSON Lines:\n  df = pd.read_json('data.jsonl', lines=True)\n\nCommon pitfalls:\n- Trailing commas or comments are not valid JSON. If you must handle commented JSON, look at json5 or commentjson.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 30,
    "completion_tokens": 1143,
    "total_tokens": 1173,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 640,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5',
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
  "model": "openai/gpt-5",
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
Great question! There are three main ways to go from SF to LA, each with different types of stops. Here are top picks by route, plus a couple sample itineraries.

Fastest (I-5)
- Harris Ranch (Coalinga): Classic steakhouse, big rest stop, EV chargers.
- Kettleman City: Food options (In-N-Out, Bravo Farms), large restrooms, EV superchargers.
- Fort Tejon State Historic Park (near Lebec): Stretch your legs among oak woodlands and historic barracks.
- Pyramid Lake Vista Point (north of Santa Clarita): Quick scenic stop before the final stretch.

Balanced coastal (US-101)
- San Luis Obispo: Charming downtown; Madonna Inn for a quirky snack/photo stop.
- Pismo Beach: Pier, clams, Monarch Butterfly Grove (seasonal: late Oct–Feb).
- Edna Valley or Paso Robles: Easy-access wineries for tastings (designate a driver).
- Solvang: Danish village vibes, pastries, windmills; Pea Soup Andersen’s in nearby Buellton.
- Santa Barbara: Mission, Funk Zone wineries/breweries, waterfront and Stearns Wharf.
- Ventura/Carpinteria: Carpinteria Bluffs and Tar Pits Park; mellow beaches.

Most scenic (Highway 1 / Pacific Coast Highway)
- Half Moon Bay or Santa Cruz: Coffee/beach walk to kick off the coast route.
- Monterey & Pacific Grove: Cannery Row, Monterey Bay Aquarium, 17‑Mile Drive, Lovers Point.
- Point Lobos State Natural Reserve: Short world‑class coastal hikes; arrive early for parking.
- Big Sur highlights: Bixby Creek Bridge overlook; Garrapata State Park pullouts; Pfeiffer Big Sur State Park (valley trails); Pfeiffer Beach (purple sand/keyhole rock, narrow access road); Nepenthe or Big Sur Bakery for views/food.
- Julia Pfeiffer Burns SP: McWay Falls overlook (iconic).
- San Simeon & Cambria: Elephant Seal Vista Point at Piedras Blancas; Hearst Castle (reserve tours); Moonstone Beach boardwalk.
- Morro Bay: Embarcadero and Morro Rock; sea otters often visible.
- Pismo/Oceano: Dunes, beach towns.
- Santa Barbara and Malibu: Finish with beaches like El Matador, Point Dume.

Sample one-day coastal highlight (long day)
- SF → Monterey (breakfast + quick 17‑Mile Drive/Point Lobos) → Big Sur (Bixby, McWay Falls, lunch) → Elephant seals → Santa Barbara (dinner) → LA.

Relaxed two-day coastal trip
- Day 1: SF → Monterey/Carmel → Big Sur hikes/lookouts → Overnight in Cambria, San Simeon, or San Luis Obispo.
- Day 2: Pismo → Solvang pastry stop → Santa Barbara lunch/beach → Malibu sunset → LA.

Tips
- Check Highway 1 conditions (landslides/closures are common in Big Sur): Caltrans QuickMap before you go.
- Start early for parking at Point Lobos/Big Sur stops; cell service is spotty in Big Sur.
- Book Hearst Castle tours and Big Sur/SLO lodging ahead, especially weekends/holidays.
- Bring layers; coastal weather changes fast. Fuel up before Big Sur—few gas stations.

If you tell me:
- Which route you prefer (I-5 speed, 101 balance, or Hwy 1 scenery),
- How many days you have,
- Interests (hikes, food/wine, beaches, kid-friendly, pet-friendly),
I’ll map a tailored stop-by-stop plan with drive times.
```

```json
{
  "id": "chatcmpl-DpLBM7b0Zf6BIFOThPdIAnUziVmcV",
  "object": "chat.completion",
  "created": 1781128524,
  "model": "gpt-5-2025-08-07",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Great question! There are three main ways to go from SF to LA, each with different types of stops. Here are top picks by route, plus a couple sample itineraries.\n\nFastest (I-5)\n- Harris Ranch (Coalinga): Classic steakhouse, big rest stop, EV chargers.\n- Kettleman City: Food options (In-N-Out, Bravo Farms), large restrooms, EV superchargers.\n- Fort Tejon State Historic Park (near Lebec): Stretch your legs among oak woodlands and historic barracks.\n- Pyramid Lake Vista Point (north of Santa Clarita): Quick scenic stop before the final stretch.\n\nBalanced coastal (US-101)\n- San Luis Obispo: Charming downtown; Madonna Inn for a quirky snack/photo stop.\n- Pismo Beach: Pier, clams, Monarch Butterfly Grove (seasonal: late Oct–Feb).\n- Edna Valley or Paso Robles: Easy-access wineries for tastings (designate a driver).\n- Solvang: Danish village vibes, pastries, windmills; Pea Soup Andersen’s in nearby Buellton.\n- Santa Barbara: Mission, Funk Zone wineries/breweries, waterfront and Stearns Wharf.\n- Ventura/Carpinteria: Carpinteria Bluffs and Tar Pits Park; mellow beaches.\n\nMost scenic (Highway 1 / Pacific Coast Highway)\n- Half Moon Bay or Santa Cruz: Coffee/beach walk to kick off the coast route.\n- Monterey & Pacific Grove: Cannery Row, Monterey Bay Aquarium, 17‑Mile Drive, Lovers Point.\n- Point Lobos State Natural Reserve: Short world‑class coastal hikes; arrive early for parking.\n- Big Sur highlights: Bixby Creek Bridge overlook; Garrapata State Park pullouts; Pfeiffer Big Sur State Park (valley trails); Pfeiffer Beach (purple sand/keyhole rock, narrow access road); Nepenthe or Big Sur Bakery for views/food.\n- Julia Pfeiffer Burns SP: McWay Falls overlook (iconic).\n- San Simeon & Cambria: Elephant Seal Vista Point at Piedras Blancas; Hearst Castle (reserve tours); Moonstone Beach boardwalk.\n- Morro Bay: Embarcadero and Morro Rock; sea otters often visible.\n- Pismo/Oceano: Dunes, beach towns.\n- Santa Barbara and Malibu: Finish with beaches like El Matador, Point Dume.\n\nSample one-day coastal highlight (long day)\n- SF → Monterey (breakfast + quick 17‑Mile Drive/Point Lobos) → Big Sur (Bixby, McWay Falls, lunch) → Elephant seals → Santa Barbara (dinner) → LA.\n\nRelaxed two-day coastal trip\n- Day 1: SF → Monterey/Carmel → Big Sur hikes/lookouts → Overnight in Cambria, San Simeon, or San Luis Obispo.\n- Day 2: Pismo → Solvang pastry stop → Santa Barbara lunch/beach → Malibu sunset → LA.\n\nTips\n- Check Highway 1 conditions (landslides/closures are common in Big Sur): Caltrans QuickMap before you go.\n- Start early for parking at Point Lobos/Big Sur stops; cell service is spotty in Big Sur.\n- Book Hearst Castle tours and Big Sur/SLO lodging ahead, especially weekends/holidays.\n- Bring layers; coastal weather changes fast. Fuel up before Big Sur—few gas stations.\n\nIf you tell me:\n- Which route you prefer (I-5 speed, 101 balance, or Hwy 1 scenery),\n- How many days you have,\n- Interests (hikes, food/wine, beaches, kid-friendly, pet-friendly),\nI’ll map a tailored stop-by-stop plan with drive times.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 76,
    "completion_tokens": 1926,
    "total_tokens": 2002,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 1152,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5',
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
  "model": "openai/gpt-5",
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
The diner on Maple had the sort of dawn that came with mop water and an apology. Lemon and old fry oil hung in the air; the neon COFFEE sign in the front window had sputtered itself into a coma sometime before three. Someone had left the door propped with a folded phone book. Someone else had left fingerprints everywhere you could put a hand to steady yourself.

“Mr. Hale?” The manager’s voice came out thin. He was a man who wore his keys like medals, ring clinking against the register as if noise could keep the room from thinking about what had happened in the stockroom. He kept rubbing a clean spot on the Formica with the heel of his palm. “They said not to touch anything. But, uh, someone’s going to have to… You know. She’s back there.”

“I know.” I did not look back there yet. The living are easier to talk to than the dead. The living lie worse, too.

It wasn’t my first crime scene in a place that sold coffee by the gallon, but it was the first time time itself had been sitting on the counter.

Right in the dead center of the service line, between the sugar pourer and a pitcher lipped with milk, stood an hourglass. Not the novelty kind with pink sand and a smiley face, but two clean bulbs pinched at the waist and sealed with a brass cap, the sort of thing you buy for seventeen dollars at a shop that also sells candles that smell like foreign countries.

The stuff pouring through it wasn’t sand.

Dark grit eased from the top bulb to the bottom in a slow, stubborn ribbon. The grounds were too coarse for espresso, too fine for the diner’s clumsy metal basket. I leaned in and the smell of chicory lifted and slid clean into my head. Coffee with teeth. Not something Maple Street Diner served, not in the ten years I’d been stopping in for grilled cheese on Tuesdays. They brewed what came in five-pound bricks with promises on the bag and regrets in the cup.

The hourglass sat in a perfect ring of coffee, the way a drink leaves its mark if you lift it and set it down, lift it and set it down, chasing conversation. Only the ring was too clean, too even. Not slapped there by accident but drawn, like a target.

“Don’t they come with sand?” the manager said, as if I’d stock tips on timepieces. He had the kind of face you wanted to put directions on. He kept glancing toward the hallway where the kitchen started. “Who would bring that here?”

“Somebody who wanted us to see it.” I bent until the glass filled my whole world, the way a thing does when you’re trying not to see a bigger thing behind it. Grounds slid down and hit the bottom with tiny clicks, a sound you feel more than hear. The top bulb was half-empty. The bottom was making a little hill that would slump and start again, brown avalanches inside a winter globe.

There were four notch marks on the counter by the hourglass, burned in with something hot. A cigarette, maybe, or a soldering iron. Not long lines, just ticks where a thumbnail might count. The fugitive smell of something singed lived there. I put a finger near one and felt the edge of the scorch under the polish of a thousand elbows. Not fresh. But made last night, if the way they were crisping under the fluorescent hum meant anything.

I didn’t touch the glass. I touched the ring instead, lightly, because that’s what people notice if you don’t. It was tacky. It left the faint outline of my fingertip when I lifted it away. The coffee in the ring had been thick when it went down, not drip-thin but almost syrup, like someone boiled it down on the stovetop. Old trick for buzzing cheap liquor. Or for drawing with.

“Chicory,” I said, mostly to the hourglass. The manager blinked at me, like I’d just named my favorite constellation.

“Is that… good?”

“If you’re homesick for New Orleans and don’t mind lying to yourself,” I said. It wasn’t a Maple Street thing. It was nowhere-on-this-block thing. There was a place on Luzerne that sold blue crab on Sundays and tobacco under the counter on every day that ended in Y; they stocked cans with a fleur-de-lis on the label behind a curtain you had to ask to see. People who bought it were a certain kind of precise. They liked their mornings with a habit in them.

Someone had clocked her in the stockroom, the call had said, a quick violence that made a long problem. Someone had propped the door so the sirens wouldn’t have to rattle the handle. Someone had time to leave me a prop that wasn’t a prop at all.

“Do me a favor,” I said. “Don’t let anyone touch this. Or sneeze on it. Or breathe enthusiastically.”

The manager nodded as if those were the rules we’d been living by all along. He made himself small, backing away without looking away, like the hourglass might leap off the counter and bite him.

I watched grounds fall through the neck. When they hit the bottom, they rolled a little and settled. The top empties, the bottom fills. After a certain point, if you don’t turn it over, it’s done.

Four notches. A ring drawn too carefully to have happened on accident. Chicory where there shouldn’t be chicory. I counted in my head with the tiny rain of grit, not minutes, because those stretch and snap, but beats. The hourglass bled its coffee heart out with a drummer’s stubbornness—two hundred and forty by the time the hill slumped over and smoothed into itself.

Four flips. Four songs at two minutes each. Four smoke breaks. Four chances to wait and see if someone came through the side door with a soft apology and a reason.

I didn’t know, not yet, what the someone had been timing. Grief. Guts. The moment the street went quiet enough for them to walk. A message for anybody who could read taste and habit like handwriting.

All I knew was that the glass didn’t belong here and neither did its smell. The clue wasn’t unusual because it was clever. It was unusual because it was kind. Somebody, standing in a cheap-lit diner with lemon in their nose and something ruinous at their back, had thought to leave me time that I could tip over with a wrist. Time I could see.

I wish the dead had names like that. I wish they all came with something you could hold up to the light and say, here, this is how long it took. This is where it started; this is where it ran out.

“Mr. Hale?” The manager had drifted back. He’d taken off his keys and set them in a neat circle beside the register, a little hourglass of his own. He had a voice that was trying to be a whisper but kept smarting into sound. “Do you want to—should I—”

“In a minute,” I said. The coffee ring had started to skin over. The grounds made a small mountain inside their bottle. I lowered my head until I could see the thin seam in the brass cap that sealed it, a tiny imperfection in a factory finish. Someone had pried it open once with a butter knife and tamped the top with a thumb. It had a dent in it, a crescent like the side of a bitten moon.

Sometimes the city gives you a map. Sometimes it just gives you a circle and tells you to stand inside it until the world narrows down to what fits. I straightened, and the room got bigger.

“Okay,” I said. “Let’s go look at the thing we’re not looking at.”
```

```json
{
  "id": "chatcmpl-DpLK1cHoQaButs3hdRNv4w58l1y8J",
  "object": "chat.completion",
  "created": 1781129061,
  "model": "gpt-5-2025-08-07",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The diner on Maple had the sort of dawn that came with mop water and an apology. Lemon and old fry oil hung in the air; the neon COFFEE sign in the front window had sputtered itself into a coma sometime before three. Someone had left the door propped with a folded phone book. Someone else had left fingerprints everywhere you could put a hand to steady yourself.\n\n“Mr. Hale?” The manager’s voice came out thin. He was a man who wore his keys like medals, ring clinking against the register as if noise could keep the room from thinking about what had happened in the stockroom. He kept rubbing a clean spot on the Formica with the heel of his palm. “They said not to touch anything. But, uh, someone’s going to have to… You know. She’s back there.”\n\n“I know.” I did not look back there yet. The living are easier to talk to than the dead. The living lie worse, too.\n\nIt wasn’t my first crime scene in a place that sold coffee by the gallon, but it was the first time time itself had been sitting on the counter.\n\nRight in the dead center of the service line, between the sugar pourer and a pitcher lipped with milk, stood an hourglass. Not the novelty kind with pink sand and a smiley face, but two clean bulbs pinched at the waist and sealed with a brass cap, the sort of thing you buy for seventeen dollars at a shop that also sells candles that smell like foreign countries.\n\nThe stuff pouring through it wasn’t sand.\n\nDark grit eased from the top bulb to the bottom in a slow, stubborn ribbon. The grounds were too coarse for espresso, too fine for the diner’s clumsy metal basket. I leaned in and the smell of chicory lifted and slid clean into my head. Coffee with teeth. Not something Maple Street Diner served, not in the ten years I’d been stopping in for grilled cheese on Tuesdays. They brewed what came in five-pound bricks with promises on the bag and regrets in the cup.\n\nThe hourglass sat in a perfect ring of coffee, the way a drink leaves its mark if you lift it and set it down, lift it and set it down, chasing conversation. Only the ring was too clean, too even. Not slapped there by accident but drawn, like a target.\n\n“Don’t they come with sand?” the manager said, as if I’d stock tips on timepieces. He had the kind of face you wanted to put directions on. He kept glancing toward the hallway where the kitchen started. “Who would bring that here?”\n\n“Somebody who wanted us to see it.” I bent until the glass filled my whole world, the way a thing does when you’re trying not to see a bigger thing behind it. Grounds slid down and hit the bottom with tiny clicks, a sound you feel more than hear. The top bulb was half-empty. The bottom was making a little hill that would slump and start again, brown avalanches inside a winter globe.\n\nThere were four notch marks on the counter by the hourglass, burned in with something hot. A cigarette, maybe, or a soldering iron. Not long lines, just ticks where a thumbnail might count. The fugitive smell of something singed lived there. I put a finger near one and felt the edge of the scorch under the polish of a thousand elbows. Not fresh. But made last night, if the way they were crisping under the fluorescent hum meant anything.\n\nI didn’t touch the glass. I touched the ring instead, lightly, because that’s what people notice if you don’t. It was tacky. It left the faint outline of my fingertip when I lifted it away. The coffee in the ring had been thick when it went down, not drip-thin but almost syrup, like someone boiled it down on the stovetop. Old trick for buzzing cheap liquor. Or for drawing with.\n\n“Chicory,” I said, mostly to the hourglass. The manager blinked at me, like I’d just named my favorite constellation.\n\n“Is that… good?”\n\n“If you’re homesick for New Orleans and don’t mind lying to yourself,” I said. It wasn’t a Maple Street thing. It was nowhere-on-this-block thing. There was a place on Luzerne that sold blue crab on Sundays and tobacco under the counter on every day that ended in Y; they stocked cans with a fleur-de-lis on the label behind a curtain you had to ask to see. People who bought it were a certain kind of precise. They liked their mornings with a habit in them.\n\nSomeone had clocked her in the stockroom, the call had said, a quick violence that made a long problem. Someone had propped the door so the sirens wouldn’t have to rattle the handle. Someone had time to leave me a prop that wasn’t a prop at all.\n\n“Do me a favor,” I said. “Don’t let anyone touch this. Or sneeze on it. Or breathe enthusiastically.”\n\nThe manager nodded as if those were the rules we’d been living by all along. He made himself small, backing away without looking away, like the hourglass might leap off the counter and bite him.\n\nI watched grounds fall through the neck. When they hit the bottom, they rolled a little and settled. The top empties, the bottom fills. After a certain point, if you don’t turn it over, it’s done.\n\nFour notches. A ring drawn too carefully to have happened on accident. Chicory where there shouldn’t be chicory. I counted in my head with the tiny rain of grit, not minutes, because those stretch and snap, but beats. The hourglass bled its coffee heart out with a drummer’s stubbornness—two hundred and forty by the time the hill slumped over and smoothed into itself.\n\nFour flips. Four songs at two minutes each. Four smoke breaks. Four chances to wait and see if someone came through the side door with a soft apology and a reason.\n\nI didn’t know, not yet, what the someone had been timing. Grief. Guts. The moment the street went quiet enough for them to walk. A message for anybody who could read taste and habit like handwriting.\n\nAll I knew was that the glass didn’t belong here and neither did its smell. The clue wasn’t unusual because it was clever. It was unusual because it was kind. Somebody, standing in a cheap-lit diner with lemon in their nose and something ruinous at their back, had thought to leave me time that I could tip over with a wrist. Time I could see.\n\nI wish the dead had names like that. I wish they all came with something you could hold up to the light and say, here, this is how long it took. This is where it started; this is where it ran out.\n\n“Mr. Hale?” The manager had drifted back. He’d taken off his keys and set them in a neat circle beside the register, a little hourglass of his own. He had a voice that was trying to be a whisper but kept smarting into sound. “Do you want to—should I—”\n\n“In a minute,” I said. The coffee ring had started to skin over. The grounds made a small mountain inside their bottle. I lowered my head until I could see the thin seam in the brass cap that sealed it, a tiny imperfection in a factory finish. Someone had pried it open once with a butter knife and tamped the top with a thumb. It had a dent in it, a crescent like the side of a bitten moon.\n\nSometimes the city gives you a map. Sometimes it just gives you a circle and tells you to stand inside it until the world narrows down to what fits. I straightened, and the room got bigger.\n\n“Okay,” I said. “Let’s go look at the thing we’re not looking at.”",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 4961,
    "total_tokens": 4980,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 3328,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5',
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
  "model": "openai/gpt-5",
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
Recursion is when a function solves a problem by calling itself on a smaller version of the same problem, stopping at a simple “base case.”

Simple example: factorial
- Definition: n! (n factorial) is n × (n−1) × (n−2) × … × 1, and 0! = 1.
- Recursive idea: n! = n × (n−1)! with base case 0! = 1.

How factorial(4) works:
- fact(4) = 4 × fact(3)
- fact(3) = 3 × fact(2)
- fact(2) = 2 × fact(1)
- fact(1) = 1 × fact(0)
- fact(0) = 1  ← base case
- Unwinding: 1 → 1 → 2 → 6 → 24, so fact(4) = 24.

Tiny Python version:
def fact(n):
    if n == 0:          # base case
        return 1
    return n * fact(n-1)  # recursive step

Key points:
- Always have a base case to stop.
- Each call must move toward the base case (smaller/simpler input).
- Missing either leads to infinite recursion (and a crash).
```

```json
[
  {
    "id": "chatcmpl-DpLF5wgUn4piBACWXAMIcVeY5hgvW",
    "object": "chat.completion.chunk",
    "created": 1781128755,
    "model": "gpt-5-2025-08-07",
    "service_tier": "default",
    "system_fingerprint": null,
    "choices": [
      {
        "index": 0,
        "delta": {
          "role": "assistant",
          "content": "",
          "refusal": null
        },
        "finish_reason": null
      }
    ],
    "usage": null,
    "obfuscation": "SbmWVVEKFF"
  },
  {
    "id": "chatcmpl-DpLF5wgUn4piBACWXAMIcVeY5hgvW",
    "object": "chat.completion.chunk",
    "created": 1781128755,
    "model": "gpt-5-2025-08-07",
    "service_tier": "default",
    "system_fingerprint": null,
    "choices": [
      {
        "index": 0,
        "delta": {
          "content": "Rec"
        },
        "finish_reason": null
      }
    ],
    "usage": null,
    "obfuscation": "779H6FdPD"
  },
  "... 276 more chunks omitted ...",
  {
    "id": "chatcmpl-DpLF5wgUn4piBACWXAMIcVeY5hgvW",
    "object": "chat.completion.chunk",
    "created": 1781128755,
    "model": "gpt-5-2025-08-07",
    "service_tier": "default",
    "system_fingerprint": null,
    "choices": [],
    "usage": {
      "prompt_tokens": 16,
      "completion_tokens": 797,
      "total_tokens": 813,
      "prompt_tokens_details": {
        "cached_tokens": 0,
        "audio_tokens": 0
      },
      "completion_tokens_details": {
        "reasoning_tokens": 512,
        "audio_tokens": 0,
        "accepted_prediction_tokens": 0,
        "rejected_prediction_tokens": 0
      }
    },
    "obfuscation": "FQ6Wmta"
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting the model use OpenAI's built-in web search tool to answer with current information</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5',
  {
    input: 'What were the top news stories about Cloudflare this week? Summarise in three bullets.',
    max_output_tokens: 4096,
    tools: [{ type: 'web_search_preview' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5",
  "input": "What were the top news stories about Cloudflare this week? Summarise in three bullets.",
  "max_output_tokens": 4096,
  "tools": [
    {
      "type": "web_search_preview"
    }
  ]
}'
```

```
- June 22, 2026: Cloudflare reported increased error rates and latency tied to a fiber cut in Eastern North America, leading to a partial outage and degraded CDN/Cache performance before traffic engineering mitigations stabilized services later in the day. ([cloudflarestatus.com](https://www.cloudflarestatus.com/))
- June 17–18, 2026: Cloudflare expanded its channel focus—launching a Cloudflare One “Design Partner” designation and AI-powered migration toolkit for SASE/Zero Trust deployments—and signed Westcon‑Comstor as an EMEA‑wide distributor to scale partner-led delivery. ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai))
- June 16, 2026: Investor group JLens urged Cloudflare shareholders to withhold votes for two directors at the June 30 annual meeting, citing an ADL report criticizing Cloudflare’s services being used by extremist sites; the campaign was covered across financial wires. ([investing.com](https://www.investing.com/news/company-news/jlens-urges-cloudflare-shareholders-to-withhold-board-votes-93CH-4744895))
```

```json
{
  "id": "resp_02d60b161a01d826016a3990457fa8819b9fc528ec4ea8ad5c",
  "object": "response",
  "created_at": 1782157381,
  "model": "gpt-5-2025-08-07",
  "output": [
    {
      "id": "rs_02d60b161a01d826016a399046a994819b9d25e70abcd3c56c",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a3990486108819ba2c466fcb838af82",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare news this week June 2026",
          "Cloudflare outage June 2026",
          "Cloudflare announces new product June 2026",
          "Cloudflare earnings June 2026"
        ],
        "query": "Cloudflare news this week June 2026"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a39904d3e18819bb22818e22bb15f3d",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a399050a86c819bae0316a4c7791202",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.cloudflarestatus.com/"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a39905240c4819b8bc7c2276ee250d7",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a399055207c819bade6df968621d6c8",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "site:cloudflare.com blog June 2026 Cloudflare announcement",
          "Cloudflare announces new AI features June 2026",
          "Cloudflare expands partner program June 2026 news"
        ],
        "query": "site:cloudflare.com blog June 2026 Cloudflare announcement"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a3990593d7c819bb833cdeb40ea0a49",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a39905b72e8819b9cd20de4259f2bba",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare news June 21 2026",
          "Cloudflare June 20 2026 news",
          "Cloudflare June 19 2026 news",
          "Cloudflare June 16 2026 news"
        ],
        "query": "Cloudflare news June 21 2026"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a3990606f34819baa6fb7267003e879",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a3990622f28819bbabde7f244f20734",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "find_in_page",
        "pattern": "Jun 22",
        "url": "https://www.cloudflarestatus.com/"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a399065ff30819b9c45d7c98a8f4e39",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a39906963c0819bb0131af6ba3bc7f7",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.investing.com/news/company-news/jlens-urges-cloudflare-shareholders-to-withhold-board-votes-93CH-4744895"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a39906b470c819ba2d18b349dc31613",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a39906c101c819ba96f130294f46458",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "JLens urges Cloudflare shareholders to withhold votes Reuters June 16, 2026",
          "ADL report Cloudflare withhold vote JLens June 2026"
        ],
        "query": "JLens urges Cloudflare shareholders to withhold votes Reuters June 16, 2026"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a3990725224819ba7f98ab9f71093ef",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a3990757154819b9d9aee09a6c4a2e7",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://simplywall.st/stocks/us/software/nyse-net/cloudflare/news/cloudflare-net-expands-ai-security-with-ping-identity-partne"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a399079c738819b8b884bab3927fe7c",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_02d60b161a01d826016a39907a6720819b8df7a6994610bd54",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare Ping Identity partnership June 2026",
          "Ping Identity Cloudflare partnership 2026"
        ],
        "query": "Cloudflare Ping Identity partnership June 2026"
      }
    },
    {
      "id": "rs_02d60b161a01d826016a3990817980819bab31195c884444a6",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "msg_02d60b161a01d826016a3990922d28819ba309de72951ad102",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [
            {
              "type": "url_citation",
              "end_index": 316,
              "start_index": 257,
              "title": "Cloudflare Status",
              "url": "https://www.cloudflarestatus.com/"
            },
            {
              "type": "url_citation",
              "end_index": 746,
              "start_index": 582,
              "title": "Cloudflare launches new partner initiative to support AI and SASE adoption",
              "url": "https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1152,
              "start_index": 1017,
              "title": "JLens urges Cloudflare shareholders to withhold board votes By Investing.com",
              "url": "https://www.investing.com/news/company-news/jlens-urges-cloudflare-shareholders-to-withhold-board-votes-93CH-4744895"
            }
          ],
          "logprobs": [],
          "text": "- June 22, 2026: Cloudflare reported increased error rates and latency tied to a fiber cut in Eastern North America, leading to a partial outage and degraded CDN/Cache performance before traffic engineering mitigations stabilized services later in the day. ([cloudflarestatus.com](https://www.cloudflarestatus.com/))\n- June 17–18, 2026: Cloudflare expanded its channel focus—launching a Cloudflare One “Design Partner” designation and AI-powered migration toolkit for SASE/Zero Trust deployments—and signed Westcon‑Comstor as an EMEA‑wide distributor to scale partner-led delivery. ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai))\n- June 16, 2026: Investor group JLens urged Cloudflare shareholders to withhold votes for two directors at the June 30 annual meeting, citing an ADL report criticizing Cloudflare’s services being used by extremist sites; the campaign was covered across financial wires. ([investing.com](https://www.investing.com/news/company-news/jlens-urges-cloudflare-shareholders-to-withhold-board-votes-93CH-4744895))"
        }
      ],
      "role": "assistant"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 45264,
    "output_tokens": 2548,
    "total_tokens": 47812,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 1920
    }
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
... response truncated ...
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5/#page","headline":"GPT-5","description":"OpenAI's model excelling at coding, writing, and reasoning.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
