# glab 配置与认证

## 认证

### 登录

```bash
# 交互式 (推荐首次使用)
glab auth login

# Self-hosted GitLab
glab auth login --hostname gitlab.example.org

# 非交互式 (CI/CD 或脚本)
echo "glpat-xxx" | glab auth login --stdin --hostname gitlab.example.org

# 指定 token
glab auth login --token glpat-xxx --hostname gitlab.example.org

# 指定协议
glab auth login --hostname gitlab.example.org --git-protocol ssh
glab auth login --hostname gitlab.example.org --api-protocol https

# 使用 CI Job Token
glab auth login --job-token $CI_JOB_TOKEN --hostname gitlab.example.org

# 使用系统钥匙链存储 token
glab auth login --use-keyring
```

### 状态检查

```bash
# 当前实例
glab auth status

# 所有已认证实例
glab auth status --all

# 检查特定实例
glab auth status --hostname gitlab.example.org

# 显示 token (调试用)
glab auth status --show-token
```

### 登出

```bash
glab auth logout
glab auth logout --hostname gitlab.example.org
```

### 多实例管理

```bash
# 同时登录多个 GitLab 实例
glab auth login --hostname gitlab.com
glab auth login --hostname gitlab.example.org
glab auth login --hostname gitlab.internal.com

# 查看所有
glab auth status --all

# 命令中指定实例
glab mr list -R gitlab.example.org/group/project
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `GITLAB_TOKEN` | API token (覆盖 config 中的 token) |
| `GITLAB_HOST` | GitLab 实例主机名 |
| `GITLAB_URI` | 完整 GitLab URL |
| `GIT_REMOTE_URL_VAR` | 自定义 remote URL |
| `VISUAL` | 优先编辑器 |
| `EDITOR` | 回退编辑器 |
| `NO_COLOR` | 禁用颜色输出 |
| `GLAMOUR_STYLE` | Markdown 渲染样式 (notty 禁用) |

## 配置文件

位置: `~/.config/glab-cli/config.yml`

### 查看与编辑

```bash
# 查看所有配置
glab config get

# 查看特定项
glab config get editor
glab config get token --host gitlab.example.org

# 设置值
glab config set editor vim
glab config set browser firefox
glab config set glab_pager "less -R"

# 全局设置
glab config set editor vim --global

# 特定主机的设置
glab config set token glpat-xxx --host gitlab.example.org

# 在编辑器中打开配置文件
glab config edit
glab config edit --local    # 本地配置
```

### 可配置项

| Key | 说明 | 默认值 |
|-----|------|--------|
| `browser` | 默认浏览器 | 系统默认 |
| `editor` | 默认编辑器 | `$EDITOR` |
| `visual` | 优先编辑器 (覆盖 editor) | `$VISUAL` |
| `glab_pager` | 分页命令 | `less` |
| `glamour_style` | Markdown 渲染样式 | auto |
| `display_hyperlinks` | TTY 超链接 | false |
| `check_update` | 自动检查更新 | true |
| `host` | 默认 GitLab 实例 | gitlab.com |
| `token` | 访问 token | — |

## 仓库上下文

glab 从 Git remote 自动检测当前仓库和 GitLab 实例。

```bash
# 查看当前 remote
git remote -v

# 不在仓库中时指定仓库
glab mr list -R owner/repo
glab mr list -R gitlab.example.org/group/project

# 修正 remote
git remote set-url origin git@gitlab.example.org:group/project.git
```

## Shell 补全

```bash
# Zsh
glab completion --shell zsh > "${fpath[1]}/_glab"

# Bash
glab completion --shell bash > /etc/bash_completion.d/glab

# Fish
glab completion --shell fish > ~/.config/fish/completions/glab.fish
```

## Aliases

```bash
# 创建别名
glab alias set co "mr checkout"
glab alias set pv "pipeline ci view"
glab alias set mrs "mr list --reviewer=@me"

# 查看
glab alias list

# 删除
glab alias delete co
```
