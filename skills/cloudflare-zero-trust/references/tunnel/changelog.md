---
description: Review recent changes to Cloudflare Tunnel.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tunnel/changelog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/tunnel.xml)

## 2026-09-02


**Create multiple Cloudflare Tunnel and Cloudflare Mesh routes at once**

You can now create multiple [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) routes from the Routes page in a single action, instead of submitting one route at a time.

![Creating multiple Cloudflare Tunnel and Cloudflare Mesh routes at once from the Routes page](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=1034,format=webp/_astro/2026-09-01-tunnel-mesh-bulk.zu4fOWN3.gif)

When creating a route, you can now:

* **Add multiple destinations at once** — Enter a comma-separated list of CIDR ranges or hostnames to create several routes of the same type and connector together.
* **Queue up multiple routes** — Select **Add another** to stage additional routes, including different types or connectors, before creating them all in one action.
* **Retry only what failed** — If some routes in a batch fail (for example, an invalid CIDR), the routes that were created successfully are removed from the form automatically, so you only need to fix and resubmit the ones that failed.

The same Routes UI already supports bulk creation for [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) static routes, so you can add multiple WAN destinations or queue up several WAN routes before creating them together as well.

[Go to **Routes** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)

For setup steps, refer to [Add routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/).

## 2026-08-18


**Configure origin application settings for Cloudflare Tunnel in the dashboard**

You can now configure origin application settings directly in the Cloudflare dashboard when adding or editing a published application route for a [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/). These settings control how `cloudflared` connects to your origin server and were previously only available in the Cloudflare One dashboard or via local configuration files.

![Configure origin application settings in the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=948,format=webp/_astro/tunnel-origin-settings-dashboard.CsC2RwFC.gif)

When editing a published application, expand **Additional application settings** to configure parameters organized into three categories:

* **HTTP** — Set a custom HTTP Host header or disable chunked encoding.
* **TLS** — Configure origin server name, CA pool, TLS timeout, disable TLS verification, match SNI to host, or enable HTTP/2 to origin.
* **Connection** — Tune connect timeout, keep-alive timeout, keep-alive connections, TCP keep-alive interval, proxy type, or disable Happy Eyeballs.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)

