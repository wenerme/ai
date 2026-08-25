---
description: Filter analytics views in the Network Firewall dashboard.
title: Filter different views
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Filter different views

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/filter-views/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can utilize different [Log filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) to only view specific data from Cloudflare Network Firewall (formerly Magic Firewall).

## Filter by enabled or disabled rules

Use the filter examples below to filter your Network Firewall traffic to display events for enabled or disabled rules.

The example below only displays fields relevant to Network Firewall, and the filter only displays events for disabled rules.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  ...
  "output_options": {
      "field_names": ["ColoName", "Datetime", "Direction", "IPDestinationAddress", "IPDestinationSubnet", "IPProtocol","IPSourceAddress", "IPSourceSubnet", "Outcome", "RuleID", "RulesetID", "SampleInterval", "Verdict"],
  },
  "filter": "{\"where\":{\"or\":[{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"},{\"key\":\"Outcome\",\"operator\":\"eq\",\"value\":\"pass\"},{\"key\":\"Verdict\",\"operator\":\"eq\",\"value\":\"drop\"}]}]}}"
}'
```

The example below only displays fields relevant to Network Firewall, and the filter only displays events for enabled rules.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  ...
  "output_options": {
      "field_names": ["ColoName", "Datetime", "Direction", "IPDestinationAddress", "IPDestinationSubnet", "IPProtocol","IPSourceAddress", "IPSourceSubnet", "Outcome", "RuleID", "RulesetID", "SampleInterval", "Verdict"],
  },
  "filter": "{\"where\":{\"or\":[{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"},{\"or\":[{\"key\":\"Outcome\",\"operator\":\"eq\",\"value\":\"drop\"},{\"key\":\"Verdict\",\"operator\":\"eq\",\"value\":\"pass\"}]}]}]}}"
}'
```

## Filter by allowed or blocked traffic

Use the filter examples below to filter your Network Firewall traffic to display events for allowed or blocked traffic.

The example below only displays fields relevant to Network Firewall, and the filter only displays events where no explicit action was taken, for example, a packet "fell through" Network Firewall. This example does not have any rules applied.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  ...
  "output_options": {
      "field_names": ["ColoName", "Datetime", "Direction", "IPDestinationAddress", "IPDestinationSubnet", "IPProtocol","IPSourceAddress", "IPSourceSubnet", "Outcome", "RuleID", "RulesetID", "SampleInterval", "Verdict"],
  },
  "filter": "{\"where\":{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"eq\",\"value\":\"\"}]}}"
}'
```

The example below only displays fields relevant to Network Firewall, and the filter only displays events where explicit action was taken. The example includes both enabled and disabled Network Firewall rules.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  ...
  "output_options": {
      "field_names": ["ColoName", "Datetime", "Direction", "IPDestinationAddress", "IPDestinationSubnet", "IPProtocol","IPSourceAddress", "IPSourceSubnet", "Outcome", "RuleID", "RulesetID", "SampleInterval", "Verdict"],
  },
  "filter": "{\"where\":{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"}]}}"
}'
```

## Filter by relevant fields to Network Firewall

Use the examples below to filter out fields that are not relevant to traffic flowing through Network Firewall. The example below only includes Network Firewall events.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  ...
  "output_options": {
      "field_names": ["ColoName", "Datetime", "Direction", "IPDestinationAddress", "IPDestinationSubnet", "IPProtocol","IPSourceAddress", "IPSourceSubnet", "Outcome", "RuleID", "RulesetID", "SampleInterval", "Verdict"],
  },
  "filter": "{\"where\":{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"}}"
}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/how-to/filter-views/#page","headline":"Filter different views · Cloudflare Network Firewall docs","description":"Filter analytics views in the Network Firewall dashboard.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/how-to/filter-views/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
