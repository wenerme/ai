---
title: Convert full setup to partial setup
description: Convert a full DNS setup to a partial CNAME setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Convert full setup to partial setup

If you initially configured a [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/), you can later convert your zone to use a CNAME setup (also known as partial setup).

A CNAME setup allows you to use [Cloudflare's reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) on individual subdomains while using a different authoritative DNS provider.

## Before you begin

Make sure you consider the following:

* It will not be possible to use Cloudflare's reverse proxy on the zone apex (`example.com`), only on subdomains.
* On the dashboard, you will only be able to create A, AAAA, and CNAME records, which are the DNS record types that can be [proxied](https://developers.cloudflare.com/dns/proxy-status/).
* You should plan for SSL/TLS certificates. If you are only using [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) prior to converting your zone, a certificate will be provisioned for your subdomains only after each of the respective DNS records are proxied. If your domain is sensitive to downtime, instead of using Universal SSL, consider using an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) with [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/#setup).

## 1\. Prepare DNS records

1. Export a zone file  
   * [ Dashboard ](#tab-panel-6765)  
   * [ API ](#tab-panel-6766)  
To export records using the dashboard:  
   1. In the Cloudflare dashboard, go to the **DNS Records** page.  
   [ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)  
   2. Select **Import and Export**.  
   3. Select **Export**.  
To export records using the API, send a [GET request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/export/).  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Read`  
   * `DNS Write`  
Export DNS Records  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/export" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Import the zone file into your new primary DNS provider.
3. Create or update your records so that you have CNAME records pointing to `{your-hostname}.cdn.cloudflare.net` for every hostname you wish to proxy through Cloudflare.  
Example CNAME record at authoritative DNS provider  
The CNAME record for `www.example.com` would be:  
```  
www.example.com CNAME www.example.com.cdn.cloudflare.net  
```
4. Remove any previously existing A, AAAA, or CNAME records referencing the hostnames you want to proxy through Cloudflare. For these hostnames, leave only the records pointing to `{your-hostname}.cdn.cloudflare.net`.
5. Confirm you have the correct record for every subdomain that should be proxied through Cloudflare.

## 2\. Convert the zone

* [ Dashboard ](#tab-panel-6763)
* [ API ](#tab-panel-6764)

1. On the Cloudflare dashboard, go to the zone's **Overview** page.
2. Select **Convert to CNAME DNS Setup** and then **Convert** to confirm.
3. Save the information from the **Verification TXT Record**. If you lose the information, you can also access it on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page, under **Verification TXT Record**.

1. Use the [Edit Zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) with `type` set to `partial` to convert the zone type.
2. Take note of the value returned under `verification_key` in the API response. This will be used in the next step.

## 3\. Verify ownership

Add the **Verification TXT Record** at your authoritative DNS provider. Cloudflare will verify the TXT record and send a confirmation email. This can take up to a few hours.

Example verification record

A verification record for `example.com` might be:

| Type | Name                          | Content             |
| ---- | ----------------------------- | ------------------- |
| TXT  | cloudflare-verify.example.com | 966215192-518620144 |

Note

If your authoritative DNS provider automatically appends DNS record `name` fields with your domain, make sure to only insert `cloudflare-verify` as the record name. Otherwise, it may result in an incorrect record name, such as `cloudflare-verify.example.com.example.com`.

After creating the record, you can use this [Dig Web Interface link ↗](https://digwebinterface.com/?type=TXT&ns=auth&nameservers=) to search (`dig`) for `cloudflare-verify.<YOUR DOMAIN>` and validate if it is working.

The verification record must remain in place for as long as your domain is active on a CNAME setup on Cloudflare.

If your organization has multiple Cloudflare accounts, also consider using zone holds to have more control over [domain ownership](https://developers.cloudflare.com/dns/zone-setups/partial-setup/#domain-ownership).

## 4\. Update your nameservers

Once verification is complete, update the nameservers at your domain registrar to point to your new authoritative DNS provider. Make sure to remove the Cloudflare nameservers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/conversions/","name":"DNS setup conversions"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/conversions/convert-full-to-partial/","name":"Convert full setup to partial setup"}}]}
```
