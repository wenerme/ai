---
title: Change URI path and Host header
description: This tutorial shows you how to modify both the URI path and the Host header of incoming requests using Transform Rules and Origin Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Change URI path and Host header

**Last reviewed:**  about 1 year ago 

This tutorial will instruct you how to modify both the URI path and the `Host` header of incoming requests using [Transform Rules](https://developers.cloudflare.com/rules/transform/) and Origin Rules.

Your website visitors will be routed from `https://<YOUR_SOURCE_HOSTNAME>/uploads/*` to `https://<YOUR_TARGET_HOSTNAME>/*`.

In this tutorial you will do the following:

1. Create a URL rewrite to remove `/uploads` from the path.
2. Create an origin rule to modify the `Host` header to desired hostname.

By following these steps, you can effectively manage both URI paths and `Host` headers to route traffic appropriately and optimize request handling.

## 1\. Create a URL rewrite

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **URL Rewrite Rule**.
3. Enter a descriptive name for the rule in **Rule name**.
4. Under **If incoming requests match**, select **Custom filter expression**, select **Edit expression**, and enter the following expression:  
Text in **Expression Editor**:  
```  
raw.http.request.uri.path matches "^/uploads/.*"  
```
5. Under **Set Rewrite parameters**, select **Path** \> **Rewrite to**, and select _Dynamic_.
6. Define the action for your rewrite URL rule:  
Text after **Path** \> **Rewrite to** \> _Dynamic_:  
```  
regex_replace(raw.http.request.uri.path, "^/uploads/", "/")  
```  
The [regex\_replace()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#regex%5Freplace) function replaces the `/uploads/` part of the path with `/`, changing `/uploads/example.jpg` to `/example.jpg`.
7. Select **Deploy**.

## 2\. Create an origin rule

Note

If you are routing traffic to an object storage bucket, use [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) instead of an origin rule.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Origin Rule**.
3. Enter a descriptive name for the rule in **Rule name**.
4. Under **When incoming requests match**, define the rule expression:  
Text in **Expression Editor**:  
```  
raw.http.request.uri.path matches "^/uploads/.*"  
```
5. Under **Set origin parameters**, select **Host Header** \> **Rewrite to**.
6. Configure the rule to modify the `Host` header to desired hostname:  
Text after **Host Header** \> **Rewrite to**:  
```  
example.com  
```  
This will set the [Host header](https://developers.cloudflare.com/rules/origin-rules/features/#host-header) to `example.com` for matching requests. Make sure to replace `example.com` with your actual hostname.
7. (Optional) To route requests to a different origin (DNS target), use [DNS override](https://developers.cloudflare.com/rules/origin-rules/features/#dns-record):  
Text after **DNS Record** \> **Override to**:  
```  
example.com  
```  
This will route requests to the DNS target of `example.com` instead of your default [DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).
8. Select **Deploy**.

## Final remarks

After completing this tutorial, incoming traffic for `https://<YOUR_SOURCE_HOSTNAME>/uploads/*` will be routed to `https://<YOUR_TARGET_HOSTNAME>/*`.

Ensure the filters for the [URL rewrite](https://developers.cloudflare.com/rules/transform/url-rewrite/) and the [origin rule](https://developers.cloudflare.com/rules/origin-rules/) (or [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) rule) are precise to avoid unintended rule executions.

Remember that rules are evaluated [in sequence](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/), so Transform Rules (including URL rewrites) run before Origin Rules or Cloud Connector.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/origin-rules/tutorials/","name":"Origin Rules tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/origin-rules/tutorials/change-uri-path-and-host-header/","name":"Change URI path and Host header"}}]}
```
