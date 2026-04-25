---
title: Schema validation
description: Validate API requests against OpenAPI schemas to block malformed or unexpected traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Schema validation

 Available on all plans 

The API schema defines which API requests are valid based on several request properties like target endpoint, path or query variable format, and HTTP method.

Schema validation allows you to check if incoming traffic complies with a previously supplied API schema. When you provide an API schema or select from a list of learned schema, API Shield creates rules for incoming traffic from the schema definitions. These rules define which traffic is allowed and which traffic gets logged or blocked.

Schema validation 2.0 is the current version. For help configuring the previous version for one or more hosts using the dashboard, refer to [Configure Classic Schema validation](https://developers.cloudflare.com/api-shield/reference/classic-schema-validation/). You can make changes to your Classic Schema validation settings but you cannot add any new schemas.

You can migrate to Schema validation 2.0 manually by uploading your schemas to the new system.

---

## Process

Endpoints must be added to [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/) for Schema validation to protect them. Uploading a schema via the Cloudflare dashboard will automatically add endpoints, or you can manually add them from [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/).

If you are uploading a schema via the API or Terraform, you must parse the schema and add your endpoints manually.

The API endpoint is the location where API calls or requests are fulfilled. API Shield defines endpoints as a host, method, and path tuple.

Note

To view the contents in your learned schema, refer to [Export a schema](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#export-a-schema) in Endpoint Management.

---

### Add validation by uploading a schema

* [  New dashboard ](#tab-panel-5437)
* [ Old dashboard ](#tab-panel-5438)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Select **Add validation**.
4. Upload a schema file.
5. Select **Add schema and endpoints**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to **Schema validation** and select **Add validation**.
4. Select your schema file for upload.
5. Observe the listed endpoints, their host, method, and path. Any new endpoints will automatically be added to Endpoint Management.
6. Choose an action for the non-compliant requests to your endpoints.
7. Select **Add schema and endpoints**.

Note

Changes may take a few minutes to process depending on the number of added endpoints.

### Add validation by applying a learned schema to a single endpoint

* [  New dashboard ](#tab-panel-5439)
* [ Old dashboard ](#tab-panel-5440)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Select **Add validation**.
4. Select **Apply learned schema**.
5. Choose an action and select **Apply schema**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to **Schema validation** and filter by the learned schema available.
4. Select **Apply learned schema**.
5. Choose an action and select **Apply schema**.

### Add validation by applying a learned schema to an entire hostname

At this time, learned schemas will not overwrite customer-uploaded schemas. If an endpoint is covered by a customer-uploaded schema and also appears in a learned schema, the **Changes** field is set to `Unaffected`.

* [  New dashboard ](#tab-panel-5441)
* [ Old dashboard ](#tab-panel-5442)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Select **Add validation**.
4. Select **Apply learned schema**.
5. Choose a hostname and review the endpoints that will be protected by the learned schema.
6. (Optional) Change the action if a request does not match the schema.
7. Select **Apply schema**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to **Schema validation** and select **Add validation**.
4. Select **Apply learned schema**.
5. Choose a hostname and review the endpoints that will be protected by the learned schema.
6. (Optional) Change the action if a request does not match the schema.
7. Select **Apply schema**.

Note

If an endpoint is currently protected by a learned schema, the date of the last applied learned schema will be shown in the current schema field.

### Add validation by adding a fallthrough rule

A fallthrough rule acts as a catch-all for requests that do not match endpoints in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/).

By ensuring that all your endpoints in a schema are added to Endpoint Management, the fallthrough action can protect you against legacy or zombie endpoints that your team may be unaware of.

To set up a fallthrough action:

* [  New dashboard ](#tab-panel-5455)
* [ Old dashboard ](#tab-panel-5456)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Templates**.
3. Search for the template named `Mitigate API requests to unidentified endpoints` and select **Preview template**.
4. Give your rule a descriptive name.
5. Choose one or more hostnames from the dropdown menu and select your action.
6. Select **Save as draft** to deploy later, or **Deploy** to deploy now.

Your current fallthrough rules can be viewed in the security rules list.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield**.
3. Under **Settings**, go to **Fallthrough settings**.
4. Select **Use Template**.
5. Choose one or more hostnames from the drop down menu. The fallthrough rule will act on all traffic that does not match an existing endpoint in Endpoint Management to the selected hostnames.
6. Select **Continue to custom rule**.
7. Name your rule and select your action.
8. Select **Save as draft** to deploy later, or **Deploy** to deploy now.

Your current fallthrough rules can be viewed in the custom rules list.

Note

You can use the `cf.api_gateway.fallthrough_detected` field in your own custom rule for a more customized logic check. This field evaluates as `true` when a request does not match an endpoint in Endpoint Management. Check against your API hostname or root path to ensure that you are not blocking non-API traffic on your zone.

### Change the action of an entire schema

* [  New dashboard ](#tab-panel-5443)
* [ Old dashboard ](#tab-panel-5444)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Check the multi-select box to select all endpoints associated with the schema.
4. Select **Change action**.
5. Choose an action from the dropdown menu.
6. Select **Set action**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to **Schema validation** and select the schema in the Schema list.
4. Check the multi-select box to select the endpoints shown on the current page.
5. Choose **Select all endpoints**.
6. Select **Change action**.
7. Choose an action from the dropdown menu.
8. Select **Set action**.

### Change the global default action of Schema validation

Schema validation’s default action is visible on the main Schema validation page. This action applies to any endpoint with its action set to `Default`.

* `Log` action: logs events to [Firewall Events](https://developers.cloudflare.com/firewall/).
* `Block` action: blocks requests that fail the schema for an endpoint and logs events to [Firewall Events](https://developers.cloudflare.com/firewall/).
* `None` action: non-compliant requests are neither logged nor blocked.

To change the default action:

* [  New dashboard ](#tab-panel-5445)
* [ Old dashboard ](#tab-panel-5446)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. Under **Schema validation** \> **Configurations**, select the edit icon next to **Default action**.
4. Choose a new action from the dropdown menu.
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield**.
3. Select **Schema validation**.
4. Under the default `Log` action, select **Change**.
5. Choose a new action from the dropdown menu.
6. Observe the current action and accept the change by selecting **Change default action** in the popup window.

Alternatively, you can modify the global action via **Security** \> **API Shield** \> **Settings**.

### Change the action of a single endpoint

You can change individual endpoint actions separately from the default action in Schema validation.

This allows you to be stricter on blocking non-compliant requests on certain endpoints when the default action is `Log`. It can also be used to relax constraints on non-compliant requests on certain endpoints when the default action is set to `Block`. You may want to silence known false positives on an endpoint by setting the action to `None`.

To change the action on an individual endpoint:

* [  New dashboard ](#tab-panel-5447)
* [ Old dashboard ](#tab-panel-5448)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Search for the endpoint to change.
4. Select the three dots on the endpoint's row > **Change action**.
5. Choose a new action from the dropdown menu and select **Set action**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield**.
3. Select **Schema validation** and filter the selected endpoint.
4. Select the ellipses on the endpoint's row.
5. Select **Change action**.
6. Choose a new action from the dropdown menu and select **Set action**.

### Disable Schema validation without changing actions

You can disable Schema validation entirely for temporary troubleshooting. You can override all actions at once, preventing Schema validation from taking any action while you complete your troubleshooting.

To disable Schema validation without changing actions:

* [  New dashboard ](#tab-panel-5449)
* [ Old dashboard ](#tab-panel-5450)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Select **Schema settings**.
4. Filter by **API abuse**.
5. Turn **Schema validation** off.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to the **Schema validation** settings.
4. Select **Disable**.

Your per-endpoint configurations will be saved when modifying the setting, so that you do not lose your configuration. To re-enable your configurations after troubleshooting, navigate back to the settings and select **Enable**.

### View active schemas

* [  New dashboard ](#tab-panel-5451)
* [ Old dashboard ](#tab-panel-5452)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Select **Schema settings**.
4. Filter by **API abuse**.
5. View your schemas on **Schema validation** \> **Active schemas**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to your **Schema validation** settings.
4. View your schemas under **Uploaded Schemas** and **Learned schemas**.
5. Select **Filter** on the endpoints in either schema.

Note

To export a schema, refer to [Export a schema](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#export-a-schema).

### Delete active schemas

Deleting the schema will remove validation from the currently associated endpoints, but it will not delete the endpoints from Endpoint Management.

To delete currently uploaded or learned schemas:

* [  New dashboard ](#tab-panel-5453)
* [ Old dashboard ](#tab-panel-5454)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Schema validation** tab.
3. Select **Schema settings**.
4. Filter by **API abuse**.
5. View your schemas on **Schema validation** \> **Active schemas**.
6. Select the ellipses to access the menu and download or delete the listed schema.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to your **Schema validation** settings.
4. View your schemas under **Uploaded Schemas** and **Learned schemas**.
5. Select the ellipses to access the menu and download or delete the listed schema.

---

## Specifications

Cloudflare currently only accepts [OpenAPI v3 schemas ↗](https://spec.openapis.org/oas/v3.0.3.html). The accepted file formats are YAML (`.yml` or `.yaml` file extension) and JSON (`.json` file extension).

OpenAPI schemas generated by different tooling may not be specific enough to import to Schema validation. Use a third-party tool such as [Swagger Editor ↗](https://swagger.io/tools/swagger-editor/) to ensure that schemas are compliant to the OpenAPI specification.

---

## Limitations

Cloudflare API Shield's Schema validation (importing) and [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/) (exporting) capabilities rely on the [OpenAPI Specification (OAS) v3.0 ↗](https://spec.openapis.org/oas/v3.0.3).

This support includes all patch versions, such as OAS v3.0.x. OAS v3.1 is not supported, and there are no plans to expand support for OpenAPI 2.0.

Note

Cloudflare recommends using a third-party tool like [Swagger Editor ↗](https://editor.swagger.io/) to ensure that all schemas are fully compliant with the OAS v3.0 specification before upload.

Currently, API Shield does not support some features of API schemas, including the following: all responses, external references, non-basic path templating, or unique items.

There is a limit of 10,000 total operations for enabled schemas for Enterprise customers subscribed to [API Shield](https://developers.cloudflare.com/api-shield/). To raise this limit, contact your account team.

### Body size for validation

Schema validation inspects request bodies up to a maximum size that depends on your zone plan. Request bodies that exceed this limit are not validated against your schema, and the configured [Schema validation action](https://developers.cloudflare.com/api-shield/security/schema-validation/#change-the-global-default-action-of-schema-validation) will not apply to those requests.

The default body size limits are:

| Plan       | Default body size limit |
| ---------- | ----------------------- |
| Free       | 1 KB                    |
| Pro        | 8 KB                    |
| Business   | 8 KB                    |
| Enterprise | 128 KB                  |

Note

This limit is separate from the [WAF maximum body inspection size](https://developers.cloudflare.com/waf/managed-rules/#maximum-body-size), which controls how much of the request payload the WAF scans. Increasing one does not affect the other.

#### Identify requests exceeding the body size limit

If Schema validation is blocking or logging requests due to the body size limit, you will see events in **Security** \> **Events** with the Schema validation rule as the source.

For limits on Free, Pro, Business, or Enterprise customers not subscribed to API Shield, refer to [Plans](https://developers.cloudflare.com/api-shield/plans/).

### Required fields

Although not strictly required by the OpenAPI specification, Schema validation strictly requires these fields.

#### `schema`

* [type ↗](https://spec.openapis.org/oas/v3.0.3#schema-object)  
   * All schemas require a type to be set. If the specific type is not supported by Schema validation, set the type to `string` instead.

#### `parameter`

* [schema ↗](https://spec.openapis.org/oas/v3.0.3#schema-object)  
   * Schema validation does not support the content field in parameters. For more details, refer to the [notes on validated and supported fields](#notes-on-validated-and-supported-fields) below. Instead, a schema is strictly required on all parameters objects.

### Notes on validated and supported fields

Refer to the information below for more details on Schema validation's current support for various OpenAPI specification (OAS) objects and fields.

#### `servers`

* [url ↗](https://spec.openapis.org/oas/v3.0.3#server-object)  
   * Schema validation does not support relative URLs.
* [variables ↗](https://spec.openapis.org/oas/v3.0.3#server-variable-object)  
   * Server variables are not validated.

#### `parameter`

* [style ↗](https://spec.openapis.org/oas/v3.0.3#parameter-object)  
   * Only the default values are supported: `"simple"` (path or header parameters) and `"form"` (query or cookie parameters).
* [explode ↗](https://spec.openapis.org/oas/v3.0.3#parameter-object)  
   * Only the default values are supported: `true` (for form) and `false` (for simple).
* [content ↗](https://spec.openapis.org/oas/v3.0.3#parameter-object)  
   * The content field is not supported in parameters. Use the schema field instead.
* [type ↗](https://spec.openapis.org/oas/v3.0.3#parameter-object)  
   * Cloudflare currently does not validate object type parameters.

#### `reference`

* [$ref ↗](https://spec.openapis.org/oas/v3.0.3#reference-object)  
   * External or relative references are not supported.

#### `requestBody`

* `content`  
   * [Request Body Object ↗](https://spec.openapis.org/oas/v3.0.3#request-body-object)  
   * [Media Type Object ↗](https://spec.openapis.org/oas/v3.0.3#media-type-object)  
         * Schema validation is able to validate `application/json` documents. If a given schema allows other content types, Schema validation will accept those requests without validation.

#### `parameter/schema`

* `anyOf`  
   * [Parameter Object ↗](https://spec.openapis.org/oas/v3.0.3#parameter-object)  
   * [Schema Object ↗](https://spec.openapis.org/oas/v3.0.3#schema-object)  
         * `anyOf` schemas are currently not supported in parameter schemas.

#### `schema`

* [format ↗](https://spec.openapis.org/oas/v3.0.3#schema-object)  
   * Validated formats:  
         * `date-time`  
         * `time`  
         * `date`  
         * `email`  
         * `hostname`  
         * `ipv4`  
         * `ipv6`  
         * `uri`  
         * `uri-reference`  
         * `iri`  
         * `iri-reference`  
         * `int32`  
         * `int64`  
         * `float`  
         * `double`  
         * `password`  
         * `uuid`  
         * `byte`  
         * `uint64`
* [uniqueItems ↗](https://spec.openapis.org/oas/v3.0.3#schema-object)  
   * This field is currently not validated by Schema validation.

---

## Body inspection

API Shield has the ability to identify body specifications contained in uploaded schemas and validate that the data of incoming API requests adheres to them.

Schema validation currently supports validating requests with content-type `application/json`.

Within the OpenAPI specification, request body schemas are associated to media-ranges (such as `application/*`, `application/xml` or `application/json`).

When Cloudflare validates incoming requests, Cloudflare checks that the request's `content-type` matches the OpenAPI-specified media-range.

For example, when the OpenAPI file specifies `application/*` as part of the request body content map, Cloudflare will accept requests with the content-types `application/xml` and `application/json`. However, only `application/json` bodies will be validated with the supplied schema.

Cloudflare recommends keeping the media-ranges as tight as possible by setting them to an individual media-type. If you need to support multiple content-types on an API endpoint, you can utilize wildcard media-ranges.

Care should also be taken if the origin is configured to perform [MIME sniffing ↗](https://mimesniff.spec.whatwg.org/). For example, when a request carrying a JSON body is deliberately carrying an `application/malicous` content-type and Cloudflare was configured to allow `application/*` media-ranges, the request would be passed along to the origin without validating the JSON body contents. However, an origin that ignores the content-type and either trial deserializes or sniffs the MIME type may deserialize the JSON body with a wrong assumption of having passed schema body validation.

As such, if you need to support `application/json` and `application/xml` on the same endpoint, you can use `application/*`. Cloudflare will validate the provided schema for request bodies where the content-type is set to `application/json`. Requests with content-type `application/xml` (and others matching `application/*`) will be let through. It is still strongly advised to disable content-type sniffing on your origin.

Cloudflare allows specifying the following media-ranges in the OpenAPI request body content map:

* `*/*`
* `application/*`
* `application/json`.

Media-ranges can also be configured to enforce a `charset` parameter. For this, Cloudflare only accepts the `charset` parameter with a static value of `utf-8` as part of the media-range specification and when configured, we will similarly require the request's content-type to carry this charset.

---

## Troubleshooting

This section addresses common issues you may encounter when using schema validation.

### `OneOf` constraint error schema violation in the Security Events

A `OneOf` constraint error means an API request failed schema validation because its body did not match exactly one of the options defined in a [oneOf ↗](https://swagger.io/docs/specification/v3%5F0/data-models/oneof-anyof-allof-not/) list within your uploaded schema.

The request was invalid for one of two reasons:

* **Matches Zero**: The payload did not correctly match any of the available subschemas. This is common when a discriminator field is set, but the payload is missing other required fields for that type.
* **Matches Multiple**: The payload was ambiguous and matched more than one subschema. This happens with generic schemas (for example, if a payload includes both an `email` and a `phone` field, it might match both an `email` and a `phone` schema definition, violating the "exactly one" rule).

To fix this, check the failing request body against the API schema definition. It will either be missing required fields for the intended type or include properties from multiple different, conflicting types that make it ambiguous.

---

## Availability

Schema validation is available for all customers. Refer to [Plans](https://developers.cloudflare.com/api-shield/plans/) for more information based on your plan type.

[Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/) is only available for customers subscribed to API Shield.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/schema-validation/","name":"Schema validation"}}]}
```
