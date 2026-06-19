---
name: Run a deep security scan
tagline: Search an authorized repository deeply for plausible vulnerabilities.
summary: Use the Codex Security plugin to run a more comprehensive audit of a
  repository or scoped folder that repeats discovery, validates candidates, and
  produces reviewable coverage and findings.
skills:
  - token: $codex-security:deep-security-scan
    url: /codex/security/plugin/deep-scans
    description: Run repeated discovery passes over a repository or scoped folder,
      validate surviving findings, analyze attack paths, and generate reviewable
      artifacts.
bestFor:
  - Application security reviews of a repository or component that you own or
    are authorized to assess.
  - More comprehensive reviews where additional runtime and token use are
    appropriate for finding more candidate issues.
  - Security teams that need traceable finding evidence before deciding what to
    remediate.
starterPrompt:
  title: Run a Deep Security Scan
  body: >-
    Use $codex-security:deep-security-scan to run a deep security scan on [this
    repository / absolute path to a scoped folder].


    Scope and rules:

    - I am authorized to assess this repository.

    - Keep the scan within [the entire repository / the exact folder named
    above].

    - Use the Codex Security plugin's deep-scan workflow; do not reinterpret
    this as a pull request or diff review.


    Return the generated report path. Summarize the findings, reviewed surfaces,
    and proof gaps that require human review first.
  suggestedEffort: high
relatedLinks:
  - label: Deep-scan guide
    url: /codex/security/plugin/deep-scans
  - label: Agent approvals and security
    url: /codex/agent-approvals-security
  - label: Codex cyber safety
    url: /codex/concepts/cyber-safety
---

## Choose a deep repository review

Use a deep scan when you need a more comprehensive vulnerability review across
a repository or explicit folder and can budget for a longer run. The Codex
Security plugin repeats discovery passes before validating and prioritizing
findings, so this workflow takes more time and resources than an ordinary scan.

A deep scan can review an entire repository or one explicitly named package or
directory. To review a pull request, commit, branch diff, or working-tree patch,
use
[$codex-security:security-diff-scan](https://developers.openai.com/codex/use-cases/scan-code-changes-for-security).

## Prepare an authorized scan



1. Open the repository in Codex and complete the [Codex Security plugin quickstart](https://developers.openai.com/codex/security/plugin).
2. Confirm that you own the repository or have authorization to assess it.
3. Add repository-specific architecture, trust-boundary, build, test, and validation guidance in `AGENTS.md` when it will improve the review.
4. Run the starter prompt and let the scan complete its repeated discovery, validation, attack-path analysis, and final reporting stages.
5. Review the findings workspace and any proof gaps before asking Codex to change code or reproduce a finding further.



## Review evidence before remediation

The final result should identify affected locations, why the behavior is
reachable, what validation Codex performed, any remaining proof gaps, and a
bounded remediation direction. Distinguish findings without validation evidence
from validated findings.

Start remediation only for a finding you have selected and reviewed. Use
[Remediate a vulnerability backlog](https://developers.openai.com/codex/use-cases/remediate-vulnerability-backlog)
to fix findings one at a time with focused regression validation.

For setup, preflight, scoped targets, and runtime expectations, see [Run a deep
security scan](https://developers.openai.com/codex/security/plugin/deep-scans).