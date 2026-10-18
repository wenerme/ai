### Global Fallback Justfile

A global fallback justfile may be set with `--global-fallback-justfile <PATH>`,
or by setting the `JUST_GLOBAL_FALLBACK_JUSTFILE` environment variable.

If no justfile is found, or if the search for a fallback does not succeed, the
global fallback justfile is used instead. The working directory is set to the
root of the current project, as determined by the presence of a directory like
`.git`, or the invocation directory if no such directory is found. The global
fallback justfile may itself use `set fallback`.

The global fallback justfile is ignored when `--justfile`, `--global-justfile`,
or `--working-directory` is passed.
