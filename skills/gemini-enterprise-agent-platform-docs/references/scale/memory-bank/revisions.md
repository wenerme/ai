Memory Bank automatically maintains a version history of your memories
through memory revision resources. Each time a memory is created or modified, a
new immutable revision is saved, providing transparency into how information
evolves and what was extracted at each step.

This document explains the lifecycle of memories and their revisions, and
describes operations such as listing, getting, and rolling back revisions.

For more information about generating memories, see
[Generate memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories).

## Lifecycle of a memory and its revisions

![Data sources and memory revisions](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/memory-revisions.png)

Memories can be created, updated, or deleted either directly (using
`CreateMemory`, `UpdateMemory`, or `DeleteMemory`, respectively) or dynamically
(using `GenerateMemories`). Memory revision resources provide a complete version
history of a memory resource across all mutation operations. A new, immutable
revision is automatically saved each time that the memory is created or
modified. This gives you transparency into how a memory has evolved and (for
memory generation) what specific information was extracted and consolidated at
each step.

Every memory resource has one or more associated child memory revision
resources:

- `Memory` resources always reflect the current, consolidated state of the
  information. A single memory can reflect derived data from multiple requests
  and data sources.

      Memory(
          create_time=datetime.datetime(...),
          fact='This is my current memory content after consolidation',
          name='projects/.../locations/.../reasoningEngines/../memories/...',
          scope={
            'my_scope_key': 'my_scope_value'
          },
          topics=[
            MemoryTopicId(
              managed_memory_topic=<ManagedTopicEnum.USER_PERSONAL_INFO: 'USER_PERSONAL_INFO'>
            ),
          ],
          update_time=datetime.datetime(...)
      )

