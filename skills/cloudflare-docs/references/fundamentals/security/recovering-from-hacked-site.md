---
title: Recovering from a hacked site
description: Steps to recover your website after a hack and prevent future compromises using Cloudflare security features.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/security/recovering-from-hacked-site.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Recovering from a hacked site

If your website has been hacked recently, review the recommended steps below to recover a hacked website and prevent future hacks.

## Recovering from an attack

To recover from an attack, reach out to your hosting provider to request:

* Details about the hack, including how they believe the site was hacked.
* That your hosting provider remove any malicious content placed on your website.

Once the hack has been resolved, you should resolve site warnings in [Google Webmaster Tools ↗](https://www.google.com/webmasters/tools) and resubmit your site for Google's review.

---

## Preventing and mitigating the risks of a future hack

To prevent the risk of a hacked site:

* Activate Cloudflare's [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/) so they can challenge or block known malicious behavior.
* If you use a Content Management System (CMS), make sure you have the most recent version installed (CMS platforms push out updates to address known vulnerabilities).
* If you use plugins, make sure they are updated.
* If you have an admin login page, protect it with Cloudflare's [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) or a [Cloudflare Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).
* Use a backup service so you can avoid losing valid content.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/security/recovering-from-hacked-site/","name":"Recovering from a hacked site"}}]}
```
