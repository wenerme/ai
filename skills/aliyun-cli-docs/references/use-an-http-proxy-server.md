本文介绍如何在阿里云 CLI 中配置代理服务器，以通过代理访问和管理云服务。

## **操作步骤**
阿里云 CLI 支持通过配置环境变量，使用代理服务器访问和管理云服务。配置信息如下表所示。配置方式请参见[在Linux、macOS和Windows系统配置环境变量](https://help.aliyun.com/document_detail/2766629.html)。

## 使用 HTTP 代理

| **变量名** | **变量值** |
| --- | --- |
| `http_proxy` | - 格式：`http://proxy_server_address:port` ; - 示例： - `http://192.168.1.2:1234` ; - `http://proxy.example.com:1234` ; |

## 使用 HTTPS 代理

| **变量名** | **变量值** |
| --- | --- |
| `HTTPS_PROXY` 或 `https_proxy` CLI 优先读取 `HTTPS_PROXY`，未设置时回退到 `https_proxy`。 | - 格式：`https://proxy_server_address:port` ; - 示例： - `https://192.168.1.2:5678` ; - `https://proxy.example.com:5678` ; |

## 跳过 TLS 证书验证
当企业代理使用自签名证书进行 TLS 中间人解密时，CLI 会报证书验证错误。可使用 `--skip-secure-verify` 跳过证书验证：

```shell
aliyun ecs describe-regions --skip-secure-verify
```

如需永久生效，可通过 `configure set` 写入配置：

```shell
aliyun configure set --skip-secure-verify
```

配置完成后，可执行任意 API 调用命令验证代理连通性。
**警告**

跳过 TLS 证书验证会降低通信安全性，仅建议在信任的内网环境中使用。在公网环境中使用此选项可能导致凭证泄露。
