# abuild 工作流参考

面向 Alpine Linux 包维护者的日常工作流。

## 环境准备

```bash
# 安装 abuild 工具链
apk add abuild build-base alpine-sdk
# 生成签名密钥（首次）
abuild-keygen -a -i
# 将用户加入 abuild 组
adduser $USER abuild

# 克隆 aports
git clone https://gitlab.alpinelinux.org/alpine/aports.git
cd aports
git config --local core.hooksPath .githooks
```

### 目录约定

| 路径 | 用途 |
|------|------|
| `/var/cache/distfiles/` | 源码包下载缓存 |
| `~/packages/` | 构建产物默认输出 |
| `$HOME/.abuild/abuild.conf` | 个人 abuild 配置 |
| `/etc/abuild.conf` | 全局 abuild 配置 |

## 新建包

```bash
cd aports/testing
mkdir mypackage && cd mypackage

# 从模板生成 APKBUILD
newapkbuild -n mypackage https://example.com/mypackage-1.0.tar.gz
# 或指定构建系统
newapkbuild -n mypackage -d "My package" -l MIT -a cmake \
  https://github.com/org/mypackage/archive/v1.0.tar.gz

# 编辑 APKBUILD，补全 depends/makedepends/subpackages 等
vim APKBUILD

# 更新 checksum
abuild checksum

# 构建测试
abuild -r

# 提交
git add APKBUILD
git commit -m "testing/mypackage: new aport"
```

`newapkbuild` 构建系统选项：`-a cmake`, `-a meson`, `-a autotools`, `-a go`, `-a rust`, `-a python`, `-a perl`

## 升级包

### 标准流程

```bash
cd aports
git switch master && git pull

# 1. 创建分支
git checkout -b bump-mypackage-2.0.0

# 2. 找到包路径
cd community/mypackage  # 或 main/mypackage, testing/mypackage

# 3. 更新版本（编辑 APKBUILD）
# pkgver=2.0.0
# pkgrel=0
vim APKBUILD

# 4. 更新 checksum
abuild checksum

# 5. 构建验证（可选但推荐）
abuild -r

# 6. 提交
git add APKBUILD
git commit -m "community/mypackage: upgrade to 2.0.0"
```

### 使用 abump（推荐）

```bash
# 基础用法：自动更新 pkgver, 设置 pkgrel=0, 更新 checksum, 创建 commit
abump mypackage-2.0.0

# 自动创建分支（推荐用于 MR 工作流）
abump -b mypackage-2.0.0
# 等价于：git checkout -b bump-mypackage-2.0.0 && abump mypackage-2.0.0

# 安全更新
abump -s CVE-2024-12345,CVE-2024-12346 mypackage-2.0.0

# 关联 issue
abump -f 12345 mypackage-2.0.0

# 保留已有包
abump -k mypackage-2.0.0
```

abump 自动执行：
1. 修改 `pkgver=2.0.0`, `pkgrel=0`
2. `abuild checksum`
3. `git add APKBUILD`
4. `git commit -m "$repo/mypackage: upgrade to 2.0.0"`

### Checksum 处理

```bash
# 标准方式
abuild checksum

# 如果 abuild checksum 下载失败，手动处理
# 1. 从 APKBUILD 提取 source URL
source_url="https://github.com/org/repo/archive/v2.0.0.tar.gz"

# 2. 手动下载
curl -L -o /var/cache/distfiles/mypackage-2.0.0.tar.gz "$source_url"

# 3. 计算 checksum
sha512sum /var/cache/distfiles/mypackage-2.0.0.tar.gz

# 4. 更新 APKBUILD 末尾的 sha512sums
```

常见源码 URL 模式（GitHub）：
- `https://github.com/ORG/REPO/archive/v$pkgver.tar.gz`
- `https://github.com/ORG/REPO/archive/$pkgver.tar.gz`
- `https://github.com/ORG/REPO/releases/download/v$pkgver/$pkgname-$pkgver.tar.gz`

## 版本检查

### 手动检查上游版本

```bash
# 从 APKBUILD 获取当前版本和上游 URL
grep -E '^(pkgver|url)=' APKBUILD

# GitHub API 检查最新 release
curl -s "https://api.github.com/repos/ORG/REPO/releases/latest" | jq -r '.tag_name'

# 检查最新 tag（没有 release 时）
curl -s "https://api.github.com/repos/ORG/REPO/tags?per_page=5" | jq -r '.[].name'
```

