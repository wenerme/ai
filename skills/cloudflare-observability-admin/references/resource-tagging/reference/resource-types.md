---
description: Resource types that support tagging and their required fields.
title: Supported resource types
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported resource types

Last updated Sep 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/resource-tagging/reference/resource-types/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Tagging API supports the following resource types across account-level and zone-level scopes.

## Account-level resources

Use `/accounts/{account_id}/tags` endpoints for these resource types.

| Resource type | Required extra fields | Description |
| --- | --- | --- |
| `account` | None | The Cloudflare account itself |
| `access_application` | None | Access application |
| `access_group` | None | Access group |
| `account_ruleset` | None | Account-level ruleset |
| `ai_gateway` | None | AI Gateway |
| `alerting_policy` | None | Notification policy |
| `alerting_webhook` | None | Notification webhook destination |
| `cloudflared_tunnel` | None | Cloudflare Tunnel |
| `d1_database` | None | D1 database |
| `durable_object_namespace` | None | Durable Objects namespace |
| `gateway_list` | None | Gateway list |
| `gateway_rule` | None | Gateway rule |
| `image` | None | Cloudflare Image |
| `infrastructure_target` | None | [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/) target |
| `kv_namespace` | None | Workers KV namespace |
| `load_balancer_monitor` | None | Load Balancer monitor |
| `load_balancer_pool` | None | Load Balancer pool |
| `pages_project` | None | Pages project |
| `queue` | None | Queue |
| `r2_bucket` | None | R2 bucket |
| `resource_share` | None | Resource share |
| `stream_live_input` | None | Stream live input |
| `stream_video` | None | Stream video |
| `vectorize_index` | None | Vectorize index |
| `worker` | None | Workers script |
| `worker_version` | `worker_id` | Specific version of a Worker |

## Zone-level resources

Use `/zones/{zone_id}/tags` endpoints for these resource types.

| Resource type | Required extra fields | Description |
| --- | --- | --- |
| `access_application_policy` | `access_application_id` | Access application policy |
| `api_gateway_operation` | None | API Gateway operation |
| `custom_certificate` | None | Custom SSL certificate |
| `custom_hostname` | None | Custom hostname (SSL for SaaS) |
| `dns_record` | None | DNS record |
| `healthcheck` | None | Health check |
| `load_balancer` | None | Load Balancer |
| `managed_client_certificate` | None | Managed client certificate (mTLS) |
| `worker_route` | None | Worker route |
| `zone` | None | DNS zone |
| `zone_ruleset` | None | Zone-level ruleset |

## Extra fields

Most resource types only require `resource_type` and `resource_id`. Two resource types require an additional field in both request bodies and query parameters.

### `worker_version`

Include the `worker_id` field:

```bash
# GET
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=worker_version&resource_id=$VERSION_ID&worker_id=$WORKER_ID" \
  -H "Authorization: Bearer $API_TOKEN"

# PUT
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "worker_version",
    "resource_id": "'"$VERSION_ID"'",
    "worker_id": "'"$WORKER_ID"'",
    "tags": {
      "version": "1.2.3",
      "environment": "staging"
    }
  }'
```

### `access_application_policy`

Include the `access_application_id` field:

```bash
# GET
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags?resource_type=access_application_policy&resource_id=$POLICY_ID&access_application_id=$APP_ID" \
  -H "Authorization: Bearer $API_TOKEN"

# PUT
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "access_application_policy",
    "resource_id": "'"$POLICY_ID"'",
    "access_application_id": "'"$APP_ID"'",
    "tags": {
      "sensitivity": "high",
      "team": "security"
    }
  }'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/resource-tagging/reference/resource-types/#page","headline":"Supported resource types","description":"Resource types that support tagging and their required fields.","url":"https://developers.cloudflare.com/resource-tagging/reference/resource-types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
