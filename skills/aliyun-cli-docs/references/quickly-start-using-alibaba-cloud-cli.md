阿里云 CLI 安装完成后，只需配置身份凭证并安装云产品插件即可开始调用 API。本文以 ECS 为例，演示从安装CLI到执行第一条命令的完整流程。

## 方案概览
使用阿里云 CLI 调用云产品 API，分四个步骤：

1. [步骤一：安装阿里云 CLI](#r3inst01h2mn1)

2. [步骤二：配置身份凭证](#nst1h2main001)

3. [步骤三：安装云产品插件](#nst2h2main001)

4. [步骤四：执行命令](#r3st4h2main001)

## 前提条件
* 已注册阿里云账号。如尚未注册，请访问[阿里云官网](https://www.aliyun.com/)完成注册。

## 步骤一：安装阿里云 CLI
以 Linux 系统为例，执行以下一键安装命令：

```bash
/bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)"
```

其他操作系统的安装方式请参见：[安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)。

安装完成后，执行以下命令确认版本：

```bash
aliyun version
```

确认输出版本号 ≥ 3.3.0。否则请重新安装。
**说明**

如需免安装方式，可使用 [Cloud Shell](https://shell.aliyun.com/)，已内置阿里云 CLI 并通过浏览器会话自动完成认证，可直接从步骤三开始。

## 步骤二：配置身份凭证
阿里云 CLI 支持多种身份认证方式。推荐使用 OAuth 认证；如使用 AccessKey，请勿将其硬编码在代码中。

## OAuth 认证
OAuth 通过浏览器登录完成认证，无需手动创建或管理密钥。
**说明**

无图形界面的服务器环境无法使用 OAuth 认证，请切换到 AccessKey 认证标签页。
**重要**

RAM 管理员需预先完成以下操作：创建 CLI OAuth 应用、为需要使用 CLI 的用户分配身份。具体操作，请参见[为阿里云CLI配置OAuth认证](https://help.aliyun.com/document_detail/2995960.html)的步骤一和步骤二。阿里云主账号（即注册阿里云时使用的账号）用户无需此操作。

1. 执行以下命令启动 OAuth 配置：

   ```bash
   aliyun configure --mode OAuth --profile default
   ```

   `--profile default` 表示将此凭证保存为名为 `default` 的配置。CLI 支持多套命名配置（Profile），通过 `--profile mydev` 切换使用不同凭证。
2. CLI 提示选择登录站点，直接按回车确认默认设置。

3. CLI 自动打开浏览器完成授权。终端输出类似以下内容：

   ```text
   Please open the following URL in your browser to authorize:
   https://signin.aliyun.com/oauth2/v1/auth?response_type=code&client_id=40381819545577*****&redirect_uri=http%3A%2F%2F127.0.0.1%3A12345%2Fcli%2Fcallback&state=CdI6CcOsxQUiCuFl&code_challenge=vDr1QWI5TI9q6UMMs2djJzxCmcAySjrYK6UD4Gu2res&code_challenge_method=S256
   If the browser does not open automatically, use the following URL to complete the login process:

   SignIn url: https://signin.aliyun.com/oauth2/v1/auth?response_type=code&client_id=40381819545577*****&redirect_uri=http%3A%2F%2F127.0.0.1%3A12345%2Fcli%2Fcallback&state=CdI6CcOsxQUiCuFl&code_challenge=vDr1QWI5TI9q6UMMs2djJzxCmcAySjrYK6UD4Gu2res&code_challenge_method=S256

   Now you can login to your account with OAuth configuration in the browser.
   ```

   若浏览器未弹出，复制终端中显示的 Sign In URL，手动在浏览器中打开并登录。
4. 授权成功后，返回终端，输入默认地域 ID，终端语言。终端回显示例：

   ```text
   Default Region Id []: cn-hangzhou
   Default Output Format [json]: json (Only support json)
   Default Language [zh|en] en: zh
   Saving profile[oauth-1] ...Done.

   Configure Done!!!
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
   ```

5. 验证凭证是否有效：

   ```bash
   aliyun sts get-caller-identity
   ```

   如返回 `AccountId` 和 `Arn` 信息，表示凭证配置有效。
   **说明**

   如报错 `Forbidden.NoPermission`，表示当前用户权限不足，需联系您组织的 RAM 管理员，为当前 RAM 用户添加相应权限。如果您使用的是阿里云主账号，请检查账号状态是否正常。

## AccessKey 认证
**警告**

AccessKey 是长期有效的凭证。请勿将其硬编码在代码或配置文件中，建议通过环境变量传入。仅在个人开发调试环境使用；生产环境推荐使用 OAuth。详见[凭证的安全使用方案](https://help.aliyun.com/document_detail/2391595.html)。

1. 如已有 AccessKey，直接使用现有的 AccessKey ID 和 AccessKey Secret，跳过本步骤。如尚未创建，前往 RAM 控制台创建 RAM 用户并生成 AccessKey，具体操作请参见[创建 RAM 用户](https://help.aliyun.com/document_detail/93720.html)。

2. 执行以下命令启动 AccessKey 配置：

   ```bash
   aliyun configure --mode AK --profile default
   ```

   `--profile default` 表示将此凭证保存为名为 `default` 的配置。CLI 支持多套命名配置（Profile），通过 `--profile mydev` 切换使用不同凭证。
3. 按提示依次输入 AccessKey ID、AccessKey Secret 、默认地域 ID（如 `cn-hangzhou`）和终端语言。

4. 验证凭证是否有效：

   ```bash
   aliyun sts get-caller-identity
   ```

   如返回 `AccountId` 和 `Arn` 信息，表示凭证配置有效。如报错，请检查 AccessKey ID 和 Secret 是否填写正确。
   **说明**

   如报错 `Forbidden.NoPermission`，表示当前 RAM 用户权限不足，需联系您组织的 RAM 管理员，为当前 RAM 用户添加相应权限。如果您使用的是阿里云主账号，请检查账号状态是否正常。

阿里云 CLI 还支持 STS Token（临时授权场景）等更多身份凭证类型，详见[配置与管理身份凭证](https://help.aliyun.com/document_detail/121193.html)。

## 步骤三：安装云产品插件
阿里云 CLI 的各云产品命令以插件形式按需安装。

以 ECS 为例，安装 ECS 插件：

```bash
aliyun plugin install --names ecs
```

终端输出 `Plugin aliyun-cli-ecs x.x.x installed successfully!` 表示安装成功。

更多插件的安装和管理方式，请参见[快速安装云产品CLI插件](https://help.aliyun.com/document_detail/3024826.html)。

## 步骤四：执行命令
执行命令查询可用地域列表：

```bash
aliyun ecs describe-regions --accept-language zh-CN
```

`--accept-language zh-CN` 指定返回结果的语言为中文。

命令返回结果示例（节选）：

```json
{
  "Regions": {
    "Region": [
      {
        "RegionId": "cn-hangzhou",
        "RegionEndpoint": "ecs.cn-hangzhou.aliyuncs.com",
        "LocalName": "华东1（杭州）"
      },
      {
        "RegionId": "cn-shanghai",
        "RegionEndpoint": "ecs.cn-shanghai.aliyuncs.com",
        "LocalName": "华东2（上海）"
      },
      {
        "RegionId": "cn-beijing",
        "RegionEndpoint": "ecs.cn-beijing.aliyuncs.com",
        "LocalName": "华北2（北京）"
      }
    ]
  },
  "RequestId": "5BEAEC76-E9B4-47B2-8D24-A3C31D5D2EEF"
}
```

`RequestId` 是每次 API 调用的唯一标识，用于问题排查时使用。

## 常见问题
### OAuth 配置时提示"调用未被授权"是什么原因？

当前账号不具备创建 OAuth 应用所需的 RAM 管理权限。请切换到 RAM 管理员账号，或联系管理员完成 OAuth 应用的创建和身份分配。具体权限要求，请参见[OAuth 凭证](https://help.aliyun.com/document_detail/3032982.html)。

### 为什么需要安装插件才能使用云产品命令？

阿里云 CLI 采用插件化架构：CLI 本体保持轻量，各云产品的命令单独打包为插件，可按需安装、独立更新，无需每次随 CLI 整体升级。执行 `aliyun plugin list-remote` 可查看所有可安装的插件。

### 怎么知道某个云产品是否支持 CLI？

执行 `aliyun plugin list-remote` 查看所有可用插件列表，或访问 [OpenAPI 门户 CLI 主页](https://api.aliyun.com/api-tools/cli)按产品搜索。

### 可以在无图形界面的服务器上使用 OAuth 认证吗？

不可以。OAuth 认证需要通过浏览器完成登录授权。

## 相关文档
* [理解命令结构](https://help.aliyun.com/document_detail/110848.html#1640a5c2c077i)

* [安装与管理云产品 CLI 插件](https://help.aliyun.com/document_detail/3024826.html)

* [配置与管理身份凭证](https://help.aliyun.com/document_detail/121193.html)
