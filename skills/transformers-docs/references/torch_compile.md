

# torch.compile

[torch.compile](https://docs.pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) compiles PyTorch code to fused kernels to make it run faster. For training, it traces both the forward and backward pass together and compiles them into optimized kernels, reducing the overhead of individual op launches and fusing operations to cut memory bandwidth usage.

Set `torch_compile=True` in [`TrainingArguments`] to enable it. Training compiles both the forward and backward pass, unlike inference which only compiles the forward pass. Compilation happens on the first training step, so expect it to be significantly slower than subsequent steps.

```py
from transformers import TrainingArguments

args = TrainingArguments(
    ...,
    torch_compile=True,
    torch_compile_backend="inductor",
    torch_compile_mode="reduce-overhead",
)
```

## Backend

When no backend is specified, [`TrainingArguments`] selects one based on your hardware. On most CPUs and GPUs, the default is `inductor`, which compiles to Triton kernels with AOTAutograd and suits most training workloads. On Intel Gaudi (HPU), the default is `hpu_backend`. On AWS Trainium and Inferentia (Neuron), the default is `neuron`.

Use `cudagraphs` for fixed-shape inputs, or `ipex` for Intel CPU training.

## Compile mode

Use the table below to help select a `torch.compile` mode.

| mode | description |
|---|---|
| default | balanced compile time vs runtime   |
| reduce-overhead | reduces Python/CPU overhead using CUDA graphs at the cost of some extra memory |
| max-autotune | benchmarks multiple kernel implementations at compile and picks the fastest (longer compilation) |
| max-autotune-no-cudagraphs | same as max-autotune but without CUDA graphs |

## Next steps

- See the [torch.compile for inference](./perf_torch_compile) guide for details on fullgraph compilation and inference benchmarks.
