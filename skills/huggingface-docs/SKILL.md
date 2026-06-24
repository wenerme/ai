---
name: huggingface-docs
description: "Use when working with Hugging Face Hub: model/dataset/Space repositories, Hub APIs, tokens, gated models/datasets, organizations, collections, cards, inference providers, jobs, storage/Xet, enterprise features, billing, webhooks, or Hub repository troubleshooting."
---

# Hugging Face Hub Docs

Official Hugging Face Hub docs synced from [`huggingface/hub-docs/docs`](https://github.com/huggingface/hub-docs/tree/main/docs).

Use this skill for Hugging Face Hub platform, repository, dataset, Space, inference provider, Jobs, Xet storage, organization, auth, and enterprise questions. For model loading/fine-tuning library APIs, prefer `transformers-docs`.

## Hard Rules

- MUST search `references/` before giving Hub API, token, repository, gated access, billing, Jobs, or inference provider details.
- MUST distinguish Hugging Face Hub platform docs from Transformers library docs.
- MUST call out when guidance depends on repository type: model, dataset, Space, collection, organization, or enterprise.
- NEVER invent endpoint names, token scopes, gating behavior, repository file conventions, or inference provider parameters without checking references.

## Fast Lookup

```bash
rg -n "token|auth|OAuth|gated|organization|enterprise" skills/huggingface-docs/references
rg -n "model card|dataset card|Space|repository|webhook|collection" skills/huggingface-docs/references
rg -n "Inference Provider|inference endpoint|Jobs|Xet|storage|SageMaker" skills/huggingface-docs/references
```

## Reference Map

- `references/hub/` — Hugging Face Hub platform docs: repositories, models, datasets, Spaces, cards, tokens, orgs, enterprise, Jobs, billing, webhooks.
- `references/inference-providers/` — Inference Providers docs and provider-specific configuration.
- `references/xet/` — Xet-backed storage and large-file workflows.
- `references/sagemaker/` — SageMaker integration docs.

## Workflow

1. Identify whether the question is Hub platform, inference provider, Xet/storage, SageMaker, or library-specific.
2. Search the matching reference subtree.
3. Prefer exact documented terms for repository type, endpoint, token permission, or provider parameter.
4. Route Transformers/Diffusers/PyTorch usage questions to the relevant library-specific skill when the Hub docs are not the source of truth.
