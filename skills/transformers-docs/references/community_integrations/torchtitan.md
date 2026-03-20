

# torchtitan

[torchtitan](https://github.com/pytorch/torchtitan) is PyTorch's distributed training framework for large language models. It supports Fully Sharded Data Parallelism (FSDP), tensor, pipeline, and context parallelism (4D parallelism). torchtitan is fully compatible with [torch.compile](../perf_torch_compile), enabling kernel fusion and graph optimizations that significantly reduce memory overhead and speed up training.

> [!NOTE]
> Only dense models are supported at the moment.

Use a Transformers model directly in torchtitan's distributed training infrastructure.

```py
import torch
from torchtitan.config.job_config import JobConfig
from torchtitan.experiments.transformers_modeling_backend.job_config import (
    HFTransformers,
)
from torchtitan.experiments.transformers_modeling_backend.model.args import (
    TitanDenseModelArgs,
    HFTransformerModelArgs,
)
from torchtitan.experiments.transformers_modeling_backend.model.model import (
    HFTransformerModel,
)

job_config = JobConfig()

job_config.hf_transformers = HFTransformers(model="Qwen/Qwen2.5-7B")

titan_args = TitanDenseModelArgs()
model_args = HFTransformerModelArgs(titan_dense_args=titan_args).update_from_config(
    job_config
)

model = HFTransformerModel(model_args)
```

## Transformers integration

1. [`AutoConfig.from_pretrained`] loads the config for a given model. The config values are copied into torchtitan style args in `HFTransformerModelArgs`.
2. torchtitan's `HFTransformerModel` wrapper scans the `architecture` field in the config and instantiates and loads the corresponding model class, like [`LlamaForCausalLM`].
3. The `forward` path uses native Transformers components while leaning on torchtitan's parallelization and optimization methods. torchtitan treats the Transformers model as a torchtitan model without needing to rewrite anything.

## Resources

- [torchtitan](https://github.com/pytorch/torchtitan) repository
