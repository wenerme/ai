---
title: Kimi K2.5
description: Kimi K2.5 is Moonshot AI's language model with strong coding, reasoning, and multilingual capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![Moonshot AI logo](https://developers.cloudflare.com/_astro/moonshotai.D9EBG7kx.svg) 

#  Kimi K2.5 

Text Generation • Moonshot AI • Proxied 

`moonshotai/kimi-k2.5` 

Kimi K2.5 is Moonshot AI's language model with strong coding, reasoning, and multilingual capabilities.

| Model Info                                                                 |                                                                                                                        |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                         |
| Terms and License                                                          | [link ↗](https://kimi.moonshot.cn/terms)                                                                               |
| More information                                                           | [link ↗](https://kimi.moonshot.cn/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/moonshotai/kimi-k2.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the difference between TCP and UDP protocols.',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-258)
* [ Output ](#tab-panel-259)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Explain the difference between TCP and UDP protocols."

        }

    ]

}


```

```

{

    "text": " TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are both transport layer protocols used to send data over networks, but they serve fundamentally different purposes and trade-offs between reliability and speed.\n\n## **TCP: The Reliable Courier**\n\nTCP is **connection-oriented** and designed for reliability.\n\n**Key Characteristics:**\n- **Connection-based**: Establishes a connection via the \"three-way handshake\" (SYN, SYN-ACK, ACK) before transmitting data\n- **Guaranteed delivery**: Uses acknowledgments (ACKs) and retransmissions—if a packet is lost, it’s resent\n- **Ordered delivery**: Sequences packets so they arrive in the correct order (reconstructs them if they arrive out of sequence)\n- **Flow control**: Adjusts transmission speed based on network congestion and receiver capacity\n- **Error checking**: Validates data integrity using checksums\n\n**Trade-off**: All this reliability creates overhead, higher latency, and slower transmission speeds.\n\n## **UDP: The Speedy Postcard**\n\nUDP is **connectionless** and designed for speed.\n\n**Key Characteristics:**\n- **No connection**: Sends data immediately without handshakes or setup\n- **Best-effort delivery**: No acknowledgment of receipt—if packets are lost, they’re gone forever\n- **No ordering**: Packets may arrive out of order, duplicated, or not at all; the application must handle this if needed\n- **No congestion control**: Sends at a constant rate regardless of network conditions\n- **Lightweight**: Minimal header (8 bytes vs TCP’s 20–60 bytes)\n\n**Trade-off**: Maximum speed and low latency, but with zero guarantee of delivery.\n\n## **Quick Comparison**\n\n| Feature | TCP | UDP |\n|---------|-----|-----|\n| **Connection** | Required (handshake) | None |\n| **Reliability** | Guaranteed | Best-effort |\n| **Ordering** | Maintained | Not guaranteed |\n| **Speed** | Slower | Faster |\n| **Header Size** | 20–60 bytes | 8 bytes |\n| **Data integrity** | High | Basic checksum only |\n| **Congestion control** | Yes | No |\n\n## **Real-World Analogies**\n\n- **TCP** is like a certified mail with tracking and delivery confirmation. You know it arrived, and you know the order in which letters were opened. It takes longer and costs more, but nothing is lost.\n- **UDP** is like shouting across a crowded room. It’s immediate and fast, but some words might get drowned out by noise, and you won’t know if the other person heard you unless they shout back.\n\n## **When to Use Which**\n\n**Use TCP when accuracy matters more than speed:**\n- Web browsing (HTTP/HTTPS)\n- File transfers (FTP)\n- Email (SMTP, IMAP, POP3)\n- Database queries\n\n**Use UDP when speed matters more than perfect accuracy:**\n- Live video/audio streaming (Netflix, Zoom, Twitch)\n- Online gaming (position updates, shooter games)\n- DNS queries (translating domain names to IPs)\n- Voice over IP (VoIP)\n- IoT sensor data (frequent small updates)\n\n## **Hybrid Approaches**\n\nSome applications use both: online games often use UDP for player movement (speed is critical) but TCP for chat messages and scoring (accuracy is critical).\n\n**Bottom line:** Choose TCP when you cannot afford to lose data; choose UDP when you cannot afford to wait."

}


