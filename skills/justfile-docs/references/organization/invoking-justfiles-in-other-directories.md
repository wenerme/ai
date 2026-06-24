### Invoking `justfile`s in Other Directories

If the first argument passed to `just` contains a `/`, then the following
occurs:

1.  The argument is split at the last `/`.

2.  The part before the last `/` is treated as a directory. `just` will start
    its search for the `justfile` there, instead of in the current directory.

3.  The part after the last slash is treated as a normal argument, or ignored
    if it is empty.

This may seem a little strange, but it's useful if you wish to run a command in
a `justfile` that is in a subdirectory.

For example, if you are in a directory which contains a subdirectory named
`foo`, which contains a `justfile` with the recipe `build`, which is also the
default recipe, the following are all equivalent:

```console
$ (cd foo && just build)
$ just foo/build
$ just foo/
```

Additional recipes after the first are sought in the same `justfile`. For
example, the following are both equivalent:

```console
$ just foo/a b
$ (cd foo && just a b)
```

And will both invoke recipes `a` and `b` in `foo/justfile`.
