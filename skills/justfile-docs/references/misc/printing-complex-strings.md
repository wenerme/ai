### Printing Complex Strings

`echo` can be used to print strings, but because it processes escape sequences,
like `\n`, and different implementations of `echo` recognize different escape
sequences, using `printf` is often a better choice.

`printf` takes a C-style format string and any number of arguments, which are
interpolated into the format string.

This can be combined with indented, triple quoted strings to emulate shell
heredocs.

Substitution complex strings into recipe bodies with `{…}` can also lead to
trouble as it may be split by the shell into multiple arguments depending on
the presence of whitespace and quotes. Exporting complex strings as environment
variables and referring to them with `"$NAME"`, note the double quotes, can
also help.

Putting all this together, to print a string verbatim to standard output, with
all its various escape sequences and quotes undisturbed:

```just
export FOO := '''
  a complicated string with
  some dis\tur\bi\ng escape sequences
  and "quotes" of 'different' kinds
'''

bar:
  printf %s "$FOO"
```
