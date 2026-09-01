> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Client SDKs

> Lightweight, type-safe clients for the OpenRouter API

The Client SDKs give you a thin, type-safe layer over the OpenRouter REST API. It handles authentication, request validation, and response typing so you can call any of 400+ models with a single function call, with no boilerplate and no provider-specific quirks.

## Installation

| Language   | Package                                                            |
| ---------- | ------------------------------------------------------------------ |
| TypeScript | [`@openrouter/sdk`](https://www.npmjs.com/package/@openrouter/sdk) |
| Python     | [`openrouter`](https://pypi.org/project/openrouter/)               |
| Go         | [`go-sdk`](https://pkg.go.dev/github.com/OpenRouterTeam/go-sdk)    |

<CodeGroup>
  ```bash title="npm" lines theme={null}
  npm install @openrouter/sdk
  ```

  ```bash title="pnpm" lines theme={null}
  pnpm add @openrouter/sdk
  ```

  ```bash title="yarn" lines theme={null}
  yarn add @openrouter/sdk
  ```

  ```bash title="bun" lines theme={null}
  bun add @openrouter/sdk
  ```

  ```bash title="deno" lines theme={null}
  deno add npm:@openrouter/sdk
  ```

  ```bash title="pip" lines theme={null}
  pip install openrouter
  ```

  ```bash title="go" lines theme={null}
  go get github.com/OpenRouterTeam/go-sdk
  ```
</CodeGroup>

All three SDKs are auto-generated from the OpenRouter OpenAPI spec, so new models, parameters, and endpoints appear immediately after each API release.

## When to use the Client SDKs

Choose the Client SDKs when you need **direct, efficient access to model inference** and want to manage your own application logic:

* **Single-turn completions**, send a prompt, get a response
* **Streaming responses**, real-time token-by-token output
* **Embeddings, video, and rerank**, generate vector representations, create videos, and rerank results
* **API key and credit management**, programmatic control over your account
* **Custom orchestration**, you handle conversation loops, tool dispatch, and state yourself

The Client SDKs are intentionally lean. It mirrors the OpenRouter API surface 1:1 with full type safety, so there is no abstraction to fight when you need fine-grained control.

<Tip>
  If you want higher-level primitives for building agents (multi-turn loops, tool definitions, stop conditions, and conversation state management), see the [Agent SDK](/docs/agent-sdk/overview) instead.
</Tip>

## Quick example

<CodeGroup>
  ```typescript title="TypeScript" lines theme={null}
  import { OpenRouter } from '@openrouter/sdk';

  const client = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const response = await client.chat.send({
    chatRequest: {
      model: 'openai/gpt-5.2',
      messages: [
        { role: 'user', content: 'Explain quantum computing in one sentence.' },
      ],
    },
  });

  if (response instanceof ReadableStream) {
    throw new Error('Expected a non-streaming response');
  }

  console.log(response.choices[0].message.content);
  ```

  ```python title="Python" lines theme={null}
  from openrouter import OpenRouter
  import os

  with OpenRouter(api_key=os.getenv("OPENROUTER_API_KEY")) as client:
      response = client.chat.send(
          model="openai/gpt-5.2",
          messages=[
              {"role": "user", "content": "Explain quantum computing in one sentence."}
          ],
      )

      print(response.choices[0].message.content)
  ```
</CodeGroup>

## Client SDKs vs Agent SDK

|                        | Client SDKs                                                   | Agent SDK                                                           |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Focus**              | Lean API client, mirrors the REST API with full type safety   | Agentic primitives, multi-turn loops, tools, stop conditions        |
| **Use when**           | You want direct model calls and manage orchestration yourself | You want built-in agent loops, tool execution, and state management |
| **Conversation state** | You manage it                                                 | Managed for you via `callModel`                                     |
| **Tool execution**     | You dispatch tool calls                                       | Automatic with the `tool()` helper                                  |
| **Languages**          | TypeScript, Python, Go                                        | TypeScript                                                          |

## Next steps

* [TypeScript SDK reference](/docs/client-sdks/typescript)
* [Python SDK reference](/docs/client-sdks/python)
* [Go SDK reference](/docs/client-sdks/go)
* [Agent SDK overview](/docs/agent-sdk/overview), for building agents with multi-turn loops and tools
