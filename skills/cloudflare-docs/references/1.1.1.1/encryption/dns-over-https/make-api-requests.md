---
title: Make API requests to 1.1.1.1
description: Make programmatic DNS queries to 1.1.1.1 over HTTPS.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/encryption/dns-over-https/make-api-requests/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Make API requests to 1.1.1.1

Cloudflare offers a DNS over HTTPS resolver at:

```

https://cloudflare-dns.com/dns-query


```

## HTTP method

Cloudflare's DNS-over-HTTPS (DOH) endpoint supports `POST` and `GET` for DNS wireformat, and `GET` for JSON format.

When making requests using `POST`, the DNS query is included as the message body of the HTTP request, and the MIME type (`application/dns-message`) is sent in the `Content-Type` request header. Cloudflare will use the message body of the HTTP request as sent by the client, so the message body should not be encoded.

When making requests using `GET`, the DNS query is encoded into the URL.

## Valid MIME types

If you use JSON format, set `application/dns-json`, and if you use DNS wireformat, use `application/dns-message`.

Refer to [DNS wireformat](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/) and [JSON](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/) for cURL examples.

## Send multiple questions in a query

Sending more than one question when making requests depends on the HTTP version used, as each DNS query maps to exactly one HTTP request. HTTP/2 and HTTP/3 have multiplexing capabilities, allowing multiple requests to start concurrently. HTTP/2 is, in fact, the minimum recommended version of HTTP for use with DNS over HTTPS (DoH). This behavior is not specific to 1.1.1.1, but rather how DoH operates.

You can learn more about how DoH works in RFC 8484, more specifically [the HTTP layer requirements ↗](https://datatracker.ietf.org/doc/html/rfc8484#section-5.2).

Example request:

Terminal window

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}},{"@type":"ListItem","position":5,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/make-api-requests/","name":"Make API requests to 1.1.1.1"}}]}
```
