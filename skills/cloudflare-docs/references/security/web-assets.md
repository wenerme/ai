---
title: Web assets
description: Discover web assets such as your API endpoints and instruct Cloudflare how to best protect them.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security/web-assets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Web assets

Discover web assets such as your API endpoints and instruct Cloudflare how to best protect them.

To access web assets in the new security dashboard, go to the **Web assets** page.

[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets) 

## Endpoints

Use the **Endpoints** tab to manage endpoints available on your domain and monitor their health.

You can save endpoints directly from [API Discovery](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-api-discovery), [manually](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-manually) by method, path, and host, or via [Schema Validation](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-schema-validation).

This will add the specified endpoints to your list of managed endpoints. You can view your list of managed endpoints in the **Endpoints** tab.

For saved endpoints:

* Cloudflare will start collecting [performance data](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#endpoint-analysis) per endpoint.
* You can use the [labeling service](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/) to organize your endpoints by use case.

For more information on how to manage your endpoints, refer to the following resources.

* [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/)
* [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/)
* [Endpoint Analysis](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#endpoint-analysis)

## Discovery

**Discovery** continuously finds your active API endpoints via path normalization.

[Add endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-api-discovery) to produce recommendations and analytics of your APIs. Your [session identifiers](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/) must match your API traffic. Otherwise, API endpoints are also discoverable via [Machine Learning](https://developers.cloudflare.com/api-shield/security/api-discovery/#machine-learning-based-discovery).

Note

**Discovery** is only available for Enterprise customers. If you are an Enterprise customer and interested in this product, contact your account team.

## Sequences

Use **Sequences** to discover how users interact with your API, by tracking the order of API session requests over time. Sequences will group and highlight popular user journeys across your API.

Once you configure [session identifiers](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/), the **Sequences** tab will start grouping and highlighting important user journeys (sequences) across your API.

To configure session identifiers:

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Next to **Session identifiers**, select **Configure session identifiers** .

For more information on how Cloudflare identifies API sequences and how you can configure API sequence rules, refer to the following resources:

* [Sequence analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/)
* [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/)

Note

The **Sequences** tab includes functionality available in [API Shield](https://developers.cloudflare.com/api-shield/) in the previous dashboard navigation structure.

## Schema validation

Use **Schema validation** to check if your incoming traffic complies with a previously supplied API Schema.

API Schemas are defined by the validity of the API request's properties such as target endpoint, path or query variable format, and HTTP method. A rule is created for incoming traffic and defines which traffic is allowed and which traffic is logged or blocked based on the API schema that you provide or select from the list of learned schemas.

You can add schema validation by:

* [Uploading a schema](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-uploading-a-schema)
* [Applying a learned schema to a single endpoint](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-a-single-endpoint)
* [Applying a learned schema to an entire hostname](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-an-entire-hostname)
* [Adding a fallthrough rule](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-adding-a-fallthrough-rule)

Note

The **Schema validation** tab includes functionality available in [API Shield](https://developers.cloudflare.com/api-shield/) in the previous dashboard navigation structure.

## Client-side resources

Use **Client-side resources** to [monitor scripts, connections, and cookies](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/) on your domain.

If you notice unexpected scripts or connections on the dashboard, check them for signs of malicious activity. You should also check for any new or unexpected cookies.

Customers with Client-Side Security Advanced will have their connections and scripts [classified as potentially malicious](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/) based on threat feeds.

Note

The **Client-side resources** tab includes functionality available in [client-side security](https://developers.cloudflare.com/client-side-security/) (formerly known as Page Shield) in the previous dashboard navigation structure.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/web-assets/","name":"Web assets"}}]}
```
