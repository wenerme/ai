# Demo recordings

Terminal demos in this repository are generated from [VHS](https://github.com/charmbracelet/vhs)
tape files. A tape is a plain-text script that drives a virtual terminal and
produces a deterministic GIF. When you store tapes in the repo, anyone with VHS installed can review the recordings, compare changes between versions, and reproduce them locally.

## Install VHS

```shell
# macOS
brew install vhs

# Other platforms: https://github.com/charmbracelet/vhs#installation
```

VHS also requires `ttyd` and `ffmpeg`. Homebrew installs both as dependencies.

## Run an existing tape

Run tapes from this directory:

```shell
cd docs/demos
vhs getting-started.tape
```

Each tape stages its own working directory in a hidden setup block, so `glab`
picks up a project from a `git` remote no matter where you launch VHS from.
Output paths in tape files are relative to this directory.

## Shared styling

All tapes begin with `Source base.tape`, which pulls in the canonical terminal
settings: dimensions, theme, typography, frame, and window bar. To change the
look across every demo at once, edit `base.tape`. In a per-tape file, include
only:

- The `Source base.tape` line.
- An `Output` directive for that tape's GIF.
- A `Hide` ... `Show` block that stages the working directory and prompt.
- The script itself.

`base.tape` is a partial. It contains only `Set` directives. Do not run it
directly with `vhs`.

## Authentication

Tapes invoke `glab` against the live GitLab API, so you need to pass a valid
token through the environment when you run `vhs`:

```shell
GITLAB_TOKEN="<your-personal-access-token>" vhs getting-started.tape
```

`glab` reads `GITLAB_TOKEN` before the keyring and config file, and VHS
inherits its parent's environment, so the token reaches every command in the
tape. To target a non-`gitlab.com` instance, set `GITLAB_HOST` the same way.

Notes on token usage:

- The token needs only the `read_api` scope. When a tape clones over SSH,
  `git` uses your SSH key, and the token isn't consulted for that step.
- Don't bake tokens into tape files. Always pass tokens through the
  environment at recording time.
- When your interactive shell wraps `glab` in an alias (for example,
  `alias glab='op plugin run -- glab'`), the bash session that VHS spawns
  might not inherit the alias, depending on your `.bashrc`. The bundled
  tapes defensively run `unalias glab` in their hidden setup block so they
  always exercise the binary on `PATH`. Do the same in new tapes.

## Add a new tape

`getting-started.tape` is the reference example. Use it as the starting
point for new tapes.

1. Create a new `docs/demos/<name>.tape` file.
1. Copy the contents of `getting-started.tape` to your new file. Keep the
   `Source`, `Output`, and `Hide`...`Show` blocks. You'll edit them in
   the next two steps.
1. Update the header comment and the `Output` path for your demo.
1. Update the `Output` path to point to your new GIF.
1. Replace the script section (everything after the `Show` directive)
   with the commands you want to record.
1. Run  `vhs <name>.tape` to generate the GIF.
1. Commit the `.tape` file and the generated GIF together.

### Guidelines for tape content

When you write the script, follow these conventions:

- Prefer flags that bound output, such as `--per-page` and `--limit`,
  instead of relying on the default config. The recording should look
  the same on any machine.
- To time a long-running command, use `Wait+Screen /regex/` instead of
  `Sleep` so the recording adapts to network latency.

## Current tapes

| Tape                   | Output                              | Used in |
|------------------------|-------------------------------------|---------|
| `base.tape`            | _(partial, sourced by other tapes)_ | All demos |
| `getting-started.tape` | `../source/img/getting-started.gif` | `README.md`, `docs/source/_index.md` |
