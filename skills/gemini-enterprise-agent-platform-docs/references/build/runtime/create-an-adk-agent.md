Agent Runtime lets you develop and deploy agents using the Agent Development Kit (ADK) template. By using the `AdkApp` class in the `Agent Platform SDK` for Python, you can create agents that return exchange rates and manage stateful interactions.

This document explains how to develop an ADK agent, including defining the
model, adding tools, and managing sessions and memories.

For more information on managing your deployed agents, see
[Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).

## Before you begin

Make sure your environment is set up by following
the steps in [Set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup).

## Define and configure a model

Specify the model you want to use:

    model = "gemini-2.0-flash"

Optional: Configure the safety settings of the model. To learn more
about the options available for safety settings in Gemini, see
[Configure safety attributes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters).
The following is an example of how you can configure the safety settings:

    from google.genai import types

    safety_settings = [
        types.SafetySetting(
            category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=types.HarmBlockThreshold.OFF,
        ),
    ]

Optional: Specify [content generation parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/content-generation-parameters):

    from google.genai import types

    generate_content_config = types.GenerateContentConfig(
       safety_settings=safety_settings,
       temperature=0.28,
       max_output_tokens=1000,
       top_p=0.95,
    )

Create an [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
using the model configurations:

    from google.adk.agents import Agent
    from vertexai.agent_engines import AdkApp

    agent = Agent(
       model=model,                                      # Required.
       name='currency_exchange_agent',                   # Required.
       generate_content_config=generate_content_config,  # Optional.
    )
    app = AdkApp(agent=agent)

If you are running in an interactive environment, such as the terminal or a
Colab notebook, you can run a query using the
[`AdkApp.async_stream_query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
method as an intermediate testing step:

    async for event in app.async_stream_query(
       user_id="USER_ID",  # Required
       message="What is the exchange rate from US dollars to Swedish currency?",
    ):
       print(event)

- <var translate="no">USER_ID</var>: Choose your own user ID with a character limit of 128. For example, `user-123`.

The response is a Python dictionary similar to the following example:

    {'actions': {'artifact_delta': {},
                 'requested_auth_configs': {},
                 'state_delta': {}},
     'author': 'currency_exchange_agent',
     'content': {'parts': [{'text': 'To provide you with the most accurate '
                                    'exchange rate, I need to know the specific '
                                    'currencies you\'re asking about. "Swedish '
                                    'currency" could refer to:\n'
                                    '\n'
                                    '*   **Swedish Krona (SEK):** This is the '
                                    'official currency of Sweden.\n'
                                    '\n'
                                    "Please confirm if you're interested in the "
                                    'exchange rate between USD and SEK. Once you '
                                    'confirm, I can fetch the latest exchange rate '
                                    'for you.\n'}],
                 'role': 'model'},
     'id': 'LYg7wg8G',
     'invocation_id': 'e-113ca547-0f19-4d50-9dde-f76cbc001dce',
     'timestamp': 1744166956.925927}

## Optional: Define and use a tool

After you define your model, define the tools that your model uses for
reasoning.

When you define your function, it's important to include comments that fully and
clearly describe the function's parameters, what the function does, and what the
function returns. This information is used by the model to determine which
function to use. You must also test your function locally to confirm that it
works.

Use the following code to define a function that returns an exchange rate:

    def get_exchange_rate(
        currency_from: str = "USD",
        currency_to: str = "EUR",
        currency_date: str = "latest",
    ):
        """Retrieves the exchange rate between two currencies on a specified date.

        Uses the Frankfurter API (https://api.frankfurter.app/) to obtain
        exchange rate data.

        Args:
            currency_from: The base currency (3-letter currency code).
                Defaults to "USD" (US Dollar).
            currency_to: The target currency (3-letter currency code).
                Defaults to "EUR" (Euro).
            currency_date: The date for which to retrieve the exchange rate.
                Defaults to "latest" for the most recent exchange rate data.
                Can be specified in YYYY-MM-DD format for historical rates.

        Returns:
            dict: A dictionary containing the exchange rate information.
                Example: {"amount": 1.0, "base": "USD", "date": "2023-11-24",
                    "rates": {"EUR": 0.95534}}
        """
        import requests
        response = requests.get(
            f"https://api.frankfurter.app/{currency_date}",
            params={"from": currency_from, "to": currency_to},
        )
        return response.json()

To test the function before you use it in your agent, run the following:

    get_exchange_rate(currency_from="USD", currency_to="SEK")

The response should be similar to the following:

    {'amount': 1.0, 'base': 'USD', 'date': '2025-04-03', 'rates': {'SEK': 9.6607}}

To use the tool inside the
[`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp),
add it to the list of tools under the `tools=` argument:

    from google.adk.agents import Agent

    agent = Agent(
        model=model,                     # Required.
        name='currency_exchange_agent',  # Required.
        tools=[get_exchange_rate],       # Optional.
    )

You can test the agent locally by performing test queries against it using the
[`AdkApp.async_stream_query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
method. Run the following command to test the agent locally using US dollars and
Swedish Krona:

    from vertexai.agent_engines import AdkApp

    app = AdkApp(agent=agent)
    async for event in app.async_stream_query(
        user_id="USER_ID",
        message="What is the exchange rate from US dollars to SEK on 2025-04-03?",
    ):
        print(event)

where <var translate="no">USER_ID</var> is the user ID you defined. For example,
`user-123`.

The response is a sequence of dictionaries that's similar to the following:

    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'function_call': {'args': {'currency_date': '2025-04-03',
                                                       'currency_from': 'USD',
                                                       'currency_to': 'SEK'},
                                              'id': 'adk-e39f3ba2-fa8c-4169-a63a-8e4c62b89818',
                                              'name': 'get_exchange_rate'}}],
                 'role': 'model'},
     'id': 'zFyIaaif',
     # ...
    }
    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'function_response': {'id': 'adk-e39f3ba2-fa8c-4169-a63a-8e4c62b89818',
                                                  'name': 'get_exchange_rate',
                                                  'response': {'amount': 1.0,
                                                               'base': 'USD',
                                                               'date': '2025-04-03',
                                                               'rates': {'SEK': 9.6607}}}}],
                 'role': 'user'},
     'id': 'u2YR4Uom',
     # ...
    }
    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'text': 'The exchange rate from USD to SEK on '
                                    '2025-04-03 is 9.6607.'}],
                 'role': 'model'},
     'id': 'q3jWA3wl',
     # ...
    }

## Optional: Manage sessions

[`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
uses in-memory sessions when running locally and uses [cloud-based managed
sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions) after you deploy
the agent to Agent Runtime. This section describes how to configure your ADK
agent to work with managed sessions.

### Optional: Customize your sessions database

> [!NOTE]
> **Note:** If you use a custom in-memory session service, sessions might not stay in sync when you deploy the agent to Agent Runtime. We only recommend customizing your database if you can synchronize the state across sessions in a deployed environment.

If you want to override the default managed session service with your own
database, you can [define a
`session_service_builder`](https://google.github.io/adk-docs/sessions/) function
as follows:

    def session_service_builder():
      from google.adk.sessions import InMemorySessionService

      return InMemorySessionService()

Pass your database to [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp) as `session_service_builder=`:

    from vertexai.agent_engines import AdkApp

    app = AdkApp(
       agent=agent,                                      # Required.
       session_service_builder=session_service_builder,  # Optional.
    )

### Use the agent with sessions

When you run the
[`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
locally, the following instructions use in-memory sessions.

To create a session for your agent, use the
[`AdkApp.async_create_session`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_create_session)
method:

    session = await app.async_create_session(user_id="USER_ID")
    print(session)

The session is created as the dictionary representation of an [ADK session
object](https://google.github.io/adk-docs/sessions/session/#the-session-object).

To list sessions associated with your agent, use the
[`AdkApp.async_list_sessions`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_list_sessions)
method:

    await app.async_list_sessions(user_id="USER_ID")

To get a particular session, use the
[`AdkApp.async_get_session`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_get_session)
method::

    session = await app.async_get_session(user_id="USER_ID", session_id="SESSION_ID")

where

- <var translate="no">USER_ID</var> is the user ID you defined. For example, `user-123`.

- <var translate="no">SESSION_ID</var> is the ID for the particular session you want to
  retrieve.

To asynchronously query the agent, use the
[`AdkApp.async_stream_query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
method:

    async for event in app.async_stream_query(
        user_id="USER_ID",
        session_id=SESSION_ID, # Optional. you can pass in the session_id when querying the agent
        message="What is the exchange rate from US dollars to Swedish currency on 2025-04-03?",
    ):
        print(event)

The agent might respond with a request for information like the following:

    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'text': 'I need to know the Swedish currency code to '
                                    'provide you with the exchange rate.'}],
                 'role': 'model'},
     'id': 'wIgZAtQ4',
     #...
    }

