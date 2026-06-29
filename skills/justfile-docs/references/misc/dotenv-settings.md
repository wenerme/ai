### Dotenv Settings

If any of `dotenv-load`, `dotenv-filename`, `dotenv-override`, `dotenv-path`,
or `dotenv-required` are set, `just` will try to load environment variables
from a file.

If `dotenv-path` is set, `just` will look for a file at the given path, which
may be absolute, or relative to the working directory.

The command-line option `--dotenv-path`, short form `-E`, can be used to set or
override `dotenv-path` at runtime.

If `dotenv-filename` is set, `just` will look for a file at the given path,
relative to the working directory and each of its ancestors.

The command-line option `--dotenv-filename`, short form `-F`, can be used to
set or override `dotenv-filename` at runtime.

If `dotenv-filename` is not set, but `dotenv-load` or `dotenv-required` are
set, `just` will look for a file named `.env`, relative to the working directory
and each of its ancestors.

`dotenv-filename` and `dotenv-path` are similar, but `dotenv-path` is only
checked relative to the working directory, whereas `dotenv-filename` is checked
relative to the working directory and each of its ancestors.

It is not an error if an environment file is not found, unless
`dotenv-required` is set.

The loaded variables are environment variables, not `just` variables, and so
must be accessed using `$VARIABLE_NAME` in recipes and backticks.

If `dotenv-override` is set, variables from the environment file will override
existing environment variables.

If `dotenv-command` is set, `just` runs it with the configured `shell` and loads
its standard output as an environment file.

This is useful for sourcing secrets from a secret manager or vault:

```just
set dotenv-command := 'sops -d .enc.env'
```

The command-line option `--dotenv-command` can be used to set or override
`dotenv-command` at runtime, and may be passed multiple times. Each value is
run as a command, with variables from later commands taking precedence over
variables from earlier commands.

For example, if your `.env` file contains:

```console
# a comment, will be ignored
DATABASE_ADDRESS=localhost:6379
SERVER_PORT=1337
```

And your `justfile` contains:

```just
set dotenv-load

serve:
  @echo "Starting server with database $DATABASE_ADDRESS on port $SERVER_PORT…"
  ./server --database $DATABASE_ADDRESS --port $SERVER_PORT
```

`just serve` will output:

```console
$ just serve
Starting server with database localhost:6379 on port 1337…
./server --database $DATABASE_ADDRESS --port $SERVER_PORT
```

Variables in environment files loaded in parent modules are inherited by
submodules.

Environment files are loaded in submodules<sup>1.49.0</sup> and may override
variables defined in parent module environment files.
