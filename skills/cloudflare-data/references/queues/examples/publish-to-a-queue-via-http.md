---
description: Publish to a Queue directly via HTTP and Workers.
title: Publish to a Queue via HTTP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Publish to a Queue via HTTP

Publish to a Queue directly via HTTP.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-http/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following example shows you how to publish messages to a Queue from any HTTP client, using a Cloudflare API token to authenticate.

This allows you to write to a Queue from any service or programming language that supports HTTP, including Go, Rust, Python or even a Bash script.

## Prerequisites

* A [queue created](https://developers.cloudflare.com/queues/get-started/#3-create-a-queue) via the [Cloudflare dashboard ↗](https://dash.cloudflare.com) or the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
* A Cloudflare API token with the `Queues Edit` permission.

### 1\. Send a test message

To make sure you successfully authenticate and write a message to your queue, use `curl` on the command line:

```sh
# Make sure to replace the placeholder with your shared secret
curl -XPOST -H "Authorization: Bearer <paste-your-api-token-here>" "https://api.cloudflare.com/client/v4/accounts/<paste-your-account-id-here>/queues/<paste-your-queue-id-here>/messages" --data '{ "body": { "greeting": "hello" } }'
```

```sh
{"success":true}
```

This will issue a HTTP POST request, and if successful, return a HTTP 200 with a `success: true` response body.

* If you receive a HTTP 403, this is because your API token is invalid or does not have the `Queues Edit` permission.

For full documentation about the HTTP Push API, refer to the [Cloudflare API documentation ↗](https://developers.cloudflare.com/api/resources/queues/subresources/messages/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-http/#page","headline":"Queues - Publish Directly via HTTP · Cloudflare Queues docs","description":"Publish to a Queue directly via HTTP and Workers.","url":"https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-http/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
