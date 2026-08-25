---
description: "HTTP rewriting matches URLs with regular expressions to reject or redirect HTTP(S) requests — commonly used to block ads and privacy tracking."
---

# HTTP Rewrite

HTTP rewriting allows users to match URLs using regular expressions to reject or redirect HTTP(S) requests, commonly used to block ads, prevent privacy tracking, etc.

Configuration format:

```yaml
http:
  # HTTP(S) rewrite supporting various strategies such as header, 302, 307, reject
  url-rewrite:
    - ^http://g\.cn https://www.google.com transparent
    - ^https?://www\.google\.cn https://www.google.com 302 # Directly returns a 302 redirect response
    - ^https?://ad\.example - reject # Rejects the request
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

## URL Rewriting

### `transparent`

Intercepts and modifies the request URL, similar to a transparent proxy, with no awareness by the application, supporting redirecting HTTP / HTTPS.

### `302 / 307`

The HTTP engine returns a 3xx status code and automatically sets the Location field to achieve redirection.

### `reject`

Returns a 404 response with an empty response body.

### `reject-200`

Returns a 200 response with an empty response body.

### `reject-img`

Returns a 200 response with a 1px GIF response body.

### `reject-dict`

Returns a 200 response with a response body of `{}`.

### `reject-array`

Returns a 200 response with a response body of `[]`.

## HTTP Header Rewriting

Header rewriting allows users to add, delete, or replace any HTTP request/response header.

### `request-add` / `response-add`

Adds headers to the HTTP request/response.

### `request-del` / `response-del`

Deletes headers from the HTTP request/response.

### `request-replace` / `response-replace`

Replaces the value of a header in the HTTP request/response.

### `request-replace-regex` / `response-replace-regex`

Replaces the value of a header in the HTTP request/response using a regular expression.

## HTTP Body Rewrite

<VersionRequirement ios="2.8" mac="2.8" />

HTTP Body Rewrite matches requests using a URL regular expression and modifies the request or response body. Each rule consists of a URL regular expression, an action, and an expression:

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ request-replace-regex old new'
    - '^https://api\.example\.com/ response-jq del(.debug) | .name = "Stash"'
    - '^https://api\.example\.com/ response-json-replace data.name "Stash"'
    - '^https://api\.example\.com/ response-json-add meta.enabled true'
    - '^https://api\.example\.com/ response-json-del debug internal.trace'
```

Actions beginning with `request-` modify the request body, while actions beginning with `response-` modify the response body. Rules run in configuration order, so later rules can continue processing the body produced by earlier rules.

### Regular Expression Replacement

`request-replace-regex` and `response-replace-regex` use one or more `regular-expression replacement` pairs to replace UTF-8 text. Each regular expression replaces all matches, and the pairs run in the order written.

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ response-replace-regex old new disabled enabled'
```

This rule first replaces every `old` with `new`, then replaces every `disabled` with `enabled`.

### jq

`request-jq` and `response-jq` use the body as JSON input and generate a new JSON body with a jq expression. Expressions can combine assignment, deletion, filtering, and pipeline operations.

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ request-jq .client = "Stash"'
    - '^https://api\.example\.com/ response-jq del(.debug) | .items |= map(select(.enabled))'
```

### JSON Add, Delete, and Replace

The JSON actions are shortcuts for common jq operations. Paths omit the leading `.`, and can address array elements such as `items[0].name`. Values use jq/JSON literals and must be written as a single argument without spaces.

| Action                                           | Expression                    | Behavior                                                                                     |
| ------------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------- |
| `request-json-replace` / `response-json-replace` | `path value [path value ...]` | Replaces the value when the current path value is neither `false` nor `null`                 |
| `request-json-add` / `response-json-add`         | `path value [path value ...]` | Writes the value when the path is missing or `null`, preserving an existing non-`null` value |
| `request-json-del` / `response-json-del`         | `path [path ...]`             | Deletes the path when its current value is neither `false` nor `null`                        |

A single rule can process multiple paths in sequence. For example:

```yaml
http:
  body-rewrite:
    - '^https://api\.example\.com/ response-json-replace data.name "Stash" data.enabled true'
    - '^https://api\.example\.com/ response-json-add meta.source "proxy" meta.version 1'
    - '^https://api\.example\.com/ response-json-del debug internal.trace'
```

## Mock

The mock feature returns static responses directly. For dynamic responses, consider using the JavaScript engine for rewriting.

```yaml
http:
  mock:
    - match: ^https?://example.stash\.ws/json
      text: '{}'
      status-code: 200
      headers:
        Content-Type: application/json
    - match: ^https?://example.stash\.ws/base64
      base64: 'eyJ0ZXN0IjogdHJ1ZX0='
      status-code: 200
      headers:
        Content-Type: application/json
```

- `match`: Matched regular expression.
- `status-code`: HTTP status code to return, defaults to 200 if not specified.
- `headers`: HTTP response headers to return, no need to set `Content-Length`, as the engine will calculate it automatically.

Response content:

- `text`: Returned text content encoded in UTF-8.
- `base64`: Returned content as binary encoded in Base64.

## Using JavaScript Engine for Rewriting

If the above functionalities do not meet your needs, please refer to [Rewriting HTTP with JavaScript Engine](/script/rewrite-requests-en).
