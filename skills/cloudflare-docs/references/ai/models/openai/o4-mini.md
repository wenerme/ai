---
title: o4-mini
description: OpenAI's fast, lightweight reasoning model optimized for multi-step problem solving at lower cost.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  o4-mini 

Text Generation • OpenAI • Proxied 

`openai/o4-mini` 

OpenAI's fast, lightweight reasoning model optimized for multi-step problem solving at lower cost.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                   |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/o4-mini) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/o4-mini',

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

Here are the three (classical) laws of thermodynamics:

1. First Law (Conservation of Energy)  
     – Statement: Energy can neither be created nor destroyed, only converted from one form to another.  
     – Formulation: ΔU = Q – W  
      • ΔU is the change in internal energy of the system  
      • Q is heat added to the system  
      • W is work done by the system  

2. Second Law (Entropy Increase)  
     – Statement: In any spontaneous process, the total entropy of an isolated system never decreases; it increases for irreversible processes and remains constant for reversible ones.  
     – Key consequences:  
      • Heat cannot spontaneously flow from cold to hot (Clausius statement)  
      • No heat engine can be 100% efficient (Kelvin–Planck statement)  

3. Third Law (Unattainability of Absolute Zero)  
     – Statement: As the temperature of a perfect crystalline substance approaches absolute zero (0 K), its entropy approaches a constant minimum (often taken as zero).  
     – Consequence: It is impossible to reach absolute zero in a finite number of steps.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/o4-mini',

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

Here’s the most common way, using Python’s built-in json module:

```python
import json

# 1. Open the file
with open("data.json", "r", encoding="utf-8") as f:
    # 2. Parse the JSON into a Python object (dict or list)
    data = json.load(f)

# 3. Now `data` is a normal Python dict/list
print(data)
print(type(data))      # e.g. <class 'dict'>
print(data["someKey"]) # access fields as usual
```

Explanation:

 1. `open(..., "r", encoding="utf-8")` opens in read-mode.
 2. `json.load(f)` reads the entire file and deserializes it to a Python object.
 3. You can now work with it like any dict or list.

If you already have a JSON string in memory, use `json.loads()`:

```python
import json

json_str = '{"name": "Alice", "age": 30}'
data = json.loads(json_str)
```

Error handling example:

```python
import json

try:
    with open("data.json", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print("Invalid JSON:", e)
else:
    # success
    print(data)
```

Alternative with pathlib:

```python
from pathlib import Path
import json

text = Path("data.json").read_text(encoding="utf-8")
data = json.loads(text)
```

That’s all you need to read JSON files in Python!

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/o4-mini',

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

Here are two popular ways to make the trip—with suggested stops—so you can pick the one that best fits your interests and schedule.  

1. Coastal Highway (CA-1 / Pacific Coast Highway)  
   Total driving time: ~8–10 hours (no major traffic), 450 miles  
   Recommended pace: 2–3 days  

   • Half Moon Bay (30 mi / 45 min from SF)  
     – Stroll the beaches, grab coffee or seafood at the harbor.  
     – Quick dune hike at Poplar Beach or Fitzgerald Marine Reserve.  

   • Santa Cruz (50 mi / 1 hr from Half Moon Bay)  
     – Santa Cruz Beach Boardwalk for rides & arcade.  
     – Downtown Pacific Avenue for shops and local brews.  

   • Capitola (5 mi / 10 min from Santa Cruz)  
     – Colorful seaside village with boutique shops and cafés.  
     – Great spot for sunset on Capitola Beach.  

   • Monterey & Carmel (45 mi / 1 hr from Capitola)  
     – Monterey Bay Aquarium, Cannery Row, coastal bike path.  
     – Carmel-by-the-Sea: fairy-tale cottages, art galleries, Carmel Mission.  
     – 17-Mile Drive (pebbled beaches, peacocks, iconic Lone Cypress).  

   • Big Sur (30 mi / 1 hr from Carmel)  
     – Bixby Creek Bridge photo-op.  
     – Pfeiffer Beach (purple sand) and McWay Falls at Julia Pfeiffer Burns State Park.  
     – Ragged Point for coastal vistas and snacks.  
     Overnight option: Big Sur Lodge or camping.  

   • San Simeon & Cambria (45 mi / 1 hr from Big Sur)  
     – Hearst Castle tour.  
     – Elephant Seal Vista Point just north of San Simeon.  
     – Cambria’s Moonstone Beach Boardwalk and quaint Main Street.  

   • Morro Bay (25 mi / 35 min from Cambria)  
     – Morro Rock, waterfront restaurants, kayaking and bird-watching.  

   • San Luis Obispo (30 mi / 35 min from Morro Bay)  
     – Mission San Luis Obispo de Tolosa.  
     – Bubblegum Alley and bustling Higuera Street for dinner or a brew.  
     Overnight option: downtown SLO.  

   • Pismo Beach & Solvang (option)  
     – Pismo: pier, ATV dunes at nearby Oceano Dunes.  
     – Solvang: Danish-style village and bakeries (20 mi inland from Pismo).  

   • Santa Barbara (100 mi / 2 hrs from SLO)  
     – State Street shopping, Stearns Wharf, Mission Santa Barbara.  
     – Wine tasting in the nearby Funk Zone or Santa Ynez Valley.  

   • Malibu & Santa Monica (90 mi / 1½–2 hrs from SB)  
     – Malibu’s Zuma Beach or Point Dume.  
     – Santa Monica Pier, Third Street Promenade.  

   • Los Angeles (20 mi / 30 min from Santa Monica)  
     – Welcome to LA!  

