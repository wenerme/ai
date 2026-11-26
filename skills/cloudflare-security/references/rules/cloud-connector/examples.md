---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Example Cloud Connector rules for routing traffic to cloud storage providers.
title: Cloud Connector examples
image: https://developers.cloudflare.com/rules/cloud-connector/examples/og.png?v=1f0950bab459e17e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloud Connector examples

To authenticate requests to private buckets, refer to [Sign requests to private S3 and GCS buckets](https://developers.cloudflare.com/rules/transform/examples/sign-private-storage-requests/#cloud-connector-rule). The example combines a Cloud Connector routing rule with a Request Header Transform Rule that generates the signature and date headers.

[**Route /images to an S3 Bucket using Terraform** Route requests with a URI path starting with `/images` to a specific AWS S3 bucket with Cloud Connector using Terraform.](https://developers.cloudflare.com/rules/cloud-connector/examples/route-images-to-aws-s3-using-terraform/)

[**Route /images to an S3 Bucket** Route requests with a URI path starting with `/images` to a specific AWS S3 bucket using Cloud Connector.](https://developers.cloudflare.com/rules/cloud-connector/examples/route-images-to-s3/)

[**Send EU visitors to a Google Cloud Storage bucket** Route all traffic from EU visitors to a Google Cloud Storage bucket using Cloud Connector.](https://developers.cloudflare.com/rules/cloud-connector/examples/send-eu-visitors-to-gcs/)

[**Serve /static-assets from Azure Blob Storage** Route requests with a URI path starting with `/static-assets` to an Azure Blob Storage container using Cloud Connector.](https://developers.cloudflare.com/rules/cloud-connector/examples/serve-static-assets-from-azure/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/rules/cloud-connector/examples/#page","headline":"Cloud Connector examples","description":"Example Cloud Connector rules for routing traffic to cloud storage providers.","url":"https://developers.cloudflare.com/rules/cloud-connector/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/cloud-connector/examples/og.png?v=1f0950bab459e17e","dateModified":"2026-11-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
