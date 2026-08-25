---
description: Transform and filter event data with JSONata expressions in Zaraz.
title: Using JSONata
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Using JSONata

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/advanced/using-jsonata/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

For advanced use cases, it is sometimes useful to be able to retrieve a value in a particular way. For instance, you might be using `zaraz.track` to send a list of products to Zaraz, but the third-party tool you want to send this data to requires the total cost of the products. Alternatively, you may want to manipulate a value, such as converting it to lowercase.

Cloudflare Zaraz uses JSONata to enable you to perform complex operations on your data. With JSONata, you can evaluate expressions against the [Zaraz Context](https://developers.cloudflare.com/zaraz/reference/context/), allowing you to access and manipulate a wide range of values. To learn more about the values available and how to access them, consult the [full reference](https://developers.cloudflare.com/zaraz/reference/context/). You can also refer to the [complete JSONata documentation ↗](https://docs.jsonata.org/) for more information about JSONata's capabilities.

To use JSONata inside Zaraz, follow these steps:

1. In the Cloudflare dashboard, go to the **Tag setup** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/settings)
2. Go to **Tools configuration** \> **Tools**.
3. Select **Edit** next to a tool that you have already configured.
4. Select an action or add a new one.
5. Choose the field you want to use JSONata in, and wrap your JSONata expression with double curly brackets, like `{{ expression }}`.

JSONata can also be used inside Triggers, Tool Settings, and String Variables.

## Examples

### Converting a string to lowercase

Converting a string to lowercase is useful if you want to compare it to something else, for example a regular expression. Assuming the original string comes from a cookie named `myCookie`, turning the value lowercase can be done using `{{ $lowercase(system.cookies.myCookie) }}`.

### Sending a sum of all products in the cart

Assuming you are using `zaraz.ecommerce()` to send the cart content like this:

```js
zaraz.track('Product List Viewed',
  {  products:
    [
    {
      sku: '2671033',
      name: 'V-neck T-shirt',
      price: 14.99,
      quantity: 3
    },{
      sku: '2671034',
      name: 'T-shirt',
      price: 10.99,
      quantity: 2
    },
    ],
  }
);
```

If the field in which you want to show the sum, you will enter `{{ $sum(client.products.(price * quantity)) }}`. This will multiply the price of each product by its quantity, and then sum up the total.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/advanced/using-jsonata/#page","headline":"Using JSONata · Cloudflare Zaraz docs","description":"Transform and filter event data with JSONata expressions in Zaraz.","url":"https://developers.cloudflare.com/zaraz/advanced/using-jsonata/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
