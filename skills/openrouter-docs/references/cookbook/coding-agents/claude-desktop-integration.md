> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Claude Desktop

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

![Claude Desktop Help menu showing Troubleshooting submenu with Enable Developer Mode highlighted](file:dd8fbdcb-3d4e-4417-ae40-f5d6c96d64e7)

### Step 2: Open the Third-Party Inference Panel

Click **Developer > Configure Third-Party Inference…** in the menu bar.

![Claude Desktop Developer menu with Configure Third-Party Inference highlighted](file:bdecd356-4b4f-4e8e-be2a-cbedd1e6f770)

### Step 3: Enter Gateway Credentials

Set the backend to **Gateway (Anthropic-compatible)** and enter your OpenRouter credentials:

| Field                   | Value                                         |
| ----------------------- | --------------------------------------------- |
| **Gateway base URL**    | `https://openrouter.ai/api`                   |
| **Gateway API key**     | Your OpenRouter API key (e.g. `sk-or-v1-...`) |
| **Gateway auth scheme** | `bearer`                                      |

![Claude Desktop third-party inference configuration panel showing Gateway selected with OpenRouter credentials](file:543a2af5-cffa-40f5-8632-7a44fa21881c)

Click **Apply locally** to save your settings.

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
* **"Access to this website is blocked by your network egress settings" using WebFetch:** Cowork sandboxes tool traffic by default, which can block the WebFetch tool from reaching sites you haven't allowlisted. This restriction is specific to Cowork — the rest of Claude Desktop is unaffected. Open **Developer > Configure Third-Party Inference…**, switch to the **Sandbox & workspace** tab, and add the required hosts to **Allowed egress hosts**.
* **Privacy:** OpenRouter does not log your prompts unless you explicitly opt-in to prompt logging in your account settings. See our [Privacy Policy](/privacy) for details.