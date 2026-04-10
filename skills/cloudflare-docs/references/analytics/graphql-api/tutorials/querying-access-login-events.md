---
title: Querying Access login events with GraphQL
description: In this example, we are going to use the GraphQL Analytics API to retrieve logs for an Access login event. These logs are particularly useful for determining why a user received a 403 Forbidden error, since they surface additional data beyond what is shown in the dashboard Access logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/analytics/graphql-api/tutorials/querying-access-login-events.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Querying Access login events with GraphQL

In this example, we are going to use the GraphQL Analytics API to retrieve logs for an Access login event. These logs are particularly useful for determining why a user received a `403` Forbidden error, since they surface additional data beyond what is shown in the dashboard Access logs.

The following API call will request logs for a single Access login event and output the requested fields. The authentication request is identified by its **Ray ID**, which you can obtain from the `403` Forbidden page shown to the user.

You will need to insert your `<CLOUDFLARE_ACCOUNT_TAG>`, your API credentials in `<API_TOKEN>`[1](#user-content-fn-1), and substitute your own values for the following variables:

* `rayID`: A unique identifier assigned to the authentication request.
* `datetimeStart`: The earliest event time to query (no earlier than September 16, 2022).
* `datetimeEnd`: The latest event time to query. Be sure to specify a time range that includes the login event you are querying.

## API Call

Terminal window

```

echo '{ "query":

  "query accessLoginRequestsAdaptiveGroups($accountTag: string, $rayId: string, $datetimeStart: string, $datetimeEnd: string) {

    viewer {

      accounts(filter: {accountTag: $accountTag}) {

        accessLoginRequestsAdaptiveGroups(limit: 100, filter: {datetime_geq: $datetimeStart, datetime_leq: $datetimeEnd, cfRayId: $rayId}, orderBy: [datetime_ASC]) {

          dimensions {

            datetime

            isSuccessfulLogin

            hasWarpEnabled

            hasGatewayEnabled

            hasExistingJWT

            approvingPolicyId

            cfRayId

            ipAddress

            userUuid

            identityProvider

            country

            deviceId

            mtlsStatus

            mtlsCertSerialId

            mtlsCommonName

            serviceTokenId

          }

        }

      }

    }

  }",

  "variables": {

    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",

    "rayId": "74e4ac510dfdc44f",

    "datetimeStart": "2022-09-20T14:36:38Z",

    "datetimeEnd": "2022-09-22T14:36:38Z"

}

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


```

Explain Code

Note

Rather than filter by `cfRayId`, you may also [filter](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/) by any other field in the query such as `userUuid` or `deviceId`.

## Response

```

{

  "data": {

    "viewer": {

      "accounts": [

        {

          "accessLoginRequestsAdaptiveGroups": [

            {

              "dimensions": {

                "approvingPolicyId": "",

                "cfRayId": "744927037ce06d68",

                "country": "US",

                "datetime": "2022-09-02T20:56:27Z",

                "deviceId": "",

                "hasExistingJWT": 0,

                "hasGatewayEnabled": 0,

                "hasWarpEnabled": 0,

                "identityProvider": "nonidentity",

                "ipAddress": "2a09:bac0:15::814:7b37",

                "isSuccessfulLogin": 0,

                "mtlsCertSerialId": "",

                "mtlsCommonName": "",

                "mtlsStatus": "NONE",

                "serviceTokenId": "",

                "userUuid": ""

              }

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

Explain Code

You can compare the query results to your Access policies to understand why a user was blocked. For example, if your application requires a valid mTLS certificate, Access blocked the request shown above because `mtlsStatus`, `mtlsCommonName`, and `mtlsCertSerialId` are empty.

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-access-login-events/","name":"Querying Access login events with GraphQL"}}]}
```
