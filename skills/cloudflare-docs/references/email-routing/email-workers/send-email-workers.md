---
title: Send emails from Workers
description: You can send an email about your Worker's activity from your Worker to an email address verified on Email Routing. This is useful for when you want to know about certain types of events being triggered, for example.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-routing/email-workers/send-email-workers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Send emails from Workers

You can send an email about your Worker's activity from your Worker to an email address verified on [Email Routing](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/#destination-addresses). This is useful for when you want to know about certain types of events being triggered, for example.

Before you can bind an email address to your Worker, you need to [enable Email Routing](https://developers.cloudflare.com/email-routing/get-started/) and have at least one [verified email address](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/#destination-addresses). Then, create a new binding in the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-4587)
* [  wrangler.toml ](#tab-panel-4588)

```

{

  "send_email": [

    {

      "name": "<NAME_FOR_BINDING>",

      "destination_address": "<YOUR_EMAIL>@example.com"

    }

  ]

}


```

```

[[send_email]]

name = "<NAME_FOR_BINDING>"

destination_address = "<YOUR_EMAIL>@example.com"


```

## Types of bindings

There are several types of restrictions you can configure in the bindings:

* **No attribute defined**: When you do not define an attribute, the binding has no restrictions in place. You can use it to send emails to any verified email address [through Email Routing](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/#destination-addresses).
* **`destination_address`**: When you define the `destination_address` attribute, you create a targeted binding. This means you can only send emails to the chosen email address. For example, `{type = "send_email", name = "<NAME_FOR_BINDING>", destination_address = "<YOUR_EMAIL>@example.com"}`.  
 For this particular binding, when you call the `send_email` function you can pass `null` or `undefined` to your Worker and it will assume the email address specified in the binding.
* **`allowed_destination_addresses`**: When you specify this attribute, you create an allowlist, and can send emails to any email address on the list.
* **`allowed_sender_addresses`**: When you specify this attribute, you create a sender allowlist, and can only send emails from an email address on the list.

You can add one or more types of bindings to your Wrangler file. However, each attribute must be on its own line:

* [  wrangler.jsonc ](#tab-panel-4589)
* [  wrangler.toml ](#tab-panel-4590)

```

{

  "send_email": [

    {

      "name": "<NAME_FOR_BINDING1>"

    },

    {

      "name": "<NAME_FOR_BINDING2>",

      "destination_address": "<YOUR_EMAIL>@example.com"

    },

    {

      "name": "<NAME_FOR_BINDING3>",

      "allowed_destination_addresses": [

        "<YOUR_EMAIL>@example.com",

        "<YOUR_EMAIL2>@example.com"

      ]

    }

  ]

}


```

```

[[send_email]]

name = "<NAME_FOR_BINDING1>"


[[send_email]]

name = "<NAME_FOR_BINDING2>"

destination_address = "<YOUR_EMAIL>@example.com"


[[send_email]]

name = "<NAME_FOR_BINDING3>"

allowed_destination_addresses = [ "<YOUR_EMAIL>@example.com", "<YOUR_EMAIL2>@example.com" ]


```

## Example Worker

Refer to the example below to learn how to construct a Worker capable of sending emails. This example uses [MIMEText ↗](https://www.npmjs.com/package/mimetext):

Note

The sender has to be an email from the domain where you have Email Routing active.

JavaScript

```

import { EmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext";


export default {

  async fetch(request, env) {

    const msg = createMimeMessage();

    msg.setSender({ name: "GPT-4", addr: "<SENDER>@example.com" });

    msg.setRecipient("<RECIPIENT>@example.com");

    msg.setSubject("An email generated in a worker");

    msg.addMessage({

      contentType: "text/plain",

      data: `Congratulations, you just sent an email from a worker.`,

    });


    var message = new EmailMessage(

      "<SENDER>@example.com",

      "<RECIPIENT>@example.com",

      msg.asRaw(),

    );

    try {

      await env.SEB.send(message);

    } catch (e) {

      return new Response(e.message);

    }


    return new Response("Hello Send Email World!");

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/email-workers/","name":"Email Workers"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/email-workers/send-email-workers/","name":"Send emails from Workers"}}]}
```
