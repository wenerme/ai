### Paths on Windows

On Windows, all functions that return paths, except `invocation_directory()`,
will return `\`-separated paths. When not using PowerShell or `cmd.exe`, these
paths should be quoted to prevent the `\`s from being interpreted as character
escapes:

```just
ls:
    echo '{{absolute_path(".")}}'
```

`cygpath.exe` is an executable included in some distributions of Unix userlands
for Windows, including [Cygwin](https://www.cygwin.com/) and
[Git](https://git-scm.com/downloads) for Windows.

`just` uses `cygpath.exe` in two places:

For backwards compatibility, `invocation_directory()`, uses `cygpath.exe` to
convert the invocation directory into a unix-style `/`-separated path. Use
`invocation_directory_native()` to get the native, Windows-style path. On unix,
`invocation_directory()` and `invocation_directory_native()` both return the
same unix-style path.

`cygpath.exe` is also used to convert Unix-style shebang lines into
Windows paths. As an alternative, the `[script]` attribute can be used, which
does not depend on `cygpath.exe`.

If `cygpath.exe` is available, you can use it to convert between path styles:

```just
foo_unix := '/hello/world'
foo_windows := shell('cygpath --windows $1', foo_unix)

bar_windows := 'C:\hello\world'
bar_unix := shell('cygpath --unix $1', bar_windows)
```
