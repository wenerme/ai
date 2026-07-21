> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Prompt Injection Detection

> Regex-based prompt injection guardrail patterns

export const PromptInjectionEncodingDetectors = () => {
  const ITEMS = ["base64_encoded_injection", "hex_encoded_injection"];
  return <>
      {ITEMS.map((item, index) => <span key={item}>
          <code>{item}</code>
          {index < ITEMS.length - 1 ? ", " : ""}
        </span>)}
    </>;
};

export const PromptInjectionEvasionKeywords = () => {
  const ITEMS = ["ignore", "bypass", "override", "reveal", "system", "prompt"];
  return <>
      {ITEMS.map((item, index) => <span key={item}>
          <code>{item}</code>
          {index < ITEMS.length - 1 ? ", " : ""}
        </span>)}
    </>;
};

export const PromptInjectionFuzzyTargets = () => {
  const ITEMS = ["ignore", "bypass", "override", "reveal", "delete", "system", "prompt", "instructions"];
  return <>
      {ITEMS.map((item, index) => <span key={item}>
          <code>{item}</code>
          {index < ITEMS.length - 1 ? ", " : ""}
        </span>)}
    </>;
};

export const PromptInjectionPatternsTables = () => {
  const PATTERN_CATEGORIES = [{
    "title": "Direct Instruction Override",
    "description": "Attempts to make the model ignore, override, or invalidate its original instructions.",
    "patterns": [{
      "name": "ignore_previous_instructions",
      "regex": "/ignore\\s+(all\\s+)?(previous|prior)\\s+((?:safety|security|system|operational|internal|core|original|initial|existing|given|stated|provided|defined|specified|established)\\s+)?(instructions?|rules?|guidelines?|constraints?|directives?)/i",
      "description": "Attempts to discard prior instructions, optionally scoped to safety/system/etc."
    }, {
      "name": "disregard_instructions",
      "regex": "/disregard\\s+(all\\s+)?(previous|prior|above)\\s+(instructions?|rules?|guidelines?|constraints?|directives?)/i",
      "description": "Variants of \"disregard your instructions/rules/guidelines/constraints/directives\"."
    }, {
      "name": "forget_instructions",
      "regex": "/forget\\s+(all\\s+)?(previous|prior|above)\\s+(instructions?|rules?|guidelines?|constraints?|directives?)/i",
      "description": "Attempts to erase prior instructions/rules/guidelines/constraints/directives."
    }, {
      "name": "new_instructions",
      "regex": "/new\\s+instructions?:/i",
      "description": "Injection marker introducing replacement instructions."
    }, {
      "name": "do_not_follow",
      "regex": "/do\\s+not\\s+follow\\s+(the\\s+)?(system|developer|previous|original)/i",
      "description": "Telling the model to disobey its system prompt."
    }, {
      "name": "supersede_instructions",
      "regex": "/supersedes?\\s+(all\\s+)?(prior|previous)\\s+(instructions?|rules?|guidelines?|constraints?|directives?)/i",
      "description": "\"Supersedes prior instructions\" override."
    }, {
      "name": "void_instructions",
      "regex": "/(all\\s+)?(previous|prior)\\s+instructions?\\s+(are|is)\\s+(void|invalid|null|obsolete|cancelled|revoked)/i",
      "description": "Claims prior instructions are void/invalid/revoked/cancelled."
    }]
  }, {
    "title": "Developer / Admin Mode Activation",
    "description": "Attempts to switch the model into a privileged operating mode.",
    "patterns": [{
      "name": "developer_mode",
      "regex": "/you\\s+are\\s+now\\s+(in\\s+)?developer\\s+mode/i",
      "description": "Claims the model is in developer mode."
    }, {
      "name": "enter_special_mode",
      "regex": "/enter\\s+(developer|admin|debug|maintenance)\\s+mode/i",
      "description": "Requests to enter a special (developer/admin/debug/maintenance) mode."
    }, {
      "name": "activate_special_mode",
      "regex": "/activate\\s+(developer|admin|debug|jailbreak)\\s+mode/i",
      "description": "Requests to activate a special (developer/admin/debug/jailbreak) mode."
    }]
  }, {
    "title": "System Override",
    "description": "Attempts to override the model's core instructions.",
    "patterns": [{
      "name": "system_override",
      "regex": "/\\bsystem\\s+override\\b/i",
      "description": "Direct system-override keyword."
    }, {
      "name": "override_instructions",
      "regex": "/override\\s+(your\\s+)?(instructions?|rules?|guidelines?|constraints?|directives?)/i",
      "description": "Attempts to override instructions/rules/guidelines/constraints/directives."
    }]
  }, {
    "title": "Prompt Extraction",
    "description": "Attempts to reveal the model's system prompt or internal instructions.",
    "patterns": [{
      "name": "reveal_prompt",
      "regex": "/reveal\\s+((?:your?|yoru|yuor|the|my|its|his|her|our|their)\\s+)?((?:(?:full|hidden|complete|internal|secret|original|entire|exact|actual|real)\\s+){0,2})((?:system|systme|sysetm|systemp?)\\s+)?prompt\\b/i",
      "description": "Asks the model to reveal its (full/hidden/internal/secret/original/…) prompt."
    }, {
      "name": "show_prompt",
      "regex": "/show\\s+(me\\s+)?((?:your?|yoru|yuor|the|my|its|his|her|our|their)\\s+)((?:system|systme|sysetm|systemp?)\\s+)?prompt\\b/i",
      "description": "Asks the model to show its prompt."
    }, {
      "name": "what_instructions",
      "regex": "/what\\s+(are|were)\\s+(your\\s+)?(exact\\s+)?instructions/i",
      "description": "Asks what the model's instructions are."
    }, {
      "name": "repeat_instructions",
      "regex": "/repeat\\s+(the\\s+)?(text|instructions?)\\s+(above|before)/i",
      "description": "Asks the model to repeat earlier text."
    }, {
      "name": "output_prompt",
      "regex": "/output\\s+(your\\s+)?(initial|original|system)\\s+(prompt|instructions?)/i",
      "description": "Asks for the original system prompt."
    }]
  }, {
    "title": "Role Manipulation",
    "description": "Attempts to change the model's identity or remove its restrictions.",
    "patterns": [{
      "name": "remove_restrictions",
      "regex": "/you\\s+are\\s+no\\s+longer\\s+(bound|restricted|limited)/i",
      "description": "Claims the model is no longer restricted."
    }, {
      "name": "act_unbound",
      "regex": "/act\\s+as\\s+if\\s+(you('re|\\s+are)\\s+)?not\\s+bound/i",
      "description": "Asks the model to pretend it has no restrictions."
    }, {
      "name": "pretend_different",
      "regex": "/pretend\\s+(you('re|\\s+are)\\s+)?(a\\s+)?different\\s+(ai|assistant|model)/i",
      "description": "Asks the model to impersonate a different AI."
    }, {
      "name": "identity_hijack",
      "regex": "/you\\s+are\\s+now\\s+(?:(?:a|an)\\s+)?\\w+.{0,40}(without\\s+(any\\s+)?restrict|ignor\\w*\\s+(all|any|every|prev)|bypass|unrestrict|unlimit|obey\\s+only|no\\s+(rules|limits|restrict|boundari))/i",
      "description": "Identity hijacking with explicitly malicious modifiers."
    }]
  }, {
    "title": "DAN-Style Jailbreaks",
    "description": "\"Do Anything Now\" (DAN) and related jailbreak prompts.",
    "patterns": [{
      "name": "dan_jailbreak",
      "regex": "\\bDAN\\b.*\\bdo\\s+anything\\s+now\\b",
      "description": "The classic DAN jailbreak (case-sensitive for \"DAN\")."
    }, {
      "name": "jailbreak_mode",
      "regex": "/jailbreak(ed)?\\s+(mode|prompt)/i",
      "description": "References to jailbreak modes or prompts."
    }]
  }, {
    "title": "Safety Bypass",
    "description": "Attempts to disable or circumvent the model's safety measures.",
    "patterns": [{
      "name": "bypass_safety",
      "regex": "/bypass\\s+(your\\s+)?(safety|security|content|ethical)\\s+(filters?|measures?|guidelines?|restrictions?)/i",
      "description": "Attempts to bypass safety/security/content/ethical filters."
    }, {
      "name": "disable_safety",
      "regex": "/disable\\s+(your\\s+)?(safety|security|content)\\s+(filters?|measures?)/i",
      "description": "Attempts to disable safety/security/content measures."
    }, {
      "name": "ignore_safety",
      "regex": "/(ignore|disregard)\\s+(all\\s+)?(your\\s+)?(safety|security|ethical|content)\\s+(guidelines?|rules?|restrictions?|measures?|filters?|polic(?:y|ies)|protocols?)/i",
      "description": "Attempts to ignore or disregard safety/security/ethical/content guidelines, rules, or restrictions."
    }]
  }, {
    "title": "Tag Injection & Role Spoofing",
    "description": "Attempts to inject fake system/assistant/user tags or delimiters to confuse the model's understanding of the conversation structure.",
    "patterns": [{
      "name": "system_tag_injection",
      "regex": "/<\\s*\\/?\\s*system\\s*\\/?>/i",
      "description": "Injecting `<system>`, `</system>`, or `<system/>` tags."
    }, {
      "name": "role_tag_injection",
      "regex": "/<\\s*\\/?\\s*(assistant|developer|tool|function)\\s*\\/?>/i",
      "description": "Injecting role-related XML tags (including self-closing)."
    }, {
      "name": "role_delimiter_injection",
      "regex": "/\\]\\s*\\n\\s*\\[?(system|assistant|user)\\]?:/i",
      "description": "Injecting role delimiters like `[system]:`."
    }, {
      "name": "bracketed_role_spoofing",
      "regex": "/\\[\\s*(System\\s*Message|System|Assistant|Internal)\\s*\\]/i",
      "description": "Fake bracketed role labels (e.g. `[System]`, `[Assistant]`)."
    }, {
      "name": "system_prefix_spoofing",
      "regex": "/^\\s*System:\\s+/im",
      "description": "Lines starting with `System:` to impersonate system messages (multiline)."
    }]
  }, {
    "title": "Control Token Injection",
    "description": "Attempts to inject model-internal control tokens that can confuse tokenization or chat-template parsing.",
    "patterns": [{
      "name": "control_token_injection",
      "regex": "<\\|(?:im_start|im_end|eot_id|start_header_id|end_header_id|endoftext)\\|>",
      "description": "ChatML / Llama 3 / generic pipe-delimited control tokens."
    }, {
      "name": "deepseek_control_token_injection",
      "regex": "<\\uFF5C(?:end\\u2581of\\u2581sentence|begin\\u2581of\\u2581sentence)\\uFF5C>",
      "description": "DeepSeek fullwidth-pipe (`｜`) control tokens."
    }]
  }];
  const slugify = value => value.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");
  return <>
      {PATTERN_CATEGORIES.map(category => <div key={category.title}>
          <h3 id={slugify(category.title)}>{category.title}</h3>
          <p>{category.description}</p>
          <table>
            <thead>
              <tr>
                <th>Pattern Name</th>
                <th>Regex</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {category.patterns.map(pattern => <tr key={pattern.name}>
                  <td>
                    <code>{pattern.name}</code>
                  </td>
                  <td>
                    <code className="regex-cell">{pattern.regex}</code>
                  </td>
                  <td>{pattern.description}</td>
                </tr>)}
            </tbody>
          </table>
        </div>)}
    </>;
};

