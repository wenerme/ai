> [!WARNING]
> **Preview - Agent evaluation on Gemini Enterprise Agent Platform**
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) as well as the [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20). This feature allows customers to evaluate AI Agents, and so the "Agentic AI Services" Service Specific Terms apply. Pre-GA products and features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

## Before you begin

To simulate and evaluate agent behavior, ensure you have
completed the following:

- **Create an agent version** : Simulation requires an immutable snapshot of your agent's configuration, including system instructions, tools, and model, etc. Ensure you have created at least one version of your agent in the [Agent Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-registry).
- **Initialize the SDK** : If you plan to run simulation programmatically, install the **Agent Platform SDK** and initialize the client as described in [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents).

Simulation allows you to build a comprehensive evaluation suite from scratch,
even without existing production data. This process uses LLMs to automatically
generate test cases and then roleplay as a user to stress-test your agent's
multi-turn conversational logic.

## The 2-step simulation workflow

Testing a new agent typically follows a two-stage process:

1. **Generate Scenarios:** Create a dataset of "test specs" based on your
   agent's instructions and tool definitions.

2. **Simulate Sessions:** Execute those specs by having a simulated user
   interact with your agent to produce behavior **traces** . A **trace** is a
   factual, immutable record of the agent's behavior, including model inputs,
   responses, and tool calls.

In the first step, the system creates **eval cases** . An **eval case** is a
specification that defines an agent's task. Each case consists of two elements:

- **Starting Prompt:** The first message a user sends to the agent.
- **Conversation Plan:** A hidden "instruction" for the simulated user, describing their goals and how they should react if the agent asks certain questions.

In the second step, the system generates list of agent behaviors
in canonical agent data format.

### Generate scenarios in the console

1. In the Google Cloud console, navigate to the **Agent Platform \> Agents \> Evaluation** page.

   [Go to Evaluation](https://console.cloud.google.com/agent-platform/evaluation)

2. Click **New evaluation** and select **Simulate sessions**.

3. Enter a **Generation instruction** to guide the scenarios (for example, "Generate
   scenarios where the user tries to book a flight but then changes their
   mind").

4. Review the generated table. You can edit the prompts or manually add your
   own test cases.

## Run user simulation

Once your scenarios are generated, the **User Simulator** acts as the user to
drive the conversation forward.

### User simulation settings

When running the simulation, you can configure the following attributes:

- **Max Turn:** Maximum number of invocations allowed by the multi-turn agent run. This property allows us to stop a run-off conversation where the agent and the user simulator get into a never ending loop. (The default value is 5).
- **Model Name:** The model name to simulate next user message for multi-turn agent run.
- **Model Configuration:** The configuration of the model to simulate user message.

### SDK Example: Programmatic Simulation

You can also bootstrap your evaluation suite using the **Agent Platform SDK**:

    # 1. Define agent
    travel_agent = Agent(
        model="gemini-3-flash-preview",
        name='travel_agent',
        instruction='You are a travel expert, help users to find flights, book flights with flight ID',
        tools=[find_flights, book_flight],
    )

    # 2. Generate scenarios from agent info
    travel_agent_info = types.evals.AgentInfo.load_from_agent(agent=travel_agent)

    eval_dataset = client.evals.generate_conversation_scenarios(
        agent_info=travel_agent_info,
        config={
            "count": 5,
            "generation_instruction": "Generate scenarios where the user tries to book a flight.",
            "environment_context": "Today is Monday. I am located in San Francisco. Flights to Paris, New York, Tokyo, Chicago, Sydney, etc are available.",
        },
    )

    # 3. Simulate multi-turn interactions
    eval_dataset_with_traces = client.evals.run_inference(
        agent=travel_agent,
        src=eval_dataset,
        config={
            "user_simulator_config": {
                "max_turn": 5
            }
        }
    )
