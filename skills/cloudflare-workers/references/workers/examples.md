---
description: Browse code examples and starter templates for Cloudflare Workers.
title: Examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Examples

Last updated May 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Explore the following examples for Workers.

[**Single Page App (SPA) shell with bootstrap data**Use HTMLRewriter to inject prefetched bootstrap data into an SPA shell, eliminating client-side data fetching on initial load. Works with Workers Static Assets or an externally hosted SPA.](https://developers.cloudflare.com/workers/examples/spa-shell/)

[**Write to Analytics Engine**Write custom analytics events to Workers Analytics Engine for high-cardinality, time-series data.](https://developers.cloudflare.com/workers/examples/analytics-engine/)

[**Stream large JSON**Parse and transform large JSON request and response bodies using streaming.](https://developers.cloudflare.com/workers/examples/streaming-json/)

[**HTTP Basic Authentication**Shows how to restrict access using the HTTP Basic schema.](https://developers.cloudflare.com/workers/examples/basic-auth/)

[**Fetch HTML**Send a request to a remote server, read HTML from the response, and serve that HTML.](https://developers.cloudflare.com/workers/examples/fetch-html/)

[**Return small HTML page**Deliver an HTML page from an HTML string directly inside the Worker script.](https://developers.cloudflare.com/workers/examples/return-html/)

[**Return JSON**Return JSON directly from a Worker script, useful for building APIs and middleware.](https://developers.cloudflare.com/workers/examples/return-json/)

[**Sign requests**Verify a signed request using the HMAC and SHA-256 algorithms or return a 403.](https://developers.cloudflare.com/workers/examples/signing-requests/)

[**Stream OpenAI API Responses**Use the OpenAI v4 SDK to stream responses from OpenAI.](https://developers.cloudflare.com/workers/examples/openai-sdk-streaming/)

[**Using timingSafeEqual**Protect against timing attacks by safely comparing values using timingSafeEqual.](https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/)

[**Turnstile with Workers**Inject Turnstile implicitly into HTML elements using the HTMLRewriter runtime API.](https://developers.cloudflare.com/workers/examples/turnstile-html-rewriter/)

[**Custom Domain with Images**Set up custom domain for Images using a Worker or serve images using a prefix path and Cloudflare registered domain.](https://developers.cloudflare.com/workers/examples/images-workers/)

[**103 Early Hints**Allow a client to request static assets while waiting for the HTML response.](https://developers.cloudflare.com/workers/examples/103-early-hints/)

[**Cache Tags using Workers**Send Additional Cache Tags using Workers](https://developers.cloudflare.com/workers/examples/cache-tags/)

[**Accessing the Cloudflare Object**Access custom Cloudflare properties and control how Cloudflare features are applied to every request.](https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/)

[**Aggregate requests**Send two GET request to two urls and aggregates the responses into one response.](https://developers.cloudflare.com/workers/examples/aggregate-requests/)

[**Block on TLS**Inspects the incoming request's TLS version and blocks if under TLSv1.2.](https://developers.cloudflare.com/workers/examples/block-on-tls/)

[**Bulk redirects**Redirect requests to certain URLs based on a mapped object to the request's URL.](https://developers.cloudflare.com/workers/examples/bulk-redirects/)

[**Cache POST requests**Cache POST requests using the Cache API.](https://developers.cloudflare.com/workers/examples/cache-post-request/)

[**Conditional response**Return a response based on the incoming request's URL, HTTP method, User Agent, IP address, ASN or device type.](https://developers.cloudflare.com/workers/examples/conditional-response/)

[**Cookie parsing**Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.](https://developers.cloudflare.com/workers/examples/extract-cookie-value/)

[**Fetch JSON**Send a GET request and read in JSON from the response. Use to fetch external data.](https://developers.cloudflare.com/workers/examples/fetch-json/)

[**Geolocation: Custom Styling**Personalize website styling based on localized user time.](https://developers.cloudflare.com/workers/examples/geolocation-custom-styling/)

[**Geolocation: Hello World**Get all geolocation data fields and display them in HTML.](https://developers.cloudflare.com/workers/examples/geolocation-hello-world/)

[**Post JSON**Send a POST request with JSON data. Use to share data with external servers.](https://developers.cloudflare.com/workers/examples/post-json/)

[**Redirect**Redirect requests from one URL to another or from one set of URLs to another set.](https://developers.cloudflare.com/workers/examples/redirect/)

[**Rewrite links**Rewrite URL links in HTML using the HTMLRewriter. This is useful for JAMstack websites.](https://developers.cloudflare.com/workers/examples/rewrite-links/)

[**Set security headers**Set common security headers (X-XSS-Protection, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy, Strict-Transport-Security, Content-Security-Policy).](https://developers.cloudflare.com/workers/examples/security-headers/)

[**Multiple Cron Triggers**Set multiple Cron Triggers on three different schedules.](https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/)

[**Setting Cron Triggers**Set a Cron Trigger for your Worker.](https://developers.cloudflare.com/workers/examples/cron-trigger/)

[**Using the WebSockets API**Use the WebSockets API to communicate in real time with your Cloudflare Workers.](https://developers.cloudflare.com/workers/examples/websockets/)

[**Geolocation: Weather application**Fetch weather data from an API using the user's geolocation data.](https://developers.cloudflare.com/workers/examples/geolocation-app-weather/)

[**A/B testing with same-URL direct access**Set up an A/B test by controlling what response is served based on cookies. This version supports passing the request through to test and control on the origin, bypassing random assignment.](https://developers.cloudflare.com/workers/examples/ab-testing/)

[**Alter headers**Example of how to add, change, or delete headers sent in a request or returned in a response.](https://developers.cloudflare.com/workers/examples/alter-headers/)

[**Auth with headers**Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.](https://developers.cloudflare.com/workers/examples/auth-with-headers/)

[**Bulk origin override**Resolve requests to your domain to a set of proxy third-party origin URLs.](https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/)

[**Using the Cache API**Use the Cache API to store responses in Cloudflare's cache.](https://developers.cloudflare.com/workers/examples/cache-api/)

[**Cache using fetch**Determine how to cache a resource by setting TTLs, custom cache keys, and cache headers in a fetch request.](https://developers.cloudflare.com/workers/examples/cache-using-fetch/)

[**CORS header proxy**Add the necessary CORS headers to a third party API response.](https://developers.cloudflare.com/workers/examples/cors-header-proxy/)

[**Country code redirect**Redirect a response based on the country code in the header of a visitor.](https://developers.cloudflare.com/workers/examples/country-code-redirect/)

[**Data loss prevention**Protect sensitive data to prevent data loss, and send alerts to a webhooks server in the event of a data breach.](https://developers.cloudflare.com/workers/examples/data-loss-prevention/)

[**Debugging logs**Send debugging information in an errored response to a logging service.](https://developers.cloudflare.com/workers/examples/debugging-logs/)

[**Hot-link protection**Block other websites from linking to your content. This is useful for protecting images.](https://developers.cloudflare.com/workers/examples/hot-link-protection/)

[**Logging headers to console**Examine the contents of a Headers object by logging to console with a Map.](https://developers.cloudflare.com/workers/examples/logging-headers/)

[**Modify request property**Create a modified request with edited properties based off of an incoming request.](https://developers.cloudflare.com/workers/examples/modify-request-property/)

[**Modify response**Fetch and modify response properties which are immutable by creating a copy first.](https://developers.cloudflare.com/workers/examples/modify-response/)

[**Read POST**Serve an HTML form, then read POST requests. Use also to read JSON or POST data from an incoming request.](https://developers.cloudflare.com/workers/examples/read-post/)

[**Respond with another site**Respond to the Worker request with the response from another website (example.com in this example).](https://developers.cloudflare.com/workers/examples/respond-with-another-site/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/examples/#page","headline":"Examples · Cloudflare Workers docs","description":"Browse code examples and starter templates for Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
