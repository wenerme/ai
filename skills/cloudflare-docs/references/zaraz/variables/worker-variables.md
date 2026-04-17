---
title: Worker Variables
description: Create server-side variables using Workers for use in Zaraz actions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/variables/worker-variables.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Worker Variables

Zaraz Worker Variables are a powerful type of variable that you can configure and then use in your actions and triggers. Unlike string and masked variables, Worker Variables are dynamic. This means you can use a Cloudflare Worker to determine the value of the variable, allowing you to use them for countless purposes. For example:

1. A Worker Variable that calculates the sum of all products in the cart
2. A Worker Variable that takes a cookie, makes a request to your backend, and returns the User ID
3. A Worker Variable that hashes a value before sending it to a third-party vendor

## Creating a Worker

To use a Worker Variable, you first need to create a new Cloudflare Worker. You can do this through the Cloudflare dashboard or by using [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/).

To create a new Worker in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers and Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Give a name to your Worker and select **Deploy**.
4. Select **Edit code**.

You have now created a basic Worker that responds with "Hello world." If you use this Worker as a Variable, your Variable will always output "Hello world." The response body coming from your Worker will be the value of your Worker Variable. To make this Worker useful, you will usually want to use information coming from Zaraz, which is known as the Zaraz Context.

Zaraz forwards the Zaraz Context object to your Worker as a JSON payload with a POST request. You can access any property like this:

JavaScript

```

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

Explain Code

Keep reading for more complete examples of different use cases or refer to [Zaraz Context](https://developers.cloudflare.com/zaraz/reference/context/).

## Configuring a Worker Variable

Once your Worker is published, configuring a Worker Variable is easy.

1. In the Cloudflare dashboard, go to the **Tag setup** page.  
[ Go to **Tag setup** ](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Select the domain for which you want to configure variables.
3. Select the **Variables** tab.
4. Select **Create variable**.
5. Give your variable a name, choose **Worker** as the Variable type, and select your newly created Worker.
6. Save your variable.

## Using your Worker Variable

Now that your Worker Variable is configured, you can use it in your actions and triggers.

To use your Worker Variable:

1. In the Cloudflare dashboard, go to the **Tag setup** page.  
[ Go to **Tag setup** ](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Select the domain for which you want to configure variables.
3. Select **Edit** next to a tool that you have already configured.
4. Select an action or add a new one.
5. Select the plus sign at the right of the text fields.
6. Select your Worker Variable from the list.

## Example Worker Variables

### Calculates the sum of all products in the cart

Assuming we are sending a list of products in a cart, like this:

JavaScript

```

zaraz.ecommerce("Cart Viewed", {

  products: [

    { name: "shirt", price: "50" },

    { name: "jacket", price: "20" },

    { name: "hat", price: "30" },

  ],

});


```

Calculating the sum can be done like this:

JavaScript

```

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

Explain Code

### Match a cookie with a user in your backend

Zaraz exposes all cookies automatically under the `system.cookies` object, so they are always available. Accessing the cookie and using it to query your backend might look like this:

JavaScript

```

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

Explain Code

### Hash a value before sending it to a third-party vendor

Assuming you're sending a value that you want to hash, for example, an email address:

JavaScript

```

zaraz.track("user_logged_in", { email: "user@example.com" });


```

You can access this property and hash it like this:

JavaScript

```

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/variables/","name":"Variables"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/variables/worker-variables/","name":"Worker Variables"}}]}
```
