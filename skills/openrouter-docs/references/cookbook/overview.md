> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Using the OpenRouter Cookbook

The OpenRouter Cookbook is a collection of practical recipes for adding specific
OpenRouter capabilities to an application.

## Available cookbooks

| Cookbook         | Use it for                                                                                            | Start here                                                                            | Agent skill                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Video Generation | Choose a model, submit video jobs, use image inputs, send provider options, and handle async results. | [Choose a Video Generation Model](/docs/cookbook/video-generation/choose-video-model) | [openrouter-video](https://github.com/OpenRouterTeam/skills/tree/main/skills/openrouter-video): `gh skill install OpenRouterTeam/skills openrouter-video` |

## How to use a recipe

Each recipe is meant to help you get one real job done: choose a model, submit a
request, handle an async result, configure a provider option, wire up a webhook,
or add another concrete behavior to your app.

### Use a recipe when you know the result you want

Cookbook pages work best when you already know the capability you want to add.
Start with the page whose title matches the job, then adapt the sequence to the
part of your app that owns that workflow.

For example, use a Cookbook recipe when you want to:

* add a new OpenRouter capability to an existing product
* give a coding agent a clear implementation path
* avoid guessing which API fields, model capabilities, or validation checks
  matter for a task
* see what successful output should look like before you wire the path into
  production

### Hand the page to an agent

Cookbook pages are written so you can copy the page URL or page contents into a
coding agent session and ask it to implement the capability in your codebase.

Give the agent a short description of what you are building, then point it at
the relevant Cookbook page. The page should provide the implementation sequence,
source links, examples, and checks the agent needs to adapt the recipe to your
app.

If a page includes a custom copy prompt, use it when you need a guided decision
process. Model selection is a good example: the agent should ask what you want
to make, infer requirements, fetch current model metadata, rank options, and
return a recommendation.

### Treat snippets as implementation shapes

Code snippets in the Cookbook are examples of the shape your implementation
should take. They are not meant to be copied blindly into a blank project.

Adapt them to your app's framework, SDK, server route, queue, worker, storage
layer, logging, and error handling. Keep the sequence intact, but let the code
fit the system you are building in.

### Use Reference for exact fields

Cookbook pages intentionally link to source-of-truth reference pages instead of
duplicating every parameter, enum value, schema, SDK method, or provider field.

When you need exact request fields, response shapes, supported model metadata,
or SDK method names, follow the reference links in the recipe. The Cookbook
shows how to apply those details to a task; Reference is where the exact details
live.

### Verify the path before shipping

Every Cookbook recipe should end with a way to check the work. Use those checks
before you call the implementation complete.

For paid or async workflows, keep the stages separate:

* preview the request before submitting it
* confirm model or provider capabilities before using them
* submit only when the request is ready
* distinguish the initial submit response from the final completed result
* capture real outputs when you validate the path

If you are asking an agent to implement a recipe, ask it to report what it
verified, what it could not verify, and where it had to make assumptions.