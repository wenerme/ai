### Attributes

Recipes, `mod` statements, and aliases may be annotated with attributes that
change their behavior.

| Name | Type | Description |
|------|------|-------------|
| `[arg(ARG, help="HELP")]`<sup>1.46.0</sup> | recipe | Print help string `HELP` for `ARG` in usage messages. May be a const expression<sup>1.55.0</sup>. |
| `[arg(ARG, long="LONG")]`<sup>1.46.0</sup> | recipe | Require values of argument `ARG` to be passed as `--LONG` option. If the parameter is variadic, the option is repeatable<sup>1.55.0master</sup>. |
| `[arg(ARG, max="MAX")]`<sup>1.56.0</sup> | recipe | Allow at most `MAX` values to be passed to argument `ARG`. Requires `multiple` or a variadic parameter. |
| `[arg(ARG, min="MIN")]`<sup>1.56.0</sup> | recipe | Require at least `MIN` values to be passed to argument `ARG`. Requires `multiple` or a variadic parameter. |
| `[arg(ARG, pattern="PATTERN")]`<sup>1.45.0</sup> | recipe | Require values of argument `ARG` to match regular expression `PATTERN`. May be a const expression<sup>1.55.0</sup>. |
| `[arg(ARG, short="S")]`<sup>1.46.0</sup> | recipe | Require values of argument `ARG` to be passed as short `-S` option. If the parameter is variadic, the option is repeatable<sup>1.55.0</sup>. |
| `[arg(ARG, value=VALUE)]`<sup>1.46.0</sup> | recipe | Makes option `ARG` a flag which does not take a value. |
| `[cache]`<sup>1.54.0</sup> | recipe | Skip recipe invocations when a matching entry exists in the cache. See [cached recipes](#cached-recipes) for details. Currently unstable. |
| `[confirm(PROMPT)]`<sup>1.23.0</sup> | recipe | Require confirmation prior to executing recipe with a custom prompt. |
| `[confirm]`<sup>1.17.0</sup> | recipe | Require confirmation prior to executing recipe. |
| `[continue(SIGNALS)]`<sup>1.54.0</sup> | recipe | Continue execution normally if a command is interrupted by any of `SIGNALS` and exits successfully. Defaults to `SIGINT`. |
| `[default]`<sup>1.43.0</sup> | recipe | Use recipe as module's default recipe. |
| `[doc(DOC)]`<sup>1.27.0</sup> | module, recipe | Set recipe or module's [documentation comment](#documentation-comments) to `DOC`. May be a const expression<sup>1.56.0</sup>. |
| `[dragonfly]`<sup>1.47.0</sup> | any<sup>1.56.0</sup> | Enable item on DragonFly BSD. |
| `[env(NAME, VALUE)]` <sup>1.47.0</sup> | recipe | Set environment variable `NAME` to `VALUE` for recipe. `NAME` and `VALUE` may be expressions<sup>1.51.0</sup>. |
| `[extension(EXT)]`<sup>1.32.0</sup> | recipe | Set shebang recipe script's file extension to `EXT`. `EXT` should include a period if one is desired. |
| `[exit-message]`<sup>1.39.0</sup> | recipe | Print error message if recipe fails regardless of `set no-exit-message`. |
| `[freebsd]`<sup>1.47.0</sup> | any<sup>1.56.0</sup> | Enable item on FreeBSD. |
| `[group(NAME)]`<sup>1.27.0</sup> | module, recipe | Put recipe or module in [group](#groups) `NAME`. |
| `[android]`<sup>1.50.0</sup> | any<sup>1.56.0</sup> | Enable item on Android. |
| `[linux]`<sup>1.8.0</sup> | any<sup>1.56.0</sup> | Enable item on Linux. |
| `[macos]`<sup>1.8.0</sup> | any<sup>1.56.0</sup> | Enable item on macOS. |
| `[metadata(METADATA)]`<sup>1.42.0</sup> | recipe | Attach `METADATA` to recipe. |
| `[netbsd]`<sup>1.47.0</sup> | any<sup>1.56.0</sup> | Enable item on NetBSD. |
| `[no-cd]`<sup>1.9.0</sup> | recipe | Don't change directory before executing recipe. |
| `[no-exit-message]`<sup>1.7.0</sup> | recipe | Don't print an error message if recipe fails. |
| `[no-quiet]`<sup>1.23.0</sup> | recipe | Override globally quiet recipes and always echo out the recipe. |
| `[openbsd]`<sup>1.38.0</sup> | any<sup>1.56.0</sup> | Enable item on OpenBSD. |
| `[parallel]`<sup>1.42.0</sup> | recipe | Run this recipe's dependencies in parallel. |
| `[positional-arguments]`<sup>1.29.0</sup> | recipe | Turn on [positional arguments](#positional-arguments) for this recipe. |
| `[private]`<sup>1.10.0</sup> | alias, recipe | Make recipe, alias, or variable private. See [Private Recipes](#private-recipes). |
| `[script(COMMAND)]`<sup>1.32.0</sup> | recipe | Execute recipe as a script interpreted by `COMMAND`. See [script recipes](#script-recipes) for more details. |
| `[script]`<sup>1.33.0</sup> | recipe | Execute recipe as script. See [script recipes](#script-recipes) for more details. |
| `[shell]`<sup>1.52.0</sup> | recipe | Execute recipe as a shell recipe, overriding `set default-script`. |
| `[timestamp(FORMAT)]`<sup>master</sup> | recipe | Print command timestamps with format `FORMAT`. `FORMAT` may be an expression. |
| `[timestamp]`<sup>master</sup> | recipe | Print command timestamps. |
| `[unix]`<sup>1.8.0</sup> | any<sup>1.56.0</sup> | Enable item on unixes. (Includes macOS). |
| `[windows]`<sup>1.8.0</sup> | any<sup>1.56.0</sup> | Enable item on Windows. |
| `[working-directory(PATH)]`<sup>1.38.0</sup> | recipe | Set recipe working directory. `PATH` may be an expression<sup>1.51.0</sup> whose value is relative or absolute. If relative, it is interpreted relative to the default working directory. |

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
