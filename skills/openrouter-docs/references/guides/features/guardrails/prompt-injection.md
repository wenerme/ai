> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Prompt Injection Detection

OpenRouter's regex-based prompt injection detection scans incoming requests for common injection techniques using pattern matching. This feature is **free** and adds **minimal latency** to requests since the patterns are evaluated locally before the request is forwarded to the model provider.

To enable prompt injection detection, navigate to your [workspace guardrails](https://openrouter.ai/workspaces), open or create a guardrail, and configure the **Security** section.

## How It Works

When regex-based detection is enabled on a guardrail, every incoming message is scanned against a set of patterns derived from the [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html), among other resources. If a match is found, the configured action is taken:

* **Flag** — The request passes through unmodified; the detection is recorded for observability (metrics + analytics events) but no enforcement is applied. Useful for measuring true-positive rates on your own traffic before switching to `redact` or `blocked`.
* **Redact** — Matched spans are replaced with `[PROMPT_INJECTION]` and the sanitized request is forwarded to the model.
* **Block** — The entire request is rejected with a `403` before it reaches the model.

When multiple guardrails apply to the same request (for example, a workspace default plus an API key–scoped guardrail), the most restrictive action wins. Priority is `block` > `redact` > `flag`.

## Detection Patterns

The following regex patterns are checked against all user-supplied message content. Patterns are case-insensitive unless noted otherwise.

## Evasion Detection

In addition to the regex patterns above, the detection system includes techniques to catch common evasion strategies.

### Typoglycemia Detection

Attackers may scramble the middle letters of keywords while keeping the first and last letters intact (e.g., "ignroe" instead of "ignore"). The system checks for typoglycemia variants of these target words:

### Encoding-Based Evasion

The system decodes Base64 and hex-encoded content (including space-separated hex pairs like `69 67 6e 6f 72 65`), then checks the decoded text for injection keywords:

This catches attempts to hide malicious instructions behind encoding layers. Two encoding detectors run: .

### Character-Spaced Evasion

Text with character spacing (e.g., `i g n o r e  p r e v i o u s`) is normalized by collapsing spaces, then re-scanned against all patterns. This prevents simple spacing-based evasion.

## Limitations

* **Regex-based detection is not exhaustive.** Sophisticated or novel injection techniques may not be caught.
* **Flag mode does not enforce.** A flagged request is forwarded to the model exactly as submitted — the detection is recorded for dashboards and analytics only. Use `flag` to measure match rates on real traffic; switch to `redact` or `block` once you're confident the false-positive rate is acceptable.
* **False positives** are possible. Some legitimate prompts may contain phrases that match these patterns (e.g., a prompt about security testing). Test your guardrail configuration with representative traffic — ideally in `flag` mode first — before enforcing broadly.

## Further Reading

* [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
* [Guardrails documentation](/docs/guides/features/guardrails)
* [Guardrails API reference](/docs/api/api-reference/guardrails/list-guardrails)