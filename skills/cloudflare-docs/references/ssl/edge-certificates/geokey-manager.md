---
title: Geo Key Manager
description: Control the geographic storage location of your private SSL/TLS keys.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/geokey-manager/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Geo Key Manager

Restrict where the private keys used for TLS certificates are stored and managed.

Geo Key Manager allows customers to store and manage the encryption keys for their domains in different geographic locations so they can meet compliance regulations and keep data secure.

## Resources

* [ Setup ](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/setup/)
* [ Supported options ](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/)

## Limitations

Currently, Geo Key Manager is limited to [custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) and available only through the Cloudflare API.

---

## Related products

**[Data Localization Suite](https://developers.cloudflare.com/data-localization/)** 

The Data Localization Suite (DLS) is a set of products that helps customers who want to maintain local control over their traffic while retaining the security benefits of a global network.

**[Geo Key Manager (v1)](https://blog.cloudflare.com/introducing-cloudflare-geo-key-manager/)** 

The first version of Geo Key Manager supports 3 regions: U.S., E.U., and a set of High Security Data Centers. If you would like to restrict your private key to another country or region, [apply for the closed beta ↗](https://www.cloudflare.com/lp/geo-key-manager/) of the new version.

---

## More resources

[Plans](https://www.cloudflare.com/plans/#overview) 

Compare available Cloudflare plans

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/geokey-manager/","name":"Geo Key Manager"}}]}
```
