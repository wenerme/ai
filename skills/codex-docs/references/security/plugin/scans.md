# Run a Codex Security scan

Use a Codex Security scan for your first review and for most routine repository
or component assessments. It runs the complete scan workflow once.

Once you're satisfied with the results, run a [deep scan](https://developers.openai.com/codex/security/plugin/deep-scans)
for a more comprehensive assessment. Deep scans take longer, but they're more
thorough.

## Choose the scan area

Scan the whole repository when you need broad coverage and the repository is a
reasonable review unit:

```text
Use $codex-security:security-scan to scan this repository for security vulnerabilities.
```

Scan a folder when a monorepo is too large or one service, package, or component
has a clear owner and security boundary:

```text
Use $codex-security:security-scan to scan this repository for security vulnerabilities, focusing on the services/billing component.
```

For a large monorepo, start with one meaningful product or service boundary.

## Configure the scan

<WorkflowSteps>

1. Confirm **Scan type** is `Codebase` and leave **Deep scan** off.
2. Confirm the **Codebase**, **Current branch**, and **Last commit**.
3. Set **Scan area** to `Entire codebase` or enter one repository-relative
   folder.
4. Add threat-model guidance only when it changes the review. Useful guidance
   names attacker-controlled inputs, trust boundaries, sensitive actions, or a
   specific area to prioritize.
5. Select **Start scan**.

</WorkflowSteps>

For persistent repository security guidance, add a `SECURITY.md` at the
repository root. Use it to describe the threat model, security invariants,
reportable finding criteria, exclusions, and severity context. For
directory-specific guidance, add nested `SECURITY.md` files. When policies
conflict, the file closest to the code takes precedence. Codex Security treats
this content as policy context, not executable instructions.

Use `AGENTS.md` for supported build and validation commands and other
repository-specific instructions.

## Let the phases complete

A scan runs these phases in order:

1. **Threat modeling** identifies assets, entry points, trust boundaries, and
   security invariants.
2. **Finding discovery** reviews the requested code for plausible broken
   controls and source-to-sink paths.
3. **Validation** tests or otherwise checks each candidate and records evidence
   or proof gaps.
4. **Attack-path analysis** evaluates realistic reachability, impact, and
   severity.
5. **Finalization** validates the structured scan contract and generates
   `report.md`.

Codex reports phase and coverage progress as the scan runs. Don't judge the
result from early candidates or stop the scan because one phase takes longer
than another.

## Review the completed scan

Review the result in this order:

1. Confirm the target, revision, and scan area.
2. Read reviewed surfaces and every explicit deferred or follow-up area.
3. For each finding, inspect the root control or sink, attacker-controlled
   input, validation method, remaining uncertainty, realistic reachability,
   severity rationale, and proposed remediation.
4. Dismiss findings whose evidence doesn't support the claimed path or impact.
5. Select one accepted finding before starting a fix.

<div className="not-prose my-8 grid gap-6">
  <figure>
    <div className="overflow-hidden rounded-xl border border-subtle bg-surface">
      <img
        src={findingsWorkspace.src}
        alt="Completed Codex Security findings workspace for OWASP Juice Shop"
        className="block h-auto w-full"
      />
    </div>
    <figcaption className="mt-3 text-sm text-secondary">
      The completed workspace summarizes scan status, coverage, severity, and
      artifacts before listing the findings.
    </figcaption>
  </figure>

  <figure>
    <div className="overflow-hidden rounded-xl border border-subtle bg-surface">
      <img
        src={findingAttackPath.src}
        alt="Codex Security finding evidence and attack-path analysis for OWASP Juice Shop"
        className="block h-auto w-full"
      />
    </div>
    <figcaption className="mt-3 text-sm text-secondary">
      A finding connects the relevant source to its entry point, reachability,
      likelihood, impact, and any limits or counterevidence.
    </figcaption>
  </figure>
</div>

## Use the results

Use the findings workspace for normal review. It presents findings, coverage,
and follow-up areas without requiring you to inspect raw JSON. Open `report.md`
when you need a complete portable review for sharing or archiving.

Behind the workspace, each scan preserves `scan-manifest.json`, `findings.json`,
and `coverage.json` for automation and integrations. You normally don't need to
open these files yourself.

The findings workspace can also create portable JSON, CSV, and SARIF files. See
[Export or track findings](https://developers.openai.com/codex/security/plugin/export-findings).

## Next step

After a person accepts a finding, use [Fix and verify a finding](https://developers.openai.com/codex/security/plugin/fix-findings)
to generate and review one bounded patch. Don't ask Codex to fix every finding
from a scan in one task.