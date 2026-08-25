---
description: Retrieve Access login event logs via GraphQL.
title: Querying Access login events with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying Access login events with GraphQL

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-access-login-events/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this example, we are going to use the GraphQL Analytics API to retrieve logs for an Access login event. These logs are particularly useful for determining why a user received a `403` Forbidden error, since they surface additional data beyond what is shown in the dashboard Access logs.

The following API call will request logs for a single Access login event and output the requested fields. The authentication request is identified by its **Ray ID**, which you can obtain from the `403` Forbidden page shown to the user.

You will need to insert your `<CLOUDFLARE_ACCOUNT_TAG>`, your API credentials in `<API_TOKEN>`[1](#user-content-fn-1), and substitute your own values for the following variables:

* `rayID`: A unique identifier assigned to the authentication request.
* `datetimeStart`: The earliest event time to query (no earlier than September 16, 2022).
* `datetimeEnd`: The latest event time to query. Be sure to specify a time range that includes the login event you are querying.

## API Call

```bash
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

Note

Rather than filter by `cfRayId`, you may also [filter](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/) by any other field in the query such as `userUuid` or `deviceId`.

## Response

```json
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

You can compare the query results to your Access policies to understand why a user was blocked. For example, if your application requires a valid mTLS certificate, Access blocked the request shown above because `mtlsStatus`, `mtlsCommonName`, and `mtlsCertSerialId` are empty.

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-access-login-events/#page","headline":"Querying Access login events with GraphQL · Cloudflare Analytics docs","description":"Retrieve Access login event logs via GraphQL.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-access-login-events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
