---
name: swift-ms-docs
description: "USE THIS SKILL WHEN working with ms-swift (ModelScope Swift): fine-tuning LLMs/VLMs, LoRA/QLoRA/DoRA training, GRPO reinforcement learning, RLHF (DPO/KTO/SimPO), pre-training, Megatron distributed training, inference/deployment with vLLM/SGLang/LmDeploy, quantization (AWQ/GPTQ/BNB/FP8), evaluation, custom datasets/models, or Web-UI. Triggers on: ms-swift, swift train, swift infer, swift deploy, swift export, LoRA fine-tuning ModelScope, GRPO training."
---

# ms-swift Documentation

[ms-swift](https://github.com/modelscope/swift) is ModelScope's large model fine-tuning and deployment framework supporting 600+ LLMs and 400+ VLMs across the full training-to-deployment pipeline.

- [GitHub](https://github.com/modelscope/swift) | [Docs](https://swift.readthedocs.io)

CRITICAL: grep `references/` for detailed docs before answering.

## Quick Start

```bash
pip install ms-swift

# Fine-tune with LoRA
swift sft \
  --model Qwen/Qwen2.5-7B-Instruct \
  --train_type lora \
  --dataset alpaca-zh#5000 \
  --num_train_epochs 1

# Inference
swift infer --model Qwen/Qwen2.5-7B-Instruct --stream true

# Deploy OpenAI-compatible API
swift deploy --model Qwen/Qwen2.5-7B-Instruct

# GRPO reinforcement learning
swift rlhf --rlhf_type grpo --model Qwen/Qwen2.5-7B-Instruct --dataset math-shepherd-mix
```

## Key Capabilities

| Feature | Description |
|---------|-------------|
| **LoRA/QLoRA/DoRA** | Lightweight fine-tuning (9GB for 7B model) |
| **GRPO family** | GRPO, DAPO, GSPO, SAPO, CISPO, RLOO, Reinforce++ |
| **RLHF** | DPO, KTO, RM, CPO, SimPO, ORPO |
| **Megatron** | TP/PP/CP/EP parallelism for MoE models |
| **Inference** | vLLM, SGLang, LmDeploy acceleration |
| **Quantization** | AWQ, GPTQ, FP8, BNB export |
| **Evaluation** | EvalScope backend, 100+ datasets |
| **Multimodal** | VLM training with image/video/audio |

## Key Topics

### Getting Started
- `references/GetStarted/Quick-start.md` — Quick start
- `references/GetStarted/SWIFT-installation.md` — Installation
- `references/GetStarted/Web-UI.md` — Web UI guide

### Training
- `references/Instruction/Pre-training-and-Fine-tuning.md` — SFT/CPT guide
- `references/Instruction/Use-tuners.md` — LoRA, QLoRA, DoRA, Adapter, etc.
- `references/Instruction/RLHF.md` — DPO, KTO, SimPO, ORPO
- `references/Instruction/Reinforced-Fine-tuning.md` — GRPO overview
- `references/Instruction/GRPO/GetStarted/GRPO.md` — GRPO quick start
- `references/Instruction/GRPO/DeveloperGuide/` — Reward functions, multi-turn, gym env
- `references/Instruction/GRPO/AdvancedResearch/` — DAPO, GSPO, SAPO, CISPO, RLOO

### Inference & Deployment
- `references/Instruction/Inference-and-deployment.md` — Inference + deploy
- `references/Instruction/Export-and-push.md` — Quantization export, model push

### Megatron Distributed
- `references/Megatron-SWIFT/Quick-start.md` — Megatron quick start
- `references/Megatron-SWIFT/Command-line-parameters.md` — All parameters
- `references/Megatron-SWIFT/GRPO.md` — Megatron GRPO
- `references/Megatron-SWIFT/LoRA-Training.md` — Megatron LoRA

### Customization
- `references/Customization/Custom-dataset.md` — Custom datasets
- `references/Customization/Custom-model.md` — Custom models
- `references/Customization/Architecture.md` — Architecture overview

### Best Practices
- `references/BestPractices/` — Qwen3, GRPO, Embedding, Reranker, NPU, VLM
- `references/Instruction/Supported-models-and-datasets.md` — 600+ models list
- `references/Instruction/Command-line-parameters.md` — All CLI parameters
- `references/Instruction/Frequently-asked-questions.md` — FAQ

## References

- `references/` — 59 English doc files covering full training-to-deployment pipeline
- `references/GetStarted/` — Installation and quick start
- `references/Instruction/` — Training, inference, GRPO, RLHF
- `references/Megatron-SWIFT/` — Megatron distributed training
- `references/BestPractices/` — Model-specific best practices
- `references/Customization/` — Custom models and datasets
