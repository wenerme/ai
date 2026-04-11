---
name: Debug in iOS simulator
tagline: Use Codex and XcodeBuildMCP to drive your app in iOS Simulator, capture
  evidence, and iterate toward a fix.
summary: Use Codex to discover the right Xcode scheme and simulator, launch the
  app, inspect the UI tree, tap, type, swipe, capture screenshots and logs,
  attach LLDB when needed, and turn a vague bug report into a small verified
  fix.
skills:
  - token: build-ios-apps
    url: https://github.com/openai/plugins/tree/main/plugins/build-ios-apps
    description: Use the iOS debugger agent to build, launch, inspect, and drive an
      app on a simulator with XcodeBuildMCP, then capture logs, screenshots, and
      stack traces while Codex narrows the bug.
bestFor:
  - UI bugs that only show up after a specific tap, scroll, or form entry path
    in Simulator
  - Crashes, hangs, or broken navigation where Codex needs logs, screenshots,
    view hierarchy state, and a debugger backtrace before editing code
  - Teams that want Codex to own the reproduce-fix-verify loop instead of asking
    a human to manually click through every state
starterPrompt:
  title: Reproduce, Diagnose, and Fix One Simulator Bug
  body: >-
    Use the Build iOS Apps plugin and XcodeBuildMCP to reproduce this bug
    directly in Simulator, diagnose the root cause, and implement a small fix.


    Bug report:

    [Describe the expected behavior, the actual bug, and any known screen or
    account setup.]


    Constraints:

    - First check whether a project, scheme, and simulator are already selected.
    If not, discover the right Xcode project or workspace, pick the app scheme,
    choose a simulator, and reuse that setup for the rest of the session.

    - Build and launch the app in Simulator, then confirm the right screen is
    visible with a UI snapshot or screenshot before you start interacting with
    it.

    - Drive the exact reproduction path yourself by tapping, typing, scrolling,
    and swiping in the simulator. Prefer accessibility labels or IDs over raw
    coordinates, and re-read the UI hierarchy before the next action when the
    layout changes.

    - Capture evidence while you debug: screenshots for visual state, simulator
    logs around the failure, and LLDB stack frames or variables if the bug looks
    like a crash or hang.

    - If the simulator is not already booted, boot one and tell me which device
    and OS you chose. If credentials or a special fixture are required, pause
    and ask only for that missing input.

    - Make the smallest code change that addresses the bug, then rerun the
    simulator flow and tell me exactly how you verified the fix.


    Deliver:

    - the reproduction steps Codex executed

    - the key screenshots, logs, or stack details that explained the bug

    - the code fix and why it works

    - the simulator and scheme used for final verification
relatedLinks:
  - label: Build iOS Apps plugin
    url: https://github.com/openai/plugins/tree/main/plugins/build-ios-apps
  - label: Model Context Protocol
    url: /codex/mcp
  - label: Agent skills
    url: /codex/skills
techStack:
  - need: Simulator automation
    goodDefault: "[XcodeBuildMCP](https://www.xcodebuildmcp.com/)"
    why: The current tool surface covers simulator setup, build and launch, UI
      snapshots, taps, typing, gestures, screenshots, log capture, and debugger
      attachment.
  - need: Agent workflow
    goodDefault: "[Build iOS Apps
      plugin](https://github.com/openai/plugins/tree/main/plugins/build-ios-app\
      s)"
    why: The plugin's iOS debugger agent gives Codex a clear simulator-first loop
      for reproducing a bug, gathering evidence, and validating the fix after
      each change.
  - need: App observability
    goodDefault: "`Logger`, `OSLog`, LLDB, and Simulator screenshots"
    why: Codex can use logs and debugger state to explain what broke, then save
      screenshots to prove the exact UI state before and after the fix.
---

## Give Codex the whole simulator loop

This use case works best when Codex owns the full loop: choose the right app target, launch the app in Simulator, inspect the current screen, perform the reproduction steps, gather logs and screenshots, inspect a stack trace if needed, patch the code, and rerun the same path to prove the bug is gone.

Use the [Build iOS Apps plugin](https://github.com/openai/plugins/tree/main/plugins/build-ios-apps) when you want that loop to stay agentic. Its iOS debugger workflow is built around XcodeBuildMCP, which means Codex can interact with a booted simulator and gather the same evidence a human would normally collect by hand.

When XcodeBuildMCP is configured with simulator automation, UI automation, debugging, and logging workflows, Codex can own the full reproduce-debug-verify loop. If Codex has not picked a project, scheme, and simulator yet, ask it to discover those first and reuse that setup for the rest of the session.

## Leverage what XcodeBuildMCP can do

These are the practical capability groups to prompt Codex to use:

- Project and simulator discovery: check whether Codex already knows which app target and simulator to use, discover the Xcode project or workspace, enumerate schemes, find or boot a simulator, and keep that setup stable for future build/run steps.
- Build and launch control: build the active app target, install and launch the simulator build, relaunch with log capture when needed, and resolve the app bundle id if Codex needs to inspect app-specific runtime logs.
- UI inspection and interaction: read the on-screen accessibility hierarchy, take screenshots, tap controls, type into fields, scroll through lists, and perform edge swipes or other simulator gestures.
- Logs and debugger state: stream simulator logs, attach LLDB to the running app, set breakpoints, inspect stack frames and local variables, and run debugger commands when a crash or hang needs deeper inspection.

The key habit is to ask Codex to inspect the view tree before it taps. XcodeBuildMCP exposes the accessibility hierarchy plus coordinates, so Codex can prefer stable labels or element IDs instead of guessing raw screen positions.

## Turn a vague bug into a reproducible script

The iOS debugger skill is most effective when your prompt gives one concrete bug and one expected outcome, then lets Codex drive the app and collect evidence autonomously. If a login, deep link, or test fixture is required, say that once and ask Codex to pause only when that missing input blocks progress.

## Practical tips

### Ask for evidence, not just a fix

Request the exact simulator, scheme, screenshots, log snippets, and stack details that Codex used to explain the bug. That makes the final patch much easier to review than "I think this should fix it."

### Prefer accessibility labels over coordinates

If Codex has to tap by coordinates because a control has no stable label or accessibility identifier, ask it to call that out. That is often a signal that the bug fix should include a small UI testability improvement too.

### Keep one bug per run

A simulator-driven debugging loop is powerful, but it is still easier to trust when one prompt targets one failure mode. Ask Codex to finish one reproduce-fix-verify cycle before expanding to adjacent issues.