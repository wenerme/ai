### Requiring a Minimum Just Version

If you use features of `just` which require a particular version, you may use
the `minimum-version`<sup>master</sup> setting to make it an error to use older
versions of `just`:

```justfile
set minimum-version := <sup>master</sup>
```

If `just` encounters a minimum version greater than its own version, it will
print an error message with the required version, which is hopefully better
than the confused error message it would have otherwise produced.

The `minimum-version` setting should be placed at the top of the `justfile`,
before any usage of the new feature that it guards.

Any features which change the lexer in forward-incompatible ways will still
produce an unhelpful error message, as the minimum version check is implemented
in the parser, which runs after the lexer.

Editor Support
--------------

`justfile` syntax is close enough to `make` that you may want to tell your
editor to use `make` syntax highlighting for `just`.
