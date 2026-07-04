---
name: gemini-enterprise-agent-platform-docs
description: "Use when working with Google Cloud Gemini Enterprise Agent Platform: Agent Studio, Agent Runtime, Managed Agents API, ADK deployment, RAG Engine, Vector Search, Skill Registry, Agent Gateway, Memory Bank, Gemini/partner/open models, grounding, tuning, evaluation, governance, IAM, quotas, locations, and agent troubleshooting."
---

# Gemini Enterprise Agent Platform Docs

Official Google Cloud Gemini Enterprise Agent Platform documentation synced from [`docs.cloud.google.com/gemini-enterprise-agent-platform`](https://docs.cloud.google.com/gemini-enterprise-agent-platform).

Use this skill for Google Cloud Gemini Enterprise Agent Platform (GEAP): building, deploying, governing, scaling, and optimizing agents and model workloads on Google Cloud. This is distinct from the consumer/developer Gemini API docs at `ai.google.dev`; use `google-ai-docs` / `google-ai-api` for Gemini API-only behavior.

## Content Scope

This skill syncs product-local `.md.txt` pages discovered under `/gemini-enterprise-agent-platform`, excluding generated REST/RPC API reference, legacy `machine-learning/`, and `notebooks/` subtrees. Current coverage is 426 Markdown pages:

- `references/index.md`, `overview.md`, `build.md`, `scale.md`, `govern.md`, `models.md`, `agent-studio.md`, `agents.md` — product overviews and section entrypoints.
- `references/build/` — Agent Development Kit, Agent Runtime, Managed Agents API, RAG Engine, Vector Search, Skill Registry, custom/ADK/LangChain/LangGraph/LlamaIndex/A2A/AG2 agents.
- `references/scale/` — Agent Runtime deployment, Memory Bank, sessions, sandbox/code execution, monitoring, tracing, private connectivity, access, and scaling.
- `references/govern/` — Agent Gateway, IAM/policies, semantic governance, agent identity, agent registry, content security, security findings, and sharing.
- `references/optimize/` — agent evaluation, simulated evaluation, optimization, observability, traces, topology, and example store.
- `references/models/` — Gemini model usage on GEAP, model versions, Gemini 2.5/3.x, Imagen/Veo/Lyria/open/partner models, grounding, tuning, embeddings, context cache, Live API, Model Garden, provisioned throughput, MaaS, safety, quotas, and OpenAI migration.
- `references/resources/`, `agent-studio/`, `agents/`, `troubleshooting/`, `tutorials/` — locations, quotas, support, quickstarts, Agent Studio, Deep Research, ADK quickstarts, and troubleshooting.

Excluded by design:

- `reference/rest`, `reference/rpc`, and `reference/python` generated API reference pages.
- `machine-learning/` and `notebooks/` legacy or adjacent Vertex AI/Workbench docs.
- HTML pages, static assets, notebook files, images, and non-product links.

## Hard Rules

- MUST search `references/` before answering GEAP-specific questions about Agent Runtime, Managed Agents API, Agent Studio, RAG Engine, Vector Search, Agent Gateway, Memory Bank, model deployment, tuning, grounding, evaluation, governance, quotas, or locations.
- MUST distinguish Google Cloud GEAP from `ai.google.dev` Gemini API. API-key-only Gemini API behavior belongs in `google-ai-docs` / `google-ai-api`; Google Cloud IAM/project/location/Agent Platform behavior belongs here.
- MUST call out launch-stage and data-sensitivity warnings when docs mention Pre-GA, preview, trusted tester, Agentic AI Services terms, or restrictions on confidential/proprietary data.
- MUST distinguish build/control-plane concepts such as Managed Agents API, Agent Runtime, Agent Gateway, RAG Engine, Vector Search, Skill Registry, and Memory Bank; do not conflate them.
- NEVER invent Google Cloud resource names, IAM roles, REST fields, model IDs, regions, quota limits, pricing, or API behavior without checking references or the dedicated generated API reference.
- NEVER use this skill as the source of truth for generated REST/RPC reference details, Vertex AI Workbench notebooks, or legacy `machine-learning/` docs; fetch/use those dedicated docs when needed.

## Fast Lookup

```bash
rg -n "Managed Agents|Agents API|Interactions API|sandbox|Antigravity|agent skills" skills/gemini-enterprise-agent-platform-docs/references/build
rg -n "Agent Runtime|deploy|ReasoningEngine|ADK|LangChain|LangGraph|LlamaIndex|A2A|AG2" skills/gemini-enterprise-agent-platform-docs/references/build skills/gemini-enterprise-agent-platform-docs/references/scale
rg -n "RAG Engine|Vector Search|corpus|retrieval|ranking|hybrid search|index" skills/gemini-enterprise-agent-platform-docs/references/build
rg -n "Agent Gateway|IAM|policy|semantic governance|agent identity|agent registry|security findings" skills/gemini-enterprise-agent-platform-docs/references/govern
rg -n "Memory Bank|session|sandbox|code execution|tracing|monitoring|private service connect" skills/gemini-enterprise-agent-platform-docs/references/scale
rg -n "Gemini|Claude|Grok|Llama|Veo|Imagen|Lyria|MaaS|Model Garden|provisioned throughput|tuning|grounding|embeddings" skills/gemini-enterprise-agent-platform-docs/references/models
rg -n "quota|location|region|data residency|support|pricing|Pre-GA|confidential" skills/gemini-enterprise-agent-platform-docs/references
```

## Reference Map

- Start here: `references/index.md`, `overview.md`, `build.md`, `scale.md`, `govern.md`, `models.md`.
- Agent build paths: `references/build/adk.md`, `build/runtime/quickstart.md`, `build/managed-agents.md`, `build/rag-engine/rag-overview.md`, `build/vector-search/overview.md`, `build/skill-registry.md`.
- Runtime and scaling: `references/scale/runtime/deploy-an-agent.md`, `scale/runtime/use-an-adk-agent.md`, `scale/memory-bank.md`, `scale/sessions.md`, `scale/sandbox/code-execution-overview.md`.
- Governance: `references/govern/gateways/agent-gateway-overview.md`, `govern/policies/overview.md`, `govern/agent-identity-overview.md`, `govern/agent-registry.md`.
- Models: `references/models/start.md`, `models/gemini/`, `models/partner-models/`, `models/open-models/`, `models/grounding/`, `models/tuning/`, `models/embeddings/`, `models/context-cache/`.
- Optimization and operations: `references/optimize/evaluation/`, `optimize/observability/`, `resources/locations.md`, `resources/agent-quotas.md`, `troubleshooting/`.

## Workflow

1. Identify whether the question is about build, scale, govern, optimize, models, resources/quotas/locations, or troubleshooting.
2. Search the relevant subtree first, then broader `references/` for cross-cutting warnings or prerequisites.
3. State Google Cloud prerequisites explicitly: project, region/location, IAM, APIs, service accounts, billing/quotas, and launch stage where relevant.
4. If the answer depends on generated REST/RPC schema or a `machine-learning/`/notebooks page excluded from this skill, say so and consult the dedicated Google Cloud reference page.
