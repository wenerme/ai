> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Usage for Agents

Give your AI coding assistant the knowledge to work with the OpenRouter Client SDKs
by installing our official `openrouter-typescript-sdk` skill from the
[OpenRouterTeam/skills](https://github.com/OpenRouterTeam/skills) repository.

The skill covers both the Client SDKs (`@openrouter/sdk`) and the Agent SDK (`@openrouter/agent`).
When working with the Client SDKs, your AI assistant will focus on the **platform features**:
model listing, chat completions, credits, OAuth, and API key management.

## Quick Start

### Claude Code

```bash
/plugin marketplace add OpenRouterTeam/skills
/plugin install openrouter@openrouter
```

### Cursor

Add via **Settings > Rules > Add Rule > Remote Rule (Github)** with `OpenRouterTeam/skills`.

### GitHub CLI

Requires [GitHub CLI](https://cli.github.com/) v2.90.0+. Works with Claude Code, Cursor, OpenCode, Codex, Gemini CLI, Windsurf, and [many more agents](https://cli.github.com/manual/gh_skill_install):

```bash
gh skill install OpenRouterTeam/skills openrouter-typescript-sdk
```

## Supported AI Coding Assistants

The skill works with any AI coding assistant that supports the [Agent Skills](https://agentskills.io/home) standard:

| Assistant                                                     | Status    |
| ------------------------------------------------------------- | --------- |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | Supported |
| [Cursor](https://cursor.com)                                  | Supported |
| [OpenCode](https://opencode.ai)                               | Supported |
| [GitHub Copilot](https://github.com/features/copilot)         | Supported |
| [Codex](https://openai.com/index/openai-codex)                | Supported |
| [Amp](https://amp.dev)                                        | Supported |
| [Roo Code](https://roo.dev)                                   | Supported |
| [Antigravity](https://antigravity.dev)                        | Supported |

## What the Skill Provides

Once installed, your AI coding assistant will have knowledge of:

* **SDK Installation & Setup** - How to install and configure `@openrouter/sdk`
  in TypeScript projects
* **Chat Completions** - Working with the chat API for conversations
* **Embeddings** - Generating embeddings for semantic search and RAG
* **Error Handling** - Proper error handling patterns
* **Streaming** - Real-time streaming responses
* **Tool Use** - Implementing function calling and tools
* **API Key Management** - Programmatic API key creation and management
* **OAuth** - PKCE authentication flow for user-facing applications

## Example Usage

After installing the skill, your AI assistant can help you with tasks like:

**"Help me set up OpenRouter in my project"**

The assistant will know to use:

```typescript
import OpenRouter from '@openrouter/sdk';

const client = new OpenRouter();

const completion = await client.chat.send({
  model: 'anthropic/claude-sonnet-4',
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});
```

**"Add streaming to my OpenRouter call"**

The assistant understands the streaming API:

```typescript
import OpenRouter from '@openrouter/sdk';

const client = new OpenRouter();

const stream = await client.chat.send({
  model: 'anthropic/claude-sonnet-4',
  messages: [{ role: 'user', content: 'Tell me a story' }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? '');
}
```

If you need higher-level primitives for building agents — multi-turn loops, tool definitions, stop conditions — see the [Agent SDK](/docs/agent-sdk/overview) instead.

## Repository

The skill source is available at:
[github.com/OpenRouterTeam/skills](https://github.com/OpenRouterTeam/skills)

Contributions and feedback are welcome.