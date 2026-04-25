---
title: Track
description: Send custom tracking events with the Zaraz Web API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Track

You can use `zaraz.track()` anywhere inside the `<body>` tag of a page.

`zaraz.track()` allows you to track custom events on your website, that might happen in real time. It is an `async` function, so you can choose to `await` it if you would like to make sure it completed before running other code.

Example of user events you might be interested in tracking are successful sign-ups, calls-to-action clicks, or purchases. Common examples for other types of events are tracking the impressions of specific elements on a page, or loading a specific widget.

To start tracking events, use the `zaraz.track()` function like this:

JavaScript

```

zaraz.track(eventName, [eventProperties]);


```

The `eventName` parameter is a string, and the `eventProperties` parameter is an optional flat object of additional context you can attach to the event using your own keys of choice. For example, tracking a purchase with the value of 200 USD could look like this:

JavaScript

```

zaraz.track("purchase", { value: 200, currency: "USD" });


```

Note that the name of the event (`purchase` in the above example), the names of the keys (`value` and `currency`) and the number of keys are customizable by you. You choose what variables to track and how you want to track these variables. However, picking meaningful names will help you when you configure your triggers, because the trigger configuration has to match the events your website is sending.

After using `zaraz.track()` in your website, you will usually want to create a trigger based on it, and then use the trigger in an action. Start by [creating a new trigger](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/), with _Event Name_ as your trigger's **Variable name**, and the `eventName` you are tracking in **Match string**. Following the above example, your trigger will look like this:

**Trigger example: Match `zaraz.track("purchase")`**

| Rule type    | Variable name | Match operation | Match string |
| ------------ | ------------- | --------------- | ------------ |
| _Match rule_ | _Event Name_  | _Equals_        | purchase     |

In every tool you want to use this trigger, add an action with this trigger [configured as a firing trigger](https://developers.cloudflare.com/zaraz/custom-actions/). Each action that uses this trigger can access the `eventProperties` you have sent. In the **Action** fields, you can use `{{ client.<KEY_NAME> }}` to get the value of `<KEY_NAME>`. In the above example, Zaraz will replace `{{ client.value }}` with `200`. If your key includes special characters or numbers, surround it with backticks like `` {{ client.`<KEY_NAME>` }} ``.

For more information regarding the properties you can use with `zaraz.track()`, refer to [Properties reference](https://developers.cloudflare.com/zaraz/reference/properties-reference/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/web-api/","name":"Web API"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/web-api/track/","name":"Track"}}]}
```
