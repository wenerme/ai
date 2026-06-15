# Import to Codex

Use the import flow to bring your instructions, settings, skills, plugins,
projects, and recent chat sessions from other agents into Codex. Codex imports
the supported items directly and lets you finish setup for any imported plugins
or connections that need authorization.

Importing does not change or delete your existing agent setup.

<div class="not-prose my-6 max-w-5xl">
  <CodexScreenshot
    alt="Choose the other AI apps to import from"
    lightSrc="/images/codex/import/import-source.png"
    darkSrc="/images/codex/import/import-source.png"
    maxHeight="680px"
    variant="no-wallpaper"
    imageClass="rounded-xl"
  />
</div>

## Start an import

<WorkflowSteps>

1. In the Codex app, open **Settings**.
2. Under **General**, find **Import other agent setup**.
3. Select **Import**.
4. Choose the agents you want to import from, then select **Continue**.
5. On **Select items to import**, select **Continue** to import everything or **Customize** to choose specific items.
6. If you customize the import, select the items to bring over, then select **Confirm**.
7. After the import finishes, open an imported project or thread to continue working.

</WorkflowSteps>

<div class="not-prose my-6 max-w-5xl">
  <CodexScreenshot
    alt="Select the setup and recent work to import into Codex"
    lightSrc="/images/codex/import/import-overview.png"
    darkSrc="/images/codex/import/import-overview.png"
    maxHeight="680px"
    variant="no-wallpaper"
    imageClass="rounded-xl"
  />
</div>

## How importing works

Codex checks both your user-level setup and your existing projects. User-level
setup comes from files on your machine. Project-level setup comes from files in
the repositories and folders you select.

When you import, Codex:

1. Detects supported setup and recent work.
2. Imports the items you select.
3. Leaves your existing agent setup unchanged.
4. Checks whether imported plugins or connections still need setup.
5. Shows a status card when follow-up is required.

## What Codex can import

| Imported item                       | Codex destination                      |
| ----------------------------------- | -------------------------------------- |
| Instruction files                   | [`AGENTS.md`](https://developers.openai.com/codex/guides/agents-md) |
| `settings.json`                     | [`config.toml`](https://developers.openai.com/codex/config-basic)   |
| Skills                              | [Codex skills](https://developers.openai.com/codex/skills)          |
| Plugins                             | Codex plugins                          |
| Existing project folders            | Codex projects using the same folders  |
| Chat sessions from the last 30 days | Codex threads                          |
| MCP server configuration            | [Codex MCP configuration](https://developers.openai.com/codex/mcp)  |
| Hooks                               | [Codex hooks](https://developers.openai.com/codex/hooks)            |
| Slash commands                      | [Codex skills](https://developers.openai.com/codex/skills)          |
| Subagents                           | [Codex agents](https://developers.openai.com/codex/subagents)       |

<div class="not-prose my-6 max-w-5xl">
  <CodexScreenshot
    alt="Choose the instructions, settings, skills, plugins, projects, and chats to import"
    lightSrc="/images/codex/import/import-instructions.png"
    darkSrc="/images/codex/import/import-instructions.png"
    maxHeight="680px"
    variant="no-wallpaper"
    imageClass="rounded-xl"
  />
</div>

## Finish setup after importing

When the import completes, Codex shows a status card in the lower-left corner.
If an imported plugin or connection still needs setup, the card calls it out.

When Codex flags an item that needs attention, select **Finish** and follow the
prompts to complete setup.

## What to review after importing

Review imported setup before you rely on it, especially:

- Tool restrictions or permissions in imported skills and agents.
- MCP server settings that use custom authentication, headers, environment
  variables, or transports. You may need to sign in again.
- Hooks whose behavior may differ in Codex.
- Plugins, marketplaces, or other setup that needs manual follow-up.
- Prompt templates or command-style prompts that depend on arguments, shell
  interpolation, or file-path placeholders.

## After you import

Once the import finishes, open one of your imported projects and continue from
there. If you are new to Codex, see the [quickstart](https://developers.openai.com/codex/quickstart) for the
rest of the setup flow.