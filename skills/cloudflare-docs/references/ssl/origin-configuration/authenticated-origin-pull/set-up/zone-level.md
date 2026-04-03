---
title: Zone-level
description: When you enable Authenticated Origin Pulls (AOP) for a zone, all proxied traffic to your zone is authenticated at the origin web server.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Zone-level

When you enable Authenticated Origin Pulls (AOP) for a zone, all proxied traffic to your zone is authenticated at the origin web server.

## Before you begin

Make sure your zone is using an [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) of **Full** or higher.

Warning

Zone-level AOP certificates are also applied to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) configured on a Cloudflare for SaaS zone. If you need a different AOP certificate to apply to different custom hostnames, use [Per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

## 1\. Upload certificate to origin

First, upload a certificate to your origin.

To use a Cloudflare certificate (which uses a specific CA), [download the .PEM file](https://developers.cloudflare.com/ssl/static/authenticated%5Forigin%5Fpull%5Fca.pem) and upload it to your origin. This certificate is **not** the same as the [Cloudflare origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) and will not appear on your Dashboard.

To use a custom certificate, follow the API instructions to [upload a custom certificate to Cloudflare](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), but use the [origin\_tls\_client\_auth endpoint](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/create/). Then, upload the certificate to your origin.

Warning

Although Cloudflare provides you a certificate to easily configure zone-level authenticated origin pulls, this certificate is not exclusive to your account and only guarantees that a request is coming from the Cloudflare network. If you want more strict security, you should upload your own certificate.

Using a custom certificate is required if you need your domain to be [FIPS ↗](https://en.wikipedia.org/wiki/Federal%5FInformation%5FProcessing%5FStandards) compliant.

## 2\. Configure origin to accept client certificates

With the certificate installed, set up your origin web server to accept client certificates.

Check the examples below for Apache and NGINX or refer to your origin web server documentation - e.g. [HAProxy ↗](https://www.haproxy.com/documentation/hapee/latest/security/authentication/client-certificate-authentication/), [Traefik ↗](https://doc.traefik.io/traefik/https/tls/#client-authentication-mtls), [Caddy ↗](https://caddyserver.com/docs/json/apps/http/servers/tls%5Fconnection%5Fpolicies/client%5Fauthentication/mode/).

Apache example

```

SSLCACertificateFile /path/to/origin-pull-ca.pem


```

For this example, you would have saved your certificate to `/path/to/origin-pull-ca.pem`.

To use the Cloudflare certificate, download it from step 1 above, rename the .PEM file, and then upload it to `/path/to/origin-pull-ca.pem` before applying the settings. 

NGINX example

```

ssl_verify_client optional;

ssl_client_certificate /etc/nginx/certs/cloudflare.crt;


```

For this example, you would have saved your certificate to `/etc/nginx/certs/cloudflare.crt`.

To use the Cloudflare certificate, download it from step 1 above, rename the .PEM file, and then upload it to `/etc/nginx/certs/cloudflare.crt` before applying the settings. 

At this point, you may also want to enable logging on your origin so that you can verify the configuration is working.

## 3\. Configure Cloudflare to use client certificate

Then, enable the Authenticated Origin Pulls feature as an option for your Cloudflare zone.

This step sets the TLS Client Auth to require Cloudflare to use a client certificate when connecting to your origin server.

* [ Dashboard ](#tab-panel-6571)
* [ API ](#tab-panel-6572)

To enable **Authenticated Origin Pulls** in the dashboard:

1. In the Cloudflare dashboard, go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. For **Authenticated Origin Pulls**, switch the toggle to **On**.

Warning

Note that this step means Authenticated Origin Pulls will be available, but you still have to go through the following steps to complete the configuration.

To enable or disable **Authenticated Origin Pulls** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `tls_client_auth` as the setting name in the URI path, and the `value` parameter set to your desired setting (`"on"` or `"off"`).

Warning

Note that this step means Authenticated Origin Pulls will be available, but you still have to go through the following steps to complete the configuration.

## 4\. Enforce validation check on your origin

Once you can confirm everything is working as expected for your specific origin setup, configure your origin to enforce the authentication.

Apache example

```

SSLVerifyClient require


```

NGINX example

```

ssl_verify_client on;


```

After completing the process, you can use `curl` to send requests directly to your origin IPs, verifying that the requests fail due to certificate validation being enforced.

## 5\. (Optional) Set up expiration alerts

You can configure alerts to receive notifications before your AOP certificates expire.

Zone-level Authenticated Origin Pulls Certificate Expiration Alert

**Who is it for?**

Customers that upload their own certificate to use with zone-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server. AOP certificate expiration notifications are sent 30 days and 14 days before the certificate expiry.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/).

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

## Further options

Refer to [Manage certificates](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/) for further options.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/","name":"Zone-level"}}]}
```
