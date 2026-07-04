To use Agent Platform Memory Bank, you must first create and configure a
Memory Bank instance. This instance manages your memories and can be
integrated with your agents across various runtimes.

This document explains how to set up your Google Cloud project, install the
required libraries, and create or update an instance with custom configurations
like topics and TTL.

## Get started

Before you work with Memory Bank, you must set up your environment.

### Set up your Google Cloud project

Every project can be identified in two ways: the project number or the project
ID. The `PROJECT_NUMBER` is automatically created when you
create the project, whereas the `PROJECT_ID` is created by you,
or whoever created the project. To set up a project:

> [!NOTE]
> **Note:** To enable APIs, you need the `serviceusage.services.enable` permission. If you don't have this permission, ask your administrator to grant you the Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) role.

### Get the required roles

To get the permissions that
you need to use Memory Bank,

ask your administrator to grant you the
following IAM roles on your project:

- All: [Agent Platform User](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.user) (`roles/aiplatform.user`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

If you're making requests to Memory Bank from an agent deployed
on Google Kubernetes Engine (GKE)
or Cloud Run, make sure that your service account has the necessary
permissions. The [Reasoning Engine Service
Agent](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.reasoningEngineServiceAgent)
already has the necessary permissions to read and write memories, so outbound
requests from Agent Runtime should already have permission to access
Memory Bank.

### Install libraries

This section assumes that you have [set up a Python development
environment](https://docs.cloud.google.com/python/docs/setup), or are using a runtime with a Python
development environment (such as Colaboratory).

Install the Agent Platform SDK:

    pip install google-cloud-aiplatform>=1.111.0

### Authentication

Follow the instructions at [Authenticate to Vertex AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/authentication).

## Set up a Agent Platform SDK client

Run the following code to set up a Agent Platform SDK client:

### Agent Platform SDK

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
      project="PROJECT_ID",
      location="LOCATION",
    )

where

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#project) under which you [develop](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents,
- `LOCATION` is one of the [supported
  regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations) for Memory Bank.

### Multi-regional and global endpoints

Memory Bank supports multi-regional and global endpoints:

- For global instances, set your location to `global`.
- For multi-regional instances, set your location to `us` or `eu`.

> [!NOTE]
> **Note:** CMEK cannot be used if your Memory Bank is configured to use the global endpoint. Google Cloud KMS requires encryption keys to reside within a geographic data residency boundary. Because the global region lacks a physical geographic boundary, it is barred from encrypting localized regional or multi-regional resources.

## Create or update a Memory Bank instance

To get started with Memory Bank, you first need a
Memory Bank instance. If you don't already have an instance, you can
create one using the default configuration, and a display name of your choosing.

> [!TIP]
> **Tip:** Always set a display name, so you can distinguish between difference resource instances in the project.

    # create the resource
    memory_bank = client.agent_engines.create(
        config={
            "display_name": "My Memory Bank",
        }
    )

    # Optionally, print out the Memory Bank resource name. You will need the
    # resource name to interact with your Memory Bank instance later on.
    print(memory_bank.api_resource.name)

If you want to customize the configuration of your new or existing
Memory Bank instance's behavior, refer to [Configure your Memory Bank instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#memory-bank-config). For example, you can
specify what information Memory Bank considers meaningful to persist.

Once you have a Memory Bank instance, you can use the name of the
instance to read or write memories. For example:

    # Generate memories using your Memory Bank instance.
    client.agent_engines.memories.generate(
      # `name` should have the format `projects/.../locations/.../reasoningEngines/...`.
      name=memory_bank.api_resource.name,
      ...
    )

### Use with Agent Runtime

Although Memory Bank can be used in any runtime, you can also use
Memory Bank with Agent Runtime to read and write memories from
your deployed agent.

To deploy an agent on Agent Runtime with built-in Memory Bank,
first [set up your environment for
Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup). Then, [prepare your
agent to be deployed](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) on
Agent Runtime with memory integration. Your deployed agent should make calls
to read and write memories as needed.

> [!IMPORTANT]
> **Important:** Deleting your Agent Runtime instance will also delete your memories if you're using built-in Memory Bank.

### AdkApp

If you're using the [Agent Platform Agent Development Kit (ADK)
template](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk), the agent uses the
`VertexAiMemoryBankService` by default when deployed to
Agent Runtime. This means that the ADK Memory tools read
memories from Memory Bank.

    from google.adk.agents import Agent
    from vertexai.preview.reasoning_engines import AdkApp

    # Develop an agent using the ADK template.
    agent = Agent(...)

    adk_app = AdkApp(
          agent=adk_agent,
          ...
    )

    # Deploy the agent to Agent Runtime.
    runtime = client.agent_engines.create(
          agent_engine=adk_app,
          config={
                "staging_bucket": "STAGING_BUCKET",
                "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
                # Optional.
                **context_spec
          }
    )

    # Update an existing Agent Runtime to add or modify the Runtime.
    runtime = client.agent_engines.update(
          name=runtime.api_resource.name,
          agent=adk_app,
          config={
                "staging_bucket": "STAGING_BUCKET",
                "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
                # Optional.
                **context_spec
          }
    )

