### Enabling and Disabling Recipes

The `[linux]`, `[macos]`, `[unix]`, and `[windows]` attributes<sup>1.8.0</sup>
are configuration attributes. By default, recipes are always enabled. A recipe
with one or more configuration attributes will only be enabled when one or more
of those configurations is active.

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
