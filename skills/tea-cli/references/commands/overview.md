# NAME

tea - command line tool to interact with Gitea

# SYNOPSIS

tea

# DESCRIPTION

tea is a productivity helper for Gitea. It can be used to manage most entities on
one or multiple Gitea instances & provides local helpers like 'tea pr checkout'.

tea tries to make use of context provided by the repository in $PWD if available.
tea works best in a upstream/fork workflow, when the local main branch tracks the
upstream repo. tea assumes that local git state is published on the remote before
doing operations with tea.    Configuration is persisted in $XDG_CONFIG_HOME/tea.

**Usage**:

```
tea [GLOBAL OPTIONS] [command [COMMAND OPTIONS]] [ARGUMENTS...]
```

# COMMANDS
