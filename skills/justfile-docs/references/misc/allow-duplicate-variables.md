### Allow Duplicate Variables

If `allow-duplicate-variables` is set to `true`, defining multiple variables
with the same name is not an error and the last definition is used. Defaults to
`false`.

```just
set allow-duplicate-variables

a := "foo"
a := "bar"

@foo:
  echo {{a}}
```

```console
$ just foo
bar
```
