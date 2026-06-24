### Command-line Options

`just` supports a number of useful command-line options for listing, dumping,
and debugging recipes and variables:

```console
$ just --list
Available recipes:
  js
  perl
  polyglot
  python
  ruby
$ just --show perl
perl:
  #!/usr/bin/env perl
  print "Larry Wall says Hi!\n";
$ just --show polyglot
polyglot: python js perl sh ruby
```

#### Setting Command-line Options with Environment Variables

Some command-line options can be set with environment variables

For example, unstable features can be enabled either with the `--unstable`
flag:

```console
$ just --unstable
```

Or by setting the `JUST_UNSTABLE` environment variable:

```console
$ export JUST_UNSTABLE=1
$ just
```

Since environment variables are inherited by child processes, command-line
options set with environment variables are inherited by recursive invocations
of `just`, whereas command-line options set with arguments are not.

Consult `just --help` for which options can be set with environment variables.
