---
description: Example Snippets for headers, redirects, caching, and more.
title: Snippets examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Snippets examples

Last updated May 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the following examples to get started creating your snippet code.

Refer to [How Snippets work](https://developers.cloudflare.com/rules/snippets/how-it-works/) and [Create a snippet in the dashboard](https://developers.cloudflare.com/rules/snippets/create-dashboard/) for overall guidance.

[**A/B testing with same-URL direct access**Set up an A/B test by controlling what response is served based on cookies.](https://developers.cloudflare.com/rules/snippets/examples/ab-testing-same-url/)

[**Append dates to cookies to use with A/B testing**Dynamically set a cookie expiration and test group.](https://developers.cloudflare.com/rules/snippets/examples/append-dates-to-cookies/)

[**Auth with headers**Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.](https://developers.cloudflare.com/rules/snippets/examples/auth-with-headers/)

[**Send Bot Management information to origin**Send Bots information to your origin. Refer to Bot Management variables for a full list of available fields.](https://developers.cloudflare.com/rules/snippets/examples/bot-data-to-origin/)

[**Send suspect bots to a honeypot**Use the bot score field to send bots to a honeypot.](https://developers.cloudflare.com/rules/snippets/examples/bots-to-honeypot/)

[**Bulk redirect based on a map object**Redirect requests to certain URLs based on a mapped object to the request's URL.](https://developers.cloudflare.com/rules/snippets/examples/bulk-redirect-map/)

[**Country code redirect**Redirect a response based on the country code in the header of a visitor.](https://developers.cloudflare.com/rules/snippets/examples/country-code-redirect/)

[**Custom cache**Store, retrieve, and remove assets from cache programmatically. Use this template to optimize performance and implement custom caching strategies.](https://developers.cloudflare.com/rules/snippets/examples/custom-cache/)

[**Debugging logs**Send debugging information in an errored response to a logging service.](https://developers.cloudflare.com/rules/snippets/examples/debugging-logs/)

[**Define CORS headers**Adjust Cross-Origin Resource Sharing (CORS) headers and handle preflight requests.](https://developers.cloudflare.com/rules/snippets/examples/define-cors-headers/)

[**Follow redirects from the origin**Modify the fetch request to follow redirects from the origin, ensuring the client receives the final response.](https://developers.cloudflare.com/rules/snippets/examples/follow-redirects/)

[**Add HEX timestamp to a request header**Add a custom header to requests sent to the origin server with the current timestamp in hexadecimal format for debugging, tracking, or custom routing purposes.](https://developers.cloudflare.com/rules/snippets/examples/hex-timestamp/)

[**Validate JSON web tokens (JWT)**Extract a JWT from the Authorization header, verify its HMAC-SHA256 signature using the WebCrypto API, and validate its claims.](https://developers.cloudflare.com/rules/snippets/examples/jwt-validation/)

[**Maintenance page**Serve a custom maintenance page instead of fetching content from the origin server or cache. Ideal for downtime notifications, planned maintenance, or emergency messages.](https://developers.cloudflare.com/rules/snippets/examples/maintenance/)

[**Override a Set-Cookie header with a certain value**Get a specific Set-Cookie header and update it with a certain value.](https://developers.cloudflare.com/rules/snippets/examples/override-set-cookies-value/)

[**Redirect 403 Forbidden to a different page**If origin responded with 403 Forbidden error code, redirect to different page.](https://developers.cloudflare.com/rules/snippets/examples/redirect-forbidden-status/)

[**Redirect from one domain to another**Redirect all requests from one domain to another domain.](https://developers.cloudflare.com/rules/snippets/examples/redirect-replaced-domain/)

[**Remove fields from API response**If origin responds with JSON, parse the response and delete fields to return a modified response.](https://developers.cloudflare.com/rules/snippets/examples/remove-fields-api-response/)

[**Remove query strings before sending request to origin**Remove certain query strings from a request before passing to the origin.](https://developers.cloudflare.com/rules/snippets/examples/remove-query-strings/)

[**Remove response headers**Remove from response all headers that start with a certain name.](https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/)

[**Return information about the incoming request**Respond with information about the incoming request provided by Cloudflare’s global network.](https://developers.cloudflare.com/rules/snippets/examples/return-incoming-request-properties/)

[**Rewrite links on HTML pages**Dynamically rewrite links in HTML responses. This is useful for site migrations and branding updates.](https://developers.cloudflare.com/rules/snippets/examples/rewrite-site-links/)

[**Change origin and modify paths**Route requests to a different origin, prepend a directory to the URL path, and remove specific segments.](https://developers.cloudflare.com/rules/snippets/examples/route-and-rewrite/)

[**Set security headers**Set common security headers such as X-XSS-Protection, X-Frame-Options, and X-Content-Type-Options.](https://developers.cloudflare.com/rules/snippets/examples/security-headers/)

[**Send timestamp to origin as a custom header**Convert timestamp to hexadecimal format and send it as a custom header to the origin.](https://developers.cloudflare.com/rules/snippets/examples/send-timestamp-to-origin/)

[**Route to a different origin based on origin response**If response to the original request is not 200 OK or a redirect, send to another origin.](https://developers.cloudflare.com/rules/snippets/examples/serve-different-origin/)

[**Sign requests**Verify a signed request using the HMAC and SHA-256 algorithms or return a 403.](https://developers.cloudflare.com/rules/snippets/examples/signing-requests/)

[**Slow down suspicious requests**Define a delay to be used when incoming requests match a rule you consider suspicious based on the bot score.](https://developers.cloudflare.com/rules/snippets/examples/slow-suspicious-requests/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/rules/snippets/examples/#page","headline":"Snippets examples · Cloudflare Rules docs","description":"Example Snippets for headers, redirects, caching, and more.","url":"https://developers.cloudflare.com/rules/snippets/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
