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
- `inputs`: map of file paths to content hashes
- `positional`: positional arguments
- `recipe`: `::`-separated module path to invoked recipe
- `working_directory`: current working directory

All keys other than `extra` and `inputs` are populated automatically.

Cache key objects for invoked recipes can be printed to standard error with
`just -vv`.

The environment variables included in `environment` may be controlled with
`[cache(environment = EXPRESSION)]`<sup>1.59.0</sup>.

The value of `extra` may be supplied with `[cache(extra = EXPRESSION)]`, where
`EXPRESSION` is an arbitrary expression evaluated with recipe arguments in
scope. Changes to the value of `extra` will cause a cache miss.

Before `just` runs a cached recipe, it creates a cache key, hashes it, and
looks for the corresponding cache entry.

If the cache entry is non-empty and outputs in the cache entry match their
current state, it skips the invocation. Otherwise it runs the invocation and
writes a JSON object with the following keys:

- `outputs`: map of output path to state
- `recipe`: recipe path

File locks are taken on cache entries, so concurrent execution of cached
recipes by multiple `just` processes is safe. If two processes run a recipe
invocation with the same cache key, the first will take the lock, run the
recipe, write to the cache entry, and relinquish the lock. The second will
block until the first relinquishes the lock, see that the entry is non-empty
and that outputs in the entry match their current state, and skip the
invocation.

The cache can be bypassed entirely with the `--no-cache` flag.
