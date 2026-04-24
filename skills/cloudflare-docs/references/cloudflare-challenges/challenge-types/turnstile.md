---
title: Turnstile
description: Embed a CAPTCHA-alternative widget that verifies visitors without interrupting their experience.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-challenges/challenge-types/turnstile.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Turnstile

[Turnstile](https://developers.cloudflare.com/turnstile/) is Cloudflare's CAPTCHA-alternative solution. You can embed Turnstile as a widget on your website or application, where it runs a client-side challenge directly in the background of the visitor's browser.

Turnstile differs from Challenges Pages in that the challenge does not pause the request or interrupt the user's experience. Since the widget is embedded onto the webpage and only runs on a specific part of the HTML, the visitor will have already arrived at the destination URL and is viewing the page when they encounter a Turnstile widget. Instead of blocking the visitor from accessing the entire website, the Turnstile widget prevents the visitor from certain actions such as completing login or sign up forms, and more, until the widget is solved.

In most cases, nothing further is required from the visitor. However, if necessary, Turnstile may display a simple checkbox that the visitor must click to proceed.

After the challenge passes, Turnstile issues a clearance token to the visitor that must be validated via the [Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) before completing a sensitive action like login, sign up, or other form submissions.

Warning

It is critical to enforce Turnstile tokens with the Siteverify API. The Turnstile token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation.

You **must** call Siteverify to complete your Turnstile configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in [Turnstile Analytics](https://developers.cloudflare.com/turnstile/turnstile-analytics/).

## Widget types

While there are three types of widgets that you can choose to implement on your website or application, the challenge logic behind them remains the same.

* **Managed (recommended)**: Functions similar to a Managed Challenge Page. It selects a challenge based on the signals gathered from the visitor's browser and presents an interaction only if it detects potentially automated traffic.
* **Non-Interactive**: The widget is displayed, but the visitor does not need to interact with it to verify their identity.
* **Invisible**: The widget is completely invisible to the visitor, but the challenge still runs in the background.  
Link to Cloudflare's Turnstile Privacy Policy  
As a condition of enabling invisible mode, you must reference Cloudflare's [Turnstile Privacy Addendum ↗](https://www.cloudflare.com/turnstile-privacy-policy/) in your own privacy policy.

## Implementation

When you create a widget for your website or application via the Cloudflare dashboard, you will receive a sitekey.

The sitekey is used with [client-side rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#implicitly-render-the-turnstile-widget) by adding it to the `<div>` container placeholder. You will then place that `<div>` code snippet where you want to add the widget to your site page or form.

## Get started

Refer to the [Turnstile documentation](https://developers.cloudflare.com/turnstile/get-started/) for guidance on implementing a widget to your website or application.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/challenge-types/","name":"Available Challenges"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/challenge-types/turnstile/","name":"Turnstile"}}]}
```
