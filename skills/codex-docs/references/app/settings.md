# Codex app settings

Use the settings panel to tune how the Codex app behaves, how it opens files,
and how it connects to tools. Open [**Settings**](codex://settings) from the app menu or
press <kbd>Cmd</kbd>+<kbd>,</kbd>.

## General

Choose where files open and how much command output appears in threads. You can also
require <kbd>Cmd</kbd>+<kbd>Enter</kbd> for multiline prompts or prevent sleep while a
thread runs.

## Notifications

Choose when turn completion notifications appear, and whether the app should prompt for
notification permissions.

## Agent configuration

Codex agents in the app inherit the same configuration as the IDE and CLI extension.
Use the in-app controls for common settings, or edit `config.toml` for advanced
options. See [Codex security](https://developers.openai.com/codex/agent-approvals-security) and
[config basics](https://developers.openai.com/codex/config-basic) for more detail.

## Appearance

In **Settings**, you can change the Codex app appearance by choosing a base theme,
adjusting accent, background, and foreground colors, and changing the UI and code
fonts. You can also share your custom theme with friends.

<CodexScreenshot
  alt="Codex app Appearance settings showing theme selection, color controls, and font options"
  lightSrc="/images/codex/app/theme-selection-light.webp"
  darkSrc="/images/codex/app/theme-selection-dark.webp"
  maxHeight="720px"
  class="mb-8"
/>

### Codex pets

<div class="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(15rem,50%)] md:items-start xl:grid-cols-[minmax(0,1fr)_minmax(16rem,30%)]">
  <div>
    Codex pets are optional animated companions for the app. In **Settings**,
    go to **Appearance** and choose **Pets** to select a built-in pet or
    refresh custom pets from your local Codex home. Type `/pet` in the
    composer, use **Wake Pet** or **Tuck Away Pet** in **Settings > Appearance**, or
    press <kbd>Cmd+K</kbd> or <kbd>Ctrl+K</kbd> and run the same commands to
    toggle the floating overlay.

    The overlay keeps active Codex work visible while you use other apps. It
    shows the active thread, reflects whether Codex is running, waiting for
    input, or ready for review, and pairs that state with a short progress
    prompt so you can glance at what changed without reopening the thread.

  </div>

  <CodexPetsDemo client:load />
</div>

To create your own pet, install the `hatch-pet` skill:

```text
$skill-installer hatch-pet
```

Reload skills from the command menu. Press <kbd>Cmd+K</kbd> or <kbd>Ctrl+K</kbd>,
choose **Force Reload Skills**, then ask the skill to create a pet:

```text
$hatch-pet create a new pet inspired by my recent projects
```

## Git

Use Git settings to standardize branch naming and choose whether Codex uses force
pushes.
You can also set prompts that Codex uses to generate commit messages and pull request descriptions.

## Integrations & MCP

Connect external tools via MCP (Model Context Protocol). Enable recommended servers or
add your own. If a server requires OAuth, the app starts the auth flow. These settings
also apply to the Codex CLI and IDE extension because the MCP configuration lives in
`config.toml`. See the [Model Context Protocol docs](https://developers.openai.com/codex/mcp) for details.

## Browser use

Use these settings to install or enable the bundled Browser plugin, set up the
[Codex Chrome extension](https://developers.openai.com/codex/app/chrome-extension), and manage allowlisted
and blocklisted websites. Codex asks before using a website unless you've
allowlisted it. Removing a site from the blocklist lets Codex ask again before
using it in the browser.

See [In-app browser](https://developers.openai.com/codex/app/browser) for browser preview, comment, and
browser use workflows.

## Computer Use

On macOS, check your Computer Use settings to review desktop-app access and related
preferences after setup. To revoke system-level access, update Screen Recording
or Accessibility permissions in macOS Privacy & Security settings. The feature
isn't available in the EEA, the United Kingdom, or Switzerland at launch.

## Personalization

Choose **Friendly**, **Pragmatic**, or **None** as your default personality. Use
**None** to disable personality instructions. You can update this at any time.

You can also add your own custom instructions. Editing custom instructions updates your
[personal instructions in `AGENTS.md`](https://developers.openai.com/codex/guides/agents-md).

## Context-aware suggestions

Use context-aware suggestions to surface follow-ups and tasks you may want to resume when you
start or return to Codex.

## Memories

Enable Memories, where available, to let Codex carry useful context from past
threads into future work. See [Memories](https://developers.openai.com/codex/memories) for setup, storage,
and per-thread controls.

## Archived threads

The **Archived threads** section lists archived chats with dates and project
context. Use **Unarchive** to restore a thread.