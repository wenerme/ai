---
description: Muse Ember 1.0 is Meta's fast, efficient model with top-tier speed for its class, built for subagent workloads.
title: Muse Ember 1.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.CTzB_ysm.svg)

# Muse Ember 1.0

Text Generation • Meta

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`meta/muse-ember-1.0` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party
- Zero data retention

Muse Ember 1.0 is Meta's fast, efficient model with top-tier speed for its class, built for subagent workloads.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://dev.meta.ai/docs/models) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$0.10</li><li>Cached input (per 1M tokens)$0.004</li><li>Output (per 1M tokens)$0.50</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'meta/muse-ember-1.0',
  {
    input: [
      {
        role: 'system',
        content: 'You are a code review assistant. Be brief and concrete.'
      },
      {
        role: 'user',
        content: 'Summarize this change for a reviewer in three bullet points, then list one risk.\n\n- function getUser(id) {\n-   return db.query(\'SELECT * FROM users WHERE id = \' + id)\n- }\n+ function getUser(id: string) {\n+   return db.query(\'SELECT * FROM users WHERE id = $1\', [id])\n+ }'
      }
    ],
    max_output_tokens: 4096
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-ember-1.0",
  "input": {
    "input": [
      {
        "role": "system",
        "content": "You are a code review assistant. Be brief and concrete."
      },
      {
        "role": "user",
        "content": "Summarize this change for a reviewer in three bullet points, then list one risk.\n\n- function getUser(id) {\n-   return db.query('\''SELECT * FROM users WHERE id = '\'' + id)\n- }\n+ function getUser(id: string) {\n+   return db.query('\''SELECT * FROM users WHERE id = $1'\'', [id])\n+ }"
      }
    ],
    "max_output_tokens": 4096
  }
}'
```

```
- Adds TypeScript type `id: string` to `getUser`
- Replaces string-concatenated SQL with parameterized `$1` query
- Passes `id` as bound parameter `[id]` instead of interpolating into query string

Risk: Existing callers passing numeric IDs will break and need conversion to string.
```

```json
{
  "id": "resp_6af15b9fd8d1276417fe40de",
  "object": "response",
  "created_at": 1794202527,
  "model": "frantic-ferret",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6af15b9fd8d1276417fe40de:rs_a0a00107-60ea-4bdd-904a-2fa7c88d8772",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_f8f9a657-5c16-4843-8442-0149157fe043",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "- Adds TypeScript type `id: string` to `getUser`\n- Replaces string-concatenated SQL with parameterized `$1` query\n- Passes `id` as bound parameter `[id]` instead of interpolating into query string\n\nRisk: Existing callers passing numeric IDs will break and need conversion to string.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 111,
    "output_tokens": 488,
    "total_tokens": 599,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 412
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "default",
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1794202527,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 4096
}
```

## Examples

<details>

<summary>**Structured Extraction** — Pull structured fields out of free text as JSON.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-ember-1.0',
  {
    input: 'Extract the vendor, invoice number, total and due date from this text as a JSON object with keys vendor, invoice_number, total and due_date: \'Invoice INV-20431 from Northwind Supplies. Amount due: $1,284.50, payable by 15 December 2026.\'',
    max_output_tokens: 4096
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-ember-1.0",
  "input": {
    "input": "Extract the vendor, invoice number, total and due date from this text as a JSON object with keys vendor, invoice_number, total and due_date: '\''Invoice INV-20431 from Northwind Supplies. Amount due: $1,284.50, payable by 15 December 2026.'\''",
    "max_output_tokens": 4096
  }
}'
```

```
{"vendor": "Northwind Supplies", "invoice_number": "INV-20431", "total": 1284.50, "due_date": "2026-12-15"}
```

```json
{
  "id": "resp_6af15ba2d8c9dfbcd7de4788",
  "object": "response",
  "created_at": 1794202530,
  "model": "frantic-ferret",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6af15ba2d8c9dfbcd7de4788:rs_e6a38195-817d-413a-9cfc-76e2a970d5c3",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_13055692-402b-4d72-8494-06d9912379ad",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "{\"vendor\": \"Northwind Supplies\", \"invoice_number\": \"INV-20431\", \"total\": 1284.50, \"due_date\": \"2026-12-15\"}",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 68,
    "output_tokens": 975,
    "total_tokens": 1043,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 927
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "default",
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1794202530,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 4096
}
```

</details>

<details>

