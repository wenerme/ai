# Providing Proxy for Local Area Network Devices

Stash iOS, Stash tvOS, and Stash Mac all support providing proxy for local area network devices.

- Stash iOS supports providing HTTP proxy and SOCKS proxy.
- Stash tvOS and Stash Mac support providing HTTP proxy, SOCKS proxy, and transparent proxy (gateway mode).

> [!NOTE]
> Gateway mode can provide transparent proxy for devices within the local area network, also known as bypass routing or enhanced mode.

## HTTP Proxy or SOCKS Proxy

Both Stash iOS and Stash Mac support providing HTTP proxy and SOCKS proxy on port 7890. After enabling "Allow LAN connections," local area network devices can access the proxy service provided by Stash through port 7890.

For example, if a device with the IP address `192.168.1.10` in the local area network is running Stash, you can configure the proxy for the shell using the following commands.

```bash
export https_proxy=http://192.168.1.10:7890
export http_proxy=http://192.168.1.10:7890
export all_proxy=socks5h://192.168.1.10:7890
```

## Providing Proxy through Personal Hotspot

After enabling personal hotspot on devices such as iPhone/iPad, running Stash can provide HTTP proxy or SOCKS proxy for devices connected to the personal hotspot. This feature also requires enabling "Allow LAN connections."

## Stash tvOS & Stash Mac Gateway Mode

- Stash tvOS only supports enabling transparent proxy on [Thread-enabled Apple TV](https://support.apple.com/en-hk/HT210213).
- Enabling transparent proxy on Stash Mac requires enabling "Enhanced Mode."

Assuming a device with the IP address `192.168.1.10` in the local area network is running Stash, the following settings are required to provide proxy for local area network devices:

- Set the gateway of the devices in the local area network to `192.168.1.10`.
- Set the DNS to `198.18.0.2`.
- Keep the IP address and subnet mask unchanged.

**Gateway mode can proxy TCP, UDP, and ICMP traffic.**

> [!NOTE]
> If the Apple TV becomes unresponsive after being in sleep mode for a period of time, check if the Apple TV has been set as the home hub according to Apple's instructions.
