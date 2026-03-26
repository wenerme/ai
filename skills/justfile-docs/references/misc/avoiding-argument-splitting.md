### Avoiding Argument Splitting

Given this `justfile`:

```just
foo argument:
  touch {{argument}}
```

The following command will create two files, `some` and `argument.txt`:

```console
$ just foo "some argument.txt"
```

The user's shell will parse `"some argument.txt"` as a single argument, but
when `just` replaces `touch {{argument}}` with `touch some argument.txt`, the
quotes are not preserved, and `touch` will receive two arguments.

There are a few ways to avoid this: quoting, positional arguments, and exported
arguments.

#### Quoting

Quotes can be added around the `{{argument}}` interpolation:

```just
foo argument:
  touch '{{argument}}'
```

This preserves `just`'s ability to catch variable name typos before running,
for example if you were to write `{{argument}}`, but will not do what you want
if the value of `argument` contains single quotes.

#### Positional Arguments

The `positional-arguments` setting causes all arguments to be passed as
positional arguments, allowing them to be accessed with `$1`, `$2`, …, and
`$@`, which can be then double-quoted to avoid further splitting by the shell:

```just
set positional-arguments

foo argument:
  touch "$1"
```

This defeats `just`'s ability to catch typos, for example if you type `$2`
instead of `$1`, but works for all possible values of `argument`, including
those with double quotes.

#### Exported Arguments

All arguments are exported when the `export` setting is set:

```just
set export

foo argument:
  touch "$argument"
```

Or individual arguments may be exported by prefixing them with `$`:

```just
foo $argument:
  touch "$argument"
```

This defeats `just`'s ability to catch typos, for example if you type
`$argument`, but works for all possible values of `argument`, including those
with double quotes.
