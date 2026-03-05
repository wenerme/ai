---
name: openai-api
description: "Use when working with the OpenAI REST API: Responses API, Chat Completions, audio transcription/speech, embeddings, images, files, fine-tuning, batches, models, moderations, vector stores, assistants, or any OpenAI API endpoint parameters and response shapes."
---

# OpenAI REST API Reference

Language-agnostic REST API reference (sourced from [developers.openai.com](https://developers.openai.com/api/reference/resources/)).

CRITICAL: grep `references/` for the specific endpoint/type. Do NOT guess field names.

## Path Convention

Paths map from OpenAI's verbose URL structure:
- `audio/speech/create.md` — POST /audio/speech
- `responses/create.md` — POST /responses
- `chat/completions/create.md` — POST /chat/completions
- `embeddings/create.md` — POST /embeddings
- `files/create.md` — POST /files
- `models/list.md` — GET /models
