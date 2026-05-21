---
name: Upgrade your API integration
tagline: Upgrade your app to the latest OpenAI API models.
summary: Use Codex to update your existing OpenAI API integration to the latest
  recommended models and API features, while checking for regressions before you
  ship.
skills:
  - token: $openai-docs
    url: https://github.com/openai/skills/tree/main/skills/.curated/openai-docs
    description: Pull the current model, migration, and API guidance before Codex
      makes edits to your implementation.
bestFor:
  - Teams upgrading from older models or API surfaces
  - Repos that need behavior-preserving migrations with explicit validation
starterPrompt:
  title: Upgrade the Integration Safely
  body: >-
    Use $openai-docs to upgrade this OpenAI integration to the latest
    recommended model and API features.


    Specifically, look for the latest model and prompt guidance for this
    specific model.


    Requirements:

    - Start by inventorying the current models, endpoints, and tool assumptions
    in the repo.

    - Identify the smallest migration plan that gets us onto the latest
    supported path.

    - Preserve behavior unless a change is required by the new API or model.

    - Update prompts using the latest model prompt guidance. 

    - Call out any prompt, tool, or response-shape changes we need to review
    manually.
relatedLinks:
  - label: Latest model guide
    url: /api/docs/guides/latest-model
  - label: Prompt guidance
    url: /api/docs/guides/prompt-guidance
  - label: OpenAI Docs MCP
    url: /learn/docs-mcp
  - label: Evals guide
    url: /api/docs/guides/evals
---

## Introduction

As we release new models and API features, we recommend upgrading your integration to benefit from the latest improvements.
Changing from one model to another is often not as simple as just updating the model name.

There might be changes to the API–for example, for the GPT-5.4 model, we added a new `phase` parameter to the assistant message that is important to include in your integration–but most importantly, model behavior can be different and require changes to your existing prompts.

When migrating to a new model, you should make sure to not only make the necessary code changes, but also evaluate the impact on your workflows.

## Leverage the OpenAI Docs skill

All the specifics about the new API features and model behavior are documented in our docs, in the [latest model](https://developers.openai.com/api/docs/guides/latest-model) and [prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) guides.

The OpenAI Docs skill also includes [specific guidance](https://github.com/openai/codex/blob/6323f0104d17d211029faab149231ba787f7da37/codex-rs/skills/src/assets/samples/openai-docs/references/upgrading-to-gpt-5p4.md) as a concrete migration reference. For the current upgrade target, use the [latest model](https://developers.openai.com/api/docs/guides/latest-model) guide.

Codex now automatically comes with the OpenAI Docs skill, so make sure to mention it in your prompt to access all the latest documentation and guidance when building with the OpenAI API.

## Build a robust evals pipeline

Codex can automatically update your prompts based on the latest prompt guidance, but you should have a way to automate verifying your integration is working as expected.

Make sure to build an evals pipeline that you can run every time you make changes to your integration, to verify there is no regression in behavior.

This [cookbook guide](https://developers.openai.com/cookbook/examples/evaluation/building_resilient_prompts_using_an_evaluation_flywheel) covers in detail how to do this using our [Evals API](https://developers.openai.com/api/docs/guides/evals).