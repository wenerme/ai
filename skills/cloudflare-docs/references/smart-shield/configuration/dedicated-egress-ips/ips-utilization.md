---
title: IPs utilization
description: Monitor dedicated egress IP capacity and concurrent connections with GraphQL.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ GraphQL ](https://developers.cloudflare.com/search/?tags=GraphQL) 

# IPs utilization

Use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/) to get aggregate data and monitor your dedicated IPs capacity (formerly known as Aegis).

Each Dedicated CDN Egress IP can support 40,000 concurrent connections per origin IP port. For example, if you have one dedicated IP and two origins (A and B), this single IP can support 40,000 concurrent connections to origin A, while simultaneously supporting 40,000 concurrent connections to origin B.

Refer to the [GraphQL Analytics API documentation](https://developers.cloudflare.com/analytics/graphql-api/getting-started/) for further guidance, or consider the [example](#example) below for a quickstart.

## GraphQL schema

The specific schema to get Dedicated CDN Egress IPs data is called `aegisIpUtilizationAdaptiveGroups`.

You can get average (`avg`) or maximum (`max`) utilization values (in percentage), and use the following dimensions:

* `datetimeFiveMinutes` ` time `  
   * Timestamp truncated to five minutes. For example, `2025-01-10T00:05:00Z`.
* `popName` ` string `  
   * The Cloudflare point of presence (PoP). For example, `sjc`.
* `egressIp` ` string `  
   * Your assigned Dedicated CDN Egress IP. For example, `192.0.2.1`.
* `origin` ` string `  
   * Origin IP and port. For example, `203.0.113.150:443`.
* `popUtilizationKey` ` string `  
   * The Cloudflare point of presence (PoP), the Dedicated CDN Egress IP, and the origin IP and port. For example, `sjc 192.0.2.1 203.0.113.150:443`.

## Example

Refer to the query below to learn how to get average utilization and maximum utilization by point of presence, and filter the results.

You can also select the button at the bottom to use this query for your account via the [Cloudflare GraphQL API Explorer ↗](https://graphql.cloudflare.com/explorer). Make sure to provide your account ID and timestamps, and replace the placeholders for `popName`, `egressIp`, and `origin` as needed.

```

query AegisIpUtilizationQuery(

  $accountTag: string

  $datetimeStart: string

  $datetimeEnd: string

) {

  viewer {

    utilization: accounts(filter: { accountTag: $accountTag }) {

      avgByPopUtilization: aegisIpUtilizationAdaptiveGroups(

        limit: 100

        filter: {

          datetimeFiveMinutes_geq: $datetimeStart

          datetimeFiveMinutes_leq: $datetimeEnd

        }

        orderBy: [datetimeFiveMinutes_ASC]

      ) {

        avg {

          utilization

        }

        dimensions {

          datetimeFiveMinutes

          popUtilizationKey

        }

      }


      maxByPopUtilization: aegisIpUtilizationAdaptiveGroups(

        limit: 100

        filter: {

          datetimeFiveMinutes_geq: $datetimeStart

          datetimeFiveMinutes_leq: $datetimeEnd

        }

        orderBy: [datetimeFiveMinutes_ASC]

      ) {

        max {

          utilization

        }

        dimensions {

          datetimeFiveMinutes

          popUtilizationKey

        }

      }


      filterPopUtilization: aegisIpUtilizationAdaptiveGroups(

        limit: 100

        filter: {

          datetimeFiveMinutes_geq: $datetimeStart

          datetimeFiveMinutes_leq: $datetimeEnd

          popName: "<CLOUDFLARE_POP>"

        }

        orderBy: [datetimeFiveMinutes_ASC]

      ) {

        max {

          utilization

        }

        dimensions {

          datetimeFiveMinutes

          popUtilizationKey

        }

      }


      filterIPUtilization: aegisIpUtilizationAdaptiveGroups(

        limit: 100

        filter: {

          datetimeFiveMinutes_geq: $datetimeStart

          datetimeFiveMinutes_leq: $datetimeEnd

          egressIp: "<YOUR_EGRESS_IP>"

        }

        orderBy: [datetimeFiveMinutes_ASC]

      ) {

        max {

          utilization

        }

        dimensions {

          datetimeFiveMinutes

          popUtilizationKey

        }

      }


      filterOriginUtilization: aegisIpUtilizationAdaptiveGroups(

        limit: 100

        filter: {

          datetimeFiveMinutes_geq: $datetimeStart

          datetimeFiveMinutes_leq: $datetimeEnd

          origin: "<ORIGIN_IP_AND_PORT>"

        }

        orderBy: [datetimeFiveMinutes_ASC]

      ) {

        max {

          utilization

        }

        dimensions {

          datetimeFiveMinutes

          popUtilizationKey

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAgmA5gSwM4EkAOBVALsgG2QC8BDfAewDsBFcaACgCgYYASUgY04pCtwAqpRAC4YqXBGRVELdgBNyYfAFswAZVykIuMRKky5bRbmXI1AUSry9k6bICUMAN5yAbsjAB3SC7msQfCIySioxLh4+XFQGADNCUwgxZxgI3n4hUXY0qMyYAF8nV1YS1LdEACEoAAUKHCCScmRqcKQ0LDxCRtC4RUx8NzAAcQheTBj-UpgiFWRdGABGAAYlydL4gkTktamTMzUAMWRBgFlpQLBUAH1EMGAxYyVVDS0dHdK956PT89NrgjuD0+5jAVnk7wKEIoEHkkCqYgA2sDDscwGcqBdrnB1ABhAC6OyKENI5T8UymgS6IWaVAh+Qh8hBVFQNNQZPJJWRYG+aN+lwhrEwdU6wSa1AA0mAoHSdvSdipSAAPKq1epUsVhVJtDBq0U9PoDYajEDjZgc6bmOZiZarc0bLbs81cnnozE3QEKJ4gzTaXACmDO1Guv5XAH3T2mZ5gmXm6GwiDwmBIr0on4YkPY-GEx1TBWKnPkyl6mkxjmMtTM1kF3Yp7lBvmof1C3XdGmS6Xm+nkuXk+2QVUi1stLUoHWD6nUXqkfqokZjCbmmZWxYrCF9pLVj61l0N93hx6R72vP3m1iBtNusNA2vR08wZsAOVIajEACIADw4gAyAHlsAARA4vzgAAlCwrmqH9qgAPlfUtyTjOEoERc9eXTS4rkzAlySJc0803EoiyHWlOwZJkWWoNlilPVDg35O9m3HDV23gkoeymdd0GqJjQlaUcOgaCcqCnGdBjnE0Fw5Jd5htNcEkgbY71o3dbn3LkfTeJTt3rdD-g9A99lBax-SQCBLh1N93wATT-ECrgsIYwPUdQri42DWNKRCE2QpNlN0zDcWwqZcI5fDqPNIihI8zlyKrcKy20i8-ibYVBOYqVovY9Z5IgH8pBQKgeJpPj2hbISRMNcTTQhaTrVXO0csUmjErQt1VOvQ81A0k9ms6uskowq8I0M29T2hZACssn8QPQIZ0AfVzqkwh9-wg6aBHc0jYxhJCUJauisUC7N4tKML-UijVorPWLKIIs99obFKyvSjsOS7KZ3tYd76XyIA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQATMRAU0QEsBbNgZURgAToiwgASgFEACgBl8kigHUqyABIU+ycVVIBxBs1YcebSfCZipchctUatO-SAC+QA)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/","name":"Dedicated CDN Egress IPs"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/ips-utilization/","name":"IPs utilization"}}]}
```
