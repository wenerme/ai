### Input Files

Input files can be provided with `[cache(inputs = FILES)]`, where `FILES` is an
expression that is evaluated with recipe arguments in scope and whose evaluated
elements are paths. Paths may be absolute or relative to the recipe's working
directory.

Each input file is hashed with BLAKE3 and added to the `inputs` cache key,
which contains a map of paths to hashes.

Any changes to the contents of an input file changes the cache key, which
causes the next invocation to miss the cache and re-run.

Missing inputs and paths to directories are errors.

In this example, the `build` recipe will re-run if `lib.c` or `main.c` change:

```just
set unstable
set lists

[script]
[cache(inputs = ["lib.c", "main.c"])]
build:
  cc lib.c main.c -o main
```
