Agent Runtime lets you develop and deploy agents using the framework-specific LangGraph template. By using the `LanggraphAgent` class in the `Agent Platform SDK`, you can create agents that perform complex tasks and integrate with external tools.

This document explains how to develop a LangGraph agent, including defining the
model, equipping it with tools to perform actions like retrieving exchange
rates, and customizing the orchestration flow.

For more information on managing your deployed agents, see
[Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).

## Before you begin

Make sure your environment is set up by following
the steps in [Set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup).

## Step 1. Define and configure a model

Specify the model you want to use:

    model = "gemini-2.0-flash"

Optional: Configure the safety settings of the model. To learn more
about the options available for safety settings in Gemini, see
[Configure safety attributes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters).
The following is an example of how you can configure the safety settings:

    from langchain_google_vertexai import HarmBlockThreshold, HarmCategory

    safety_settings = {
        HarmCategory.HARM_CATEGORY_UNSPECIFIED: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
    }

Optional: Specify [model parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding#set_model_parameters)
in the following way:

    model_kwargs = {
        # temperature (float): The sampling temperature controls the degree of
        # randomness in token selection.
        "temperature": 0.28,
        # max_output_tokens (int): The token limit determines the maximum amount of
        # text output from one prompt.
        "max_output_tokens": 1000,
        # top_p (float): Tokens are selected from most probable to least until
        # the sum of their probabilities equals the top-p value.
        "top_p": 0.95,
        # top_k (int): The next token is selected from among the top-k most
        # probable tokens. This is not supported by all model versions. See
        # https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#valid_parameter_values
        # for details.
        "top_k": None,
        # safety_settings (Dict[HarmCategory, HarmBlockThreshold]): The safety
        # settings to use for generating content.
        # (you must create your safety settings using the previous step first).
        "safety_settings": safety_settings,
    }

Create a [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) using the model configurations:

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,                # Required.
        model_kwargs=model_kwargs,  # Optional.
    )

If you are running in an interactive environment (e.g. terminal or Colab
notebook), you can run a query as an intermediate testing step:

    response = agent.query(input={"messages": [
        ("user", "What is the exchange rate from US dollars to SEK today?"),
    ]})

    print(response)

The response is a Python dictionary similar to the following example:

    {
      'messages': [{
        'id': ['langchain', 'schema', 'messages', 'HumanMessage'],
        'kwargs': {
          'content': 'What is the exchange rate from US dollars to Swedish currency?',
          'id': '5473dd25-d796-42ad-a690-45bc49a64bec',
          'type': 'human',
        },
        'lc': 1,
        'type': 'constructor',
      }, {
        'id': ['langchain', 'schema', 'messages', 'AIMessage'],
        'kwargs': {
          'content': """
            I do not have access to real-time information, including currency exchange rates.

            To get the most up-to-date exchange rate from US dollars to Swedish currency (SEK),
            I recommend checking a reliable online currency converter like: ...

            These websites will provide you with the current exchange rate and allow you to
            convert specific amounts.""",
          'id': 'run-c42f9940-8ba8-42f1-a625-3aa0780c9e87-0',
          ...
          'usage_metadata': {
            'input_tokens': 12,
            'output_tokens': 145,
            'total_tokens': 157,
          },
        },
        'lc': 1,
        'type': 'constructor',
      }],
    }

