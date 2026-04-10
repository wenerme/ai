---
title: Advertise prefixes
description: You can bring your own public IP addresses to Cloudflare to use with Magic Transit. This is also known as bring your own IP (BYOIP). This process involves two distinct types of prefixes:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/how-to/advertise-prefixes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Advertise prefixes

## Onboard prefixes

You can bring your own public IP addresses to Cloudflare to use with Magic Transit. This is also known as bring your own IP (BYOIP). This process involves two distinct types of prefixes:

1. **IP prefixes**: Each IP address block you bring to Cloudflare requires an IP prefix entry. The IP prefix includes the permission (Letter of Agency (LOA)) that allows Cloudflare to announce the network or its subnets. You can also define your optional [Autonomous System Number (ASN) ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) to be included in our advertised AS path.
2. **BGP prefixes**: These control which prefixes Cloudflare announces from its global network. By default, each IP prefix has one matching BGP prefix. You can configure additional, more-specific BGP prefixes (subnets of the IP prefix), up to a maximum prefix length of `/24`.

### IP prefixes

Cloudflare measures the Magic Transit prefix count based on the number of BGP prefixes you define. Each prefix is billed separately, even if they overlap. For example, both a `/16` and any `/24` within it are counted individually. Onboarding a larger aggregate prefix does not automatically include its smaller subnets for announcement or billing purposes.

There is no billing limit on the accepted prefix sizes. However, only prefixes up to `/24` are accepted for onboarding because longer prefixes (like `/25`, `/26`) are not globally routable.

Provide all IP prefixes you plan to onboard, along with the ASNs from which you will advertise them. When specifying prefixes, observe these guidelines:

