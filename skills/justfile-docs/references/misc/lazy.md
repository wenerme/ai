### Lazy

The `lazy` setting<sup>1.47.0</sup> causes the evaluator to skip evaluating
unused variables. This can be beneficial when a `justfile` contains variables
that are expensive to evaluate but only sometimes used.

In the following `justfile`, `token` will be skipped when only invoking `bar`:

```just
set lazy

token := `expensive-script-to-get-credentials`

foo:
  curl -H "Authorization: Bearer {{ token }}" https://example.com/foo

bar:
  cargo test
```

Because `just` cannot determine when exported variables are used, assignments
with `export` and assignments in a module with `set export` will always be
evaluated.
