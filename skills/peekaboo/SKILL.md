---
name: peekaboo
description: "Use when using Peekaboo as an installed macOS automation CLI or MCP server: screenshots, UI inspection, clicking, typing, app/window/menu/dialog/Dock/clipboard/Spaces control, AI agent runs, permissions, or automation troubleshooting."
---

# Peekaboo

USE THIS SKILL WHEN you need to **use** Peekaboo from the CLI or as MCP tools to automate macOS UI. This skill is user-facing only: focus on installed command behavior, workflows, permissions, targeting, and troubleshooting. Do **not** include build, source-code, or contributor instructions.

Current baseline: Peekaboo CLI 3.2.x. Always confirm exact flags with `peekaboo help <command>` because the CLI evolves.

## Hard Rules

- MUST start by confirming automation capability when a flow fails or the machine is unfamiliar:
  - `peekaboo permissions status --json`
  - `peekaboo bridge status --json`
- MUST prefer the reliable loop: **observe → act → verify**.
  1. Observe with `peekaboo see --json --annotate ...` or `peekaboo list ... --json`.
  2. Act with element IDs, semantic commands, or targeted app/window options.
  3. Verify with a fresh `see`, `list`, or command result.
- MUST use `--json`/`-j` for scripting or when parsing output.
- NEVER treat `see` element IDs as long-lived. Refresh `see` after any UI-changing action.
- NEVER use raw coordinates first when an element ID, query, app/window target, menu command, dialog command, or window command is available.
- Ask before destructive or externally visible actions such as sending messages, deleting files, purchasing, publishing, or force-quitting user apps.
- Avoid disturbing the active desktop when possible: target `--app`, `--pid`, `--window-id`, or use background-capable operations. Use `--no-remote` only when you intentionally want local in-process execution instead of a Bridge host.

## Discovery Commands

```bash
peekaboo --version
peekaboo help <command>
peekaboo learn              # full agent-oriented guide
peekaboo tools --json       # MCP/tool catalog
peekaboo permissions status --json
peekaboo bridge status --json
```

Global runtime flags commonly available:

- `--json`/`-j` / `--json-output`: machine-readable output.
- `--verbose`/`-v`, `--log-level trace|verbose|debug|info|warning|error|critical`.
- `--no-remote`: skip Bridge hosts and run locally.
- `--bridge-socket <path>`: select a Bridge socket.
- `--input-strategy actionFirst|synthFirst|actionOnly|synthOnly`: choose AX actions vs synthesized input strategy.

## Permission and Bridge Model

Peekaboo needs macOS permissions for real automation:

- Screen Recording: screenshots, visual detection, `see`, `image`, capture.
- Accessibility: UI tree, clicks/actions, windows, menus, dialogs, Dock.
- Event Synthesizing / post events: some background or targeted input paths.

Use:

```bash
peekaboo permissions status --json
peekaboo permissions grant
peekaboo permissions request-event-synthesizing
peekaboo bridge status --json
```

Bridge lets the CLI delegate permission-bound operations to a host app that already has TCC permissions. `bridge status` explains whether Peekaboo.app, Claude.app, ClawdBot.app, or local fallback will be used. If behavior differs between Bridge and local execution, retry with `--no-remote` to isolate permission/host issues.

## Core Workflow

### 1. Find apps, windows, screens, and state

```bash
peekaboo list apps --json
peekaboo list windows --app Safari --json
peekaboo window list --app "Google Chrome" --json
peekaboo list screens --json
peekaboo list menubar --json
```

Prefer `window_id` from JSON output for deterministic targeting. Use partial `--window-title` only when stable enough.

### 2. Observe the UI

Use `see` when you need clickable element IDs (`B1`, `T2`, etc.) and snapshot-aware targeting:

```bash
peekaboo see --app Safari --window-title "Login" --json --annotate --path /tmp/peekaboo-see.png
peekaboo see --mode screen --screen-index 0 --json --annotate --path /tmp/screen.png
peekaboo see --app frontmost --json
peekaboo see --app menubar --menubar --json
```

Use `image` when you only need a screenshot or AI image analysis, not an element map:

```bash
peekaboo image --mode screen --screen-index 0 --retina --path /tmp/screen.png
peekaboo image --app Safari --window-title "Dashboard" --analyze "Summarize visible KPIs" --json
peekaboo image --mode area --region 100,100,800,600 --path /tmp/region.png
```

### 3. Act with the most semantic command available

Common interaction commands:

```bash
peekaboo click --on B1 --app Safari --json
peekaboo click "Submit" --wait-for 3000 --json
peekaboo move --on B1 --smooth --profile human
peekaboo set-value "user@example.com" --on T1 --snapshot <snapshot-id> --json
peekaboo paste --text "long text" --app TextEdit --json
peekaboo type "short text" --app TextEdit --return --json
peekaboo press tab --count 3 --app Safari
peekaboo hotkey "cmd,shift,t" --app Safari
peekaboo scroll --direction down --amount 6 --smooth --app Safari
peekaboo drag --from B1 --to T2 --snapshot <snapshot-id>
peekaboo swipe --from-coords 100,500 --to-coords 100,200 --duration 800
peekaboo perform-action --on B1 --action AXPress --snapshot <snapshot-id> --json
```