* Prefixes must include at least 256 IP addresses (`/24` in CIDR ([Classless Inter-Domain Routing ↗](https://www.cloudflare.com/learning/network-layer/what-is-routing/)) notation). If you do not meet the `/24` prefix length requirement, refer to [Use a Cloudflare IP](https://developers.cloudflare.com/magic-transit/cloudflare-ips/).
* Internet Routing Registry entries and LOA must match the prefixes and originating prefixes you submit to Cloudflare.
* When using contiguous prefixes, specify aggregate prefixes where possible.
* When using Route Origin Authorizations (ROAs) to sign routes for [resource public key infrastructure (RPKI) ↗](https://tools.ietf.org/html/rfc8210), the prefix and originating ASN must match the onboarding submission.
* If you do not own an ASN, you can use the Cloudflare Customer ASN (AS13335).

#### Cloudflare ASN vs. your own ASN

As part of your IP prefix onboarding process, you need to decide which ASN Cloudflare will use to announce your prefixes. If you supply your own ASN, Cloudflare prepends the main Cloudflare ASN (AS13335) to the BGP `AS_PATH`. For example, if your ASN is `AS64496`, anyone directly peering with Cloudflare sees the path as `13335 64496`.

If you do not have an ASN or do not want to bring your ASN to Cloudflare, you can use the Cloudflare Customer ASN (AS13335).

Note

For all future onboardings, you must use AS13335\. If you already use Cloudflare's AS209242, you do not need to make changes and can continue using that ASN.

### BGP prefixes

BGP prefixes represent the prefix that Cloudflare will announce through anycast from Cloudflare's global network. By default, there is always at least one BGP prefix that is identical to the onboarded IP prefix.

For example, if you onboard a `/20` IP prefix to Magic Transit, it can only be announced as a `/20` because there is only the default `/20` BGP prefix. Smaller sub-prefixes (such as `/24s`) within that `/20` cannot be announced individually unless they are configured as separate BGP prefixes.

### BGP prefix advertisement control methods

Cloudflare offers multiple mechanisms to control the announcement and withdrawal of on-demand prefixes. Each method serves different deployment scenarios:

* **Addressing API**: Manually control prefix advertisements through API calls. Refer to [Advertise or withdraw a BGP prefix](#advertise-or-withdraw-a-bgp-prefix).
* **BGP peering with route reflectors**: Control advertisements through BGP sessions to Cloudflare's globally distributed route reflectors, either over the Internet or over a CNI connection with Dataplane v1\. Contact your Cloudflare account team if you need this option. Refer to [BGP control with Cloudflare Route Reflectors](#bgp-control-with-cloudflare-route-reflectors).
* **Network Flow**: Automatically announce prefixes based on user-defined traffic thresholds observed in your network. Refer to [Network Flow](https://developers.cloudflare.com/network-flow/) (formerly Magic Network Monitoring).
* **BGP peering with Magic Transit Virtual Network routing table**: Automatically control prefix advertisements based on BGP routes learned through CNI with Dataplane v2, or GRE and IPsec tunnels (beta, requires [Unified Routing](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#unified-routing-mode-beta)). Refer to [BGP control to Magic Transit Virtual Network routing table](#bgp-control-to-magic-transit-virtual-network-routing-table).

Important

You should only use one control method per prefix at any given time. Mixing multiple control planes can lead to conflicting advertisement states, causing unpredictable routing behavior.

## Manage BGP prefixes

### Add a BGP prefix

Create a [POST request](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp%5Fprefixes/methods/create/) to add a BGP prefix. For example:

Create BGP Prefix

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "cidr": "192.0.2.0/24"

  }'


```

### Advertise or withdraw a BGP prefix

* [ Dashboard ](#tab-panel-5439)
* [ API ](#tab-panel-5440)

Note

You can only advertise your prefix after running pre-flight checks with Cloudflare. If your prefix status is grayed out and shows a _Withdrawn_ status, Cloudflare locks your prefix. Contact your account team to close the pre-flight checks phase and unlock your prefixes.

Currently, only the default BGP prefix (that matches the IP prefix) can be controlled through the Cloudflare dashboard.

1. Go to the **Routes** page.
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
1. From the **IP prefixes** tab, select the prefix you want to modify > **Edit**.
2. From the **Status** drop-down menu, select _Advertised_ or _Withdrawn_.
3. (Optional) Edit the description for your prefix.
4. Select **Edit IP Prefix** to save your changes.

Any configured BGP prefix can be controlled through the API using a [PATCH request](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp%5Fprefixes/methods/edit/). For example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic Transit Write`
* `IP Prefixes: Write`
* `IP Prefixes: BGP On Demand Write`

Update BGP Prefix

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID" \

  --request PATCH \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "on_demand": {

        "advertised": true

    }

  }'


```

Warning: ISP route refresh delays may impact traffic

Announcing or withdrawing a prefix means Cloudflare will begin or stop advertising routes, impacting traffic flow to or from that IP range. Changes propagate across Cloudflare's global network almost instantly, typically taking effect within minutes. However, Cloudflare has no control over how quickly ISPs refresh their routes.

Refer to [Safely withdraw a BYOIP prefix](#safely-withdraw-a-byoip-prefix) for more information on how to prevent blackholing during prefix withdrawals.

### Delete an IP prefix

You can only delete a prefix with an _Unapproved_ status. To delete prefixes with a different status, contact your administrator or account manager.

1. Go to the **Routes** page.
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes) 
1. From the **IP Prefixes** tab, locate the prefix you want to modify and select **Delete**.
2. Confirm your choice from the modal by selecting **Delete**.

### Use the API to set AS prepends on a BGP prefix

Use the [Addressing API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp%5Fprefixes/methods/edit/) to control the number of times Cloudflare prepends its Autonomous System Number (ASN) to a prefix. You can prepend AS13335 up to three times in the `AS_PATH` of BGP updates for your prefixes.

Warning

BGP has different mechanisms to control route priorities which are set by the peered network, not by Cloudflare. As such, this is a best-effort feature. Cloudflare cannot guarantee that peers will honor AS prepends on Cloudflare's transit and peering connections.

Refer to the following example for how to prepend AS13335 three times to a BGP prefix:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic Transit Write`
* `IP Prefixes: Write`
* `IP Prefixes: BGP On Demand Write`

Update BGP Prefix

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID" \

  --request PATCH \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "asn_prepend_count": 3

  }'


```

AS prepending helps you gracefully transition traffic between network providers. By adding prepends to Cloudflare's advertisement, you make the route through Cloudflare less preferred for some Internet network providers. This allows you to simultaneously advertise the same prefix from an alternate provider with a shorter, more desirable `AS_PATH`. Advertising from both providers at once provides a smoother traffic migration and minimizes packet loss during a change of provider.

The `"asn_prepend_count"` parameter accepts values from `0` to `3`. A higher value makes the route less preferred. You can also change this parameter using BGP. Refer to [Use communities to set AS prepends on an anycast prefix](#use-communities-to-set-as-prepends-on-an-anycast-prefix).

When you use AS prepending to migrate traffic away from Magic Transit, the typical sequence of events is as follows:

* **Initial state**: Cloudflare advertises your prefix with the default priority (`"asn_prepend_count": 0`). Cloudflare routes all traffic to your network through the Cloudflare global network.
* **Deprioritize Cloudflare**: You update the prefix through the API to set an AS prepend count (for example, `"asn_prepend_count": 3`). Cloudflare now advertises your prefix with a longer `AS_PATH`. External networks will update their BGP tables to recognize the Cloudflare path has the new, longer `AS_PATH`.
* **Introduce new provider**: You begin advertising the same prefix from your alternate provider with a standard (shorter) `AS_PATH`.
* **Final state**: External networks now receive two advertisements: the prepended route through Cloudflare and the non-prepended route through your new provider. The external network will select a path based on its BGP policy rules.

Warning

Cloudflare's internal network enforces local preference for traffic delivery to Magic Transit, even if a more specific or shorter path route is available on the public Internet. Withdraw the prefix from Cloudflare to avoid delivery of Cloudflare-sourced traffic over Magic Transit. This preference is local to our internal network and does not impact the route decision process of other networks.

For example, if you have a CDN zone with a Magic Transit-protected origin that is part of a Cloudflare-advertised `/22` prefix, and you later advertise a more specific `/24` prefix route directly from your network, Cloudflare's servers will continue to route proxied CDN traffic to your Magic Transit network. The traffic will follow configured routes to your tunnel(s). This behavior is specific to Cloudflare services. Traffic from other sources will converge to the direct route as expected by BGP.

## Safely withdraw a BYOIP prefix

### Mitigating stuck BGP routes

When you prepare to remove traffic for a [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/) prefix from the Cloudflare edge, a direct BGP withdrawal action carries the risk of a stuck BGP route. This state occurs when a route becomes stuck in the Internet's [Default-Free Zone (DFZ) ↗](https://en.wikipedia.org/wiki/Default-free%5Fzone). Core routers that missed the withdrawal announcement continue forwarding traffic to a now-inactive next-hop (what is known as a blackhole). You can read more about this in our blog post [BGP zombies and excessive path hunting ↗](https://blog.cloudflare.com/going-bgp-zombie-hunting).

This risk is especially evident in the use case where the global routing table relies on more-specific to less-specific prefix routing fallback. Since this fallback mechanism is highly prone to route instability, Cloudflare recommends a multi-step draining process.

### Multi-step BYOIP withdrawal process

When draining traffic, use the same prefix length on Cloudflare and on your ISP (Internet Service Provider), since matching prefix lengths gives the most effective and deterministic behavior.

The following steps outline the recommended multi-step draining process to achieve a clean traffic cutover and prevent blackholing.

1. **Initiate advertisement from your origin network**: Begin announcing the exact same-length prefix (for example, `192.0.2.0/24`) from your local infrastructure to your upstream Internet Service Providers (ISPs). This action introduces a competing route of the same length into the global routing table. BGP best path selection will favor your native route based on other metrics (for example, shorter AS path length or local preference), allowing traffic to begin draining away from the Cloudflare edge. Note that some of your traffic may not route as expected, since this depends on how your ISP prefers routes (for example, the Cloudflare route may be treated as a less-preferred path if not fully withdrawn).
2. **Wait for global BGP convergence**: Allow a period of time (typically five to ten minutes) for the new native advertisement to propagate fully across the global routing table, and for routes to converge. This passive waiting period ensures that the majority of traffic has shifted to your local network before the next step.
3. **Signal BGP withdrawal from the Cloudflare edge**: Once you have verified that traffic has successfully drained, use one of the BGP control methods to stop the advertisement of the prefix from the Cloudflare edge.  
ISP route refresh delays may impact traffic  
Cloudflare's action to withdraw the route is near-instantaneous across our global network. However, Cloudflare has no control over how quickly external ISPs refresh their BGP tables after the withdrawal.
4. The draining process is complete.

## BGP control to Magic Transit Virtual Network routing table

### Automatically announce and withdraw anycast-based Magic BGP routes

If you use CNI with Dataplane v2, GRE or IPsec tunnels, you can:

* Automatically withdraw your prefixes from Cloudflare's global edge infrastructure when you withdraw all matching BGP learned prefixes from the Magic Transit Virtual Network routing table.
* Automatically advertise your prefixes through Cloudflare's global edge infrastructure when you have at least one matching BGP learned prefix in the Magic Transit Virtual Network routing table.

To enable automatic global announcement and withdrawal, enable this feature on the BGP prefix using the [Addressing API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp%5Fprefixes/methods/edit/). For example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic Transit Write`
* `IP Prefixes: Write`
* `IP Prefixes: BGP On Demand Write`

Update BGP Prefix

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID" \

  --request PATCH \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "auto_advertise_withdraw": true

  }'


```

Once you configure this for a BGP prefix, Cloudflare applies the following logic:

* If there are no BGP routes in the Magic Transit Virtual Network routing table exactly matching the BGP prefix, Cloudflare withdraws the BGP prefix.
* If there is at least one BGP route in the Magic Transit Virtual Network routing table exactly matching the BGP prefix, Cloudflare announces the BGP prefix.

The Addressing API BGP prefix and the Magic Transit Virtual Network routing table BGP route must match exactly (same IP prefix and CIDR prefix length). If there is a valid route to a subnet or supernet, Cloudflare withdraws the BGP prefix when there are no exactly matching Magic Transit Virtual Network BGP routes.

Note

When you withdraw a prefix using BGP, you must ensure you withdraw all matching BGP learned prefixes from the Magic Transit Virtual Network routing table. Otherwise, your prefix will not be withdrawn from Cloudflare's global network.

### Use communities to set AS prepends on an anycast prefix

As an alternative to setting [AS prepends on an anycast prefix with the API](#use-the-api-to-set-as-prepends-on-a-bgp-prefix), you can use BGP communities to control the number of AS prepends that Cloudflare announces from its edge for your prefix. The community values are:

* `13335:50101`: Prepends one time with the 13335 ASN
* `13335:50102`: Prepends two times with the 13335 ASN
* `13335:50103`: Prepends three times with the 13335 ASN

If you need to switch to your alternate service provider, you can prepend Cloudflare's ASN multiple times. The intent is typically to make the route less preferred and allow for a graceful transition to the new provider. The higher the prepend count, the less preferred Cloudflare's connection will be if there are no other prioritization rules in place.

Refer to the [caution about AS prepends](#use-the-api-to-set-as-prepends-on-a-bgp-prefix) for important information about peer behavior with this feature.

## BGP control with Cloudflare Route Reflectors

Optionally, you can use BGP to control the advertisement status of your prefix — advertised or withdrawn — from Cloudflare's global network for on-demand deployment scenarios. BGP control works by establishing BGP sessions to Cloudflare's globally distributed Route Reflectors, which initiate propagation of your prefix advertisement across Cloudflare's global network. You can peer with Cloudflare's Route Reflectors through Internet or CNI. CNI peering is available through your account team.

You can advertise prefixes from Cloudflare's network in a supported on-demand method such as BGP control, or dynamically through the UI, API, or [Network Flow](https://developers.cloudflare.com/magic-transit/network-flow/). During the onboarding of your on-demand prefixes, specify whether you want BGP-controlled advertisement or dynamic advertisement (through dashboard/API/Network Flow).

Our network architecture utilizes multiple, redundant Route Reflectors. The failure of any single reflector does not impact overall network resiliency or traffic forwarding. For maximum resiliency, we recommend peering with all three of Cloudflare's redundant Route Reflectors.

To begin using BGP control, contact your account team with the following information:

* BGP endpoint IP addresses
* Prefixes you want to use with BGP control
* Your ASN for the BGP session

After receiving your information, Cloudflare will update firewall filters to establish the BGP session and provide you with the BGP endpoints to control your prefixes.

Note

When you withdraw a prefix using BGP, you must ensure the prefix is withdrawn across all BGP sessions on all route reflectors. Otherwise, Cloudflare will not withdraw your prefix from the global network.

### Example router configurations

The following examples show peering configurations for [Cisco IOS ↗](https://www.cisco.com/c/en/us/td/docs/ios/fundamentals/command/reference/cf%5Fbook.html) and [Juniper Junos OS ↗](https://www.juniper.net/documentation/us/en/software/junos/cli/index.html) for on-demand deployments leveraging BGP control. The IP addresses used are from Cloudflare's route reflectors and should be left as is.

#### Cisco IOS

```

ip route {{ <YOUR-MAGIC-TRANSIT-PREFIX> }} Null0

ip prefix-list magic-transit-prefix seq 5 permit {{ <YOUR-MAGIC-TRANSIT-PREFIX> }}


route-map cloudflare-magic-transit-out permit 1

match ip address prefix-list magic-transit-prefix

!

route-map cloudflare-magic-transit-out deny 99


route-map reject-all deny 99


router bgp {{ <YOUR-ASN> }}

neighbor 141.101.67.22 remote-as 13335

neighbor 141.101.67.22 ebgp-multihop 64

neighbor 141.101.67.22 timers 60 900

neighbor 162.158.160.22 remote-as 13335

neighbor 162.158.160.22 ebgp-multihop 64

neighbor 162.158.160.22 timers 60 900

neighbor 173.245.63.66  remote-as 13335

neighbor 173.245.63.66  ebgp-multihop 64

neighbor 173.245.63.66  timers 60 900

!

address-family ipv4 unicast

redistribute static

neighbor 141.101.67.22 route-map cloudflare-magic-transit-out out

neighbor 141.101.67.22 route-map reject-all in

neighbor 162.158.160.22 route-map cloudflare-magic-transit-out out

neighbor 162.158.160.22 route-map reject-all in

neighbor 173.245.63.66  route-map cloudflare-magic-transit-out out

neighbor 173.245.63.66  route-map reject-all in

exit-address-family


```

Explain Code

#### Juniper MX (Junos OS set commands)

```

set protocols bgp group CF_ROUTE_REFLECTORS neighbor 162.158.160.22 description "CF RR#1 SIN"

set protocols bgp group CF_ROUTE_REFLECTORS neighbor 173.245.63.66 description "CF RR#2 IAD"

set protocols bgp group CF_ROUTE_REFLECTORS neighbor 141.101.67.22 description "CF RR#3 CDG"

set protocols bgp group CF_ROUTE_REFLECTORS peer-as 13335

set protocols bgp group CF_ROUTE_REFLECTORS import REJECT-ALL

set protocols bgp group CF_ROUTE_REFLECTORS export BGP-CONTROL-OUT


set policy-options policy-statement REJECT-ALL then reject

set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> from route-filter 104.245.62.0/24 exact

set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> from protocol static

set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> from route-type internal

set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> then accept

set policy-options policy-statement BGP-CONTROL-OUT then reject


```

Explain Code

#### Juniper MX (Junos OS XML format)

```

@rtr01> show configuration routing-instances STAGE protocols bgp group CF_ROUTE_REFLECTORS

type external;

multihop {

    ttl 64;

}

local-address {{customer router IP}}

import NONE;

export NONE;

peer-as 13335;

local-as {{customer AS}} loops 2;

neighbor 162.158.160.22 {

    description "CF RR#1 SIN";

}

neighbor 173.245.63.66 {

    description "CF RR#2 IAD";

}

neighbor 141.101.67.22 {

    description "CF RR#3 CDG";

}


```

Explain Code

## BGP peering

If you use CNI with Dataplane v2, GRE or IPsec tunnels to on-ramp your network traffic to Magic Transit, refer to [BGP information](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#bgp-information) to learn how to use BGP to handle traffic routing between Cloudflare and your network. Note that this is a different option to using BGP as a means to control the advertisement status of your prefix.

## Regional settings

Magic Transit supports both static routing and BGP to steer traffic from Cloudflare's network to your configured off-ramps (GRE tunnels, IPsec tunnels, or CNI). Cloudflare does not currently support advertisement of routes for traffic engineering purposes. As a best practice to reduce last-hop latency, consider scoping your routes regionally.

Cloudflare has nine geographic regions:

| Region code | Region                |
| ----------- | --------------------- |
| AFR         | Africa                |
| APAC        | Asia Pacific          |
| EEUR        | Eastern Europe        |
| ENAM        | Eastern North America |
| ME          | Middle East           |
| OC          | Oceania               |
| SAM         | South America         |
| WEUR        | Western Europe        |
| WNAM        | Western North America |

The default setting for static route regions is **All Regions**. Configure scoping for your traffic in the **Region code** section when [adding](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#create-a-static-route) or [editing](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#edit-a-static-route) a static route.

Refer to [Scoping routes to specific regions](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#scoping-routes-to-specific-regions) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/how-to/advertise-prefixes/","name":"Advertise prefixes"}}]}
```
