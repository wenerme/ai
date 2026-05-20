> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Sensitive Info Guardrail

The Sensitive Info Guardrail lets you automatically detect and handle sensitive information — such as email addresses, phone numbers, credit card numbers, and names — before requests reach the model provider. You can choose to **redact** (replace with a placeholder) or **block** (reject the request entirely) when sensitive data is detected.

This feature is part of [Guardrails](/docs/guides/features/guardrails) and can be configured alongside budget limits, model restrictions, and other guardrail settings.

## How It Works

When a Sensitive Info Guardrail is active, every API request is scanned before it is forwarded to the model provider:

1. **Detection** — The request content is checked against your configured patterns and presets.
2. **Action** — If a match is found, the configured action is applied:
   * **Redact**: The matched text is replaced with a labeled placeholder (e.g., `[EMAIL]`, `[PHONE]`, `[REDACTED]`) and the modified request is forwarded to the provider.
   * **Block**: The entire request is rejected with an HTTP `403 Forbidden` error.
3. **Forwarding** — If no sensitive info is detected (or all matches were redacted), the request proceeds to the model provider as normal.

Sensitive info detection runs on the **input** (prompt) side of requests. It scans message content, tool call arguments, and prompt strings. It does not scan model responses.

## Detection Methods

OpenRouter uses two complementary detection methods:

### Regex-Based Detection

Most built-in presets and all custom patterns use regular expression matching. This is fast, deterministic, and adds negligible latency to requests.

Regex-based presets include:

* Email addresses
* Phone numbers
* Social Security numbers (SSNs)
* Credit card numbers
* IP addresses

### NLP-Based Detection

