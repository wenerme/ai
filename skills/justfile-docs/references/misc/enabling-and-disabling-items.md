### Enabling and Disabling Items

The `[android]`, `[dragonfly]`, `[freebsd]`, `[linux]`, `[macos]`, `[netbsd]`,
`[openbsd]`, `[unix]`, and `[windows]` attributes are conditional attributes.
By default, items are always enabled. An item with one or more conditional
attributes will only be enabled when one or more of those conditional
attributes is active.

The conditional attributes originally applied only to recipes, but may now be
applied to all top-level items<sup>1.56.0</sup>.

This can be used to write `justfile`s that behave differently depending on
which operating system they run on. The `run` recipe in this `justfile` will
compile and run `main.c`, using a different C compiler and using the correct
output binary name for that compiler depending on the operating system:

```just
[unix]
run:
  cc main.c
  ./a.out

[windows]
run:
  cl main.c
  main.exe
```

Similarly, a setting can be made conditional on the current operating system:

```just
[unix]
set shell := ['sh', '-cu']

[windows]
set shell := ['cmd', '/c']
```
