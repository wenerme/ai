---
title: URL Scanner
description: To better understand Internet usage around the world, use Cloudflare's URL Scanner. With Cloudflare's URL Scanner, you have the ability to investigate the details of a domain, IP, URL, or ASN. Cloudflare's URL Scanner is available in the Security Center of the Cloudflare dashboard, Cloudflare Radar, and the Cloudflare API.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/radar/investigate/url-scanner.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# URL Scanner

To better understand Internet usage around the world, use Cloudflare's URL Scanner. With Cloudflare's URL Scanner, you have the ability to investigate the details of a domain, IP, URL, or ASN. Cloudflare's URL Scanner is available in the Security Center of the Cloudflare dashboard, [Cloudflare Radar ↗](https://radar.cloudflare.com/scan), and the Cloudflare [API](https://developers.cloudflare.com/api/resources/url%5Fscanner/).

## Use the API

To make your first URL scan using the API, you must obtain a URL Scanner specific [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). Create a Custom Token with _Account_ \> _URL Scanner_ in the **Permissions** group, and select _Edit_ as the access level.

Once you have the token, and you know your `account_id`, you are ready to make your first request to the API at `https://api.cloudflare.com/client/v4/accounts/{account_id}/urlscanner/`.

### Submit URL to scan

To submit a URL to scan, the only required information is the URL to be scanned in the `POST` request body:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/urlscanner/v2/scan" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "url": "https://www.example.com"

}'


```

By default, the report will have a `Public` visibility level, which means it will appear in the [recent scans ↗](https://radar.cloudflare.com/scan#recent-scans) list and in search results. It will also include a single screenshot with desktop resolution.

A successful response will have a status code of `200` and be similar to the following:

```

{

  "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

  "api": "https://api.cloudflare.com/client/v4/accounts/<accountId>/urlscanner/v2/result/095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

  "visibility": "public",

  "url": "https://www.example.com",

  "message": "Submission successful"

}


```

You can submit up to 100 URLs at the same time via the [API ↗](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/bulk%5Fcreate/).

The `uuid` property in the response above identifies the scan and will be required when fetching the scan report.

#### Submit a custom URL Scan

Here's an example request body with some custom configuration options:

```

{

  "url": "https://example.com",

  "screenshotsResolutions": [

    "desktop", "mobile", "tablet"

  ],

  "customagent": "XXX-my-user-agent",

  "referer": "example",

  "customHeaders": {

    "Authorization": "xxx-token"

  },

  "visibility": "Unlisted"

}


```

Above, the visibility level is set as `Unlisted`, which means that the scan report won't be included in the [recent scans ↗](https://radar.cloudflare.com/scan#recent-scans) list nor in search results. In effect, only users with knowledge of the scan ID will be able to access it.

There will also be three screenshots taken of the webpage, one per target device type. The [User-Agent ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent) will be set as "XXX-my-user-agent". Note that you can set any custom HTTP header, including [Authorization ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization).

Header

Successful scans are subject to a retention policy of 12 months. Failed scans older than 30 days will be deleted.

### Get scan report

Once the URL Scan submission is made, the current progress can be checked by calling `https://api.cloudflare.com/client/v4/accounts/{account_id}/urlscanner/v2/result/{scan_id}`. The `scan_id` will be the `uuid` value returned in the previous response.

While the scan is in progress, the HTTP status code will be `404`; once it is finished, it will be `200`. Cloudflare recommends that you poll every 10-30 seconds.

The response will include, among others, the following top properties:

* `task` \- Information on the scan submission.
* `page` \- Information pertaining to the primary response, for example IP address, ASN, server, and page redirect history.
* `data.requests` \- Request chains involved in the page load.
* `data.cookies` \- Cookies set by the page.
* `data.globals` \- Non-standard JavaScript global variables.
* `data.console` \- Console logs.
* `data.performance` \- Timings as given by the [PerformanceNavigationTiming ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) interface.
* `meta` \- Meta processors output including detected technologies, domain and URL categories, rank, geolocation information, and others.
* `lists.ips` \- IPs contacted.
* `lists.asns` \- AS Numbers contacted.
* `lists.domains` \- Hostnames contacted, including `dns` record information.
* `lists.hashes` \- Hashes of response bodies, of the main page HTML structure, screenshots, and favicons.
* `lists.certificates` \- TLS certificates of HTTP responses.
* `verdicts` \- Verdicts on malicious content.

Some examples of more specific properties include:

