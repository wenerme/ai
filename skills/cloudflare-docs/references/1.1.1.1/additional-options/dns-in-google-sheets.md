---
title: DNS in Google Sheets
description: Cloudflare 1.1.1 works directly inside Google Sheets. To get started, create a Google Function with the following code.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/additional-options/dns-in-google-sheets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DNS in Google Sheets

## Create a function

1.1.1.1 works directly inside Google Sheets. To get started, create a [Google Function ↗](https://developers.google.com/apps-script/guides/sheets/functions) with the following code:

JavaScript

```

function NSLookup(type, domain, useCache = false, minCacheTTL = 30) {


  if (typeof type == 'undefined') {

    throw new Error('Missing parameter 1 dns type');

  }


  if (typeof domain == 'undefined') {

    throw new Error('Missing parameter 2 domain name');

  }


  if (typeof useCache != "boolean") {

    throw new Error('Only boolean values allowed in 3 use cache');

  }


  if (typeof minCacheTTL != "number") {

    throw new Error('Only numeric values allowed in 4 min cache ttl');

  }


  type = type.toUpperCase();

  domain = domain.toLowerCase();


  let cache = null;

  if (useCache) {

    // Cache key and hash

    cacheKey = domain + "@" + type;

    cacheHash = Utilities.base64Encode(cacheKey);

    cacheBinKey = "nslookup-result-" + cacheHash;


    cache = CacheService.getScriptCache();

    const cachedResult = cache.get(cacheBinKey);

    if (cachedResult != null) {

      return cachedResult;

    }

  }


  const url = 'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(domain) + '&type=' + encodeURIComponent(type);

  const options = {

    muteHttpExceptions: true,

    headers: {

      accept: "application/dns-json"

    }

  };


  const result = UrlFetchApp.fetch(url, options);

  const rc = result.getResponseCode();

  const resultText = result.getContentText();


  if (rc !== 200) {

    throw new Error(rc);

  }


  const errors = [

    { name: "NoError", description: "No Error"}, // 0

    { name: "FormErr", description: "Format Error"}, // 1

    { name: "ServFail", description: "Server Failure"}, // 2

    { name: "NXDomain", description: "Non-Existent Domain"}, // 3

    { name: "NotImp", description: "Not Implemented"}, // 4

    { name: "Refused", description: "Query Refused"}, // 5

    { name: "YXDomain", description: "Name Exists when it should not"}, // 6

    { name: "YXRRSet", description: "RR Set Exists when it should not"}, // 7

    { name: "NXRRSet", description: "RR Set that should exist does not"}, // 8

    { name: "NotAuth", description: "Not Authorized"} // 9

  ];


  const response = JSON.parse(resultText);


  if (response.Status !== 0) {

    return errors[response.Status].name;

  }


  const outputData = [];

  let cacheTTL = 0;


  for (const i in response.Answer) {

    outputData.push(response.Answer[i].data);

    const ttl = response.Answer[i].TTL;

    cacheTTL = Math.min(cacheTTL || ttl, ttl);

  }


  const outputString = outputData.join(',');


  if (useCache) {

    cache.put(cacheBinKey, outputString, Math.max(cacheTTL, minCacheTTL));

  }


  return outputString;

}


```

## Using 1.1.1.1

When you feed the function `NSLookup` a record type and a domain, you will get a DNS record value in the cell you called `NSLookup`.

To limit the number of DNS lookups and speed up the results (especially in larger Google Sheets), you can cache the returned DNS record value. Both the cache usage and the cache TTL can be controlled in arguments 3 and 4, respectively.

Supported DNS record types

* `A`
* `AAAA`
* `CAA`
* `CNAME`
* `DS`
* `DNSKEY`
* `MX`
* `NS`
* `NSEC`
* `NSEC3`
* `RRSIG`
* `SOA`
* `TXT`

For example, typing:

```

NSLookup(B1, B2)


```

Or - depending on your regional settings - you may have to use this formula:

```

NSLookup(B1; B2)


```

![Google sheets function](https://developers.cloudflare.com/_astro/google-sheet-function.B_K9dB4i_1pUnIa.webp)

  
Returns

```

198.41.214.162, 198.41.215.162


```

![Google sheets function](https://developers.cloudflare.com/_astro/google-sheet-result.qjsyQyZU_ZJWiV8.webp)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/additional-options/","name":"Other ways to use 1.1.1.1"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/additional-options/dns-in-google-sheets/","name":"DNS in Google Sheets"}}]}
```
