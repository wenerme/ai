---
title: Troubleshoot crawl errors
description: Fix search engine crawler issues with Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshoot crawl errors

Cloudflare allows search engine crawlers and bots. If you observe crawl issues or Cloudflare challenges presented to the search engine crawler or bot, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with the information you gather when troubleshooting the crawl errors via the methods outlined in this guide.

---

## Disable Anti-bot modules

Search engine crawlers' requests, when proxied through Cloudflare, can be blocked by anti-bot modules installed on your origin server. Try disabling any anti-bot modules to prevent your origin from blocking these requests.

---

## Adjust Google and Bing crawl rates

To optimize CDN performance, Google and Bing assign special crawl rates to websites that use CDN services in order. Special crawl rates do not negatively affect Search Engine Optimization (SEO) and Search Engine Results Pages (SERPs). To change your crawl rates for Bing and Google, follow the guides below:

* Change the Google crawl rate by [reviewing Google’s documentation ↗](https://support.google.com/webmasters/answer/48620?hl=en).
* Change your Bing crawl rate via guidance from Bing’s documentation:  
   * [Bing Crawl Control ↗](https://www.bing.com/webmasters/help/?topicid=55a30303)  
   * [Crawl Delay and the Bing Crawler ↗](https://blogs.bing.com/webmaster/2009/08/10/crawl-delay-and-the-bing-crawler-msnbot)

---

## Prevent crawl errors

Review the following recommendations to prevent crawler errors:

* Monitor the performance and availability of your website using a third-party tool:  
   * [StatusCake ↗](http://www.statuscake.com/)  
   * [Pingdom ↗](http://www.pingdom.com/)  
   * [Monitor.Us ↗](http://www.monitor.us/)  
   * [Updown ↗](https://updown.io/)
* Do not block Google crawler IP addresses via [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/). If you are using [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), make sure they do not apply to the Google crawler.  
Confirm an IP address belongs to Google by consulting Google’s documentation on [verifying googlebot IP addresses ↗](https://support.google.com/webmasters/bin/answer.py?answer=80553).
* Do not block the United States via [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/).
* Do not block Google User-Agents in your `.htaccess` file, server configuration, [robots.txt ↗](http://support.google.com/webmasters/bin/answer.py?answer=35303), or web application.

Google uses a [variety of User-Agents ↗](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers) to crawl your website. You can [test your robots.txt via Google ↗](https://support.google.com/webmasters/answer/6062598?hl=en).

* Do not allow crawling of files in the `/cdn-cgi/` directory. This path is used internally by Cloudflare and Google encounters errors when crawling it. Disallow crawls of `cdn-cgi` via `robots.txt`:

`Disallow: /cdn-cgi/`

Note

Errors for `cdn-cgi` do not impact site rankings.

* Ensure your [robots.txt file allows the AdSense crawler ↗](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=1061943).
* [Restore original visitor IP addresses](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/) in your server logs.

---

## Troubleshoot crawl errors

Troubleshooting steps for the most commonly reported crawl errors are mentioned below.

### HTTP 4XX Errors

[HTTP 4XX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/) are the most common type of crawl error. Cloudflare delivers these errors from your web server to Google. These errors are caused for various reasons such as a missing page on your web server or a malformed link in your HTML. The solution depends upon the problem encountered.

### HTTP 5XX Errors

[HTTP 5XX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/) indicate that either Cloudflare or your origin web server experienced an internal error. To correlate occurrences of crawl errors with site outages, monitor your origin web server's health. Monitoring your website health both through Cloudflare and directly to your origin web server IPs determines whether errors occurred due to Cloudflare or your origin web server.

### DNS Errors

Troubleshooting steps vary depending on whether your domain is on Cloudflare via a Full or CNAME setup. To verify which setup your domain uses, open a terminal and execute the following command (replace `www.example.com` with your Cloudflare domain):

`dig +short SOA` `www.example.com`

For domains on a [Partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), the result response contains cdn.cloudflare.net. For example:

`example.com.cdn.cloudflare.net.`

For domains on a [Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), the result response contains the `cloudflare.com` domain in the nameservers listed. For example:

`josh.ns.cloudflare.com. dns.cloudflare.com. 2013050901 10000 2400 604800 3600`

Once you’ve confirmed how your domain was setup with Cloudflare, proceed with the troubleshooting steps appropriate to your domain setup.

**CNAME**

Contact your hosting provider to investigate DNS errors and provide the date Google encountered DNS errors. Additionally, review the [Cloudflare System Status ↗](http://www.cloudflare.com/system-status) page for any network outages on the date the errors were encountered by Google.

**Full**

[Contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) and provide the date and time that Google observed the errors.

### Requesting troubleshooting assistance

If the above troubleshooting steps do not resolve your crawl errors, follow the steps below to export crawler errors as a `.csv` file from your Google Webmaster Tools Dashboard. Include this `.csv` file when [contacting Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

1. Log in to your Google Webmaster Tools account and navigate to the **Health** section of the affected domain.
2. Click **Crawl Errors** in the left hand navigation.
3. Click **Download** to export the list of errors as a `.csv` file.
4. Provide the downloaded `.csv` file to Cloudflare support.

---

## Related resources

[Google’s documentation on crawl errors and troubleshooting ↗](https://support.google.com/webmasters/answer/7440203#not%5Ffound%5F404)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/general-troubleshooting/","name":"General Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/general-troubleshooting/troubleshooting-crawl-errors/","name":"Troubleshoot crawl errors"}}]}
```
