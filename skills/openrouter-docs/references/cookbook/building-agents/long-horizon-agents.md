> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Build a Long-Horizon Agent

This cookbook assumes you have an OpenRouter API key and are using the Agent
SDK (`@openrouter/agent`). If you are starting from scratch, read the
[Agent SDK overview](/docs/agent-sdk/overview) and the
[callModel reference](/docs/agent-sdk/call-model/overview) first.

**Goal:** Run an agent that can keep working for hours, not seconds — research
projects, multi-stage migrations, voice-driven assistants, or background jobs
that span days. The same `callModel` loop works for all of them once you wire
up four primitives.

**Outcome:** A long-horizon agent that:

* Caps total cost and step count so it always terminates.
* Persists conversation state so it can be resumed after a crash, deploy, or
  human approval.
* Streams progress events so dashboards and UIs stay live during the run.
* Runs a self-ask loop — research, adversarial review, repeat — until the
  agent emits a `[DONE]` sentinel.
* Optionally accepts voice input via OpenRouter's
  [Speech-to-Text](/docs/guides/overview/multimodal/stt) endpoint and replies
  with [Text-to-Speech](/docs/guides/overview/multimodal/tts).

You can hand this page to your coding agent as the implementation brief.
Adapt the storage, ceilings, and surface (CLI, API, queue worker) to your app
rather than scaffold a separate project.

## Prerequisites

