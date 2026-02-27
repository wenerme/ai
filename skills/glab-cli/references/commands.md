# glab 命令参考

## 通用 Flags

```bash
--help, -h          # 帮助
--repo, -R          # 指定仓库 (owner/repo)
--web, -w           # 在浏览器中打开
--output, -o json   # JSON 输出
--verbose           # 详细输出
```

环境变量:
```bash
GITLAB_TOKEN=glpat-xxx              # API token
GITLAB_HOST=gitlab.example.org      # Self-hosted GitLab
```

---

## Merge Requests

### 列表

```bash
glab mr list                           # 所有 open MR
glab mr list --assignee=@me            # 分配给我的
glab mr list --reviewer=@me            # 需要我 review 的
glab mr list --state=merged            # 已合并的
glab mr list --state=all               # 所有状态
```

### 创建

```bash
glab mr create                                          # 交互式
glab mr create --title "Fix" --description "Closes #123"
glab mr create --draft                                  # Draft MR
glab mr create --reviewer=alice,bob --label="bug,urgent"
glab mr create --target-branch=develop
glab mr create --remove-source-branch
glab mr create --assignee=username
```

### 操作

```bash
glab mr view 123                       # 查看详情
glab mr view 123 --comments            # 含评论
glab mr checkout 123                   # 本地检出
glab mr approve 123                    # 批准
glab mr unapprove 123                  # 取消批准
glab mr merge 123                      # 合并
glab mr merge 123 --remove-source-branch
glab mr merge 123 --when-pipeline-succeeds
glab mr close 123                      # 关闭
glab mr reopen 123                     # 重新打开
glab mr note 123 -m "LGTM"            # 评论
glab mr update 123 --title "New title"
glab mr update 123 --draft             # 设为 draft
glab mr update 123 --ready             # 标记 ready
glab mr subscribe 123                  # 订阅通知
```

---

## Issues

### 列表

```bash
glab issue list                        # 所有 issue
glab issue list --assignee=@me         # 分配给我的
glab issue list --label=bug            # 按标签
glab issue list --label="bug,priority:high"
glab issue list --state=closed
glab issue list --search="login error"
```

### 创建与管理

```bash
glab issue create                                   # 交互式
glab issue create --title "Bug" --label=bug
glab issue create --title "Secret" --confidential   # 保密 issue
glab issue view 456
glab issue view 456 --web                           # 浏览器打开
glab issue close 456 -m "Fixed in MR !123"
glab issue reopen 456
glab issue update 456 --title "New" --assignee=user
glab issue subscribe 456
```

---

## CI/CD

### Pipeline

```bash
glab ci status                         # 当前分支 pipeline 状态
glab ci status --branch=main           # 指定分支
glab pipeline ci view                  # 交互式查看
glab ci list                           # 列出最近 pipelines
glab ci list --status=failed
glab ci view <pipeline-id>             # 查看指定 pipeline
```

### 触发与管理

```bash
glab ci run                            # 触发当前分支 pipeline
glab ci run --branch=develop
glab ci run -V KEY1=value1 -V KEY2=value2
glab ci retry                          # 重试失败 pipeline
glab ci cancel                         # 取消运行中 pipeline
glab ci delete <pipeline-id>
```

### 日志与 Artifacts

```bash
glab ci trace                          # 查看 job 日志
glab ci trace <job-id>                 # 指定 job
glab ci artifact <job-id>              # 下载 artifacts
glab ci artifact <job-id> -p ./output
```

### CI 配置

```bash
glab ci lint                           # 验证 .gitlab-ci.yml
glab ci lint --path=.gitlab-ci.yml
glab ci config                         # 查看 CI 配置
```

---

## Repository

```bash
glab repo clone namespace/project          # 克隆
glab repo clone namespace/project dir      # 克隆到指定目录
glab repo clone -g groupname              # 按组克隆 (交互式)
glab repo view                            # 查看仓库详情
glab repo view --web                      # 浏览器打开
glab repo fork                            # Fork
glab repo create project-name --private
glab repo archive owner/project
```

---

## API

```bash
# GET
glab api projects/:id/merge_requests

# POST
glab api --method POST projects/:id/issues \
  --field title="Bug" --field description="Details" --field labels="bug"

# PUT
glab api --method PUT projects/:id/merge_requests/1 --field title="New Title"

# DELETE
glab api --method DELETE projects/:id/issues/123

# 分页 — per_page 写在 URL 里，不是 flag
glab api "projects/:id/issues?per_page=100"
glab api --paginate "projects/:id/merge_requests?per_page=50&state=opened"

# 含响应头
glab api --include projects/:id
```

---

## Labels

```bash
glab label list
glab label create "bug" --color="#FF0000" --description "Bug reports"
glab label delete "old-label"
```

## Releases

```bash
glab release list
glab release create v1.0.0 --notes "Release notes"
glab release create v1.0.0 --notes-file CHANGELOG.md
glab release view v1.0.0
glab release download v1.0.0
glab release delete v1.0.0
```

## Variables (CI/CD)

```bash
glab variable list
glab variable get VAR_NAME
glab variable set VAR_NAME value
glab variable set VAR_NAME value --protected --masked
glab variable delete VAR_NAME
glab variable export > vars.json
glab variable import < vars.json
```

## Snippets

```bash
glab snippet list
glab snippet create --title "Config" --filename config.yml
glab snippet create --title "Secret" --private secret.txt
glab snippet view <id>
glab snippet delete <id>
```

## Schedules

```bash
glab schedule list
glab schedule create --cron "0 2 * * *" --ref main --description "Nightly"
glab schedule run <schedule-id>
glab schedule delete <schedule-id>
```

## SSH Keys

```bash
glab ssh-key list
glab ssh-key add ~/.ssh/id_rsa.pub --title "Work laptop"
glab ssh-key delete <key-id>
```

## Aliases

```bash
glab alias set co "mr checkout"
glab alias list
glab alias delete co
```

## Config

```bash
glab config get                        # 查看所有配置
glab config set editor vim
glab completion --shell zsh            # Shell 补全
```
