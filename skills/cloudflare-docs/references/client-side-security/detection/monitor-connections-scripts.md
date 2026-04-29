---
title: Monitor resources and cookies
description: View and filter scripts, connections, and cookies detected on your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitor resources and cookies

Once you [activate client-side security's resource monitoring](https://developers.cloudflare.com/client-side-security/get-started/), the main client-side resources dashboard will show which resources (scripts and connections) are running on your domain, as well as the cookies recently detected in HTTP traffic.

If you notice unexpected scripts or connections on the dashboard, check them for signs of malicious activity. Customers with Client-Side Security Advanced will have their [connections and scripts classified as potentially malicious](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/) based on threat feeds. You should also check for any new or unexpected cookies.

Notes

* Users in Free and Pro plans only have access to script monitoring.
* If you recently activated client-side resource monitoring, you may see a delay in reporting.

## Use the client-side resources dashboards

To review the resources detected by Cloudflare:

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-4483)  
   * [ Old dashboard ](#tab-panel-4484)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Review the list of scripts, connections, and cookies for your domain, depending on your Cloudflare plan. To apply a filter, select **Add filter** and use one or more of the available options.  
Available filters  
   * **Status**: Filter scripts or connections by [status](https://developers.cloudflare.com/client-side-security/reference/script-statuses/).  
   * **Script URL**: Filter scripts by their URL.  
   * **Connection URL**: Filter connections by their target URL. Depending on your [configuration](https://developers.cloudflare.com/client-side-security/reference/settings/#connection-target-details), it may search only by target hostname.  
   * **Seen on host**: Look for scripts appearing on specific hostnames, or connections made in a specific hostname.  
   * **Seen on page** (requires a Business or Enterprise plan): Look for scripts appearing in a specific page, or for connections made in a specific page. Searches the first page where the script was loaded (or where the connection was made) and the latest occurrences list.  
   * **Type**: Filter cookies according to their type: first-party cookies or unknown.  
   * Cookie property: Filter by a cookie property such as **Name**, **Domain**, **Path**, **Same site**, **HTTP only**, and **Secure**.
3. Depending on your plan, you may be able to [view the details of each item](#view-details).

## View all reported scripts or connections

The All Reported Connections and All Reported Scripts dashboards show all the detected resources including infrequent or inactive ones, reported in the last 30 days. After 30 days without any report, Cloudflare will delete information about a previously reported resource, and it will no longer appear in any of the dashboards.

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-4485)  
   * [ Old dashboard ](#tab-panel-4486)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Select **Scripts** or **Connections**.
3. Select **View all scripts** or **View all connections**.
4. Review the information displayed in the dashboard.

You can filter the data in these dashboards using different criteria, and print a report with the displayed records.

## View details

Note

Only available to customers on Business and Enterprise plans.

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-4487)  
   * [ Old dashboard ](#tab-panel-4488)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Select **Scripts**, **Connections**, or **Cookies** (the available options depend on your plan).
3. Next to a script, connection, or cookie in the list, select **Details**.  
Script and connection details  
   * **Last seen**: How long ago the resource was last detected (in the last 30 days).  
   * **First seen at**: The date and time when the resource was first detected.  
   * **Seen on host**: The host where the script is being loaded or the connection is being made.  
   * **Seen on pages**: The most recent pages where the resource was detected (up to 10 pages).  
   * **First seen on**: The page where the resource was first detected.  
The script details also include the last 10 script versions detected by client-side security.  
Note  
The **Hash** value shown in the script details for each script version is an internal identifier. This differs from the file content hash defined by [Subresource Integrity (SRI) ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource%5FIntegrity) that is required to be used in [content security rules](https://developers.cloudflare.com/client-side-security/rules/).  
Cookie details  
   * **Type**: A cookie can have the following types:  
         * **First-party**: Cookies set by the origin server through a `set-cookie` HTTP response header.  
         * **Unknown**: All other detected cookies.  
   * **Domain**: The value of the `Domain` cookie attribute. When not set or unknown, this value is derived from the host.  
   * **Path**: The value of the `Path` cookie attribute. When not set or unknown, this value is derived from the most recent page where the cookie was detected.  
   * **Last seen**: How long ago the resource was last detected (in the last 30 days).  
   * **First seen at**: The date and time when the cookie was first detected.  
   * **Seen on host**: The host where the cookie was first detected.  
   * **Seen on pages**: The most recent pages where the cookie was detected (up to 10 pages).  
   * Additional cookie attributes (only available with Client-Side Security Advanced):  
         * **Max age**: The value of the `Max-Age` cookie attribute.  
         * **Expires**: The value of the `Expires` cookie attribute.  
         * **Lifetime**: The approximate cookie lifetime, based on the `Max-Age` and `Expires` cookie attributes.  
         * **HTTP only**: The value of the `HttpOnly` cookie attribute.  
         * **Secure**: The value of the `Secure` cookie attribute.  
         * **Same site**: The value of the `SameSite` cookie attribute.  
Except for **Domain** and **Path**, [standard cookie attributes ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) are only available for first-party cookies, where Cloudflare detected the `set-cookie` HTTP response header in HTTP traffic.

## Export data

Note

Only available to customers with Client-Side Security Advanced.

Use this feature to extract data for review and annotation. The data in the exported file will honor any filters you configure in the dashboard.

To export script, connection, or cookie information in CSV format:

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-4489)  
   * [ Old dashboard ](#tab-panel-4490)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Select **Scripts**, **Connections**, or **Cookies**.
3. (Optional) Apply any filters to the displayed data.
4. Select **Download CSV**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/detection/","name":"Detection"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/detection/monitor-connections-scripts/","name":"Monitor resources and cookies"}}]}
```
