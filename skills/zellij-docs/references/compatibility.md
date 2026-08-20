# Compatibility

## Issues
Please report issues [here.](https://github.com/zellij-org/zellij/issues)

---------------------------

# Terminal Features

Zellij sits between the programs running in its panes and the terminal emulator it runs in. Some terminal capabilities are therefore passed through, translated or emulated. When Zellij starts, it queries the terminal it is running in for the features it supports, and only advertises those to the programs running inside panes.

## Images (kitty graphics protocol)

Programs running inside panes can display images using the [kitty graphics protocol](https://sw.kovidgoyal.net/kitty/graphics-protocol/). Zellij keeps track of image placements per pane, so images survive resizing, relayouts, scrolling through the scrollback, fullscreen, and floating or pinned panes.

This requires the host terminal to support the protocol, which is queried when Zellij starts. It can be turned off with the [`support_kitty_graphics_protocol`](./options.md#support_kitty_graphics_protocol) option (changing it requires restarting Zellij).

## Sixel

Sixel graphics are supported. Sixel support is only advertised to programs running in panes (through `DA1` and `XTSMGRAPHICS`) if the terminal Zellij is attached to actually supports Sixel. In previous versions it was advertised unconditionally, which could cause programs to emit Sixel data into terminals that could not display it.

## Desktop notifications

Programs running in panes can raise desktop notifications through `OSC 9`, `OSC 99` (the kitty notification protocol) and `OSC 777`. Zellij forwards them to all attached host terminals, using the protocol selected by the [`host_notification_protocol`](./options.md#host_notification_protocol) option:

- `auto` (default) - `OSC 99` for terminals that support it (eg. kitty), `OSC 9` otherwise
- `osc9` / `osc99` - always use the given protocol
- `bell` - emit a terminal bell instead
- `off` - do not forward notifications

Whether a notification is actually shown is up to the host terminal and the operating system.

## Terminal focus reporting

Focus in/out events reported by the host terminal (`CSI I` / `CSI O`) are tracked per connected client and forwarded to panes that enabled focus reporting (mode `1004`). This also works across [nested sessions](./nested-sessions.md).

## Clipboard (OSC 52)

Copying to the system clipboard through `OSC 52` works as before, and this capability is advertised to programs through `DA1`. If the terminal does not support `OSC 52`, an external utility can be used instead with the [`copy_command`](./options.md#copy_command) option.

**Reading** the clipboard through `OSC 52` is disabled by default since `0.45.0`: programs asking for the clipboard contents receive an empty reply. It can be enabled with the [`dangerously_enable_paste_buffer_read`](./options.md#dangerously_enable_paste_buffer_read) option, but note that once enabled, any program in any pane - including one running on a remote machine over SSH - can read the clipboard without prompting.

## Terminal color scheme

Zellij follows the color scheme reported by the host terminal (`DSR 997` replies and `CSI 2031` notifications) and can switch between a light and a dark theme accordingly - see [themes](./themes.md#automatic-dark-and-light-theme-switching). Programs running in panes can subscribe to these notifications themselves with `CSI ? 2031 h`, and query the current mode with `DECRQM`; Zellij answers these queries itself.

---------------------------

# Known Issues

## The status bar fonts don't render correctly:

This most likely is caused by a missing character in the font.

Fonts from [nerdfonts](https://github.com/ryanoasis/nerd-fonts) can fix this problem.

Some Options:

| Package Manager   |      Name      |
|-------------------|:--------------:|
| apt               |fonts-powerline |
| nix               |    nerdfonts   |

Post installation the appropriate environment needs to be aware of the font.

## Alt button mapping on Mac hardware (Darwin systems):

This can be mitigated individually on a terminal emulator level,
see [the FAQ](./faq.md#i-am-a-macos-user-how-can-i-use-the-alt-key) for more information.

## Pane frame title has issues with kitty:

This sadly seems to be an issue that can not be mitigated easily,
more information can be found [here](https://github.com/zellij-org/zellij/issues/689#issuecomment-914057955).

## Mouse issues:

If `mouse_mode` is turned on zellij handles these events, zellij provides an
escape mechanism in the form of the `SHIFT` Key, once it is pressed zellij lets
the terminal handle selection, clicking on links, copying, scrolling.

More information can be found [here](https://github.com/zellij-org/zellij/issues/627)

## Clipboard not working:

This is a known problem which mostly occurs in specific terminal emulators
under Linux/OS X such as GNOMEs default Terminal, terminator, and more.

A workaround for this was added in zellij > 0.24.0 and enables the user to
specify a custom command that copies selected text to the system clipboard.
Refer to lines containing "copy_command" from the output of `zellij setup
--dump-config`.

Note that since `0.45.0`, the `copy_command` process is no longer killed while it
still owns the selection, which fixes copying with utilities such as `wl-copy`.

For technical background, refer to [this
issue](https://github.com/zellij-org/zellij/issues/627) and [this merge
request](https://github.com/zellij-org/zellij/pull/996)

## Backspace sending ctrl-h (entering into `Move` mode)
This can happen in some terminal emulators (eg. Xterm). It can be remedied either on the terminal emulator side by getting the terminal emulator to send `^?` instead of `^H`, or on the Zellij side by remapping ctrl-h to some other key. Here's an example fix in xterm: http://www.hypexr.org/linux_ruboff.php

## Weird colors in certain applications running inside Zellij
This might happen due to Zellij support of the extended "styled_underlines" feature. You can try disabling them by adding `styled_underlines false` to your config.
