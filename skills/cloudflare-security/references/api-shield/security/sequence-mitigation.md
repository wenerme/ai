---
description: Enforce expected API request patterns to detect and block malicious sequences.
title: Sequence mitigation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Sequence mitigation

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sequence mitigation allows you to enforce request patterns for authenticated clients communicating with your API.

You can use sequence rules to establish a set of known behavior for API clients or detect and mitigate malicious behavior.

For example, you may expect that API requests made during a bank funds transfer could conform to the following order in time:

| Order | Method | Path                                   | Description                                                                                                                                    |
| ----- | ------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | GET    | /api/v1/users/{user\_id}/accounts      | user\_id is the active user.                                                                                                                   |
| 2     | GET    | /api/v1/accounts/{account\_id}/balance | account\_id is one of the user’s accounts.                                                                                                     |
| 3     | GET    | /api/v1/accounts/{account\_id}/balance | account\_id is a different account belonging to the user.                                                                                      |
| 4     | POST   | /api/v1/transferFunds                  | This contains a request body detailing an account to transfer funds from, an account to transfer funds to, and an amount of money to transfer. |

You may want to enforce that an API user requests `GET /api/v1/users/{user_id}/accounts` before `GET /api/v1/accounts/{account_id}/balance` and that you request `GET /api/v1/accounts/{account_id}/balance` before `POST /api/v1/transferFunds`.

Using sequence mitigation, you can enforce that request pattern with two new sequence mitigation rules.

Note

You can create sequence mitigation rules for a sequence even if the sequence is not listed in [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/).

## Process

You can [create a sequence rule](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/manage-sequence-rules/) to enforce behavior on your API over time using one of two approaches.

A positive security model blocks users who make API requests outside of your expected patterns. A negative security model blocks users who perform a known malicious sequence of API calls.

Sequence rules built via the Cloudflare dashboard using API Shield rules utilize a lookback window to match endpoints in the sequence. The rule will match as long as both endpoints are found within [10 requests](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/#request-limitations) (to endpoints within Endpoint Management) of each other and made within [10 minutes](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/#time-limitations) of each other.

Note

Contact your account team if the default lookback window is not sufficient for you.

If you want to add multiple endpoints, ignore the lookback window, and configure time-based constraints, refer to [Sequence mitigation custom rules](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/custom-rules/).

In the bank funds transfer example, enforcing that a user requests `GET /api/v1/accounts/{account_id}/balance` before `POST /api/v1/transferFunds` is considered a positive security model, since a user may only perform a funds transfer after listing an account balance.

A negative security model may be useful if you see abusive behavior that is outside the norm of your application and you need to stop the requests while researching the correct positive security model to implement.

For example, if there was an authorization bug that allowed users to iterate through other users' profiles that contain account numbers via `GET /api/v1/users/{var1}/profile` and then a user tries to make fraudulent funds transfers, you could create a rule to block or log the sequence `GET /api/v1/users/{var1}/profile` to `POST /api/v1/transferFunds`.

## Limitations

### Endpoint Management

To track requests to API endpoints, they must be added to [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/). Add your endpoints to endpoint management via [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), or [manually](https://developers.cloudflare.com/api-shield/management-and-monitoring/#add-endpoints-manually) through the Cloudflare dashboard.

### Session Identifiers

API Shield uses your configured session identifier to track sessions. You must configure a session identifier that is unique per end user of your API in order for sequence mitigation to function as expected.

### Request limitations

By default, API Shield stores the current and previous nine requested endpoints by each individual API user identified through the session identifier. Contact your account team if the default lookback window is not sufficient for you.

Sequence mitigation further de-duplicates requests to the same endpoint while building the sequence.

To illustrate, in the original [sequence example](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) listed above, sequence mitigation would store the following sequence:

1. `GET /api/v1/users/{user_id}/accounts`
2. `GET /api/v1/accounts/{account_id}/balance`
3. `POST /api/v1/transferFunds`

Sequence mitigation de-duplicated the two requests to `GET /api/v1/accounts/{account_id}/balance` and stored them as a single request.

### Time limitations

Sequence mitigation rules have a lookback period of 10 minutes. Any two requests using the same session identifier extend the sequence if they happen no further than 10 minutes apart. A request that happens more than 10 minutes after the previous one starts a new sequence.

For example, if you create a rule requiring one endpoint to be requested before another, and more than 10 minutes elapses between the two requests, the rule will not match.

## Availability

Sequence mitigation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/#page","headline":"Sequence mitigation · Cloudflare API Shield docs","description":"Enforce expected API request patterns to detect and block malicious sequences.","url":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
