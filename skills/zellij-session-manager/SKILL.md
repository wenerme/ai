---
name: zellij-session-manager
description: 'Use when the user requests Zellij, a command must persist after the current tool call, or an existing Zellij pane/session must be monitored or controlled.'
---

# Zellij 共享终端协作

在用户可见的 Zellij 面板中执行命令，读取输出，支持跨会话多 agent 编排。

## 执行策略

1. **直接执行优先**：一次性 build、test、lint、查询或预计能在当前 tool timeout 内完成的命令，直接使用命令执行工具，不启动 Zellij。
2. **复用现有 session**：服务、持续日志、长时间交互或用户明确要求 Zellij 时，先按标题定位已有 pane；只有用户明确授权，或任务必须跨当前调用持久运行且没有可复用 session 时，才能创建新 session。
3. **遵循用户边界**：用户说“直接操作”“不要新增 session”或“不要 Zellij”时，禁止创建 session/pane，也禁止为了符合本 skill 而改用 Zellij。
4. **保持 socket 一致**：默认继承当前环境的 Zellij socket。禁止仅因 `Session not found`、pane 创建失败或 session 列表异常而设置 `ZELLIJ_SOCKET_DIR`；这会把 list/control 命令路由到不同 socket namespace。
5. **按副作用处理失败**：读取 pane、发送输入等已知目标上的控制操作失败时，先确认 session 名和当前环境；尚未提交的一次性命令可改为直接执行。`new-pane`、`run`、`new-tab`、`--in-place` 等创建/替换操作是非幂等操作；返回结果不明确时禁止重试、换另一种创建方式或直接执行同一命令。
6. **创建只提交一次**：同一个逻辑任务最多提交一次创建操作。退出码 `0` 但没有返回 pane ID，不代表没有创建，而是结果不确定；必须先执行 pane/process reconciliation，确认真实状态。

完成标准：命令使用了最小必要的执行方式；没有额外 session/socket 目录；若使用 pane，已获得唯一 pane ID、读取输出并确认真实退出状态；若创建结果不确定，已停止后续提交并明确报告状态。

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

### 创建操作是非幂等的

以下操作都可能启动新进程或替换 pane，不能按普通查询命令重试：

- `zellij action new-pane`
- `zellij run`
- `zellij action new-tab`
- `zellij action new-pane --in-place`

`exit 0 + stdout 为空`、调用超时、pane 暂时未出现在列表中，都属于 **ambiguous create**。这些现象不能证明命令未启动。此时禁止：

- 再执行一次相同 `new-pane`
- 改用 `run`、`new-tab` 或 `--in-place` 再试
- 回退为 shell/命令工具直接执行同一任务
- 复用一个已退出 pane 启动同一任务

### 创建前检查

1. 为本次逻辑任务生成唯一 operation ID，并用作 pane title。不要复用固定标题。
2. 保存创建前的完整 pane JSON，而不是只保存标题匹配结果。
3. 检查是否已有相同任务的活动 pane/process；有则复用或报告，不创建。
4. 复杂命令使用无敏感值的 wrapper 脚本；不要把 token、密码或完整连接串放进 title、argv 或日志。

```bash
SESSION=${ZELLIJ_SESSION_NAME:?missing ZELLIJ_SESSION_NAME}
TASK=dev-server
OP_ID="${TASK}-$(date -u +%Y%m%dT%H%M%SZ)-$$"
BEFORE=$(mktemp)
AFTER=$(mktemp)
trap 'rm -f "$BEFORE" "$AFTER"' EXIT

zellij --session "$SESSION" action list-panes --json >"$BEFORE"

# 标题定位活动任务。需要更严格时再结合 terminal_command/cwd 检查。
zellij --session "$SESSION" action list-panes --json \
  | jq -e --arg prefix "${TASK}-" '
      any(.[]; (.is_plugin | not) and (.exited | not) and (.title | startswith($prefix)))
    ' >/dev/null \
  && { echo "task already running"; exit 3; }

# 对稳定、非敏感的 wrapper 路径检查系统进程。
ps -axo pid,ppid,etime,command \
  | grep -F '/absolute/workdir/local/run.sh' \
  | grep -v grep \
  && { echo "task process already running"; exit 3; }
```

完成标准：`OP_ID` 唯一；创建前 pane 快照已保存；不存在同任务活动 pane/process。

### 单次提交并确认 ID

只调用一次创建命令，同时保存 stdout、stderr 和退出码：

