---
description: Make programmatic DNS queries to 1.1.1.1 over HTTPS.
title: Make API requests to 1.1.1.1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

#  Make API requests to 1.1.1.1

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare offers a DNS over HTTPS resolver at:

```txt
https://cloudflare-dns.com/dns-query
```

## HTTP method

Cloudflare's DNS over HTTPS (DoH) endpoint supports `POST` and `GET` for DNS wireformat, and `GET` for JSON format.

When making requests using `POST`, the DNS query is included as the message body of the HTTP request, and the MIME type (`application/dns-message`) is sent in the `Content-Type` request header. Cloudflare will use the message body of the HTTP request as sent by the client, so the message body should not be encoded.

When making requests using `GET`, the DNS query is encoded into the URL.

## Valid MIME types

If you use JSON format, set `application/dns-json`, and if you use DNS wireformat, use `application/dns-message`.

Refer to [DNS wireformat](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/) and [JSON](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/) for cURL examples.

## Send multiple questions in a query

Each DNS query maps to exactly one HTTP request. To send multiple queries concurrently, use HTTP/2 or HTTP/3, which supports multiplexing multiple requests over a single connection.

HTTP/2 is the minimum recommended version of HTTP for use with DoH. This is not specific to 1.1.1.1, but rather how DoH operates per [RFC 8484 ↗](https://datatracker.ietf.org/doc/html/rfc8484#section-5.2).

Example request:

```sh
curl --http2 --header "accept: application/dns-json" "https://one.one.one.one/dns-query?name=cloudflare.com" --next --http2 --header "accept: application/dns-json" "https://one.one.one.one/dns-query?name=example.com"
```

## Authentication

No authentication is required to send requests to this API.

## Supported TLS versions

Cloudflare's DNS over HTTPS resolver supports TLS 1.2 and TLS 1.3.

## Return codes

| HTTP Status | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| 400         | DNS query not specified or too small.                      |
| 413         | DNS query is larger than maximum allowed DNS message size. |
| 415         | Unsupported content type.                                  |
| 504         | Resolver timeout while waiting for the query response.     |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/#page","headline":"Make API requests to 1.1.1.1 over DoH","description":"Make programmatic DNS queries to 1.1.1.1 over HTTPS.","url":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
