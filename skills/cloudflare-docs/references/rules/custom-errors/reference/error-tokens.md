---
title: Error tokens
description: Each custom error token provides diagnostic information or specific functionality that appears on the error page. Certain error pages require a page-specific custom error token.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/custom-errors/reference/error-tokens.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Error tokens

## For Error Pages

Each custom error token provides diagnostic information or specific functionality that appears on the error page. Certain error pages require a page-specific custom error token.

To display a custom page for each error, create a separate page per error. For example, to create an error page for both **IP/Country Block** and **Interactive Challenge**, you must design and publish two separate pages.

The following custom error tokens are required by their respective error pages:

| Token                             | Required for                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ::CAPTCHA\_BOX::                  | Interactive Challenge Country Challenge (Managed Challenge)Managed Challenge / I'm Under Attack Mode (Interstitial Page) |
| ::IM\_UNDER\_ATTACK\_BOX::        | Non-Interactive Challenge                                                                                                |
| ::CLOUDFLARE\_ERROR\_500S\_BOX::  | 5XX Errors                                                                                                               |
| ::CLOUDFLARE\_ERROR\_1000S\_BOX:: | 1XXX Errors                                                                                                              |

Each custom error token has a default look and feel. However, you can use CSS to stylize each custom error tag using each tag's class ID. All the external resources like images, CSS, and scripts will be inlined during the process. As such, all external resources need to be available (that is, they must return `200 OK`) otherwise an error will be thrown.

## For Custom Error Assets, inline responses, and Error Pages

A custom error asset, inline response, or error page may also include the following error tokens, which will be replaced with their real values before sending the response to the visitor:

| Token          | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| ::CLIENT\_IP:: | The visitor's IP address.                                                |
| ::RAY\_ID::    | A unique identifier given to every request that goes through Cloudflare. |
| ::GEO::        | The country or region associated with the visitor's IP address.          |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/custom-errors/","name":"Custom Errors"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/custom-errors/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/custom-errors/reference/error-tokens/","name":"Error tokens"}}]}
```
