---
description: Browser compatibility for challenge pages, Turnstile, and JavaScript detections.
title: Supported browsers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported browsers

Last updated Aug 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/reference/supported-browsers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare uses browser-based challenges across [Challenge Pages](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/), [Turnstile](https://developers.cloudflare.com/turnstile/), [JavaScript Detections (JSD) in Bot Management](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/), and [Precursor](https://developers.cloudflare.com/cloudflare-challenges/precursor/). This page describes the browser environments that support these checks.

## Browser support

Cloudflare challenges support major desktop and mobile browsers.

### Limited browser support

The following browsers and environments have limited support and may experience issues.

* Browsers or operating systems that are more than five years old or have not received security updates in over two years.
* Custom or heavily modified browser engines and embedded browsers.

Note

If your visitors encounter issues using these browsers, we recommend upgrading to a more current browser for the best experience.

### Unsupported environments

The following environments are not supported.

* Internet Explorer browser.
* Command-line tools such as `wget`, `curl`, or others that lack JavaScript execution capabilities required for Cloudflare Challenges.
* Automated browsers are not supported for solving production challenges.
* Browser automation frameworks, such as Selenium, Puppeteer, Playwright, and Cypress, are not supported for solving production challenges. For automated Turnstile testing, use [Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

## Common issues

### Browser extensions

Browser extensions can interfere with challenges in several ways.

* Ad blockers and content blockers may prevent challenge scripts from loading properly or block communication with Cloudflare's validation servers.
* Privacy-focused extensions like script blockers, fingerprinting protection, or canvas blockers can interfere with the challenge verification process.
* Virtual private network (VPN) or proxy extensions might trigger additional security checks or cause IP address inconsistencies.

Note

If challenges consistently fail, try temporarily disabling extensions and reload the page.

### Device emulation and developer tools

Device emulation settings can alter browser signals used by challenges. Results from emulated devices may differ from results on physical devices.

* Mobile emulation in desktop browsers does not reproduce every characteristic of a physical mobile device.
* Browser developer tools can apply network, user-agent, viewport, or JavaScript overrides. Disable these overrides when troubleshooting challenge behavior.

Note

For representative results, test on physical devices when possible.

If you use emulation, challenge behavior may differ from behavior on a physical device.

### WebViews and in-app browsers

Challenges may behave differently depending on embedded browser contexts.

* WebViews in mobile applications may have limited functionality compared to full browsers
* In-app browsers often have restricted JavaScript capabilities
* Email client preview windows typically cannot complete Interactive Challenges

## Troubleshooting

If your visitors consistently experience challenge issues, refer to [Challenge solve issues](https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/challenge-solve-issues/) for additional troubleshooting information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/reference/supported-browsers/#page","headline":"Supported browsers · Cloudflare challenges docs","description":"Browser compatibility for challenge pages, Turnstile, and JavaScript detections.","url":"https://developers.cloudflare.com/cloudflare-challenges/reference/supported-browsers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
