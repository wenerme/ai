# Shell Integration (OSC 133)

Since version `0.45.0`, Zellij understands the OSC 133 "semantic prompt" escape sequences. When the shell running in a pane emits them, Zellij knows where each prompt starts, where the command that was typed begins and ends, where its output begins and ends, and what exit status it had.

There is nothing to configure on the Zellij side: the marks are parsed whenever the shell emits them.

## Getting the shell to emit OSC 133

The sequences Zellij looks for are:

| Sequence | Meaning |
|---|---|
| `OSC 133 ; A` | Start of the prompt |
| `OSC 133 ; P` | Start of the prompt (with properties) |
| `OSC 133 ; B` | End of the prompt / start of the typed command |
| `OSC 133 ; I` | Start of the typed command |
| `OSC 133 ; C` | Start of the command output |
| `OSC 133 ; D ; <exit-status>` | End of the command, with its exit status |

`fish` emits these by default. `bash` and `zsh` need a shell integration snippet - the ones distributed for other terminals (eg. kitty, WezTerm, VS Code) emit the same standard sequences and work with Zellij as well.

## What it enables

### Selecting a command and its output

Triple-clicking inside output that was marked with OSC 133 selects the whole command along with its output, rather than the logical line under the cursor. This can be turned off with the [`osc133_command_selection`](./options.md#osc133_command_selection) option (it is on by default), in which case triple-click selects the logical line as before.

The same can be done from the keyboard with the [`SelectCommandAtScrollPosition`](./keybindings-possible-actions.md#selectcommandatscrollposition) action (bound to `m` in `scroll` and `search` modes), which selects the command and output at the current scroll position.

### Navigating the scrollback by prompt

Instead of scrolling line by line, the scrollback can be jumped through prompt by prompt:

| Action | Default binding |
|---|---|
| [`ScrollToPreviousPrompt`](./keybindings-possible-actions.md#scrolltopreviousprompt) | `[` in `scroll` and `search` modes |
| [`ScrollToNextPrompt`](./keybindings-possible-actions.md#scrolltonextprompt) | `]` in `scroll` and `search` modes |

### Copying the output of the last command

The [`CopyLastCommandOutput`](./keybindings-possible-actions.md#copylastcommandoutput) action (bound to `c` in `scroll` mode) copies the output of the last command run in the focused pane to the clipboard, using the OSC 133 marks to find its boundaries. The copied region is briefly flashed in the pane.

Since the marks include the exit status of each command, Zellij is also able to indicate which commands failed (eg. in the titles of collapsed panes in a stack).

## Word selection

Not strictly part of OSC 133, but related to selecting text: the characters that terminate a word when double-clicking can be configured with the [`word_separators`](./options.md#word_separators) option. Whitespace always separates words. The default is:

```javascript
word_separators "[]{}<>()"
```
