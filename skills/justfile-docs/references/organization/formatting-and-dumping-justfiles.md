### Formatting and dumping `justfile`s

Each `justfile` has a canonical formatting with respect to whitespace and
newlines.

You can overwrite the current justfile with a canonically-formatted version
using the `--fmt` flag:

```console
$ cat justfile
# A lot of blank lines

some-recipe:
  echo "foo"
$ just --fmt
$ cat justfile
# A lot of blank lines

some-recipe:
    echo "foo"
```

When the `justfile` is read from standard input with `--justfile -` or
extracted from a markdown file, `--fmt` prints the formatted `justfile` to
stdout.

Note that formatting is not covered by any backwards compatibility guarantee
and is subject to change from time to time.

Invoking `just --fmt --check` runs `--fmt` in check mode. Instead of
overwriting the `justfile`, `just` will exit with an exit code of 0 if it is
formatted correctly, and will exit with 1 and print a diff if it is not.

You can use the `--dump` command to output a formatted version of the
`justfile` to stdout:

```console
$ just --dump > formatted-justfile
```

The `--dump` command can be used with `--dump-format json` to print a JSON
representation of a `justfile`.

Cached Recipes
--------------

`just` will skip invocations of recipes with the `[cache]`
attribute<sup>1.54.0</sup> if it finds an entry matching the invocation in the
cache. The `[cache]` attribute may only be used with script recipes and is
currently unstable.

Unlike many other features of `just`, which are, hopefully, well thought-out
and user-friendly, cached recipes are inherently fragile. It is important to
understand their limitations before relying on them. Please read this section
thoroughly, including the friendly admonitions below.

The cache is a directory named `.justcache` alongside the `justfile` and should
not be committed to version control systems. It contains cache entries named
`HASH.json`, where `HASH` is the BLAKE3 hash of a serialized cache key JSON
object.

The keys of the cache key object are:

- `body`: evaluated recipe body
- `environment`: map of environment variable names to values
- `executor`: script interpreter or shebang
- `extra`: user-supplied value
- `inputs`: map of file paths to content hashs
- `positional`: positional arguments
- `recipe`: `::`-separated module path to invoked recipe
- `working_directory`: current working directory

Cache key objects for invoked recipes can be printed to standard error with
`just -vv`.

The value of `extra` may be supplied with `[cache(extra = EXPRESSION)]`, where
`EXPRESSION` is an arbitrary expression evaluated with recipe arguments in
scope. Changes to the value of `extra` will cause a cache miss.

Before `just` runs a cached recipe, it creates a cache key, hashes it, and
looks for the corresponding cache entry.

If the cache entry is non-empty, it skips the invocation.

If the cache entry does not exist or is empty, it runs the invocation and
writes `{}` to the cache entry.

File locks are taken on cache entries, so concurrent execution of cached
recipes by multiple `just` processes is safe. If two processes run a recipe
invocation with the same cache key, the first will take the lock, run the
recipe, write to the cache entry, and relinquish the lock. The second will
block until the first relinquishes the lock, see that the entry is non-empty,
and skip the invocation.

The cache can be bypassed entirely with the `--no-cache` flag.

#### Clearing the Cache

The recipe cache is stored in a directory named `.justcache` alongside the
`justfile`. Deleting it will clear the cache.

The cache can also be cleared with `just --clean`, which can selectively clear
cache entries:

```sh
# clear all cache entries
just --clean

# clear cache entries for recipe `foo`
just --clean foo

# clear cache entries for recipe `baz` in submodule `bar`
just --clean bar baz

# clear cache entries for recipes in submodule module `bar`
just --clean bar

# clear cache entries for recipes in submodule module `bar::bob`
just --clean bar bob

# '::'-separated paths may also be used
just --clean bar::bob
```

#### Input Files

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

#### Output Files

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

#### Friendly Admonitions

`just` will happily skip cached recipes, but it is your responsibility to make
sure that this is safe, and that the contents of the cache key capture enough
information about recipe invocations for caching to make sense in the first
place.

In particular, there are many details about the context in which a recipe runs
that are not captured by cache keys.

These include the time, input files, output files, system binaries, operating
system version, databases, systems over the network, the DNS, and any of the
myriad other things which may change the execution of a computer program.

Attempting to skip execution based on the type of crude heuristics that `just`
employs has a long and sordid history. However, it is an undeniably convenient
and powerful tool, and it is provided in the hopes that you find it useful.

Reference
---------
