---
title: Point to Pages with a custom domain
description: This tutorial will instruct you how to configure an origin rule and a DNS record to point to a Pages deployment with a custom domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Point to Pages with a custom domain

**Last reviewed:**  about 1 year ago 

This tutorial will instruct you how to configure an origin rule and a DNS record to point to a Pages deployment with a custom domain.

The procedure will use the following example values:

| URL that website visitors will access | mycustomerexample.com/blog/\* |
| ------------------------------------- | ----------------------------- |
| Zone domain                           | mycustomerexample.com         |
| Cloudflare Pages subdomain            | myblog.pages.dev              |
| Cloudflare Pages custom domain        | blogmirror.example.com        |

When configuring your Pages custom domain, use a custom domain that you do not plan to use in production (`blogmirror.example.com` in this example).

## 1\. Configure custom domain in your Pages project

To add the custom domain to your Pages deployment:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Custom domains**.
4. Select **Set up a custom domain**.
5. Enter `blogmirror.example.com` and select **Continue**.

When you add the custom domain to your Pages deployment, Cloudflare automatically creates a `CNAME` DNS record for the custom domain.

## 2\. Create origin rule to rewrite host header and override DNS record

In your `mycustomerexample.com` zone, create an origin rule with the following configuration:

**If incoming requests match**

| Field    | Operator | Value    |
| -------- | -------- | -------- |
| URI Path | wildcard | /blog/\* |

If using the Expression Editor, enter the following expression:

```

(http.request.uri.path wildcard "/blog/*")


```

**Set origin parameters**

* Value after **Host header** \> **Rewrite to**: `blogmirror.example.com`
* Value after **DNS record** \> **Override to**: `blogmirror.example.com`

## 3\. (Optional) Configure URL rewrite

In this example, the URL that website visitors will access starts with `/blog`. However, the Pages deployment does not have this initial URL segment.

Use a URL rewrite to remove the `/blog` segment from the URL path.

1. Go to **Rules** \> **Overview**.
2. Select **Create rule** \> **URL Rewrite Rule**.
3. Enter a descriptive name for the rule in **Rule name**.
4. In **If incoming requests match**, select **Wildcard pattern**.
5. Enter the following value in **Request URL**:  
```  
https://<YOUR_HOSTNAME>/blog/*  
```  
In the current example, the value would be `https://mycustomerexample.com/blog/*`.
6. In **Then rewrite the path and/or query**, enter the following values under **Path**:  
| Target path   | Rewrite to |  
| ------------- | ---------- |  
| \[/\] blog/\* | \[/\] ${1} |
7. Select **Deploy**.

Note

Cloudflare provides a rule template in the dashboard called **Rewrite Path for Object Storage Bucket** that you can use and adapt to configure the URL rewrite rule.

## More resources

* [Tutorial: Change URI Path and Host Header](https://developers.cloudflare.com/rules/origin-rules/tutorials/change-uri-path-and-host-header/)
* [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
* [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/origin-rules/tutorials/","name":"Origin Rules tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/origin-rules/tutorials/point-to-pages-with-custom-domain/","name":"Point to Pages with a custom domain"}}]}
```
