### Timestamps

`just` can print timestamps before each recipe command:

```just
recipe:
  echo one
  sleep 2
  echo two
```

```
$ just --timestamp recipe
[07:28:46] echo one
one
[07:28:46] sleep 2
[07:28:48] echo two
two
```

By default, timestamps are formatted as `HH:MM:SS`. The format can be changed
with `--timestamp-format`:

```
$ just --timestamp recipe --timestamp-format '%H:%M:%S%.3f %Z'
[07:32:11:.349 UTC] echo one
one
[07:32:11:.350 UTC] sleep 2
[07:32:13:.352 UTC] echo two
two
```

The argument to `--timestamp-format` is a `strftime`-style format string, see
the
[`chrono` library docs](https://docs.rs/chrono/latest/chrono/format/strftime/index.html)
for details.

The `[timestamp]` attribute<sup>1.58.0</sup> can be used to enable timestamps
for a specific recipe:

```just
[timestamp]
foo:
  echo hello
```

```
$ just foo
[07:28:46] echo hello
hello
```

Which may include a format string:

```just
[timestamp('%H:%M:%S%.3f')]
foo:
  echo hello
```

```
$ just foo
[07:28:46.487] echo hello
hello
```
