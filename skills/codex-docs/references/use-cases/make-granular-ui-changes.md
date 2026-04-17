---
name: Make granular UI changes
tagline: Use Codex-Spark for fast, focused UI iteration in an existing app.
summary: Use Codex to make one small UI adjustment at a time in an existing app,
  verify it in the browser, and keep iterating quickly from a popped-out chat
  window near your preview.
skills:
  - token: $playwright
    url: https://github.com/openai/skills/tree/main/skills/.curated/playwright-interactive
    description: Open the running app in a real browser, inspect the changed route,
      and verify each small UI adjustment before the next iteration.
bestFor:
  - Existing apps where the main structure is already built and you need small
    visual adjustments
  - Fast product or design review loops where each note should become one
    focused code change
  - UI polish passes that need browser verification but should not turn into a
    broad redesign
starterPrompt:
  title: Make One UI Change
  body: >-
    Make this UI change in the existing app:

    [describe the exact spacing, alignment, color, copy, responsive, or
    component-state adjustment]


    Constraints:

    - Change only the files needed for this UI adjustment.

    - Reuse existing components, tokens, icons, and layout patterns.

    - Keep behavior, data flow, and routing unchanged unless I explicitly ask
    for it.

    - Start or reuse the dev server, inspect the current UI in the browser, make
    the smallest patch, and verify the result visually.


    Stop after this one change and summarize the files changed plus the browser
    check you ran.
  suggestedModel: gpt-5.3-codex-spark
  suggestedEffort: low
relatedLinks:
  - label: Codex-Spark
    url: /codex/speed#codex-spark
  - label: Floating pop-out window
    url: /codex/app/features#floating-pop-out-window
---

## Introduction

When you have an existing app and want to iterate fast on the UI, you can use `gpt-5.3-codex-spark` to make small, focused changes to the UI.
Codex-Spark is our fastest model, optimized for near-instant, real-time coding iteration.

This works best as a tight loop: one visual note, one focused edit, one browser check, then the next note.

You can use the [Codex Spark model](https://developers.openai.com/codex/models#gpt-53-codex-spark) for this
  task. It is available on Pro plans.

## Pick your model

For fast UI iteration, start with `gpt-5.3-codex-spark` if you have access to it. It is less capable that our general-purpose models, but is designed for real-time coding iteration. If you don't have access to it, use our latest model with `medium` or `low` reasoning effort.

That tradeoff is useful for granular UI work. You usually do not need the deepest model to move a button, tune a breakpoint, or adjust a component state. You need a model that responds quickly, understands the local code, edits the right file, and can repeat the loop without making the iteration feel heavy.

## Development flow

1. Open the existing app and get the relevant route or component visible.
2. Pop out the active Codex conversation into a [floating window](https://developers.openai.com/codex/app/features#floating-pop-out-window) and keep it near your browser, editor, or design preview while you work.
3. Give Codex one specific UI change at a time. Include the route, viewport, current screenshot, target screenshot, or exact product note if you have it.
4. Ask Codex to inspect the current implementation, make the smallest defensible edit, and preserve the app's existing components, tokens, layout primitives, and data flow.
5. Review the result, then send the next small adjustment in the same thread.

## Write small prompts

Granular UI prompts should be direct and narrow. A good prompt names the surface, the target change, and the validation you expect.

If the result is close but not quite right, keep the follow-up equally specific:

## When to slow down

Do not keep using the fast loop if the task stops being granular. Switch to a stronger model and a more deliberate prompt when the change needs broad refactoring, a new design system primitive, non-trivial accessibility behavior, or a product decision that affects more than one screen.

Fast UI iteration works best when Codex is adjusting an already-understood surface, not redesigning the app from scratch.