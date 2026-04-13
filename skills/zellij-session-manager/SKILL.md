---
name: zellij-session-manager
description: 'Use when executing commands, running builds, starting services, or monitoring agent panes in Zellij. Replaces tmux-session-manager for Zellij users. Enables multi-agent orchestration via remote pane control.'
---

# Zellij 共享终端协作

在用户可见的 Zellij 面板中执行命令，读取输出，支持跨会话多 agent 编排。

## 发现会话与面板

### 列出所有会话

```bash
zellij list-sessions
```

### 列出指定会话的所有面板（JSON，推荐）

```bash
# 筛选 terminal 面板（排除 tab-bar / status-bar 等 UI 插件）
zellij --session <SESSION> action list-panes -j -t | \
  python3 -c "
import json, sys
panes = json.load(sys.stdin)
for p in [x for x in panes if not x['is_plugin']]:
    print(f\"terminal_{p['id']}  {p['title']!r:30}  tab={p.get('tab_name','')}  focused={p['is_focused']}\")
"
```

> `id` 是 session 内全局唯一的整数，引用格式为 `terminal_<id>` 或裸整数 `<id>`。

### 通过面板标题定位

```bash
# 找到 title 含 "dev-server" 的面板 ID
zellij --session <SESSION> action list-panes -j | \
  python3 -c "
import json, sys
panes = json.load(sys.stdin)
match = next((p for p in panes if 'dev-server' in p.get('title','')), None)
print(match['id'] if match else 'NOT_FOUND')
"
```

下文用 `$PANE` 表示目标面板 ID（如 `5` 或 `terminal_5`），`$SESSION` 表示会话名。

---

## 核心操作

### 执行命令

```bash
# 写入命令文本
zellij --session $SESSION action write-chars --pane-id $PANE "你的命令"
# 发送 Enter
zellij --session $SESSION action send-keys --pane-id $PANE "Enter"
# 必须：读取输出确认结果
sleep 0.5
zellij --session $SESSION action dump-screen --pane-id $PANE
```

> **重要**：`write-chars` 写入字面文本，`send-keys` 发送按键序列，两者配合使用。

### 读取输出

```bash
# 读取当前视口（最近 N 行）
zellij --session $SESSION action dump-screen --pane-id $PANE

# 读取完整滚动缓冲（长任务输出）
zellij --session $SESSION action dump-screen --pane-id $PANE --full
```

### 中断进程

```bash
zellij --session $SESSION action send-keys --pane-id $PANE "Ctrl c"
```

### 命名面板（便于后续查找）

```bash
zellij --session $SESSION action rename-pane --pane-id $PANE "my-pane-name"
```

---

## 面板生命周期

### 创建新面板并获取 ID

```bash
# 在指定会话中新建面板，返回 terminal_<id>
PANE_ID=$(zellij --session $SESSION run -d down -- bash)
echo "Created: $PANE_ID"  # e.g. terminal_5
```

### 在新面板中运行命令（自动关闭）

```bash
zellij --session $SESSION run -d down --close-on-exit -- bash -c "npm run build"
```

### 关闭面板

```bash
zellij --session $SESSION action close-pane --pane-id $PANE
```

---

## 判断命令是否完成

`dump-screen` 输出末尾出现 shell prompt（`% ` 或 `$ `）即表示命令已结束：

```bash
# 轮询直到 prompt 出现
for i in $(seq 1 30); do
  OUTPUT=$(zellij --session $SESSION action dump-screen --pane-id $PANE)
  echo "$OUTPUT" | tail -3 | grep -qE '[%$] *$' && break
  sleep 2
done
echo "$OUTPUT"
```

---

## 常用按键

| 按键序列（send-keys 格式） | 作用 |
|---------------------------|------|
| `Enter` | 执行命令 |
| `Ctrl c` | 中断进程（退出码 130） |
| `Ctrl d` | EOF / 退出 shell |
| `Ctrl l` | 清屏 |
| `Ctrl z` | 挂起进程 |

---

## 多 Agent 编排模式

适合"无限 token"下的并行任务分发：

```
Coordinator Agent (Claude Code)
    │
    ├─ zellij --session work action write-chars --pane-id 3 "task A command"
    │  → send-keys Enter → dump-screen 轮询结果
    │
    ├─ zellij --session work action write-chars --pane-id 4 "task B command"
    │  → send-keys Enter → dump-screen 轮询结果
    │
    └─ 汇总结果、分发下一轮任务
```

### 推荐约定

- **每个 agent 独占一个命名面板**：`rename-pane` 设置语义名（如 `agent-research`、`agent-build`）
- **任务分发**：Coordinator 通过 `write-chars` + `send-keys Enter` 向目标面板注入命令
- **结果回收**：通过 `dump-screen` 轮询，检测 prompt 出现确认完成
- **标记输出**：让 agent 命令输出唯一标记（如 `echo "DONE:task-A"`），方便 grep 定位

---

## 与 tmux 的关键差异

| 特性 | tmux | zellij |
|------|------|--------|
| 面板引用 | `session:window.pane`（位置相关） | `terminal_<id>`（全局稳定 ID） |
| 写入文本 | `send-keys "text" C-m` | `write-chars "text"` + `send-keys "Enter"` |
| 读取输出 | `capture-pane -pt $PANE` | `dump-screen --pane-id $PANE` |
| 跨会话控制 | `tmux -L ... send-keys -t ...` | `zellij --session <name> action ...` |
| 列出面板 | `list-panes -F "..."` | `list-panes -j`（JSON，结构化） |

---

## 关键规则

| 规则 | 说明 |
|------|------|
| 禁止交互式 TUI | 不运行 `vim`、`top`、`htop` 等需要持续键盘输入的程序 |
| 先读后写 | 发送命令后必须 `dump-screen` 确认结果，不假设成功 |
| 引号转义 | `write-chars` 参数中注意 shell 引号嵌套 |
| 长任务异步 | 确认命令已启动即可，无需等待完成，后续轮询 prompt |
