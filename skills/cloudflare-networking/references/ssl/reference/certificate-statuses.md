---
description: Understand certificate statuses in Cloudflare SSL/TLS, including stages like Initializing, Pending Validation, and Active. Monitor via dashboard or command line.
title: Certificate statuses
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Certificate statuses

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/reference/certificate-statuses/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Certificates statuses show which stage of the issuance process each certificate is in.

## New certificates

When you order a new certificate, either an [edge certificate](https://developers.cloudflare.com/ssl/edge-certificates/) or a certificate used for a [custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/), its status will move through various stages as it progresses to Cloudflare's global network:

1. Initializing
2. Pending Validation
3. Pending Issuance
4. Pending Deployment
5. Active

Once you issue a certificate, it should be in **Pending Validation**, but change to **Active** after the validation is completed. If you see any errors, you or your customer may need to take additional actions to validate the certificate.

If you deactivate a certificate, it will become a **Deactivating** and then an **Inactive** status.

### Certificate replacement

When replacing a certificate, you may note a **Pending Cleanup** status. Old certificates are not deleted until the replacement has been successfully issued. This ensures TLS will not break for the hostname while the certificate is being replaced.

When the new certificate is successfully issued and activated, the status for the old certificate will transition from **Pending Cleanup**, and the certificate will be deleted.

## Custom certificates

If you are using a [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) and your [zone status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) is **Pending** or **Moved**, your certificate may have a status of **Holding Deployment**.

When your zone becomes active, your custom certificate will deploy automatically (also moving to an **Active** status).

If your zone is already active when you upload a custom certificate, you will not see this status.

## Staging certificates

When you create certificates in your [staging environment](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/), those staging certificates have their own set of statuses:

* **Staging deployment**: Similar to **Pending Deployment**, but for staging certificates.
* **Staging active**: Similar to **Active**, but for staging certificates.
* **Deactivating**: Your staging certificate is in the process of becoming **Inactive**.
* **Inactive**: Your staging certificate is not at the edge, but you can deploy it if needed.

## Client certificates

When you use [client certificates](https://developers.cloudflare.com/ssl/client-certificates/), those client certificates have their own set of statuses:

* **Active**: The client certificate is active.
* **Revoked**: The client certificate is revoked.
* **Pending Reactivation**: The client certificate was revoked, but it is being restored.
* **Pending Revocation**: The client certificate was active, but it is being revoked.

---

## Monitor certificate statuses

### SSL/TLS

Monitor a certificate's status on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page or by using the [Get Certificate Pack endpoint](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/get/).

For more details on certificate validation, refer to [Domain Control Validation](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/).

### SSL for SaaS

Monitor a certificate's status on the [**Custom Hostnames** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames) page or by using the [Custom Hostname Details endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/).

The Custom Hostname Details endpoint returns separate status fields for hostname activation and certificate status. Use the top-level `status` field to monitor hostname activation. Use the nested `ssl.status` field to monitor certificate issuance and deployment.

For production HTTPS, treat a custom hostname as ready when both status fields are `active` and the customer's DNS points to your Cloudflare for SaaS target.

For more details on certificate validation, refer to [Issue and validate certificates](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/).

### Via the command line

To view certificates, use `openssl` or your browser. The command below can be used in advance of your customer pointing the `app.example.com` hostname to the edge ([provided validation was completed](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/)).

```sh
openssl s_client -servername app.example.com -connect $CNAME_TARGET:443 </dev/null 2>/dev/null | openssl x509 -noout -text | grep app.example.com
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/certificate-statuses/#page","headline":"Certificate statuses · Cloudflare SSL/TLS docs","description":"Understand certificate statuses in Cloudflare SSL/TLS, including stages like Initializing, Pending Validation, and Active. Monitor via dashboard or command line.","url":"https://developers.cloudflare.com/ssl/reference/certificate-statuses/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
