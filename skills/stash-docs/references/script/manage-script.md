# 管理脚本

与远程代理集和规则集合类似，脚本需要通过 `script-providers` 管理。声明后即可在改写、面板和定时任务中引用。

最简单的例子是：

```yaml
script-providers:
  your-fancy-script:
    url: https://your-fancy-script.com/your-fancy-script.js
    interval: 86400
```

如果远程脚本需要鉴权，或服务端要求特定的 `Accept`、`User-Agent` 等请求头，可以在 script provider 中配置 `headers`。该配置会在 Stash 更新远程脚本时随请求发送。

```yaml
script-providers:
  your-fancy-script:
    url: https://example.com/your-fancy-script.js
    interval: 86400
    headers:
      Authorization: Bearer your-token
      Accept: application/javascript
      User-Agent: Stash
```

`headers` 中的值可以是单个字符串，也可以是字符串数组，用于发送同名多值请求头：

```yaml
script-providers:
  your-fancy-script:
    url: https://example.com/your-fancy-script.js
    interval: 86400
    headers:
      Accept:
        - application/javascript
        - text/plain
```

如果 URL 中已经包含用户名和密码，例如 `https://user:password@example.com/your-fancy-script.js`，Stash 会优先使用 URL 中的信息生成 Basic Auth，此时它会覆盖 `headers` 中配置的 `Authorization`。

Stash 会根据 `interval` 定期从指定 URL 下载脚本并缓存到磁盘。下载时会遵循 `Etag` 与 `Last-Modified` 头判断是否更新，避免不必要的请求。

---

> [!NOTE]
> 下述功能仅在 Stash 3.2.5 及更高版本中生效。

为了临时调试与测试，你可以使用 `payload` 字段将脚本直接写入配置文件。例如：

```yaml
script-providers:
  your-fancy-script:
    interval: 86400
    payload: |
      console.log("This is a test script");
      $done();
```

当 `url` 与 `payload` 同时存在时，Stash 启动时会将 `payload` 写入本地缓存，后续更新会尝试从 `url` 下载脚本并覆盖缓存。

> [!WARNING]
> 不建议使用 `payload` 编写复杂脚本，这会显著降低 Stash 的配置解析效率。

为便于管理本地缓存，你可以用 `path` 指定缓存路径。例如：

```yaml
script-providers:
  your-fancy-script:
    url: https://your-fancy-script.com/your-fancy-script.js
    path: ./fancy/script.js
    interval: 86400
    payload: |
      console.log("This is a test script");
      $done();
```

Stash 启动时会检查 `./fancy/script.js` 是否存在；若存在则直接使用，否则写入 `payload`。后续更新会从 `url` 下载脚本并覆盖本地缓存。

> [!WARNING]
> 为避免路径越权，Stash 会将 `path` 限制在配置文件所在目录及其子目录内。

---

你可以仅声明 `script-providers` 并使用 `path`，不填写 `url`，这样脚本不会进行定时更新。例如：

```yaml
script-providers:
  local-debug-script:
    path: ./fancy/script.js
```

开启 iCloud 后，可在 Mac 上直接修改该脚本文件，iCloud 会同步到 iPhone。同步完成后脚本会实时生效，这种方式非常适合本地调试脚本。
