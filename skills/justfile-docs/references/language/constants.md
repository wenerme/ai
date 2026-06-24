### Constants

A number of constants are predefined:

| Name | Value | Value on Windows |
|---|---|---|
| `HEX`<sup>1.27.0</sup> | `"0123456789abcdef"` |  |
| `HEXLOWER`<sup>1.27.0</sup> | `"0123456789abcdef"` |  |
| `HEXUPPER`<sup>1.27.0</sup> | `"0123456789ABCDEF"` |  |
| `PATH_SEP`<sup>1.41.0</sup> | `"/"` | `"\"` |
| `PATH_VAR_SEP`<sup>1.41.0</sup> | `":"` | `";"` |
| `CLEAR`<sup>1.37.0</sup> | `"\ec"` |  |
| `NORMAL`<sup>1.37.0</sup> | `"\e[0m"` |  |
| `BOLD`<sup>1.37.0</sup> | `"\e[1m"` |  |
| `ITALIC`<sup>1.37.0</sup> | `"\e[3m"` |  |
| `UNDERLINE`<sup>1.37.0</sup> | `"\e[4m"` |  |
| `INVERT`<sup>1.37.0</sup> | `"\e[7m"` |  |
| `HIDE`<sup>1.37.0</sup> | `"\e[8m"` |  |
| `STRIKETHROUGH`<sup>1.37.0</sup> | `"\e[9m"` |  |
| `BLACK`<sup>1.37.0</sup> | `"\e[30m"` |  |
| `RED`<sup>1.37.0</sup> | `"\e[31m"` |  |
| `GREEN`<sup>1.37.0</sup> | `"\e[32m"` |  |
| `YELLOW`<sup>1.37.0</sup> | `"\e[33m"` |  |
| `BLUE`<sup>1.37.0</sup> | `"\e[34m"` |  |
| `MAGENTA`<sup>1.37.0</sup> | `"\e[35m"` |  |
| `CYAN`<sup>1.37.0</sup> | `"\e[36m"` |  |
| `WHITE`<sup>1.37.0</sup> | `"\e[37m"` |  |
| `BG_BLACK`<sup>1.37.0</sup> | `"\e[40m"` |  |
| `BG_RED`<sup>1.37.0</sup> | `"\e[41m"` |  |
| `BG_GREEN`<sup>1.37.0</sup> | `"\e[42m"` |  |
| `BG_YELLOW`<sup>1.37.0</sup> | `"\e[43m"` |  |
| `BG_BLUE`<sup>1.37.0</sup> | `"\e[44m"` |  |
| `BG_MAGENTA`<sup>1.37.0</sup> | `"\e[45m"` |  |
| `BG_CYAN`<sup>1.37.0</sup> | `"\e[46m"` |  |
| `BG_WHITE`<sup>1.37.0</sup> | `"\e[47m"` |  |

```just
@foo:
  echo {{HEX}}
```

```console
$ just foo
0123456789abcdef
```

Constants starting with `\e` are
[ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code).

`CLEAR` clears the screen, similar to the `clear` command. The rest are of the
form `\e[Nm`, where `N` is an integer, and set terminal display attributes.

Terminal display attribute escape sequences can be combined, for example text
weight `BOLD`, text style `STRIKETHROUGH`, foreground color `CYAN`, and
background color `BG_BLUE`. They should be followed by `NORMAL`, to reset the
terminal back to normal.

Escape sequences should be quoted, since `[` is treated as a special character
by some shells.

```just
@foo:
  echo '{{BOLD + STRIKETHROUGH + CYAN + BG_BLUE}}Hi!{{NORMAL}}'
```
