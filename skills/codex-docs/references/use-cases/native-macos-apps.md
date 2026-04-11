---
name: Build for macOS
tagline: Use Codex to scaffold, build, and debug native Mac apps with SwiftUI.
summary: Use Codex to build macOS SwiftUI apps, wire a shell-first build-and-run
  loop, and add desktop-native scene, window, AppKit, and signing workflows as
  the app matures.
skills:
  - token: build-macos-apps
    url: https://github.com/openai/plugins/tree/main/plugins/build-macos-apps
    description: Build and debug macOS apps with shell-first workflows, design
      desktop-native SwiftUI scenes and windows, bridge to AppKit where needed,
      and prepare signing and notarization paths.
bestFor:
  - Greenfield macOS SwiftUI apps where you want Codex to scaffold a
    desktop-native app shell and repeatable build script
  - Existing Mac apps where Codex needs to work on windows, menus, sidebars,
    settings, AppKit interop, or signing issues
  - Teams that want macOS work to stay shell-first while still respecting native
    desktop UX conventions
starterPrompt:
  title: Scaffold a Native Mac App
  body: >-
    Use the Build macOS Apps plugin to scaffold a starter macOS SwiftUI app and
    add a project-local `script/build_and_run.sh` entrypoint I can wire to a
    `Run` action.


    Constraints:

    - Stay shell-first. Prefer `xcodebuild` for Xcode projects and `swift build`
    for package-first apps.

    - Model Mac scenes explicitly with a main window plus `Settings`,
    `MenuBarExtra`, or utility windows only when they fit the product.

    - Prefer desktop-native sidebars, toolbars, menus, keyboard shortcuts, and
    system materials over iOS-style push navigation.

    - Use a narrow AppKit bridge only when SwiftUI cannot express the desktop
    behavior cleanly.

    - Keep one small validation loop for each change and tell me exactly which
    build, launch, or log commands you ran.


    Deliver:

    - the app scaffold or requested Mac feature slice

    - a reusable build-and-run script

    - the smallest validation steps you ran

    - any desktop-specific follow-up work you recommend
relatedLinks:
  - label: Model Context Protocol
    url: /codex/mcp
  - label: Agent skills
    url: /codex/skills
techStack:
  - need: UI framework
    goodDefault: "[SwiftUI](https://developer.apple.com/xcode/swiftui/)"
    why: A strong default for windows, sidebars, toolbars, settings, and
      scene-driven Mac app structure.
  - need: AppKit bridge
    goodDefault: "[AppKit](https://developer.apple.com/documentation/appkit)"
    why: Use small `NSViewRepresentable`, `NSViewControllerRepresentable`, or
      `NSWindow` bridges when SwiftUI stops short of a desktop behavior you
      need.
  - need: Build and packaging
    goodDefault: "`xcodebuild`, `swift build`, and [App Store Connect
      CLI](https://asccli.sh/)"
    why: Keep local builds, manual archives, script-based notarization, and App
      Store uploads in a repeatable terminal-first loop.
---

## Scaffold the app and build loop

For a new Mac app, ask Codex to choose the right scene model first: `WindowGroup`, `Window`, `Settings`, `MenuBarExtra`, or `DocumentGroup`. That keeps the app desktop-native from the first pass instead of growing from an iOS-style `ContentView`.

Keep the execution loop shell-first. For Xcode projects, use `xcodebuild`. For package-first apps, use `swift build` and a project-local `script/build_and_run.sh` wrapper that stops the old process, builds the app, launches the new artifact, and can optionally expose logs or telemetry.

If a pure SwiftPM app is a GUI app, bundle and launch it as a `.app` instead of running the raw executable directly. That avoids missing Dock, activation, and bundle-identity issues during local validation.

## Leverage skills

Add the [Build macOS Apps plugin](https://github.com/openai/plugins/tree/main/plugins/build-macos-apps) once the work gets more desktop-specific. It covers shell-first build and debug loops, SwiftPM app packaging, native SwiftUI scene and window patterns, AppKit interop, unified logging, test triage, and signing/notarization workflows.

To learn more about how to install and use plugins and skills, see the [Codex plugins documentation](https://developers.openai.com/codex/plugins) and [skills documentation](https://developers.openai.com/codex/skills).

## Build desktop-native UI

Prefer Mac conventions over iOS navigation patterns. Use `NavigationSplitView` for sidebar/detail layouts, explicit `Settings` scenes for preferences, toolbars and commands for discoverable actions, and menu bar extras for lightweight always-available utilities.

Use system materials, semantic colors, and standard controls first. Add custom window styling, drag regions, or Liquid Glass surfaces only when the product needs a distinct desktop surface.

If SwiftUI gets close but not all the way there, add the smallest possible AppKit bridge. Good examples are open/save panels, first-responder control, menu validation, drag-and-drop edges, and a wrapped `NSView` for one specialized control.

## Debug, test, and prepare for shipping

For runtime behavior, ask Codex to add a few `Logger` events around window opening, sidebar selection, menu commands, or background sync, then verify those events with `log stream` after the app launches.

For failing tests, have Codex run the smallest useful `xcodebuild test` or `swift test` scope first and classify whether the issue is compilation, an assertion failure, a crash, a flake, or an environment/setup problem.

When the work shifts from local iteration to distribution, ask Codex to prepare both a manual archive path in Xcode and a script-based archive and notarization path for repeatable shipping. Have it inspect the app bundle, entitlements, and hardened runtime with `codesign` and `plutil`, and use [App Store Connect CLI](https://asccli.sh/) when you want uploads to stay in the terminal too.

## Example prompt

## Practical tips

### Keep scenes explicit

Model the main window, settings window, utility windows, and menu bar extras as separate scene roots instead of hiding the whole app inside one giant view.

### Let system chrome do more of the work

Before creating custom sidebars, toolbars, or materials, check whether standard SwiftUI scene and window APIs already give you the Mac behavior you want.

### Treat AppKit as a narrow edge

Use `NSViewRepresentable`, `NSViewControllerRepresentable`, or a focused `NSWindow` helper for one missing desktop capability, but keep SwiftUI as the source of truth for selection and app state.

### Validate signing and notarization separately from local build success

A successful local launch does not prove the app is signed or notarization-ready. Keep a manual Xcode archive flow for one-off release checks, add a scripted archive and notarization flow for repeatable distribution, and run `codesign` and `plutil` checks when the task is about shipping, not just local iteration.