```bash
set +e
CREATE_OUTPUT=$(
  zellij --session "$SESSION" action new-pane \
    --no-focus \
    --name "$OP_ID" \
    --cwd /absolute/workdir \
    -- bash /absolute/workdir/local/run.sh \
    2>&1
)
CREATE_STATUS=$?
set -e

PANE=$(
  printf '%s\n' "$CREATE_OUTPUT" \
    | grep -Eo 'terminal_[0-9]+' \
    | tail -1
)

if [[ -n "$PANE" ]]; then
  zellij --session "$SESSION" action list-panes --json \
    | jq -e --argjson id "${PANE#terminal_}" --arg op "$OP_ID" '
        any(.[]; (.is_plugin | not) and .id == $id and .title == $op)
      ' >/dev/null
  printf 'created=%s status=%s\n' "$PANE" "$CREATE_STATUS"
else
  printf 'AMBIGUOUS_CREATE status=%s output=%q\n' \
    "$CREATE_STATUS" "$CREATE_OUTPUT" >&2
fi
```

只有“返回了 pane ID，并且 `list-panes` 中 ID/title 一致”才是确认创建。退出码本身不是确认条件。

完成标准：获得并验证唯一 pane ID；否则进入 reconciliation，绝不再次提交任务。

### Ambiguous create reconciliation

创建结果不明确时，在宽限期内重复读取状态，而不是重复创建。`list-panes --json` 返回的是整个 session，不要只查当前 tab。

```bash
PANE=
for attempt in 1 2 3 4 5; do
  zellij --session "$SESSION" action list-panes --json >"$AFTER"

  # 首选唯一 operation title；pane ID 差集只作为诊断证据。
  MATCHES=$(jq -r --arg op "$OP_ID" '
    .[] | select((.is_plugin | not) and .title == $op) | .id
  ' "$AFTER")
  MATCH_COUNT=$(printf '%s\n' "$MATCHES" | grep -c . || true)

  if [[ "$MATCH_COUNT" == 1 ]]; then
    PANE="terminal_$MATCHES"
    break
  fi
  if [[ "$MATCH_COUNT" -gt 1 ]]; then
    echo "AMBIGUOUS_CREATE: duplicate operation panes" >&2
    break
  fi

  jq -nr --slurpfile before "$BEFORE" --slurpfile after "$AFTER" '
    ($before[0] | map(select(.is_plugin | not) | .id)) as $old
    | $after[0][]
    | select(.is_plugin | not)
    | .id as $id
    | select(($old | index($id)) == null)
    | {id, title, tab_id, tab_name, terminal_command, exited, exit_status}
  '
  sleep 1
done

if [[ -z "$PANE" ]]; then
  # 对稳定、非敏感的 wrapper 路径做进程检查；不要搜索 secret-bearing argv。
  ps -axo pid,ppid,etime,command \
    | grep -F '/absolute/workdir/local/run.sh' \
    | grep -v grep || true
  echo "create outcome remains uncertain; do not retry" >&2
  exit 4
fi
```

如果宽限期后仍无法确认：保持“不确定”结论，报告 `OP_ID`、创建退出码、pane 差集和进程检查摘要。宁可让用户/后续任务继续核对，也不要启动第二份任务。

完成标准：找到唯一 operation pane 并继续监控，或在未追加任何创建/执行操作的情况下以“不确定”停止。

| 现象 | 状态 | 正确操作 |
|------|------|----------|
| 返回 `terminal_<id>`，且 ID/title 匹配 | confirmed | 只监控该 pane |
| exit 0，但 stdout 为空 | ambiguous | 做 title、pane ID 差集和 process reconciliation |
| 调用超时 | ambiguous | 不重跑；按 `OP_ID` 查整个 session |
| title 暂时找不到 | unresolved | 等待宽限期并检查新增 pane，不改用其他创建 API |
| pane 稍后出现 | confirmed late | 采用该 pane，禁止启动第二份任务 |
| 同一 `OP_ID` 出现多个 pane | duplicate | 停止后续操作并报告；未经授权不批量中断 |
| 宽限期后无 pane、无 process | still uncertain | 停止并报告，不在当前流程自动重试 |

### 基础创建形式

以下只是 CLI 形态，不是可跳过确认流程的快捷方式。每次仍必须使用唯一 `OP_ID`、保存创建输出，并验证返回的 ID/title：

```bash
# 方式一：新建 shell pane（需额外注入命令）
PANE=$(zellij --session "$SESSION" action new-pane --name "$OP_ID")
echo "Created: $PANE"  # e.g. terminal_5

# 方式二：直接启动命令（推荐，绕过 shell，pane 退出时 exited 字段为 true）
PANE=$(zellij --session "$SESSION" action new-pane --name "$OP_ID" -- cargo build --release)

# zellij run/new-tab 是替代 API，不是 ambiguous create 后的重试手段。
```