You can send a response (for example, `"SEK"`) on behalf of
`USER_ID` within the session corresponding to `session`
by specifying:

    async for event in app.async_stream_query(
        user_id="USER_ID",
        session_id=session.id, # Optional. you can pass in the session_id when querying the agent
        message="SEK",
    ):
        print(event)

You should receive a continuation of the conversation like the following
sequence of dictionaries:

    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'function_call': {'args': {'currency_date': '2025-04-03',
                                                       'currency_from': 'USD',
                                                       'currency_to': 'SEK'},
                                              'id': 'adk-2b9230a6-4b92-4a1b-9a65-b708ff6c68b6',
                                              'name': 'get_exchange_rate'}}],
                 'role': 'model'},
     'id': 'bOPHtzji',
     # ...
    }
    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'function_response': {'id': 'adk-2b9230a6-4b92-4a1b-9a65-b708ff6c68b6',
                                                  'name': 'get_exchange_rate',
                                                  'response': {'amount': 1.0,
                                                               'base': 'USD',
                                                               'date': '2025-04-03',
                                                               'rates': {'SEK': 9.6607}}}}],
                 'role': 'user'},
     'id': '9AoDFmiL',
     # ...
    }
    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'text': 'The exchange rate from USD to SEK on '
                                    '2025-04-03 is 1 USD to 9.6607 SEK.'}],
                 'role': 'model'},
     'id': 'hmle7trT',
     # ...
    }

