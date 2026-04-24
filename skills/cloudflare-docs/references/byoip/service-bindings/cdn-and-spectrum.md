---
title: Use BYOIP with CDN and Spectrum
description: Cloudflare allows users to use their Cloudflare prefix to route traffic to a different service. Service bindings must be created on the parent account of the prefix.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/service-bindings/cdn-and-spectrum.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Use BYOIP with CDN and Spectrum

With [service bindings](https://developers.cloudflare.com/byoip/service-bindings/), CDN[1](#user-content-fn-1) customers using BYOIP can take the same prefix they have onboarded to Cloudflare and use it to selectively route traffic on a per-IP address basis to [Spectrum](https://developers.cloudflare.com/spectrum/)[2](#user-content-fn-2), or vice versa. This means:

* You can upgrade individual IPs within a CDN prefix to a Spectrum IP. For example, if you have a CDN prefix 203.0.113.0/24, you can upgrade 203.0.113.1 to Spectrum.
* You can upgrade individual IPs within a Spectrum prefix to a CDN IP. For example, if you have a Spectrum prefix 203.0.113.0/24, you can upgrade 203.0.113.1 to CDN.

This guide will use the first example and consider a prefix that was onboarded to the CDN, with a few IPs upgraded to Spectrum.

## Before you begin

Cloudflare **strongly** recommends implementing service bindings through an **aggregated** CIDR block, as it is more efficient than adding discrete bindings for non-contiguous CIDR blocks.

Example

**CDN protected prefix:** `203.0.113.0/24`

**IPs to upgrade to Spectrum:**

`203.0.113.16`  
`203.0.113.17`  
`203.0.113.18`  
`203.0.113.19`  
`203.0.113.20`  
`203.0.113.21`  
`203.0.113.22`  
`203.0.113.23`

Add one discrete Spectrum service binding for `203.0.113.16` with a `/29` netmask.

Once a service binding is created (or deleted), it will take **four to six hours** to propagate across Cloudflare's global network. Services for the IP addresses in scope will likely be disrupted during this window.

Note

This guide assumes that the prefix is tied to a single Cloudflare account that has both CDN and Spectrum properties. If you are using [prefix delegations](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/), the service bindings must be [created](#2-create-service-bindings) on the parent account.

---

## Prepare your IPs

### 1\. Get account information

1. Log in to your Cloudflare account and get your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [authentication key or token](https://developers.cloudflare.com/fundamentals/api/get-started/). If using an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/), the permissions should include `Account` \- `IP Prefixes` \- `Edit`.
2. Make a `GET` request to the [List Services](https://developers.cloudflare.com/api/resources/addressing/subresources/services/methods/list/) endpoint and take note of the `id` associated with the Spectrum service.
3. Use the [List Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/list/) endpoint and take note of the `id` associated with the prefix (`cidr`) you will configure.

At this point, continuing the [example](#before-you-begin), you should have a mapping similar to the following:

| Variables     | Description                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| {service\_id} | The ID of the Spectrum service within Cloudflare.  Example: 969xxxxxxxx000xxx0000000x00001bf                |
| {prefix\_id}  | The ID of the CDN prefix (203.0.113.0/24) you want to configure.  Example: 6b25xxxxxxx000xxx0000000x0000cfc |

1. To confirm you currently have a CDN service binding and that it spans across your entire prefix, make a `GET` request to the [List Service Bindings](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/methods/list/) endpoint. Replace the `{prefix_id}` in the URI path by the actual prefix ID you got from the previous step.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `IP Prefixes: Write`
* `IP Prefixes: Read`

List Service Bindings

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings" \

  --request GET \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"


```

### 2\. Create service bindings

Caution

Once a service binding is created (or deleted), it will take **four to six hours** to propagate across Cloudflare's global network. Services for the IP addresses in scope will likely be disrupted during this window.

1. Make a `POST` request to the [Create service binding](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/methods/create/) endpoint, indicating the IP address you want to bind to Spectrum. Specify the **corresponding network mask** as needed.

Continuing the example, `203.0.113.100/32` designates an IP address that is within the CDN prefix `203.0.113.0/24`.

Replace the `{prefix_id}` in the URI with your prefix ID from previous steps. Within the request body, the `cidr` value should correspond to the IP address or subnet that you are configuring for use with Spectrum.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `IP Prefixes: Write`

Create Service Binding

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "cidr": "203.0.113.100/32",

    "service_id": "<SERVICE_ID>"

  }'


```

In the response body, the initial provisioning state should be `provisioning`.

```

{

  "errors": [],

  "messages": [],

  "success": true,

  "result": {

    "cidr": "203.0.113.100/32",

    "id": "<SERVICE_BINDING_ID>",

    "provisioning": {

      "state": "provisioning"

      },

    "service_id": "<SERVICE_ID>",

    "service_name": "<SERVICE_NAME>"

  }

}


```

Explain Code

You can periodically check the service binding status using the [List Service Bindings](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/methods/list/) endpoint.

### 3\. Verify all service bindings

After the propagation time (four to six hours), the [List Service Bindings](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/methods/get/) endpoint should return all service bindings that are part of the prefix - in this case, CDN and Spectrum.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `IP Prefixes: Write`
* `IP Prefixes: Read`

List Service Bindings

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings" \

  --request GET \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"


```

---

## Set up your Cloudflare services

### CDN

If you already use BYOIP with CDN, you might be able to skip this step. However, if you are using this guide to upgrade a few IPs from a Spectrum prefix to the CDN, consider the following sections on [address maps](#address-maps) and [DNS records](#dns-records).

Note

As described below, address maps and DNS records do not apply to Spectrum. To set up your Spectrum application with BYOIP, refer to [Spectrum](#spectrum).

#### Address maps

Use [address maps](https://developers.cloudflare.com/byoip/address-maps/) to specify which IPs should be used by Cloudflare in DNS responses when a record is [proxied](https://developers.cloudflare.com/dns/proxy-status/).

You can choose between two different scopes:

* Account-level: uses the address map for all proxied DNS records across all of the zones within an account.
* Zone-level: uses the address map for all proxied DNS records within a zone.

Note

If you need to map only specific subdomains (and not all proxied DNS records) to specific IP addresses, you can use a [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

* [ Dashboard ](#tab-panel-5619)
* [ API ](#tab-panel-5620)

1. In the Cloudflare dashboard, go to the **Address Maps** page.  
[ Go to **Address maps** ](https://dash.cloudflare.com/?to=/:account/ip-addresses/proxy-ips)
2. Select **Create an address map**.
3. Choose the scope of the address map.
4. Add the zones and IP addresses that you want to map.
5. Name your address map.
6. Review the information and select **Save and Deploy**.

Use the [Create Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/methods/create/) endpoint.

Make sure you have the correct Key/Token and permissions.

#### DNS records

While the DNS record proxy status and address map will determine how Cloudflare's authoritative DNS responds to requests for your hostnames, the IP addresses specified in `A`/`AAAA` records will determine [how Cloudflare reaches the configured origin](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy).

Note

As you create the necessary DNS records, [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) can help making sure that you have SSL/TLS certificates in place for all your hostnames.

* [ Dashboard ](#tab-panel-5621)
* [ API ](#tab-panel-5622)

To create a DNS record in the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Choose an address (`A`/`AAAA`) [record type](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/).
4. Complete the required fields, setting the **Proxy status** to **proxied**.
5. Select **Save**.

To create records with the API, use a [POST request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/). For field definitions, select a record type under the request body specification.

Example

| Type | Name | IP address    | Proxy status | TTL  |
| ---- | ---- | ------------- | ------------ | ---- |
| A    | www  | 203.0.113.150 | Proxied      | Auto |

At this point, if an address map for a zone `example.com` specifies that Cloudflare should use `203.0.113.100` for proxied records and the above record exists in the same zone, you can expect the following:

1. Cloudflare responds to DNS requests for `www.example.com` with `203.0.113.100`.
2. Cloudflare proxies requests through the CDN and then routes the requests to the origin server `203.0.113.150`.
3. As the HTTP response egresses the Cloudflare network back to the client side, the source IP address of the response becomes `203.0.113.100` (the IP address that the HTTP request originally landed on).

Note

Having the same IP address as ingress IP (defined in the address map) and origin IP (listed in the DNS record) will not cause any loops.

Example

Assuming `203.0.113.100` was also the origin IP, the DNS record would look like the following:

| Type | Name | IP address    | Proxy status | TTL  |
| ---- | ---- | ------------- | ------------ | ---- |
| A    | www  | 203.0.113.100 | Proxied      | Auto |

### Spectrum

UDP applications

Spectrum UDP applications are [not supported](https://developers.cloudflare.com/spectrum/reference/limitations/#udp) when using Spectrum with BYOIP.

Configuring Spectrum to use your own IP address is only possible via the [Cloudflare API](https://developers.cloudflare.com/api/resources/spectrum/).

The `origin_direct` field takes the origin IP address, while `edge_ips` allows you to define which IP address from your BYOIP prefix Cloudflare should use to process requests for your Spectrum application.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Create Spectrum application using a name for the origin

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '[

    {

        "protocol": "tcp/22",

        "dns": {

            "type": "CNAME",

            "name": "ssh.example.com"

        },

        "origin_direct": [

            "tcp://192.0.2.1:22"

        ],

        "proxy_protocol": "off",

        "ip_firewall": true,

        "tls": "full",

        "edge_ips": {

            "type": "static",

            "ips": [

                "203.0.113.18"

            ]

        },

        "traffic_type": "direct"

    }

  ]'


```

Explain Code

---

## (Optional) Add layer 7 functionality

Leverage other features according to your needs. For example:

* [Cache](https://developers.cloudflare.com/cache/)
* [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/)
* [Security analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/)

## Footnotes

1. Layer 7 HTTP-based [↩](#user-content-fnref-1)
2. Layer 4 or Layer 7 HTTP with custom ports [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/service-bindings/","name":"IP address service bindings"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/service-bindings/cdn-and-spectrum/","name":"Use BYOIP with CDN and Spectrum"}}]}
```
