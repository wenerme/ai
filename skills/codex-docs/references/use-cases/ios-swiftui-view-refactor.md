---
name: Refactor SwiftUI screens
tagline: Use Codex to split an oversized SwiftUI screen into small subviews
  without changing behavior or layout.
summary: Use Codex and the Build iOS Apps plugin to break a long SwiftUI view
  into dedicated section views, move side effects out of `body`, stabilize state
  and Observation usage, and keep the refactor MV-first instead of introducing
  unnecessary view models.
skills:
  - token: build-ios-apps
    url: https://github.com/openai/plugins/tree/main/plugins/build-ios-apps
    description: Use the SwiftUI view refactor skill to extract dedicated subviews,
      preserve stable data flow, simplify Observation usage, and keep behavior
      intact while Codex edits large SwiftUI screens.
bestFor:
  - Giant SwiftUI files where `body` mixes layout, branching, async work, and
    inline actions in one hard-to-review screen
  - Existing iOS features that should stay visually and behaviorally identical
    while the internals become easier to maintain
  - Screens with computed `some View` fragments, optional view models, or state
    plumbing that should be simplified into explicit subview inputs and
    callbacks
starterPrompt:
  title: Refactor One Large Screen Without Changing Behavior
  body: >-
    Use the Build iOS Apps plugin and its SwiftUI view refactor skill to clean
    up [NameOfScreen.swift] without changing what the screen does or how it
    looks.


    Constraints:

    - Preserve behavior, layout, navigation, and business logic unless you find
    a bug that must be called out separately.

    - Default to MV, not MVVM. Prefer `@State`, `@Environment`, `@Query`,
    `.task`, `.task(id:)`, and `onChange` before introducing a new view model,
    and only keep a view model if this feature clearly needs one.

    - Reorder the view so stored properties, computed state, `init`, `body`,
    view helpers, and helper methods are easy to scan top to bottom.

    - Extract meaningful sections into dedicated `View` types with small
    explicit inputs, `@Binding`s, and callbacks. Do not replace one giant `body`
    with a pile of large computed `some View` properties.

    - Move non-trivial button actions and side effects out of `body` into small
    methods, and move real business logic into services or models.

    - Keep the root view tree stable. Avoid top-level `if/else` branches that
    swap entirely different screens when localized conditional sections or
    modifiers are enough.

    - Fix Observation ownership while refactoring: use `@State` for root
    `@Observable` models on iOS 17+, and avoid optional or delayed-initialized
    view models unless the UI genuinely needs that state shape.

    - After each extraction, run the smallest useful build or test check that
    proves the screen still behaves the same.


    Deliver:

    - the refactored screen and any extracted subviews

    - a short explanation of the new subview boundaries and data flow

    - any places where you intentionally kept a view model and why

    - the validation checks you ran to prove behavior stayed intact
relatedLinks:
  - label: Build iOS Apps plugin
    url: https://github.com/openai/plugins/tree/main/plugins/build-ios-apps
  - label: Agent skills
    url: /codex/skills
techStack:
  - need: UI architecture
    goodDefault: SwiftUI with an MV-first split across `@State`, `@Environment`, and
      small dedicated `View` types
    why: Large screens usually get easier to maintain when Codex simplifies the view
      tree and state flow before introducing another view model layer.
  - need: Refactor workflow
    goodDefault: "[Build iOS Apps
      plugin](https://github.com/openai/plugins/tree/main/plugins/build-ios-app\
      s)"
    why: The plugin's SwiftUI view refactor skill gives Codex clear rules for
      extraction, Observation, and side-effect cleanup while preserving
      behavior.
  - need: Validation
    goodDefault: "`xcodebuild`, previews, and focused UI checks"
    why: Small build or simulator checks after each extraction make it easier to
      trust a behavior-preserving refactor than a one-shot rewrite.
---

## Refactor one screen without changing what it does

This use case is for the moment when a SwiftUI file has grown into one giant screen and every small edit feels risky. The goal is not to redesign the feature or invent a new architecture. Ask Codex to preserve behavior and layout, then split the screen into small subviews with explicit data flow so the next change becomes easier to review.

Use the [Build iOS Apps plugin](https://github.com/openai/plugins/tree/main/plugins/build-ios-apps) for this kind of cleanup. Its SwiftUI view refactor skill is opinionated in a useful way: default to MV over MVVM, keep business logic in services or models, use local view state and environment dependencies first, and only keep a view model when the feature clearly needs one.

## What to ask Codex to do

Start by naming one concrete screen file and asking Codex to preserve behavior while improving structure. These are the refactor rules worth putting directly in your prompt:

- Reorder the file so environment dependencies, stored properties, computed non-view state, `init`, `body`, view helpers, and helper methods are easy to scan top to bottom.
- Extract meaningful sections into dedicated `View` types with small explicit inputs, `@Binding`s, and callbacks.
- Keep computed `some View` helpers rare and small. Do not rebuild one giant screen as a long list of private computed view fragments.
- Move non-trivial button actions and side effects out of `body`, and move real business logic into services or models.
- Keep the root view tree stable. Prefer localized conditionals in sections or modifiers over top-level `if/else` branches that swap whole screens.
- Fix Observation ownership as you go. For root `@Observable` models on iOS 17+, the owning view should store them in `@State`; use legacy observable wrappers only when your deployment target requires that.

## Ask for a small validation loop

Behavior-preserving refactors should come with proof. Ask Codex to run the smallest build, preview, test, or simulator check that exercises the screen after each meaningful extraction, then summarize what changed structurally and what stayed intentionally the same.

## Practical tips

### Split first, then debate architecture

If a screen is too large, ask Codex to extract section views before introducing a new abstraction layer. A shorter, more explicit view tree often removes the pressure to add a view model at all.

### Pass the smallest possible interface into each subview

Prefer `let` values, `@Binding`s, and one-purpose callbacks over handing every child view the entire parent model. That makes each extracted section easier to preview and harder to accidentally couple back to the whole screen.

### Ask Codex to call out intentional non-changes

For a safe refactor, it helps when Codex explicitly lists what it did not change: business rules, navigation behavior, persistence, analytics semantics, and user-visible layout. That makes review much faster.