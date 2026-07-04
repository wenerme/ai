> [!WARNING]
> **Preview**
>
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General
> Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) as well as the
> [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms).
> This feature lets you generate, store, and retrieve memories for AI
> Agents, and so the "Agentic AI Services" Service Specific Terms apply.
> Pre-GA features are available "as is" and might have limited support. For
> more information, see the
> [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

You can use Memory Bank to generate structured profiles, which are data structures with static schemas populated and updated using LLMs. By defining a fixed schema, you ensure your agents have immediate, low-latency access to evolving information without the need for expensive search operations during a session.

To complete the steps demonstrated in this guide, you must first follow the
steps in [Set up for
Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup).

## Overview

Using structured profiles with your agent ensures that extracted information---like a user's technical stacks or preferences---is available quickly, succinctly, and with a consistent format. For example, you can retrieve profiles that include content like:

    MemoryProfile(
        profile={
            "technical_stacks": "ADK, Python",
            "preferred_language": "Python",
            "tone_preference": "Succinct"
        },
        schema_id="user-profile"
    )

Structured profiles are optimized for low-latency retrieval, because the hard work of curating the information is done at generation-time. They are great for initializing an interaction between an agent and user.

### Understanding structured memory profiles

Structured profiles are generated through the same methods ([`GenerateMemories` and `IngestEvents`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#triggering-memory-generation)) that you use for natural language memories. Once you define a [schema](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/profiles#schema), Memory Bank will automatically try to generate profiles that align with your schema using the provided data sources.

When using structured profiles, Memory Bank performs the following operations during memory generation:

- **Extraction** : Extracts information and context that fits the schema from the data source. Only information that aligns with the schema will be extracted. You can inspect what information and context was extracted using [memory revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions).
- **Consolidation** : Updates (if necessary) existing fields in the profile. An [LLM](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#generation-config) will judge how to update the existing content based on the newly extracted information and context. If the field does not already exist in the profile, consolidation will be skipped, and the field will be updated directly with the extracted information.

Profiles are isolated based on the `scope` (like `{"user_id": "123"}`) that you provided when ingesting data to Memory Bank. For each schema and scope, Memory Bank maintains a single profile as the source-of-truth. A generated profile is composed of one or more `Memory` instances. Each `Memory` instance represents a single field within the profile that you can use to inspect the field's metadata and revision history, like:

    Memory(
         create_time=datetime.datetime(...),
         memory_type=<MemoryType.STRUCTURED_PROFILE: 'STRUCTURED_PROFILE'>,
         name='projects/.../locations/.../reasoningEngines/.../memories/...',
         scope={
           'user_id': '123'
         },
         structured_content=MemoryStructuredContent(
           data={
             'language_preference': 'Java'
           },
           schema_id='user-profile'
         ),
         update_time=datetime.datetime(...),
         expire_time=datetime.datetime(...),
         metadata={...}
    )

## Schema definition

The profiles that Memory Bank generate align with the schema that was defined when the [Agent Platform instance was created or updated](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#create-update). You can use a `pydantic` model to define the fields you want Memory Bank to extract and maintain. For example:

    from pydantic import BaseModel, Field
    from typing import Literal

    class UserProfile(BaseModel):
        name: str = Field(
          description="Name of the user.")
        technical_stack: str = Field(
          description="Comma-separated list tools or languages used by the user.")
        primary_goal: str = Field(
          description="The main objective the user is pursuing.")
        expertise_level: str = Field(
          description="Current skill level (e.g., Junior, Senior).")
        job_status: Literal['unemployed', 'part_time', 'full_time', 'student'] = Field(
          description="The job status of the individual")

Upload the schema to Memory Bank when you create or update your Agent Platform instance. You can define multiple independent profile schemas; each schema must be identified by a unique ID:

    schema_config = {
      "id": "user-profile",
      "memory_schema": UserProfile.model_json_schema()
    }

    memory_bank = client.agent_engines.create(
        config={
            "context_spec": {
                "memory_bank_config": {
                    "structured_memory_configs": [
                        {
                            "schema_configs": [schema_config]
                        }
                    ]
                }
            }
        }
    )

By default, Memory Bank will always try to extract natural language memories. You can disable natural language memory generation if you only want Memory Bank to generate profiles:

    memory_bank = client.agent_engines.create(
        config={
            "context_spec": {
                "memory_bank_config": {
                    "structured_memory_configs": [
                        {
                            "schema_configs": [schema_config]
                        }
                    ],
                    # Optional: Disable natural language memories.
                    "customization_configs": [
                        {"disable_natural_language_memories": True}
                    ]
                }
            }
        }
    )

## Profile generation

You [trigger](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#triggering-memory-generation) the generation of structured memories by providing a conversation history (events) to the `GenerateMemories` or `IngestEvents` methods. Like with natural language memories, Memory Bank uses LLMs to extract meaningful information from the data sources and consolidate it with existing memories.

**Example**

The following example walks through memory profile generation using the [previously defined schema](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/profiles#schema).

In the first set of events sent to Memory Bank for scope `{"user_id": "123"}`, the user indicates that they work with ADK agents:

    client.agent_engines.memories.generate(
      name=memory_bank.api_resource.name,
      scope={"user_id": "123"},
      direct_contents_source={
        "events": [
          {"content": {
            "parts": [{
              "text": "Can you help me build an ADK agent that organizes my daily tasks?"}]}}]
      }
    )

Memory Bank extracts "ADK" for the `technical_stack` field in the schema. No other fields are populated because the ingested event does not contain relevant information for the rest of the schema. Since this is the first interaction for this scope, consolidation is skipped and the profile is initialized with this initial value.

    result = client.agent_engines.memories.retrieve_profiles(
        name=memory_bank.api_resource.name,
        scope={"user_id": "123"},
    )

    """
    Returns:

    RetrieveProfilesResponse(
      profiles={
        'user-profile': MemoryProfile(
          profile={
            'technical_stack': 'ADK'
          },
          schema_id='user-profile'
        )
      }
    )
    """

In the next set of events sent to Memory Bank, the user indicates that they are a student and primarily code in Python:

    client.agent_engines.memories.generate(
      name=memory_bank.api_resource.name,
      scope={"user_id": "123"},
      direct_contents_source={
        "events": [
          {"content": {
            "parts": [
              {"text": "Do you have any career recommendations for students that specialize in Python?"}]}}]
      }
    )

Memory Bank extracts both "Python" and the "student" status from the interaction. The `technical_stack` fragment is consolidated, appending "Python" to the existing "ADK" entry. The system populates the previously empty `job_status` field with the "student" enum and skips the consolidation step.

    result = client.agent_engines.memories.retrieve_profiles(
        name=memory_bank.api_resource.name,
        scope=scope
    )

    """
    Returns:

    RetrieveProfilesResponse(
      profiles={
        'user-profile': MemoryProfile(
          profile={
            'technical_stack': 'ADK, Python',
            'job_status': 'student'
          },
          schema_id='user-profile'
        )
      }
    )
    """

## Profile retrieval

Once generated, you can retrieve the consolidated profile for a specific scope using the `RetrieveProfiles` method. This returns the most up-to-date data mapped to your schema.

    result = client.agent_engines.memories.retrieve_profiles(
      name=memory_bank.api_resource.name,
      scope={"user_id": "123"},
    )

    # Accessing the data
    for profile in result.profiles.values():
      print(profile)
      # Output: {'technical_stack': 'ADK, Python', 'job_status': 'student', ...}

## Profile inspection

Under the hood, a profile is composed of individual memories of type `STRUCTURED_PROFILE`. Each field in your schema maps to a single memory per scope, allowing for granular observability.

While [`RetrieveProfiles`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/profiles#retrieve-profiles) is the primary method for production retrieval of profiles, you can inspect individual memories to audit the profile's evolution. This provides access to:

- Field-Level Metadata: View and update specific time to live (TTL) and `Memory.metadata` for individual fields in the profile.
- Revision History: Trace the lineage of a field to see historical values and the specific conversation context that triggered each change.

For example, you can use `RetrieveMemories` to retrieve all memories containing fragments of a user's profile. By default, `RetrieveMemories` only retrieves natural language memories, so you need to explicitly request `STRUCTURED_PROFILE` memories:

    client.agent_engines.memories.retrieve(
      name="...",
      scope={"user_id": "123"},
      config={
        "memory_types": ["STRUCTURED_PROFILE"]
      }
    )

    """
    Returns:

    [RetrieveMemoriesResponseRetrievedMemory(
       memory=Memory(
         create_time=datetime.datetime(...),
         memory_type=<MemoryType.STRUCTURED_PROFILE: 'STRUCTURED_PROFILE'>,
         name='projects/.../locations/.../reasoningEngines/.../memories/...',
         scope={
           'user_id': '1'
         },
         structured_content=MemoryStructuredContent(
           data={
             'technical_stack': 'ADK, Python'
           },
           schema_id='user'
         ),
         update_time=datetime.datetime(...)
       )
     )]
    """

Then, you can retrieve the revision history of this structured profile fragment to inspect how the profile field changed over time and the context around each of those changes:

    for retrieved_memory in list(results):
        list(client.agent_engines.memories.revisions.list(
            name=retrieved_memory.memory.name
        ))

    """
    Returns:

    [MemoryRevision(
       create_time=datetime.datetime(...),
       expire_time=datetime.datetime(...),
       extracted_memories=[
         IntermediateExtractedMemory(
           context='The user indicated that they have expertise in Python when asking about career options.',
           structured_data={
             'technical_stack': 'Python'
           }
         ),
       ],
       name='projects/.../locations/.../reasoningEngines/.../memories/.../revisions/...',
       structured_data={
         'technical_stack': 'ADK, Python'
       }
     ),
     MemoryRevision(
       create_time=datetime.datetime(...),
       expire_time=datetime.datetime(...),
       extracted_memories=[
         IntermediateExtractedMemory(
           context='The user indicated that they need help building an ADK agent',
           structured_data={
             'technical_stack': 'ADK'
           }
         ),
       ],
       name='projects/.../locations/.../reasoningEngines/.../memories/.../revisions/...',
       structured_data={
         'technical_stack': 'ADK'
       }
     )]
    """
