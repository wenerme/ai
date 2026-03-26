### Imports

One `justfile` can include the contents of another using `import` statements.

If you have the following `justfile`:

```justfile
import 'foo/bar.just'

a: b
  @echo A
```

And the following text in `foo/bar.just`:

```just
b:
  @echo B
```

`foo/bar.just` will be included in `justfile` and recipe `b` will be defined:

```console
$ just b
B
$ just a
B
A
```

The `import` path can be absolute or relative to the location of the justfile
containing it. A leading `~/` in the import path is replaced with the current
users home directory.

Justfiles are insensitive to order, so included files can reference variables
and recipes defined after the `import` statement.

Imported files can themselves contain `import`s, which are processed
recursively.

`allow-duplicate-recipes` and `allow-duplicate-variables` allow duplicate
recipes and variables, respectively, to override each other, instead of
producing an error.

Within a module, later definitions override earlier definitions:

```just
set allow-duplicate-recipes

foo:

foo:
  echo 'yes'
```

When `import`s are involved, things unfortunately get much more complicated and
hard to explain.

Shallower definitions always override deeper definitions, so recipes at the top
level will override recipes in imports, and recipes in an import will override
recipes in an import which itself imports those recipes.

When two duplicate definitions are imported and are at the same depth, the one
from the earlier import will override the one from the later import.

This is because `just` uses a stack when processing imports, pushing imports
onto the stack in source-order, and always processing the top of the stack
next, so earlier imports are actually handled later by the compiler.

This is definitely a bug, but since `just` has very strong backwards
compatibility guarantees and we take enormous pains not to break anyone's
`justfile`, we have created issue #2540 to discuss whether or not we can
actually fix it.

Imports may be made optional by putting a `?` after the `import` keyword:

```just
import? 'foo/bar.just'
```

Importing the same source file multiple times is not an error<sup>1.37.0</sup>.
This allows importing multiple justfiles, for example `foo.just` and
`bar.just`, which both import a third justfile containing shared recipes, for
example `baz.just`, without the duplicate import of `baz.just` being an error:

```justfile
# justfile
import 'foo.just'
import 'bar.just'
```

```justfile
# foo.just
import 'baz.just'
foo: baz
```

```justfile
# bar.just
import 'baz.just'
bar: baz
```

```just
# baz
baz:
```
