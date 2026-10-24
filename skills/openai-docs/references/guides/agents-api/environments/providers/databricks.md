# Databricks Sandbox

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use [Databricks Sandbox](https://docs.databricks.com/aws/en/compute/serverless/sandbox) to run an agent's shell commands and work with files in your Databricks workspace. Your application manages the sandbox. Its executor, `codex exec-server`, opens an outbound connection to OpenAI using the session's `environment.id` and `environment.remote_url`.

Databricks Sandbox is in beta. Check that your workspace is in a [supported region](https://docs.databricks.com/aws/en/resources/feature-region-support), then enable Databricks Sandbox on the workspace's Previews page.

## Before you begin

- Authenticate a Databricks profile for your workspace. Use its name in place of `my-workspace` below.
- Set `OPENAI_API_KEY` to your application key and `OPENAI_EXECUTOR_API_KEY` to a separate [environment key](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted#authentication) from the same organization, project, and user or service account. Only the environment key enters the sandbox as `CODEX_API_KEY`.
- If your OpenAI organization enforces an IP allowlist, keep it up to date as sandbox outbound IPs change. For workspaces in the serverless compute firewall preview, follow the [Databricks guidance for regional IP ranges](https://docs.databricks.com/aws/en/resources/ip-domain-region#outbound-ips-for-serverless-compute-firewall-preview).

## Run the example

From the root of the [OpenAI Cookbook repository](https://github.com/openai/openai-cookbook/tree/main/examples/agents_api/sandboxes/databricks), run the example with `uv` and Python 3.11 or later. Choose an unused sandbox ID because the example deletes the sandbox during cleanup.

```bash
uv run examples/agents_api/sandboxes/databricks/application_managed/main.py \
  --profile my-workspace --sandbox-id "openai-agent-$(date +%s)"
```

The example creates a self-hosted session, starts the executor in the sandbox, and asks the agent to write a greeting to a file. It reads the file back and prints `Verified the agent's file write.` on success. It then stops the executor and deletes the session and sandbox.