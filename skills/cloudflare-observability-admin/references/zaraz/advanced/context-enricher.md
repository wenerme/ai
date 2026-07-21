---
description: Enrich event context with server-side data using Workers.
title: Context Enricher
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

#  Context Enricher

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/zaraz/advanced/context-enricher/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The Zaraz Context Enricher is a tool to modify or enrich [the context](https://developers.cloudflare.com/zaraz/reference/context/) that is being used across Zaraz using a Cloudflare Worker. The Context Enricher allows you access to the client and system variables.

## Creating a Worker

To use a Context Enricher, you first need to create a new Cloudflare Worker. You can do this through the Cloudflare dashboard or by using [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/).

To create a new Worker in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[ Go to **Workers & Pages** ↗ ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Give a name to your Worker and select **Deploy**.
4. Select **Edit code**.

You have now created a basic Worker that responds with "Hello world." To make this Worker functional when using it as a Context Enricher, you need to change the code to return the context back:

```js
export default {
  async fetch(request, env, ctx) {
    const { system, client } = await request.json();

    // Here goes your modification to the system or client objects.
    /*
      For example, to change the country to a fictitious "Pirate's Island" ("PI"), use:
      system.device.location.country = 'PI';
    */

    return new Response(JSON.stringify({ system, client }));
  },
};
```

Keep reading for more complete examples of different use cases or refer to [Zaraz Context](https://developers.cloudflare.com/zaraz/reference/context/).

## Configuring your Context Enricher

Now that your Worker is published, you can select it in your Zaraz settings:

1. In the Cloudflare dashboard, go to the **Settings** page.
[ Go to **Settings** ↗ ](https://dash.cloudflare.com/?to=/:account/tag-management/settings)
2. Select your Context Enricher Worker.
3. Save your settings.

Your Context Enricher will now run on all Zaraz requests in that given zone.

## Example Context Enricher

### Adding arbitrary information using an API

You can use the Context Enricher to add information to your context. For example, you could use an API to get the current weather for the user's location and add it to the context.

```js
function getWeatherForLocation({ client, system }) {
  // Get the location from the context.
  const { city } = system.device.location;

  // Get the weather from an API.
  const response = await fetch(
    `https://wttr.in/${encodeURIComponents(city)}?format=j1`
  ).then((response) => response.json());

  // Add the weather to the context.
  client.weather = weather;

  return { client, system };
}

export default {
  async fetch(request, env, ctx) {
    const { system, client } = await request.json();

    // Add the weather to the context.
    const newContext = getWeatherForLocation({ system, client });

    // Return as JSON
    return new Response(JSON.stringify(newContext));
  },
};
```

Now, you can use the weather property anywhere in Zaraz by choosing the `Track Property` from the attributes input and entering `weather`.

### Masking sensitive information, such as emails

Let's assume we want to redact sensitive information, such as emails. For this, we're going to replace all occurrences of email addresses throughout the context. Please keep in mind that this is only an example and might not fit all edge or use cases.

For the sake of simplicity of this example, we're going to replace all strings that contain an `@` symbol:

```js
function redactEmailAddressesFromObject(context) {
  // Loop through all keys of the object.
  for (const key in context) {
    // Check if the value is a string.
    if (typeof context[key] === "string") {
      // Check if the string contains an @ symbol.
      if (context[key].includes("@")) {
        // Replace the string with a redacted version.
        context[key] = "REDACTED@example.com";
      }
    } else if (typeof context[key] === "object") {
      // Recursively call this function to redact the object.
      context[key] = redactEmailAddressesFromObject(context[key]);
    }
  }

  return context;
}

export default {
  async fetch(request, env, ctx) {
    const { system, client } = await request.json();

    // Redact email addresses from the context.
    const newContext = redactEmailAddressesFromObject({ system, client });

    // Return as JSON
    return new Response(JSON.stringify(newContext));
  },
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/advanced/context-enricher/#page","headline":"Context Enricher · Cloudflare Zaraz docs","description":"Enrich event context with server-side data using Workers.","url":"https://developers.cloudflare.com/zaraz/advanced/context-enricher/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
