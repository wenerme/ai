---
name: vllm-docs
description: "Use when working with vLLM inference engine: OpenAI-compatible serving, model deployment, quantization (AWQ, GPTQ, FP8, GGUF, INT4/INT8), speculative decoding, LoRA adapters, structured outputs, tool calling, multimodal inputs, distributed serving (tensor/pipeline/expert/context parallel), Docker/Kubernetes deployment, engine configuration, memory optimization, PagedAttention, offline inference, CLI usage, or troubleshooting vLLM issues."
---

# vLLM Documentation

Official vLLM docs (sourced from [github.com/vllm-project/vllm/docs](https://github.com/vllm-project/vllm/tree/main/docs)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Getting Started
- `getting_started/quickstart.md` — Quick start guide

### Serving & API
- `serving/openai_compatible_server.md` — OpenAI-compatible API server
- `serving/offline_inference.md` — Offline batch inference
- `serving/distributed_troubleshooting.md` — Distributed serving troubleshooting
- `serving/integrations/` — Claude Code, LangChain, LlamaIndex integrations

### Distributed & Parallel
- `serving/data_parallel_deployment.md` — Data parallelism
- `serving/expert_parallel_deployment.md` — Expert parallelism (MoE)
- `serving/context_parallel_deployment.md` — Context parallelism
- `serving/parallelism_scaling.md` — Parallelism scaling guide

### Features
- `features/quantization/` — Quantization methods (AWQ, GPTQ, FP8, GGUF, INT4/8, etc.)
- `features/speculative_decoding/` — Speculative decoding (draft model, EAGLE, MTP, n-gram)
- `features/tool_calling.md` — Tool / function calling
- `features/structured_outputs.md` — Structured JSON outputs
- `features/multimodal_inputs.md` — Multimodal model inputs
- `features/lora.md` — LoRA multi-adapter serving
- `features/reasoning_outputs.md` — Reasoning / thinking outputs
- `features/automatic_prefix_caching.md` — Automatic prefix caching (APC)
- `features/disagg_prefill.md` — Disaggregated prefill
- `features/sleep_mode.md` — Sleep mode for memory saving

### Models
- `models/supported_models.md` — Full supported model list
- `models/generative_models.md` — Generative model guide
- `models/pooling_models.md` — Embedding / pooling models

### Configuration
- `configuration/engine_args.md` — Engine arguments reference
- `configuration/serve_args.md` — Serve command arguments
- `configuration/env_vars.md` — Environment variables
- `configuration/optimization.md` — Optimization techniques
- `configuration/conserving_memory.md` — Memory conservation
- `configuration/model_resolution.md` — Model resolution config

### CLI
- `cli/serve.md` — `vllm serve` command
- `cli/chat.md` — `vllm chat` command
- `cli/complete.md` — `vllm complete` command
- `cli/run-batch.md` — `vllm run-batch` command

### Deployment
- `deployment/docker.md` — Docker deployment
- `deployment/k8s.md` — Kubernetes deployment
- `deployment/nginx.md` — Nginx reverse proxy

### Design & Architecture
- `design/arch_overview.md` — Architecture overview
- `design/paged_attention.md` — PagedAttention design
- `design/prefix_caching.md` — Prefix caching internals
- `design/cuda_graphs.md` — CUDA graph optimization
- `design/fused_moe_modular_kernel.md` — Fused MoE kernel design
- `design/plugin_system.md` — Plugin system

### Usage & Troubleshooting
- `usage/troubleshooting.md` — Troubleshooting guide
- `usage/faq.md` — Frequently asked questions
- `usage/v1_guide.md` — v1 migration guide
