

# Generation

Each framework has a generate method for text generation implemented in their respective `GenerationMixin` class:

- PyTorch [`~generation.GenerationMixin.generate`] is implemented in [`~generation.GenerationMixin`].

You can parameterize the generate method with a [`~generation.GenerationConfig`] class instance. Please refer to this class for the complete list of generation parameters, which control the behavior of the generation method.

To learn how to inspect a model's generation configuration, what are the defaults, how to change the parameters ad hoc,
and how to create and save a customized generation configuration, refer to the
[text generation strategies guide](../generation_strategies). The guide also explains how to use related features,
like token streaming.

## GenerationConfig

[[autodoc]] generation.GenerationConfig
    - from_pretrained
    - from_model_config
    - save_pretrained
    - update
    - validate
    - get_generation_mode

## GenerationMixin

[[autodoc]] GenerationMixin
    - generate
    - compute_transition_scores

## ContinuousMixin

[[autodoc]] generation.ContinuousMixin

## ContinuousBatchingManager

[[autodoc]] generation.ContinuousBatchingManager

## Scheduler

[[autodoc]] generation.Scheduler

## FIFOScheduler

[[autodoc]] generation.FIFOScheduler

## PrefillFirstScheduler

[[autodoc]] generation.PrefillFirstScheduler