## Optional: Manage memories

By default, [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp)
uses an in-memory implementation of agentic memory when running locally and uses
[Agent Platform Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank)
after you deploy the agent to Agent Runtime.

When developing your ADK agent, you can include a `PreloadMemoryTool` that
controls when the agent retrieves memories and how memories are included in the
prompt. The following example agent always retrieves memories at the start of
each turn and includes the memories in the system instruction:

    from google.adk.agents import Agent
    from google.adk.tools.preload_memory_tool import PreloadMemoryTool
    from vertexai.agent_engines import AdkApp

    agent = Agent(
        model="gemini-2.0-flash",
        name='stateful_agent',
        instruction="""You are a Vehicle Voice Agent, designed to assist users with information and in-vehicle actions.

    1.  **Direct Action:** If a user requests a specific vehicle function (e.g., "turn on the AC"), execute it immediately using the corresponding tool. You don't have the outcome of the actual tool execution, so provide a hypothetical tool execution outcome.
    2.  **Information Retrieval:** Respond concisely to general information requests with your own knowledge (e.g., restaurant recommendation).
    3.  **Clarity:** When necessary, try to seek clarification to better understand the user's needs and preference before taking an action.
    4.  **Brevity:** Limit responses to under 30 words.
    """,
        tools=[PreloadMemoryTool()],
    )

    app = AdkApp(agent=agent)

### Optional: Customize your memory service

> [!NOTE]
> **Note:** If you use a custom in-memory memory service, memories might not stay in sync when you deploy the agent to Agent Runtime. We only recommend customizing the memory service if you can synchronize the memories across instances in a distributed setting when the agent is deployed.

If you want to override the default memory service, you can define a
`memory_service_builder` function that returns a
[`BaseMemoryService`](https://google.github.io/adk-docs/api-reference/python/google-adk.html#google.adk.memory.BaseMemoryService)
as follows:

    def memory_service_builder():
      from google.adk.memory import InMemoryMemoryService

      return InMemoryMemoryService()

Pass your database to [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp) as `memory_service_builder=`:

    from vertexai.agent_engines import AdkApp

    app = AdkApp(
       agent=agent,                                    # Required.
       memory_service_builder=memory_service_builder,  # Optional.
    )

### Use the agent with memories

Test your ADK agent with memories:

1. Create a session and interact with the agent:

       initial_session = await app.async_create_session(user_id="USER_ID")

       async for event in app.async_stream_query(
           user_id="USER_ID",
           session_id=initial_session.id,
           message="Can you update the temperature to my preferred temperature?",
       ):
           print(event)

   Since there are no available memories during the first session and the agent
   does not know any user preferences, the agent may reply with a response
   such as "What is your preferred temperature?" You can respond with the following
   command:

       async for event in app.async_stream_query(
           user_id="USER_ID",
           session_id=initial_session.id,
           message="I like it at 71 degrees",
       ):
           print(event)

   The agent might return with a response such as "Setting the temperature to 71
   degrees Fahrenheit. Temperature successfully changed." The agent's response may
   vary depending on the model you used.
2. Generate memories from the session. To store information from the session for
   use in future sessions, use the [`async_add_session_to_memory`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_add_session_to_memory) method:

       await app.async_add_session_to_memory(session=initial_session)

3. Test that the agent has retained memory of the session (using
   `PreloadMemoryTool`) by creating a new session and prompting the agent:

       new_session = await app.async_create_session(user_id="USER_ID")
       async for event in app.async_stream_query(
           user_id="USER_ID",
           session_id=initial_session.id,
           message="Fix the temperature!",
       ):
           print(event)

   The agent might return a response such as "setting temperature to 71 degrees. Is
   that correct?" The agent's response may vary depending on the model and memory
   service provider you used.
4. Use the [`async_search_memory`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_search_memory) method
   to display the agent's memories:

       response = await app.async_search_memory(
           user_id="USER_ID",
           query="Fix the temperature!",
       )
       print(response)

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Overview

### [Sessions overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions)

Learn how to use sessions to maintain conversation state with your agents.

Overview

### [Memory Bank overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank)

Learn how to use Memory Bank to store long-term user preferences and facts.

Guide

### [Use an Agent Development Kit agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent)

Use an Agent Development Kit (ADK) agent with Agent Platform Runtime.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
