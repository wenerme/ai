---
title: Epochs
description: Query epoch digests, audit proofs, and publication constraints.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/key-transparency/api/epochs.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Epochs

## Get an epoch

Terminal window

```

curl 'https://plexi.key-transparency.cloudflare.com/namespaces/{namespace}/audits/1'

{

  "namespace": "your.new.log.com",

  "timestamp": 1717084639921,

  "epoch": 1,

  "digest": "1111111111111111111111111111111111111111111111111111111111111111",

  "signature": "f6a51443bb6703813b330959d9d97471bc06464142165e59733fa102a18b052782a5307d59c31b8b13c1af7dfff6f6e7bf44e880d44e26e96c50a72f72a30c07"

}


```

## Publish a new epoch

Refer to the example below to publish a new epoch by requesting its signature.

This API is authenticated via [mTLS ↗](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/), so that only a Log owner can publish new epochs.

Terminal window

```

curl 'https://plexi.key-transparency.cloudflare.com/namespaces/{namespace}/audits' \

      --header 'Content-Type: application/json' \

      --data '{"epoch": 1, "digest": "1111111111111111111111111111111111111111111111111111111111111111"}'

{

  "namespace": "your.new.log.com",

  "timestamp": 1717084639921,

  "epoch": 1,

  "digest": "1111111111111111111111111111111111111111111111111111111111111111",

  "signature": "f6a51443bb6703813b330959d9d97471bc06464142165e59733fa102a18b052782a5307d59c31b8b13c1af7dfff6f6e7bf44e880d44e26e96c50a72f72a30c07",

  "key_id": 74,

}


```

Explain Code

### Constraints

* If `root` is defined for the namespace, the first epoch must match it (number and digest).
* Epochs must be increasing. Second epoch is 2, third is 3, etc.
* Epochs must have a unique digest or it will be rejected.
* Epochs cannot be republished.
* Digest must be a 32 byte string hex encoded (length 64).

If a namespace is disabled, you receive the following error:

```

HTTP 400 Bad Request

Namespace is disabled and read-only.


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/key-transparency/","name":"Key Transparency Auditor"}},{"@type":"ListItem","position":3,"item":{"@id":"/key-transparency/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/key-transparency/api/epochs/","name":"Epochs"}}]}
```
