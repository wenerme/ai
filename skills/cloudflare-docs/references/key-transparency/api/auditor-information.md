---
title: Auditor
description: Retrieve auditor public keys and verify epoch signatures.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/key-transparency/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Auditor

The Auditor is designed to sign epoch information, which includes the time at which the request is received by the Auditor, the epoch number, and the epoch digest. The Auditor serializes this information in binary using protobuf or bincode and checks whether the requested inclusion is valid, as in it satisfies [publication constraints](https://developers.cloudflare.com/key-transparency/api/epochs/#constraints).

If the Log is setup to provide [AKD ↗](https://github.com/facebook/akd) audit proof, the Auditor verifies them asynchronously.

## Get Auditor information

`keys` contain Auditor public keys which allow for key rotation later.

Terminal window

```

curl 'https://plexi.key-transparency.cloudflare.com/info'

{

  "keys": [

    {

      "public_key": "d1036a33a8731e82a29dc68210988b32b60b7c1bd22d2341f2e339f4db3a2f4a",

      "not_before": 1712311441501

    }

  ],

  "logs": [

    "508607faff7cb16be841e901eca41a6239461f239e7e610c9ea2576f334bc144"

  ]

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/key-transparency/","name":"Key Transparency Auditor"}},{"@type":"ListItem","position":3,"item":{"@id":"/key-transparency/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/key-transparency/api/auditor-information/","name":"Auditor"}}]}
```
