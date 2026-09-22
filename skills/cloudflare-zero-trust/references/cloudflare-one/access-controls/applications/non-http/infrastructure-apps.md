---
description: Add an infrastructure application in Access.
title: Add an infrastructure application
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Add an infrastructure application

Last updated Sep 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

<details>

<summary>

Feature availability

</summary>

| <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/">Client modes</a> | <a href="https://www.cloudflare.com/teams-pricing/">Zero Trust plans ↗</a> |
| --- | --- |
| <ul><li>Traffic and DNS mode</li><li>Traffic only mode</li></ul> | All plans |

| System | Availability |
| --- | --- |
| Windows | ✅ |
| macOS | ✅ |
| Linux | ✅ |
| iOS | ✅ |
| Android | ✅ |
| ChromeOS | ✅ |

</details>

Access for Infrastructure gives you granular control over how users access individual servers, clusters, or databases. You can configure how users authenticate to the resource and control the ports, protocols, and usernames they can use.

You can also organize targets with tags and define applications that match targets by hostname, tag, or both. Access logs and command logs help you audit access and support compliance workflows.

Note

Access for Infrastructure currently supports [SSH](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/). To connect using other protocols, [add a self-hosted private application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/). For browser-based SSH, RDP, or VNC, refer to [browser-rendered terminal](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/).

## Prerequisites

