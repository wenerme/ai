---
title: Request handling
description: Your AI gateway supports different strategies for handling requests to providers, which allows you to manage AI interactions effectively and ensure your applications remain responsive and reliable.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/configuration/request-handling.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Request handling

Deprecated

While the request handling features described on this page still work, [Dynamic Routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) is now the preferred way to achieve advanced request handling, including timeouts, retries, and fallbacks. Dynamic Routing provides a more powerful and flexible approach with a visual interface for managing complex routing scenarios.

Your AI gateway supports different strategies for handling requests to providers, which allows you to manage AI interactions effectively and ensure your applications remain responsive and reliable.

## Request timeouts

A request timeout allows you to trigger fallbacks or a retry if a provider takes too long to respond.

These timeouts help:

* Improve user experience, by preventing users from waiting too long for a response
* Proactively handle errors, by detecting unresponsive providers and triggering a fallback option

Request timeouts can be set on a Universal Endpoint or directly on a request to any provider.

### Definitions

A timeout is set in milliseconds. Additionally, the timeout is based on when the first part of the response comes back. As long as the first part of the response returns within the specified timeframe - such as when streaming a response - your gateway will wait for the response.

### Configuration

#### Universal Endpoint

If set on a [Universal Endpoint](https://developers.cloudflare.com/ai-gateway/usage/universal/), a request timeout specifies the timeout duration for requests and triggers a fallback.

For a Universal Endpoint, configure the timeout value by setting a `requestTimeout` property within the provider-specific `config` object. Each provider can have a different `requestTimeout` value for granular customization.

Provider-level config

```

curl 'https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}' \

  --header 'Content-Type: application/json' \

  --data '[

    {

        "provider": "workers-ai",

        "endpoint": "@cf/meta/llama-3.1-8b-instruct",

        "headers": {

            "Authorization": "Bearer {cloudflare_token}",

            "Content-Type": "application/json"

        },

        "config": {

            "requestTimeout": 1000

        },

        "query": {

34 collapsed lines

            "messages": [

                {

                    "role": "system",

                    "content": "You are a friendly assistant"

                },

                {

                    "role": "user",

                    "content": "What is Cloudflare?"

                }

            ]

        }

    },

    {

        "provider": "workers-ai",

        "endpoint": "@cf/meta/llama-3.1-8b-instruct-fast",

        "headers": {

            "Authorization": "Bearer {cloudflare_token}",

            "Content-Type": "application/json"

        },

        "query": {

            "messages": [

                {

                    "role": "system",

                    "content": "You are a friendly assistant"

                },

                {

                    "role": "user",

                    "content": "What is Cloudflare?"

                }

            ]

        },

        "config": {

            "requestTimeout": 3000

        },

    }

]'


```

#### Direct provider

If set on a [provider](https://developers.cloudflare.com/ai-gateway/usage/providers/) request, request timeout specifies the timeout duration for a request and - if exceeded - returns an error.

For a provider-specific endpoint, configure the timeout value by adding a `cf-aig-request-timeout` header.

Provider-specific endpoint example

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/@cf/meta/llama-3.1-8b-instruct \

 --header 'Authorization: Bearer {cf_api_token}' \

 --header 'Content-Type: application/json' \

 --header 'cf-aig-request-timeout: 5000'

 --data '{"prompt": "What is Cloudflare?"}'


```

---

## Request retries

AI Gateway also supports automatic retries for failed requests, with a maximum of five retry attempts.

This feature improves your application's resiliency, ensuring you can recover from temporary issues without manual intervention.

Request timeouts can be set on a Universal Endpoint or directly on a request to any provider.

### Definitions

With request retries, you can adjust a combination of three properties:

* Number of attempts (maximum of 5 tries)
* How long before retrying (in milliseconds, maximum of 5 seconds)
* Backoff method (constant, linear, or exponential)

On the final retry attempt, your gateway will wait until the request completes, regardless of how long it takes.

### Configuration

#### Universal endpoint

If set on a [Universal Endpoint](https://developers.cloudflare.com/ai-gateway/usage/universal/), a request retry will automatically retry failed requests up to five times before triggering any configured fallbacks.

For a Universal Endpoint, configure the retry settings with the following properties in the provider-specific `config`:

```

config:{

  maxAttempts?: number;

  retryDelay?: number;

  backoff?: "constant" | "linear" | "exponential";

}


```

As with the [request timeout](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#universal-endpoint), each provider can have a different retry settings for granular customization.

Provider-level config

```

curl 'https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}' \

  --header 'Content-Type: application/json' \

  --data '[

    {

        "provider": "workers-ai",

        "endpoint": "@cf/meta/llama-3.1-8b-instruct",

        "headers": {

            "Authorization": "Bearer {cloudflare_token}",

            "Content-Type": "application/json"

        },

        "config": {

            "maxAttempts": 2,

            "retryDelay": 1000,

            "backoff": "constant"

        },

39 collapsed lines

        "query": {

            "messages": [

                {

                    "role": "system",

                    "content": "You are a friendly assistant"

                },

                {

                    "role": "user",

                    "content": "What is Cloudflare?"

                }

            ]

        }

    },

    {

        "provider": "workers-ai",

        "endpoint": "@cf/meta/llama-3.1-8b-instruct-fast",

        "headers": {

            "Authorization": "Bearer {cloudflare_token}",

            "Content-Type": "application/json"

        },

        "query": {

            "messages": [

                {

                    "role": "system",

                    "content": "You are a friendly assistant"

                },

                {

                    "role": "user",

                    "content": "What is Cloudflare?"

                }

            ]

        },

        "config": {

            "maxAttempts": 4,

            "retryDelay": 1000,

            "backoff": "exponential"

        },

    }

]'


```

#### Direct provider

If set on a [provider](https://developers.cloudflare.com/ai-gateway/usage/universal/) request, a request retry will automatically retry failed requests up to five times. On the final retry attempt, your gateway will wait until the request completes, regardless of how long it takes.

For a provider-specific endpoint, configure the retry settings by adding different header values:

* `cf-aig-max-attempts` (number)
* `cf-aig-retry-delay` (number)
* `cf-aig-backoff` ("constant" | "linear" | "exponential)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/configuration/request-handling/","name":"Request handling"}}]}
```
