### Modules

A `justfile` can declare modules using `mod` statements<sup>1.19.0</sup>.

`mod` statements were stabilized in `just`<sup>1.31.0</sup>.

If you have the following `justfile`:

```justfile
mod bar

a:
  @echo A
```

And the following text in `bar.just`:

```just
b:
  @echo B
```

`bar.just` will be included in `justfile` as a submodule. Recipes, aliases, and
variables defined in one submodule cannot be used in another, and each module
uses its own settings.

Recipes in submodules can be invoked as subcommands:

```console
$ just bar b
B
```

Or with path syntax:

```console
$ just bar::b
B
```

If a module is named `foo`, `just` will search for the module file in `foo.just`,
`foo/mod.just`, `foo/justfile`, and `foo/.justfile`. In the latter two cases,
the module file may have any capitalization.

Module statements may be of the form:

```justfile
mod foo 'PATH'
```

Which loads the module's source file from `PATH`, instead of from the usual
locations. A leading `~/` in `PATH` is replaced with the current user's home
directory. `PATH` may point to the module source file itself, or to a directory
containing the module source file with the name `mod.just`, `justfile`, or
`.justfile`. In the latter two cases, the module file may have any
capitalization.

Environment files are loaded for each module, respecting that module's related
settings. Environment variables from parent modules are visible in child
modules.

Recipes in submodules without the `[no-cd]` attribute run with the working
directory set to the directory containing the submodule source file.

`justfile()` and `justfile_directory()` always return the path to the root
justfile and the directory that contains it, even when called from submodule
recipes.

Modules may be made optional by putting a `?` after the `mod` keyword:

```just
mod? foo
```

Missing source files for optional modules do not produce an error.

Optional modules with no source file do not conflict, so you can have multiple
mod statements with the same name, but with different source file paths, as
long as at most one source file exists:

```just
mod? foo 'bar.just'
mod? foo 'baz.just'
```

Modules may be given doc comments which appear in `--list`
output<sup>1.30.0</sup>:

```justfile
# foo is a great module!
mod foo
```

```console
$ just --list
Available recipes:
    foo ... # foo is a great module!
```

Modules are still missing a lot of features, for example, the ability to refer
to variables in other modules. See the [module improvement tracking
issue](https://github.com/casey/just/issues/2252) for more information.
