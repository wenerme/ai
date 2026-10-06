---
description: Automatically remediate finding instances or send webhooks with CASB policies in Cloudflare One.
title: Remediation Policies
image: https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/policies/og.png?v=8c92cb64c5c7deaf
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Remediation Policies

Last updated Oct 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/policies/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Availability

Requires a paid Cloudflare CASB plan. Remediation Policies are not available for free CASB integrations.

Use CASB policies to automatically remediate a finding instance or send a webhook as soon as CASB detects it. A policy defines the vendor, integrations, finding type match, and action Cloudflare should take. For definitions of finding types and instances, refer to [Finding terminology](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/#finding-terminology).

Policies build on [manual remediation](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-findings) and [CASB webhooks](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/). Instead of each finding instance needing to be actioned manually, a configured policy automatically triggers action on all newly discovered matching finding instances.

## Prerequisites

- A configured [Cloud or SaaS integration](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/).
- [Read-Write permissions](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#configure-remediation-permissions) on the integration, required for remediation actions.
- A [configured webhook destination](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/#create-a-webhook), required for webhook actions.

## How policies work

When CASB detects a finding instance, it checks whether the instance matches a customer-configured policy. If a policy matches, Cloudflare runs the action configured in the policy against that instance automatically.

A policy can run a remediation action, send a webhook, or both.

## Find the IDs for a policy

When you create a policy with the API or Terraform, you reference other objects by ID:

- **Finding type ID**: Use the [List finding types](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/finding_types/methods/list/) endpoint.
- **Remediation type ID**: Use the [List remediation types](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/finding_types/subresources/remediation_types/methods/list/) endpoint for the finding type. Only [some finding types](#run-remediations) support remediation.
- **Webhook ID**: Use the ID of a [configured webhook](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/#create-a-webhook). In Terraform, reference the `id` of a `cloudflare_zero_trust_casb_webhook` resource or data source.
- **Integration IDs**: Required only when the policy does not apply to all integrations. Use the [List integrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/integrations/methods/list/) endpoint.

## Create a policy

1. In [Cloudflare One ↗︎](https://one.dash.cloudflare.com), go to **Cloud & SaaS findings** > **Policies**.
2. Select **Create a policy**.
3. Under **Basic information**, enter a **Policy name**. Optionally, enter a **Description**.
4. Under **Choose how you want to trigger the policy**, select a **Vendor**.
5. Select one or more **Integrations**, or select **Apply to all integrations** to apply the policy to every integration for the vendor.
6. Select a **Finding type**. Only finding types available for the selected vendor and integrations appear here.
7. Under **Define what to do with findings that match your trigger**, choose one or both actions:
   - **Run Remediation** to have Cloudflare perform a first-party remediation action against the SaaS integration API. This option is only available for select finding types.
   - **Send webhooks** to send a notification to one or more webhook destinations.
8. Under **Status**, turn on **Enable policy**.
9. Select **Create policy**.

Make a `POST` request to the [Create a policy](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/create/) endpoint. A policy must include at least one action, and can include at most one remediation:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Create a new policy configurationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/policies" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"display_name": "Auto-remediate public files",
		"description": "Remove public access and notify the SIEM",
		"enabled": true,
		"applies_to_all_integrations": true,
		"finding_type_id": "<FINDING_TYPE_ID>",
		"actions": {
				"remediation_types": [
						{
								"remediation_type_id": "<REMEDIATION_TYPE_ID>"
						}
				],
				"webhook_configs": [
						{
								"webhook_config_id": "<WEBHOOK_ID>"
						}
				]
		}
	}'
```

To limit the policy to specific integrations, set `applies_to_all_integrations` to `false` and provide an `integration_ids` array of [integration IDs](#find-the-ids-for-a-policy).

1. Add the following permission to your [`cloudflare_api_token` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api_token):
   - `Zero Trust Write`
2. Create a policy using the [`cloudflare_zero_trust_casb_policy` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_casb_policy) resource. The following example remediates matching findings and sends them to the `siem` webhook from [Create a webhook](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/#create-a-webhook). If you manage the webhook outside Terraform, use its ID or the `cloudflare_zero_trust_casb_webhook` data source instead:

   ```tf
   resource "cloudflare_zero_trust_casb_policy" "public_files" {
     account_id                  = var.cloudflare_account_id
     display_name                = "Auto-remediate public files"
     description                 = "Remove public access and notify the SIEM"
     enabled                     = true
     applies_to_all_integrations = true
     finding_type_id             = "<FINDING_TYPE_ID>"

     actions = {
       remediation_types = [{
         remediation_type_id = "<REMEDIATION_TYPE_ID>"
       }]
       webhook_configs = [{
         webhook_config_id = cloudflare_zero_trust_casb_webhook.siem.id
       }]
     }
   }
   ```

   To limit the policy to specific integrations, set `applies_to_all_integrations = false` and list the [integration IDs](#find-the-ids-for-a-policy):

   ```tf
     applies_to_all_integrations = false
     integration_ids             = ["<INTEGRATION_ID_1>", "<INTEGRATION_ID_2>"]
   ```

   Terraform reports an error at `terraform plan` if `applies_to_all_integrations` is `false` and `integration_ids` is empty.

Policies will be in effect for all newly discovered finding instances going forward. New or updated policies are not applied retroactively to existing finding instances.

CASB policies appear in a list showing each policy's name, integration, finding type, webhook, remediation action, status, and the time it last ran.

### Run remediations

Remediation actions perform a first-party fix directly against the integration's API, such as revoking a public file share.

CASB currently supports remediation actions for Microsoft 365 and Google Workspace file and folder finding types. If a finding type does not support remediation, **Run Remediation** displays **No automated remediation available for this finding type** and cannot be enabled.

<details>

<summary>

Supported finding types for remediation

</summary>

**Google Workspace:**

- File publicly accessible with edit access
- File publicly accessible with view access
- File shared outside company with edit access
- File shared outside company with view access
- File shared company-wide with edit access
- File shared company-wide with view access
- File publicly accessible with edit access with DLP Profile match
- File publicly accessible with view access with DLP Profile match
- File shared outside company with edit access with DLP Profile match
- File shared outside company with view access with DLP Profile match
- File shared company-wide with edit access with DLP Profile match
- File shared company-wide with view access with DLP Profile match

**Microsoft 365:**

- File publicly accessible with edit access
- File publicly accessible with view access
- File shared company-wide with edit access
- File shared company-wide with view access
- File publicly accessible with edit access with DLP Profile match
- File publicly accessible with view access with DLP Profile match
- File shared company-wide with edit access with DLP Profile match
- File shared company-wide with view access with DLP Profile match

</details>

Remediation requires [Read-Write permissions](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#configure-remediation-permissions) on the integration. If the integration only has Read permissions, upgrade the integration before the policy can remediate matching finding instances.

For more information, refer to [Manage remediated findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#manage-remediated-findings).

### Send webhooks

Webhook actions send the finding instance to a previously configured webhook destination. Use this to route finding instances to systems such as Slack, Microsoft Teams, Jira, ServiceNow, Tines, or a custom HTTPS endpoint.

When a policy sends a webhook, the payload uses the same format as a webhook sent manually from a finding instance. For the payload structure and field descriptions, refer to [Payload format](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/#payload-format).

## Edit, turn off, or delete a policy

1. In [Cloudflare One ↗︎](https://one.dash.cloudflare.com), go to **Cloud & SaaS findings** > **Policies**.
2. Select the policy to update.
3. Modify the policy's basic information, trigger, or actions.
4. Select **Save changes**.

To turn a policy on or off, use the **Enable policy** toggle under **Status**. Each policy displays its status as **Enabled** or **Disabled** in the policy list. A disabled policy stops matching new finding instances until you turn it on again.

To delete a policy, open the policy and select **Delete**.

To update a policy, make a `PUT` request to the [Update a policy](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/update/) endpoint. Include `display_name`, `enabled`, `applies_to_all_integrations`, and `actions`. The request replaces the existing policy, so include every action you want to keep. To turn the policy off, set `enabled` to `false`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Update a policy configurationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/policies/$POLICY_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"display_name": "Auto-remediate public files",
		"enabled": false,
		"applies_to_all_integrations": true,
		"actions": {
				"webhook_configs": [
						{
								"webhook_config_id": "<WEBHOOK_ID>"
						}
				]
		}
	}'
```

You cannot change a policy's finding type. To use a different finding type, create a new policy.

To delete a policy, make a `DELETE` request to the [Delete a policy](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/delete/) endpoint:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Delete a policy configurationbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/policies/$POLICY_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To update a policy, change its attributes and run `terraform apply`. To turn the policy off, set `enabled = false`.

Changing `finding_type_id` replaces the policy: Terraform deletes the existing policy and creates a new one.

To delete a policy, remove the resource from your configuration and run `terraform apply`, or target the resource for destruction:

```sh
terraform destroy -target=cloudflare_zero_trust_casb_policy.public_files
```

## Manage existing policies with Terraform

### Import a policy

To bring a policy created in the dashboard or API under Terraform management, import it using your account ID and the policy ID:

```sh
terraform import cloudflare_zero_trust_casb_policy.public_files '<ACCOUNT_ID>/<POLICY_ID>'
```

### Look up policies

Use the [`cloudflare_zero_trust_casb_policy` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/data-sources/zero_trust_casb_policy) data source to read a single policy, or [`cloudflare_zero_trust_casb_policies` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/data-sources/zero_trust_casb_policies) to list all policies in an account:

```tf
data "cloudflare_zero_trust_casb_policy" "public_files" {
  account_id = var.cloudflare_account_id
  policy_id  = "<POLICY_ID>"
}

data "cloudflare_zero_trust_casb_policies" "all" {
  account_id = var.cloudflare_account_id
}
```

## Logs

Every policy produces two categories of logs, available under **Insights** in Cloudflare One:

- **Admin Activity logs** record changes to a policy definition, including who created, edited, or disabled the policy, and when.
- **Cloud & SaaS Security policies logs** record the runtime outcome of each policy invocation, including the finding instance that triggered the policy, the asset acted on, whether the action succeeded or failed, and the error returned by the vendor if it failed (for example, a `401 Unauthorized` response or a rate limit error).

For compliance reporting, the Cloud & SaaS Security policies log ties a specific finding instance to a specific automated action and timestamp.

For more information, refer to [Cloudflare One Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/).

## Limitations

- Remediation actions in a policy are only available for Microsoft 365 and Google Workspace file and folder finding types.
- CASB cannot remove permissions inherited from a parent resource by remediating the affected child. For vendor-specific behavior and manual remediation steps, refer to [Remediate inherited file permissions](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-inherited-file-permissions).
- A policy only applies to new instances of a finding type detected after the policy is created.

## Troubleshooting

For help diagnosing issues, refer to [CASB troubleshooting](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/casb/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/policies/#page","headline":"Remediation Policies","description":"Automatically remediate finding instances or send webhooks with CASB policies in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/policies/og.png?v=8c92cb64c5c7deaf","dateModified":"2026-10-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
```
