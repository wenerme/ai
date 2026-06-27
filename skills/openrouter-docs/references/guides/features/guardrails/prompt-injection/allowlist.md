> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Allowlist

The prompt injection allowlist lets you mark specific phrases as safe so they are not caught by the [regex-based prompt injection detection guardrail](/docs/guides/features/guardrails/prompt-injection). This is useful when your application legitimately uses language that overlaps with injection patterns — for example, a security-training chatbot that discusses prompt injection techniques, or a customer-support agent whose canned responses include phrases like "ignore previous instructions."

The allowlist only applies to regex-based detection patterns (the patterns listed on the [Prompt Injection Detection](/docs/guides/features/guardrails/prompt-injection#detection-patterns) page). Evasion detectors — typoglycemia and Base64/hex encoding — are not affected by the allowlist because they operate on decoded or normalized text where selective phrase exemption is not meaningful.

## How It Works

When a request is scanned for prompt injection, allowlisted phrases are masked before the detection patterns run:

1. Each allowlisted phrase is located in the message text (case-insensitive).
2. The matched spans are replaced with neutral placeholder text so the detection regex cannot match them.
3. Detection runs on the masked text. Any remaining (non-allowlisted) injection patterns are still caught.
4. If the action is **redact**, the allowlisted phrases are restored in the final output — only the non-allowlisted injection patterns are replaced with `[PROMPT_INJECTION]`.

This means you can allowlist one phrase while still catching other injection patterns in the same message: only the exact phrases you have allowlisted are exempt, and every other dangerous pattern in the message is still detected.

### Matching Rules

* **Case-insensitive.** An allowlist entry matches regardless of letter casing in the message text.
* **Exact substring match.** The phrase must appear verbatim in the message. Wildcards and regex are not supported.
* **All actions.** The allowlist applies equally to `block`, `flag`, and `redact` actions.

## Managing Patterns

Allowlist patterns are managed per-user from [Settings > Privacy](https://openrouter.ai/settings/privacy). Your allowlist applies across every guardrail that scans your requests — unlike detection configuration, which is set per-guardrail, the allowlist is entity-scoped.

In an organization, only **org admins** can view and manage the allowlist — both in [Settings > Privacy](https://openrouter.ai/settings/privacy) and via the quick-add banner in [Logs](https://openrouter.ai/logs). Non-admin members do not see these controls. On personal accounts, the account owner manages their own allowlist.

### Adding a Pattern

Click **Add pattern** and enter the phrase you want to allowlist. A live character counter shows the current length against the 1,000-character limit. The phrase is saved and immediately active.

If you have already reached the 200-pattern cap, the save will fail with an error message. Deactivate or delete an existing pattern first to make room.

### Editing a Pattern

Click the pencil icon on an existing pattern to open the inline edit form. The system checks for duplicate patterns (case-insensitive) before saving — if an identical pattern already exists, the edit is rejected with a toast notification.

### Toggling Active / Inactive

Each pattern has a toggle switch. Inactive patterns are visually dimmed and are not applied during detection. They do not count toward the 200-pattern cap.

### Deleting a Pattern

Click the trash icon on a pattern to permanently remove it.

## Quick-Add from Activity

When reviewing guardrail events in the [Logs](https://openrouter.ai/logs) prompt detail view, prompt injection events display an **Add to allowlist** banner that lets you add detected phrases directly to your allowlist without navigating to Settings.

* **Single pattern detected:** click the banner to add it in one step.
* **Multiple patterns detected:** click the banner to expand a picker with checkboxes. Select individual patterns or use **Select all**, then click **Add *N* patterns** to batch-add them. Patterns already on the allowlist are hidden from the picker, and an "N already added" link takes you to [Settings > Privacy](https://openrouter.ai/settings/privacy) to manage them.

![Multi-select pattern picker in the prompt detail view](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/491975505d415e3330593c1990a012aef1f90e1017e39ee293a2d5d6188e893b/content/pages/features/pi-allow-list-multi-select.png)

After adding, a confirmation links back to [Settings > Privacy](https://openrouter.ai/settings/privacy) where you can edit, toggle, or delete the pattern.

The quick-add banner only appears for regex-based detections. Events triggered by evasion detectors (typoglycemia, encoding) do not show the banner because those detection types cannot be selectively allowlisted.

## Limitations

* Up to **200 active patterns** per user. Inactive (toggled-off) patterns do not count toward this cap.
* Each pattern can be up to **1,000 bytes** when UTF-8 encoded (multibyte characters count as multiple bytes).
* **Regex-based patterns only.** The allowlist does not affect typoglycemia detection or Base64/hex encoding detection. If a message triggers one of those evasion detectors, the full message is flagged/redacted regardless of any allowlist entries.
* **Exact match only.** You cannot use wildcards, regex, or fuzzy matching in allowlist entries. The phrase must appear verbatim in the message text.
* **Per-entity scope.** Allowlist patterns are scoped to the account entity, not to a guardrail. On a personal account that entity is the individual user, who manages their own allowlist. In an organization the entity is the org itself, and only org admins can manage its allowlist (non-admin members do not see the controls).
* **Duplicate detection is case-insensitive.** You cannot add two patterns that differ only in letter casing (e.g., "Ignore" and "ignore" are treated as the same pattern).

## Further Reading

* [Prompt Injection Detection](/docs/guides/features/guardrails/prompt-injection) — the full list of regex patterns and evasion detectors
* [Guardrails overview](/docs/guides/features/guardrails) — how guardrails work, hierarchy, and configuration