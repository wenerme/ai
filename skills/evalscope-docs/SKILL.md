---
name: evalscope-docs
description: "USE THIS SKILL WHEN working with EvalScope (ModelScope LLM evaluation framework): running evaluations, TaskConfig, supported datasets/benchmarks, evaluation backends (Native/OpenCompass/VLMEvalKit/RAGEval), performance stress testing (perf), custom datasets, multi-modal eval, arena mode, visualization, or integrating with vLLM/Swift/SGLang. Triggers on: evalscope, EvalScope, run_task, TaskConfig, evalscope eval, evalscope perf, ModelScope eval."
---

# EvalScope Documentation

[EvalScope](https://github.com/modelscope/evalscope) is ModelScope's LLM/VLM evaluation framework providing benchmarking, performance testing, arena mode, and visualization.

- [GitHub](https://github.com/modelscope/evalscope) | [Docs](https://evalscope.readthedocs.io)

CRITICAL: grep `references/` for detailed docs. `references/benchmarks/` has 153 individual benchmark files with full details, metrics, and usage examples. `references/local/` has deep-dive architecture docs.

## Quick Start

```bash
pip install evalscope

# Evaluate a model on datasets (CLI)
evalscope eval --model Qwen/Qwen2.5-0.5B-Instruct --datasets gsm8k arc --limit 5

# Evaluate OpenAI-compatible API
evalscope eval \
  --model qwen2.5 \
  --eval-type openai_api \
  --api-url http://127.0.0.1:8801/v1 \
  --datasets gsm8k mmlu

# Performance stress test
evalscope perf --model Qwen/Qwen2.5-0.5B-Instruct --url http://127.0.0.1:8801/v1
```

```python
from evalscope import run_task, TaskConfig

task_cfg = TaskConfig(
    model='Qwen/Qwen2.5-0.5B-Instruct',
    datasets=['gsm8k', 'arc'],
    limit=5,
    generation_config={'max_tokens': 1024, 'temperature': 0.0}
)
run_task(task_cfg)
```

## Key Topics

### Get Started
- `references/get_started/installation.md` — Installation
- `references/get_started/basic_usage.md` — Quick start guide
- `references/get_started/parameters.md` — All CLI/TaskConfig parameters
- `references/get_started/faq.md` — FAQ

### Supported Datasets
- `references/get_started/supported_dataset/index.md` — Dataset overview
- `references/get_started/supported_dataset/llm.md` — LLM benchmarks (MMLU, GSM8K, HumanEval, etc.)
- `references/get_started/supported_dataset/vlm.md` — VLM benchmarks
- `references/get_started/supported_dataset/agent.md` — Agent benchmarks
- `references/get_started/supported_dataset/aigc.md` — AIGC (T2I) benchmarks
- `references/benchmarks/` — **153 individual benchmark docs** with metrics, examples, prompt templates

### Backends
- `references/user_guides/backend/index.md` — Backend selection guide
- `references/user_guides/backend/opencompass_backend.md` — OpenCompass backend
- `references/user_guides/backend/vlmevalkit_backend.md` — VLMEvalKit backend
- `references/user_guides/backend/rageval_backend/` — RAGEval (RAGAS, MTEB, CLIP)
- `references/local/backend.md` — Backend architecture deep-dive

### Performance Testing
- `references/user_guides/stress_test/index.md` — Stress test overview
- `references/user_guides/stress_test/quick_start.md` — Quick start
- `references/user_guides/stress_test/parameters.md` — All perf parameters
- `references/user_guides/stress_test/examples.md` — Examples

### Advanced
- `references/advanced_guides/custom_dataset/` — Custom datasets (LLM, VLM, CLIP, Embedding)
- `references/advanced_guides/collection/` — Dataset collection management
- `references/advanced_guides/add_benchmark.md` — Add custom benchmark
- `references/advanced_guides/custom_model.md` — Custom model integration
- `references/user_guides/arena.md` — Arena (model comparison) mode
- `references/user_guides/sandbox.md` — Sandbox evaluation
- `references/user_guides/service.md` — Service mode (online API eval)
- `references/get_started/visualization.md` — WebUI visualization

### Best Practices
- `references/best_practice/` — Qwen3, DeepSeek-R1, QwQ, GPT, VLM, T2I evaluation guides
- `references/third_party/` — SWE-Bench, BFCL, ToolBench, LongWriter, NeedleHaystack
- `references/local/overview.md` — Architecture overview (zh)
- `references/local/api.md` — TaskConfig & API reference (zh)
- `references/local/dataset.md` — Dataset loading & caching (zh)

## References

- `references/` — 228 doc files from docs/en/
- `references/benchmarks/` — 153 benchmark docs (name, dataset_id, metrics, examples, usage)
- `references/local/` — 6 hand-curated deep-dive docs (overview, api, dataset, registry, backend, app)
- `references/datasets.json` — Full dataset registry (4400+ lines, all supported datasets)