2. Faster Inland Route (I-5)  
   Total driving time: ~6 hrs, 380 miles  
   Good if you’re pressed for time;  fewer scenic overlooks but easier mileage.  

   Key stops along I-5:  
   • Gilroy (40 mi / 45 min from SF) – Home of the Garlic Festival; farm stands.  
   • Kettleman City (160 mi / 2½ hrs from Gilroy) – Bravo Farms for ice cream and picnic.  
   • Harris Ranch (80 mi / 1 hr from Kettleman) – Large steakhouse, deli and wine shop.  
   • Grapevine / Tejon Pass (65 mi / 1 hr from Harris) – Decent rest-stop restaurants and views as you descend into Southern California.  
   • Valencia / Santa Clarita (30 mi / 30 min from Grapevine) – Valencia Town Center for shops.  
   • Los Angeles (35 mi / 40 min from Valencia)  

—  
Tips:  
• Plan fuel and rest stops in Big Sur — services are sparse.  
• Book lodging early if traveling weekends or holidays (Big Sur, SLO, Santa Barbara are popular).  
• Allow extra time for traffic, especially near Malibu, Santa Barbara, and LA.  

Enjoy your trip! Let me know if you need more detail on any stop or lodging suggestions.

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/o4-mini',

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

Detective Mara Ellington crouched in the alley’s muted glow, rain dripping from her brimmed hat. The city’s midnight hush was deafening, broken only by distant sirens and the scurry of rats. She’d come to inspect the scene of a daring daylight burglary at the old Currier estate, expecting shattered glass and empty safes. Instead, on the damp cobblestones, she found a single porcelain doll’s head—its cheek chipped, one glass eye staring blankly at the moon. 

Heat prickled her neck. No burglar would leave such a thing behind. She reached for it, careful of the spider-web crack snaking from its temple. The doll’s painted lips were twisted into an unnatural grin, and tucked beneath its chin was a scrap of yellowed paper, edges singed. Mara unfolded it, breath catching as she read the single word scrawled in crimson ink: “Found.”

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/o4-mini',

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

Recursion is a technique where a function (or routine) calls itself in order to break a problem down into smaller, more manageable pieces. Every recursive solution has two essential parts:

1. Base Case  
    – A condition under which the function returns a result directly, without making any further recursive calls.  
2. Recursive Case  
    – The part of the function that calls itself with a smaller or simpler input, moving the overall problem toward the base case.

Simple Example: Computing Factorial

The factorial of a non-negative integer n (written n!) is the product of all positive integers up to n.  
  – 0! is defined as 1 (this will be our base case).  
  – For n > 0, n! = n × (n – 1)! 

Here’s how you could write it in Python:

```
def factorial(n):
    # Base case
    if n == 0:
        return 1
    # Recursive case
    else:
        return n * factorial(n - 1)
```

How it works for factorial(4):
 1. factorial(4)  
    → 4 * factorial(3)  
 2. factorial(3)  
    → 3 * factorial(2)  
 3. factorial(2)  
    → 2 * factorial(1)  
 4. factorial(1)  
    → 1 * factorial(0)  
 5. factorial(0)  
    → 1   (base case reached)

Then the calls “unwind”:
  – factorial(1) returns 1 × 1 = 1  
  – factorial(2) returns 2 × 1 = 2  
  – factorial(3) returns 3 × 2 = 6  
  – factorial(4) returns 4 × 6 = 24  

Key points to remember:
- Always define a clear base case, or the recursion will never stop.  
- Each recursive call should make progress toward that base case (e.g. decreasing n by 1).  
- Recursion is especially handy for problems that naturally split into similar subproblems (tree traversals, divide-and-conquer algorithms, combinatorial searches, etc.).

## Parameters

* [ Input ](#tab-panel-90)
* [ Output ](#tab-panel-91)

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
