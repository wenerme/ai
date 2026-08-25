---
description: Test certificate changes in a staging environment before production.
title: Staging environment
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Staging environment

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use your certificate staging environment to test new custom (modern) certificates before pushing them to your production environment. This process helps you solve potential certificate problems **before** there's an incident, such as when:

* You make a mistake when uploading a new custom certificate.
* You misunderstand the order of your certificates.
* Clients have previously pinned your custom certificate, causing a TLS termination error.

## Availability

|              | Free | Pro | Business | Enterprise      |
| ------------ | ---- | --- | -------- | --------------- |
| Availability | No   | No  | No       | Yes (open beta) |

---

## Use your staging environment

### 1\. Upload certificate

To upload custom (modern) certificates to your staging environment:

1. In the Cloudflare dashboard, go to the **Staging Certificates** page.
[Go to **Staging Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/staging-certificates)
2. Select **Upload Custom Staging Certificate**.
3. Upload your custom (modern) certificate ([detailed instructions](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/)).
4. Your certificate will appear in the dashboard with a status of **Staging Deployment**. If you refresh the page, its status should go to **Staging Active**.

### 2\. Test certificate

Test your custom (modern) certificate by sending `curl` requests to the IP addresses listed on the [**Staging Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/staging-certificates) page:

```txt
curl --resolve <HOSTNAME>:<PORT>:<STAGING_IP> https://<HOSTNAME> -iv
```

You should confirm whether:

* TLS termination is successful.
* The right certificate is being served at the edge.
* Any clients are pinning the old certificate.

### 3\. Push certificate to production

Assuming there are no issues, push your custom (modern) certificate to your production environment:

1. In the Cloudflare dashboard, go to the **Staging Certificates** page.
[Go to **Staging Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/staging-certificates)
2. Select a custom certificate.
3. Select **Push to Production**.

If there were issues with your certificate, you can keep it in your staging environment or select **Deactivate** on the certificate itself.

### 4\. (Optional) Push certificate back to staging

If you roll out a custom (modern) certificate to production and encounter issues, you can deactivate that certificate to delete the certificate from the edge and then push the certificate back to your staging environment for additional testing:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Select a custom certificate.
3. Select **Deactivate**.
4. Select **Push to Staging**.

---

## Limitations

### Access

Currently, staging environments are only available to Enterprise customers participating in an open beta. To get access to the beta, contact your Account team.

### Functionality

At the moment, staging environments have limited functionality:

* Only custom (modern) certificates
* Only accessed via the dashboard

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/#page","headline":"Staging environment · Cloudflare SSL/TLS docs","description":"Test certificate changes in a staging environment before production.","url":"https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
