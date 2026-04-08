# Codex Models

## Recommended models

<div class="not-prose grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  <ModelDetails
    client:load
    name="gpt-5.4"
    slug="gpt-5.4"
    wallpaperUrl="/images/api/models/gpt-5.4.jpg"
    description="Flagship frontier model for professional work that brings the industry-leading coding capabilities of GPT-5.3-Codex together with stronger reasoning, tool use, and agentic workflows."
    data={{
      features: [
        {
          title: "Capability",
          value: "",
          icons: [
            "openai.SparklesFilled",
            "openai.SparklesFilled",
            "openai.SparklesFilled",
            "openai.SparklesFilled",
            "openai.SparklesFilled",
          ],
        },
        {
          title: "Speed",
          value: "",
          icons: ["openai.Flash", "openai.Flash", "openai.Flash"],
        },
        {
          title: "Codex CLI & SDK",
          value: true,
        },
        { title: "Codex app & IDE extension", value: true },
        {
          title: "Codex Cloud",
          value: false,
        },
        { title: "ChatGPT Credits", value: true },
        { title: "API Access", value: true },
      ],
    }}
  />

<ModelDetails
  client:load
  name="gpt-5.4-mini"
  slug="gpt-5.4-mini"
  wallpaperUrl="/images/api/models/gpt-5-mini.jpg"
  description="Fast, efficient mini model for responsive coding tasks and subagents."
  data={{
    features: [
      {
        title: "Capability",
        value: "",
        icons: [
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
        ],
      },
      {
        title: "Speed",
        value: "",
        icons: ["openai.Flash", "openai.Flash", "openai.Flash", "openai.Flash"],
      },
      {
        title: "Codex CLI & SDK",
        value: true,
      },
      { title: "Codex app & IDE extension", value: true },
      {
        title: "Codex Cloud",
        value: false,
      },
      { title: "ChatGPT Credits", value: true },
      { title: "API Access", value: true },
    ],
  }}
/>

<ModelDetails
  client:load
  name="gpt-5.3-codex"
  slug="gpt-5.3-codex"
  wallpaperUrl="/images/codex/codex-wallpaper-1.webp"
  description="Industry-leading coding model for complex software engineering. Its coding capabilities now also power GPT-5.4."
  data={{
    features: [
      {
        title: "Capability",
        value: "",
        icons: [
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
        ],
      },
      {
        title: "Speed",
        value: "",
        icons: ["openai.Flash", "openai.Flash", "openai.Flash"],
      },
      {
        title: "Codex CLI & SDK",
        value: true,
      },
      { title: "Codex app & IDE extension", value: true },
      {
        title: "Codex Cloud",
        value: true,
      },
      { title: "ChatGPT Credits", value: true },
      { title: "API Access", value: true },
    ],
  }}
/>

<ModelDetails
  client:load
  name="gpt-5.3-codex-spark"
  slug="gpt-5.3-codex-spark"
  wallpaperUrl="/images/codex/codex-wallpaper-2.webp"
  description="Text-only research preview model optimized for near-instant, real-time coding iteration. Available to ChatGPT Pro users."
  data={{
    features: [
      {
        title: "Capability",
        value: "",
        icons: [
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
        ],
      },
      {
        title: "Speed",
        value: "",
        icons: [
          "openai.Flash",
          "openai.Flash",
          "openai.Flash",
          "openai.Flash",
          "openai.Flash",
        ],
      },
      {
        title: "Codex CLI & SDK",
        value: true,
      },
      { title: "Codex app & IDE extension", value: true },
      {
        title: "Codex Cloud",
        value: false,
      },
      { title: "ChatGPT Credits", value: false },
      { title: "API Access", value: false },
    ],
  }}
/>

</div>

For most tasks in Codex, start with `gpt-5.4`. It combines strong coding,
  reasoning, native computer use, and broader professional workflows in one
  model. Use `gpt-5.4-mini` when you want a faster, lower-cost option for
  lighter coding tasks or subagents. The `gpt-5.3-codex-spark` model is
  available in research preview for ChatGPT Pro subscribers and is optimized for
  near-instant, real-time coding iteration.

## Alternative models

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-3">
<ModelDetails
  client:load
  name="gpt-5.2"
  slug="gpt-5.2"
  description="Previous general-purpose model for coding and agentic tasks, including hard debugging tasks that benefit from deeper deliberation."
  collapsible
  data={{
    features: [
      {
        title: "Capability",
        value: "",
        icons: [
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
          "openai.SparklesFilled",
        ],
      },
      {
        title: "Speed",
        value: "",
        icons: ["openai.Flash", "openai.Flash", "openai.Flash"],
      },
      {
        title: "Codex CLI & SDK",
        value: true,
      },
      { title: "Codex app & IDE extension", value: true },
      {
        title: "Codex Cloud",
        value: false,
      },
      { title: "ChatGPT Credits", value: true },
      { title: "API Access", value: true },
    ],
  }}
/>

  </div>

## Other models

When you sign in with ChatGPT, Codex works best with the models listed above.

You can also point Codex at any model and provider that supports either the [Chat Completions](https://platform.openai.com/docs/api-reference/chat) or [Responses APIs](https://platform.openai.com/docs/api-reference/responses) to fit your specific use case.

Support for the Chat Completions API is deprecated and will be removed in
  future releases of Codex.

## Configuring models

### Configure your default local model

The Codex CLI and IDE extension use the same `config.toml` [configuration file](https://developers.openai.com/codex/config-basic). To specify a model, add a `model` entry to your configuration file. If you don't specify a model, the Codex app, CLI, or IDE Extension defaults to a recommended model.

```toml
model = "gpt-5.4"
```

### Choosing a different local model temporarily

In the Codex CLI, you can use the `/model` command during an active thread to change the model. In the IDE extension, you can use the model selector below the input box to choose your model.

To start a new Codex CLI thread with a specific model or to specify the model for `codex exec` you can use the `--model`/`-m` flag:

```bash
codex -m gpt-5.4
```

### Choosing your model for cloud tasks

Currently, you can't change the default model for Codex cloud tasks.