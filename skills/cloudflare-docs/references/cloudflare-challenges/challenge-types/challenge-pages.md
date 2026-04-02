---
title: Interstitial Challenge Pages
description: An interstitial Challenge Page (a full-page screen that appears before the visitor reaches the destination URL) acts as a gate between the visitor and your website or application while Cloudflare verifies the authenticity of the visitor.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-challenges/challenge-types/challenge-pages/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Interstitial Challenge Pages

An interstitial Challenge Page (a full-page screen that appears before the visitor reaches the destination URL) acts as a gate between the visitor and your website or application while Cloudflare verifies the authenticity of the visitor.

The Challenge Page intercepts the visitor from getting to the destination URL by holding the request and evaluating the browser environment for automated signals, and serving a challenge. The visitor cannot reach their destination without passing the challenge. Based on the signals indicated by their browser environment, the visitor may be asked to perform an interaction such as checking a box or selecting a button for further probing.

You can implement a Challenge Page to your website or application by creating a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/).

Challenges are triggered by a rule in the [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/), [Bot Management](https://developers.cloudflare.com/bots/), or [Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

The level of interactivity and visibility of the Challenge Page depends on the Action that you select when creating the WAF rule for your website or application.

## Actions

The following challenge types are the available actions when you create a WAF rule for a Challenge Page.

### Non-Interactive Challenges

With a Non-Interactive Challenge, Cloudflare makes the determination on whether or not the visitor is automated based on the limited information attained from their browser signals via an injected JavaScript. Then, it presents a Challenge Page that requires no interaction from a visitor except the JavaScript processed by their browser.

The visitor must wait until their browser finishes processing the JavaScript, which typically takes less than five seconds.

If the visitor passes the challenge, the original request continues to the destination URL. If the challenge fails or cannot be completed, the visitor is presented with another interstitial Challenge Page.

### Managed Challenges

Managed Challenges are where Cloudflare dynamically chooses the appropriate type of challenge served to the visitor based on the characteristics of a request from the signals indicated by their browser. This helps avoid [CAPTCHAs ↗](https://www.cloudflare.com/learning/bots/how-captchas-work/), which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.

Most human visitors are automatically verified and the Challenge Page will display **Successful**. However, if Cloudflare detects non-human attributes from the visitor's browser, they may be required to interact with the challenge to solve it.

Cloudflare recommends Managed Challenges for most WAF rules. Unless there are specific compatibility issues, do not use other challenge types.

Warning

Using Cloudflare Challenges along with Rules features may cause challenge loops. Refer to [Rules troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/) for more information.

### Interactive Challenges

Interactive Challenge Pages require a visitor to interact with the challenge to pass.

Cloudflare always recommends using a Managed Challenge. For more information, refer to the [Cloudflare blog post ↗](https://blog.cloudflare.com/end-cloudflare-captcha/).

## Compatibility limitations

Challenge Pages interrupt the request flow by returning a full HTML page for the user's browser to render and solve. This mechanism fails when the browser expects a non-HTML response, such as an AJAX or XHR (fetch) request.

To ensure your API calls are protected without breaking single-page applications (SPAs) or API integrations, Cloudflare recommends using Turnstile Pre-clearance.

By enabling Pre-clearance, the Turnstile widget issues a persistent clearance cookie (`cf_clearance`) upon successful human verification on an initial HTML page. This cookie pre-clears the visitor to interact with sensitive API endpoints secured by WAF rules, allowing you to deploy granular security without forcing a disruptive Challenge Page response.

For implementation details, refer to the [guidance on Pre-clearance for Turnstile](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/challenge-types/","name":"Available Challenges"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/","name":"Interstitial Challenge Pages"}}]}
```
