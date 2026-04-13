---
name: zellij-docs
description: Use when configuring, scripting, or troubleshooting zellij — including layouts (KDL), keybindings, sessions, CLI actions, plugins, themes, or config options
---

# Zellij Docs

You are a zellij expert. Config: `~/.config/zellij/` (or `$ZELLIJ_CONFIG_DIR`).

## Quick Reference

```bash
# Sessions
zellij                              # new session
zellij -s my-session                # named session
zellij attach [name]                # attach (last if no name)
zellij list-sessions
zellij kill-session <name>
zellij delete-session <name>
zellij kill-all-sessions

# Layout on start
zellij --layout dev                 # from layouts/ dir
zellij --layout /path/to/file.kdl

# Setup helpers
zellij setup --dump-config          # print default config.kdl
zellij setup --dump-layout default  # print default layout
zellij setup --check                # validate config/plugins

# Run command in new pane (shorthand for action new-pane)
zellij run -- <command>
zellij run -f -- <command>          # floating pane
zellij run -c -- <command>          # close pane on exit
zellij run -d right -- <command>    # open to the right

# Edit file in new pane
zellij edit <file>
zellij edit -f <file>               # floating

# Send action to running session
zellij action <ACTION>
zellij --session my-session action <ACTION>
```

## CLI Actions

```bash
# Panes
zellij action new-pane [-d up|down|left|right] [-f] [-n NAME] [-- cmd]
zellij action close-pane
zellij action focus-next-pane / focus-previous-pane
zellij action move-pane [-d direction]
zellij action resize-pane [-d Left|Right|Up|Down|Increase|Decrease]
zellij action toggle-fullscreen
zellij action toggle-floating-panes
zellij action rename-pane <NAME>

# Tabs
zellij action new-tab [--layout PATH] [--name NAME] [--cwd PATH]
zellij action close-tab
zellij action go-to-tab <INDEX>
zellij action go-to-tab-name <NAME>
zellij action rename-tab <NAME>
zellij action move-tab [-d left|right]

# Sessions
zellij action detach
zellij action switch-session <NAME>

# Scroll
zellij action scroll-up / scroll-down
zellij action page-scroll-up / page-scroll-down
zellij action scroll-to-top / scroll-to-bottom
zellij action edit-scrollback

# Input
zellij action write <bytes...>
zellij action write-chars "<STRING>"
zellij action clear-screen
zellij action dump-screen /path/to/file
```

## Config (`~/.config/zellij/config.kdl`)

```kdl
default_shell "fish"
default_layout "compact"        // layout name in layouts/ dir
default_mode "normal"           // or "locked"
theme "catppuccin-mocha"
pane_frames true
mouse_mode true
scroll_buffer_size 10000
copy_on_select true
copy_command "pbcopy"
on_force_close "detach"         // or "quit"
mirror_session false
simplified_ui false

keybinds {
    normal {
        bind "Ctrl g" { SwitchToMode "locked"; }
        bind "Alt n"  { NewPane; }
    }
    shared_except "locked" {
        bind "Ctrl q" { Quit; }
    }
    pane {
        bind "h" "Left"  { MoveFocus "Left"; }
        bind "l" "Right" { MoveFocus "Right"; }
        bind "j" "Down"  { MoveFocus "Down"; }
        bind "k" "Up"    { MoveFocus "Up"; }
        bind "f" { ToggleFocusFullscreen; SwitchToMode "Normal"; }
        bind "Esc" { SwitchToMode "Normal"; }
    }
}
```

## Layouts (`~/.config/zellij/layouts/*.kdl`)

```kdl
layout {
    tab name="editor" split_direction="vertical" {
        pane size="60%" edit="src/main.rs"
        pane size="40%" split_direction="horizontal" {
            pane command="cargo" { args "watch" "-x" "test"; }
            pane
        }
    }
    tab name="shell" {
        pane
        pane floating=true { command "htop"; }
    }
}
```

Key pane attributes: `split_direction`, `size`, `name`, `command`, `args`, `edit`, `cwd`, `focus`, `borderless`, `floating`, `close_on_exit`

Templates:
```kdl
layout {
    pane_template name="with-tests" {
        pane split_direction="horizontal" {
            children
            pane command="cargo" size="30%" { args "test"; }
        }
    }
    default_tab_template {
        pane size=1 borderless=true { plugin location="zellij:tab-bar"; }
        children
        pane size=2 borderless=true { plugin location="zellij:status-bar"; }
    }
    tab name="dev" {
        with-tests { pane edit="src/main.rs"; }
    }
}
```

## Built-in Plugins

```kdl
plugin location="zellij:tab-bar"
plugin location="zellij:status-bar"
plugin location="zellij:compact-bar"
plugin location="zellij:strider"          // file explorer
plugin location="zellij:session-manager"
plugin location="zellij:welcome-screen"
```

## Themes

Built-in: `default`, `catppuccin-mocha`, `catppuccin-latte`, `catppuccin-frappe`, `catppuccin-macchiato`, `nord`, `gruvbox-dark`, `gruvbox-light`, `tokyo-night-dark`, `tokyo-night-light`, `dracula`, `solarized-dark`, `one-half-dark`

## Detailed References

| File | Contents |
|------|----------|
| [cli-commands.md](references/cli-commands.md) | Full CLI command reference |
| [cli-actions.md](references/cli-actions.md) | All `zellij action` subcommands |
| [configuration-options.md](references/configuration-options.md) | All config.kdl options |
| [keybindings-possible-actions.md](references/keybindings-possible-actions.md) | All bindable actions |
| [layouts.md](references/layouts.md) | Layout KDL reference |
| [layouts-templates.md](references/layouts-templates.md) | pane_template / tab_template |
| [swap-layouts.md](references/swap-layouts.md) | Swap layouts feature |
| [themes.md](references/themes.md) | Theme configuration |
| [options.md](references/options.md) | Options reference |
| [controlling-zellij-through-cli.md](references/controlling-zellij-through-cli.md) | Programmatic control |
| [plugins.md](references/plugins.md) | Plugin overview |
| [plugin-api.md](references/plugin-api.md) | Plugin API |
| [integration.md](references/integration.md) | Shell/editor integration |
