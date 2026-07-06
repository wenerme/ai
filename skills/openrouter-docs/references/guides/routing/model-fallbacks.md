> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Model Fallbacks

> Automatic failover between models

export const Template = ({children, data}) => {
  const replace = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data) ? data[k] : `{{${k}}}`);
  const leafText = node => typeof node === 'string' ? node : node?.$$typeof && typeof node.props?.children === 'string' ? node.props.children : null;
  const collapseTokens = nodes => {
    const out = [];
    let i = 0;
    while (i < nodes.length) {
      const ta = leafText(nodes[i]);
      const tb = leafText(nodes[i + 1]);
      const tc = leafText(nodes[i + 2]);
      if (ta != null && tb != null && tc != null) {
        const m = (ta + tb + tc).match(/^([\s\S]*)\{\{(\w+)\}\}([\s\S]*)$/);
        if (m && (m[2] in data)) {
          out.push(m[1] + data[m[2]] + m[3]);
          i += 3;
          continue;
        }
      }
      out.push(nodes[i]);
      i++;
    }
    return out;
  };
  const process = node => {
    if (typeof node === 'string') return replace(node);
    if (Array.isArray(node)) return collapseTokens(node.map(process));
    if (node && typeof node === 'object') {
      if (node.$$typeof) return {
        ...node,
        props: process(node.props)
      };
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, process(v)]));
    }
    return node;
  };
  return <>{process(children)}</>;
};

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

The `models` parameter lets you automatically try other models if the primary model's providers are down, rate-limited, or refuse to reply due to content moderation.

## How It Works

Provide an array of model IDs in priority order. If the first model returns an error, OpenRouter will automatically try the next model in the list.

<CodeGroup>
  ```typescript title="TypeScript SDK" lines theme={null}
  import { OpenRouter } from '@openrouter/sdk';

  const openRouter = new OpenRouter({
    apiKey: '<OPENROUTER_API_KEY>',
  });

  const completion = await openRouter.chat.send({
    models: ['~anthropic/claude-sonnet-latest', 'gryphe/mythomax-l2-13b'],
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  });

  console.log(completion.choices[0].message.content);
  ```

  ```typescript title="TypeScript (fetch)" lines theme={null}
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      models: ['~anthropic/claude-sonnet-latest', 'gryphe/mythomax-l2-13b'],
      messages: [
        {
          role: 'user',
          content: 'What is the meaning of life?',
        },
      ],
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  ```

  ```python title="Python" expandable lines theme={null}
  import requests
  import json

  response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "models": ["~anthropic/claude-sonnet-latest", "gryphe/mythomax-l2-13b"],
      "messages": [
        {
          "role": "user",
          "content": "What is the meaning of life?"
        }
      ]
    })
  )

  data = response.json()
  print(data['choices'][0]['message']['content'])
  ```
</CodeGroup>

## Fallback Behavior

If the model you selected returns an error, OpenRouter will try to use the fallback model instead. If the fallback model is down or returns an error, OpenRouter will return that error.

By default, any error can trigger the use of a fallback model, including:

* Context length validation errors
* Moderation flags for filtered models
* Rate-limiting
* Downtime

## Pricing

Requests are priced using the model that was ultimately used, which will be returned in the `model` attribute of the response body.

## Using with the Anthropic Messages API

The Anthropic Messages API endpoint (`/api/v1/messages`) accepts the `fallbacks` parameter, matching the shape used by Anthropic's SDKs. Each entry names a fallback model to try in order, and the list maps to OpenRouter's `models` routing, so fallbacks trigger on the same errors listed above (rate limits, downtime, moderation refusals), not only on refusals.

<Note>
  OpenRouter handles this fallback routing itself. The `fallbacks` parameter does not use Anthropic's server-side fallback feature.
</Note>

```typescript lines theme={null}
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  baseURL: 'https://openrouter.ai/api',
  apiKey: '<OPENROUTER_API_KEY>',
});

const message = await anthropic.beta.messages.create({
  model: 'anthropic/claude-sonnet-4.5',
  max_tokens: 1024,
  fallbacks: [{ model: 'anthropic/claude-opus-4.1' }],
  messages: [{ role: 'user', content: 'What is the meaning of life?' }],
});
```

### Limitations

* Each `fallbacks` entry accepts only the `model` field. Per-attempt overrides such as `max_tokens`, `thinking`, `speed`, or `output_config` are rejected with a 400 error.
* `fallbacks` cannot be combined with the `models` parameter; sending both returns a 400 error.
* `fallbacks` accepts at most 3 entries; longer lists return a 400 error.

## Using with OpenAI SDK

To use the `models` array with the OpenAI SDK, include it in the `extra_body` parameter. In the example below, `~openai/gpt-latest` will be tried first, and the `models` array will be tried in order as fallbacks.

<Template
  data={{
API_KEY_REF,
}}
>
  <CodeGroup>
    ```python Python expandable lines theme={null}
    from openai import OpenAI

    openai_client = OpenAI(
      base_url="https://openrouter.ai/api/v1",
      api_key={{API_KEY_REF}},
    )

    completion = openai_client.chat.completions.create(
        model="~openai/gpt-latest",
        extra_body={
            "models": ["~anthropic/claude-sonnet-latest", "gryphe/mythomax-l2-13b"],
        },
        messages=[
            {
                "role": "user",
                "content": "What is the meaning of life?"
            }
        ]
    )

    print(completion.choices[0].message.content)
    ```

    ```typescript TypeScript expandable lines theme={null}
    import OpenAI from 'openai';

    const openrouterClient = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: '{{API_KEY_REF}}',
    });

    async function main() {
      // @ts-expect-error
      const completion = await openrouterClient.chat.completions.create({
        model: '~openai/gpt-latest',
        models: ['~anthropic/claude-sonnet-latest', 'gryphe/mythomax-l2-13b'],
        messages: [
          {
            role: 'user',
            content: 'What is the meaning of life?',
          },
        ],
      });
      console.log(completion.choices[0].message);
    }

    main();
    ```
  </CodeGroup>
</Template>
