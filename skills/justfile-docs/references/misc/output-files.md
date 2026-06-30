### Output Files

Output files can be provided with `[cache(outputs = FILES)]`, where `FILES` is
an expression that is evaluated with recipe arguments in scope and whose
evaluated elements are paths. Paths may be absolute or relative to the recipe's
working directory.

Outputs are not part of the cache key.

All output files must exist for an invocation to be skipped, and after an
invocation runs successfully, it is an error if any output file does not exist.

In this example, `build` re-runs whenever `main` is missing, and errors if it
runs without producing `main`:

```just
set unstable
set lists

[script]
[cache(inputs = ["lib.c", "main.c"], outputs = "main")]
build:
  cc lib.c main.c -o main

clean:
  rm -f main
```

This forces `build` to re-run if `main` is deleted by `clean`.

Reference
---------
