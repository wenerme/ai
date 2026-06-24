---
name: ghostty-docs
description: "Ghostty terminal emulator documentation — fast, native, cross-platform GPU-accelerated terminal. Covers configuration reference, keybindings, shell integration, themes, AppleScript automation, installation (binary/package/build from source), release notes, Linux/systemd setup, troubleshooting (GTK OpenGL, macOS login shells, terminfo, tiling WMs), and VT100/xterm virtual terminal reference (CSI, ESC, OSC, DCS, mode sequences). USE THIS SKILL WHEN the user asks about Ghostty config, keybindings, themes, terminal escape sequences, or installation."
version: 0.1.0
---

# Ghostty Documentation

Official docs for [Ghostty](https://ghostty.org) — a fast, native, cross-platform terminal emulator written in Zig.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (100 docs)

### Configuration
- `references/config/reference.mdx` — Complete configuration reference (all options)
- `references/config/index.mdx` — Configuration overview
- `references/config/keybind/reference.mdx` — Keybinding reference
- `references/config/keybind/sequence.mdx` — Key sequences
- `references/config/keybind/index.mdx` — Keybinding overview

### Features
- `references/features/shell-integration.mdx` — Shell integration (bash/zsh/fish)
- `references/features/theme.mdx` — Theming
- `references/features/applescript.mdx` — AppleScript automation

### Installation & Release Notes
- `references/install/binary.mdx` — Binary download
- `references/install/package.mdx` — Package managers
- `references/install/build.mdx` — Build from source
- `references/install/release-notes/` — Release notes (1.0.1 → 1.3.0)

### Troubleshooting
- `references/help/` — GTK OpenGL, macOS login shells, tiling WMs, terminfo, synchronized output

### Linux
- `references/linux/systemd.mdx` — systemd integration

### Virtual Terminal Reference (66 docs)
- `references/vt/reference.mdx` — VT reference overview
- `references/vt/csi/` — CSI sequences (cursor movement, editing, scrolling, etc.)
- `references/vt/esc/` — ESC sequences (DECSC, DECRC, RIS, etc.)
- `references/vt/osc/` — OSC sequences (title, clipboard, hyperlinks, colors)
- `references/vt/dcs/` — DCS sequences
- `references/vt/mode/` — Terminal modes (DECCKM, DECOM, DECAWM, etc.)
