# Pipeline 排查流程

## 快速诊断

```bash
# 1. 当前分支 pipeline 状态
glab ci status

# 2. 实时状态 (持续刷新直到完成)
glab ci status --live

# 3. 列出最近 pipelines
glab ci list

# 4. 只看失败的
glab ci list --status=failed

# 5. 交互式查看 (可选择 job, 查看日志, 重试, 取消)
glab pipeline ci view
```

## 排查步骤

### Step 1: 定位失败 Pipeline

```bash
# 查看当前分支 pipeline
glab ci status -b main

# 获取 pipeline 详情 (JSON)
glab ci get -p <pipeline-id> --with-job-details -F json

# 查看 pipeline 中的所有 jobs
glab api "projects/:id/pipelines/<pipeline-id>/jobs?per_page=100" | jq '.[] | {id, name, status, stage}'

# 按状态筛选 pipeline
glab ci list --status=failed --per-page=5
glab ci list --status=running
```

### Step 2: 查看失败 Job 日志

```bash
# 追踪当前分支最新 pipeline 的 job 日志
glab ci trace

# 追踪指定 job
glab ci trace <job-id>
glab ci trace <job-name>

# 指定 pipeline 中的 job
glab ci trace <job-name> -p <pipeline-id>

# 指定分支的 job
glab ci trace <job-name> -b feature-branch
```

### Step 3: 重试或取消

```bash
# 重试失败的 job
glab ci retry <job-id>

# 触发手动 job
glab ci trigger <job-id>

# 取消运行中的 job
glab ci cancel job <job-id>

# 取消整个 pipeline
glab ci cancel pipeline <pipeline-id>

# 模拟取消 (不实际执行)
glab ci cancel pipeline <pipeline-id> --dry-run
```

### Step 4: 重新触发 Pipeline

```bash
# 当前分支
glab ci run

# 指定分支
glab ci run -b main

# 带变量
glab ci run -V DEPLOY_ENV=staging -V DEBUG=true

# 从 JSON 文件加载变量
glab ci run -f variables.json

# 触发 MR pipeline (而非分支 pipeline)
glab ci run --mr

# 浏览器打开新触发的 pipeline
glab ci run -w
```

## CI 配置验证

```bash
# 验证 .gitlab-ci.yml
glab ci lint

# Dry-run 模拟 pipeline 创建
glab ci lint --dry-run

# 包含展开后的 jobs 列表
glab ci lint --include-jobs

# 在特定 ref 上下文验证
glab ci lint --ref main

# 查看完全展开的 CI 配置 (include/extend 全部展开)
glab ci config compile
```

## 下载 Artifacts

```bash
# 下载指定 ref 和 job 的 artifacts
glab job artifact main build-job

# 下载到指定目录
glab job artifact main build-job -p ./artifacts

# 列出 artifact 文件路径
glab job artifact main build-job --list-paths
```

## 批量清理

```bash
# 删除指定 pipeline
glab ci delete <pipeline-id>

# 删除超过 30 天的失败 pipeline
glab ci delete --status=failed --older-than=720h

# 模拟删除 (不实际执行)
glab ci delete --status=failed --older-than=720h --dry-run
```

## Pipeline Variables 查看

```bash
# 查看 pipeline 变量 (需要 Maintainer 权限)
glab ci get -p <pipeline-id> --with-variables

# 管理项目 CI/CD 变量
glab variable list
glab variable get DEPLOY_KEY
glab variable set DEPLOY_KEY value --protected --masked
```

## 通过 API 进一步排查

```bash
# 获取 pipeline 的所有 jobs (含详情)
glab api "projects/:id/pipelines/<pid>/jobs?per_page=100"

# 获取特定 job 的日志
glab api "projects/:id/jobs/<job-id>/trace"

# 获取 pipeline 的桥接 jobs (下游触发)
glab api "projects/:id/pipelines/<pid>/bridges"

# 获取 pipeline 测试报告
glab api "projects/:id/pipelines/<pid>/test_report"
```

## 常见失败原因速查

| 症状 | 排查 | 解决 |
|------|------|------|
| Pipeline 卡在 pending | Runner 不可用 | 检查 runner 状态: `glab runner list` |
| Job 一直 waiting | Tag 不匹配 | 检查 `.gitlab-ci.yml` 中的 tags 配置 |
| YAML 语法错误 | 配置无效 | `glab ci lint` |
| Permission denied | Token 权限不足 | 检查变量保护和分支保护设置 |
| Artifact 下载失败 | 已过期 | 检查项目 artifact 保留策略 |
| 下游 pipeline 失败 | 触发配置错误 | 通过 API 查看 bridges |
