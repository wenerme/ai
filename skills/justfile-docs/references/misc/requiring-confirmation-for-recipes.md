### Requiring Confirmation for Recipes

`just` normally executes all recipes unless there is an error. The `[confirm]`
attribute<sup>1.17.0</sup> allows recipes to require confirmation in the terminal
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
