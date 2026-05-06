---
title: Detect a Challenge Page response
description: Use the cf-mitigated header to identify challenge page responses in fetch and XHR requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript) 

# Detect a Challenge Page response

When a request encounters a Cloudflare Challenge Page instead of the originally anticipated response, the Challenge Page response (regardless of the Challenge Page type) will have the `cf-mitigated` header present and set to `challenge`. This header can be leveraged to detect if a response was challenged when making fetch/XHR requests. This header provides a reliable way to identify whether a response is a Challenge or not, enabling a web application to take appropriate action based on the result. For example, a front-end application encountering a response from the backend may check the presence of this header value to handle cases where Challenge Pages encountered unexpectedly.

Note

Regardless of the requested resource-type, the content-type of a challenge will be `text/html`.

For the `cf-mitigated` header, `challenge` is the only valid value. The header is set for all Challenge Page types.

To illustrate, here is a JavaScript code snippet that demonstrates how to use the `cf-mitigated` header to detect whether a response was challenged:

JavaScript

```

fetch("/my-api-endpoint").then((response) => {

  if (response.headers.get("cf-mitigated") === "challenge") {

    // Handle challenged response

  } else {

    // Process response as usual

  }

});


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/challenge-types/","name":"Available Challenges"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/","name":"Interstitial Challenge Pages"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/detect-response/","name":"Detect a Challenge Page response"}}]}
```
