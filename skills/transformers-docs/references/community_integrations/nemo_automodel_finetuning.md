

# NeMo Automodel

[NeMo Automodel](https://github.com/NVIDIA-NeMo/Automodel) is an open-source PyTorch DTensor-native training library from NVIDIA. It supports large and small scale pretraining and fine-tuning for [LLMs](https://docs.nvidia.com/nemo/automodel/latest/model-coverage/llm.html) and [VLMs](https://docs.nvidia.com/nemo/automodel/latest/model-coverage/vlm.html) for fast experimentation in research and production environments, with parallelism strategies including FSDP2, tensor, pipeline, expert, and context parallelism. For high throughput, it integrates kernels from DeepEP and TransformerEngine.

Define your training run in a YAML config file (see full [config file](https://github.com/NVIDIA-NeMo/Automodel/blob/0d05e245e0bbc9128b869b21a3908512affc6cae/examples/llm_finetune/nemotron/nemotron_nano_v3_hellaswag_peft.yaml)).

```yaml
# Instantiate a Nemotron V3 Nano model
model:
  _target_: nemo_automodel.NeMoAutoModelForCausalLM.from_pretrained
  pretrained_model_name_or_path: nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16

# Run SFT on HellaSwag
dataset:
  _target_: nemo_automodel.components.datasets.llm.hellaswag.HellaSwag
  path_or_dataset: rowan/hellaswag
  split: train

# Train PEFT adapters
peft:
  _target_: nemo_automodel.components._peft.lora.PeftConfig
  exclude_modules: ["*.out_proj"]  # mamba layers use custom kernels that take in the out_proj.weight directly, thus lora doesn't work here.
  dim: 8
  alpha: 32
  use_triton: True

# Use EP + FSDP2 for training
distributed:
  strategy: fsdp2
  dp_size: none
  tp_size: 1
  cp_size: 1
  ep_size: 4

# ... other parameters
```

Launch training with `torchrun` using the command below.

```bash
torchrun -–nproc-per-node=4 examples/llm_finetune/finetune.py -c /path/to/yaml
```

## Transformers integration

- Any LLM or VLM supported in Transformers can also be instantiated through NeMo Automodel. See the [full model coverage](https://docs.nvidia.com/nemo/automodel/latest/model-coverage/overview.html).
- Built on top of Hugging Face models with [`AutoModel.from_pretrained`], with dynamic high-performance layer swaps and support for more refined parallelisms like Expert Parallelism (EP).
- Detects the architecture field in [`AutoConfig.from_pretrained`] to automatically load custom implementations like Nemotron Nano V3.
- Follows the Transformers API closely for drop-in compatibility.

## Resources

- [NeMo Automodel](https://github.com/NVIDIA-NeMo/Automodel)
- [NeMo Transformers API](https://docs.nvidia.com/nemo/automodel/latest/guides/huggingface-api-compatibility.html)
- NeMo Automodel dense models and Mixture-of-Expert (MoE) [benchmarks](https://docs.nvidia.com/nemo/automodel/latest/performance-summary.html)
- See the NeMo [pretraining](./nemo_automodel_pretraining) guide to learn how to use NeMo for pretraining
