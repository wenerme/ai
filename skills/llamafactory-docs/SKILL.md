---
name: llamafactory-docs
description: "USE THIS SKILL WHEN working with LLaMA Factory: fine-tuning LLMs (SFT/DPO/PPO/KTO/ORPO), LoRA/QLoRA training, dataset preparation (alpaca/sharegpt format), DeepSpeed/FSDP distributed training, LLaMA Board Web UI, model deployment (vLLM/SGLang), GRPO reinforcement learning, multimodal training, or using llamafactory-cli. Triggers on: LlamaFactory, llamafactory-cli, LLaMA Factory, llama-factory, LLaMA Board."
---

# LLaMA Factory Documentation

[LLaMA Factory](https://github.com/hiyouga/LlamaFactory) is an efficient fine-tuning framework for 100+ LLMs supporting the full training-to-deployment pipeline.

- [GitHub](https://github.com/hiyouga/LlamaFactory) | [Docs](https://llamafactory.readthedocs.io)

CRITICAL: grep `references/` for detailed docs before answering. Most docs are in Chinese.

## Quick Start

```bash
pip install llamafactory

# LoRA SFT via CLI
llamafactory-cli train examples/train_lora/llama3_lora_sft.yaml

# Web UI
llamafactory-cli webui

# Chat
llamafactory-cli chat --model_name_or_path Qwen/Qwen2.5-7B-Instruct

# Deploy OpenAI API
llamafactory-cli api --model_name_or_path Qwen/Qwen2.5-7B-Instruct
```

## Supported Training Methods

| Method | Full | Freeze | LoRA | QLoRA |
|--------|------|--------|------|-------|
| Pre-training | Yes | Yes | Yes | Yes |
| SFT | Yes | Yes | Yes | Yes |
| Reward Modeling | Yes | Yes | Yes | Yes |
| PPO/DPO/KTO/ORPO | Yes | Yes | Yes | Yes |
| GRPO | Yes | Yes | Yes | Yes |

## Key Capabilities

| Feature | Description |
|---------|-------------|
| **600+ LLMs** | Qwen3, Llama4, DeepSeek-R1, InternLM3, Mistral, etc. |
| **400+ VLMs** | Qwen3-VL, InternVL3.5, MiniCPM-V, GLM4.5-V, etc. |
| **LoRA variants** | LoRA, QLoRA, DoRA, LoRA+, LLaMAPro, LISA, RS-LoRA |
| **RLHF** | DPO, KTO, SimPO, ORPO, CPO, PPO |
| **GRPO family** | GRPO, DAPO, GSPO, SAPO, CISPO, RLOO, Reinforce++ |
| **Distributed** | DDP, DeepSpeed ZeRO2/3, FSDP/FSDP2, Megatron |
| **Quantization** | AWQ, GPTQ, BNB, FP8, AQLM, HQQ, EETQ |
| **Inference** | vLLM, SGLang, LmDeploy acceleration |
| **Web UI** | LLaMA Board for training, inference, eval |

## Key Topics

### Getting Started
- `references/overview.md` — Full feature overview (README)
- `references/getting-started.md` — Quick start (zh)
- `references/installation.md` — Installation (zh)
- `references/architecture.md` — Project structure, v0/v1 architecture, dev practices
- `references/llamaboard-web-ui.md` — Web UI guide (zh)

### Data
- `references/dataset-format.md` — Dataset format spec (alpaca/sharegpt), dataset_info.json
- `references/data-preparation/data-processing.md` — Data processing pipeline (zh)
- `references/examples.md` — Training config examples

### Training
- `references/advanced/lora-and-quantization/lora.md` — LoRA training (zh)
- `references/advanced/lora-and-quantization/quantization.md` — Quantization (zh)
- `references/advanced/distributed/deepspeed.md` — DeepSpeed (zh)
- `references/advanced/distributed/parallel-dp-tp-ep-sp-cp.md` — Parallelism strategies (zh)
- `references/hyperparameters/data-argument.md` — Data hyperparameters (zh)

### Advanced
- `references/advanced/custom-kernels/` — Custom kernels, fused operators
- `references/dev-guide/core/` — Data engine, model engine internals
- `references/dev-guide/plugins/` — Data plugins, model plugins

## References

- `references/` — 19 doc files (15 Chinese docs + 4 English extras)
- `references/dataset-format.md` — Comprehensive dataset format specification
- `references/architecture.md` — v0/v1 architecture, code structure, dev guide
- `references/examples.md` — Training configuration examples
