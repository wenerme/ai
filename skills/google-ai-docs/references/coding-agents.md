AI coding assistants are powerful but have limitations---training data cuts off
at a specific date, missing new API features and changes. Without access to
Gemini-specific documentation, agents may suggest generic patterns instead of
optimized approaches.

[Gemini API skills](https://github.com/google-gemini/gemini-skills)
address these gaps by giving your coding
agent direct access to the latest Gemini API documentation, integration
patterns, and best practices. This ensures your agent can offer more accurate
and specific code examples and guidance. By installing these skills, your
coding assistant stays current with the evolving Gemini API and its recommended
usage.

## Available skills

The following skills are available. Install the ones relevant to your use case.

- **[skills.sh](https://skills.sh)**: Recommended. The open standard for portable agent behaviors.
- **[Context7](https://context7.com)**: Supported for users already utilizing the Context7 ecosystem.

### gemini-api-dev

The core Gemini API development skill:

- Points your coding agent to official Gemini API documentation
- Provides best practices for building Gemini-powered applications
- Includes recommended patterns for common integrations

#### Install with skills.sh

    npx skills add google-gemini/gemini-skills --skill gemini-api-dev --global

#### Install with Context7

    npx ctx7 skills install /google-gemini/gemini-skills gemini-api-dev

### gemini-live-api-dev

Skill for building real-time conversational AI applications with Gemini Live
API. This skill provides documentation and best practices for:

- WebSocket connections for low-latency streaming
- Streaming audio, video, and text
- Voice activity detection and barge-in support

#### Install with skills.sh

    npx skills add google-gemini/gemini-skills --skill gemini-live-api-dev --global

#### Install with Context7

    npx ctx7 skills install /google-gemini/gemini-skills gemini-live-api-dev

### gemini-interactions-api

Skill for building apps with the
[Interactions API](https://ai.google.dev/gemini-api/docs/interactions). The Interactions API is a
unified interface for interacting with Gemini models and agents, designed for
agentic applications. This skill covers:

- Text generation, multi-turn chat, and streaming
- Function calling, structured output, and image generation
- Background execution and Deep Research agents
- Server-side conversation state management
- Python and TypeScript SDK patterns

#### Install with skills.sh

    npx skills add google-gemini/gemini-skills --skill gemini-interactions-api --global

#### Install with Context7

    npx ctx7 skills install /google-gemini/gemini-skills gemini-interactions-api

## Verify installation

After installing, confirm that your coding agent has indexed the skill and can
access the live Gemini API documentation.

### 1. Verify agent behavior

The most reliable way to verify is to ask your agent a technical question about Gemini API.

**Prompt:** "How do I use context caching with the Gemini API?"

A successful installation will:

- Reference specific Gemini methods like `cacheContent` or `cachedContents.create`.
- Show an indicator that it is "Using skill: gemini-api-dev".

### 2. Verify manifest

If the agent gives a generic answer, use the specific "discovery" command for
your environment to verify the skill is loaded.

| Environment | Verification method |
|---|---|
| Claude Code | Type `/skills` in the terminal to list all active manifests. |
| Cursor | Open **Settings \> Rules**. Verify the skill appears under "Agent Decides." |
| Antigravity | Type `/skills list` or check the **Customizations \> Rules** sidebar. |
| Gemini CLI | Run `gemini skills list` or use the `/skills` slash command in-session. |
| Copilot | Type `@gemini /skills` (or just `/skills`) to view active extensions. |

## Troubleshooting

If your agent provides only general information or fails to recognize
Gemini-specific methods, check the following:

### Agent didn't discover the skill

Most agents index skills only on startup.

**Fix:** Completely restart your IDE (Cursor/VS Code) or exit and re-open your
terminal-based agent (Claude Code).

### Global vs. local conflict

If you installed with the `--global` flag, your agent might be ignoring it in
favor of project-specific rules.

**Fix:** Try installing the skill directly into your project root without the
global flag:

    npx skills add google-gemini/gemini-skills --skill gemini-api-dev

## Resources

- [Gemini API skills on GitHub](https://github.com/google-gemini/gemini-skills)
- [Interactions API](https://ai.google.dev/gemini-api/docs/interactions)
- [Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [Libraries](https://ai.google.dev/gemini-api/docs/libraries)