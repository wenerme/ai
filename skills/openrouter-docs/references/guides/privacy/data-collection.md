> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Data Collection

When using AI through OpenRouter, whether via the chat interface or the API, your prompts and responses go through multiple touchpoints. You control how your data is handled at each step.

This page gives an overview of how your data is stored and used by OpenRouter. More information is available in the [privacy policy](/privacy) and [terms of service](/terms).

## Within OpenRouter

OpenRouter does not store your prompts or responses, *unless* you opt in to one or both of the following:

* **Private Input & Output Logging:** Make your prompts and completions visible in your logs for debugging, comparing model responses, and optimizing prompts. OpenRouter does not access or use this data. For organizations, only admins can view logged data. Off by default. Enable it in your [Observability settings](https://openrouter.ai/workspaces/default/observability).
* **OpenRouter Use of Inputs/Outputs:** Allow OpenRouter to use your prompt and completion data to improve the product. In exchange, you receive a 1% discount on all model usage. Off by default. Enable it in your [Privacy settings](https://openrouter.ai/workspaces/default/settings).

*Anonymous Input Categorization: OpenRouter samples a small number of prompts for categorization to power our reporting and model ranking. If you are not opted in to OpenRouter use of inputs/outputs, any categorization of your prompts is stored completely anonymously and never associated with your account or user ID. The categorization is done by model with a zero-data-retention policy.*

## Metadata Collection

OpenRouter does store metadata (e.g. number of prompt and completion tokens, latency, etc) for each request. This is used to power our reporting and model ranking, and your [logs metadata](https://openrouter.ai/logs).

This metadata does not include the content of your prompts or responses, only information about the request itself.