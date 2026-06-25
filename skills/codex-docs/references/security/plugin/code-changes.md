# Review code changes for security

Use a security change review when you need evidence about regressions introduced
by one Git-backed change set. The workflow reviews every changed source-like
file and directly supporting code without turning the task into a general
repository audit.

If you want to scan a full repository instead of a specific change, see [Run a
security scan](https://developers.openai.com/codex/security/plugin/scans).

## Run a manual review

For uncommitted changes, send:

```text
Use $codex-security:security-diff-scan to review my current uncommitted changes for security regressions.
```

For a commit or branch range, identify both ends when needed:

```text
Use $codex-security:security-diff-scan to review the changes from origin/main to HEAD for security regressions. Focus on authentication, authorization, input handling, filesystem access, network requests, and secrets.
```

You can also name a pull request when its base and head revisions are available
in the local checkout.

## Confirm the change in setup

<WorkflowSteps>

1. Confirm **Scan type** is `Changes`.
2. Confirm the checked-out **Codebase**, **Current branch**, and **Last commit**.
3. Under **Changes to review**, choose:
   - `Uncommitted changes` for the current working tree.
   - The latest commit for a single-commit review.
   - A base and head revision for a branch or pull-request range.
4. Confirm that the summary describes the change you intended to review.
5. Select **Start scan**.

</WorkflowSteps>

The workflow doesn't check out another branch or change the selected working
tree. If a requested revision isn't available locally, fetch it before the
review or provide a locally available base and head.

## Act on findings

After reviewing the results, [fix and verify an accepted
finding](https://developers.openai.com/codex/security/plugin/fix-findings) or [export and track
findings](https://developers.openai.com/codex/security/plugin/export-findings).

## Automate reviews in CI/CD

Run the same `$codex-security:security-diff-scan` skill from CI when the runner
can invoke the Codex CLI without interaction. The runner must already have
Codex Security installed in the `CODEX_HOME` used by `codex exec`. A fresh
runner doesn't have marketplace plugins installed by default, and
`openai/codex-action` doesn't install the plugin.

Before running the scan:

1. Provision Codex Security in the runner's `CODEX_HOME`.
2. Check out the exact base and head revisions with their Git history.
3. Set the runner's platform temporary directory, such as `TMPDIR`, to a
   writable artifact location. The diff-scan workflow reviews the checkout
   without changing it, but it writes its sealed scan bundle and final report
   outside the repository.
4. Start with advisory results. Review scan quality and runtime before making
   the job a required check.

Then invoke the plugin explicitly:

```bash
export CODEX_HOME=/path/to/provisioned-codex-home
export TMPDIR=/path/to/writable/temp

codex exec \
  --sandbox workspace-write \
  --output-last-message "$TMPDIR/codex-security-review.md" \
  'Use $codex-security:security-diff-scan to review changes from <base-revision> to <head-revision> for security regressions. Do not modify the checkout. Return the final report path, findings summary, reviewed surfaces, deferred coverage, and open questions.'
```

Archive the generated scan bundle and final report, then publish the Markdown
summary through your CI/CD system. If you use `openai/codex-action`, point its
`codex-home` input at the same provisioned directory and pass the skill prompt
above. The action can install and run the Codex CLI, but plugin provisioning is
a separate prerequisite.

For API-key handling, sandbox controls, fork protections, and a GitHub Actions
workflow, see the [Codex GitHub Action guide](https://developers.openai.com/codex/github-action).