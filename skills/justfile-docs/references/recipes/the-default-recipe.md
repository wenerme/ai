### The Default Recipe

When `just` is invoked without a recipe, it runs the recipe with the
`[default]` attribute, or the first recipe in the `justfile` if no recipe has
the `[default]` attribute.

This recipe might be the most frequently run command in the project, like
running the tests:

```just
test:
  cargo test
```

You can also use dependencies to run multiple recipes by default:

```just
default: lint build test

build:
  echo Building…

test:
  echo Testing…

lint:
  echo Linting…
```

If no recipe makes sense as the default recipe, you can use
`default-list`<sup>master</sup> to list the available recipes instead:

```just
set default-list := true
```
