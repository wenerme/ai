---
description: Send Cloudflare alerts to webhook endpoints.
title: Configure webhooks
image: https://developers.cloudflare.com/notifications/get-started/configure-webhooks/og.png?v=25c5ba60d0033c91
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure webhooks

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Webhooks let you deliver Cloudflare alerts to any service that accepts HTTP callbacks. You can connect to [popular services](#popular-webhook-services) like Slack, Google Chat, and PagerDuty, or configure a [generic webhook](#generic-webhooks) for any custom endpoint.

Note

Webhooks are available on all plans. Accounts without a paid zone can configure up to 100 webhook destinations.

## Create a webhook

1. In the Cloudflare dashboard, go to **Alerts** > **Destinations**. [Go to **Alerts** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. In the **Webhooks** card, select **Create**.
3. Give your webhook a name.
4. In the **URL** field, enter the webhook URL for the service you want to connect.
5. If needed, enter the **Secret**. Secrets vary by service — refer to [popular webhook services](#popular-webhook-services) for details.
6. Select **Save and Test** to finish setting up your webhook.

## Edit or delete a webhook

You can rename or delete existing webhooks.

1. In the Cloudflare dashboard, go to **Alerts** > **Destinations**. [Go to **Alerts** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. In the **Webhooks** card, select **Edit** on the webhook you want to modify.
3. Update the name and select **Save**, or select **Delete** to remove it.

## Firewall settings

Webhook alerts are sent from [Cloudflare's IP ranges ↗︎](https://www.cloudflare.com/ips/). If your webhook endpoint is protected by a firewall, you must allowlist these IP addresses to receive alerts.

To programmatically retrieve the current list of Cloudflare IP addresses, use the [Cloudflare API](https://developers.cloudflare.com/api/resources/cloudflare_ips/methods/list/).

Note

Cloudflare's IP ranges are shared across multiple services and may change over time. Periodically check the [IP list ↗︎](https://www.cloudflare.com/ips/) and update your firewall rules accordingly.

## Generic webhooks

If you use a service that is not covered by Cloudflare's currently available webhooks, you can [configure your own](#create-a-webhook), and enter a valid webhook URL.

It is always recommended to use a secret for generic webhooks. Cloudflare will send your secret in the `cf-webhook-auth` header of every request made. If this header is not present, or is not your specified value, you should reject the webhook.

When Cloudflare sends a webhook alert, the payload has the following schema:

*Example schemajson*

```json
{
	"text": "Hello World! This is a test message sent from https://cloudflare.com. If you can see this, your webhook is configured properly."
}
```

For the full payload structure and examples, refer to the [webhook payload schema reference](https://developers.cloudflare.com/notifications/reference/webhook-payload-schema/).

### Limitations of generic webhooks

Generic webhook alerts will only be dispatched to a publicly resolvable IP address on port 80 or 443.

If you want to receive alerts on a private IP address or different port, you can either receive and forward them using [Workers](https://developers.cloudflare.com/workers/) or set up a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to route to your connected application.

### Use generic webhooks with Workers

You can use Cloudflare Workers with a generic webhook to deliver alerts to any service that accepts webhooks.

Cloudflare has an [example tool ↗︎](https://github.com/cloudflare/cf-webhook-relay/) that shows how to use [Workers](https://developers.cloudflare.com/workers/) to transform a generic webhook payload for delivery to Rocket.Chat. The code is heavily commented to help you adapt it to your needs.

## Popular webhook services

### Google Chat

For [Google Chat ↗︎](https://developers.google.com/chat/how-tos/webhooks):

- **Secret**: The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.
- **URL**: URL varies depending on the Google Chat channel's address.

### Slack

For [Slack ↗︎](https://api.slack.com/messaging/webhooks):

- **Secret**: The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.
- **URL**: URL varies depending on the Slack channel's address.

### DataDog

For [DataDog ↗︎](https://docs.datadoghq.com/api/latest/events/#post-an-event):

- **Secret**: The secret is required and has to be entered by the user. This is what DataDog refers to as [API Key ↗︎](https://app.datadoghq.com/account/settings#api)
- **URL**: `https://api.datadoghq.com/api/v1/events`

### Discord

For [Discord ↗︎](https://discord.com/developers/docs/resources/webhook#execute-webhook):

- **Secret**: The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.
- **URL**: URL varies depending on the Discord channel's address.

### OpsGenie

For [OpsGenie ↗︎](https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration):

- **Secret**: The secret is the `API Key` for OpsGenie's REST API.
- **URL**: `https://api.opsgenie.com/v2/alerts`

### Splunk

For [Splunk ↗︎](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector):

- **Secret**: The secret is required and has to be entered by the user. This is what Splunk refers to as `token`. Refer to [Splunk’s documentation ↗︎](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#How_the_Splunk_platform_uses_HTTP_Event_Collector_tokens_to_get_data_in) for details.
- **URL**:
  1. We only support three Splunk endpoints: services/collector, services/collector/raw, and services/collector/event.
  2. If SSL is enabled on the token, the port must be 443. If SSL is not enabled on the token, the port must be 8088.
  3. SSL must be enabled on the server.
  4. **Enable indexer acknowledgement** must be disabled on the Splunk HTTP Event Collector.

### Feishu

For [Feishu ↗︎](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot):

- **Secret**: The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.
- **URL**: The URL varies depending on the Custom Robot.

### Teams

For [Teams ↗︎](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook):

- **Secret**: The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.
- **URL**: URL is provided by Teams when the Incoming Webhook connector is created.

### ServiceNow

For [ServiceNow ↗︎](https://docs.servicenow.com/bundle/tokyo-application-development/page/administer/integrationhub-store-spokes/task/govnotify-wbhk.html):

- **Secret**: User decides. Ensure that the secret entered in Cloudflare matches what is configured in ServiceNow. Refer to [ServiceNow's documentation ↗︎](https://docs.servicenow.com/bundle/washingtondc-integrate-applications/page/administer/integrationhub/concept/rest-trigger.html) for details.
- **URL**: `https://{servicenow_instance}.com/{base_api_path}`

### Generic webhook

For a Generic webhook:

- **Secret**: User decides.
- **URL**: User decides.

### Configuration of secrets

For Google Chat, Slack, Discord, and Feishu webhooks, the secret is embedded in the URL and extracted automatically. You can instead remove the secret from the URL and set it explicitly, which is useful when managing webhooks as infrastructure-as-code with Terraform.

*Terraform exampletf*

```tf
resource "cloudflare_notification_policy_webhooks" "example" {
  account_id = "<ACCOUNT_ID>"
  name       = "Slack Webhook"
  url        = "https://hooks.slack.com/services/T00000000/B00000000"
  secret     = "<secret>"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/get-started/configure-webhooks/#page","headline":"Configure webhooks","description":"Send Cloudflare alerts to webhook endpoints.","url":"https://developers.cloudflare.com/notifications/get-started/configure-webhooks/","inLanguage":"en","image":"https://developers.cloudflare.com/notifications/get-started/configure-webhooks/og.png?v=25c5ba60d0033c91","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