- `MemoryRevisions` resources represent the historical states of the parent
  memory. Each revision is a snapshot of the memory at a mutation event. If a
  memory was mutated using `GenerateMemories`, the revision also includes the
  information that was extracted from the data source (`extracted_memories`)
  before it was consolidated with the memory's existing content.

      MemoryRevision(
          create_time=datetime.datetime(...),
          expire_time=datetime.datetime(...),
          extracted_memories=[
            IntermediateExtractedMemory(
              fact='This information was extracted from my data source'
            ),
          ],
          fact='This is my current memory content after consolidation',
          name='projects/.../locations/.../reasoningEngines/.../memories/.../revisions/...'
      )

  Memory revisions are enabled by default. To disable memory revisions, see
  [Disabling memory revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions#disable-memory-revisions).

### Memory creation

Memories can either be created directly using `CreateMemory` or dynamically
using `GenerateMemories`. With memory generation, a memory is created if there
are no existing memories that cover similar information for the same scope:

    # Direct creation using CreateMemory
    client.agent_engines.memories.create(name=memory_bank_name, ...)

    # Dynamic creation using GenerateMemory
    client.agent_engines.memories.generate_memories(name=memory_bank_name, ...)

When a memory is created, a single `Memory` resource and a child
`MemoryRevision` are created:

    client.agent_engines.memories.get(name=memory_name)
    """
    Memory(
      name="projects/123/locations/us-central1/reasoningEngines/456/memories/789",
      fact="This is my original fact.",
      ...
    )
    """

    list(client.agent_engines.memories.revisions.list(name=memory_name))
    """
    [
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/123",
        fact="This is my original fact",
        ...
      )
    ]
    """

### Memory update

Memories can either be updated directly using `UpdateMemory` or dynamically
using `GenerateMemories`. With memory generation, memories are dynamically
updated when the [consolidation process](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#understanding-memory-generation)
decides that the new information is duplicative, complementary, or contradictory
to all existing memories for the same scope.

    # Direct update using UpdateMemory
    client.agent_engines.memories.update(name=memory_name, ...)

    # Dynamic update using GenerateMemories
    client.agent_engines.memories.generate_memories(name=memory_bank_name, ...)

When a memory is updated, the existing `Memory` resource is updated, and a new
child `MemoryRevision` is created.

    client.agent_engines.memories.get(name=memory_name)
    """
    Memory(
      name="projects/123/locations/us-central1/reasoningEngines/456/memories/789",
      fact="This is my updated fact.",
      ...
    )
    """

    list(client.agent_engines.memories.revisions.list(name=memory_name))
    """
    [
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/456",
        fact="This is my updated fact",
        ...
      ),
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/123",
        fact="This is my original fact",
        ...
      )
    ]
    """

### Memory deletion

Memories can either be directly directly using `DeleteMemory` or dynamically
using `GenerateMemories`. With memory generation, memories are dynamically
deleted when the consolidation process decides that the new information
invalidates the existing information for the same scope.

    # Direct deletion using UpdateMemory
    client.agent_engines.memories.delete(name=memory_name, ...)

    # Dynamic delete using GenerateMemories
    client.agent_engines.memories.generate_memories(name=memory_bank_name, ...)

When a memory is deleted, the existing `Memory` resource is deleted, and a new
child `MemoryRevision` is created. The `fact` in the latest memory revision is
empty because it reflects a deletion mutation.

    client.agent_engines.memories.get(name=memory_name)
    """
    404 Not Found.
    """

    list(client.agent_engines.memories.revisions.list(name=memory_name))
    """
    [
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/789",
        fact="",
        ...
      ),
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/456",
        fact="This is my updated fact",
        ...
      ),
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/123",
        fact="This is my original fact",
        ...
      )
    ]
    """

The child memory revisions are only accessible for up to 48 hours after the
parent memory's deletion. During this recovery window, you can continue to
inspect your memory revisions, and you can recover your memory by [rolling it
back to a previous revision](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions#rollback-memory).

## Memory revision operations

This section describes how you can inspect memory revisions and roll back a
memory to a previous revision.

### List revisions

Use `ListMemoryRevisions` to return all memory revisions belonging to a memory.

    list(client.agent_engines.memories.revisions.list(name=MEMORY_NAME))

Replace the following:

- `MEMORY_NAME`: Resource name of the memory in the format: `projects/.../locations/.../reasoningEngines/.../memories/...`

When generating memories, you can provide revision labels which are applied to
the affiliated revisions. Labels are arbitrary key-value pairs. For example, you
can label revisions with an ID of the data source used to generate the memory
and then filter revisions by this label:

    response = client.agent_engines.memories.generate(
        ...,
        config={
            "revision_labels": {
                "data_source": "321"
            }
        }
    )

    list(client.agent_engines.memories.revisions.list(
        name=MEMORY_NAME,
        config={
          "filter": "labels.data_source=\"321\""
        }
    ))
    """
    [
      MemoryRevision(
        name="projects/123/locations/us-central1/reasoningEngines/456/memories/789/revision/123",
        labels={
          "data_source": "123"
        }
        ...
      )
    ]
    """

### Get a revision

Use `GetMemoryRevision` to fetch an individual memory revision.

    client.agent_engines.memories.revisions.get(name=MEMORY_REVISION_NAME)

Replace the following:

- `MEMORY_REVISION_NAME`: Resource name of the memory revision to fetch in the format: `projects/.../locations/.../reasoningEngines/.../memories/.../revisions/...`

### Roll back a memory

Use `RollbackMemory` to roll a memory back to a previous revision.

    client.agent_engines.memories.rollback(
        name=name=MEMORY_NAME,
        target_revision_id=REVISION_ID
    )

Replace the following:

- `MEMORY_NAME`: Resource name of the memory to update
  in the format:
  `projects/.../locations/.../reasoningEngines/.../memories/...`

- `REVISION_ID`: ID of the revision that should
  be rolled back to. This is the last segment of the memory revision resource
  name, like `789` in
  `projects/MyProject/locations/us-central1/reasoningEngines/123/memories/456/revisions/789`.

If you want to undo a change to a memory made by `GenerateMemories`, roll back
the memory to its revision before the change. The memory generation response
includes a reference to the previous revision (`previous_revision`) for each
updated or deleted memory:

    operation = client.agent_engines.memories.generate(
      ...
    )

    # Rollback the first generated memory to the previous revision.
    client.agent_engines.memories.rollback(
        name=operation.response.generated_memories[0].memory.name,
        target_revision_id=operation.response.generated_memories[0].previous_revision
    )

## Disabling memory revisions

Memory revisions are enabled by default. You can disable memory revisions either
for all requests to your Memory Bank instance or for each
individual request. If memory revisions are disabled, a memory revision isn't
created when the memory is mutated.

You can disable memory revisions for all requests to your
Memory Bank instance when you set up the instance:

    memory_bank = client.agent_engines.create(
      config={
        "context_spec": {
          "memory_bank_config": {
            "disable_memory_revisions": True
          }
        }
      }
    )

You can disable memory revisions on a request level when you send the request:

### Generate

    client.agent_engines.memories.generate(
      ...,
      "config": {
        "disable_memory_revisions": True
      }
    )

### Create

    client.agent_engines.memories.create(
      ...,
      "config": {
        "disable_memory_revisions": True
      }
    )

### Update

    client.agent_engines.memories.update(
      ...,
      "config": {
        "disable_memory_revisions": True
      }
    )

## Revision expiration

Memory revisions are not persisted forever. You must either set the revisions'
expiration or use the default expiration. The default time to live (TTL) is 365
days. You can configure the expiration either for all requests to your
Memory Bank instance or for each individual request. Once a
memory revision has expired, it is not available for inspection or rollbacks.

You can configure TTL for all requests to your Memory Bank
instance when you set up the instance:

    client.agent_engines.create(
      config={
        "context_spec": {
          "memory_bank_config": {
            "ttl_config": {
              # Persist memory revisions for 30 days after they're created.
              "revision_ttl": f"{30 * 60 * 60 * 24}s"
            }
          }
        }
      }
    )

To configure TTL for each memory revision on a request level, include
`revision_expire_time` or `revision_ttl` in your request:

### TTL

    config = {
        # Persist memory revisions for 30 days after they're created.
        "revision_ttl": f"{30 * 60 * 60 * 24}s"
    }

    client.agent_engines.memories.create(
      ...,
      config=config
    )

    client.agent_engines.memories.update(
      ...,
      config=config
    )

    client.agent_engines.memories.generate(
      ...,
      config=config
    )

### Expiration

    import datetime

    config = {
        "revision_expire_time": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(weeks=3)
    }

    client.agent_engines.memories.create(
      ...,
      config=config
    )

    client.agent_engines.memories.update(
      ...,
      config=config
    )

    client.agent_engines.memories.generate(
      ...,
      config=config
    )
