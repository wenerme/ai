---
title: Troubleshooting a slow website
description: Identify and resolve performance issues affecting your website.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting a slow website

This guide helps you identify and resolve performance issues affecting your website. It starts with basic diagnostics and progresses to advanced troubleshooting techniques.

## Before you start: Verify traffic goes through Cloudflare

Before troubleshooting performance, confirm that your traffic is actually going through Cloudflare. If requests bypass Cloudflare, the issue is not related to Cloudflare and this guide will not help.

### Check for the cf-ray header

Every response served through Cloudflare includes a `cf-ray` header. Check for this header:

* [ bash ](#tab-panel-10558)
* [ PowerShell ](#tab-panel-10559)

Terminal window

```

curl -s -D- -o /dev/null https://www.example.com | grep -i cf-ray


```

PowerShell

```

(Invoke-WebRequest -Uri "https://www.example.com" -Method Head).Headers["cf-ray"]


```

If you see a `cf-ray` header (for example, `cf-ray: 8a1b2c3d4e5f6g7h-SJC`), your traffic is going through Cloudflare. If not, check your DNS configuration.

### Verify DNS is pointing to Cloudflare

Your domain must resolve to Cloudflare IP addresses for traffic to be proxied:

* [ bash ](#tab-panel-10560)
* [ PowerShell ](#tab-panel-10561)

Terminal window

```

dig +short www.example.com


```

PowerShell

```

Resolve-DnsName -Name www.example.com | Select-Object -ExpandProperty IPAddress


```

The returned IP addresses should be [Cloudflare IPs ↗](https://www.cloudflare.com/ips/). If they point directly to your origin server, your DNS records are not proxied.

To fix this:

1. Go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns).
2. Find the DNS record for the slow hostname.
3. Ensure the **Proxy status** is set to **Proxied** (orange cloud icon).

Note

If your DNS records are set to **DNS only** (gray cloud), Cloudflare does not proxy the traffic and cannot improve performance. The request goes directly to your origin server.

---

## Gather information about the slow requests

Performance issues are easier to solve when you can pinpoint exactly what is slow. Start by gathering the following information:

1. **Identify specific slow requests** \- Determine which URLs, assets, or API endpoints are slow.
2. **Measure the slowness** \- Quantify the delay (for example, "this image takes 5 seconds to load").
3. **Reproduce the issue** \- Confirm the slowness is consistent and not a one-time occurrence.

---

## Step 1: Use Observatory to analyze performance

[Observatory](https://developers.cloudflare.com/speed/observatory/) provides synthetic tests and real user monitoring (RUM) data to assess your website's performance.

RUM is particularly important as these metrics are captured from your actual visitors' browsers so it's an objective view of how they are experiencing your website, rather than lab data, which is typically more detailed (useful for debugging) but doesn't always correlate with the devices or connectivity real people have access to.

### Run a speed test

1. Go to the Cloudflare dashboard.  
[ Go to **Observatory** ](https://dash.cloudflare.com/?to=/:account/:zone/speed)
2. Select **Observatory**.
3. Enter the URL you want to test and select **Run test**.

### Understand the results

Observatory reports key metrics:

| Metric                             | What it measures                                  | Target            |
| ---------------------------------- | ------------------------------------------------- | ----------------- |
| **Largest Contentful Paint (LCP)** | Time until the largest visible element loads      | Under 2.5 seconds |
| **First Contentful Paint (FCP)**   | Time until the first content appears              | Under 1.8 seconds |
| **Cumulative Layout Shift (CLS)**  | Visual stability during page load                 | Under 0.1         |
| **Time to First Byte (TTFB)**      | Time until the first byte of response is received | Under 800 ms      |
| **Total Blocking Time (TBT)**      | Time the main thread is blocked                   | Under 200 ms      |

Real User Monitoring reports similar metrics but you'll see Interaction to Next Paint (INP) in place of Total Blocking Time (TBT).

TBT only measures during page load but INP measures every interaction real visitors make with your website.

### Enable recommended optimizations

Based on Observatory results, enable relevant [Speed optimizations](https://developers.cloudflare.com/speed/optimization/):

* [Brotli compression](https://developers.cloudflare.com/speed/optimization/content/compression/) \- Compress responses for faster transfer
* [Early Hints](https://developers.cloudflare.com/cache/advanced-configuration/early-hints/) \- Preload critical resources
* [HTTP/2 and HTTP/3](https://developers.cloudflare.com/speed/optimization/protocol/) \- Use modern protocols with multiplexing, allowing multiple requests over a single connection instead of opening separate connections for each asset
* [Image optimization](https://developers.cloudflare.com/images/) \- Automatically optimize and resize images
* [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) \- Defer loading of JavaScript to improve paint times

---

## Step 2: Identify slow resources

If Observatory and RUM data point to specific issues, use browser developer tools to investigate individual resources.

### Use browser developer tools

1. Open your browser's developer tools.
2. Go to the **Network** tab.
3. Reload the page and observe which requests take the longest.
4. Sort by **Time** or **Duration** to identify the slowest assets.
5. Note the specific URLs of slow resources.

Look for:

* Large images or videos
* Slow API calls
* Third-party scripts
* Render-blocking resources

---

## Step 3: Analyze origin performance

If your website is slow, the issue may be at your origin server. Use Origin Analytics to understand how your origin is performing.

### Check origin response times

In the Cloudflare dashboard:

1. Go to **Speed** \> **Origin Analytics**.  
[ Go to **Origin Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/speed/origin-analytics)
2. Review the **Origin Response Time** metrics.
3. Look for patterns in slow responses (specific paths, times of day, or geographic regions).

High origin response times indicate your origin server is struggling. Consider:

* Upgrading your hosting plan
* Optimizing database queries
* Implementing server-side caching

For a full guide on available metrics, diagnostic flows, and how to interpret origin status codes, refer to [Origin Analytics](https://developers.cloudflare.com/speed/origin-analytics/).

### Check for slow Workers

If your zone has [Cloudflare Workers](https://developers.cloudflare.com/workers/) deployed, they execute on every matching request and add to the total response time. A slow Worker is a common cause of high TTFB.

To check if Workers are affecting performance:

1. Go to **Workers & Pages** in the Cloudflare dashboard.
2. Review which Workers are deployed on your zone.
3. Check the **Analytics** for each Worker to see execution times.
4. Temporarily disable Workers to isolate whether they are causing the slowness.

If a Worker is slow, review its code for:

* Slow external API calls or `fetch()` requests
* Inefficient loops or data processing
* Missing `await` statements causing sequential instead of parallel execution

---

## Step 4: Measure performance from the command line

For detailed timing metrics on specific requests, use command-line tools to measure performance.

### Basic performance test

* [ bash ](#tab-panel-10562)
* [ PowerShell ](#tab-panel-10563)

Terminal window

```

curl -w "\n\nDNS Lookup: %{time_namelookup}s\nTCP Connect: %{time_connect}s\nTLS Handshake: %{time_appconnect}s\nTime to First Byte: %{time_starttransfer}s\nTotal Time: %{time_total}s\n" -o /dev/null -s https://www.example.com/slow-asset.jpg


```

PowerShell

```

$url = "https://www.example.com/slow-asset.jpg"

try {

    $timing = Measure-Command {

        $response = Invoke-WebRequest -Uri $url -ErrorAction Stop

    }

    Write-Host "Total Time: $($timing.TotalSeconds)s"

    Write-Host "Status: $($response.StatusCode)"

} catch {

    if ($_.Exception.Response) {

        $statusCode = $_.Exception.Response.StatusCode.value__

        Write-Host "Error Status: $statusCode"

    }

    Write-Host "Error: $($_.Exception.Message)"

}


```

Example output (bash):

```

DNS Lookup: 0.025s

TCP Connect: 0.045s

TLS Handshake: 0.120s

Time to First Byte: 0.350s

Total Time: 1.250s


```

### Understand the metrics

The curl timing breakdown shows the following:

| Metric                        | Description                          | High value indicates                    |
| ----------------------------- | ------------------------------------ | --------------------------------------- |
| **DNS Lookup**                | Time to resolve the domain name      | DNS issues or slow resolver             |
| **TCP Connect**               | Time to establish TCP connection     | Network latency or server distance      |
| **TLS Handshake**             | Time to complete SSL/TLS negotiation | Certificate chain issues or slow server |
| **Time to First Byte (TTFB)** | Time until first response byte       | Slow origin processing                  |
| **Total Time**                | Complete request duration            | Large file size or slow transfer        |

### Test from different locations

To test from different geographic locations, use online tools like:

* [KeyCDN Tools ↗](https://tools.keycdn.com/performance)
* [Uptrends ↗](https://www.uptrends.com/tools/website-speed-test)
* [Dotcom-Tools ↗](https://www.dotcom-tools.com/website-speed-test)

---

## Step 5: Investigate caching

Caching is one of the most effective ways to improve website performance. When content is cached, Cloudflare serves it directly from a data center close to your visitors, eliminating the round trip to your origin server. This can reduce response times from hundreds of milliseconds to just a few milliseconds.

Uncached content must travel from the visitor to Cloudflare, then to your origin server, and back again. Use [Cache Analytics](https://developers.cloudflare.com/cache/performance-review/cache-analytics/) to understand your cache performance and identify opportunities to cache more content.

### Check if assets are cached

Check the cache status of a specific asset:

* [ bash ](#tab-panel-10564)
* [ PowerShell ](#tab-panel-10565)

Terminal window

```

curl -s -D- -o /dev/null https://www.example.com/asset.jpg | grep -i "cf-cache-status"


```

PowerShell

```

(Invoke-WebRequest -Uri "https://www.example.com/asset.jpg" -Method Head).Headers["cf-cache-status"]


```

Possible values:

| Status          | Meaning                                 | Action                        |
| --------------- | --------------------------------------- | ----------------------------- |
| **HIT**         | Served from Cloudflare cache            | No action needed              |
| **MISS**        | Not in cache, fetched from origin       | May need cache rules          |
| **DYNAMIC**     | Not eligible for caching                | Create a cache rule if static |
| **BYPASS**      | Cache intentionally bypassed            | Review cache rules            |
| **EXPIRED**     | Cached copy was stale                   | Increase Edge TTL             |
| **REVALIDATED** | Cloudflare confirmed content is current | Increase Edge TTL             |

For a complete list, refer to [Cloudflare cache responses](https://developers.cloudflare.com/cache/concepts/cache-responses/).

### Use Cache Analytics

1. Go to the Cloudflare dashboard.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/caching)
2. Review the **Cache Performance** section.
3. Filter by **Cache status equals MISS** or **DYNAMIC** to identify uncached content.

### Investigate why static content is not cached

If static assets (images, CSS, JavaScript) show a cache status of `DYNAMIC`, `BYPASS`, or `MISS`, investigate the cause:

| Symptom                 | Likely cause                                                                                                                                           | Solution                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DYNAMIC status          | Content type not in [default file extensions](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions) | Create a Cache Rule to cache the content                                                                                                                                                                                  |
| DYNAMIC status          | Origin sends Cache-Control: private or no-store                                                                                                        | Create a Cache Rule to [override origin cache control](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#origin-cache-control)                                                                         |
| BYPASS status           | A Cache Rule is bypassing cache                                                                                                                        | Review your [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) configuration                                                                                                                      |
| MISS on every request   | Response includes Set-Cookie header                                                                                                                    | Configure your origin to not set cookies on static assets, or use a Cache Rule to [ignore cookies](https://developers.cloudflare.com/cache/concepts/cache-behavior/#interaction-of-set-cookie-response-header-with-cache) |
| MISS with query strings | Different query strings create different cache entries                                                                                                 | Use a [custom cache key](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/custom-cache-key/) to ignore or normalize query strings                                                                      |

### Cache additional static content

By default, Cloudflare only caches certain [file extensions](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions). To cache additional static content:

1. Go to **Caching** \> **Cache Rules**.
2. Create a rule to [cache specific content](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-everything/).
3. Set appropriate [Edge TTLs](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl).

Warning

Be careful when caching HTML or API responses. These often contain personalized or dynamic content that should not be cached. Only cache content you are certain is static.

### Use Cloudflare Trace to debug cache rules

If your cache rules are not applying as expected, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to simulate a request and see exactly which rules match. Trace shows you how your Cloudflare configurations (including cache rules, page rules, and other settings) would affect a specific URL.

This is particularly useful when:

* A cache rule should be caching content but the response shows `DYNAMIC` or `BYPASS`
* You are unsure which rule is taking precedence
* You want to test a "what-if" scenario before making changes

---

## Step 6: Diagnose network issues

If curl shows high TCP Connect or TLS Handshake times, the issue may be network-related rather than application-related.

### Test your Internet connection

Visit [speed.cloudflare.com ↗](https://speed.cloudflare.com) to test:

* Download and upload speeds
* Latency (ping)
* Jitter
* Packet loss

Poor results indicate issues with your local network or ISP.

### Run MTR from your location to Cloudflare

MTR combines traceroute and ping to show latency and packet loss at each network hop.

* [ macOS/Linux ](#tab-panel-10566)
* [ Windows ](#tab-panel-10567)

Terminal window

```

mtr -rw www.example.com


```

Download [WinMTR ↗](https://github.com/White-Tiger/WinMTR/releases) and run it with your domain as the target.

Look for:

* **High latency** at specific hops (indicates slow network segments)
* **Packet loss** (indicates network congestion or issues)
* **Timeouts** (may indicate firewalls or routing issues)

For more details, refer to [How to read MTR ↗](https://www.cloudflare.com/learning/network-layer/what-is-mtr/).

### Run MTR from your origin to Cloudflare

If you have access to your origin server, run MTR from the origin to a [Cloudflare IP address ↗](https://www.cloudflare.com/ips/) to test the network path between your origin and Cloudflare.

Terminal window

```

mtr -rw 104.16.132.229


```

High latency or packet loss on this path affects all requests that miss the cache.

---

## Step 7: Understand network routing

How requests are routed to Cloudflare data centers can significantly impact performance.

### Identify which data center serves your requests

Add `/cdn-cgi/trace` to your domain to see which Cloudflare data center is serving your requests:

* [ bash ](#tab-panel-10568)
* [ PowerShell ](#tab-panel-10569)

Terminal window

```

curl https://www.example.com/cdn-cgi/trace


```

PowerShell

```

Invoke-RestMethod -Uri "https://www.example.com/cdn-cgi/trace"


```

The `colo` field shows the three-letter airport code of the serving data center (for example, `colo=SJC` for San Jose). You can find the full list of Cloudflare data centers and their codes on the [Cloudflare status page ↗](https://www.cloudflarestatus.com/).

### Why routing matters

When a request reaches Cloudflare:

1. The request is routed to a nearby Cloudflare data center based on anycast [routing ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/).
2. If the content is cached, it is served immediately.
3. If not cached, Cloudflare fetches from your origin server.

If your origin server is geographically distant from the Cloudflare data center serving your users, uncached requests will be slow.

### Troubleshoot unexpected routing

If requests are being routed to a data center that seems far from the user, this may be due to Cloudflare's automated traffic engineering or a user’s ISP routing traffic.

While Cloudflare always strives to provide the best possible performance by serving traffic from the closest location, reliability is the top priority. In instances where performance and reliability are in conflict, Cloudflare's systems are designed to prioritize a stable connection over a local one.

For more details, refer to [Cloudflare traffic not being sent to the geographically closest data center](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/).

Common causes of unexpected routing:

| Symptom                                 | Explanation                                                                  |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| Requests route to a distant data center | Cloudflare traffic engineering for reliability, or ISP routing decisions     |
| Routing changes between requests        | Normal behavior - routing adapts to network conditions or ISP load balancing |
| Consistent routing to a distant region  | ISP peering location or Cloudflare capacity management                       |
| High latency despite nearby data center | Network congestion on the path                                               |

### Solutions for origin distance

Consider these solutions based on your needs:

| Solution                                                                         | Description                                           | Best for                           |
| -------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------- |
| **Improve cache hit ratio**                                                      | Cache more content to reduce origin fetches           | All sites                          |
| **[Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/)** | Use upper-tier data centers to reduce origin requests | Sites with global traffic          |
| **[Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/)**  | Route traffic over faster network paths               | Sites with slow origin connections |
| **Move origin closer**                                                           | Deploy origin servers in multiple regions             | Large-scale applications           |

### Enable Argo Smart Routing

[Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/) analyzes network conditions in real-time and routes traffic over the fastest paths, reducing latency by an average of 30%.

Argo Smart Routing is part of [Smart Shield](https://developers.cloudflare.com/smart-shield/), which bundles multiple Cloudflare performance and reliability features.

To enable Argo Smart Routing:

1. Go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/smart-shield).
2. Follow the [Smart Shield setup guide](https://developers.cloudflare.com/smart-shield/get-started/) to enable the feature.

Argo is particularly effective when:

* Your origin is far from your users
* Network congestion affects certain paths
* You need consistent performance globally

For detailed information about how Argo Smart Routing works, refer to the [Argo Smart Routing documentation](https://developers.cloudflare.com/argo-smart-routing/).

---

## Contact Support if the problem persists

If you have followed the steps above and the performance issue persists, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for assistance.

When contacting Support, provide as much evidence as possible to help diagnose the issue:

* **HAR file** \- [Generate a HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file) that captures the slow requests. This provides detailed timing information for every request.
* **Observatory results** \- Share screenshots or links to your Observatory test results.
* **RUM data** \- If you have Web Analytics enabled, share relevant metrics showing the performance issue.
* **curl output** \- Include the timing breakdown from `curl --write-out` for the slow assets.
* **MTR results** \- If you suspect network issues, include MTR output from your location to the affected domain.
* **Specific URLs** \- List the exact URLs that are slow, along with the expected and actual response times.

The more evidence you provide showing the slowness, the faster Support can identify and resolve the issue.

---

## Related resources

* [Observatory](https://developers.cloudflare.com/speed/observatory/) \- Test and monitor website performance
* [Cache Analytics](https://developers.cloudflare.com/cache/performance-review/cache-analytics/) \- Analyze cache hit rates
* [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) \- Control what gets cached
* [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/) \- Optimize network routing
* [Gathering information for troubleshooting](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) \- Collect diagnostic data

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/troubleshooting/slow-website/#page","headline":"Troubleshooting a slow website · Cloudflare Speed docs","description":"Identify and resolve performance issues affecting your website.","url":"https://developers.cloudflare.com/speed/troubleshooting/slow-website/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/troubleshooting/slow-website/","name":"Troubleshooting a slow website"}}]}
```
