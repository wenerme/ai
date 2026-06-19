---
title: DNS Wireformat
description: Query 1.1.1.1 DNS over HTTPS using wireformat.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# DNS Wireformat

Cloudflare respects DNS wireformat as defined in [RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035.html).

To send queries using DNS wireformat, set the header `accept: application/dns-message`, or `content-type: application/dns-message` if using `POST` to indicate the media type of the query.

Queries using DNS wireformat can be sent using `POST` or `GET`.

## Using POST

When making requests using `POST`, the DNS query is included as the message body of the HTTP request, and the MIME type (see below) is included in the `Content-Type` request header. Cloudflare will use the message body of the HTTP request as sent by the client, so the message body should not be encoded.

The following is an example request. The same DNS query for `www.example.com`, using the POST method would be:

```
:method = POST:scheme = https:authority = cloudflare-dns.com:path = /dns-queryaccept = application/dns-messagecontent-type = application/dns-messagecontent-length = 33
<33 bytes represented by the following hex encoding>00 00 01 00 00 01 00 00  00 00 00 00 03 77 77 7707 65 78 61 6d 70 6c 65  03 63 6f 6d 00 00 01 0001
```

And would return the answer in wireformat:

```
:status = 200content-type = application/dns-messagecontent-length = 64cache-control = max-age=128
<64 bytes represented by the following hex encoding>00 00 81 80 00 01 00 01  00 00 00 00 03 77 77 7707 65 78 61 6d 70 6c 65  03 63 6f 6d 00 00 01 0001 03 77 77 77 07 65 78  61 6d 70 6c 65 03 63 6f6d 00 00 01 00 01 00 00  00 80 00 04 C0 00 02 01
```

To try this using cURL, write:

Terminal window

```
echo -n 'q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB' | base64 --decode | curl --header 'content-type: application/dns-message' --data-binary @- https://cloudflare-dns.com/dns-query --output - | hexdump
```

## Using GET

When making requests using `GET`, the DNS query is encoded into the URL. The `accept` header can be used to indicate the MIME type (default: `application/dns-message`).

Example request:

Terminal window

```
curl --header 'accept: application/dns-message' --verbose 'https://cloudflare-dns.com/dns-query?dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB' | hexdump
```

```
* Using HTTP2, server supports multi-use* Connection state changed (HTTP/2 confirmed)* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0* Using Stream ID: 1 (easy handle 0x7f968700a400)GET /dns-query?dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB HTTP/2Host: cloudflare-dns.comUser-Agent: curl/7.54.0accept: application/dns-message
* Connection state changed (MAX_CONCURRENT_STREAMS updated)!HTTP/2 200date: Fri, 23 Mar 2018 05:14:02 GMTcontent-type: application/dns-messagecontent-length: 49cache-control: max-age=0set-cookie: \__cfduid=dd1fb65f0185fadf50bbb6cd14ecbc5b01521782042; expires=Sat, 23-Mar-19 05:14:02 GMT; path=/; domain=.cloudflare.com; HttpOnlyserver: cloudflare-nginxcf-ray: 3ffe69838a418c4c-SFO-DOG
{ [49 bytes data]100    49  100    49    0     0    493      0 --:--:-- --:--:-- --:--:--   494* Connection #0 to host cloudflare-dns.com left intact0000000 ab cd 81 80 00 01 00 01 00 00 00 00 03 77 77 770000010 07 65 78 61 6d 70 6c 65 03 63 6f 6d 00 00 01 000000020 01 c0 0c 00 01 00 01 00 00 0a 8b 00 04 5d b8 d80000030 220000031
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/#page","headline":"Using DNS Wireformat","description":"Query 1.1.1.1 DNS over HTTPS using wireformat.","url":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}},{"@type":"ListItem","position":5,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/make-api-requests/","name":"Make API requests to 1.1.1.1"}},{"@type":"ListItem","position":6,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/","name":"DNS Wireformat"}}]}
```
