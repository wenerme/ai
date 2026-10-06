---
description: Configure CASB webhooks to send posture finding instances from Cloudflare One to external HTTPS endpoints.
title: Webhooks
image: https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/og.png?v=46cd1f1731e2df87
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhooks

Last updated Oct 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Availability

Requires Cloudflare CASB.

To send a live finding instance to a webhook, you must be able to view posture finding instance details in Cloudflare One.

Use CASB webhooks to send posture finding instances from Cloudflare One to external systems such as chat platforms, ticketing systems, SIEMs, SOAR tools, and custom automation services.

After you configure a webhook destination, you can test delivery from the **Webhooks** page and send posture finding instances directly from the finding details workflow.

## Prerequisites

- You have access to Cloudflare One.
- You have a public HTTPS endpoint that can receive `POST` requests.
- You have any authentication values required by your destination, such as a bearer token, Basic auth credentials, static headers, or an HMAC signing secret.

## Create a webhook

1. In [Cloudflare One ↗︎](https://one.dash.cloudflare.com), go to **Integrations** > **Webhooks**.
2. Select **Create webhook**.
3. Enter a **Name** for the webhook.
4. Enter the **Destination URL** for the system that will receive webhook requests.
5. Choose an **Authentication method**.
6. Enter the required credentials, headers, or signing secret.
7. (Optional) Select **Test delivery** to validate the destination before saving.
8. Select **Save**.

Make a `POST` request to the [Create a webhook](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/webhooks/methods/create/) endpoint:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Create a new webhook configurationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/webhooks" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"label": "Send to SIEM",
		"destination_url": "https://example.com/webhook",
		"authentication_type": "Bearer Auth",
		"headers": [
				{
						"key": "Authorization",
						"value": "Bearer <TOKEN>"
				}
		]
	}'
```

1. Add the following permission to your [`cloudflare_api_token` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api_token):
   - `Zero Trust Write`
2. Create a webhook using the [`cloudflare_zero_trust_casb_webhook` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_casb_webhook) resource:

   ```tf
   variable "siem_token" {
     type      = string
     sensitive = true
   }

   resource "cloudflare_zero_trust_casb_webhook" "siem" {
     account_id          = var.cloudflare_account_id
     label               = "Send to SIEM"
     destination_url     = "https://example.com/webhook"
     authentication_type = "Bearer Auth"
     headers = [{
       key   = "Authorization"
       value = "Bearer ${var.siem_token}"
     }]
   }
   ```

   For HMAC signing, set `authentication_type = "HMAC-Signing"` and provide `signing_secret` instead of `headers`.

Cloudflare only accepts destination URLs that use `https://` and are publicly reachable. URLs that resolve to localhost, loopback, private, or other reserved addresses are rejected.

## Authentication methods

CASB webhooks support the following authentication methods:

- **None**: Use this option if your destination does not require authentication.
- **Basic Auth**: Use this option when your destination expects HTTP Basic authentication. Requires an `Authorization` header with a value that starts with `Basic` .
- **Bearer Auth**: Use this option when your destination expects a bearer token. Requires an `Authorization` header with a value that starts with `Bearer` .
- **Static Headers**: Use this option when your destination requires one or more fixed custom headers. Requires at least one header. Header names must be unique.
- **HMAC-Signing**: Use this option when your destination validates signed requests. Requires a `signing_secret`.

## Test delivery

Use **Test delivery** to send a test request to the configured destination before saving a new webhook or after updating an existing webhook.

A successful test indicates that Cloudflare reached the destination URL and that the destination returned a response.

Test delivery does not send a live finding instance from your environment.

## Edit, turn off, or delete a webhook

To update an existing webhook:

1. In [Cloudflare One ↗︎](https://one.dash.cloudflare.com), go to **Integrations** > **Webhooks**.
2. Select the webhook you want to update.
3. Modify the webhook configuration.
4. Select **Save**.

To turn a webhook off or on, use the status toggle on the **Webhooks** page.

To delete a webhook, open the webhook menu and select **Delete**.

To update a webhook, make a `PUT` request to the [Update a webhook](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/webhooks/methods/update/) endpoint with `label`, `destination_url`, `authentication_type`, and `status`. The request replaces the existing configuration, so include every header you want to keep. To keep a stored header value, send its `key` without a `value`.

For example, the following request turns a webhook off by setting `status` to `disabled`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Update an existing webhook configurationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/webhooks/$WEBHOOK_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"label": "Send to SIEM",
		"destination_url": "https://example.com/webhook",
		"authentication_type": "Bearer Auth",
		"headers": [
				{
						"key": "Authorization"
				}
		],
		"status": "disabled"
	}'
