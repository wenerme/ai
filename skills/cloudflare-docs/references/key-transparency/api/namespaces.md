---
title: Namespaces
description: Create and manage namespaces representing logs monitored by the Cloudflare Auditor.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/key-transparency/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ REST API ](https://developers.cloudflare.com/search/?tags=REST%20API)[ mTLS ](https://developers.cloudflare.com/search/?tags=mTLS) 

# Namespaces

The Cloudflare Key Transparency API is organized in namespaces, each one representing a Log monitored by Cloudflare Auditor. If you want to register a namespace, contact us.

## Create a namespace

The following fields are required when making a `POST` request:

* `name`
* `public`
* `root`
* `signature_version`:  
   * 0x0001 for [Protobuf serialisation ↗](https://github.com/cloudflare/plexi/blob/main/plexi%5Fcore/src/proto/specs/types.proto) Ed25519 signature from the Auditor  
   * 0x0002 for [bincode serialisation ↗](https://github.com/bincode-org/bincode/blob/trunk/docs/spec.md) E25519 serialisation by the Auditor

The `log_directory` field is optional. If set, Cloudflare will use it to fetch audit proofs and validate them.

This API is authenticated via [mTLS ↗](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/).

Terminal window

```

curl 'https://plexi.key-transparency.cloudflare.com/namespaces' \

          --header 'Content-Type: application/json' \

          --data '{

   "name": "your.new.log.com",

   "root": "1/1111111111111111111111111111111111111111111111111111111111111111",

   "log_directory": "https://your.new.log.com/path/to/proofs",

  "signature_version": 1

  }'

{

  "name": "your.new.log.com",

  "log_directory": "https://your.new.log.com/path/to/proofs",

  "root": "1/1111111111111111111111111111111111111111111111111111111111111111",

  "status": "Initialization",

  "reports_uri": "/namespaces/your.new.log.com/reports",

  "audits_uri": "/namespaces/your.new.log.com/audits",

  "signature_version": 1

}


```

After publishing the first epoch, `status` will show `Online`. Possible statuses include:

* `Online`
* `Initialization`
* `Disabled`

## List all namespaces

Refer to the example below to get information about all public namespaces.

Terminal window

```

curl 'https://plexi.key-transparency.cloudflare.com/namespaces'

{

   "namespaces": [

       { "name": "your.new.log.com", "root": "1/abc", "reports_uri": "/namespaces/your.new.log.com/reports", "audits_uri": "/namespaces/your.new.log.com/audits", "log_directory": "https://your.new.log.com/path/to/proofs", "status": "online" },

       { "name": "my.new.log.com", "reports_uri": "/namespaces/meta-bt-2024/reports", "audits_uri": "/namespaces/meta-bt-2024/audits", "status": "initialization" }

   ]

}


```

## Disable a namespace

If a log state has been corrupted, lost, or needs to be sharded to be maintainable, the Auditor allows the Log operator to mark a namespace as `Disabled`.

This API is authenticated via [mTLS ↗](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/).

Terminal window

```

curl -X PATCH 'https://plexi.key-transparency.cloudflare.com/namespaces/{namespace}' \

          -H 'Content-Type: application/json' \

          -d '{

   "status": "Disabled"

  }'

{

  "name": "your.new.log.com",

  "log_directory": "https://your.new.log.com/path/to/proofs",

  "root": "1/1111111111111111111111111111111111111111111111111111111111111111",

  "status": "Disabled",

  "reports_uri": "/namespaces/your.new.log.com/reports",

  "audits_uri": "/namespaces/your.new.log.com/audits",

  "signature_version": 1

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/key-transparency/","name":"Key Transparency Auditor"}},{"@type":"ListItem","position":3,"item":{"@id":"/key-transparency/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/key-transparency/api/namespaces/","name":"Namespaces"}}]}
```
