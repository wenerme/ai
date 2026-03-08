---
name: transformers-docs
description: "USE THIS SKILL WHEN working with HuggingFace Transformers: loading/fine-tuning pretrained models, Pipeline API, text generation, tokenizers, chat templates, quantization (GPTQ/AWQ/bitsandbytes/GGUF), distributed training (FSDP/DeepSpeed), inference optimization, Trainer API, or vLLM/SGLang integration. Triggers on: transformers, AutoModel, AutoTokenizer, from_pretrained, pipeline(), generate(), Trainer, BitsAndBytesConfig, chat_template."
---

# HuggingFace Transformers Documentation

Reference for the [Transformers](https://huggingface.co/docs/transformers) library — the model-definition framework for state-of-the-art ML models across text, vision, audio, video, and multimodal tasks.

- [GitHub](https://github.com/huggingface/transformers) | [Docs](https://huggingface.co/docs/transformers) | [Hub](https://huggingface.co/models?library=transformers)
- 1M+ model checkpoints on HuggingFace Hub

CRITICAL: grep `references/` for detailed docs before answering. Individual model API docs (443 models) are NOT included — refer users to the [model doc index](https://huggingface.co/docs/transformers/model_doc) for specific model APIs.

## Quick Start

```python
from transformers import pipeline

# Inference with Pipeline
pipe = pipeline("text-generation", model="meta-llama/Llama-3-8B-Instruct")
result = pipe("Hello, how are you?", max_new_tokens=100)

# Load model + tokenizer directly
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B-Instruct", device_map="auto")

# Fine-tuning with Trainer
from transformers import TrainingArguments, Trainer
args = TrainingArguments(output_dir="./output", num_train_epochs=3, per_device_train_batch_size=8)
trainer = Trainer(model=model, args=args, train_dataset=dataset)
trainer.train()
```

## Core Concepts

| Concept | Description |
|---------|-------------|
| **Pipeline** | High-level inference API for 30+ tasks |
| **Auto Classes** | `AutoModel`, `AutoTokenizer`, `AutoConfig` — auto-detect model type |
| **from_pretrained** | Load any model/tokenizer from Hub or local path |
| **Trainer** | Training loop with mixed precision, distributed, callbacks |
| **generate()** | Text generation with multiple decoding strategies |
| **Chat Templates** | Jinja2 templates for chat model formatting |
| **Quantization** | GPTQ, AWQ, bitsandbytes, GGUF, torchao, and more |

## Key Topics

### Inference
- `references/llm_tutorial.md` — Text generation with LLMs
- `references/pipeline_tutorial.md` — Pipeline API tutorial
- `references/generation_strategies.md` — Decoding methods (greedy, beam, sampling)
- `references/chat_templating.md` — Chat templates
- `references/conversations.md` — Chat/tool use patterns

### Optimization
- `references/attention_interface.md` — Attention backends (FlashAttention, SDPA)
- `references/llm_tutorial_optimization.md` — Getting the most out of LLMs
- `references/continuous_batching.md` — Continuous batching
- `references/kv_cache.md` — KV cache strategies
- `references/torchcompile.md` — torch.compile integration

### Training
- `references/trainer.md` — Trainer overview
- `references/training.md` — Fine-tuning guide
- `references/deepspeed.md` — DeepSpeed integration
- `references/fsdp.md` — FSDP distributed training
- `references/accelerate.md` — Accelerate integration

### Quantization
- `references/quantization/overview.md` — Quantization overview
- `references/quantization/bitsandbytes.md` — bitsandbytes (4/8-bit)
- `references/quantization/gptq.md` — GPTQ
- `references/quantization/awq.md` — AWQ
- `references/quantization/gguf.md` — GGUF format

### Models & Preprocessors
- `references/custom_models.md` — Customizing models
- `references/fast_tokenizers.md` — Tokenizer overview
- `references/image_processors.md` — Image processors
- `references/how_to_hack_models.md` — Monkey patching models

### Serving & Ecosystem
- `references/serve-cli/` — Serve CLI
- `references/community_integrations/vllm.md` — vLLM integration
- `references/community_integrations/sglang.md` — SGLang integration
- `references/community_integrations/llama_cpp.md` — llama.cpp integration

## References

- `references/` — 146 doc files covering guides, API classes, quantization, serving, and ecosystem integrations
- `references/main_classes/` — Core API (Trainer, Pipeline, Configuration, Tokenizer, etc.)
- `references/quantization/` — 27 quantization method docs
- `references/community_integrations/` — Ecosystem (vLLM, SGLang, TRL, Axolotl, etc.)
