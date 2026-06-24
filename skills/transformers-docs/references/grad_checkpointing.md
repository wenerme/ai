

# Gradient checkpointing

The forward pass typically caches all intermediate activations for the backward pass to reuse. However, activations scale with batch size and sequence length. Gradient checkpointing only saves certain activations and discards the rest. This forces the backward pass to recompute some of the activations on-the-fly as they're needed.

```text
Normal training:
  Forward:   [L1]→[L2]→[L3]→[L4]   (save ALL activations)
  Backward:  ←uses cached activations everywhere

Gradient checkpointing:
  Forward:   [L1]→[L2]→[L3]→[L4]   (save only at checkpoints, discard the rest)
  Backward:  ←reaches L2, recomputes L2→L3 from scratch, uses it, discards it
```

Training will be ~20% slower because some activations need to be recomputed, but it reduces activation memory.

Set `gradient_checkpointing=True` to enable.

> [!TIP]
> Use with [gradient accumulation](./grad_accumulation) to further reduce memory usage.

```py
from transformers import TrainingArguments

args = TrainingArguments(
    ...,
    gradient_checkpointing=True,
)
```

## Next steps

- Read the [GPU memory usage](./model_memory_anatomy) doc to understand what is driving memory usage on the GPU during training.
- See the [Mixed precision training](./mixed_precision_training) guide to learn how to use lower precision data types to further reduce memory and speed up training.
- See the [Kernels](./kernels) guide to learn how to speed up training with custom fused kernels.