### 版本号规范化

上游版本号可能带前缀，需要对照处理：
- `v1.0.0` → `1.0.0`
- `release-1.0.0` → `1.0.0`
- `1.0.0-beta1` → 通常不进 aports（除非 testing）

### 批量检查

```bash
# 列出你维护的所有包
grep -rl "Maintainer:.*Your Name" aports/*/*/APKBUILD

# 快速比较版本（apk version 命令）
apk version -l '<'  # 列出有新版本的已安装包
```

## abuild 完整命令参考

### 核心构建命令

| 命令 | 用途 |
|------|------|
| `abuild` / `abuild all` | 完整构建流程（validate→builddeps→clean→fetch→unpack→prepare→mkusers→build→check→rootpkg） |
| `abuild -r` | 构建并自动安装依赖 |
| `abuild -r -K` | 构建并保留 builddir（调试用） |
| `abuild -r -k` | 构建并保留已有包（即使源码更新） |
| `abuild -r -f` | 强制重新构建 |
| `abuild -d` | 跳过依赖检查 |

### 开发调试命令

| 命令 | 用途 |
|------|------|
| `abuild checksum` | 更新 sha512sums |
| `abuild validate` | 基础 APKBUILD 校验 |
| `abuild fetch` | 仅下载源码到 $SRCDEST |
| `abuild unpack` | 仅解压源码到 $srcdir |
| `abuild prepare` | 解压 + apply patches |
| `abuild build` | 仅编译 |
| `abuild check` | 仅运行测试 |
| `abuild package` | 仅打包到 $pkgdir |
| `abuild rootbld` | 在干净 chroot 中构建（需要 abuild-rootbld） |
| `abuild sourcecheck` | 检查上游源码 URL 是否可达 |
| `abuild up2date` | 比较目标包与源码日期 |

### 清理与包管理命令

| 命令 | 用途 |
|------|------|
| `abuild deps` | 安装 makedepends 和 depends |
| `abuild undeps` | 卸载 makedepends 和 depends |
| `abuild clean` | 清理构建临时目录 |
| `abuild cleanpkg` | 清理生成的 .apk |
| `abuild cleanoldpkg` | 清理旧版本 .apk |
| `abuild cleancache` | 清理 $SRCDEST 下载缓存 |
| `abuild rootpkg` | 以 fakeroot 创建 .apk |

### 仓库命令

| 命令 | 用途 |
|------|------|
| `abuild index` | 重新生成 $REPODEST 中的 APKINDEX |
| `abuild listpkg` | 列出目标包名 |
| `abuild srcpkg` | 创建源码包 |
| `abuild snapshot` | 创建 git snapshot 并上传 |
| `abuild verify` | 校验源码 checksum |

### 环境变量

| 变量 | 用途 |
|------|------|
| `REPODEST` | 包仓库输出目录 |
| `SRCDEST` | 源码缓存目录（默认 /var/cache/distfiles） |
| `PACKAGER` | 打包者信息 |
| `USE_CCACHE` | 启用 ccache 加速重复编译 |
| `BOOTSTRAP` | Bootstrap 模式（nocc, nolibc） |

## 构建失败排查

### 标准排查流程

```bash
# 1. 初始构建，保留构建目录
abuild clean
abuild -r -K 2>&1 | tee /tmp/build.log

# 2. 分析日志
grep -i 'error\|undefined\|undeclared\|fatal' /tmp/build.log

# 3. 进入源码目录排查
abuild unpack
cd src/*/
grep -r "PROBLEMATIC_SYMBOL" .

# 4. 清理缓存后重试
sudo rm -rf /var/cache/distfiles/mypackage-*
abuild checksum
abuild -r
```

### 常见构建问题

| 问题 | 解决方案 |
|------|----------|
| checksum mismatch | `abuild checksum` 重新计算 |
| source download failed | 手动 `curl -L` 下载到 `/var/cache/distfiles/` |
| missing dependency | `apk add` 或在 `makedepends` 中添加 |
| permission denied | `sudo chown -R $USER:abuild /var/cache/distfiles` |
| test failure | 检查 `checkdepends`，或 `options="!check"` + 注释说明原因 |
| patch apply failed | 更新或移除过期 patches |
| undeclared identifier | 添加缺失的 `#include` 或条件 `#define` |
| linking error | 检查 `makedepends` 是否缺少 `-dev` 包 |

