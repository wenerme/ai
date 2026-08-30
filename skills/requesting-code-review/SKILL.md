---
name: requesting-code-review
description: Use when completing tasks, implementing major features, reviewing committed or uncommitted changes, or before merging to verify both requirement fidelity and engineering quality.
---

# Requesting Code Review

Review an explicit change surface on two independent axes:

- **Requirements**: Does the implementation faithfully satisfy the originating goal/spec/issue?
- **Engineering**: Is the implementation correct, secure, maintainable, testable, and consistent with repository standards?

Run the axes in separate parallel reviewers so one perspective cannot mask the other. Reviewer output is evidence to verify, not proof by itself.

## 1. Pin The Review Surface

Choose one explicit mode from the user's request and current git state.

### Committed range

```bash
BASE_SHA=$(git rev-parse <base-ref>)
TARGET_SHA=$(git rev-parse <target-ref-or-HEAD>)
git diff --stat "$BASE_SHA"..."$TARGET_SHA"
git diff "$BASE_SHA"..."$TARGET_SHA"
git log --oneline "$BASE_SHA".."$TARGET_SHA"
```

### Current worktree

Use this when the implementation is staged, unstaged, untracked, or combines local edits with commits after a known base:

```bash
BASE_SHA=$(git rev-parse <base-ref-or-HEAD>)
git status --short
git diff --stat "$BASE_SHA" --
git diff "$BASE_SHA" --
git ls-files --others --exclude-standard
```

`git diff "$BASE_SHA"` includes staged and unstaged tracked changes relative to the base. Read relevant untracked files explicitly because Git diff omits them. If the user asks for staged-only review, use `git diff --cached` and exclude unstaged/untracked content from the declared surface.

If the user did not specify a base, infer it only when task start/branch/upstream facts make it unambiguous. For a purely dirty current task, `HEAD` is the normal base. Stop if a required ref does not resolve or the declared surface is empty.

Completion criterion: mode, base, target (`SHA`, `WORKTREE`, or `INDEX`), status/inventory, and exact reproducible diff commands are recorded.

## 2. Establish Evidence Sources

Requirements source priority:

1. User-provided goal/spec/issue/acceptance criteria.
2. Issue or PR referenced by branch/commit history.
3. Repo-local plan/spec under `docs/`, `project/`, `.agents/`, or `.scratch/`.
4. If none exists, mark the Requirements axis `not available`; do not invent a spec.

Engineering source priority:

1. Applicable `AGENTS.md` / `CLAUDE.md` and repo-local skills.
2. `CONTRIBUTING.md`, coding standards, architecture docs, ADRs.
3. Existing patterns and tests around the changed boundary.
4. General correctness, security, reliability, compatibility, performance, operability, and maintainability principles.

Completion criterion: each axis has a concrete source list or an explicit skip reason.

## 3. Dispatch Two Reviewers In Parallel

Read [code-reviewer.md](code-reviewer.md), fill its placeholders, and dispatch two `general-purpose` reviewers in one parallel batch:

- Requirements reviewer: use the Requirements template only.
- Engineering reviewer: use the Engineering template only.

Both reviewers are read-only. Give each the review mode, base/target, status or commit list, exact diff commands, relevant untracked paths, source paths/content, project constraints, and output format. Do not pass the parent conversation history as a substitute for a brief.

When the reviewer uses worktree isolation, all repository commands must run in the worktree assigned by the Agent harness. Do not direct the reviewer to `cd` into an existing primary checkout or provide that checkout as the operational target. Explicitly prohibit mutating Git commands (`checkout`, `switch`, `reset`, `restore`, `apply`, `commit`, `rebase`, `merge`); committed-range review needs only `git diff`, `git show`, `git log`, and file reads. Worktree isolation does not prevent a reviewer from manually escaping to an absolute path.

If no subagent tool exists, run the two passes sequentially with fresh, explicitly separated review contexts; do not merge the checklists into one pass.

Completion criterion: both reports exist, or the Requirements report has an explicit `not available` status; every finding is inside the declared surface and cites a file/hunk plus its governing requirement/standard or concrete behavioral risk.

## 4. Aggregate Without Masking

Present separate sections:

```markdown
## Requirements

## Engineering

## Verification Gaps

## Verdict
```

Do not merge or rerank the two axes. Report Critical/Important/Minor counts per axis and the worst issue in each. A pass on one axis cannot cancel a failure on the other.

Verdict:

- `approve`: no Critical/Important findings and required verification evidence exists.
- `request_changes`: fixable Critical/Important findings remain.
- `block`: requirements are ambiguous at behavior/safety boundaries, required evidence is unavailable, or review range is invalid.

## 5. Close Findings

- Verify each finding against source before changing code.
- Fix valid Critical findings immediately.
- Fix valid Important findings before merge or record explicit owner-approved acceptance.
- Minor findings may become follow-ups when they are genuinely non-blocking.
- Re-run affected checks and the relevant review axis after fixes.

Completion criterion: every Critical/Important finding is fixed, rejected with evidence, or explicitly accepted by the authorized owner; final verdict reflects the verified state.

## Use Boundaries

Request review:

- after a coherent implementation milestone;
- after a complex bug fix;
- before merging;
- before a risky refactor when a baseline review is useful.

Keep reviews proportional. A small isolated change still needs both axes, but each pass can be short. Do not force a review after every trivial edit when no coherent diff boundary exists.
