> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Quickstart: Build a Chat App

**Goal:** Learn the fundamentals of OpenRouter by building a TypeScript chat
app that sends messages and streams responses through OpenRouter.

**Outcome:** A working multi-turn conversation loop that can talk to any of the
600+ models available on the platform by changing a single string.

<Tip>
  Want to get started faster? Copy this prompt into your coding agent.

  <CopyPromptButton
    prompt={`Build a TypeScript command-line chat app that uses OpenRouter.

Goal:
Create a small Node.js app that sends a message to OpenRouter, streams the
assistant response, keeps multi-turn conversation context, and can switch
models by changing one string.

Build it as a way to teach me the basics of OpenRouter. Add short comments
where they help, then walk me through what you built and how it works.

Use this stack:

- Node.js 18 or newer
- TypeScript
- @openrouter/sdk
- tsx for running TypeScript locally
- OPENROUTER_API_KEY from the environment. Never hard-code the key.

Set up the project:

1. Create a project directory, for example openrouter-chat.
2. Run npm init -y.
3. Run npm pkg set type=module because @openrouter/sdk is ESM-only.
4. Install @openrouter/sdk.
5. Install tsx as a dev dependency.
6. Create chat.ts.
7. Run the app with OPENROUTER_API_KEY set, for example:
   OPENROUTER_API_KEY=sk-or-v1-... npx tsx chat.ts

If OPENROUTER_API_KEY is missing, tell me to create a key at:
<https://openrouter.ai/settings/keys>

Then help me add it to my local environment before running the app.

Use the current OpenRouter SDK request shape:

- Import the named client with:
  import { OpenRouter } from '@openrouter/sdk';
- Do not use a default OpenRouter import.
- Create the client with:
  const client = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
- Pass chat completion params inside client.chat.send({ chatRequest: ... }).

First implement a one-message smoke test:

- Call client.chat.send with a chatRequest containing
  model: 'google/gemini-3.1-flash-lite'.
- Send one user message: "Say hello in one sentence."
- Print completion.choices[0]?.message.content.
- Print completion.usage and confirm it includes the camelCase fields
  promptTokens and completionTokens.

Then implement a streaming example:

- Call client.chat.send with chatRequest.stream set to true.
- Use this user message:
  "Explain how routers work in three sentences."
- Iterate over the returned async iterable.
- For each chunk, read chunk.choices[0]?.delta?.content.
- Write each non-empty delta to process.stdout as it arrives.

Then replace the streaming example with a multi-turn chat loop:

- Import readline from node:readline.
- Keep an in-memory messages array containing user and assistant messages.
- Prompt the user with "You: ".
- If the user types exit, close the readline interface.
- Push each user input into messages.
- Call client.chat.send with:

  - chatRequest.model: 'google/gemini-3.1-flash-lite'
  - chatRequest.messages: messages
  - chatRequest.stream: true

- Print "Assistant: " and iterate over the returned async iterable.
- For each chunk, read chunk.choices[0]?.delta?.content.
- Write each non-empty delta to process.stdout as it arrives.
- Accumulate the full assistant response in a string.
- After the stream ends, push the assistant response into messages.
- Ask for the next user message.

Make the code easy to change:

- Put the selected model in a single constant so it can be swapped without
  changing the rest of the app.
- Include these verified example model strings in comments near the constant:

  - openai/gpt-chat-latest
  - ~anthropic/claude-sonnet-latest
  - baidu/cobuddy:free

Check your work:

- npx tsx chat.ts prints a streamed assistant response.
- A follow-up question can refer to a previous answer because the full
  messages array is sent with each request.
- Typing exit quits cleanly.
- Changing only the model string switches providers.
- The final explanation mentions the SDK's named OpenRouter import,
  chatRequest wrapper, streaming delta chunks, and camelCase usage fields.`}
  />
</Tip>

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