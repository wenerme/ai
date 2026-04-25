---
title: Get started
description: Set up a Cloudflare Web3 gateway for Ethereum or IPFS.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Get started

Use this tutorial to start using Cloudflare's Web3 Gateways to the IPFS and Ethereum networks.

## Before you begin

Before you start, make sure the you have [set up an account](https://developers.cloudflare.com/fundamentals/account/) and [added your website](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare.

## Step 1 - Subscribe to a gateway

To get access to Web3 gateways for your account, you need to first [subscribe to a gateway](https://developers.cloudflare.com/web3/how-to/enable-gateways/).

## Step 2 - Create a gateway

After purchasing a gateway subscription, create a gateway.

Create via dashboard

To create a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.  
[ Go to **Web3** ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. Click **Create Gateway**.
3. Enter the following information:
* **Hostname**: Enter a hostname to use as your gateway, which has to be a subdomain of the current Cloudflare zone.
* **Gateway Description**: Enter a description to help distinguish between different gateways.
* **Gateway Type**: Select a gateway target of [IPFS DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/), [IPFS Universal Path](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/), or [Ethereum](https://developers.cloudflare.com/web3/ethereum-gateway/).
* **DNSLink**: Only applicable to IPFS gateways, more details at [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/#how-is-it-used-with-cloudflare).
1. Click **Deploy**.

Create via API

To create a gateway using the API, send a [POST](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/create/) request that includes the following parameters:

* `name`: The hostname that will point to the target gateway via a `CNAME` record.
* `target`: The gateway target for the hostname (`ethereum`, `ipfs`, `ipfs_universal_path`).

If you need help with API authentication, refer to [Cloudflare API documentation](https://developers.cloudflare.com/fundamentals/api/).

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/web3/hostnames" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "name": "gateway.example.com",

  "description": "This is my IPFS gateway.",

  "target": "ipfs",

  "dnslink": "/ipns/onboarding.ipfs.cloudflare.com"

}'


```

Explain Code

The response contains the complete definition of the new gateway.

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "<WEB3_GATEWAY_ID>",

    "name": "gateway.example.com",

    "description": "This is my IPFS gateway.",

    "status": "active",

    "target": "ipfs",

    "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",

    "created_on": "<CREATED_ON_DATE>",

    "modified_on": "<MODIFIED_ON_DATE>"

  }

}


```

Explain Code

When you create a gateway, Cloudflare automatically:

* Creates and adds [records to your Cloudflare DNS](https://developers.cloudflare.com/web3/reference/gateway-dns-records/) so your gateway can receive and route traffic appropriately.
* [Proxies](https://developers.cloudflare.com/dns/proxy-status/) traffic to that hostname.
* Issues an SSL/TLS certificate to cover the specified hostname.

## Step 3 - Customize Cloudflare settings

Once your gateway becomes [active](https://developers.cloudflare.com/web3/reference/gateway-status/), you can customize the Cloudflare settings associated with your hostname.

Since your traffic is automatically proxied through Cloudflare, you customize your website settings to take advantage of various [security, performance, and reliability](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy) benefits.

## Step 4 - Restrict gateway access (optional)

If you are using your gateway for backend services, you may want to use Cloudflare Zero Trust to [restrict gateway access](https://developers.cloudflare.com/web3/how-to/restrict-gateway-access/).

## Step 5 - Set up usage notifications

Since this is a service with [usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/), Cloudflare recommends that you set up usage-based billing notifications to avoid unexpected bills.

To set up those notifications:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. On **Alert Type** of **Usage Based Billing**, click **Select**.
3. Fill out the following information:  
   * **Name**  
   * **Product**  
   * **Notification limit** (exact metric will vary based on product)  
   * **Notification email**  
Note  
Some plans also have access to alerts through [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/) and [Webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).
4. Select **Save**.

## Step 6 - Use the gateway

Once you have created a gateway and updated your Cloudflare settings, you can start using your [IPFS](https://developers.cloudflare.com/web3/how-to/use-ipfs-gateway/) or [Ethereum](https://developers.cloudflare.com/web3/how-to/use-ethereum-gateway/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/get-started/","name":"Get started"}}]}
```
