### Parallelism

Dependencies may be run in parallel with the `[parallel]` attribute.

In this `justfile`, `foo`, `bar`, and `baz` will execute in parallel when
`main` is run:

```just
[parallel]
main: foo bar baz

foo:
  sleep 1

bar:
  sleep 1

baz:
  sleep 1
```

GNU `parallel` may be used to run recipe lines concurrently:

```just
parallel:
  #!/usr/bin/env -S parallel --shebang --ungroup --jobs {{ num_cpus() }}
  echo task 1 start; sleep 3; echo task 1 done
  echo task 2 start; sleep 3; echo task 2 done
  echo task 3 start; sleep 3; echo task 3 done
  echo task 4 start; sleep 3; echo task 4 done
```
