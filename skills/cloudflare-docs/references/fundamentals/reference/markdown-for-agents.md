---
title: Markdown for Agents
description: Markdown has quickly become the lingua franca for agents and AI systems as a whole. The format’s explicit structure makes it ideal for AI processing, ultimately resulting in better results while minimizing token waste.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/reference/markdown-for-agents.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Markdown for Agents

## What is Markdown for Agents

Markdown has quickly become the lingua franca for agents and AI systems as a whole. The format’s explicit structure makes it ideal for AI processing, ultimately resulting in better results while minimizing token waste.

Cloudflare's network supports real-time content conversion at the source, for enabled zones using [content negotiation ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content%5Fnegotiation) headers. When AI systems request pages from any website that uses Cloudflare and has Markdown for Agents enabled, they can express the preference for `text/markdown` in the request and our network will automatically and efficiently convert the HTML to Markdown, when possible, on the fly.

Read the [announcement ↗](https://blog.cloudflare.com/markdown-for-agents/) in our blog for more information.

## How to use

To fetch the Markdown version of any page from a zone with Markdown for Agents enabled, the client needs to add the `Accept` negotiation header with `text/markdown` as one of the options. Cloudflare will detect this, fetch the original HTML version from the origin, and convert it to Markdown before serving it to the client.

Here's a curl example with the `Accept` negotiation header requesting this page from our developer documentation:

Terminal window

```

curl https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/ \

  -H "Accept: text/markdown"


```

Or if you’re building an AI Agent using Workers, you can use TypeScript:

* [  JavaScript ](#tab-panel-4674)
* [  TypeScript ](#tab-panel-4675)

JavaScript

```

const r = await fetch(

  `https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/`,

  {

    headers: {

      Accept: "text/markdown",

    },

  },

);

const tokenCount = r.headers.get("x-markdown-tokens");

const markdown = await r.text();


```

Explain Code

TypeScript

```

const r = await fetch(

  `https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/`,

  {

    headers: {

      Accept: "text/markdown",

    },

  },

);

const tokenCount = r.headers.get("x-markdown-tokens");

const markdown = await r.text();


```

Explain Code

The response to this request is now formatting in markdown:

```

HTTP/2 200

date: Wed, 11 Feb 2026 11:44:48 GMT

content-type: text/markdown; charset=utf-8

content-length: 2899

vary: accept

x-markdown-tokens: 725

content-signal: ai-train=yes, search=yes, ai-input=yes


---

title: Markdown for Agents · Cloudflare Agents docs

---


## What is Markdown for Agents


Markdown has quickly become the lingua franca for agents and AI systems

as a whole. The format’s explicit structure makes it ideal for AI processing,

ultimately resulting in better results while minimizing token waste.

...


```

Explain Code

### x-markdown-tokens

Note that we include an `x-markdown-tokens` header with the converted response that indicates the estimated number of tokens in the markdown document. You can use this value in your flow, for example to calculate the size of a context window or to decide on your chunking strategy.

### Content Signals Policy

[Content Signals ↗](https://contentsignals.org/) is a framework that allows anyone to express their preferences for how their content can be used after it has been accessed.

By default Markdown for Agents converted responses include the `Content-Signal: ai-train=yes, search=yes, ai-input=yes` header signaling that the content can be used for AI Training, Search results and AI Input, which includes agentic use. Markdown for Agents will provide options to define custom Content Signal policies in the future.

## How to enable

* [ Dashboard ](#tab-panel-4671)
* [ API ](#tab-panel-4672)
* [ Custom Hostnames ](#tab-panel-4673)

To enable Markdown for Agents for your zone in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account (you need a Pro or Business plan).
2. Select the zone you want to configure.
3. Visit the [AI Crawl Control ↗](https://dash.cloudflare.com/?to=/:account/:zone/ai) section.
4. Enable **Markdown for Agents**.

### Enable for specific subdomains or paths

To enable Markdown for Agents for specific subdomains or paths instead of your entire zone, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/):

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Select the zone you want to configure.
3. Go to **Rules** \> **Overview** and select **Create rule** \> **Configuration Rules**.
4. Under **When incoming requests match**, build an expression to match your subdomain (for example, `http.host eq "docs.example.com"`) or path.
5. Under **Then the settings are**, select **Add setting** \> **Markdown for Agents** and set it to **On**.
6. Select **Deploy**.

To enable Markdown for Agents for your zone using APIs, send a `PATCH` to `/client/v4/zones/{zone_tag}/settings/content_converter` with the payload `{"value": "on"}` to the Cloudflare API.

You will need to create an API token with the Zone Settings edit permissions enabled.

Example:

Enable Markdown for Agents

```

curl -X PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_tag}/settings/content_converter' \

  --header 'Content-Type: application/json' \

  --header "Authorization: Bearer {api_token}" --data-raw '{"value": "on"}'


```

### Enable for specific subdomains or paths

To enable Markdown for Agents for specific subdomains or paths instead of your entire zone, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-api/):

Enable Markdown for Agents for a subdomain

```

curl --request PUT \

  --url "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_config_settings/entrypoint" \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "rules": [{

      "expression": "http.host eq \"docs.example.com\"",

      "action": "set_config",

      "action_parameters": {

        "content_converter": true

      },

      "description": "Enable Markdown for Agents for docs subdomain"

    }]

  }'


```

Explain Code

You can also use path-based expressions like `starts_with(http.request.uri.path, "/blog/")`. For more information on building expressions, refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).

If you are using [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) and want to enable Markdown for Agents for your [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/), you have two options:

### Enable for all custom hostnames

To enable Markdown for Agents for all custom hostnames on your SaaS zone:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Select your SaaS zone.
3. Look for **Quick Actions**.
4. Toggle the **Markdown for Agents** button to enable.

### Enable for specific custom hostnames

Enabling Markdown for Agents for specific custom hostnames requires an [advanced subscription](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/) with access to [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/).

#### Step 1: Set custom metadata on the custom hostname

When creating or updating a custom hostname via API, add `content_converter` to the `custom_metadata` object:

Terminal window

```

curl --request PATCH \

  --url "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames/{custom_hostname_id}" \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "custom_metadata": {

      "content_converter": "enabled"

    }

  }'


```

#### Step 2: Create a Configuration Rule

Create a Configuration Rule on your SaaS zone that matches custom hostnames with the metadata and enables content conversion:

Terminal window

```

curl --request PUT \

  --url "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_config_settings/entrypoint" \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "rules": [{

      "expression": "lookup_json_string(cf.hostname.metadata, \"content_converter\") eq \"enabled\"",

      "action": "set_config",

      "action_parameters": {

        "content_converter": true

      },

      "description": "Enable content converter for opted-in custom hostnames"

    }]

  }'


```

Explain Code

This will enable the feature on custom hostnames that have the `content_converter` custom metadata tag set.

## Availability and Pricing

Markdown for Agents is available to Pro, Business and Enterprise plans, and SSL for SaaS customers at no cost.

## Try it with Cloudflare

We have enabled this feature in our [Developer Documentation ↗](https://developers.cloudflare.com/) and our [Blog ↗](https://blog.cloudflare.com/), inviting all AI crawlers and agents to consume our content using markdown instead of HTML.

Terminal window

```

curl https://blog.cloudflare.com/markdown-for-agents/ \

  -H "Accept: text/markdown"


```

## Limitations

* We only convert from HTML, other types of documents may be included in the future.
* The origin response cannot exceed 2 MB (2,097,152 bytes).
* If the feature is enabled but responses are still `text/html`, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to verify your zone's compatibility.

## Other Markdown conversion APIs

If you’re building AI systems that require arbitrary document conversion from outside Cloudflare or Markdown for Agents is not available from the content source, we provide other ways to convert documents to Markdown for your applications:

* Workers AI [AI.toMarkdown() ↗](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) supports multiple document types and summarization.
* Browser Rendering [/markdown ↗](https://developers.cloudflare.com/browser-rendering/rest-api/markdown-endpoint/) REST API supports markdown conversion if you need to render a dynamic page or application in a real browser before converting it.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/markdown-for-agents/","name":"Markdown for Agents"}}]}
```
