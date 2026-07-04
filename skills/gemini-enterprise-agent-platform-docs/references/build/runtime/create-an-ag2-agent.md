Agent Runtime lets you develop and deploy agents using the framework-specific AG2 template, which is a community-driven fork of AutoGen. By using the `AG2Agent` class in the `Agent Platform SDK`, you can create agents that perform complex tasks and integrate with external tools.

This document explains how to develop an AG2 agent, including defining the
model, adding tools, and customizing the orchestration flow.

For more information on managing your deployed agents, see
[Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).

To create an AG2 agent:

1. [Define and configure a runnable](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent#runnable)
2. [Define and use a tool](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent#define-function)
3. Optional: [Customize the orchestration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent#orchestration)

## Before you begin

Make sure your environment is set up by following
the steps in [Set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup).

## Step 1. Define and configure a runnable

Specify the model you want to use:

    model = "gemini-2.0-flash"

Define the runnable name to use:

    runnable_name = "Get Exchange Rate Agent"

Optional: Configure the model:

    from google.cloud.aiplatform.aiplatform import initializer

    llm_config = {
        "config_list": [{
            "project_id":       initializer.global_config.project,
            "location":         initializer.global_config.location,
            "model":            "gemini-2.0-flash",
            "api_type":         "google",
        }]
    }

To learn more about configuring the model in AG2, see [Model Configuration
Deep-dive](https://docs.ag2.ai/docs/user-guide/advanced-concepts/llm-configuration-deep-dive).

Optional: Configure the safety settings of the model.
The following is an example of how you can configure the safety settings:

    from vertexai.generative_models import HarmBlockThreshold, HarmCategory

    safety_settings = {
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    }

    for config_item in llm_config["config_list"]:
        config_item["safety_settings"] = safety_settings

To learn more about the options available for safety settings in
Gemini, see [Configure safety
attributes](https://docs.ag2.ai/latest/docs/user-guide/models/google-vertexai/#configure-safety-settings-for-vertexai).

Create an
[`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent)
using the model configurations:

    from vertexai import agent_engines

    agent = agent_engines.AG2Agent(
        model=model,                  # Required.
        runnable_name=runnable_name,  # Required.
        llm_config=llm_config,        # Optional.
    )

If you are running in an interactive environment (such as a terminal or
Colab notebook), you can run a query as an intermediate testing
step:

    response = agent.query(input="What is the exchange rate from US dollars to SEK today?", max_turns=1)

    print(response)

The response is a Python dictionary similar to the following example:

    {'chat_id': None,
     'chat_history': [{'content': 'What is the exchange rate from US dollars to Swedish currency?',
       'role': 'assistant',
       'name': 'user'},
      {'content': 'I do not have access to real-time information, including currency exchange rates. To get the most up-to-date exchange rate from US dollars to Swedish Krona (SEK), I recommend using a reliable online currency converter or checking with your bank. \n',
       'role': 'user',
       'name': 'Exchange Rate Agent'}],
     'summary': 'I do not have access to real-time information, including currency exchange rates. To get the most up-to-date exchange rate from US dollars to Swedish Krona (SEK), I recommend using a reliable online currency converter or checking with your bank. \n',
     'cost': {'usage_including_cached_inference': {'total_cost': 5.2875e-06,
       'gemini-2.0-flash': {'cost': 5.2875e-06,
        'prompt_tokens': 34,
        'completion_tokens': 62,
        'total_tokens': 96}},
      'usage_excluding_cached_inference': {'total_cost': 5.2875e-06,
       'gemini-2.0-flash': {'cost': 5.2875e-06,
        'prompt_tokens': 34,
        'completion_tokens': 62,
        'total_tokens': 96}}},
     'human_input': []}

> [!NOTE]
> **Note:** The response indicates that the agent is unable to provide the exchange rate. When the agent is [equipped with an exchange rate tool](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent#define-function), it will perform [function
> calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) to use the tool and provide a better response.

### Optional: Advanced customization

The
[`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent)
template uses `api_type=="google"` by default, because it provides access to all
foundational models available in Google Cloud. To use a model that is not
available through `api_type=="google"`, you can customize the `llm_config`
parameter.

For a list of the models supported in AG2 and their capabilities, see
[Model Providers](https://docs.ag2.ai/docs/user-guide/models/).
The set of supported values for `llm_config=` are specific to
each chat model, so you should refer to their corresponding documentation for
details.

### Gemini

Installed by default.

It is used in [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent) when you omit the `llm_config`
argument, for example

    from vertexai import agent_engines

    agent = agent_engines.AG2Agent(
        model=model,                # Required.
        runnable_name=runnable_name # Required.
    )

### Anthropic

First, follow their [documentation](https://docs.ag2.ai/docs/user-guide/models/anthropic)
to set up an account and install the package.

Next, define a `llm_config`:

    llm_config = {
        "config_list": [{
            "model": "claude-3-5-sonnet-20240620",            # Required.
            "api_key": "ANTHROPIC_API_KEY",  # Required.
            "api_type": "anthropic",                          # Required.
         }]
    }

Finally, use it in [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent) with the following code:

    from vertexai import agent_engines

    agent = agent_engines.AG2Agent(
        model="claude-3-5-sonnet-20240620",             # Required.
        runnable_name=runnable_name,                    # Required.
        llm_config=llm_config,                          # Optional.
    )

### OpenAI

You can use `OpenAI` in conjunction with Gemini's [ChatCompletions
API](https://docs.ag2.ai/latest/docs/user-guide/models/google-vertexai/#use-gemini-via-the-openai-library-in-ag2).

First, define a `llm_config`:

    import google.auth
    from google.cloud.aiplatform.aiplatform import initializer

    project = initializer.global_config.project
    location = initializer.global_config.location
    base_url = f"https://{location}-aiplatform.googleapis.com/v1beta1/projects/{project}/locations/{location}/endpoints/openapi"

    # Note: the credential lives for 1 hour by default.
    # After expiration, it must be refreshed.
    creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    auth_req = google.auth.transport.requests.Request()
    creds.refresh(auth_req)

    llm_config = {
        "config_list": [{
            "model": "google/gemini-2.0-flash",  # Required.
            "api_type": "openai",                    # Required.
            "base_url": base_url,                    # Required.
            "api_key": creds.token,                  # Required.
        }]
    }

Finally, use it in [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent) with the following code:

    from vertexai import agent_engines

    agent = agent_engines.AG2Agent(
        model="google/gemini-2.0-flash",  # Or "meta/llama3-405b-instruct-maas".
        runnable_name=runnable_name,          # Required.
        llm_config=llm_config,                # Optional.
    )

## Step 2. Define and use a tool

After you define your model, the next step is to define the tools that your
model uses for reasoning. A tool can be a
[AG2 tool](https://docs.ag2.ai/docs/api-reference/autogen/tools/Tool#autogen-tools-tool)
or a Python function.

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

    {'amount': 1.0, 'base': 'USD', 'date': '2024-02-22', 'rates': {'SEK': 10.3043}}

To use the tool inside `AG2Agent`, you will add it to the
list of tools under the `tools=` argument:

    from vertexai import agent_engines

    agent = agent_engines.AG2Agent(
        model=model,                 # Required.
        runnable_name=runnable_name, # Required.
        tools=[get_exchange_rate],   # Optional.
    )

You can test the agent locally by performing test queries against it. Run the
following command to test the agent locally using US dollars and Swedish Krona:

    response = agent.query(input="What is the exchange rate from US dollars to Swedish currency?", max_turns=2)

The response is a dictionary that's similar to the following:

    {'chat_id': None,
     'chat_history': [{'content': 'What is the exchange rate from US dollars to Swedish currency?',
       'role': 'assistant',
       'name': 'user'},
      {'content': '',
       'tool_calls': [{'id': '2285',
         'function': {'arguments': '{"currency_from": "USD", "currency_to": "SEK"}',
          'name': 'get_exchange_rate'},
         'type': 'function'}],
       'role': 'assistant'},
      {'content': "{'amount': 1.0, 'base': 'USD', 'date': '2025-02-27', 'rates': {'SEK': 10.6509}}",
       'tool_responses': [{'tool_call_id': '2285',
         'role': 'tool',
         'content': "{'amount': 1.0, 'base': 'USD', 'date': '2025-02-27', 'rates': {'SEK': 10.6509}}"}],
       'role': 'tool',
       'name': 'user'},
      {'content': 'The current exchange rate is 1 USD to 10.6509 SEK. \n',
       'role': 'user',
       'name': 'Get Exchange Rate Agent'},
      {'content': 'What is the exchange rate from US dollars to Swedish currency?',
       'role': 'assistant',
       'name': 'user'},
      {'content': '',
       'tool_calls': [{'id': '4270',
         'function': {'arguments': '{"currency_from": "USD", "currency_to": "SEK"}',
          'name': 'get_exchange_rate'},
         'type': 'function'}],
       'role': 'assistant'},
      {'content': "{'amount': 1.0, 'base': 'USD', 'date': '2025-02-27', 'rates': {'SEK': 10.6509}}",
       'tool_responses': [{'tool_call_id': '4270',
         'role': 'tool',
         'content': "{'amount': 1.0, 'base': 'USD', 'date': '2025-02-27', 'rates': {'SEK': 10.6509}}"}],
       'role': 'tool',
       'name': 'user'},
      {'content': 'The current exchange rate is 1 USD to 10.6509 SEK. \n',
       'role': 'user',
       'name': 'Get Exchange Rate Agent'}],
     'summary': 'The current exchange rate is 1 USD to 10.6509 SEK. \n',
     'cost': {'usage_including_cached_inference': {'total_cost': 0.0002790625,
       'gemini-2.0-flash': {'cost': 0.0002790625,
        'prompt_tokens': 757,
        'completion_tokens': 34,
        'total_tokens': 791}},
      'usage_excluding_cached_inference': {'total_cost': 0.0002790625,
       'gemini-2.0-flash': {'cost': 0.0002790625,
        'prompt_tokens': 757,
        'completion_tokens': 34,
        'total_tokens': 791}}},
     'human_input': []}

## Step 3. Customize the orchestration

All AG2 agents implement the [ConversableAgent interface](https://docs.ag2.ai/latest/docs/user-guide/basic-concepts/conversable-agent/),
which provide input and output schemas for orchestration. The
[`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent)
template requires a runnable to be built for it to respond to queries. By
default,
[`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent)
will build such a runnable by [binding the model with
tools](https://docs.ag2.ai/latest/docs/api-reference/autogen/ConversableAgent/).

You might want to customize the orchestration if you intend to (i) implement an
[Assistant
Agent](https://docs.ag2.ai/docs/api-reference/autogen/AssistantAgent#autogen-assistantagent)
that solves a task with model, or (ii) implement an [User Proxy
Agent](https://docs.ag2.ai/latest/docs/api-reference/autogen/UserProxyAgent/)
that can execute code and provide feedback to the other agents, or (iii)
implement a [Reasoning
Agent](https://docs.ag2.ai/docs/api-reference/autogen/ReasoningAgent) that
solves a task with model and tree-of-thought reasoning. To do so, you have to
override the default runnable when creating
[`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent)
by specifying the `runnable_builder=` argument with a Python function of the
following signature:

    def runnable_builder(
        **runnable_kwargs,
    ):

This gives different options for customizing the orchestration logic.

### Assistant Agent

In the simplest case, to create an assistant agent without orchestration,
you can override the `runnable_builder` for [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent).

    from vertexai import agent_engines

    def runnable_builder(**kwargs):
        from autogen import agentchat

        return agentchat.AssistantAgent(**kwargs)

    agent = agent_engines.AG2Agent(
        model=model,
        runnable_name=runnable_name,
        runnable_builder=runnable_builder,
    )

### User Proxy Agent

In the simplest case, to create a user proxy agent without orchestration,
you can override the `runnable_builder` for [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent).

    from vertexai import agent_engines

    def runnable_builder(**kwargs):
        from autogen import agentchat

        return agentchat.UserProxyAgent(**kwargs)

    agent = agent_engines.AG2Agent(
        model=model,
        runnable_name=runnable_name,
        runnable_builder=runnable_builder,
    )

### Reasoning Agent

In the simplest case, to create a reasoning agent without orchestration,
you can override the `runnable_builder` for [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent).

    from vertexai import agent_engines

    def runnable_builder(**kwargs):
        from autogen import agentchat

        return agentchat.ReasoningAgent(**kwargs)

    agent = agent_engines.AG2Agent(
        model=model,
        runnable_name=runnable_name,
        runnable_builder=runnable_builder,
    )

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Use an AG2 agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent)

Use an AG2 agent with Agent Platform Runtime.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
