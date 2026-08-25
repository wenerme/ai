---
description: Data available in the Zaraz context object for triggers and actions.
title: Zaraz Context
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Zaraz Context

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/reference/context/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Zaraz Context is a versatile object that provides a set of configurable properties for Zaraz, a web analytics tool for tracking user behavior on websites. These properties can be accessed and utilized across various components, including [Worker Variables](https://developers.cloudflare.com/zaraz/variables/worker-variables/) and [JSONata expressions](https://developers.cloudflare.com/zaraz/advanced/using-jsonata/).

System properties, which are automatically collected by Zaraz, provide insights into the user's environment and device, while Client properties, obtained through [Zaraz Web API](https://developers.cloudflare.com/zaraz/web-api/) calls like zaraz.track(), offer additional information on user behavior and actions.

## System properties

### Page information

| Property             | Type   | Description                                                                                                       |
| -------------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| system.page.query    | Object | Key-Value object containing all query parameters in the current URL.                                              |
| system.page.title    | String | Current page title.                                                                                               |
| system.page.url      | URL    | [URL ↗](https://developer.mozilla.org/en-US/docs/Web/API/URL) Object containing information about the current URL |
| system.page.referrer | String | Current page referrer from document.referrer.                                                                     |
| system.page.encoding | String | Current page character encoding from document.characterSet.                                                       |
|                      |        |                                                                                                                   |

### Cookies

| Property       | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| system.cookies | Object | Key-Value object containing all present cookies. |

The keys inside the `system.cookies` are the cookies name. The property `system.cookies.foo` will return the value of the a cookie named `foo`.

### Device information

| Property                                 | Type   | Description                                                                                                                                               |
| ---------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| system.device.ip                         | String | Visitor incoming IP address.                                                                                                                              |
| system.device.resolution                 | String | Screen resolution for device.                                                                                                                             |
| system.device.viewport                   | String | Visible web page area in user’s device.                                                                                                                   |
| system.device.language                   | String | Language used in user's device.                                                                                                                           |
| system.device.location                   | Object | All location-related keys from [IncomingRequestCfProperties](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) |
| system.device.user-agent.ua              | String | Browser user agent.                                                                                                                                       |
| system.device.user-agent.browser.name    | String | Browser name.                                                                                                                                             |
| system.device.user-agent.browser.version | String | Browser version.                                                                                                                                          |
| system.device.user-agent.engine.name     | String | Type of browser engine (for example, WebKit).                                                                                                             |
| system.device.user-agent.engine.version  | String | Version of the browser engine.                                                                                                                            |
| system.device.user-agent.os.name         | String | Operating system.                                                                                                                                         |
| system.device.user-agent.os.version      | String | Version of the operating system.                                                                                                                          |
| system.device.user-agent.device          | String | Type of device used (for example, iPhone).                                                                                                                |
| system.device.user-agent.cpu             | String | Device’s CPU.                                                                                                                                             |
|                                          |        |                                                                                                                                                           |

### Consent Management

| Property       | Type   | Description                                                                            |
| -------------- | ------ | -------------------------------------------------------------------------------------- |
| system.consent | Object | Key-value object containing the current consent status from the Zaraz Consent Manager. |

The keys inside the `system.consent` object are purpose IDs, and values are `true` for consent, `false` for lack of consent.

### Managed Components

| Property        | Type   | Description                                                               |
| --------------- | ------ | ------------------------------------------------------------------------- |
| system.clientKV | Object | Key-value object containing all the KV data from your Managed Components. |

The keys inside the `system.clientKV` object are formatted as Tool ID, underscore, Key name. Assuming you want to read the value of the `ga4` key used by a tool with ID `abcd`, the path would be `system.clientKV.abcd_ga4`.

### Miscellaneous

| Property                          | Type   | Description                           |
| --------------------------------- | ------ | ------------------------------------- |
| system.misc.random                | Number | Random number unique to each request. |
| system.misc.timestamp             | Number | Unix time in seconds.                 |
| system.misc.timestampMilliseconds | Number | Unix time in milliseconds.            |
|                                   |        |                                       |

## Event properties

| Property              | Type   | Description                                                                                                                                                                                                                                                                                  |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client.\_\_zarazTrack | String | Returns the name of the event sent using the Track method of the Web API. Refer to [Zaraz Track](https://developers.cloudflare.com/zaraz/web-api/track/) for more information.                                                                                                               |
| client.<KEY\_NAME>    | String | Returns the value of a zaraz.track() eventProperties key. The key can either be directly used in zaraz.track() or set using zaraz.set(). Replace <KEY\_NAME> with the name of your key. Refer to [Zaraz Track](https://developers.cloudflare.com/zaraz/web-api/track/) for more information. |
|                       |        |                                                                                                                                                                                                                                                                                              |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/reference/context/#page","headline":"Zaraz Context · Cloudflare Zaraz docs","description":"Data available in the Zaraz context object for triggers and actions.","url":"https://developers.cloudflare.com/zaraz/reference/context/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
