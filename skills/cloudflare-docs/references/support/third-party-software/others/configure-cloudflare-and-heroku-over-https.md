---
title: Configure Cloudflare and Heroku over HTTPS
description: Set up Cloudflare with Heroku for HTTPS traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Configure Cloudflare and Heroku over HTTPS

## Overview

Heroku is a cloud PaaS that supports several pre-configured programming languages. Heroku deals with all your infrastructure so you can focus on your application without having to work at the command line.

This article describes how to configure Heroku with Cloudflare to serve your traffic over HTTPS. For this article, we'll assume that you already have an [active domain on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/), as well as a running Heroku app.

---

## Step 1 - Add a custom domain to your Heroku app

Follow Heroku's instructions: [Custom Domain Names for Apps ↗](https://devcenter.heroku.com/articles/custom-domains).

---

## Step 2 - Add a subdomain in Cloudflare DNS

Below, you will need to add DNS records for a subdomain and the apex domain (also known as "root domain"). Learn how to [Managing DNS records in Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

### Step 2a - Add a subdomain

In the Cloudflare dashboard, go to the **DNS Records** page.

[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) 

Add a 'www' _CNAME_ record that points to the custom domain (also known as _DNS target_) that you obtained in Step 1 above for your subdomain.

| Type  | Name | Target                         | Proxy status |
| ----- | ---- | ------------------------------ | ------------ |
| CNAME | www  | {example-domain}.herokudns.com | Proxied      |

### Step 2b - Add your root domain

Adding a root or apex domain on Heroku also requires using a CNAME record pointed from your root. You cannot use A records on Heroku because no IP addresses are exposed for Heroku users to use.

Fortunately, Cloudflare offers [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/) to resolve requests for your root domain.

Add a CNAME record for your root and point it to DNS target you obtained in Step 1 above for your domain.

| Type  | Name | Target                         | Proxy status |
| ----- | ---- | ------------------------------ | ------------ |
| CNAME | @    | {example-domain}.herokudns.com | Proxied      |

---

## Step 3 - Confirm that your domain is routed through Cloudflare

The easiest way to confirm that Cloudflare is working for your domain is to issue a cURL command.

Terminal window

```

curl -I www.example.com


```

```

HTTP/1.1 200 OK

Date: Tue, 23 Jan 2018 18:51:30 GMT

Content-Type: text/html; charset=UTF-8

Connection: keep-alive

Cache-Control: public, max-age=0

Last-Modified: Mon, 31 Dec 1979 04:08:00 GMT

X-Powered-By: Express

Server: cloudflare

CF-RAY: 3e1cf1d936f28c52-SFO-DOG


```

You can identify Cloudflare-proxied requests by the _CF-Ray_ response header. If either of these two are present, your requests are being proxied by Cloudflare accordingly.

You can repeat the above cURL command for any of the subdomains that you have configured within your DNS settings.

---

## Step 4 - Configure your domain for SSL

### Step 4a - Enable SSL

Cloudflare provides a SANs wildcard certificate with all paid plans, and a SNI wildcard certificate with the Free plan. Full details on SSL [can be found here ↗](https://www.cloudflare.com/ssl).

If you don't know what this means, navigate to the **Overview** tab of the **SSL/TLS** app in your Cloudflare dashboard. Select _Flexible_ mode to serve your site over HTTPS to all public visitors.

Once the certificate status changes to **• Active Certificate**, incoming traffic will be served to your site over HTTPS. Visitors will see HTTPS prefixed to your domain name in the browser bar.

### Step 4b - Force all traffic over HTTPS

To ensure all traffic to your site is encrypted, Cloudflare lets you force an automatic HTTPS redirect. To configure this, refer to [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/).

You can then use a cURL command to verify that all requests are being forced over HTTPS.

Terminal window

```

curl -I -L example.com


```

```

HTTP/1.1 301 Moved Permanently

Date: Tue, 23 Jan 2018 23:17:44 GMT

Connection: keep-alive

Cache-Control: max-age=3600

Expires: Wed, 24 Jan 2018 00:17:44 GMT

Location: https://example.com/

Server: cloudflare

CF-RAY: 3e1e77d5c42b8c52-SFO-DOG


```

If SSL was not working for your domain (for example, your SSL certificate has not yet been issued), you would see a [525](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/) or [526](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-526/) HTTP response after the redirect.

Please note that the issuing of a Universal SSL certificate typically takes up to 24 hours. Our paid SSL certificates issue within 10-15 minutes.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/others/","name":"Others"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/others/configure-cloudflare-and-heroku-over-https/","name":"Configure Cloudflare and Heroku over HTTPS"}}]}
```
