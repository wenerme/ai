> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Where Ori writes files

> Find the files and directories that Ori creates during a run

Ori can write files in the workspace, in your home directory, and in the
system temporary directory. The exact files depend on the command you run.

## Workspace files

When you run Ori from a project, it creates `.ori/` inside the current
workspace:

```text theme={null}
<cwd>/.ori/
```

The `.ori/logs/` directory contains event logs and session transcripts. These
files can include repository content and prompt text. Treat them as private
data.

Add `.ori/` to your repository's `.gitignore`. This keeps private logs and
transcripts out of Git.

You can delete old logs and other workspace cache files when you do not need
them. Do not delete files that you are using for an active run.

## Global files

Ori uses this directory for data shared by commands and workspaces:

```text theme={null}
~/.ori/
```

It can contain downloaded templates, installed dependencies, caches,
`config.json`, and `telemetry.json`. Templates, dependencies, and caches can be
deleted when you want Ori to download them again. Keep `config.json` if you
want to keep your settings. Delete `telemetry.json` only if you do not need
the local telemetry state.

## Eval scratch files

Eval commands can create temporary workspaces under the system temporary
directory. Common names include:

```text theme={null}
$TMPDIR/ori-eval-scratch-*
$TMPDIR/ori-eval-results-*
$TMPDIR/ori-eval-sdk-*
```

These directories hold eval files, exported data, reports, and installed
dependencies. They are throwaway workspaces. You can delete them after the
eval finishes.

The `create-eval` workflow also keeps a run tracker at a path like:

```text theme={null}
/tmp/ori-create-eval-<hash>/
```

The tracker stores the prompt, step progress, answers, and error logs so a
workflow can continue. Delete it after the workflow finishes and you no
longer need its record. If a workflow is active, do not delete its tracker.
