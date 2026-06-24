### User-defined functions

New functions may be defined<sup>1.49.0</sup>:

```just
set unstable

hello(name) := f"Hello, {{ name }}!"

foo:
  echo '{{ hello("World") }}'
```

User-defined functions are currently unstable.

Functions may reference assignments in the same module:

```just
set unstable

base := "foo"

join(extension) := base + "." + extension

create:
  touch {{ join("c") }}
  touch {{ join("html") }}
  touch {{ join("txt") }}
```
