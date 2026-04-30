---
title: Using JSON
description: Query 1.1.1.1 DNS over HTTPS using JSON format.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using JSON

Warning

The DNS over HTTPS JSON format does not have a formal RFC, which means behavior might be different between providers. Additionally, there might be small changes in behavior in the future.

For critical use cases, it is recommended to use the [DNS over HTTPS wireformat](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/), which is defined in [RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035.html).

Cloudflare's DNS over HTTPS endpoint also supports JSON format for querying DNS data. For lack of an agreed upon JSON schema for DNS over HTTPS in the Internet Engineering Task Force (IETF), Cloudflare has chosen to follow the same schema as Google's DNS over HTTPS resolver.

JSON formatted queries are sent using a `GET` request. When making requests using `GET`, the DNS query is encoded into the URL. The client should include an HTTP `Accept` request header field with a MIME type of `application/dns-json` to indicate that the client is able to accept a JSON response from the DNS over HTTPS resolver.

## Supported parameters

| Field | Required? | Description                                                                                                                             | Default |
| ----- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| name  | Yes       | Query name.                                                                                                                             | \-      |
| type  | No        | Query type (either a [numeric value or text ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4)). | A       |
| do    | No        | DO bit - whether the client wants DNSSEC data (either empty or one of 0, false, 1, or true).                                            | false   |
| cd    | No        | CD bit - disable validation (either empty or one of 0, false, 1, or true).                                                              | false   |

## Examples

Example request and response:

Terminal window

```

curl --header "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=example.com&type=AAAA"


```

```

{

  "Status": 0,

  "TC": false,

  "RD": true,

  "RA": true,

  "AD": true,

  "CD": false,

  "Question": [

    {

      "name": "example.com.",

      "type": 28

    }

  ],

  "Answer": [

    {

      "name": "example.com.",

      "type": 28,

      "TTL": 1726,

      "data": "2606:2800:220:1:248:1893:25c8:1946"

    }

  ]

}


```

In the case of an invalid request a `400 Bad Request` error is returned:

Terminal window

```

curl --header "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=example.com&cd=2"


```

```

{

  "error": "Invalid CD flag `2`. Expected to be empty or one of `0`, `false`, `1`, or `true`."

}


```

## Response fields

The following tables have more information on each response field.

### Successful response

| Field            | Description                                                                                                                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status           | The Response Code of the DNS Query. The codes are defined here: [https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6 ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6).              |
| TC               | If the TC field is true, the truncated bit was set. This occurs when the DNS answer exceeds the size of a single UDP or TCP packet. With Cloudflare DNS over HTTPS, the TC field is almost always false because Cloudflare supports the maximum response size. |
| RD               | If true, it means the Recursive Desired bit was set. This is always set to true for Cloudflare DNS over HTTPS.                                                                                                                                                 |
| RA               | If true, it means the Recursion Available bit was set. This is always set to true for Cloudflare DNS over HTTPS.                                                                                                                                               |
| AD               | If true, it means that every record in the answer was verified with DNSSEC.                                                                                                                                                                                    |
| CD               | If true, the client asked to disable DNSSEC validation. In this case, Cloudflare will still fetch the DNSSEC-related records, but it will not attempt to validate the records.                                                                                 |
| Question: name   | The record name requested.                                                                                                                                                                                                                                     |
| Question: type   | The type of DNS record requested. These are defined here: [https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4 ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).                    |
| Answer: name     | The record owner.                                                                                                                                                                                                                                              |
| Answer: type     | The type of DNS record. These are defined here: [https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4 ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).                              |
| Answer: TTL      | The number of seconds the answer can be stored in cache before it is considered stale.                                                                                                                                                                         |
| Answer: data     | The value of the DNS record for the given name and type. The data will be in text for standardized record types and in hex for unknown types.                                                                                                                  |
| Authority: name  | The record owner.                                                                                                                                                                                                                                              |
| Authority: type  | The type of DNS record. These are defined here: [https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4 ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).                              |
| Authority: TTL   | The number of seconds the answer can be stored in cache before it is considered stale.                                                                                                                                                                         |
| Authority: data  | The value of the DNS record for the given name and type. The data will be in text for standardized record types and in hex for unknown types.                                                                                                                  |
| Additional: name | The record owner.                                                                                                                                                                                                                                              |
| Additional: type | The type of DNS record. These are defined here: [https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4 ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).                              |
| Additional: TTL  | The number of seconds the answer can be stored in cache before it is considered stale.                                                                                                                                                                         |
| Additional: data | The value of the DNS record for the given name and type. The data will be in text for standardized record types and in hex for unknown types.                                                                                                                  |
| Comment          | List of EDE messages. Refer to [Extended DNS error codes](https://developers.cloudflare.com/1.1.1.1/infrastructure/extended-dns-error-codes/) for more information.                                                                                            |

### Error response

| Field | Description                                |
| ----- | ------------------------------------------ |
| error | An explanation of the error that occurred. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}},{"@type":"ListItem","position":5,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/make-api-requests/","name":"Make API requests to 1.1.1.1"}},{"@type":"ListItem","position":6,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/","name":"Using JSON"}}]}
```
