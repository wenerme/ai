---
description: Create a new waiting room in the dashboard or via API.
title: Create a waiting room
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waiting-room/llms.txt
> Use this file to discover all available pages before exploring further.

#  Create a waiting room

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/waiting-room/how-to/create-waiting-room/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can create a waiting room from the dashboard or via API.

Note

For additional context on creating a waiting room, refer to [Get started](https://developers.cloudflare.com/waiting-room/get-started/).

1. Within your application, go to **Traffic** \> **Waiting Room**.
2. Select **Create**.
3. Customize the [settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/) for your waiting room. For additional guidance refer to [Best practices](https://developers.cloudflare.com/waiting-room/reference/best-practices/).
4. Select **Next**.
5. In this section, you can choose whether to enable [Turnstile](https://developers.cloudflare.com/turnstile/) for your waiting room. If you select **Yes**, you will need to choose your [Widget mode](https://developers.cloudflare.com/turnstile/concepts/widget/) and define the action to take if a turnstile challenge fails. The available Widget modes and actions depend on your plan type. Refer to the [Plans](https://developers.cloudflare.com/waiting-room/plans/) for more details.
6. If you wish to [customize your waiting room](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room/), update the HTML and CSS as needed. If you are using this waiting room to manage traffic for your mobile app or API, enable the JSON response toggle. Make sure that you have set up a [JSON friendly response](https://developers.cloudflare.com/waiting-room/how-to/json-response/) for your client (mobile or web app).
7. Select the **Queuing status code** to determine the HTTP status code that is returned when a user is in the waiting room.
8. Select **Next**.
9. Review your settings before saving. If you customized your waiting room, make sure to [preview the result](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room/#preview-waiting-room).
10. Select **Save**. Your new waiting room will be enabled by default.

To create a Waiting Room using the API, send a [POST request](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/create/) to the `/zones/{zone_identifier}/waiting_rooms` endpoint:

* For parameter references, refer to [Configuration settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/)
* For authentication instructions, refer to [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).
* For help with endpoints and pagination, refer to [Make API calls](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Waiting Rooms Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "shop_waiting_room",
		"description": "Waiting room for webshop",
		"host": "shop.example.com",
		"path": "/shop",
		"queue_all": true,
		"new_users_per_minute": 200,
		"total_active_users": 300,
		"session_duration": 1,
		"disable_session_renewal": false,
		"json_response_enabled": false,
		"queueing_method": "fifo",
		"queueing_status_code": 202,
		"cookie_attributes": {
				"samesite": "auto",
				"secure": "auto"
		}
	}'
```

The response contains the complete definition of the newly created Waiting Room.

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": [
		{
			"id": "1111111111111111111111",
			"created_on": "2023-01-01T05:20:00.12345Z",
			"modified_on": "2023-01-01T05:20:00.12345Z",
			"name": "shop_waiting_room",
			"description": "Waiting room for webshop",
			"host": "shop.example.com",
			"path": "/shop",
			"queue_all": true,
			"new_users_per_minute": 200,
			"total_active_users": 300,
			"session_duration": 1,
			"disable_session_renewal": false,
			"json_response_enabled": false,
			"queueing_method": "fifo",
			"queueing_status_code": 202,
			"cookie_attributes": {
				"samesite": "auto",
				"secure": "auto"
			}
		}
	]
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waiting-room/how-to/create-waiting-room/#page","headline":"Create a waiting room · Cloudflare Waiting Room docs","description":"Create a new waiting room in the dashboard or via API.","url":"https://developers.cloudflare.com/waiting-room/how-to/create-waiting-room/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
