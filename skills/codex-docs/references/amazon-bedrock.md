# Use Codex with Amazon Bedrock

Configure Codex to use OpenAI models available through Amazon Bedrock. In this
setup, Codex runs locally and sends model requests to Bedrock using
AWS-managed authentication and access controls.

## How it works

When you configure Codex with Amazon Bedrock as the model provider, the
OpenAI-hosted Responses API isn't in the request path. Codex sends model
requests to Amazon Bedrock, and Bedrock provides an OpenAI-compatible Responses
API implementation for supported OpenAI models.

Authentication is AWS-native. Users authenticate with a Bedrock API key or AWS
  IAM credentials. They do not use ChatGPT sign-in or `OPENAI_API_KEY` for this
  provider.

## Before you start

Make sure you have:

- Access to supported OpenAI models in Amazon Bedrock.
- An AWS Region where the selected model is available.
- Authentication for the Amazon Bedrock Mantle path configured for the AWS
  account.

## Configure Codex

Add the `amazon-bedrock` model provider for the Amazon Bedrock Mantle path to
`~/.codex/config.toml`. Supplying a model is optional. Select a supported model
explicitly when needed.

```toml
model_provider = "amazon-bedrock"
```

This guide covers the Amazon Bedrock Mantle path in supported commercial AWS
  Regions. Codex doesn't support Bedrock Mantle endpoints in AWS GovCloud
  Regions.

## Authentication options

Codex supports two Bedrock authentication paths. It checks them in this order:

1. Bedrock API key.
2. AWS SDK credential chain.

### Option 1: Bedrock API key

Set the Bedrock API key in the environment Codex reads. You must specify a
Region when using API-key authentication.

```shell
export AWS_BEARER_TOKEN_BEDROCK=<your-bedrock-api-key>
export AWS_REGION=us-east-2
```

### Option 2: AWS SDK credentials

Use this path when your organization manages Bedrock access through the AWS SDK
credential chain. Codex can use these standard AWS SDK credential sources:

1. Shared AWS `config` and `credentials` files.

   ```shell
   aws configure
   ```

2. Environment variables.

   ```shell
   export AWS_ACCESS_KEY_ID=<your-access-key-id>
   export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   export AWS_SESSION_TOKEN=<your-session-token>
   ```

3. AWS Management Console credentials.

   ```shell
   aws login
   ```

4. AWS SSO or a named profile.

   ```shell
   aws sso login --profile codex-bedrock
   export AWS_PROFILE=codex-bedrock
   ```

5. Federated identity configured with `credential_process`. For corporate SSO or
   OIDC federation, configure the AWS profile outside Codex and let the AWS SDK
   resolve credentials. Put browser login, token exchange, caching, and refresh
   in your AWS profile's `credential_process` helper.

## Desktop app and VS Code extension

Desktop apps and IDE extensions may not inherit environment variables from the
shell. Put required values in `~/.codex/.env`, then restart the app or
extension.

```shell
export AWS_BEARER_TOKEN_BEDROCK=<your-bedrock-api-key>
export AWS_REGION=us-east-2
```

## Verify setup

- In Codex CLI, open `/status` and confirm Codex is using the
  `amazon-bedrock` model provider.
- In the desktop app or VS Code extension, start a new session after restarting
  the app.
- Confirm the selected model is available in the configured AWS Region and that
  the AWS identity has permission to access it.

## Supported models

Use exact model IDs:

```text
openai.gpt-5.5
openai.gpt-5.4
```

Model availability varies by AWS Region. Before selecting a model, see [model
support by AWS
Region](https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html).

## Feature availability

This configuration supports local Codex workflows. Some features that depend on
OpenAI-hosted cloud services, hosted tools, or cloud-managed discovery aren't
currently available.

Fast Mode isn't available with Amazon Bedrock. Fast Mode uses priority
  processing, and the initial Amazon Bedrock offering supports on-demand
  inference only.

