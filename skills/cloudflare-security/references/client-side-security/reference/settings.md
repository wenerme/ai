---
description: Configure client-side security monitoring, logging, and connection tracking settings.
title: Configuration settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration settings

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/client-side-security/reference/settings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Reporting endpoint

When enabled, client-side security's resource monitoring uses a Content Security Policy (CSP) [report-only HTTP header](https://developers.cloudflare.com/client-side-security/reference/csp-header/) to gather information about all the scripts running on your application.

By default, reports are sent to a Cloudflare-owned endpoint:

```txt
https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

Customers with Client-Side Security Advanced can change the reporting endpoint so that the CSP reports are sent to the same hostname:

```txt
<YOUR-HOSTNAME>/cdn-cgi/script-monitor/report?<QUERY_STRING>
```

### Prerequisites for using the same hostname for CSP reports

Using the same hostname for CSP reporting may interfere with other Cloudflare products. Before selecting this option, ensure that your Cloudflare configuration complies with the following:

* No rate limiting rules match the `cdn-cgi/*` URL path
* No custom rules match the `cdn-cgi/*` URL path

### Configure the reporting endpoint

Note

Only available to customers with Client-Side Security Advanced.

To configure the CSP reporting endpoint:

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. Under **Continuous script monitoring** \> **Configurations**, select the edit icon next to **Reporting endpoint**.
4. Select **Cloudflare-owned endpoint** or **Same hostname**.
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Client-side security** \> **Settings**.
3. Under **Reporting endpoint**, select **Cloudflare-owned endpoint** or **Same hostname**.
4. Select **Apply settings**.

## Connection target details

When connection targets are reported to Cloudflare, their URIs can sometimes include sensitive data such as session ID.

By default, client-side security only checks the domain against malicious threat intelligence feeds. You can choose to let Cloudflare use the full URI when analyzing the connections made from your domain's pages. Any sensitive data present in the URI will be logged in clear text, and any user with access to the connection monitor dashboard will be able to view it.

### Configure the connection target details to use

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. Under **Continuous script monitoring** \> **Configurations**, select the edit icon next to **Data processing**.
4. Select **Log host only** to analyze only the hostname or **Log full URI** to use the full URI.
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Client-side security** \> **Settings**.
3. Under **Connection target details**, select **Log host only** to analyze only the hostname or **Log full URI** to use the full URI in client-side security.
4. Select **Apply settings**.

## Turn off client-side resource monitoring

When you turn off client-side security's resource monitoring, you lose visibility on the scripts running on your zone, the outbound connections made from pages in your domain, and cookies detected in HTTP traffic.

To turn off client-side resource monitoring:

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. Next to **Continuous script monitoring**, set the toggle to **Off**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Client-side security** \> **Settings**.
3. In **Continuous monitoring and alerting**, select **Disable**.

Turning off client-side security's resource monitoring does not turn off [content security rules](https://developers.cloudflare.com/client-side-security/rules/) (previously known as policies). To turn off content security rules:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Content security rules**.
3. For each rule, select the three dots next to it > **Disable**.

1. Go to **Security** \> **Client-side security** \> **Rules**.
2. For each rule, set the toggle to **Off**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/reference/settings/#page","headline":"Configuration settings · Client-side security docs","description":"Configure client-side security monitoring, logging, and connection tracking settings.","url":"https://developers.cloudflare.com/client-side-security/reference/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
