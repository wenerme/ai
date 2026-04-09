### Recipe Parameters

Recipes may have parameters. Here recipe `build` has a parameter called
`target`:

```just
build target:
  @echo 'Building {{target}}…'
  cd {{target}} && make
```

To pass arguments on the command line, put them after the recipe name:

```console
$ just build my-awesome-project
Building my-awesome-project…
cd my-awesome-project && make
```

To pass arguments to a dependency, put the dependency in parentheses along with
the arguments:

```just
default: (build "main")

build target:
  @echo 'Building {{target}}…'
  cd {{target}} && make
```

Variables can also be passed as arguments to dependencies:

```just
target := "main"

_build version:
  @echo 'Building {{version}}…'
  cd {{version}} && make

build: (_build target)
```

A command's arguments can be passed to a dependency by putting the dependency in
parentheses along with the arguments:

```just
build target:
  @echo "Building {{target}}…"

push target: (build target)
  @echo 'Pushing {{target}}…'
```

Parameters may have default values:

```just
default := 'all'

test target tests=default:
  @echo 'Testing {{target}}:{{tests}}…'
  ./test --tests {{tests}} {{target}}
```

Parameters with default values may be omitted:

```console
$ just test server
Testing server:all…
./test --tests all server
```

Or supplied:

```console
$ just test server unit
Testing server:unit…
./test --tests unit server
```

Default values may be arbitrary expressions, but expressions containing the
`+`, `&&`, `||`, or `/` operators must be parenthesized:

```just
arch := "wasm"

test triple=(arch + "-unknown-unknown") input=(arch / "input.dat"):
  ./test {{triple}}
```

The last parameter of a recipe may be variadic, indicated with either a `+` or
a `*` before the argument name:

```just
backup +FILES:
  scp {{FILES}} me@server.com:
```

Variadic parameters prefixed with `+` accept _one or more_ arguments and expand
to a string containing those arguments separated by spaces:

```console
$ just backup FAQ.md GRAMMAR.md
scp FAQ.md GRAMMAR.md me@server.com:
FAQ.md                  100% 1831     1.8KB/s   00:00
GRAMMAR.md              100% 1666     1.6KB/s   00:00
```

Variadic parameters prefixed with `*` accept _zero or more_ arguments and
expand to a string containing those arguments separated by spaces, or an empty
string if no arguments are present:

```just
commit MESSAGE *FLAGS:
  git commit {{FLAGS}} -m "{{MESSAGE}}"
```

Variadic parameters can be assigned default values. These are overridden by
arguments passed on the command line:

```just
test +FLAGS='-q':
  cargo test {{FLAGS}}
```

`{{…}}` substitutions may need to be quoted if they contain spaces. For
example, if you have the following recipe:

```just
search QUERY:
  lynx https://www.google.com/?q={{QUERY}}
```

And you type:

```console
$ just search "cat toupee"
```

`just` will run the command `lynx https://www.google.com/?q=cat toupee`, which
will get parsed by `sh` as `lynx`, `https://www.google.com/?q=cat`, and
`toupee`, and not the intended `lynx` and `https://www.google.com/?q=cat toupee`.

You can fix this by adding quotes:

```just
search QUERY:
  lynx 'https://www.google.com/?q={{QUERY}}'
```

Parameters prefixed with a `$` will be exported as environment variables:

```just
foo $bar:
  echo $bar
```

Parameters may be constrained to match regular expression patterns using the
`[arg("name", pattern="pattern")]` attribute<sup>1.45.0</sup>:

```just
[arg('n', pattern='\d+')]
double n:
  echo $(({{n}} * 2))
```

A leading `^` and trailing `$` are added to the pattern, so it must match the
entire argument value.

You may constrain the pattern to a number of alternatives using the `|`
operator:

```just
[arg('flag', pattern='--help|--version')]
info flag:
  just {{flag}}
```

Regular expressions are provided by the
[Rust `regex` crate](https://docs.rs/regex/latest/regex/). See the
[syntax documentation](https://docs.rs/regex/latest/regex/#syntax) for usage
examples.

Usage information for a recipe may be printed with the `--usage`
subcommand<sup>1.46.0</sup>:

```console
$ just --usage foo
Usage: just foo [OPTIONS] bar

Arguments:
  bar
```

Help strings may be added to arguments using the `[arg(ARG, help=HELP)]` attribute:

```just
[arg("bar", help="hello")]
foo bar:
```

```console
$ just --usage foo
Usage: just foo bar

Arguments:
  bar hello
```

#### Recipe Flags and Options

Recipe parameters are positional by default.

In this `justfile`:

```just
@foo bar:
  echo bar={{bar}}
```

The parameter `bar` is positional:

```console
$ just foo hello
bar=hello
```

The `[arg(ARG, long=OPTION)]`<sup>1.46.0</sup> attribute can be used to make a
parameter a long option.

In this `justfile`:

```just
[arg("bar", long="bar")]
foo bar:
```

The parameter `bar` is given with the `--bar` option:

```console
$ just foo --bar hello
bar=hello
```

Options may also be passed with `--name=value` syntax:

```console
$ just foo --bar=hello
bar=hello
```

The value of `long` can be omitted, in which case the option defaults to the
name of the parameter:

```just
[arg("bar", long)]
foo bar:
```

The `[arg(ARG, short=OPTION)]`<sup>1.46.0</sup> attribute can be used to make a
parameter a short option.

In this `justfile`:

```just
[arg("bar", short="b")]
foo bar:
```

The parameter `bar` is given with the `-b` option:

```console
$ just foo -b hello
bar=hello
```

If a parameter has both a long and short option, it may be passed using either.

Variadic `*` and `+` parameters cannot be options.

The `[arg(ARG, value=VALUE, …)]`<sup>1.46.0</sup> attribute can be used with
`long` or `short` to make a parameter a flag which does not take a value.

In this `justfile`:

```just
[arg("bar", long="bar", value="hello")]
foo bar:
```

The parameter `bar` is given with the `--bar` option, but does not take a
value, and instead takes the value given in the `[arg]` attribute:

```console
$ just foo --bar
bar=hello
```

This is useful for unconditionally requiring a flag like `--force` on dangerous
commands.

A flag is optional if its parameter has a default:

```just
[arg("bar", long="bar", value="hello")]
foo bar="goodbye":
```

Causing it to receive the default when not passed in the invocation:

```console
$ just foo
bar=goodbye
```