<summary>**Web Search Grounding** — Use Meta's Responses API web search grounding to answer a current-events question with citations.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-ember-1.0',
  {
    input: 'Who won the most recent Formula 1 race? Include the race date and cite the sources.',
    tools: [
      {
        type: 'web_search'
      }
    ]
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-ember-1.0",
  "input": {
    "input": "Who won the most recent Formula 1 race? Include the race date and cite the sources.",
    "tools": [
      {
        "type": "web_search"
      }
    ]
  }
}'
```

```
Checking the latest Formula 1 results — I'll search for the most recent race winner and date.
```

```json
{
  "id": "resp_6af15ba26c54eff387aa4131",
  "object": "response",
  "created_at": 1794202530,
  "model": "frantic-ferret",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6af15ba26c54eff387aa4131:rs_7d56d543-8961-4750-ab3d-3f27b8ae62eb",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "rs_403a9fad-7cf9-4eeb-933e-c7012c0f913d",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Checking the latest Formula 1 results — I'll search for the most recent race winner and date.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "phase": "commentary",
      "status": "completed"
    },
    {
      "type": "web_search_call",
      "id": "ws_call_3c2a946e-d2a0-425a-8b4a-c51b2c3d843b",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "most recent Formula 1 race winner 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_03c7e2f3-3b06-47b8-8a8d-3a9c2befe773",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "latest F1 race result winner date November 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_8fb3d702-9f0d-4d74-8015-f51483792f3d",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "Formula 1 2026 race results latest Grand Prix"
      }
    },
    {
      "type": "reasoning",
      "id": "rs_6af15ba26c54eff387aa4131:rs_dbf67722-1fc9-4217-8aa4-8b62e27a473c",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "rs_481e77fa-b19b-4be1-881c-112215755e9b",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Search results point to the São Paulo GP on 8 November, won by Lando Norris. I'll open the official FIA and Formula 1 reports to verify.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "phase": "commentary",
      "status": "completed"
    },
    {
      "type": "web_search_call",
      "id": "ws_call_bf230267-f5bc-4535-aaa9-845a88d354d3",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.fia.com/news/f1-norris-triumphs-sao-paulo-mercedes-secure-2026-constructors-championship"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_88a79261-b5eb-4037-82d5-ca363439db15",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.formula1.com/en/latest/article/norris-beats-verstappen-in-wet-sao-paulo-gp-thriller-as-mercedes-win-constructors-championship.7JN7MXLZf5lk5l0C3gfKGI"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_82c96013-1b32-46ba-a363-520e86b0bb1a",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://journalarta.com/en/2026/11/09/f1-brazilian-gp-norris-wins-mercedes-constructors-title/"
      }
    },
    {
      "type": "reasoning",
      "id": "rs_6af15ba26c54eff387aa4131:rs_6a615b25-9ba2-4881-aa5a-f189d557c612",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "rs_82f9bf2f-d7ea-4d17-a3ac-033fe53964fa",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "The official reports confirm Norris's win. Now I'll verify no race has been held since São Paulo by checking the upcoming calendar.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "phase": "commentary",
      "status": "completed"
    },
    {
      "type": "web_search_call",
      "id": "ws_call_06611739-fa63-4078-9233-e66549cfcabb",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "2026 Formula 1 calendar Las Vegas Grand Prix November 21 Qatar Abu Dhabi remaining races"
      }
    },
    {
      "type": "reasoning",
      "id": "rs_6af15ba26c54eff387aa4131:rs_3ae6352b-8102-41f7-924d-871f0ab6d2d4",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "web_search_call",
      "id": "ws_call_3b2be896-a793-4004-8422-6ea3fd0d8414",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.formula1.com/en/results/2026/races"
      }
    },
    {
      "type": "reasoning",
      "id": "rs_6af15ba26c54eff387aa4131:rs_ec146eb4-1e44-4a1c-b2d3-027ba0ae5cae",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_8ed51611-03b0-4e76-b1b4-359b87e296ee",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "**Lando Norris (McLaren) won the most recent Formula 1 race — the São Paulo/Brazilian Grand Prix on Sunday, 8 November 2026**.\n\nFormula 1’s official 2026 results list “Brazil | 08 Nov | Lando Norris NOR | McLaren”, and the FIA reports that Norris “converted pole position into victory” at São Paulo, finishing 14.6 seconds clear of Max Verstappen. The next race was scheduled for Las Vegas on 20–22 November, confirming São Paulo was the latest race held.",
          "annotations": [
            {
              "type": "url_citation",
              "url": "https://journalarta.com/en/2026/11/09/f1-brazilian-gp-norris-wins-mercedes-constructors-title/",
              "start_index": 0,
              "end_index": 125,
              "title": "Norris Wins Brazilian Grand Prix as Mercedes Clinch Constructors' Title — JournalArta Global"
            },
            {
              "type": "url_citation",
              "url": "https://www.formula1.com/en/results/2026/races",
              "start_index": 128,
              "end_index": 213,
              "title": "2026 RACE RESULTS"
            },
            {
              "type": "url_citation",
              "url": "https://www.fia.com/news/f1-norris-triumphs-sao-paulo-mercedes-secure-2026-constructors-championship",
              "start_index": 213,
              "end_index": 346,
              "title": "F1 – Norris triumphs in São Paulo as Mercedes secure 2026 Constructors’ Championship"
            },
            {
              "type": "url_citation",
              "url": "https://www.formula1.com/en/latest/article/norris-beats-verstappen-in-wet-sao-paulo-gp-thriller-as-mercedes-win-constructors-championship.7JN7MXLZf5lk5l0C3gfKGI",
              "start_index": 348,
              "end_index": 454,
              "title": "2026 Formula 1 Sao Paulo Grand Prix report: Lando Norris beats Max Verstappen in wet Sao Paulo GP thriller as Mercedes win title"
            }
          ],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 52979,
    "output_tokens": 2040,
    "total_tokens": 55019,
    "input_tokens_details": {
      "cached_tokens": 12499
    },
    "output_tokens_details": {
      "reasoning_tokens": 1219
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "default",
  "background": false,
  "tools": [
    {
      "type": "web_search"
    }
  ],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1794202538,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true
}
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

Input [Open](https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/#page","headline":"Muse Ember 1.0","description":"Muse Ember 1.0 is Meta's fast, efficient model with top-tier speed for its class, built for subagent workloads.","url":"https://developers.cloudflare.com/ai/models/meta/muse-ember-1.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
