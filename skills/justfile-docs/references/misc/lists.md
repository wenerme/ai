### Lists

The `lists` setting<sup>1.53.0</sup> allows values that are lists of strings.
It is currently unstable and will change in backwards incompatible ways. This
section documents changes in behavior when `set lists` is enabled.

It has not yet been decided how lists should behave with many of the built-in
functions. Functions that have been updated to accept lists are mentioned in
this section. Using lists with any other function is an error. The
`join_list()` function can be used to convert lists into space-separated
strings for use with un-upgraded functions. Feedback on how built-in functions
should behave with lists, and on lists in general, is most welcome! Feel free
to open an issue or leave a comment in the
[`set lists` tracking issue](https://github.com/casey/just/issues/3377).

Variadic recipe parameters are lists of strings instead of single
space-separated strings.

List literals are written `[a, b, c]`. List literals flatten their arguments,
since lists may only contain strings and not other lists. For example,
`[["a", "b"], [], "c"]` evaluates to `["a", "b", "c"]`.

Lists in recipe and `f`-string interpolations are joined with spaces into a
single string.

Each argument to a dependency binds to exactly one parameter, and supplying
extra arguments to a variadic dependency is an error.

Dependencies may be invoked once per element of a list with
`*(recipe *argument)`.

A parameter evaluates to the default when the argument is the empty list.

Passing an empty list to a non-`*` parameter without a default is an error.

The `else` of an `if` may be omitted, in which case the `if` evaluates to `[]`
when its condition is false.

Message values in `assert(condition, message)` and `[confirm(message)]` are
space-joined for display.

The `+` and `/` operators combine strings and lists. A string and a non-empty
list are combined by concatenating the string with each element of the list.
Two lists of the same length are combined into a list containing the pairwise
concatenated elements of both operands. Combining two lists of different
lengths is an error.

The `++` operator performs list concatenation.

#### Booleans

The canonical boolean true value is the string `"true"`, and the canonical
boolean false value is the empty list `[]`. All values other than the empty
list are truthy, including `''`.

The condition of an `if` or `assert()` may be any expression, which is
evaluated for truthiness.

The comparison operators `==`, `!=`, `=~`, and `!~` may be used anywhere, not
just in `if` and `assert()`, and evaluate to `"true"` or `[]`.

`value =~ regexes` is true if any element in `value` matches any regex in
`regexes`. It is false if either `value` or `regexes` is empty.

`value !~ regexes` is true if no element in `value` matches any regex in
`regexes`. It is true if either `value` or `regexes` is empty.

Values may be negated with `!`. `!expression` evaluates to `"true"` if
`expression` is `[]`, otherwise it evaluates to `[]`.

#### Settings

The `script-interpreter`, `shell`, and `windows-shell` settings flatten their
elements like list literals.

When `positional-arguments` is set, list arguments are space-joined unless they
are variadic, in which case they are passed as one positional argument per
element.

The `--dotenv-filename` and `--dotenv-path` options may be passed multiple
times, and the `dotenv-filename` and `dotenv-path` settings accept lists, in
which case multiple environment files may be loaded. The values of
`dotenv-path` are tried first. If none are found the current directory is
searched for the names in `dotenv-filename`, followed by its ancestors,
stopping in the first directory that contains any of them and loading all
matching files in that directory. If multiple environment files are loaded,
variables in files later in list take precedence over earlier ones.

Each element of the value of `set dotenv-command` is run as a command, with
variables from commands later in the list taking precedence over variables from
commands earlier in the list.

#### Attributes

The `[arg(flag)]` attribute makes the parameter a flag which does not take a
value on the command line. For example, with `[arg('foo', long, flag)]`, `foo`
will be `"true"` when `--foo` is passed, and `[]` otherwise. Flag parameters
may not have a default.

The `[arg(multiple)]` attribute allows an option or flag to be passed more than
once, assigning the list of passed values to the parameter. When combined with
`flag` or `value=VALUE`, `"true"` or `VALUE`, respectively, are repeated for
each occurance of the flag.

The `[arg(min=MIN)]` and `[arg(max=MAX)]` attributes<sup>master</sup> can be
used to limit the number of values an option or flag may receive.

The value of `[arg(help)]` may be a list, in which case the help string is the
elements of the list joined with spaces. If the list is empty, the argument has
no help string.

The value of `[arg(pattern)]` may be a list, in which case the argument is
accepted if it matches any pattern in the list. If the value is the empty list,
any argument is accepted. For example, with
`[arg('foo', pattern=['--help', '--version'])]`, `foo` may be `--help` or
`--version`.

In `[env(variable, value)]` if `value` is `[]`, `variable` is not set.
Otherwise it is set to `value` joined with spaces.

#### Functions

- `absolute_path()` - Applies to each list element individually.
- `append()` - Applies to each list element individually and does not split
  elements on whitespace.
- `assert(condition, message)` - Evaluates to `condition`.
- `bool(value)` Converts `value` to the canonical boolean values. Returns `[]`
  when `value` is `""` `"0"` `"false"`, or `[]`, and `"true"` when `value` is
  `"1"` or `"true"`. All other values are an error. Can be used to parse
  booleans passed as arguments or environment variables.
- `env(keys, default)` Checks for the environment variables named in `keys` in
  order and returns the value of the first that is set. Returns `default` if
  none are set or an error if `default` is omitted.
- `is_dependency()` - Returns the canonical booleans.
- `join_list(value, separator)` - Joins `value` into a single string. Elements
  are joined with `separator`, or with a single space if `separator` is
  omitted.
- `path_exists()` - Returns the canonical booleans.
- `prepend()` - Applies to each list element individually and does not split
  elements on whitespace.
- `quote()` - Applies to each list element individually.
- `semver_matches()` - Returns the canonical booleans.
- `show(value)` - Converts `value` into a string containing its literal
  representation. Brackets are used for empty and multi-element lists, e.g.,
  `"[]"` and `"["foo", "bar"]"`, but not single-element lists, e.g., `"foo"`.
- `split(string, separator)` - Splits `string` into a list on each occurrence
  of `separator`. If `separator` is omitted, `string` is split on whitespace,
  with leading and trailing whitespace trimmed.
- `which()` - Returns the empty list when no executable is found.

#### Examples

Each list element is `quote()`'ed separately:

```just
set unstable
set lists

@foo *args:
  printf '%s\n' {{ quote(args) }}
```

```console
$ just foo bar 'baz bob'
bar
baz bob
```

The return value of `quote(args)` is `'bar' 'baz bob'`, instead of
`'bar baz bob'`, as would be the case without `set lists`.

Variadic positional arguments:

```just
set unstable
set lists
set positional-arguments

foo *args: (bar args 'bob') (baz args)

@bar first second:
  echo first=$1
  echo second=$2

@baz *args:
  echo '$1='$1
  echo '$2='$2
```

```console
$ just foo one two
first=one two
second=bob
$1=one
$2=two
```

A mapped dependency is invoked once per element of its starred argument, with
`[parallel]` to run them in parallel:

```just
set unstable
set lists

[parallel]
build target *platform: *(compile target *platform)

@compile target platform:
  echo compiling {{ target }} for {{ platform }}…
```

```console
$ just build x86 foo bar
compiling foo for x86…
compiling bar for x86…
```

The canonical false value `[]` is recommended as a default for options:

```just
set unstable
set lists

[arg('bar', long)]
foo bar=[]:
```
