---
description: Use existing data layer calls with Zaraz compatibility mode.
title: Data layer compatibility mode
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Data layer compatibility mode

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/advanced/datalayer-compatibility/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. This way you can keep your current implementation and Cloudflare Zaraz will automatically collect your events.

To keep the Zaraz script as small and fast as possible, the data layer compatibility mode is disabled by default. To enable it:

1. Go to [**Zaraz** ↗](https://dash.cloudflare.com/?to=/:account/:zone/zaraz) \> **Settings**.
2. Enable the **Data layer compatibility mode** toggle. Refer to [Zaraz settings](https://developers.cloudflare.com/zaraz/reference/settings/) for more information.

## Using the data layer with Zaraz

After enabling the compatibility mode, Zaraz will automatically translate your `dataLayer.push()` calls to `zaraz.track()`, so you can keep using the `dataLayer.push()` function to send events from the browser to Zaraz.

Note

Zaraz does not support automatic e-commerce mapping through the `dataLayer` compatibility mode. If you need to track e-commerce events, refer to the [E-commerce API](https://developers.cloudflare.com/zaraz/web-api/ecommerce/).

Events will only be sent to Zaraz if your pushed object includes an `event` key. The `event`key is used as the name for the Zaraz event. Other keys will become part of the `eventProperties` object. The following example shows how a purchase event will be sent using the data layer to Zaraz — note that the parameters inside the object depend on what you want to track:

```js
dataLayer.push({
  event: 'purchase',
  price: '24',
  currency: 'USD',
  transactionID: '12345678',
});
```

Cloudflare Zaraz then translates the `dataLayer.push()` call to a `zaraz.track()` call. So, `dataLayer.push({event: "purchase", price: "24", "currency": "USD"})` is equivalent to `zaraz.track("purchase", {"price": "24", "currency": "USD"})`.

Because Zaraz converts the `dataLayer.push()` call to `zaraz.track()`, creating a trigger based on `dataLayer.push()` calls is the same as creating triggers for `zaraz.track()`. As an example, the trigger below will match the above `dataLayer.push()` call because it matches the event with `purchase`.

| Rule type    | Variable name | Match operation | Match string |
| ------------ | ------------- | --------------- | ------------ |
| _Match rule_ | _Event Name_  | _Equals_        | purchase     |

We do not recommend using `dataLayer`. However, as many websites employ it, Cloudflare Zaraz has this automatic translation layer that converts it to `zaraz.track()`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/advanced/datalayer-compatibility/#page","headline":"Data layer compatibility mode · Cloudflare Zaraz docs","description":"Use existing data layer calls with Zaraz compatibility mode.","url":"https://developers.cloudflare.com/zaraz/advanced/datalayer-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
