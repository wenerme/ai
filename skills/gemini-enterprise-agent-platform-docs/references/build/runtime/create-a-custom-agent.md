When you develop a custom agent using Agent Runtime, you define the agent's logic and capabilities as a Python class. This class-based approach gives you the flexibility to integrate with any Python-compatible library or service, while letting Agent Platform handle the deployment, scaling, and management of your agent instances.

The following steps show you how to create a custom template for instantiating
agents that are deployable on Agent Platform:

1. [Basic example](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#basic-example)
2. Optional: [Stream responses](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#streaming-responses)
3. Optional: [Register custom methods](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#custom-methods)
4. Optional: [Provide type annotations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#type-annotations)
5. Optional: [Send traces to Cloud Trace](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#tracing)
6. Optional: [Work with environment variables](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#environment-variables)
7. Optional: [Integrate with Secret Manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#secret-manager)
8. Optional: [Handle credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#handling-credentials)
9. Optional: [Handle errors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#handling-errors)

## Basic example

To give a basic example, the following Python class is a template for
instantiating agents that are deployable on Agent Platform (you can give the
`CLASS_NAME` variable a value such as `MyAgent`):

    from typing import Callable, Sequence

    class CLASS_NAME:
        def __init__(
            self,
            model: str,
            tools: Sequence[Callable],
            project: str,
            location: str,
        ):
            self.model_name = model
            self.tools = tools
            self.project = project
            self.location = location

        def set_up(self):
            import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
            from langchain_google_vertexai import ChatVertexAI
            from langgraph.prebuilt import create_react_agent

            https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=self.project, location=self.location)

            model = ChatVertexAI(model_name=self.model_name)
            self.graph = create_react_agent(model, tools=self.tools)

        def query(self, **kwargs):
            return self.graph.invoke(**kwargs)

### Deployment considerations

When writing your Python class, the following three methods are important:

1. `__init__()`:
   - Use this method for only agent configuration parameters. For example, you can use this method to collect the model parameters and [safety attributes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters) as input arguments from your users. You can also use this method to collect parameters such as the project ID, the region, application credentials, and API keys.
   - The constructor returns an object that must be "pickle-able" for it to be deployable to Agent Runtime. Therefore, you should initialize service clients and establish connections to databases in the `.set_up` method instead of the `__init__` method.
   - This method is optional. If it's not specified, Agent Runtime uses the default Python constructor for the class.
2. `set_up()`:
   - You must use this method to define agent initialization logic. For example, you use this method to establish connections to databases or dependent services, import dependent packages, or precompute data that's used for serving queries.
   - This method is optional. If it's not specified, Agent Runtime assumes that the agent doesn't need to call a `.set_up` method before serving user queries.
3. `query()` / `stream_query()`:
   - Use `query()` to return the complete response as a single result.
   - Use `stream_query()` to return the response in chunks as it becomes available, enabling a streaming experience. The `stream_query` method must return an iterable object (for example a generator) to enable streaming.
   - You can implement both methods if you want to support both single-response and streaming interactions with your agent.
   - You should give this method a clear docstring that defines what it does, documents its attributes, and provides type annotations for its inputs. Avoid variable arguments in the `query` and `stream_query` method.

### Instantiate the agent locally

You can create a local instance of your agent using the following code:

    agent = CLASS_NAME(
        model=model,  # Required.
        tools=[get_exchange_rate],  # Optional.
        project="PROJECT_ID",
        location="LOCATION",
    )
    agent.set_up()

### Test the `query` method

You can test the agent by sending queries to the local instance:

    response = agent.query(
        input="What is the exchange rate from US dollars to Swedish currency?"
    )

    print(response)

The response is a dictionary that's similar to the following:

    {"input": "What is the exchange rate from US dollars to Swedish currency?",
     # ...
     "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

## Querying asynchronously

To respond to queries asynchronously, you can define a method (such as `async_query`)
that returns a [Python Coroutine](https://peps.python.org/pep-0492/). As an
example, the following template extends the basic example to respond
asynchronously and is deployable on Agent Platform:

    class AsyncAgent(CLASS_NAME):

        async def async_query(self, **kwargs):
            from langchain.load.dump import dumpd

            for chunk in self.graph.ainvoke(**kwargs):
                yield dumpd(chunk)

    agent = AsyncAgent(
        model=model,                # Required.
        tools=[get_exchange_rate],  # Optional.
        project="PROJECT_ID",
        location="LOCATION",
    )
    agent.set_up()

### Test the `async_query` method

You can test the agent locally by calling the `async_query` method. Here's an
example:

    response = await agent.async_query(
        input="What is the exchange rate from US dollars to Swedish Krona today?"
    )
    print(response)

The response is a dictionary that's similar to the following:

    {"input": "What is the exchange rate from US dollars to Swedish currency?",
     # ...
     "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

## Streaming responses

To stream responses to queries, you can define a method named `stream_query`
that yields responses. As an example, the following template extends the basic
example to stream responses and is deployable on Agent Platform:

    from typing import Iterable

    class StreamingAgent(CLASS_NAME):

        def stream_query(self, **kwargs) -> Iterable:
            from langchain.load.dump import dumpd

            for chunk in self.graph.stream(**kwargs):
                yield dumpd(chunk)

    agent = StreamingAgent(
        model=model,                # Required.
        tools=[get_exchange_rate],  # Optional.
        project="PROJECT_ID",
        location="LOCATION",
    )
    agent.set_up()

Here are some key things to keep in mind when using the streaming API:

- **Maximum timeout**: The maximum timeout for streaming responses is 15 minutes. If your agent requires longer processing times, consider breaking down the task into smaller chunks.
- **Streaming models and chains** : LangChain's Runnable interface [supports
  streaming](https://python.langchain.com/docs/how_to/lcel_cheatsheet/#stream-a-runnable), so you can stream responses from not only agents, but also models and chains.
- **LangChain compatibility** : Note that asynchronous methods such as LangChain's `astream_event` method isn't supported at the moment.
- **Throttle content generation**: If you encounter backpressure issues (where the producer generates data faster than the consumer can process it), you should throttle your content generation rate. This can help prevent buffer overflows and ensure a smooth streaming experience.

### Test the `stream_query` method

You can test the streaming query locally by calling the `stream_query` method
and iterating through the results. Here's an example:

    import pprint

    for chunk in agent.stream_query(
        input="What is the exchange rate from US dollars to Swedish currency?"
    ):
        # Use pprint with depth=1 for a more concise, high-level view of the
        # streamed output.
        # To see the full content of the chunk, use:
        # print(chunk)
        pprint.pprint(chunk, depth=1)

This code prints each chunk of the response as it's generated. The output
might look something like this:

    {'actions': [...], 'messages': [...]}
    {'messages': [...], 'steps': [...]}
    {'messages': [...],
     'output': 'The exchange rate from US dollars to Swedish currency is 1 USD to '
               '10.5751 SEK. \n'}

In this example, each chunk contains different information about the response,
such as the actions taken by the agent, the messages exchanged, and the final
output.

## Streaming responses asynchronously

To stream responses asynchronously, you can define a method (such as
`async_stream_query`) that returns an [asynchronous
generator](https://peps.python.org/pep-0525/). As an example, the following
template extends the basic example to stream responses asynchronously and is
deployable on Agent Platform:

    class AsyncStreamingAgent(CLASS_NAME):

        async def async_stream_query(self, **kwargs):
            from langchain.load.dump import dumpd

            for chunk in self.graph.astream(**kwargs):
                yield dumpd(chunk)

    agent = AsyncStreamingAgent(
        model=model,                # Required.
        tools=[get_exchange_rate],  # Optional.
        project="PROJECT_ID",
        location="LOCATION",
    )
    agent.set_up()

### Test the `async_stream_query` method

Similar to the code for testing [streaming queries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#test-stream-query), you can
test the agent locally by calling the `async_stream_query` method and iterating
through the results. Here's an example:

    import pprint

    async for chunk in agent.async_stream_query(
        input="What is the exchange rate from US dollars to Swedish currency?"
    ):
        # Use pprint with depth=1 for a more concise, high-level view of the
        # streamed output.
        # To see the full content of the chunk, use:
        # print(chunk)
        pprint.pprint(chunk, depth=1)

This code prints each chunk of the response as it's generated. The output
might look something like this:

    {'actions': [...], 'messages': [...]}
    {'messages': [...], 'steps': [...]}
    {'messages': [...],
     'output': 'The exchange rate from US dollars to Swedish currency is 1 USD to '
               '10.5751 SEK. \n'}

## Registering custom methods

By default, the methods `query` and `stream_query` are registered as operations
in the deployed agent. You can override the default behavior and define the set
of operations to be registered using the `register_operations` method.
Operations can be registered as either standard (represented by an empty string
`""`) or streaming (`"stream"`) execution modes.

To register multiple operations, you can define a method named
`register_operations` that lists the methods to be made available to users when
the agent is deployed. In the following example code, the `register_operations`
method will result in the deployed agent registering `query` and `get_state` as
operations that run synchronously, and `stream_query` and `get_state_history` as
operations that streams the responses:

    from typing import Iterable

    class CustomAgent(StreamingAgent):

        def get_state(self) -> dict: # new synchronous method
            return self.graph.get_state(**kwargs)._asdict()

        def get_state_history(self) -> Iterable: # new streaming operation
            for state_snapshot in self.graph.get_state_history(**kwargs):
                yield state_snapshot._asdict()

        def register_operations(self):
            return {
                # The list of synchronous operations to be registered
                "": ["query", "get_state"],
                # The list of streaming operations to be registered
                "stream": ["stream_query", "get_state_history"],
            }

> [!NOTE]
> **Note:** You don't need to register methods for both standard and streaming operations. For example, to support only standard operations, you can return `{"": ["query", "get_state"]}` in the `register_operations` method without specifying a corresponding list of methods for `"stream"`.

You can test the custom methods by calling them directly on the local instance
of the agent, similarly to how you would test the [`query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#test-query) and
[`stream_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#test-stream-query) methods.

## Providing Type Annotations

You can use type annotations to specify the expected input and output types of
your agent methods. When the agent is deployed, only JSON-serializable types are
supported in the input and output of the operations supported by the agent. The
schemas of the inputs and outputs can be annotated using `TypedDict` or Pydantic
models.

In the following example, we annotate the input as a `TypedDict`, and convert
the raw output from `.get_state` (which is a `NamedTuple`) into a serializable
dictionary using its `._asdict()` method:

    from typing import Any, Dict, TypedDict

    # schemas.py
    class RunnableConfig(TypedDict, total=False):
        metadata: Dict[str, Any]
        configurable: Dict[str, Any]

    # agents.py
    class AnnotatedAgent(CLASS_NAME):

        def get_state(self, config: RunnableConfig) -> dict:
            return self.graph.get_state(config=config)._asdict()

        def register_operations(self):
            return {"": ["query", "get_state"]}

## Sending Traces to Cloud Trace

To send traces to Cloud Trace with instrumentation libraries that support
OpenTelemetry, you can import and initialize them in the `.set_up` method. For
common agent frameworks, you might be able to use [Open Telemetry Google Cloud
Integration](https://docs.cloud.google.com/trace/docs/setup/python-ot) in combination with an instrumentation
framework such as [OpenInference](https://arize-ai.github.io/openinference/) or
[OpenLLMetry](https://www.traceloop.com/docs/openllmetry/tracing/without-sdk).

As an example, the following template is a modification of the
[basic example](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#basic-example) to export traces to Cloud Trace:

### OpenInference

First, install the [required package](http://pypi.org/project/openinference-instrumentation-langchain)
using `pip` by running

    pip install openinference-instrumentation-langchain==0.1.34

Next, import and initialize the instrumentor:

    from typing import Callable, Sequence

    class CLASS_NAME:
        def __init__(
            self,
            model: str,
            tools: Sequence[Callable],
            project: str,
            location: str,
        ):
            self.model_name = model
            self.tools = tools
            self.project = project
            self.location = location

        def set_up(self):
            # The additional code required for tracing instrumentation.
            from opentelemetry import trace
            from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
            from opentelemetry.sdk.trace import TracerProvider
            from opentelemetry.sdk.trace.export import SimpleSpanProcessor
            from openinference.instrumentation.langchain import LangChainInstrumentor
            import google.cloud.trace_v2 as cloud_trace_v2
            import google.auth

            credentials, _ = google.auth.default()

            trace.set_tracer_provider(TracerProvider())
            cloud_trace_exporter = CloudTraceSpanExporter(
                project_id=self.project,
                client=cloud_trace_v2.TraceServiceClient(
                    credentials=credentials.with_quota_project(self.project),
                ),
            )
            trace.get_tracer_provider().add_span_processor(
                SimpleSpanProcessor(cloud_trace_exporter)
            )
            LangChainInstrumentor().instrument()
            # end of additional code required

            import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
            from langchain_google_vertexai import ChatVertexAI
            from langgraph.prebuilt import create_react_agent

            https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=self.project, location=self.location)

            model = ChatVertexAI(model_name=self.model_name)
            self.graph = create_react_agent(model, tools=self.tools)

        def query(self, **kwargs):
            return self.graph.invoke(**kwargs)

### OpenLLMetry

First, install the [required package](http://pypi.org/project/opentelemetry-instrumentation-langchain)
using `pip` by running

    pip install opentelemetry-instrumentation-langchain==0.38.10

Next, import and initialize the instrumentor:

    from typing import Callable, Sequence

    class CLASS_NAME:
        def __init__(
            self,
            model: str,
            tools: Sequence[Callable],
            project: str,
            location: str,
        ):
            self.model_name = model
            self.tools = tools
            self.project = project
            self.location = location

        def set_up(self):
            # The additional code required for tracing instrumentation.
            from opentelemetry import trace
            from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
            from opentelemetry.sdk.trace import TracerProvider
            from opentelemetry.sdk.trace.export import SimpleSpanProcessor
            from opentelemetry.instrumentation.langchain import LangchainInstrumentor
            import google.cloud.trace_v2 as cloud_trace_v2
            import google.auth

            credentials, _ = google.auth.default()

            trace.set_tracer_provider(TracerProvider())
            cloud_trace_exporter = CloudTraceSpanExporter(
                project_id=self.project,
                client=cloud_trace_v2.TraceServiceClient(
                    credentials=credentials.with_quota_project(self.project),
                ),
            )
            trace.get_tracer_provider().add_span_processor(
                SimpleSpanProcessor(cloud_trace_exporter)
            )
            LangchainInstrumentor().instrument()
            # end of additional code required

            import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
            from langchain_google_vertexai import ChatVertexAI
            from langgraph.prebuilt import create_react_agent

            https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=self.project, location=self.location)

            model = ChatVertexAI(model_name=self.model_name)
            self.graph = create_react_agent(model, tools=self.tools)

        def query(self, **kwargs):
            return self.graph.invoke(**kwargs)

## Working with Environment Variables

To set environment variables, ensure that they are available through
`os.environ` during development and follow the instructions in [Define
environment variables](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#environment-variables)
when deploying the agent.

## Integrating with Secret Manager

To integrate with Secret Manager:

1. Install the [client library](https://docs.cloud.google.com/python/docs/reference/secretmanager) by running

       pip install google-cloud-secret-manager

2. Follow the instructions in [Grant roles for a deployed agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#grant-role)
   to grant the [service
   account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions) the
   "Secret Manager Secret Accessor" role (`roles/secretmanager.secretAccessor`)
   through the Google Cloud console.

3. Import and initialize the client in the `.set_up` method and get the
   corresponding secret when needed. As an example, the following template is a
   modification of the [basic example](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#basic-example) to use an API key for
   `ChatAnthropic` that was [stored in
   Secret Manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#create-secret):

    from typing import Callable, Sequence

    class CLASS_NAME:
        def __init__(
            self,
            model: str,
            tools: Sequence[Callable],
            project: str,
        ):
            self.model_name = model
            self.tools = tools
            self.project = project
            self.secret_id = secret_id # <- new

        def set_up(self):
            from google.cloud import secretmanager
            from langchain_anthropic import ChatAnthropic
            from langgraph.prebuilt import create_react_agent

            # Get the API Key from Secret Manager here.
            self.secret_manager_client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
            secret_version = self.secret_manager_client.access_secret_version(request={
                "name": "projects/PROJECT_ID/secrets/SECRET_ID/versions/SECRET_VERSION",
            })
            # Use the API Key from Secret Manager here.
            model = ChatAnthropic(
                model_name=self.model_name,
                model_kwargs={"api_key": secret_version.payload.data.decode()},  # <- new
            )
            self.graph = create_react_agent(model, tools=self.tools)

        def query(self, **kwargs):
            return self.graph.invoke(**kwargs)

## Handling credentials

When the agent is deployed, it might need to handle different types of
credentials:

1. [Application default credentials (ADC)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#application-default-credentials) commonly arising from service accounts,
2. [OAuth](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#oauth) commonly arising from user accounts, and
3. [Identity providers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#identity-provider) for credentials from external accounts (workload identity federation).

### Application default credentials

    import google.auth

    credentials, project = google.auth.default(
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )

It can be used in code in the following way:

    from typing import Callable, Sequence

    class CLASS_NAME:
        def __init__(
            self,
            model: str = "meta/llama3-405b-instruct-maas",
            tools: Sequence[Callable],
            location: str,
            project: str,
        ):
            self.model_name = model
            self.tools = tools
            self.project = project
            self.endpoint = f"https://{location}-aiplatform.googleapis.com"
            self.base_url = f'{self.endpoint}/v1beta1/projects/{project}/locations/{location}/endpoints/openapi'

        def query(self, **kwargs):
            import google.auth
            from langchain_openai import ChatOpenAI
            from langgraph.prebuilt import create_react_agent

            # Note: the credential lives for 1 hour by default.
            # After expiration, it must be refreshed.
            creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            creds.refresh(google.auth.transport.requests.Request())

            model = ChatOpenAI(
                model=self.model_name,
                base_url=self.base_url,
                api_key=creds.token,  # Use the token from the credentials here.
            )
            graph = create_react_agent(model, tools=self.tools)
            return graph.invoke(**kwargs)

For details, visit [How Application Default Credentials
works](https://cloud.google.com/docs/authentication/application-default-credentials).

### OAuth

User credentials are typically obtained using [OAuth
2.0](https://developers.google.com/identity/protocols/OAuth2).

If you have an access token (such as from
[`oauthlib`](https://oauthlib.readthedocs.io/en/latest/)), you can create a
`google.oauth2.credentials.Credentials` instance. In addition, if you obtain a
refresh token, you can also specify the refresh token and token URI to allow the
credentials to be automatically refreshed:

    credentials = google.oauth2.credentials.Credentials(
        token="ACCESS_TOKEN",
        refresh_token="REFRESH_TOKEN",  # Optional
        token_uri="TOKEN_URI",          # E.g. "https://oauth2.googleapis.com/token"
        client_id="CLIENT_ID",          # Optional
        client_secret="CLIENT_SECRET"   # Optional
    )

Here, the `TOKEN_URI`, `CLIENT_ID` and
`CLIENT_SECRET` are based on [Create an OAuth client
credential](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#create-oauth-client-credential).

If you don't have an access token, you can use `google_auth_oauthlib.flow` to
perform the [OAuth 2.0 Authorization Grant
Flow](https://developers.google.com/identity/protocols/oauth2/web-server) to
obtain a corresponding `google.oauth2.credentials.Credentials` instance:

    from google.cloud import secretmanager
    from google_auth_oauthlib.flow import InstalledAppFlow
    import json

    # Get the client config from Secret Manager here.
    secret_manager_client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    secret_version = client.access_secret_version(request={
        "name": "projects/PROJECT_ID/secrets/SECRET_ID/versions/SECRET_VERSION",
    })
    client_config = json.loads(secret_version.payload.data.decode())

    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = InstalledAppFlow.from_client_config(
        client_config,
        scopes=['https://www.googleapis.com/auth/cloud-platform'],
        state="OAUTH_FLOW_STATE"  # from flow.authorization_url(...)
    )

    # You can get the credentials from the flow object.
    credentials: google.oauth2.credentials.Credentials = flow.credentials

    # After obtaining the credentials, you can then authorize API requests on behalf
    # of the given user or service account. For example, to authorize API requests
    # to vertexai services, you'll specify it in vertexai.init(credentials=)
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(
        project="PROJECT_ID",
        location="LOCATION",
        credentials=credentials, # specify the credentials here
    )

For details, visit the [documentation for the `google_auth_oauthlib.flow`
module](https://google-auth-oauthlib.readthedocs.io/en/latest/reference/google_auth_oauthlib.flow.html).

### Identity Provider

If you want to authenticate users using email/password, phone number, social
providers like Google, Facebook or GitHub, or a custom authentication mechanism,
you can use [Identity Platform](https://cloud.google.com/identity-platform/docs)
or [Firebase Authentication](https://firebase.google.com/docs/auth), or any
identity provider that supports OpenID Connect (OIDC).

For details, visit [Accessing resources from an OIDC identity provider](https://googleapis.dev/python/google-auth/latest/user-guide.html#accessing-resources-from-an-oidc-identity-provider).

## Handling errors

To ensure API errors are returned in a structured JSON format, we recommend
implementing error handling within your agent code using a `try...except` block,
which can be abstracted into a decorator.

While Agent Platform can handle various status codes
internally, Python lacks a standardized way to represent errors with associated
HTTP status codes across all exception types. Attempting to map all possible
Python exceptions to HTTP statuses within the underlying service would be
complex and difficult to maintain.

A more scalable approach is to explicitly catch relevant exceptions within your
agent methods, or by using a reusable decorator like `error_wrapper`. You can
then associate appropriate status codes (for example, by adding `code` and
`error` attributes to custom exceptions or handling standard exceptions
specifically) and format the error as a JSON dictionary for the return value.
This requires minimal code change within the agent methods themselves, often
only requiring you to add the decorator.

The following is an example of how you can implement error handling in your
agent:

    from functools import wraps
    import json

    def error_wrapper(func):
        @wraps(func)  # Preserve original function metadata
        def wrapper(*args, **kwargs):
            try:
                # Execute the original function with its arguments
                return func(*args, **kwargs)
            except Exception as err:
                error_code = getattr(err, 'code')
                error_message = getattr(err, 'error')

                # Construct the error response dictionary
                error_response = {
                    "error": {
                        "code": error_code,
                        "message": f"'{func.__name__}': {error_message}"
                    }
                }
                # Return the Python dictionary directly.
                return error_response

        return wrapper

    # Example exception
    class SessionNotFoundError(Exception):
        def __init__(self, session_id, message="Session not found"):
            self.code = 404
            self.error = f"{message}: {session_id}"
            super().__init__(self.error)

    # Example Agent Class
    class MyAgent:
        @error_wrapper
        def get_session(self, session_id: str):
            # Simulate the condition where the session isn't found
            raise SessionNotFoundError(session_id=session_id)

    # Example Usage: Session Not Found
    agent = MyAgent()
    error_result = agent.get_session(session_id="nonexistent_session_123")
    print(json.dumps(error_result, indent=2))

The preceding code results in the following output:
`json
{
"error": {
"code": 404,
"message": "Invocation error in 'get_session': Session not found: nonexistent_session_123"
}
}`

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent)

Use an agent with Agent Platform Runtime.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
