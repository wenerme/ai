---
description: Built-in properties available in Zaraz events.
title: Properties reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Properties reference

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/zaraz/reference/properties-reference/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Zaraz offers properties that you can use when configuring the product. They are helpful to send data to a third-party tool or to create triggers as they have context about a specific user's browser session and the actions they take on the website. Below is a list of the properties you can access from the Cloudflare dashboard and their values.

## Web API

| Property | Description |
| --- | --- |
| *Event Name* | Returns the name of the event sent using the Track method of the Web API. Refer to the [Track method](https://developers.cloudflare.com/zaraz/web-api/track/) for more information. |
| *Track Property name:* | Returns the value of a `zaraz.track()` `eventProperties` key. The key can either be directly used in `zaraz.track()` or set using `zaraz.set()`. Set the name of your key here. Refer to the [Set method](https://developers.cloudflare.com/zaraz/web-api/set/) for more information. |

## Page Properties

| Property | Description |
| --- | --- |
| *Page character encoding* | Returns the document character encoding from `document.characterSet`. |
| *Page referrer* | Returns the page referrer from `document.referrer`. |
| *Page title* | Returns the page title. |
| *Query param name:* | Returns the value of a URL query parameter. When you choose this variable, you need to set the name of your parameter. |
| *URL* | Returns a string containing the entire URL. |
| *URL base domain* | Returns the base domain part of the URL, without any subdomains. |
| *URL host* | Returns the domain (that is, the hostname) followed by a `:` and the port of the URL (if a port was specified). |
| *URL hostname* | Returns the domain of the URL. |
| *URL origin* | Returns the origin of the URL — that is, its scheme, domain, and port. |
| *URL password* | Returns the password specified before the domain name. |
| *URL pathname* | Returns the path of the URL, including the initial `/`. Does not include the query string or fragment. |
| *URL port* | Returns the port number of the URL. |
| *URL protocol scheme* | Returns the protocol scheme of the URL, including the final `:`. |
| *URL query parameters* | Returns query parameters provided, beginning with the leading `?` character. |
| *URL username* | Returns the username specified before the domain name. |

## Cookies

| Property | Description |
| --- | --- |
| *Cookie name:* | Returns cookies obtained from the browser `document`. |

## Device properties

| Property | Description |
| --- | --- |
| *Browser engine* | Returns the type of browser engine (for example, `WebKit`). |
| *Browser engine version* | Returns the version of the browser’s engine. |
| *Browser name* | Returns the browser’s name. |
| *Browser version* | Returns the browser’s version. |
| *Device CPU* | Returns the device’s CPU. |
| *Device IP address* | Returns the incoming IP address. |
| *Device language* | Returns the language used. |
| *Device screen resolution* | Returns the screen resolution of the device. |
| *Device type* | Returns the type of device used (for example, `iPhone`). |
| *Device viewport* | Returns the visible web page area in user’s device. |
| *Operating system name* | Returns the operating system. |
| *Operating system version* | Returns the version of the operating system. |
| *User-agent string* | Returns the browser’s user agent. |

## Device location

| Property | Description |
| --- | --- |
| *City* | Returns the city of the incoming request. For example, `Lisbon`. |
| *Continent* | Returns the continent of the incoming request. For example, `EU` |
| *Country* code | Returns the country code of the incoming request. For example, `PT`. |
| *EU* country | Returns a `1` if the country of the incoming request is in the European Union, and a `0` if it is not. |
| *Region* | Returns the [ISO 3166-2 ↗](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request. For example, `Lisbon`. |
| *Region* code | Returns the [ISO 3166-2 ↗](https://en.wikipedia.org/wiki/ISO_3166-2) region code associated with the IP address of the incoming request. For example, `11`. |
| *Timezone* | Returns the timezone of the incoming request. For example, `Europe/Lisbon`. |

## Miscellaneous

| Property | Description |
| --- | --- |
| *Random number* | Returns a random number unique to each request. |
| *Timestamp (milliseconds)* | Returns the Unix time in milliseconds. |
| *Timestamp (seconds)* | Returns the Unix time in seconds. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/reference/properties-reference/#page","headline":"Properties reference · Cloudflare Zaraz docs","description":"Built-in properties available in Zaraz events.","url":"https://developers.cloudflare.com/zaraz/reference/properties-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
