---
name: QA your app with Computer Use
tagline: Click through real product flows and log what breaks.
summary: Use Computer Use to exercise key flows, catch issues, and finish with a
  bug report.
bestFor:
  - Teams validating real user flows before a release
  - QA loops that should end with severity, repro steps, and a short triage
    summary
starterPrompt:
  title: Run a Structured QA Pass
  body: |-
    @Computer Test my app in [environment].

    Test these flows:
    - [hero use case 1]
    - [hero use case 2]
    - [hero use case 3]

    For every bug you find, include:
    - repro steps
    - expected result
    - actual result
    - severity

    Keep going past non-blocking issues and end with a short triage summary.
relatedLinks:
  - label: Computer Use
    url: /codex/app/computer-use
  - label: Codex skills
    url: /codex/skills
---

## Introduction

Computer Use is a strong fit for QA passes because it can see the interface, click through flows, type into fields, and record what fails. That makes it useful for catching both functional bugs and UI issues across realistic user journeys.

The key is to tell Codex what environment to test, which flows matter most, and what kind of report you want back.

## How to use

1. Install the [Computer Use plugin](https://developers.openai.com/codex/app/computer-use).
2. Tell Codex which app, build, or environment to test.
3. Name the flows or hero use cases you care about most.
4. Ask for a structured report so the output is easy to triage or hand off.

You can keep this broad:

- `@Computer Test my app. Find any major issues and give me a report.`

Or make it more explicit:

- `@Computer Test my app in staging. Cover signup, invite a teammate, and upgrade billing. Log every bug with repro steps, expected result, actual result, and severity.`

If you already maintain a test-plan file in the repo, attach it to the thread or point Codex at it so the QA pass follows your existing flows.

## Practical tips

### Be explicit about setup

If account state, test data, feature flags, or environment choice affect the flow, include that up front. Codex will produce much better results when it knows whether it is testing local, staging, or production-like behavior.

### Name the issue types you care about

Call out whether you want Codex to focus on broken functionality, layout issues, confusing copy, visual regressions, or all of the above.

### Decide whether to stop or continue

If one blocking issue should end the run, say so. Otherwise, tell Codex to continue through the rest of the flow and collect all non-blocking issues before it summarizes.

## Good follow-ups

After the QA pass, keep the same thread open and ask Codex to fix one of the bugs it found, turn the findings into Linear or GitHub-ready drafts, or narrow the next pass to one specific failing flow.

## Suggested prompt

**Run a Structured QA Pass**