### Quiet Recipes

A recipe name may be prefixed with `@` to invert the meaning of `@` before each
line:

```just
@quiet:
  echo hello
  echo goodbye
  @# all done!
```

Now only the lines starting with `@` will be echoed:

```console
$ just quiet
hello
goodbye
# all done!
```

All recipes in a Justfile can be made quiet with `set quiet`:

```just
set quiet

foo:
  echo "This is quiet"

@foo2:
  echo "This is also quiet"
```

The `[no-quiet]` attribute overrides this setting:

```just
set quiet

foo:
  echo "This is quiet"

[no-quiet]
foo2:
  echo "This is not quiet"
```

Shebang recipes are quiet by default:

```just
foo:
  #!/usr/bin/env bash
  echo 'Foo!'
```

```console
$ just foo
Foo!
```

Adding `@` to a shebang recipe name makes `just` print the recipe before
executing it:

```just
@bar:
  #!/usr/bin/env bash
  echo 'Bar!'
```

```console
$ just bar
#!/usr/bin/env bash
echo 'Bar!'
Bar!
```

`just` normally prints error messages when a recipe line fails. These error
messages can be suppressed using the `[no-exit-message]`<sup>1.7.0</sup>
attribute on individual recipes, or module-wide with
`set no-exit-message`<sup>1.39.0</sup>. You may find this especially useful
with a recipe that wraps a tool:

```just
git *args:
    @git {{args}}
```

```console
$ just git status
fatal: not a git repository (or any of the parent directories): .git
error: Recipe `git` failed on line 2 with exit code 128
```

Add the attribute to suppress the exit error message when the tool exits with a
non-zero code:

```just
[no-exit-message]
git *args:
    @git {{args}}
```

```console
$ just git status
fatal: not a git repository (or any of the parent directories): .git
```
