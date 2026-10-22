---
description: Install a Cloudflare Mesh node on Debian, Ubuntu, or RHEL, and learn what each install command does.
title: Run Mesh on Linux
image: https://developers.cloudflare.com/mesh/guides/run-mesh-on-linux/og.png?v=5fb13a643703568c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/mesh/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Mesh on Linux

Last updated Oct 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/mesh/guides/run-mesh-on-linux/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A Mesh node is a Linux server that runs the Cloudflare One Client (`cloudflare-warp` package) in headless mode. The node joins your Mesh with its own Mesh IP. It can also [route traffic to a private subnet](https://developers.cloudflare.com/mesh/features/routes/) behind it.

Use this guide to install a Mesh node directly on a Linux host. To run a Mesh node without installing packages on the host, refer to [Run Mesh in Docker / Kubernetes](https://developers.cloudflare.com/mesh/guides/run-mesh-in-containers/).

## Supported distributions

Mesh nodes support the following Linux distributions and hardware:

| **OS version** | RHEL 9 <sup>[1](#user-content-fn-1)</sup>, RHEL 10, Debian 12, Debian 13, Fedora 43, Fedora 44, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, Ubuntu 26.04 LTS |
| --- | --- |
| **Processor** | AMD64 / x86-64 or ARM64 / AArch64 |
| **vCPU** | 3 minimum, 4 recommended |
| **RAM without a desktop** | 1 GB minimum, 2 GB recommended (for example, Ubuntu Server) |
| **RAM with a desktop** | 4 GB minimum, 8 GB recommended (for example, Ubuntu GNOME) |
| **Disk space** | 250 MiB minimum, 500 MiB recommended |
| **Network interface type** | Wi-Fi or LAN |
| **MTU** | 1381 bytes recommended <sup>[2](#user-content-fn-2)</sup> |

## Footnotes

1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗︎](https://docs.fedoraproject.org/en-US/epel/) repository before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. For the RHEL commands, refer to [Getting started with EPEL ↗︎](https://docs.fedoraproject.org/en-US/epel/getting-started/). [↩](#user-content-fnref-1)
2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)

Cloudflare One Client version 2026.6.822.0 and later support Cloudflare Mesh on RHEL 9 and RHEL 10. For support dates, refer to the [support lifecycle](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/support-lifecycle/#red-hat-enterprise-linux-rhel).

## Prerequisites

Before you install the client, create a Mesh node and get its token.

1. In the Cloudflare dashboard, go to **Networking** > **Mesh**. [Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. Select **Add participant** > **Add node**.
3. Enter a name for your node (for example, `web-server` or `staging-db`).
4. Select **Create node**.
5. Select **Debian / Ubuntu** or **RHEL**. The dashboard displays the install and registration commands for the node. The registration command includes the node token.

With an API token that has either `Cloudflare One Connectors Write` or `Cloudflare One Connector: WARP Write` permission, create a node and retrieve its connector token:

```bash
set -euo pipefail

NODE_RESPONSE=$(
	curl --fail-with-body --silent --show-error \
		"https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector" \
		--request POST \
		--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
		--header "Content-Type: application/json" \
		--data '{"name":"web-server"}'
)

jq -e '.success == true and (.result.id | type == "string")' \
	<<< "$NODE_RESPONSE" > /dev/null
NODE_ID=$(jq -r '.result.id' <<< "$NODE_RESPONSE")

TOKEN_RESPONSE=$(
	curl --fail-with-body --silent --show-error \
		"https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$NODE_ID/token" \
		--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
)

MESH_NODE_TOKEN=$(jq -er \
	'select(.success == true) | .result | select(type == "string" and length > 0)' \
	<<< "$TOKEN_RESPONSE")
```

Install `jq`, then set `ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` before running the commands. The commands stop on an HTTP or API error. Do not continue until they return zero and set `NODE_ID` and `MESH_NODE_TOKEN`. If token retrieval fails after node creation, retry only the token request with the existing `NODE_ID`. Do not rerun the node creation request.

Note

Mesh nodes can also be managed with Terraform using the [`cloudflare_zero_trust_tunnel_warp_connector` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_tunnel_warp_connector) resource. To manage node configuration, use [`cloudflare_zero_trust_tunnel_warp_connector_config` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_tunnel_warp_connector_config).

If this is your first Mesh node, configure the [required account settings](https://developers.cloudflare.com/mesh/get-started/#required-account-settings). The dashboard wizard configures them for new accounts.

MASQUE required

This feature requires that the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) of the Mesh node is configured to use [MASQUE](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol), the default protocol for the Cloudflare One Client. It does not work if the device profile uses WireGuard instead.

Caution

Treat the node token as a secret. Anyone with the token can register a host as this node. Do not commit tokens to source control or share them in tickets or chat.

## 1. Install the client

Install the `cloudflare-warp` package from the Cloudflare package repository. Choose the section for your distribution.

### Debian and Ubuntu

1. Add the Cloudflare package signing key:

   ```sh
   curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg
   ```

   `apt` uses this key to verify that packages come from Cloudflare.
2. Add the Cloudflare repository:

   ```sh
   echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(. /etc/os-release && echo $VERSION_CODENAME) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list
   ```

   The `$VERSION_CODENAME` variable resolves to your release codename (for example, `noble` or `trixie`). This selects the package build for your release.
3. Install the package:

   ```sh
   sudo apt-get update && sudo apt-get install -y cloudflare-warp
   ```

### RHEL

1. Enable the [Extra Packages for Enterprise Linux (EPEL) ↗︎](https://docs.fedoraproject.org/en-US/epel/) repository. EPEL provides dependencies that the Cloudflare One Client needs on RHEL 9 and later. EPEL packages can depend on the CodeReady Builder (CRB) repository, so turn on CRB first.

   The `epel-release` package is not in the default RHEL repositories. Turn on CodeReady Builder, then install the EPEL release package for your RHEL version:

   ```sh
   sudo subscription-manager repos --enable codeready-builder-for-rhel-$(rpm -E %rhel)-$(arch)-rpms &&
   sudo dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-$(rpm -E %rhel).noarch.rpm
   ```

   The `subscription-manager` command requires a host registered with Red Hat Subscription Management. On pay-as-you-go cloud images that use Red Hat Update Infrastructure (RHUI), the CodeReady Builder repository has a different name. Refer to your cloud provider's documentation to turn it on, then run the `dnf install` command.

   On RHEL-compatible distributions, such as Rocky Linux and AlmaLinux, `epel-release` is in the default repositories. Turn on CRB, then install it:

   ```sh
   sudo dnf config-manager --set-enabled crb &&
   sudo dnf install -y epel-release
   ```

2. Add the Cloudflare repository:

   ```sh
   curl -fsSL https://pkg.cloudflareclient.com/cloudflare-warp-ascii.repo | sudo tee /etc/yum.repos.d/cloudflare-warp.repo
   ```

   The repository file points `dnf` to the package build for your RHEL version and to the Cloudflare signing key.
3. Install the package:

   ```sh
   sudo dnf install -y cloudflare-warp
   ```

Note

Install from the repository instead of downloading the standalone `.rpm` file. The repository resolves dependencies such as `nss-tools`, which RHEL does not install by default.

Rocky Linux and AlmaLinux are not in [Supported distributions](#supported-distributions). Cloudflare does not test Mesh nodes on them.

## 2. Register and connect the node

To register the host as your Mesh node and connect it, run the following command. Replace `<MESH_NODE_TOKEN>` with the node token from the [prerequisites](#prerequisites).

```sh
sudo warp-cli --accept-tos connector new <MESH_NODE_TOKEN> && sudo warp-cli --accept-tos connect
```

This command runs two `warp-cli` subcommands:

| Command | Purpose |
| --- | --- |
| `connector new` | Registers the host as the Mesh node that the token identifies. It does not enroll a user device. |
| `connect` | Connects the node to Cloudflare. The client reconnects automatically after reboots. |
| `--accept-tos` flag | Accepts the Cloudflare One Client terms of service without an interactive prompt. |

If you use the same token on more than one host, each host joins as a replica of the same node. For more information, refer to [High availability](https://developers.cloudflare.com/mesh/features/high-availability/).

## 3. Verify the node

1. On the node, check the connection status:

   ```sh
   warp-cli status
   ```

   ```txt
   Status update: Connected
   ```

2. In the Cloudflare dashboard, go to **Networking** > **Mesh**. Confirm that the node shows as **Online**, and note its **Mesh IP**.
3. From an enrolled client device, test a service on the node. For example, to test SSH:

   ```sh
   nc -vz <MESH_IP> 22
   ```

   A **Connected** status does not prove that peers can reach the node. Test the application protocol you intend to use.

## Turn on IP forwarding for routes

IP forwarding lets the node pass packets between the Mesh and its local network. Turn it on only if the node will advertise [CIDR routes](https://developers.cloudflare.com/mesh/features/routes/) to make a subnet behind it reachable. You do not need it to reach the node by its own Mesh IP. You can turn it on at any time, before or after you connect the node.

To turn on forwarding and keep it across reboots, run:

```sh
printf 'net.ipv4.ip_forward = 1\nnet.ipv6.conf.all.forwarding = 1\nnet.ipv6.conf.all.accept_ra = 2\n' | sudo tee /etc/sysctl.d/99-zzz-cloudflare-warp-connector.conf &&
sudo sysctl --system
```

This command writes three kernel settings to a file in `/etc/sysctl.d/`, then reloads all settings:

| Setting | Purpose |
| --- | --- |
| `net.ipv4.ip_forward = 1` | Forwards IPv4 packets between interfaces. |
| `net.ipv6.conf.all.forwarding = 1` | Forwards IPv6 packets between interfaces. |
| `net.ipv6.conf.all.accept_ra = 2` | Keeps accepting IPv6 router advertisements after forwarding is on. Without it, the host can lose IPv6 routes. |

The `99-zzz-` prefix makes the file load last, so other files in `/etc/sysctl.d/` cannot override it.

If the host runs in a cloud VPC, you may also need provider settings, such as turning off source/destination checks on AWS. For more information, refer to [Cloud VPC deployments](https://developers.cloudflare.com/mesh/best-practices/#cloud-vpc-deployments).

## Manage the node

### Check status and reconnect

| Command | Purpose |
| --- | --- |
| `warp-cli status` | Shows the current connection status. |
| `warp-cli connect` | Reconnects the node. |
| `warp-cli disconnect` | Disconnects the node without deregistering. |
| `warp-cli --version` | Shows the installed client version. |

### Update the client

Updating the client briefly disconnects the node. If you run [high availability](https://developers.cloudflare.com/mesh/features/high-availability/) replicas, traffic fails over to a standby.

```sh
sudo apt-get update && sudo apt-get install --only-upgrade -y cloudflare-warp
```

```sh
sudo dnf upgrade -y cloudflare-warp
```

After the update, run `warp-cli status` to confirm the node reconnected.

### View logs

The client runs as the `warp-svc` systemd service. To view recent service logs, run:

```sh
sudo journalctl -u warp-svc --since "15 minutes ago"
```

To collect a full diagnostic bundle for Cloudflare support, run `warp-diag`. For more information, refer to [Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/).

### Remove the node

1. On the host, delete the registration:

   ```sh
   sudo warp-cli registration delete
   ```

2. Uninstall the package:

   ```sh
   sudo apt-get remove -y cloudflare-warp
   ```

   ```sh
   sudo dnf remove -y cloudflare-warp
   ```

3. (Optional) If you turned on IP forwarding for this node, remove the setting:

   ```sh
   sudo rm /etc/sysctl.d/99-zzz-cloudflare-warp-connector.conf && sudo sysctl --system
   ```

4. In the Cloudflare dashboard, go to **Networking** > **Mesh** and delete the node. Skip this step if other replicas still use the node.

## Troubleshooting

### The node shows as Offline

Run `warp-cli status` on the node. If the status is not `Connected`:

- Run `warp-cli connect`.
- Confirm that your firewall allows the [Cloudflare One Client ports and IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).
- Review the [service logs](#view-logs).

### The node registers as a regular client device

Confirm that you ran `warp-cli connector new` with a Mesh node token. If the host was enrolled as a user device before, run `sudo warp-cli registration delete`, then register it again with the node token.

### Routed subnets are not reachable

Confirm that [IP forwarding](#turn-on-ip-forwarding-for-routes) is on:

```sh
sysctl net.ipv4.ip_forward net.ipv6.conf.all.forwarding
```

Both values must be `1`. Then confirm that the destination network can route return traffic to the Mesh IP range (`100.96.0.0/12`). For more information, refer to [Return traffic routing](https://developers.cloudflare.com/mesh/features/routes/#return-traffic-routing).

### Package install fails on RHEL

Run `dnf repolist` and confirm that EPEL and CodeReady Builder (`crb` on Rocky Linux and AlmaLinux) are enabled. For more information, refer to the [EPEL getting started guide ↗︎](https://docs.fedoraproject.org/en-US/epel/getting-started/).

For general client issues, refer to [Troubleshoot the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/).

## Next steps

- [**Add routes**](https://developers.cloudflare.com/mesh/features/routes/) — Make subnets behind the node reachable from any participant on your Mesh.
- [**Enable high availability**](https://developers.cloudflare.com/mesh/features/high-availability/) — Run multiple replicas for production resilience.
- [**Tips and best practices**](https://developers.cloudflare.com/mesh/best-practices/) — Cloud VPC configuration, DNS servers, and running alongside Cloudflare Tunnel.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/mesh/guides/run-mesh-on-linux/#page","headline":"Run Mesh on Linux","description":"Install a Cloudflare Mesh node on Debian, Ubuntu, or RHEL, and learn what each install command does.","url":"https://developers.cloudflare.com/mesh/guides/run-mesh-on-linux/","inLanguage":"en","image":"https://developers.cloudflare.com/mesh/guides/run-mesh-on-linux/og.png?v=5fb13a643703568c","dateModified":"2026-10-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks","Linux"]}
```
