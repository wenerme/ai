# Force HTTP Engine

By default, all requests routed through the HTTP Proxy will be handled by the HTTP Engine, allowing for features such as rewriting and scripting. If you wish for TCP connections originating from the tunnel to be handled by the HTTP Engine, you'll need to configure the `force-http-engine`.

```yaml
http:
  # Force the use of Stash engine to handle TCP connections using HTTP protocol
  # Captured connections can use advanced features such as rewriting and scripts
  force-http-engine:
    - '*:80'
    - '*:4480' # BiliBili CDN
    - '*:9102' # BiliBili CDN
```

> [!WARNING]
> Unresolvable requests will be rejected by the HTTP Engine with a Bad Request
> response.