* `task.uuid` \- ID of the scan.
* `task.url` \- Submitted URL of the scan. May differ from final URL (`page.url`) if there are HTTP redirects.
* `task.success` \- Whether scan was successful or not. Scans can fail for various reasons, including DNS errors.
* `task.status` \- Current scan status, for example, `Queued`, `InProgress`, or `Finished`.
* `meta.processors.domainCategories` \- Cloudflare categories of the main hostname contacted.
* `meta.processors.phishing` \- What kind of phishing, if any, was detected.
* `meta.processors.radarRank` \- [Cloudflare Radar Rank ↗](http://blog.cloudflare.com/radar-domain-rankings/) of the main hostname contacted.
* `meta.processors.wappa` \- The kind of technologies detected as being in use by the website, with the help of [Wappalyzer ↗](https://github.com/Lissy93/wapalyzer).
* `page.url` \- URL of the primary request, after all HTTP redirects.
* `page.country` \- Country name from geolocation data associated with the main IP address contacted.
* `page.history` \- Main page history, including any HTTP redirects.
* `page.screenshot` \- Various hashes of the main screenshot. Can be used to search for sites with similar screenshots.
* `page.domStructHash` \- HTML structure hash. Use it to search for sites with similar structure.
* `page.favicon.hash` \- MD5 hash of the favicon.
* `verdicts.overall.malicious` \- Whether the website was considered malicious _at the time of the scan_. Please check the remaining properties for each subsystem(s) for specific threats detected.

The [Get URL Scan](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/get/) API endpoint documentation contains the full response schema.

To fetch the scan's [screenshots](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/screenshot/) or full [network log](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/har/) refer to the corresponding endpoints' documentation.

### Search scans

Use a subset of ElasticSearch Query syntax to filter scans. Search results will include `Public` scans and your own `Unlisted` scans.

To search for scans to the hostname `google.com`, use the query parameter `q=page.domain:"google.com"`:

Terminal window

```

curl 'https://api.cloudflare.com/client/v4/accounts/{account_id}/urlscanner/v2/search?q=page.domain:google.com' \

--header "Authorization: Bearer <API_TOKEN>"


```

If, instead, you wanted to search for scans that made at least one request to the hostname `cdnjs.cloudflare.com`, for example sites that use a JavaScript library hosted at `cdnjs.cloudflare.com`, use the query parameter `hostname=cdnjs.cloudflare.com`:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/urlscanner/v2/search?q=domain:cdnjs.cloudflare.com" \

--header "Authorization: Bearer <API_TOKEN>"


```

Some other example queries:

* `task.url:"https://google.com" OR task.url:"https://www.google.com"`: Search for scans whose submitted URL was either `google.com` or `www.google.com`. URLs must be enclosed in quotes.
* `page.url:"https://google.com" AND NOT task.url:"https://google.com"`: Search for scans to `google.com` whose submitted URL was not `google.com` (that is, sites that redirected to google.com).
* `page.domain:microsoft AND verdicts.malicious:true AND NOT page.domain:microsoft.com`: Malicious scans whose hostname starts with `microsoft`. Would match domains like `microsoft.phish.com`.
* `apikey:me AND date:[2024-01 TO 2024-10]`: Your scans from January 2024 to October 2024.
* `page.domain:(blogspot OR www.blogspot)`: Searches for scans whose main domain starts with `blogspot` or with `www.blogspot`.
* `date:>now-7d AND path:okta-sign-in.min.js`: Scans from the last seven days with any request path that ends with `okta-sign-in.min.js`.
* `page.asn:AS24940 AND hash:-557369673`: Websites hosted in AS24940 where a resource with the given hash was retrieved.
* `hash:8f662c2ce9472ba8d03bfeb8cdae112dbc0426f99da01c5d70c7eb4afd5893ca`: Using the hash at `page.domStructHash` search for other scans with the same HTML structure hash.

Go to [Search URL scans](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/list/) in the API documentation for the full list of available options.

### Security Center

Alternatively, you can search in the Security Center:

1. In the Cloudflare dashboard, go to the **Investigate** page.  
[ Go to **Investigate** ](https://dash.cloudflare.com/?to=/:account/security-center/investigate)
2. Enter your query and select **Search**.

You can scan a URL by location. Scanning a URL by location allows you to analyze how a website may present different content depending on your location. This helps to expose and examine region-specific malicious activities.

Note

Only Enterprise customers can scan a URL by location.

To scan a URL based on your geographic location:

1. Enter your URL.
2. Go to **Location** \> Select which country to scan the URL from.
3. Select **Scan now**.

You can also use the [API ↗](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/create/#%28params%29%20default%20%3E%20%28param%29%20account%5Fid%20%3E%20) to scan a URL from a specific location.

In Security Center, you can retrieve pre-filtered information by:

* Similar screenshot
* Identical favicon
* Similar favicon
* Similar HTML structure
* Identical ASN
* Identical IP
* Identical domain
* Identical final URL (after all redirections)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/investigate/","name":"Investigate"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/investigate/url-scanner/","name":"URL Scanner"}}]}
```
