---
description: "Set latency test parameters per proxy, including the target URL used for the test and its timeout."
---

# Delayed Testing

In Stash, you can specify separate delay testing parameters for each proxy, including the target URL for delay testing and the timeout for the test.

Proxies that time out during delay testing will be marked as unhealthy.

```yaml {6-7}
proxies:
  - name: your-proxy
    type: ss
    server: server
    port: 443
    benchmark-url: http://www.apple.com # It is recommended to use only HTTP protocol
    benchmark-timeout: 5 # Delay test timeout, in seconds
```

> [!NOTE]
> If a proxy is referenced by multiple policy groups, the delay testing results for this proxy will be shared among the policy groups.
>
> If you want a proxy to use different delay testing parameters in different policy groups, manually create multiple proxies.

## Delay Testing Methods

Stash supports multiple methods for delay testing proxies, including:

- `ICMP`: Uses ICMP packets for delay testing
- `TCP`: Uses TCP handshake for delay testing
- `HTTP HEAD`: Default method, sends an HTTP HEAD through the proxy for delay testing.
