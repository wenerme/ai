### Adding and Removing Environment Variables

By default, environment variables which are exported or unexported in the
`justfile` are included in the cache key, and environment variables exported
outside the `justfile` and inherited by `just` are not included.

Environment variables can be added or removed from the cache key using
`[cache(environment = EXPRESSION)]`<sup>master</sup>.

In this example, the environment variable `foo` will not be included in the
cache key, but `PATH` will:

```just
set unstable
set lists

export foo := 'bar'

[script]
[cache(environment = ['PATH'])]
build:
  cc lib.c main.c -o main
```
