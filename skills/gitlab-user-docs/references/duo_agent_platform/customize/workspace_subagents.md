# Workspace subagents

Define specialized subagents in your repository for the Developer Flow to delegate tasks to.

- Tier: [Free](../../../subscriptions/gitlab_credits.md#for-the-free-tier), Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/259664) in GitLab 19.5 as an [experiment](../../../policy/development_stages_support.md#experiment) [with a feature flag](../../../administration/feature_flags/_index.md) named `dap_workspace_agents`. Enabled by default.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/270158) in GitLab 19.6.
- `/agents` command [introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/releases/v10.2.0) in GitLab Duo CLI 10.2.0, as part of GitLab 19.6.

Workspace subagents are specialized agents that you define as Markdown files in your project repository.
This feature is available for the Developer Flow only, both in the GitLab UI and in GitLab Duo CLI.

The Developer Flow decides when to delegate a task to a subagent based on the `description` of the subagent.
You can also [ask it to delegate a task](#delegate-tasks-to-workspace-subagents) to a specific subagent.

Workspace subagents consume GitLab Credits like other GitLab Duo Agent Platform features.

## When to use workspace subagents

Workspace subagents do not share context with the Developer Flow.
Use a subagent when a task produces details that the Developer Flow does not need,
so the details stay out of the main context of the Developer Flow.

For example, a linter subagent with the `run_command` and `edit_file` tools can run the project
linters and fix the lint errors.
The linter output and the individual fixes stay in the conversation of the subagent.
The Developer Flow receives only the result, such as a summary of the fixes.
If the prompt of the subagent asks for it, the result can also list typical linter issues to avoid next time.
Other examples include reviewing changes, researching an approach, or checking a specific area like security.

When the Developer Flow delegates a task to a subagent, the subagent:

- Works in its own conversation, which starts with the task that the Developer Flow gives it.
  Only the result returns to the Developer Flow.
- Follows its own prompt instead of the instructions of the Developer Flow.
- Can use only the tools listed in its `tools` field.
  For example, a review subagent with only `read_file` and `grep` cannot change files.

The following table compares workspace subagents with other ways to customize GitLab Duo Developer.

| Customization | What it does | Use it when |
|---------------|--------------|-------------|
| `AGENTS.md` | Adds project context and conventions, such as structure, coding conventions, and build and test instructions, to the context of the agent that does the work. Applies to all work in the repository. | You want every task in the repository to follow the same conventions. |
| Agent Skills | Provides knowledge or workflows that an agent loads automatically when a task matches the skill description. The agent that loads the skill does the work itself, in the same conversation and with the same tools. | You want an agent to follow a specific workflow or use specific knowledge when a task matches. |
| Workspace subagents | Runs a task in a separate agent with its own prompt and tools, and returns only the result. | You want to keep the details of a task, like linter output, out of the context of the Developer Flow, or you want a separate agent with its own instructions and limited tools. |

## Subagent definitions

Each workspace subagent is a Markdown file in the `.agents/agents/` directory at the root of your repository.
The file starts with YAML front matter between `---` lines, followed by the prompt.
The prompt is the Markdown body of the file.

The following table describes the front matter fields and the prompt.

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No | The name the Developer Flow uses to identify the subagent. Defaults to the filename without the `.md` extension. Must be unique in the project. Maximum 64 characters. |
| `description` | Yes | What the subagent does. The Developer Flow uses this to decide when to delegate to the subagent. Maximum 1,024 characters. |
| `tools` | No | The tools the subagent can use, as a comma-separated list or a YAML list. Use tool names from [the list of available tools](../agents/tools.md). If you omit `tools`, the subagent cannot use any tools. It can only reason over the task with the information provided to it. |
| Prompt | Yes | The instructions for the subagent, after the front matter. Maximum 10,000 characters. |

### File requirements

A workspace subagent is used only if its file meets all of the following requirements:

- The file is directly in the `.agents/agents/` directory.
  Files in subdirectories are ignored.
- The filename ends in `.md`.
- The file is UTF-8 text.
- The file starts with YAML front matter between `---` lines.
- The front matter has a `description`.
- The file has a prompt after the front matter.
- The file is 64 KB or smaller.
- The name is unique.

  If one or more files that meet the requirements have the same name, the first file in alphabetical order by filename is used.

If a file does not meet these requirements, the file is skipped.

### Number and size limits

The following limits apply to all subagents in a project.

| Limit | Sessions in GitLab | GitLab Duo CLI sessions |
|-------|--------------------|-------------------------|
| Number of subagents | The first 10 `.md` files by filename are read. | Up to 10 subagents. Every subagent that meets the requirements is sent. |
| Total size | Up to 112 KB. The size counts the name, description, tools, and prompt of each subagent. If the total is larger, some subagents are not available to the Developer Flow. | Limited by the maximum gRPC message size. |

### Errors that prevent a session from starting

A Developer Flow session fails to start when:

- A subagent lists a tool that is not available in the Developer Flow.
- A `name`, `description`, or prompt is longer than its maximum.
- In GitLab Duo CLI sessions, more than 10 subagents meet the requirements.

The session shows an error that describes the problem, like the subagent and the field that caused it,
and does not continue.
To use the Developer Flow again, fix or remove the subagent file, then start a new session.
For sessions in GitLab, the change must be on the default branch.

## Create a workspace subagent

Create a workspace subagent to give the Developer Flow a specialized agent to delegate tasks to.

Prerequisites:

- Meet the [Developer Flow prerequisites](../../project/merge_requests/developer.md#prerequisites).
- To test the subagent before you merge it, install [GitLab Duo CLI](../../gitlab_duo_cli/_index.md) 9.21.0 or later.

To create a workspace subagent:

1. In a branch of your project, create a Markdown file in the `.agents/agents/` directory.
   For example, `.agents/agents/reviewer.md`.
1. Add the front matter and the prompt.
   For example:

   ```markdown
   ---
   name: reviewer
   description: Reviews code changes and reports a short list of findings.
   tools: read_file, grep
   ---

   You are a meticulous code reviewer. When delegated a task, read the files it
   names and report a short list of findings. Do not modify any file.
   ```

1. Test the subagent before you merge it.
   Sessions in GitLab read subagents only from the default branch,
   but the GitLab Duo CLI reads the files from your local working directory.
   1. In the root directory of the project, start the GitLab Duo CLI.
   1. Ask the Developer Flow to delegate a task to the subagent,
      or give it a task that matches the description of the subagent.
   1. Confirm that the session shows `Delegated to workspace/agents/<subagent-name>`,
      followed by the result of the subagent.
      To view what the subagent did, press <kbd>Control</kbd>+<kbd>T</kbd>.

1. Commit or merge the file into the default branch.
1. In GitLab, start a new Developer Flow session to use the subagent.
   To see the result, open the session from the link that the Developer Flow posts,
   or in the left sidebar, select **AI** > **Sessions**.
   When the Developer Flow delegates a task, the session shows **Delegated to subagent**,
   followed by **Returned to agent** with the result of the subagent.

In GitLab, only new sessions pick up changes to the subagent configuration.

## Delegate tasks to workspace subagents

To use a specific subagent, ask the Developer Flow to delegate a task to it by name.
If you do not know the name, ask the Developer Flow to list the subagents it can delegate to.
Naming a subagent makes delegation likely, but the Developer Flow decides whether to delegate the task.

### GitLab UI

In an issue or merge request comment,
[mention the Developer Flow](../../project/merge_requests/developer.md#mention-duo-developer-in-a-discussion)
and ask in natural language.
Replace `<namespace>` with your GitLab namespace path.
For example:

- To list the subagents:

  ```plaintext
  @duo-developer-<namespace> list the workspace subagents you can delegate to and post them here.
  ```

- To delegate a task:

  ```plaintext
  @duo-developer-<namespace> delegate the review of these changes to the reviewer subagent.
  ```

### GitLab Duo CLI

In the root directory of the project, start the GitLab Duo CLI in
[interactive mode](../../gitlab_duo_cli/use.md#interactive-mode).
Run `glab duo cli` or `duo`, depending on your setup.
Then ask the Developer Flow in natural language, as in the GitLab UI,
but without the `@duo-developer-<namespace>` mention.

In GitLab Duo CLI 10.2.0 or later, you can also use the `/agents` command:

1. Enter `/agents`.
   A dialog lists the name, description, and tools of each subagent.
1. Optional. To filter the list, type part of the name or description of a subagent.
1. Optional. To ask the Developer Flow to use a subagent, select the subagent and press <kbd>Enter</kbd>.
   The request does not include a task.
   To include one, use `/agents <subagent-name> <task>`.

For example, to delegate a review to the `reviewer` subagent, enter `/agents reviewer review the changes on this branch`.

The `/agents` dialog lists only the subagents whose files have a valid structure.
The dialog does not check the other requirements and limits, so a listed subagent can still
prevent a session from starting.
To see changes to the subagent files in the dialog, start a new session.

## Prevent workspace subagents in a project

You cannot turn off workspace subagents for a single project.
To keep subagent definitions out of a repository, use one or both of the following methods:

- Add `.agents/agents/` to the project's `.gitignore` file, so the files are not committed by accident.
- Create a [push rule to prohibit files by name](../../project/repository/push_rules.md#prohibit-files-by-name)
  with the regular expression `^\.agents\/agents\/`.
  GitLab then rejects pushes that contain the files.

## Related topics

- [AGENTS.md customization files](agents_md.md)
- [Agent Skills](agent_skills.md)
- [Custom rules](custom_rules.md)
- [Epic 103: Proposed improvements to workspace subagents](https://gitlab.com/groups/gitlab-org/modelops/applied-ml/code-suggestions/-/work_items/103)

## Troubleshooting

If a workspace subagent does not work as expected:

1. Check the file against the [file requirements](#file-requirements).
   Files that do not meet the requirements are skipped.
1. For sessions in GitLab, check that the file is on the default branch.
1. If the session fails to start, check the
   [errors that prevent a session from starting](#errors-that-prevent-a-session-from-starting).