```

## Examples

**With System Message**  — Using a system message to guide responses 

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'system',

        content:

          'You are an expert in Chinese history and culture. Respond with historical context and interesting anecdotes.',

      },

      {

        role: 'user',

        content: 'Tell me about the Silk Road.',

      },

    ],

    temperature: 0.7,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-260)
* [ Output ](#tab-panel-261)

```

{

    "messages": [

        {

            "role": "system",

            "content": "You are an expert in Chinese history and culture. Respond with historical context and interesting anecdotes."

        },

        {

            "role": "user",

            "content": "Tell me about the Silk Road."

        }

    ],

    "temperature": 0.7

}


```

Explain Code

```

{

    "text": " The **Silk Road** (絲綢之路) is perhaps history's greatest misnomer—a term coined not by ancient traders, but by the German geographer **Ferdinand von Richthofen** in 1877. In reality, it was never a single \"road\" but a vast, shifting network of caravan routes spanning 4,000 miles, connecting Chang'an (modern Xi'an) to the Mediterranean for over 1,500 years.\n\n## The Han Dynasty Origins\n\nThe Silk Road was effectively born from imperial desperation. In 138 BCE, Emperor Wu of Han sent **Zhang Qian** on a diplomatic mission westward to find allies against the nomadic Xiongnu. Zhang was captured by the Xiongnu and held for ten years, married a Xiongnu wife (whom he later brought back to China), but eventually reached Central Asia. He returned with intelligence about Ferghana's \"heavenly horses\" (汗血馬—literally \"blood-sweating horses\") and the sophisticated civilizations of Bactria and Sogdiana, but no military allies.\n\nUndeterred, Zhang embarked on a second mission. Though he failed diplomatically, he accidentally established the commercial infrastructure that would transform Eurasian civilization. The Han court began trading silk—a commodity so precious that Romans would later calculate its weight in gold—for the Ferghana horses that could withstand the Xiongnu cavalry.\n\n## The Legend of the Silk Princess\n\nOne of my favorite anecdotes involves the transmission of silk technology itself. For centuries, China maintained a draconian monopoly on sericulture (silk production), with smuggling silkworm eggs punishable by death. According to the Tibetan *Li yul gyi lo rgyus* (Chronicle of the Kingdom of Li), a Chinese princess being married to the king of Khotan (in modern Xinjiang) around 440 CE could not bear to live without silk. She hid silkworm eggs in her elaborate coiffure—specifically in the hollow of her hairpins—and mulberry seeds in the lining of her cap. Thus, silk production spread westward, though it would take another six centuries to reach Byzantium (where Emperor Justinian's agents allegedly smuggled eggs in bamboo canes).\n\n## What Actually Traveled?\n\nWhile silk lent its name to the route, the traffic was astonishingly diverse:\n\n**Westward from China:** Paper (revolutionizing administration from Samarkand to Baghdad), cast iron technology, gunpowder, the compass, printing, peaches, and apricots.\n\n**Eastward to China:** Buddhism (which transformed from an Indian religion into distinct Chinese schools), Manichaeism, Nestorian Christianity, Zoroastrianism, glassware (unknown in China before this), lapis lazuli from Afghanistan, and the Persian lute (ancestor of the Chinese pipa).\n\nMost crucial were the **Sogdian merchants**—an Iranian-speaking people from modern Uzbekistan who became the middlemen of the Silk Road. They established colonies in Chinese cities like Chang'an and Dunhuang, acting as translators, bankers, and cultural brokers. Archaeologists have discovered Sogdian letters from the 4th century describing trade in silver, pepper, and unfortunately, the chaos of the Jin Dynasty collapse.\n\n## The Dunhuang Caves: A Library in the Desert\n\nAt the western edge of Chinese territory lay **Dunhuang**, where the Mogao Caves contain the greatest repository of Silk Road artifacts. In 1900, a Taoist monk named Wang Yuanlu discovered a sealed cave (Cave 17) containing 50,000 manuscripts in 17 languages—from Chinese and Sanskrit to Sogdian and Hebrew—dating from the 5th to 11th centuries.\n\nOne poignant document is a Jewish merchant's letter in Judeo-Persian, found in Dandan Oilik, describing the sale of a slave girl and 32 sheep. Another is the *Diamond Sutra* (868 CE), the world's oldest dated printed book, showing that printing technology was already spreading westward along the routes.\n\n## The Tang Dynasty Golden Age\n\nThe Silk Road peaked during the **Tang Dynasty** (618–907), when Chang'an became the world's first million-person city. The capital housed tens of thousands of foreign residents—Persian princes, Arab merchants, Turkish generals, and Korean scholars. The poet **Li Bai**, arguably China's greatest literary figure, was likely born in Suyab (near modern Bishkek, Kyrgyzstan) to a Sogdian family.\n\nEmperor Xuanzong kept Central Asian dancing girls and musicians in his court, performing the \"Whirling Dance\" (胡旋舞) from Sogdiana—much to the horror of Confucian officials who viewed these \"barbarian\" influences as corrupting.\n\n## The Decline\n\nThe route's decline began with the **An Lushan Rebellion** (755–763), which devastated Tang China and severed control over the western regions. By the Song Dynasty (960–1279), maritime routes had largely replaced overland trade, and the Ming Dynasty (1368–1644) eventually abandoned the western territories, building the Great Wall not to keep people out, but to keep Chinese in—preventing unauthorized trade.\n\nThe final blow came in the 15th century when Ottoman control of the eastern Mediterranean and Portuguese circumnavigation of Africa made the overland route economically obsolete.\n\n## Echoes Today\n\nWhen archaeologists excavated **Pompeii** (destroyed 79 CE), they found Chinese silk in the remains—testament to how far these threads traveled. Similarly, Roman glass has been discovered in Han Dynasty tombs in coastal China, likely arriving via maritime Silk Road routes.\n\nToday, China's \"Belt and Road Initiative\" explicitly invokes this history, though ironically, the ancient Silk Road flourished precisely because no single empire controlled it entirely—it was the competition between Tang, Tibetan, Turkic, and Arab powers that created the commercial ecosystem. The greatest irony of all? The term \"Silk Road\" would have meant nothing to the camel drivers and Sogdian bankers who actually traversed it; to them, it was simply *the road*, or perhaps just another Tuesday in the desert."

}


