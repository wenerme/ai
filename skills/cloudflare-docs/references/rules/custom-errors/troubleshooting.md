---
title: Troubleshoot Error Pages issues
description: Resolve common issues with custom error rules and error pages.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshoot Error Pages issues

## Cannot preview error page

If Cloudflare cannot load your site or you have blocked the United States (US) via [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) or [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), publishing and previewing a custom error page might not work.

A common error might look like the following: `Error fetching page: Fetch failed, https://example.com/ipcountryblock.html returned 403 (Code: 1202)`.

Make sure that no WAF rule is blocking or challenging Custom Errors product when it is fetching the content of your custom error page.

## Error pages for blocked requests

If you block countries or IP addresses with an [IP Access rule](https://developers.cloudflare.com/waf/tools/ip-access-rules/), affected visitors will get a [1005 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1005/) and your **IP/Country Block** custom page.

If you block countries or IP addresses with a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) and you do not configure a [custom error rule](https://developers.cloudflare.com/rules/custom-errors/create-rules/#create-a-custom-error-rule-dashboard) or a [WAF custom response](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/#configure-a-custom-response-for-blocked-requests) for blocked requests, affected visitors will get your **WAF Block** page.

If you block requests due to a [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) and you do not configure a [custom error rule](https://developers.cloudflare.com/rules/custom-errors/create-rules/#create-a-custom-error-rule-dashboard) or a [WAF custom response](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/#configure-a-custom-response-for-blocked-requests) for blocked requests, affected visitors will get your **429 Errors** page displaying a Cloudflare [1015 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/).

If you block countries or IP addresses with a firewall rule (now deprecated), affected visitors will get your **1000 Class Errors** page.

## 1XXX errors

You cannot customize the following 1XXX errors via Error Pages:

* `1001` \- Unable to resolve
* `1003` \- Bad Host header
* `1018` \- Unable to resolve because of ownership lookup failure
* `1023` \- Unable to resolve because of feature lookup failure

## Custom error page size

Your custom error page cannot be blank and the combined size of all page assets cannot exceed 1.5 MB (1,500,000 characters). To avoid exceeding the custom error page limit, preview your page to check its size before publishing.

## General troubleshooting advice

If you encounter errors while attempting to preview or publish your custom error page, use an [HTML validator ↗](https://validator.w3.org/) to ensure that your code resolves properly.

## More resources

* [HTTP Status Codes](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/)
* [Challenges](https://developers.cloudflare.com/cloudflare-challenges/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/custom-errors/","name":"Custom Errors"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/custom-errors/troubleshooting/","name":"Troubleshoot Error Pages issues"}}]}
```
