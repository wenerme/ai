---
name: aliyun-cli-docs
description: "Use when working with Alibaba Cloud CLI (`aliyun`): installing/updating, plugin commands, `aliyun configure` credentials/profiles, environment variables, command structure, parameter formats, JMESPath `--cli-query`, table output, `--pager`, `--waiter`, `--cli-dry-run`, safety policy, AI mode, `aliyun mcp-proxy`, Docker usage, migration from pre-3.3.0 CLI, or aliyun CLI troubleshooting."
---

# Alibaba Cloud CLI Docs

Official Alibaba Cloud CLI documentation synced from [`help.aliyun.com/zh/cli`](https://help.aliyun.com/zh/cli/).

Use this skill for the `aliyun` command-line tool, Alibaba Cloud CLI plugins, local CLI credentials/profiles, CLI-wide parameters, output filtering/table formatting, safety policy, AI mode, and `aliyun mcp-proxy`. For service-specific API behavior, RAM/STT permission semantics, Terraform, SDKs, Cloud Shell, or OpenAPI product docs, use the corresponding product documentation instead.

## Content Scope

The source docs are Markdown pages from the Alibaba Cloud help center's `/zh/cli` namespace. This skill syncs only CLI pages and intentionally skips cross-product `document_detail` links unless they resolve back into `/zh/cli`:

- `references/index.md` — CLI docs index.
- `references/what-is-alibaba-cloud-cli.md` — CLI overview and common scenarios.
- `references/install-update-alibaba-cloud-cli.md` — Linux, macOS, Windows install/update/uninstall.
- `references/quickly-start-using-alibaba-cloud-cli.md` — first-run flow with credentials and plugins.
- `references/configure-credentials.md` — `aliyun configure`, profile get/list/switch/set/delete, credential modes.
- `references/environment-variables.md` — supported environment variables and precedence.
- `references/managing-and-using-cli-plugins.md` and `cloud-products-supporting-cli.md` — plugin install/update/remove/search/list and product plugin model.
- `references/understanding-command-structure.md` and `understanding-command-line-parameters.md` — plugin command structure, legacy OpenAPI command style, parameter types and quoting.
- `references/filter-results-and-tabulate-output.md` — `--cli-query`, JMESPath, and `--output` table formatting.
- `references/control-how-api-calls-are-executed.md` — `--pager`, `--waiter`, and `--cli-dry-run`.
- `references/safety-policy.md`, `ai-mode.md`, and `use-aliyun-mcp-proxy-agent-openapi-mcp-server.md` — advanced CLI features.
- `references/migrating-from-older-versions-to-plug-in-versions-of-cli.md`, Docker usage, sample commands, and ECS migration practice.

The sync script repairs Alibaba help center Markdown artifacts such as `HELPCODEESCAPE-*` fence markers and converts HTML tables to Markdown tables.

## Hard Rules

- MUST search `references/` before giving Alibaba Cloud CLI commands, global flags, profile/credential behavior, plugin commands, output formatting, safety policy, AI mode, or `mcp-proxy` guidance.
- MUST distinguish plugin-style CLI `>= 3.3.0` commands from legacy OpenAPI-style commands. Prefer plugin-style kebab-case commands when the docs make both available.
- MUST distinguish CLI credential/profile configuration from RAM policy design, STS/OIDC server-side semantics, and product-specific API permissions.
- MUST call out security risks for long-lived AccessKey usage, `--skip-secure-verify`, proxy settings, safety policy bypasses, and `aliyun mcp-proxy` exposure.
- NEVER invent `aliyun configure` modes, plugin subcommands, environment variables, `--output` fields, `--pager`/`--waiter` subparameters, or safety-policy actions without checking references.

## Fast Lookup

```bash
rg -n "configure|profile|OAuth|EcsRamRole|RamRoleArn|OIDC|AccessKey|CloudSSO|CredentialsURI" skills/aliyun-cli-docs/references
rg -n "plugin|auto.*install|kebab-case|legacy|OpenAPI|DescribeInstances|describe-instances" skills/aliyun-cli-docs/references
rg -n "--cli-query|JMESPath|--output|cols=|rows=|num=|table" skills/aliyun-cli-docs/references
rg -n "--pager|--all-pages|--waiter|--cli-dry-run|timeout|interval|NextToken" skills/aliyun-cli-docs/references
rg -n "ALIBABA_CLOUD_|http_proxy|HTTPS_PROXY|NO_PROXY|skip-secure-verify" skills/aliyun-cli-docs/references
rg -n "safety|policy|ai-mode|mcp-proxy|allowed-servers|blocked-servers" skills/aliyun-cli-docs/references
```

## Reference Map

- Installation and first use: `references/install-update-alibaba-cloud-cli.md`, `quickly-start-using-alibaba-cloud-cli.md`, `run-alibaba-cloud-cli-in-a-docker-container.md`.
- Credentials and runtime configuration: `references/configure-credentials.md`, `environment-variables.md`, `use-an-http-proxy-server.md`.
- Commands and parameters: `references/understanding-command-structure.md`, `understanding-command-line-parameters.md`, `sample-commands.md`.
- Plugins: `references/managing-and-using-cli-plugins.md`, `cloud-products-supporting-cli.md`.
- Output and execution control: `references/filter-results-and-tabulate-output.md`, `control-how-api-calls-are-executed.md`.
- Advanced features: `references/safety-policy.md`, `ai-mode.md`, `use-aliyun-mcp-proxy-agent-openapi-mcp-server.md`.
- Migration and practices: `references/migrating-from-older-versions-to-plug-in-versions-of-cli.md`, `use-alibaba-cloud-cli-to-migrate-ecs-instances-across-regions.md`.

## Workflow

1. Identify whether the question is install/update, credentials/profile, plugin management, command/parameter syntax, output filtering, execution control, safety, AI mode, `mcp-proxy`, migration, or troubleshooting.
2. Search the most specific reference page and quote exact command names, parameter names, environment variables, and examples.
3. Prefer safe credential modes and call out when a command writes local config under `~/.aliyun` or exposes a local proxy.
4. Redirect non-CLI behavior to the relevant Alibaba Cloud product docs when the answer depends on service APIs, permissions, billing, Terraform, SDKs, or Cloud Shell rather than the `aliyun` CLI itself.