```

**Code Generation**  — Lower temperature for precise code output 

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a Python function to calculate the Fibonacci sequence using memoization.',

      },

    ],

    temperature: 0.2,

    max_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-262)
* [ Output ](#tab-panel-263)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Write a Python function to calculate the Fibonacci sequence using memoization."

        }

    ],

    "temperature": 0.2,

    "max_tokens": 2048

}


```

Explain Code

```

{}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'user',

        content: 'I want to learn about neural networks.',

      },

      {

        role: 'assistant',

        content:

          'Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes. Would you like to start with the basics of perceptrons?',

      },

      {

        role: 'user',

        content: 'Yes, explain perceptrons first.',

      },

    ],

    max_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-264)
* [ Output ](#tab-panel-265)

```

{

    "messages": [

        {

            "role": "user",

            "content": "I want to learn about neural networks."

        },

        {

            "role": "assistant",

            "content": "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes. Would you like to start with the basics of perceptrons?"

        },

        {

            "role": "user",

            "content": "Yes, explain perceptrons first."

        }

    ],

    "max_tokens": 2048

}


```

Explain Code

```

{

    "text": " A **perceptron** is the simplest type of artificial neural network—essentially a single neuron. Invented by Frank Rosenblatt in 1957, it's a binary classifier that decides whether an input belongs to one category or another (e.g., \"spam\" vs. \"not spam\").\n\n## How it works\n\nImagine a perceptron as a decision-making node that takes several inputs, processes them, and produces a single output (0 or 1).\n\n### The Structure\n1. **Inputs** ($x_1, x_2, ..., x_n$): Features of your data (e.g., pixel brightness, word frequency)\n2. **Weights** ($w_1, w_2, ..., w_n$): Importance values for each input\n3. **Bias** ($b$): A threshold that shifts the decision boundary\n4. **Activation Function**: A step function that converts the result to 0 or 1\n\n### The Math\nThe perceptron calculates the **weighted sum** of inputs:\n\n$$\\text{weighted sum} = (x_1 \\cdot w_1) + (x_2 \\cdot w_2) + ... + (x_n \\cdot w_n) + b$$\n\nOr simplified:\n$$\\text{output} = \\begin{cases} \n1 & \\text{if } \\sum(w_i x_i) + b > 0 \\\\\n0 & \\text{otherwise}\n\\end{cases}$$\n\n## Learning Process\n\nThe perceptron \"learns\" by adjusting weights when it makes mistakes:\n\n1. Start with random weights\n2. For each training example:\n   - Calculate prediction\n   - If wrong: Adjust weights toward the correct answer\n   - **Update rule**: $w_i \\leftarrow w_i + \\eta(y - \\hat{y})x_i$\n     - $\\eta$ = learning rate (how big the adjustment is)\n     - $y$ = true label (0 or 1)\n     - $\\hat{y}$ = prediction\n\n## The Big Limitation: XOR Problem\n\nPerceptrons can only solve **linearly separable** problems (data you can separate with a straight line). They famously **cannot** learn the XOR function (exclusive OR):\n\n| Input A | Input B | XOR Output |\n|---------|---------|------------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\nYou can't draw a single straight line to separate the 1s from the 0s. This limitation led to the development of **Multi-Layer Perceptrons (MLPs)**—networks with hidden layers between input and output.\n\n**Next step**:"

}


