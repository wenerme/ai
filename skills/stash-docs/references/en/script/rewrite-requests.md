# Rewrite HTTP

Users can modify the HTTP requests and responses flowing through Stash via JavaScript scripts.

Parameters:

- `match`: The URL regular expression that the script matches.
- `type`: The type of script, optional values are `request` or `response`.
- `require-body`: Whether the request body / response body is needed, processing the body in the script requires more memory space, enable only when necessary.
- `timeout`: The script execution timeout, in seconds.
- `argument`: The argument when the script is executed, type is `string`.
- `engine`: The script engine. Available values are `auto`, `webkit`, and `jsc`. The default is `auto`.
- `binary-mode`: Binary mode, `body` will be passed to the script as `Uint8Array` instead of `string`.<VersionRequirement ios="2.0.2" />
- `max-size`: In bytes, requests with a body size exceeding this will not trigger the script.

## Script Engine

<VersionRequirement ios="3.6" mac="4.3" />

You can select a JavaScript engine for each request or response script:

```yaml
http:
  script:
    - name: your-script-name
      match: ^https://example\.com/
      type: response
      engine: auto
```

- `auto`: The default. It prefers WebKit on iOS and macOS and uses JavaScriptCore on tvOS.
- `webkit`: Uses WebKit. Choose it for scripts that depend on browser Web APIs such as `fetch`, `crypto`, or `TextEncoder`.
- `jsc`: Uses JavaScriptCore. It runs scripts that rely only on the Stash scripting APIs on iOS, tvOS, and macOS.

Keep `auto` for most scripts. Specify `webkit` or `jsc` only when a script depends on a particular runtime environment.

## Request Object

- `$request.url`: Request URL
- `$request.method`: Request method
- `$request.headers`: Request headers
- `$request.body`: Request body, only available when `require-body: true`, can be `string` or `Uint8Array` depending on whether binary mode is enabled.

## Response Object

- `$request.url`: Request URL
- `$request.method`: Request method
- `$request.headers`: Request headers
- `$response.status`: Response status code
- `$response.headers`: Response headers
- `$response.body`: Response body, only available when `require-body: true`, can be `string` or `Uint8Array` depending on whether binary mode is enabled.

## `$done(value)`

> [!WARNING]
> For all scripts, you must call the `$done(value)` method to release resources
> at the end.

For scripts of the request type, calling `$done(object)` can rewrite the HTTP request, `object` can include the following fields:

- `url`: Modify the request URL
- `headers`: Modify the request headers
- `body`: Modify the request body
- `response`: Replace the HTTP response, no longer actually send the HTTP request

You can call `$done()` to interrupt the request, or `$done({})` to not modify any content of the request.

For scripts of the response type, calling `$done(object)` can rewrite the HTTP response, `object` can include the following fields:

- `status`: Modify the response status code
- `headers`: Modify the response headers
- `body`: Modify the response body

You can call `$done()` to interrupt the request, or `$done({})` to not modify any content of the response.