Replace the following:

- <var translate="no">STAGING_BUCKET</var>: Your Cloud Storage bucket to use for staging your Agent Runtime.

For more information about using Memory Bank with ADK, refer
to the [Quickstart with ADK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/adk-quickstart).

### Custom agent

You can use Memory Bank with your [custom
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) deployed on
Agent Runtime. In this case, your agent should orchestrate
calls to Memory Bank to trigger [memory
generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories) and
[memory retrieval](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#scope-based)
calls.

Your application deployed to Agent Runtime can read the environment
variables `GOOGLE_CLOUD_PROJECT`,
`GOOGLE_CLOUD_LOCATION`,`GOOGLE_CLOUD_AGENT_ENGINE_ID` to infer the
Agent Runtime name from the environment:

    project = os.environ.get("GOOGLE_CLOUD_PROJECT")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION")
    agent_engine_id = os.environ.get("GOOGLE_CLOUD_AGENT_ENGINE_ID")

    agent_engine_name = f"projects/{project}/locations/{location}/reasoningEngines/{agent_engine_id}"

If you're using the [default service
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#default-service-agent) for your agent
on Agent Runtime, your agent already has permission to read and write
memories. If you're using a [customer service
account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#custom-service-account), you need to
grant permissions to your service account to read and write memories. The
required permissions depend on what operations your agent should be able to
perform. If you only want your agent to retrieve and generate memories,
[`aiplatform.memories.generate`](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.memories.generate)
and
[`aiplatform.memories.retrieve`](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.memories.retrieve)
are sufficient.

### Use in all other runtimes

> [!NOTE]
> To see an example of using Memory Bank with Cloud Run,
> run the "Get started with Sessions and Memory Bank for ADK agents in Cloud Run" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/cloud_run/agents_with_memory/get_started_with_memory_for_adk_in_cloud_run.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fcloud_run%2Fagents_with_memory%2Fget_started_with_memory_for_adk_in_cloud_run.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/cloud_run/agents_with_memory/get_started_with_memory_for_adk_in_cloud_run.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/cloud_run/agents_with_memory/get_started_with_memory_for_adk_in_cloud_run.ipynb)

> [!NOTE]
> To see an example of using Memory Bank with Google Kubernetes Engine,
> run the "Get started with Sessions and Memory Bank for ADK agents in Google Kubernetes Engine" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/gke/agents_with_memory/get_started_with_memory_for_adk_in_gke.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fgke%2Fagents_with_memory%2Fget_started_with_memory_for_adk_in_gke.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/gke/agents_with_memory/get_started_with_memory_for_adk_in_gke.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/gke/agents_with_memory/get_started_with_memory_for_adk_in_gke.ipynb)

If you want to use Memory Bank in a different environment, like
Cloud Run or Colab, create a Memory Bank. If
you don't provide a [configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#memory-bank-config),
Memory Bank is created with the default settings for managing
memory generation and retrieval.

    memory_bank = client.agent_engines.create()

If you've used Memory Bank before, creating a new
Memory Bank instance should only take a few
seconds. If this is the first time you're using Memory Bank, it may
take longer (1-2 minutes).

