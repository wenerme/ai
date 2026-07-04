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

The `IngestEvents` API decouples event ingestion from memory generation in Memory Bank. You can continuously stream content to Memory Bank, and generation will automatically run when your triggering criteria are satisfied.

To complete the steps demonstrated in this guide, you must first follow the steps in [Set up for Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup).

## Understanding event ingestion

With the `GenerateMemories` API, memory generation is triggered immediately. This method provides you with direct control over when memory generation occurs. `IngestEvents` offers a streaming pattern that decouples event ingestion from memory generation:

- **Continuous ingestion**: You can continuously stream context to Memory Bank whenever new data is available.
- **Deduplication**: Memory Bank automatically detects and ignores overlapping conversation history based on shared event IDs.
- **Automated triggers**: Generation is automatically triggered only when specific conditions are met, like event count thresholds or idle time.
- **Asynchronous generation**: Events are processed in the background. The API immediately returns a long-running operation (LRO), which you can poll or monitor until the trigger condition is met and memories are generated.

### Streams and long-running operations (LROs)

Streams act as isolated buffers that accumulate events across multiple requests. Each stream is uniquely defined by the combination of its `scope` and `stream_id`. If you don't provide a stream ID, Memory Bank uses `default` as the ID. Events are only staged and "flushed" together if they share the exact same scope and ID, ensuring strict isolation during memory generation.

Multiple ingestion calls to the same stream return the same LRO until memory generation is triggered and finished. After completion, this `IngestEvents` LRO contains the downstream LRO for the `GenerateMemories` API call. Any subsequent ingestion requests to the stream will return a new LRO.

## Triggering memory generation

If no trigger conditions are met, all pending events in a stream are automatically flushed out 24 hours after the first event is ingested. This limit ensures Memory Bank processes all events, including ones that have been abandoned.

The `generation_trigger_config` determines when the collected events are flushed and processed for memory generation. You can use one of the following trigger conditions:

- **Event count** (`event_count`): Generation triggers once the number of unique events accumulated reaches the limit.
- **Inactive time** (`idle_duration`, in seconds with minute granularity, meaning you must specify a multiple of 60): Generation is triggered when the stream hasn't received new events after the specified duration (for example, `"300s"`).
- **Fixed interval** (`fixed_interval`, in seconds with minute granularity, meaning you must specify a multiple of 60): Generation executes on a fixed rhythm, polling for delta events after every specified duration (for example, `"300s"`).
- **Force flush** (`force_flush`): Flush all the pending events immediately.

The API uses the `event_id` to deduplicate data automatically. By providing a unique ID for each event, only new events are added to the buffer.

## Data source

With `IngestEvents`, you provide content by submitting events directly within your application request using [direct_contents_source](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#direct-contents-source) in a direct payload.

The following examples showcase different triggers.

#### Example: Event count trigger

This example uses a custom stream and triggers generation when 10 unique events have been accumulated in the stream.

### Dictionary

    client.agent_engines.memories.ingest_events(
        name=memory_bank.api_resource.name,
        stream_id="my-custom-stream",
        direct_contents_source={
            "events": [
                {
                    "content": {
                        "role": "user",
                        "parts": [{"text": "My favorite color is blue."}]
                    },
                    "event_id": "event-1" # Optional, used for deduplication.
                }
            ]
        },
        generation_trigger_config={
            "generation_rule": {
                "event_count": 10
            }
        },
        scope={"user_id": "123"}
    )

### Class-based

    from google import genai
    from vertexai import types

    client.agent_engines.memories.ingest_events(
        name=memory_bank.api_resource.name,
        stream_id="my-custom-stream",
        direct_contents_source=types.IngestionDirectContentsSource(
            events=[
                types.IngestionDirectContentsSourceEvent(
                    content=genai.types.Content(
                        role="user",
                        parts=[genai.types.Part.from_text(text="My favorite color is blue.")]
                    ),
                    event_id="event-1" # Optional, used for deduplication.
                )
            ]
        ),
        generation_trigger_config=types.MemoryGenerationTriggerConfig(
            generation_rule=types.MemoryGenerationTriggerConfigGenerationTriggerRule(
                event_count=10
            )
        ),
        scope={"user_id": "123"}
    )

#### Example: Time-based idle duration trigger

This example triggers generation when the stream has not received a new event for 5 minutes (`300s`). It also sets a custom `stream_id`.

### Dictionary

    client.agent_engines.memories.ingest_events(
        name=memory_bank.api_resource.name,
        stream_id="my-custom-stream",
        direct_contents_source={
            "events": [
                {
                    "content": {
                        "role": "user",
                        "parts": [{"text": "I will be back in a bit."}]
                    },
                    "event_id": "event-2" # Optional, used for deduplication.
                }
            ]
        },
        generation_trigger_config={
            "generation_rule": {
                "idle_duration": "300s"
            }
        },
        scope={"user_id": "123"}
    )

### Class-based

    from google import genai
    from vertexai import types

    client.agent_engines.memories.ingest_events(
        name=memory_bank.api_resource.name,
        stream_id="my-custom-stream",
        direct_contents_source=types.IngestionDirectContentsSource(
            events=[
                types.IngestionDirectContentsSourceEvent(
                    content=genai.types.Content(
                        role="user",
                        parts=[genai.types.Part.from_text(text="I will be back in a bit.")]
                    ),
                    event_id="event-2" # Optional, used for deduplication.
                )
            ]
        ),
        generation_trigger_config=types.MemoryGenerationTriggerConfig(
            generation_rule=types.GenerationTriggerRule(
                idle_duration="300s"
            )
        ),
        scope={"user_id": "123"}
    )

#### Example: Force flush events

This example unconditionally bypasses any trigger conditions and immediately forces all pending events in the stream to be flushed and processed.

### Dictionary

    client.agent_engines.memories.ingest_events(
        name=memory_bank.api_resource.name,
        stream_id="my-custom-stream",
        direct_contents_source={
            "events": [
                {
                    "content": {
                        "role": "user",
                        "parts": [{"text": "That's all for today!"}]
                    },
                }
            ]
        },
        config={
            "force_flush": True
        }
        scope={"user_id": "123"}
    )

### Class-based

    from google import genai
    from vertexai import types

    client.agent_engines.memories.ingest_events(
        name=memory_bank.api_resource.name,
        stream_id="my-custom-stream",
        direct_contents_source=types.IngestionDirectContentsSource(
            events=[
                types.IngestionDirectContentsSourceEvent(
                    content=genai.types.Content(
                        role="user",
                        parts=[genai.types.Part.from_text(text="That's all for today!")]
                    ),
                )
            ]
        ),
        config=types.IngestEventsConfig(
            force_flush=True
        )
        scope={"user_id": "123"}
    )

## What's next

- [Fetch generated memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories)
- [Inspect memory revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions)