### 创建 Patch 修复构建

```bash
# 1. 解压源码
abuild unpack
cd src/mypackage-*/

# 2. 创建 patch
cat > ../../fix-build.patch << 'EOF'
--- a/path/to/file.c
+++ b/path/to/file.c
@@ -10,6 +10,9 @@
 #include <stdio.h>
+#ifndef MISSING_SYMBOL
+#define MISSING_SYMBOL value
+#endif
EOF

# 3. 将 patch 加入 APKBUILD source
cd ../..
vim APKBUILD  # 在 source= 中添加 fix-build.patch

# 4. 更新 checksum 并重新构建
abuild checksum
abuild clean
abuild -r
```

## 提交 Merge Request

### GitLab（官方）

```bash
# 推送到你的 fork
git push myfork bump-mypackage-2.0.0

# 使用 glab CLI 创建 MR
GITLAB_HOST=gitlab.alpinelinux.org glab mr create \
  --source-branch "bump-mypackage-2.0.0" \
  --target-branch master \
  --repo alpine/aports \
  --title "community/mypackage: upgrade to 2.0.0" \
  --description "Upgrade mypackage from 1.0.0 to 2.0.0

https://github.com/org/mypackage/releases/tag/v2.0.0"
```

### glab MR 管理

```bash
# 所有 glab 命令需要设置 GITLAB_HOST
export GITLAB_HOST=gitlab.alpinelinux.org

# 列出自己的 MR
glab mr list --author myusername

# 查看 MR 详情
glab mr view 12345 --repo alpine/aports

# 标记 MR 为 ready
glab mr update 12345 --repo alpine/aports --ready

# 关闭 MR
glab mr close 12345 --repo alpine/aports
```

### GitHub（镜像，PR 会被自动关闭）

注意：Alpine 已迁移到自建 GitLab，GitHub PR 会被 bot 自动关闭，建议用 GitLab MR。

## 其他维护操作

### Rebuild（依赖库 soname 变更等）

```bash
# 只增加 pkgrel
# pkgrel=1  (原来是 0)
vim APKBUILD
abuild -r  # 验证
git add APKBUILD
git commit -m "community/mypackage: rebuild for so:libfoo.so.2"
```

### Move（testing → community）

```bash
git mv testing/mypackage community/mypackage
git commit -m "community/mypackage: move from testing"
```

### 安全更新（secfixes）

在 APKBUILD 头部的注释块中记录 CVE：

```bash
# secfixes:
#   1.2.3-r1:
#     - CVE-2024-12345
#     - CVE-2024-12346
#   1.2.2-r0:
#     - CVE-2024-12344
```

### 子包（Subpackages）

```bash
subpackages="
  $pkgname-doc        # /usr/share/doc, /usr/share/man
  $pkgname-dev        # /usr/include, /usr/lib/*.a, /usr/lib/pkgconfig
  $pkgname-openrc     # /etc/init.d
  $pkgname-bash-completion
  $pkgname-zsh-completion
  $pkgname-fish-completion
  $pkgname-libs       # 共享库
  $pkgname-static     # 静态库
"
# 自定义子包函数
myfeature() {
  pkgdesc="My feature subpackage"
  depends="$pkgname=$pkgver-r$pkgrel"
  amove usr/lib/myfeature
}
```

### 常用 APKBUILD options

| Option | 说明 |
|--------|------|
| `!check` | 跳过测试（必须注释说明原因：`# check: no test suite`） |
| `!strip` | 不 strip 二进制 |
| `net` | 允许构建时访问网络（用于 Go/Rust 等） |
| `chmod-clean` | 修复源码中的权限问题 |
| `!tracedeps` | 不自动扫描依赖 |
| `ldpath-recursive` | 递归扫描 RPATH |
| `suid` | 允许 setuid |
| `textrels` | 允许 text relocations |

### 常用 arch 值

| 值 | 说明 |
|----|------|
| `all` | 所有架构 |
| `noarch` | 架构无关（纯脚本、数据包等） |
| `x86_64` | 仅 x86_64 |
| `!armhf !s390x` | 排除特定架构（注释说明原因） |