<ToggleSection title="Detailed feature availability">
  <CodexPlanFeatureMatrix
    client:load
    data={{
      plans: [
        {
          id: "bedrock",
          shortLabel: "Amazon Bedrock",
          label: "Amazon Bedrock",
        },
      ],
      sections: [
        {
          title: "Access and surfaces",
          features: [
            {
              name: "Codex web",
              href: "/codex/cloud",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Codex app for local tasks",
              href: "/codex/app",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Codex CLI",
              href: "/codex/cli",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "IDE extension",
              href: "/codex/ide",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Codex SDK, `codex exec`, and scriptable workflows",
              shortName: "Codex SDK and scripting",
              href: "/codex/sdk",
              availability: {
                bedrock: "available",
              },
            },
          ],
        },
        {
          title: "Models and multimodal",
          features: [
            {
              name: "Bedrock-backed inference with supported OpenAI models",
              shortName: "Bedrock-backed inference",
              href: "/codex/amazon-bedrock",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Fast mode",
              href: "/codex/speed",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Image generation and editing",
              href: "/codex/app/features#image-generation",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Voice dictation",
              href: "/codex/app/features#voice-dictation",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Web search",
              href: "/codex/app/features#web-search",
              availability: {
                bedrock: "unavailable",
              },
            },
          ],
        },
        {
          title: "Local features",
          features: [
            {
              name: "Local code review with `/review`",
              shortName: "Local code review",
              href: "/codex/workflows#do-a-local-code-review",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Auto-review for approval requests",
              href: "/codex/concepts/sandboxing/auto-review",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Sandboxing and permission controls",
              href: "/codex/permissions",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Project and standalone app automations",
              shortName: "App automations",
              href: "/codex/app/automations",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Automations",
              href: "/codex/app/automations",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Worktrees and built-in Git tools",
              shortName: "Built-in Git tools",
              href: "/codex/app/worktrees",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Local environments and repeatable actions",
              shortName: "Repeatable actions",
              href: "/codex/app/local-environments",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Appshots",
              href: "/codex/appshots",
              availability: {
                bedrock: "available",
              },
            },
          ],
        },
        {
          title: "Browser and remote control",
          features: [
            {
              name: "In-app browser previews and comments",
              shortName: "In-app browser",
              href: "/codex/app/browser",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Browser Use automation",
              href: "/codex/app/browser#browser-use",
              availability: {
                bedrock: "limited",
              },
            },
            {
              name: "Chrome extension browser control",
              shortName: "Chrome browser control",
              href: "/codex/app/chrome-extension",
              availability: {
                bedrock: "limited",
              },
            },
            {
              name: "Computer Use",
              href: "/codex/app/computer-use",
              availability: {
                bedrock: "limited",
              },
            },
            {
              name: "SSH remote connections",
              shortName: "SSH remote",
              href: "/codex/remote-connections#connect-to-an-ssh-host",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Mobile remote control",
              href: "/codex/remote-connections",
              availability: {
                bedrock: "unavailable",
              },
            },
          ],
        },
        {
          title: "Customization and extensions",
          features: [
            {
              name: "Custom instructions with `AGENTS.md`",
              shortName: "Custom instructions",
              href: "/codex/guides/agents-md",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Skills",
              href: "/codex/skills",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Plugins",
              href: "/codex/plugins",
              availability: {
                bedrock: "limited",
              },
              limitedFootnote: "plugins",
            },
            {
              name: "Plugin sharing",
              href: "/codex/plugins/build#share-a-local-plugin-with-your-workspace",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "App connectors",
              href: "/codex/plugins",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "MCP",
              href: "/codex/mcp",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Subagents and custom agents",
              shortName: "Subagents",
              href: "/codex/subagents",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Memories",
              href: "/codex/memories",
              availability: {
                bedrock: "limited",
              },
            },
            {
              name: "Chronicle",
              href: "/codex/memories/chronicle",
              availability: {
                bedrock: "unavailable",
              },
            },
          ],
        },
        {
          title: "Cloud and integrations",
          features: [
            {
              name: "Codex cloud tasks",
              shortName: "Cloud tasks",
              href: "/codex/cloud",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Sites",
              href: "/codex/sites",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "GitHub issue and PR delegation with `@codex`",
              shortName: "GitHub delegation",
              href: "/codex/integrations/github#give-codex-other-tasks",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "GitHub code review and automatic PR reviews",
              shortName: "GitHub PR reviews",
              href: "/codex/integrations/github",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Slack cloud integration",
              shortName: "Slack integration",
              href: "/codex/integrations/slack",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Linear cloud integration",
              shortName: "Linear integration",
              href: "/codex/integrations/linear",
              availability: {
                bedrock: "unavailable",
              },
            },
          ],
        },
        {
          title: "Admin, security, and analytics",
          features: [
            {
              name: "SAML SSO, MFA, and workspace user management",
              shortName: "Workspace management",
              href: "/codex/enterprise/admin-setup",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "`requirements.toml` managed config",
              shortName: "`requirements.toml` config",
              href: "/codex/enterprise/managed-configuration",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Cloud-managed config policies",
              shortName: "Cloud-managed policies",
              href: "/codex/enterprise/managed-configuration#cloud-managed-requirements",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Codex RBAC and custom roles",
              shortName: "RBAC and roles",
              href: "/codex/enterprise/admin-setup#step-2-set-up-custom-roles-rbac",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "SCIM, EKM, and domain verification",
              shortName: "SCIM, EKM, and domains",
              href: "/codex/enterprise/admin-setup#enterprise-grade-security-and-privacy",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Enterprise retention and residency controls",
              shortName: "Retention and residency",
              href: "/codex/enterprise/admin-setup#enterprise-grade-security-and-privacy",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "No training on API or business data by default",
              shortName: "No default training",
              href: "https://openai.com/business-data/",
              availability: {
                bedrock: "available",
              },
            },
            {
              name: "Analytics dashboard",
              href: "/codex/enterprise/governance#analytics-dashboard",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Analytics API",
              href: "/codex/enterprise/governance#analytics-api",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Compliance API and audit logs",
              shortName: "Compliance and audit logs",
              href: "/codex/enterprise/governance#compliance-api",
              availability: {
                bedrock: "unavailable",
              },
            },
            {
              name: "Codex Security for connected GitHub repositories",
              shortName: "Codex Security",
              href: "/codex/security",
              availability: {
                bedrock: "unavailable",
              },
            },
          ],
        },
      ],
    }}
  />

  <div
    id="codex-plan-region-limits"
    className="not-prose mt-3 text-sm text-secondary"
  >
    <sup>*</sup> Feature is currently limited to only specific regions. Check
    the individual feature documentation to learn more about geo restrictions.
  </div>
  <div
    id="codex-plan-plugin-limits"
    className="not-prose mt-1 text-sm text-secondary"
  >
    <sup>†</sup> Local plugin bundles are supported when their capabilities do
    not require ChatGPT authentication. OpenAI-curated plugin discovery and
    features that depend on app connectors or cloud-hosted sharing aren't
    available.
  </div>
</ToggleSection>

## Troubleshooting

If setup fails, check the following:

- The model ID exactly matches a supported model.
- You specify an AWS Region where the model is available.
- The Bedrock API key or AWS credentials are valid and not expired.
- The AWS identity has permission to access the selected Bedrock model.
- `AWS_BEARER_TOKEN_BEDROCK` isn't set to an expired or unintended key.
- For desktop app or VS Code extension usage, required environment variables
  are present in `~/.codex/.env`.

## Support boundaries

OpenAI Support can help with Codex client setup, configuration, local CLI
behavior, desktop app behavior, IDE extension behavior, and the local Codex
product experience.

For AWS credentials, IAM permissions, Bedrock model access, quotas, billing,
regional availability, Bedrock request failures, AWS service logs, or Bedrock
service behavior, contact the customer's AWS administrator or AWS Support.