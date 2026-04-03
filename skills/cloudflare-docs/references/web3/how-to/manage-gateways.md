---
title: Manage gateways
description: A Cloudflare Web3 gateway provides HTTP-accessible interfaces to various Web3 networks. You can interact with a gateway in several ways.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/how-to/manage-gateways.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage gateways

A Cloudflare Web3 gateway provides HTTP-accessible interfaces to various Web3 networks. You can interact with a gateway in several ways.

## Create a gateway

* [ Dashboard ](#tab-panel-6919)
* [ API ](#tab-panel-6920)

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

When you create a gateway, Cloudflare automatically:

* Creates and adds [records to your Cloudflare DNS](https://developers.cloudflare.com/web3/reference/gateway-dns-records/) so your gateway can receive and route traffic appropriately.
* [Proxies](https://developers.cloudflare.com/dns/proxy-status/) traffic to that hostname.
* Issues an SSL/TLS certificate to cover the specified hostname.

---

## Edit a gateway

Once you have [created a gateway](#create-a-gateway), you can only edit the **Gateway Description** and — if it is an **IPFS** gateway — also edit the value for the [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/) field.

If you need to edit other fields, [delete the gateway](#delete-a-gateway) and create a new one.

* [ Dashboard ](#tab-panel-6911)
* [ API ](#tab-panel-6912)

To edit a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.  
[ Go to **Web3** ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a specific gateway, click **Edit**.
3. Update the **Gateway Description** and — if editing an **IPFS** gateway — the value for the [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/).
4. Click **Reapply**.

To edit specific settings for a gateway, use a [PATCH](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/edit/) request.

---

## Refresh a gateway

When your gateway is stuck in an **Error** [status](https://developers.cloudflare.com/web3/reference/gateway-status/), you should try refreshing the gateway, which attempts to re-create the associated DNS records for the hostname.

* [ Dashboard ](#tab-panel-6913)
* [ API ](#tab-panel-6914)

To refresh a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.  
[ Go to **Web3** ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a gateway, click the dropdown then **Refresh**.

To refresh a gateway using the API, send a [PATCH](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/edit/) request with an empty request body.

---

## Update blocklist

When you set up a [IPFS Universal Path gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/), you may want to add items to the gateway blocklist, which allows you to block access to specific content.

You have the ability to block access to one or more:

* CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
* IPFS content paths (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
* IPNS content paths (`/ipns/example.com`)

* [ Dashboard ](#tab-panel-6915)
* [ API ](#tab-panel-6916)

To add an item to the blocklist using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.  
[ Go to **Web3** ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a specific gateway, click the dropdown then **Blocklist**.
3. Click **Add entry**.
4. Enter the following information:  
   * **Blocklist entry type**: Choose **CID** or **Content path**.  
   * **Blocklist entry content**: Add a CID or content path to block, meaning either a valid CIDv0 or CIDv1 string (CID) or the entry should start with `/ipfs/` or `/ipns/` (content path).  
   * **Blocklist entry description**: Add a description to help you identify the blocklist entry.
5. Click **Add**.

To add a blocklist item using the API, send a [POST](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs%5Funiversal%5Fpaths/subresources/content%5Flists/subresources/entries/methods/create/) request.

---

## Delete a gateway

When you delete a gateway, Cloudflare will automatically remove all associated hostname DNS records. This action will impact your traffic and cannot be undone.

* [ Dashboard ](#tab-panel-6917)
* [ API ](#tab-panel-6918)

To delete a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.  
[ Go to **Web3** ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a specific gateway, click the dropdown then **Remove**.
3. Click **Delete hostname**.

To delete a gateway using the API, send a [DELETE](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/delete/) request.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/how-to/manage-gateways/","name":"Manage gateways"}}]}
```
