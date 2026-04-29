---
title: Troubleshoot and debug
description: Debug Workers VPC connection errors, tunnel issues, and common configuration problems.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshoot and debug

Troubleshoot and debug errors commonly associated with Workers VPC.

## Connection error codes

When Workers VPC cannot establish a connection to your private service, `fetch()` will throw an exception with an error code describing what went wrong. These error codes are also visible in the **Metrics** tab of your VPC Service in the Cloudflare dashboard.

Errors are grouped into three categories based on the likely cause. These categories match the labels shown in the **Metrics** tab of your VPC Service in the dashboard.

* **Bad Upstream** — Your tunnel or private service is not reachable. Check tunnel health, service availability, and network/TLS configuration.
* **Client** — Your VPC Service configuration or Worker code caused the failure. Check your target hostname and Worker request behavior.
* **Internal** — A Cloudflare infrastructure issue. Contact Cloudflare support if this persists.

### Bad Upstream errors

These errors indicate that Cloudflare attempted to reach your private service but the connection failed. The tunnel may be down, the service may not be listening, or there is a network or TLS issue between Cloudflare and your origin.

| Error code                  | Description                                                                    | Recommended fix                                                                                                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| connection\_refused         | Your private service refused the TCP connection.                               | Verify your service is running and listening on the expected port. Check firewall rules.                                                                                                                                                                                |
| connection\_terminated      | The connection was closed by your service before a response was received.      | Check your service logs for crashes or resource exhaustion.                                                                                                                                                                                                             |
| connection\_timeout         | The connection attempt to your service timed out.                              | Verify your service is reachable from the tunnel. Check for network latency or firewall rules blocking traffic.                                                                                                                                                         |
| connection\_limit\_reached  | The maximum number of concurrent connections to your service has been reached. | Scale your service to handle more connections, or reduce connection concurrency in your Worker.                                                                                                                                                                         |
| destination\_unavailable    | Your service is considered unavailable.                                        | Verify your tunnel is running and your service is healthy.                                                                                                                                                                                                              |
| destination\_not\_found     | No route could be determined for this request.                                 | Check that your VPC Service configuration points to a valid host and that your tunnel is configured to route traffic to it.                                                                                                                                             |
| destination\_ip\_prohibited | The destination IP address is prohibited.                                      | Verify the IP address configured for your VPC Service is correct and not on a restricted list.                                                                                                                                                                          |
| destination\_ip\_unroutable | No network route exists to the destination IP.                                 | Check that the IP address is correct and reachable from within your private network.                                                                                                                                                                                    |
| proxy\_loop\_detected       | The request would be forwarded back to the same proxy, creating a loop.        | Review your VPC Service and tunnel configuration for circular routing.                                                                                                                                                                                                  |
| dns\_error                  | DNS resolution failed (for example, SERVFAIL).                                 | Check that the hostname configured for your VPC Service is resolvable from within your private network. Verify your DNS resolver is working correctly. Refer to [Tunnel errors](#tunnel-errors) for common DNS causes.                                                  |
| dns\_timeout                | DNS resolution timed out.                                                      | Check your DNS resolver is reachable and responding. Consider configuring a custom DNS resolver in your VPC Service settings.                                                                                                                                           |
| tls\_protocol\_error        | A TLS handshake or protocol error occurred when connecting to your service.    | Verify your service's TLS configuration. Ensure the TLS version and cipher suites are compatible.                                                                                                                                                                       |
| tls\_certificate\_error     | Your service's TLS certificate failed verification.                            | Ensure your service presents a valid certificate from a [publicly trusted CA](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) or a [Cloudflare Origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/). |
| http\_request\_error        | An HTTP request error occurred.                                                | Check your service logs for details on what caused the error response.                                                                                                                                                                                                  |
| http\_upgrade\_failed       | An HTTP upgrade (for example, WebSocket) failed.                               | Verify your service supports the requested protocol upgrade.                                                                                                                                                                                                            |
| http\_request\_denied       | The request was rejected by policy before being forwarded.                     | Review your service's access policies and configuration.                                                                                                                                                                                                                |
| http\_protocol\_error       | An HTTP protocol error occurred when communicating with your service.          | Check that your service is responding with valid HTTP.                                                                                                                                                                                                                  |
| http\_response\_incomplete  | Your service returned an incomplete HTTP response.                             | Check your service for issues that may cause it to close connections mid-response.                                                                                                                                                                                      |

### Client errors

These errors indicate a problem with your VPC Service setup or your Worker's behavior — not with the private service itself.

| Error code                 | Description                                                                    | Recommended fix                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| dns\_error (NXDOMAIN)      | The hostname configured for your VPC Service does not exist in DNS.            | Verify the hostname in your VPC Service configuration is correct and that a DNS record exists for it.               |
| connection\_read\_timeout  | The connection was established but no data was received within the time limit. | Check your Worker code for stalled or slow requests. Ensure your Worker is reading the response in a timely manner. |
| connection\_write\_timeout | Data could not be written to the connection (buffers full).                    | Check your Worker code for slow consumption of response data.                                                       |
| rate\_limited              | The connection rate limit to this origin has been exceeded.                    | Reduce the rate of new connections from your Worker to this service.                                                |

Note

The `dns_error` code can appear as either a **Bad Upstream** error or a **Client** error depending on the DNS failure type. An NXDOMAIN response (hostname does not exist) is classified as a Client error because it typically means the VPC Service hostname is misconfigured. All other DNS failures (SERVFAIL, timeouts, and similar) are classified as Bad Upstream errors.

### Internal errors

These errors indicate an issue within Cloudflare's infrastructure that is not caused by your configuration or your origin service.

| Error code             | Description                                             | Recommended fix                                                                                                                   |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| proxy\_internal\_error | An internal error occurred within the Cloudflare proxy. | This is not caused by your configuration. If this error persists, contact [Cloudflare support ↗](https://support.cloudflare.com). |

## Tunnel errors

Workers VPC may return errors at runtime when connecting to private services through Cloudflare Tunnel.

| Error Message                   | Details                                                                                                                                                                                                                                                                                                      | Recommended fixes                                                                                                                                                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error: ProxyError: dns\_error   | DNS resolution failed when attempting to connect to your private service through the tunnel.                                                                                                                                                                                                                 | This error may occur if your cloudflared version is outdated. Ensure you are running cloudflared version 2025.7.0 or later (latest version recommended). See [Cloudflare Tunnel update instructions](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/). |
| Error: ProxyError: dns\_error   | Cloudflare Tunnel may be configured with http2 protocol (TUNNEL\_TRANSPORT\_PROTOCOL:http2), which works for Cloudflare Zero Trust [(see note)](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/#create-and-run-tunnel-cloudflared) traffic but prevents DNS resolution from Workers VPC. | Workers VPC requires Cloudflare Tunnel to connect using the [QUIC transport protocol](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#protocol). Ensure outbound UDP traffic on port 7844 is allowed through your firewall.                        |
| Requests not staying within VPC | Worker requests using .fetch() with a public hostname are routing out of the VPC to the hostname configured for the VPC Service.                                                                                                                                                                             | Ensure your Worker code and the VPC Service use the internal VPC hostname for backend services, not a public hostname.                                                                                                                                                                                                      |

## Permission errors

If you cannot view, create, or bind VPC Services and Tunnels in the dashboard or via Wrangler, ensure your user has the required roles.

Workers VPC uses the following account roles:

* `Connectivity Directory Read` to view Workers VPC Services and Tunnels.
* `Connectivity Directory Bind` to list, read, and bind VPC Services in Workers.
* `Connectivity Directory Admin` to create, update, and delete VPC Services, and bind directly to tunnels through a VPC Network binding.

For role definitions, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

If your roles were recently updated and commands are still failing, refresh Wrangler authentication:

Terminal window

```

npx wrangler logout

npx wrangler login


```

If you authenticate with an API token (`CLOUDFLARE_API_TOKEN`), ensure the token belongs to a user with the required roles.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/reference/troubleshooting/","name":"Troubleshoot and debug"}}]}
```
