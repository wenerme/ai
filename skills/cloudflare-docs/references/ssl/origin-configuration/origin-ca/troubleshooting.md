---
title: Troubleshooting Cloudflare origin CA
description: Troubleshoot issues like NET::ERR_CERT_AUTHORITY_INVALID when using Cloudflare origin CA.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/origin-configuration/origin-ca/troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshooting Cloudflare origin CA

Consider the following common issues and troubleshooting steps when using [Cloudflare origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/).

## NET::ERR\_CERT\_AUTHORITY\_INVALID

### Cause

Site visitors may see untrusted certificate errors if you [pause Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/) or disable proxying on subdomains that use Cloudflare origin CA certificates. These certificates only encrypt traffic between Cloudflare and your origin server, not traffic from client browsers to your origin.

This also means that SSL Labs or similar SSL validators are expected to flag the certificate as invalid.

### Solutions

* Make sure the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) of your DNS records and any [page rules](https://developers.cloudflare.com/rules/page-rules/) (if existing) are set up correctly. If so, you can try to turn proxying off and then on again and wait a few minutes.
* If you must have direct connections between clients and your origin server, consider installing a publicly trusted certificate at your origin instead. This process is done outside of Cloudflare, where you should issue the certificate directly from a certificate authority (CA) of your choice. You can still use Full (strict) [encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/), as long as the CA is listed on the [Cloudflare trust store ↗](https://github.com/cloudflare/cfssl%5Ftrust).

## The issuer of this certificate could not be found

### Cause

Some origin web servers require that you upload the Cloudflare origin CA root certificate or certificate chain.

### Solution

Use the following links to download either an ECC or an RSA version and upload to your origin web server:

* [Cloudflare Origin ECC PEM](https://developers.cloudflare.com/ssl/static/origin%5Fca%5Fecc%5Froot.pem) (do not use with Apache cPanel)
* [Cloudflare Origin RSA PEM](https://developers.cloudflare.com/ssl/static/origin%5Fca%5Frsa%5Froot.pem)

## The certificate is not trusted in all web browsers

### Cause

Apache cPanel requires that you upload the Cloudflare origin CA root certificate or certificate chain.

### Solution

Use the following link to download an RSA version of the root certificate and upload it to your origin web server:

* [Cloudflare Origin RSA PEM](https://developers.cloudflare.com/ssl/static/origin%5Fca%5Frsa%5Froot.pem)

## This zone is either not part of your account, or you do not have access to it

When trying to generate an Origin CA on the dashboard, you find the error `Failed to validate requested hostname <hostname>: This zone is either not part of your account, or you do not have access to it`.

### Cause

This is a known issue where, whilst being created on the Cloudflare dashboard, Origin CA requires API access for the user creating the origin certificate. If the user does not have **API Access**, this error is returned.

### Solution

Make sure that the user creating the certificate has access to the API. You can check in the account **Members** page.

[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members) 
* The default setting for the account is specified in the card **Enable API Access**.
* Specific user API Access (which can override the default setting) is presented after selecting the user in the list of members.

## Origin Server page displays origin certificates for another zone in the account

### Cause

This is a known issue where, when the Origin Server page is opened for different zones in sequence, it displays the certificates from the first zone.

### Solution

Refresh the page in your browser to get the correct origin certificates list for current zone.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/origin-ca/","name":"Cloudflare origin CA"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/origin-ca/troubleshooting/","name":"Troubleshooting Cloudflare origin CA"}}]}
```