If you want to configure behavior, provide a [Memory Bank
configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#memory-bank-config):

### Create

    memory_bank = client.agent_engines.create(
      config={
        "context_spec": {
          "memory_bank_config": ...
        }
      }
    )

### Update

If you want to change your [Memory Bank
configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#memory-bank-config), you can update your
Memory Bank instance.

    memory_bank = client.agent_engines.update(
      # You can access the name using `memory_bank.api_resource.name` for an AgentEngine object.
      name="MEMORY_BANK_NAME",
      config={
        "context_spec": {
          "memory_bank_config": ...
        }
      }
    )

Replace the following:

- <var translate="no">MEMORY_BANK_NAME</var>: The name of the Memory Bank. It should be in the format `projects/.../locations/.../reasoningEngines/...`. See the [supported
  regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations) for Memory Bank.

You can use Memory Bank in any environment that has permission to
read and write memories. For example, to use Memory Bank with
Cloud Run, grant permissions to the [Cloud Run service
identity](https://docs.cloud.google.com/run/docs/configuring/services/service-identity) to read and write
memories. The required permissions depend on what operations your agent should
be able to perform. If you only want your agent to retrieve and generate
memories,
[`aiplatform.memories.generate`](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.memories.generate)
and
[`aiplatform.memories.retrieve`](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.memories.retrieve)
are sufficient.

## Configure your Memory Bank instance

You can configure your Memory Bank to customize how
memories are generated and managed. If you don't provide the configuration, then
Memory Bank uses the default settings for each type of
configuration.

You can configure the following Memory Bank settings for your instance:

- [Customization configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#customization-config): Configures how memories are extracted from source data and consolidated with existing memories.
- [Similarity search configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#similarity-search-config): Specifies which embedding model Memory Bank uses for similarity search. Defaults to `text-embedding-005`.
- [Generation configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#generation-config): Configures which LLM Memory Bank uses for memory generation. Defaults to `gemini-3.5-flash`.
- [TTL configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#ttl-config): Configures how TTL is automatically set for created or updated memories. Defaults to no TTL.

The following sample shows the default Memory Bank:

### Dictionary

    memory_bank_config = {
      "generation_config": {
        # `gemini-3.5-flash` will be used to extract and consolidate memories.
        "model": "projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/gemini-3.5-flash"
      },
      "similarity_search_config": {
        # `text-embedding-005` will be used for similarity search, including
        # during consolidation. Consolidation uses similarity search to find
        # candidate memories that may be updated with new information.
        "embedding_model": "projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/text-embedding-005"
      },
      "ttl_config": {
        # Default TTL for memory revisions is 365 days.
        "memory_revision_default_ttl": f"{365 * 24 * 60 * 60}s"
      },
      "customization_configs": [
        {
          # Extract user information, preferences, key conversation details,
          # and information that the user explicitly asked to be remembered.
          "memory_topics": [
            {"managed_memory_topic": "USER_PERSONAL_INFO"},
            {"managed_memory_topic": "USER_PREFERENCES"},
            {"managed_memory_topic": "KEY_CONVERSATION_DETAILS"},
            {"managed_memory_topic": "EXPLICIT_INSTRUCTIONS"}
          ],
          "consolidation_config": {
            # Only use the latest memory revision of each candidate memory during
            # consolidation.
            "revisions_per_candidate_count": 1
          },
          # Only use the pre-defined set of examples.
          "generate_memories_examples": [],
          # Generate memories in the first person.
          "enable_third_person_memories": False
        }
      ],
      # Memory revisions will be persisted. This can be overridden on a request-level.
      "disable_memory_revisions": False
    }

### Class-based

    from vertexai.types import MemoryBankCustomizationConfig as CustomizationConfig
    from vertexai.types import MemoryBankCustomizationConfigConsolidationConfig as ConsolidationConfig
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopicManagedMemoryTopic as ManagedMemoryTopic
    from vertexai.types import ManagedTopicEnum
    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfig as MemoryBankConfig
    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigGenerationConfig as GenerationConfig
    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigSimilaritySearchConfig as SimilaritySearchConfig
    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigTtlConfig as TtlConfig

    memory_bank_config = MemoryBankConfig(
      generation_config=GenerationConfig(
        # `gemini-3.5-flash` will be used to extract and consolidate memories.
        # Note: The global endpoint will be used for regions that don't have a
        # regional endpoint available.
        model="projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/gemini-3.5-flash"
      ),
      similarity_search_config=SimilaritySearchConfig(
        # `text-embedding-005` will be used for similarity search, including
        # during consolidation. Consolidation uses similarity search to find
        # candidate memories that may be updated with new information.
        embedding_model="projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/text-embedding-005"
      ),
      ttl_config=TtlConfig(
        # Default TTL for memory revisions is 365 days.
        memory_revision_default_ttl=f"{365 * 24 * 60 * 60}s"
      ),
      customization_configs=[
        CustomizationConfig(
          # Extract personal information, preferences, key conversation details,
          # and information that the user explicitly asked to be remembered.
          memory_topics=[
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
                managed_topic_enum=ManagedTopicEnum.EXPLICIT_INSTRUCTIONS))
          ],
          # Only use the pre-defined set of examples.
          generate_memories_examples=[],
          consolidation_config=ConsolidationConfig(
            # Only use the latest memory revision of each candidate memory during
            # consolidation.
            revisions_per_candidate_count=1
          ),
          # Generate memories in the first person.
          enable_third_person_memories=False,
        )
      ],
      # Memory revisions will be persisted. This can be overridden on a request-level.
      disable_memory_revisions=False
    )

You can adjust the Memory Bank configuration when you create or update
your instance. The following example demonstrates how
to create or update an instance with a specific Memory Bank configuration.

    client.agent_engines.create(
          ...,
          config={
                "context_spec": {
                      "memory_bank_config": memory_bank_config
                }
          }
    )

    # Alternatively, update an existing Memory Bank instance's config.
    memory_bank = client.agent_engines.update(
          name=memory_bank.api_resource.name,
          config={
              "context_spec": {
                    "memory_bank_config": memory_bank_config
              }
          }
    )

### Natural language memory customization configuration

To customize how Memory Bank extracts natural language memories,
configure the extraction behavior when you set up your instance. Use the
following options to customize the behavior:

- [Configuring memory topics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#configure-memory-topics): Define the type of information that Memory Bank should consider meaningful to persist. Only information that fits one of these memory topics will be persisted by Memory Bank.
- [Providing few-shot examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#configure-few-shots): Demonstrate expected behavior for memory extraction to Memory Bank.
- [Configuring the memory perspective](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#memory-perspective): Configure whether memories should be generated in the first person (default) or third person.
- [Configuring consolidation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#consolidation-customization): Configure how many memory revisions Memory Bank considers when consolidating each memory candidate.

You can think of customizing your Memory Bank's extraction
behavior in two steps: Telling and Showing. Memory Topics *tell*
Memory Bank what information to persist. Few-shots *show*
Memory Bank what kind of information should result in a specific
memory, helping it learn the patterns, nuance, and phrasing that you expect it
to understand.

You can optionally configure different behavior for different scope-levels. For
example, the topics that are meaningful for session-level memories may not be
meaningful for user-level memories (across multiple sessions). To configure
behavior for a certain subset of memories, set the scope keys of the
customization configuration. Only `GenerateMemories` requests that include those
scope keys will use that configuration. You can also configure default behavior
(applying to all sets of scope keys) by omitting the `scope_key` field. This
configuration will apply to all requests that don't have a configuration that
exactly match the scope keys for another customization configuration.

For example, the `user_level_config` would only apply to `GenerateMemories`
requests that exactly use the scope key `user_id` (i.e. `scope={"user_id":
"123"}` with no additional keys). `default_config` would apply to other
requests:

### Dictionary

    user_level_config = {
      "scope_keys": ["user_id"],
      "memory_topics": [...],
      "generate_memories_examples": [...]
    }

    default_config = {
      "memory_topics": [...],
      "generate_memories_examples": [...]
    }

    memory_bank_config = {
      "customization_configs": [
        user_level_config,
        default_config
      ]
    }

### Class-based

    from vertexai.types import MemoryBankCustomizationConfig as CustomizationConfig

    user_level_config = CustomizationConfig(
      scope_keys=["user_id"],
      memory_topics=[...],
      generate_memories_examples=[...]
    )

#### Configuring memory topics

"Memory topics" identify what information Memory Bank considers
to be meaningful and should thus be persisted as [generated
memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories). Memory Bank supports two types of memory topics:

- **Managed topics**: Label and instructions are defined by Memory Bank. You only need to provide the name of the managed topic. For example,

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

  The following managed topics are supported by Memory Bank:
  - **User information** (`USER_PERSONAL_INFO`): Significant information about the user, like names, relationships, hobbies, and important dates. For example, "I work at Google" or "My wedding anniversary is on December 31".
  - **User preferences** (`USER_PREFERENCES`): Stated or implied likes, dislikes, preferred styles, or patterns. For example, "I prefer the middle seat."
  - **Key conversation events and task outcomes** (`KEY_CONVERSATION_DETAILS`): Important milestones or conclusions within the dialogue. For example, "I booked plane tickets for a round trip between JFK and SFO. I leave on June 1, 2025 and return on June 7, 2025."
  - **Explicit remember / forget instructions** (`EXPLICIT_INSTRUCTIONS`): Information that the user explicitly asks the agent to remember or forget. For example, if the user says "Remember that I primarily use Python," Memory Bank generates a memory such as "I primarily use Python."
- **Custom topics**: Label and instructions are defined by you when setting up
  your Memory Bank instance. They will be used in the prompt
  for Memory Bank's extraction step. For example,

  ### Dictionary

      memory_topic = {
        "custom_memory_topic": {
          "label": "business_feedback",
          "description": """Specific user feedback about their experience at
          the coffee shop. This includes opinions on drinks, food, pastries, ambiance,
          staff friendliness, service speed, cleanliness, and any suggestions for
          improvement."""
          }
      }

  ### Class-based

      from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
      from vertexai.types import MemoryBankCustomizationConfigMemoryTopicCustomMemoryTopic as CustomMemoryTopic

      memory_topic = MemoryTopic(
        custom_memory_topic=CustomMemoryTopic(
          label="business_feedback",
          description="""Specific user feedback about their experience at
          the coffee shop. This includes opinions on drinks, food, pastries, ambiance,
          staff friendliness, service speed, cleanliness, and any suggestions for
          improvement."""
        )
      )

  When using custom topics, it's recommended to also provide [few-shot examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#configure-few-shots) demonstrating how memories should be extracted from your conversation.

With customization, you can use any combination of memory topics. For example,
you can use a subset of the available managed memory topics:

### Dictionary

    customization_config = {
      "memory_topics": [
        { "managed_memory_topic": { "managed_topic_enum": "USER_PERSONAL_INFO" } },
        { "managed_memory_topic": { "managed_topic_enum": "USER_PREFERENCES" } }
      ]
    }

### Class-based

    from vertexai.types import MemoryBankCustomizationConfig as CustomizationConfig
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopicManagedMemoryTopic as ManagedMemoryTopic
    from vertexai.types import ManagedTopicEnum

    customization_config = CustomizationConfig(
      memory_topics=[
          MemoryTopic(
              managed_memory_topic=ManagedMemoryTopic(
                  managed_topic_enum=ManagedTopicEnum.USER_PERSONAL_INFO)
          ),
          MemoryTopic(
              managed_memory_topic=ManagedMemoryTopic(
                  managed_topic_enum=ManagedTopicEnum.USER_PREFERENCES)
          ),
      ]
    )

You can also use a combination of managed and custom topics (or only use custom
topics):

### Dictionary

    customization_config = {
      "memory_topics": [
        { "managed_memory_topic": { "managed_topic_enum": "USER_PERSONAL_INFO" } },
        {
          "custom_memory_topic": {
            "label": "business_feedback",
            "description": """Specific user feedback about their experience at
    the coffee shop. This includes opinions on drinks, food, pastries, ambiance,
    staff friendliness, service speed, cleanliness, and any suggestions for
    improvement."""
            }
        }
      ]
    }

### Class-based

    from vertexai.types import MemoryBankCustomizationConfig as CustomizationConfig
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopic as MemoryTopic
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopicCustomMemoryTopic as CustomMemoryTopic
    from vertexai.types import MemoryBankCustomizationConfigMemoryTopicManagedMemoryTopic as ManagedMemoryTopic
    from vertexai.types import ManagedTopicEnum

    customization_config = CustomizationConfig(
      memory_topics=[
          MemoryTopic(
              managed_memory_topic=ManagedMemoryTopic(
                  managed_topic_enum=ManagedTopicEnum.USER_PERSONAL_INFO)
          ),
          MemoryTopic(
              custom_memory_topic=CustomMemoryTopic(
                  label="business_feedback",
                  description="""Specific user feedback about their experience at
    the coffee shop. This includes opinions on drinks, food, pastries, ambiance,
    staff friendliness, service speed, cleanliness, and any suggestions for
    improvement."""
              )
        )
      ]
    )

#### Few-shot examples

Few-shot examples allow you to demonstrate expected memory extraction behavior
to Memory Bank. For example, you can provide a sample input
conversation and the memories that are expected to be extracted from that
conversation.

We recommend always using few-shots with custom topics so that
Memory Bank can learn the intended behavior. Few-shots are
optional when using managed topics since Memory Bank defines
examples for each topic. Demonstrate conversations that are not expected to
result in memories by providing an empty `generated_memories` list.

For example, you can provide few-shot examples that demonstrate how to extract
feedback about your business from customer messages:

### Dictionary

    example = {
        "conversationSource": {
          "events": [
            {
              "content": {
                "role": "model",
                "parts": [{ "text": "Welcome back to The Daily Grind! We'd love to hear your feedback on your visit." }] }
            },
            {
              "content": {
                "role": "user",
                "parts": [{ "text": "Hey. The drip coffee was a bit lukewarm today, which was a bummer. Also, the music was way too loud, I could barely hear my friend." }] }
            }
          ]
        },
        "generatedMemories": [
          {
            "fact": "The user reported that the drip coffee was lukewarm."
          },
          {
            "fact": "The user felt the music in the shop was too loud."
          }
        ]
    }

### Class-based

    from google.genai.types import Content, Part
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExample as GenerateMemoriesExample
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExampleConversationSource as ConversationSource
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExampleConversationSourceEvent as ConversationSourceEvent
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExampleGeneratedMemory as ExampleGeneratedMemory

    example = GenerateMemoriesExample(
        conversation_source=ConversationSource(
            events=[
                ConversationSourceEvent(
                    content=Content(
                        role="model",
                        parts=[Part(text="Welcome back to The Daily Grind! We'd love to hear your feedback on your visit.")]
                    )
                ),
                ConversationSourceEvent(
                    content=Content(
                        role="user",
                        parts=[Part(text= "Hey. The drip coffee was a bit lukewarm today, which was a bummer. Also, the music was way too loud, I could barely hear my friend.")]
                    )
                )
            ]
        ),
        generated_memories=[
            ExampleGeneratedMemory(
                fact="The user reported that the drip coffee was lukewarm."
            ),
            ExampleGeneratedMemory(
                fact="The user felt the music in the shop was too loud."
            )
        ]
    )

You can also provide examples of conversations that shouldn't result in any
generated memories by providing an empty list for the expected output
(`generated_memories`):

### Dictionary

    example = {
        "conversationSource": {
            "events": [
              {
                  "content": {
                      "role": "model",
                      "parts": [{ "text": "Good morning! What can I get for you at The Daily Grind?" }] }
              },
              {
                  "content": {
                      "role": "user",
                      "parts": [{ "text": "Thanks for the coffee." }] }
              }
            ]
        },
        "generatedMemories": []
    }

### Class-based

    from google.genai.types import Content, Part
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExample as GenerateMemoriesExample
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExampleConversationSource as ConversationSource
    from vertexai.types import MemoryBankCustomizationConfigGenerateMemoriesExampleConversationSourceEvent as ConversationSourceEvent

    example = GenerateMemoriesExample(
        conversation_source=ConversationSource(
            events=[
                ConversationSourceEvent(
                    content=Content(
                        role="model",
                        parts=[Part(text="Welcome back to The Daily Grind! We'd love to hear your feedback on your visit.")]
                    )
                ),
                ConversationSourceEvent(
                    content=Content(
                        role="user",
                        parts=[Part(text= "Thanks for the coffee!")]
                    )
                )
            ]
        ),
        generated_memories=[]
    )

#### Memory perspective

By default, memories are generated in the first person (e.g. "I use
Memory Bank for memory management."). You can configure
Memory Bank to generate in the third person (e.g., "The user uses
Memory Bank for memory management.") using the
`enable_third_person_memories` parameter.

### Dictionary

    customization_config = {
      "enable_third_person_memories": True
    }

### Class-based

    from vertexai.types import MemoryBankCustomizationConfig as CustomizationConfig

    customization_config = CustomizationConfig(
        enable_third_person_memories=True
    )

> [!NOTE]
> **Note:** If you're [providing few-shot examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#configure-few-shots), make sure that their perspective is consistent with your instance's configured perspective.

#### Consolidation customization

During [consolidation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories), Memory Bank
determines how to integrate newly acquired information into your existing memory
set. Memory Bank evaluates whether to ADD new memories, UPDATE
existing memories with additional context, or DELETE obsolete memories.

To ensure high-quality, corroborated memories, Memory Bank can optionally analyze a memory's history to distinguish long-term trends from one-time outliers.

By default, Memory Bank only compares new information to the most recent snapshot of a candidate memory (a ["memory revision"](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions)). To increase the depth of this analysis, configure the `revisions_per_candidate_count` parameter. This parameter defines how many previous revisions of each "candidate memory" (the specific record being evaluated for an update) Memory Bank considers during consolidation.

### Dictionary

    customization_config = {
      "consolidation_customization": {
        "revisions_per_candidate_count": 10
      }
    }

### Class-based

    from vertexai.types import MemoryBankCustomizationConfig as CustomizationConfig
    from vertexai.types import MemoryBankCustomizationConfigConsolidationConfig as ConsolidationConfig

    customization_config = CustomizationConfig(
        consolidation_customization=ConsolidationConfig(
          revisions_per_candidate_count=10
        )
    )

Increasing `revisions_per_candidate_count` results in more consistent and
corroborated memories by accounting for the repetition of ingested information.
However, a higher count increases token consumption during the consolidation
process.

### Similarity search configuration

The similarity search configuration controls which embedding model is used by
your instance for similarity search. Similarity search is used for identifying
which memories should be candidates for
[consolidation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories) and
for [similarity search-based memory
retrieval](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#similarity-search).
If this configuration is not provided, Memory Bank uses
`text-embedding-005` as the default model.

If you expect user conversations to be in non-English languages, use a
[model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings) that
supports multiple languages, such as `gemini-embedding-001` or
`text-multilingual-embedding-002`, to improve retrieval quality.

### Dictionary

    memory_bank_config = {
        "similarity_search_config": {
            "embedding_model": "EMBEDDING_MODEL",
        }
    }

### Class-based

    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfig as MemoryBankConfig
    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigSimilaritySearchConfig as SimilaritySearchConfig

    memory_bank_config = MemoryBankConfig(
        similarity_search_config=SimilaritySearchConfig(
            embedding_model="EMBEDDING_MODEL"
        )
    )

Replace the following:

- <var translate="no">EMBEDDING_MODEL</var>: The Google text embedding model to use for similarity search, in the format `projects/{project}/locations/{location}/publishers/google/models/{model}`.

### Generation configuration

The generation configuration controls which LLM is used for [generating
memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories), including
extracting memories and consolidating new memories with existing memories.

Effective June 29, 2026, Memory Bank uses
`gemini-3.5-flash` for the default model. Instances created prior to
that date use `gemini-2.5-flash`.

For new Memory Bank instances using the default model:

- Memory Bank instances in `us` multi-region or `us-*` single-regions (for example, us-central1) use the multi-region `us` Gemini 3.5 endpoint.
- Memory Bank instances in `eu` multi-region or `eu-*` single-regions (for example, europe-west2) use the multi-region `eu` Gemini 3.5 endpoint.
- All other Memory Bank regions use the global Gemini 3.5 endpoint.

For Memory Bank instances created before June 29, 2026 using the default model, Memory Bank uses the `global` Gemini endpoint for regions that don't have a regional Gemini 2.5 endpoint available.

### Dictionary

    memory_bank_config = {
      "generation_config": {
        "model": "LLM_MODEL",
      }
    }

### Class-based

    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfig as MemoryBankConfig
    from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigGenerationConfig as GenerationConfig

    memory_bank_config = MemoryBankConfig(
      generation_config=GenerationConfig(
        model="LLM_MODEL"
      )
    )

Replace the following:

- <var translate="no">LLM_MODEL</var>: The Google LLM model to use for extracting and consolidating memories, in the format `projects/{project}/locations/{location}/publishers/google/models/{model}`.

### Time to live (TTL) configuration

The TTL configuration controls how Memory Bank should dynamically
set memories' expiration time. After their expiration time elapses, memories
won't be available for retrieval and will be deleted.

If the configuration is not provided, expiration time won't be dynamically set
for created or updated memories, so memories won't expire unless their
expiration time is manually set.

There are two options for the TTL configuration:

- **Default TTL** : The TTL will be applied to all operations that create or
  update a memory, including `UpdateMemory`, `CreateMemory`, and
  `GenerateMemories`.

  ### Dictionary

      memory_bank_config = {
        "ttl_config": {
            "default_ttl": f"TTLs"
        }
      }

  ### Class-based

      from vertexai.types import ReasoningEngineContextSpecMemoryBankConfig as MemoryBankConfig
      from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigTtlConfig as TtlConfig

      memory_bank_config = MemoryBankConfig(
        ttl_config=TtlConfig(
            default_ttl=f"TTLs"
        )
      )

  Replace the following:
  - <var translate="no">TTL</var>: The duration in seconds for the TTL. For updated memories, the newly calculated expiration time (now + TTL) will overwrite the Memory's previous expiration time.
- **Granular (per-operation) TTL**: The TTL is calculated based on which
  operation created or updated the Memory. If not set for a given operation,
  then the operation won't update the Memory's expiration time.

  ### Dictionary

      memory_bank_config = {
        "ttl_config": {
            "granular_ttl": {
                "create_ttl": f"CREATE_TTLs",
                "generate_created_ttl": f"GENERATE_CREATED_TTLs",
                "generate_updated_ttl": f"GENERATE_UPDATED_TTLs"
            }
        }
      }

  ### Class-based

      from vertexai.types import ReasoningEngineContextSpecMemoryBankConfig as MemoryBankConfig
      from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigTtlConfig as TtlConfig
      from vertexai.types import ReasoningEngineContextSpecMemoryBankConfigTtlConfigGranularTtlConfig as GranularTtlConfig

      memory_bank_config = MemoryBankConfig(
        ttl_config=TtlConfig(
            granular_ttl_config=GranularTtlConfig(
                create_ttl=f"CREATE_TTLs",
                generate_created_ttl=f"GENERATE_CREATED_TTLs",
                generate_updated_ttl=f"GENERATE_UPDATED_TTLs",
            )
        )
      )

  Replace the following:
  - <var translate="no">CREATE_TTL</var>: The duration in seconds for the TTL for memories created using `CreateMemory`.
  - <var translate="no">GENERATE_CREATED_TTL</var>: The duration in seconds for the TTL for memories created using `GenerateMemories`.
  - <var translate="no">GENERATE_UPDATED_TTL</var>: The duration in seconds for the TTL for memories updated using `GenerateMemories`. The newly calculated expiration time (now + TTL) will overwrite the Memory's previous expiration time.

## What's next

Quickstart

### [Memory Bank API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/api-quickstart)

Get started with the Memory Bank API to manage long-term memories.

Quickstart

### [Quickstart with Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/adk-quickstart)

Get started with the Agent Development Kit (ADK).
