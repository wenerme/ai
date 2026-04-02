---
title: Create a client certificate
description: To create a client certificate on the Cloudflare dashboard:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/client-certificates/create-a-client-certificate.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a client certificate

To create a client certificate on the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select **Create Certificate** and fill in the required fields. You can choose one of the following options:
* Generate a private key and Certificate Signing Request (CSR) with Cloudflare.
* Use your own private key and CSR. This option allows you to also [label client certificates](https://developers.cloudflare.com/ssl/client-certificates/label-client-certificate/).  
Example OpenSSL command  
To generate and use your own CSR, you can run a command like the following:  
Terminal window  
```  
openssl req -new -newkey rsa:2048 -nodes -keyout client1.key -out client1.csr -subj '/C=GB/ST=London/L=London/O=Organization/CN=CommonName'  
```

Note

Client certificates created on the dashboard are issued by a [Cloudflare-managed CA](https://developers.cloudflare.com/ssl/client-certificates/#how-it-works). If you need to use certificates issued by another CA, use the API to [bring your own CA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/) instead.

1. Select a value for **Certificate Validity**, and choose **Create**.
2. Make sure to copy the certificate and private key as they will no longer be displayed after creation.
3. Select **OK** to confirm.

## Next steps

After creating the client certificate, make sure it is installed on the client devices and [enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/) for each hostname that should require a certificate from clients.

Refer to our [mTLS at Cloudflare learning path](https://developers.cloudflare.com/learning-paths/mtls/concepts/) for further context.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/create-a-client-certificate/","name":"Create a client certificate"}}]}
```
