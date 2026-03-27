# Codex IDE extension

Codex is OpenAI's coding agent that can read, edit, and run code. It helps you build faster, squash bugs, and understand unfamiliar code. With the Codex VS Code extension, you can use Codex side by side in your IDE or delegate tasks to Codex Cloud.

ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex. Learn more about [what's included](https://developers.openai.com/codex/pricing).

<YouTubeEmbed
  title="Codex IDE extension overview"
  videoId="sd21Igx4HtA"
  class="max-w-md"
/>
<br />

## Extension setup

The Codex IDE extension works with VS Code forks like Cursor and Windsurf.

You can get the Codex extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt), or download it for your IDE:

- [Download for Visual Studio Code](vscode:extension/openai.chatgpt)
- [Download for Cursor](cursor:extension/openai.chatgpt)
- [Download for Windsurf](windsurf:extension/openai.chatgpt)
- [Download for Visual Studio Code Insiders](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)
- [Download for JetBrains IDEs](#jetbrains-ide-integration)

The Codex VS Code extension is available on macOS and Linux. Windows support
  is experimental. For the best Windows experience, use Codex in a WSL workspace
  and follow our <a href="/codex/windows">Windows setup guide</a>.

After you install it, you'll find Codex in your editor sidebar.
In VS Code, Codex opens in the right sidebar by default.
If you're using VS Code, restart the editor if you don't see Codex right away.

If you're using Cursor, the activity bar displays horizontally by default. Collapsed items can hide Codex, so you can pin it and reorganize the order of the extensions.

<div class="not-prose max-w-56 mr-auto">
  <img src="https://cdn.openai.com/devhub/docs/codex-extension.webp"
    alt="Codex extension"
    class="block h-auto w-full mx-0!"
  />
</div>

## JetBrains IDE integration

If you want to use Codex in JetBrains IDEs like Rider, IntelliJ, PyCharm, or WebStorm, install the JetBrains IDE integration. It supports signing in with ChatGPT, an API key, or a JetBrains AI subscription.

<CtaPillLink
  href="https://blog.jetbrains.com/ai/2026/01/codex-in-jetbrains-ides/"
  label="Install Codex for JetBrains IDEs"
  class="mt-6"
/>

### Move Codex to the right sidebar <a id="right-sidebar"></a>

In VS Code, Codex appears in the right sidebar automatically.
If you prefer it in the primary (left) sidebar, drag the Codex icon back to the left activity bar.

In VS Code forks like Cursor, you may need to move Codex to the right sidebar manually.
To do that, you may need to temporarily change the activity bar orientation first:

1. Open your editor settings and search for `activity bar` (in Workbench settings).
2. Change the orientation to `vertical`.
3. Restart your editor.

![codex-workbench-setting](https://cdn.openai.com/devhub/docs/codex-workbench-setting.webp)

Now drag the Codex icon to the right sidebar (for example, next to your Cursor chat). Codex appears as another tab in the sidebar.

After you move it, reset the activity bar orientation to `horizontal` to restore the default behavior.
If you change your mind later, you can drag Codex back to the primary (left) sidebar at any time.

### Sign in

After you install the extension, it prompts you to sign in with your ChatGPT account or API key. Your ChatGPT plan includes usage credits, so you can use Codex without extra setup. Learn more on the [pricing page](https://developers.openai.com/codex/pricing).

### Update the extension

The extension updates automatically, but you can also open the extension page in your IDE to check for updates.

### Set up keyboard shortcuts

Codex includes commands you can bind as keyboard shortcuts in your IDE settings (for example, toggle the Codex chat or add items to the Codex context).

To see all available commands and bind them as keyboard shortcuts, select the settings icon in the Codex chat and select **Keyboard shortcuts**.
You can also refer to the [Codex IDE extension commands](https://developers.openai.com/codex/ide/commands) page.
For a list of supported slash commands, see [Codex IDE extension slash commands](https://developers.openai.com/codex/ide/slash-commands).
If you're new to Codex, read the [best practices guide](https://developers.openai.com/codex/learn/best-practices).

---

## Work with the Codex IDE extension

<BentoContainer>
  <BentoContent href="/codex/ide/features#prompting-codex">

### Prompt with editor context

Use open files, selections, and `@file` references to get more relevant results with shorter prompts.

  </BentoContent>
  <BentoContent href="/codex/ide/features#switch-between-models">

### Switch models

Use the default model or switch to other models to leverage their respective strengths.

  </BentoContent>
  <BentoContent href="/codex/ide/features#adjust-reasoning-effort">

### Adjust reasoning effort

Choose `low`, `medium`, or `high` to trade off speed and depth based on the task.

  </BentoContent>

  <BentoContent href="/codex/ide/features#choose-an-approval-mode">

### Choose an approval mode

Switch between `Chat`, `Agent`, and `Agent (Full Access)` depending on how much autonomy you want Codex to have.

  </BentoContent>

  <BentoContent href="/codex/ide/features#cloud-delegation">

### Delegate to the cloud

Offload longer jobs to a cloud environment, then monitor progress and review results without leaving your IDE.

  </BentoContent>

  <BentoContent href="/codex/ide/features#cloud-task-follow-up">

### Follow up on cloud work

Preview cloud changes, ask for follow-ups, and apply the resulting diffs locally to test and finish.

  </BentoContent>

  <BentoContent href="/codex/ide/commands">

### IDE extension commands

Browse the full list of commands you can run from the command palette and bind to keyboard shortcuts.

  </BentoContent>
  <BentoContent href="/codex/ide/slash-commands">

### Slash commands

Use slash commands to control how Codex behaves and quickly change common settings from chat.

  </BentoContent>

  <BentoContent href="/codex/ide/settings">

### Extension settings

Tune Codex to your workflow with editor settings for models, approvals, and other defaults.

  </BentoContent>
</BentoContainer>