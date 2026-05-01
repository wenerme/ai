---
title: GPT-5.4 nano
description: GPT-5.4 Nano is OpenAI's smallest and fastest model, optimized for edge and low-latency use cases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 nano 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4-nano` 

GPT-5.4 Nano is OpenAI's smallest and fastest model, optimized for edge and low-latency use cases.

| Model Info                                                                 |                                                                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                        |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                                |
| More information                                                           | [link ↗](https://openai.com/)                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4-nano) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

The three laws of thermodynamics are:

1. **Zeroth Law (thermal equilibrium):**  
   If system A is in thermal equilibrium with system B, and system B is in thermal equilibrium with system C, then A is in thermal equilibrium with C.  
   *This law justifies the concept of temperature.*

2. **First Law (conservation of energy):**  
   Energy cannot be created or destroyed. It can only be transferred or transformed.  
   *In thermodynamics:* the change in internal energy of a system equals heat added to the system minus work done by the system.

3. **Second Law (entropy and direction of processes):**  
   Natural processes occur in a direction that increases the **total entropy** of the universe (or, equivalently, they tend to go from more ordered to less ordered forms).  
   It also implies that **not all heat can be converted into work** in a cyclical process.

*(There is also a “Third Law,” often presented alongside these as the third in the series.)*

4. **Third Law (absolute zero):**  
   As temperature approaches absolute zero (0 K), the entropy of a perfect crystal approaches a constant minimum value (typically zero).  
   It is impossible to reach absolute zero in a finite number of steps.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

  {

    messages: [

      {

        role: 'system',

        content: 'You are a helpful coding assistant specializing in Python.',

      },

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

You can read a JSON file in Python using the built-in `json` module.

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)  # data is now a Python dict/list depending on the JSON
```

**Notes:**
- Use `json.load(f)` to read from a file object.
- If your JSON file is an array at the top level, `data` will be a `list`; if it’s an object, it’ll be a `dict`.

If you want to read a JSON string instead (not a file), use `json.loads(s)`.

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

  {

    messages: [

      {

        role: 'user',

        content:

          'I need help planning a road trip from San Francisco to Los Angeles.',

      },

      {

        role: 'assistant',

        content:

          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

      },

      {

        role: 'user',

        content: 'Yes, what are some good places to stop?',

      },

    ],

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Absolutely—here are some great stop ideas on a typical San Francisco → Los Angeles road trip (assuming you’ll mostly take **I‑5 or US‑101**). I’ll list them by region so you can mix and match based on time and interests.

## Best quick stops (easy to add)
### Along/near the coast (great views)
- **Half Moon Bay** – beaches, scenic overlooks, quick coffee/food stops.
- **Santa Cruz (if you take/near US‑101)** – boardwalk area, viewpoints; fun even for a short stop.
- **Monterey Bay / Cannery Row** – aquarium area and coastal scenery.
- **Big Sur viewpoints (if you do the coastal route)**  
  - Common highlights: **Bixby Bridge**, **McWay Falls (if open)**, scenic pullouts along Highway 1.

> Note: Big Sur can be slower and is weather-dependent (and Highway 1 sections can close occasionally), so plan with current conditions if you choose this.

### Classic “Hollywood-adjacent” vibes
- **Santa Barbara** – charming downtown, good food, beach walk.
- **Solvang** – Danish-style village theme; silly/fun stop for snacks and photos.

## Major “worth it” detours (more time, bigger payoff)
### Wine country (if you like food + views)
- **Santa Rosa / Healdsburg (Sonoma County)** – wineries, farm stands, tastings.
- **Napa Valley (if you want a big wine day)** – mostly if you’re okay with a longer detour.

### Redwood / nature stops
- **Henry Cowell Redwoods State Park (near Santa Cruz)** – redwood trails without a huge detour.
- **Giant redwoods near Monterey area / Big Basin (depending on route)** – more forest time.

### Route/landscape highlights on inland routes
If you go more inland (often faster, less coastline):
- **Gilroy** – quick stop for garlic-themed food or outlets.
- **Central Valley roadside stops** – quick lunch breaks, but fewer “must-see” landmarks.

## A few “choose based on your route” suggestions
- **If you take US‑101 (often prettier / more towns):** Half Moon Bay → Santa Cruz → Monterey → Santa Barbara → LA.
- **If you take I‑5 (usually faster):** San Jose area → Paso Robles (good mid-way option) → Santa Barbara → LA.
- **If you want the iconic scenery:** prioritize **Highway 1 / Big Sur** (best views, slower, more planning).

---

### Quick questions so I can tailor a perfect stop list + itinerary
1. What month (or approximate dates) are you going?
2. Do you prefer **coastal views (slower, scenic)** or **faster/inland (more driving, fewer views)**?
3. How many days do you want (e.g., 1 long day vs 2–3 days)?
4. Any interests: beaches, hiking, wine, kitschy towns, food stops, museums?

Answer those and I’ll propose a specific route with 6–12 stops, estimated timing, and backup options.

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

The rain had been falling long enough to turn the city’s neon into smeared watercolor, but it hadn’t softened the edges of the crime scene.

Detective Mara Kincaid stood just inside the taped perimeter, her coat dark with moisture and her mind sharper than the puddles gathering at her feet. The victim’s apartment sat above a shuttered bakery, its windows fogged from the inside, its hallway smelling faintly of citrus cleaner and burnt copper.

A uniform officer hovered nearby, eager to be useful. “No signs of forced entry, Detective. The husband—” He stopped, corrected himself. “The occupant. He found them like this.”

Mara didn’t look up. She was kneeling by the threshold, letting her flashlight sweep the floorboards the way some people read scripture—slow, patient, searching for the lines that didn’t belong.

Something glittered against the worn grain of wood.

It wasn’t glass. It wasn’t glitter from a spilled drink. It didn’t catch the light like coins or broken jewelry. It caught it like… breath.

A thin, translucent flake—no bigger than a fingernail clipping—lay half-buried in the seam between two planks. When Mara tilted her beam, the flake didn’t reflect so much as *remember*. The light seemed to sink into it and come back altered, as if the material were holding a picture just out of reach.

“Don’t touch it,” she said automatically, though she hadn’t realized she’d spoken until the officer flinched.

Mara held her breath. The flake had a faint curve, like the edge of a leaf, and a delicate pattern of lines that didn’t resemble any natural vein. Under the flashlight, the pattern looked almost… intentional.

She lifted her gloved hand, stopped millimeters above it, and felt a temperature difference. The wood around it was cold with night air. The flake was warmer, as though it had just been pressed there.

On instinct, she slid a small evidence marker beside it without moving the flake itself. Then she leaned closer and listened—because in her line of work, some things weren’t just seen.

At first there was only the rain and the distant rumble of traffic.

Then—barely audible beneath it—a soft, rhythmic *tick… tick… tick*, like a clock inside something too small to be a clock.

Mara straightened slowly, her stomach tightening. The unusual clue wasn’t just out of place.

It was *alive* in a way she couldn’t explain.

Behind her, the officer cleared his throat. “Detective? Should we—uh—call for your tech?”

Mara didn’t answer right away. She stared at the flake until her eyes began to ache, watching the light tremble within it like it was trying to form a message.

Finally, she said, “Yeah. And bring two sets of gloves.”

She stood, turning toward the apartment interior where the air felt heavy with everything that had already happened.

Whatever left this behind didn’t want to be caught.

But it had made sure she’d look—down at the seam between boards—at the moment her flashlight found it.

As if it knew exactly where her curiosity would go next.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    stream: true,

    stream_options: {

      include_usage: true,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Recursion is a programming technique where a function solves a problem by calling itself on smaller versions of the same problem.

A key idea is that recursion usually needs:
1. **A base case** (when to stop).
2. **A recursive case** (the problem broken into a smaller subproblem).

### Simple Example: Factorial
The factorial of a number *n* (written `n!`) is:
- `n! = n × (n-1)!`
- with the base case `0! = 1`

#### Code (Python-like pseudocode)
```python
def factorial(n):
    if n == 0:          # base case
        return 1
    return n * factorial(n - 1)  # recursive case
```

#### What happens for `factorial(4)`?
- `factorial(4) = 4 * factorial(3)`
- `factorial(3) = 3 * factorial(2)`
- `factorial(2) = 2 * factorial(1)`
- `factorial(1) = 1 * factorial(0)`
- `factorial(0) = 1`

So: `4 * 3 * 2 * 1 = 24`

If you want, I can also show a recursion example like summing a list or traversing a tree.

## Parameters

* [ Input ](#tab-panel-80)
* [ Output ](#tab-panel-81)

▶messages\[\]

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

`number`minimum: \-2maximum: 2

presence\_penalty

`number`minimum: \-2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[\]

`array`

tool\_choice

``

response\_format

``

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[\]

`array`

▶usage{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
