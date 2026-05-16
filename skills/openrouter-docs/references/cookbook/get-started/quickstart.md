> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Quickstart: Build a Chat App

**Goal:** Learn the fundamentals of OpenRouter by building a TypeScript chat
app that sends messages and streams responses through OpenRouter.

**Outcome:** A working multi-turn conversation loop that can talk to any of the
600+ models available on the platform by changing a single string.

Want to get started faster? Copy this prompt into your coding agent.

## Prerequisites

* **Node.js 18+** installed
* An **OpenRouter API key** — create one at
  [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) or set up
  a new [Stripe project](/docs/guides/overview/stripe-projects)

## 1. Create a project and install the SDK

Set up a new Node.js project and add the OpenRouter client SDK. The SDK is
ESM-only, so set the package type to `module`. Install `tsx` so you can run the
TypeScript examples directly.

```bash
mkdir openrouter-chat && cd openrouter-chat
npm init -y
npm pkg set type=module
npm install @openrouter/sdk
npm install --save-dev tsx
```

## 2. Send your first message

Create `chat.ts` with a client instance and a single chat completion request.
The `apiKey` reads from the environment so you never hard-code credentials.

```typescript
import { OpenRouter } from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const completion = await client.chat.send({
  chatRequest: {
    model: 'google/gemini-3.1-flash-lite',
    messages: [
      { role: 'user', content: 'Say hello in one sentence.' },
    ],
  },
});

console.log(completion.choices[0]?.message.content);
console.log({
  promptTokens: completion.usage?.promptTokens,
  completionTokens: completion.usage?.completionTokens,
});
```

Run it with your API key:

```bash
OPENROUTER_API_KEY=sk-or-v1-... npx tsx chat.ts
```

You should see a single text response printed to the console. The SDK returns
token usage in camelCase fields such as `promptTokens` and
`completionTokens`. The
`completion.choices` array follows the same shape as the
[Chat Completions response](/docs/api/api-reference/chat-completions/create-a-chat-completion).

## 3. Stream the response

Streaming returns text as it is generated instead of waiting for the full
response. Pass `stream: true` and iterate over the returned async iterable.
Each chunk contains a `delta` with the new text fragment.

```typescript
import { OpenRouter } from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const stream = await client.chat.send({
  chatRequest: {
    model: 'google/gemini-3.1-flash-lite',
    messages: [
      { role: 'user', content: 'Explain how routers work in three sentences.' },
    ],
    stream: true,
  },
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}
console.log();
```

Text now prints incrementally. See the [Streaming reference](/docs/api/api-reference/streaming)
for the full SSE event format.

## 4. Add multi-turn conversation

Multi-turn works by sending the full message history with each request. The
model uses all previous messages as context. Append each user input and
assistant response to a `messages` array before the next call.

```typescript
import { OpenRouter } from '@openrouter/sdk';
import * as readline from 'node:readline';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const messages: { role: 'user' | 'assistant'; content: string }[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(): void {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    messages.push({ role: 'user', content: input });

    const stream = await client.chat.send({
      chatRequest: {
        model: 'google/gemini-3.1-flash-lite',
        messages,
        stream: true,
      },
    });

    let response = '';
    process.stdout.write('Assistant: ');
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        process.stdout.write(delta);
        response += delta;
      }
    }
    console.log();

    messages.push({ role: 'assistant', content: response });
    ask();
  });
}

ask();
```

Run the file and type messages. The model remembers prior turns because the
full `messages` array is sent with each request. Type `exit` to quit.

## 5. Swap models

OpenRouter gives you access to hundreds of models through one API. Change the
`model` string to switch providers — no other code changes needed.

```typescript
// Use OpenAI's latest chat model
model: 'openai/gpt-chat-latest',

// Use Anthropic Claude Sonnet latest
model: '~anthropic/claude-sonnet-latest',

// Use a free model
model: 'openrouter/free',
```

Browse all available models at [openrouter.ai/models](https://openrouter.ai/models)
or query the [Models API](/docs/api/api-reference/models-and-endpoints/list-all-models)
programmatically.

## Check your work

* `npx tsx chat.ts` prints a streamed response to the console
* A multi-turn conversation maintains context across turns (ask a follow-up
  that references a previous answer)
* Changing the `model` string switches to a different provider with no other
  code changes
* The non-streaming response includes a `usage` object with `promptTokens`
  and `completionTokens`

## Next steps

* Connect a
  [coding agent](/docs/cookbook/coding-agents/claude-code-integration) to
  OpenRouter
* Explore the [Agent SDK](/docs/agent-sdk/overview) for built-in multi-turn
  loops and tool execution