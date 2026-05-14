> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Guardrails

Guardrails let organizations control how their members and API keys can use OpenRouter. You can set spending limits, restrict which models and providers are available, and enforce data privacy policies.

Any existing account wide settings will continue to apply. Guardrails help enforce tighter restrictions for individual API keys or users.

## Enabling Guardrails

To create and manage guardrails for your account or organization:

1. Navigate to [Settings > Privacy](https://openrouter.ai/settings/privacy) in your OpenRouter dashboard
2. Scroll to the Guardrails section
3. Click "New Guardrail" to create your first guardrail

<Tip>
  If you're using an organization account, you must be an organization admin to create and manage guardrails.
</Tip>

## Guardrail Settings

Each guardrail can include any combination of:

* **Budget limit** - Spending cap in USD that resets daily, weekly, or monthly. Requests are rejected when the limit is reached.
* **Model allowlist** - Restrict to specific models. Leave empty to allow all.
* **Provider allowlist** - Restrict to specific providers. Leave empty to allow all.
* **Zero Data Retention** - Require ZDR-compatible providers for all requests.
* **Security** - Protect against prompt injection and jailbreak attacks with [regex-based detection](/docs/guides/features/guardrails/prompt-injection) and Google Cloud Model Armor.
* **Custom content filters** - Define your own regex patterns to [redact or block](#custom-content-filters) matching content in incoming requests.

<Note>
  Individual API key budgets still apply. The lower limit wins.
</Note>

## Assigning Guardrails

Guardrails can be assigned at multiple levels:

* **Member assignments** - Assign to specific organization members. Sets a baseline for all their API keys and chatroom usage.
* **API key assignments** - Assign directly to specific keys for granular control. Layers on top of member guardrails.

Only one guardrail can be directly assigned to a user or key. All of an organization member's created API keys will implicitly follow that user's guardrail assignment, even if the API Key is further restricted with its own guardrail assignment.

## Guardrail Hierarchy

Account-wide privacy and provider settings are always enforced as a default guardrail. When additional guardrails apply to a request, they are combined using the following rules:

* **Provider allowlists**: Intersection across all guardrails (only providers allowed by all guardrails are available)
* **Model allowlists**: Intersection across all guardrails (only models allowed by all guardrails are available)
* **Zero Data Retention**: OR logic (if any guardrail enforces ZDR, it is enforced)
* **Budget limits**: Each guardrail's budget is checked independently. See [Budget Enforcement](#budget-enforcement) for details.

This means stricter rules always win when multiple guardrails apply. For example, if a member guardrail allows providers A, B, and C, but an API key guardrail only allows providers A and B, only providers A and B will be available for that key.

## Eligibility Preview

When viewing a guardrail, you can see an eligibility preview that shows which providers and models are available with that guardrail combined with your account settings. This helps you understand the effective restrictions before assigning the guardrail.

## Budget Enforcement

Guardrail budgets are enforced per-user and per-key, not shared across all users with that guardrail. When an API key makes a request, its usage counts toward both the key's budget and the owning member's budget.

**Example 1: Member guardrail with \$50/day limit**

You assign a guardrail with a \$50/day budget to three team members: Alice, Bob, and Carol. Each member gets their own \$50/day allowance. If Alice spends \$50, she is blocked, but Bob and Carol can still spend up to \$50 each.

**Example 2: API key usage accumulates to member usage**

Alice creates two API keys, both assigned a guardrail with a \$20/day limit. Key A spends \$15 and Key B spends \$10. Each key is within its own \$20 limit, but Alice's total member usage is \$25. If Alice also has a member guardrail with a \$20/day limit, her requests would be blocked because her combined usage (\$25) exceeds the member limit (\$20).

**Example 3: Layered guardrails**

Bob has a member guardrail with a \$100/day limit. His API key has a separate guardrail with a \$30/day limit. The key can only spend \$30/day (its own limit), but Bob's total usage across all his keys cannot exceed \$100/day. Both limits are checked independently on each request.

## Custom Content Filters

Each guardrail can carry a list of **custom content filter patterns**.
Every pattern is a regular expression with an associated action:

* **Redact** - Matched spans are replaced with a placeholder before the
  request is forwarded to the model.
* **Block** - The request is rejected with a `403` before it reaches the
  model.

Patterns are evaluated locally against every user message, so they add
negligible latency to requests.

### Supported regex features

Patterns are JavaScript-flavoured regular expressions. The following common
constructs are all supported:

* Character classes (`[a-z]`, `\d`, `\w`, `\s`, …)
* Quantifiers (`*`, `+`, `?`, `{n,m}`)
* Alternation (`foo|bar`)
* Non-capturing groups (`(?:…)`)
* Named capture groups (`(?<name>…)`)
* Anchors (`^`, `$`, `\b`)
* Escape sequences (`\.`, `\(`, `\\`, …)

### Unsupported regex features

To keep evaluation fast and predictable across all requests, the following
features are **not allowed** in new or edited patterns:

* **Lookaheads** - `(?=…)` and `(?!…)`
* **Lookbehinds** - `(?<=…)` and `(?<!…)`
* **Backreferences** - numeric (`\1`, `\2`, …) and named (`\k<name>`)
* **Excessive backtracking** - patterns with nested quantifiers like
  `(a+)+`

The API rejects offending patterns with an `invalid_regex_pattern` error
on create and on update.

### Limits

* Up to **100,000 characters** per pattern.
* Multiple patterns per guardrail; each is evaluated independently.

## When a Request Is Blocked

When a guardrail's runtime checks block a request — for example a content filter or prompt-injection detector — OpenRouter returns an HTTP **403 Forbidden** response. Note that budget limits and allowlist restrictions also produce 403 responses, but only runtime content checks include `openrouter_metadata` stage details.

```json
{
  "error": {
    "code": 403,
    "message": "Request blocked: prompt injection patterns detected",
    "metadata": {
      "patterns": ["ignore all previous instructions"]
    }
  }
}
```

If you opt in to [router metadata](/docs/features/router-metadata) via the `X-OpenRouter-Experimental-Metadata: enabled` header, the 403 response also includes the full `openrouter_metadata` object with routing context and a `pipeline` array showing every guardrail stage that ran:

```json
{
  "error": {
    "code": 403,
    "message": "Request blocked: prompt injection patterns detected",
    "metadata": {
      "patterns": ["ignore all previous instructions"]
    }
  },
  "openrouter_metadata": {
    "requested": "openai/gpt-4o",
    "strategy": "direct",
    "region": "iad",
    "summary": "available=1",
    "attempt": 1,
    "is_byok": false,
    "endpoints": {
      "total": 1,
      "available": [
        { "provider": "OpenAI", "model": "openai/gpt-4o", "selected": false }
      ]
    },
    "pipeline": [
      {
        "type": "guardrail",
        "name": "regex_pi_detection",
        "guardrail_id": "grd_abc123",
        "guardrail_scope": "api-key",
        "summary": "Blocked: prompt injection detected (1 pattern matched)",
        "data": {
          "action": "blocked",
          "detected": true,
          "engines": ["regex"],
          "patterns": ["ignore all previous instructions"]
        }
      }
    ]
  }
}
```

See [Router Metadata — Error Responses](/docs/features/router-metadata#error-responses) and [Errors — Guardrail Errors](/docs/api/reference/errors#guardrail-errors) for the full response shapes and pipeline stage reference.

## API Access

You can manage guardrails programmatically using the OpenRouter API. This allows you to create, update, delete, and assign guardrails to API keys and organization members directly from your code.

See the [Guardrails API reference](/docs/api/api-reference/guardrails/list-guardrails) for available endpoints and usage examples.