> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ori Eval

> Find the best model for your project by testing your agent on real prompts, with one harness and one model for each run

Ori Eval tells you which model is best for your project, and gives you the scores that show why. Ask your question in normal words. Your coding agent then finds test material in your project, writes the eval, runs the models that you want to compare, and gives you the results. An eval is a `*.eval.ts` file. You can write the file yourself when you want more control, but you do not need to start there.

## Start with your coding agent

You do not need to install or run Ori yourself. Give this instruction to your coding agent:

```text theme={null}
run curl -fsSL https://openrouter.ai/skills/spawn-ori-eval and follow the instructions in its output to get started
```

The [`spawn-ori-eval`](https://openrouter.ai/skills/spawn-ori-eval) skill gives the agent each step. The agent installs Ori and makes sure that you have a login. It then starts `ori code -p` with your request. During the run, the `create-eval` skill of Ori asks the questions that shape the eval. It asks which part of your program to test, what that part must do well, if you have real data, and the maximum cost. Ori then writes the eval, runs the models, and gives you a recommendation.

<Note>
  The `spawn-ori-eval` skill does its work in a temporary directory. It does not
  put eval files in your project. Use the manual steps below if you want to keep
  the eval files in your project.
</Note>

## Why you run evals with Ori

A stable test bench is the difficult part of an eval. Ori is a harness, and not only a skill. Ori resolves one harness and one model for a run, then holds them for each test in that run. A prompt cannot change them. Two runs of the same eval files therefore use the same configuration.

Ori sends its requests through OpenRouter. One comparison can therefore include models from many providers. A harness that is specific to one vendor can test only the models of that vendor.

## Run the steps manually

The steps below do the same work by hand. Use them when you want more control, or when you want to see what the agent wrote.

### Before you start

Install the CLI:

```sh theme={null}
curl -fsSL https://openrouter.ai/labs/ori/install.sh | bash
```

Sign in one time:

```sh theme={null}
ori login
```

An eval sends requests to a real model. Ori must therefore be signed in. The `ori login` command signs you in with your browser, then keeps the credential for later runs.

Ori runs your eval files with [Bun](https://bun.sh). If Bun is not installed, `ori eval` asks for your approval to install it. On a terminal that is not interactive, or when `CI` is true, `ori eval` does not ask. It stops and shows you how to install Bun.

<Tip>
  Your project does not need to be a TypeScript project, and you do not need to
  install TypeScript. The eval file tests the agent, and not your code.
</Tip>

### Start with a question

Go to your project directory, then ask Ori to make the eval:

```sh theme={null}
cd my-project
ori code -p "What is the best model for my support agent?"
# For a long request:
ori code --prompt-file /tmp/ori-task.txt
```

The `ori code -p` command does not need a terminal. It writes its output to stdout, and it stops when the prompt is complete. Use `--prompt-file` for a long request. You cannot give `-p` and `--prompt-file` together. Ori also rejects a prompt that has no flag.

You do not need to know eval methods or model names. The agent does these steps:

1. **It looks for test material in your project.** It looks for prompts, tool definitions, data files (`.jsonl`, `.csv`, chat logs) and known correct answers. Tests in other languages can also give test cases, but the eval file is always TypeScript.
2. **It asks what is important.** It asks a question, for example "accuracy first, or speed and cost?", only when the answer changes the eval.
3. **It writes the eval, then runs it.** It makes `evals/<feature>/<name>.eval.ts`. It gets candidate models from the live catalog of OpenRouter, below your maximum price, then runs them.
4. **It recommends one model.** It gives you the scores, the times and the costs that support the recommendation.

The eval files stay in your project as normal code. Run them again when a provider releases a new model, when you make the criteria more strict, or in CI.

## The eval file

Read this section when you want to write an eval yourself, or when you want to see what the agent wrote. An eval file looks like a normal `bun test` file:

```ts evals/support/recommends.eval.ts theme={null}
import { test } from 'bun:test';
import { setupAgent } from 'ori/eval';

const agent = setupAgent();

test('recommends restaurants using the search tool', async () => {
  const run = await agent.run('Where should I eat dinner in Lisbon?');

  run.tool('search').toBeCalled();
  run.tool('delete_file').toNotBeCalled();
  run.toComplete();
  run.toCostAtMost(0.01);
  run.toFinishWithin(30_000);
});
```

The `setupAgent()` function with no arguments gives you the harness and the model that your workspace resolves. This is the agent that you already run. Then use one of these commands:

```sh theme={null}
ori eval
ori eval --report eval-report.md
ori eval --baseline best
```

Ori finds each `*.eval.ts` file below the current directory. It does not look in `node_modules`, `.ori` or `.git`. Ori then starts a temporary runtime and gives the files to `bun test`. The exit code of `ori eval` is the exit code of `bun test`. A failed eval therefore fails your CI job.

The `create-eval` skill puts new eval files in top-level `evals/<feature>/` directories. Ori can also find eval files in other directories.

Use `--baseline last|best|model:<slug>` to compare a run with an earlier run. Ori keeps the earlier runs in `.ori/eval/history.jsonl`. A comparison is possible only between runs that included exactly the same eval files. Use `--report <path>` to write a Markdown report for other persons.

When a model in a comparison stops before it answers, the report shows that model as `unmeasured`. The report does not remove the model, and it does not show a cost of zero.

### Compare models

Get the candidate models from the live catalog of OpenRouter instead of a list of slugs that you write yourself. Set a maximum price, then run the same eval with each model:

```ts evals/support/model.eval.ts theme={null}
import { test } from 'bun:test';
import { candidateModels, setupAgent } from 'ori/eval';

const candidates = await candidateModels({
  limit: 5,
  maxPromptPrice: 0.000005,
});

for (const model of candidates) {
  test(`handles a refund request on ${model}`, async () => {
    const run = await setupAgent({ model }).run(
      'A customer wants a refund for order #1234. What do you do?',
    );
    run.tool('lookup_order').toBeCalled();
    run.toComplete();
  });
}
```

The `candidateModels` function can also select on `maxCompletionPrice`, `minContextLength`, the quality indexes, the necessary parameters, the input modalities, and `excludeExpiring`. If the catalog does not give a value, that model cannot pass the related limit.

Use `assertModelIsLive(slug)` when you name one specific model in a file. The eval then fails with a clear message if that model leaves the live catalog.

### Give a score to an open answer

Some questions do not have one correct answer. Use an LLM judge to give a score to the answer. The `setupJudge()` function makes a separate agent on its own grading model. The score is therefore independent of the model that you test. You can also give your own agent to `setupJudge()` for a different judge.

```ts evals/support/quality.eval.ts theme={null}
import { test } from 'bun:test';
import { setupAgent, setupJudge } from 'ori/eval';

const agent = setupAgent();
const judge = setupJudge({ minScore: 0.8 });

test('gives an accurate, grounded answer', async () => {
  const run = await agent.run('What is our refund policy for digital goods?');
  await judge.autoEvals({
    criteria: 'Cites the 14-day window and does not invent exceptions.',
    run,
  });
});
```

The `startingCriteria` object has rubrics that you can edit for common dimensions: `accuracy`, `completeness`, `instructionFollowing`, `safety`, `structuredOutput` and `toneAndVoice`. Give one of them to `judge.autoEvals` as the criteria.

### Use your own data

Real data from your users is better than prompts that you invent. Use `test.each` for chat logs, or for pairs of a question and an answer:

```ts theme={null}
import supportPairs from './support-pairs.json';

test.each(supportPairs)(
  'answers: $question',
  async ({ question, mustMention }) => {
    const run = await agent.run(question);
    run.toMention(mustMention);
    run.toComplete();
  },
);
```

## Run an eval in CI

An eval sends requests to real models, and therefore costs money. Put your evals in a separate job. Let a person start the job, or run it on a schedule. Do not put it in your normal unit-test job.

Give the job an OpenRouter API key in the `OPENROUTER_API_KEY` variable. Keep the key in a repository secret. With this variable, Ori does not need `ori login` in CI.

A failed eval returns a non-zero exit code and fails the job. If your release depends on this job, a worse agent stops the release.

Your normal test job can check that the eval files are present:

```sh theme={null}
ori eval --list --allow-no-key
```

This command only finds the eval files. It needs no key and calls no model.

### GitHub Actions

Ori needs Bun in CI. When `CI` is true, `ori eval` does not install Bun for you.

The Ori install script puts the `ori` binary in `$HOME/.local/bin`. This path change only applies to the shell that runs the install script. Add the directory to `$GITHUB_PATH` so that later steps can find `ori`.

```yaml .github/workflows/eval.yml theme={null}
name: eval

on:
  workflow_dispatch:
  schedule:
    - cron: '0 9 1 * *'

jobs:
  eval:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - name: Install Ori
        run: |
          curl -fsSL https://openrouter.ai/labs/ori/install.sh | bash
          echo "$HOME/.local/bin" >> "$GITHUB_PATH"
      - name: Run the evals
        run: ori eval --report eval-report.md
        env:
          OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
      - name: Add the report to the job summary
        if: always()
        run: |
          if [ -f eval-report.md ]; then
            cat eval-report.md >> "$GITHUB_STEP_SUMMARY"
          fi
```

The `workflow_dispatch` event lets a person start the job. The `schedule` event runs the evals once each month. A scheduled run can show when a new model performs better for your project.

An initialized Ori workspace has a `package.json` and a local `ori` dependency. When the workspace does not have its generated `.ori/sdk` package or its dependencies, `ori eval` creates or installs them before it runs the tests. You do not need a separate `bun install` step.
