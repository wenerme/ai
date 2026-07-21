# Customize the GitLab Duo CLI

Configure hooks, custom slash commands, and network settings for the GitLab Duo CLI.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- Environment variable and option to enable user-level Agent Skills [introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/releases/v8.83.0) in GitLab Duo CLI 8.83.0 as an [experiment](../../policy/development_stages_support.md#experiment), during the GitLab 19.0 release.

The GitLab Duo CLI supports the following customizations:

- Use hooks to run custom commands at specific points in the GitLab Duo CLI lifecycle.
- Use custom slash commands to better align the CLI with your workflow or use case.
- Use [custom instructions](../duo_agent_platform/customize/_index.md) set for
  the GitLab Duo Agent Platform to match your workflow, coding standards, or
  project requirements.

## Hooks

- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/work_items/2209) as an [experiment](../../policy/development_stages_support.md#experiment) in GitLab Duo CLI 8.95.0, during the GitLab 19.1 release.

Use hooks to run custom commands at specific points in the GitLab Duo CLI lifecycle.

For example, you can inject additional context into every new chat session by running
a script that gathers information about your environment.

The GitLab Duo CLI supports hooks at two levels:

- User-level (global): Apply to all of your projects.
- Project-level: Apply only to a specific project. Project-level hooks are disabled by default to
  prevent running arbitrary code from checked-out repositories.

When both user-level and project-level `hooks.json` files exist, the CLI merges the hooks and runs
the user-level ones first.

> [!note]
> For security reasons, sensitive environment variables (`GITLAB_TOKEN`, `GITLAB_OAUTH_TOKEN`, `CI_JOB_TOKEN`) are excluded from hook processes.

### Hook execution

When a hook runs, the GitLab Duo CLI:

1. Sends a JSON object to the command's standard input with session metadata:

   ```json
   {
     "session_id": "abc-123",
     "cwd": "/path/to/project",
     "transcript_path": "",
     "hook_event_name": "SessionStart",
     "source": "startup"
   }
   ```

1. Sets environment variables `DUO_SESSION_ID` and `DUO_PROJECT_DIR` for the
   hook process.
1. Collects the command's standard output as additional context for the session.

The hook can return plain text on standard output, or a JSON object:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Your context string here"
  }
}
```

If the hook exits with a non-zero status or times out, it is logged as a warning
but does not block the session from starting.

### Create hooks

The GitLab Duo CLI supports the `SessionStart` event, which runs when a new session starts or an existing
session resumes.

To create a hook:

1. Create a `hooks.json` file:
   - For a user-level hook:
     - On Linux or macOS, create the file at `~/.gitlab/duo/hooks.json`.
     - On Windows, create the file at `%APPDATA%\GitLab\duo\hooks.json`.
   - For a project-level hook, create the file in the root of your project: `<project>/.gitlab/duo/hooks.json`.
1. Define your hooks in the file.
   - Create a matcher group for each `SessionStart` event source that should trigger the hook (`startup`
     or `resume`).
   - Each matcher group has an optional regex `matcher` value and an array of command hooks:

     | Field | Description |
     |-------|-------------|
     | `matcher` | Optional. Regex tested against the event source (`startup` or `resume` for `SessionStart`). Omit to match all. |
     | `hooks[].type` | Must be `"command"`. |
     | `hooks[].command` | A shell command to execute. |
     | `hooks[].timeout` | Optional. Timeout in seconds. Default: 30. |

   - For example:

     ```json
     {
       "hooks": {
         "SessionStart": [
           {
             "matcher": "startup",
             "hooks": [
               {
                 "type": "command",
                 "command": "cat ~/.my-coding-preferences.md",
                 "timeout": 10
               }
             ]
          }
         ]
       }
     }
     ```

1. If you have project-level hooks, enable them when you start the GitLab Duo CLI:




### glab

   ```shell
   glab duo cli --enable-project-hooks
   ```




### duo

   ```shell
   duo --enable-project-hooks
   ```





   Alternatively, set the environment variable:

   ```shell
   export GITLAB_ENABLE_PROJECT_HOOKS=true
   ```

## Custom slash commands

- [Introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/merge_requests/3617) in GitLab Duo CLI 9.2.0, during the GitLab 19.2 release.

Create custom slash commands for prompts you use frequently.

The GitLab Duo CLI supports custom slash commands at two levels:

- User-level: Apply to all of your projects.
- Project-level: Apply only to a specific project.

If a user-level command and a project-level command share the same name, the project-level command
takes precedence. Custom slash commands cannot override built-in slash commands or
[Agent Skills slash commands](../duo_agent_platform/customize/agent_skills.md#expose-skills-as-slash-commands).

### Create a custom slash command

To create a custom slash command, you create a Markdown file.

The filename is the command name, and the file content is the prompt.

For example, a file named `daily.md` creates the `/daily` command:

1. Create a `commands` directory:
   - For a project-level command, create the directory in the root of your project:
     `<project>/.agents/commands/`.
   - For a user-level command, use one of the following locations:
     - To keep your commands with your other GitLab Duo customization files:
       - On Linux or macOS, create the directory at `~/.gitlab/duo/commands/`.
       - On Windows, create the directory at `%APPDATA%\GitLab\duo\commands\`.
       - If you have set `GLAB_CONFIG_DIR` or `XDG_CONFIG_HOME`, use `$GLAB_CONFIG_DIR/commands/`
         or `$XDG_CONFIG_HOME/gitlab/duo/commands/`. If both are set, `GLAB_CONFIG_DIR` takes
         priority.
     - To share commands with other AI tools:
       - On Linux or macOS, create the directory at `~/.agents/commands/`.
       - On Windows, create the directory at `%USERPROFILE%\.agents\commands\`.
1. In the directory, create a Markdown file.
   Use the command name as the filename.
   Command names must start with a letter or number, and can contain only letters, numbers,
   hyphens, and underscores.
1. Add the prompt to the file.
1. Optional. Add a `description` field in YAML front matter at the top of the file.
   The description appears next to the command in the slash command menu.

   For example, a `/daily` command defined in `daily.md`:

   ```markdown
   ---
   description: Prepare a daily report
   ---

   Use `glab todo list` to fetch my open TODO items. Give me a concise morning report ranked by priority.
   ```

1. Restart the GitLab Duo CLI. The CLI discovers custom slash commands when it starts.

### Use a custom slash command

In interactive mode, enter the slash command at the prompt and press <kbd>Enter</kbd>.
The GitLab Duo CLI sends the file content as the prompt.

Any text you enter after the command name is added to the end of the prompt.

Use additional text to customize what the custom slash command does.

For example, `/daily prioritize my milestone deliverables`.

## Related topics

- [GitLab Duo CLI complete reference](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/blob/main/packages/cli/docs/cli-reference.md)
- [Customize GitLab Duo Agent Platform](../duo_agent_platform/customize/_index.md)