OpenRouter's regex-based prompt injection detection scans incoming requests for common injection techniques using pattern matching. This feature is **free** and adds **minimal latency** to requests since the patterns are evaluated locally before the request is forwarded to the model provider.

<Note>
  To enable prompt injection detection, navigate to your [workspace guardrails](https://openrouter.ai/workspaces), open or create a guardrail, and configure the **Security** section.
</Note>

## How It Works

When regex-based detection is enabled on a guardrail, every incoming message is scanned against a set of patterns derived from the [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html), among other resources. If a match is found, the configured action is taken:

* **Flag** — The request passes through unmodified; the detection is recorded for observability (metrics + analytics events) but no enforcement is applied. Useful for measuring true-positive rates on your own traffic before switching to `redact` or `blocked`.
* **Redact** — Matched spans are replaced with `[PROMPT_INJECTION]` and the sanitized request is forwarded to the model.
* **Block** — The entire request is rejected with a `403` before it reaches the model.

<Note>
  When multiple guardrails apply to the same request (for example, a workspace default plus an API key–scoped guardrail), the most restrictive action wins. Priority is `block` > `redact` > `flag`.
</Note>

## Detection Patterns

The following regex patterns are checked against all user-supplied message content. Patterns are case-insensitive unless noted otherwise.

<PromptInjectionPatternsTables />

## Evasion Detection

In addition to the regex patterns above, the detection system includes techniques to catch common evasion strategies.

### Typoglycemia Detection

Attackers may scramble the middle letters of keywords while keeping the first and last letters intact (e.g., "ignroe" instead of "ignore"). The system checks for typoglycemia variants of these target words:

<PromptInjectionFuzzyTargets />

### Encoding-Based Evasion

The system decodes Base64 and hex-encoded content (including space-separated hex pairs like `69 67 6e 6f 72 65`), then checks the decoded text for injection keywords:

<PromptInjectionEvasionKeywords />

This catches attempts to hide malicious instructions behind encoding layers. Two encoding detectors run: <PromptInjectionEncodingDetectors />.

### Character-Spaced Evasion

Text with character spacing (e.g., `i g n o r e  p r e v i o u s`) is normalized by collapsing spaces, then re-scanned against all patterns. This prevents simple spacing-based evasion.

## Reporting False Positives

If a detection incorrectly flags legitimate content, you can mark it as a false positive from the [Logs](https://openrouter.ai/logs) page. Generations with a guardrail event show a shield icon on the row; hover it to open the guardrail popover.

When a single pattern was detected, click **Mark as false positive** directly in the popover:

<img src="https://mintcdn.com/openrouter-d02e98a0/asDbbA5Vp75E03XP/assets/guides/features/guardrails/false-positives/fp-popover-single-pattern.png?fit=max&auto=format&n=asDbbA5Vp75E03XP&q=85&s=2ba7445d9c69cc01118e1e891598bb17" alt="Guardrail popover with a Mark as false positive button for a single detected pattern" width="2484" height="1178" data-path="assets/guides/features/guardrails/false-positives/fp-popover-single-pattern.png" />

When multiple patterns were detected, the popover instead links to the generation detail view, where you can select the specific patterns to report:

<img src="https://mintcdn.com/openrouter-d02e98a0/asDbbA5Vp75E03XP/assets/guides/features/guardrails/false-positives/fp-popover-multi-pattern.png?fit=max&auto=format&n=asDbbA5Vp75E03XP&q=85&s=96c62ade14589743b4a056b293aa8c8f" alt="Guardrail popover linking to Review entity types in detail for a multi-pattern detection" width="2648" height="1130" data-path="assets/guides/features/guardrails/false-positives/fp-popover-multi-pattern.png" />

In the detail view, check the patterns that were flagged incorrectly under **Mark as false positive**, then click **Submit**:

<img src="https://mintcdn.com/openrouter-d02e98a0/asDbbA5Vp75E03XP/assets/guides/features/guardrails/false-positives/fp-detail-view-multi-pattern.png?fit=max&auto=format&n=asDbbA5Vp75E03XP&q=85&s=f2dec84fbf64692e87248014f370f1dd" alt="Generation detail view with per-pattern Mark as false positive checkboxes" width="2484" height="1848" data-path="assets/guides/features/guardrails/false-positives/fp-detail-view-multi-pattern.png" />

The event is visually marked and your feedback is recorded for future detection improvements.

<Note>
  Marking a detection as false positive does not retroactively unblock the request. If the action was **block**, the original request was already rejected.
</Note>

## Limitations

* **Regex-based detection is not exhaustive.** Sophisticated or novel injection techniques may not be caught.
* **Flag mode does not enforce.** A flagged request is forwarded to the model exactly as submitted — the detection is recorded for dashboards and analytics only. Use `flag` to measure match rates on real traffic; switch to `redact` or `block` once you're confident the false-positive rate is acceptable.
* **False positives** are possible. Some legitimate prompts may contain phrases that match these patterns (e.g., a prompt about security testing). Test your guardrail configuration with representative traffic — ideally in `flag` mode first — before enforcing broadly. You can [report false positives](#reporting-false-positives) from the Logs page, or exempt specific known-safe phrases via the [Allowlist](/docs/guides/features/guardrails/prompt-injection/allowlist).

## Further Reading

* [Allowlist](/docs/guides/features/guardrails/prompt-injection/allowlist) — exempt specific known-safe phrases from detection
* [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
* [Guardrails documentation](/docs/guides/features/guardrails)
* [Guardrails API reference](/docs/api/api-reference/guardrails/list-guardrails)
