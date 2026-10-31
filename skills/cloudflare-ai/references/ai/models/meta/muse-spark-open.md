---
description: Muse Spark Open is Meta's open-weights reasoning model for coding and agentic workflows. It supports native image understanding and function calling, and is served through Fireworks serverless inference.
title: Muse Spark Open
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.CTzB_ysm.svg)

# Muse Spark Open

Text Generation • Meta

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/meta/muse-spark-open/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`meta/muse-spark-open`

- Third-party

Muse Spark Open is Meta's open-weights reasoning model for coding and agentic workflows. It supports native image understanding and function calling, and is served through Fireworks serverless inference.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,040,000 tokens |
| Terms and License | [link ↗](https://dev.meta.ai/resources/blog/build-with-muse-spark-open) |
| More information | [link ↗](https://research.meta.ai/blog/muse-spark-open) |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.25</li><li>Cached input (per 1M tokens)$0.15</li><li>Output (per 1M tokens)$4.25</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'meta/muse-spark-open',
  {
    messages: [
      {
        content: [
          {
            image_url: { url: 'https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png' },
            type: 'image_url',
          },
          { text: 'Describe the main subject and setting in this image.', type: 'text' },
        ],
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
  "model": "meta/muse-spark-open",
  "messages": [
    {
      "content": [
        {
          "image_url": {
            "url": "https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png"
          },
          "type": "image_url"
        },
        {
          "text": "Describe the main subject and setting in this image.",
          "type": "text"
        }
      ],
      "role": "user"
    }
  ]
}'
```

```
The main subject in the foreground is a young woman taking a close-up selfie-style photo while looking directly at the camera with a smile.

She has dark hair pulled back, and is wearing an oversized navy blue chunky-knit sweater over a white t-shirt, with blue jeans visible at her knee. She is accessorized with a gold chain necklace, multiple stacked silver rings on her fingers, and has pale yellow nail polish. She is holding a small black wireless microphone with a grey furry windscreen close to her chest with both hands, in a relaxed, seated pose with one knee up. Her expression and pose suggest she is recording a vlog, podcast, ASMR, or casual video message.

The setting is a cozy, warmly-lit indoor domestic space, likely a living room or bedroom:

* **Walls and architecture:** White walls with decorative wainscoting and crown molding. A white fireplace mantel is visible in the background.
* **Lighting and decor:** A small glowing lamp sits on the mantel, creating a warm ambient light. Above the mantel hangs a large framed grid collage of 16 black-and-white photographs. To the right, on the wall behind the subject, a portion of a large sketch or artwork on beige paper is visible. A doorway is visible on the far left, and a green plant leaf can be seen in the mid-background.
* **Atmosphere:** The overall ambiance is intimate, casual, and homey, with soft furnishings and warm lighting.

The camera angle is close and slightly low, focusing on the subject while keeping the background interior clearly in view.
```

```json
{
  "id": "chatcmpl-b02a92bfa9154272a831487e35e68ca9",
  "object": "chat.completion",
  "created": 1792094198,
  "model": "accounts/fireworks/models/muse-spark-open",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The main subject in the foreground is a young woman taking a close-up selfie-style photo while looking directly at the camera with a smile.\n\nShe has dark hair pulled back, and is wearing an oversized navy blue chunky-knit sweater over a white t-shirt, with blue jeans visible at her knee. She is accessorized with a gold chain necklace, multiple stacked silver rings on her fingers, and has pale yellow nail polish. She is holding a small black wireless microphone with a grey furry windscreen close to her chest with both hands, in a relaxed, seated pose with one knee up. Her expression and pose suggest she is recording a vlog, podcast, ASMR, or casual video message.\n\nThe setting is a cozy, warmly-lit indoor domestic space, likely a living room or bedroom:\n\n* **Walls and architecture:** White walls with decorative wainscoting and crown molding. A white fireplace mantel is visible in the background.\n* **Lighting and decor:** A small glowing lamp sits on the mantel, creating a warm ambient light. Above the mantel hangs a large framed grid collage of 16 black-and-white photographs. To the right, on the wall behind the subject, a portion of a large sketch or artwork on beige paper is visible. A doorway is visible on the far left, and a green plant leaf can be seen in the mid-background.\n* **Atmosphere:** The overall ambiance is intimate, casual, and homey, with soft furnishings and warm lighting.\n\nThe camera angle is close and slightly low, focusing on the subject while keeping the background interior clearly in view.",
        "reasoning_content": "We need to describe the main subject and setting. Identify main subject: young woman with dark hair pulled back, wearing navy blue chunky knit sweater over white t-shirt, gold chain necklace, multiple silver rings, pale yellow nail polish, holding a small black microphone with fuzzy windscreen. Smiling at camera.\n\nSetting: Indoor, cozy living room / bedroom, warm lighting. White walls with wainscoting, fireplace mantel in background with lamp glowing, framed photo collage of black-and-white photos (16 images in grid) above mantel, artwork/sketch on wall to right, soft furnishings.\n\nProvide description. Possibly also note composition.\n\nShould be detailed, clear. Use respectful tone. No disallowed content. It's straightforward.\n\nWe should be careful not to claim identification of private individual? We don't know who she is, don't attempt identification. Describe generically.\n\nShould we mention image quality: selfie perspective, close-up.\n\nProvide answer succinctly but thorough.\n\nMaybe include lighting, ambiance: warm, inviting, domestic interior.\n\nPossibly note pose: leaning forward, knees up, relaxed.\n\nProvide structured answer: Main subject, setting/background.\n\nMake sure not hallucinate beyond visible. Mention doorway on left, plant leaf, decorative items on mantel.\n\nAdd context: appears to be recording podcast/ASMR/vlog.\n\nShould we mention ethnicity? Avoid stereotyping. Could say appears to be a young woman, but not make assumptions about protected characteristics beyond observable? It's allowed to describe appearance in general terms. Best avoid guessing ethnicity/nationality.\n\nProvide answer.\n\nPotentially offer concise but thorough.\n\nUse clear language.\n\nNo policy violation.\n\nShould we mention that setting suggests home environment?\n\nYes.\n\nMake answer helpful.\n\nPotentially also mention clothing details: oversized navy sweater, blue jeans visible on knee.\n\nJewelry: multiple stacked rings, gold necklace.\n\nMicrophone: small with gray furry wind muff.\n\nBackground details: framed grid of 16 photos, small lamp emitting warm glow, doorway, wall molding, artwork partially visible.\n\nLighting: warm ambient.\n\nOverall mood: friendly, casual, intimate.\n\nMake sure to not be overly long but sufficient.\n\nPossibly also mention camera angle: slightly low, close-up, eye contact.\n\nDeliver.\n\nWe must not reveal reasoning strength.\n\nFollow final formatting.\n\nAdd disclaimer? Not needed.\n\nAnswer in complete sentences.\n\nPotentially bullet points? Better paragraph form.\n\nMake accessible.\n\nWe should ensure we don't claim to identify location exactly.\n\nUse neutral tone.\n\nPossibly include: The image shows a young woman in foreground as main subject, indoors.\n\nProvide that.\n\nProceed to final.",
        "tools": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 4234,
    "total_tokens": 5096,
    "completion_tokens": 862,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 526
    },
    "output_tokens_details": {
      "reasoning_tokens": 526
    }
  }
}
```

## Examples

<details>

<summary>**Calendar Function** — Select a function and produce typed arguments</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-open',
  {
    messages: [
      { content: 'Schedule a meeting with Alex tomorrow at 10 AM for 30 minutes.', role: 'user' },
    ],
    tool_choice: 'required',
    tools: [
      {
        function: {
          description: 'Schedule a calendar meeting',
          name: 'schedule_meeting',
          parameters: {
            additionalProperties: false,
            properties: {
              duration_minutes: { type: 'integer' },
              participant: { type: 'string' },
              start_time: { type: 'string' },
            },
            required: ['participant', 'start_time', 'duration_minutes'],
            type: 'object',
          },
          strict: true,
        },
        type: 'function',
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
  "model": "meta/muse-spark-open",
  "messages": [
    {
      "content": "Schedule a meeting with Alex tomorrow at 10 AM for 30 minutes.",
      "role": "user"
    }
  ],
  "tool_choice": "required",
  "tools": [
    {
      "function": {
        "description": "Schedule a calendar meeting",
        "name": "schedule_meeting",
        "parameters": {
          "additionalProperties": false,
          "properties": {
            "duration_minutes": {
              "type": "integer"
            },
            "participant": {
              "type": "string"
            },
            "start_time": {
              "type": "string"
            }
          },
          "required": [
            "participant",
            "start_time",
            "duration_minutes"
          ],
          "type": "object"
        },
        "strict": true
      },
      "type": "function"
    }
  ]
}'
```

```
I'll schedule your 30-minute meeting with Alex for tomorrow at 10 AM.
```

```json
{
  "id": "chatcmpl-15de06134b674c2cba94c37526ed9201",
  "object": "chat.completion",
  "created": 1792094215,
  "model": "accounts/fireworks/models/muse-spark-open",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'll schedule your 30-minute meeting with Alex for tomorrow at 10 AM.",
        "reasoning_content": "We need to schedule meeting. Need to determine date. Today? Current date 2026-10-15 according to knowledge cutoff? But need to compute tomorrow. We don't know current time. Probably assume today is... Let's assume current date is provided? No. We need to schedule with participant Alex, start_time tomorrow at 10 AM. Need to provide ISO format. Duration 30 minutes.\n\nWe need to figure start_time. Suppose today is 2026-05-13? But system says current date 2026-10-15. Could be. Tomorrow would be 2026-10-16 10:00. Need to output in format: maybe \"2026-10-16T10:00:00\" ? We should use ISO.\n\nWe need to call schedule_meeting function.\n\nWe have to choose start_time. If no timezone given, use 10:00. Let's do 2026-10-16T10:00:00.\n\nWe need participant Alex, duration 30, start_time that.\n\nWe should call function.\n\nAlso need to consider we don't know actual current date? Might need to ask? But we can assume. Could also use generic like \"tomorrow at 10 AM\" maybe parser expects YYYY-MM-DD HH:MM.\n\nWe should provide schedule_meeting.\n\nWe must ensure correct JSON.\n\nWe need to output function call.\n\nWe will provide one call.\n\nPotential date: Let's check knowledge cutoff date. Current date defined as 2026-10-15. So tomorrow is 2026-10-16.\n\nUse start_time \"2026-10-16T10:00:00\"\n\nWe should comply.\n\nWe also need to respond? We should call function then after observation respond. But for now we need to call function.\n\nWe should do schedule_meeting with participant Alex, start_time 2026-10-16 10:00, duration 30.\n\nDo we need timezone? Maybe not.\n\nWe will invoke.\n\n",
        "tool_calls": [
          {
            "index": 0,
            "id": "chatcmpl-tool-8349311a196b221b",
            "type": "function",
            "function": {
              "name": "schedule_meeting",
              "arguments": "{\"participant\": \"Alex\", \"start_time\": \"2026-10-16T10:00:00\", \"duration_minutes\": 30}"
            },
            "name": null
          }
        ],
        "tools": null
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 666,
    "total_tokens": 1187,
    "completion_tokens": 521,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 404
    },
    "output_tokens_details": {
      "reasoning_tokens": 404
    }
  }
}
```

</details>

<details>

<summary>**Debug a Code Review** — Diagnose a bug and return the smallest safe code change</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-open',
  {
    max_completion_tokens: 600,
    messages: [
      {
        content:
          'You are a precise code reviewer. Identify the bug, explain why it happens, and provide a minimal patch.',
        role: 'system',
      },
      {
        content:
          'This Python function should return only active users, but it returns every user:\n\n```python\ndef active_users(users):\n    return [user for user in users if user.get("active", True)]\n```\n\nSome users have `{"active": False}`. Fix it without changing the behavior for records where `active` is missing.',
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
  "model": "meta/muse-spark-open",
  "max_completion_tokens": 600,
  "messages": [
    {
      "content": "You are a precise code reviewer. Identify the bug, explain why it happens, and provide a minimal patch.",
      "role": "system"
    },
    {
      "content": "This Python function should return only active users, but it returns every user:\n\n```python\ndef active_users(users):\n    return [user for user in users if user.get(\"active\", True)]\n```\n\nSome users have `{\"active\": False}`. Fix it without changing the behavior for records where `active` is missing.",
      "role": "user"
    }
  ]
}'
```

```
We need to identify bug, explain why it happens, provide minimal patch.

We need to understand problem: function should return only active users but returns every user. Some users have {"active": False}. Fix it without changing behavior for records where active is missing.

Code:

def active_users(users):
    return [user for user in users if user.get("active", True)]

Bug? Let's see: user.get("active", True) If active missing, returns True. That matches requirement: missing treated as active? But requirement says don't change behavior for records where active is missing. Wait the bug is returns every user even where active is False.

user.get("active", True) should return False for those with active False, so filter should exclude them. Why would it return every user? Possibly because... Wait if user.get returns False then list comprehension if False would filter out. So why returns every user?

Maybe issue is truthiness? But False is falsy, should be filtered.

Wait maybe users have {"active": False} but also... hmm.

Could be that user.get("active", True) returns True for missing, but should it? Requirement: don't change behavior for records where active is missing. So missing should remain as currently treated - maybe missing should be considered active? But code does that.

Why would function return every user? Possibility: user dict contains active key with value False, but user.get("active", True) returns False, but if statement checks... Should filter.

Unless users are something else? Maybe bug is using default True incorrectly? Wait if user has active = False, get returns False. Good. If user has active = None? or 0? But prompt says some users have {"active": False}. So that should be filtered.

Wait could be that the bug is that user.get("active", True) will treat missing as True, but what about users where active is truthy? Should return active users. So what's bug?

Hold on: The list comprehension is [user for user in users if user.get("active", True)] . That should work. Why does it return every user?

Potential pitfalls:

- Maybe users have string "False"? No.

- Maybe the dict get default True means... Hmm.

Oh! Could be that some users have active key set to False but get still returns True? No.

Wait think: Is there a Python gotcha? user.get("active", True) where active is missing returns True. That's truthy. If active is False, returns False (falsy). So filtering works.

Unless... The bug is that users is list of user dicts, but user.get("active", True) - if active is missing, returns True, but if active is present as False, it's falsy, should filter out. So why would it return every user? Could be that the condition is wrong precedence? No.

Maybe the actual bug is not in this line but
```

```json
{
  "id": "chatcmpl-da7aa459c19e4421bd2ed0827d374cbf",
  "object": "chat.completion",
  "created": 1792094625,
  "model": "accounts/fireworks/models/muse-spark-open",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "reasoning_content": "We need to identify bug, explain why it happens, provide minimal patch.\n\nWe need to understand problem: function should return only active users but returns every user. Some users have {\"active\": False}. Fix it without changing behavior for records where active is missing.\n\nCode:\n\ndef active_users(users):\n    return [user for user in users if user.get(\"active\", True)]\n\nBug? Let's see: user.get(\"active\", True) If active missing, returns True. That matches requirement: missing treated as active? But requirement says don't change behavior for records where active is missing. Wait the bug is returns every user even where active is False.\n\nuser.get(\"active\", True) should return False for those with active False, so filter should exclude them. Why would it return every user? Possibly because... Wait if user.get returns False then list comprehension if False would filter out. So why returns every user?\n\nMaybe issue is truthiness? But False is falsy, should be filtered.\n\nWait maybe users have {\"active\": False} but also... hmm.\n\nCould be that user.get(\"active\", True) returns True for missing, but should it? Requirement: don't change behavior for records where active is missing. So missing should remain as currently treated - maybe missing should be considered active? But code does that.\n\nWhy would function return every user? Possibility: user dict contains active key with value False, but user.get(\"active\", True) returns False, but if statement checks... Should filter.\n\nUnless users are something else? Maybe bug is using default True incorrectly? Wait if user has active = False, get returns False. Good. If user has active = None? or 0? But prompt says some users have {\"active\": False}. So that should be filtered.\n\nWait could be that the bug is that user.get(\"active\", True) will treat missing as True, but what about users where active is truthy? Should return active users. So what's bug?\n\nHold on: The list comprehension is [user for user in users if user.get(\"active\", True)] . That should work. Why does it return every user?\n\nPotential pitfalls:\n\n- Maybe users have string \"False\"? No.\n\n- Maybe the dict get default True means... Hmm.\n\nOh! Could be that some users have active key set to False but get still returns True? No.\n\nWait think: Is there a Python gotcha? user.get(\"active\", True) where active is missing returns True. That's truthy. If active is False, returns False (falsy). So filtering works.\n\nUnless... The bug is that users is list of user dicts, but user.get(\"active\", True) - if active is missing, returns True, but if active is present as False, it's falsy, should filter out. So why would it return every user? Could be that the condition is wrong precedence? No.\n\nMaybe the actual bug is not in this line but",
        "tools": null
      },
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 231,
    "total_tokens": 831,
    "completion_tokens": 600,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 597
    },
    "output_tokens_details": {
      "reasoning_tokens": 597
    }
  }
}
```

</details>

<details>

<summary>**Evaluate a Tool Result** — Continue an agent loop after a function result is returned</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-open',
  {
    max_completion_tokens: 400,
    messages: [
      {
        content:
          'Is the production deployment healthy? If not, recommend the next operational action.',
        role: 'user',
      },
      {
        content: null,
        role: 'assistant',
        tool_calls: [
          {
            function: {
              arguments: '{"service":"api","environment":"production"}',
              name: 'get_deployment_status',
            },
            id: 'call_deployment_status',
            type: 'function',
          },
        ],
      },
      {
        content:
          '{"status":"degraded","error_rate":0.082,"baseline_error_rate":0.004,"version":"2026.10.15.2"}',
        role: 'tool',
        tool_call_id: 'call_deployment_status',
      },
    ],
    tools: [
      {
        function: {
          description: 'Retrieve a deployment health summary',
          name: 'get_deployment_status',
          parameters: {
            properties: { environment: { type: 'string' }, service: { type: 'string' } },
            required: ['service', 'environment'],
            type: 'object',
          },
        },
        type: 'function',
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
  "model": "meta/muse-spark-open",
  "max_completion_tokens": 400,
  "messages": [
    {
      "content": "Is the production deployment healthy? If not, recommend the next operational action.",
      "role": "user"
    },
    {
      "content": null,
      "role": "assistant",
      "tool_calls": [
        {
          "function": {
            "arguments": "{\"service\":\"api\",\"environment\":\"production\"}",
            "name": "get_deployment_status"
          },
          "id": "call_deployment_status",
          "type": "function"
        }
      ]
    },
    {
      "content": "{\"status\":\"degraded\",\"error_rate\":0.082,\"baseline_error_rate\":0.004,\"version\":\"2026.10.15.2\"}",
      "role": "tool",
      "tool_call_id": "call_deployment_status"
    }
  ],
  "tools": [
    {
      "function": {
        "description": "Retrieve a deployment health summary",
        "name": "get_deployment_status",
        "parameters": {
          "properties": {
            "environment": {
              "type": "string"
            },
            "service": {
              "type": "string"
            }
          },
          "required": [
            "service",
            "environment"
          ],
          "type": "object"
        }
      },
      "type": "function"
    }
  ]
}'
```

```
We need to answer: Is production deployment healthy? If not, recommend next operational action.

We have status degraded, error rate 0.082 vs baseline 0.004. So not healthy. Need recommend next operational action.

We must be careful: The tool output gives error_rate 0.082 (8.2%), baseline 0.004 (0.4%). Version 2026.10.15.2. Status degraded.

We need to consider what is next operational action? Probably rollback? Or investigate? We don't have specific runbook. We should recommend next steps: check logs, alerts, rollback to previous version, notify on-call, etc.

We should follow general AI assistant guidelines: no disallowed content. It's fine.

We must not hallucinate additional tool calls. We have one tool result.

We should provide answer concisely but helpfully.

Probably also mention that error rate is ~20x baseline.

Recommend next operational action: investigate, consider rollback, check deployment diff, etc.

We must not provide false info.

Potentially need to ask clarification? But question: Is production deployment healthy? If not, recommend next operational action. So answer: No, it's degraded.

We should suggest standard operational actions: Alert on-call, review logs/metrics, check recent changes in version 2026.10.15.2, consider rollback/canary, open incident.

We must ensure we don't claim we have extra data.

We should be helpful.

We should phrase in clear way.

Potentially mention error_rate and baseline.

No policy violation.

We should not make absolute medical/legal advice. It's operational.

We should provide recommendation.

Make sure to use correct formatting.

Possibly also mention to get_deployment_status for staging? But no, only production requested.

So answer.

We should not invent remediation that requires disallowed action.

Ensure we answer in user-friendly tone.

We might want to suggest to run further diagnostics.

We must not halluc
```

```json
{
  "id": "chatcmpl-74e96757383447e6bf5cc8623c7f5e8a",
  "object": "chat.completion",
  "created": 1792094652,
  "model": "accounts/fireworks/models/muse-spark-open",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "reasoning_content": "We need to answer: Is production deployment healthy? If not, recommend next operational action.\n\nWe have status degraded, error rate 0.082 vs baseline 0.004. So not healthy. Need recommend next operational action.\n\nWe must be careful: The tool output gives error_rate 0.082 (8.2%), baseline 0.004 (0.4%). Version 2026.10.15.2. Status degraded.\n\nWe need to consider what is next operational action? Probably rollback? Or investigate? We don't have specific runbook. We should recommend next steps: check logs, alerts, rollback to previous version, notify on-call, etc.\n\nWe should follow general AI assistant guidelines: no disallowed content. It's fine.\n\nWe must not hallucinate additional tool calls. We have one tool result.\n\nWe should provide answer concisely but helpfully.\n\nProbably also mention that error rate is ~20x baseline.\n\nRecommend next operational action: investigate, consider rollback, check deployment diff, etc.\n\nWe must not provide false info.\n\nPotentially need to ask clarification? But question: Is production deployment healthy? If not, recommend next operational action. So answer: No, it's degraded.\n\nWe should suggest standard operational actions: Alert on-call, review logs/metrics, check recent changes in version 2026.10.15.2, consider rollback/canary, open incident.\n\nWe must ensure we don't claim we have extra data.\n\nWe should be helpful.\n\nWe should phrase in clear way.\n\nPotentially mention error_rate and baseline.\n\nNo policy violation.\n\nWe should not make absolute medical/legal advice. It's operational.\n\nWe should provide recommendation.\n\nMake sure to use correct formatting.\n\nPossibly also mention to get_deployment_status for staging? But no, only production requested.\n\nSo answer.\n\nWe should not invent remediation that requires disallowed action.\n\nEnsure we answer in user-friendly tone.\n\nWe might want to suggest to run further diagnostics.\n\nWe must not halluc",
        "tools": null
      },
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 764,
    "total_tokens": 1164,
    "completion_tokens": 400,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 397
    },
    "output_tokens_details": {
      "reasoning_tokens": 397
    }
  }
}
```

</details>

<details>

<summary>**Plan a Visual Interface** — Turn a visual reference into a concise frontend implementation plan</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-open',
  {
    max_completion_tokens: 600,
    messages: [
      {
        content: [
          {
            image_url: { url: 'https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png' },
            type: 'image_url',
          },
          {
            text: 'Create a concise implementation plan for a responsive landing-page hero inspired by this image. Include layout, typography, color, and accessibility decisions.',
            type: 'text',
          },
        ],
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
  "model": "meta/muse-spark-open",
  "max_completion_tokens": 600,
  "messages": [
    {
      "content": [
        {
          "image_url": {
            "url": "https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png"
          },
          "type": "image_url"
        },
        {
          "text": "Create a concise implementation plan for a responsive landing-page hero inspired by this image. Include layout, typography, color, and accessibility decisions.",
          "type": "text"
        }
      ],
      "role": "user"
    }
  ]
}'
```

```
We need to respond to user request: Create concise implementation plan for responsive landing-page hero inspired by image. Include layout, typography, color, accessibility decisions.

We need to consider: The image shows a person with dark hair, navy sweater, white t-shirt, gold chain, rings, pale yellow nails, holding microphone with fuzzy windscreen, cozy indoor room with white walls, framed photos, warm lamp, plant.

We need to do layout, typography, color, accessibility.

We must ensure we don't violate policy. It's a photo of a person. We can describe. We should not attempt to identify the person. Do not claim who she is. No facial recognition. We can describe generally.

We should provide implementation plan.

We must not repeat harmful content. It's allowed.

We should comply with instruction to create concise implementation plan.

We should ensure we don't hallucinate identity. Don't name person.

We should avoid disallowed content. It's fine.

Potentially we need to be careful about copyright? Image is provided. We can describe.

We should provide layout: hero two-column on desktop, stacked on mobile, image on right, text on left, etc. Typography: sans-serif, etc. Color palette inspired by navy #... warm off-white, gold accent, pale yellow.

Accessibility: alt text, contrast, keyboard navigation, captions, etc.

We should keep concise but thorough.

We should not provide excessive formatting? Use bullet points.

Ensure we comply with policy for image description. No disallowed content.

We must not mention reasoning strength.

We should respond in helpful manner.

Potential nuance: The user wants implementation plan for responsive landing-page hero inspired by image. That's allowed. It's not disallowed.

We should not generate image? We are text only.

Make sure not to produce disallowed content.

We should ensure we don't use overly long? Concise.

We should include accessibility decisions: color contrast WCAG AA, focus states, alt text, responsive images, etc.

We should include layout: flex/grid, breakpoints.

Typography: heading, subheading, CTA.

Color: primary navy #1A2A4A, background warm white #FFFBF5, accent gold #C9A86A, secondary pale yellow #F2E8B5 etc.

We should mention to avoid using person's likeness directly without permission; use placeholder or licensed image.

We should be mindful to not reproduce copyrighted text? No.

We should provide code snippet? Probably not needed, but could provide structure.

User wants concise implementation plan.

We should comply.

We should ensure we do not identify individual in image. We must not say who it is. So we can refer to "person in navy sweater holding microphone".

We should not attempt to infer protected characteristics? We can describe clothing, setting, but avoid assumptions about race, ethnicity, etc. We can describe observable features but not label protected attributes? Policy says we should not make presumptions. We
```

```json
{
  "id": "chatcmpl-df2fc95390f94475a884d93204b80416",
  "object": "chat.completion",
  "created": 1792094658,
  "model": "accounts/fireworks/models/muse-spark-open",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "reasoning_content": "We need to respond to user request: Create concise implementation plan for responsive landing-page hero inspired by image. Include layout, typography, color, accessibility decisions.\n\nWe need to consider: The image shows a person with dark hair, navy sweater, white t-shirt, gold chain, rings, pale yellow nails, holding microphone with fuzzy windscreen, cozy indoor room with white walls, framed photos, warm lamp, plant.\n\nWe need to do layout, typography, color, accessibility.\n\nWe must ensure we don't violate policy. It's a photo of a person. We can describe. We should not attempt to identify the person. Do not claim who she is. No facial recognition. We can describe generally.\n\nWe should provide implementation plan.\n\nWe must not repeat harmful content. It's allowed.\n\nWe should comply with instruction to create concise implementation plan.\n\nWe should ensure we don't hallucinate identity. Don't name person.\n\nWe should avoid disallowed content. It's fine.\n\nPotentially we need to be careful about copyright? Image is provided. We can describe.\n\nWe should provide layout: hero two-column on desktop, stacked on mobile, image on right, text on left, etc. Typography: sans-serif, etc. Color palette inspired by navy #... warm off-white, gold accent, pale yellow.\n\nAccessibility: alt text, contrast, keyboard navigation, captions, etc.\n\nWe should keep concise but thorough.\n\nWe should not provide excessive formatting? Use bullet points.\n\nEnsure we comply with policy for image description. No disallowed content.\n\nWe must not mention reasoning strength.\n\nWe should respond in helpful manner.\n\nPotential nuance: The user wants implementation plan for responsive landing-page hero inspired by image. That's allowed. It's not disallowed.\n\nWe should not generate image? We are text only.\n\nMake sure not to produce disallowed content.\n\nWe should ensure we don't use overly long? Concise.\n\nWe should include accessibility decisions: color contrast WCAG AA, focus states, alt text, responsive images, etc.\n\nWe should include layout: flex/grid, breakpoints.\n\nTypography: heading, subheading, CTA.\n\nColor: primary navy #1A2A4A, background warm white #FFFBF5, accent gold #C9A86A, secondary pale yellow #F2E8B5 etc.\n\nWe should mention to avoid using person's likeness directly without permission; use placeholder or licensed image.\n\nWe should be mindful to not reproduce copyrighted text? No.\n\nWe should provide code snippet? Probably not needed, but could provide structure.\n\nUser wants concise implementation plan.\n\nWe should comply.\n\nWe should ensure we do not identify individual in image. We must not say who it is. So we can refer to \"person in navy sweater holding microphone\".\n\nWe should not attempt to infer protected characteristics? We can describe clothing, setting, but avoid assumptions about race, ethnicity, etc. We can describe observable features but not label protected attributes? Policy says we should not make presumptions. We",
        "tools": null
      },
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 4252,
    "total_tokens": 4852,
    "completion_tokens": 600,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 597
    },
    "output_tokens_details": {
      "reasoning_tokens": 597
    }
  }
}
```

</details>

## Parameters

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

Input [Open](https://developers.cloudflare.com/ai/models/meta/muse-spark-open/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-spark-open/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/meta/muse-spark-open/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-spark-open/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/meta/muse-spark-open/#page","headline":"Muse Spark Open","description":"Muse Spark Open is Meta's open-weights reasoning model for coding and agentic workflows. It supports native image understanding and function calling, and is served through Fireworks serverless inference.","url":"https://developers.cloudflare.com/ai/models/meta/muse-spark-open/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