> [!NOTE]
> **Note:** The response indicates that the agent is unable to provide the exchange rate. When the agent is [equipped with an exchange rate tool](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#define-function), it will perform [function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) to use the tool and provide a better response.

### Optional: Advanced customization

The [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) template uses [`ChatVertexAI`](https://python.langchain.com/v0.2/docs/integrations/chat/google_vertex_ai_palm/) by default, because it provides access to all
foundational models available in Google Cloud. To use a model that is not
available through `ChatVertexAI`, you can specify the `model_builder=` argument,
with a Python function of the following signature:

    from typing import Optional

    def model_builder(
        *,
        model_name: str,                      # Required. The name of the model
        model_kwargs: Optional[dict] = None,  # Optional. The model keyword arguments.
        **kwargs,                             # Optional. The remaining keyword arguments to be ignored.
    ):

For a list of the chat models supported in LangChain and their capabilities, see
[Chat Models](https://python.langchain.com/v0.2/docs/integrations/chat/).
The set of supported values for `model=` and `model_kwargs=` are specific to
each chat model, so you have to refer to their corresponding documentation for
details.

### ChatVertexAI

Installed by default.

It is used in [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) when you omit the `model_builder`
argument, for example

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,                # Required.
        model_kwargs=model_kwargs,  # Optional.
    )

### ChatAnthropic

First, follow their [documentation](https://python.langchain.com/v0.2/docs/integrations/chat/anthropic/)
to set up an account and install the package.

Next, define a `model_builder` that returns `ChatAnthropic`:

    def model_builder(*, model_name: str, model_kwargs = None, **kwargs):
        from langchain_anthropic import ChatAnthropic
        return ChatAnthropic(model_name=model_name, **model_kwargs)

Finally, use it in [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) with the following code:

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model="claude-3-opus-20240229",                       # Required.
        model_builder=model_builder,                          # Required.
        model_kwargs={
            "api_key": "ANTHROPIC_API_KEY",  # Required.
            "temperature": 0.28,                              # Optional.
            "max_tokens": 1000,                               # Optional.
        },
    )

### ChatOpenAI

You can use `ChatOpenAI` in conjunction with Gemini's [ChatCompletions API](https://docs.ag2.ai/latest/docs/user-guide/models/google-vertexai/#use-gemini-via-the-openai-library-in-ag2).

First, follow their [documentation](https://python.langchain.com/v0.2/docs/integrations/chat/openai/)
to install the package.

Next, define a `model_builder` that returns `ChatOpenAI`:

    def model_builder(
        *,
        model_name: str,
        model_kwargs = None,
        project: str,   # Specified via vertexai.init
        location: str,  # Specified via vertexai.init
        **kwargs,
    ):
        import google.auth
        from langchain_openai import ChatOpenAI

        # Note: the credential lives for 1 hour by default.
        # After expiration, it must be refreshed.
        creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
        auth_req = google.auth.transport.requests.Request()
        creds.refresh(auth_req)

        if model_kwargs is None:
            model_kwargs = {}

        endpoint = f"https://{location}-aiplatform.googleapis.com"
        base_url = f'{endpoint}/v1beta1/projects/{project}/locations/{location}/endpoints/openapi'

        return ChatOpenAI(
            model=model_name,
            base_url=base_url,
            api_key=creds.token,
            **model_kwargs,
        )

Finally, use it in [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) with the following code:

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model="google/gemini-2.0-flash",  # Or "meta/llama3-405b-instruct-maas"
        model_builder=model_builder,        # Required.
        model_kwargs={
            "temperature": 0,               # Optional.
            "max_retries": 2,               # Optional.
        },
    )

## Step 2. Define and use a tool

After you define your model, the next step is to define the tools that your
model uses for reasoning. A tool can be a
[LangChain tool](https://python.langchain.com/docs/concepts/tools/) or a Python
function. You can also
[convert a defined Python function to a LangChain Tool](https://python.langchain.com/docs/how_to/custom_tools/).

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

To use the tool inside [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent), you will add it to the
list of tools under the `tools=` argument:

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,                # Required.
        tools=[get_exchange_rate],  # Optional.
        model_kwargs=model_kwargs,  # Optional.
    )

You can test the agent locally by performing test queries against it. Run the
following command to test the agent locally using US dollars and Swedish Krona:

    response = agent.query(input={"messages": [
        ("user", "What is the exchange rate from US dollars to Swedish currency?"),
    ]})

The response is a dictionary that's similar to the following:

    {"input": "What is the exchange rate from US dollars to Swedish currency?",
     "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

### Optional: Multiple tools

Tools for [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) can be defined and instantiated in other ways.

### Grounding Tool

First, import the `generate_models` package and create the tool

    from vertexai.generative_models import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.generative_models.grounding.html, Tool

    grounded_search_tool = Tool.from_google_search_retrieval(
        https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.generative_models.grounding.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.generative_models.grounding.GoogleSearchRetrieval.html()
    )

Next, use the tool inside [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,
        tools=[grounded_search_tool],
    )
    response = agent.query(input={"messages": [
        ("user", "When is the next total solar eclipse in US?"),
    ]})
    print(response)

The response is a dictionary that is similar to the following:

    {"input": "When is the next total solar eclipse in US?",
     "output": """The next total solar eclipse in the U.S. will be on August 23, 2044.
     This eclipse will be visible from three states: Montana, North Dakota, and
     South Dakota. The path of totality will begin in Greenland, travel through
     Canada, and end around sunset in the United States."""}

For details, visit [Grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview).

### LangChain Tool

First, install the package that defines the tool.

    pip install langchain-google-community

Next, import the package and create the tool.

    from langchain_google_community import VertexAISearchRetriever
    from langchain.tools.retriever import create_retriever_tool

    retriever = VertexAISearchRetriever(
        project_id="PROJECT_ID",
        data_store_id="DATA_STORE_ID",
        location_id="DATA_STORE_LOCATION_ID",
        engine_data_type=1,
        max_documents=10,
    )
    movie_search_tool = create_retriever_tool(
        retriever=retriever,
        name="search_movies",
        description="Searches information about movies.",
    )

Finally, use the tool inside [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,
        tools=[movie_search_tool],
    )
    response = agent.query(input={"messages": [
        ("user", "List some sci-fi movies from the 1990s"),
    ]})

    print(response)

It should return a response such as

    {"input": "List some sci-fi movies from the 1990s",
     "output": """Here are some sci-fi movies from the 1990s:
        * The Matrix (1999): A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.
        * Star Wars: Episode I - The Phantom Menace (1999): Two Jedi Knights escape a hostile blockade to find a queen and her protector, and come across a young boy [...]
        * Men in Black (1997): A police officer joins a secret organization that monitors extraterrestrial interactions on Earth.
        [...]
     """}

To see the full example, visit the [notebook](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_vertex_ai_search_rag_agent.ipynb).

For more examples of tools available in LangChain, visit [Google Tools](https://python.langchain.com/v0.2/docs/integrations/platforms/google/#tools).

### Agent Platform Extension

First, import the extensions package and create the tool

    from typing import Optional

    def generate_and_execute_code(
        query: str,
        files: Optional[list[str]] = None,
        file_gcs_uris: Optional[list[str]] = None,
    ) -> str:
        """Get the results of a natural language query by generating and executing
        a code snippet.

        Example queries: "Find the max in [1, 2, 5]" or "Plot average sales by
        year (from data.csv)". Only one of `file_gcs_uris` and `files` field
        should be provided.

        Args:
            query:
                The natural language query to generate and execute.
            file_gcs_uris:
                Optional. URIs of input files to use when executing the code
                snippet. For example, ["gs://input-bucket/data.csv"].
            files:
                Optional. Input files to use when executing the generated code.
                If specified, the file contents are expected be base64-encoded.
                For example: [{"name": "data.csv", "contents": "aXRlbTEsaXRlbTI="}].
        Returns:
            The results of the query.
        """
        operation_params = {"query": query}
        if files:
            operation_params["files"] = files
        if file_gcs_uris:
            operation_params["file_gcs_uris"] = file_gcs_uris

        from vertexai.preview import extensions

        # If you have an existing extension instance, you can get it here
        # i.e. code_interpreter = extensions.Extension(resource_name).
        code_interpreter = extensions.Extension.from_hub("code_interpreter")
        return extensions.Extension.from_hub("code_interpreter").execute(
            operation_id="generate_and_execute",
            operation_params=operation_params,
        )

Next, use the tool inside [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,
        tools=[generate_and_execute_code],
    )
    response = agent.query(input={"messages": [("user", """
        Using the data below, construct a bar chart that includes only the height values with different colors for the bars:

        tree_heights_prices = {
          \"Pine\": {\"height\": 100, \"price\": 100},
          \"Oak\": {\"height\": 65, \"price\": 135},
          \"Birch\": {\"height\": 45, \"price\": 80},
          \"Redwood\": {\"height\": 200, \"price\": 200},
          \"Fir\": {\"height\": 180, \"price\": 162},
        }
    """)]})

    print(response)

It should return a response such as

    {"input": """Using the data below, construct a bar chart that includes only the height values with different colors for the bars:

     tree_heights_prices = {
        \"Pine\": {\"height\": 100, \"price\": 100},
        \"Oak\": {\"height\": 65, \"price\": 135},
        \"Birch\": {\"height\": 45, \"price\": 80},
        \"Redwood\": {\"height\": 200, \"price\": 200},
        \"Fir\": {\"height\": 180, \"price\": 162},
     }
     """,
     "output": """Here's the generated bar chart:
     ```python
     import matplotlib.pyplot as plt

     tree_heights_prices = {
        "Pine": {"height": 100, "price": 100},
        "Oak": {"height": 65, "price": 135},
        "Birch": {"height": 45, "price": 80},
        "Redwood": {"height": 200, "price": 200},
        "Fir": {"height": 180, "price": 162},
     }

     heights = [tree["height"] for tree in tree_heights_prices.values()]
     names = list(tree_heights_prices.keys())

     plt.bar(names, heights, color=['red', 'green', 'blue', 'purple', 'orange'])
     plt.xlabel('Tree Species')
     plt.ylabel('Height')
     plt.title('Tree Heights')
     plt.show()
     ```
     """}

For your deployed agent to access the Code Interpreter extension, you must
add the Agent Platform User role (`roles/aiplatform.user`) to the AI
Platform Reasoning Engine Service Agent service account. For more
information, see [Managing
access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#roles).

You can use all (or a subset) of the tools you've created in
[`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,
        tools=[
            get_exchange_rate,         # Optional (Python function)
            grounded_search_tool,      # Optional (Grounding Tool)
            movie_search_tool,         # Optional (Langchain Tool)
            generate_and_execute_code, # Optional (Vertex Extension)
        ],
    )

    response = agent.query(input={"messages": [
        ("user", "List some sci-fi movies from the 1990s"),
    ]})

    print(response)

### Optional: Tool configuration

With Gemini, you can place constraints on tool usage. For example,
instead of allowing the model to generate natural language responses, you can
force it to only generate function calls ("forced function calling").

    from vertexai import agent_engines
    from vertexai.preview.generative_models import ToolConfig

    agent = agent_engines.LanggraphAgent(
        model="gemini-2.0-flash",
        tools=[search_arxiv, get_exchange_rate],
        model_tool_kwargs={
            "tool_config": {  # Specify the tool configuration here.
                "function_calling_config": {
                    "mode": ToolConfig.FunctionCallingConfig.Mode.ANY,
                    "allowed_function_names": ["search_arxiv", "get_exchange_rate"],
                },
            },
        },
    )

    response = agent.query(input={"messages": [
        ("user", "Explain the Schrodinger equation in a few sentences"),
    ]})

    print(response)

For details, visit [Tool Configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling#tool-config).

## Step 3. Store checkpoints

To track chat messages and append them to a database, define a
`checkpointer_builder` function and pass it in when you create the agent.

### Set up a database

First, install and use the relevant package to set up a database of your choice (e.g. AlloyDB for PostgreSQL, or Cloud SQL for PostgreSQL):

- [AlloyDB for PostgreSQL](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/langgraph_checkpoint.ipynb)
- [Cloud SQL for PostgreSQL](https://github.com/googleapis/langchain-google-cloud-sql-pg-python/blob/main/docs/langgraph_checkpoint.ipynb)

Next, define a `checkpointer_builder` function as follows:

### Cloud SQL for PostgreSQL

    checkpointer_kwargs = {
        "project_id": "PROJECT_ID",
        "region": "REGION",
        "instance": "INSTANCE",
        "database": "DATABASE",
    }

    def checkpointer_builder(**kwargs):
        from langchain_google_cloud_sql_pg import (
            PostgresEngine,
            PostgresSaver,
        )
        engine = PostgresEngine.from_instance(**kwargs)
        https://docs.cloud.google.com/python/docs/reference/langchain-google-cloud-sql-pg/latest.init_checkpoint_table()

        return PostgresSaver.create_sync(engine)

### AlloyDB for PostgreSQL

    checkpointer_kwargs = {
        "project_id": "PROJECT_ID",
        "region": "REGION",
        "instance": "INSTANCE",
        "database": "DATABASE",
        "cluster": "CLUSTER",
    }

    def checkpointer_builder(**kwargs):
        from langchain_google_alloydb_pg import (
            AlloyDBEngine,
            AlloyDBSaver,
        )
        from google.cloud.alloydb.connector import IPTypes

        engine = AlloyDBEngine.from_instance(
            ip_type=IPTypes.PUBLIC,
            **kwargs,
        )
        https://docs.cloud.google.com/python/docs/reference/langchain-google-alloydb-pg/latest.init_checkpoint_table()

        return AlloyDBSaver.create_sync(engine)

Finally, create the agent and pass it in as `checkpointer_builder`:

    from vertexai import agent_engines

    agent = agent_engines.LanggraphAgent(
        model=model,
        checkpointer_kwargs=checkpointer_kwargs,    # <- new
        checkpointer_builder=checkpointer_builder,  # <- new
    )

When querying the agent, make sure you specify a `thread_id` so that the agent
has "memory" of past questions and answers:

    response = agent.query(
        input={"messages": [
            ("user", "What is the exchange rate from US dollars to Swedish currency?")
        ]},
        config={"configurable": {"thread_id": "THREAD_ID"}},
    )

    print(response)

You can check that subsequent queries will retain memory of the session:

    response = agent.query(
        input={"messages": [("user", "How much is 100 USD?")]},
        config={"configurable": {"thread_id": "THREAD_ID"}},
    )

    print(response)

## Step 4. Customize the prompt template

Prompt templates help to translate user input into instructions for a model, and
are used to guide a model's response, helping it understand the context and
generate relevant and coherent language-based output. For details, visit
[ChatPromptTemplates](https://python.langchain.com/v0.2/docs/concepts/#chatprompttemplates).

The default prompt template is organized sequentially into sections.

| Section | Description |
|---|---|
| Optional: System instruction | Instructions for the agent to be applied across all queries. |
| Optional: Chat history | Messages corresponding to the chat history from a past session. |
| User input | The query from the user for the agent to respond to. |
| Agent Scratchpad | Messages created by the agent (e.g. with function calling) as it performs uses its tools and performs reasoning to formulate a response to the user. |

The default prompt template is generated if you create the agent without
specifying your own prompt template, and will look like the following in full:

    from langchain_core.prompts import ChatPromptTemplate
    from langchain.agents.format_scratchpad.tools import format_to_tool_messages

    prompt_template = {
        "user_input": lambda x: x["input"],
        "history": lambda x: x["history"],
        "agent_scratchpad": lambda x: format_to_tool_messages(x["intermediate_steps"]),
    } | ChatPromptTemplate.from_messages([
        ("system", "{system_instruction}"),
        ("placeholder", "{history}"),
        ("user", "{user_input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

You are implicitly using the full prompt template when you instantiate the agent
in the following example:

    from vertexai import agent_engines

    system_instruction = "I help look up the rate between currencies"

    agent = agent_engines.LanggraphAgent(
        model=model,
        system_instruction=system_instruction,
        checkpointer_kwargs=checkpointer_kwargs,
        checkpointer_builder=checkpointer_builder,
        tools=[get_exchange_rate],
    )

You can override the default prompt template with your own prompt template, and
use it when constructing the agent, for example:

    from vertexai import agent_engines

    custom_prompt_template = {
        "user_input": lambda x: x["input"],
        "history": lambda x: x["history"],
        "agent_scratchpad": lambda x: format_to_tool_messages(x["intermediate_steps"]),
    } | ChatPromptTemplate.from_messages([
        ("placeholder", "{history}"),
        ("user", "{user_input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    agent = agent_engines.LanggraphAgent(
        model=model,
        prompt=custom_prompt_template,
        checkpointer_kwargs=checkpointer_kwargs,
        checkpointer_builder=checkpointer_builder,
        tools=[get_exchange_rate],
    )

    response = agent.query(
        input={"messages": [
            ("user", "What is the exchange rate from US dollars to Swedish currency?"),
        ]},
        config={"configurable": {"thread_id": "THREAD_ID"}},
    )

    print(response)

## Step 5. Customize the orchestration

All LangChain components implement the [Runnable interface](https://python.langchain.com/v0.2/docs/concepts/#runnable-interface),
which provide input and output schemas for orchestration. The [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) class
requires a runnable to be built for it to respond to queries. By default,
[`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) will build such a runnable by using the prebuilt react
agent implementation from langgraph.

You might want to customize the orchestration if you intend to (i) implement an
agent that performs a deterministic set of steps (rather than to perform
open-ended reasoning), or (ii) prompt the Agent in a ReAct-like fashion to
annotate each step with thoughts for why it performed that step. To do so, you
have to override the default runnable when creating [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) by
specifying the `runnable_builder=` argument with a Python function of the
following signature:

    from typing import Optional
    from langchain_core.language_models import BaseLanguageModel

    def runnable_builder(
        model: BaseLanguageModel,
        *,
        system_instruction: Optional[str] = None,
        prompt: Optional["RunnableSerializable"] = None,
        tools: Optional[Sequence["_ToolLike"]] = None,
        checkpointer: Optional[Any] = None,
        runnable_kwargs: Optional[Mapping[str, Any]] = None,
        **kwargs,
    ):

where

- `model` corresponds to the chat model being returned from the `model_builder` (see [Define and configure a model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#custom-model)),
- `tools` corresponds to the tools and configurations to be used (see [Define and use a tool](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#define-function)),
- `checkpointer` corresponds to the database for storing checkpoints (see [Store checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#store-checkpoints)),
- `system_instruction` and `prompt` corresponds to the prompt configuration (see [Customize the prompt template](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#prompt-template)),
- `runnable_kwargs` are the keyword arguments you can use for customizing the runnable to be built.

This gives different options for customizing the orchestration logic.

### ChatModel

In the simplest case, to create an agent without orchestration, you can
override the `runnable_builder` for [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) to return the `model`
directly.

    from vertexai import agent_engines
    from langchain_core.language_models import BaseLanguageModel

    def llm_builder(model: BaseLanguageModel, **kwargs):
        return model

    agent = agent_engines.LanggraphAgent(
        model=model,
        runnable_builder=llm_builder,
    )

### ReAct

To override the default [tool-calling behavior](https://python.langchain.com/v0.1/docs/modules/model_io/chat/function_calling/) with your own ReAct agent based on
your own `prompt` (see [Customize the Prompt Template](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#prompt-template)),
you need to override the `runnable_builder` for [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent).

    from typing import Sequence
    from langchain_core.language_models import BaseLanguageModel
    from langchain_core.prompts import BasePromptTemplate
    from langchain_core.tools import BaseTool
    from langchain import hub

    from vertexai import agent_engines

    def react_builder(
        model: BaseLanguageModel,
        *,
        tools: Sequence[BaseTool],
        prompt: BasePromptTemplate,
        agent_executor_kwargs = None,
        **kwargs,
    ):
        from langchain.agents.react.agent import create_react_agent
        from langchain.agents import AgentExecutor

        agent = create_react_agent(model, tools, prompt)
        return AgentExecutor(agent=agent, tools=tools, **agent_executor_kwargs)

    agent = agent_engines.LanggraphAgent(
        model=model,
        tools=[get_exchange_rate],
        prompt=hub.pull("hwchase17/react"),
        agent_executor_kwargs={"verbose": True}, # Optional. For illustration.
        runnable_builder=react_builder,
    )

### LCEL Syntax

To construct the following graph using LangChain Expression Language (LCEL),

       Input
       /   \
     Pros  Cons
       \   /
      Summary

you need to override the `runnable_builder` for [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

    from vertexai import agent_engines

    def lcel_builder(*, model, **kwargs):
        from operator import itemgetter
        from langchain_core.prompts import ChatPromptTemplate
        from langchain_core.runnables import RunnablePassthrough
        from langchain_core.output_parsers import StrOutputParser

        output_parser = StrOutputParser()

        planner = ChatPromptTemplate.from_template(
            "Generate an argument about: {input}"
        ) | model | output_parser | {"argument": RunnablePassthrough()}

        pros = ChatPromptTemplate.from_template(
            "List the positive aspects of {argument}"
        ) | model | output_parser

        cons = ChatPromptTemplate.from_template(
            "List the negative aspects of {argument}"
        ) | model | output_parser

        final_responder = ChatPromptTemplate.from_template(
            "Argument:{argument}\nPros:\n{pros}\n\nCons:\n{cons}\n"
            "Generate a final response given the critique",
        ) | model | output_parser

        return planner | {
            "pros": pros,
            "cons": cons,
            "argument": itemgetter("argument"),
        } | final_responder

    agent = agent_engines.LanggraphAgent(
        model=model,
        runnable_builder=lcel_builder,
    )

### LangGraph

To construct the following graph using [LangGraph](https://langchain-ai.github.io/langgraph/),

       Input
       /   \
     Pros  Cons
       \   /
      Summary

you need to override the `runnable_builder` for [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

    from vertexai import agent_engines

    def langgraph_builder(*, model, **kwargs):
        from langchain_core.prompts import ChatPromptTemplate
        from langchain_core.output_parsers import StrOutputParser
        from langgraph.graph import END, MessageGraph

        output_parser = StrOutputParser()

        planner = ChatPromptTemplate.from_template(
            "Generate an argument about: {input}"
        ) | model | output_parser

        pros = ChatPromptTemplate.from_template(
            "List the positive aspects of {input}"
        ) | model | output_parser

        cons = ChatPromptTemplate.from_template(
            "List the negative aspects of {input}"
        ) | model | output_parser

        summary = ChatPromptTemplate.from_template(
            "Input:{input}\nGenerate a final response given the critique",
        ) | model | output_parser

        builder = MessageGraph()
        builder.add_node("planner", planner)
        builder.add_node("pros", pros)
        builder.add_node("cons", cons)
        builder.add_node("summary", summary)

        builder.add_edge("planner", "pros")
        builder.add_edge("planner", "cons")
        builder.add_edge("pros", "summary")
        builder.add_edge("cons", "summary")
        builder.add_edge("summary", END)
        builder.set_entry_point("planner")
        return builder.compile()

    agent = agent_engines.LanggraphAgent(
        model=model,
        runnable_builder=langgraph_builder,
    )

    # Example query
    response = agent.query(input={"role": "user", "content": "scrum methodology"})

    print(response)

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Use a LangGraph agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent)

Use a LangGraph agent with Agent Platform Runtime.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
