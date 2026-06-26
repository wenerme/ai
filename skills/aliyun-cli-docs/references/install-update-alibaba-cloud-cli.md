本文介绍在 Linux、macOS 和 Windows 上安装、验证、更新与卸载阿里云 CLI 的方法。

## 版本信息
阿里云 CLI 持续发布新版本，建议始终使用最新版本以获得最佳体验。执行 `aliyun version` 可查看当前已安装版本，访问 [GitHub Releases 页面](https://github.com/aliyun/aliyun-cli/releases)可查看最新版本及变更内容。
**重要**

3.3.0 以下版本已停止维护，不再获得功能更新和安全修复。如当前版本低于 3.3.0，请参考[从旧版迁移到插件版 CLI](https://help.aliyun.com/document_detail/3032942.html)完成升级。

## 前提条件
* 已注册[阿里云账号](https://account.aliyun.com/register/register.htm)。

* （可选）已安装 `curl` 命令行工具。macOS 和大多数 Linux 发行版已预装。如选择通过 GUI 或包管理器安装，可跳过此项。

## 操作系统支持

| **操作系统** | **支持版本** | **支持架构** |
| --- | --- | --- |
| Linux | 主流发行版，如 CentOS 8+/RHEL 8+、Ubuntu 16.04+、Debian 9+ 等（CentOS 7 已 EOL，不建议使用） | AMD64、ARM64 |
| macOS | macOS 11（Big Sur）及以上 | Intel 和 Apple Silicon（Universal） |
| Windows | Windows 10 及以上（64 位） | AMD64（不支持 32 位及 ARM64） |

## 安装阿里云 CLI
根据操作系统选择对应 Tab，按步骤完成安装。每种操作系统均提供多种安装途径，选择其中一种即可。

## Linux
## 通过 Bash 脚本安装（推荐）
支持以下选项：

* 安装最新版本

  若未指定版本，脚本将自动安装最新版本。

  ```bash
  /bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)"
  ```

* 安装历史版本

  使用 `-V` 选项可指定安装版本。访问 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases) 页面可查看历史可用版本。

  ```bash
  /bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)" -- -V 3.3.18
  ```

## 通过 TGZ 安装包（.tar.gz）安装
1. 下载安装包。

   * 下载最新版本：

     **说明**

     执行 `uname -m` 可查看 Linux 系统架构。终端输出 `arm64` 或 `aarch64` 表示 ARM64 架构，其他输出表示 AMD64 架构。
     * AMD64 系统：

       ```bash
       curl https://aliyuncli.alicdn.com/aliyun-cli-linux-latest-amd64.tgz -o aliyun-cli-linux-latest.tgz
       ```

     * ARM64 系统：

       ```bash
       curl https://aliyuncli.alicdn.com/aliyun-cli-linux-latest-arm64.tgz -o aliyun-cli-linux-latest.tgz
       ```

   * 下载历史版本：访问 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases) 页面可下载历史版本安装包。

     Linux 适用安装包包名格式为 `aliyun-cli-linux-<version>-<architecture>.tgz`（其中 `<version>` 替换为目标版本号，如 3.3.18；`<architecture>` 替换为 amd64 或 arm64）。
2. 解压安装包以获取可执行文件 `aliyun`。

   ```shell
   tar xzvf aliyun-cli-linux-latest.tgz
   ```

3. 将可执行文件移动至 `/usr/local/bin` 目录，使 `aliyun` 命令可在任意路径下运行。

   ```bash
   sudo mv ./aliyun /usr/local/bin/
   ```

## macOS
## 通过 Homebrew 安装（推荐）
**说明**

继续操作前，请确保已安装并配置 [Homebrew](https://brew.sh/)。
1. 修改安装源。（可选）

   中国内地用户可能由于网络问题无法安装，可尝试修改 Homebrew 安装源以解决此问题。以使用中科大开源镜像站为例：
   **设置 Homebrew 安装源为科大源**
   **说明**

   Homebrew 支持通过修改环境变量设置安装源，首次安装 Homebrew 时也可以通过此方式加速下载过程。

   ```bash
   export HOMEBREW_INSTALL_FROM_API=1
   export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
   export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
   export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
   export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
   brew update
   ```

2. 安装最新版本的阿里云 CLI。

   ```bash
   brew install aliyun-cli
   ```

## 通过图形界面（PKG）安装
双击安装，无需命令行工具。

1. 下载安装包。

   * 下载最新版本：在浏览器中打开下载链接 <https://aliyuncli.alicdn.com/aliyun-cli-latest.pkg>，下载最新版本安装包。

   * 下载历史版本：访问 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases) 页面可查看并下载历史版本安装包。

     macOS 适用的 PKG（macOS Installer Package，.pkg）安装包包名格式为 `aliyun-cli-<version>.pkg`。
2. 双击下载好的安装包，按照说明指引完成安装。

## 通过 Bash 脚本安装
安装命令与 Linux 相同，参数说明请参见 Linux 的「通过 Bash 脚本安装」方式。

* 安装最新版本

  ```bash
  /bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)"
  ```

* 安装历史版本

  **重要**

  版本要求见「[版本信息](#sec-version-001)」章节。

  ```bash
  /bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)" -- -V 3.3.5
  ```

## 通过 TGZ 安装包（.tar.gz）安装
1. 下载安装包。

   * 下载最新版本：

     ```bash
     curl https://aliyuncli.alicdn.com/aliyun-cli-macosx-latest-universal.tgz -o aliyun-cli-macosx-latest-universal.tgz
     ```

   * 下载历史版本：访问 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases) 页面可下载历史版本安装包。

     macOS 适用安装包包名格式为 `aliyun-cli-macosx-<version>-universal.tgz`。
     **重要**

     版本要求见「[版本信息](#sec-version-001)」章节。
2. 解压安装包以获取可执行文件 `aliyun`。

   ```shell
   tar xzvf aliyun-cli-macosx-latest-universal.tgz
   ```

3. 将可执行文件移动至 `/usr/local/bin` 目录，使 `aliyun` 命令可在任意路径下运行。

   ```bash
   sudo mv ./aliyun /usr/local/bin/
   ```

## Windows
**重要**

阿里云 CLI 当前仅适用于 Windows AMD64 架构系统，暂不支持 32 位及其他非 AMD64 架构（如 ARM64）的 Windows 系统。

## 通过图形界面（GUI）安装
### 下载并解压安装包

1. 下载安装包。

   * 下载最新版本：在浏览器中打开下载链接 <https://aliyuncli.alicdn.com/aliyun-cli-windows-latest-amd64.zip>，下载最新版本安装包。

   * 下载历史版本：访问 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases) 页面可下载历史版本安装包。

     Windows 适用安装包包名格式为 `aliyun-cli-windows-<version>-amd64.zip`。
2. 将安装包中的可执行文件 `aliyun.exe` 解压至目标目录（建议 `C:\AliyunCLI`），该目录将作为阿里云 CLI 的安装目录。

   **说明**
   * 该文件需要通过命令行终端运行，双击文件无法正常工作。

   * 请记住此安装路径，后续配置 PATH 时需要使用。

### 配置 PATH 环境变量

1. 按下 `Windows` 键 + `S` 键打开搜索界面，输入搜索关键词"环境变量"。

2. 在搜索结果中单击 **编辑账户的环境变量** ，打开 **环境变量** 设置界面。

3. 在 **用户变量** 中选择键为 `Path` 的环境变量，单击 **编辑**。

   ![](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5560987471/p49127.png)
4. 在编辑界面中单击 **新建** ，输入阿里云 CLI 安装目录路径。示例目录：`C:\ExampleDir`（请替换为实际安装目录路径）。

   ![image](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5560987471/p958791.png)
5. 在所有打开的对话框中依次单击 **确定** 以保存更改。

6. 重新启动终端会话以使更改生效。

## 通过 PowerShell 脚本安装
1. 新建脚本文件 `Install-CLI-Windows.ps1`。可在 PowerShell 中执行 `New-Item Install-CLI-Windows.ps1` 创建，或在文件资源管理器中新建文本文档后重命名。

2. 将以下代码复制并保存到脚本文件中。

   **脚本示例**

   ```powershell
   # Install-CLI-Windows.ps1
   # Purpose: Install Alibaba Cloud CLI on Windows AMD64 systems.
   # Supports custom version and install directory. Only modifies User-level and Process-level PATH.

   [CmdletBinding()]
   param (
       [string]$Version = "latest",
       [string]$InstallDir = "$env:LOCALAPPDATA",
       [switch]$Help
   )

   function Show-Usage {
       Write-Output @"

         Alibaba Cloud Command Line Interface Installer

       -Help                 Display this help and exit

       -Version VERSION      Custom CLI version. Default is 'latest'

       -InstallDir PATH      Custom installation directory. Default is:
                             $InstallDir\AliyunCLI

   "@
   }

   function Write-ErrorExit {
       param([string]$Message)
       Write-Error $Message
       exit 1
   }

   if ($PSBoundParameters['Help']) {
       Show-Usage
       exit 0
   }

   Write-Output @"
   ..............888888888888888888888 ........=8888888888888888888D=..............
   ...........88888888888888888888888 ..........D8888888888888888888888I...........
   .........,8888888888888ZI: ...........................=Z88D8888888888D..........
   .........+88888888 ..........................................88888888D..........
   .........+88888888 .......Welcome to use Alibaba Cloud.......O8888888D..........
   .........+88888888 ............. ************* ..............O8888888D..........
   .........+88888888 .... Command Line Interface(Reloaded) ....O8888888D..........
   .........+88888888...........................................88888888D..........
   ..........D888888888888DO+. ..........................?ND888888888888D..........
   ...........O8888888888888888888888...........D8888888888888888888888=...........
   ............ .:D8888888888888888888.........78888888888888888888O ..............
   "@

   $OSArchitecture = (Get-WmiObject -Class Win32_OperatingSystem).OSArchitecture

   $ProcessorArchitecture = [int](Get-WmiObject -Class Win32_Processor).Architecture

   if (-not ($OSArchitecture -match "64") -or $ProcessorArchitecture -ne 9) {
       Write-ErrorExit "Alibaba Cloud CLI only supports Windows AMD64 systems. Please run on a compatible system."
   }

   $DownloadUrl = "https://aliyuncli.alicdn.com/aliyun-cli-windows-$Version-amd64.zip"

   $tempPath = $env:TEMP
   $randomName = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 8)
   $DownloadDir = Join-Path -Path $tempPath -ChildPath $randomName
   New-Item -ItemType Directory -Path $DownloadDir | Out-Null

   try {
       $InstallDir = Join-Path $InstallDir "AliyunCLI"
       if (-not (Test-Path $InstallDir)) {
           New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
       }

       $ZipPath = Join-Path $DownloadDir "aliyun-cli.zip"
       Start-BitsTransfer -Source $DownloadUrl -Destination $ZipPath

       Expand-Archive -Path $ZipPath -DestinationPath $DownloadDir -Force

       Move-Item -Path "$DownloadDir\aliyun.exe" -Destination "$InstallDir\" -Force

       $Key = 'HKCU:\Environment'
       $CurrentPath = (Get-ItemProperty -Path $Key -Name PATH).PATH

       if ([string]::IsNullOrEmpty($CurrentPath)) {
           $NewPath = $InstallDir
       } else {
           if ($CurrentPath -notlike "*$InstallDir*") {
               $NewPath = "$CurrentPath;$InstallDir"
           } else {
               $NewPath = $CurrentPath
           }
       }

       if ($NewPath -ne $CurrentPath) {
           Set-ItemProperty -Path $Key -Name PATH -Value $NewPath
           $env:PATH += ";$InstallDir"
       }
   } catch {
       Write-ErrorExit "Failed to install Alibaba Cloud CLI: $_"
   } finally {
       Remove-Item -Path $DownloadDir -Recurse -Force | Out-Null
   }
   ```

3. 参考以下示例，运行脚本文件安装阿里云 CLI。

   **说明**

   示例脚本路径为 `C:\Example\Install-CLI-Windows.ps1`，请将脚本路径替换为实际位置后运行命令。
   * 若未指定版本，脚本将自动安装最新版本。默认安装路径为：`C:\Users\<USERNAME>\AppData\Local\AliyunCLI`。

     ```powershell
     powershell.exe -ExecutionPolicy Bypass -File C:\Example\Install-CLI-Windows.ps1
     ```

   * 使用 `-Version` 和 `-InstallDir` 选项可指定安装版本和安装目录。访问 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases) 页面可查看历史可用版本。

     ```powershell
     powershell.exe -ExecutionPolicy Bypass -File C:\Example\Install-CLI-Windows.ps1 -Version 3.3.15 -InstallDir "C:\ExampleDir\AliyunCLI"
     ```

