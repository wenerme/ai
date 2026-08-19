> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Render

> Using OpenRouter with Render Workflows

OpenRouter handles model access and routing. [Render Workflows](https://render.com/docs/workflows?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter) handles the execution around those calls: queuing, retries, and parallel task runs.

This guide deploys a small prompt batch. One task receives a list of prompts and fans out one retriable task run per prompt. Each run calls OpenRouter's Auto Router and returns both the answer and the concrete model OpenRouter selected.

```text theme={null}
prompts -> Render Workflow fan-out -> OpenRouter Auto Router -> answers + model IDs
```

Each prompt becomes its own task run. Render provisions compute for those runs on demand and deprovisions it when they finish, so the fan-out does not require a pre-provisioned worker pool.

<Note>
  Render Workflow tasks do not expose HTTP ports. In a user-facing application, a Render Web Service receives the request and triggers the workflow. This guide starts with the workflow itself so you can deploy and verify the model pipeline first.
</Note>

## Prerequisites

You will need:

* An [OpenRouter API key](https://openrouter.ai/settings/keys)
* A [Render account](https://dashboard.render.com/register?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter)
* The [Render CLI](https://render.com/docs/cli?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter) installed and authenticated
* A GitHub, GitLab, or Bitbucket repository you can push to

## 1. Create a workflow project

Use `render workflows init` to scaffold Render's Hello World starter, then add the official OpenRouter Client SDK.

<Note>
  `@openrouter/sdk` is ESM-only. Use `"type": "module"` in `package.json` (or another ESM-compatible setup). CommonJS `require()` is not supported.
</Note>

<CodeGroup>
  ```bash title="Node" lines theme={null}
  render workflows init \
    --confirm \
    --language node \
    --template hello-world \
    --dir openrouter-workflow

  cd openrouter-workflow
  npm install @openrouter/sdk@^1.1.22
  ```

  ```bash title="Python" lines theme={null}
  render workflows init \
    --confirm \
    --language python \
    --template hello-world \
    --dir openrouter-workflow

  cd openrouter-workflow
  printf '\nopenrouter>=1.1.16,<2\n' >> requirements.txt
  .venv/bin/pip install -r requirements.txt
  ```
</CodeGroup>

The scaffold includes the Render SDK, creates a `.env.example` file and Git repository, and prints commands for local development and deployment.

## 2. Add your OpenRouter key

Copy the scaffolded environment file:

```bash theme={null}
cp .env.example .env
```

Replace its contents with:

```bash theme={null}
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openrouter/auto
OPENROUTER_APP_TITLE="Render Workflows Example"
```

The scaffold excludes `.env` from Git. Do not commit API keys. The Render CLI loads `.env` automatically during local Workflow development.

If a public application will trigger this workflow, also set `APP_URL` to that application's URL. OpenRouter uses `APP_URL` and `OPENROUTER_APP_TITLE` for [app attribution](/docs/app-attribution).

<Note>
  Use `openrouter/auto` for OpenRouter's Auto Router. The `openrouter/auto-beta` slug is the early-access track where new routing behavior lands first; see [Auto Router](/docs/guides/routing/routers/auto-router).
</Note>

## 3. Define the workflow

Replace the generated task file with the following code.

The inner task makes one OpenRouter request and retries failures. The outer task fans out across every prompt. Render runs each chained task separately, so a slow or retried model call does not prevent the other calls from running.

<CodeGroup>
  ```typescript title="TypeScript" lines theme={null}
  import { OpenRouter } from '@openrouter/sdk';
  import type { ChatResult } from '@openrouter/sdk/models';
  import { task } from '@renderinc/sdk/workflows';

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is required');
  }

  const openRouter = new OpenRouter({
    apiKey,
    httpReferer: process.env.APP_URL,
    appTitle: process.env.OPENROUTER_APP_TITLE ?? 'Render Workflows Example',
  });

  function contentToText(content: unknown): string {
    if (typeof content === 'string') {
      return content;
    }

    if (!Array.isArray(content)) {
      return '';
    }

    return content
      .flatMap((item) => {
        if (
          typeof item === 'object' &&
          item !== null &&
          'text' in item &&
          typeof item.text === 'string'
        ) {
          return [item.text];
        }

        return [];
      })
      .join('\n');
  }

  const callOpenRouter = task(
    {
      name: 'callOpenRouter',
      retry: {
        maxRetries: 3,
        waitDurationMs: 1000,
        backoffScaling: 2,
      },
    },
    async function callOpenRouter(prompt: string) {
      const completion = (await openRouter.chat.send({
        chatRequest: {
          model: process.env.OPENROUTER_MODEL ?? 'openrouter/auto',
          messages: [{ role: 'user', content: prompt }],
          stream: false,
        },
      })) as ChatResult;

      return {
        prompt,
        model: completion.model,
        answer: contentToText(completion.choices[0]?.message.content),
      };
    },
  );

  const runPromptBatch = task(
    { name: 'runPromptBatch' },
    async function runPromptBatch(prompts: string[]) {
      return Promise.all(prompts.map((prompt) => callOpenRouter(prompt)));
    },
  );
  ```

  ```python title="Python" lines theme={null}
  import asyncio
  import os

  from openrouter import OpenRouter
  from render_sdk import Retry, Workflows

  app = Workflows()


  def content_to_text(content: object) -> str:
      if isinstance(content, str):
          return content

      if not isinstance(content, list):
          return ""

      parts: list[str] = []
      for item in content:
          text = getattr(item, "text", None)
          if isinstance(text, str):
              parts.append(text)

      return "\n".join(parts)


  @app.task(
      name="call_openrouter",
      retry=Retry(
          max_retries=3,
          wait_duration_ms=1000,
          backoff_scaling=2,
      ),
  )
  def call_openrouter(prompt: str):
      with OpenRouter(
          api_key=os.environ["OPENROUTER_API_KEY"],
          http_referer=os.getenv("APP_URL"),
          x_open_router_title=os.getenv(
              "OPENROUTER_APP_TITLE",
              "Render Workflows Example",
          ),
      ) as open_router:
          completion = open_router.chat.send(
              model=os.getenv("OPENROUTER_MODEL", "openrouter/auto"),
              messages=[{"role": "user", "content": prompt}],
          )

      content = completion.choices[0].message.content if completion.choices else None

      return {
          "prompt": prompt,
          "model": completion.model,
          "answer": content_to_text(content),
      }


  @app.task(name="run_prompt_batch")
  async def run_prompt_batch(prompts: list[str]):
      return await asyncio.gather(*(call_openrouter(prompt) for prompt in prompts))


  if __name__ == "__main__":
      app.start()
  ```
</CodeGroup>

Auto Router can choose a different model for each independent prompt. Keeping `completion.model` in every result makes that routing decision visible.

<Warning>
  A retried task can repeat a billable API call if the first request succeeded but the task failed before returning its result. For production workflows with external side effects, add application-level idempotency or checkpointing.
</Warning>

## 4. Test the workflow locally

Start Render's local Workflow server:

<CodeGroup>
  ```bash title="Node" lines theme={null}
  render workflows dev -- npm start
  ```

  ```bash title="Python" lines theme={null}
  render workflows dev -- .venv/bin/python main.py
  ```
</CodeGroup>

In another terminal, start the batch task:

<CodeGroup>
  ```bash title="Node" lines theme={null}
  render workflows start runPromptBatch \
    --local \
    --input='[["Explain retries in one sentence.", "Write a haiku about databases."]]'
  ```

  ```bash title="Python" lines theme={null}
  render workflows start run_prompt_batch \
    --local \
    --input='[["Explain retries in one sentence.", "Write a haiku about databases."]]'
  ```
</CodeGroup>

The outer JSON array contains the task's arguments. The inner array is the `prompts` argument.

The command returns a task-run ID. Inspect the completed run with:

```bash theme={null}
render workflows tasks runs show --local TASK_RUN_ID
```

A successful result contains one entry per prompt:

```json theme={null}
[
  {
    "prompt": "Explain retries in one sentence.",
    "model": "<model selected by OpenRouter>",
    "answer": "<generated response>"
  },
  {
    "prompt": "Write a haiku about databases.",
    "model": "<model selected by OpenRouter>",
    "answer": "<generated response>"
  }
]
```

## 5. Deploy the workflow to Render

Commit the project and push it to GitHub, GitLab, or Bitbucket. From the project directory, create the Workflow service with the Render CLI.

`--repo .` reads the remote URL from the Git repository. `--env-file .env` adds the OpenRouter configuration to the Render service without committing the file.

<CodeGroup>
  ```bash title="Node" lines theme={null}
  render workflows create \
    --name openrouter-workflow \
    --repo . \
    --runtime node \
    --build-command "npm install" \
    --run-command "npm start" \
    --env-file .env \
    --output text
  ```

  ```bash title="Python" lines theme={null}
  render workflows create \
    --name openrouter-workflow \
    --repo . \
    --runtime python \
    --build-command "pip install -r requirements.txt" \
    --run-command "python main.py" \
    --env-file .env \
    --output text
  ```
</CodeGroup>

Render pulls the repository, builds the Workflow service, and registers both tasks. You can also create the service in the Render Dashboard by selecting **New > Workflow** and using the same build and run commands.

## 6. Run the deployed workflow

Start the deployed batch with its full task slug:

<CodeGroup>
  ```bash title="Node" lines theme={null}
  render workflows start openrouter-workflow/runPromptBatch \
    --input='[["Summarize eventual consistency.", "Name three uses for embeddings."]]'
  ```

  ```bash title="Python" lines theme={null}
  render workflows start openrouter-workflow/run_prompt_batch \
    --input='[["Summarize eventual consistency.", "Name three uses for embeddings."]]'
  ```
</CodeGroup>

Inspect the returned task-run ID:

```bash theme={null}
render workflows tasks runs show TASK_RUN_ID
```

You can also open the Workflow service in the Render Dashboard to inspect the parent run, each chained model call, retries, logs, results, and the concrete model selected for every prompt.

<Note>
  Run `render workflows tasks list` and select the workflow, or copy the full task slug from the task page in the Render Dashboard.
</Note>

## 7. Trigger the workflow from an application

The CLI is the quickest way to verify the deployment. A web service can start the same task through the Render SDK. Set `RENDER_API_KEY` in the web service or application environment, not in the Workflow service unless the Workflow itself needs to call the Render API.

<CodeGroup>
  ```typescript title="TypeScript" lines theme={null}
  import { Render } from '@renderinc/sdk';

  async function main() {
    const render = new Render();

    const startedRun = await render.workflows.startTask(
      'openrouter-workflow/runPromptBatch',
      [['Summarize eventual consistency.', 'Name three uses for embeddings.']],
    );

    const finishedRun = await startedRun.get();
    console.log(finishedRun.results);
  }

  main().catch(console.error);
  ```

  ```python title="Python" lines theme={null}
  import asyncio

  from render_sdk import RenderAsync


  async def main():
      render = RenderAsync()

      started_run = await render.workflows.start_task(
          "openrouter-workflow/run_prompt_batch",
          [[
              "Summarize eventual consistency.",
              "Name three uses for embeddings.",
          ]],
      )

      finished_run = await started_run
      print(finished_run.results)


  if __name__ == "__main__":
      asyncio.run(main())
  ```
</CodeGroup>

Keep the web service focused on HTTP, authentication, and returning progress to the client. Put the OpenRouter calls in Workflow tasks so they can continue after the original request ends, retry independently, and fan out on demand.

Use a shared [environment group](https://render.com/docs/configure-environment-variables#environment-groups) when the web service and Workflow service need the same OpenRouter configuration.

## Deploy a complete example

[Answer Arena](https://github.com/ojusave/answer-arena) is a TypeScript application that combines a Render Web Service, Render Postgres, Render Workflows, and OpenRouter. It fans out model configurations, streams progress to the browser, and records model, cost, and evaluation results.

## Resources

* [Render Workflows](https://render.com/docs/workflows?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter)
* [Your First Workflow](https://render.com/docs/workflows-tutorial?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter)
* [Triggering Task Runs](https://render.com/docs/workflows-running?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter)
* [Render CLI reference](https://render.com/docs/cli-reference?utm_source=partner\&utm_medium=partnerships\&utm_campaign=2026_partnership_openrouter)
* [OpenRouter Auto Router](/docs/guides/routing/routers/auto-router)
* [App attribution](/docs/app-attribution)
* [OpenRouter Quick Start](/docs/quickstart)
