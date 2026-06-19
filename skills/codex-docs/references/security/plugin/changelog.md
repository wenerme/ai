# Codex Security plugin changelog

This changelog highlights changes that affect how you run scans, review
results, and move findings toward remediation.

## 0.1.9 (June 2026)

### Review scans in the findings workspace

- Review completed scans in a dedicated workspace that brings findings,
  coverage, severity, confidence, and scan artifacts together.
- Filter and sort findings, including sorting by highest confidence, while
  preserving your workspace state during refreshes.
- Open a finding to review source evidence, validation details, reachability,
  impact, and remediation guidance in one place.

### Run scans with less setup

- Run standard scans against Git repositories, individual folders, or
  codebases without Git history. Deep scans can also target a specific folder.
- Cancel an active scan explicitly, resume an interrupted scan without another
  setup prompt, and receive a warning before starting concurrent deep scans.
- Follow clearer setup and progress states, with more compact progress
  summaries and errors that remain visible until you address them.

### Export portable, verifiable results

- Use a consistent completed-scan format with a manifest, structured findings,
  coverage data, and a Markdown report derived from the same canonical result.
- Export findings as JSON, CSV, or SARIF for analysis, archiving, and integration
  with other security tools.
- Improved scan completion and filesystem handling, including fixes for Windows
  paths and scan locking.

### Triage and track existing findings

- Triage existing findings from scanners, advisories, bug bounty reports,
  GitHub, Jira, Linear, or Codex Security results against the current codebase.
  The triage workflow returns an evidence-backed verdict and a prioritized
  action queue.
- Track selected validated findings in Linear, Jira, or GitHub issues, or create
  a private draft GitHub Security Advisory when the repository meets the
  advisory requirements.
- Review duplicate checks, source context, destination visibility, and the
  exact proposed content before approving a write. Codex reads the result back
  after creation or update to verify it.