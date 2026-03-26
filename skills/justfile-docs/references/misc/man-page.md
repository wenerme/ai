### Man Page

`just` can print its own man page with `just --man`. Man pages are written in
[`roff`](https://en.wikipedia.org/wiki/Roff_%28software%29), a venerable markup
language and one of the first practical applications of Unix. If you have
[`groff`](https://www.gnu.org/software/groff/) installed you can view the man
page with  `just --man | groff -mandoc -Tascii | less`.
