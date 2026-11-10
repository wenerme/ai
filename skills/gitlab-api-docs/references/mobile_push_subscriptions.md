# Mobile push subscriptions API

REST API to register and unregister mobile devices for push notifications.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/248023) in GitLab 19.3 [with a flag](../administration/feature_flags/_index.md) named `mobile_push_registration_api`. Disabled by default.
- Notification delivery [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/248026) in GitLab 19.3 [with flags](../administration/feature_flags/_index.md) named `mobile_push_notifications_dispatch` and `mobile_push_notifications`. Disabled by default.
- Badge-only updates [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/263212) in GitLab 19.6 [with a flag](../administration/feature_flags/_index.md) named `mobile_push_badge_sync`. Disabled by default.
- Feature flag `mobile_push_notifications` [removed](https://gitlab.com/gitlab-org/gitlab/-/issues/607603) in GitLab 19.6.

Register mobile devices to receive push notifications for the authenticated
user's [to-do items](todos.md). Every push notification corresponds to a
to-do item.
Registering a device does not deliver notifications by itself: delivery is
enabled separately for the instance with the `mobile_push_notifications_dispatch`
feature flag.

Delivery can be limited to working hours through the
[user preferences API](users.md#update-your-user-preferences)
(`mobile_push_working_hours_*`). To-dos created outside the working hours are
not sent individually; one summary notification is sent to every registered
device when the working hours begin.

Every notification carries the user's pending to-do count as the app badge.
When the `mobile_push_badge_sync` feature flag is also enabled, a change to
that count that creates no to-do item (marking to-do items as done or
restoring them, snoozing them, or deleting their target) sends a badge-only
notification a few seconds later: no alert text and no sound, only the new
count. One badge-only notification is sent per user and change window, however
many to-do items the change affected.

## Register a device

Registers a device token for the authenticated user. This endpoint is an
idempotent upsert: registering an existing token again refreshes its
attributes and `last_seen_at` timestamp, so clients re-register on every
application start. Attributes omitted from the request keep their stored
values when the token is already registered. Registering a token that
belongs to another user reassigns it to the authenticated user.

Each user can register up to 20 devices. Subscriptions not seen for 90 days
are removed automatically.

```plaintext
POST /user/push_subscriptions
```

Supported attributes:

| Attribute          | Type   | Required | Description |
|--------------------|--------|----------|-------------|
| `device_token`     | string | Yes      | The hexadecimal APNs device token. |
| `platform`         | string | No       | The device platform. Either `ios` or `macos`. New registrations default to `ios`. |
| `apns_environment` | string | No       | The APNs environment the token was issued for: `production` or `sandbox`. Default: `production`. |
| `bundle_id`        | string | No       | The application bundle identifier. |
| `device_name`      | string | No       | A human-readable device name. |
| `app_version`      | string | No       | The installed application version. |
| `locale`           | string | No       | The device locale. |
| `payload_mode`     | string | No       | `full` sends notification content in the push payload. `id_only` sends only record identifiers, for content-free payloads. New registrations default to `full`. |
{.sortable}

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --data "device_token=abcdef0123456789abcdef0123456789" \
  --data "apns_environment=sandbox" \
  --url "https://gitlab.example.com/api/v4/user/push_subscriptions"
```

If successful, returns [`201`](rest/troubleshooting.md#status-codes) and the
following response attributes:

| Attribute    | Type    | Description |
|--------------|---------|-------------|
| `id`         | integer | The ID of the subscription. |
| `created_at` | string  | The date and time the subscription was created, in ISO 8601 format. |

Example response:

```json
{
  "id": 1,
  "created_at": "2026-07-30T18:15:31.189Z"
}
```

## Unregister a device

- [Changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/268455) in GitLab 19.6 to also delete subscriptions that other users registered for the device token.

Deletes every subscription for a device token, including subscriptions that other users registered.
For example, call this endpoint when a user signs out.
If a previous user's sign-out request did not reach GitLab, this call also stops that user's notifications on the device.
The token is passed in the request body rather than the URL so it does not appear in access logs.
Returns `204 No Content` on success and `404 Not Found` when no subscription exists for the token.

```plaintext
DELETE /user/push_subscriptions
```

Supported attributes:

| Attribute      | Type   | Required | Description |
|----------------|--------|----------|-------------|
| `device_token` | string | Yes      | The hexadecimal APNs device token. |

Example request:

```shell
curl --request DELETE \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --data "device_token=abcdef0123456789abcdef0123456789" \
  --url "https://gitlab.example.com/api/v4/user/push_subscriptions"
```
