### Output Files

Output files can be provided with `[cache(outputs = FILES)]`, where `FILES` is
an expression that is evaluated with recipe arguments in scope and whose
evaluated elements are paths. Paths may be absolute or relative to the recipe's
working directory.

After an invocation, the current state of outputs is recorded in the
invocation's cache entry. This includes whether they are files or directories,
and for files, the BLAKE3 hash of their contents.

All outputs must exist and match their recorded state in the cache entry for an
invocation to be skipped, and after an invocation runs successfully, it is an
error if any outputs do not exist.

In this example, `build` re-runs whenever `main` is missing or modified, and
errors if it runs without producing `main`:

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
