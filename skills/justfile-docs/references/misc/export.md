### Export

The `export` setting causes all `just` variables to be exported as environment
variables. Defaults to `false`.

```just
set export

a := "hello"

@foo b:
  echo $a
  echo $b
```

```console
$ just foo goodbye
hello
goodbye
```
