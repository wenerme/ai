---
title: "Provision SLO resources using the HTTP API | Grafana Plugins documentation"
description: "Get started with and use the SLO API to create, manage, and maintain your SLOs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Provision SLO resources using the HTTP API

Get started with and use the SLO API to create, manage, and maintain your SLOs.

To use the SLO API, complete the following steps.

1. Create a [Grafana service account token](/docs/grafana-cloud/security-and-account-management/authentication-and-permissions/service-accounts/) with Editor permissions.
2. Using any HTTP client like `curl` or HTTPie, make calls to the plugin’s resource API.

   - Make your API calls to the SLO resource API: `{stackURL}/api/plugins/grafana-slo-app/resources/v1/slo`
   - Use “Authorization: Bearer $APITOKEN” and “Accept application/json” as request headers.
   - The plugin uses GET to list all SLOs or read a specific one.
   - DELETE to delete an individual SLO.
   - POST to create an SLO.
   - PUT to update an SLO.
3. For a full definition of the API, download [this OpenAPIv3 specification.](./slo-api.yaml)

Here is an example request body to create an SLO:

JSON [Copy code to clipboard] Copy

```json
{
    "name":"HTTP Requests Kubelet Success Indicator",
    "description":"99.5% of  Kubelet HTTP Requests are not 5xx errors",
    "destinationDatasource": {
                "uid": "grafanacloud-prom"
            },
    "objectives":[
      {
        "value":0.995,
        "window":"28d"
      }
    ],
    "query":{
      "type":"ratio",
      "ratio":{
         "successMetric":{
            "prometheusMetric":"kubelet_http_requests_total{status!~\"5..\"}"
         },
         "totalMetric":{
            "prometheusMetric":"kubelet_http_requests_total"
         },
         "groupByLabels":[
            "instance",
            "job"
         ]
      }
   },
   "alerting":{
      "fastBurn":{
         "annotations":[
            {
               "key":"name",
               "value":"SLO Burn Rate Very High"
            },
            {
               "key":"description",
               "value":"Error budget is burning too fast."
            }
         ]
      },
      "slowBurn":{
         "annotations":[
            {
               "key":"name",
               "value":"SLO Burn Rate High"
            },
            {
               "key":"description",
               "value":"Error budget is burning too fast."
            }
         ]
      }
    }
  }
```
