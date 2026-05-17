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
zellij --session <SESSION> action list-panes --json | \
  python3 -c "
import json, sys
panes = json.load(sys.stdin)
for p in [x for x in panes if not x['is_plugin']]:
    print(f\"terminal_{p['id']}  {p['title']!r:30}  tab={p.get('tab_name','')}  focused={p['is_focused']}\")
"
```

> `id` 是 session 内全局唯一的整数，引用格式为 `terminal_<id>` 或裸整数 `<id>`。
> 当前 pane 内可直接读取 `$ZELLIJ_PANE_ID` 获取自身 ID，无需调用 list-panes。

### 通过面板标题定位

```bash
# 找到 title 含 "dev-server" 的面板 ID
zellij --session <SESSION> action list-panes --json | \
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

### 发送输入（优先用 paste，更快更可靠）

```bash
# 【首选】paste 使用 bracketed paste mode，支持多行，比 write-chars 更快更稳定
zellij --session $SESSION action paste --pane-id $PANE "你的命令"
# 发送 Enter
zellij --session $SESSION action send-keys --pane-id $PANE "Enter"

# 【备用】write-chars 逐字符发送（单行简单命令可用）
zellij --session $SESSION action write-chars --pane-id $PANE "你的命令"
zellij --session $SESSION action send-keys --pane-id $PANE "Enter"
```

> **CRITICAL RULE**: 发送命令后必须读取输出确认结果，不假设成功。

### 读取输出（快照）

```bash
# 读取当前视口（最近 N 行）
zellij --session $SESSION action dump-screen --pane-id $PANE

# 读取完整滚动缓冲（长任务输出）
zellij --session $SESSION action dump-screen --pane-id $PANE --full
```

### 实时监控输出（流式，推荐用于等待任务完成）

```bash
# 流式输出到 stdout（直到 pane 关闭）
zellij --session $SESSION subscribe --pane-id $PANE

# JSON 格式，可用 jq 过滤
zellij --session $SESSION subscribe --pane-id $PANE --format json \
  | jq --unbuffered 'select(.event == "pane_update") | .viewport[]'

# 过滤关键词（如等待 "Finished" 出现后退出）
zellij --session $SESSION subscribe --pane-id $PANE \
  | grep -m1 "Finished"
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
# 方式一：新建 shell pane（需额外注入命令）
PANE=$(zellij --session $SESSION action new-pane --name "worker")
echo "Created: $PANE"  # e.g. terminal_5

# 方式二：直接启动命令（推荐，绕过 shell，pane 退出时 exited 字段为 true）
PANE=$(zellij --session $SESSION action new-pane -- cargo build --release)

# 方式三：用 zellij run（same as new-pane，返回 pane ID）
PANE=$(zellij --session $SESSION run -d down -- bash)
```

### 在新面板中运行命令（blocking，等待完成）

```bash
# 阻塞直到命令成功（失败时 pane 停留，Enter 可重试）
zellij --session $SESSION action new-pane --block-until-exit-success -- cargo test

# 阻塞直到命令退出（无论成功失败）
zellij --session $SESSION action new-pane --block-until-exit -- ./deploy.sh

# 阻塞直到 pane 被用户手动关闭
zellij --session $SESSION action new-pane --blocking -- cargo build
```

### 关闭面板

```bash
zellij --session $SESSION action close-pane --pane-id $PANE
```

---

## 判断命令是否完成

### 方式一：blocking pane（最简单，推荐）

```bash
# 等待命令成功，继续下一步
zellij --session $SESSION action new-pane --block-until-exit-success -- npm run build
echo "Build succeeded!"
```

### 方式二：subscribe 等待关键词（流式，适合 shell pane）

```bash
# 等待输出包含完成标志
zellij --session $SESSION subscribe --pane-id $PANE | grep -m1 "DONE\|error\|failed"
```

### 方式三：轮询 pane exit status（适合直接启动命令的 pane）

```bash
# 当 pane 以 new-pane -- <cmd> 方式创建时，exited 字段会变为 true
while true; do
  EXITED=$(zellij --session $SESSION action list-panes --json \
    | python3 -c "import json,sys; panes=json.load(sys.stdin); p=next((p for p in panes if p['id']==${PANE#terminal_}), None); print(p['exited'] if p else 'not_found')")
  [ "$EXITED" = "True" ] && break
  sleep 1
done
zellij --session $SESSION action dump-screen --pane-id $PANE --full
```

### 方式四：轮询 prompt（适合交互式 shell，有局限）

```bash
# 注意：仅适用于 bash/zsh（prompt 以 $ 或 % 结尾），fish 等 shell 不适用
for i in $(seq 1 30); do
  OUTPUT=$(zellij --session $SESSION action dump-screen --pane-id $PANE)
  echo "$OUTPUT" | tail -3 | grep -qE '[%$] *$' && break
  sleep 2
done
echo "$OUTPUT"
```

---

## 后台 Session（Headless）

```bash
# 创建后台 session（不 attach 终端）
zellij attach --create-background my-session

# 指定 layout
zellij attach --create-background my-session options --default-layout compact

# 之后通过 --session 控制
zellij --session my-session action new-pane -- cargo build
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

```bash
# Coordinator 创建后台 session
zellij attach --create-background work

# 分配任务到命名 pane
PANE_A=$(zellij --session work action new-pane --name "agent-research")
PANE_B=$(zellij --session work action new-pane --name "agent-build")

# 向各 pane 注入命令
zellij --session work action paste --pane-id $PANE_A "python research.py" && \
  zellij --session work action send-keys --pane-id $PANE_A "Enter"

zellij --session work action paste --pane-id $PANE_B "cargo build" && \
  zellij --session work action send-keys --pane-id $PANE_B "Enter"

# 并行监控（各自后台运行）
zellij --session work subscribe --pane-id $PANE_A | grep -m1 "DONE" &
zellij --session work subscribe --pane-id $PANE_B | grep -m1 "Finished" &
wait
```

### 推荐约定

- **每个 agent 独占一个命名面板**：`--name` 设置语义名（如 `agent-research`、`agent-build`）
- **发送命令**：优先用 `paste` + `send-keys Enter`，多行命令也可靠
- **等待完成**：优先用 `--block-until-exit*`（同步）或 `subscribe` + `grep`（异步）
- **标记输出**：让 agent 命令输出唯一标记（如 `echo "DONE:task-A"`），方便 subscribe/grep 定位
- **独占写入**：避免多 process 同时向同一 pane 写入（会乱序）
- **卡住时主动补火**：如果 pane 长时间没有新进展，且最后一条可见消息还是你发出的指令，直接再发一条轻量 follow-up（例如 `continue` / `继续`）而不是静默等待；这通常能把 agent 从“看起来没响应”状态拉回到下一轮处理

---

## 与 tmux 的关键差异

| 特性 | tmux | zellij |
|------|------|--------|
| 面板引用 | `session:window.pane`（位置相关） | `terminal_<id>`（全局稳定 ID） |
| 写入文本 | `send-keys "text" C-m` | `paste "text"` + `send-keys "Enter"` |
| 读取输出（快照） | `capture-pane -pt $PANE` | `dump-screen --pane-id $PANE` |
| 读取输出（实时） | `pipe-pane` | `subscribe --pane-id $PANE` |
| 等待命令完成 | 轮询 prompt | `--block-until-exit*` 或 `subscribe` |
| 跨会话控制 | `tmux -L ... send-keys -t ...` | `zellij --session <name> action ...` |
| 列出面板 | `list-panes -F "..."` | `list-panes --json`（结构化 JSON） |
| 后台 session | `tmux new-session -d` | `zellij attach --create-background` |

---

## 关键规则

| 规则 | 说明 |
|------|------|
| 禁止交互式 TUI | 不运行 `vim`、`top`、`htop` 等需要持续键盘输入的程序 |
| 先写后读 | 发送命令后必须用 `dump-screen` 或 `subscribe` 确认结果 |
| paste 优先 | 多行或含特殊字符的命令用 `paste`，不用 `write-chars` |
| 引号转义 | `paste`/`write-chars` 参数中注意 shell 引号嵌套 |
| 长任务异步 | 确认命令已启动即可，用 `subscribe` 或 blocking flag 等待完成 |
