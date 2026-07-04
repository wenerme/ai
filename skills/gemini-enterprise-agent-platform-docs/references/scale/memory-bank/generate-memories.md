Agent Platform Memory Bank lets you construct long-term memories from conversations between the user and your agent. This process happens automatically when triggered, extracting valuable information for future interactions.

This document explains how memory generation works, how to customize memory extraction with topics, and how to trigger memory generation requests.

For information on setting up your environment, see [Set up for Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup).

## Understanding memory generation

> [!IMPORTANT]
> **Important:** Not all user-agent interactions result in memories being created or updated. Memory Bank only persists information that is judged to be valuable for future interactions.

> [!CAUTION]
> **Caution:** While Memory Bank has been instructed to exclude sensitive or personal data, the system is not infallible. Therefore, you should assume that some sensitive or personal information may still be stored and shouldn't rely solely on this feature to filter out such data.

Memory Bank extracts memories from source data and self-curates
memories for a specific collection of memories (defined by a `scope`) by adding,
updating, and removing memories over time.

When you trigger memory generation, Memory Bank performs the
following operations:

- **Extraction** : Extracts information about the user from their conversations
  with the agent. Only information that matches at least one of your
  instance's [memory topics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#memory-topics) will be persisted.

- **Consolidation**: Identifies if existing memories with the same scope
  should be deleted or updated based on the extracted information.
  Memory Bank checks that new memories are not duplicative or
  contradictory before merging them with existing memories. If existing
  memories don't overlap with the new information, a new memory will be
  created.

  - By default, Memory Bank will consider all existing memories
    for the same scope during consolidation. If you want to restrict which
    memories are eligible for consolidation more granularly using metadata, use
    the [`REQUIRE_EXACT_MATCH` metadata merge strategy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#metadata).

  - By default, only the most recent [revision](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions)
    of a memory is used for comparison. To better identify long-term trends
    and corroborate data, you can increase [`revisions_per_candidate_count`
    when you create your Agent Platform instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#consolidation-customization)
    to include more historical revisions in the consolidation logic.

![Memory generation
algorithm](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/memory-bank-generation.png)

You can inspect the intermediate steps of memory generation and see how a memory
changes across multiple requests using [memory
revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions). Each
revision includes the intermediate output of the extraction step
(`extracted_memories`) and the final consolidation step (`fact`) for each memory
generation request.

    list(client.agent_engines.memories.revisions.list(
      name="projects/.../locations/.../reasoningEngines/.../memories/.../revisions/..."))

    """
    [
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/456",
        fact="This is my updated fact",
        extracted_memories=[
          IntermediateExtractedMemory(
            fact='This is the output of extraction for a single request.'
          ),
        ],
        ...
      ),
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/123",
        fact="This is my original fact",
        extracted_memories=[
          IntermediateExtractedMemory(
            fact='This is my original fact.'
          ),
        ],
        ...
      )
    ]
    """

### Memory topics

"Memory topics" identify what information Memory Bank considers
to be meaningful and should thus be persisted as generated memories.
Memory Bank supports two types of memory topics:

- **Managed topics**: Label and instructions are defined by
  Memory Bank. You only need to provide the name of the managed
  topic. For example:

  ### Dictionary

      memory_topic = {
          "managed_memory_topic": {
              "managed_topic_enum": "USER_PERSONAL_INFO"
          }
      }

  ### Class-based

      from vertexai.types import ManagedTopicEnum
      from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
      from vertexai.types import MemoryBankCustomizationConfigMemoryTopicManagedMemoryTopic as ManagedMemoryTopic

      memory_topic = MemoryTopic(
          managed_memory_topic=ManagedMemoryTopic(
              managed_topic_enum=ManagedTopicEnum.USER_PERSONAL_INFO
          )
      )

- **Custom topics**: Label and instructions are defined by you when setting up
  your Memory Bank instance. They will be used in the prompt
  for Memory Bank's extraction step. For example:

  ### Dictionary

      memory_topic = {
          "custom_memory_topic": {
              "label": "business_feedback",
              "description": """Specific user feedback about their experience
              at the coffee shop. This includes opinions on drinks, food,
              pastries, ambiance, staff friendliness, service speed,
              cleanliness, and any suggestions for improvement."""
          }
      }

  ### Class-based

      from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
      from vertexai.types import MemoryBankCustomizationConfigMemoryTopicCustomMemoryTopic as CustomMemoryTopic

      memory_topic = MemoryTopic(
          custom_memory_topic=CustomMemoryTopic(
              label="business_feedback",
              description="""Specific user feedback about their experience at
              the coffee shop. This includes opinions on drinks, food,
              pastries, ambiance, staff friendliness, service speed,
              cleanliness, and any suggestions for improvement."""
          )
      )

  When using custom topics, it's recommended to also provide [few-shot
  examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#configure-few-shots)
  to demonstrate how memories should be extracted from your conversation.

By default, Memory Bank persists all of the following managed
topics:

- **User information** (`USER_PERSONAL_INFO`): Significant
  information about the user, like names, relationships, hobbies, and
  important dates. For example, "I work at Google" or "My wedding anniversary
  is on December 31".

- **User preferences** (`USER_PREFERENCES`): Stated or implied likes,
  dislikes, preferred styles, or patterns. For example, "I prefer the middle
  seat."

- **Key conversation events and task outcomes** (`KEY_CONVERSATION_DETAILS`):
  Important milestones or conclusions within the dialogue. For example, "I
  booked plane tickets for a round trip between JFK and SFO. I leave on June
  1, 2025 and return on June 7, 2025."

- **Explicit remember / forget instructions** (`EXPLICIT_INSTRUCTIONS`):
  Information that the user explicitly asks the agent to remember or forget.
  For example, if the user says "Remember that I primarily use Python,"
  Memory Bank generates a memory such as "I primarily use
  Python."

This is equivalent to using the following set of managed memory topics:

### Dictionary

      memory_topics = [
          {"managed_memory_topic": {"managed_topic_enum": "USER_PERSONAL_INFO"}},
          {"managed_memory_topic": {"managed_topic_enum": "USER_PREFERENCES"}},
          {"managed_memory_topic": {"managed_topic_enum": "KEY_CONVERSATION_DETAILS"}},
          {"managed_memory_topic": {"managed_topic_enum": "EXPLICIT_INSTRUCTIONS"}},
      ]

### Class-based

    from vertexai.types import ManagedTopicEnum
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopicManagedMemoryTopic as ManagedMemoryTopic

    memory_topics = [
      MemoryTopic(
          managed_memory_topic=ManagedMemoryTopic(
              managed_topic_enum=ManagedTopicEnum.USER_PERSONAL_INFO)),
      MemoryTopic(
          managed_memory_topic=ManagedMemoryTopic(
              managed_topic_enum=ManagedTopicEnum.USER_PREFERENCES)),
      MemoryTopic(
          managed_memory_topic=ManagedMemoryTopic(
              managed_topic_enum=ManagedTopicEnum.KEY_CONVERSATION_DETAILS)),
      MemoryTopic(
          managed_memory_topic=ManagedMemoryTopic(
              managed_topic_enum=ManagedTopicEnum.EXPLICIT_INSTRUCTIONS)),
    ]

If you want to customize what topics Memory Bank persists, set
the memory topics in your [customization
configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#customization-config)
when setting up Memory Bank.

### Using metadata during consolidation

You can attach metadata to generated memories. Metadata lets you store
structured information (strings, doubles, booleans, or timestamps) alongside a
memory fact. This is useful for
[filtering](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#metadata-filter)
or managing memories' lifecycles.

### Dictionary

    import datetime

    client.agent_engines.memories.generate(
        ...,
        config={
            "metadata": {
                "my_string_key": {"string_value": "my_string_value"},
                "my_double_key": {"double_value": 123.456},
                "my_boolean_key": {"bool_value": True},
                "my_timestamp_key": {
                    "timestamp_value": datetime.datetime(
                        2027, 1, 1, 12, 30, 00, tzinfo=datetime.timezone.utc
                    )
                }
            },
            "metadata_merge_strategy": "MERGE"
        },
    )

### Class-based

    import datetime

    from vertexai import types

    client.agent_engines.memories.generate(
        ...,
        config=types.GenerateAgentEngineMemoriesConfig(
            metadata={
                "my_string_key": types.MemoryMetadataValue(string_value="my_string_value"),
                "my_double_key": types.MemoryMetadataValue(double_value=123.456),
                "my_boolean_key": types.MemoryMetadataValue(bool_value=True),
                "my_timestamp_key": types.MemoryMetadataValue(
                    timestamp_value=datetime.datetime(
                        2027, 1, 1, 12, 30, 00, tzinfo=datetime.timezone.utc
                    )
                ),
            },
            metadata_merge_strategy=types.MemoryMetadataMergeStrategy.MERGE,
        )
    )

By using a `metadata_merge_strategy`, you can control how new metadata interacts
with existing memories during consolidation:

- **`MERGE`**: (Default) Combine new metadata with existing metadata. If a key
  already exists, the new value overwrites the old one.

- **`OVERWRITE`**: Replace the metadata of the updated memories with the new
  metadata.

- **`REQUIRE_EXACT_MATCH`**: Restrict consolidation to memories that have
  exactly the same metadata as the request. If a memory doesn't have the same
  metadata, it's not eligible for consolidation and won't be updated.

### Generating memories for a subset of topics

By default, memory generation extracts data for all the [memory topics that
you configured](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#configure-memory-topics)
when you set up your Memory Bank instance.
For a specific `GenerateMemories` request, you can restrict extraction to a
subset of configured topics. To configure allowed topics, use the `allowed_topics` field.

### Dictionary

    client.agent_engines.memories.generate(
        ...,
        config={
            "allowed_topics": [
                {"managed_memory_topic": "USER_PERSONAL_INFO"},
                {"custom_memory_topic_label": "business_feedback"}
            ]
        },
    )

### Class-based

    from vertexai import types

    client.agent_engines.memories.generate(
        ...,
        config=types.GenerateAgentEngineMemoriesConfig(
            allowed_topics=[
                types.MemoryTopicId(
                    managed_memory_topic=types.ManagedTopicEnum.USER_PERSONAL_INFO
                ),
                types.MemoryTopicId(
                    custom_memory_topic_label="business_feedback"
                )
            ]
        )
    )

## Triggering memory generation

You can trigger memory generation using one of the following methods:

- **`GenerateMemories`**: Ingest data to Memory Bank and trigger memory generation immediately. This method is useful when you want to generate memories at a specific point in time, such as at the end of a session or at regular intervals within a session.
- **`IngestEvents`** : Ingest data to Memory Bank continuously and let Memory Bank process it when your triggering criteria is met. This method is useful when you have a continuous stream of events and want Memory Bank to automatically handle buffering and to trigger memory generation based on volume or time. For more information, see [Ingest
  events](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/ingest-events).

Memory generation extracts key context from source conversations and combines it
with existing memories for the same scope. For example, you can create
session-level memories by using a scope such as `{"user_id": "123",
"session_id": "456"}`. Memories with the same scope can be consolidated and
[retrieved](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#similarity-search)
together.

`GenerateMemories` is a [long-running operation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#background-memory-generation).
Once the operation is done, the `AgentEngineGenerateMemoriesOperation` contains
a list of generated memories, if any are generated:

    AgentEngineGenerateMemoriesOperation(
      name="projects/.../locations/.../reasoningEngines/.../operations/...",
      done=True,
      response=GenerateMemoriesResponse(
        generatedMemories=[
          GenerateMemoriesResponseGeneratedMemory(
            memory=Memory(
              "name": "projects/.../locations/.../reasoningEngines/.../memories/..."
            ),
            action="CREATED",
          ),
          GenerateMemoriesResponseGeneratedMemory(
            memory=Memory(
              "name": "projects/.../locations/.../reasoningEngines/.../memories/..."
            ),
            action="UPDATED",
          ),
          GenerateMemoriesResponseGeneratedMemory(
            memory=Memory(
              "name": "projects/.../locations/.../reasoningEngines/.../memories/..."
            ),
            action="DELETED",
          ),
        ]
      )
    )

Each generated memory includes the `action` that was performed on that memory:

- `CREATED`: Indicates that a new memory was added, representing a novel
  concept that wasn't captured by existing memories.

- `UPDATED`: Indicates that an existing memory was updated, which happens if
  the memory covered similar concepts as the newly extracted information. The
  memory's fact may be updated with new information or remain the same.

- `DELETED`: Indicates that the existing memory was deleted, because its
  information was contradictory to new information extracted from the
  conversation.

> [!NOTE]
> **Note:** If Memory Bank doesn't find meaningful information in the user-agent conversation, no memories are generated. See the [troubleshooting
> guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/memory-bank#no-memories-generated) if you expected memories to be generated.

For `CREATED` or `UPDATED` memories, you can use `GetMemories` to [retrieve the
full content of the
memory](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#get-memory).
Retrieving `DELETED` memories results in a 404 error.

### Generating memories in the background

`GenerateMemories` is a [long-running
operation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/long-running-operations). By default,
`client.agent_engines.generate_memories` is a blocking function that polls the
operation until the operation completes. Executing memory generation as a
blocking operation is helpful when you want to manually inspect generated
memories or notify end users about what memories were generated.

However, for production agents, you generally want to run memory generation in
the background as an asynchronous process. In most cases, the client doesn't
need to use the output for the current run, so it's unnecessary to incur
additional latency waiting for a response. If you want memory generation to
execute in the background, set `wait_for_completion` to `False`:

    client.agent_engines.memories.generate(
        ...,
        config={
            "wait_for_completion": False
        }
    )

As an alternative to calling `GenerateMemories` asynchronously, you can use
[`IngestEvents`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/ingest-events),
which decouples event ingestion from memory generation and processes events in
the background by default.

## Data sources

There are multiple way to provide source data for memory generation:

- [Provide events directly in the payload](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#direct-contents-source).

- [Provide events using Agent Platform Sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#sessions-source).

- [Provide pre-extracted facts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#consolidate-pre-extracted-memories) to
  consolidate them with existing memories for the same scope.

When you provide events directly in the payload or use Sessions, information is extracted from
the conversation and consolidated with existing memories. If you only want to
extract information from these data sources, you can disable consolidation:

    client.agent_engines.memories.generate(
        ...
        config={
            "disable_consolidation": True
        }
    )

### Using events in payload as the data source

Use `direct_contents_source` when you want to generate memories using events
provided directly in the payload. Meaningful information is extracted from these
events and consolidated with existing information for the same scope. This
approach can be used if you're using a different session storage from
Agent Platform Sessions.

### Dictionary

The events should include
[`Content`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/summary_class#content)
dictionaries.

    events =  [
      {
        "content": {
          "role": "user",
          "parts": [
            {"text": "I work with LLM agents!"}
          ]
        }
      }
    ]

    client.agent_engines.memories.generate(
        name=memory_bank.api_resource.name,
        direct_contents_source={
          "events": EVENTS
        },
        # For example, `scope={"user_id": "123"}`.
        scope=SCOPE,
        config={
            "wait_for_completion": True
        }
    )

Replace the following:

- `SCOPE`: A dictionary, representing the scope of the generated memories. For example, `{"session_id": "MY_SESSION"}`. Only memories with the same scope are considered for consolidation.

### Class-based

The events should include
[`Content`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/summary_class#content)
objects.

    from google import genai
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    events = [
      https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.GenerateMemoriesRequestDirectContentsSourceEvent.html(
        content=genai.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Content.html(
          role="user",
          parts=[
            genai.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Part.html.from_text(text="I work with LLM agents!")
          ]
        )
      )
    ]

    client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.memories.generate(
        name=memory_bank.api_resource.name,
        direct_contents_source={
          "events": events
        },
        # For example, `scope={"user_id": "123"}`.
        scope=SCOPE,
        config={
            "wait_for_completion": True
        }
    )

Replace the following:

- `SCOPE`: A dictionary, representing the scope of the generated memories. For example, `{"session_id": "MY_SESSION"}`. Only memories with the same scope are considered for consolidation.

### Using Agent Platform Sessions as the data source

With Sessions, Memory Bank uses session events as
the source conversation for memory generation.

To scope the generated memories, Memory Bank extracts and uses
the user ID from the session by default. For example, the memories' scope is
stored as `{"user_id": "123"}` if the [session's
`user_id`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.reasoningEngines.sessions)
is "123". You can also provide a `scope` directly, which overrides using the
session's `user_id` as the scope.

### Dictionary

    client.agent_engines.memories.generate(
      name=memory_bank.api_resource.name,
      vertex_session_source={
          # For example, projects/.../locations/.../reasoningEngines/.../sessions/...
          "session": "SESSION_NAME"
      },
      # Optional when using Sessions. Defaults to {"user_id": session.user_id}.
      scope=SCOPE,
      config={
          "wait_for_completion": True
      }
    )

Replace the following:

- `SESSION_NAME`: The fully-qualified [session
  name](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.reasoningEngines.sessions#Session).

- (Optional) `SCOPE`: A dictionary, representing the scope of the generated
  memories. For example, `{"session_id": "MY_SESSION"}`. Only memories with
  the same scope are considered for consolidation. If not provided,
  `{"user_id": session.user_id}` is used.

### Class-based

    client.agent_engines.memories.generate(
      name=memory_bank.api_resource.name,
      vertex_session_source=vertexai.types.GenerateMemoriesRequestVertexSessionSource(
          # For example, projects/.../locations/.../reasoningEngines/.../sessions/...
          session="SESSION_NAME"
      ),
      # Optional when using Sessions. Defaults to {"user_id": session.user_id}.
      scope=SCOPE,
      config={
          "wait_for_completion": True
      }
    )

Optionally, you can provide a time range indicating which events in the Session
should be included. If not provided, all events in the Session are included.

### Dictionary

    import datetime

    client.agent_engines.memories.generate(
      name=memory_bank.api_resource.name,
      vertex_session_source={
          "session": "SESSION_NAME",
          # Extract memories from the last hour of events.
          "start_time": datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(seconds=24 * 60),
          "end_time": datetime.datetime.now(tz=datetime.timezone.utc)
      },
      scope=SCOPE
    )

### Class-based

    import datetime

    client.agent_engines.memories.generate(
      name=memory_bank.api_resource.name,
      vertex_session_source=vertexai.types.GenerateMemoriesRequestVertexSessionSource(
          session="SESSION_NAME",
          # Extract memories from the last hour of events.
          start_time=datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(seconds=24 * 60),
          end_time=datetime.datetime.now(tz=datetime.timezone.utc)
      ),
      scope=SCOPE
    )

### Consolidating pre-extracted memories

As an alternative to using Memory Bank's automatic extraction
process, you can directly provide pre-extracted memories. Direct source memories
will be consolidated with existing memories for the same scope. This can be
useful for when you want your agent or a human-in-the-loop to be responsible for
extracting memories, but you still want to take advantage of
Memory Bank's consolidation to ensure there are no duplicate or
contradictory memories.

    client.agent_engines.memories.generate(
        name=memory_bank.api_resource.name,
        direct_memories_source={"direct_memories": [{"fact": "FACT"}]},
        scope=SCOPE
    )

Replace the following:

- `FACT`: The pre-extracted fact that should be consolidated with existing
  memories. You can provide up to 5 pre-extracted facts in a list like the
  following:

      {"direct_memories": [{"fact": "fact 1"}, {"fact": "fact 2"}]}

- `SCOPE`: A dictionary, representing the scope of the generated memories. For
  example, `{"session_id": "MY_SESSION"}`. Only memories with the same scope are
  considered for consolidation.

## Using multimodal input

> [!NOTE]
> To see an example of generating memories with multimodal input,
> run the "Building a Multimodal Trip Planner with ADK on " notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/memory_bank/tutorial_get_started_with_multimodal_agents_with_memory_bank.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fagent_engine%2Fmemory_bank%2Ftutorial_get_started_with_multimodal_agents_with_memory_bank.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/agent_engine/memory_bank/tutorial_get_started_with_multimodal_agents_with_memory_bank.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/memory_bank/tutorial_get_started_with_multimodal_agents_with_memory_bank.ipynb)

You can extract memories from multimodal input. However, memories are only
extracted from text, inline files, and file data in the source content. All
other content, including function calls and responses, are ignored when
generating memories.

Memories can be extracted from
[images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding),
[video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding), and
[audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/audio-understanding) provided
by the user. If the context provided by the multimodal input is judged by
Memory Bank to be meaningful for future interactions, then a
textual memory may be created including information extracted from the input.
For example, if the user provides an image of a golden retriever with the text
"This is my dog" then Memory Bank generates a memory such as "My
dog is a golden retriever."

For example, you can provide an image and context for the image in the payload:

### Dictionary

    with open(file_name, "rb") as f:
        inline_data = f.read()

    events =  [
      {
        "content": {
          "role": "user",
          "parts": [
            {"text": "This is my dog"},
            {
              "inline_data": {
                "mime_type": "image/jpeg",
                "data": inline_data
              }
            },
            {
              "file_data": {
                "file_uri": "gs://cloud-samples-data/generative-ai/image/dog.jpg",
                "mime_type": "image/jpeg"
              }
            },
          ]
        }
      }
    ]

### Class-based

    from google import genai
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    with open(file_name, "rb") as f:
        inline_data = f.read()

    events = [
      https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.GenerateMemoriesRequestDirectContentsSourceEvent.html(
        content=genai.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Content.html(
          role="user",
          parts=[
            genai.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Part.html.from_text(text="This is my dog"),
            genai.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Part.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Image.html#vertexai_preview_generative_models_Image_from_bytes(
              data=inline_data,
              mime_type="image/jpeg",
            ),
            genai.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Part.html.from_uri(
              file_uri="gs://cloud-samples-data/generative-ai/image/dog.jpg",
              mime_type="image/jpeg",
            )
          ]
        )
      )
    ]

## What's next

Guide

### [Fetch memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories)

Learn how to fetch generated and uploaded memories.

Guide

### [Set up Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup)

Learn how to set up Memory Bank.

Guide

### [Inspect memory revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions)

Learn how to inspect memory revisions.