### 在新面板中运行命令（blocking，等待完成）

仅在用户明确要求 Zellij，或命令必须留在用户可见 pane 中时使用。blocking flag 不会让创建变成幂等操作；调用超时或输出不明确时，仍按 `OP_ID` reconciliation，禁止重跑命令。

```bash
# 阻塞直到命令成功（失败时 pane 停留，Enter 可重试）
zellij --session "$SESSION" action new-pane \
  --no-focus --name "$OP_ID" --block-until-exit-success -- cargo test

# 阻塞直到命令退出（无论成功失败）
zellij --session "$SESSION" action new-pane \
  --no-focus --name "$OP_ID" --block-until-exit -- ./deploy.sh

# 阻塞直到 pane 被用户手动关闭
zellij --session "$SESSION" action new-pane \
  --no-focus --name "$OP_ID" --blocking -- cargo build
```

### 关闭面板

```bash
zellij --session $SESSION action close-pane --pane-id $PANE
```

---

## 判断命令是否完成

### 方式一：blocking pane（最简单，推荐）

该方式只简化“等待完成”，不简化“确认是否创建”。调用超时后不得再次执行；先按唯一 `OP_ID` 查找 pane 和真实退出状态。

```bash
# 等待命令成功，继续下一步
zellij --session "$SESSION" action new-pane \
  --no-focus --name "$OP_ID" --block-until-exit-success -- npm run build
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
OP_A="agent-research-$(date -u +%Y%m%dT%H%M%SZ)-$$"
PANE_A=$(zellij --session work action new-pane --name "$OP_A")
# 必须先验证 PANE_A 的 ID/title；结果 ambiguous 时停止，不能继续创建 PANE_B。

OP_B="agent-build-$(date -u +%Y%m%dT%H%M%SZ)-$$"
PANE_B=$(zellij --session work action new-pane --name "$OP_B")
# 同样验证 PANE_B 的 ID/title 后，才能发送命令。

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

### Agent session 监控补充

- **区分控制进程与真实 agent session**：如果曾经用后台 process 启动 agent，后来切到 Zellij pane 托管，后台 process 的退出通知可能只是旧控制进程结束，不代表当前 Zellij agent 失败。收到这类通知时，先核对 Zellij pane、session JSONL、cwd/branch 和最新 tool activity，再汇报状态。
- **不要只看 pane 视口**：某些 agent/TUI pane 的 `dump-screen` 可能为空或只显示最近注入文本；同时检查 session JSONL 或项目日志是否增长，避免误判为无进展。
- **发现旧 pane/旧 worktree 输出时要交叉验证**：同名 pane 可能残留历史任务。用 `list-panes --json` 查看 pane id/title/tab，再读取 session header 的 cwd/branch，必要时明确标记旧 pane 为 obsolete。
- **handoff 不完整时继续 nudging**：如果 session 已更新文件但还没输出最终 handoff，直接向正确 pane 发送简短指令（如“继续，输出最终 handoff；不要创建 MR，只确认代码/验证/待 manager 创建 MR。”），然后再次读取 session tail 验证 stop/handoff。

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
| 直接执行优先 | 一次性 build/test/lint/query 直接运行，不为它创建 session 或 pane |
| 创建非幂等 | `new-pane`/`run`/`new-tab`/`--in-place` 每个逻辑任务只提交一次 |
| 空输出不是未创建 | 创建退出 `0` 但无 pane ID 时进入 reconciliation，禁止重试或直接回退执行 |
| 唯一 operation ID | 创建前生成唯一 title，保存 pane 快照；创建后必须验证 ID/title |
| 禁止擅改 socket | 不设置 `ZELLIJ_SOCKET_DIR`；`Session not found` 时核对当前环境或直接执行 |
| 禁止交互式 TUI | 不运行 `vim`、`top`、`htop` 等需要持续键盘输入的程序 |
| 先写后读 | 发送命令后必须用 `dump-screen` 或 `subscribe` 确认结果 |
| paste 优先 | 多行或含特殊字符的命令用 `paste`，不用 `write-chars` |
| 引号转义 | `paste`/`write-chars` 参数中注意 shell 引号嵌套 |
| 长任务异步 | 先确认唯一 pane ID/title 和真实启动输出，再用 `subscribe` 或 blocking flag 等待完成 |
