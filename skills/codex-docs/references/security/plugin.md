# Codex Security plugin

The Codex Security plugin adds security-review workflows to Codex for code that
you have authorization to assess. Use it from an open repository to investigate
a codebase, review a change set for security regressions, confirm plausible
findings, and prepare minimal fixes for review.

This page covers the installable plugin that runs in your Codex thread. For
  the research-preview product that scans connected GitHub repositories through
  Codex Web, see [Codex Security](https://developers.openai.com/codex/security).

## Install the plugin

<Tabs
  param="install"
  tabs={[
    {
      id: "app",
      label: "Codex app",
    },
    {
      id: "cli",
      label: "Codex CLI",
    },
  ]}
>
  <div slot="app">
    <ButtonLink
      href="codex://plugins/install/codex-security?marketplace=openai-curated"
      color="primary"
      variant="solid"
      size="lg"
      pill
      className="mt-2"
    >
      Install the Codex Security plugin
    </ButtonLink>

    <br />

    After installation, start a new thread in the repository you want to
    assess.

  </div>

  <div slot="cli">
    <WorkflowSteps variant="headings">
    1. Open Codex

       Start Codex from your repository:

       ```bash
       codex
       ```

    2. Open the plugin browser

       Enter:

       ```text
       /plugins
       ```

    3. Install Codex Security

       Search for **Codex Security**, open it, and select `Install plugin`.

    4. Start a new thread

       Start a new thread in the repository you are authorized to review.
    </WorkflowSteps>

  </div>
</Tabs>

## Choose a security workflow

Choose the narrowest workflow that answers your question. A diff-focused scan
is faster to review than a repository-wide scan; a deep scan intentionally uses
more time and tokens to search for more candidate findings.

| Goal                                   | Skill                                | Scope and output                                                                                                                              |
| -------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Review a repository or one scoped path | `$codex-security:security-scan`      | Runs threat modeling, finding discovery, validation, attack-path analysis, and produces Markdown and HTML reports.                            |
| Run a higher-recall audit              | `$codex-security:deep-security-scan` | Repeats repository-wide discovery with delegated workers before validation and reporting. Use it only for an entire repository.               |
| Review a change before merge           | `$codex-security:security-diff-scan` | Reviews a pull request, commit, branch diff, or working-tree patch and produces a Markdown report grounded in changed code.                   |
| Fix one finding                        | `$codex-security:fix-finding`        | Reproduces or validates one plausible finding, makes a minimal fix when needed, and checks that the vulnerable behavior no longer reproduces. |

For example, to scan a repository:

```text
Use $codex-security:security-scan to scan this repository for security
vulnerabilities. Keep the scan grounded in code evidence, validate plausible
findings where feasible, and return the final report paths. Do not modify code.
```

To review the current change instead:

```text
Use $codex-security:security-diff-scan to review the current branch diff for
security regressions. Keep the review scoped to changed code and directly
supporting files. Do not modify code.
```

## Review the result and fix findings

Repository scans use a staged workflow:

1. **Threat modeling** identifies entry points, trust boundaries, sensitive
   actions, and risky components.
2. **Finding discovery** looks for concrete source-to-sink paths or broken
   controls in the requested scope.
3. **Validation** tests or otherwise verifies plausible findings and records
   evidence or proof gaps.
4. **Attack-path analysis** traces exploitable paths and rates severity for
   findings that survive validation.
5. **Reporting** writes findings, affected locations, validation evidence,
   remediation guidance, and review directives to artifacts.

An ordinary repository scan or a deep scan writes `report.md` and a readable
`report.html` within its scan directory. A diff scan writes a focused Markdown
report. Review affected files, evidence, assumptions, and severity before
starting remediation.

When a finding is actionable, ask for a bounded fix:

```text
Use $codex-security:fix-finding to fix finding [finding ID or report
reference]. Add focused regression coverage, verify legitimate behavior still
works, and show that the original issue no longer reproduces. Do not broaden
the change beyond this finding.
```

## Keep security work authorized and reviewable

Run scans only against repositories, diffs, and systems that you own or that
your organization authorizes you to assess. A finding is an input to review,
not an instruction to merge code or test unrelated targets.

- Keep the first scan read-only unless you explicitly ask Codex to prepare a
  fix.
- Review commands that build, run, or reproduce behavior before approving
  them, especially in unfamiliar repositories.
- Review every proposed patch and validation result before merging it.
- Keep repository instructions and approval policies in place while using the
  plugin. For details, see [Agent approvals and security](https://developers.openai.com/codex/agent-approvals-security).

## Explore security use cases

- [Run a deep security scan](https://developers.openai.com/codex/use-cases/deep-security-scan)
- [Scan code changes for security](https://developers.openai.com/codex/use-cases/scan-code-changes-for-security)
- [Remediate a vulnerability backlog](https://developers.openai.com/codex/use-cases/remediate-vulnerability-backlog)