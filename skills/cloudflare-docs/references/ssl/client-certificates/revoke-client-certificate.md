---
title: Revoke a client certificate
description: Revoke a client certificate to block its use.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/client-certificates/revoke-client-certificate.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Revoke a client certificate

You can revoke a client certificate you previously generated with the default [Cloudflare-managed CA](https://developers.cloudflare.com/ssl/client-certificates/).

It is not possible to permanently delete client certificates generated with the default Cloudflare-managed CA. Once revoked, these client certificates will still be listed on the [**Client Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates) page, and can be restored at any time.

## Steps

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select the certificate you want to revoke.
3. Select **Revoke** and confirm the operation.

Important

After revoking a certificate, you must update any mTLS rules that check for the presence of a client certificate so that they block all requests that include a revoked certificate.

For more information, refer to [Check for revoked certificates](https://developers.cloudflare.com/api-shield/security/mtls/configure/#check-for-revoked-certificates).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/revoke-client-certificate/","name":"Revoke a client certificate"}}]}
```
