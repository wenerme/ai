---
description: View and filter scripts, connections, and cookies detected on your domain.
title: Monitor resources and cookies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor resources and cookies

Last updated Aug 3, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Once you [activate client-side security's resource monitoring](https://developers.cloudflare.com/client-side-security/get-started/), the main client-side resources dashboard will show which resources (scripts and connections) are running on your domain, as well as the cookies recently detected in HTTP traffic.

If you notice unexpected scripts or connections on the dashboard, check them for signs of malicious activity. Customers with Client-Side Security Advanced will have their [connections and scripts classified as potentially malicious](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/) based on threat feeds. You should also check for any new or unexpected cookies.

Notes

- Users in Free and Pro plans only have access to script monitoring.
- If you recently activated client-side resource monitoring, you may see a delay in reporting.

## Use the client-side resources dashboards

To review the resources detected by Cloudflare:

1. In the Cloudflare dashboard, go to the **Web assets** page. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the **Client-side resources** tab.
3. Review the list of scripts, connections, and cookies for your domain, depending on your Cloudflare plan. To apply a filter, select **Add filter** and use one or more of the available options.<details><summary>Available filters</summary>

   - **Status**: Filter scripts or connections by <a href="https://developers.cloudflare.com/client-side-security/reference/script-statuses/">status</a>.
   - **Script URL**: Filter scripts by their URL.
   - **Connection URL**: Filter connections by their target URL. Depending on your <a href="https://developers.cloudflare.com/client-side-security/reference/settings/#connection-target-details">configuration</a>, it may search only by target hostname.
   - **Seen on host**: Look for scripts appearing on specific hostnames, or connections made in a specific hostname.
   - **Seen on page** (requires a Business or Enterprise plan): Look for scripts appearing in a specific page, or for connections made in a specific page. Searches the first page where the script was loaded (or where the connection was made) and the latest occurrences list.
   - **Type**: Filter cookies according to their type: first-party cookies or unknown.
   - Cookie property: Filter by a cookie property such as **Name**, **Domain**, **Path**, **Same site**, **HTTP only**, and **Secure**.</details>

4. Depending on your plan, you may be able to [view the details of each item](#view-details).

## View all reported scripts or connections

The All Reported Connections and All Reported Scripts dashboards show all the detected resources including infrequent or inactive ones, reported in the last 30 days. After 30 days without any report, Cloudflare will delete information about a previously reported resource, and it will no longer appear in any of the dashboards.

Note

Scripts blocked by a [content security rule](https://developers.cloudflare.com/client-side-security/rules/) continue to appear in your monitored scripts list for as long as the browser keeps loading them. A blocked script is only removed after it has not been detected for 30 consecutive days.

1. In the Cloudflare dashboard, go to the **Web assets** page. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the **Client-side resources** tab.
3. Select **Scripts** or **Connections**.
4. Select **View all scripts** or **View all connections**.
5. Review the information displayed in the dashboard.

You can filter the data in these dashboards using different criteria, and print a report with the displayed records.

## View details

Note

Only available to customers on Business and Enterprise plans.

1. In the Cloudflare dashboard, go to the **Web assets** page. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the **Client-side resources** tab.
3. Select **Scripts**, **Connections**, or **Cookies** (the available options depend on your plan).
4. Next to a script, connection, or cookie in the list, select **Details**.<details><summary>

   Script and connection details</summary>

   - **Last seen**: How long ago the resource was last detected (in the last 30 days).
   - **First seen at**: The date and time when the resource was first detected.
   - **Seen on host**: The host where the script is being loaded or the connection is being made.
   - **Seen on pages**: The most recent pages where the resource was detected (up to 10 pages).
   - **First seen on**: The page where the resource was first detected.

   The script details also include the last 10 script versions detected by client-side security.

   Note

   The **Hash** value shown in the script details for each script version is an internal identifier. This differs from the file content hash defined by <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity">Subresource Integrity (SRI) ↗︎</a> that is required to be used in <a href="https://developers.cloudflare.com/client-side-security/rules/">content security rules</a>.</details>

<details><summary>

   Cookie details</summary>

   - **Type**: A cookie can have the following types:
     - **First-party**: Cookies set by the origin server through a <code>set-cookie</code> HTTP response header.
     - **Unknown**: All other detected cookies.
   - **Domain**: The value of the <code>Domain</code> cookie attribute. When not set or unknown, this value is derived from the host.
   - **Path**: The value of the <code>Path</code> cookie attribute. When not set or unknown, this value is derived from the most recent page where the cookie was detected.
   - **Last seen**: How long ago the resource was last detected (in the last 30 days).
   - **First seen at**: The date and time when the cookie was first detected.
   - **Seen on host**: The host where the cookie was first detected.
   - **Seen on pages**: The most recent pages where the cookie was detected (up to 10 pages).
   - Additional cookie attributes (only available with Client-Side Security Advanced):
     - **Max age**: The value of the <code>Max-Age</code> cookie attribute.
     - **Expires**: The value of the <code>Expires</code> cookie attribute.
     - **Lifetime**: The approximate cookie lifetime, based on the <code>Max-Age</code> and <code>Expires</code> cookie attributes.
     - **HTTP only**: The value of the <code>HttpOnly</code> cookie attribute.
     - **Secure**: The value of the <code>Secure</code> cookie attribute.
     - **Same site**: The value of the <code>SameSite</code> cookie attribute.

   Except for **Domain** and **Path**, <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">standard cookie attributes ↗︎</a> are only available for first-party cookies, where Cloudflare detected the <code>set-cookie</code> HTTP response header in HTTP traffic.</details>

## Export data

Note

Only available to customers with Client-Side Security Advanced.

Use this feature to extract data for review and annotation. The data in the exported file will honor any filters you configure in the dashboard.

To export script, connection, or cookie information in CSV format:

1. In the Cloudflare dashboard, go to the **Web assets** page. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the **Client-side resources** tab.
3. Select **Scripts**, **Connections**, or **Cookies**.
4. (Optional) Apply any filters to the displayed data.
5. Select **Download CSV**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/#page","headline":"Monitor resources and cookies","description":"View and filter scripts, connections, and cookies detected on your domain.","url":"https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
