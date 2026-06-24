### Janus

[Janus](https://github.com/casey/janus) is a tool for checking whether a change
to `just` breaks or changes the interpretation of existing `justfile`s. It
collects and analyzes public `justfile`s on GitHub.

Before merging a particularly large or gruesome change, Janus should be run to
make sure that nothing breaks. Don't worry about running Janus yourself, Casey
will happily run it for you on changes that need it.
