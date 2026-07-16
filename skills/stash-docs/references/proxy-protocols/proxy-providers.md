# 远程代理集

在配置文件直接声明的代理，无法在后台自动更新。我们更推荐使用远程代理集（proxy-provider），能在后台自动从 URL 更新策略组。

要使用远程代理集，需要在 `proxy-providers` 下定义，并在 `proxy-groups` 中引用。

```yaml
proxy-providers:
  provider-a:
    url: https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
    interval: 3600
    filter: 'example'

  provider-b:
    url: https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
    interval: 3600

proxy-groups:
  - name: auto
    type: url-test
    interval: 300
    use:
      - provider-a # reference to provider-a
      - provider-b # reference to provider-b
```

如果远程代理集需要鉴权，或服务端要求特定的 `Accept`、`User-Agent` 等请求头，可以在 proxy provider 中配置 `headers`。该配置会在 Stash 更新远程代理集时随请求发送。

```yaml
proxy-providers:
  provider-a:
    url: https://example.com/provider.yaml
    interval: 3600
    headers:
      Authorization: Bearer your-token
      Accept: application/yaml
      User-Agent: Stash
```

`headers` 中的值可以是单个字符串，也可以是字符串数组，用于发送同名多值请求头：

```yaml
proxy-providers:
  provider-a:
    url: https://example.com/provider.yaml
    interval: 3600
    headers:
      Accept:
        - application/yaml
        - text/plain
```

如果 URL 中已经包含用户名和密码，例如 `https://user:password@example.com/provider.yaml`，Stash 会优先使用 URL 中的信息生成 Basic Auth，此时它会覆盖 `headers` 中配置的 `Authorization`。

为便于管理本地缓存，你可以用 `path` 指定远程代理集的缓存路径。例如：

```yaml
proxy-providers:
  provider-a:
    url: https://example.com/provider.yaml
    path: ./providers/provider-a.yaml
    interval: 3600
```

Stash 启动时会优先读取 `path` 对应的本地缓存；如果本地缓存不存在或无法解析，后续会从 `url` 下载远程代理集并写入该路径。远程更新成功后，也会覆盖该本地缓存。

> [!WARNING]
> 为避免路径越权，Stash 会将 `path` 限制在 Stash 管理的资源目录内。

你也可以仅声明 `path`，不填写 `url`，这样代理集会作为本地静态 provider 使用，不会进行定时更新。例如：

```yaml
proxy-providers:
  local-provider:
    path: ./providers/local.yaml
```

一个合法的远程代理集必须包含 `proxies` 字段：

```yaml
proxies:
  - name: 'ss1'
    type: ss
    server: server
    port: 443
    cipher: AEAD_CHACHA20_POLY1305
    password: 'password'
  - name: 'ss2'
    type: ss
    server: server
    port: 443
    cipher: AEAD_CHACHA20_POLY1305
    password: 'password'
```

远程代理集支持通过 `filter` 字段，使用正则表达式过滤代理名。远程代理集为空时候，会以 `DIRECT` 替代。

### 快捷引用远程代理集

Stash 也支持通过 `use-url` 在策略组中快捷引用远程代理集，此时不可指定更新时间和名称。

```yaml
proxy-groups:
  - name: auto
    type: url-test
    interval: 300
    use-url:
      - https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
```
