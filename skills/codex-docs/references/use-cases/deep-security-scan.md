---
name: Run a deep security scan
tagline: Search an authorized repository deeply for plausible vulnerabilities.
summary: Use the Codex Security plugin to run a higher-recall, repository-wide
  audit that repeats discovery, validates candidates, and produces reviewable
  report artifacts.
skills:
  - token: $codex-security:deep-security-scan
    url: /codex/security/plugin
    description: Run repeated repository-wide security discovery passes, validate
      surviving findings, analyze attack paths, and create reviewable reports.
bestFor:
  - Application security reviews of a complete repository that you own or are
    authorized to assess.
  - High-recall reviews where additional runtime and token use are appropriate
    for finding more candidate issues.
  - Security teams that need traceable finding evidence before deciding what to
    remediate.
starterPrompt:
  title: Run a Deep Security Scan
  body: >-
    /goal Run a deep security scan on this repository. Do not stop until all
    required steps are complete and the final report is ready.


    Scope and rules:

    - I am authorized to assess this repository.

    - Treat the entire repository as in scope.

    - Use the Codex Security plugin's deep scan workflow; do not broaden this
    into a diff or scoped-path review.

    - Keep the scan read-only; do not modify code, open pull requests, or test
    external targets.


    Return the final Markdown and HTML report paths and summarize the findings
    that require human review first.
  suggestedEffort: high
relatedLinks:
  - label: Codex Security plugin
    url: /codex/security/plugin
  - label: Agent approvals and security
    url: /codex/agent-approvals-security
  - label: Codex cyber safety
    url: /codex/concepts/cyber-safety
---

## Choose a deep repository review

Use a deep scan when you need high-recall vulnerability discovery across a
complete repository and can budget for a longer run. The Codex Security plugin
repeats discovery passes before validating and prioritizing findings, so this
workflow takes more time and tokens than an ordinary scan.

A deep scan is for an entire repository. To review one package or directory,
use `$codex-security:security-scan`. To review a pull request, commit, branch
diff, or working-tree patch, use
[$codex-security:security-diff-scan](https://developers.openai.com/codex/use-cases/scan-code-changes-for-security).

## Prepare an authorized scan



1. Open the repository in Codex and install the [Codex Security plugin](https://developers.openai.com/codex/security/plugin).
2. Confirm that you own the repository or have authorization to assess it.
3. Add repository-specific architecture, trust-boundary, build, test, and validation guidance in `AGENTS.md` when it will improve the review.
4. Run the starter prompt and let the scan complete its repeated discovery, validation, attack-path analysis, and final reporting stages.
5. Review the final reports before asking Codex to change code or reproduce a finding further.



## Review evidence before remediation

The final result should identify affected locations, why the behavior is
reachable, what validation Codex performed, any remaining proof gaps, and a
bounded remediation direction. Distinguish findings without validation evidence
from validated findings.

Start remediation only for a finding you have selected and reviewed. Use
[Remediate a vulnerability backlog](https://developers.openai.com/codex/use-cases/remediate-vulnerability-backlog)
to fix findings one at a time with focused regression validation.