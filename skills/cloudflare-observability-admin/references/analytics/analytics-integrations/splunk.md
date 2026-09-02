---
description: This tutorial explains how to analyze Cloudflare Logs using the Cloudflare App for Splunk.
title: Splunk
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Splunk

Last updated Sep 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-integrations/splunk/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial explains how to analyze [Cloudflare Logs ↗](https://www.cloudflare.com/products/cloudflare-logs/) using the [Cloudflare App for Splunk ↗](https://splunkbase.splunk.com/app/4501/).

## Prerequisites

Before sending your Cloudflare log data to Splunk, ensure that you:

* Have an existing Splunk Enterprise or Cloud account
* Have a Cloudflare Enterprise account
* Consult the [Splunk documentation ↗](https://splunkbase.splunk.com/app/4501/) for the Cloudflare App

## Task 1 - Install and Configure the Cloudflare App for Splunk

To install the [Cloudflare App for Splunk ↗](https://splunkbase.splunk.com/app/4501/):

1. Log in to your Splunk instance.
2. Under **Apps** \> **Find More Apps**, search for _Cloudflare App for Splunk._
3. Click **Install**.
![Splunk website with Apps menu expanded and Search & Reporting menu item along with Cloudflare App for Splunk](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2410,height=1174,format=webp/_astro/splunk-cloudflare-app-for-splunk.CSImDJTK.png)
1. Restart and reopen your Splunk instance.
2. Edit the `cloudflare:json` source type in the Cloudflare App for Splunk. To edit the source type:

  1. Click the **Settings** dropdown and select **Source types**.
  2. Uncheck **Show only popular** and search for _cloudflare_.
  3. Click **Edit** and change the Regex expression to `([\r\n]+)`.
  4. Save your edits.
3. Create an index on Splunk to store the HTTP Event logs. To create an index:

  1. Open the setup screen by clicking the **Settings** dropdown, then click **Indexes**.
  2. Select **New Index**. Note that the **Indexes** page also gives you the status of all your existing indexes so that you can see whether you're about to use up your licensed amount of space.
  3. Name the index **cloudflare**, which is the default index that the Cloudflare App will use.
  4. Set **Index Data Type** to **Events**, then select **Save**.
4. Set up the HTTP Event Collector (HEC) on Splunk. To create an HEC:

  1. Click the **Settings** dropdown and select **Data inputs**.
  2. Select **+Add new** next to **HTTP Event Collector** and follow the wizard. When prompted, submit the following responses:
    * Name: Cloudflare
    * Source Type: Select > `cloudflare:json`
    * App Context: Cloudflare App for Splunk (cloudflare)
    * Index: cloudflare
  3. At the end of the wizard you will see a **Token Value**. This token authorizes the Cloudflare Logpush job to send data to your Splunk instance. If you forget to copy it now, Splunk allows you to get the value at any time.
Enable HEC and SSL
After creating the token, go to **Settings** \> **Data inputs** \> **HTTP Event Collector** \> **Global Settings** and confirm that **All Tokens** is turned on and that **Enable SSL** is selected, then select **Save**. Verify that the status of your new HEC token is enabled in the token list. Refer to the [Splunk HEC documentation ↗](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector) for details.
5. Verify whether Splunk is using a self-signed certificate. You'll need this information when creating the Logpush job.
6. Determine the endpoint to use to send the data to. The endpoint should be:

```sql
"<protocol>://input-<host>:<port>/<endpoint>" or "<protocol>://http-inputs-<host>:<port>/<endpoint>"
```

Where:

* `protocol`: HTTP or HTTPS
* `input`: `input` or `http-inputs` based on whether you have a self-service or managed cloud plan
* `host`: The hostname of your Splunk instance. The easiest way to determine the hostname is to look at the URL you went to when you logged in to Splunk.
* `port`: 443 or 8088
* `endpoint`: services/collector/raw

For example: `https://prd-p-0qk3h.splunkcloud.com:8088/services/collector/raw`. Refer to the [Splunk Documentation ↗](https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector) for more details and examples.

**Post Installation Notes**

You can change the **Index Name** after the initial configuration by clicking on the **Settings** dropdown and navigating to **Advanced search**. There you can select **Search macros** and look for the Cloudflare App for Splunk.

![Splunk interface highlighting Apps menu and Manage Apps option along with Enable Acceleration checkbox](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2534,height=1104,format=webp/_astro/splunk-settings-advanced-search-search-macros.Bt1szjjM.png)

The Cloudflare App for Splunk comes with a custom Cloudflare Data Model that has an acceleration time frame of 1 day but is not accelerated by default. If you enable [Data Model acceleration ↗](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Acceleratedatamodels), we recommend that the Data Model is only accelerated for 1 or 7 days to ensure there are no adverse effects within your Splunk environment.

Enable or disable acceleration after the initial configuration by accessing the app Set up page by clicking the **Apps** dropdown, then **Manage Apps** \> **Cloudflare Set Up**.

![Splunk Advanced Search page highlighted Search macros and Advanced search](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2522,height=1060,format=webp/_astro/splunk-apps-manage-apps-cloudflare-set-up-enable-data-model-acceleration.KQW0iwYr.png)

You can also manually configure Data Models by going to **Settings** \> **Data models**. Learn more about data model acceleration in the [Splunk documentation ↗](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Acceleratedatamodels).

## Task 2 - create the Cloudflare Logpush job to Splunk

Create the Logpush job by following [Enable Logpush to Splunk](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/splunk/). When you fill in the Splunk destination:

* Use the endpoint you configured in [Task 1](#task-1---install-and-configure-the-cloudflare-app-for-splunk) for **Splunk HEC URL**, including the `/services/collector/raw` path.
* Use the HEC token you created in [Task 1](#task-1---install-and-configure-the-cloudflare-app-for-splunk) for **Auth Token**, prefixed with `Splunk` (for example, `Splunk 12345678-1234-1234-1234-1234567890ab`).
* Set **Source Type** to the value that matches the dataset you want to push, so the Cloudflare App for Splunk parses events correctly:
  * HTTP requests, Firewall events, Spectrum events, and most zone-scoped datasets: `cloudflare:json`
  * DNS logs, including Zero Trust Gateway DNS: `cloudflare:dns`
  * Audit logs: `cloudflare:audit`
  * Access requests: `cloudflare:access`
  * CASB findings: `cloudflare:casb`
  * Zero Trust Gateway HTTP: `cloudflare:http`
  * Zero Trust Gateway Network: `cloudflare:network`
* Only turn on **Use insecure skip verify option** if your Splunk instance uses a self-signed certificate, as noted in [Task 1](#task-1---install-and-configure-the-cloudflare-app-for-splunk).

Under **Send the following fields**, keep the defaults or refer to the [Dashboard section](#task-3---view-the-dashboards) to select the fields required to fully populate the Cloudflare App for Splunk dashboards.

After you create the job, enable it to start sending logs. To confirm end-to-end delivery, run the following search in Splunk:

```txt
index="cloudflare"
```

Cloudflare sends two system confirmation events to verify connectivity and delivery setup as soon as you enable the job. Regular Cloudflare logs start streaming shortly afterward. Data can take a few minutes to appear.

## Task 3 - View the Dashboards

You can analyze Cloudflare logs with the thirteen (13) dashboards listed below.

You can use filters within these dashboards to help narrow the analysis by date and time, device type, country, user agent, client IP, hostname, and more to further help with debugging and tracing.

### About the Dashboards

The following dashboards outlined below are available as part of the Cloudflare App for Splunk.

#### Cloudflare - Snapshot

_Web Traffic Overview_ and _Web Traffic Types_: Get an overview of the most important metrics from your websites and applications on the Cloudflare network. ![Splunk dashboard with Web Traffic Overview metrics](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2770,height=1850,format=webp/_astro/splunk-cloudflare-snapshot-dashboard.Du4lsJw_.png)

#### Cloudflare - Reliability

_Summary_ and _Detailed_: Get insights on the availability of your websites and applications. Metrics include origin response error ratio, origin response status over time, percentage of 3xx/4xx/5xx errors over time, and more. ![Splunk dashboard with a high level summary of Reliability metrics](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2776,height=1340,format=webp/_astro/splunk-cloudflare-reliability-summary-dashboard.C1py_8XX.png)

![Splunk dashboard with a detailed summary of Reliability metrics](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2780,height=1398,format=webp/_astro/splunk-cloudflare-reliability-detailed-dashboard.jeSlAQnq.png)

#### Cloudflare - Security

_Overview_: Get insights on threats to your websites and applications, including number of threats stopped, threats over time, top threat countries, and more. ![Splunk dashboard with an overview of Security metrics](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2780,height=1890,format=webp/_astro/splunk-cloudflare-security-overview.D-c4Punh.png)

_WAF_: Get insights on threat identification and mitigation by our Web Application Firewall, including events like SQL injections, XSS, and more. Use this data to fine tune the firewall to target obvious threats and prevent false positives. ![Splunk dashboard with an overview of Security metrics for WAF](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2778,height=1788,format=webp/_astro/splunk-cloudflare-security-waf-dashboard.DTZrF-bl.png)

_Rate Limiting_: Get insights on rate limiting protection against denial-of-service attacks, brute-force login attempts, and other types of abusive behavior targeted at your websites or applications. ![Splunk dashboard with an overview of Security metrics for Rate Limiting](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2772,height=1188,format=webp/_astro/splunk-cloudflare-security-rate-limiting-dashboard.CRoUKWVc.png)

_Bots Summary_ and _Bots Detailed_: Investigate bot activity on your website to prevent content scraping, checkout fraud, spam registration and other malicious activities. ![Splunk dashboard with a high level summary of Security metrics for Bots](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2772,height=1304,format=webp/_astro/splunk-cloudflare-security-bot-summary-dashboard.S5k4rphZ.png)

![Splunk dashboard with a detailed summary of Security metrics for Bots](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2770,height=1622,format=webp/_astro/splunk-cloudflare-security-bots-detailed-dashboard.x_RSBUYB.png)

#### Cloudflare - Performance

_Requests and Cache_ and _Bandwidth_: Identify and address performance issues and caching misconfigurations. Metrics include total vs. cached bandwidth, saved bandwidth, total requests, cache ratio, top uncached requests, and more. ![Splunk dashboard with Performance metrics for Requests and Cache](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2772,height=1934,format=webp/_astro/splunk-cloudflare-performance-requests-and-cache-dashboard.CzCMXwsS.png)

![Splunk dashboard with Performance metrics for Bandwidth](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2774,height=1334,format=webp/_astro/splunk-cloudflare-performance-bandwidth-dashboard.B0Io0qTc.png)

_Hostname, Content Type, Request Methods, Connection Type_: Get insights into your most popular hostnames, most requested content types, breakdown of request methods, and connection type.

![Splunk dashboard with Cloudflare Performance metrics including for Hostname, Content Type, Request Methods, Connection Type](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2788,height=1898,format=webp/_astro/splunk-cloudflare-performance-hostname-dashboard.BNc0Yvsw.png)

_Static vs. Dynamic Content_: Get insights into the performance of your static and dynamic content, including slowest URLs. ![Splunk dashboard with Cloudflare Performance metrics for Static vs. Dynamic Content](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2776,height=1902,format=webp/_astro/splunk-cloudflare-performance-static-vs-dynamic-dashboard.Dx9F5klY.png)

### Filters

All dashboard have a set of filters that you can apply to the entire dashboard, as shown in the following example. Filters are applied across the entire dashboard.

![Available dashboard filters from the Splunk dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2792,height=480,format=webp/_astro/splunk-filters.D7I8q-lv.png)

You can use filters to drill down and examine the data at a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

The default time interval is set to 24 hours. Note that for correct calculations filter will need to exclude Worker subrequests (**WorkerSubrequest** \= _false_) and purge requests (**ClientRequestMethod** is not _PURGE_).

Available Filters:

* Time Range (EdgeStartTimestamp)
* Client Country
* Client Device type
* Client IP
* Client Request Host
* Client Request URI
* Client Request User Agent
* Edge response status
* Origin IP
* Origin Response Status
* RayID
* Worker Subrequest
* Client Request Method

## Splunk CIM field mappings

The Cloudflare App for Splunk maps Cloudflare log fields to [Splunk Common Information Model (CIM) ↗](https://docs.splunk.com/Documentation/CIM/latest/User/Overview) field names, so that you can search, correlate, and accelerate Cloudflare data alongside other CIM-compliant sources in your Splunk deployment. The following tables list the mappings the app applies per Cloudflare Logpush dataset.

### HTTP requests

The app applies the following mappings:

| Cloudflare field        | Splunk CIM field    |
| ----------------------- | ------------------- |
| ClientIP                | src\_ip             |
| ClientRequestBytes      | bytes\_in           |
| ClientRequestHost       | dest\_host          |
| ClientRequestMethod     | http\_method        |
| ClientRequestPath       | uri\_path           |
| ClientRequestReferer    | http\_referrer      |
| ClientRequestURI        | uri                 |
| ClientRequestUserAgent  | http\_user\_agent   |
| ClientSrcPort           | src\_port           |
| ClientSSLProtocol       | ssl\_protocol       |
| EdgeRateLimitAction     | action              |
| EdgeResponseBytes       | bytes\_out          |
| EdgeResponseContentType | http\_content\_type |
| EdgeResponseStatus      | status              |
| OriginIP                | dest\_ip            |
| OriginResponseTime      | response\_time      |

### CASB findings

The app applies the following mappings:

| Cloudflare field       | Splunk CIM field |
| ---------------------- | ---------------- |
| AssetDisplayName       | dest             |
| AssetLink              | url              |
| FindingTypeDisplayName | category         |
| FindingTypeID          | category\_id     |
| FindingTypeSeverity    | severity         |
| InstanceID             | signature\_id    |

### Zero Trust Gateway DNS

The app applies the following mappings:

| Cloudflare field | Splunk CIM field |
| ---------------- | ---------------- |
| DstIP            | dest             |
| DstPort          | dest\_port       |
| Protocol         | transport        |
| QueryName        | query            |
| QueryTypeName    | query\_type      |
| RCode            | reply\_code      |
| SrcIP            | src              |
| SrcPort          | src\_port        |

### Audit logs

The app applies the following mappings:

| Cloudflare field | Splunk CIM field |
| ---------------- | ---------------- |
| ActionResult     | status           |
| ActionType       | action           |
| ActorID          | user             |
| ActorIP          | src              |
| ActorType        | user\_category   |
| OwnerID          | src\_user        |

### Access requests

The app applies the following mappings:

| Cloudflare field             | Splunk CIM field        |
| ---------------------------- | ----------------------- |
| Action                       | action                  |
| AppDomain                    | app                     |
| Connection                   | authentication\_service |
| IPAddress                    | src                     |
| PurposeJustificationResponse | reason                  |
| RayID                        | signature\_id           |
| UserUID                      | user\_id                |

### Zero Trust Gateway HTTP

The app applies the following mappings:

| Cloudflare field | Splunk CIM field  |
| ---------------- | ----------------- |
| Action           | action            |
| DestinationIP    | dest              |
| DestinationPort  | dest\_port        |
| HTTPMethod       | http\_method      |
| Referer          | http\_referrer    |
| SourceIP         | src               |
| URL              | url               |
| UserAgent        | http\_user\_agent |
| UserID           | user              |

### Zero Trust Gateway Network

The app applies the following mappings:

| Cloudflare field | Splunk CIM field       |
| ---------------- | ---------------------- |
| Action           | action                 |
| DestinationIP    | dest\_ip               |
| DestinationPort  | dest\_port             |
| DeviceName       | dvc                    |
| OverrideIP       | dest\_translated\_ip   |
| OverridePort     | dest\_translated\_port |
| PolicyID         | rule                   |
| SessionID        | session\_id            |
| SourceIP         | src\_ip                |
| SourcePort       | src\_port              |
| Transport        | transport              |
| UserID           | user                   |

## Debugging tips

### Incomplete dashboards

The Splunk Cloudflare App relies on data from the Cloudflare Enterprise Logs fields outlined below. Depending on which fields you have enabled, certain dashboards might not populate fully.

If that is the case, verify and test the Cloudflare App filters below each dashboard (these filters are the same across all dashboards). You can delete any filters that you do not need, even if such filters include data fields already contained in your logs.

Also, you could compare the list of fields you are getting in Cloudflare Logs with the fields listed in **Splunk** \> **Settings** \> **Data Model** \> **Cloudflare**.

The available fields are:

* CacheCacheStatus
* CacheResponseBytes
* CacheResponseStatus (deprecated)
* ClientASN
* ClientCountry
* ClientDeviceType
* ClientIP
* ClientIPClass
* ClientRequestBytes
* ClientRequestHost
* ClientRequestMethod
* ClientRequestPath
* ClientRequestProtocol
* ClientRequestReferer
* ClientRequestURI
* ClientRequestUserAgent
* ClientSSLCipher
* ClientSSLProtocol
* ClientSrcPort
* EdgeColoCode
* EdgeColoID
* EdgeEndTimestamp
* EdgePathingOp
* EdgePathingSrc
* EdgePathingStatus
* EdgeRequestHost
* EdgeResponseBytes
* EdgeResponseContentType
* EdgeResponseStatus
* EdgeServerIP
* EdgeStartTimestamp
* OriginIP
* OriginResponseStatus
* OriginResponseTime
* OriginSSLProtocol
* RayID
* SecurityAction
* SecurityActions
* SecurityRuleDescription
* SecurityRuleID
* SecurityRuleIDs
* SecuritySources
* WAFFlags
* WAFMatchedVar
* WorkerSubrequest
* ZoneID

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/splunk/#page","headline":"Splunk · Cloudflare Analytics docs","description":"This tutorial explains how to analyze Cloudflare Logs using the Cloudflare App for Splunk.","url":"https://developers.cloudflare.com/analytics/analytics-integrations/splunk/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
