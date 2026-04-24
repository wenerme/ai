---
title: Custom certificates
description: Upload and manage your own TLS certificates on Cloudflare.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/custom-certificates/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Custom certificates

Custom certificates are meant for Business and Enterprise customers who want to use their own SSL certificates.

  
Unlike [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) or [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for custom certificates. When you use custom certificates, the following actions should be considered and accomplished by you:

* [Upload the certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).
* [Update the certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#update-an-existing-custom-certificate).
* [Observe the certificate expiration date to avoid downtime](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/renewing/).

Note

If your custom certificate does not cover all of your first-level hostnames, you can enable [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) to cover them.

If your custom certificate is from a [certificate authority that Cloudflare partners with](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), consider switching to a Cloudflare-managed certificate to benefit from automatic issuance and renewal.

## Certificate packs

Before deploying custom certificates to Cloudflare's global network, Cloudflare automatically groups the certificates into certificate packs.

A certificate pack is a group of certificates that share the same set of hostnames — for example, `example.com` and `*.example.com` — but use different signature algorithms.

Each pack can include up to three certificates, one from each of the following signature algorithms:

* `SHA-2/RSA`
* `SHA-2/ECDSA`
* `SHA-1/RSA`

Each pack only counts as one SSL certificate against your custom certificate quota.

Note

You cannot delete the primary certificate if secondary certificates are present in the pack.

## Availability

| Free                  | Pro | Business | Enterprise            |                                                               |
| --------------------- | --- | -------- | --------------------- | ------------------------------------------------------------- |
| Availability          | No  | No       | Yes                   | Yes                                                           |
| Certificates included | 0   | 0        | 1 Modern and 1 Legacy | 1 Modern (can purchase more) and 1 Legacy (can purchase more) |

## Related features

### Certificate Signing Requests (CSRs)

As part of the custom certificate process, you can leverage Cloudflare to generate your [Certificate Signing Request (CSR)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-signing-requests/). This additional option means that Cloudflare will safely generate and store the private key associated with the CSR.

### Geo Key Manager (private key restriction)

By default, Cloudflare encrypts and securely distributes private keys to all Cloudflare data centers, where they can be used for local SSL/TLS termination. If you want to restrict where your private keys may be used, use [Geo Key Manager](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/).

### Keyless SSL

If you want to upload a custom certificate but retain your private key on your own infrastructure, consider using [Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/custom-certificates/","name":"Custom certificates"}}]}
```