Text-entry choice:

- Prefer `set-value` for replacing a whole accessible field value.
- Prefer `paste` for long text, rich data, or fewer keystroke failures; it sets clipboard, pastes, then restores previous clipboard.
- Prefer `type` when observable keystrokes, autocomplete, IME behavior, shortcuts, or field events matter.
- Prefer `press` for navigation/special keys and `hotkey` for shortcuts.

### 4. Verify after mutation

After click/type/window/menu/dialog operations, run a fresh observation:

```bash
peekaboo see --app Safari --json --annotate --path /tmp/after.png
peekaboo list windows --app Safari --json
peekaboo dialog list --app TextEdit --json
```

## Targeting Cheatsheet

Most UI commands accept some combination of:

- App/process: `--app <name|bundle-id|PID:123>`, `--pid <pid>`.
- Window: `--window-id <id>`, `--window-title <partial title>`, `--window-index <0-based>`.
- Snapshot/element: `--snapshot <id>`, `--on <element-id-or-query>`, `--id <element-id>`.
- Coordinates: `--coords x,y`, `--from-coords x,y`, `--to-coords x,y` only as fallback.
- Focus/Spaces: `--no-auto-focus`, `--space-switch`, `--bring-to-current-space`, `--focus-timeout-seconds`, `--focus-retry-count`.

When there are multiple matching windows, first call `peekaboo window list --app ... --json` and target by `--window-id`.

## System Commands by Use Case

### Apps and files

```bash
peekaboo app launch "Safari" --open https://example.com --wait-until-ready
peekaboo app launch --bundle-id com.apple.Notes --no-focus
peekaboo app switch --to Terminal
peekaboo app hide --app Slack
peekaboo app unhide --app Slack
peekaboo app quit --app Safari
peekaboo app quit --all --except "Finder,Terminal"
peekaboo open ~/Documents/report.pdf --app Preview --json
peekaboo open https://example.com --no-focus --json
```

### Windows

```bash
peekaboo window focus --app "Visual Studio Code"
peekaboo window focus --window-id 12345
peekaboo window set-bounds --app Terminal --x 0 --y 0 --width 1280 --height 720
peekaboo window move --app TextEdit --x 100 --y 100
peekaboo window resize --app Safari --width 1200 --height 800
peekaboo window minimize --app Finder
peekaboo window close --app Safari --window-title "GitHub"
```

### Menus, menu bar, Dock

Use `menu` for application menus (`File`, `Edit`, `View`, etc.). Use `menubar` for right-side status items such as Wi-Fi, VPN, Bluetooth.

```bash
peekaboo menu list --app Finder --json
peekaboo menu click --app Safari --item "New Window"
peekaboo menu click --app TextEdit --path "Format > Font > Show Fonts"
peekaboo menu click-extra --title "WiFi"
peekaboo menubar list --json
peekaboo menubar click "Wi-Fi" --verify
peekaboo menubar click --index 2 --verify
peekaboo dock list --json
peekaboo dock launch Safari
peekaboo dock right-click --app Finder --select "New Window"
peekaboo dock hide
peekaboo dock show
```

### Dialogs and file panels

Prefer `dialog` helpers for alerts, sheets, open/save panels:

```bash
peekaboo dialog list --app TextEdit --json
peekaboo dialog click --button "OK" --app TextEdit --json
peekaboo dialog click --button default --app TextEdit --json
peekaboo dialog input --text "password" --field "Password" --app Safari --json
peekaboo dialog file --app TextEdit --window-title "Untitled" --path /tmp --name poem.rtf --select default --json
peekaboo dialog dismiss --app Safari
peekaboo dialog dismiss --force
```

### Clipboard

```bash
peekaboo clipboard get --json
peekaboo clipboard set --text "hello" --verify --json
peekaboo clipboard set --file-path /tmp/image.png --also-text "fallback" --verify --json
peekaboo clipboard save --slot before
peekaboo clipboard restore --slot before
peekaboo clipboard clear
peekaboo paste --text "temporary paste without leaving clipboard changed" --app TextEdit
```

### Spaces

Spaces uses private macOS APIs; expect version-specific behavior.

```bash
peekaboo space list --json
peekaboo space switch --to 2
peekaboo space move-window --app Safari --to 3
peekaboo space move-window --app Terminal --to-current
```

## Capture, Video, and Analysis

```bash
peekaboo capture live --mode area --region 100,100,800,600 --duration 30 \
  --active-fps 8 --idle-fps 2 --highlight-changes --path /tmp/peekaboo-capture --json

peekaboo capture live --app Safari --window-title "Demo" --duration 20 --video-out /tmp/demo.mp4 --json
peekaboo capture video /tmp/demo.mp4 --sample-fps 2 --path /tmp/demo-frames --json
```

Use `capture live`/`capture watch` for motion-aware frame collection. Use `capture video` to sample an existing video into frames/contact sheets.

## AI, Config, and Credentials

