---
title: /content - Fetch HTML
description: The /content endpoint instructs the browser to navigate to a website and capture the fully rendered HTML of a page, including the head section, after JavaScript execution. This is ideal for capturing content from JavaScript-heavy or interactive websites.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/rest-api/content-endpoint.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# /content - Fetch HTML

The `/content` endpoint instructs the browser to navigate to a website and capture the fully rendered HTML of a page, including the `head` section, after JavaScript execution. This is ideal for capturing content from JavaScript-heavy or interactive websites.

Before you begin, make sure you [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the `Browser Rendering - Edit` permission. For more information, refer to [REST API — Before you begin](https://developers.cloudflare.com/browser-rendering/rest-api/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/content


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Capture the fully rendered HTML of a dynamic page
* Extract HTML for parsing, scraping, or downstream processing

## Basic usage

### Fetch rendered HTML from a URL

* [ curl ](#tab-panel-3258)
* [ TypeScript SDK ](#tab-panel-3259)

Go to `https://developers.cloudflare.com/` and return the rendered HTML.

Terminal window

```

curl -X 'POST' 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/content' \

  -H 'Content-Type: application/json' \

  -H 'Authorization: Bearer <apiToken>' \

  -d '{"url": "https://developers.cloudflare.com/"}'


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const content = await client.browserRendering.content.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://developers.cloudflare.com/",

});


console.log(content);


```

## Advanced usage

Looking for more parameters?

Visit the [Browser Rendering API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/content/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Block specific resource types

Navigate to `https://cloudflare.com/` but block images and stylesheets from loading. Undesired requests can be blocked by resource type (`rejectResourceTypes`) or by using a regex pattern (`rejectRequestPattern`). The opposite can also be done, only allow requests that match `allowRequestPattern` or `allowResourceTypes`.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/content' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

      "url": "https://cloudflare.com/",

      "rejectResourceTypes": ["image"],

      "rejectRequestPattern": ["/^.*\\.(css)"]

    }'


```

Many more options exist, like setting HTTP headers using `setExtraHTTPHeaders`, setting `cookies`, and using `gotoOptions` to control page load behaviour - check the endpoint [reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/content/methods/create/) for all available parameters.

### Handling JavaScript-heavy pages

For JavaScript-heavy pages or Single Page Applications (SPAs), the default page load behavior may return empty or incomplete results. This happens because the browser considers the page loaded before JavaScript has finished rendering the content.

The simplest solution is to use the `gotoOptions.waitUntil` parameter set to `networkidle0` or `networkidle2`:

```

{

  "url": "https://example.com",

  "gotoOptions": {

    "waitUntil": "networkidle0"

  }

}


```

For faster responses, advanced users can use `waitForSelector` to wait for a specific element instead of waiting for all network activity to stop. This requires knowing which CSS selector indicates the content you need has loaded. For more details, refer to [REST API timeouts](https://developers.cloudflare.com/browser-rendering/reference/timeouts/).

### Set a custom user agent

You can change the user agent at the page level by passing `userAgent` as a top-level parameter in the JSON body. This is useful if the target website serves different content based on the user agent.

Note

The `userAgent` parameter does not bypass bot protection. Requests from Browser Rendering will always be identified as a bot. Because the User-Agent is configurable, destination servers looking to identify or block Browser Rendering requests should use the [non-configurable headers](https://developers.cloudflare.com/browser-rendering/reference/automatic-request-headers/#non-configurable-headers) rather than relying on the User-Agent string.

## Troubleshooting

If you have questions or encounter an error, see the [Browser Rendering FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-rendering/faq/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/rest-api/","name":"REST API"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/rest-api/content-endpoint/","name":"/content - Fetch HTML"}}]}
```
