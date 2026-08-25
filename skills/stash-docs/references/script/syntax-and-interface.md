---
description: "Stash 脚本的语法与可用接口说明，包括所有脚本结束时必须调用的 $done(value) 方法。"
---

# 语法与接口

## 基础方法

- `$script.name`：脚本名称
- `$script.type`：脚本类型，如 `request`, `response` 和 `tile`
- `$script.startTime`：脚本开始运行的时间
- `$environment["stash-build"]`：Stash Build 编号
- `$environment["stash-version"]`：Stash 版本号
- `$environment.language`：Stash 运行语言
- `$environment.system`：Stash 运行系统 (iOS / macOS)
- `$argument`：运行参数
- `$done(value)`：结束脚本运行，释放资源
- `$notification.post(title, subtitle, body)`：发送 iOS 通知
- `console.log(value)`：输出日志，脚本日志会输出到单独的文件
- `setTimeout(callback, delay)`：延迟执行回调函数

## `$done(value)`

> [!WARNING]
> 对于所有脚本，在结束时候必须调用 `$done(value)` 方法释放资源。

## 持久化存储

- `$persistentStore.write(value, key)`：写入持久化存储
- `$persistentStore.read(key)`：读取持久化存储

## HTTP Client

- `$httpClient.get(url<String>, callback<Function>)`
- `$httpClient.get(request<Object>, callback<Function>)`

同样地，还有：

- `$httpClient.post()`
- `$httpClient.put()`
- `$httpClient.delete()`
- `$httpClient.head()`
- `$httpClient.options()`
- `$httpClient.patch()`

请求的超时为 5 秒，可以通过设置 `X-Stash-Selected-Proxy` 指定请求的使用的代理，或设置 `binary-mode` 开启二进制模式，例如：

```javascript {9,16,21}
$httpClient.get('http://httpbin.org/get', (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }
})

const yourProxyName = 'a fancy name with 😄'

$httpClient.post(
  {
    url: 'http://httpbin.org/post',
    headers: {
      'X-Header-Key': 'headerValue',
      'X-Stash-Selected-Proxy': encodeURIComponent(yourProxyName),
    },
    body: '{}', // can be object or string
    timeout: 5,
    insecure: false,
    'binary-mode': true,
    'auto-cookie': true,
    'auto-redirect': true,
  },
  (error, response, data) => {
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }
)
```
