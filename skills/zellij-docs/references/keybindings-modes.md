# Modes
The keybindings are divided into several modes. Each mode has its separate keybindings.

eg.
```javascript
keybinds {
    normal {
        // keybindings available in normal mode
    }
    pane {
        // keybindings available in pane mode
    }
}
```

The available modes are:
- normal
- locked
- resize
- pane
- move
- tab
- scroll
- search
- entersearch
- renametab
- renamepane
- session
- tmux

## A note about `scroll` mode

Leaving `scroll` mode keeps the scroll position of the pane - the pane is no longer scrolled back down to the bottom automatically. To scroll to the bottom and leave the mode, use a binding that includes the [`ScrollToBottom`](./keybindings-possible-actions.md#scrolltobottom) action.

Focusing a pane that is scrolled back automatically enters `scroll` mode, and focusing a pane that is not scrolled back returns to `normal` mode.

Scrolling a pane also enters and exits `scroll` mode implicitly. This can be turned off with the [`scroll_mode_sync`](./options.md#scroll_mode_sync) option, in which case `scroll` mode is only entered through an explicit keybinding.
