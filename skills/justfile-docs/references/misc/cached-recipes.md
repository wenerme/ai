### Cached Recipes

`just` will skip invocations of recipes with the `[cache]`
attribute<sup>master</sup> if it finds an entry matching the invocation in the
cache. The `[cache]` attribute may only be used with script recipes and is
currently unstable.

Unlike many other features of `just`, which are, hopefully, well thought-out
and user-friendly, cached recipes are inherently fragile. It is important to
understand their limitations before relying on them. Please read this section
thoroughly, including the friendly admonitions below.

The cache is a directory named `.justcache` alongside the `justfile` and should
not be committed to version control systems. It contains cache entry named
`HASH.json`, where `HASH` is the BLAKE3 hash of a serialized cache key JSON
object.

The keys of the cache key object are:

- `body`: evaluated recipe body
- `environment`: map of environment variable names to values
- `executor`: script interpreter or shebang
- `positional`: positional arguments
- `recipe`: `::`-separated module path to invoked recipe
- `working_directory`: current working directory

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
