---
description: Create server-side variables using Workers for use in Zaraz actions.
title: Worker Variables
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Worker Variables

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/variables/worker-variables/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Zaraz Worker Variables are a powerful type of variable that you can configure and then use in your actions and triggers. Unlike string and masked variables, Worker Variables are dynamic. This means you can use a Cloudflare Worker to determine the value of the variable, allowing you to use them for countless purposes. For example:

1. A Worker Variable that calculates the sum of all products in the cart
2. A Worker Variable that takes a cookie, makes a request to your backend, and returns the User ID
3. A Worker Variable that hashes a value before sending it to a third-party vendor

## Creating a Worker

To use a Worker Variable, you first need to create a new Cloudflare Worker. You can do this through the Cloudflare dashboard or by using [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/).

To create a new Worker in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers and Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Give a name to your Worker and select **Deploy**.
4. Select **Edit code**.

You have now created a basic Worker that responds with "Hello world." If you use this Worker as a Variable, your Variable will always output "Hello world." The response body coming from your Worker will be the value of your Worker Variable. To make this Worker useful, you will usually want to use information coming from Zaraz, which is known as the Zaraz Context.

Zaraz forwards the Zaraz Context object to your Worker as a JSON payload with a POST request. You can access any property like this:

```js
const { system, client } = await request.json()

/* System parameters */
system.page.url.href // URL of the current page
system.page.query.gclid // Value of the gclid query parameter
system.device.resolution // Device screen resolution
system.device.language // Browser preferred language

/* Zaraz Track values */
client.value // value from `zaraz.track("foo", {value: "bar"})`
client.products[0].name // name of the first product in an ecommerce call
```

Keep reading for more complete examples of different use cases or refer to [Zaraz Context](https://developers.cloudflare.com/zaraz/reference/context/).

## Configuring a Worker Variable

Once your Worker is published, configuring a Worker Variable is easy.

1. In the Cloudflare dashboard, go to the **Tag setup** page.
[Go to **Tag setup** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Select the domain for which you want to configure variables.
3. Select the **Variables** tab.
4. Select **Create variable**.
5. Give your variable a name, choose **Worker** as the Variable type, and select your newly created Worker.
6. Save your variable.

## Using your Worker Variable

Now that your Worker Variable is configured, you can use it in your actions and triggers.

To use your Worker Variable:

1. In the Cloudflare dashboard, go to the **Tag setup** page.
[Go to **Tag setup** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Select the domain for which you want to configure variables.
3. Select **Edit** next to a tool that you have already configured.
4. Select an action or add a new one.
5. Select the plus sign at the right of the text fields.
6. Select your Worker Variable from the list.

## Example Worker Variables

### Calculates the sum of all products in the cart

Assuming we are sending a list of products in a cart, like this:

```js
zaraz.ecommerce("Cart Viewed", {
  products: [
    { name: "shirt", price: "50" },
    { name: "jacket", price: "20" },
    { name: "hat", price: "30" },
  ],
});
```

Calculating the sum can be done like this:

```js
export default {
  async fetch(request, env) {
    // Parse the Zaraz Context object
    const { system, client } = await request.json();

    // Get an array of all prices
    const productsPrices = client.products.map((p) => p.price);

    // Calculate the sum
    const sum = productsPrices.reduce((partialSum, a) => partialSum + a, 0);

    return new Response(sum);
  },
};
```

### Match a cookie with a user in your backend

Zaraz exposes all cookies automatically under the `system.cookies` object, so they are always available. Accessing the cookie and using it to query your backend might look like this:

```js
export default {
  async fetch(request, env) {
    // Parse the Zaraz Context object
    const { system, client } = await request.json();

    // Get the value of the cookie "login-cookie"
    const cookieValue = system.cookies["login-cookie"];

    const userId = await fetch("https://example.com/api/getUserIdFromCookie", {
      method: POST,
      body: cookieValue,
    });

    return new Response(userId);
  },
};
```

### Hash a value before sending it to a third-party vendor

Assuming you're sending a value that you want to hash, for example, an email address:

```js
zaraz.track("user_logged_in", { email: "user@example.com" });
```

You can access this property and hash it like this:

```js
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

export default {
  async fetch(request, env) {
    // Parse the Zaraz Context object
    const { system, client } = await request.json();

    const { email } = client;

    return new Response(await digestMessage(email));
  },
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/variables/worker-variables/#page","headline":"Worker Variables · Cloudflare Zaraz docs","description":"Create server-side variables using Workers for use in Zaraz actions.","url":"https://developers.cloudflare.com/zaraz/variables/worker-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
