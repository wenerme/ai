---
title: Common API Calls
description: API endpoints for managing custom hostnames and fallback origins.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common API Calls

As a SaaS provider, you may want to configure and manage Cloudflare for SaaS [via the API](https://developers.cloudflare.com/api/) rather than the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). Below are relevant API calls for creating, editing, and deleting custom hostnames, as well as monitoring, updating, and deleting fallback origins. Further details can be found in the [Cloudflare API documentation](https://developers.cloudflare.com/api/).

---

## Custom hostnames

| Endpoint                                                                                                     | Notes                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| [List custom hostnames](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/list/)    | Use the page parameter to pull additional pages. Add a hostname parameter to search for specific hostnames.                           |
| [Create custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/) | In the validation\_records object of the response, use the txt\_name and txt\_record listed to validate the custom hostname.          |
| [Custom hostname details](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/)   | Use this endpoint to check hostname activation and certificate status.                                                                |
| [Edit custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/)     | When sent with an ssl object that matches the existing value, indicates that hostname should restart domain control validation (DCV). |
| [Delete custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/delete/) | Also deletes any associated SSL/TLS certificates.                                                                                     |

### Confirm custom hostname readiness

To confirm that a custom hostname is fully configured, check both status fields in the [Custom hostname details endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/) response:

| API field         | What it means                                                                                                          | Ready value |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- |
| result.status     | Hostname activation status. This field shows whether Cloudflare has validated and activated the custom hostname.       | active      |
| result.ssl.status | Certificate status. This field shows whether the hostname's SSL/TLS certificate has completed issuance and deployment. | active      |

Treat the custom hostname as ready for production HTTPS when `result.status` is `active`, `result.ssl.status` is `active`, and the customer's DNS points to your CNAME target or apex proxying target.

If `result.status` is `active` but `result.ssl.status` is not `active`, the hostname is active but its certificate has not completed issuance and deployment. A successful TLS handshake alone does not mean the custom hostname certificate has finished provisioning because Cloudflare may present another matching certificate for that hostname. For more information, refer to [Certificate and hostname priority](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/).

When you use the [Create custom hostname endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/), choose one `ssl.method` value: `http`, `txt`, or `email`. For non-wildcard custom hostnames, Cloudflare always attempts [HTTP certificate validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#non-wildcard-custom-hostnames) after the hostname points to your SaaS target, even if you selected **TXT** validation.

## Fallback origins

Our API includes the following endpoints related to the [fallback origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#1-create-fallback-origin) of a custom hostname:

* [Get fallback origin](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/get/)
* [Update fallback origin](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/update/)
* [Remove fallback origin](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/delete/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/common-api-calls/","name":"Common API Calls"}}]}
```
