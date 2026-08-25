---
description: Build your first Gateway network policy.
title: Create your first network policy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Create your first network policy

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/create-policy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can control network-level traffic by filtering requests by selectors such as IP addresses and ports. You can also integrate network policies with an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) to apply identity-based filtering.

To create a new network policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **Network** tab, select **Add a network policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block.
5. Choose an **Action** to take when traffic matches the logical expression. For example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:

| Selector                     | Operator | Value                   | Logic | Action |
| ---------------------------- | -------- | ----------------------- | ----- | ------ |
| SNI Domain                   | is       | internalapp.com         | And   | Block  |
| Passed Device Posture Checks | not in   | _Device serial numbers_ |       |        |
6. Select **Create policy**.

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

| Type    | Item       | Permission |
| ------- | ---------- | ---------- |
| Account | Zero Trust | Edit       |
2. (Optional) Configure your API environment variables to include your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and API token.
3. Send a `POST` request to the [Create a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) endpoint. For example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Enforce device posture",
		"description": "Ensure only devices in Zero Trust organization can connect to application",
		"precedence": 0,
		"enabled": true,
		"action": "block",
		"filters": [
				"l4"
		],
		"traffic": "any(net.sni.domains[*] == \"internalapp.com\")",
		"identity": "",
		"device_posture": "not(any(device_posture.checks.passed[*] in {\"LIST_UUID\"}))"
	}'
```

```sh
{
	 "success": true,
	 "errors": [],
	 "messages": []
}
```

The API will respond with a summary of the policy and the result of your request.

For more information, refer to [network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/create-policy/#page","headline":"Create your first network policy · Cloudflare Learning Paths","description":"Build your first Gateway network policy.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/create-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
