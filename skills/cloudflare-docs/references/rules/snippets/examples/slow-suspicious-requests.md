---
title: Slow down suspicious requests
description: Define a delay to be used when incoming requests match a rule you consider suspicious based on the bot score.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Slow down suspicious requests

Define a delay to be used when incoming requests match a rule you consider suspicious based on the bot score.

## Snippet code

JavaScript

```

export default {

  async fetch(request) {

    // Define delay

    const delay_in_seconds = 5;

    // Introduce a delay

    await new Promise((resolve) =>

      setTimeout(resolve, delay_in_seconds * 1000),

    ); // Set delay in milliseconds


    // Pass the request to the origin

    const response = await fetch(request);

    return response;

  },

};


```

## Snippet rule

Configure a custom filter expression:

| Field     | Operator  | Value |
| --------- | --------- | ----- |
| Bot Score | less than | 10    |

If you are using the Expression Editor, enter the following expression:

```

(cf.bot_management.score lt 10)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/slow-suspicious-requests/","name":"Slow down suspicious requests"}}]}
```
