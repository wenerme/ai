### Shell Completion Scripts

Shell completion scripts for Bash, Elvish, Fish, Nushell, PowerShell, and Zsh
are available in [release archives](https://github.com/casey/just/releases).

The `just` binary can also generate the same completion scripts at runtime
using `just --completions SHELL`:

```console
$ just --completions bash > just
```

#### Bash

The recommended approach is to use the `bash-completions` package to lazy-load
the completion script:

```bash
mkdir -p ~/.local/share/bash-completion/completions
just --completions bash > ~/.local/share/bash-completion/completions/just
```

If `bash-completions` is not installed, you can source the completion script in
your `.bashrc`:

```bash
source <(just --completions bash)
```

If you use an alias like `alias j=just`, you should also save the completion
script with the name `j` when lazy-loading:

```bash
just --completions bash > ~/.local/share/bash-completion/completions/j
```

Or if not lazy-loading, add this line after sourcing the completion script in
your `.bashrc`:

```bash
complete -F _clap_complete_just -o bashdefault -o default j
```

#### Elvish

In your `rc.elv`:

```elvish
set edit:completion:arg-completer[just] = { |@args|
  eval (just --completions elvish | slurp)
  set @result = (edit:completion:arg-completer[just] $@args)
  put $@result
}
```

#### Fish

Save the completion script to the completions directory to lazy-load it:

```fish
mkdir -p ~/.config/fish/completions
just --completions fish > ~/.config/fish/completions/just.fish
```

#### Nushell

First save the completion script:

```nu
just --completions nushell | save -f ($nu.default-config-dir | path join just.nu)
```

Then in `config.nu`:

```nu
source just.nu
```

#### PowerShell

In your PowerShell `$PROFILE`:

```powershell
just --completions powershell | Out-String | Invoke-Expression
```

#### Zsh

First save the completion script:

```zsh
mkdir -p ~/.zsh/completions
just --completions zsh > ~/.zsh/completions/_just
```

Then in your `.zshrc`:

```zsh
fpath=(~/.zsh/completions $fpath)
autoload -U compinit
compinit
```
