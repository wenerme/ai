---
name: Create browser-based games
tagline: Define a game plan and let Codex build and test it in a live browser.
summary: Use Codex to turn a game brief into first a well-defined plan, and then
  a real browser-based game. Use imagegen to generate visual assets, and let
  Codex test the game in a live browser to iterate on controls and UI.
skills:
  - token: $playwright
    url: https://github.com/openai/skills/tree/main/skills/.curated/playwright-interactive
    description: Play the game in a live browser, inspect the current state, and
      iterate on controls, timing, and UI feel against the real build.
  - token: $imagegen
    description: Generate concept art, sprites, backgrounds, and UI assets, then
      keep the prompts reusable for later asset batches.
  - token: $openai-docs
    url: https://github.com/openai/skills/tree/main/skills/.curated/openai-docs
    description: Pull current official guidance before wiring OpenAI-powered
      features into the game.
bestFor:
  - Building a browser-based game from scratch
  - Game builds where controls, visuals, and deployment all need repeated
    testing and tuning
starterPrompt:
  title: Plan the Game Before You Build It
  body: >-
    Use $playwright-interactive, $imagegen, and $openai-docs to plan and build a
    browser game in this repo.

    Implement PLAN.md, and log your work under `.logs/`.
relatedLinks:
  - label: Custom instructions with AGENTS.md
    url: /codex/guides/agents-md
  - label: Codex skills
    url: /codex/skills
techStack:
  - need: Web game stack
    goodDefault: "[Next.js](https://nextjs.org/) with [Phaser](https://phaser.io/)
      or [PixiJS](https://pixijs.com/)"
    why: A practical default for browser-based game UI plus the rendering layer.
  - need: Backend stack
    goodDefault: "[Fastify](https://fastify.dev/), WebSockets,
      [Postgres](https://www.postgresql.org/), and [Redis](https://redis.io/)"
    why: A strong default when the game needs persistence, matchmaking,
      leaderboards, or pub/sub.
---

## Introduction

Building a game is one of the clearest examples of where Codex helps with more than code generation. A real game usually needs a written concept, a rendering layer, frontend shell work, backend state, asset production, and constant visual tuning

This use case works best when Codex starts by writing down exactly what the game should do, then iterates using Playwright interactive to test the game in a live browser.

## Start with the game plan

Before Codex scaffolds anything, ask it to create a `PLAN.md` that defines the game in concrete terms:

- the player goal
- the main loop
- inputs and controls
- win and fail states
- progression or difficulty
- visual direction
- the stack and hosting assumptions
- the milestone order

That plan matters because “build a game” is too vague on its own. Codex needs to know how to implement each part of the game, and often refer to the implementation details as it builds.

You can activate plan mode with the `/plan` slash command.
Take the output and save it to a `PLAN.md` file.

## Guide Codex's behavior with AGENTS.md

To make sure Codex follows the plan, verifies its work and uses the right tools, define an `AGENTS.md` that looks like this:

```text
# Game name

<Type of game>

Tech Stack:

- NextJS for frontend (hosted on Vercel)
- <insert technology> for rendering
- Fastify for backend, websockets (hosted on <hosting platform>)
- Postgres for database (hosted on <hosting platform>)
- Redis for caching and pub/sub (hosted on <hosting platform>)
- OpenAI for generative AI features

Tips:

- Use build and test commands to verify your work as soon as you complete a feature or task
- Use the PLAN.md file to guide your work when building new features
- Log your work under .logs (create new log files as you see fit) to record your thought process and decisions, and reference them when iterating on features
- Use playwright to test the visual output of your work, and iterate if it doesn't look right or fit the vibe
- Use imagegen to generate visual assets for your work, and every time you generate a collection of assets, save the prompts you used to be able to continue generating more of the same assets later (create files in .prompts)
- Use Context7 MCP to fetch <rendering framework> docs
```

This allows Codex to run independently for a long time, and use the relevant skills as needed.

## Leverage skills

Add the skills mentioned in the AGENTS.md file:

- Imagegen so Codex can generate visual assets for the game as needed
- Playwright interactive so Codex can test the game in a live browser
- OpenAI docs so Codex can fetch the latest OpenAI API documentation
- Optionally, you can add the Context7 MCP server to fetch the latest docs for the rendering framework

Learn more about how to add skills in the [skills documentation](https://developers.openai.com/codex/skills).

**Tip**: Ask Codex to save prompts for image generation in a file so that
  visual assets are all consistent. Give directions on the style of assets you
  want to generate, and let Codex come up with detailed reusable prompts.

## Let Codex work and iterate

Codex will generate a first version of the game based on the initial plan.

If you have a lot of image assets that need to be generated, this first version can take a while, sometimes several hours. Since Codex can test its work and try the game in a live browser, it can go on for a long time without any input.

The more defined the plan, the better the final output after the first iteration.

As you test it out, iterate as needed by providing screenshots, asking for gameplay changes or updates to visual assets, until you are happy with the result.