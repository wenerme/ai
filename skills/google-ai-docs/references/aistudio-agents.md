# Agents in AI Studio Playground

Google AI Studio Playground provides a visual interface to prototype and learn
how to build managed agents without having to create and write API calls.

To get started, navigate to the **Playground** tab in the navigation panel of
Google AI Studio, and switch the toggle to **Agents**.

## Pre-built templates

The **Agents** tab has a series of templates that
pre-configure the base Antigravity Agent by setting tool and environment
configurations. All the templates are open-source and published under
the [google-gemini/gemini-managed-agents-templates](https://github.com/google-gemini/gemini-managed-agents-templates/) repository. Exploring these templates is a great way to learn how to build and structure your own managed agent.

For example, when you pick the AI Radio template, it enables all the allowed
tools, and links a specialized `AGENTS.md` file and skills for radio show
production. You can view these settings on the Playground UI under the
**Environment** section, by clicking on the **Sources** button.

> [!IMPORTANT]
> **Important:** When you run these templates, the agent inside the sandbox has access to the Gemini API. It will execute calls using your configured API key, which can incur additional token charges on your account. See [safety and cost
> management](https://ai.google.dev/gemini-api/docs/aistudio-agents#safety-and-cost-management) section for more details.

## Tool configuration

Under the Agent settings in the Playground, you can toggle access to the
following built-in tools:

- **Google Search:** Access the open web for real-time information grounding.
- **URL Context:** Fetch and parse the text content of specific web page URLs.
- **Code Execution:** Run Bash and Python commands directly within the isolated sandbox environment.
- **Filesystem Tools:** Read, write, list, and delete files inside the workspace.

## Environment Configuration

Managed agents run within a secure, ephemeral Linux sandbox (the environment) that provides the workspace and tools they need to operate. To learn more, see the [managed agent environment](https://ai.google.dev/gemini-api/docs/agent-environment) guide.

### Controlling agent behavior

The agent's behavior, persona, and capabilities are predominantly determined by the files present in its environment. The agent automatically detects and loads configurations from a special `.agents` folder:

- **`AGENTS.md`**: Pre-loaded into the agent's context to define system instructions and persona.
- **`SKILL.md`** : Located under respective skill folders (e.g., `.agents/skills/my-skill/SKILL.md`) to define specific capabilities and workflows.

### Provisioning the Environment

You can configure the environment to be used by the agent by mounting files to the environment before you start a session. You can either build a new environment by mounting sources, or restore a previous one:

- **To create a new environment** , click **Add Sources** in the Environment settings panel and choose from the following source types:

| Source type | Description | Mounting path |
|---|---|---|
| **Inline Files** | Write or paste configuration files, mock datasets, or utility scripts (up to 100KB) directly into the Playground UI. | User-defined destination path (e.g., `/workspace/scripts/parser.py`). |
| **Google Cloud Storage** | Mount a public or private Cloud Storage bucket. Private buckets require a standard OAuth 2.0 Bearer token. For more information, see [Private sources](https://ai.google.dev/gemini-api/docs/agent-environment#private-sources). | Maps a GCS bucket path (e.g., `gs://your-bucket-name/data/`) to a workspace directory (e.g., `/workspace/data/`). |
| **GitHub Repositories** | Clone public or private codebases. Private repositories require Basic authentication with your GitHub Personal Access Token (PAT). For more information, see [Private sources](https://ai.google.dev/gemini-api/docs/agent-environment#private-sources). | Cloned directly into `/workspace/` (typically under `/workspace/<repo-name>`). |

- **To restore a previous environment** , you can [reuse an existing environment ID](https://ai.google.dev/gemini-api/docs/aistudio-agents#reusing-an-existing-environment-id) to clone and fork its exact state.

### Reusing an existing environment ID

If you have already spent time setting up a sandbox environment, you don't have to start from scratch. To use an existing environment:

1. Go to the Environments panel in AI Studio and toggle **Type** to **Existing**
2. Enter the **Environment ID** (e.g., `env_abc123`)

For more information, see [Configure an environment](https://ai.google.dev/gemini-api/docs/agent-environment#configure-an-environment). You can also retrieve the current session's Environment ID from the Environment tab in the UI.

Once you send your first message to the agent, the environment configuration
becomes fixed for that session. You cannot mount new sources or modify the
network allowlist while the interaction is actively running.

## Download the environment

Once an environment is created, you can download the environment snapshot at any time using the **Download**
button in the Environment settings of the AI Studio Playground to retrieve
environment files as a tarball.

## Safety and Cost Management

### Managing Token Consumption

Unlike a standard chat request that produces a single output, the Antigravity
Agent executes an autonomous workflow. It plans, runs code, observes results,
and iterates. This means a single prompt can result in unbounded token
consumption.

To manage costs, **provide clear termination criteria in your prompts and scope
the tasks narrowly for the agent** . A good example could be a prompt like
*Review the pull request and stop once you have generated the markdown summary.
Do not attempt to write the fix yourself*.

> [!IMPORTANT]
> **Important:** If you see the agent running for a long time or not going in the right direction (by observing its thoughts and tool calls), you can use the **Stop** button to stop the agent at any time to avoid unnecessary token consumption.

### Additional Costs

By default, all agent templates on the Playground have access to the Gemini API
service and can make API calls from the environment in order to fulfill
requests. These may incur additional costs which will not be reflected in token
consumption.

Similarly, if you add other external services, the agent may incur additional
costs by calling these services on your behalf.

### Network Allow List

By default, on AI Studio all outbound network requests from within
your agent's sandbox environment are tightly controlled and restricted to ensure
security. To grant your agent the ability to reach external APIs, web services,
or package managers, you must explicitly declare them:

1. Go to the Environments panel in AI Studio.
2. Select the **rules** button next to **Network**.
3. In the **Network configuration** panel, click **Add to allowlist** and fill in the relevant details:
   - **Domain Restriction:** Only the specific domains or wildcard patterns added to the list can be accessed by the agent's virtual machine. For example, you can input exact domains like `api.github.com` or broad patterns like `*.googleapis.com`.
   - **Add HTTP Header and Token Injection:** Use the **Add HTTP header** option to securely inject required credentials (such as an API token) for a specific domain. These credentials pass safely through an egress proxy and are never exposed directly as raw text inside the agent sandbox.

Always exercise caution when adding domains to your allowlist. Granting the
agent access to authenticated services means it can act on your behalf, which
could lead to unintended actions if not carefully monitored.

> [!NOTE]
> **Important:**
>
> - Authenticated Gemini API (using your linked API key) is enabled by default for all agent calls through AI Studio Playground.
> - When you use the API, the network is open by default. See [API documentation](https://ai.google.dev/gemini-api/docs/agent-environment#network-configuration) for details.

### Credentials best practices

If your workflow requires the agent to authenticate with external services, you
are responsible for provisioning and scoping those credentials. Follow these
guidelines to reduce risk:

- **Use least-privilege credentials:** Create service accounts or API keys with only the permissions your agent needs. Avoid passing credentials with broad or administrative access.
- **Prefer short-lived tokens:** Where possible, use time-limited credentials or tokens that expire rather than long-lived API keys.
- **Assume full access:** The agent may use any credential it has access to in order to complete the task you have given it. Only provide credentials whose full scope of access you are willing to grant.
- **Rotate credentials regularly:** Treat credentials shared with the agent the same way you would treat any programmatic credential; rotate them on a regular schedule.

### Connecting external tools and APIs

You can connect external tools and APIs (such as Model Context Protocol / MCP
servers) to extend the agent's capabilities. When doing so:

- Only connect tools from sources you trust. A malicious or poorly written tool could expose data or perform unintended actions.
- Configure tools with the minimum permissions required for your use case. If a tool supports read-only mode, prefer that unless writes are strictly necessary.
- Before connecting a tool to a production data source, test it against sample or synthetic data to verify the agent uses it as expected.

### Human oversight

Agents can reason, plan, and execute multi-step workflows with a high degree of
autonomy. While this is powerful, it also means you should apply appropriate
oversight; especially for tasks that modify data or interact with external
systems.

Always verify critical outputs such as generated code, data transformations, or
configuration changes before you deploy them.