* Node.js 20+ or Bun
* An [OpenRouter API key](https://openrouter.ai/settings/keys) in
  `OPENROUTER_API_KEY`
* A project with `@openrouter/agent` installed
* A place to persist state — a database, Redis, S3, or the local filesystem
* Optional: a microphone or audio file for the voice section

```bash
npm install @openrouter/agent @openrouter/sdk zod
```

## 1. Set hard ceilings on every run

Long-horizon agents must terminate. Combine multiple stop conditions so the
loop ends as soon as the first one fires. The most useful for long runs are
`maxCost`, `stepCountIs`, and `maxTokensUsed`.

```typescript
import { OpenRouter, tool, stepCountIs, maxCost } from '@openrouter/agent';
import { z } from 'zod';

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const searchTool = tool({
  name: 'search',
  description: 'Search the web for information',
  inputSchema: z.object({ query: z.string() }),
  execute: async ({ query }) => {
    return { results: await fetchResults(query) };
  },
});

const result = openrouter.callModel({
  model: '~anthropic/claude-opus-latest',
  input: 'Research the fusion energy landscape and produce a 5-page report.',
  tools: [searchTool],
  // Stop on whichever fires first.
  stopWhen: [stepCountIs(200), maxCost(5)],
});

const text = await result.getText();
```

See the [Stop Conditions reference](/docs/agent-sdk/call-model/stop-conditions)
for the full list (`stepCountIs`, `hasToolCall`, `maxTokensUsed`, `maxCost`,
`finishReasonIs`) and how to compose custom predicates.

Long-horizon runs spend real credits. Always set both a step ceiling and a
cost ceiling before you start a multi-hour run, and start small while you are
iterating.

## 2. Persist state for resumability

A multi-hour run must survive restarts, deploys, and human approvals.
`callModel` accepts a `StateAccessor` that loads and saves
`ConversationState` between steps. Back it with whatever storage your app
already uses.

```typescript
import type { ConversationState, StateAccessor } from '@openrouter/agent';
import { readFile, rename, writeFile } from 'node:fs/promises';

const fileStateAccessor = (path: string): StateAccessor => ({
  load: async () => {
    // Only swallow ENOENT — real I/O or permission errors should surface
    // instead of silently restarting the agent from scratch.
    const raw = await readFile(path, 'utf8').catch((err: NodeJS.ErrnoException) => {
      if (err.code === 'ENOENT') return null;
      throw err;
    });
    return raw ? (JSON.parse(raw) as ConversationState) : null;
  },
  // Atomic write: write to a temp file, then rename. POSIX rename is
  // atomic on the same filesystem, so a crash mid-write cannot leave
  // a truncated state file that breaks resumption.
  save: async (state) => {
    const tmp = `${path}.tmp`;
    await writeFile(tmp, JSON.stringify(state));
    await rename(tmp, path);
  },
});

const result = openrouter.callModel({
  model: '~anthropic/claude-opus-latest',
  input: 'Plan and start a 3-day data migration.',
  tools: [searchTool],
  state: fileStateAccessor('./run.json'),
  stopWhen: [stepCountIs(200), maxCost(5)],
});

await result.getResponse();
```

To resume after a crash, deploy, or human review, call `callModel` again with
the same `StateAccessor`. Pass `input: []` to signal "no new user turn —
continue from saved state"; the SDK loads the checkpoint and keeps going.

```typescript
const resumed = openrouter.callModel({
  model: '~anthropic/claude-opus-latest',
  input: [],
  state: fileStateAccessor('./run.json'),
  tools: [searchTool],
  stopWhen: [stepCountIs(200), maxCost(5)],
});

await resumed.getResponse();
```

For production, swap the file accessor for one backed by Postgres, Redis, or
an object store. See [Tool Approval & State](/docs/agent-sdk/call-model/approval-and-state)
for the full StateAccessor and resumption contract.

## 3. Stream progress instead of waiting

A run that lasts an hour should not block your UI for an hour. `callModel`
returns a result object with several streams you can consume independently:

* `result.getTextStream()` — token deltas for the user-facing response.
* `result.getToolCallsStream()` — tool calls as they complete.
* `result.getFullResponsesStream()` — the full event stream, including tool
  preliminary results.
* `result.getResponse()` — the final, fully-resolved response with usage data.

```typescript
const result = openrouter.callModel({
  model: '~anthropic/claude-opus-latest',
  input: 'Build a market analysis report on EV charging.',
  tools: [searchTool],
  stopWhen: [stepCountIs(100), maxCost(2)],
});

// Stream tool calls and text deltas concurrently.
const streamToolCalls = (async () => {
  for await (const call of result.getToolCallsStream()) {
    publishToDashboard({ kind: 'tool', name: call.name, args: call.arguments });
  }
})();

const streamText = (async () => {
  for await (const delta of result.getTextStream()) {
    publishToDashboard({ kind: 'token', delta });
  }
})();

await Promise.all([streamToolCalls, streamText]);

const final = await result.getResponse();
publishToDashboard({ kind: 'done', usage: final.usage });
```

See the [callModel API reference](/docs/agent-sdk/call-model/api-reference)
for every stream method and event type.

Wire `publishToDashboard` to whatever transport you already use — Server-Sent
Events, WebSockets, a database table, or a pubsub channel.

## 4. Loop with adversarial self-review

A single pass through `callModel` often leaves gaps — unverified citations,
missing edge cases, or stale data. Wrap the run in an outer self-ask loop:
research, adversarial review, repeat until the agent emits a `[DONE]`
sentinel. Each iteration appends a new user turn to the persisted
`StateAccessor`, so the agent builds on its prior work instead of starting
over.

```typescript
import { OpenRouter, stepCountIs, maxCost } from '@openrouter/agent';

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SELF_ASK_MAX_ITERATIONS = 10;
const REVIEW_PROMPT = `Review your last response adversarially.
- Are there gaps, ambiguities, or unverified claims?
- If the work is complete and every claim is verified, reply with only [DONE].
- Otherwise list the gaps and keep researching.`;

const state = fileStateAccessor('./run.json');
let input: string | unknown[] =
  'Research the fusion energy landscape and produce a 5-page report.';
let final = '';

for (let i = 0; i < SELF_ASK_MAX_ITERATIONS; i++) {
  const result = openrouter.callModel({
    model: '~anthropic/claude-opus-latest',
    input,
    state,
    tools: [searchTool],
    // Per-iteration ceilings. The outer for-loop adds a third guard.
    stopWhen: [stepCountIs(50), maxCost(2)],
  });
  final = await result.getText();
  if (final.includes('[DONE]')) break;
  // Hand the assistant's own output back as an adversarial reviewer turn.
  input = REVIEW_PROMPT;
}
```

The `[DONE]` sentinel is intentionally cheap: any model can produce it, and a
plain `String.includes` check keeps the control flow obvious. Swap the review
prompt or the reviewer model (for example a faster
`~anthropic/claude-sonnet-latest` critiquing an Opus researcher) without
changing the loop. Three layers of ceilings keep cost bounded:
`SELF_ASK_MAX_ITERATIONS` caps the number of review rounds, and each round
inherits its own `stepCountIs` + `maxCost` budget.

Pair this with the `state` accessor from step 2 so the loop survives crashes
mid-review. On resume, re-enter the loop from the saved state and continue
reviewing.

## 5. Add voice input

Drive the same agent loop from a voice memo, phone call, or push-to-talk app.
OpenRouter exposes a dedicated
[`/api/v1/audio/transcriptions`](/docs/guides/overview/multimodal/stt)
endpoint with a single STT model parameter. Hand the transcript to
`callModel` exactly like a text prompt.

```typescript
import { OpenRouter as SDK } from '@openrouter/sdk';
import { OpenRouter, stepCountIs, maxCost } from '@openrouter/agent';
import { readFile } from 'node:fs/promises';

const sdk = new SDK({ apiKey: process.env.OPENROUTER_API_KEY });
const agent = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

const audio = await readFile('./voice-memo.wav');
const transcription = await sdk.stt.createTranscription({
  model: 'openai/whisper-1',
  inputAudio: { data: audio.toString('base64'), format: 'wav' },
});

const result = agent.callModel({
  model: '~anthropic/claude-opus-latest',
  input: transcription.text,
  stopWhen: [stepCountIs(50), maxCost(2)],
});

const reply = await result.getText();
```

For a streaming microphone, capture audio chunks on the client, send them to
your server, and call `createTranscription` once silence is detected. Use the
[STT cookbook](/docs/guides/overview/multimodal/stt) for the full request and
response shape.

## 6. Speak the response back (optional)

For voice-out, pipe the agent's reply through
[`/api/v1/audio/speech`](/docs/guides/overview/multimodal/tts) and write the
resulting bytes to a file or stream them to the caller.

```typescript
import { writeFile } from 'node:fs/promises';

const stream = await sdk.tts.createSpeech({
  model: 'openai/gpt-4o-mini-tts-2025-12-15',
  input: reply,
  voice: 'alloy',
  responseFormat: 'mp3',
});

const chunks: Uint8Array[] = [];
const reader = stream.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}

await writeFile('./reply.mp3', Buffer.concat(chunks));
```

## 7. Notify on completion

Long-horizon jobs usually run somewhere the user is not watching. Notify them
when the run terminates — by webhook, email, Slack message, or whatever your
stack uses. Trigger the notification once `getResponse()` resolves so the
agent has fully completed and ceilings have been honored.

```typescript
const final = await result.getResponse();

const webhookUrl = process.env.WEBHOOK_URL;
if (!webhookUrl) {
  throw new Error('WEBHOOK_URL env var is required for webhook notifications');
}

await fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'completed',
    usage: final.usage,
    text: await result.getText(),
  }),
});
```

For agents that pause mid-run (for example, human-in-the-loop approvals), see
[Add Human-in-the-Loop Controls](/docs/cookbook/building-agents/hitl-tools).

## Check your work

A correct long-horizon implementation should pass all of the following:

* A run with a low `maxCost` (for example, `maxCost(0.10)`) returns from
  `callModel` once the ceiling is hit, even if the agent has more work
  queued.
* Killing the process mid-run and starting a new `callModel` invocation with
  the same `StateAccessor` resumes from the saved `ConversationState`. The
  message history grows rather than starting over.
* `getToolCallsStream()` and `getTextStream()` yield events while the agent
  is still running, not only at the end.
* Sending a voice file through `sdk.stt.createTranscription` returns the
  expected text, and feeding that text into `callModel` produces a response
  that references the spoken request.
* A webhook (or other notification) fires after `getResponse()` resolves.

## Resources

* [Agent SDK overview](/docs/agent-sdk/overview)
* [callModel reference](/docs/agent-sdk/call-model/overview)
* [Stop conditions reference](/docs/agent-sdk/call-model/stop-conditions)
* [Tool Approval & State](/docs/agent-sdk/call-model/approval-and-state)
* [Speech-to-Text guide](/docs/guides/overview/multimodal/stt)
* [Text-to-Speech guide](/docs/guides/overview/multimodal/tts)
* [Add Human-in-the-Loop Controls](/docs/cookbook/building-agents/hitl-tools)
* [Build Your Own Headless Agent](/docs/cookbook/building-agents/create-headless-agent)