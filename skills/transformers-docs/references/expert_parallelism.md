

# Expert parallelism

[Expert parallelism](https://huggingface.co/spaces/nanotron/ultrascale-playbook?section=expert_parallelism) is a parallelism strategy for [mixture-of-experts (MoE) models](https://huggingface.co/blog/moe). Each expert's feedforward layer lives on a different hardware accelerator. A router dispatches tokens to the appropriate experts and gathers the results. This approach scales models to far larger parameter counts without increasing computation cost because each token activates only a few experts.

## DistributedConfig

> [!WARNING]
> The [`DistributedConfig`] API is experimental and its usage may change in the future.

Enable expert parallelism with the [`DistributedConfig`] class and the `enable_expert_parallel` argument.

```py
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.distributed.configuration_utils import DistributedConfig

distributed_config = DistributedConfig(enable_expert_parallel=True)

model = AutoModelForCausalLM.from_pretrained(
    "openai/gpt-oss-120b",
    dtype="auto",
    distributed_config=distributed_config,
)
```

> [!TIP]
> Expert parallelism automatically enables [tensor parallelism](./perf_infer_gpu_multi) for attention layers.

This argument switches to the `ep_plan` (expert parallel plan) defined in each MoE model's config file. The [`GroupedGemmParallel`] class splits expert weights so each device loads only its local experts. The `ep_router` routes tokens to experts and an all-reduce operation combines their outputs.

Launch your inference script with [torchrun](https://pytorch.org/docs/stable/elastic/run.html) and specify how many devices to use. The number of devices must evenly divide the total number of experts.

```zsh
torchrun --nproc-per-node 8 your_script.py
```
