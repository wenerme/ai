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
  body-rewrite:
    - '^https://api\.example\.com/ response-jq del(.debug) | .name = "Stash"'
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

## HTTP Body Rewrite

<VersionRequirement ios="2.8" mac="2.8" />

HTTP Body Rewrite 根据 URL 正则表达式匹配请求，并修改请求正文或响应正文。每条规则依次由 URL 正则表达式、动作和表达式组成：

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ request-replace-regex old new'
    - '^https://api\.example\.com/ response-jq del(.debug) | .name = "Stash"'
    - '^https://api\.example\.com/ response-json-replace data.name "Stash"'
    - '^https://api\.example\.com/ response-json-add meta.enabled true'
    - '^https://api\.example\.com/ response-json-del debug internal.trace'
```

动作以 `request-` 开头时修改请求正文，以 `response-` 开头时修改响应正文。规则按照配置顺序执行，后面的规则可以继续处理前面规则产生的正文。

### 正则替换

`request-replace-regex` 和 `response-replace-regex` 使用一组或多组 `正则表达式 替换内容` 参数替换 UTF-8 文本。每组正则表达式会全局匹配，并按照书写顺序执行。

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ response-replace-regex old new disabled enabled'
```

以上规则先将所有 `old` 替换为 `new`，再将所有 `disabled` 替换为 `enabled`。

### jq

`request-jq` 和 `response-jq` 将正文作为 JSON 输入，并使用 jq 表达式生成新的 JSON 正文。可以组合 jq 的赋值、删除、筛选和管道操作。

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ request-jq .client = "Stash"'
    - '^https://api\.example\.com/ response-jq del(.debug) | .items |= map(select(.enabled))'
```

### JSON 增删改

JSON 动作提供常用 jq 操作的简写。路径不需要以 `.` 开头，可以使用 `items[0].name` 访问数组元素。值使用 jq / JSON 字面量，并写成不含空格的单个参数。

| 动作                                             | 表达式格式              | 行为                                                   |
| ------------------------------------------------ | ----------------------- | ------------------------------------------------------ |
| `request-json-replace` / `response-json-replace` | `路径 值 [路径 值 ...]` | 当路径当前值不是 `false` 或 `null` 时替换该值          |
| `request-json-add` / `response-json-add`         | `路径 值 [路径 值 ...]` | 当路径缺失或值为 `null` 时写入，保留已有的非 `null` 值 |
| `request-json-del` / `response-json-del`         | `路径 [路径 ...]`       | 当路径当前值不是 `false` 或 `null` 时删除该路径        |

同一条规则可以依次处理多个路径。例如：

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ response-json-replace data.name "Stash" data.enabled true'
    - '^https://api\.example\.com/ response-json-add meta.source "proxy" meta.version 1'
    - '^https://api\.example\.com/ response-json-del debug internal.trace'
```

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
