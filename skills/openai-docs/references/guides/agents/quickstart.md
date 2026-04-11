# Quickstart

Use this page when you want the shortest path to a working SDK-based agent. The examples below use the same high-level concepts in both TypeScript and Python: define an agent, run it, then add tools and specialist agents as your workflow grows.

## Install the SDK

Create a project, install the SDK, and set your API key.



Create an API Key


<p></p>

```bash
# TypeScript
npm install @openai/agents zod

# Python
pip install openai-agents

export OPENAI_API_KEY=sk-...
```

## Create and run your first agent

Start with one focused agent and one turn. The SDK handles the model call and returns a result object with the final output plus the run history.

Create and run an agent

```typescript
import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "History tutor",
  instructions:
    "You answer history questions clearly and concisely.",
  model: "gpt-5.4",
});

const result = await run(agent, "When did the Roman Empire fall?");
console.log(result.finalOutput);
```

```python
import asyncio

from agents import Agent, Runner

agent = Agent(
    name="History tutor",
    instructions="You answer history questions clearly and concisely.",
    model="gpt-5.4",
)


async def main() -> None:
    result = await Runner.run(agent, "When did the Roman Empire fall?")
    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
```


You should see a concise answer in the terminal. Once that loop works, keep the same shape and add capabilities incrementally rather than starting with a large multi-agent design.

## Carry state into the next turn

The first run result is also how you decide what the second turn should use as state.

| If you want                                           | Start with                                                                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Keep the full history in your application             | |
| Let the SDK load and save history for you             | A session                                                                                                                                |
| Let OpenAI manage continuation state                  | A server-managed continuation ID                                                                                                         |
| Resume a run that paused for approval or interruption | , together with `interruptions` |

After handoffs, reuse for the next turn when that specialist should stay in control.

## Give the agent a tool

The first capability you add is often a function tool or a hosted OpenAI tool such as web search or file search.

Add a function tool

```typescript
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const historyFunFact = tool({
  name: "history_fun_fact",
  description: "Return a short history fact.",
  parameters: z.object({}),
  async execute() {
    return "Sharks are older than trees.";
  },
});

const agent = new Agent({
  name: "History tutor",
  instructions:
    "Answer history questions clearly. Use history_fun_fact when it helps.",
  tools: [historyFunFact],
});

const result = await run(
  agent,
  "Tell me something surprising about ancient life on Earth.",
);

console.log(result.finalOutput);
```

```python
import asyncio

from agents import Agent, Runner, function_tool


@function_tool
def history_fun_fact() -> str:
    """Return a short history fact."""
    return "Sharks are older than trees."


agent = Agent(
    name="History tutor",
    instructions="Answer history questions clearly. Use history_fun_fact when it helps.",
    tools=[history_fun_fact],
)


async def main() -> None:
    result = await Runner.run(
        agent,
        "Tell me something surprising about ancient life on Earth.",
    )
    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
```


Use the shared [Using tools](https://developers.openai.com/api/docs/guides/tools#usage-in-the-agents-sdk) guide when you need hosted tools, tool search, or agents-as-tools.

## Add specialist agents

A common next step is to split the workflow into specialists and let a router delegate to them with handoffs.

Route to specialist agents

```typescript
import { Agent, run } from "@openai/agents";

const historyTutor = new Agent({
  name: "History tutor",
  instructions: "Answer history questions clearly and concisely.",
});

const mathTutor = new Agent({
  name: "Math tutor",
  instructions: "Explain math step by step and include worked examples.",
});

const triageAgent = Agent.create({
  name: "Homework triage",
  instructions: "Route each homework question to the right specialist.",
  handoffs: [historyTutor, mathTutor],
});

const result = await run(
  triageAgent,
  "Who was the first president of the United States?",
);

console.log(result.finalOutput);
console.log(result.lastAgent?.name);
```

```python
import asyncio

from agents import Agent, Runner

history_tutor = Agent(
    name="History tutor",
    handoff_description="Specialist for history questions.",
    instructions="Answer history questions clearly and concisely.",
)

math_tutor = Agent(
    name="Math tutor",
    handoff_description="Specialist for math questions.",
    instructions="Explain math step by step and include worked examples.",
)

triage_agent = Agent(
    name="Homework triage",
    instructions="Route each homework question to the right specialist.",
    handoffs=[history_tutor, math_tutor],
)


async def main() -> None:
    result = await Runner.run(
        triage_agent,
        "Who was the first president of the United States?",
    )
    print(result.final_output)
    print(result.last_agent.name)


if __name__ == "__main__":
    asyncio.run(main())
```


## Inspect traces early

The normal server-side SDK path includes tracing. As soon as the first run works, open the [Traces dashboard](https://platform.openai.com/traces) to inspect model calls, tool calls, handoffs, and guardrails before you start tuning prompts.

## Next steps

Once the first run works, continue with the guide that matches the next capability you want to add.

<div class="not-prose mt-4 grid gap-3">
  <a
    href="/api/docs/guides/agents/define-agents"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      Shape one specialist cleanly before you scale the workflow.


  </a>
  <a
    href="/api/docs/guides/tools#usage-in-the-agents-sdk"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      Add hosted tools, function tools, and agents-as-tools.


  </a>
  <a
    href="/api/docs/guides/agents/running-agents"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      Learn the agent loop, streaming, and continuation strategies.


  </a>
  <a
    href="/api/docs/guides/agents/orchestration"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      Decide when specialists should take over the conversation.


  </a>
</div>