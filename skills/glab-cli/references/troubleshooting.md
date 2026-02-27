# glab 故障排除

## 认证问题

### 401 Unauthorized

```bash
# 重新认证
glab auth login
# Self-hosted
glab auth login --hostname gitlab.example.org
# 检查状态
glab auth status
```

Token 需要的 scope: `api`, `read_user`, `write_repository`。

### 403 Forbidden

Token 缺少权限或用户无项目访问权限。在 GitLab Web UI 中确认项目权限和 token scope。

### 多账户

```bash
# 同时认证多个实例
glab auth login --hostname gitlab.com
glab auth login --hostname gitlab.example.org
# 查看所有认证账户
glab auth status
# 命令中指定实例
glab mr list -R gitlab.example.org/owner/repo
```

---

## 仓库上下文问题

### not a git repository

```bash
# 方案 1: 进入仓库目录
cd /path/to/repo
# 方案 2: 指定仓库
glab mr list -R owner/repo
```

### 404 Project Not Found

1. 检查仓库名称格式: `namespace/project`
2. 确认有访问权限
3. Self-hosted 需设置 `GITLAB_HOST`

### 操作了错误的仓库

```bash
# 检查当前 remote
git remote -v
# 修正
git remote set-url origin git@gitlab.com:owner/correct-repo.git
```

---

## MR 问题

### source branch already has MR

```bash
# 查找已有的 MR
glab mr list --source-branch=$(git branch --show-current)
# 更新已有 MR
glab mr update <number> --title "New title"
```

### merge conflicts

```bash
glab mr checkout <number>
git fetch origin main && git rebase origin/main
# 解决冲突后
git add . && git rebase --continue && git push --force-with-lease
```

### pipeline must succeed

```bash
glab ci status               # 检查 pipeline
glab ci retry                # 重试失败 pipeline
# 或等 pipeline 成功后自动合并
glab mr merge <number> --when-pipeline-succeeds
```

---

## CI/CD 问题

### pipeline not found

1. 确认 `.gitlab-ci.yml` 存在
2. 确认项目启用了 CI/CD
3. 手动触发: `glab ci run`

### CI lint 报错

```bash
glab ci lint                 # 本地验证
```

常见原因: YAML 缩进错误 (tab vs space)、job 名无效、缺少必填字段。

### artifacts 下载失败

可能已过期或 job 未产生 artifacts。检查: `glab ci view <pipeline-id>`

---

## 网络问题

### 连接超时

```bash
ping gitlab.com              # 检查网络
curl -I https://gitlab.com   # 检查 GitLab 状态
```

### SSL 证书问题 (x509)

```bash
# 开发环境临时方案 (不推荐生产用)
export GIT_SSL_NO_VERIFY=true
# 推荐: 添加 CA 证书
git config --global http.sslCAInfo /path/to/cert.pem
```

---

## 环境变量

```bash
# GITLAB_HOST 不生效
export GITLAB_HOST=gitlab.example.org   # 确保 export
# 加到 shell profile
echo 'export GITLAB_HOST=gitlab.example.org' >> ~/.zshrc

# GITLAB_TOKEN 不生效
export GITLAB_TOKEN=glpat-xxx           # 无引号，无空格
```

---

## 通用排查步骤

```bash
glab version                 # 1. 检查版本
glab check-update            # 2. 检查更新
glab auth status             # 3. 检查认证
git remote -v                # 4. 检查仓库上下文
glab <command> --verbose     # 5. 详细输出
glab <command> --help        # 6. 查看帮助
```

配置文件位置: `~/.config/glab-cli/config.yml`

如果配置损坏:
```bash
mv ~/.config/glab-cli/config.yml ~/.config/glab-cli/config.yml.bak
glab auth login
```