For the full list of origin parameters, refer to [Origin parameters](https://developers.cloudflare.com/tunnel/advanced/origin-parameters/).

## 2026-08-11


**Hostname routing is now generally available, with a new public IP range for initial resolved IPs**

[Hostname routing ↗](https://blog.cloudflare.com/tunnel-hostname-routing/) is now generally available. Instead of managing static IP lists and routes, you can route traffic by hostname across multiple Cloudflare One connectors:

* **Cloudflare Tunnel**: route a [private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) (for example, `wiki.internal.local`) to a private application behind your tunnel, or a [public hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/) (for example, `bank.example.com`) to egress through a specific tunnel and anchor traffic to a dedicated exit node.
* **Cloudflare Mesh**: attract a [private or public hostname's traffic](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#hostname-routes) to a Mesh node.

Alongside GA, the default IPv4 range used for initial resolved IPs (also called token IPs) is changing from a Carrier-Grade NAT (CGNAT) range to a public Cloudflare-owned range:

* **IPv4**: `172.64.128.0/20`
* **IPv6**: `2606:4700:0cf1:4000::/64`

This is the default range. You can [configure a custom initial resolved IP range](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) for IPv4 if it conflicts with your existing network.

**Why this is changing:** Starting with [Chrome 142 ↗](https://developer.chrome.com/release-notes/142), Local Network Access (LNA) restrictions block background requests to CGNAT addresses (`100.64.0.0/10`), which included the previous initial resolved IP default (`100.80.0.0/16`). LNA is implemented at the Chromium engine level, so it affects all Chromium-based browsers (for example, Microsoft Edge, Brave, and Opera), not only Google Chrome. This could silently break hostname-based Gateway features for users of these browsers, and required Chrome Enterprise policy workarounds. The new default range is public Cloudflare address space, so it is not affected by this restriction.

**What is affected:** Initial resolved IPs are used by several features that associate a DNS query with the network connection that follows it:

* [Private](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) and [public](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/) hostname routing for Cloudflare Tunnel
* [Hostname routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#hostname-routes) for Cloudflare Mesh
* [Access private applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) on non-HTTPS ports
* [Egress policy host selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/) (Domain, Host, Application, and Content Categories)

You can check your account's current range, or configure a custom range, at any time from **Networking** \> **IP addresses** \> **Address space** \> **Custom IPs**, or using the [Initial Resolved IP Subnet API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/#%28resource%29%20zero%5Ftrust.networks.subnets.initial%5Fresolved%5Fip).

[Go to **Custom IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space/custom-ips)

For full instructions, refer to [Configure initial resolved IPs](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/). The IPv6 range (`2606:4700:0cf1:4000::/64`) is unchanged and is not affected by this restriction.

The default IPv4 range, and all Cloudflare One IPv6 ranges, are automatically routed through the Cloudflare One Client and do not require any Split Tunnel configuration. Refer to [Automatically managed ranges](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#automatically-managed-ranges) for details.

If you were relying on a Chrome Enterprise policy workaround (such as `LocalNetworkAccessRestrictionsTemporaryOptOut`) while your account was still on the legacy CGNAT-based range, refer to [Google Chrome restricts access to private hostnames](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/#google-chrome-restricts-access-to-private-hostnames) for next steps.

## 2026-08-10


**Stream live logs from Cloudflare Tunnel in the dashboard**

Real-time Tunnel log streaming is now available in the Cloudflare dashboard under **Networking** \> **Tunnels**. This brings the same live debugging capability previously only available in the Cloudflare One dashboard, including multi-connector aggregated streaming for high-availability deployments.

![Stream live logs from a tunnel in the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=948,format=webp/_astro/tunnel-live-logs-core-dashboard.Dtm7Jg51.gif)

In the tunnel detail view, a new **Live logs** tab lets you:

* **Stream logs from single or multiple connectors** — In [highly available](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) deployments with multiple `cloudflared` replicas, logs from all connectors are merged into a single stream grouped by hostname, making it easy to identify which host machine produced each log entry.
* **Filter by log level, event type, and HTTP method** — Narrow the stream to only the events you care about (HTTP, TCP, UDP, or `cloudflared` internal), at any log level.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)

For more information, refer to [Monitor tunnels](https://developers.cloudflare.com/tunnel/monitoring/#remote-log-streaming) and [Tunnel log streams](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/).

## 2026-07-09


**Zero Trust Networks route endpoints and Cloudflare Tunnel connections field retiring on October 5, 2026**

On **October 5, 2026**, two changes take effect across the [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) and [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/): the CIDR-encoded route endpoints are removed, and tunnel list and get responses no longer include the `connections` field. If you manage private network routes or read tunnel connection details through the API, `cloudflared`, Terraform, or another integration, review the changes in the following sections and migrate before the removal date.

#### Route endpoints

The CIDR-encoded route endpoints are deprecated in favor of the standard, `route_id`\-based endpoints that already exist today. Both sets of endpoints route a private network through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) or [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) (the API still refers to Mesh nodes as `warp_connector`) — only the request shape changes.

**Deprecated endpoints (removed October 5, 2026):**

* Create a tunnel route (CIDR Endpoint): [POST /accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/subresources/networks/methods/create/)
* Update a tunnel route (CIDR Endpoint): [PATCH /accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/subresources/networks/methods/edit/)
* Delete a tunnel route (CIDR Endpoint): [DELETE /accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/subresources/networks/methods/delete/)

**Replacement endpoints:**

* Create a tunnel route: [POST /accounts/{account\_id}/teamnet/routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/create/)
* Update a tunnel route: [PATCH /accounts/{account\_id}/teamnet/routes/{route\_id}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/edit/)
* Delete a tunnel route: [DELETE /accounts/{account\_id}/teamnet/routes/{route\_id}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/delete/)

#### What is changing

|                  | Deprecated (CIDR-encoded path)                                 | Replacement                                                         |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Route identifier | URL-encoded CIDR in the path (/network/{ip\_network\_encoded}) | route\_id in the path (network moves to the request body on create) |
| Create           | POST .../teamnet/routes/network/{ip\_network\_encoded}         | POST .../teamnet/routes with network and tunnel\_id in the body     |
| Update           | PATCH .../teamnet/routes/network/{ip\_network\_encoded}        | PATCH .../teamnet/routes/{route\_id}                                |
| Delete           | DELETE .../teamnet/routes/network/{ip\_network\_encoded}       | DELETE .../teamnet/routes/{route\_id}                               |

#### Action required

1. Capture each route's `route_id` by calling [List tunnel routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/), or read it from the response the first time you create a route with the replacement endpoint.
2. Update any scripts, backend services, or CI/CD pipelines that call the CIDR-encoded endpoints directly.
3. If you manage routes with the `cloudflared tunnel route ip add | delete` commands, upgrade `cloudflared` to the [latest version ↗](https://github.com/cloudflare/cloudflared/releases).
4. If you manage routes with Terraform, make sure you are on a current version of the [cloudflare\_zero\_trust\_tunnel\_cloudflared\_route ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Ftunnel%5Fcloudflared%5Froute) resource and the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

```bash
# Before: create a route by URL-encoding the CIDR into the path
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/network/172.16.0.0%2F16 \
     -H 'Content-Type: application/json' \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -d '{"tunnel_id": "'$TUNNEL_ID'", "comment": "Example comment for this route."}'

# After: create a route with the network in the request body
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes \
     -H 'Content-Type: application/json' \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -d '{"network": "172.16.0.0/16", "tunnel_id": "'$TUNNEL_ID'", "comment": "Example comment for this route."}'

# After: update or delete a route using its route_id
curl -X PATCH https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/$ROUTE_ID \
     -H 'Content-Type: application/json' \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -d '{"comment": "Updated comment for this route."}'

curl -X DELETE https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/$ROUTE_ID \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Cloudflare Tunnel and Cloudflare Mesh connections

Starting the same day, the `connections` array is removed from list and get responses for [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes (the `cfd_tunnel` and `warp_connector` API resources). Query the dedicated connections endpoint instead of reading the field off the tunnel or node object.

This affects:

* [GET /accounts/{account\_id}/cfd\_tunnel](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/methods/list/) — `connections` removed from each item in `result`
* [GET /accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/methods/get/) — `connections` removed from `result`
* [GET /accounts/{account\_id}/warp\_connector](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/warp%5Fconnector/methods/list/) — `connections` removed from each item in `result`
* [GET /accounts/{account\_id}/warp\_connector/{tunnel\_id}](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/warp%5Fconnector/methods/get/) — `connections` removed from `result`

#### Action required

Fetch connection details from the tunnel-specific connections endpoint instead of parsing it off the list or get response. For Cloudflare Tunnel, call [GET /accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connections](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/subresources/connections/methods/get/). For Cloudflare Mesh, call [GET /accounts/{account\_id}/warp\_connector/{tunnel\_id}/connections](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/warp%5Fconnector/subresources/connections/methods/get/).

```bash
# Before: read connections off the tunnel object
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"

# After: query connections directly
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connections \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Update any dashboards, monitoring scripts, or automation that parses `connections` from the tunnel list or get response. `cloudflared` and the Cloudflare Terraform provider do not read this field, so no changes are required on their side for this part of the update.

#### Why we are making these changes

* **Smaller, faster responses.** Cloudflare Tunnel and Cloudflare Mesh nodes with many connections no longer inflate every list and get call — connection detail is only fetched when you need it.
* **A single way to identify a route.** Consolidating on `route_id` removes the need to URL-encode CIDR ranges into the path and matches how every other resource in the Zero Trust Networks API is addressed.
* **Consistency across the API.** Both changes align these endpoints with Cloudflare's standard REST conventions for resource identifiers and nested detail endpoints.

To learn more, refer to the [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/), the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/), and [Routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/) documentation.

## 2026-06-19


**Manage all your routes from one page in the dashboard**

The **Routes** page in the Cloudflare dashboard now shows the routes across all of your connectors — [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) and [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) routes alongside [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) and [Magic Transit](https://developers.cloudflare.com/magic-transit/) static routes — in a single table, instead of a separate routes view per product.

![The unified Routes page in the Cloudflare dashboard, showing routes across connectors in a single table](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=948,format=webp/_astro/2026-06-19-unified-routes.B3igBY20.gif)

From the unified Routes page you can:

* **Visualize your network with an interactive map** that shows how your destinations flow through to your connectors — including equal-cost multi-path (ECMP) routes where the same prefix is served by several connectors. Select a node to filter the table down to the routes behind it.
* **See every route in one table**, with its destination, type, connector, priority, and source, and filter or sort to find what you need.
* **Create, edit, and delete routes** of any supported type without leaving the page. When adding a Cloudflare WAN or Magic Transit static route, you now pick the next hop by **connector name** instead of typing its IP.
* **Manage [virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/)** from a dedicated tab.
* **Test a route** to see which connector and next hop a destination resolves to before you commit a change.

To find it, go to **Networking** \> **Routes** in the dashboard sidebar.

[Go to **Routes** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)

Your existing routes, APIs, and configurations are unchanged — this is a dashboard experience that brings them together in one place. Learn how to [add routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/) and [manage virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/).

## 2026-05-27


**Cloudflare Tunnel now runs connectivity pre-checks at startup**

Starting with [cloudflared version 2026.5.2 ↗](https://github.com/cloudflare/cloudflared/releases), [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) automates the entire [connectivity pre-checks workflow](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/) directly inside the binary. Previously, customers had to install `dig` and `netcat` and run those commands by hand to verify their environment. Now `cloudflared` does it natively at startup — and surfaces actionable remediation when something is blocked.

![cloudflared connectivity pre-checks output](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=1012,format=webp/_astro/cloudflared-connectivity-prechecks.DRwN6tGe.gif)

On every `cloudflared tunnel run` (and `cloudflared tunnel diag`), the binary now natively checks:

* **DNS resolution** — `region1.v2.argotunnel.com` and `region2.v2.argotunnel.com` resolve to valid Cloudflare IPs.
* **Transport connectivity** — outbound `UDP (QUIC)` and `TCP (HTTP/2)` on port `7844`.
* **Management API** — outbound `TCP/443` to `api.cloudflare.com` for software updates.

Results are printed in a scannable CLI table with three states:

* ✅ **Pass** — the check succeeded.
* ⚠️ **Warn** — a non-blocking issue, for example the Management API is unreachable so automatic updates will not work, but the tunnel will still come up.
* ❌ **Fail** — a blocking issue, with a specific remediation hint (for example, `Allow outbound UDP on port 7844`).

If DNS is unresolvable, or **both** UDP and TCP fail on port 7844, `cloudflared` exits early with the failure rather than looping on opaque `failed to dial` errors.

Pre-checks now run automatically on every start, which also catches regressions like overnight firewall policy changes — no need to remember to rerun the troubleshooting guide.

To get the new behavior, upgrade `cloudflared` to version `2026.5.2` or later. For more details, refer to the [Connectivity pre-checks documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## 2026-05-21


**Granular permissions for Cloudflare Tunnel and Cloudflare Mesh**

You can now scope Cloudflare permissions to individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes. Administrators can delegate access to specific Tunnels or Mesh nodes without granting account-wide control over private networking.

#### What is new

When you [add a member](https://developers.cloudflare.com/fundamentals/manage-members/manage/) or create a [permission policy](https://developers.cloudflare.com/fundamentals/manage-members/policies/), the resource picker now lists [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes as scopable resource types. You can:

* Grant a read-only role on a single Cloudflare Tunnel instance to a support operator for log streaming and diagnostics — without exposing other Tunnels or destructive actions.
* Grant a write role on a specific Cloudflare Mesh node to an application team — without giving them access to the rest of your private network.
* Scope a single policy to one or many Tunnels and Mesh nodes at once.

#### How it works

Granular permissions are a parallel layer to existing account-level roles — they do not replace them.

* **Existing account-level roles continue to work.** A member with `Cloudflare Access` or `Cloudflare Zero Trust` retains write access to every Tunnel and Mesh node in the account. This ensures backward compatibility for existing automation and tokens.
* **Granular permissions are additive.** For any API request on a specific Tunnel or Mesh node, access is granted if the principal has **either** the account-level role **or** a granular permission for that resource.
* **Resource enumeration is authorization-aware.** Listing endpoints (`GET /accounts/{id}/cfd_tunnel`, `GET /accounts/{id}/warp_connector`) return only the resources the principal has at least read access to.

#### Get started

* Configure [granular permissions for Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/advanced/granular-permissions/).
* Configure [granular permissions for Cloudflare Tunnel and Cloudflare Mesh in Cloudflare One](https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/).
* Review the [resource-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) on the Cloudflare role reference.

## 2026-03-20


**Stream logs from multiple replicas of Cloudflare Tunnel simultaneously**

In the Cloudflare One dashboard, the overview page for a specific Cloudflare Tunnel now shows all [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) of that tunnel and supports streaming logs from multiple replicas at once.

![View replicas and stream logs from multiple connectors](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=1040,format=webp/_astro/tunnel-multiconn.DEOEaLlu.gif)

Previously, you could only stream logs from one replica at a time. With this update:

* **Replicas on the tunnel overview** — All active replicas for the selected tunnel now appear on that tunnel's overview page under **Connectors**. Select any replica to stream its logs.
* **Multi-connector log streaming** — Stream logs from multiple replicas simultaneously, making it easier to correlate events across your infrastructure during debugging or incident response. To try it out, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and go to **Networks** \> **Connectors** \> **Cloudflare Tunnels**. Select **View logs** next to the tunnel you want to monitor.

For more information, refer to [Tunnel log streams](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) and [Deploy replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/).

## 2026-03-19


**Manage Cloudflare Tunnels with Wrangler**

You can now manage [Cloudflare Tunnels](https://developers.cloudflare.com/tunnel/) directly from [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the CLI for the Cloudflare Developer Platform. The new [wrangler tunnel](https://developers.cloudflare.com/workers/wrangler/commands/tunnel/) commands let you create, run, and manage tunnels without leaving your terminal.

![Wrangler tunnel commands demo](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=1094,format=webp/_astro/wrangler-tunnel.DOqrtGGg.gif)

Available commands:

* `wrangler tunnel create` — Create a new remotely managed tunnel.
* `wrangler tunnel list` — List all tunnels in your account.
* `wrangler tunnel info` — Display details about a specific tunnel.
* `wrangler tunnel delete` — Delete a tunnel.
* `wrangler tunnel run` — Run a tunnel using the cloudflared daemon.
* `wrangler tunnel quick-start` — Start a free, temporary tunnel without an account using [Quick Tunnels](https://developers.cloudflare.com/tunnel/setup/#quick-tunnels-development).

Wrangler handles downloading and managing the [cloudflared](https://developers.cloudflare.com/tunnel/downloads/) binary automatically. On first use, you will be prompted to download `cloudflared` to a local cache directory.

These commands are currently experimental and may change without notice.

To get started, refer to the [Wrangler tunnel commands documentation](https://developers.cloudflare.com/workers/wrangler/commands/tunnel/).

## 2026-02-20


**Manage Cloudflare Tunnel directly from the main Cloudflare Dashboard**

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is now available in the main Cloudflare Dashboard at [Networking > Tunnels ↗](https://dash.cloudflare.com/?to=/:account/tunnels), bringing first-class Tunnel management to developers using Tunnel for securing origin servers.

![Manage Tunnels in the Core Dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1800,height=894,format=webp/_astro/tunnel-core-dashboard.BGPqaHfo.gif)

This new experience provides everything you need to manage Tunnels for [public applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/), including:

* **Full Tunnel lifecycle management**: Create, configure, delete, and monitor all your Tunnels in one place.
* **Native integrations**: View Tunnels by name when configuring [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and [Workers VPC](https://developers.cloudflare.com/workers-vpc/) — no more copy-pasting UUIDs.
* **Real-time visibility**: Monitor [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) and Tunnel [health status](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status) directly in the dashboard.
* **Routing map**: Manage all ingress routes for your Tunnel, including [public applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/), [private hostnames](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/), [private CIDRs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/), and [Workers VPC services](https://developers.cloudflare.com/workers-vpc/), from a single interactive interface.

#### Choose the right dashboard for your use case

**Core Dashboard**: Navigate to [Networking > Tunnels ↗](https://dash.cloudflare.com/?to=/:account/tunnels) to manage Tunnels for:

* Securing origin servers and [public applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) with CDN, WAF, Load Balancing, and DDoS protection
* Connecting [Workers to private services](https://developers.cloudflare.com/workers-vpc/) via Workers VPC

**Cloudflare One Dashboard**: Navigate to [Zero Trust > Networks > Connectors ↗](https://one.dash.cloudflare.com/?to=/:account/networks/connectors) to manage Tunnels for:

* Securing your public applications with [Zero Trust access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
* Connecting users to [private applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/)
* Building a [private mesh network](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-networks)

Both dashboards provide complete Tunnel management capabilities — choose based on your primary workflow.

#### Get started

New to Tunnel? Learn how to [get started with Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or explore advanced use cases like [securing SSH servers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/) or [running Tunnels in Kubernetes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/kubernetes/).

## 2026-01-15


**Verify WARP Connector connectivity with a simple ping**

We have made it easier to validate connectivity when deploying [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) as part of your [software-defined private network](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-networks).

You can now `ping` the WARP Connector host directly on its LAN IP address immediately after installation. This provides a fast, familiar way to confirm that the Connector is online and reachable within your network before testing access to downstream services.

Starting with [version 2025.10.186.0](https://developers.cloudflare.com/changelog/2026-01-13-warp-linux-ga/), WARP Connector responds to traffic addressed to its own LAN IP, giving you immediate visibility into Connector reachability.

Learn more about deploying [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) and building private network connectivity with [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/).

## 2025-11-11


**cloudflared proxy-dns command will be removed starting February 2, 2026**

Starting February 2, 2026, the `cloudflared proxy-dns` command will be removed from all new `cloudflared` [releases](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).

This change is being made to enhance security and address a potential vulnerability in an underlying DNS library. This vulnerability is specific to the `proxy-dns` command and does not affect any other `cloudflared` features, such as the core [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) service.

The `proxy-dns` command, which runs a client-side [DNS-over-HTTPS (DoH)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) proxy, has been an officially undocumented feature for several years. This functionality is fully and securely supported by our actively developed products.

Versions of `cloudflared` released before this date will not be affected and will continue to operate. However, note that our [official support policy](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#deprecated-releases) for any `cloudflared` release is one year from its release date.

#### Migration paths

We strongly advise users of this undocumented feature to migrate to one of the following officially supported solutions before February 2, 2026, to continue benefiting from secure [DNS-over-HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/).

#### End-user devices

The preferred method for enabling DNS-over-HTTPS on user devices is the [Cloudflare WARP client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). The WARP client automatically secures and proxies all DNS traffic from your device, integrating it with your organization's [Zero Trust policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) and [posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

#### Servers, routers, and IoT devices

For scenarios where installing a client on every device is not possible (such as servers, routers, or IoT devices), we recommend using the [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/).

Instead of running `cloudflared proxy-dns` on a machine, you can install the WARP Connector on a single Linux host within your private network. This connector will act as a gateway, securely routing all DNS and network traffic from your [entire subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) to Cloudflare for [filtering and logging](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

## 2025-09-18


**Connect and secure any private or public app by hostname, not IP — with hostname routing for Cloudflare Tunnel**

You can now route private traffic to [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) based on a hostname or domain, moving beyond the limitations of IP-based routing. This new capability is **free for all Cloudflare One customers**.

Previously, Tunnel routes could only be defined by IP address or [CIDR range](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/). This created a challenge for modern applications with dynamic or ephemeral IP addresses, often forcing administrators to maintain complex and brittle IP lists.

![Hostname-based routing in Cloudflare Tunnel](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1990,height=530,format=webp/_astro/tunnel-hostname-routing.DSi8MP_7.webp)

**What’s new:**

* **Hostname & Domain Routing**: Create routes for individual hostnames (e.g., `payroll.acme.local`) or entire domains (e.g., `*.acme.local`) and direct their traffic to a specific Tunnel.
* **Simplified Zero Trust Policies**: Build resilient policies in Cloudflare Access and Gateway using stable hostnames, making it dramatically easier to apply per-resource authorization for your private applications.
* **Precise Egress Control**: Route traffic for public hostnames (e.g., `bank.example.com`) through a specific Tunnel to enforce a dedicated source IP, solving the IP allowlist problem for third-party services.
* **No More IP Lists**: This feature makes the workaround of maintaining dynamic IP Lists for Tunnel connections obsolete.

Get started in the Tunnels section of the Zero Trust dashboard with your first [private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) or [public hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/) route.

Learn more in our [blog post ↗](https://blog.cloudflare.com/tunnel-hostname-routing/).

## 2025-09-02


**Cloudflare Tunnel and Networks API will no longer return deleted resources by default starting December 1, 2025**

Starting **December 1, 2025**, list endpoints for the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/) and [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) will no longer return deleted tunnels, routes, subnets and virtual networks by default. This change makes the API behavior more intuitive by only returning active resources unless otherwise specified.

No action is required if you already explicitly set `is_deleted=false` or if you only need to list active resources.

This change affects the following API endpoints:

* List all tunnels: [GET /accounts/{account\_id}/tunnels](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/methods/list/)
* List [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/): [GET /accounts/{account\_id}/cfd\_tunnel](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/methods/list/)
* List [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) tunnels: [GET /accounts/{account\_id}/warp\_connector](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/warp%5Fconnector/methods/list/)
* List tunnel routes: [GET /accounts/{account\_id}/teamnet/routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/)
* List subnets: [GET /accounts/{account\_id}/zerotrust/subnets](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/methods/list/)
* List virtual networks: [GET /accounts/{account\_id}/teamnet/virtual\_networks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/virtual%5Fnetworks/methods/list/)

#### What is changing?

The default behavior of the `is_deleted` query parameter will be updated.

| Scenario                         | Previous behavior (before December 1, 2025)                                | New behavior (from December 1, 2025)                                  |
| -------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| is\_deleted parameter is omitted | Returns **active & deleted** tunnels, routes, subnets and virtual networks | Returns **only active** tunnels, routes, subnets and virtual networks |

#### Action required

If you need to retrieve deleted (or all) resources, please update your API calls to explicitly include the `is_deleted` parameter before **December 1, 2025**.

To get a list of only deleted resources, you must now explicitly add the `is_deleted=true` query parameter to your request:

```bash
# Example: Get ONLY deleted Tunnels
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tunnels?is_deleted=true" \
     -H "Authorization: Bearer $API_TOKEN"

# Example: Get ONLY deleted Virtual Networks
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks?is_deleted=true" \
     -H "Authorization: Bearer $API_TOKEN"
```

Following this change, retrieving a complete list of both active and deleted resources will require two separate API calls: one to get active items (by omitting the parameter or using `is_deleted=false`) and one to get deleted items (`is_deleted=true`).

#### Why we’re making this change

This update is based on user feedback and aims to:

* **Create a more intuitive default:** Aligning with common API design principles where list operations return only active resources by default.
* **Reduce unexpected results:** Prevents users from accidentally operating on deleted resources that were returned unexpectedly.
* **Improve performance:** For most users, the default query result will now be smaller and more relevant.

To learn more, please visit the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/) and [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) documentation.

## 2025-07-15


**Faster, more reliable UDP traffic for Cloudflare Tunnel**

Your real-time applications running over [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) are now faster and more reliable. We've completely re-architected the way `cloudflared` proxies UDP traffic in order to isolate it from other traffic, ensuring latency-sensitive applications like private DNS are no longer slowed down by heavy TCP traffic (like file transfers) on the same Tunnel.

This is a foundational improvement to Cloudflare Tunnel, delivered automatically to all customers. There are no settings to configure — your UDP traffic is already flowing faster and more reliably.

**What’s new:**

* **Faster UDP performance**: We've significantly reduced the latency for establishing new UDP sessions, making applications like private DNS much more responsive.
* **Greater reliability for mixed traffic**: UDP packets are no longer affected by heavy TCP traffic, preventing timeouts and connection drops for your real-time services.

Learn more about running [TCP or UDP applications](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-applications) and [private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## 2024-12-19


**Troubleshoot tunnels with diagnostic logs**

The latest `cloudflared` build [2024.12.2 ↗](https://github.com/cloudflare/cloudflared/releases/tag/2024.12.2) introduces the ability to collect all the diagnostic logs needed to troubleshoot a `cloudflared` instance.

A diagnostic report collects data from a single instance of `cloudflared` running on the local machine and outputs it to a `cloudflared-diag` file.

For more information, refer to [Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/tunnel/changelog/#page","headline":"Changelog · Cloudflare Docs","description":"Review recent changes to Cloudflare Tunnel.","url":"https://developers.cloudflare.com/tunnel/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
