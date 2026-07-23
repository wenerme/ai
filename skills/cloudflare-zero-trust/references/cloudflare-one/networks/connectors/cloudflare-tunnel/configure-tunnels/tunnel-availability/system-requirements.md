---
description: How System requirements works in Zero Trust networking.
title: System requirements
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# System requirements

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Our connector, `cloudflared`, was designed to be lightweight and flexible enough to be effectively deployed on Raspberry Pi, your laptop or a server in a data center.

Unlike legacy VPNs where throughput is determined by the server's memory, CPU and other hardware specifications, Cloudflare Tunnel throughput is primarily limited by the number of ports configured in system software. Therefore, when sizing your `cloudflared` server, the most important element is sizing the available ports on the machine to reflect the expected throughput of TCP and UDP traffic.

## Recommendations

For most use cases, we recommend the following baseline configuration:

* Run a [cloudflared replica](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) on two dedicated host machines per network location. Using two hosts enables server-side redundancy.
* Size each host with minimum 4GB of RAM and 4 CPU cores.
* Allocate 50,000 [ports](#number-of-ports) to the `cloudflared` process on each host.

This setup is usually sufficient to handle traffic from 8,000 Cloudflare One Client users (4,000 per host). The actual amount of resources used by `cloudflared` will depend on many variables, including the number of requests per second, bandwidth, network path and hardware. As additional users are onboarded, or if network traffic increases beyond your existing [tunnel capacity](#estimated-throughput), you can scale your tunnel by adding an additional `cloudflared` host in that location.

### Number of ports

When `cloudflared` receives a request from a device, it uses the ports on the host machine to evaluate and forward the request to your origin service. Every machine by system design is hardware-limited to a maximum 65,535 ports. Additionally, each service on the machine has a limited number of ports that it can consume. For this reason, we recommend the following deployment model:

* `cloudflared` should be deployed on a dedicated host machine. This model is typically appropriate, but there may be serverless or clustered workflows where a dedicated host is not possible.
* The host machine should allocate 50,000 ports to be available for use by the `cloudflared` service. The remaining ports are reserved for system administrative processes.

To increase the number of ports available to `cloudflared` on Linux:

If your machine has a `/etc/sysctl.d/` directory:

```sh
echo 'net.ipv4.ip_local_port_range = 11000 60999' | sudo tee -a /etc/sysctl.d/99-cloudflared.conf
sudo sysctl -p /etc/sysctl.d/99-cloudflared.conf
```

Otherwise:

```sh
echo 'net.ipv4.ip_local_port_range = 11000 60999' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf
```

To increase the number of ports available to `cloudflared` on Windows, set the [dynamic port range ↗](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/tcp-ip-port-exhaustion-troubleshooting) for TCP and UDP:

```txt
netsh int ipv4 set dynamicport tcp start=11000 num=50000
netsh int ipv4 set dynamicport udp start=11000 num=50000
netsh int ipv6 set dynamicport tcp start=11000 num=50000
netsh int ipv6 set dynamicport udp start=11000 num=50000
```

### Private DNS

DNS queries utilize [more system resources](#estimated-throughput) compared to TCP and non-DNS UDP requests. To optimize service availability, Cloudflare recommends splitting [private DNS traffic](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/private-dns/) into its own Cloudflare Tunnel. The tunnel should run on a dedicated host and only include routes for your internal DNS resolver IPs.

### ulimits

On Linux and macOS, `ulimit` settings determine the system resources available to a logged-in user. We recommend configuring the following ulimits on the `cloudflared` server:

| ulimit | Description                                      | Value    |
| ------ | ------------------------------------------------ | -------- |
| \-n    | Maximum number of open files or file descriptors | ≥ 70,000 |

To view your current ulimits, open a terminal and run:

```sh
ulimit -a
```

To set the open files `ulimit`:

```sh
ulimit -n 70000
```

The command above sets the open files limit only for the current terminal session and will not persist after a reboot or new login. To apply this limit permanently, configure it using the persistent method appropriate for your operating system.

## Estimated throughput

Most private network traffic proxied by `cloudflared` falls in one of two categories:

* TCP requests (more common, less resource intensive)
* UDP requests (less common, more resource intensive)

TCP traffic uses and releases ports almost instantaneously. This means that in order to overload a `cloudflared` instance with 50,000 available ports, your organization would need to continuously generate 50,001 TCP requests per second.

UDP traffic is more unique. DNS queries - usually the bulk of UDP traffic - are held by ports in `cloudflared` for five seconds. Non-DNS UDP traffic holds each port for the duration of the connection, which can be any amount of time. This means that in order to overload a `cloudflared` instance with 50,000 available ports, you would need to continuously generate either 10,000 DNS queries to your private resolver per second, or a cumulative 50,000 non-DNS UDP requests over a shorter time than your connection reset rate.

### Calculate your tunnel capacity

Our [baseline recommendations](#recommendations) serve as a starting point for a Cloudflare Tunnel deployment. Once you have a representative population of users engaging with your network for at least a week, you can customize tunnel sizing according to your own traffic patterns.

To calculate your tunnel capacity:

1. Set up a [metrics service](https://developers.cloudflare.com/cloudflare-one/tutorials/grafana/) when you run the tunnel.
2. After a week or so, query the following [tunnel metrics](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/#cloudflared-metrics):
  * `cloudflared_tcp_total_sessions`
  * `cloudflared_udp_total_sessions`
3. Compute the average **TCP requests per second** and **Non-DNS UDP requests per second** by dividing total sessions by total time.
4. In your private DNS resolver, obtain the average **Private DNS requests per second**.
5. Input your values into our sizing calculator:

### System configuration

Available ports per host

Number of cloudflared replicas

DNS UDP session timeout (in seconds)

Average non-DNS UDP session timeout (seconds)

### Metrics

TCP requests per second

Non-DNS UDP requests per second

Private DNS requests per second

### Result

Percent capacity per replica

Percent capacity across all replicas

Maximum DNS requests per minute across all replicas

This calculator is for informational purposes only and all results are estimates.

You can use these results to determine if your tunnel is appropriately sized. To increase your tunnel capacity, add identical host machines running [cloudflared replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/#page","headline":"System requirements · Cloudflare One docs","description":"How System requirements works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP","UDP"]}
```
