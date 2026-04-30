---
title: Querying Firewall Events with GraphQL
description: Query WAF firewall events via GraphQL.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying Firewall Events with GraphQL

In this example, we are going to use the GraphQL Analytics API to query for Firewall Events over a specified time period.

The following API call will request Firewall Events over a one hour period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ZONE_TAG>`, `<EMAIL>`, and `<API_TOKEN>`[1](#user-content-fn-1) with your zone tag and API credentials, and adjust the `datetime_geg` and `datetime_leq` values to your liking.

## API Call

Terminal window

```

echo '{ "query":

  "query ListFirewallEvents($zoneTag: string, $filter: FirewallEventsAdaptiveFilter_InputObject) {

    viewer {

      zones(filter: { zoneTag: $zoneTag }) {

        firewallEventsAdaptive(

          filter: $filter

          limit: 10

          orderBy: [datetime_DESC]

        ) {

          action

          clientAsn

          clientCountryName

          clientIP

          clientRequestPath

          clientRequestQuery

          datetime

          source

          userAgent

        }

      }

    }

  }",

  "variables": {

    "zoneTag": "<CLOUDFLARE_ZONE_TAG>",

    "filter": {

      "datetime_geq": "2022-07-24T11:00:00Z",

      "datetime_leq": "2022-07-24T12:00:00Z"

    }

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @-


```

The results returned will be in JSON (as requested), so piping the output to `jq` will make them easier to read, for example:

Terminal window

```

... | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


#=> {

#=>   "data": {

#=>     "viewer": {

#=>       "zones": [

#=>         {

#=>           "firewallEventsAdaptive": [

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "block",

#=>               "clientAsn": "5089",

#=>               "clientCountryName": "GB",

#=>               "clientIP": "203.0.113.69",

#=>               "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:11:24Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "58224",

#=>               "clientCountryName": "IR",

#=>               "clientIP": "2.183.175.37",

#=>               "clientRequestPath": "/api/v2",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:00:54Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"

#=>             },

#=>             {

#=>               "action": "log",

#=>               "clientAsn": "58224",

#=>               "clientCountryName": "IR",

#=>               "clientIP": "2.183.175.37",

#=>               "clientRequestPath": "/api/v2",

#=>               "clientRequestQuery": "",

#=>               "datetime": "2020-04-24T10:00:54Z",

#=>               "source": "waf",

#=>               "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"

#=>             }

#=>           ]

#=>         }

#=>       ]

#=>     }

#=>   },

#=>   "errors": null

#=> }


```

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-firewall-events/","name":"Querying Firewall Events with GraphQL"}}]}
```
