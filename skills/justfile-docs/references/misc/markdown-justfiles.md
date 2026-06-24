### Markdown `justfile`s

If the argument to `--justfile` ends in `.md`, `just` extracts the contents of
unindented `just` fenced code blocks and writes them to a `justfile` in a
temporary directory<sup>1.53.0</sup>:

````markdown
# Project

Build the project:

```just
build:
  echo Building…
```
````

```console
$ just --justfile README.md build
echo Building…
Building…
```
