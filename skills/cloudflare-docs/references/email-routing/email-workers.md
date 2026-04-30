---
title: Email Workers
description: Process incoming emails programmatically with Cloudflare Workers to build custom filtering, forwarding, and notification logic.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-routing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email Workers

With Email Workers you can leverage the power of Cloudflare Workers to implement any logic you need to process your emails and create complex rules. These rules determine what happens when you receive an email.

Creating your own rules with Email Workers is as easy or complex as you want. You can begin using one of the starter templates that are pre-populated with code for popular use-cases. These templates allow you to create a blocklist, allowlist, or send notifications to Slack.

If you prefer, you can skip the templates and use custom code. You can, for example, create logic that only accepts messages from a specific address, and then forwards them to one or more of your [verified email addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#destination-addresses), while also alerting you on Slack.

The following is an example of an allowlist Email Worker:

JavaScript

```

export default {

  async email(message, env, ctx) {

    const allowList = ["friend@example.com", "coworker@example.com"];

    if (allowList.indexOf(message.from) == -1) {

      message.setReject("Address not allowed");

    } else {

      await message.forward("inbox@corp");

    }

  },

};


```

Refer to the [Workers Languages](https://developers.cloudflare.com/workers/languages/) for more information regarding the languages you can use with Workers.

## How to use Email Workers

To use Email Routing with Email Workers there are three steps involved:

1. Creating the Email Worker.
2. Adding the logic to your Email Worker (like email addresses allowed or blocked from sending you emails).
3. Binding the Email Worker to a route. This is the email address that forwards emails to the Worker.

The route, or email address, bound to the Worker forwards emails to your Email Worker. The logic in the Worker will then decide if the email is forwarded to its final destination or dropped, and what further actions (if any) will be applied.

For example, say that you create an allowlist Email Worker and bind it to a `hello@my-company.com` route. This route will be the email address you share with the world, to make sure that only email addresses on your allowlist are forwarded to your destination address. All other emails will be dropped.

## Resources

* [Limits](https://developers.cloudflare.com/email-routing/limits/#email-workers-size-limits)
* [Runtime API](https://developers.cloudflare.com/email-routing/email-workers/runtime-api/)
* [Local development](https://developers.cloudflare.com/email-routing/email-workers/local-development/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/email-workers/","name":"Email Workers"}}]}
```
