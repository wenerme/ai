---
title: Migrate from reCAPTCHA
description: Migrate from Google reCAPTCHA to Cloudflare Turnstile.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/turnstile/migration/recaptcha.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Migrate from reCAPTCHA

If you are using reCAPTCHA today, you can switch seamlessly to Cloudflare Turnstile by following the step-by-step guide below to assist with the upgrade process.

To complete the migration, you must obtain the [sitekey and secret key](https://developers.cloudflare.com/turnstile/get-started/widget-management/).

Note

Turnstile migration is currently compatible up to reCAPTCHA v2.

## Client-side integration

1. Update the client-side integration by inserting the Turnstile script snippet in your HTML's `<head>` element.  
Turnstile script snippet  
```  
<script  
  src="https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha"  
  async  
  defer  
></script>  
```  
Note  
Adding `?compat=recaptcha` runs Turnstile in compatibility mode, which enables the following features:  
   * implicit rendering for reCAPTCHA  
   * `g-recaptcha-response` input name for forms  
   * register the Turnstile API as `grecaptcha`
2. Locate the `grecaptcha.render()` calls and replace the sitekey with your Turnstile sitekey.  
Note  
Turnstile supports:  
   * the `render()` call  
   * reCAPTCHA v2 invisible mode with the `execute()` call

## Server-side integration

Update the server-side integration by replacing the Siteverify URL.

Replace `https://www.google.com/recaptcha/api/siteverify` with the following:

```

https://challenges.cloudflare.com/turnstile/v0/siteverify


```

Differences to reCAPTCHA's Siteverify

reCAPTCHA supports `GET` requests using query parameters, such as `GET /siteverify?response=<response>&secret=<secret>`.

Turnstile's Siteverify endpoint does _not_ support this and only accepts `POST` requests with a FormData or JSON body.

Refer to [server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/migration/","name":"Migration"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/migration/recaptcha/","name":"Migrate from reCAPTCHA"}}]}
```
