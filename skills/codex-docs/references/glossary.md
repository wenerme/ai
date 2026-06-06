# Glossary

Use this glossary as a quick reference for Codex terms across the app, CLI, IDE extension, cloud, SDK, and related integrations.

<GlossaryTable
  client:load
  searchPlaceholder="Filter by term, definition, or surface"
  searchLabel="Search glossary terms"
  emptyStateMessage="No glossary terms match your search."
  maxVisibleEntries={100}
  options={[
    {
      key: "Agent",
      href: "/codex",
      appliesTo: "App, CLI, IDE extension, Cloud",
      description:
        "The Codex worker that reasons over context, uses tools, and completes a task.",
    },
    {
      key: "AGENTS.md",
      href: "/codex/guides/agents-md",
      appliesTo: "App, CLI, IDE extension, Cloud",
      description:
        "Repository or user guidance file that gives Codex persistent instructions.",
    },
    {
      key: "Analytics dashboard",
      href: "/codex/enterprise/governance#analytics-dashboard",
      appliesTo: "Enterprise",
      description:
        "Admin view for Codex usage, adoption, and code review metrics.",
    },
    {
      key: "API key sign-in",
      href: "/codex/auth#sign-in-with-an-api-key",
      appliesTo: "App, CLI, IDE extension",
      description: "Authentication using an OpenAI API key.",
    },
    {
      key: "Approval policy",
      href: "/codex/agent-approvals-security#sandbox-and-approvals",
      appliesTo: "App, CLI, IDE extension",
      description: "Rules for when Codex must ask before taking an action.",
    },
    {
      key: "Approval request",
      href: "/codex/agent-approvals-security#automatic-approval-reviews",
      appliesTo: "App, CLI, IDE extension",
      description: "Codex asking to allow a restricted action.",
    },
    {
      key: "Apps (connectors)",
      href: "/codex/plugins",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Integration that lets Codex access external services. Available through plugins; also called connectors.",
    },
    {
      key: "Appshot",
      href: "/codex/appshots",
      appliesTo: "App",
      description:
        "Snapshot of the frontmost app window sent to a Codex thread.",
    },
    {
      key: "Auth cache",
      href: "/codex/auth#login-caching",
      appliesTo: "App, CLI, IDE extension",
      description: "Locally stored login credentials reused by Codex.",
    },
    {
      key: "Automatic approval review",
      href: "/codex/agent-approvals-security#automatic-approval-reviews",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Model-based review of eligible approval requests before they proceed.",
    },
    {
      key: "Automation",
      href: "/codex/app/automations",
      appliesTo: "App",
      description: "A scheduled or recurring Codex task.",
    },
    {
      key: "Automation run",
      href: "/codex/app/automations#managing-tasks",
      appliesTo: "App",
      description:
        "One execution of a scheduled automation that may report findings or archive itself.",
    },
    {
      key: "Browser use",
      href: "/codex/app/browser#browser-use",
      appliesTo: "App",
      description:
        "App capability that lets Codex operate the in-app browser directly.",
    },
    {
      key: "Chat",
      href: "/codex/app/features#chats",
      appliesTo: "App",
      description: "A Codex conversation not tied to a project.",
    },
    {
      key: "ChatGPT sign-in",
      href: "/codex/auth#sign-in-with-chatgpt",
      appliesTo: "App, CLI, IDE extension, Cloud",
      description:
        "Authentication using a ChatGPT account and workspace permissions.",
    },
    {
      key: "Chronicle",
      href: "/codex/memories/chronicle",
      appliesTo: "App",
      description:
        "Opt-in feature that builds memories from recent screen context.",
    },
    {
      key: "Cloud",
      href: "/codex/cloud",
      appliesTo: "App, IDE extension, Web",
      description:
        "Mode where Codex works remotely in an OpenAI-managed environment.",
    },
    {
      key: "Cloud environment",
      href: "/codex/cloud/environments",
      appliesTo: "Cloud",
      description: "Configured container setup used for Codex cloud tasks.",
    },
    {
      key: "Cloud task",
      href: "/codex/cloud/environments#how-codex-cloud-tasks-run",
      appliesTo: "Cloud",
      description:
        "A remotely executed Codex task that runs in a cloud environment.",
    },
    {
      key: "Cloud thread",
      href: "/codex/prompting#threads",
      appliesTo: "Cloud",
      description: "A thread that runs in a Codex cloud environment.",
    },
    {
      key: "Codex",
      href: "/codex",
      appliesTo: "App, CLI, IDE extension, Web, Cloud, SDK",
      description: "OpenAI's coding agent for software development tasks.",
    },
    {
      key: "Codex app",
      href: "/codex/app",
      appliesTo: "Desktop",
      description:
        "Desktop app for running Codex threads in parallel, with built-in worktree support, automations, and Git functionality.",
    },
    {
      key: "Codex app-server",
      href: "/codex/app-server",
      appliesTo: "App, IDE extension, SDK",
      description:
        "Local JSON-RPC server for embedding Codex threads, turns, approvals, history, and streamed events in custom clients.",
    },
    {
      key: "Codex CLI",
      href: "/codex/cli",
      appliesTo: "Terminal",
      description:
        "Terminal client for running Codex interactively or in scripts.",
    },
    {
      key: "Codex cloud",
      href: "/codex/cloud",
      appliesTo: "Web, App, IDE extension",
      description:
        "OpenAI-managed execution environment where Codex can work on repository tasks remotely.",
    },
    {
      key: "codex exec",
      href: "/codex/noninteractive",
      appliesTo: "CLI",
      description:
        "CLI command for running Codex non-interactively from scripts or CI.",
    },
    {
      key: "Codex IDE extension",
      href: "/codex/ide",
      appliesTo: "IDE",
      description:
        "Editor integration for using Codex inside IDEs like VS Code, JetBrains IDEs, Cursor, and Windsurf.",
    },
    {
      key: "Codex SDK",
      href: "/codex/sdk",
      appliesTo: "SDK",
      description:
        "Programmatic interface for building Codex-powered workflows or integrations.",
    },
    {
      key: "Codex web",
      href: "/codex/cloud",
      appliesTo: "Browser",
      description: "Browser-based Codex surface for delegating cloud tasks.",
    },
    {
      key: "Codex-managed worktree",
      href: "/codex/app/worktrees#codex-managed-and-permanent-worktrees",
      appliesTo: "App",
      description:
        "A temporary worktree Codex creates and manages for a thread.",
    },
    {
      key: "Compaction",
      href: "/codex/prompting#context",
      appliesTo: "App, CLI, IDE extension, Cloud",
      description:
        "Summarizing older context so long-running work can continue.",
    },
    {
      key: "Compliance API",
      href: "/codex/enterprise/governance#compliance-api",
      appliesTo: "Enterprise",
      description: "API for exporting Codex activity and audit metadata.",
    },
    {
      key: "Computer use",
      href: "/codex/app/computer-use",
      appliesTo: "App",
      description:
        "App capability that lets Codex interact with desktop applications through the UI.",
    },
    {
      key: "config.toml",
      href: "/codex/config-reference#configtoml",
      appliesTo: "App, CLI, IDE extension",
      description: "Local Codex configuration files.",
    },
    {
      key: "Connected host",
      href: "/codex/remote-connections#what-comes-from-the-connected-host",
      appliesTo: "App, Mobile",
      description:
        "Computer or development environment that provides files, tools, and shell access for remote Codex work.",
    },
    {
      key: "Connector",
      href: "/codex/plugins",
      appliesTo: "App, Cloud",
      description:
        "App integration that lets Codex access external services. Available through plugins; also called apps.",
    },
    {
      key: "Container cache",
      href: "/codex/cloud/environments#container-caching",
      appliesTo: "Cloud",
      description:
        "Saved cloud container state reused to speed up future tasks.",
    },
    {
      key: "Context",
      href: "/codex/prompting#context",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description:
        "Information Codex can use while working, such as files, prior messages, tool output, and instructions.",
    },
    {
      key: "Context window",
      href: "/api/docs/guides/conversation-state#managing-the-context-window",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description:
        "The maximum amount of information the model can consider at once.",
    },
    {
      key: "Custom agent",
      href: "/codex/subagents#custom-agents",
      appliesTo: "App, CLI",
      description:
        "User-defined agent role with its own instructions and settings.",
    },
    {
      key: "Deny-read rule",
      href: "/codex/permissions#deny-reads-with-exact-paths-or-globs",
      appliesTo: "App, CLI, IDE extension, Enterprise",
      description:
        "Filesystem permission rule that prevents Codex from reading sensitive paths or glob matches.",
    },
    {
      key: "Diff",
      href: "/codex/app/review#what-changes-it-shows",
      appliesTo: "App, Git, Review",
      description:
        "Set of Git file changes shown for inspection, comments, staging, or reverting.",
    },
    {
      key: "Domain allowlist",
      href: "/codex/cloud/internet-access#domain-allowlist",
      appliesTo: "Cloud",
      description:
        "Set of domains Codex cloud can reach when agent internet access is enabled.",
    },
    {
      key: "Environment (local)",
      href: "/codex/app/local-environments",
      appliesTo: "App, Worktree",
      description:
        "App configuration to tell Codex how to set up worktrees for a project.",
    },
    {
      key: "Environment variable",
      href: "/codex/cloud/environments#environment-variables-and-secrets",
      appliesTo: "Cloud, CLI, IDE extension",
      description:
        "Runtime configuration value available during task execution.",
    },
    {
      key: "Ephemeral session",
      href: "/codex/noninteractive#basic-usage",
      appliesTo: "CLI",
      description:
        "Non-interactive run that skips saving session state after it completes.",
    },
    {
      key: "Fast mode",
      href: "/codex/speed#fast-mode",
      appliesTo: "CLI, IDE extension",
      description:
        "Speed setting that makes supported models respond faster at a higher credit cost.",
    },
    {
      key: "Filesystem permission",
      href: "/codex/permissions#filesystem-permissions",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Permission profile rule that grants or denies read and write access to paths.",
    },
    {
      key: "Finding",
      href: "/codex/app/automations#managing-tasks",
      appliesTo: "App",
      description: "A notable result or issue surfaced by an automation.",
    },
    {
      key: "Full access",
      href: "/codex/concepts/sandboxing#configure-defaults",
      appliesTo: "App, CLI, IDE extension",
      description: "Mode where Codex runs without normal sandbox restrictions.",
    },
    {
      key: "Git worktree",
      href: "/codex/app/worktrees#whats-a-worktree",
      appliesTo: "App, Git",
      description:
        "A second checkout of the same repository for parallel branch work.",
    },
    {
      key: "Handoff",
      href: "/codex/app/worktrees#working-between-local-and-worktree",
      appliesTo: "App",
      description: "Moving a thread and its work between Local and Worktree.",
    },
    {
      key: "Heartbeat",
      href: "/codex/app/automations#thread-automations",
      appliesTo: "App",
      description:
        "A recurring thread wake-up that returns Codex to the same conversation on a schedule. Also called a thread automation.",
    },
    {
      key: "Hook",
      href: "/codex/hooks",
      appliesTo: "App, CLI, IDE extension",
      description:
        "A lifecycle handler that runs when a Codex event matches, such as tool use, permission requests, or when a turn stops.",
    },
    {
      key: "Hook event",
      href: "/codex/hooks#config-shape",
      appliesTo: "App, CLI, IDE extension",
      description: "Lifecycle point where configured hook handlers can run.",
    },
    {
      key: "Hunk",
      href: "/codex/app/review#staging-and-reverting-files",
      appliesTo: "App, Git, Review",
      description:
        "Contiguous section of a diff that can be staged, unstaged, or reverted independently.",
    },
    {
      key: "Inline comment",
      href: "/codex/app/review#inline-comments-for-feedback",
      appliesTo: "App",
      description: "Line-specific feedback attached to a diff.",
    },
    {
      key: "Live web search",
      href: "/codex/config-basic#web-search-mode",
      appliesTo: "App, CLI, IDE extension",
      description: "Real-time web lookup for current information.",
    },
    {
      key: "Local",
      href: "/codex/app/worktrees#working-between-local-and-worktree",
      appliesTo: "App, CLI, IDE extension",
      description: "Mode where Codex works on the user's computer.",
    },
    {
      key: "Local thread",
      href: "/codex/prompting#threads",
      appliesTo: "App, CLI, IDE extension",
      description: "A thread that runs on the user's machine.",
    },
    {
      key: "Maintenance script",
      href: "/codex/cloud/environments#container-caching",
      appliesTo: "Cloud",
      description: "Optional script run when a cached cloud container resumes.",
    },
    {
      key: "Managed configuration",
      href: "/codex/enterprise/managed-configuration",
      appliesTo: "Enterprise",
      description: "Organization-controlled Codex defaults and restrictions.",
    },
    {
      key: "MCP",
      href: "/codex/mcp",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Model Context Protocol, a standard for connecting Codex to external tools and context.",
    },
    {
      key: "MCP resource",
      href: "/codex/mcp#supported-mcp-features",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Readable context exposed by an MCP server for Codex to inspect.",
    },
    {
      key: "MCP server",
      href: "/codex/mcp#supported-mcp-features",
      appliesTo: "App, CLI, IDE extension",
      description: "External tool or context provider exposed through MCP.",
    },
    {
      key: "MCP tool",
      href: "/codex/mcp#supported-mcp-features",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Action exposed by an MCP server that Codex can call during a task.",
    },
    {
      key: "MDM",
      href: "/codex/enterprise/managed-configuration#macos-managed-preferences-mdm",
      appliesTo: "Enterprise",
      description:
        "Mobile device management tooling for distributing device profiles and managed Codex settings.",
    },
    {
      key: "Memories",
      href: "/codex/memories",
      appliesTo: "App, CLI, IDE extension",
      description: "Locally stored context Codex can reuse across sessions.",
    },
    {
      key: "Model",
      href: "/codex/models",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description: "The AI model Codex uses for reasoning and tool work.",
    },
    {
      key: "Network access",
      href: "/codex/agent-approvals-security#network-access-",
      appliesTo: "App, CLI, IDE extension, Cloud",
      description:
        "Permission for commands or environments to reach the internet.",
    },
    {
      key: "Network policy",
      href: "/codex/agent-approvals-security#network-policy",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Domain-based allow and deny rules that constrain sandboxed outbound network traffic.",
    },
    {
      key: "Non-interactive mode",
      href: "/codex/noninteractive",
      appliesTo: "CLI",
      description: "CLI mode for running Codex from scripts or CI.",
    },
    {
      key: "Output schema",
      href: "/codex/noninteractive#create-structured-outputs-with-a-schema",
      appliesTo: "CLI",
      description:
        "JSON Schema passed to `codex exec` to constrain the final response.",
    },
    {
      key: "Permanent worktree",
      href: "/codex/app/worktrees#codex-managed-and-permanent-worktrees",
      appliesTo: "App",
      description: "A long-lived worktree kept as its own project.",
    },
    {
      key: "Permission profile",
      href: "/codex/permissions#define-and-select-a-profile",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Named least-privilege policy that combines filesystem and network rules for local command execution.",
    },
    {
      key: "Plan",
      href: "/codex/learn/best-practices#plan-first-for-difficult-tasks",
      appliesTo: "App, CLI, IDE extension, Cloud",
      description: "Codex's proposed or tracked steps for completing a task.",
    },
    {
      key: "Plugin",
      href: "/codex/plugins",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Installable bundle that can distribute skills, tools, and integrations.",
    },
    {
      key: "Plugin manifest",
      href: "/codex/plugins/build#plugin-structure",
      appliesTo: "App, CLI, IDE extension, Plugins",
      description:
        "Plugin metadata file that identifies a plugin and points to bundled skills, apps, MCP servers, hooks, and metadata.",
    },
    {
      key: "Prefix rule",
      href: "/codex/rules#understand-the-rules-language",
      appliesTo: "App, CLI, IDE extension, Enterprise",
      description:
        "Command-rule pattern that allows, prompts for, or forbids matching command prefixes.",
    },
    {
      key: "Profile",
      href: "/codex/config-advanced#profiles",
      appliesTo: "CLI, IDE extension",
      description: "Named configuration preset for Codex.",
    },
    {
      key: "Progressive disclosure",
      href: "/codex/skills",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Loading skill details only when needed to preserve context.",
    },
    {
      key: "Project",
      href: "/codex/app/features#multitask-across-projects",
      appliesTo: "App",
      description: "A selected codebase or folder Codex works in.",
    },
    {
      key: "Prompt",
      href: "/codex/prompting",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description: "The user instruction or request sent to Codex.",
    },
    {
      key: "Pull request review",
      href: "/codex/app/review#pull-request-reviews",
      appliesTo: "App, CLI, GitHub",
      description: "Codex review of changes or feedback on a pull request.",
    },
    {
      key: "RBAC",
      href: "/codex/enterprise/admin-setup#step-2-set-up-custom-roles-rbac",
      appliesTo: "Enterprise",
      description: "Role-based access control for workspace permissions.",
    },
    {
      key: "Read-only mode",
      href: "/codex/concepts/sandboxing",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Mode where Codex can inspect but not modify without approval.",
    },
    {
      key: "Reasoning effort",
      href: "/codex/config-basic#reasoning-effort",
      appliesTo: "App, CLI, IDE extension, SDK",
      description:
        "Setting that controls how much reasoning budget a model uses.",
    },
    {
      key: "Remote connection",
      href: "/codex/remote-connections",
      appliesTo: "App, Mobile",
      description:
        "Connection that lets Codex work from another device using a connected host.",
    },
    {
      key: "requirements.toml",
      href: "/codex/config-reference#requirementstoml",
      appliesTo: "Enterprise",
      description: "Admin-enforced requirements file for managed Codex setups.",
    },
    {
      key: "Review pane",
      href: "/codex/app/review",
      appliesTo: "App",
      description: "App view for inspecting diffs, comments, and Git changes.",
    },
    {
      key: "Rules",
      href: "/codex/rules",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Policies that allow, prompt for, or deny command prefixes or permission exceptions.",
    },
    {
      key: "Sandbox",
      href: "/codex/concepts/sandboxing",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Enforced boundary limiting what Codex commands can access or modify.",
    },
    {
      key: "Sandbox mode",
      href: "/codex/config-basic#sandbox-level",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Configuration that defines Codex's filesystem and network limits.",
    },
    {
      key: "Sandbox preset",
      href: "/codex/sdk#sandbox-presets",
      appliesTo: "SDK",
      description:
        "SDK shorthand for common sandbox policies such as read-only, workspace-write, or full access.",
    },
    {
      key: "Schedule",
      href: "/codex/app/automations",
      appliesTo: "App",
      description: "The timing rule for an automation.",
    },
    {
      key: "Secret",
      href: "/codex/cloud/environments#environment-variables-and-secrets",
      appliesTo: "Cloud",
      description:
        "Encrypted value available to setup scripts but removed before the agent phase.",
    },
    {
      key: "Setup script",
      href: "/codex/app/local-environments#setup-scripts",
      appliesTo: "App worktrees",
      description:
        "Script run before the agent starts to install dependencies or prepare tools.",
    },
    {
      key: "Skill",
      href: "/codex/skills",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Reusable workflow package with instructions and optional scripts or references.",
    },
    {
      key: "Skill invocation",
      href: "/codex/skills#how-codex-uses-skills",
      appliesTo: "App, CLI, IDE extension",
      description: "Explicit or implicit activation of a skill.",
    },
    {
      key: "Slash command",
      href: "/codex/cli/slash-commands",
      appliesTo: "CLI",
      description:
        "Command entered with a leading slash to control or inspect a Codex CLI session.",
    },
    {
      key: "Standalone automation",
      href: "/codex/app/automations",
      appliesTo: "App",
      description: "Independent scheduled run that reports separate findings.",
    },
    {
      key: "STDIO MCP server",
      href: "/codex/mcp#stdio-servers",
      appliesTo: "CLI, IDE extension",
      description:
        "MCP server launched as a local process by a configured command and arguments.",
    },
    {
      key: "Streamable HTTP MCP server",
      href: "/codex/mcp#streamable-http-servers",
      appliesTo: "CLI, IDE extension",
      description:
        "MCP server reached over HTTP, optionally with bearer token or OAuth authentication.",
    },
    {
      key: "Subagent",
      href: "/codex/concepts/subagents",
      appliesTo: "App, CLI",
      description: "Specialized child agent spawned to work on part of a task.",
    },
    {
      key: "Subagent workflow",
      href: "/codex/concepts/subagents#core-terms",
      appliesTo: "App, CLI",
      description:
        "Workflow where Codex runs delegated agents in parallel and combines their results.",
    },
    {
      key: "Task",
      href: "/codex/app/automations#managing-tasks",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description: "The unit of work Codex is asked to complete.",
    },
    {
      key: "Thread",
      href: "/codex/prompting#threads",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description:
        "A single Codex session containing prompts, model output, and tool activity.",
    },
    {
      key: "Thread automation",
      href: "/codex/app/automations#thread-automations",
      appliesTo: "App",
      description:
        "Recurring wake-up attached to an existing thread. Also called a heartbeat.",
    },
    {
      key: "Thread fork",
      href: "/codex/app-server#start-or-resume-a-thread",
      appliesTo: "App-server, SDK",
      description:
        "New thread branched from the stored history of an existing thread.",
    },
    {
      key: "Turn",
      href: "/codex/app-server#core-primitives",
      appliesTo: "App, CLI, IDE extension, Cloud, SDK",
      description:
        "One exchange in a thread, usually a user prompt plus Codex's response and actions.",
    },
    {
      key: "Universal image",
      href: "/codex/cloud/environments#default-universal-image",
      appliesTo: "Cloud",
      description:
        "Default Codex cloud container image with common tools preinstalled.",
    },
    {
      key: "Web search cache",
      href: "/codex/config-basic#web-search-mode",
      appliesTo: "App, CLI, IDE extension",
      description:
        "Pre-indexed search results Codex can use without live browsing.",
    },
    {
      key: "Worktree",
      href: "/codex/app/worktrees",
      appliesTo: "App",
      description:
        "Mode where Codex isolates changes in a separate Git worktree.",
    },
    {
      key: "Writable roots",
      href: "/codex/agent-approvals-security#protected-paths-in-writable-roots",
      appliesTo: "App, CLI, IDE extension",
      description: "Directories Codex is allowed to modify.",
    },
  ]}
/>