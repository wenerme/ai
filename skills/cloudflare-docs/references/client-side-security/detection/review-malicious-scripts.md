---
title: Review resources considered malicious
description: Learn how to review scripts and connections that Cloudflare's client-side security considered malicious.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/detection/review-malicious-scripts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Review resources considered malicious

Note

Domain-based threat intelligence is available to all customers. Malicious code analysis and URL-based threat intelligence require Client-Side Security Advanced.

Cloudflare displays scripts and connections considered malicious at the top of the dashboard lists, so that you can quickly identify those resources, review them, and take action.

## Review malicious scripts

To review the scripts considered malicious:

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-3308)  
   * [ Old dashboard ](#tab-panel-3309)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Select the **Scripts** tab.
3. Select **Details** for each script considered malicious. The script details will contain:  
   * **Malicious code analysis**: Scores between 1-99 classifying how malicious the current script version is, where 1 means definitely malicious and 99 means definitely not malicious.  
   * **Threat intelligence**: Whether the script URL and/or domain is known to be malicious according to threat intelligence feeds. If the script is considered malicious according to the feeds, the dashboard will show a list of associated threat [categories](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/#malicious-script-and-connection-categories). If threat intelligence feeds do not have any information about the script URL or domain, the dashboard will show **Not present**.  
The script details also include the last 10 script versions detected by Cloudflare.  
Note  
The **Hash** value shown in the script details for each script version is an internal identifier. This differs from the file content hash defined by [Subresource Integrity (SRI) ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource%5FIntegrity) that is required to be used in [content security rules](https://developers.cloudflare.com/client-side-security/rules/).  
For more information, refer to [Malicious script and connection detection](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).
4. Based on the displayed information, and with the help of the [last seen/first seen fields in the script details](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/#view-details), review and update the pages where the malicious script was detected.

You can configure alerts for detected malicious scripts. Refer to [Alerts](https://developers.cloudflare.com/client-side-security/alerts/) for more information.

## Review malicious connections

To review the connections considered malicious:

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-3310)  
   * [ Old dashboard ](#tab-panel-3311)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Select **Connections**.
3. Select **Details** for each connection considered malicious. The connection details will contain:  
   * **URL match**: Whether the connection's target URL is known to be malicious according to threat intelligence feeds. This field requires that you configure client-side security to analyze the [full URI](https://developers.cloudflare.com/client-side-security/reference/settings/#connection-target-details) of outgoing connections.  
   * **Domain match**: Whether the connection's target domain is known to be malicious according to threat intelligence feeds.  
   * **Category**: The categorization of the connection considered malicious according to threat intelligence feeds.  
For more information, refer to [Malicious script and connection detection](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).
4. Based on the displayed information, and with the help of the [last seen/first seen fields in the connection details](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/#view-details), review and update the pages where the malicious connection was detected.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/detection/","name":"Detection"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/detection/review-malicious-scripts/","name":"Review resources considered malicious"}}]}
```
