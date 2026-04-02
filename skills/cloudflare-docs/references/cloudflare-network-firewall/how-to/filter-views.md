---
title: Filter different views
description: You can utilize different Log filters to only view specific data from Cloudflare Network Firewall (formerly Magic Firewall).
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/how-to/filter-views.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Filter different views

You can utilize different [Log filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) to only view specific data from Cloudflare Network Firewall (formerly Magic Firewall).

## Filter by enabled or disabled rules

Use the filter examples below to filter your Network Firewall traffic to display events for enabled or disabled rules.

The example below only displays fields relevant to Network Firewall, and the filter only displays events for disabled rules.

Terminal window

```

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

Terminal window

```

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

Terminal window

```

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

Terminal window

```

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

Terminal window

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/how-to/filter-views/","name":"Filter different views"}}]}
```
