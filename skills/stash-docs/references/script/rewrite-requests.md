# 改写 HTTP

用户可以通过 JavaScript 脚本修改流经 Stash 的 HTTP 请求、响应。

参数：

- `match`: 脚本匹配的 URL 正则表达式。
- `type`: 脚本类型，可选值为 `request` 或 `response`。
- `require-body`: 是否需要请求体 / 响应体，在脚本中处理 body 需要消耗更多的内存空间，仅在必要时启用。
- `timeout`: 脚本执行超时时间，单位为秒。
- `argument`: 脚本执行时的参数，类型为 `string`。
- `engine`：脚本引擎，可选 `auto`、`webkit` 或 `jsc`，默认为 `auto`。
- `binary-mode`：二进制模式，`body` 会以 `Uint8Array` 而不是 `string` 传递给脚本。<VersionRequirement ios="2.0.2" />
- `max-size`：单位为字节，body 超过这个大小的请求不会触发脚本。

## 脚本引擎

<VersionRequirement ios="3.6" mac="4.3" />

可以为每条请求或响应脚本选择 JavaScript 引擎：

```yaml
http:
  script:
    - name: your-script-name
      match: ^https://example\.com/
      type: response
      engine: auto
```

- `auto`：默认选项。iOS 和 macOS 优先使用 WebKit，tvOS 使用 JavaScriptCore。
- `webkit`：使用 WebKit，适合依赖 `fetch`、`crypto`、`TextEncoder` 等浏览器 Web API 的脚本。
- `jsc`：使用 JavaScriptCore，可在 iOS、tvOS 和 macOS 上运行仅依赖 Stash 脚本接口的脚本。

通常保留 `auto` 即可；只有脚本明确依赖某个执行环境时，才需要指定 `webkit` 或 `jsc`。

## Request Object

- `$request.url`：请求 URL
- `$request.method`：请求方法
- `$request.headers`：请求头
- `$request.body`：请求体，仅在 `require-body: true` 时有，根据是否开启二进制模式，可以为 `string` 或者 `Uint8Array`

## Response Object

- `$request.url`：请求 URL
- `$request.method`：请求方法
- `$request.headers`：请求头
- `$response.status`：响应状态码
- `$response.headers`：响应头
- `$response.body`：响应体，仅在 `require-body: true` 时有，根据是否开启二进制模式，可以为 `string` 或者 `Uint8Array`

## `$done(value)`

> [!WARNING]
> 对于所有脚本，在结束时候必须调用 `$done(value)` 方法释放资源。

对于 request 类型的脚本，调用 `$done(object)` 可以改写 HTTP 请求，`object` 可以包含下述字段：

- `url`：修改请求的 URL
- `headers`：修改请求的 headers
- `body`：修改请求的 body
- `response`：替换 HTTP 响应，不再实际发出 HTTP 请求

你可以调用 `$done()` 来打断请求，或者 `$done({})` 不修改请求的任何内容。

对于 response 类型的脚本，调用 `$done(object)` 可以改写 HTTP 响应，`object` 可以包含下述字段：

- `status`：修改响应的状态码
- `headers`：修改响应的 headers
- `body`：修改响应的 body

你可以调用 `$done()` 来打断请求，或者 `$done({})` 不修改响应的任何内容。
