---
description: Create, edit, and delete Web3 gateways.
title: Manage gateways
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

#  Manage gateways

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/web3/how-to/manage-gateways/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A Cloudflare Web3 gateway provides HTTP-accessible interfaces to various Web3 networks. You can interact with a gateway in several ways.

## Create a gateway

To create a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.
[ Go to **Web3** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
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

```bash
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

```json
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

To edit a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.
[ Go to **Web3** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a specific gateway, click **Edit**.
3. Update the **Gateway Description** and — if editing an **IPFS** gateway — the value for the [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/).
4. Click **Reapply**.

To edit specific settings for a gateway, use a [PATCH](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/edit/) request.

---

## Refresh a gateway

When your gateway is stuck in an **Error** [status](https://developers.cloudflare.com/web3/reference/gateway-status/), you should try refreshing the gateway, which attempts to re-create the associated DNS records for the hostname.

To refresh a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.
[ Go to **Web3** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a gateway, click the dropdown then **Refresh**.

To refresh a gateway using the API, send a [PATCH](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/edit/) request with an empty request body.

---

## Update blocklist

When you set up a [IPFS Universal Path gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/), you may want to add items to the gateway blocklist, which allows you to block access to specific content.

You have the ability to block access to one or more:

* CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
* IPFS content paths (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
* IPNS content paths (`/ipns/example.com`)

To add an item to the blocklist using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.
[ Go to **Web3** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
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

To delete a gateway using the dashboard:

1. In the Cloudflare dashboard, go to the **Web3** page.
[ Go to **Web3** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/web3)
2. On a specific gateway, click the dropdown then **Remove**.
3. Click **Delete hostname**.

To delete a gateway using the API, send a [DELETE](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/delete/) request.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/how-to/manage-gateways/#page","headline":"Manage gateways · Cloudflare Web3 docs","description":"Create, edit, and delete Web3 gateways.","url":"https://developers.cloudflare.com/web3/how-to/manage-gateways/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
