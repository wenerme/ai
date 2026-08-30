---
name: glab-cli
description: "Use when interacting with GitLab via the glab CLI: creating/reviewing merge requests, managing issues, monitoring CI/CD pipelines, making API calls, or performing any GitLab operation from the terminal. Triggers on glab, gitlab cli, merge request, MR create, pipeline status, ci lint."
---

# GitLab CLI (glab)

## Rules

- ALWAYS verify auth before first command: `glab auth status`
- ALWAYS use `-R owner/repo` when not inside the target git repo
- For self-hosted GitLab, set `GITLAB_HOST` in the command environment when this installed `glab` does not support a global `--hostname` flag. Check `glab <command> --help` before using `--hostname`; some versions accept `--hostname` for auth but not for MR commands.
- Use `--output=json` when parsing output programmatically
- NEVER hardcode tokens in commands — use `glab auth login` or `GITLAB_TOKEN` env var
- Pagination params go in URL, not flags: `glab api "projects/:id/jobs?per_page=100"` (NOT `--per-page`)
- When creating MRs, ALWAYS add `--remove-source-branch --squash-before-merge` unless the user explicitly says otherwise.
- Some `glab` versions do not support `--hostname` on MR commands. For self-hosted GitLab operations, prefer running inside the target repo with the correct remote, or set `GITLAB_HOST=<host>` and use `-R owner/repo`.

## Auth

```bash
glab auth login                                    # Interactive
glab auth login --hostname gitlab.example.org      # Self-hosted
glab auth status                                   # Verify
```

## MR Workflow

```bash
git push -u origin feature-branch
GITLAB_HOST=gitlab.paigod.work glab mr create -R owner/repo \
  --source-branch feature-branch --target-branch main \
  --title "Fix bug" --description "Closes #123" \
  --remove-source-branch --squash-before-merge --yes
GITLAB_HOST=gitlab.paigod.work glab mr view 42 -R owner/repo --output=json
glab mr list --reviewer=@me                        # MRs to review
glab mr checkout 42                                # Test locally
glab mr approve 42
glab mr merge 42 --remove-source-branch
```

Notes:
- Some `glab` versions do not have `--description-file` on `mr create`; use `--description "$(cat /tmp/body.md)"` if help confirms only `--description` is available.
- After creating an MR, verify `web_url`, `head_pipeline.status`, conflicts, squash, and source-branch removal settings with `glab mr view --output=json`.

## Issue Workflow

```bash
glab issue create --title "Bug" --label=bug --assignee=@me
glab issue list --assignee=@me
glab issue close 123 -m "Fixed in MR !42"
```

## CI/CD

```bash
glab ci status                    # Current pipeline status
glab ci status --live             # Watch until pipeline completes
glab pipeline ci view             # Watch pipeline (interactive)
glab ci trace                     # View job logs
glab ci lint                      # Validate .gitlab-ci.yml
glab ci run                       # Trigger pipeline
glab ci retry                     # Retry failed pipeline
```

**Wait for pipeline in scripts** (glab has no built-in blocking wait):

```bash
while true; do
  status=$(glab api "projects/:id/pipelines?ref=$(git branch --show-current)&per_page=1" \
    | jq -r '.[0].status')
  case "$status" in
    success) echo "Pipeline passed"; break ;;
    failed|canceled) echo "Pipeline $status"; exit 1 ;;
    *) echo "Status: $status, waiting..."; sleep 15 ;;
  esac
done
```

**Auto-merge when pipeline succeeds:**

```bash
glab mr merge <MR_ID> --when-pipeline-succeeds
```

## API

```bash
glab api projects/:id/merge_requests
glab api --paginate "projects/:id/pipelines/123/jobs?per_page=100"
glab api --method POST projects/:id/issues --field title="Bug"
```

## Quick Fixes

| Error | Fix |
|-------|-----|
| `401 Unauthorized` | `glab auth login` |
| `404 Project Not Found` | Check repo name + access permissions |
| `not a git repository` | `cd` to repo or use `-R owner/repo` |
| `source branch already has MR` | `glab mr list` to find existing |
| Multiple config files found and the first config lacks the self-hosted token | Retry with `GLAB_CONFIG_DIR='<authenticated-config-dir>' GITLAB_HOST=<host> glab auth status`; do not read or print token files just to diagnose config precedence. |
| Direct local `glab` returns `EOF`/timeout for self-hosted GitLab but another trusted host can reach it | Do not conclude MR is impossible. Push using SSH ProxyCommand through the reachable host when appropriate, or run GitLab REST API/glab from that host. Still verify MR URL, pipeline, mergeability, and discussions before marking complete. |

## References

- [references/commands.md](references/commands.md) — Full command reference (MR, Issue, CI/CD, Repo, API, Labels, Releases, Variables, etc.)
- [references/pipeline-debug.md](references/pipeline-debug.md) — Pipeline 排查流程、Job 日志、重试/取消、Artifacts、批量清理
- [references/config.md](references/config.md) — 认证管理、多实例、环境变量、配置文件、Shell 补全、Aliases
- [references/troubleshooting.md](references/troubleshooting.md) — Auth, network, SSL, config 常见错误和解决方案
