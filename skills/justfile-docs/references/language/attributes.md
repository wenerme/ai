### Attributes

Recipes, `mod` statements, and aliases may be annotated with attributes that
change their behavior.

| Name | Type | Description |
|------|------|-------------|
| `[arg(ARG, help="HELP")]`<sup>1.46.0</sup> | recipe | Print help string `HELP` for `ARG` in usage messages. |
| `[arg(ARG, long="LONG")]`<sup>1.46.0</sup> | recipe | Require values of argument `ARG` to be passed as `--LONG` option. |
| `[arg(ARG, pattern="PATTERN")]`<sup>1.45.0</sup> | recipe | Require values of argument `ARG` to match regular expression `PATTERN`. |
| `[arg(ARG, short="S")]`<sup>1.46.0</sup> | recipe | Require values of argument `ARG` to be passed as short `-S` option. |
| `[arg(ARG, value="VALUE")]`<sup>1.46.0</sup> | recipe | Makes option `ARG` a flag which does not take a value. |
| `[confirm(PROMPT)]`<sup>1.23.0</sup> | recipe | Require confirmation prior to executing recipe with a custom prompt. |
| `[confirm]`<sup>1.17.0</sup> | recipe | Require confirmation prior to executing recipe. |
| `[default]`<sup>1.43.0</sup> | recipe | Use recipe as module's default recipe. |
| `[doc(DOC)]`<sup>1.27.0</sup> | module, recipe | Set recipe or module's [documentation comment](#documentation-comments) to `DOC`. |
| `[dragonfly]`<sup>1.47.0</sup> | recipe | Enable recipe on DragonFly BSD. |
| `[env(ENV_VAR, VALUE)]` <sup>1.47.0</sup> | recipe | Set environment variables for recipe. |
| `[extension(EXT)]`<sup>1.32.0</sup> | recipe | Set shebang recipe script's file extension to `EXT`. `EXT` should include a period if one is desired. |
| `[exit-message]`<sup>1.39.0</sup> | recipe | Print error message if recipe fails regardless of `set no-exit-message`. |
| `[freebsd]`<sup>1.47.0</sup> | recipe | Enable recipe on FreeBSD. |
| `[group(NAME)]`<sup>1.27.0</sup> | module, recipe | Put recipe or module in [group](#groups) `NAME`. |
| `[linux]`<sup>1.8.0</sup> | recipe | Enable recipe on Linux. |
| `[macos]`<sup>1.8.0</sup> | recipe | Enable recipe on MacOS. |
| `[metadata(METADATA)]`<sup>1.42.0</sup> | recipe | Attach `METADATA` to recipe. |
| `[netbsd]`<sup>1.47.0</sup> | recipe | Enable recipe on NetBSD. |
| `[no-cd]`<sup>1.9.0</sup> | recipe | Don't change directory before executing recipe. |
| `[no-exit-message]`<sup>1.7.0</sup> | recipe | Don't print an error message if recipe fails. |
| `[no-quiet]`<sup>1.23.0</sup> | recipe | Override globally quiet recipes and always echo out the recipe. |
| `[openbsd]`<sup>1.38.0</sup> | recipe | Enable recipe on OpenBSD. |
| `[parallel]`<sup>1.42.0</sup> | recipe | Run this recipe's dependencies in parallel. |
| `[positional-arguments]`<sup>1.29.0</sup> | recipe | Turn on [positional arguments](#positional-arguments) for this recipe. |
| `[private]`<sup>1.10.0</sup> | alias, recipe | Make recipe, alias, or variable private. See [Private Recipes](#private-recipes). |
| `[script(COMMAND)]`<sup>1.32.0</sup> | recipe | Execute recipe as a script interpreted by `COMMAND`. See [script recipes](#script-recipes) for more details. |
| `[script]`<sup>1.33.0</sup> | recipe | Execute recipe as script. See [script recipes](#script-recipes) for more details. |
| `[unix]`<sup>1.8.0</sup> | recipe | Enable recipe on Unixes. (Includes MacOS). |
| `[windows]`<sup>1.8.0</sup> | recipe | Enable recipe on Windows. |
| `[working-directory(PATH)]`<sup>1.38.0</sup> | recipe | Set recipe working directory. `PATH` may be relative or absolute. If relative, it is interpreted relative to the default working directory. |

A recipe can have multiple attributes, either on multiple lines:

```just
[no-cd]
[private]
foo:
    echo "foo"
```

Or separated by commas on a single line<sup>1.14.0</sup>:

```just
[no-cd, private]
foo:
    echo "foo"
```

Attributes with a single argument may be written with a colon:

```just
[group: 'bar']
foo:
```

#### Enabling and Disabling Recipes

The `[linux]`, `[macos]`, `[unix]`, and `[windows]` attributes<sup>1.8.0</sup>
are configuration attributes. By default, recipes are always enabled. A recipe
with one or more configuration attributes will only be enabled when one or more
of those configurations is active.

This can be used to write `justfile`s that behave differently depending on
which operating system they run on. The `run` recipe in this `justfile` will
compile and run `main.c`, using a different C compiler and using the correct
output binary name for that compiler depending on the operating system:

```just
[unix]
run:
  cc main.c
  ./a.out

[windows]
run:
  cl main.c
  main.exe
```

#### Disabling Changing Directory

`just` normally executes recipes with the current directory set to the
directory that contains the `justfile`. This can be disabled using the
`[no-cd]` attribute<sup>1.9.0</sup>. This can be used to create recipes which
use paths relative to the invocation directory, or which operate on the current
directory.

For example, this `commit` recipe:

```just
[no-cd]
commit file:
  git add {{file}}
  git commit
```

Can be used with paths that are relative to the current directory, because
`[no-cd]` prevents `just` from changing the current directory when executing
`commit`.

#### Requiring Confirmation for Recipes

`just` normally executes all recipes unless there is an error. The `[confirm]`
attribute<sup>1.17.0</sup> allows recipes require confirmation in the terminal
prior to running. This can be overridden by passing `--yes` to `just`, which
will automatically confirm any recipes marked by this attribute.

Recipes dependent on a recipe that requires confirmation will not be run if the
relied upon recipe is not confirmed, as well as recipes passed after any recipe
that requires confirmation.

```just
[confirm]
delete-all:
  rm -rf *
```

#### Custom Confirmation Prompt

The default confirmation prompt can be overridden with
`[confirm(PROMPT)]`<sup>1.23.0</sup>:

```just
[confirm("Are you sure you want to delete everything?")]
delete-everything:
  rm -rf *
```

The confirmation prompt may also be an expression<sup>1.49.0</sup> which may
reference assignments or recipe arguments:

```just
[confirm("Deploy to " + env + "?")]
deploy env:
  echo 'Deploying to {{env}}...'
```

#### Metadata

Metadata in the form of lists of strings may be attached to recipes with the
`[metadata(METADATA)]` attribute<sup>1.42.0</sup>:

```just
[metadata("hello", "goodbye")]
foo:
```

Metadata can be read using `just --dump --dump-format json`.
