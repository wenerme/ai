# Mobile push subscriptions API

REST API to register and unregister mobile devices for push notifications.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/248023) in GitLab 19.3 [with a flag](../administration/feature_flags/_index.md) named `mobile_push_registration_api`. Disabled by default.
- Notification delivery [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/248026) in GitLab 19.3 [with flags](../administration/feature_flags/_index.md) named `mobile_push_notifications_dispatch` and `mobile_push_notifications`. Disabled by default.
- Badge-only updates [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/263212) in GitLab 19.6 [with a flag](../administration/feature_flags/_index.md) named `mobile_push_badge_sync`. Disabled by default.
- `content_key` and encrypted push content [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/262797) in GitLab 19.7.
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
belongs to another user reassigns it to the authenticated user and discards
that user's `content_key` and `payload_mode`.

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
| `content_key`      | string | No       | A base64-encoded 32-byte AES key minted by the device. When stored, notifications for this device carry a generic alert and the content encrypted (AES-256-GCM) for the app's notification extension, so no title or body travels in clear text. Send it only when the response reports `content_key` as `missing`. |
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

| Attribute     | Type    | Description |
|---------------|---------|-------------|
| `id`          | integer | The ID of the subscription. |
| `created_at`  | string  | The date and time the subscription was created, in ISO 8601 format. |
| `content_key` | string  | `present` when a content key younger than 90 days is stored for this device, `missing` otherwise. A client sends a new key when it sees `missing`. |

Example response:

```json
{
  "id": 1,
  "created_at": "2026-07-30T18:15:31.189Z",
  "content_key": "missing"
}
```

## Encrypted content

For a subscription with a content key, the push payload's `gitlab` object is
`{"version": 1, "type": "todo", "content": {"alg": "A256GCM", "v": 2, "iat": <unix seconds>, "ciphertext": "<base64>"}}`.
`ciphertext` is the strict base64 encoding of the 12-byte nonce, the AES-256-GCM
ciphertext and the 16-byte tag, sealed with the additional authenticated data
`"gitlab-mobile-push/2\n<device token, lowercase hex>\n<iat>"`. The plaintext is a
JSON object with `title`, `subtitle`, `body`, `thread_id` and the `gitlab` object a
`full` payload carries. The device refuses an envelope whose `iat` is older than
3900 seconds.

### What the encryption protects

The content is encrypted between the GitLab instance and the device. The
instance holds the plaintext and the device's key, so this is not end-to-end
encryption:

- Protected: Apple Push Notification service, any relay between the instance
  and the device, and device-side logs of the push payload. None of them see
  to-do content.
- Not protected: the GitLab instance itself. Anyone with the database and its
  Active Record encryption secrets can recover every stored `content_key` and
  decrypt any captured payload.
- No forward secrecy: a device uses one key until it is replaced, so a leaked
  key opens every payload sealed under it.

### Key rotation

A device replaces its key whenever a registration answers `content_key` as
`missing`. The instance answers `missing` when no key is stored and when the
stored key is older than 90 days; a key older than 90 days still encrypts
pushes until the device replaces it. Re-sending a stored key does not renew it.

To force every device, or one user's devices, to register a new key, for
example after the instance's encryption secrets were exposed, run:

```shell
sudo gitlab-rake gitlab:mobile_push:clear_content_keys
sudo gitlab-rake "gitlab:mobile_push:clear_content_keys[username]"
```

Until a device registers again, its notifications use the `full` or `id_only`
payload.

Pushes sealed under the previous key can still be in flight for up to 3900
seconds after a rotation. The device keeps its previous key for that long and
tries it when the current key does not open an envelope; after that an
envelope sealed under the previous key shows the generic alert.

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
