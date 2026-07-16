# Syntax and Interface

## Basic Methods

- `$script.name`: Script name
- `$script.type`: Script type, such as `request`, `response` and `tile`
- `$script.startTime`: The time when the script starts running
- `$environment["stash-build"]`: Stash Build number
- `$environment["stash-version"]`: Stash version number
- `$environment.language`: Stash running language
- `$environment.system`: Stash running system (iOS / macOS)
- `$argument`: Running parameters
- `$done(value)`: End the script run and release resources
- `$notification.post(title, subtitle, body)`: Send iOS notification
- `console.log(value)`: Output log, script log will be output to a separate file
- `setTimeout(callback, delay)`: Delay execution of callback function

## `$done(value)`

> [!WARNING]
> For all scripts, you must call the `$done(value)` method to release resources at the end.

## Persistent Storage

- `$persistentStore.write(value, key)`: Write to persistent storage
- `$persistentStore.read(key)`: Read from persistent storage

## HTTP Client

- `$httpClient.get(url<String>, callback<Function>)`
- `$httpClient.get(request<Object>, callback<Function>)`

Similarly, there are:

- `$httpClient.post()`
- `$httpClient.put()`
- `$httpClient.delete()`
- `$httpClient.head()`
- `$httpClient.options()`
- `$httpClient.patch()`

The request timeout is 5 seconds. You can specify the proxy used for the request by setting `X-Stash-Selected-Proxy`, or enable binary mode by setting `binary-mode`, for example:

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
