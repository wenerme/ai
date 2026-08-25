---
description: This tutorial explains how to handle Turnstile in your end-to-end (E2E) tests by using Turnstile's dedicated testing keys.
title: Exclude Turnstile from E2E tests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

# Exclude Turnstile from E2E tests

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/turnstile/tutorials/excluding-turnstile-from-e2e-tests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial explains how to handle Turnstile in your end-to-end (E2E) tests by using Turnstile's dedicated testing keys.

## Overview

When running E2E tests, you often want to bypass or simplify the Turnstile verification process. Cloudflare provides official test credentials that always pass verification, making them perfect for testing environments:

* Test sitekey: `1x00000000000000000000AA`
* Test secret key: `1x0000000000000000000000000000000AA`

For more details, refer to the [testing documentation](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

Caution

Never use test credentials in production. Always ensure:

* Test credentials are only used in test environments.
* Production credentials are properly protected.
* Your deployment process prevents test credentials from reaching production.

## Implementation

The key to implementing test-environment detection is identifying test requests server-side. Here is a simple approach:

```typescript
// Detect test environments using IP addresses or headers
function isTestEnvironment(request) {
  const testIPs = ['127.0.0.1', '::1'];
  const isTestIP = testIPs.includes(request.ip);
  const hasTestHeader = request.headers['x-test-environment'] === 'secret-token';

  return isTestIP || hasTestHeader;
}

// Use the appropriate credentials based on the environment
function getTurnstileCredentials(request) {
  if (isTestEnvironment(request)) {
    return {
      sitekey: '1x00000000000000000000AA',
      secretKey: '1x0000000000000000000000000000000AA'
    };
  }

  return {
    sitekey: process.env.TURNSTILE_SITE_KEY,
    secretKey: process.env.TURNSTILE_SECRET_KEY
  };
}
```

## Server-side integration

When rendering your page, inject the appropriate sitekey based on the environment:

```typescript
app.get('/your-form', (req, res) => {
  const { sitekey } = getTurnstileCredentials(req);
  res.render('form', { sitekey });
});
```

## Client-side integration

Your template can then use the injected sitekey:

```html
<div class="turnstile" data-sitekey="<%= sitekey %>"></div>
```

## Best practices

1. **Environment detection**

  * Use multiple factors to identify test environments (IP, headers, etc.).
  * Keep your test environment identifiers secure if you need to test from the public web.
2. **Credential management**

  * Store production credentials securely (for example, in environment variables).
  * Never commit credentials to version control.
  * Use different credentials for each environment.
3. **Deployment safety**

  * Add checks to prevent test credentials in production.
  * Include credential validation in your CI/CD pipeline.
  * Monitor for accidental test credential usage.

## Testing considerations

* Test credentials will always pass verification.
* They are perfect for automated testing environments.
* They help avoid rate limiting during testing.
* They make tests more predictable and faster.

## Example test setup

For Cypress or similar E2E testing frameworks:

```typescript
// Set test header for all test requests
beforeEach(() => {
  cy.intercept('*', (req) => {
    req.headers['x-test-environment'] = 'secret-token';
  });
});

// Your test can now interact with the form normally
it('submits form successfully', () => {
  cy.visit('/your-form');
  cy.get('form').submit();
  // Turnstile will automatically pass verification
});
```

## Conclusion

By using Turnstile's test credentials and proper environment detection, you can create reliable E2E tests while maintaining security in production. Remember to always keep test credentials separate from production and implement proper safeguards in your deployment process.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/tutorials/excluding-turnstile-from-e2e-tests/#page","headline":"Exclude Turnstile from E2E tests · Cloudflare Turnstile docs","description":"This tutorial explains how to handle Turnstile in your end-to-end (E2E) tests by using Turnstile's dedicated testing keys.","url":"https://developers.cloudflare.com/turnstile/tutorials/excluding-turnstile-from-e2e-tests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Node.js","TypeScript"]}
```
