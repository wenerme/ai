# Unable to Receive Push Notifications from Some Apps

Some overseas apps might not receive push notifications on mainland China networks, while notifications resume after switching to a non-mainland network exit. This is usually not caused by the app's notification permission. The cause is that the APNs service in mainland China cannot deliver push notifications for some overseas apps to the device.

APNs is the iOS system service used to receive app push notifications. Routing APNs-related traffic through a proxy lets the device use a non-mainland network path where APNs can work normally. On Wi-Fi networks, you can route the APNs-related domains and the official APNs network ranges listed by Apple through a proxy. The example below assumes the policy group is named `PROXY`; replace it with the policy group name used in your configuration.

These network ranges come from Apple's official documentation: [If your Apple devices aren't getting Apple push notifications](https://support.apple.com/en-us/102266).

```yaml
rules:
  - DOMAIN-SUFFIX,push.apple.com,PROXY
  - DOMAIN-SUFFIX,akadns.net,PROXY
  - DOMAIN-KEYWORD,apple.com.edgekey.net,PROXY
  - IP-CIDR,17.249.0.0/16,PROXY,no-resolve
  - IP-CIDR,17.252.0.0/16,PROXY,no-resolve
  - IP-CIDR,17.57.144.0/22,PROXY,no-resolve
  - IP-CIDR,17.188.128.0/18,PROXY,no-resolve
  - IP-CIDR,17.188.20.0/23,PROXY,no-resolve
  - IP-CIDR6,2620:149:a44::/48,PROXY,no-resolve
  - IP-CIDR6,2403:300:a42::/48,PROXY,no-resolve
  - IP-CIDR6,2403:300:a51::/48,PROXY,no-resolve
  - IP-CIDR6,2a01:b740:a42::/48,PROXY,no-resolve
```

After adding the rules, turn Airplane Mode on and off once to disconnect and rebuild all network connections, then test push notifications again.

> [!NOTE]
> Apple's documentation notes that APNs uses load balancing, and enterprise
> networks can allow the entire `17.0.0.0/8` block. For proxy routing rules,
> however, it is recommended to use only the APNs network ranges listed by
> Apple, instead of sending an overly broad Apple address block through the
> proxy.

On cellular data networks, adding these rules alone might still fail intermittently. In that case, enable the Apple Push Notifications (APNs) system-level proxy option in Stash.

After system-level APNs or all-network proxy capabilities are enabled, push notifications depend on the proxy path. If the proxy is unavailable, push notifications for all apps might stop working.

These system-level proxy capabilities can also affect Personal Hotspot, CarPlay, and other features that rely on local network or system network paths. If Personal Hotspot stops working or CarPlay cannot connect, temporarily disable the related option first to confirm whether the issue is proxy-related.
