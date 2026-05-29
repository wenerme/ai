---
name: Scan code changes for security
tagline: Review a pull request or local diff for security regressions.
summary: Use the Codex Security plugin to examine a Git-backed change set,
  validate plausible security regressions, and produce an evidence-based report
  before merge.
skills:
  - token: $codex-security:security-diff-scan
    url: /codex/security/plugin
    description: Review a pull request, commit, branch diff, or working-tree patch
      for security regressions with validation and attack-path evidence.
bestFor:
  - Pull requests that touch authentication, authorization, parsing, file
    access, secrets, or privileged workflows.
  - Release branches or local patches that need a security-focused check before
    merge.
  - Reviewers who need findings anchored to changed code and directly supporting
    files.
starterPrompt:
  title: Review a Change for Security Regressions
  body: >-
    /goal Scan this PR, commit, branch diff, or working-tree patch for security
    regressions. Do not stop until all in-scope changed files are covered and
    all required steps are complete.


    Scope and rules:

    - Target: [this pull request / commit SHA / branch diff from BASE to HEAD /
    the current working-tree patch]

    - I am authorized to assess this repository and change set.

    - Pay particular attention to [auth, input handling, secrets, filesystem,
    network, dependencies, or other sensitive surface].

    - Keep this pass read-only; do not modify code or open a pull request.


    Return the final Markdown report and any Codex app review directives for
    findings that require human review.
  suggestedEffort: high
relatedLinks:
  - label: Codex Security plugin
    url: /codex/security/plugin
  - label: Review GitHub pull requests
    url: /codex/use-cases/github-code-reviews
  - label: Agent approvals and security
    url: /codex/agent-approvals-security
---

## Review the change instead of the whole repository

Use a security diff scan when a pull request, commit, branch, or local patch
changes a sensitive code path. The Codex Security plugin uses repository
context to understand the change, then keeps finding discovery and validation
focused on the diff and directly supporting code.

This workflow complements ordinary code review. Use it when you want evidence
about security regressions, not a general style or test review.

## Run a focused pass



1. Open the repository and check out or describe the exact Git-backed change set to review.
2. Install the [Codex Security plugin](https://developers.openai.com/codex/security/plugin) and specify the pull request, commit, branch diff, or working-tree patch in the starter prompt.
3. Name high-risk surfaces in the change, such as authentication, parsers, file paths, network requests, or credential handling.
4. Run the prompt without requesting a fix so the first result remains a review artifact.
5. Check each reported affected line, validation result, and stated proof gap before deciding whether to remediate.



## Follow through on a finding

A useful report distinguishes a reachable, supported security finding from a
suspicion that still needs confirmation and can include Codex app review
directives for affected lines. For an actionable result, open a new bounded
fix task with the finding identifier or the relevant report section.
See [Remediate a vulnerability backlog](https://developers.openai.com/codex/use-cases/remediate-vulnerability-backlog)
for the fix-and-validation loop.