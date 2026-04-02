---
title: Send Bot Management information to origin
description: Send [Bots](/bots/) information to your origin. Refer to [Bot Management variables](/bots/reference/bot-management-variables/) for a full list of available fields.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers)[ Request modification ](https://developers.cloudflare.com/search/?tags=Request%20modification) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/bot-data-to-origin.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Send Bot Management information to origin

Send [Bots](https://developers.cloudflare.com/bots/) information to your origin. Refer to [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/) for a full list of available fields.

JavaScript

```

export default {

  async fetch(request) {

    // Clone the original request to construct a new request

    const newRequest = new Request(request);

    // Set Bot Management headers on a new request to the origin: https://developers.cloudflare.com/bots/reference/bot-management-variables/#workers-variables

    newRequest.headers.set("bot-score", request.cf.botManagement.score); // bot score (integer)

    newRequest.headers.set(

      "verified-bot",

      request.cf.botManagement.verifiedBot,

    ); // verified bot (boolean)

    newRequest.headers.set("ja4", request.cf.botManagement.ja4); // JA4 fingerprint hash (string)

    // Serve response to the new request from the origin

    return await fetch(newRequest);

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/bot-data-to-origin/","name":"Send Bot Management information to origin"}}]}
```
