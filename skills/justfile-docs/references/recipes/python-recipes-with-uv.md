### Python Recipes with `uv`

[`uv`](https://github.com/astral-sh/uv) is an excellent cross-platform python
project manager, written in Rust.

Using the `[script]` attribute and `script-interpreter` setting, `just` can
easily be configured to run Python recipes with `uv`:

```just
set script-interpreter := ['uv', 'run', '--script']

[script]
hello:
  print("Hello from Python!")

[script]
goodbye:
  # /// script
  # requires-python = ">=3.11"
  # dependencies=["sh"]
  # ///
  import sh
  print(sh.echo("Goodbye from Python!"), end='')
```

Of course, a shebang also works:

```just
hello:
  #!/usr/bin/env -S uv run --script
  print("Hello from Python!")
```
