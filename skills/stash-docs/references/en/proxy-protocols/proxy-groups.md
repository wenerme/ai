# Strategy Group

A strategy group (`proxy-groups`) is a combination of a series of proxies (or strategy groups). A strategy group can be referenced by the diversion rules like a single proxy, and special strategies can be specified to improve availability.

- Diversion rules can directly reference proxies or strategy groups, but cannot reference remote proxy sets
- A strategy group can contain multiple proxies, or multiple remote proxy sets
- A strategy group can contain another strategy group
- A strategy group that does not contain any proxies will be treated as a `DIRECT` strategy
- Supports `filter` field, filtering nodes through regular expressions
- All proxies and remote proxy sets can be referenced through `include-all: true`

[![](https://mermaid.ink/svg/pako:eNqNjz0OwjAMha8SeW4ukIEJNiZYvViNaSOaH7kJIqp6dwIqSAxILNbz9-wne4E-WgYDg1Aa1fGEAUOSeHc8K6136qmrHiSWNH87UibeUNWt3pxl-bX07v6xX8HQgWfx5Gw7bsGgFEIe2TOCadKSXBEwrG2OSo7nGnowWQp3UJKlzHtH7ScP5kLT_KEH63KUDa4PpRlbCA?type=png)](https://mermaid.live/edit#pako:eNqNjz0OwjAMha8SeW4ukIEJNiZYvViNaSOaH7kJIqp6dwIqSAxILNbz9-wne4E-WgYDg1Aa1fGEAUOSeHc8K6136qmrHiSWNH87UibeUNWt3pxl-bX07v6xX8HQgWfx5Gw7bsGgFEIe2TOCadKSXBEwrG2OSo7nGnowWQp3UJKlzHtH7ScP5kLT_KEH63KUDa4PpRlbCA)

## Strategy Group

> [!NOTE]
> The sorting method of proxies in the strategy group is by default the order of
> the configuration file, which can be changed to sort by latency test results
> on the "Network Settings" page.

### `url-test`

`url-test` can periodically perform connectivity checks on the included proxies, automatically select the server with the shortest delay, and unhealthy proxies will be skipped.

```yaml
- name: auto
  type: url-test
  proxies:
    - ss1
    - ss2
    - vmess
  interval: 300
```

### `fallback`

`fallback` tries to follow the server order written by the user as much as possible, and automatically selects the server from top to bottom under the condition that the server is available. Unhealthy proxies will be skipped.

```yaml
- name: fallback-auto
  type: fallback
  proxies:
    - ss1
    - ss2
    - vmess
```

### `load-balance`

`load-balance` can fully utilize the bandwidth of multiple proxies, and unhealthy proxies will be skipped.

```yaml
- name: load-balance
  type: load-balance
  strategy: # consistent-hashing / round-robin
  proxies:
    - ss1
    - ss2
    - vmess
```

It is generally recommended to set `strategy` to `consistent-hashing` to avoid frequently changing IP and triggering the server's security policy.

### `select`

`select` is used to allow users to manually select.

```yaml
- name: select
  type: select
  proxies:
    - ss1
    - ss2
    - vmess
    - auto
```

### `relay`

> [!WARNING]
> The `relay` strategy group is no longer recommended. Use the more capable
> [dialer proxy](/proxy-protocols/dialer-proxy) instead.

The forwarding chain of the proxy, the traffic will be forwarded to the destination through a series of proxies, only supports forwarding TCP or using UDP over TCP protocol. The `relay` strategy group is not affected by the latency test results of the internal proxy, and a separate test URL needs to be specified.

```yaml
- name: relay
  type: relay
  benchmark-url: http://www.apple.com # It is recommended to use only the HTTP protocol
  benchmark-timeout: 5 # Latency test timeout, unit: seconds
  # Traffic: stash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  proxies:
    - http
    - vmess
    - ss1
    - ss2
```

> [!NOTE]
> If proxies in the `relay` strategy group cannot be accessed directly, you can
> configure `benchmark-disabled: true` on those proxies to disable Stash's
> separate latency test for them.

## Additional Features

### Scheduled Latency Test

By default, Stash will perform a latency test for the proxies included in the strategy group every 600 seconds. If the strategy group contains another strategy group, the test will be performed recursively.

The scheduled latency test supports modifying the following configurations:

- `interval`: in seconds, perform latency tests at regular intervals, default is 600 seconds, set to a negative number to not perform latency tests.
- `lazy`: lazy mode, if set to `true` and the strategy group has not been used for a period of time, Stash will skip the automatic latency test to save resources.

```yaml
proxy-groups:
  - name: my-proxy-group
    type: select
    # ...
    interval: 300 # Check every 300s
    lazy: true # Do not perform latency tests when the strategy group is not in use
```

### Automatically Switch Strategies Based on Network Status

The `select` type of strategy group can automatically switch strategies according to the device's SSID / cellular data.

`default` and `cellular` are two optional reserved strategies:

- When in a Wi-Fi environment, if no SSID is matched, it will automatically switch to the proxy corresponding to `default`;
- In cellular data, it will automatically switch to the proxy corresponding to `cellular`;
- When there is no `default` or `cellular`, no operation will be triggered.

> [!NOTE]
> On macOS, Stash needs Location Services permission to read the current Wi-Fi
> SSID when using `ssid-policy`. If the strategy does not switch as expected,
> check Stash's permission in "System Settings" - "Privacy & Security" -
> "Location Services".

```yaml
- name: ssid-group
  type: select # The type must be select, compatible with the original clash configuration
  proxies:
    - ss1
    - ss2
    - ss3
    - DIRECT
  ssid-policy:
    # Automatically switch to the ss1 strategy in the Wi-Fi with SSID as office
    # Automatically switch to the ss2 strategy in the Wi-Fi with SSID as home
    # Automatically switch to the ss3 strategy in cellular data
    # Other SSIDs default to DIRECT
    office: ss1
    home: ss2
    cellular: ss3
    default: DIRECT
```

### Flexibly Combine Proxies

Stash supports various ways to combine multiple proxies into a strategy group.

- All proxies and remote proxy sets can be referenced through `include-all: true`
- A strategy group that does not contain any proxies will be treated as a `DIRECT` strategy.
- Supports `filter` field, filtering nodes through regular expressions

```yaml
proxy-groups:
  - name: my-hongkong-group
    type: select
    include-all: true # Reference all proxies & proxy-providers
    filter: 'HK|Hong Kong' # Filter proxies with the keywords HK or Hong Kong
```
