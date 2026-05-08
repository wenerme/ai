---
name: Turn user stories into UI mocks
tagline: Convert product feedback, issue threads, and design context into
  mockups your team can react to and implement.
summary: Use Codex to gather product feedback from Slack, Linear, Google Drive,
  normalize it into user stories and constraints, then generate UI mockups with
  ImageGen. When the direction is chosen, turn the mock into a working
  prototype.
skills:
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Search approved feedback channels and threads for user stories,
      pain points, quotes, and open questions.
  - token: linear
    url: https://github.com/openai/plugins/tree/main/plugins/linear
    description: Pull feature requests, bug reports, labels, priorities, and project
      context into the mock brief.
  - token: google-drive
    url: https://github.com/openai/plugins/tree/main/plugins/google-drive
    description: Read research notes, call summaries, docs, sheets, and slides that
      contain product feedback or design requirements.
  - token: figma
    url: https://github.com/openai/plugins/tree/main/plugins/figma
    description: Fetch design context, screenshots, and design-system references so
      mocks do not drift away from the product's visual language.
  - token: $imagegen
    description: Generate UI mockups, variations, and visual truth from the
      synthesized stories and design constraints.
  - token: build-web-apps
    url: https://github.com/openai/plugins/tree/main/plugins/build-web-apps
    description: Turn the selected mock into a working web prototype and verify the
      implementation against the mock.
bestFor:
  - Product teams turning scattered feedback into a visual direction for a
    feature.
  - Design and engineering teams that want mockups grounded in source material
    before building.
  - Teams who want to iterate fast based on user feedback.
starterPrompt:
  title: Create Mocks from User Stories
  body: >-
    Turn this [user story/set of user feedbacks] into a UI mock for a feature
    that would solve the problem, using these sources as context:

    - @slack [channels or thread links]

    - @linear [issue links, project, team, or view]

    - @google-drive [research notes, survey export, doc, sheet, or slide deck]


    Do that while respecting the current design system and existing UI [provide
    Figma file or screenshot as reference].
  suggestedEffort: medium
relatedLinks:
  - label: Codex plugins
    url: /codex/plugins
---

## Introduction

Product teams often collect feedback from various sources, such as Slack threads, Linear issues, Google Drive docs or sheets, or customer-call notes. Sometimes, they have clear user stories illustrating a problem they want to solve, and sometimes, the context lives in those sources.

Codex can gather this context and turn it into a UI mock for a feature that would solve the problem, and once validated, can be implemented into the product.

## Generate visual truth

If you have a clear user story, you can start with that. If not, you can have a discussion with Codex first, gathering context from different sources and synthesizing it into a user story.

Then, you can ask Codex to use ImageGen to create a few mock directions. The mocks should preserve the product's information architecture and design-system constraints.

If helpful, you can provide screenshots of the current UI or a Figma file as reference.

Do this until you are satisfied with the mock. The more scoped the changes are, the more likely Codex is to generate a mock that can be implemented directly.

## Move from mock to prototype

Use the final mock image that you want Codex to implement. Re-attach this image in a new turn rather than continuing the conversation directly.
You can then ask Codex to implement the mock – optionally using the [Build Web Apps plugin](https://developers.openai.com/codex/plugins/build-web-apps) if you're building a web app – to turn it into a working prototype: