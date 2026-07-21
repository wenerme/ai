---
description: Troubleshoot HTTP 499 error responses.
title: Error 499
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 499

Last updated Jun 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-499/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## 499 Client Close Request

The `HTTP 499` response code typically occurs when a client terminates the connection before the server is able to respond.

### Common use cases

Examples of `499` response code include situations where a client times out and closes the connection before the server completes processing, such as during large file uploads or long-running requests. They can also occur due to issues in the TCP three-way handshake, where the client terminates the connection prematurely because of its timeout settings.

### Cloudflare-specific information

The `499 Client Closed Request` status code is specific to nginx and indicates that the client closed the connection while the server was still processing the request, preventing the server from sending a status code in response. This status code appears in [Cloudflare Logs](https://developers.cloudflare.com/logs/) and status code analytics for Enterprise customers.

Note

Since Cloudflare is built on nginx, the 499 HTTP code is also logged in Cloudflare Logs and analytics for connections terminated by clients before Cloudflare has finished processing the request. It is expected to occasionally see these entries in your logs as clients close connections.

To provide more context, a TCP connection must be established between Cloudflare and the website's origin server before any higher protocol (such as HTTP) begins communication. TCP uses a three-way handshake to establish connection:

* **SYN**: Cloudflare sends a SYN packet to the origin server.
* **SYN+ACK**: The origin server responds with a SYN+ACK packet.
* **ACK**: Cloudflare sends an ACK packet back to the origin server.

At this point, the connection is established, and both Cloudflare and the origin server can communicate. However, if the origin server does not send a SYN+ACK back to Cloudflare within 19 seconds, Cloudflare retries once more, with another 15-second timeout.

Depending on the client-side timeout settings, the following scenarios can occur:

* **Shorter client timeout (less than 38 seconds)**: If the client has a shorter timeout, it will abandon the connection before Cloudflare completes processing, and a `499` response code will be logged.
* **Successful connection (more than 38 seconds)**: If the client has a longer timeout and the TCP connection is successfully established, the HTTP transaction proceeds normally, and Cloudflare returns a standard status code (`HTTP 200`).
* **Handshake failure**: If the client has a longer timeout but Cloudflare cannot establish the TCP handshake with the origin server, Cloudflare will return an `HTTP 522` status code.

### Diagnose with Origin Analytics

Use [Origin Analytics](https://developers.cloudflare.com/speed/origin-analytics/) to check whether slow origin response times are causing clients to close connections prematurely. If P95 origin response times are high, identify the slow endpoints in the **Top endpoints** table and optimize them to reduce `499` errors.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-499/#page","headline":"Error 499 · Cloudflare Support docs","description":"Troubleshoot HTTP 499 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-499/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