Some types of sensitive information — like person names and physical addresses — cannot be reliably detected with simple patterns. For these, OpenRouter uses NLP-powered entity recognition (via [Presidio](https://microsoft.github.io/presidio/)), which analyzes text contextually.

NLP-based presets include:

* Person names
* Physical addresses / locations

NLP-based detection adds latency to requests proportional to the size of the input text. The "Person Name" and "Address" presets are marked with an **Adds latency** label in the dashboard to indicate this.

## Built-In Presets

The following presets are available out of the box. Each can be individually enabled and configured with either the **Redact** or **Block** action.

| Preset                 | Detection Method | Redaction Label | Example Matches                                          |
| ---------------------- | ---------------- | --------------- | -------------------------------------------------------- |
| Email address          | Regex            | `[EMAIL]`       | `user@example.com`, `name+tag@domain.co`                 |
| Phone number           | Regex            | `[PHONE]`       | `914-309-4996`, `914.309.4996`, `9143094996`             |
| Social Security number | Regex            | `[SSN]`         | `123-45-6789`                                            |
| Credit card number     | Regex            | `[CREDIT_CARD]` | `4265 5256 0839 8752`, `4265-5256-0839-8752`             |
| IP address             | Regex            | `[IP_ADDRESS]`  | `192.168.0.1`, `10.0.0.1`                                |
| Person name            | NLP              | `[PERSON_NAME]` | `John Smith`, `Dr. Sarah Johnson`, `Maria Garcia-Lopez`  |
| Address                | NLP              | `[ADDRESS]`     | `123 Main Street, Springfield`, `London, United Kingdom` |

### NLP Preset Limitations

NLP-based detection is contextual and probabilistic. Keep the following in mind:

**Person Name**:

* May not catch names without surrounding context
* Uncommon or non-Western names may be missed
* Single-word names (e.g., "Cher") are harder to detect

**Address**:

* Partial addresses without city/state may be missed
* Ambiguous location names (e.g., "Paris" as a name vs. a city) depend on context
* Non-standard or abbreviated formats may not be detected

## Custom Patterns

In addition to built-in presets, you can define your own custom regex patterns to detect domain-specific sensitive information. Each custom pattern requires:

* **Pattern** — A valid [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
* **Action** — Either `redact` or `block`

When a custom pattern matches with the **Redact** action, the matched text is replaced with `[REDACTED]`. When set to **Block**, the entire request is rejected.

### Example Custom Patterns

| Use Case               | Pattern                              | Action |
| ---------------------- | ------------------------------------ | ------ |
| Internal project codes | `PROJ-\d{4,6}`                       | Redact |
| AWS access keys        | `AKIA[0-9A-Z]{16}`                   | Block  |
| Internal URLs          | `https?://internal\.company\.com\S*` | Redact |

### Pattern Safety

Patterns are validated for:

1. **Syntax** — Must be a valid JavaScript regular expression.
2. **Safety** — Must not be vulnerable to catastrophic backtracking ([ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)). Patterns with nested quantifiers like `(a+)+` or `(a|a)*` are rejected.

Invalid or unsafe patterns are rejected at creation time with a descriptive error message.

## Configuring Sensitive Info Guardrails

### Via the Dashboard

1. Navigate to your workspace's **Privacy & Guardrails** page, or go to [Settings > Privacy](https://openrouter.ai/settings/privacy).
2. Create a new guardrail or edit an existing one.
3. Expand the **Sensitive Info** section.
4. Enable the desired built-in presets and/or add custom patterns.
5. For each preset or pattern, choose the action: **Redact** or **Block**.
6. Save the guardrail.

You can use the **Enable all** / **Disable all** buttons to quickly toggle all built-in presets.

### Via the API

Sensitive info filters are configured as part of the guardrail object using the `content_filter_builtins` and `content_filters` fields.

**Built-in presets** use the `content_filter_builtins` field:

```json
{
  "name": "PII Protection",
  "content_filter_builtins": [
    { "slug": "email", "action": "redact" },
    { "slug": "phone", "action": "redact" },
    { "slug": "ssn", "action": "block" },
    { "slug": "credit-card", "action": "block" },
    { "slug": "ip-address", "action": "redact" },
    { "slug": "person-name", "action": "redact" },
    { "slug": "address", "action": "redact" }
  ]
}
```

Available slugs: `email`, `phone`, `ssn`, `credit-card`, `ip-address`, `person-name`, `address`.

**Custom patterns** use the `content_filters` field:

```json
{
  "name": "Custom Filters",
  "content_filters": [
    { "pattern": "AKIA[0-9A-Z]{16}", "action": "block", "label": "AWS Key" },
    { "pattern": "PROJ-\\d{4,6}", "action": "redact" }
  ]
}
```

Each custom filter supports an optional `label` field for descriptive error messages when blocking.

See the [Guardrails API reference](/docs/api/api-reference/guardrails/list-guardrails) for full endpoint documentation.

## How Sensitive Info Interacts with Other Guardrails

Sensitive info filters follow the same [guardrail hierarchy](/docs/guides/features/guardrails#guardrail-hierarchy) as other guardrail settings. When multiple guardrails apply to a request:

* **Content filters are unioned** — If a member guardrail has an email filter and an API key guardrail has a phone filter, both filters apply.
* **Block wins over redact** — If the same entity type appears in multiple guardrails with different actions, the stricter action (block) takes precedence.
* **Custom and built-in filters combine** — Filters from all applicable guardrails (default, member, and API key level) are merged together.

## Error Responses

When a request is blocked by a content filter, the API returns:

```json
{
  "error": {
    "code": 403,
    "message": "Request blocked by content filter: [LABEL]"
  }
}
```

The `[LABEL]` in the error message depends on what triggered the block:

* For built-in presets: the preset label (e.g., `Email address`, `Social Security number`)
* For custom patterns with a `label` field: the custom label
* For custom patterns without a label: `[BLOCKED]`
* For NLP-detected entities: the entity type (e.g., `Blocked PII detected: PERSON`)

## Best Practices

* **Start with Redact** — Use **Redact** as the default action when getting started. This lets requests proceed while protecting sensitive data, giving you time to evaluate detection accuracy before switching to **Block**.

* **Use built-in presets for common PII** — The built-in presets are tuned for common formats and are the easiest way to get started. Add custom patterns for domain-specific data.

* **Be aware of NLP latency** — The **Person Name** and **Address** presets use NLP-based detection, which adds latency proportional to input size. If latency is critical, consider using only regex-based presets.

* **Test before deploying** — Use the Test Preview in the guardrail editor to verify your filters work as expected before saving and assigning the guardrail.

* **Combine with other guardrail settings** — Sensitive info filters work alongside budget limits, model allowlists, provider restrictions, and ZDR enforcement. Use them together for comprehensive governance.

* **Use labels on custom block patterns** — Adding a `label` to custom patterns that use the **Block** action provides clearer error messages to API consumers, making it easier to understand why a request was rejected.