AI-backed commands include `peekaboo agent`, `see --analyze`, and `image --analyze`. Configure providers and credentials as a user, not in source files:

```bash
peekaboo config init
peekaboo config show
peekaboo config validate
peekaboo config edit
peekaboo config set-credential <provider> <key-or-token>
peekaboo config add <provider>
peekaboo config login openai
peekaboo config list-providers
peekaboo config test-provider <provider>
```

Configuration locations:

- Config: `~/.peekaboo/config.json` (JSONC, comments allowed, `${VAR}` and `~` expansion supported).
- Credentials: `~/.peekaboo/credentials` or environment variables.
- Precedence: command flags → environment → credentials → config → built-in defaults.

Never put API keys directly into shared config examples or committed files.

### Agent command

```bash
peekaboo agent "Open Safari and summarize the current page" --max-steps 12
peekaboo agent "Plan this automation" --dry-run
peekaboo agent --resume
peekaboo agent --list-sessions
peekaboo agent --resume-session <session-id> --max-steps 8
peekaboo agent --chat
```

Use `--quiet` for final-result-only output, `--json` for structured output, and `--model <provider/model>` when the default configured model is not desired.

## MCP Usage

Start Peekaboo as an MCP server for AI clients:

```bash
peekaboo mcp
peekaboo mcp serve
peekaboo tools --json
```

Current default transport is stdio. Do not assume HTTP transport unless `peekaboo help mcp` on the target machine confirms it.

MCP tool names are JSON-oriented and may differ from CLI names:

- CLI `perform-action` → MCP `perform_action`.
- CLI `set-value` → MCP `set_value`.
- MCP-only/agent-facing tools can include `inspect_ui`, `browser`, and `analyze` in addition to CLI-like tools.

When using MCP tools:

- MUST send JSON payloads such as `{ "action": "focus", "app": "Safari" }`; do not send CLI strings as tool arguments.
- Start with `see` for visual layout and element IDs, or `inspect_ui` when text/accessibility structure is enough and a screenshot is unnecessary.
- For Chrome page content, DOM/a11y snapshots, console/network/performance, prefer the `browser` tool if available and connected. Use native Peekaboo tools for macOS UI, browser chrome, menus, dialogs, permissions, and non-browser apps.
- Tool calls should still follow observe → act → verify.

## Scripts and Cleanup

```bash
peekaboo run ./flow.peekaboo.json --json
peekaboo run ./flow.peekaboo.json --no-fail-fast --output /tmp/result.json
peekaboo clean --dry-run
peekaboo clean --older-than 24 --json
peekaboo clean --all-snapshots
peekaboo clean --snapshot <snapshot-id>
```

Snapshot cache lives under `~/.peekaboo/snapshots/<snapshot-id>/`. Clean it when stale IDs or excessive cache growth cause confusion.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Black/empty screenshots or capture failure | Screen Recording not granted, wrong Bridge host, or local process lacks TCC | Run `permissions status --json`, `bridge status --json`, grant permissions, restart the app/terminal, compare with `--no-remote` |
| Click/type says success but UI did not change | Stale snapshot, wrong window, background focus issue, or action routed to wrong Space | Refresh `see`, target `--window-id`, use `window focus`, try `--space-switch` or `--bring-to-current-space` |
| Element not found | UI changed, text differs, offscreen element, dialog/menu overlay | Run fresh `see --annotate`, increase `--wait-for`, list windows/dialogs, scroll, or use menu/dialog helpers |
| Coordinate click is flaky | Display scaling/window moved/Retina mismatch | Prefer `--on` element IDs, menu/dialog/window commands, or fresh annotated screenshot |
| Text input flaky | App rejects synthetic typing, IME/autocomplete timing, field not focused | Use `set-value` for full replacement, `paste` for long text, or `type --profile linear --delay <ms>` after focusing field |
| Menu command hard to click | App menu vs status item confusion | Use `menu click --app ... --path ...` for app menus; use `menubar` or `menu click-extra` for status items |
| Clipboard must not be left changed | Plain `clipboard set` changes user clipboard | Use `paste` for atomic set/paste/restore, or `clipboard save` + `restore` |
| Background input fails | Event Synthesizing/post-event not granted or host lacks support | Run `permissions request-event-synthesizing`, check `bridge status`, try foreground focus as fallback |
| Spaces commands unreliable | Private macOS APIs/version behavior | Prefer `window focus` and explicit `--space-switch`/`--bring-to-current-space`; verify with `space list --json` |

## Command Map

- Core: `permissions`, `bridge`, `list`, `tools`, `learn`, `config`, `daemon`, `run`, `clean`, `sleep`, `completions`.
- Vision/capture: `see`, `image`, `capture live|watch|video`.
- Interaction: `click`, `move`, `type`, `paste`, `press`, `hotkey`, `scroll`, `drag`, `swipe`, `set-value`, `perform-action`.
- System: `app`, `window`, `menu`, `menubar`, `dock`, `dialog`, `clipboard`, `open`, `space`, `visualizer`.
- AI/MCP: `agent`, `mcp`.
