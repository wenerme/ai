---
description: Get started in Zero Trust networking.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Sep 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Set up Cloudflare Mesh so your devices and servers can reach each other by private IP.

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization) with an active subscription, including the Free plan
* A laptop or phone to connect as a client device
* (Optional) A Linux server to deploy a Mesh node
Linux server requirements

| **OS version**             | RHEL 9 [1](#user-content-fn-1), RHEL 10, Debian 12, Debian 13, Fedora 43, Fedora 44, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, Ubuntu 26.04 LTS |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                                                                                         |
| **HD space**               | 75 MB                                                                                                                                     |
| **Memory**                 | 35 MB                                                                                                                                     |
| **Network interface type** | Wi-Fi or LAN                                                                                                                              |
| **MTU**                    | 1381 bytes recommended [2](#user-content-fn-2)                                                                                            |
## Footnotes

  1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗](https://docs.fedoraproject.org/en-US/epel/) repository (`sudo dnf install epel-release`) before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. [↩](#user-content-fnref-1)
  2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)
Mesh nodes are optional
Client-to-client connectivity works without any Mesh nodes. Two enrolled laptops can reach each other directly by Mesh IP. Mesh nodes are for running the client in headless mode on a server — either to make that server reachable by its Mesh IP, or to [route traffic to a private subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) behind it. Configure the [required account settings](#required-account-settings) before connecting participants. You can use the dashboard wizard, APIs, or Terraform.

Cloudflare Mesh requires that the Mesh node's [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) is configured to use [MASQUE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/#protocol-requirement). Hostname routes, IPv6 CIDR routes, and high availability do not work if the device profile uses WireGuard instead.

## Choose a participant type

Choose an enrollment method based on what you want to connect:

| Goal                                                  | Participant type                                                                                                                                                        | Enrollment method                               | Browser required |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------- |
| Run a service or route a subnet from Linux            | [Mesh node](#1-configure-mesh)                                                                                                                                          | Connector token                                 | No               |
| Connect an unattended Windows, macOS, or Linux device | [Headless client device](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/#headless-windows-macos-and-linux-devices) | Service token and managed deployment parameters | No               |
| Connect a user device with identity                   | [Client device](#2-connect-a-client-device)                                                                                                                             | Interactive identity provider enrollment        | Yes              |

## 1\. Configure Mesh

Choose the dashboard wizard or API and Terraform resources.

The setup wizard [configures your account for Mesh networking](#required-account-settings) and optionally guides you through creating a Mesh node. This is a one-time setup.

1. In the Cloudflare dashboard, go to **Networking** \> **Mesh**.
[Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. Select **Add a node**.
3. Enter a name for your node (for example, `web-server` or `staging-db`).
4. Select **Create node**.
5. (Optional) If you have a Linux server, run the install commands shown in the dashboard to bring the node online. If you do not have a server ready, select **I'll connect later** — you can install the node at any time from the node detail page.
Installation commands
IP forwarding is not required to reach the node by its Mesh IP. If the node will advertise [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/), enable persistent forwarding before connecting it:
```sh
printf 'net.ipv4.ip_forward = 1\nnet.ipv6.conf.all.forwarding = 1\nnet.ipv6.conf.all.accept_ra = 2\n' | sudo tee /etc/sysctl.d/99-zzz-cloudflare-warp-connector.conf &&
sudo sysctl --system
```
```sh
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg &&
echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(. /etc/os-release && echo $VERSION_CODENAME) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list &&
sudo apt-get update -qq && sudo apt-get install -y -qq cloudflare-warp
```
```sh
sudo warp-cli --accept-tos connector new <TOKEN> && sudo warp-cli --accept-tos connect
```
On RHEL 9 and later, enable the Extra Packages for Enterprise Linux (EPEL) repository before installing `cloudflare-warp`. EPEL provides dependencies required by the Cloudflare One Client UI:
```sh
sudo dnf install -y epel-release
```
Then install the package:
```sh
curl -fsSl https://pkg.cloudflareclient.com/cloudflare-warp-ascii.repo | sudo tee /etc/yum.repos.d/cloudflare-warp.repo &&
sudo yum install -y cloudflare-warp
```
```sh
sudo warp-cli --accept-tos connector new <TOKEN> && sudo warp-cli --accept-tos connect
```
6. Select **View node details** to complete the setup wizard.

If you installed the node, it should appear as **Online** on the Mesh overview page along with its assigned **Mesh IP**. If the node does not come online, refer to [Troubleshooting](#troubleshooting).

The dashboard wizard is not required. After account bootstrap, APIs and Terraform can automate the supported Mesh resources. You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/), Zero Trust team name, `jq`, and an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with permissions for the resources you configure.

Initial API token

You must create the initial API token in the dashboard. An authorized token can [create subsequent user-owned or account-owned tokens through the API](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/).

Before continuing, configure every item in [Required account settings](#required-account-settings). The examples in this section configure the Mesh node device profile, node, and connector token. You must configure device enrollment and global settings separately. **Allow all Cloudflare One traffic to reach enrolled devices** and the ICMP Gateway proxy require dashboard configuration.

Before connecting a node, create a safe Include-mode profile. This request requires the `Zero Trust Write` permission. It matches Mesh nodes, uses MASQUE in Traffic and DNS mode, and routes only the Mesh IP range through Cloudflare:

```bash
set -euo pipefail

PROFILE_RESPONSE=$(
	curl --fail-with-body --silent --show-error \
		"https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy" \
		--request POST \
		--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
		--header "Content-Type: application/json" \
		--data "$(jq -n \
			--arg match "identity.email == \"warp_connector@$TEAM_NAME.cloudflareaccess.com\"" \
			'{
				name: "Cloudflare Mesh nodes",
				description: "Route Mesh IP traffic through Cloudflare",
				enabled: true,
				precedence: 100,
				match: $match,
				service_mode_v2: {mode: "warp"},
				tunnel_protocol: "masque",
				include: [{address: "100.96.0.0/12", description: "Cloudflare Mesh IPs"}]
			}')"
)

jq -e '.success == true and (.result.id | type == "string")' \
	<<< "$PROFILE_RESPONSE" > /dev/null
PROFILE_ID=$(jq -r '.result.id' <<< "$PROFILE_RESPONSE")
```

Set `ACCOUNT_ID`, `TEAM_NAME`, and `CLOUDFLARE_API_TOKEN` in the shell before running the command. Use an unused `precedence` value that places this profile before broader profiles. Do not add an `exclude` field. A device profile cannot contain both `include` and `exclude`.

The API response uses the standard `success`, `errors`, `messages`, and `result` fields. A non-2xx response causes `curl` to fail. A response with `success: false` or without `result.id` causes `jq` to fail. Do not continue until the command returns zero and `PROFILE_ID` is set.

The following requests require an API token with either `Cloudflare One Connectors Write` or `Cloudflare One Connector: WARP Write` permission. To create a Mesh node and retrieve its connector token:

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

The commands stop on an HTTP or API error. Do not continue until they return zero and set `NODE_ID` and `MESH_NODE_TOKEN`. If token retrieval fails after node creation, retry only the token request with the existing `NODE_ID`. Do not rerun the node creation request.

Install the node and replace `<TOKEN>` with the value of `MESH_NODE_TOKEN`:

IP forwarding is not required to reach the node by its Mesh IP. If the node will advertise [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/), enable persistent forwarding before connecting it:

```sh
printf 'net.ipv4.ip_forward = 1\nnet.ipv6.conf.all.forwarding = 1\nnet.ipv6.conf.all.accept_ra = 2\n' | sudo tee /etc/sysctl.d/99-zzz-cloudflare-warp-connector.conf &&
sudo sysctl --system
```

```sh
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg &&
echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(. /etc/os-release && echo $VERSION_CODENAME) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list &&
sudo apt-get update -qq && sudo apt-get install -y -qq cloudflare-warp
```

```sh
sudo warp-cli --accept-tos connector new <TOKEN> && sudo warp-cli --accept-tos connect
```

On RHEL 9 and later, enable the Extra Packages for Enterprise Linux (EPEL) repository before installing `cloudflare-warp`. EPEL provides dependencies required by the Cloudflare One Client UI:

```sh
sudo dnf install -y epel-release
```

Then install the package:

```sh
curl -fsSl https://pkg.cloudflareclient.com/cloudflare-warp-ascii.repo | sudo tee /etc/yum.repos.d/cloudflare-warp.repo &&
sudo yum install -y cloudflare-warp
```

```sh
sudo warp-cli --accept-tos connector new <TOKEN> && sudo warp-cli --accept-tos connect
```

You can also manage nodes with the [cloudflare\_zero\_trust\_tunnel\_warp\_connector ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Ftunnel%5Fwarp%5Fconnector) resource. Use [cloudflare\_zero\_trust\_tunnel\_warp\_connector\_config ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Ftunnel%5Fwarp%5Fconnector%5Fconfig) to manage node configuration.

## 2\. Connect a client device

Connect a laptop or phone to your Mesh network:

### Windows, macOS, and Linux

To enroll your device using the client GUI:

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.
2. Launch the Cloudflare One Client.
3. On the **What would you like to use the Cloudflare One Client for?** screen, select **Zero Trust security**.
4. Enter your team name.
5. Complete the authentication steps required by your organization.
Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.
6. Select **Open the Cloudflare One Client** to complete the registration.

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.
2. Launch the Cloudflare One Client.
3. Select the Cloudflare logo in the menu bar.
4. Select the gear icon.
5. Go to **Preferences** \> **Account**.
6. Select **Login with Cloudflare Zero Trust**.
7. Enter your team name.
8. Complete the authentication steps required by your organization.
Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.
9. Select **Open Cloudflare WARP.app** to complete the registration.

### iOS and Android

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Agent app.
2. Launch the Cloudflare One Agent app.
3. Select **Next**.
4. Review the privacy policy and select **Accept**.
5. Enter your team name.
6. Complete the authentication steps required by your organization.
7. After authenticating, select **Install VPN Profile**.
8. In the **Connection request** popup window, select **OK**.
9. If you did not enable [auto-connect ↗](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect), manually turn on the switch to **Connected**.

Once you see a **Connected** status, your device is on the mesh and receives its own Mesh IP.

## 3\. Test connectivity

From a Windows, macOS, or Linux client device, verify TCP connectivity to a Mesh node or another enrolled device. For example, test SSH:

```sh
nc -vz <MESH-IP> 22
```

```powershell
Test-NetConnection <MESH-IP> -Port 22
```

Replace `<MESH-IP>` with the Mesh IP shown on the Mesh overview page. Replace port `22` with the port used by your service. You can test HTTP services from a mobile browser. A connected client or healthy connector status does not verify peer connectivity. Verify the application protocol you intend to use. If you turned on the ICMP Gateway proxy, you can also run `ping <MESH-IP>` as a diagnostic check.

## Logs

Traffic from Mesh nodes appears in [Gateway activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) with the identity `warp_connector@<your-team-name>.cloudflareaccess.com`. Client device traffic appears in Gateway activity logs under the enrolled user's identity.

## Required account settings

The dashboard wizard configures the following Cloudflare One settings automatically for new deployments. Non-wizard deployments must configure the same settings:

| Setting                                                                                                                                                                                                                                                                                                                                                                                                                                                         | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Device enrollment policy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/)                                                                                                                                                                                                                                                                                                     | Allows devices to enroll into your Cloudflare One account using email-based [one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/). Only created if you do not already have an existing device enrollment policy in your account.                                                                                                                                                      |
| [Device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/)                                                                                                                                                                                                                                                                                                                  | Creates a profile configured with [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) in **Include mode**, so only Mesh traffic routes through Cloudflare. This prevents disrupting existing network connectivity on your server. Only created if you do not already have an active Mesh node (formerly WARP Connector) in your account. |
| [Allow all Cloudflare One traffic to reach enrolled devices](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-all-cloudflare-one-traffic-to-reach-enrolled-devices) and [Assign a unique IP address to each device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) | Enables device-to-device connectivity for Mesh networking.                                                                                                                                                                                                                                                                                                                                                                                     |
| [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/)                                                                                                                                                                                                                                                                                                                                                                       | Enables TCP and UDP proxying for Mesh services. ICMP proxying is optional and supports diagnostics such as ping and traceroute.                                                                                                                                                                                                                                                                                                                |

For automated deployments, the device profile documentation includes API and Terraform examples. Set `service_mode_v2 = { mode = "warp" }`, replace the generic example's `wireguard` protocol with `tunnel_protocol = "masque"`, and configure Split Tunnels to route `100.96.0.0/12` through Cloudflare. Match Mesh nodes with `identity.email == "warp_connector@<TEAM_NAME>.cloudflareaccess.com"`, and place this profile before broader profiles. The device enrollment documentation includes the Terraform enrollment-policy flow.

### Automated settings

The [cloudflare\_zero\_trust\_device\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fsettings) resource supports unique device IPs and the TCP and UDP Gateway proxies:

```tf
resource "cloudflare_zero_trust_device_settings" "mesh" {
	account_id                        = var.cloudflare_account_id
	use_zt_virtual_ip                 = true
	gateway_proxy_enabled             = true
	gateway_udp_proxy_enabled         = true
}
```

### Human-only settings

The Terraform resource does not configure **Allow all Cloudflare One traffic to reach enrolled devices** or the ICMP Gateway proxy. Before connecting participants, turn on enrolled-device reachability in the dashboard. Turn on ICMP only if you require `ping`, `traceroute`, or another ICMP-based workflow.

### Existing Cloudflare One accounts

If your account already has a Cloudflare One deployment, the setup wizard will not overwrite your existing configuration. Verify the following settings are enabled for Mesh to work:

* **Device enrollment** — At least one [enrollment rule](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) must exist so that devices and nodes can register with your account.
* **Device profile for Mesh nodes** — Your Mesh nodes need a [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) that routes the Mesh IP range (`100.96.0.0/12`) through Cloudflare. In Include mode, add the Mesh range. In Exclude mode, verify that no custom or legacy entry contains the Mesh range.
* **Mesh connectivity** — In your device profile settings, enable [Allow all Cloudflare One traffic to reach enrolled devices](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-all-cloudflare-one-traffic-to-reach-enrolled-devices).
* **Unique device IPs** — Enable [Assign a unique IP address to each device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) so that each participant gets a routable Mesh IP.
* **Client mode** — Mesh nodes must run in [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/). DNS-only or proxy-only modes are not supported.
* **Traffic proxying** — Turn on the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/) for the protocols you use. TCP and UDP carry Mesh services. ICMP supports diagnostic tools such as `ping` and `traceroute`.

## Troubleshooting

* **Node shows as Offline** — On the server, run `warp-cli status`. If the output does not show `Status update: Connected`:
  * Run `warp-cli connect`.
  * If your private network uses a firewall to restrict Internet traffic, ensure that it allows the [WARP ports and IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).
  * Review your [WARP daemon logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) for information about why the connection is failing.
* **Client device cannot reach Mesh IPs** — Verify that your Split Tunnel configuration routes the Mesh IP range (`100.96.0.0/12`) through Cloudflare. For details, refer to [Connect client devices](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/).
* **Windows firewall blocks Mesh traffic** — Windows Firewall blocks inbound traffic from `100.96.0.0/12` by default. Add a firewall rule that allows incoming requests from this range for your desired protocols and ports.

For general client issues, refer to [Troubleshoot the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/).

## Next steps

* [**Connect client devices**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/) — Platform-specific installation details, Split Tunnel configuration, and firewall considerations.
* [**Run in Docker / Kubernetes**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/containers/) — Deploy a Mesh node as a Docker container for Docker Compose, Kubernetes, and CI/CD pipelines.
* [**Add routes**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) — Make an entire subnet behind your node reachable (databases, printers, other servers).
* [**Enable high availability**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) — Run multiple replicas for production resilience.
* [**Tips and best practices**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/tips/) — Cloud VPC configuration, updating the client, running alongside cloudflared.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/#page","headline":"Get started with Cloudflare Mesh · Cloudflare One docs","description":"Get started in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
