### Functions

`just` provides many built-in functions for use in expressions, including
recipe body `{{…}}` substitutions, assignments, and default parameter values.

All functions ending in `_directory` can be abbreviated to `_dir`. So
`home_directory()` can also be written as `home_dir()`. In addition,
`invocation_directory_native()` can be abbreviated to
`invocation_dir_native()`.

#### System Information

- `arch()` — Instruction set architecture. Possible values are: `"aarch64"`,
  `"arm"`, `"asmjs"`, `"hexagon"`, `"mips"`, `"msp430"`, `"powerpc"`,
  `"powerpc64"`, `"s390x"`, `"sparc"`, `"wasm32"`, `"x86"`, `"x86_64"`, and
  `"xcore"`.
- `num_cpus()`<sup>1.15.0</sup> - Number of logical CPUs.
- `os()` — Operating system. Possible values are: `"android"`, `"bitrig"`,
  `"dragonfly"`, `"emscripten"`, `"freebsd"`, `"haiku"`, `"ios"`, `"linux"`,
  `"macos"`, `"netbsd"`, `"openbsd"`, `"solaris"`, and `"windows"`.
- `os_family()` — Operating system family; possible values are: `"unix"` and
  `"windows"`.

For example:

```just
system-info:
  @echo "This is an {{arch()}} machine".
```

```console
$ just system-info
This is an x86_64 machine
```