- [Connect your infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) to Cloudflare using `cloudflared` or Cloudflare Mesh.
- [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on user devices in Traffic and DNS mode.

## 1. Add a target

A target represents a single resource in your infrastructure (such as a server, Kubernetes cluster, database, or container) that users will connect to through Cloudflare.

Targets are protocol-agnostic, meaning that you do not need to define a new target for each protocol that runs on the server. To create a new target:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** > **Access controls** > **Targets**.
2. Select **Add a target**.
3. In **Target hostname**, enter a user-friendly name for the target. We recommend using the server hostname, for example `production-server`. The target hostname does not need to be unique and can be reused for multiple targets. Hostnames are used to define the targets secured by an Access application; they are not used for DNS address resolution.<details><summary>

   Hostname format restrictions</summary>

   - Case insensitive
   - Contain no more than 253 characters
   - Contain only alphanumeric characters, <code>-</code>, or <code>.</code> (no spaces allowed)
   - Start and end with an alphanumeric character</details>
4. In **IP addresses**, enter the IPv4 and/or IPv6 address of the target resource. The dropdown menu will not populate until you type in the full IP address.

Note

If the target IP does not appear in the dropdown, go to **Networking** > **Routes** and confirm that the IP routes through Cloudflare Tunnel.

5. In the dropdown menu, select the IP address and [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) where the resource is located. This IP address and virtual network pairing is now assigned to this target and cannot be reused in another target by design.
6. (Optional) In **Tags**, add key-value tags to organize your target. For example, use `environment`, `team`, or `region` to group targets and match them later in [target criteria](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#target-criteria). Each tag key can only appear once on a target. For example, a single target can have `environment:production` or `environment:staging`, but not both.
7. Select **Add target**.

Make a `POST` request to the [Infrastructure Access Targets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/create/) endpoint:

*Create new targetbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"hostname": "infra-access-target",
		"ip": {
				"ipv4": {
						"ip_addr": "187.26.29.249",
						"virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
				},
				"ipv6": {
						"ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
						"virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
				}
		},
		"tags": {
				"environment": "production",
				"team": "platform"
		}
	}'
```

The `tags` field is optional. Use [Resource Tagging](https://developers.cloudflare.com/resource-tagging/) to manage tags. Each key can only appear once per target.

Provider versions

The following example requires Cloudflare provider version `>=4.45.0`.

1. Add the following permission to your [`cloudflare_api_token` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/api_token):
   - `Zero Trust Write`
2. Configure the [`cloudflare_zero_trust_infrastructure_access_target` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/zero_trust_infrastructure_access_target) resource:

   ```tf
   resource "cloudflare_zero_trust_infrastructure_access_target" "infra-ssh-target" {
   	account_id = var.cloudflare_account_id
   		hostname   = "infra-access-target"
   		ip = {
   			ipv4 = {
   				ip_addr = "187.26.29.249"
   				virtual_network_id = "c77b744e-acc8-428f-9257-6878c046ed55"
   			}
   			ipv6 = {
   				ip_addr = "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0"
   				virtual_network_id = "c77b744e-acc8-428f-9257-6878c046ed55"
   			}
   		}
   }
   ```

   To manage tags with Terraform, use the [`cloudflare_resource_tag` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/resource_tag) resource.

Next, create an Access application to secure the target.

### Tag targets

You can attach key-value [resource tags](https://developers.cloudflare.com/resource-tagging/) to infrastructure targets. Use them to organize targets by environment, team, region, or other metadata.

You can then define infrastructure applications that automatically cover any target with matching values.

You can manage tags inline when you create or edit a target or through the [Resource Tagging API](https://developers.cloudflare.com/resource-tagging/how-to/manage-tags/).

Each tag key can only appear once on a target. For example, a target can have `environment:production` or `environment:staging`, but not both.

### Filter and sort targets by tag

You can filter and sort targets by tag values.

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** > **Access controls** > **Targets**. Use the filter and sort controls to narrow the list by tag key or value.

To filter targets by tag, add one or more `tag` query parameters:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets?tag=environment:production&tag=team:platform" \
  -H "Authorization: Bearer $API_TOKEN"
```

Use `:` between the tag key and value in each filter. If you add multiple `tag` parameters, Cloudflare applies AND logic.

To sort by tag key, use the `order` and `direction` parameters:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets?order=tag:environment&direction=asc" \
  -H "Authorization: Bearer $API_TOKEN"
```

The sort parameter also uses `:` in `order=tag:<key>` because it identifies the tag field to sort by.

## 2. Add an infrastructure application

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** > **Access controls** > **Applications**.
2. Select **Create new application**.
3. Select **Infrastructure**.
4. Enter any name for the application.
5. In **Target criteria**, choose which targets this application covers. Match targets by hostname, tag, or both. Use `include` to match any value. Use `require` to match all values. Use `exclude` to reject matching targets.
6. Enter the **Protocol** and **Port** that will be used to connect to the server.
7. (Optional) If a protocol runs on more than one port, select **Add new target criteria** and reconfigure the same target criteria and protocol with a different port number.

   Note

   Access for Infrastructure only supports assigning one protocol per port. You can reuse a port/protocol pairing across infrastructure applications, but the port cannot be reassigned to another protocol.
8. Select **Next**.
9. To secure your targets, configure a policy that defines who can connect and how they can connect:
   1. Enter any name for your policy.
   2. Create a rule that matches the users who are allowed to reach the targets. For more information, refer to [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and review the list of [infrastructure policy selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#infrastructure-policy-selectors).
   3. In **Connection context**, configure the following settings:
      - **SSH user**: Enter the UNIX usernames that users can log in as (for example, `root` or `ec2-user`).
      - **Allow users to log in as their email alias**: (Optional) When selected, users who match your policy definition will be able to access the target using their lowercased email address prefix. For example, `Jdoe@company.com` could log in as `jdoe`.

      Note

      Cloudflare will not create new users on the target. UNIX users must already be present on the server.
10. Select **Add application**.

Make a `POST` request to the [Access applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/methods/create/) endpoint:

The following example uses the operator-based target criteria format with `include`, `require`, and `exclude`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Access: Apps and Policies Write</code>

</details>

*Add an Access applicationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Example infrastructure app",
		"type": "infrastructure",
		"target_criteria": [
				{
						"port": 22,
						"protocol": "SSH",
						"include": {
								"target_attributes": {
										"hostname": [
												"infra-access-target"
										]
								},
								"tags": {
										"environment": [
												"production",
												"staging"
										]
								}
						},
						"require": {
								"tags": {
										"team": [
												"platform"
										]
								}
						},
						"exclude": {
								"tags": {
										"lifecycle": [
												"decommissioned"
										]
								}
						}
				}
		],
		"policies": [
				{
						"name": "Allow a specific email",
						"decision": "allow",
						"include": [
								{
										"email": {
												"email": "jdoe@company.com"
										}
								}
						],
						"connection_rules": {
								"ssh": {
										"usernames": [
												"root",
												"ec2-user"
										]
								}
						}
				}
		]
	}'
```

For more information about target criteria formats, refer to [Target criteria](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#target-criteria).

Provider versions

The following example requires Cloudflare provider version `>=4.45.0`.

1. Add the following permission to your [`cloudflare_api_token` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/api_token):
   - `Access: Apps and Policies Write`
2. Use the [`cloudflare_zero_trust_access_application` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/zero_trust_access_application) resource to create an infrastructure application:

   ```tf
   resource "cloudflare_zero_trust_access_application" "infra-app" {
   	account_id = var.cloudflare_account_id
   	name       = "Example infrastructure app"
   	type       = "infrastructure"

   	target_criteria {
   		port     = 22
   		protocol = "SSH"
   		target_attributes {
   			name = "hostname"
   			values = ["infra-access-target"]
   		}
   	}
   }
   ```

   To match targets by tag, define `include`, `require`, or `exclude` blocks with `tags` selectors.
3. Use the [`cloudflare_zero_trust_access_policy` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/zero_trust_access_policy) resource to add an infrastructure policy to the application:

   ```tf
   resource "cloudflare_zero_trust_access_policy" "infra-app-policy" {
   	application_id = cloudflare_zero_trust_access_application.infra-app.id
   	account_id = var.cloudflare_account_id
   	name       = "Allow a specific email"
   	decision   = "allow"
   	precedence = 1

   	include {
   		email = ["jdoe@company.com"]
   	}

   	connection_rules {
   		ssh {
   			usernames = ["root", "ec2-user"]
   		}
   	}
   }
   ```



The targets in this application are now secured by your infrastructure policies.

## 3. (Recommended) Modify order of precedence in Gateway

By default, Cloudflare will evaluate Access application policies after evaluating all [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/). To evaluate Access applications before or after specific Gateway policies:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** > **Traffic policies** > **Firewall policies**. In **Network**, [create a Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) with the following configuration:

   | Selector | Operator | Value | Action |
   | --- | --- | --- | --- |
   | Access Infrastructure Target | is | *Present* | Allow |
2. Update the policy's [order of precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence) using the dashboard or API.

This Gateway policy will apply to all Access for Infrastructure targets, including RDP and SSH.

Note

Users must pass the policies in your Access application before they are granted access. The Gateway Allow policy is strictly for routing and connectivity purposes.

## 4. (Optional) Require independent MFA

You can require independent MFA before users connect with SSH. The application configuration selects the supported infrastructure authenticators: PIV key (`piv_key`), FIDO2 key (`ssh_fido2_key`), or both.

Application-level settings define the default authenticators and session duration. A policy can define custom settings for specific users or usernames.

For setup instructions, refer to [Enforce MFA for infrastructure applications](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#infrastructure-applications).

## 5. Configure the server

Certain protocols require configuring the server to trust connections through Access for Infrastructure. For more information, refer to the protocol-specific tutorial:

- [SSH](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#7-configure-ssh-server)

For SSH, this includes trusting the Cloudflare SSH CA and, if your server restricts certificate principals, [authorizing the SSH usernames](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#confirm-the-account-authorizes-the-certificate-principal) you configured on the target.

## 6. Connect as a user

Users connect to the target's IP address using their preferred client software. The user must be logged into the Cloudflare One Client on their device, but no other system configuration is required. You can optionally configure a [private DNS resolver](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to allow connections to the target's private hostname.

### Connect to different VNET

To connect to targets that are in different VNETS, users will need to [switch their connected virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/#connect-to-a-virtual-network) in the Cloudflare One Client.

Note

If a user is connected to a target in VNET-A and needs to connect to a target in VNET-B, switching their VNET will not break any existing connections to targets within VNET-A. At present, connections are maintained between VNETs.

### Display available targets

<details>

<summary>

Feature availability

</summary>

| System | Availability | Minimum client version |
| --- | --- | --- |
| Windows | ✅ | 2024.9.346.0 |
| macOS | ✅ | 2024.9.346.0 |
| Linux | ✅ | 2024.9.346.0 |
| iOS | ❌ | |
| Android | ❌ | |
| ChromeOS | ❌ | |

</details>

Users can use `warp-cli` to display a list of targets they can access. On the device, open a terminal and run the following command:

```sh
warp-cli target list
```

```sh
╭──────────────────────────────────────┬──────────┬───────┬───────────────────────┬──────────────────────┬────────────╮
│ Target ID                            │ Protocol │ Port  │ Attributes            │ IP (Virtual Network) │ Usernames  │
├──────────────────────────────────────┼──────────┼───────┼───────────────────────┼──────────────────────┼────────────┤
│ 0193f22a-9df3-78e3-b5bb-7ab631903306 │ SSH      │ 22    │ hostname: do-target   │ 10.116.0.3 (a1net)   │ alice      │
├──────────────────────────────────────┼──────────┼───────┼───────────────────────┼──────────────────────┼────────────┤
│ 0193f22a-9df3-78e3-b5bb-7ab631903306 │ SSH      │ 23    │ hostname: do-target   │ 10.116.0.3 (a1net)   │ root       │
├──────────────────────────────────────┼──────────┼───────┼───────────────────────┼──────────────────────┼────────────┤
│ 01943cff-6130-7989-8bff-cbc02b59a2b1 │ SSH      │ 80    │ hostname: az-target   │ 172.16.0.0 (b1net)   │ alice, bob │
╰──────────────────────────────────────┴──────────┴───────┴───────────────────────┴──────────────────────┴────────────╯
```

You can optionally add flags to filter the output. For example:

```sh
warp-cli target list --attribute hostname=do-target --username root
```

To view all available filters, type `warp-cli target list --help`.

## Revoke a user's session

To revoke a user's access to all infrastructure targets, you can either [revoke the user from Zero Trust](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) or revoke their device. Cloudflare does not currently support revoking a user's session for a specific target.

## Granular target permissions

Infrastructure Access supports granular read permissions through [Cloudflare's role-based access control](https://developers.cloudflare.com/fundamentals/manage-members/roles/). Administrators can assign read-only roles scoped to specific targets instead of granting account-wide access. When a user with a scoped role calls the targets list API, the response is automatically filtered to only include the targets they have permission to view.

This is useful for organizations that want to give teams visibility into their own infrastructure targets without exposing the full target inventory.

## Target criteria

Use target criteria to define which targets an infrastructure application covers. Each target criteria entry includes a protocol, a port, and selectors that match targets by hostname, tag, or both.

The `target_attributes` selector only supports `hostname` in both the legacy and operator-based formats. Cloudflare rejects any other `target_attributes` key.

A target can only store one value for each tag key. This limit does not apply to target criteria. For example, an application can match both `environment:production` and `environment:staging` in `include`, `require`, or `exclude`.

### Operators

| Operator | Logic | Description |
| --- | --- | --- |
| `include` | OR | Target must match at least one included selector. |
| `require` | AND | Target must match all required selectors. |
| `exclude` | NOT(OR) | Target is rejected if it matches any excluded selector. |

Combined evaluation: **(any include) AND (all requires) AND NOT (any excludes)**.

### Legacy format

You can continue to use the flat `target_attributes` format for existing hostname-only applications. This only matters if you manage applications through the API or Terraform. For each target criteria entry, choose one format: either flat `target_attributes` or operator-based `include`, `require`, and `exclude`.

## Infrastructure policy selectors

The following [Access policy selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors) are available for securing infrastructure applications:

- Email
- Emails ending in
- SAML group
- Country
- Authentication method
- Device posture
- Entra group, GitHub organization, Google Workspace group, Okta group

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#page","headline":"Add an infrastructure application","description":"Add an infrastructure application in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH","Authentication"]}
```
