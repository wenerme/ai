> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Desktop

> Use Claude Desktop with OpenRouter

<Warning>
  Claude Desktop with OpenRouter is only guaranteed to work with the Anthropic first-party provider. For maximum compatibility, we recommend setting [Anthropic 1P as top priority provider](/docs/guides/routing/provider-selection) when using Claude Desktop.
</Warning>

## Why Use OpenRouter with Claude Desktop?

OpenRouter adds a reliability and management layer between Claude Desktop and Anthropic's API, giving you and your organization several key benefits.

### Provider Failover for High Availability

Anthropic's API occasionally experiences outages or rate limiting. When you route Claude Desktop through OpenRouter, your requests automatically fail over between multiple Anthropic providers. If one provider is unavailable or rate-limited, OpenRouter seamlessly routes to another, keeping your sessions uninterrupted.

### Organizational Budget Controls

For teams and organizations, OpenRouter provides centralized budget management. You can set spending limits, allocate credits across team members, and prevent unexpected cost overruns. This is especially valuable when multiple team members are using Claude Desktop across your organization.

### Usage Visibility and Analytics

OpenRouter gives you complete visibility into how Claude Desktop is being used across your team. Track usage patterns, monitor costs in real-time, and understand which projects or team members are consuming the most resources. All of this data is available in your [OpenRouter Activity Dashboard](https://openrouter.ai/activity).

## How It Works

OpenRouter exposes an API that is compatible with the Anthropic Messages API.

1. **Gateway Mode:** When you configure Claude Desktop to use the Gateway backend with `https://openrouter.ai/api`, the app speaks its native Anthropic protocol directly to OpenRouter. No local proxy server is required.
2. **Anthropic Skin:** OpenRouter's "Anthropic Skin" behaves exactly like the Anthropic API. It handles model mapping and passes through advanced features like "Thinking" blocks and native tool use.
3. **Billing:** You are billed using your OpenRouter credits. Usage (including reasoning tokens) appears in your OpenRouter dashboard.

## Prerequisites

* **Claude Desktop installed:** Download the latest version from [Anthropic](https://claude.ai/download).
* **OpenRouter API Key:** Generate a key at [openrouter.ai/keys](https://openrouter.ai/keys).

## Configuration Steps

### Step 1: Enable Developer Mode

Launch Claude Desktop — you do not need to sign in. Open **Help > Troubleshooting** and click **Enable Developer Mode**. This adds a **Developer** menu to your menu bar.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/coding-agents/claude-desktop-integration/claude-desktop-enable-developer-mode.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=b356225fcd78b146e03cac4816f2489c" alt="Claude Desktop Help menu showing Troubleshooting submenu with Enable Developer Mode highlighted" width="1969" height="1304" data-path="assets/cookbook/coding-agents/claude-desktop-integration/claude-desktop-enable-developer-mode.png" />
</Frame>

### Step 2: Open the Third-Party Inference Panel

Click **Developer > Configure Third-Party Inference…** in the menu bar.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/coding-agents/claude-desktop-integration/claude-desktop-configure-third-party.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=4feee5b27952c053aa04d5448c6adc48" alt="Claude Desktop Developer menu with Configure Third-Party Inference highlighted" width="1154" height="1274" data-path="assets/cookbook/coding-agents/claude-desktop-integration/claude-desktop-configure-third-party.png" />
</Frame>

### Step 3: Enter Gateway Credentials

Set the connection to **Gateway** and enter your OpenRouter credentials:

| Field                   | Value                                         |
| ----------------------- | --------------------------------------------- |
| **Gateway base URL**    | `https://openrouter.ai/api`                   |
| **Gateway API key**     | Your OpenRouter API key (e.g. `sk-or-v1-...`) |
| **Gateway auth scheme** | `bearer`                                      |
| **Credential kind**     | `Static API key`                              |

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/coding-agents/claude-desktop-integration/claude-desktop-gateway-credentials.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=cdec4906d217428012c38a98fee8f18a" alt="Claude Desktop third-party inference configuration panel showing Gateway selected with OpenRouter credentials" width="1897" height="1136" data-path="assets/cookbook/coding-agents/claude-desktop-integration/claude-desktop-gateway-credentials.png" />
</Frame>

**Credential kind** pins which credential source the gateway uses. Set it to **Static API key** so Claude Desktop always authenticates with the OpenRouter API key you entered above and does not fall back to another source.

<Warning>
  Newer builds of Claude Desktop add optional **Sign-in session lifetime** and **Gateway SSO IdP (OIDC)** fields (Client ID, Issuer URL, Authorization URL) to this panel. OpenRouter authenticates the gateway with a static API key, not an OIDC sign-in flow, so **leave the OIDC IdP fields blank** and authenticate with your OpenRouter API key as shown above. The OIDC option is only for gateways that act as (or sit behind) their own OAuth authorization server.
</Warning>

Click **Apply Changes** (labelled **Apply locally** in older builds) to save your settings.

### Step 4: Restart and Launch

Fully quit Claude Desktop and reopen it. On the start screen, choose **Continue with Gateway** (shown as "Local configuration"). No Anthropic account is needed.

### Step 5: Select Your Model

The model picker will now display the models available through your OpenRouter connection.

## Claude Code

Claude Code is Anthropic's separate CLI-based coding agent that also works with OpenRouter. If you prefer a terminal workflow, see our dedicated [Claude Code integration guide](/docs/cookbook/coding-agents/claude-code-integration) for environment variable setup, model configuration, fast mode, and GitHub Action integration.

## Troubleshooting

* **Connection Errors:** Double-check that your Gateway base URL is exactly `https://openrouter.ai/api` and your API key is valid. Make sure the auth scheme is set to `bearer`.

* **No Models Appearing:** Ensure you have credits in your OpenRouter account. Visit [openrouter.ai/credits](https://openrouter.ai/credits) to check your balance.

* **"Continue with Gateway" Not Showing:** Make sure you applied the settings locally and fully restarted Claude Desktop (quit and reopen, not just close the window).

* **"Access to this website is blocked by your network egress settings" using WebFetch:** Claude Desktop sandboxes tool traffic by default, which can block the WebFetch tool from reaching sites you haven't allowlisted. This applies to both Cowork and Claude Code. Open **Developer > Configure Third-Party Inference…**, switch to the **Workspace restrictions** tab, and add the required hosts to **Allowed egress hosts**.

* **TLS connection errors using Claude Code inside Claude Desktop:** Claude Code runs in a sandbox whose network isolation can break TLS connections to the gateway. Relax it by adding the following to a Claude settings file, then restart Claude Desktop:

  ```json theme={null}
  {
    "sandbox": {
      "enableWeakerNetworkIsolation": true
    }
  }
  ```

  Pick the settings file that matches how widely you want the change to apply — `~/.claude/settings.json` applies it to every project, while `.claude/settings.json` or `.claude/settings.local.json` inside a project scopes it to that project. In all cases it relaxes sandbox network isolation for all agent-initiated network traffic, not just gateway TLS connections, so prefer the narrowest scope that fixes your problem and remove it once you no longer need it.

* **Privacy:** OpenRouter does not log your prompts unless you explicitly opt-in to prompt logging in your account settings. See our [Privacy Policy](https://openrouter.ai/privacy) for details.
