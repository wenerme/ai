---
title: Edit and delete waiting rooms
description: Edit or delete existing waiting rooms.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Edit and delete waiting rooms

You can manage your waiting rooms using the [Waiting Room dashboard](https://developers.cloudflare.com/waiting-room/how-to/waiting-room-dashboard/) or the [API](https://developers.cloudflare.com/waiting-room/reference/waiting-room-api/).

Note

For details about updating an active waiting room, refer to [Best practices](https://developers.cloudflare.com/waiting-room/reference/best-practices/).

## Use the dashboard

### Edit a waiting room

1. In your application, go to **Traffic** \> **Waiting Room**.
2. On a record, select **Edit**.
3. Select **Settings**.
4. Edit the settings. For a description of settings, refer to [Configuration settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/).
5. Select **Next**. If you have access to [customized templates](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room/), you could also adjust the template.
6. Once you get to **Review**, select **Save**.

### Delete a waiting room

1. In your application, go to **Traffic** \> **Waiting Room**.
2. On a record, select **Delete**.
3. Select **Delete** again.

## Use the API

### Edit a waiting room

[Replace ↗](https://api.cloudflare.com#waiting-room-update-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Waiting Rooms Write`

Update waiting room

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "webshop-waiting-room",

    "host": "example.com",

    "new_users_per_minute": 200,

    "total_active_users": 300

  }'


```

[Update ↗](https://api.cloudflare.com#waiting-room-patch-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Waiting Rooms Write`

Patch waiting room

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "webshop-waiting-room",

    "host": "example.com",

    "new_users_per_minute": 200,

    "total_active_users": 300

  }'


```

You only need to include the fields you want to update in the payload of the PATCH request.

### Delete a waiting room

Delete a waiting room by appending the following endpoint in the [Waiting Room API ↗](https://api.cloudflare.com#waiting-room-delete-waiting-room) to the Cloudflare API base URL.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Waiting Rooms Write`

Delete waiting room

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/waiting-room/how-to/edit-delete-waiting-room/","name":"Edit and delete waiting rooms"}}]}
```
