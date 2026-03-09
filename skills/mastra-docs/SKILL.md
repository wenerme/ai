---
name: mastra-docs
description: "USE THIS SKILL WHEN working with Mastra (TypeScript AI agent framework): building agents, workflows, RAG pipelines, memory, voice, evals, MCP tools, observability/tracing, deploying to Mastra Cloud/Cloudflare/Vercel, or using Mastra client SDK. Triggers on: mastra, Mastra agent, Mastra workflow, createAgent, createWorkflow, mastra.run, MastraClient, @mastra/core."
---

# Mastra Documentation

[Mastra](https://mastra.ai) is a TypeScript AI framework for building agents, workflows, and RAG pipelines with batteries-included integrations.

- [GitHub](https://github.com/mastra-ai/mastra) | [Docs](https://mastra.ai/docs)

CRITICAL: grep `references/` for detailed docs before answering.

## Quick Start

```bash
npx create-mastra@latest
# or
npm install @mastra/core
```

```typescript
import { Mastra, createAgent } from "@mastra/core";
import { openai } from "@ai-sdk/openai";

const agent = createAgent({
  name: "my-agent",
  instructions: "You are a helpful assistant.",
  model: openai("gpt-4o"),
});

const mastra = new Mastra({ agents: { myAgent: agent } });
const response = await mastra.getAgent("myAgent").generate("Hello!");
```

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Agents** | LLM-powered agents with tools, memory, voice |
| **Workflows** | Durable step-based execution with branching |
| **RAG** | Vector search, chunking, embedding pipelines |
| **Memory** | Thread-based conversation history + semantic recall |
| **Evals** | LLM-as-judge evaluation framework |
| **MCP** | Model Context Protocol tool server integration |
| **Observability** | OpenTelemetry tracing, logging |
| **Voice** | Speech-to-text and text-to-speech |

## Key Topics

### Docs (Guides)
- `references/docs/getting-started/` — Installation, first agent, first workflow
- `references/docs/agents/` — Agent creation, tools, memory, voice
- `references/docs/workflows/` — Workflow steps, branching, suspension
- `references/docs/memory/` — Thread memory, semantic recall, storage
- `references/docs/rag/` — Chunking, embedding, vector search
- `references/docs/evals/` — Evaluation metrics, custom evals
- `references/docs/mcp/` — MCP server integration
- `references/docs/observability/` — Tracing, logging, datasets
- `references/docs/deployment/` — Deployment options
- `references/docs/mastra-cloud/` — Mastra Cloud
- `references/docs/server/` — Server setup, auth

### API Reference
- `references/reference/agents/` — Agent API
- `references/reference/workflows/` — Workflow API
- `references/reference/memory/` — Memory API
- `references/reference/rag/` — RAG (chunking, embedding, vector)
- `references/reference/evals/` — Eval metrics
- `references/reference/tools/` — Tool definitions
- `references/reference/voice/` — Voice API
- `references/reference/core/` — Core Mastra class
- `references/reference/client-js/` — Client SDK
- `references/reference/storage/` — Storage backends
- `references/reference/vectors/` — Vector store integrations
- `references/reference/processors/` — Document processors

### Models & Providers
- `references/models/` — Supported models index
- `references/models/providers/` — 94 provider integrations

### Guides
- `references/guides/guide/` — End-to-end tutorials
- `references/guides/getting-started/` — Getting started guides
- `references/guides/deployment/` — Cloudflare, Vercel, etc.
- `references/guides/migrations/upgrade-to-v1/` — v1 migration

## References

- `references/` — 561 MDX files covering full API and guides
- `references/docs/` — Concept guides and tutorials
- `references/reference/` — API reference (agents, workflows, memory, RAG, evals, voice, MCP)
- `references/models/providers/` — 94 model provider integrations
- `references/guides/` — End-to-end tutorials and deployment guides
