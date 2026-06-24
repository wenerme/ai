---
name: Audit dependency incidents
tagline: Turn a public package advisory into a safe repo-audit plan.
summary: Use Codex to turn a public package or supply chain advisory into a
  read-only audit, then inspect manifests, lock files, CI workflows, and scripts
  without running untrusted code.
skills:
  - token: github
    url: /codex/integrations/github
    description: Inspect repository files, pull requests, workflows, and
      security-relevant history.
bestFor:
  - Engineering and security teams responding to public package or supply chain
    advisories.
  - Maintainers who need to check lock files, scripts, CI permissions, and
    caches before changing dependencies.
  - Incident reviews where Codex should gather evidence without installing
    packages or running untrusted code.
starterPrompt:
  title: Build the Incident Audit
  body: >-
    Help me audit this repository for exposure to this public package advisory:
    [advisory URL].


    Stay read-only unless I explicitly approve a remediation step.


    First, summarize:

    - affected packages and version ranges

    - authoritative sources versus broader reports

    - what evidence would prove exposure in this repo

    - what evidence would rule it out


    Then inspect:

    - package manifests and lock files

    - CI workflows and permissions

    - install, build, and postinstall scripts

    - vendored artifacts, containers, or generated bundles if relevant

    - cache or token exposure paths if the advisory involves CI or publishing


    Return:

    - evidence status: confirmed exposure, needs verification, or ruled out

    - severity and blast-radius notes

    - file references for every repo-specific claim

    - caveats and recommended next steps


    Do not install packages, run lifecycle scripts, build the project, execute
    untrusted code, rotate credentials, or clean up files unless I explicitly
    approve that step.
  suggestedEffort: high
relatedLinks:
  - label: Codex Security
    url: /codex/security
  - label: Agent approvals and security
    url: /codex/agent-approvals-security
  - label: Codex cyber safety
    url: /codex/concepts/cyber-safety
---

## Start with a safe audit plan

When a dependency or supply chain incident moves quickly, the first useful output isn't a rushed patch. It's a clear audit plan: what changed, which packages or workflows might be affected, and what evidence would prove exposure in your repo.

Use Codex to turn the advisory into a conservative, read-only checklist before installing, building, testing, or running anything.

## Keep the first pass read-only



1. Give Codex the public advisory, incident report, or affected package list.
2. Ask it to separate authoritative sources from broader commentary.
3. Have it define evidence that would prove or rule out exposure.
4. Let it inspect manifests, lock files, CI workflows, scripts, and relevant repo files.
5. Ask for findings grouped by evidence status, severity, and recommended next step.



For package incidents, avoid running install, build, test, import, or lifecycle commands until you know what the advisory affects. Codex can search lock files and workflows without executing untrusted code.

## Report evidence status separately from severity

A useful audit result should show both how bad a finding would be and how strong the evidence is:



<p>
    <strong>Confirmed exposure:</strong> the lockfile contains an affected
    package version in a production dependency path.
  </p>
  <p>
    <strong>Needs verification:</strong> one CI job has publish permissions, but
    the workflow does not appear to install the affected package directly.
  </p>
  <p>
    <strong>Ruled out:</strong> the package name appears in docs only and is not
    present in manifests or lock files.
  </p>
  <p>
    <strong>Next step:</strong> review the proposed dependency update and token
    rotation plan before any destructive action.
  </p>



Once the read-only pass is complete, you can ask Codex to prepare a remediation PR, update CI permissions, or write a follow-up incident note. Keep those actions separate from the initial audit.