# HTTP 重写

HTTP 重写允许用户通过正则表达式匹配 URL，拒绝或者重定向 HTTP(S) 请求，常用于去广告，避免隐私跟踪等目的。

配置格式：

```yaml
http:
  # HTTP(S) 重写，支持header、302、307、reject多种策略
  url-rewrite:
    - ^http://g\.cn https://www.google.com transparent
    - ^https?://www\.google\.cn https://www.google.com 302 # 直接返回一个 302 重定向的响应
    - ^https?://ad\.example - reject # 拒绝请求
  header-rewrite:
    - ^http://g\.cn request-add DNT 1
    - ^http://g\.cn request-del DNT
    - ^http://g\.cn request-replace DNT 1
    - ^http://g\.cn request-replace-regex User-Agent Go-http-client curl

    - ^http://g\.cn response-add DNT 1
    - ^http://g\.cn response-del DNT
    - ^http://g\.cn response-replace DNT 1
    - ^http://g\.cn response-replace-regex User-Agent Go-http-client curl
  mock:
    - match: ^https?://ad\.example
      status-code: 503
```

## URL 重写

### `transparent`

拦截并修改请求的 URL，效果类似透明代理，应用对此无感知，支持重定向 HTTP / HTTPS。

### `302 / 307`

HTTP 引擎会返回一个 3xx 状态码，并且会自动设置 Location 字段，以达到重定向的目的。

### `reject`

返回 404 响应，和空的响应 body。

### `reject-200`

返回 200 响应，和空的响应 body。

### `reject-img`

返回 200 响应，和 1px gif 的响应 body。

### `reject-dict`

返回 200 响应，和内容为 `{}` 的响应 body。

### `reject-array`

返回 200 响应，和内容为 `[]` 的响应 body。

## HTTP header 重写

header 重写允许用户增加、删除、替换 HTTP 请求 / 响应的任意 header。

### `request-add` / `response-add`

对 HTTP 请求 / 响应新增 header。

### `request-del` / `response-del`

对 HTTP 请求 / 响应删除 header。

### `request-replace` / `response-replace`

对 HTTP 请求 / 响应替换 header 的值。

### `request-replace-regex` / `response-replace-regex`

对 HTTP 请求 / 响应通过正则表达式替换 header 的值。

## Mock

Mock 功能直接返回静态响应。如果想动态返回响应，请尝试使用 JavaScript 引擎重写。

```yaml
http:
  mock:
    - match: ^https?://example.stash\.ws/json
      text: '{}'
      status-code: 200
      headers:
        Content-Type: application/json
    - match: ^https?://example.stash\.ws/base64
      base64: 'CgVUZXJyeRAeGHRlcnJ5QGV4YW1wbGUuY29t'
      status-code: 200
      headers:
        Content-Type: application/x-protobuf
```

- `match`: 匹配的正则表达式。
- `status-code`: 返回的 HTTP 状态码，不填默认为 200。
- `headers`: 返回的 HTTP 响应头，不需要额外设置 `Content-Length`，引擎会自动计算。

响应内容：

- `text`: 返回的文本内容，以 UTF-8 编码。
- `base64`: 返回的内容为二进制，以 Base64 编码。

## 使用 JavaScript 引擎重写

如果上述功能无法满足需求，请参考[使用 JavaScript 引擎重写 HTTP](/script/rewrite-requests)。
