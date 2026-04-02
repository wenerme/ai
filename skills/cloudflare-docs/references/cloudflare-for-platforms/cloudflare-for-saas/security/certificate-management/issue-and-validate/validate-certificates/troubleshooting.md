---
title: Troubleshooting
description: Occasionally, a domain will be flagged as “high risk” by Cloudflare’s CA partners. Typically this is done only for domains with an Alexa ranking of 1-1,000 and domains that have been flagged for phishing or malware by Google’s Safe Browsing service.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshooting

## High-risk domains

Occasionally, a domain will be flagged as “high risk” by Cloudflare’s CA partners. Typically this is done only for domains with an Alexa ranking of 1-1,000 and domains that have been flagged for phishing or malware by Google’s Safe Browsing service.

If a domain is flagged by the CA, you need to contact Support before validation can finish. The API call will return indicating the failure, along with a link to where the ticket can be filed.

---

## Certificate Authority Authorization (CAA) records

CAA is a DNS resource record type defined in [RFC 6844 ↗](https://datatracker.ietf.org/doc/html/rfc6844) that allows a domain owner to indicate which CAs are allowed to issue certificates for them.

### For SaaS providers

If your customer has CAA records set on their domain, they will either need to add the following or remove CAA entirely:

```

example.com. IN CAA 0 issue "pki.goog"

example.com. IN CAA 0 issue "letsencrypt.org"

example.com. IN CAA 0 issue "ssl.com"


```

While it is possible for CAA records to be set on the subdomain your customer wishes to use with your service, it will usually be set on the domain apex. If they have CAA records on the subdomain, those will also have to be removed.

### For SaaS customers

In some cases, the validation may be prevented because your hostname points to a CNAME target where CAA records are defined.

In this case you would need to either select a Certificate Authority whose CAA records are present at the target, or review the configuration with the service provider that owns the target.

---

## Time outs

If a certificate issuance times out, the error message will indicate where the timeout occurred:

* Timed Out (Initializing)
* Timed Out (Validation)
* Timed Out (Issuance)
* Timed Out (Deployment)
* Timed Out (Deletion)

To fix this error, send a [PATCH request](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) through the API or select **Refresh** for the specific custom hostname in the dashboard. If using the API, make sure that the `--data` field contains an `ssl` object with the same `method` and `type` as the original request.

If these return an error, delete and recreate the custom hostname.

---

## Immediate validation checks

You can send a [PATCH request](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) to request an immediate validation check on any certificate. The PATCH data should include the same `ssl` object as the original request.

---

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/","name":"Certificate management"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/","name":"Issue and validate certificates"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/","name":"Validate"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/","name":"Troubleshooting"}}]}
```
