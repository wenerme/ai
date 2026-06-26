当第三方 AI 应用程序通过 HTTP 协议与 OpenAPI MCP Server 通信时，若应用程序自身不具备处理阿里云认证的能力，可使用`aliyun mcp-proxy`作为本地认证代理。该代理可自动完成 OAuth 授权与 Token 管理，使应用程序无需处理凭证即可调用阿里云服务 API。

## aliyun mcp-proxy介绍
`aliyun mcp-proxy` 是阿里云 CLI 提供的 MCP Server 代理工具，用于简化第三方 AI 应用程序（例如 Dify、LangChain）与 OpenAPI MCP Server 的交互。首次启动时需手动完成 OAuth 授权，后续代理服务将自动处理 Token 刷新。

**工作原理：** 应用程序将 API 请求发送至 `aliyun mcp-proxy`。代理服务添加凭证后，将请求转发至 OpenAPI MCP Server。
**警告**

启动 aliyun mcp-proxy 后，本机所有用户均可通过代理端口，以启动代理的 CLI 用户身份访问其权限范围内的 MCP Server。为避免权限滥用，请确保在受信任的单用户环境中使用，并禁止代理端口对外暴露。建议通过 `--allowed-servers` 或 `--blocked-servers` 参数限制可访问的服务器范围，并为 MCP Server 配置最小必要权限。更多信息，请参见本文[安全风险与防护](#64b41a33faf87)。

## 配置并运行代理
### 步骤一：配置阿里云 CLI

1. 安装或升级阿里云 CLI，确保版本不低于 `3.2.0`。安装方法，请参见[安装CLI（Linux）](https://help.aliyun.com/document_detail/121541.html)。

2. 使用具备创建 OAuth 应用权限的阿里云账号或 RAM 用户凭据配置 CLI。也可在后续步骤中使用 `--oauth-app-name` 参数指定一个已创建的 OAuth 应用。

   ```bash
   aliyun configure
   # 根据提示输入AccessKey ID、AccessKey Secret和默认地域。
   ```

### 步骤二：首次运行代理并完成 OAuth 授权

首次运行 `mcp-proxy` 时，需完成一次性 OAuth 授权以获取刷新 Token 的权限。

1. 在前台启动。

   * 在有图形界面的环境中，不带`--no-browser`参数时，CLI 会自动拉起浏览器执行 OAuth 授权登录流程，完成授权后无需手动输入code。完成后您可直接跳至第5步。

     ```bash
     aliyun mcp-proxy --host 127.0.0.1 --port 8088
     ```

   * 在无图形界面的服务器环境中操作时，请添加`--no-browser`参数，后续将引导您获取code。

     ```bash
     aliyun mcp-proxy --host 127.0.0.1 --port 8088 --no-browser
     ```

   **说明**

   您可以使用 `--oauth-app-name` 参数指定自定义 OAuth 应用，该应用必须满足以下条件：
   * **Oauth范围（Scope）** ：必须为 `/acs/mcp-server`。

   * **回调地址（Redirect URI）** ：必须与 `aliyun mcp-proxy` 认证时使用的回调地址一致。

   * **应用类型** ：必须为`Native`类型的应用。

     ![image](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/7422918671/p1042792.png)
2. 终端将输出授权 URL。

   ```bash
   Setting up MCPOAuth profile 'default-mcp'...
   Opening browser for OAuth login...
   URL: https://signin.aliyun.com/oauth2/v1/auth?client_id=XXX8&response_type=code&scope=%2Facs%2Fmcp-server&redirect_uri=http://0.0.0.0:8088/callback&code_challenge=XXX&code_challenge_method=S256

   Please open the authorization URL on a machine with a browser and complete the sign-in.

   After authorization, the browser will redirect to a callback URL.
   Even if the page fails to load (connection error), the authorization code is in the URL.
   Please copy the value of the `code` parameter from the browser's address bar.

   Example: If the URL is:
     http://127.0.0.1:8088/callback?code=abc123xyz&state=...
     Then copy only: abc123xyz

   Enter authorization code: <YOUR CODE>
   ```

3. 在浏览器中打开该 URL，登录并完成授权。

4. 授权成功后，页面会跳转至包含 `code` 参数的地址或直接显示授权码。将 `code` 值复制并粘贴至终端，按回车键确认。

5. 当终端显示 `OAuth login successful!`信息时，表示授权登录成功。

   ```bash
   2025/12/04 19:11:49 Oauth authorization successfully, code received: XXXX
   2025/12/04 19:11:49 Start to exchange code for token with PKCE
   2025/12/04 19:11:49 Exchange code for token with PKCE successfully
   OAuth login successful!
   ```

6. 当终端显示 `MCP Proxy Server Started`信息时，表示代理启动成功。

   ```bash
   MCP Profile 'default-mcp' configured for oauth app 'aliyun-cli-mcp-proxy' successfully!

   MCP Proxy Server Started
   Listen: 127.0.0.1:8088
   ```

### 步骤三：配置为 systemd 后台服务（以CentOS为例）

为确保代理稳定运行，建议将其配置为开机自启的 systemd 服务。

1. 创建 `systemd` 服务文件：aliyun-mcp-proxy。

   **说明**：
   * 将命令中的 `your-user` 替换为实际运行此命令的非 `root` 用户名。该用户必须是已通过 `aliyun configure` 配置凭据的用户。

   * `ExecStart` 中的 `$(which aliyun)` 可自动定位 `aliyun` 命令路径。如果定位失败，可手动将其替换为 `which aliyun` 命令的输出结果（例如 `/usr/local/bin/aliyun`）。

   ```bash
   sudo tee /etc/systemd/system/aliyun-mcp-proxy.service << 'EOF'
   [Unit]
   Description=Aliyun CLI MCP Proxy
   After=network.target

   [Service]
   Type=simple
   User=your-user
   ExecStart=$(which aliyun) mcp-proxy --host 127.0.0.1 --port 8088 --no-browser
   Restart=always
   RestartSec=10
   Environment=HOME=/home/your-user

   [Install]
   WantedBy=multi-user.target
   EOF
   ```

2. 重新加载 `systemd` 配置并启动服务。

   ```bash
   # 重新加载配置
   sudo systemctl daemon-reload
   # 启动服务
   sudo systemctl start aliyun-mcp-proxy
   # 设置开机自启
   sudo systemctl enable aliyun-mcp-proxy
   ```

### 步骤四：验证代理服务

通过以下任一方式验证服务是否正常运行。

* **查看服务状态**

  执行以下命令查看服务状态。

  ```bash
  sudo systemctl status aliyun-mcp-proxy
  ```

  若输出中包含 `active (running)`，则表示服务已成功启动。
* **请求代理端口**

  执行以下命令，直接请求代理端口。

  ```bash
  curl http://127.0.0.1:8088/
  ```

  如果代理工作正常，将收到来自 MCP Server 的 XML 格式错误响应，表明代理与服务之间的链路已连通。

  ```xml
  <?xml version='1.0' encoding='UTF-8'?><Error><RequestId>B3311876-XXXXX</RequestId><HostId>openapi-mcp.cn-hangzhou.aliyuncs.com</HostId><Code>InvalidAction.NotFound</Code><Message>Specified api is not found, please check your url and method.</Message><Recommend><![CDATA[https://api.aliyun.com/troubleshoot?q=InvalidAction.NotFound&product=OpenAPIExplorer&requestId=B3311876-XXX]]></Recommend></Error>
  ```

## 应用案例：在 Dify 中集成
以在同一台 ECS 上通过 Docker Compose 部署的 Dify 为例，介绍如何在应用中配置并使用 `mcp-proxy` 代理。

### 步骤一：获取宿主机 Docker 网桥IP并启动mcp-proxy代理服务

Dify 容器需通过宿主机的 Docker 网桥 IP 地址访问 `mcp-proxy` 服务。

1. 执行以下命令，获取并记录该 IP 地址。

   ```bash
   ip addr show docker0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
   ```

   执行后会得到类似 `172.17.0.1` 的 IP 地址。
2. 在前台启动 aliyun mcp-proxy 代理服务。或者，在 `systemd` 中修改启动命令然后通过服务启动。

   ```bash
   aliyun mcp-proxy --host 172.17.0.1 --port 8088 --no-browser
   ```

### 步骤二：在 Dify 中配置 MCP Server

1. 进入 Dify 的 **工具** \> **MCP** 配置页面。

2. 点击 **添加 MCP 服务（HTTP）**。

3. 在 **服务端点 URL** 字段中，填入您的 MCP 代理地址。

   您可在 阿里云 [OpenAPI MCP 服务](https://api.aliyun.com/mcp/servers)控制台中获取原始的**Streamable HTTP Endpoint**地址。并将该地址中的域名部分（host）替换为本地或内网代理地址。

   **示例转换**：
   * **原始 Endpoint：**
     `https://openapi-mcp.cn-hangzhou.aliyuncs.com/accounts/1234/custom/cli-proxy-test/id/1234/mcp`

   * **替换为代理地址** （假设代理运行在 `172.17.0.1:8088`）：
     `http://172.17.0.1:8088/accounts/1234/custom/cli-proxy-test/id/1234/mcp`

4. 按需填入其他信息后点击**添加并授权**。Dify 将通过该代理地址与您的 MCP 服务通信。

## 安全风险与防护
启动 mcp-proxy 后，本机所有用户均可通过代理端口，以启动代理的 CLI 用户身份访问其权限范围内的所有 MCP Server。主要风险包括：

* **内部权限滥用**：同一机器上的其他用户可利用代理端口执行越权操作，导致权限滥用或数据泄露。

* **外部暴露风险** ：代理端口监听在 `0.0.0.0` 且未配置防火墙时，任何人均可通过该端口访问 MCP Server。

**说明**

MCP Proxy 使用 CLI 登录用户的阿里云身份代理请求，请务必合理配置 MCP Proxy 的访问权限。

### 防护措施

* **环境隔离**：仅在受信任的单用户环境中运行代理，避免在多用户共享服务器上使用。

* **网络访问控制** ：将代理监听地址（`--host`）绑定到 `127.0.0.1`（默认）或特定内网 IP。使用防火墙或安全组规则限制代理端口访问范围（例如仅允许特定应用服务器 IP 访问），严禁对公网暴露。

* **访问控制** ：通过 `--allowed-servers` 或 `--blocked-servers` 参数限制可访问的 MCP Server 范围，避免代理被用于访问非预期的服务。配置方法详见本文[配置服务器访问控制](#38aa0dd596825)。

* **最小权限原则**：为代理使用的 CLI 用户及其关联的 MCP Server 配置最小必要权限，优先授予只读权限。

* **审计与监控**：定期审查代理服务的访问日志，监控异常请求。被访问控制拦截的请求会记录在代理日志中。

### 配置服务器访问控制

`aliyun mcp-proxy` 支持白名单和黑名单机制，限制可通过代理访问的 MCP Server 范围。

#### 优先级规则

访问控制按以下顺序判定：

1. **黑名单优先**：命中黑名单的请求直接拒绝，即使同时存在于白名单中。

2. **白名单过滤**：白名单非空时，仅放行白名单中的服务器。

3. **默认放行**：未配置任何名单时，允许所有服务器访问。

#### 获取服务器名称和服务器ID

启动 `aliyun mcp-proxy` 后，终端会列出所有可用的 MCP Server 名称。示例输出：

```bash
Available Servers:
  - cloudphone
    MCP: http://127.0.0.1:8088/accounts/0000000000000000/system/eds-aic/cloudphone/id/XSkb9v4dXx000000/mcp
    SSE: http://127.0.0.1:8088/accounts/0000000000000000/system/eds-aic/cloudphone/id/XSkb9v4dXx000000/sse
  - multi_account
    MCP: http://127.0.0.1:8088/accounts/0000000000000000/custom/multi_account/id/OV0Qkpxh0Uodx000/mcp
    SSE: http://127.0.0.1:8088/accounts/0000000000000000/custom/multi_account/id/OV0Qkpxh0Uodx000/sse
```

* 输出中的 `cloudphone`、`multi_account` 就是服务器`name`（通常位于`id`关键字前）。

* 输出中的`XSkb9v4dXx000000`、`OV0Qkpxh0Uodx000`就是服务器`id`（通常位于`mcp`关键字前）。

URL 路径通常满足以下规则：

```bash
......./system/eds-aic/$server_name/id/$server_id/mcp
......./custom/$server_name/id/$server_id/mcp
```

#### 匹配模式

`--allowed-servers` 和 `--blocked-servers` 支持三种匹配模式，通过值的格式自动识别：

| **匹配模式** | **格式** | **示例** | **说明** |
| --- | --- | --- | --- |
| 服务器名称匹配 | 不以 `/` 开头的字符串 | `cloudcontrol` | 精确匹配服务器的 `name` 字段 |
| 服务器 ID 匹配 | 不以 `/` 开头的字符串 | `OV0Qkpxh0Uodx000` | 精确匹配服务器的 `id` 字段 |
| 路径前缀匹配 | 以 `/` 开头的字符串 | `/acs/mcp-server/ecs` | 匹配请求 URL 的路径前缀 |

**说明**

* 服务器名称和 ID 为精确匹配。

* 路径前缀匹配使用前缀比较，例如 `/acs/mcp-server/ecs` 同时匹配 `/acs/mcp-server/ecs/mcp` 和 `/acs/mcp-server/ecs/sse`。

* 三种模式可在同一参数中混合使用。

#### 配置示例

* **白名单模式：仅允许访问指定服务器**

  ```text
  aliyun mcp-proxy --allowed-servers "ecs,oss"
  ```

  启动后仅 `ecs` 和 `oss` 可访问，其他服务器的请求返回 403 错误。
* **黑名单模式：禁止访问指定服务器**

  ```bash
  aliyun mcp-proxy --blocked-servers "ram"
  ```

  启动后除 `ram` 外的所有服务器均可访问。
* **使用路径前缀匹配**

  ```bash
  aliyun mcp-proxy --allowed-servers "/acs/mcp-server/ecs,/acs/mcp-server/oss"
  ```

  效果与按名称指定相同，适用于需要精确控制路径的场景。

#### 验证访问控制配置

启动代理后，终端输出会显示当前的访问控制配置和各服务器的状态：

```zsh
MCP Proxy Server Started
Listen: 127.0.0.1:8088
Region: CN

Access Control:
  Blacklist (blocked servers):
    - ram
  Whitelist (allowed servers):
    - ecs
    - oss

Available Servers:
  - ecs
    MCP: http://127.0.0.1:8088/acs/mcp-server/ecs/mcp
  - oss
    MCP: http://127.0.0.1:8088/acs/mcp-server/oss/mcp
  - ram (blocked)
```

被拦截的请求会在代理日志中记录，便于排查问题。

### 安全事件处理

如果怀疑代理认证 Token 泄露或被滥用，立即执行以下操作：

* 停止 MCP Proxy 服务。

* 删除本地配置文件：`rm ~/.aliyun/.mcpproxy_config`。

* 在阿里云控制台撤销 OAuth 授权。

* 检查 API 调用日志，确认是否存在异常操作。

* 重新配置 MCP Proxy 并生成新的 Token。

## 参数说明
`aliyun mcp-proxy` 命令支持通过不同参数以适应特定场景。

| **参数** | **描述** | **默认值** |
| --- | --- | --- |
| `--host` | 代理监听的主机地址。用户可以根据使用场景管理。 | `127.0.0.1` |
| `--port` | 代理监听的端口。 | `8088` |
| `--no-browser` | 在无图形界面的环境中进行 OAuth 认证时使用。启用后，认证链接将直接打印在终端。 | 未启用 |
| `--oauth-app-name` | 指定已存在的 OAuth 应用名称。使用此参数时，CLI 不会尝试自动创建应用。 | `aliyun-cli-mcp-proxy` |
| `--region-type` | 选择 OpenAPI MCP Server 的服务站点。`CN` 表示中国站，`INTL` 表示国际站。 | `CN` |
| `--upstream-url` | 手动指定上游 OpenAPI MCP Server 的地址，以覆盖默认地址。 | 中国站：`https://openapi-mcp.cn-hangzhou.aliyuncs.com` 国际站：`https://openapi-mcp.ap-southeast-1.aliyuncs.com` |
| `--allowed-servers` | 允许访问的 MCP Server 白名单，多个值用英文逗号分隔。支持服务器名称、ID 或路径前缀。未指定时允许所有服务器。详见本文[配置服务器访问控制](#38aa0dd596825)。 | 未启用 |
| `--blocked-servers` | 禁止访问的 MCP Server 黑名单，多个值用英文逗号分隔。支持服务器名称、ID 或路径前缀。黑名单优先级高于白名单。详见本文[配置服务器访问控制](#38aa0dd596825)。 | 未启用 |

## 常见问题
### 执行aliyun mcp-proxy进行 OAuth 认证后，出现 "ERROR: OAuth flow returned empty RefreshToken" 错误且代理启动失败，是什么原因？

此问题通常是由于 OAuth 应用类型或认证身份不正确导致。请确保：

* 使用的 OAuth 应用类型为 Native 类型。

* 使用主账号或 RAM 用户进行认证，RAM 角色扮演不支持获取OAuth Refresh Token。

### 在 Dify 中配置后，提示"Connection Refused"或"Timeout"？

请检查以下配置：

1. `mcp-proxy` 服务启动时，`--host` 参数是否已配置为 Docker 网桥 IP 或宿主机内网 IP，以确保 Docker 容器可以访问。

2. 云服务器安全组或宿主机防火墙是否已放行从 Docker 容器到代理端口（例如 `8088`）的 TCP 流量。

### 如何查看mcp-proxy服务的运行日志？

若已配置为`systemd`服务，可使用以下命令实时查看日志：

```bash
sudo journalctl -u aliyun-mcp-proxy -f
```
