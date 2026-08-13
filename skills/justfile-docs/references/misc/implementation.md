### Implementation

The cache is a directory named `.justcache` alongside the `justfile` and should
not be committed to version control systems. It contains cache entries named
`HASH.json`, where `HASH` is the BLAKE3 hash of a serialized cache key JSON
object.

The keys of the cache key object are:

- `body`: evaluated recipe body
- `environment`: map of environment variable names to values
- `executor`: script interpreter or shebang
- `extension`: script file extension
- `extra`: user-supplied value
- `inputs`: map of file paths to content hashs
- `positional`: positional arguments
- `recipe`: `::`-separated module path to invoked recipe
- `working_directory`: current working directory

All keys other than `extra` and `inputs` are populated automatically.

Cache key objects for invoked recipes can be printed to standard error with
`just -vv`.

The environment variables included in `environment` may be controlled with
`[cache(environment = EXPRESSION])`<sup>master<sup>.

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
