### Clearing the Cache

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
