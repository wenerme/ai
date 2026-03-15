---
name: litellm-docs
description: "LiteLLM documentation — unified Python SDK and proxy server for 100+ LLM providers (OpenAI, Anthropic, Google, Azure, AWS Bedrock, Vertex AI, Cohere, Mistral, Ollama, vLLM, etc). Covers completion, embedding, image generation, audio, reranking, fine-tuning API; LiteLLM Proxy server (load balancing, rate limiting, virtual keys, spend tracking, SSO, RBAC, guardrails); caching (Redis, S3, in-memory); observability (Langfuse, Datadog, Prometheus, OpenTelemetry); secret managers (AWS, Azure, GCP, HashiCorp Vault); and provider-specific configuration. USE THIS SKILL WHEN the user asks about LiteLLM proxy setup, multi-provider LLM routing, model fallbacks, spend tracking, or calling any LLM API through LiteLLM."
version: 0.1.0
---

# LiteLLM Documentation

Official docs for [LiteLLM](https://github.com/BerriAI/litellm) — call 100+ LLM APIs using the OpenAI format (Python SDK + Proxy Server).

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (664 docs)

### Providers (170 docs)
- `references/providers/` — Provider-specific guides for OpenAI, Anthropic, Azure, AWS Bedrock, Google Vertex AI, Gemini, Cohere, Mistral, Groq, Together AI, Fireworks, Deepseek, Ollama, vLLM, Hugging Face, Replicate, Perplexity, Cerebras, Sambanova, xAI, and 80+ more

### Proxy Server (168 docs)
- `references/proxy/` — LiteLLM Proxy (OpenAI-compatible gateway)
  - Config, deployment (Docker, Kubernetes, Helm)
  - Virtual keys, spend tracking, budgets, rate limiting
  - Load balancing, fallbacks, routing, model groups
  - SSO/RBAC, audit logs, guardrails, content moderation
  - UI dashboard, team management, tag-based routing

### Completion & API (30 docs)
- `references/completion/` — Chat completion, streaming, function calling, tool use, vision, JSON mode, prompt caching, batch API, token usage

### Tutorials (57 docs)
- `references/tutorials/` — Step-by-step guides for common tasks

### Observability (43 docs)
- `references/observability/` — Langfuse, Datadog, Prometheus, OpenTelemetry, Lunary, Helicone, Traceloop, custom callbacks

### Pass-through APIs (15 docs)
- `references/pass_through/` — Direct provider API pass-through (Anthropic, Vertex, Bedrock, Cohere, etc.)

### Search & Reranking (13 docs)
- `references/search/` — Web search, reranking providers

### Caching (3 docs)
- `references/caching/` — Redis, S3, in-memory caching strategies

### Embedding (3 docs)
- `references/embedding/` — Text embedding providers and configuration

### Secret Managers (9 docs)
- `references/secret_managers/` — AWS Secrets Manager, Azure Key Vault, GCP Secret Manager, HashiCorp Vault

### Extras
- `references/extras/` — Contributing, debugging, LangChain integration
- Root-level docs: `references/index.md`, `references/rules.md`, `references/exception_mapping.md`, `references/budget_manager.md`, etc.
