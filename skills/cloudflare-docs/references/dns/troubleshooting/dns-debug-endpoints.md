---
title: Available debug endpoints
description: Use dig commands against Cloudflare nameservers to find your public IP, connected data center, DNS software version, and more.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Debugging ](https://developers.cloudflare.com/search/?tags=Debugging) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/troubleshooting/dns-debug-endpoints.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Available debug endpoints

The following debug endpoints are available via `dig` or other DNS query tools.

Note

For all commands, replace `alex.ns.cloudflare.com` with your Cloudflare-assigned nameservers.

## Get your public IP address

Terminal window

```

dig @alex.ns.cloudflare.com chaos txt myip.cloudflare +short


```

This command returns your public IP address, meaning the IP address that Cloudflare receives the DNS query from. This is useful for debugging when you need to know your own IP.

## Find your connected data center

Terminal window

```

dig @alex.ns.cloudflare.com chaos txt id.server +short


```

This command returns the Cloudflare data center you are connecting to, for DNS queries sent from where you execute this command.

## Check the DNS software version

Terminal window

```

dig @alex.ns.cloudflare.com chaos txt version.bind +short


```

This command returns the version of Cloudflare's authoritative DNS software that is running on the data center you are connected to. Usually, the same version is present on all Cloudflare data centers. However, since Cloudflare performs staged releases, different versions can exist on different data centers.

## Get your IP, ASN, and country code

Terminal window

```

dig @alex.ns.cloudflare.com txt whoami.cloudflare.net +short


```

This command returns your public IP (same as the first command), your ASN, and the associated country code, all indicating where you are sending the query from.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/troubleshooting/dns-debug-endpoints/","name":"Available debug endpoints"}}]}
```
