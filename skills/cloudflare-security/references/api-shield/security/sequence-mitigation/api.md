---
description: Build and configure sequence mitigation rules using the Cloudflare API.
title: Configure sequence mitigation via the API
image: https://developers.cloudflare.com/api-shield/security/sequence-mitigation/api/og.png?v=0ee1fd9dfb8f0f70
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure sequence mitigation via the API

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To configure sequence mitigation via the API, choose a sequence, rule kind, and action. The following example shows a rule returned by the API. In responses, `position` is a one-indexed integer:

*Example response rule objectjson*

```json
{
	"id": "d4909253-390f-4956-89fd-92a5b0cd86d8",
	"title": "<RULE_TITLE>",
	"kind": "allow",
	"action": "block",
	"sequence": [
		"0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
		"b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"
	],
	"position": 1,
	"last_updated": "2023-07-24T12:06:51.796286Z",
	"created_at": "2023-07-24T12:06:51.796286Z"
}
```

This rule enforces that a request to endpoint `0d9bf70c-92e1-4bb3-9411-34a3bcc59003` must come before a request to endpoint `b704ab4d-5be0-46e0-9875-b2b3d1ab42f9`.

Otherwise, the request to endpoint `b704ab4d-5be0-46e0-9875-b2b3d1ab42f9` is blocked.

### Fields

| Field name | Description | Possible Values | Example |
| --- | --- | --- | --- |
| `id` | An opaque identifier that identifies a rule. | A UUID | `"d4909253-390f-4956-89fd-92a5b0cd86d8"` |
| `title` | A string that helps to identify the rule. | A value between 1 and 50 characters | `"Allow checkout sequence"` |
| `kind` | Defines the semantics of this rule. Block rules have a negative security model and allow to explicitly deny a sequence. Allow rules have a positive security model and deny everything but the configured sequence. | `block`, `allow` | `"block"` |
| `action` | What firewall action should we do when the rule matches. | `block`,`log` | `"log"` |
| `sequence` | Denotes the operations (from Endpoint Management) that make up the sequence for this rule. We currently only support sequences of length two. Both operations must use the same hostname. The first operation is the starting endpoint, and the second operation is the ending endpoint. | An array with two valid operation IDs from Endpoint Management | `["0d9bf70c-92e1-4bb3-9411-34a3bcc59003", "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"]` |
| `position` | Denotes the one-indexed position of this rule among all sequence rules. Rules are evaluated from top to bottom, so rules with lower position values are evaluated first. Responses return an integer. `POST` and `PATCH` requests set the position with `{"index": N}`. | A positive integer | `1` |
| `last_updated` | When this rule was last changed. | A date string | `2023-05-02T12:06:51.796286Z` |
| `created_at` | When this rule was created. | A date string | `2023-05-02T12:06:51.796286Z` |

You can find an endpoint's operation ID by exporting the schema in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#export-a-schema) or via the [API](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/list/).

### List sequence rules

Use the `GET` command to list rules.

*cURL commandbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules"
```

### Add a single sequence rule

Use the `POST` command to create a single rule.

This adds a single rule to all existing rules. If you omit `position`, the API appends the rule. To insert it at a specific position, set the one-indexed request field to `{"index": N}`. Existing rules at and after that position move back.

The response will reflect the rule that has been written with its ID. In case something is not right with the rule, an appropriate error message with a `json` path pointing towards the issue will be provided.

*Example using cURLbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules/rules" \
--header "Content-Type: application/json" \
--data '{
  "title": "string",
  "kind": "block",
  "action": "block",
  "sequence": [
    "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
    "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"
  ],
  "position": {
    "index": 1
  }
}'
```

### Add multiple sequence rules

Use the `PUT` command to set up new rules in bulk.

This will overwrite any existing rules and replace them with the rules specified in the body. Setting an empty array for the rules removes all rules.

The order of objects in the `rules` array sets their order, starting at position `1`. Do not include `position` in individual bulk rule objects.

The response will reflect the rules that have been written with their IDs in case something is not right with the rules, an appropriate error message with a `json` path pointing towards the issue will be provided.

*Example using cURLbash*

```bash
curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "title": "<RULE_TITLE>",
      "kind": "block",
      "action": "block",
      "sequence": [
        "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
        "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"
      ]
    }
  ]
}'
```

### Delete a rule

Use the `DELETE` command with its rule ID to delete a rule.

*cURL commandbash*

```bash
curl --request DELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules/rules/d4909253-390f-4956-89fd-92a5b0cd86d8"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/api/#page","headline":"Configure sequence mitigation via the API","description":"Build and configure sequence mitigation rules using the Cloudflare API.","url":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/api/","inLanguage":"en","image":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/api/og.png?v=0ee1fd9dfb8f0f70","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
