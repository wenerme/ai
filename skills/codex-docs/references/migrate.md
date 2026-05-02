# Migrate to Codex

Use the import flow to bring your instructions, configuration, skills, MCP
servers, hooks, subagents, and recent sessions from another agent into Codex.
Codex migrates the parts it can handle directly and can open a follow-up thread
to help migrate anything that remains.

<div class="not-prose my-6 max-w-4xl">
  <CodexScreenshot
    alt="Import from another agent in General settings"
    lightSrc="/images/codex/migrate/import-flow-light.png"
    darkSrc="/images/codex/migrate/import-flow-dark.png"
    maxHeight="520px"
    class="p-3 sm:p-4"
    imageClass="rounded-xl"
  />
</div>

## Start the migration

<WorkflowSteps>

1. Open **Settings** in the Codex app.
2. On the **General** page, find **Import other agent setup**.
3. Select **Import** or **Import again**.
4. Review what Codex found, choose what to bring over, then select **Import**.
5. After the import finishes, select **View imported files** if you want to inspect the result.

</WorkflowSteps>

## How migration works

Codex checks both your user-level setup and the current project. User-level
setup comes from files on your machine; project-level setup comes from files in
the repository you have open.

When you import, Codex:

1. Detects the setup it can find.
2. Imports the selected items it can migrate directly.
3. Checks again after the import finishes.
4. Offers to continue the migration in a new thread if anything still needs
   follow-up work.

## What Codex can import

| Detected setup                        | Codex destination                      |
| ------------------------------------- | -------------------------------------- |
| Instruction files                     | [`AGENTS.md`](https://developers.openai.com/codex/guides/agents-md) |
| `settings.json`                       | [`config.toml`](https://developers.openai.com/codex/config-basic)   |
| Skills                                | [Codex skills](https://developers.openai.com/codex/skills)          |
| Recent sessions from the last 30 days | Codex threads and projects             |
| MCP server configuration              | [Codex MCP configuration](https://developers.openai.com/codex/mcp)  |
| Hooks                                 | [Codex hooks](https://developers.openai.com/codex/hooks)            |
| Slash commands                        | [Codex skills](https://developers.openai.com/codex/skills)          |
| Subagents                             | [Codex agents](https://developers.openai.com/codex/subagents)       |

## Finish remaining setup in a new thread

Some detected setup does not have a clean one-to-one mapping into Codex. For
those items, Codex can open a new thread with the
[`migrate-to-codex`](https://github.com/openai/skills/tree/main/skills/.curated/migrate-to-codex)
skill to help finish the migration.

When that happens, Codex shows the remaining setup and offers **Continue in
Codex**.

<div class="not-prose my-6 max-w-4xl">
  <CodexScreenshot
    alt="Additional setup found after import"
    lightSrc="/images/codex/migrate/additional-setup-light.png"
    darkSrc="/images/codex/migrate/additional-setup-dark.png"
    maxHeight="520px"
    class="p-6 sm:p-8"
    imageClass="rounded-xl"
  />
</div>

If you continue, Codex opens a new thread with the remaining work already filled
in. The thread keeps user-level setup separate from project-level setup so you
can see where each remaining item belongs.

<div class="not-prose my-6 max-w-4xl">
  <CodexScreenshot
    alt="Follow-up migration task in Codex"
    lightSrc="/images/codex/migrate/continue-with-codex-light.png"
    darkSrc="/images/codex/migrate/continue-with-codex-dark.png"
    maxHeight="320px"
    class="p-6 sm:p-8"
    imageClass="rounded-xl"
  />
</div>

## What to review after import

Review any migrated setup before you rely on it, especially:

- Tool restrictions or permissions in imported skills and agents.
- MCP server settings that use custom authentication, headers, environment
  variables, or transports.
- Hooks whose behavior may differ in Codex.
- Plugins, marketplaces, or other remaining setup that needs manual follow-up.
- Prompt templates or command-style prompts that depend on arguments, shell
  interpolation, or file-path placeholders.

## After you switch

Once the import finishes, open one of your migrated projects and continue from
there. If you are new to Codex, see the [quickstart](https://developers.openai.com/codex/quickstart) for the
rest of the setup flow.