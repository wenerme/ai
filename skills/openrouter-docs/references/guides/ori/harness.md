> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ori Harness

> Run your existing agent CLI on OpenRouter with any model, organization guardrails, and one bill

Ori Harness runs the agent CLI you already use on OpenRouter. One command runs the agent CLI you already have, with OpenRouter credentials, models, and environment set up for you. Your workflow does not change.

## Bring your own agent

Use Claude Code, Codex, Hermes, OpenCode, Pi, Prime Agent, or DeepSeek Harness with the commands you already know:

```text theme={null}
ori claude
ori codex
ori dsh
ori hermes
ori opencode
ori pi
ori prime-agent
```

These commands launch the real agent CLI on your machine. Ori runs the CLI already on your `PATH`. If it is not installed, Ori tells you how to install it and lets you try again. The exception is `ori dsh`, which configures DeepSeek Harness instead of launching it (see [DeepSeek Harness](#deepseek-harness) below).

For Pi, install it with:

```sh theme={null}
curl -fsSL https://pi.dev/install.sh | sh
```

For Prime Agent, install it with:

```sh theme={null}
curl -fsSL https://app.primeintellect.ai/prime-agent/install.sh | sh
```

### DeepSeek Harness

DeepSeek Harness (dsh) is not an on/off TUI like the other CLIs, so Ori configures it instead of launching it:

```sh theme={null}
ori dsh
```

This one command configures your global DeepSeek Harness to use OpenRouter. Afterwards, run `dsh` yourself as usual.

If dsh is not installed:

```sh theme={null}
npm install -g --prefix ~/.local @deepseek-ai/dsh
```

The [install-ori-harness skill](https://openrouter.ai/skills/install-ori-harness) gives a coding agent the same steps:

```text theme={null}
run curl -fsSL https://openrouter.ai/skills/install-ori-harness and follow the instructions in its output to get started
```

## Sign in instead of managing keys

Install Ori:

```sh theme={null}
curl -fsSL https://openrouter.ai/labs/ori/install.sh | bash
```

Then run an agent. Ori uses OAuth PKCE with your existing OpenRouter login. A browser opens for sign-in. There is no new account and no key to create or paste.

You can also sign in before your first run:

```sh theme={null}
ori login
```

<Note>
  Your models, credits, and organization settings come with your OpenRouter
  login. You do not need to manage a separate provider key for each agent.
</Note>

Upgrade Ori with:

```sh theme={null}
ori update
```

## Any agent, any model

Pass `--model` with any OpenRouter model ID:

```sh theme={null}
ori claude --model anthropic/claude-sonnet-4.6
ori codex --model openai/gpt-5.2
ori hermes --model openrouter/auto
ori opencode --model openrouter/auto
ori pi --model openai/gpt-5.2
ori prime-agent --model openai/gpt-5.2
ori dsh --model openrouter/auto
```

For `ori dsh`, the `--model` flag sets the default model in your dsh settings rather than launching anything.

One flag picks the model. Everything after the flags goes to the agent untouched:

```sh theme={null}
ori codex --model google/gemini-3.6-flash --full-auto
```

Your usual agent flags still work. The model can come from any provider in the OpenRouter catalog.

<Tip>
  Use your agent's normal flags after Ori's flags. Ori keeps them unchanged and
  passes them to the agent.
</Tip>

## Live model catalog and routing toggles

For Pi (`ori pi`), Prime Agent (`ori prime-agent`), and DeepSeek Harness (`ori dsh`), Ori connects the agent to your personal OpenRouter model catalog:

* The `/model` list comes from your catalog, so it is always up to date and hides models that are guardrailed or unavailable under your organization's policies.
* `/fast` toggles fast routing: Anthropic fast mode for Claude models, priority service tier for OpenAI models, and throughput-sorted (`:nitro`) routing for everything else. On Prime Agent the toggle is `/speed`, because Prime Agent ships its own built-in `/fast` command.
* `/zdr` toggles ZDR-only mode, so requests only go to providers with zero data retention.

## Guardrails, on every agent

Configure [guardrails](/docs/guides/features/guardrails), allowlists, and per-workspace permissions on your OpenRouter organization. Set [workspace budgets](/docs/guides/features/workspaces/workspace-budgets) there too. OpenRouter enforces these controls on every request, whatever client makes it—including an agent running through Ori.

## One bill across agents

Ori traffic uses OpenRouter's normal billing and activity reporting. It appears alongside your other OpenRouter traffic in [Usage Accounting](/docs/cookbook/administration/usage-accounting) and [Activity Export](/docs/cookbook/administration/activity-export). There is no separate Ori bill.

## Frequently asked questions

### Do I need an OpenRouter API key?

No. Ori signs you in with OAuth PKCE through your existing OpenRouter login. There is no key to copy or paste.

### Do I need to change my agent workflow?

No. Keep the same agent and the same commands and flags. Your workflow does not change.

### Which agents are supported?

Claude Code (`ori claude`), Codex (`ori codex`), Hermes (`ori hermes`), OpenCode (`ori opencode`), Pi (`ori pi`), Prime Agent (`ori prime-agent`), and DeepSeek Harness (`ori dsh`) are supported today, with more harnesses on the way.
