---
description: Learn how to bulk delete DNS records in Cloudflare with a script so you can start from zero instead of using the quick scan results.
title: Delete all DNS records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete all DNS records

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/delete-all-records/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you connect your domain to Cloudflare, the [DNS records quick scan](https://developers.cloudflare.com/dns/zone-setups/reference/dns-quick-scan/) may automatically add several records to your zone.

If you realize most of them are not applicable and want to bulk delete DNS records, follow the steps below. This method assumes you are familiar with [API calls fundamentals](https://developers.cloudflare.com/fundamentals/api/).

Bulk deletion available in the dashboard

You can delete records in bulk via the dashboard, which removes the need for custom scripts as the one below. Refer to [Batch record changes](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/#delete-records-in-bulk) for details.

1. Make sure you have [an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) that allows you to edit DNS for your zone.
2. Get your [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Run the following script, replacing `<ZONE_ID>` and `<API_TOKEN>` with the values you got from the previous steps.

Warning

This script uses [jq ↗](https://jqlang.github.io/jq/) to format `JSON` outputs for readability. Refer to [Make API calls](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/) for details.

```bash
zoneid=<ZONE_ID>
bearer=<API_TOKEN>
curl --silent "https://api.cloudflare.com/client/v4/zones/$zoneid/dns_records?per_page=50000" \
--header "Authorization: Bearer $bearer" \
| jq --raw-output '.result[].id' | while read id
do
  curl --silent --request DELETE "https://api.cloudflare.com/client/v4/zones/$zoneid/dns_records/$id" \
--header "Authorization: Bearer $bearer"
done
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/troubleshooting/delete-all-records/#page","headline":"Delete all DNS records · Cloudflare DNS docs","description":"Learn how to bulk delete DNS records in Cloudflare with a script so you can start from zero instead of using the quick scan results.","url":"https://developers.cloudflare.com/dns/zone-setups/troubleshooting/delete-all-records/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
