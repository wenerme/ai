

# Continuous batching

This page documents the classes behind continuous batching inference: submitting prompts, configuring scheduling and memory limits, and retrieving results.

For usage examples, see the [Continuous batching](../continuous_batching) guide and for how scheduling and memory interact, see the [Continuous batching architecture](../continuous_batching_architecture) doc.

## ContinuousMixin.generate_batch

[[autodoc]] ContinuousMixin.generate_batch

## ContinuousBatchingManager

[[autodoc]] ContinuousBatchingManager

## Continuous batching config

[[autodoc]] ContinuousBatchingConfig
    - __call__