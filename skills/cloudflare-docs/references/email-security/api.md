---
title: API
description: Email security offers Application Programming Interfaces (APIs) to expose our phishing campaign rulesets. These APIs both aid research and provide a set of indicators to block using network security edge devices.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/api/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# API

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

Email security offers Application Programming Interfaces (APIs) to expose our phishing campaign rulesets. These APIs both aid research and provide a set of indicators to block using network security edge devices.

All API requests are initiated using normal HTTP requests (`GET`/`POST`/`DELETE`) and responses are returned in JSON. Authentication to the APIs uses HTTP Basic Authentication over HTTPS.

For more details, refer to our [API documentation (PDF)](https://developers.cloudflare.com/email-security/static/api%5Fdocumentation%5F1.38.1.pdf).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/api/","name":"API"}}]}
```
