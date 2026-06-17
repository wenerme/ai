### Expressions and Substitutions

Various operators and function calls are supported in expressions, which may be
used in assignments, default recipe arguments, and inside recipe body `{{…}}`
substitutions.

```just
tmpdir  := `mktemp -d`
version := "0.2.7"
tardir  := tmpdir / "awesomesauce-" + version
tarball := tardir + ".tar.gz"
config  := quote(config_dir() / ".project-config")

publish:
  rm -f {{tarball}}
  mkdir {{tardir}}
  cp README.md *.c {{ config }} {{tardir}}
  tar zcvf {{tarball}} {{tardir}}
  scp {{tarball}} me@server.com:release/
  rm -rf {{tarball}} {{tardir}}
```

#### Concatenation

The `+` operator returns the left-hand argument concatenated with the
right-hand argument:

```just
foobar := 'foo' + 'bar'
```

#### Logical Operators

The logical operators `&&` and `||` can be used to coalesce
values<sup>1.37.0</sup>, similar to Python's `and` and `or`. The only false
value is the empty list `[]`; every other value, including the empty string
`''`, is true.

These operators require `set lists`<sup>1.53.0</sup>, which is currently
unstable.

The `&&` operator returns the empty list if the left-hand argument is false,
otherwise it returns the right-hand argument:

```justfile
foo := [] && 'goodbye'      # []
bar := 'hello' && 'goodbye' # 'goodbye'
```

The `||` operator returns the left-hand argument if it is true, otherwise it
returns the right-hand argument:

```justfile
foo := [] || 'goodbye'      # 'goodbye'
bar := 'hello' || 'goodbye' # 'hello'
```

#### Joining Paths

The `/` operator can be used to join two strings with a slash:

```just
foo := "a" / "b"
```

```
$ just --evaluate foo
a/b
```

Note that a `/` is added even if one is already present:

```just
foo := "a/"
bar := foo / "b"
```

```
$ just --evaluate bar
a//b
```

Absolute paths can also be constructed<sup>1.5.0</sup>:

```just
foo := / "b"
```

```
$ just --evaluate foo
/b
```

The `/` operator uses the `/` character, even on Windows. Thus, using the `/`
operator should be avoided with paths that use universal naming convention
(UNC), i.e., those that start with `\\`, since forward slashes are not
supported with UNC paths.

#### Escaping `{{`

To write a recipe containing `{{`, use `{{{{`:

```just
braces:
  echo 'I {{{{LOVE}} curly braces!'
```

(An unmatched `}}` is ignored, so it doesn't need to be escaped.)

Another option is to put all the text you'd like to escape inside of an
interpolation:

```just
braces:
  echo '{{'I {{LOVE}} curly braces!'}}'
```

Yet another option is to use `{{ "{{" }}`:

```just
braces:
  echo 'I {{ "{{" }}LOVE}} curly braces!'
```
