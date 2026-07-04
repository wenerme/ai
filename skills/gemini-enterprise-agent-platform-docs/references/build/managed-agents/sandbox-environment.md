> [!WARNING]
> This product is a Pre-GA offering, subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1), the "Agentic AI Services" terms in the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1), and the [Additional Terms for Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos). Pre-GA products and features may have limited support, and changes to pre-GA products and features may not be compatible with other pre-GA versions. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).
>
> These Pre-GA products are in various stages of internal testing and review. As such, **do not use proprietary, sensitive, or other confidential data with these products**. These products are available to Customers solely for limited testing and evaluation, and you may not use them for commercial or production purposes.

Managed Agents API on Agent Platform operates with standard, isolated Linux sandboxes. In
this secure, fully managed execution container, custom agents can reason, plan
workflows, execute bash commands, and read or write files out-of-the-box.

Every sandbox environment provides the following core systems and controls:

- **Persistent file system:** Securely persists files, agent logic, and
  execution state across multi-turn interactions.

- **Bash terminal:** Provides a secure environment for executing terminal
  commands, running custom scripts, and processing local files.

- **Network isolation:** Disabled by default. You can explicitly declare a
  network `allowlist` to let the agent access public internet resources or
  download external libraries.

- **Extensible integrations:** Supports importing custom capabilities
  dynamically, including standard web APIs, Model Context Protocol (MCP)
  servers, or skills from Skill Registry.

## Sandbox permissions and security

To maintain standard enterprise security boundaries, the remote sandbox operates
under the following permission models:

- **Network isolation:** By default, the sandbox operates without external
  network access. Explicitly enable connectivity by setting a domain allowlist
  in your environment configuration. See [Configure network
  access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#configure-network-access) for allowlist examples.

- **Least privilege execution:** Once network access is enabled, the container
  lacks privileged administrative credentials or permissions. It can only
  query publicly accessible internet locations by default.

- **Data scoping for Cloud Storage and Skill Registry mounts:** When you
  attach external data sources from [Google
  Cloud Storage](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#create-basic-agent) or [Skill
  Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry), the
  environment is provided with downscoped authorization tokens designed to
  access only the specific directories or skills specified in the agent
  configurations. The sandbox contains no ambient credentials and cannot
  access other repositories or files in your project.

- **MCP credentials scoping:** Header configurations for [Model Context
  Protocol (MCP) servers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#create-agent-mcp), which contain
  backend authentication tokens, are transmitted only when accessing the
  specific MCP endpoints defined in your configuration.

## Execution and lifecycle management

These standard parameters govern the sandbox execution and lifecycle:

- **Sandbox environment:** Agents run with a fully managed sandbox environment,
  using the Antigravity harness for orchestration.

- **Sandbox time to live (TTL):** The sandbox environment has a standard time
  to live (TTL) of 7 days. Each new interaction automatically resets this
  timer to ensure active agents remain available.

- **Agent configuration persistence:** The backend persistently stores agent
  configurations, and they remain until you send an explicit `DELETE` request
  to the Agents API.

- **Agent collaboration:** Multiple agents share the same environment when you
  provide the same `env_id` during interaction.

## Pre-installed software

The sandbox contains a standard Linux utility set:

| Category | Packages/Tools |
|---|---|
| **UNIX Tools** | - `bc` - `curl` - `fd-find` - `gawk` - `gcloud CLI` - `git` - `htop` - `iproute2` - `jq` - `lsof` - `procps` - `ripgrep` - `rsync` - `tree` - `unzip` - `wget` - `which` |
| **Python 3.11 Packages** | - `ast-grep-cli` - `beautifulsoup4` - `google-genai` - `numpy` - `pandas` - `pyyaml` - `requests` |
| **Node.js 20 Global Packages** | - `create-next-app` - `create-vite` - `typescript` |

The agent can install additional packages at runtime using
`pip install` or `npm install` when network access is enabled. These packages
persist in the environment snapshot and remain available for interactions
reusing the same `env_id`.

## Skill mounting architecture

When you configure external skills from sources such as the Skill Registry
within an agent's `base_environment.sources`, these resources are attached
directly into the sandbox file system. The system places each skill within the
specified target directories, preserving the original skill package directory
structure. This organization helps ensure that individual skill files remain
discoverable by the agent.

### Example sources configuration

The following example attaches three skills from the Skill Registry:

    "sources": [
      {
        "type": "skill_registry",
        "source": "projects/{projectID}/locations/{location}/skills/pdf-skill",
        "target": "/.agent/skills/"
      },
      {
        "type": "skill_registry",
        "source": "projects/{projectID}/locations/{location}/skills/finance-skill",
        "target": "/.agent/skills/"
      },
      {
        "type": "skill_registry",
        "source": "projects/{projectID}/locations/{location}/skills/git-skill",
        "target": "/.agent/other-skills/"
      }
    ]

### Sandbox file system structure after mounting

After the sandbox environment is provisioned, the files are mounted and
structured within the container as follows:

    / (root)
    └── .agent/
        ├── skills/                    <-- Mount Target for pdf-skill & finance-skill
        │   ├── pdf-skill/             <-- Preserved skill directory
        │   │   ├── SKILL.md
        │   │   └── scripts/
        │   └── finance-skill/         <-- Preserved skill directory
        │       ├── SKILL.md
        │       └── scripts/
        └── other-skills/              <-- Mount Target for git-skill
            └── git-skill/             <-- Preserved skill directory
                ├── SKILL.md
                └── scripts/

## Sandbox built-in tools

When running in the managed environment, the agent has access to several default tools:

| Tool name | Description |
|---|---|
| `bash` | Executes a shell command in the sandbox terminal and returns the output. |
| `file_system` | Reads, writes, and deletes the contents of a file, and lists the contents of a directory. |

## What's next

Overview

### [Managed Agents API on Agent Platform overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents)

Learn about Managed Agents API on Agent Platform, a config-driven, REST-first environment for building autonomous agents.

Guide

### [Create and manage agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage)

Learn how to create, update, list, get, and delete agents using the REST API.

Guide

### [Interact with agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents)

Learn how to interact with agents at runtime, manage session state, and dynamically override configurations.
