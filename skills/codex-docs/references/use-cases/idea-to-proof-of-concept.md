---
name: Get from idea to proof of concept
tagline: Explore the concept visually with ImageGen and build a first version of
  your idea.
summary: Use Codex with ImageGen to turn a rough idea into a visual direction,
  implement the smallest useful prototype, and verify it in a browser.
skills:
  - token: $imagegen
    description: Generate visual concepts, UI mockups, asset directions, and
      variants with `gpt-image-2` before Codex implements the selected
      direction.
  - token: $playwright
    url: https://github.com/openai/skills/tree/main/skills/.curated/playwright-interactive
    description: Open the running app in a real browser, inspect the changed route,
      and verify each small UI adjustment before the next iteration.
  - token: build-web-apps
    url: https://github.com/openai/plugins/tree/main/plugins/build-web-apps
    description: Use the concept-first workflow for new web apps, dashboards, sites,
      and frontend prototypes, then verify the implementation in the browser.
  - token: game-studio
    url: https://github.com/openai/plugins/tree/main/plugins/game-studio
    description: Use Game Studio when the proof of concept is a browser game and
      needs a playable loop, asset workflow, HUD, engine choice, and playtest
      pass.
bestFor:
  - Early product ideas where a working prototype will answer more than a
    written plan.
  - Web apps, dashboards, and tools that need visual exploration before
    implementation.
  - Teams that want to validate a product idea with a working prototype before
    investing further.
starterPrompt:
  title: Build the Proof of Concept
  body: >-
    Use ImageGen to generate a high quality UI mockup for the following idea,
    then use the [Build Web Apps plugin/Game studio plugin] to implement it:


    [describe the idea, target user, and the main workflow]
  suggestedEffort: high
relatedLinks:
  - label: Image generation guide
    url: /api/docs/guides/image-generation
  - label: Codex plugins
    url: /codex/plugins
---

## Start with a visual direction

GPT Image 2 is great at generating high quality UI mockups. Instead of starting from scratch when exploring new ideas, you can leverage image generation to get a visual direction.

You can do this in two ways:

- Iterate on the visual direction using the ImageGen skill, and once you are satisfied with the proposed UI, you can ask Codex to build a prototype matching the visuals. In that case, make sure to copy the final image you want to implement in a new turn rather than continuing the conversation directly – Codex will do better when it can reference a user attachment.
- Use a plugin and simply describe your idea: the plugin will generate the visual direction for you and handle next steps.

## Leverage a plugin

If you do not need to iterate on the visual direction before starting the implementation, you can use a plugin and describe your idea.

Use the [Build Web Apps plugin](https://github.com/openai/plugins/tree/main/plugins/build-web-apps)
for web apps, dashboards, creative websites, and frontend-heavy tools. Its
workflow pushes Codex to generate a design first, match it in code, and use the
browser to compare the result back to the concept.

Use the [Game Studio plugin](https://github.com/openai/plugins/tree/main/plugins/game-studio)
when the proof of concept is a browser game. That path should define the player
verbs, first playable loop, engine, asset workflow, HUD, controls, and browser
test before expanding the game.

## Iteration workflow

A good proof of concept is scoped to an MVP that can be implemented quickly and validated with the team.
If you want to make sure the MVP is working as expected, you can use Playwright interactive to let Codex verify its work.

Once you have a first version working, you can iterate on it by asking for scoped changes in the same conversation: