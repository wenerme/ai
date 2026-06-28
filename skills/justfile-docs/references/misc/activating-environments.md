### Activating Environments

Some tools require an activation step, such as Python virtual environments:

```sh
. .venv/bin/activate
```

Because these tools modify the environment of a running shell, it is not
possible for `just` to perform this activation step for you. However, there are
some workarounds.

The best workaround for Python environment management is to switch to
[`uv`](https://docs.astral.sh/uv/). `uv` sets up the correct environment for
each command, so no activation step is needed.

If that isn't possible, and for other tools, you can create a shared prelude
and include it in script recipes that need it. It can span multiple lines and
include any number of steps:

```just
prelude := '''
  set -eux
  . .venv/bin/activate
'''

[script]
run:
  {{ prelude }}
  python script.py
```

This workaround doesn't work with shell recipes, which spawn a new shell for
each command.

Contributing
------------

> [!NOTE]
> `just` is not currently accepting pull requests. The contributing section is
> retained for posterity.

`just` welcomes your contributions! `just` is released under the maximally
permissive
[CC0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt) public
domain dedication and fallback license, so your changes must also be released
under this license.
