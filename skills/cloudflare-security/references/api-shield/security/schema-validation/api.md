---
description: Manage uploaded OpenAPI schemas with the Cloudflare API.
title: API configuration
image: https://developers.cloudflare.com/api-shield/security/schema-validation/api/og.png?v=66c08eadff5f7d12
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# API configuration

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/api-shield/security/schema-validation/api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the API to upload, activate, list, and delete OpenAPI schemas. An uploaded schema supplies a Schema Profile for its operations.

Note

[Classic Schema validation documentation](https://developers.cloudflare.com/api-shield/reference/classic-schema-validation/) is available for reference only.

## Configure an uploaded schema

1. Upload a schema with `validation_enabled` set to `false`.
2. Add the schema operations as saved operations in the Web Assets inventory.
3. Activate the schema by setting `validation_enabled` to `true`.
4. Send representative traffic through the configured operations.
5. Analyze `cf.schema_validation.uploaded.violated` in [Profile Analysis](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/).
6. Configure mitigation with [WAF Custom Rules](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/).

Settings changes may take a few minutes to implement.

Note

Operations must exist as saved operations in Web Assets for Schema Validation matching.

## Configuration

### Upload a schema

Upload a schema with `POST`. Keep validation inactive while you configure operations.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account API Gateway</code>
- <code>Domain API Gateway</code>

</details>

*Upload a schemabash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"kind": "openapi_v3",
		"name": "example_schema",
		"source": "<SOURCE>",
		"validation_enabled": false
	}'
```

```json
{
	"result": {
		"schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
		"name": "example_schema",
		"kind": "openapi_v3",
		"source": "<SOURCE>",
		"validation_enabled": false,
		"created_at": "2023-04-03T15:10:08.902309Z"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

### Add schema operations

Schemas contain hosts, paths, and methods that define operations. An operation represents an endpoint by HTTP method, hostname pattern, and path pattern.

Schema Validation evaluates requests only for saved operations in Web Assets. Retrieve operations from the schema with `GET`.

*cURL commandbash*

```bash
curl --request GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas/$SCHEMA_ID/operations?operation_status=new&page=1&per_page=50" \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
		"per_page": 50,
		"count": 1,
		"total_count": 1
	}
}
```

Use `operation_status=new` to return operations that are not saved. Use `feature=schema_info` to include Schema Validation configuration for existing operations.

Results are paginated. Request each page to retrieve all schema operations.

Add schema operations to Web Assets with `POST`.

*cURL commandbash*

```bash
curl --request POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations" \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--header "Content-Type: application/json" \
	--data '[
		{
			"method": "GET",
			"host": "example.com",
			"endpoint": "/pets"
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

The endpoint may limit the number of operations you can add in a single batch. If necessary, add operations in multiple requests.

### Activate the schema

After you save the operations, use `PATCH` to activate the schema.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account API Gateway</code>
- <code>Domain API Gateway</code>

</details>

*Set schema validation statebash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas/$SCHEMA_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"validation_enabled": true
	}'
```

```json
{
	"result": {
		"schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
		"name": "example_schema",
		"kind": "openapi_v3",
		"source": "",
		"validation_enabled": true,
		"created_at": "2023-04-03T15:10:08.902309Z"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Activation makes uploaded profile evaluation available for configured operations.

### List all schemas

List uploaded schemas on a zone with `GET`. Results use the same `page` and `per_page` pagination parameters.

Use the optional `validation_enabled` query parameter to filter schemas by validation state.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account API Gateway</code>
- <code>Account API Gateway Read</code>
- <code>Domain API Gateway</code>
- <code>Domain API Gateway Read</code>

</details>

*List all uploaded schemasbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"result": [
		{
			"schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
			"name": "example_schema",
			"kind": "openapi_v3",
			"source": "<SOURCE>",
			"validation_enabled": true,
			"created_at": "2023-04-03T15:10:08.902309Z"
		}
	],
	"success": true,
	"errors": [],
	"messages": [],
	"result_info": {
		"page": 1,
		"per_page": 20,
		"count": 1,
		"total_count": 1
	}
}
```

Note

Use `omit_source=true` to exclude each schema source from the response.

### Delete a schema

You can delete a schema using `DELETE`.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account API Gateway</code>
- <code>Domain API Gateway</code>

</details>

*Delete a schemabash*

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/schema-validation/api/#page","headline":"API configuration","description":"Manage uploaded OpenAPI schemas with the Cloudflare API.","url":"https://developers.cloudflare.com/api-shield/security/schema-validation/api/","inLanguage":"en","image":"https://developers.cloudflare.com/api-shield/security/schema-validation/api/og.png?v=66c08eadff5f7d12","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
