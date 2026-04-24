---
title: Create custom headers for Cloudflare Access-protected origins with Workers
description: This tutorial covers how to use a Cloudflare Worker to add custom headers to traffic. The headers will be sent to origin services protected by Cloudflare Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/tutorials/access-workers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Create custom headers for Cloudflare Access-protected origins with Workers

**Last reviewed:**  over 2 years ago 

This tutorial covers how to use a [Cloudflare Worker](https://developers.cloudflare.com/workers/) to add custom HTTP headers to traffic, and how to send those custom headers to your origin services protected by [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

Some applications and networking implementations require specific custom headers to be passed to the origin, which can be difficult to implement for traffic moving through a Zero Trust proxy. You can configure a Worker to send the [user authorization headers](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/) required by Access.

---

## Before you begin

* Secure your origin server with Cloudflare Access

## Before you begin

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. If this is your first Worker, select **Create Worker**. Otherwise, select **Create application**, then select **Create Worker**.
3. Enter an identifiable name for the Worker, then select **Deploy**.
4. Select **Edit code**.
5. Input the following Worker:

* [  JavaScript ](#tab-panel-6305)
* [  TypeScript ](#tab-panel-6306)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const { headers } = request;

    const cfaccessemail = headers.get("cf-access-authenticated-user-email");


    const requestWithID = new Request(request);

    requestWithID.headers.set("company-user-id", cfaccessemail);


    return fetch(requestWithID);

  },

};


```

Explain Code

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const { headers } = request;

    const cfaccessemail = headers.get("cf-access-authenticated-user-email");


    const requestWithID = new Request(request);

    requestWithID.headers.set("company-user-id", cfaccessemail);


    return fetch(requestWithID);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

1. Select **Save and deploy**.

Your Worker is now ready to send custom headers to your Access-protected origin services.

## Apply the Worker to your hostname

1. Select the Worker you created, then go to **Triggers**.
2. In **Routes**, select **Add route**.
3. Enter the hostname and zone for your origin, then select **Add route**.

The Worker will now insert a custom header into requests that match the defined route. For example:

Example custom header

```

"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",

    "Accept-Encoding": "gzip",

    "Accept-Language": "en-US,en;q=0.9",

    "Cf-Access-Authenticated-User-Email": "user@example.com",

    "Company-User-Id": "user@example.com",

    "Connection": "keep-alive"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/access-workers/","name":"Create custom headers for Cloudflare Access-protected origins with Workers"}}]}
```
