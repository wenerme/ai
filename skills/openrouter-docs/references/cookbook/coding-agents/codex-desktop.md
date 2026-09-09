> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Codex Desktop App

> Use the Codex desktop app (ChatGPT for macOS and Windows) with OpenRouter

## What is the Codex Desktop App?

Codex ships inside the [ChatGPT desktop app](https://developers.openai.com/codex/app) for macOS and Windows. The app, the [Codex CLI](/docs/cookbook/coding-agents/codex-cli), and the IDE extension all read the same local configuration in `~/.codex/config.toml`, so pointing the desktop app at OpenRouter is a matter of adding an OpenRouter model provider and making your API key visible to the app.

The one difference from the CLI is how the key reaches the process. A terminal inherits your shell profile, but a desktop app launched from the Dock or Start menu does not, so an `export` in `~/.zshrc` is not enough on its own.

## Quick Start

### Step 1: Install the Desktop App

Download the ChatGPT desktop app for [macOS or Windows](https://chatgpt.com/download/) and sign in.

### Step 2: Get Your OpenRouter API Key

1. Sign up or log in at [OpenRouter](https://openrouter.ai)
2. Navigate to your [API Keys page](https://openrouter.ai/keys)
3. Create a new API key
4. Copy your key (starts with `sk-or-...`)

### Step 3: Configure Codex for OpenRouter

Create or edit `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` on Windows):

```toml lines theme={null}
model_provider = "openrouter"
model_reasoning_effort = "medium"
model = "openai/gpt-6-astra"

[model_providers.openrouter]
name = "openrouter"
base_url = "https://openrouter.ai/api/v1"
env_key = "OPENROUTER_API_KEY"
wire_api = "responses"
supports_websockets = false
```

`model` accepts any OpenRouter model ID, including tilde aliases such as `~openai/gpt-latest`. Browse the catalog at [openrouter.ai/models](https://openrouter.ai/models).

<Note>
  `model_provider` and `model_providers` are only honored in the user-level `~/.codex/config.toml`. Codex ignores them in a project-scoped `.codex/config.toml`.
</Note>

### Step 4: Make Your API Key Visible to the App

Codex reads the key from the `OPENROUTER_API_KEY` environment variable named by `env_key`. An `export` in `~/.zshrc` or `~/.bashrc` only reaches terminal processes, so set the variable at the session level instead, then fully quit and reopen the app.

<Tabs>
  <Tab title="macOS">
    Set the variable in the user launchd session so GUI apps inherit it:

    ```bash lines theme={null}
    launchctl setenv OPENROUTER_API_KEY "sk-or-..."
    ```

    This does not survive a reboot or logout. To make it permanent, add the same command to a login item or a launchd agent that runs at login.
  </Tab>

  <Tab title="Windows">
    Set a user-level environment variable. Processes started after this inherit it, so restart the app afterwards:

    ```powershell lines theme={null}
    setx OPENROUTER_API_KEY "sk-or-..."
    ```
  </Tab>
</Tabs>

### Step 5: Restart and Start a Task

Quit the app completely (not just the window), reopen it, choose **Codex**, and start a new chat. Requests now go through OpenRouter and appear in your [Activity Dashboard](https://openrouter.ai/activity).

## Configuration Reference

| Setting                                          | Description                                                                                       | Example                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `model_provider`                                 | Provider to use for model requests                                                                | `"openrouter"`                                        |
| `model`                                          | OpenRouter model ID                                                                               | `"openai/gpt-6-astra"`                                |
| `model_reasoning_effort`                         | Reasoning effort level                                                                            | `"minimal"`, `"low"`, `"medium"`, `"high"`, `"xhigh"` |
| `model_providers.openrouter.base_url`            | OpenRouter API endpoint                                                                           | `"https://openrouter.ai/api/v1"`                      |
| `model_providers.openrouter.env_key`             | Environment variable holding your API key                                                         | `"OPENROUTER_API_KEY"`                                |
| `model_providers.openrouter.wire_api`            | Protocol Codex speaks to the provider. `responses` is the only supported value                    | `"responses"`                                         |
| `model_providers.openrouter.supports_websockets` | Whether the provider supports the Responses API WebSocket transport. Leave `false` for OpenRouter | `false`                                               |

<Note>
  With `env_key` authentication Codex does not fetch the OpenRouter model catalog, so non-OpenAI models may show an "Unknown model" fallback-metadata warning. The command-based `auth` block on the [Codex CLI page](/docs/cookbook/coding-agents/codex-cli#step-3-configure-codex-for-openrouter) triggers the catalog refresh and works in the desktop app as long as `OPENROUTER_API_KEY` is visible to it as described above.
</Note>

## Why Use OpenRouter with the Codex Desktop App?

* **Provider failover:** If one provider is unavailable or rate-limited, OpenRouter fails over to another, keeping long-running desktop tasks moving.
* **Organizational controls:** Set spending limits and allocate credits across a team of desktop users from one place.
* **Usage visibility:** Track cost, tokens, and request patterns in the [OpenRouter Activity Dashboard](https://openrouter.ai/activity).
* **Model flexibility:** Switch models by editing `model` in `config.toml`, including non-OpenAI models such as `~anthropic/claude-sonnet-latest`.

## Troubleshooting

* **Auth errors or "Missing Authentication header":** The app could not read `OPENROUTER_API_KEY`. Set it with `launchctl setenv` on macOS or `setx` on Windows, then quit and reopen the app. An `export` in your shell profile alone is not visible to the desktop app.
* **Changes to `config.toml` not taking effect:** Make sure you edited the user-level `~/.codex/config.toml`, not a project-scoped `.codex/config.toml`, and restart the app.
* **Model not found:** Verify the model ID on [openrouter.ai/models](https://openrouter.ai/models) and use the exact slug.
* **Privacy:** OpenRouter does not log your source code prompts unless you opt in to prompt logging. See our [Privacy Policy](https://openrouter.ai/privacy) for details.

## Resources

* [ChatGPT desktop app](https://developers.openai.com/codex/app)
* [Codex configuration reference](https://developers.openai.com/codex/config-reference)
* [Codex custom model providers](https://developers.openai.com/codex/config-advanced#custom-model-providers)
* [Codex CLI with OpenRouter](/docs/cookbook/coding-agents/codex-cli)
* [OpenRouter Activity Dashboard](https://openrouter.ai/activity)
