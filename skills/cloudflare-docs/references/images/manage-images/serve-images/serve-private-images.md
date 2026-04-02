---
title: Serve private images
description: You can serve private images by using signed URL tokens. When an image requires a signed URL, the image cannot be accessed without a token unless it is being requested for a variant set to always allow public access.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/manage-images/serve-images/serve-private-images.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Serve private images

You can serve private images by using signed URL tokens. When an image requires a signed URL, the image cannot be accessed without a token unless it is being requested for a variant set to always allow public access.

1. In the Cloudflare dashboard, go to the **Hosted Images** page.  
[ Go to **Hosted images** ](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select **Keys**.
3. Copy your key and use it to generate an expiring tokenized URL.

Note

Private images do not currently support custom paths.

## Generate signed URLs from your backend

Signed URLs are generated server-side to protect your signing key. The example below uses a Cloudflare Worker, but the same signing logic can be implemented in any backend environment (Node.js, Python, PHP, Go, etc.).

The Worker accepts a regular Images URL and returns a signed URL that expires after one day. Adjust the `EXPIRATION` value to set a different expiry period.

Note

Never hardcode your signing key in source code. Store it as a secret using [npx wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) and access it via the `env` parameter. For more information, refer to [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

* [  JavaScript ](#tab-panel-4826)
* [  TypeScript ](#tab-panel-4827)

JavaScript

```

const EXPIRATION = 60 * 60 * 24; // 1 day


const bufferToHex = (buffer) =>

  [...new Uint8Array(buffer)]

    .map((x) => x.toString(16).padStart(2, "0"))

    .join("");


async function generateSignedUrl(url, signingKey) {

  // `url` is a full imagedelivery.net URL

  // e.g. https://imagedelivery.net/cheeW4oKsx5ljh8e8BoL2A/bc27a117-9509-446b-8c69-c81bfeac0a01/mobile


  const encoder = new TextEncoder();

  const secretKeyData = encoder.encode(signingKey);

  const key = await crypto.subtle.importKey(

    "raw",

    secretKeyData,

    { name: "HMAC", hash: "SHA-256" },

    false,

    ["sign"],

  );


  // Attach the expiration value to the URL

  const expiry = Math.floor(Date.now() / 1000) + EXPIRATION;

  url.searchParams.set("exp", expiry);

  // `url` now looks like

  // https://imagedelivery.net/cheeW4oKsx5ljh8e8BoL2A/bc27a117-9509-446b-8c69-c81bfeac0a01/mobile?exp=1631289275


  const stringToSign = url.pathname + "?" + url.searchParams.toString();

  // e.g. /cheeW4oKsx5ljh8e8BoL2A/bc27a117-9509-446b-8c69-c81bfeac0a01/mobile?exp=1631289275


  // Generate the HMAC signature

  const mac = await crypto.subtle.sign(

    "HMAC",

    key,

    encoder.encode(stringToSign),

  );

  const sig = bufferToHex(new Uint8Array(mac).buffer);


  // Attach the signature to the URL

  url.searchParams.set("sig", sig);


  return new Response(url);

}


export default {

  async fetch(request, env, ctx) {

    const url = new URL(request.url);

    const imageDeliveryURL = new URL(

      url.pathname

        .slice(1)

        .replace("https:/imagedelivery.net", "https://imagedelivery.net"),

    );

    // IMAGES_SIGNING_KEY is set via `npx wrangler secret put IMAGES_SIGNING_KEY`

    return generateSignedUrl(imageDeliveryURL, env.IMAGES_SIGNING_KEY);

  },

};


```

TypeScript

```

const EXPIRATION = 60 * 60 * 24; // 1 day


const bufferToHex = (buffer: ArrayBuffer) =>

  [...new Uint8Array(buffer)]

    .map((x) => x.toString(16).padStart(2, "0"))

    .join("");


async function generateSignedUrl(

  url: URL,

  signingKey: string,

): Promise<Response> {

  // `url` is a full imagedelivery.net URL

  // e.g. https://imagedelivery.net/cheeW4oKsx5ljh8e8BoL2A/bc27a117-9509-446b-8c69-c81bfeac0a01/mobile


  const encoder = new TextEncoder();

  const secretKeyData = encoder.encode(signingKey);

  const key = await crypto.subtle.importKey(

    "raw",

    secretKeyData,

    { name: "HMAC", hash: "SHA-256" },

    false,

    ["sign"],

  );


  // Attach the expiration value to the URL

  const expiry = Math.floor(Date.now() / 1000) + EXPIRATION;

  url.searchParams.set("exp", expiry);

  // `url` now looks like

  // https://imagedelivery.net/cheeW4oKsx5ljh8e8BoL2A/bc27a117-9509-446b-8c69-c81bfeac0a01/mobile?exp=1631289275


  const stringToSign = url.pathname + "?" + url.searchParams.toString();

  // e.g. /cheeW4oKsx5ljh8e8BoL2A/bc27a117-9509-446b-8c69-c81bfeac0a01/mobile?exp=1631289275


  // Generate the HMAC signature

  const mac = await crypto.subtle.sign(

    "HMAC",

    key,

    encoder.encode(stringToSign),

  );

  const sig = bufferToHex(new Uint8Array(mac).buffer);


  // Attach the signature to the URL

  url.searchParams.set("sig", sig);


  return new Response(url);

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    const url = new URL(request.url);

    const imageDeliveryURL = new URL(

      url.pathname

        .slice(1)

        .replace("https:/imagedelivery.net", "https://imagedelivery.net"),

    );

    // IMAGES_SIGNING_KEY is set via `npx wrangler secret put IMAGES_SIGNING_KEY`

    return generateSignedUrl(imageDeliveryURL, env.IMAGES_SIGNING_KEY);

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/manage-images/","name":"Manage uploaded images"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/manage-images/serve-images/","name":"Serve images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/manage-images/serve-images/serve-private-images/","name":"Serve private images"}}]}
```
