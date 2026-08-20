# Command Line Configuration Options

In addition to the [configuration file](./configuration.md), zellij can also be configured through the command line when running it. These options will override options in the configuration file.

> **Migration Note:** The `--disable-mouse-mode` and `--no-pane-frames` flags have been removed. Use `--mouse-mode false` (equivalent of `--disable-mouse-mode`) and `--pane-frames false` (equivalent of `--no-pane-frames`) instead.

Every option that can be set in the [configuration file](./options.md) also has a corresponding flag here, using the same name in kebab-case (eg. the `nested_session_handling` option is `--nested-session-handling`).

> **Note:** since `0.45.0` (which uses clap 4 for argument parsing), repeating the same flag no longer produces an error - the last occurrence overrides the previous ones. Help output is also styled and colored.

```
USAGE:
    zellij options [OPTIONS]

OPTIONS:
        --attach-to-session <ATTACH_TO_SESSION>
            Whether to attach to a session specified in "session-name" if it exists [possible
            values: true, false]

        --copy-clipboard <COPY_CLIPBOARD>
            OSC52 destination clipboard [possible values: system, primary]

        --copy-command <COPY_COMMAND>
            Switch to using a user supplied command for clipboard instead of OSC52

        --copy-on-select <COPY_ON_SELECT>
            Automatically copy when selecting text (true or false) [possible values: true, false]

        --dangerously-enable-paste-buffer-read <DANGEROUSLY_ENABLE_PASTE_BUFFER_READ>
            Allow programs running in panes to read the clipboard through OSC 52 (true or false)
            [possible values: true, false]

        --default-layout <DEFAULT_LAYOUT>
            Set the default layout

        --default-mode <DEFAULT_MODE>
            Set the default mode

        --default-shell <DEFAULT_SHELL>
            Set the default shell

        --disable-mouse-mode
            Disable handling of mouse events (REMOVED - use --mouse-mode false instead)

        --host-notification-protocol <HOST_NOTIFICATION_PROTOCOL>
            The protocol used to forward pane notifications to the host terminal [possible values:
            auto, osc9, osc99, bell, off]

        --layout-dir <LAYOUT_DIR>
            Set the layout_dir, defaults to subdirectory of config dir

        --mirror-session <MIRROR_SESSION>
            Mirror session when multiple users are connected (true or false) [possible values: true,
            false]

        --mouse-hover-tips <MOUSE_HOVER_TIPS>
            Show contextual help tips when hovering with the mouse (true or false) [possible values:
            true, false]

        --mouse-mode <MOUSE_MODE>
            Set the handling of mouse events (true or false) Can be temporarily bypassed by the
            [SHIFT] key [possible values: true, false]

        --mouse-scroll-resize <MOUSE_SCROLL_RESIZE>
            Resize the focused pane with Ctrl + ScrollWheel (true or false) [possible values: true,
            false]

        --nested-session-handling <NESTED_SESSION_HANDLING>
            How to handle a nested Zellij session running inside a pane [possible values: ask,
            fullscreen, descend, never]

        --no-pane-frames
            Disable display of pane frames (REMOVED - use --pane-frames false instead)

        --on-force-close <ON_FORCE_CLOSE>
            Set behaviour on force close (quit or detach)

        --osc133-command-selection <OSC133_COMMAND_SELECTION>
            Select the whole command and its output when triple-clicking inside OSC 133 marked
            output (true or false) [possible values: true, false]

        --pane-frames <PANE_FRAMES>
            Set display of the pane frames (true or false) [possible values: true, false]

        --pane-frame-style <PANE_FRAME_STYLE>
            Set the style of the pane frames [possible values: full, titles, none]

        --scroll-buffer-size <SCROLL_BUFFER_SIZE>
            The number of lines to keep in the scrollback buffer of each pane

        --scrollback-editor <SCROLLBACK_EDITOR>
            Explicit full path to open the scrollback editor (default is $EDITOR or $VISUAL)

        --session-name <SESSION_NAME>
            The name of the session to create when starting Zellij

        --simplified-ui <SIMPLIFIED_UI>
            Allow plugins to use a more simplified layout that is compatible with more fonts (true
            or false) [possible values: true, false]

        --stacked-pane-list <STACKED_PANE_LIST>
            Render stacked panes as a list of titles with the expanded pane at the bottom (true or
            false) [possible values: true, false]

        --support-kitty-graphics-protocol <SUPPORT_KITTY_GRAPHICS_PROTOCOL>
            Support the kitty graphics (image) protocol, if the terminal supports it (true or false)
            [possible values: true, false]

        --theme <THEME>
            Set the default theme

        --theme-dark <THEME_DARK>
            Set the theme to use when the host terminal is in dark mode

        --theme-dir <THEME_DIR>
            Set the theme_dir, defaults to subdirectory of config dir

        --theme-light <THEME_LIGHT>
            Set the theme to use when the host terminal is in light mode

        --word-separators <WORD_SEPARATORS>
            The characters (in addition to whitespace) that terminate a word when double-clicking
```