The `os_family()` function can be used to create cross-platform `justfile`s
that work on various operating systems. For an example, see
[cross-platform.just](https://github.com/casey/just/blob/master/examples/cross-platform.just)
file.

#### External Commands

- `shell(command, args...)`<sup>1.27.0</sup> returns the standard output of shell script
  `command` with zero or more positional arguments `args`. The shell used to
  interpret `command` is the same shell that is used to evaluate recipe lines,
  and can be changed with `set shell := […]`.

  `command` is passed as the first argument, so if the command is `'echo $@'`,
  the full command line, with the default shell command `sh -cu` and `args`
  `'foo'` and `'bar'` will be:

  ```
  'sh' '-cu' 'echo $@' 'echo $@' 'foo' 'bar'
  ```

  This is so that `$@` works as expected, and `$1` refers to the first
  argument. `$@` does not include the first positional argument, which is
  expected to be the name of the program being run.

```just
# arguments can be variables or expressions
file := '/sys/class/power_supply/BAT0/status'
bat0stat := shell('cat $1', file)

# commands can be variables or expressions
command := 'wc -l'
output := shell(command + ' "$1"', 'main.c')

# arguments referenced by the shell command must be used
empty := shell('echo', 'foo')
full := shell('echo $1', 'foo')
error := shell('echo $1')
```

```just
# Using python as the shell. Since `python -c` sets `sys.argv[0]` to `'-c'`,
# the first "real" positional argument will be `sys.argv[2]`.
set shell := ["python3", "-c"]
olleh := shell('import sys; print(sys.argv[2][::-1])', 'hello')
```

#### Environment Variables

- `env(key)`<sup>1.15.0</sup> — Retrieves the environment variable with name `key`, aborting
  if it is not present.

```just
home_dir := env('HOME')

test:
  echo "{{home_dir}}"
```

```console
$ just
/home/user1
```

- `env(key, default)`<sup>1.15.0</sup> — Retrieves the environment variable with
  name `key`, returning `default` if it is not present.
- `env_var(key)` — Deprecated alias for `env(key)`.
- `env_var_or_default(key, default)` — Deprecated alias for `env(key, default)`.

A default can be substituted for an empty environment variable value with the
`||` operator, currently unstable:

```just
set unstable

foo := env('FOO', '') || 'DEFAULT_VALUE'
```

#### Executables

- `require(name)`<sup>1.39.0</sup> — Search directories in the `PATH`
  environment variable for the executable `name` and return its full path, or
  halt with an error if no executable with `name` exists.

  ```just
  bash := require("bash")

  @test:
      echo "bash: '{{bash}}'"
  ```

  ```console
  $ just
  bash: '/bin/bash'
  ```

- `which(name)`<sup>1.39.0</sup> — Search directories in the `PATH` environment
  variable for the executable `name` and return its full path, or the empty
  string if no executable with `name` exists. Currently unstable.

  ```just
  set unstable

  bosh := which("bosh")

  @test:
      echo "bosh: '{{bosh}}'"
  ```

  ```console
  $ just
  bosh: ''
  ```

#### Invocation Information

- `is_dependency()` - Returns the string `true` if the current recipe is being
  run as a dependency of another recipe, rather than being run directly,
  otherwise returns the string `false`.

#### Invocation Directory

- `invocation_directory()` - Retrieves the absolute path to the current
  directory when `just` was invoked, before  `just` changed it (chdir'd) prior
  to executing commands. On Windows, `invocation_directory()` uses `cygpath` to
  convert the invocation directory to a Cygwin-compatible `/`-separated path.
  Use `invocation_directory_native()` to return the verbatim invocation
  directory on all platforms.

For example, to call `rustfmt` on files just under the "current directory"
(from the user/invoker's perspective), use the following rule:

```just
rustfmt:
  find {{invocation_directory()}} -name \*.rs -exec rustfmt {} \;
```

Alternatively, if your command needs to be run from the current directory, you
could use (e.g.):

```just
build:
  cd {{invocation_directory()}}; ./some_script_that_needs_to_be_run_from_here
```

- `invocation_directory_native()` - Retrieves the absolute path to the current
  directory when `just` was invoked, before  `just` changed it (chdir'd) prior
  to executing commands.

#### Justfile and Justfile Directory

- `justfile()` - Retrieves the path of the current `justfile`.

- `justfile_directory()` - Retrieves the path of the parent directory of the
  current `justfile`.

For example, to run a command relative to the location of the current
`justfile`:

```just
script:
  {{justfile_directory()}}/scripts/some_script
```

#### Source and Source Directory

- `source_file()`<sup>1.27.0</sup> - Retrieves the path of the current source file.

- `source_directory()`<sup>1.27.0</sup> - Retrieves the path of the parent directory of the
  current source file.

`source_file()` and `source_directory()` behave the same as `justfile()` and
`justfile_directory()` in the root `justfile`, but will return the path and
directory, respectively, of the current `import` or `mod` source file when
called from within an import or submodule.

#### Module and Module Directory

- `module_file()` - Retrieves the path of the current module file.

- `module_directory()` - Retrieves the path of the parent directory of the
  current module file.

`module_file()` and `module_directory()` behave the same as `justfile()` and
`justfile_directory()` in the root `justfile`, but will return the path and
directory, respectively, of the current `mod` source file when called from
within submodule.

#### Just Executable

- `just_executable()` - Absolute path to the `just` executable.

For example:

```just
executable:
  @echo The executable is at: {{just_executable()}}
```

```console
$ just
The executable is at: /bin/just
```

#### Just Process ID

- `just_pid()` - Process ID of the `just` executable.

For example:

```just
pid:
  @echo The process ID is: {{ just_pid() }}
```

```console
$ just
The process ID is: 420
```

#### String Manipulation

- `append(suffix, s)`<sup>1.27.0</sup> Append `suffix` to whitespace-separated
  strings in `s`. `append('/src', 'foo bar baz')` → `'foo/src bar/src baz/src'`
- `prepend(prefix, s)`<sup>1.27.0</sup> Prepend `prefix` to
  whitespace-separated strings in `s`. `prepend('src/', 'foo bar baz')` →
  `'src/foo src/bar src/baz'`
- `encode_uri_component(s)`<sup>1.27.0</sup> - Percent-encode characters in `s`
  except `[A-Za-z0-9_.!~*'()-]`, matching the behavior of the
  [JavaScript `encodeURIComponent` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).
- `quote(s)` - Replace all single quotes with `'\''` and prepend and append
  single quotes to `s`. This is sufficient to escape special characters for
  many shells, including most Bourne shell descendants.
- `replace(s, from, to)` - Replace all occurrences of `from` in `s` with `to`.
- `replace_regex(s, regex, replacement)` - Replace all occurrences of `regex`
  in `s` with `replacement`. Regular expressions are provided by the
  [Rust `regex` crate](https://docs.rs/regex/latest/regex/). See the
  [syntax documentation](https://docs.rs/regex/latest/regex/#syntax) for usage
  examples. Capture groups are supported. The `replacement` string uses
  [Replacement string syntax](https://docs.rs/regex/latest/regex/struct.Regex.html#replacement-string-syntax).
- `trim(s)` - Remove leading and trailing whitespace from `s`.
- `trim_end(s)` - Remove trailing whitespace from `s`.
- `trim_end_match(s, substring)` - Remove suffix of `s` matching `substring`.
- `trim_end_matches(s, substring)` - Repeatedly remove suffixes of `s` matching
  `substring`.
- `trim_start(s)` - Remove leading whitespace from `s`.
- `trim_start_match(s, substring)` - Remove prefix of `s` matching `substring`.
- `trim_start_matches(s, substring)` - Repeatedly remove prefixes of `s`
  matching `substring`.

#### Case Conversion

- `capitalize(s)`<sup>1.7.0</sup> - Convert first character of `s` to uppercase
  and the rest to lowercase.
- `kebabcase(s)`<sup>1.7.0</sup> - Convert `s` to `kebab-case`.
- `lowercamelcase(s)`<sup>1.7.0</sup> - Convert `s` to `lowerCamelCase`.
- `lowercase(s)` - Convert `s` to lowercase.
- `shoutykebabcase(s)`<sup>1.7.0</sup> - Convert `s` to `SHOUTY-KEBAB-CASE`.
- `shoutysnakecase(s)`<sup>1.7.0</sup> - Convert `s` to `SHOUTY_SNAKE_CASE`.
- `snakecase(s)`<sup>1.7.0</sup> - Convert `s` to `snake_case`.
- `titlecase(s)`<sup>1.7.0</sup> - Convert `s` to `Title Case`.
- `uppercamelcase(s)`<sup>1.7.0</sup> - Convert `s` to `UpperCamelCase`.
- `uppercase(s)` - Convert `s` to uppercase.

#### Path Manipulation

##### Fallible

- `absolute_path(path)` - Absolute path to relative `path` in the working
  directory. `absolute_path("./bar.txt")` in directory `/foo` is
  `/foo/bar.txt`.
- `canonicalize(path)`<sup>1.24.0</sup> - Canonicalize `path` by resolving symlinks and removing
  `.`, `..`, and extra `/`s where possible.
- `extension(path)` - Extension of `path`. `extension("/foo/bar.txt")` is
  `txt`.
- `file_name(path)` - File name of `path` with any leading directory components
  removed. `file_name("/foo/bar.txt")` is `bar.txt`.
- `file_stem(path)` - File name of `path` without extension.
  `file_stem("/foo/bar.txt")` is `bar`.
- `parent_directory(path)` - Parent directory of `path`.
  `parent_directory("/foo/bar.txt")` is `/foo`.
- `without_extension(path)` - `path` without extension.
  `without_extension("/foo/bar.txt")` is `/foo/bar`.

These functions can fail, for example if a path does not have an extension,
which will halt execution.

##### Infallible

- `clean(path)` - Simplify `path` by removing extra path separators,
  intermediate `.` components, and `..` where possible. `clean("foo//bar")` is
  `foo/bar`, `clean("foo/..")` is `.`, `clean("foo/./bar")` is `foo/bar`.
- `join(a, b…)` - *This function uses `/` on Unix and `\` on Windows, which can
  be lead to unwanted behavior. The `/` operator, e.g., `a / b`, which always
  uses `/`, should be considered as a replacement unless `\`s are specifically
  desired on Windows.* Join path `a` with path `b`. `join("foo/bar", "baz")` is
  `foo/bar/baz`. Accepts two or more arguments.

#### Filesystem Access

- `path_exists(path)` - Returns the string `true` if the path points at an
  existing entity and the string `false` otherwise. Traverses symbolic links,
  and returns the string `false` if the path is inaccessible or points to a
  broken symlink.
- `read(path)`<sup>1.39.0</sup> - Returns the content of file at `path` as
  string.

##### Error Reporting

- `error(message)` - Abort execution and report error `message` to user.

#### UUID and Hash Generation

- `blake3(string)`<sup>1.25.0</sup> - Return [BLAKE3] hash of `string` as hexadecimal string.
- `blake3_file(path)`<sup>1.25.0</sup> - Return [BLAKE3] hash of file at `path` as hexadecimal
  string.
- `sha256(string)` - Return the SHA-256 hash of `string` as hexadecimal string.
- `sha256_file(path)` - Return SHA-256 hash of file at `path` as hexadecimal
  string.
- `uuid()` - Generate a random version 4 UUID.

[BLAKE3]: https://github.com/BLAKE3-team/BLAKE3/

#### Random

- `choose(n, alphabet)`<sup>1.27.0</sup> - Generate a string of `n` randomly
  selected characters from `alphabet`, which may not contain repeated
  characters. For example, `choose('64', HEX)` will generate a random
  64-character lowercase hex string.

#### Datetime

- `datetime(format)`<sup>1.30.0</sup> - Return local time with `format`.
- `datetime_utc(format)`<sup>1.30.0</sup> - Return UTC time with `format`.

The arguments to `datetime` and `datetime_utc` are `strftime`-style format
strings, see the
[`chrono` library docs](https://docs.rs/chrono/latest/chrono/format/strftime/index.html)
for details.

#### Semantic Versions

- `semver_matches(version, requirement)`<sup>1.16.0</sup> - Check whether a
  [semantic `version`](https://semver.org), e.g., `"0.1.0"` matches a
  `requirement`, e.g., `">=0.1.0"`, returning the string `"true"` if so and the
  string `"false"` otherwise.

#### Style

- `style(name)`<sup>1.37.0</sup> - Return a named terminal display attribute
  escape sequence used by `just`. Unlike terminal display attribute escape
  sequence constants, which contain standard colors and styles, `style(name)`
  returns an escape sequence used by `just` itself, and can be used to make
  recipe output match `just`'s own output.

  Recognized values for `name` are `'command'`, for echoed recipe lines,
  `error`, and `warning`.

  For example, to style an error message:

  ```just
  scary:
    @echo '{{ style("error") }}OH NO{{ NORMAL }}'
  ```

##### User Directories

These functions<sup>1.23.0</sup> return paths to user-specific directories for
things like configuration, data, caches, executables, and the user's home
directory.

On Unix, these functions follow the
[XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html).

On MacOS and Windows, these functions return the system-specified user-specific
directories. For example, `cache_directory()` returns `~/Library/Caches` on
MacOS and `{FOLDERID_LocalAppData}` on Windows.

See the [`dirs`](https://docs.rs/dirs/latest/dirs/index.html) crate for more
details.

- `cache_directory()` - The user-specific cache directory.
- `config_directory()` - The user-specific configuration directory.
- `config_local_directory()` - The local user-specific configuration directory.
- `data_directory()` - The user-specific data directory.
- `data_local_directory()` - The local user-specific data directory.
- `executable_directory()` - The user-specific executable directory.
- `home_directory()` - The user's home directory.
- `runtime_directory()` - The user-specific runtime directory. Only defined on
  Linux.

If you would like to use XDG base directories on all platforms you can use the
`env(…)` function with the appropriate environment variable and fallback,
although note that the XDG specification requires ignoring non-absolute paths,
so for full compatibility with spec-compliant applications, you would need to
do:

```just
xdg_config_dir := if env('XDG_CONFIG_HOME', '') =~ '^/' {
  env('XDG_CONFIG_HOME')
} else {
  home_directory() / '.config'
}
```
