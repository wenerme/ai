# Codex app

The Codex app is a focused desktop experience for working on Codex threads in parallel, with built-in worktree support, automations, and Git functionality.

ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex. Learn more about [what's included](https://developers.openai.com/codex/pricing).

<PlatformSpecificContent>
  <CodexScreenshot
    slot="windows"
    alt="Codex app for Windows showing a project sidebar, active thread, and review pane"
    lightSrc="/images/codex/windows/codex-windows-light.webp"
    darkSrc="/images/codex/windows/codex-windows-dark.webp"
    variant="no-wallpaper"
    maxHeight="300px"
  />
  <CodexScreenshot
    alt="Codex app window with a project sidebar, active thread, and review pane"
    lightSrc="/images/codex/app/app-screenshot-light.webp"
    darkSrc="/images/codex/app/app-screenshot-dark.webp"
    variant="no-wallpaper"
    maxHeight="300px"
  />
</PlatformSpecificContent>

## Getting started

The Codex app is available on macOS and Windows.

Most Codex app features are available on both platforms. Platform-specific
exceptions are noted in the relevant docs.

<WorkflowSteps variant="headings">
1. Download and install the Codex app

    Download the Codex app for macOS or Windows. Choose the Intel build if you're using an Intel-based Mac.

    <CodexAppDownloadCta client:load className="mb-4" />

    <div class="text-sm">
      [Get notified for Linux](https://openai.com/form/codex-app/)
    </div>

2. Open Codex and sign in

   Once you downloaded and installed the Codex app, open it and sign in with your ChatGPT account or an OpenAI API key.

   If you sign in with an OpenAI API key, some functionality such as [cloud threads](https://developers.openai.com/codex/prompting#threads) might not be available.

3. Select a project

   Choose a project folder that you want Codex to work in.

If you used the Codex app, CLI, or IDE Extension before you'll see past projects that you worked on.

4. Send your first message

   After choosing the project, make sure **Local** is selected to have Codex work on your machine and send your first message to Codex.

   You can ask Codex anything about the project or your computer in general. Here are some examples:

   <ExampleGallery>
     <ExampleTask
       client:load
       id="intro"
       prompt="Tell me about this project"
       iconName="brain"
     />
     <ExampleTask
       client:load
       id="snake-game"
       shortDescription="Build a classic Snake game in this repo."
       prompt={[
         "Build a classic Snake game in this repo.",
         "",
         "Scope & constraints:",
         "- Implement ONLY the classic Snake loop: grid movement, growing snake, food spawn, score, game-over, restart.",
         "- Reuse existing project tooling/frameworks; do NOT add new dependencies unless truly required.",
         "- Keep UI minimal and consistent with the repo’s existing styles (no new design systems, no extra animations).",
         "",
         "Implementation plan:",
         "1) Inspect the repo to find the right place to add a small interactive game (existing pages/routes/components).",
         "2) Implement game state (snake positions, direction, food, score, tick timer) with deterministic, testable logic.",
         "3) Render: simple grid + snake + food; support keyboard controls (arrow keys/WASD) and on-screen controls if mobile is present in the repo.",
         "4) Add basic tests for the core game logic (movement, collisions, growth, food placement) if the repo has a test runner.",
         "",
         "Deliverables:",
         "- A small set of files/changes with clear names.",
         "- Short run instructions (how to start dev server + where to navigate).",
         "- A brief checklist of what to manually verify (controls, pause/restart, boundaries).",
       ].join("\n")}
       iconName="gamepad"
     />
     <ExampleTask
       client:load
       id="fix-bugs"
       shortDescription="Find and fix bugs in my codebase with minimal, high-confidence changes."
       prompt={[
         "Find and fix bugs in my codebase with minimal, high-confidence changes.",
         "",
         "Method (grounded + disciplined):",
         "1) Reproduce: run tests/lint/build (or follow the existing repo scripts). If I provided an error, reproduce that exact failure.",
         "2) Localize: identify the smallest set of files/lines involved (stack traces, failing tests, logs).",
         "3) Fix: implement the minimal change that resolves the issue without refactors or unrelated cleanup.",
         "4) Prove: add/update a focused test (or a tight repro) that fails before and passes after.",
         "",
         "Constraints:",
         "- Do NOT invent errors or pretend to run commands you cannot run.",
         "- No scope drift: no new features, no UI embellishments, no style overhauls.",
         "- If information is missing, state what you can confirm from the repo and what remains unknown.",
         "",
         "Output:",
         "- Summary (3–6 sentences max): what was broken, why, and the fix.",
         "- Then ≤5 bullets: What changed, Where (paths), Evidence (tests/logs), Risks, Next steps.",
       ].join("\n")}
       iconName="search"
     />
   </ExampleGallery>

   If you need more inspiration, explore [Codex use cases](https://developers.openai.com/codex/use-cases).
   If you're new to Codex, read the [best practices guide](https://developers.openai.com/codex/learn/best-practices).

</WorkflowSteps>

---

## Work with the Codex app

<BentoContainer class="mt-6">
  <BentoContent href="/codex/app/features#multitask-across-projects">

### Multitask across projects

Run project threads side by side and switch between them quickly.

  </BentoContent>
  <BentoContent href="/codex/app/worktrees">

### Worktrees

Keep parallel code changes isolated with built-in Git worktree support.

  </BentoContent>
  <BentoContent href="/codex/app/computer-use">

### Computer use

Let Codex use macOS apps for GUI tasks, browser flows, and native app testing.

  </BentoContent>
  <BentoContent href="/codex/app/review">

### Review and ship changes

Inspect diffs, address PR feedback, stage files, commit, and push.

  </BentoContent>
  <BentoContent href="/codex/app/features#integrated-terminal">

### Terminal and actions

Run commands in each thread and launch repeatable project actions.

  </BentoContent>
  <BentoContent href="/codex/app/browser">

### In-app browser

Open rendered pages, leave comments, or let Codex operate local browser flows.

  </BentoContent>
  <BentoContent href="/codex/app/chrome-extension">

### Chrome extension

Add the Chrome plugin so Codex can use Chrome for signed-in browser tasks while you manage website approvals.

  </BentoContent>
  <BentoContent href="/codex/app/features#image-generation">

### Image generation

Generate or edit images in a thread while you work on the surrounding code and assets.

  </BentoContent>
  <BentoContent href="/codex/app/automations">

### Automations

Schedule recurring tasks, or wake up the same thread for ongoing checks.

  </BentoContent>
  <BentoContent href="/codex/app/features#skills-support">

### Skills

Reuse instructions and workflows across the app, CLI, and IDE Extension.

  </BentoContent>
  <BentoContent href="/codex/app/features#richer-outputs-and-artifacts">

### Sidebar and artifacts

Follow plans, sources, task summaries, and generated file previews.

  </BentoContent>
  <BentoContent href="/codex/plugins">

### Plugins

Connect apps, skills, and MCP servers to extend what Codex can do.

  </BentoContent>
  <BentoContent href="/codex/app/features#sync-with-the-ide-extension">

### IDE Extension sync

Share Auto Context and active threads across app and IDE sessions.

  </BentoContent>
</BentoContainer>

---

Need help? Visit the [troubleshooting guide](https://developers.openai.com/codex/app/troubleshooting).