```

## Parameters

* [ Input ](#tab-panel-268)
* [ Output ](#tab-panel-269)

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

## API Schemas

* [ Input ](#tab-panel-266)
* [ Output ](#tab-panel-267)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "messages": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "role": {

            "type": "string",

            "enum": [

              "system",

              "developer",

              "user",

              "assistant",

              "tool"

            ]

          },

          "content": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "null"

              },

              {

                "type": "array",

                "items": {}

              }

            ]

          }

        },

        "required": [

          "role",

          "content"

        ],

        "additionalProperties": {}

      }

    },

    "temperature": {

      "type": "number",

      "minimum": 0,

      "maximum": 2

    },

    "max_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "max_completion_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "top_p": {

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "frequency_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2

    },

    "stream": {

      "type": "boolean"

    },

    "stream_options": {

      "type": "object",

      "properties": {

        "include_usage": {

          "type": "boolean"

        }

      },

      "additionalProperties": false

    },

    "tools": {

      "type": "array",

      "items": {}

    },

    "tool_choice": {},

    "response_format": {}

  },

  "required": [

    "messages"

  ],

  "additionalProperties": {}

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "id": {

      "type": "string"

    },

    "object": {

      "type": "string"

    },

    "created": {

      "type": "number"

    },

    "model": {

      "type": "string"

    },

    "choices": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "index": {

            "type": "number"

          },

          "message": {

            "type": "object",

            "properties": {

              "role": {

                "type": "string"

              },

              "content": {

                "anyOf": [

                  {

                    "type": "string"

                  },

                  {

                    "type": "null"

                  }

                ]

              },

              "tool_calls": {

                "type": "array",

                "items": {}

              }

            },

            "required": [

              "role"

            ],

            "additionalProperties": {}

          },

          "finish_reason": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "null"

              }

            ]

          }

        },

        "required": [

          "index",

          "message",

          "finish_reason"

        ],

        "additionalProperties": {}

      }

    },

    "usage": {

      "type": "object",

      "properties": {

        "prompt_tokens": {

          "type": "number"

        },

        "completion_tokens": {

          "type": "number"

        },

        "total_tokens": {

          "type": "number"

        }

      },

      "required": [

        "prompt_tokens",

        "completion_tokens",

        "total_tokens"

      ],

      "additionalProperties": {}

    }

  },

  "required": [

    "id",

    "object",

    "created",

    "model",

    "choices"

  ],

  "additionalProperties": {}

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
