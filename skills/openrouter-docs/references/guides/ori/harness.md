> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ori Harness

> Run your existing agent CLI on OpenRouter with any model, organization guardrails, and one bill

Ori Harness runs the agent CLI you already use on OpenRouter. You run one command, and your agent starts with OpenRouter credentials, models, and settings in place. You don't change how you work.

## Install Ori

```sh theme={null}
curl -fsSL https://openrouter.ai/labs/ori/install.sh | bash
```

That's the only install command you need. If you run an agent that isn't on your machine, Ori asks to install it, then starts it.

### Let your coding agent set it up

You don't need to run the setup yourself. Give this instruction to the coding agent you already use:

```text theme={null}
run curl -fsSL https://openrouter.ai/skills/install-ori-harness and follow the instructions in its output to get started
```

That command fetches the [`install-ori-harness`](https://openrouter.ai/skills/install-ori-harness) skill, and the skill gives the agent each step. The agent installs Ori, checks that the `ori` command works, signs you in with OAuth, and then starts your agent CLI through Ori.

If your agent is connected to the [OpenRouter MCP server](/docs/guides/overview/mcp-server), you can run `/install-ori-harness` in the agent instead of pasting the command above.

## Update Ori

To update Ori, run:

```sh theme={null}
ori update
```

## Bring your own agent

Run Claude Code, Codex, Grok Build, Hermes, OpenCode, Pi, Prime Agent, or DeepSeek Harness with commands you already know:

```text theme={null}
ori claude
ori codex
ori dsh
ori grok
ori hermes
ori opencode
ori pi
ori prime-agent
```

Each command starts the real agent CLI on your machine. Ori uses the CLI on your `PATH`, and asks to install it if it's missing. `ori dsh` is the one exception: it sets up DeepSeek Harness instead of starting it. See [DeepSeek Harness](#deepseek-harness).

### DeepSeek Harness

DeepSeek Harness (dsh) doesn't start and stop like the other CLIs, so Ori sets it up instead of starting it:

```sh theme={null}
ori dsh
```

This points your global DeepSeek Harness config at OpenRouter. After that, run `dsh` the way you always do.

## Sign in instead of managing keys

Run an agent and Ori opens a browser so you can sign in with your OpenRouter account. It uses OAuth PKCE, so there's no new account and no key to create or paste.

You can also sign in first:

```sh theme={null}
ori login
```

<Note>
  Your models, credits, and organization settings come with your OpenRouter
  login. You don't need a separate provider key for each agent.
</Note>

## Any agent, any model

Pass `--model` and any OpenRouter model ID:

```sh theme={null}
ori claude --model anthropic/claude-sonnet-4.6
ori codex --model openai/gpt-5.2
ori grok --model x-ai/grok-4.5
ori hermes --model openrouter/auto
ori opencode --model openrouter/auto
ori pi --model openai/gpt-5.2
ori prime-agent --model openai/gpt-5.2
ori dsh --model openrouter/auto
```

For `ori dsh`, `--model` sets the default model in your dsh settings and starts nothing. For `ori grok`, `--model` is Grok Build's own flag; it already takes OpenRouter model IDs, and Ori passes it straight through.

You set the model with a single flag, and Ori sends anything after its own flags to the agent unchanged:

```sh theme={null}
ori codex --model google/gemini-3.6-flash --full-auto
```

You keep your usual agent flags, and you can pick a model from any provider in the OpenRouter catalog.

<Tip>
  Put your agent's normal flags after Ori's flags. Ori passes them to the agent
  unchanged.
</Tip>

## Live model catalog and routing toggles

For Pi (`ori pi`), Prime Agent (`ori prime-agent`), and DeepSeek Harness (`ori dsh`), Ori hooks the agent up to your own OpenRouter model catalog:

* The `/model` list comes from your catalog, so it stays current and leaves out models your organization's policies block.
* You turn on fast routing with `/fast`: Anthropic fast mode for Claude models, the Fast service tier for OpenAI models, and throughput-sorted (`:nitro`) routing for the rest. On Prime Agent, use `/speed` instead, because Prime Agent has its own `/fast` command.
* You turn on ZDR-only mode with `/zdr`, so your requests go only to providers that keep no data.

Grok Build (`ori grok`) loads the same catalog into its own model picker, so you don't need to run `grok login`, and its model IDs are OpenRouter model IDs. It doesn't have the `/fast` and `/zdr` toggles.

## Guardrails, on every agent

Set [guardrails](/docs/guides/features/guardrails), allowlists, and per-workspace permissions on your OpenRouter organization, and set [workspace budgets](/docs/guides/features/workspaces/workspace-budgets) there too. OpenRouter applies them to every request, no matter which client sends it, including an agent running through Ori.

## One bill across agents

You pay for Ori traffic through OpenRouter's normal billing and activity reporting. You see it next to your other traffic in [Usage Accounting](/docs/cookbook/administration/usage-accounting) and [Activity Export](/docs/cookbook/administration/activity-export). There's no separate Ori bill.

## Frequently asked questions

### Do I need an OpenRouter API key?

No. Ori signs you in with OAuth PKCE through your OpenRouter login. There's no key to copy or paste.

### Do I need to change my agent workflow?

No. Keep the same agent, commands, and flags.

### Which agents are supported?

Claude Code (`ori claude`), Codex (`ori codex`), Grok Build (`ori grok`), Hermes (`ori hermes`), OpenCode (`ori opencode`), Pi (`ori pi`), Prime Agent (`ori prime-agent`), and DeepSeek Harness (`ori dsh`) work today, and more harnesses are coming.
