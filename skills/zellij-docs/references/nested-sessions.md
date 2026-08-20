# Nested Sessions

Since version `0.45.0`, running Zellij inside a Zellij pane (for example after `ssh`-ing into a remote machine and starting Zellij there) is a first-class workflow.

The inner session (the **guest**) announces itself to the outer session (the **host**) through an in-band protocol. Guest sessions detect that they are nested by way of the `ZELLIJ` environment variable, which Zellij sets in all the panes it opens.

**Note:** attaching to a session from inside itself is still not possible, and remains blocked.

## What happens when focusing a nested session

The behavior of the host session when its user focuses a pane containing a guest session is controlled by the [`nested_session_handling`](./options.md#nested_session_handling) configuration option:

| Value | Behavior |
|---|---|
| `ask` (default) | A prompt is displayed when focusing the pane, offering either to zoom into the nested session or to take control of it |
| `fullscreen` | The pane containing the nested session is always zoomed into on focus |
| `descend` | Input is always routed to the nested session on focus |
| `never` | Nothing happens automatically |

```javascript
nested_session_handling "descend"
```

## Descending and ascending

When "descending" into a guest session, keyboard and mouse input are routed to the guest rather than being handled by the host. To make this obvious, the host's own chrome (its tab-bar, status-bar and pane frames) is dimmed while descended.

To go back up to the host session ("ascend"), either click on the dimmed host chrome or use the host's keybinding for it.

The relevant actions, all bindable in the [`keybinds`](./keybindings.md) block:

| Action | Default binding | Behavior |
|---|---|---|
| [`FocusGuestSession`](./keybindings-possible-actions.md#focusguestsession) | `[` in `session` mode | Descend into the guest session in the focused pane |
| [`FocusHostSession`](./keybindings-possible-actions.md#focushostsession) | `]` in `session` mode | Return focus to the host session |
| [`ToggleHostFullscreen`](./keybindings-possible-actions.md#togglehostfullscreen) | `f` in `session` mode | Toggle the fullscreen state of this session's pane inside the host session |

Note that `FocusHostSession` and `ToggleHostFullscreen` are issued from within the guest session, and act on the host containing it. They have no effect in a session that is not nested.

These actions are also available through the CLI and the [plugin API](./plugin-api-commands.md) (`focus_host_session`).

## Other behaviors that are aware of nesting

- Desktop notifications emitted by panes in a guest session are forwarded up through the host to the terminal (see [desktop notifications](./compatibility.md#desktop-notifications)).
- Terminal focus in/out events received by the host are forwarded to the guest, and from there to panes that requested them.
