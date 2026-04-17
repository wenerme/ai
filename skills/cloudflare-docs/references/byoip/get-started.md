---
title: Get started
description: Onboard your IP prefixes to Cloudflare with BYOIP.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

To use your own IP addresses with Cloudflare, please check with your account team to confirm your contract covers this functionality. You will need to configure settings specific to the services you want to use, as well as meet some standard requirements for all BYOIP customers.

Once your account configurations are in place, consider the sections below to learn how to set up your BYOIP prefixes. Also make sure to review the [BYOIP Service-Specific Terms ↗](https://www.cloudflare.com/service-specific-terms-network-services/#bring-your-own-ip-terms).

Magic Transit

The process described on this page does not support onboarding IP prefixes for use with [Cloudflare Magic Transit](https://developers.cloudflare.com/magic-transit/). For further guidance, refer to the [Magic Transit get started](https://developers.cloudflare.com/magic-transit/get-started/).

## Before you begin

* Your prefix must be registered under one of the Regional Internet Registries (RIRs):  
   * [AFRINIC ↗](https://afrinic.net/)  
   * [APNIC ↗](https://www.apnic.net/)  
   * [ARIN ↗](https://www.arin.net/)  
   * [LACNIC ↗](https://lacnic.net/)  
   * [RIPE ↗](https://www.ripe.net/)
* Also verify that your [Internet Routing Registry (IRR)](https://developers.cloudflare.com/byoip/concepts/irr-entries/) records are are up to date and contain:  
   * `route` or `route6` objects matching the exact prefixes you want to onboard  
   * `origin` matching the correct ASN you want to onboard  
Use Cloudflare's ASN  
The process described on this page only supports using Cloudflare's ASN (AS13335). If you must announce the prefixes under your own ASN, contact your account team.
* You must use [Resource Public Key Infrastructure (RPKI) validation](https://developers.cloudflare.com/byoip/concepts/route-filtering-rpki/) and make sure your ROAs are accurate. You can use [Cloudflare's RPKI Portal ↗](https://rpki.cloudflare.com/?view=validator) and a second source such as [Routinator ↗](https://rpki-validator.ripe.net/ui/) to double-check your prefixes.
* If you are not familiar with how Cloudflare API works, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/api/). Make sure you have the necessary permissions and that you have your account ID.

---

## 1\. Set up your prefixes

### Add your prefix

1. Use the [Add Prefix endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/create/) to create a prefix in the Cloudflare account that should own the BYOIP prefix.

Use Cloudflare's ASN

The process described on this page only supports using Cloudflare's ASN (AS13335). If you must announce the prefixes under your own ASN, contact your account team.

Add Prefix

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "cidr": "203.0.113.0/24",

    "asn": 13335,

    "delegate_loa_creation": true

  }'


```

Response

```

 "result": {

   "id": "72823e95d6c64d48a8111fec81179816",

    "created_at": "2025-02-25T00:34:11.423722Z",

    "modified_at": "2025-02-25T00:34:11.423722Z",

    "cidr": "203.0.113.0/24",

    "account_id": "654c5f71c324478cc9f68d60065d4620",

    "description": "",

    "approved": "P",

    "on_demand_enabled": false,

    "on_demand_locked": false,

    "advertised": null,

    "advertised_modified_at": null,

    "loa_document_id": "b9ff4afe312246a8b2e7324d98f40b23",

    "asn": 13335,

    "ownership_validation_token": "<OWNERSHIP_VALIDATION_TOKEN>",

    "delegate_loa_creation" : true,

    "irr_validation_state": "pending",

    "rpki_validation_state": "pending",

    "ownership_validation_state": "pending",

  }


```

Explain Code

1. Take note of the `id` assigned to the prefix you added. It will be used in future steps.

Letter of Agency (LOA)

The process described on this page leverages automated [LOA](https://developers.cloudflare.com/byoip/concepts/loa/) generation. If you set `delegate_loa_creation` to `false`, you have to manually upload your LOA, make a [PATCH request](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/edit/) once the prefix is approved, and contact your account team - which is more prone to error and increases the onboarding time.

### Validate prefix ownership

1. Validate prefix ownership using one of the following methods:  
   * [ IRR record ](#tab-panel-5404)  
   * [ Reverse DNS zone and TXT record ](#tab-panel-5405)  
   1. Copy the `ownership_validation_token` returned by the API call.  
   2. On the IRR record of the prefix you are onboarding, add the following string in either a `description` or `remarks` field. Replace `<OWNERSHIP_VALIDATION_TOKEN>` by the actual token you copied in the previous step.  
```  
cf-validation: <OWNERSHIP_VALIDATION_TOKEN>  
```  
Note  
The exact steps to update your IRR record will depend on the registry you are using. Refer to [Internet Routing Registry (IRR)](https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/) for details.  
   1. Consider the size of the prefix you are bringing to Cloudflare. Since the standard `in-addr.arpa` tree assumes delegations on octet or nibble boundaries, if you onboard prefixes that are not aligned with those, you will have to split up the prefix into subnets and create the corresponding reverse DNS zones for each.  
Example  
To calculate how many smaller subnets you need, use the following formula:  
```  
2^(next boundary - current netmask)  
```  
For `1.1.0.0/23`, you would setup two (`2^(24-23)`) reverse DNS zones, one for `1.1.0.0/24` and another for `1.1.1.0/24`.  
For `2001:0db8::/34`, you would setup four (`2^(36-34)`) reverse DNS zones, for `2001:0db8::/36`, `2001:0db8:1:/36`, `2001:0db8:2::/36`, and `2001:0db8:3::/36`.  
   1. Set up a reverse DNS zone. If you use Cloudflare for DNS, refer to [Reverse DNS zones](https://developers.cloudflare.com/dns/additional-options/reverse-zones/#set-up-a-reverse-zone). If you use a different DNS provider, follow their instructions.  
   2. Create TXT records using `cf-validation` as their `name`. They should look like the following example:  
```  
cf-validation.<REVERSE_ZONE_ADDRESS> IN TXT <TOKEN>  
```  
   1. Update nameservers at your Regional Internet Registry (RIR). The exact steps to update your nameservers will depend on the registry you are using.
2. After applying the necessary changes, use the Validate Prefix endpoint to trigger the validation checks.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic Transit Write`  
   * `IP Prefixes: Write`  
Validate Prefix  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/validate" \  
  --request POST \  
  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \  
  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"  
```

Once the ownership validation is successful, you can remove the token.

When all validations pass - RPKI, IRR, and ownership - the `approved` field in your prefix will return `"V"`. This means you can proceed to create IP address service bindings[1](#user-content-fn-1).

If needed, you can use the [Prefix Details endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/get/) to check if any issues were found during validation. If so, proceed with the necessary changes and make a request to restart validation. Refer to [Prefix validation checks](https://developers.cloudflare.com/byoip/troubleshooting/prefix-validation/) for details.

### (Optional) Delegate your BYOIP prefixes

You can allow other accounts to use part or all of your BYOIP prefix. Refer to [Prefix delegations](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/) for details.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `IP Prefixes: Write`

Create Prefix Delegation

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "cidr": "<IP_PREFIX_TO_DELEGATE>",

    "delegated_account_id": "<ACCOUNT_ID>"

  }'


```

Note

Although you can delegate IPs to other accounts, the IP address service bindings are still created and managed on the parent account - meaning the Cloudflare account where you added the prefix in step 1.

---

## 2\. Create service bindings

In IP address management, service bindings map the traffic destined for a given IP address to the Cloudflare service that it should be routed through.

### Default service binding

When you onboard your IP prefixes to Cloudflare, there must be one service binding that spans across your entire prefix. Traffic destined for a given IP address will be routed to this service by default. You can also configure [additional service bindings](#optional-additional-bindings) as described in the next step.

1. Make a `GET` request to the [List Services](https://developers.cloudflare.com/api/resources/addressing/subresources/services/methods/list/) endpoint and take note of the `id` associated with the service you want to use.

CDN egress

[Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) (formerly known as Aegis) is only available for Enterprise. If you are interested, reach out to your account team. Also note that a single BYOIP prefix can be used for either CDN ingress or CDN egress, but not both.

1. (Optional) If needed, use the [List Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/list/) endpoint to get or confirm the `id` associated with your prefix.
2. Make a `POST` request to the [Create service binding](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/methods/create/) endpoint, indicating the entire BYOIP prefix that you are onboarding and the service that should be used for your default binding.

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

    "cidr": "203.0.113.0/24",

    "service_id": "<DEFAULT_SERVICE>"

  }'


```

A corresponding BGP prefix will be created automatically. Allow five hours before you advertise the prefix.

### (Optional) Additional bindings

If you want to selectively route traffic on a per-IP address basis to CDN or Spectrum, you can create additional service bindings.

Note

The steps below only cover assigning specific IPs to additional services. For guidance that includes CDN or Spectrum setup steps, refer to [Service bindings](https://developers.cloudflare.com/byoip/service-bindings/).

1. Plan for what IP(s) will get the additional binding. Cloudflare **strongly** recommends implementing service bindings through an **aggregated** CIDR block, as it is more efficient than adding discrete bindings for non-contiguous CIDR blocks.

Example

**Spectrum protected prefix:** `203.0.113.0/24`

**IPs to upgrade to CDN:**

`203.0.113.16`  
`203.0.113.17`  
`203.0.113.18`  
`203.0.113.19`  
`203.0.113.20`  
`203.0.113.21`  
`203.0.113.22`  
`203.0.113.23`

Add one discrete CDN service binding for `203.0.113.16` with a `/29` netmask.

1. Make a `POST` request to the [Create service binding](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/methods/create/) endpoint, indicating the IP address you want to bind to the CDN or Spectrum. Specify the **corresponding network mask** as needed.

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

    "cidr": "203.0.113.16/29",

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

       "cidr": "203.0.113.16/29",

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

Once a service binding is created (or deleted), it will take **four to six hours** to propagate across Cloudflare's global network.

Note

Magic Transit can only be used as default binding, spanning across your entire prefix. For more details, refer to [Service bindings scope](https://developers.cloudflare.com/byoip/service-bindings/#scope).

---

## 3\. Advertise the BGP prefix

Once automatically created (following [step 2](#2-create-service-bindings)), BGP prefixes are initially withdrawn. After all your configurations are in place - including [address maps](https://developers.cloudflare.com/byoip/address-maps/)[2](#user-content-fn-2) if you will use CDN service -, proceed to advertise the BGP route for your prefix.

1. Use the [Update BGP prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp%5Fprefixes/methods/edit/) endpoint to start the advertisement.

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

## Footnotes

1. Mappings that control through which pipeline traffic destined for a given IP address will be routed. [↩](#user-content-fnref-1)
2. Mappings that specify which IP addresses should be used when Cloudflare responds to DNS queries for proxied hostnames. [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/get-started/","name":"Get started"}}]}
```