### 验证安装结果

安装完成后，在终端中执行以下命令确认阿里云 CLI 已安装成功。

```shell
aliyun version
```

如显示版本号（例如 `3.3.15`），则安装成功。

进一步确认 CLI 可正常工作：

```bash
aliyun configure list
```

如显示凭证配置列表（即使为空），则确认 CLI 运行正常。

验证通过后，下一步需要为阿里云 CLI 配置访问凭证，才能开始管理云资源：

* [快速入门](https://help.aliyun.com/document_detail/2808429.html)：了解如何配置凭证并执行第一条命令。

* [配置凭证](https://help.aliyun.com/document_detail/121193.html)：为阿里云 CLI 配置访问密钥或 RAM 角色等身份凭证。

* 版本迁移：如果当前版本低于 3.3.0，参考[从旧版迁移到插件版 CLI](https://help.aliyun.com/document_detail/3032942.html)完成升级。

## 更新阿里云 CLI
推荐使用 `aliyun upgrade` 命令一键更新。如当前版本低于 3.3.5，需先通过重新安装的方式升级到 3.3.5+，之后即可使用 `aliyun upgrade`。

### 通过 aliyun upgrade 更新（推荐）

v3.3.5 及以上版本支持 `aliyun upgrade` 命令，一键更新到最新版本。该命令适用于非Homebrew安装方式的CLI。

* 交互式更新（需确认）：

  ```bash
  aliyun upgrade
  ```

* 跳过确认直接更新：

  ```bash
  aliyun upgrade --yes
  ```

**说明**

如当前版本低于 3.3.5（执行 `aliyun version` 查看），需先[通过重新安装更新](#h3-update-methods-001)，之后即可使用`aliyun upgrade`。

### 通过重新安装更新

* **Bash 脚本（Linux/macOS）**：重新执行安装命令。

  ```bash
  /bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)"
  ```

* **Homebrew（仅 macOS）**：

  ```bash
  brew update && brew upgrade aliyun-cli && brew cleanup aliyun-cli
  ```

* **GUI 安装包（macOS PKG / Windows ZIP）** ：下载最新安装包，重新安装即可覆盖原版本。macOS 下载链接：[aliyun-cli-latest.pkg](https://aliyuncli.alicdn.com/aliyun-cli-latest.pkg)；Windows 下载链接：[aliyun-cli-windows-latest-amd64.zip](https://aliyuncli.alicdn.com/aliyun-cli-windows-latest-amd64.zip)。

* **TGZ 安装包（Linux/macOS）** ：下载最新 TGZ 包，解压后将 `aliyun` 可执行文件覆盖至原安装目录（执行 `which aliyun` 可确认路径）。

* **PowerShell 脚本（仅 Windows）**：以相同参数重新执行安装脚本。

  如初次安装时指定了自定义安装目录（`-InstallDir`），更新时须传入相同值，否则将安装到默认目录。

  ```powershell
  powershell.exe -ExecutionPolicy Bypass -File C:\Example\Install-CLI-Windows.ps1
  ```

更新完成后，执行 `aliyun version` 确认版本号已更新为最新版本。

### 确认当前安装信息

如果不确定当前的安装方式或安装路径，可通过以下命令查看可执行文件位置：

* Linux/macOS：执行 `which aliyun`，输出即为可执行文件路径。

  * 路径包含 `homebrew/Cellar` 或 `homebrew/bin` → 通过 Homebrew 安装。

  * 路径为 `/usr/local/bin/aliyun` → 通过 Bash 脚本或 TGZ 安装包安装。

* Windows：执行 `where aliyun`，输出即为可执行文件路径。

  * 路径包含 `AliyunCLI`（如 `C:\Users\<USERNAME>\AppData\Local\AliyunCLI`）→ 通过 PowerShell 脚本安装。

  * 路径为自定义目录 → 通过 GUI 安装（手动解压 ZIP 包）。

## 卸载阿里云 CLI
根据操作系统选择对应 Tab，执行卸载操作。

## Linux
1. 确认可执行文件路径：

   ```bash
   which aliyun
   ```

2. 确认路径无误后，删除该文件：

   ```bash
   sudo rm -v $(which aliyun)
   ```

## macOS
### 通过 Homebrew 卸载（适用于 Homebrew 安装方式）

```bash
brew uninstall aliyun-cli
```

### 命令行卸载（适用于 PKG、Bash 脚本或 TGZ 安装方式）

通过 PKG 安装包安装的 CLI 通常也位于 `/usr/local/bin`，可使用同一命令删除。

1. 确认可执行文件路径：

   ```bash
   which aliyun
   ```

2. 确认路径无误后，删除该文件：

   ```bash
   sudo rm -v $(which aliyun)
   ```

## Windows
### 通过文件管理器卸载（适用于 GUI 安装方式）

**说明**

如忘记安装目录，可先在命令行终端中执行 `where aliyun` 查看可执行文件的完整路径，再前往该目录删除。

在文件资源管理器中定位 `aliyun.exe` 所在目录，删除该文件。如需同时从 PATH 中移除安装目录，请在系统环境变量中删除对应路径条目。

### 通过 PowerShell 卸载（适用于 PowerShell 脚本安装方式）

删除默认安装目录下的阿里云 CLI 文件。如使用了自定义安装路径，请将 `$InstallDir` 替换为实际路径。

```powershell
$InstallDir = Join-Path $env:LOCALAPPDATA "AliyunCLI"
Remove-Item -Path "$InstallDir\aliyun.exe" -Force
```

### 清理配置文件（可选）

如需彻底清理，可删除阿里云 CLI 的配置目录：

* Linux/macOS：`~/.aliyun`

* Windows：`C:\Users\<用户名>\.aliyun`

### 验证卸载结果

卸载完成后，在终端执行 `aliyun version`。若返回 `command not found` 或类似提示，则确认卸载成功。

## 常见问题
### 执行 aliyun 命令提示 command not found

先关闭并重新打开终端，再执行一次命令。多数情况下，PATH 变量在安装后需要刷新终端才能生效。

如重启终端后问题依旧，执行 `which aliyun`（Linux/macOS）或 `where aliyun`（Windows）检查可执行文件路径。若命令无输出，说明 PATH 未包含安装目录，需手动将安装目录添加至 PATH：

* Bash（Linux）：在 `~/.bashrc` 末尾添加 `export PATH="$PATH:/usr/local/bin"`，然后执行 `source ~/.bashrc`。

* Zsh（macOS 默认）：在 `~/.zshrc` 末尾添加 `export PATH="$PATH:/usr/local/bin"`，然后执行 `source ~/.zshrc`。

* Windows：参见安装步骤中的"配置 PATH 环境变量"，将安装目录添加至用户变量 Path，重启终端后生效。

### aliyun version 显示的版本不是最新安装的版本

系统中可能存在多个`aliyun` 可执行文件。执行 `which aliyun`（Linux/macOS）或 `where aliyun`（Windows）查看当前调用的路径，删除旧版本文件或将新版本安装目录排在 PATH 前面即可解决。

### Windows 上双击 aliyun.exe 没有反应

阿里云 CLI 是命令行工具，不支持双击运行。需通过 PowerShell 或 CMD 等命令行终端使用，例如执行 `aliyun version` 验证安装。
