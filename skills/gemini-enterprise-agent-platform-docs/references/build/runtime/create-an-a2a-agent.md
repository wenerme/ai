> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Agent Runtime lets you develop and deploy agents using the
Agent2Agent (A2A) protocol. A2A is an open standard designed to enable seamless
communication and collaboration between AI agents.

This document explains how to develop and test an A2A agent locally, including
defining components like `AgentCard` and `AgentExecutor`.

For more information on managing your deployed agents, see
[Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).

> [!NOTE]
> To see an example of Get started with A2A on Agent Platform Runtime,
> run the "Get started with A2A on Agent Platform Runtime" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_a2a_on_agent_engine.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fagent_engine%2Ftutorial_a2a_on_agent_engine.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/agent_engine/tutorial_a2a_on_agent_engine.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_a2a_on_agent_engine.ipynb)

The core workflow involves the following steps:

1. [Define key components](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-a2a-agent#define_agent_components)
2. [Create local agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-a2a-agent#create_a_local_agent)
3. [Test the local agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-a2a-agent#test_the_local_agent)

## Define agent components

To create an A2A agent, you need to define the following components: an
`AgentCard`, an `AgentExecutor`, and an ADK `LlmAgent`.

- `AgentCard` contains a metadata document that describes your agent's capabilities. `AgentCard` is like a business card that other agents can use to discover what your agent can do. For more details, see the [Agent Card
  specification](https://a2a-protocol.org/dev/specification/agent-card/).
- `AgentExecutor` contains the agent's core logic and defines how it handles tasks. This is where you implement the agent's behavior. You can read more about it in the [A2A protocol
  specification](https://a2a-protocol.org/dev/specification/).
- Optional: `LlmAgent` defines the ADK agent, including its system instructions, generative model, and tools.

### Define an `AgentCard`

The following code sample defines an `AgentCard` for a currency exchange rate
agent:

    from a2a.types import AgentCard, AgentSkill
    from vertexai.agent_engines.templates.a2a import create_agent_card

    # Define the skill for the CurrencyAgent
    currency_skill = AgentSkill(
        id='get_exchange_rate',
        name='Get Currency Exchange Rate',
        description='Retrieves the exchange rate between two currencies on a specified date.',
        tags=['Finance', 'Currency', 'Exchange Rate'],
        examples=[
            'What is the exchange rate from USD to EUR?',
            'How many Japanese Yen is 1 US dollar worth today?',
        ],
    )

    # Create the agent card using the utility function
    agent_card = create_agent_card(
        agent_name='Currency Exchange Agent',
        description='An agent that can provide currency exchange rates',
        skills=[currency_skill]
    )

### Define an `AgentExecutor`

The following code example defines an `AgentExecutor` that responds with the
currency exchange rate. It takes a `CurrencyAgent` instance and initializes the
ADK Runner to execute requests.

    import requests
    from a2a.server.agent_execution.agent_executor import AgentExecutor
    from a2a.server.agent_execution.context import RequestContext
    from a2a.server.events.event_queue import EventQueue
    from a2a.server.tasks import TaskUpdater
    from a2a import types as a2a_types
    from a2a.types import Part

    from google.adk import Runner
    from google.adk.agents import LlmAgent
    from google.adk.artifacts.in_memory_artifact_service import InMemoryArtifactService
    from google.adk.memory.in_memory_memory_service import InMemoryMemoryService
    from google.adk.sessions.in_memory_session_service import InMemorySessionService
    from google.genai import types as genai_types

    class CurrencyAgentExecutorWithRunner(AgentExecutor):
        """Executor that takes an LlmAgent instance and initializes the ADK Runner internally."""

        def __init__(self, agent: LlmAgent):
            self.agent = agent
            self.runner = None

        def _init_adk(self):
            if not self.runner:
                self.runner = Runner(
                    app_name=self.agent.name,
                    agent=self.agent,
                    artifact_service=InMemoryArtifactService(),
                    session_service=InMemorySessionService(),
                    memory_service=InMemoryMemoryService(),
                )

        async def cancel(self, context: RequestContext, event_queue: EventQueue) -> None:
            task_id = context.task_id
            updater = TaskUpdater(
                event_queue=event_queue,
                task_id=task_id or "",
                context_id=context.context_id or "",
            )
            await updater.cancel()

        async def execute(
            self,
            context: RequestContext,
            event_queue: EventQueue,
        ) -> None:
            self._init_adk() # Initialize on first execute call

            if not context.message:
                return

            user_id = context.message.metadata.get('user_id') if context.message and context.message.metadata else 'a2a_user'

            updater = TaskUpdater(event_queue, context.task_id, context.context_id)

            task = a2a_types.Task(
                id=context.task_id,
                context_id=context.context_id,
                status=a2a_types.TaskStatus(state=a2a_types.TaskState.TASK_STATE_SUBMITTED),
                history=[context.message] if context.message else [],
            )
            await event_queue.enqueue_event(task)

            await updater.start_work()

            query = context.get_user_input()
            content = genai_types.Content(role='user', parts=[genai_types.Part.from_text(text=query)])

            try:
                session = await self.runner.session_service.get_session(
                    app_name=self.runner.app_name,
                    user_id=user_id,
                    session_id=context.context_id,
                ) or await self.runner.session_service.create_session(
                    app_name=self.runner.app_name,
                    user_id=user_id,
                    session_id=context.context_id,
                )

                final_event = None
                async for event in self.runner.run_async(
                    session_id=session.id,
                    user_id=user_id,
                    new_message=content
                ):
                    if event.is_final_response():
                        final_event = event

                if final_event and final_event.content and final_event.content.parts:
                    response_text = "".join(
                        part.text for part in final_event.content.parts if hasattr(part, 'text') and part.text
                    )
                    if response_text:
                        await updater.add_artifact(
                            [Part(text=response_text)],
                            name='result',
                            last_chunk=True,
                        )
                        await updater.complete()
                        return

                await updater.update_status(
                    a2a_types.TaskState.TASK_STATE_FAILED,
                    message=updater.new_agent_message([Part(text='Failed to generate a final response with text content.')]),
                )

            except Exception as e:
                await updater.update_status(
                    a2a_types.TaskState.TASK_STATE_FAILED,
                    message=updater.new_agent_message([Part(text=f"An error occurred: {str(e)}")]),
                )

### Define an `LlmAgent`

First, define a currency exchange tool for the `LlmAgent` to use:

    def get_exchange_rate(
        currency_from: str = "USD",
        currency_to: str = "EUR",
        currency_date: str = "latest",
    ):
        """Retrieves the exchange rate between two currencies on a specified date.
        Uses the Frankfurter API (https://api.frankfurter.app/) to obtain
        exchange rate data.
        """
        try:
            response = requests.get(
                f"https://api.frankfurter.app/{currency_date}",
                params={"from": currency_from, "to": currency_to},
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

Then, define an ADK `LlmAgent` that uses the tool.

    my_llm_agent = LlmAgent(
        model='gemini-2.0-flash',
        name='currency_exchange_agent',
        description='An agent that can provide currency exchange rates.',
        instruction="""You are a helpful currency exchange assistant.
                       Use the get_exchange_rate tool to answer user questions.
                       If the tool returns an error, inform the user about the error.""",
        tools=[get_exchange_rate],
    )

## Create a local agent

Once you have defined your agent's components, create an instance of the
[`A2aAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.A2aAgent)
class that uses the `AgentCard`, `AgentExecutor`, and `LlmAgent` to begin local
testing.

    from vertexai.agent_engines.templates.a2a import A2aAgent

    a2a_agent = A2aAgent(
        agent_card=agent_card, # Assuming agent_card is defined
        agent_executor_builder=lambda: CurrencyAgentExecutorWithRunner(
            agent=my_llm_agent,
        )
    )
    a2a_agent.set_up()

The A2A Agent template helps you create an A2A-compliant service. The service
acts as a wrapper, abstracting away the converting layer from you.

## Test the local agent

The currency exchange rate agent supports the following three methods:

- `handle_authenticated_agent_card`
- `on_message_send`
- `on_get_task`

### Test `handle_authenticated_agent_card`

The following code retrieves the agent's authenticated card, which describes the agent's capabilities.

    # Test the `authenticated_agent_card` endpoint.
    response_get_card = await a2a_agent.handle_authenticated_agent_card(request=None, context=None)
    print(response_get_card)

### Test `on_message_send`

The following code simulates a client sending a new message to the agent. The
[`A2aAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.A2aAgent)
creates a new task and returns the task's ID.

    from a2a.types import SendMessageRequest, Message, Part
    from a2a.server.context import ServerCallContext

    # 1. Define the message
    message = Message(
        role="ROLE_USER",
        message_id="local-test-message-id",
        parts=[Part(text="What is the exchange rate from USD to EUR today?")]
    )

    # 2. Construct the request
    request = SendMessageRequest(message=message)

    # 3. Construct context
    context = ServerCallContext()

    # 4. Call the agent
    send_message_response = await a2a_agent.on_message_send(request=request, context=context)

    print(send_message_response)

### Test `on_get_task`

The following code retrieves the status and the result of a task. The output
shows that the task is completed and includes the "Hello World" response
artifact.

    from a2a.types import GetTaskRequest

    # 1. Provide the task_id from the previous step.
    # In a real application, you would store and retrieve this ID.
    task_id_to_get = send_message_response.id

    # 2. Construct the request
    request = GetTaskRequest(id=task_id_to_get)

    # 3. Call the agent's handler to get the task status.
    # Reusing the context constructed in the previous step
    task_status_response = await a2a_agent.on_get_task(request=request, context=context)

    print(f"Successfully retrieved status for Task ID: {task_id_to_get}")
    print("\nFull task status response:")
    print(task_status_response)

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Use an Agent2Agent agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent)

Use an Agent2Agent agent with Agent Platform Runtime.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.

Resource

### [Agent2Agent samples repository](https://github.com/a2aproject/a2a-samples/tree/main/samples/python/agents)

Explore Agent2Agent samples in Python on GitHub.