```

To delete a webhook, make a `DELETE` request to the [Delete a webhook](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/webhooks/methods/delete/) endpoint:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Delete a webhook configurationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/webhooks/$WEBHOOK_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To update a webhook, change its attributes and run `terraform apply`. To turn the webhook off, set `status = "disabled"`.

To delete a webhook, remove the resource from your configuration and run `terraform apply`, or target the resource for destruction:

```sh
terraform destroy -target=cloudflare_zero_trust_casb_webhook.siem
```

When you edit an existing webhook, Cloudflare does not display saved header values or signing secrets. To replace a stored value, enter a new value and save the webhook again.

## Manage existing webhooks with Terraform

### Import a webhook

To bring a webhook created in the dashboard or API under Terraform management, import it using your account ID and the webhook ID:

```sh
terraform import cloudflare_zero_trust_casb_webhook.siem '<ACCOUNT_ID>/<WEBHOOK_ID>'
```

Cloudflare does not return header values or signing secrets. After you import a webhook, set these values in your configuration so that Terraform can manage them.

### Look up webhooks

Use the [`cloudflare_zero_trust_casb_webhook` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/data-sources/zero_trust_casb_webhook) data source to read a single webhook, or [`cloudflare_zero_trust_casb_webhooks` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/data-sources/zero_trust_casb_webhooks) to list all webhooks in an account:

```tf
data "cloudflare_zero_trust_casb_webhook" "siem" {
	account_id = var.cloudflare_account_id
	webhook_id = "<WEBHOOK_ID>"
}

data "cloudflare_zero_trust_casb_webhooks" "all" {
	account_id = var.cloudflare_account_id
}
```

## Send a posture finding instance to a webhook

After you configure one or more webhook destinations, you can send posture finding instances directly from the findings workflow.

1. In [Cloudflare One ↗︎](https://one.dash.cloudflare.com), go to **Cloud & SaaS findings** > **Posture Findings**.
2. Choose **SaaS** or **Cloud**.
3. Choose the finding you want to review, then select **Manage**.
4. Select an instance.
5. In the instance details panel, select **Send webhook**.
6. Choose the webhook destination or destinations you want to use.
7. Select **Send webhooks**.

Cloudflare queues webhook sends in the background. A success message means that Cloudflare accepted the request for delivery.

For more information on finding workflows, refer to [Manage findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/).

To automatically send a webhook for matching findings without sending each one manually, refer to [Remediation Policies](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/policies/).

## Payload format

CASB sends a JSON payload that describes the posture finding instance.

Webhook payloads include event metadata, finding details, asset details, and any additional metadata associated with the finding instance. The exact contents vary by integration and finding type.

Webhook payloads include a top-level `id`, `type`, `metadata`, and `data` object.

Depending on the finding, the `metadata` object can include event details such as the actor, destination, send time, and payload version.

The `data` object can include finding details, asset details, and additional metadata associated with the finding instance.

If your downstream system expects a custom schema, send the webhook to an intermediary service or workflow engine that transforms the payload before forwarding it to the final destination.

## Limitations

- CASB webhooks support posture finding instances only.
- CASB webhooks do not send content findings.
- Test delivery sends a test request, but does not send a live finding instance.

## Troubleshooting

If a webhook test or delivery fails:

- Verify that the destination URL uses `https://`.
- Verify that the destination is publicly reachable.
- Confirm that your authentication values, headers, and signing secret are correct.
- If the dashboard reports success but the destination does not process the event immediately, remember that finding instance sends are queued in the background.

For more information, refer to [CASB troubleshooting](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/casb/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/#page","headline":"Webhooks","description":"Configure CASB webhooks to send posture finding instances from Cloudflare One to external HTTPS endpoints.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/og.png?v=46cd1f1731e2df87","dateModified":"2026-10-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
