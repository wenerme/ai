### Integrating with `mise`

[`mise`](https://mise.jdx.dev/) is a tool for installing development tools,
managing the environment, and running tasks.

`just` and `mise` work well together, with `just` defining and running tasks
and `mise` installing and managing development tools.

To load the `mise` environment within `just`:

```just
set dotenv-command := 'mise env'
set dotenv-override

test:
  node --version
  echo $FOO
```

The environment is loaded once, when `just` starts, and is available in all
recipes. `set dotenv-override` is required, since `mise env` returns a value
for the `PATH` variable, which is always already set.

`mise` will interactively prompt and ask if `mise.toml` should be trusted. In
non-interactive environments, `mise trust` should be run first.

`mise env` does not install missing tools, so run `mise install` first, or
install missing tools automatically with:

```just
set dotenv-command := 'mise install -q && mise env'
```

Tool versions can be overridden for the entire justfile:

```just
set dotenv-command := 'mise env node@22'
```

Or for individual recipes:

```just
[script('mise', 'exec', 'node@22', '--', 'node')]
version:
  console.log(process.version);

[script('mise', 'exec', 'python@3.13', '--', 'sh', '-eu')]
test:
  python -m pytest
```

Alternatively, `set shell` can be used to run every line of every shell recipe
with `mise exec`:

```just
set shell := ['mise', 'exec', '--', 'sh', '-cu']

test:
  node --version
```

And the `[env]` attribute can be used to override tool versions on a per-recipe
basis:

```just
set shell := ['mise', 'exec', '--', 'sh', '-cu']

[env('MISE_NODE_VERSION', '22')]
test:
  node --version
```

Note that `mise exec` takes longer to run than `sh`, so `set shell` may make
shell recipes with many commands noticeably slower.
