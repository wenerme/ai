阿里云 CLI 通过身份凭证完成认证，才能调用云服务 API 操作云资源。本文介绍如何根据使用场景选择合适的凭证类型，以及如何配置和管理凭证。

## 选择凭证类型
阿里云 CLI 支持多种凭证类型，请根据使用场景选择对应类型。

| **凭证类型** | **适用场景** | **支持非交互式配置** | **详细配置** |
| --- | --- | --- | --- |
| OAuth（**推荐**） | 在浏览器中以阿里云账号、RAM 用户或 SSO 登录，支持 MFA 和通行密钥（Passkey）。无需存储长期访问密钥（AccessKey），安全性高。 | 否 | [配置 OAuth 凭证](https://help.aliyun.com/document_detail/3032982.html) |
| EcsRamRole（**推荐**） | 在 ECS 实例内运行 CLI 时，通过实例绑定的 RAM 角色自动获取临时安全凭证，无需配置或存储长期访问密钥（AccessKey）。 | 是 | [配置 EcsRamRole 凭证](https://help.aliyun.com/document_detail/3033450.html) |
| RamRoleArn（**推荐**） | [扮演 RAM 角色](https://help.aliyun.com/document_detail/93689.html#ce9ce27a75hqi)并以角色身份操作资源。适合临时提权或跨账号访问场景。例如：以基础权限 RAM 用户扮演具备资源管理权限的 RAM 角色，或跨阿里云账号访问资源。使用临时安全凭证STS Token。 | 是 | [配置 RAM 角色凭证](https://help.aliyun.com/document_detail/3033013.html#h2-arn-01) |
| ChainableRamRoleArn | 链式角色扮演（[角色链](https://help.aliyun.com/document_detail/93689.html#13c5fcecb645c)），适用于需要跨多个账号进行资源访问的场景。 | 是 | [配置 RAM 角色链凭证](https://help.aliyun.com/document_detail/3033013.html#h2-chain-01) |
| OIDC | 通过兼容 OIDC（OpenID Connect）协议的外部身份提供商颁发的 ID Token 进行身份认证和角色扮演。建议在开启了 [RRSA](https://help.aliyun.com/document_detail/2584507.html)（RAM Roles for Service Accounts）的 ACK/ACS Pod 中使用。 | 是 | [配置 OIDC 凭证](https://help.aliyun.com/document_detail/3033018.html#1f9791c531qdo) |
| CloudSSO | 适合开启了云 SSO 和资源目录的多账号企业环境。与 OAuth 类似，通过浏览器登录认证，属于交互式认证方式，支持 MFA。 | 否 | [配置 CloudSSO 凭证](https://help.aliyun.com/document_detail/3033018.html#219bcad7728bv) |
| External | 调用外部可执行程序动态获取凭证（AccessKey 或临时安全令牌），适用于自定义凭证提供程序的场景。 | 是 | [配置 External 凭证](https://help.aliyun.com/document_detail/3033018.html#f1ed28ef9e3lw) |
| CredentialsURI | 通过您提供的HTTP URI 地址获取临时安全凭证 STS Token，适用于自建凭证分发服务的场景。 | 否 | [配置 CredentialsURI 凭证](https://help.aliyun.com/document_detail/3033018.html#67896b8dd1vvt) |
| StsToken | 手动提供临时安全凭证 STS Token，令牌过期后需手动更新。 | 是 | [配置 StsToken 凭证](https://help.aliyun.com/document_detail/3033017.html) |
| BearerToken | 使用 Bearer Token 认证阿里云 API 服务，适用于CI/CD等自动化场景。 | 是 | [配置 BearerToken 凭证](https://help.aliyun.com/document_detail/3033018.html) |
| AK（**不推荐**） | 使用阿里云账号或 RAM 用户的长期访问密钥（AccessKey）直接认证。凭证永久有效，安全性相对较低。如确实要使用，建议先参考[AccessKey最佳实践](https://help.aliyun.com/document_detail/2990165.html#8ca79a7ca278m)。 | 是 | [配置 AK 凭证](https://help.aliyun.com/document_detail/3033016.html) |

**说明**

如果使用云命令行（Cloud Shell），系统会自动配置临时凭证。身份为当前登录控制台的RAM用户或角色，权限与该身份一致，无需手动配置即可直接执行 CLI 命令。

## 配置凭证
阿里云 CLI 支持两种凭证配置方式：交互式配置、非交互式配置。

### 交互式配置

交互式配置通过命令行向导引导您完成凭证配置。运行命令后，系统会依次提示您输入各项凭证参数。适合本地开发环境或首次配置。

```bash
aliyun configure --mode <AuthenticateMode> --profile <ProfileName>
```

示例：创建一个名为 `EcsProfile` 的 EcsRamRole 凭证配置：

```bash
aliyun configure --mode EcsRamRole --profile EcsProfile
```

交互过程示例：

```text
Configuring profile 'EcsProfile' in 'EcsRamRole' authenticate mode...
Ecs Ram Role []: ECSAdmin
Default Region Id []: cn-shanghai
Default Output Format [json]: json (Only support json)
Default Language [zh|en] en: en
Saving profile[EcsProfile] ...Done.
```

### 非交互式配置

通过命令行参数直接指定各项凭证配置参数信息，无需交互输入，适用于自动化场景（如脚本、CI/CD 流水线）。

示例：创建一个名为 `AkProfile` 的 AK 凭证配置：

#### **Bash**

```bash
aliyun configure set \
  --profile AkProfile \
  --mode AK \
  --access-key-id  ************ \
  --access-key-secret ************ \
  --region "cn-shanghai"
```

#### **PowerShell**

```powershell
aliyun configure set `
  --profile AkProfile `
  --mode AK `
  --access-key-id  ************ `
  --access-key-secret  ************ `
  --region "cn-shanghai"
```

各凭证类型支持的配置参数请参见对应凭证类型的详细配置文档。以下参数在所有凭证类型中通用：

| **凭证配置通用参数** | **说明** |
| --- | --- |
| `--profile`，`-p` | 配置名称。未指定时，使用[当前激活配置](#h4-view-list)。 |
| `--mode` | 凭证类型，例如 `AK`、`EcsRamRole`、`RamRoleArn` 等。 |
| `--region` | 默认地域 ID，例如 `cn-hangzhou`。执行 API 调用时若未显式指定地域，则使用此默认值。 |

各凭证类型是否支持非交互式配置，见上方[选择凭证类型](#h2-select-type)。
**说明**

同一种凭证类型可配置多份，配置名称不同即可。例如，可创建 `ak-dev` 和 `ak-prod` 两份 AK 凭证配置，分别用于开发和生产环境。

## 验证凭证配置
凭证配置完成后，运行以下命令验证凭证是否有效：

```bash
aliyun sts get-caller-identity
```

凭证配置正确时，输出类似如下：

* 如当前通过认证的身份为RAM用户：

  ```json
  {
    "AccountId": "173305794806****",
    "Arn": "acs:ram::173305794806****:user/<user-name>",
    "IdentityType": "RAMUser",
    "PrincipalId": "20407046578681****",
    "RequestId": "D012C652-FF76-5101-81B3-45A1DDAC****",
    "UserId": "20407046578681****"
  }
  ```

* 如当前通过认证的身份为RAM角色：

  ```json
  {
    "AccountId": "191317683912****",
    "Arn": "acs:ram::191317683912****:assumed-role/<role-name>/<role-session-name>",
    "IdentityType": "AssumedRoleUser",
    "PrincipalId": "30004467717606****:<role-session-name>",
    "RequestId": "0FFADC33-EA49-5E2A-977F-0BA820D6****",
    "RoleId": "30004467717606****"
  }
  ```

**说明**

验证通过仅代表身份认证成功。要操作资源，还需为凭证关联的身份授予相应权限策略。

## 管理凭证
通过 `aliyun configure` 子命令可对已有凭证配置进行查看、切换、修改和删除操作。

### 查看配置

#### 查看配置列表与当前激活配置

查看当前机器上所有已配置的凭证及其状态。可用于确认凭证配置概要信息（如配置名称、凭证类型等），以及哪个是当前的激活配置。

```bash
aliyun configure list
```

命令输出示例如下，带 `*` 标记的为当前激活的凭证配置。激活配置即 CLI 执行命令时默认使用的凭证和参数（如地域、语言），未通过 `--profile` 或环境变量指定其他配置时，所有命令均使用该配置。

```text
Profile      | Credential               | Valid   | Region           | Language
---------    | ------------------       | ------- | ---------------- | --------
default      | AK:***UyLX               | Valid   | cn-shanghai      | en
OAuthProfile | OAuth:fiA5bnZkyw@CN      | Valid   | cn-hangzhou      | en
EcsProfile * | EcsRamRole:ecs-role-name | Valid   | cn-beijing       | zh
```

#### 查看指定配置详情

运行以下命令查看指定凭证配置的详细信息：

```bash
aliyun configure get [--profile <ProfileName>] [<SETTING_NAME>...]
```

`SETTING_NAME`：指定要查看的设置项名称，可同时指定多项。未指定时显示全部凭证配置信息。若指定的设置项不存在，命令不返回信息。
可查看设置项列表

| **设置项名称** | **说明** | **关联配置字段** |
| --- | --- | --- |
| profile | 配置名称。 | name |
| mode | 凭证类型。 | mode |
| region | 默认地域ID。 | region_id |
| language | 帮助信息语言。 | language |
| access-key-id | 阿里云账号或 RAM 用户的AccessKey ID。 | access_key_id |
| access-key-secret | 阿里云账号或 RAM 用户的AccessKey Secret。 | access_key_secret |
| sts-token | RAM用户或角色的临时身份凭证STS Token。 | sts_token |
| sts-region | RAM用户或角色获取临时身份凭证时发起调用的地域ID。 | sts_region |
| ram-role-name | RAM角色名称。 | ram_role_name |
| ram-role-arn | RAM角色ARN。 | ram_role_arn |
| external-id | 角色外部ID。 | external_id |
| role-session-name | 角色会话名称。 | ram_session_name |
| cloud-sso-sign-in-url | 云SSO用户登录地址。 | cloud-sso-sign-in-url |
| cloud-sso-access-config | 云SSO访问配置ID。 | cloud-sso-access-config |
| cloud-sso-account-id | 云SSO登录云账号UID。 | cloud-sso-account-id |
| oauth-site-type | OAuth登录站点类型。 | oauth-site-type |

**说明**

关联配置字段代表指定`profile`配置信息中的字段名。

**示例一** ：查看名为 `OAuthProfile` 的配置详情：

```bash
aliyun configure get --profile OAuthProfile
```

输出：

```json
{
    "name": "OAuthProfile",
    "mode": "OAuth",
    "access_key_id": "STS.9jYc5erFPDLrwNGWc7Sob2ZRHenhHfz7pw9*************",
    "access_key_secret": "3AcNFz37QykuHEwgzWramXGZaCrM1mDHpG1s7v******",
    "sts_token": "CAIS5gJ1q6Ft5DqyfSjI2KnsKI/Rn5lx846Zd******",
    "region_id": "cn-hangzhou",
    "output_format": "json",
    "language": "zh",
    "sts_expiration": 1776751437,
    "oauth_access_token": "eyJhbGciOiJSUzI1NiIsI*******",
    "oauth_refresh_token": "ALGuHPAmSWxR5ynSsoRXhWpUtsxXHcLpGLnZqVvVXZDkjcbMsMasoshv1MnyRhkTq******",
    "oauth_access_token_expire": 1776751436,
    "oauth_site_type": "CN"
}
```

**示例二** ：仅查看 `OAuthProfile` 的配置名称、凭证类型及默认语言：

```bash
aliyun configure get --profile OAuthProfile profile mode language
```

输出：

```text
profile=OAuthProfile
mode=OAuth
language=en
```

#### **凭证配置存储位置**

如需手动查看或备份凭证配置文件，可在以下路径找到：

| **操作系统** | **存储路径** |
| --- | --- |
| Linux / macOS | `\~/.aliyun/config.json` |
| Windows | `C:\\Users\\\<USER_NAME\>\\.aliyun\\config.json` |

### 切换配置

#### 永久切换激活配置

将指定配置切换为当前激活的配置。阿里云 CLI 自 `v3.0.214` 版本起支持 `aliyun configure switch` 命令。切换成功后，后续所有未显式指定凭证（使用`--profile`参数）的请求均自动使用该配置。

```bash
aliyun configure switch --profile <ProfileName>
```

**说明**

切换前，可使用 `aliyun configure list` 确认目标配置的名称。

**示例** ：切换到名为 `prod` 的配置：

```bash
aliyun configure switch --profile prod
```

切换完成后，运行 `aliyun configure list` 确认目标配置已标记 `*`。

#### 单次使用指定配置

在单条命令中通过 `--profile` 参数临时指定配置，不影响当前激活的配置。

**示例** ：使用 `prod` 配置查询 ECS 地域列表：

```bash
aliyun ecs describe-regions --profile prod
```

### 修改配置

使用 `aliyun configure set` 修改已有配置的参数值。只需指定要修改的参数，未指定的参数保持不变。

```bash
aliyun configure set --profile <ProfileName> --<ParameterName> <NewValue>
```

常用参数：

* `--region`：默认地域

* `--language`：输出语言（zh / en）

详细参数请参见各凭证类型文档。

**示例** ：修改 `default` 配置的默认地域：

```bash
aliyun configure set --profile default --region cn-shanghai
```

**说明**

执行修改后，该配置会自动成为当前激活的配置。

### 删除配置

运行以下命令删除指定配置：

```bash
aliyun configure delete --profile <ProfileName>
```

示例：删除名为 `dev` 的配置：

```bash
aliyun configure delete --profile dev
```

**重要**

删除操作不可恢复。删除当前激活配置后，配置列表中的第一个配置自动成为新的当前激活配置。

删除完成后，运行 `aliyun configure list` 命令确认该配置已从列表中移除。

## 常见问题
### 交互式配置时输错了怎么办？

使用 `aliyun configure set` 修改对应字段即可，无需重新完整配置。示例：

```bash
aliyun configure set --profile <ProfileName> --<ParameterName> <CorrectValue>
```

### 执行 CLI 命令时未使用当前激活配置

CLI 按以下优先级（从高到低）决定实际使用的配置，高优先级会覆盖低优先级：

* `--profile` 命令行参数：仅对当前命令生效，优先级最高。

* 环境变量 `ALIBABA_CLOUD_PROFILE`：对当前终端会话中的所有命令生效。

* 当前激活的默认配置：`aliyun configure list` 命令返回中带有`*`的配置，持久生效。

如果命令结果与预期不符，请检查是否设置了 `--profile` 参数或 `ALIBABA_CLOUD_PROFILE` 环境变量，它们会覆盖当前激活配置。运行 `echo $ALIBABA_CLOUD_PROFILE` 命令可查看环境变量是否已设置。

### 执行CLI命令时遇到报错`load current configuration failed unknown profile default`

**完整报错信息**：

```text
ERROR: load current configuration failed unknown profile default, run configure to check
```

**原因**：

删除了当前所有的凭证配置，导致阿里云CLI无法正常工作。

**解决方法**：

手动删除 `config.json` 文件，并执行 `aliyun configure` 命令重新配置凭证，配置文件所在位置可参见[凭证配置存储位置](#h2-storage)。例如，在 Linux / macOS 上可执行以下命令删除：

```bash
rm ~/.aliyun/config.json
```

## 相关文档
* [安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)

* [快速使用 CLI](https://help.aliyun.com/document_detail/2808429.html)
