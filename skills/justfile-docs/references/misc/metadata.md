### Metadata

Metadata in the form of lists of strings may be attached to recipes with the
`[metadata(METADATA)]` attribute<sup>1.42.0</sup>:

```just
[metadata("hello", "goodbye")]
foo:
```

Metadata can be read using `just --dump --dump-format json`.
