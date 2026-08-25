---
description: Manage uploaded OpenAPI schemas with the Cloudflare API.
title: API configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# API configuration

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/schema-validation/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the API to upload, activate, list, and delete OpenAPI schemas. An uploaded schema supplies a Schema Profile for its operations.

Note

[Classic Schema validation documentation](https://developers.cloudflare.com/api-shield/reference/classic-schema-validation/) is available for reference only.

## Configure an uploaded schema

1. Upload a schema.
2. Add the schema operations to the Web Assets inventory.
3. Activate the schema to make uploaded profile evaluation available.
4. Send representative traffic through the configured operations.
5. Analyze `cf.schema_validation.uploaded.violated` in [Profile Analysis](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/).
6. Configure mitigation with [WAF Custom Rules](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/).

Settings changes may take a few minutes to implement.

Note

Operations must exist in Web Assets for Schema Validation matching.

## Configuration

### Upload and activate a schema

Upload a schema with `POST`. This example uses `example_schema.yaml` from the current directory.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Account API Gateway`
* `Domain API Gateway`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"kind": "openapi_v3",
		"name": "example_schema",
		"source": "<SOURCE>",
		"validation_enabled": true
	}'
```

```json
{
	"result": {
		"schema": {
			"schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
			"name": "example_schema",
			"kind": "openapi_v3",
			"source": "<SOURCE>",
			"created_at": "2023-04-03T15:10:08.902309Z"
		}
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

By default, uploaded schema evaluation is inactive. Set `validation_enabled=true` to make evaluation available during upload.

Use `PATCH` to activate evaluation after inspecting the schema.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Account API Gateway`
* `Domain API Gateway`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/$SCHEMA_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"validation_enabled": true
	}'
```

```json
{
	"result": {
		"schema_id": "0bf58160-5da3-48ac-80a9-069f9642c1a0",
		"name": "api_schema.json",
		"kind": "openapi_v3",
		"validation_enabled": true,
		"created_at": "0001-01-01T00:00:00Z"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Activation makes uploaded profile evaluation available for configured operations. It does not configure mitigation.

### Add schema operations

Schemas contain hosts, paths, and methods that define operations. An operation represents an endpoint by HTTP method, hostname pattern, and path pattern.

Schema Validation evaluates requests only for operations added to Web Assets. Retrieve schema operations and their configuration with `GET`.

```bash
curl --request GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info&operation_status=new&page=1&per_page=5000" \
--header "Authorization: Bearer <API_TOKEN>" \
--header 'Content-Type: application/json'
```

```json
{
	"result": [
		{
			"method": "GET",
			"host": "example.com",
			"endpoint": "/pets"
		}
	],
	"success": true,
	"errors": [],
	"messages": [],
	"result_info": {
		"page": 1,
		"per_page": 30,
		"count": 1,
		"total_count": 1
	}
}
```

To receive information about the configuration of existing operations, Cloudflare recommends passing the `?feature=schema_info` parameter.

Add schema operations to Web Assets with `POST`.

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations" \
--header "Authorization: Bearer <API_TOKEN>" \
--header 'Content-Type: application/json' \
--data '[
  {
   "method": "GET",
   "host": "example.com",
   "endpoint": "/pets",
  }
]'
```

```json
{
	"result": [
		{
			"operation_id": "6c734fcd-455d-4040-9eaa-dbb3830526ae",
			"method": "GET",
			"host": "example.com",
			"endpoint": "/pets",
			"last_updated": "2023-04-04T16:07:37.575971Z"
		}
	],
	"success": true,
	"errors": [],
	"messages": []
}
```

You can add schema operations that do not exist in Web Assets. This API call supports up to 20 operations and requires `jq`. For schemas with more than 20 new operations, run the command again to add the next batch.

```bash
response="$(curl --silent --fail-with-body "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info&page=1&per_page=20&operation_status=new" --header "Authorization: Bearer <API_TOKEN>")" || exit 1
operations="$(printf "%s" "$response" | jq --exit-status ".result")" || exit 1

if [ "$(printf "%s" "$operations" | jq "length")" -eq 0 ]; then
	printf "No new operations found.\n"
else
	curl --silent --fail-with-body "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations" \
	--header "Authorization: Bearer <API_TOKEN>" \
	--header "Content-Type: application/json" \
	--data "$operations" || exit 1
fi
```

Note

When there are no new operations, the command exits without sending an API request. All `new_operations` are already `existing_operations`.

### List all schemas

List uploaded schemas on a zone with `GET`.

`validation_enabled=true` is an optional parameter.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Account API Gateway`
* `Account API Gateway Read`
* `Domain API Gateway`
* `Domain API Gateway Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
    "result":  [
        {
	        "schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
	        "name": "example_schema",
	        "kind": "openapi_v3",
	        "source": "<SOURCE>",
	        "created_at": "2023-04-03T15:10:08.902309Z"
	    }
    ]
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

Note

Use `omit_source=true` to exclude each schema source from the response.

### Delete a schema

You can delete a schema using `DELETE`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Account API Gateway`
* `Domain API Gateway`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas/$SCHEMA_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"result": null,
	"success": true,
	"errors": [],
	"messages": []
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/schema-validation/api/#page","headline":"Configure Schema validation · Cloudflare API Shield docs","description":"Manage uploaded OpenAPI schemas with the Cloudflare API.","url":"https://developers.cloudflare.com/api-shield/security/schema-validation/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
