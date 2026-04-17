---
title: Common API Calls
description: API endpoints for managing custom hostnames and fallback origins.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ REST API ](https://developers.cloudflare.com/search/?tags=REST%20API) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/start/common-api-calls.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Common API Calls

As a SaaS provider, you may want to configure and manage Cloudflare for SaaS [via the API](https://developers.cloudflare.com/api/) rather than the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). Below are relevant API calls for creating, editing, and deleting custom hostnames, as well as monitoring, updating, and deleting fallback origins. Further details can be found in the [Cloudflare API documentation](https://developers.cloudflare.com/api/).

---

## Custom hostnames

| Endpoint                                                                                                     | Notes                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| [List custom hostnames](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/list/)    | Use the page parameter to pull additional pages. Add a hostname parameter to search for specific hostnames.                           |
| [Create custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/) | In the validation\_records object of the response, use the txt\_name and txt\_record listed to validate the custom hostname.          |
| [Custom hostname details](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/)   |                                                                                                                                       |
| [Edit custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/)     | When sent with an ssl object that matches the existing value, indicates that hostname should restart domain control validation (DCV). |
| [Delete custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/delete/) | Also deletes any associated SSL/TLS certificates.                                                                                     |

## Fallback origins

Our API includes the following endpoints related to the [fallback origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#1-create-fallback-origin) of a custom hostname:

* [Get fallback origin](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/get/)
* [Update fallback origin](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/update/)
* [Remove fallback origin](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/delete/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/common-api-calls/","name":"Common API Calls"}}]}
```
