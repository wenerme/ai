> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Claude Code

<Warning>
  Claude Code with OpenRouter is only guaranteed to work with the Anthropic first-party provider. For maximum compatibility, we recommend setting [Anthropic 1P as top priority provider](/docs/guides/routing/provider-selection) when using Claude Code.
</Warning>

## Why Use OpenRouter with Claude Code?

OpenRouter adds a reliability and management layer between Claude Code and Anthropic's API, giving you and your organization several key benefits.

### Provider Failover for High Availability

Anthropic's API occasionally experiences outages or rate limiting. When you route Claude Code through OpenRouter, your requests automatically fail over between multiple Anthropic providers. If one provider is unavailable or rate-limited, OpenRouter seamlessly routes to another, keeping your coding sessions uninterrupted.

### Organizational Budget Controls

For teams and organizations, OpenRouter provides centralized budget management. You can set spending limits, allocate credits across team members, and prevent unexpected cost overruns. This is especially valuable when multiple developers are using Claude Code across your organization.

### Usage Visibility and Analytics

OpenRouter gives you complete visibility into how Claude Code is being used across your team. Track usage patterns, monitor costs in real-time, and understand which projects or team members are consuming the most resources. All of this data is available in your [OpenRouter Activity Dashboard](https://openrouter.ai/activity).

## Quick Start

This guide will get you running [Claude Code](https://code.claude.com/docs/en/overview) powered by OpenRouter in just a few minutes.

### Step 1: Install Claude Code

<Tabs>
  <Tab title="Native Install (Recommended)">
    **macOS, Linux, WSL:**

    ```bash
    curl -fsSL https://claude.ai/install.sh | bash
    ```

    **Windows PowerShell:**

    ```powershell
    irm https://claude.ai/install.ps1 | iex
    ```
  </Tab>

  <Tab title="npm">
    Requires [Node.js 18 or newer](https://nodejs.org/en/download/).

    ```bash
    npm install -g @anthropic-ai/claude-code
    ```
  </Tab>
</Tabs>

### Step 2: Connect Claude to OpenRouter

Instead of logging in with Anthropic directly, connect Claude Code to OpenRouter.
This requires setting a few environment variables.

Requirements:

1. Use `https://openrouter.ai/api` for the base url
2. Provide your [OpenRouter API key](https://openrouter.ai/settings/keys) as the auth token
3. **Important:** Explicitly blank out the Anthropic API key to prevent conflicts

<Tabs>
  <Tab title="Shell Profile">
    Add these environment variables to your shell profile:

    ```bash
    # Open your shell profile in nano
    nano ~/.zshrc  # or ~/.bashrc for Bash users

    # Add these lines to the file:
    export OPENROUTER_API_KEY="<your-openrouter-api-key>"
    export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
    export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
    export ANTHROPIC_API_KEY="" # Important: Must be explicitly empty

    # After saving, restart your terminal for changes to take effect
    ```

    <Note>
      **Persistence:** We recommend adding these lines to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.config/fish/config.fish`).
    </Note>
  </Tab>

  <Tab title="Project Settings File">
    Alternatively, you can configure Claude Code using a project-level settings file at `.claude/settings.local.json` in your project root:

    ```json
    {
      "env": {
        "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
        "ANTHROPIC_AUTH_TOKEN": "<your-openrouter-api-key>",
        "ANTHROPIC_API_KEY": ""
      }
    }
    ```

    Replace `<your-openrouter-api-key>` with your actual OpenRouter API key.

    <Note>
      **Note:** This method keeps your configuration scoped to the project, making it easy to share OpenRouter settings with your team via version control (just be careful not to commit your API key).
    </Note>
  </Tab>
</Tabs>

<Warning>
  **Variable Location:** Do not put these in a project-level `.env` file. The native Claude Code installer does not read standard `.env` files.

  **Previous Login:** If you were previously logged in to Claude Code with Anthropic, run `/logout` in a Claude Code session to clear cached credentials before the OpenRouter configuration takes effect.
</Warning>

### Step 3: Start your session

Navigate to your project directory and start Claude Code:

```bash
cd /path/to/your/project
claude
```

You are now connected! Any prompt you send will be routed through OpenRouter.

### Step 4: Verify

You can confirm your connection by running the `/status` command inside Claude Code.

```text
> /status
Auth token: ANTHROPIC_AUTH_TOKEN
Anthropic base URL: https://openrouter.ai/api
```

You can also check the [OpenRouter Activity Dashboard](https://openrouter.ai/activity) to see your requests appearing in real-time.

## How It Works

OpenRouter exposes an input that is compatible with the Anthropic Messages API.

1. **Direct Connection:** When you set `ANTHROPIC_BASE_URL` to `https://openrouter.ai/api`, Claude Code speaks its native protocol directly to OpenRouter. No local proxy server is required.
2. **Anthropic Skin:** OpenRouter's "Anthropic Skin" behaves exactly like the Anthropic API. It handles model mapping and passes through advanced features like "Thinking" blocks and native tool use.
3. **Billing:** You are billed using your OpenRouter credits. Usage (including reasoning tokens) appears in your OpenRouter dashboard.

## Configuring Models

Claude Code uses several environment variables to determine which models to use for different tasks. You can override these to route each role through a specific model:

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="anthropic/claude-opus-4.7"
export ANTHROPIC_DEFAULT_SONNET_MODEL="anthropic/claude-sonnet-4.6"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="anthropic/claude-haiku-4.5"
export CLAUDE_CODE_SUBAGENT_MODEL="anthropic/claude-opus-4.7"
```

| Variable                         | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ANTHROPIC_DEFAULT_OPUS_MODEL`   | The model used for Opus-class tasks (e.g. complex reasoning)  |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | The model used for Sonnet-class tasks (e.g. general coding)   |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL`  | The model used for Haiku-class tasks (e.g. quick completions) |
| `CLAUDE_CODE_SUBAGENT_MODEL`     | The model used for sub-agent tasks spawned by Claude Code     |

Add these to the same shell profile or project settings file where you set `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN`.

Claude Code is optimized for Anthropic models and may not work correctly with other providers.

## Fast Mode

Anthropic's fast mode provides up to 2.5x faster output at premium pricing. **Fast mode is only available on Claude Opus 4.6 and Claude Opus 4.7** — no other Anthropic model supports it.

For each supported Opus version, there are two equivalent ways to request fast mode on OpenRouter:

1. Send `speed: "fast"` with [`anthropic/claude-opus-4.7`](https://openrouter.ai/anthropic/claude-opus-4.7) or [`anthropic/claude-opus-4.6`](https://openrouter.ai/anthropic/claude-opus-4.6) — OpenRouter reroutes the request to the matching `*-fast` model (for example, `anthropic/claude-opus-4.6` → [`anthropic/claude-opus-4.6-fast`](https://openrouter.ai/anthropic/claude-opus-4.6-fast)).
2. Call the `*-fast` model directly — [`anthropic/claude-opus-4.7-fast`](https://openrouter.ai/anthropic/claude-opus-4.7-fast) or [`anthropic/claude-opus-4.6-fast`](https://openrouter.ai/anthropic/claude-opus-4.6-fast).

Both options route through the Anthropic first-party provider, and the required beta header is injected automatically.

### Using `/fast` in Claude Code

Claude Code has a built-in `/fast` command that toggles fast mode. When enabled, Claude Code sends `speed: "fast"` in its requests alongside the configured Opus model. OpenRouter fully supports this parameter — you just need to set the following environment variable:

```bash
export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1
```

<Note>
  Requires Claude Code v2.1.96 or newer.
</Note>

### Pricing

Fast mode is priced at 6x the standard token rates for the underlying Claude Opus model (4.6 or 4.7). See [Anthropic's fast mode pricing](https://platform.claude.com/docs/en/build-with-claude/fast-mode#pricing) for current rates. When fast mode is active, the response's `usage` object includes `"speed": "fast"` to confirm the request was processed at the higher speed tier.

<Note>
  If `speed: "fast"` is sent for a model that does not support fast mode, OpenRouter silently drops the parameter and the request proceeds at standard speed with standard pricing.
</Note>

### Routing behavior

Fast mode is only served by the Anthropic first-party provider, since other providers (e.g. Amazon Bedrock, Google Vertex) do not support it.

## Agent SDK

The [Anthropic Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) lets you build AI agents programmatically using Python or TypeScript. Since the Agent SDK uses Claude Code as its runtime, you can connect it to OpenRouter using the same environment variables described above.

For complete setup instructions and code examples, see our [Anthropic Agent SDK integration guide](/docs/guides/community/anthropic-agent-sdk).

## GitHub Action

You can use OpenRouter with the official [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action).To adapt the [example workflow](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml) for OpenRouter, make two changes to the action step:

1. Pass your OpenRouter API key via `anthropic_api_key` (store it as a GitHub secret named `OPENROUTER_API_KEY`)
2. Set the `ANTHROPIC_BASE_URL` environment variable to `https://openrouter.ai/api`

```yaml
- name: Run Claude Code
  uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.OPENROUTER_API_KEY }}
  env:
    ANTHROPIC_BASE_URL: https://openrouter.ai/api
```

## Cost Tracking Statusline

You can add a custom statusline to Claude Code that tracks your OpenRouter API costs in real-time. The statusline displays the provider, model, cumulative cost, and cache discounts for your session.

![Claude Code statusline showing OpenRouter cost tracking](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/5bc3af530c4a0111317cbdcee893be444718c676f3f80bf0860141cffcb5ee1b/content/pages/guides/claude-code-statusline.png)

Download the statusline scripts from the [openrouter-examples repository](https://github.com/OpenRouterTeam/openrouter-examples/tree/main/claude-code), make them executable, and add the following to your `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "/path/to/statusline.sh"
  }
}
```

The script uses your `ANTHROPIC_AUTH_TOKEN` environment variable, which should already be set to your OpenRouter API key if you followed the setup above.

## Troubleshooting

* **Auth Errors:** Ensure `ANTHROPIC_API_KEY` is set to an empty string (`""`). If it is unset (null), Claude Code might fall back to its default behavior and try to authenticate with Anthropic servers.
* **Context Length Errors:** If you hit context limits, consider breaking your task into smaller chunks or starting a new session.
* **Privacy:** OpenRouter does not log your source code prompts unless you explicitly opt-in to prompt logging in your account settings. See our [Privacy Policy](/privacy) for details.