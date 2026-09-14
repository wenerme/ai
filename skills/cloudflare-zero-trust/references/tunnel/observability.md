---
description: Monitor tunnel health, connectors, and connection status.
title: Observability
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Observability

Last updated Sep 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/tunnel/observability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Tunnel exposes logs, metrics, and diagnostic tools to help you monitor tunnel health and resolve issues.

## Tunnel health

You can check your tunnel connection status in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) by going to **Networking** > **Tunnels**, or by running `cloudflared tunnel list`.

[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)

| Status | Meaning | Recommended Action |
| --- | --- | --- |
| **Healthy** | The tunnel is active and serving traffic through four connections to the Cloudflare global network. | No action is required. Your tunnel is running correctly. |
| **Inactive** | The tunnel has been created (via the API or dashboard) but the `cloudflared` connector has never been run to establish a connection. | Install and run `cloudflared` on your origin server to connect the tunnel to Cloudflare. You can find the installation command in the Cloudflare dashboard under **Networking** > **Tunnels** — select your tunnel, then on the **Overview** tab select **Add a replica**. For API-based setup, refer to [Install and run the tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/#4-install-and-run-the-tunnel). |
| **Down** | The tunnel was previously connected but is currently disconnected because the `cloudflared` process has stopped. | 1. Ensure the `cloudflared` [service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/) or process is actively running on your server. <br> 2. Check for server-side issues, such as the machine being powered off, an application crash, or recent network changes. |
| **Degraded** | The `cloudflared` connector is running and the tunnel is serving traffic, but at least one individual connection has failed. Further degradation in [tunnel availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) could risk the tunnel going down and failing to serve traffic. | 1. Review your `cloudflared` [logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) for connection failures or error messages. <br> 2. Investigate local network and firewall rules to ensure they are not blocking connections to the [Cloudflare Tunnel IPs and ports](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/). <br> |

Tunnel status scope

The tunnel status only reflects the connection between `cloudflared` and the Cloudflare network. It does not indicate whether `cloudflared` can reach your internal services. A tunnel can appear **Healthy** while users are unable to connect to an application.

### Notifications

Administrators can receive alerts when tunnels change health or deployment status. Notifications can be delivered by email, webhook, or third-party services.

To configure tunnel notifications, refer to [Create a notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

<details>

<summary>

Tunnel Creation or Deletion Event

</summary>

**Who is it for?**

Customers who want to receive a notification when Cloudflare Tunnels are created or deleted in their account.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

No action is needed.

</details>

<details>

<summary>

Tunnel Health Alert

</summary>

**Who is it for?**

Customers who want to be warned about changes in health status for their Cloudflare Tunnels.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Monitor tunnel health over time and consider deploying <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/"><code>cloudflared</code> replicas or load balancers</a>.

**Additional information**

Refer to <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status">Tunnel status</a> to review the list of possible tunnel statuses (<code>Healthy</code>, <code>Inactive</code>, <code>Down</code> and <code>Degraded</code>).

</details>

## Logs

Tunnel logs record all activity between `cloudflared` and the Cloudflare global network, and all activity between `cloudflared` and your origin server.

### Server-side logs

If you have access to the origin server, you can use the [`--loglevel` flag](https://developers.cloudflare.com/tunnel/reference/run-parameters/#loglevel) to enable logging when you start the tunnel. By default, `cloudflared` writes logs to standard error (`stderr`) and does not store logs on the server.

Note

Requires `cloudflared` version 2025.6.1 or later.

To format each log line as a JSON object, add `--output json` before `run`:

```sh
cloudflared tunnel --output json run <UUID>
```

This format is useful for Kubernetes deployments and log collection systems that consume JSON.

For routine persistent logging, [run the tunnel](https://developers.cloudflare.com/tunnel/reference/run-parameters/#add-run-parameters-to-tunnel-service#log-directory) with `--log-directory <PATH>`. This flag writes logs to `cloudflared.log` in the specified directory, rotates the file when it reaches 1 MB, and keeps up to five backups. It does not remove logs based on age.

```sh
cloudflared tunnel --loglevel info --log-directory <PATH> run <UUID>
```

Use the [`--logfile` flag](https://developers.cloudflare.com/tunnel/reference/run-parameters/#logfile) instead for short troubleshooting sessions or when another tool manages rotation. `cloudflared` does not rotate the file specified by `--logfile`. If you set both flags, `--logfile` takes precedence.

### Remote log streaming

You can stream real-time logs from a running tunnel without SSH access to the server.

The `cloudflared` daemon can stream logs from any tunnel in your account to the local command line. `cloudflared` must be installed on both your local machine and the origin server.

1. On your local machine, authenticate `cloudflared` to your Cloudflare account:

   ```sh
   cloudflared tunnel login
   ```


2. Run `cloudflared tail` for a specific tunnel:

   ```sh
   cloudflared tail <UUID>
   ```

   For a more structured view of the JSON message, you can pipe the output to tools like [jq ↗](https://stedolan.github.io/jq/):

   ```sh
   cloudflared tail --output=json <UUID> | jq .
   ```



3. If you are running multiple [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability), you can specify which replica to stream logs from:

   ```sh
   cloudflared tail --connector-id <REPLICA ID> <UUID>
   ```

    To find the replica ID, go to **Networking** > **Tunnels** and select your tunnel. All active replicas appear in the **Connectors** list on the tunnel overview page. The replica ID is the **Connector ID**.

<details>

<summary>

Log filtering options

</summary>

You can filter logs by event type (<code>--event</code>), event level (<code>--level</code>), or sampling rate (<code>-sampling</code>) to reduce the volume of logs streamed from the origin. This helps mitigate the performance impact on the origin, especially when the origin is normally under high load. For example:

```sh
cloudflared tail --level debug <UUID>
```

| Flag | Description | Allowed values | Default value |
| --- | --- | --- | --- |
| <code>--event</code> | Filter by the type of event / request. | <code>cloudflared</code>, <code>http</code>, <code>tcp</code>, <code>udp</code> | All events |
| <code>--level</code> | Return logs at this level and above. Works independently of the <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#loglevel"><code>--loglevel</code></a> setting on the server. | <code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>, <code>fatal</code> | <code>debug</code> |
| <code>--sampling</code> | Sample a fraction of the total logs. | Number from <code>0.0</code> to <code>1.0</code> | <code>1.0</code> |

</details>

To stream tunnel logs from the dashboard:

1. In the Cloudflare dashboard, go to **Networking** > **Tunnels** and select your tunnel. [Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Go to the **Live logs** tab.
3. Select **Live** to start streaming.

#### View logs for a replica

If you are running multiple `cloudflared` instances for the same tunnel (also known as [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability)), logs from all connected replicas are streamed automatically and grouped by hostname, making it easy to identify which host machine produced each log entry.

To filter the stream to specific replicas, select the **Filter** icon and expand the **Replicas** section. You can also filter by **Log Level** and **Event Type**.

## Metrics

Tunnel metrics show a Cloudflare Tunnel's throughput and resource usage over time. When you run a tunnel, `cloudflared` will spin up a Prometheus metrics endpoint — an HTTP server that exposes metrics in [Prometheus ↗](https://prometheus.io/docs/introduction/overview/) format. You can use the Prometheus toolkit on a remote machine to scrape metrics data from the `cloudflared` server.

### Default metrics server address

In non-containerized environments, `cloudflared` starts the metrics server on `127.0.0.1:<PORT>/metrics`, where `<PORT>` is the first available port in the range `20241` to `20245`. If all ports are unavailable, `cloudflared` binds to a random port. In containerized environments (Docker, Kubernetes), the default address is `0.0.0.0:<PORT>/metrics`.

To determine the default port, check your [tunnel logs](#server-side-logs) around the time when the tunnel started. For example:

```text
2024-12-19T21:17:58Z INF Starting metrics server on 127.0.0.1:20241/metrics
```

### Configure a custom address

To serve metrics on a custom IP address and port, perform these steps on the `cloudflared` host:

1. [Run the tunnel](https://developers.cloudflare.com/tunnel/reference/run-parameters/#add-run-parameters-to-tunnel-service) using the `--metrics` flag. For example,

   ```sh
   cloudflared tunnel --metrics 127.0.0.1:60123 run my-tunnel
   ```

   Note

   If you plan to fetch metrics from another machine on the local network, replace `127.0.0.1` with the internal IP of the `cloudflared` server (for example, `198.168.x.x`). To serve metrics on all available network interfaces, use `0.0.0.0`.
2. Verify that the metrics server is running by going to `http://localhost:60123/metrics`. This will only work if you configured a localhost IP ( `127.0.0.1` or `0.0.0.0`).

You can now export the metrics to Prometheus and Grafana to visualize and query the data. Refer to the [Grafana tutorial](https://developers.cloudflare.com/tunnel/tutorials/grafana/) for instructions on getting started with these tools.

<details>

<summary>

cloudflared metrics

</summary>

| Name | Description | Type | Labels |
| --- | --- | --- | --- |
| <code>build_info</code> | Build and version information. | GAUGE | <code>goversion</code>, <code>revision</code>, <code>type</code>, <code>version</code> |
| <code>cloudflared_config_local_config_pushes</code> | Number of local configuration pushes to Cloudflare. | COUNTER | |
| <code>cloudflared_config_local_config_pushes_errors</code> | Number of errors that occurred during local configuration pushes. | COUNTER | |
| <code>cloudflared_orchestration_config_version</code> | Configuration version. | GAUGE | |
| <code>cloudflared_tcp_active_sessions</code> | Concurrent number of TCP sessions that are being proxied to any origin. | GAUGE | |
| <code>cloudflared_tcp_total_sessions</code> | Total number of TCP sessions that have been proxied to any origin. | COUNTER | |
| <code>cloudflared_tunnel_active_streams</code> | Total number of active streams. | GAUGE | |
| <code>cloudflared_tunnel_concurrent_requests_per_tunnel</code> | Concurrent number of requests proxied through each tunnel. | GAUGE | |
| <code>cloudflared_tunnel_ha_connections</code> | Number of active HA connections. | GAUGE | |
| <code>cloudflared_tunnel_request_errors</code> | Number of errors proxying to origin. | COUNTER | |
| <code>cloudflared_tunnel_server_locations</code> | Where each tunnel is connected to. <code>1</code> means current location, <code>0</code> means previous locations. | GAUGE | <code>connection_id</code>, <code>edge_location</code> |
| <code>cloudflared_tunnel_timer_retries</code> | Unacknowledged heart beats count. | GAUGE | |
| <code>cloudflared_tunnel_total_requests</code> | Number of requests proxied through all tunnels. | COUNTER | |
| <code>cloudflared_tunnel_tunnel_authenticate_success</code> | Number of successful tunnel authentication events. | COUNTER | |
| <code>cloudflared_tunnel_tunnel_register_success</code> | Number of successful tunnel registrations. | COUNTER | <code>rpcName</code> |
| <code>cloudflared_udp_active_sessions</code> | Concurrent number of UDP sessions that are being proxied to any origin. | GAUGE | |
| <code>cloudflared_udp_total_sessions</code> | Total number of UDP sessions that have been proxied to any origin. | COUNTER | |
| <code>coredns_panics_total</code> | Number of panics. | COUNTER | |
| <code>quic_client_closed_connections</code> | Number of connections that have been closed. | COUNTER | |
| <code>quic_client_latest_rtt</code> | Latest round-trip time (RTT) measured on a connection. | GAUGE | <code>conn_index</code> |
| <code>quic_client_lost_packets</code> | Number of packets that have been lost from a connection. | COUNTER | <code>conn_index</code>, <code>reason</code> |
| <code>quic_client_min_rtt</code> | Lowest RTT measured on a connection in ms. | GAUGE | <code>conn_index</code> |
| <code>quic_client_packet_too_big_dropped</code> | Number of packets received from origin that are too big to send to Cloudflare and are dropped as a result. | COUNTER | |
| <code>quic_client_smoothed_rtt</code> | Smoothed RTT calculated for a connection in ms. | GAUGE | <code>conn_index</code> |
| <code>quic_client_total_connections</code> | Number of connections initiated. For all QUIC metrics, client means the side initiating the connection. | COUNTER | |

</details>

<details>

<summary>

Prometheus metrics

</summary>

| Name | Description | Type | Labels |
| --- | --- | --- | --- |
| <code>promhttp_metric_handler_requests_in_flight</code> | Current number of scrapes being served. | GAUGE | |
| <code>promhttp_metric_handler_requests_total</code> | Total number of scrapes by HTTP status code. | COUNTER | <code>code</code> |

</details>

<details>

<summary>

Go runtime metrics

</summary>

| Name | Description | Type | Labels |
| --- | --- | --- | --- |
| <code>go_gc_duration_seconds</code> | A summary of the pause duration of garbage collection cycles. | SUMMARY | |
| <code>go_goroutines</code> | Number of goroutines that currently exist. | GAUGE | |
| <code>go_info</code> | Information about the Go environment. | GAUGE | <code>version</code> |
| <code>go_memstats_alloc_bytes</code> | Number of bytes allocated and still in use. | GAUGE | |
| <code>go_memstats_alloc_bytes_total</code> | Total number of bytes allocated, even if freed. | COUNTER | |
| <code>go_memstats_buck_hash_sys_bytes</code> | Number of bytes used by the profiling bucket hash table. | GAUGE | |
| <code>go_memstats_frees_total</code> | Total number of frees. | COUNTER | |
| <code>go_memstats_gc_sys_bytes</code> | Number of bytes used for garbage collection system metadata. | GAUGE | |
| <code>go_memstats_heap_alloc_bytes</code> | Number of heap bytes allocated and still in use. | GAUGE | |
| <code>go_memstats_heap_idle_bytes</code> | Number of heap bytes waiting to be used. | GAUGE | |
| <code>go_memstats_heap_inuse_bytes</code> | Number of heap bytes that are in use. | GAUGE | |
| <code>go_memstats_heap_objects</code> | Number of allocated objects. | GAUGE | |
| <code>go_memstats_heap_released_bytes</code> | Number of heap bytes released to OS. | GAUGE | |
| <code>go_memstats_heap_sys_bytes</code> | Number of heap bytes obtained from system. | GAUGE | |
| <code>go_memstats_last_gc_time_seconds</code> | Number of seconds since 1970 of last garbage collection. | GAUGE | |
| <code>go_memstats_lookups_total</code> | Total number of pointer lookups. | COUNTER | |
| <code>go_memstats_mallocs_total</code> | Total number of mallocs. | COUNTER | |
| <code>go_memstats_mcache_inuse_bytes</code> | Number of bytes in use by mcache structures. | GAUGE | |
| <code>go_memstats_mcache_sys_bytes</code> | Number of bytes used for mcache structures obtained from system. | GAUGE | |
| <code>go_memstats_mspan_inuse_bytes</code> | Number of bytes in use by mspan structures. | GAUGE | |
| <code>go_memstats_mspan_sys_bytes</code> | Number of bytes used for mspan structures obtained from system. | GAUGE | |
| <code>go_memstats_next_gc_bytes</code> | Number of heap bytes when next garbage collection will take place. | GAUGE | |
| <code>go_memstats_other_sys_bytes</code> | Number of bytes used for other system allocations. | GAUGE | |
| <code>go_memstats_stack_inuse_bytes</code> | Number of bytes in use by the stack allocator. | GAUGE | |

</details>

## Diagnostic logs

Cloudflare Tunnel generates diagnostic reports that collect data from a single `cloudflared` instance running on the local machine. This requires `cloudflared` version 2024.12.2 or later.

### Generate diagnostics

1. (Linux only) To include network diagnostics in the logs, allow the `cloudflared` user to create RAW and PACKET sockets without root permissions:

   ```sh
   sudo setcap cap_net_raw+ep /usr/bin/traceroute && sudo setcap cap_net_raw+ep /usr/bin/traceroute
   ```

   If you do not set `cap_net_raw`, then traceroute data will be unavailable.
2. Get diagnostic logs:

   ```sh
   cloudflared tunnel diag
   ```

   If multiple instances of `cloudflared` are running on the same host, specify the [metrics server IP and port](#configure-a-custom-address) for the instance you want to diagnose. For example:

   ```sh
   cloudflared tunnel diag --metrics 127.0.0.1:20241
   ```



This command will output the status of each diagnostic task and place a `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` file in your working directory.

<details>

<summary>

Docker diagnostics

</summary>

<code>cloudflared</code> reads diagnostic data from the <a href="#metrics">tunnel metrics server</a>. To get diagnostic logs, the metrics server must be exposed from the Docker container and reachable from the host machine.

1. Determine the <a href="#default-metrics-server-address">metrics server port</a> for the <code>cloudflared</code> instance running in Docker.
2. Ensure the container is deployed with port forwarding enabled. The diagnostic feature will request information from the Docker instance using local port <code>20241</code>, therefore you should forward port <code>20241</code> to the container port obtained in Step 1:

   ```sh
   docker run -d -p 20241:<metrics_port> docker.io/cloudflare/cloudflared tunnel ...
   ```


3. Verify that you can reach the metrics server address from the Docker host environment:

   ```sh
   curl localhost:20241/diag/tunnel
   ```

   This command should return a JSON:

   ```json
   {
     "tunnelID": "ef96b330-a7f5-4bce-a00e-827ce5be077f",
     "connectorID": "d236670a-9f74-422f-adf1-030f5c5f0523",
     "connections": [
       { "isConnected": true, "protocol": 1, "edgeAddress": "198.41.192.167"},
       {"isConnected": true, "protocol": 1, "edgeAddress": "198.41.200.113", "index": 1},
       {"isConnected": true, "protocol": 1, "edgeAddress": "198.41.192.47", "index": 2},
       {"isConnected": true, "protocol": 1, "edgeAddress": "198.41.200.73", "index": 3}
     ],
     "icmp_sources": ["192.168.1.243", "fe80::c59:bd4a:e815:ed6"]
   }
   ```


4. Run the diagnostic using the Docker container ID:

   ```sh
   cloudflared tunnel diag --diag-container-id=<containerID>
   ```

   Alternatively, you can specify the container's name instead of its ID:

   ```sh
   cloudflared tunnel diag --diag-container-id=<containerName>
   ```

   Running the diagnostic command with the container ID allows <code>cloudflared</code> to collect information from the Docker environment such as logs and container details.

This command will output the status of each diagnostic task and place a <code>cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip</code> file in your working directory.

</details>

<details>

<summary>

Kubernetes diagnostics

</summary>

The diagnostic feature will request data from the <a href="#metrics">tunnel metrics server</a> using ports <code>20241</code> to <code>20245</code>. You will need to use port forwarding to allow the local <code>cloudflared</code> instance to connect to the metrics server on one of these ports.

1. Determine the tunnel's <a href="#default-metrics-server-address">metrics server port</a>.
2. Enable port forwarding:

   ```sh
   kubectl port-forward <pod> <diagnostic_port>:<metrics_port>
   ```


   - <code>&lt;pod&gt;</code>: Name of the pod where the tunnel is running
   - <code>&lt;diagnostic_port&gt;</code> is any local port in the range <code>20241</code> to <code>20245</code>.
   - <code>&lt;metrics_port&gt;</code> is the Kubernetes pod port for the <code>cloudflared</code> instance you want to diagnose (obtained in Step 1).

   For example, if you set the metrics server address to <code>0.0.0.0:12345</code>:

   ```sh
   kubectl port-forward cloudflared-6d4897585b-r8kfz 20244:12345
   ```

   Connections made to local port <code>20244</code> are forwarded to port <code>12345</code> of the pod that is running the tunnel.
3. Run the diagnostic:

   ```sh
   cloudflared tunnel diag --diag-pod-id=<podID>
   ```

   If the pod has multiple applications/services running and <code>cloudflared</code> is not the first in the pod, you must specify either the container ID or name:

   ```sh
   cloudflared tunnel diag --diag-pod-id=<podID> --diag-container-id=<containerName>
   ```



This command will output the status of each diagnostic task and place a <code>cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip</code> file in your working directory.

</details>

### Diagnostic file contents

The `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` archive contains the files listed below. The data in a file either applies to the `cloudflared` instance being diagnosed (`diagnosee`) or the instance that triggered the diagnosis (`diagnoser`). For example, if your tunnel is running in a Docker container, the diagnosee is the Docker instance and the diagnoser is the host instance.

| File name | Description | Instance |
| --- | --- | --- |
| `cli-configuration.json` | [Tunnel run parameters](https://developers.cloudflare.com/tunnel/reference/run-parameters/) used when starting the tunnel | diagnosee |
| `cloudflared_logs.txt` | [Tunnel log file](#logs)<sup>[1](#user-content-fn-1)</sup> | diagnosee |
| `configuration.json` | Tunnel configuration parameters | diagnosee |
| `goroutine.pprof` | goroutine profile made available by `pprof` | diagnosee |
| `heap.pprof` | heap profile made available by `pprof` | diagnosee |
| `metrics.txt` | Snapshot of [Tunnel metrics](#metrics) at the time of diagnosis | diagnosee |
| `network.txt` | JSON traceroutes to Cloudflare's global network using IPv4 and IPv6 | diagnoser |
| `raw-network.txt` | Raw traceroutes to Cloudflare's global network using IPv4 and IPv6 | diagnoser |
| `systeminformation.json` | Operating system information and resource usage | diagnosee |
| `task-result.json` | Result of each diagnostic task | diagnoser |
| `tunnelstate.json` | Tunnel connections at the time of diagnosis | diagnosee |

## Footnotes

1. If the log file is blank, you may need to [set `--loglevel` to `debug`](#server-side-logs) when you start the tunnel. The `--loglevel` parameter is only required if you ran the tunnel from the CLI using a `cloudflared tunnel run` command. It is not necessary if the tunnel runs as a Linux/macOS service or runs in Docker/Kubernetes. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/observability/#page","headline":"Observability · Cloudflare Docs","description":"Monitor tunnel health, connectors, and connection status.","url":"https://developers.cloudflare.com/tunnel/observability/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
