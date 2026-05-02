# Audit Logs

## List audit logs

**get** `/organization/audit_logs`

List user actions and configuration changes within this organization.

### Query Parameters

- `actor_emails: optional array of string`

  Return only events performed by users with these emails.

- `actor_ids: optional array of string`

  Return only events performed by these actors. Can be a user ID, a service account ID, or an api key tracking ID.

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `effective_at: optional object { gt, gte, lt, lte }`

  Return only events whose `effective_at` (Unix seconds) is in this range.

  - `gt: optional number`

    Return only events whose `effective_at` (Unix seconds) is greater than this value.

  - `gte: optional number`

    Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.

  - `lt: optional number`

    Return only events whose `effective_at` (Unix seconds) is less than this value.

  - `lte: optional number`

    Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.

- `event_types: optional array of "api_key.created" or "api_key.updated" or "api_key.deleted" or 48 more`

  Return only events with a `type` in one of these values. For example, `project.created`. For all options, see the documentation for the [audit log object](/docs/api-reference/audit-logs/object).

  - `"api_key.created"`

  - `"api_key.updated"`

  - `"api_key.deleted"`

  - `"certificate.created"`

  - `"certificate.updated"`

  - `"certificate.deleted"`

  - `"certificates.activated"`

  - `"certificates.deactivated"`

  - `"checkpoint.permission.created"`

  - `"checkpoint.permission.deleted"`

  - `"external_key.registered"`

  - `"external_key.removed"`

  - `"group.created"`

  - `"group.updated"`

  - `"group.deleted"`

  - `"invite.sent"`

  - `"invite.accepted"`

  - `"invite.deleted"`

  - `"ip_allowlist.created"`

  - `"ip_allowlist.updated"`

  - `"ip_allowlist.deleted"`

  - `"ip_allowlist.config.activated"`

  - `"ip_allowlist.config.deactivated"`

  - `"login.succeeded"`

  - `"login.failed"`

  - `"logout.succeeded"`

  - `"logout.failed"`

  - `"organization.updated"`

  - `"project.created"`

  - `"project.updated"`

  - `"project.archived"`

  - `"project.deleted"`

  - `"rate_limit.updated"`

  - `"rate_limit.deleted"`

  - `"resource.deleted"`

  - `"tunnel.created"`

  - `"tunnel.updated"`

  - `"tunnel.deleted"`

  - `"role.created"`

  - `"role.updated"`

  - `"role.deleted"`

  - `"role.assignment.created"`

  - `"role.assignment.deleted"`

  - `"scim.enabled"`

  - `"scim.disabled"`

  - `"service_account.created"`

  - `"service_account.updated"`

  - `"service_account.deleted"`

  - `"user.added"`

  - `"user.updated"`

  - `"user.deleted"`

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `project_ids: optional array of string`

  Return only events for these projects.

- `resource_ids: optional array of string`

  Return only events performed on these targets. For example, a project ID updated.

### Returns

- `data: array of object { id, effective_at, type, 49 more }`

  - `id: string`

    The ID of this log.

  - `effective_at: number`

    The Unix timestamp (in seconds) of the event.

  - `type: "api_key.created" or "api_key.updated" or "api_key.deleted" or 48 more`

    The event type.

    - `"api_key.created"`

    - `"api_key.updated"`

    - `"api_key.deleted"`

    - `"certificate.created"`

    - `"certificate.updated"`

    - `"certificate.deleted"`

    - `"certificates.activated"`

    - `"certificates.deactivated"`

    - `"checkpoint.permission.created"`

    - `"checkpoint.permission.deleted"`

    - `"external_key.registered"`

    - `"external_key.removed"`

    - `"group.created"`

    - `"group.updated"`

    - `"group.deleted"`

    - `"invite.sent"`

    - `"invite.accepted"`

    - `"invite.deleted"`

    - `"ip_allowlist.created"`

    - `"ip_allowlist.updated"`

    - `"ip_allowlist.deleted"`

    - `"ip_allowlist.config.activated"`

    - `"ip_allowlist.config.deactivated"`

    - `"login.succeeded"`

    - `"login.failed"`

    - `"logout.succeeded"`

    - `"logout.failed"`

    - `"organization.updated"`

    - `"project.created"`

    - `"project.updated"`

    - `"project.archived"`

    - `"project.deleted"`

    - `"rate_limit.updated"`

    - `"rate_limit.deleted"`

    - `"resource.deleted"`

    - `"tunnel.created"`

    - `"tunnel.updated"`

    - `"tunnel.deleted"`

    - `"role.created"`

    - `"role.updated"`

    - `"role.deleted"`

    - `"role.assignment.created"`

    - `"role.assignment.deleted"`

    - `"scim.enabled"`

    - `"scim.disabled"`

    - `"service_account.created"`

    - `"service_account.updated"`

    - `"service_account.deleted"`

    - `"user.added"`

    - `"user.updated"`

    - `"user.deleted"`

  - `actor: optional object { api_key, session, type }`

    The actor who performed the audit logged action.

    - `api_key: optional object { id, service_account, type, user }`

      The API Key used to perform the audit logged action.

      - `id: optional string`

        The tracking id of the API key.

      - `service_account: optional object { id }`

        The service account that performed the audit logged action.

        - `id: optional string`

          The service account id.

      - `type: optional "user" or "service_account"`

        The type of API key. Can be either `user` or `service_account`.

        - `"user"`

        - `"service_account"`

      - `user: optional object { id, email }`

        The user who performed the audit logged action.

        - `id: optional string`

          The user id.

        - `email: optional string`

          The user email.

    - `session: optional object { ip_address, user }`

      The session in which the audit logged action was performed.

      - `ip_address: optional string`

        The IP address from which the action was performed.

      - `user: optional object { id, email }`

        The user who performed the audit logged action.

        - `id: optional string`

          The user id.

        - `email: optional string`

          The user email.

    - `type: optional "session" or "api_key"`

      The type of actor. Is either `session` or `api_key`.

      - `"session"`

      - `"api_key"`

  - `"api_key.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The tracking ID of the API key.

    - `data: optional object { scopes }`

      The payload used to create the API key.

      - `scopes: optional array of string`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"api_key.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The tracking ID of the API key.

  - `"api_key.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The tracking ID of the API key.

    - `changes_requested: optional object { scopes }`

      The payload used to update the API key.

      - `scopes: optional array of string`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"certificate.created": optional object { id, name }`

    The details for events with this `type`.

    - `id: optional string`

      The certificate ID.

    - `name: optional string`

      The name of the certificate.

  - `"certificate.deleted": optional object { id, certificate, name }`

    The details for events with this `type`.

    - `id: optional string`

      The certificate ID.

    - `certificate: optional string`

      The certificate content in PEM format.

    - `name: optional string`

      The name of the certificate.

  - `"certificate.updated": optional object { id, name }`

    The details for events with this `type`.

    - `id: optional string`

      The certificate ID.

    - `name: optional string`

      The name of the certificate.

  - `"certificates.activated": optional object { certificates }`

    The details for events with this `type`.

    - `certificates: optional array of object { id, name }`

      - `id: optional string`

        The certificate ID.

      - `name: optional string`

        The name of the certificate.

  - `"certificates.deactivated": optional object { certificates }`

    The details for events with this `type`.

    - `certificates: optional array of object { id, name }`

      - `id: optional string`

        The certificate ID.

      - `name: optional string`

        The name of the certificate.

  - `"checkpoint.permission.created": optional object { id, data }`

    The project and fine-tuned model checkpoint that the checkpoint permission was created for.

    - `id: optional string`

      The ID of the checkpoint permission.

    - `data: optional object { fine_tuned_model_checkpoint, project_id }`

      The payload used to create the checkpoint permission.

      - `fine_tuned_model_checkpoint: optional string`

        The ID of the fine-tuned model checkpoint.

      - `project_id: optional string`

        The ID of the project that the checkpoint permission was created for.

  - `"checkpoint.permission.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the checkpoint permission.

  - `"external_key.registered": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the external key configuration.

    - `data: optional unknown`

      The configuration for the external key.

  - `"external_key.removed": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the external key configuration.

  - `"group.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the group.

    - `data: optional object { group_name }`

      Information about the created group.

      - `group_name: optional string`

        The group name.

  - `"group.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the group.

  - `"group.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the group.

    - `changes_requested: optional object { group_name }`

      The payload used to update the group.

      - `group_name: optional string`

        The updated group name.

  - `"invite.accepted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the invite.

  - `"invite.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the invite.

  - `"invite.sent": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the invite.

    - `data: optional object { email, role }`

      The payload used to create the invite.

      - `email: optional string`

        The email invited to the organization.

      - `role: optional string`

        The role the email was invited to be. Is either `owner` or `member`.

  - `"ip_allowlist.config.activated": optional object { configs }`

    The details for events with this `type`.

    - `configs: optional array of object { id, name }`

      The configurations that were activated.

      - `id: optional string`

        The ID of the IP allowlist configuration.

      - `name: optional string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.config.deactivated": optional object { configs }`

    The details for events with this `type`.

    - `configs: optional array of object { id, name }`

      The configurations that were deactivated.

      - `id: optional string`

        The ID of the IP allowlist configuration.

      - `name: optional string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.created": optional object { id, allowed_ips, name }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the IP allowlist configuration.

    - `allowed_ips: optional array of string`

      The IP addresses or CIDR ranges included in the configuration.

    - `name: optional string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.deleted": optional object { id, allowed_ips, name }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the IP allowlist configuration.

    - `allowed_ips: optional array of string`

      The IP addresses or CIDR ranges that were in the configuration.

    - `name: optional string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.updated": optional object { id, allowed_ips }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the IP allowlist configuration.

    - `allowed_ips: optional array of string`

      The updated set of IP addresses or CIDR ranges in the configuration.

  - `"login.failed": optional object { error_code, error_message }`

    The details for events with this `type`.

    - `error_code: optional string`

      The error code of the failure.

    - `error_message: optional string`

      The error message of the failure.

  - `"login.succeeded": optional unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"logout.failed": optional object { error_code, error_message }`

    The details for events with this `type`.

    - `error_code: optional string`

      The error code of the failure.

    - `error_message: optional string`

      The error message of the failure.

  - `"logout.succeeded": optional unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"organization.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The organization ID.

    - `changes_requested: optional object { api_call_logging, api_call_logging_project_ids, description, 4 more }`

      The payload used to update the organization settings.

      - `api_call_logging: optional string`

        How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects`

      - `api_call_logging_project_ids: optional string`

        The list of project ids if api_call_logging is set to `enabled_for_selected_projects`

      - `description: optional string`

        The organization description.

      - `name: optional string`

        The organization name.

      - `threads_ui_visibility: optional string`

        Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.

      - `title: optional string`

        The organization title.

      - `usage_dashboard_visibility: optional string`

        Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`.

  - `project: optional object { id, name }`

    The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project.

    - `id: optional string`

      The project ID.

    - `name: optional string`

      The project title.

  - `"project.archived": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

  - `"project.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

    - `data: optional object { name, title }`

      The payload used to create the project.

      - `name: optional string`

        The project name.

      - `title: optional string`

        The title of the project as seen on the dashboard.

  - `"project.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

  - `"project.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

    - `changes_requested: optional object { title }`

      The payload used to update the project.

      - `title: optional string`

        The title of the project as seen on the dashboard.

  - `"rate_limit.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The rate limit ID

  - `"rate_limit.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The rate limit ID

    - `changes_requested: optional object { batch_1_day_max_input_tokens, max_audio_megabytes_per_1_minute, max_images_per_1_minute, 3 more }`

      The payload used to update the rate limits.

      - `batch_1_day_max_input_tokens: optional number`

        The maximum batch input tokens per day. Only relevant for certain models.

      - `max_audio_megabytes_per_1_minute: optional number`

        The maximum audio megabytes per minute. Only relevant for certain models.

      - `max_images_per_1_minute: optional number`

        The maximum images per minute. Only relevant for certain models.

      - `max_requests_per_1_day: optional number`

        The maximum requests per day. Only relevant for certain models.

      - `max_requests_per_1_minute: optional number`

        The maximum requests per minute.

      - `max_tokens_per_1_minute: optional number`

        The maximum tokens per minute.

  - `"role.assignment.created": optional object { id, principal_id, principal_type, 2 more }`

    The details for events with this `type`.

    - `id: optional string`

      The identifier of the role assignment.

    - `principal_id: optional string`

      The principal (user or group) that received the role.

    - `principal_type: optional string`

      The type of principal (user or group) that received the role.

    - `resource_id: optional string`

      The resource the role assignment is scoped to.

    - `resource_type: optional string`

      The type of resource the role assignment is scoped to.

  - `"role.assignment.deleted": optional object { id, principal_id, principal_type, 2 more }`

    The details for events with this `type`.

    - `id: optional string`

      The identifier of the role assignment.

    - `principal_id: optional string`

      The principal (user or group) that had the role removed.

    - `principal_type: optional string`

      The type of principal (user or group) that had the role removed.

    - `resource_id: optional string`

      The resource the role assignment was scoped to.

    - `resource_type: optional string`

      The type of resource the role assignment was scoped to.

  - `"role.created": optional object { id, permissions, resource_id, 2 more }`

    The details for events with this `type`.

    - `id: optional string`

      The role ID.

    - `permissions: optional array of string`

      The permissions granted by the role.

    - `resource_id: optional string`

      The resource the role is scoped to.

    - `resource_type: optional string`

      The type of resource the role belongs to.

    - `role_name: optional string`

      The name of the role.

  - `"role.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The role ID.

  - `"role.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The role ID.

    - `changes_requested: optional object { description, metadata, permissions_added, 4 more }`

      The payload used to update the role.

      - `description: optional string`

        The updated role description, when provided.

      - `metadata: optional unknown`

        Additional metadata stored on the role.

      - `permissions_added: optional array of string`

        The permissions added to the role.

      - `permissions_removed: optional array of string`

        The permissions removed from the role.

      - `resource_id: optional string`

        The resource the role is scoped to.

      - `resource_type: optional string`

        The type of resource the role belongs to.

      - `role_name: optional string`

        The updated role name, when provided.

  - `"scim.disabled": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the SCIM was disabled for.

  - `"scim.enabled": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the SCIM was enabled for.

  - `"service_account.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The service account ID.

    - `data: optional object { role }`

      The payload used to create the service account.

      - `role: optional string`

        The role of the service account. Is either `owner` or `member`.

  - `"service_account.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The service account ID.

  - `"service_account.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The service account ID.

    - `changes_requested: optional object { role }`

      The payload used to updated the service account.

      - `role: optional string`

        The role of the service account. Is either `owner` or `member`.

  - `"user.added": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The user ID.

    - `data: optional object { role }`

      The payload used to add the user to the project.

      - `role: optional string`

        The role of the user. Is either `owner` or `member`.

  - `"user.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The user ID.

  - `"user.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

    - `changes_requested: optional object { role }`

      The payload used to update the user.

      - `role: optional string`

        The role of the user. Is either `owner` or `member`.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/audit_logs \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "effective_at": 0,
      "type": "api_key.created",
      "actor": {
        "api_key": {
          "id": "id",
          "service_account": {
            "id": "id"
          },
          "type": "user",
          "user": {
            "id": "id",
            "email": "email"
          }
        },
        "session": {
          "ip_address": "ip_address",
          "user": {
            "id": "id",
            "email": "email"
          }
        },
        "type": "session"
      },
      "api_key.created": {
        "id": "id",
        "data": {
          "scopes": [
            "string"
          ]
        }
      },
      "api_key.deleted": {
        "id": "id"
      },
      "api_key.updated": {
        "id": "id",
        "changes_requested": {
          "scopes": [
            "string"
          ]
        }
      },
      "certificate.created": {
        "id": "id",
        "name": "name"
      },
      "certificate.deleted": {
        "id": "id",
        "certificate": "certificate",
        "name": "name"
      },
      "certificate.updated": {
        "id": "id",
        "name": "name"
      },
      "certificates.activated": {
        "certificates": [
          {
            "id": "id",
            "name": "name"
          }
        ]
      },
      "certificates.deactivated": {
        "certificates": [
          {
            "id": "id",
            "name": "name"
          }
        ]
      },
      "checkpoint.permission.created": {
        "id": "id",
        "data": {
          "fine_tuned_model_checkpoint": "fine_tuned_model_checkpoint",
          "project_id": "project_id"
        }
      },
      "checkpoint.permission.deleted": {
        "id": "id"
      },
      "external_key.registered": {
        "id": "id",
        "data": {}
      },
      "external_key.removed": {
        "id": "id"
      },
      "group.created": {
        "id": "id",
        "data": {
          "group_name": "group_name"
        }
      },
      "group.deleted": {
        "id": "id"
      },
      "group.updated": {
        "id": "id",
        "changes_requested": {
          "group_name": "group_name"
        }
      },
      "invite.accepted": {
        "id": "id"
      },
      "invite.deleted": {
        "id": "id"
      },
      "invite.sent": {
        "id": "id",
        "data": {
          "email": "email",
          "role": "role"
        }
      },
      "ip_allowlist.config.activated": {
        "configs": [
          {
            "id": "id",
            "name": "name"
          }
        ]
      },
      "ip_allowlist.config.deactivated": {
        "configs": [
          {
            "id": "id",
            "name": "name"
          }
        ]
      },
      "ip_allowlist.created": {
        "id": "id",
        "allowed_ips": [
          "string"
        ],
        "name": "name"
      },
      "ip_allowlist.deleted": {
        "id": "id",
        "allowed_ips": [
          "string"
        ],
        "name": "name"
      },
      "ip_allowlist.updated": {
        "id": "id",
        "allowed_ips": [
          "string"
        ]
      },
      "login.failed": {
        "error_code": "error_code",
        "error_message": "error_message"
      },
      "login.succeeded": {},
      "logout.failed": {
        "error_code": "error_code",
        "error_message": "error_message"
      },
      "logout.succeeded": {},
      "organization.updated": {
        "id": "id",
        "changes_requested": {
          "api_call_logging": "api_call_logging",
          "api_call_logging_project_ids": "api_call_logging_project_ids",
          "description": "description",
          "name": "name",
          "threads_ui_visibility": "threads_ui_visibility",
          "title": "title",
          "usage_dashboard_visibility": "usage_dashboard_visibility"
        }
      },
      "project": {
        "id": "id",
        "name": "name"
      },
      "project.archived": {
        "id": "id"
      },
      "project.created": {
        "id": "id",
        "data": {
          "name": "name",
          "title": "title"
        }
      },
      "project.deleted": {
        "id": "id"
      },
      "project.updated": {
        "id": "id",
        "changes_requested": {
          "title": "title"
        }
      },
      "rate_limit.deleted": {
        "id": "id"
      },
      "rate_limit.updated": {
        "id": "id",
        "changes_requested": {
          "batch_1_day_max_input_tokens": 0,
          "max_audio_megabytes_per_1_minute": 0,
          "max_images_per_1_minute": 0,
          "max_requests_per_1_day": 0,
          "max_requests_per_1_minute": 0,
          "max_tokens_per_1_minute": 0
        }
      },
      "role.assignment.created": {
        "id": "id",
        "principal_id": "principal_id",
        "principal_type": "principal_type",
        "resource_id": "resource_id",
        "resource_type": "resource_type"
      },
      "role.assignment.deleted": {
        "id": "id",
        "principal_id": "principal_id",
        "principal_type": "principal_type",
        "resource_id": "resource_id",
        "resource_type": "resource_type"
      },
      "role.created": {
        "id": "id",
        "permissions": [
          "string"
        ],
        "resource_id": "resource_id",
        "resource_type": "resource_type",
        "role_name": "role_name"
      },
      "role.deleted": {
        "id": "id"
      },
      "role.updated": {
        "id": "id",
        "changes_requested": {
          "description": "description",
          "metadata": {},
          "permissions_added": [
            "string"
          ],
          "permissions_removed": [
            "string"
          ],
          "resource_id": "resource_id",
          "resource_type": "resource_type",
          "role_name": "role_name"
        }
      },
      "scim.disabled": {
        "id": "id"
      },
      "scim.enabled": {
        "id": "id"
      },
      "service_account.created": {
        "id": "id",
        "data": {
          "role": "role"
        }
      },
      "service_account.deleted": {
        "id": "id"
      },
      "service_account.updated": {
        "id": "id",
        "changes_requested": {
          "role": "role"
        }
      },
      "user.added": {
        "id": "id",
        "data": {
          "role": "role"
        }
      },
      "user.deleted": {
        "id": "id"
      },
      "user.updated": {
        "id": "id",
        "changes_requested": {
          "role": "role"
        }
      }
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "audit_log-defb456h8dks",
  "last_id": "audit_log-hnbkd8s93s"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/audit_logs \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "audit_log-xxx_yyyymmdd",
            "type": "project.archived",
            "effective_at": 1722461446,
            "actor": {
                "type": "api_key",
                "api_key": {
                    "type": "user",
                    "user": {
                        "id": "user-xxx",
                        "email": "user@example.com"
                    }
                }
            },
            "project.archived": {
                "id": "proj_abc"
            },
        },
        {
            "id": "audit_log-yyy__20240101",
            "type": "api_key.updated",
            "effective_at": 1720804190,
            "actor": {
                "type": "session",
                "session": {
                    "user": {
                        "id": "user-xxx",
                        "email": "user@example.com"
                    },
                    "ip_address": "127.0.0.1",
                    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "ja3": "a497151ce4338a12c4418c44d375173e",
                    "ja4": "q13d0313h3_55b375c5d22e_c7319ce65786",
                    "ip_address_details": {
                      "country": "US",
                      "city": "San Francisco",
                      "region": "California",
                      "region_code": "CA",
                      "asn": "1234",
                      "latitude": "37.77490",
                      "longitude": "-122.41940"
                    }
                }
            },
            "api_key.updated": {
                "id": "key_xxxx",
                "data": {
                    "scopes": ["resource_2.operation_2"]
                }
            },
        }
    ],
    "first_id": "audit_log-xxx__20240101",
    "last_id": "audit_log_yyy__20240101",
    "has_more": true
}
```

## Domain Types

### Audit Log List Response

- `AuditLogListResponse object { id, effective_at, type, 49 more }`

  A log of a user action or configuration change within this organization.

  - `id: string`

    The ID of this log.

  - `effective_at: number`

    The Unix timestamp (in seconds) of the event.

  - `type: "api_key.created" or "api_key.updated" or "api_key.deleted" or 48 more`

    The event type.

    - `"api_key.created"`

    - `"api_key.updated"`

    - `"api_key.deleted"`

    - `"certificate.created"`

    - `"certificate.updated"`

    - `"certificate.deleted"`

    - `"certificates.activated"`

    - `"certificates.deactivated"`

    - `"checkpoint.permission.created"`

    - `"checkpoint.permission.deleted"`

    - `"external_key.registered"`

    - `"external_key.removed"`

    - `"group.created"`

    - `"group.updated"`

    - `"group.deleted"`

    - `"invite.sent"`

    - `"invite.accepted"`

    - `"invite.deleted"`

    - `"ip_allowlist.created"`

    - `"ip_allowlist.updated"`

    - `"ip_allowlist.deleted"`

    - `"ip_allowlist.config.activated"`

    - `"ip_allowlist.config.deactivated"`

    - `"login.succeeded"`

    - `"login.failed"`

    - `"logout.succeeded"`

    - `"logout.failed"`

    - `"organization.updated"`

    - `"project.created"`

    - `"project.updated"`

    - `"project.archived"`

    - `"project.deleted"`

    - `"rate_limit.updated"`

    - `"rate_limit.deleted"`

    - `"resource.deleted"`

    - `"tunnel.created"`

    - `"tunnel.updated"`

    - `"tunnel.deleted"`

    - `"role.created"`

    - `"role.updated"`

    - `"role.deleted"`

    - `"role.assignment.created"`

    - `"role.assignment.deleted"`

    - `"scim.enabled"`

    - `"scim.disabled"`

    - `"service_account.created"`

    - `"service_account.updated"`

    - `"service_account.deleted"`

    - `"user.added"`

    - `"user.updated"`

    - `"user.deleted"`

  - `actor: optional object { api_key, session, type }`

    The actor who performed the audit logged action.

    - `api_key: optional object { id, service_account, type, user }`

      The API Key used to perform the audit logged action.

      - `id: optional string`

        The tracking id of the API key.

      - `service_account: optional object { id }`

        The service account that performed the audit logged action.

        - `id: optional string`

          The service account id.

      - `type: optional "user" or "service_account"`

        The type of API key. Can be either `user` or `service_account`.

        - `"user"`

        - `"service_account"`

      - `user: optional object { id, email }`

        The user who performed the audit logged action.

        - `id: optional string`

          The user id.

        - `email: optional string`

          The user email.

    - `session: optional object { ip_address, user }`

      The session in which the audit logged action was performed.

      - `ip_address: optional string`

        The IP address from which the action was performed.

      - `user: optional object { id, email }`

        The user who performed the audit logged action.

        - `id: optional string`

          The user id.

        - `email: optional string`

          The user email.

    - `type: optional "session" or "api_key"`

      The type of actor. Is either `session` or `api_key`.

      - `"session"`

      - `"api_key"`

  - `"api_key.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The tracking ID of the API key.

    - `data: optional object { scopes }`

      The payload used to create the API key.

      - `scopes: optional array of string`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"api_key.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The tracking ID of the API key.

  - `"api_key.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The tracking ID of the API key.

    - `changes_requested: optional object { scopes }`

      The payload used to update the API key.

      - `scopes: optional array of string`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"certificate.created": optional object { id, name }`

    The details for events with this `type`.

    - `id: optional string`

      The certificate ID.

    - `name: optional string`

      The name of the certificate.

  - `"certificate.deleted": optional object { id, certificate, name }`

    The details for events with this `type`.

    - `id: optional string`

      The certificate ID.

    - `certificate: optional string`

      The certificate content in PEM format.

    - `name: optional string`

      The name of the certificate.

  - `"certificate.updated": optional object { id, name }`

    The details for events with this `type`.

    - `id: optional string`

      The certificate ID.

    - `name: optional string`

      The name of the certificate.

  - `"certificates.activated": optional object { certificates }`

    The details for events with this `type`.

    - `certificates: optional array of object { id, name }`

      - `id: optional string`

        The certificate ID.

      - `name: optional string`

        The name of the certificate.

  - `"certificates.deactivated": optional object { certificates }`

    The details for events with this `type`.

    - `certificates: optional array of object { id, name }`

      - `id: optional string`

        The certificate ID.

      - `name: optional string`

        The name of the certificate.

  - `"checkpoint.permission.created": optional object { id, data }`

    The project and fine-tuned model checkpoint that the checkpoint permission was created for.

    - `id: optional string`

      The ID of the checkpoint permission.

    - `data: optional object { fine_tuned_model_checkpoint, project_id }`

      The payload used to create the checkpoint permission.

      - `fine_tuned_model_checkpoint: optional string`

        The ID of the fine-tuned model checkpoint.

      - `project_id: optional string`

        The ID of the project that the checkpoint permission was created for.

  - `"checkpoint.permission.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the checkpoint permission.

  - `"external_key.registered": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the external key configuration.

    - `data: optional unknown`

      The configuration for the external key.

  - `"external_key.removed": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the external key configuration.

  - `"group.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the group.

    - `data: optional object { group_name }`

      Information about the created group.

      - `group_name: optional string`

        The group name.

  - `"group.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the group.

  - `"group.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the group.

    - `changes_requested: optional object { group_name }`

      The payload used to update the group.

      - `group_name: optional string`

        The updated group name.

  - `"invite.accepted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the invite.

  - `"invite.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the invite.

  - `"invite.sent": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the invite.

    - `data: optional object { email, role }`

      The payload used to create the invite.

      - `email: optional string`

        The email invited to the organization.

      - `role: optional string`

        The role the email was invited to be. Is either `owner` or `member`.

  - `"ip_allowlist.config.activated": optional object { configs }`

    The details for events with this `type`.

    - `configs: optional array of object { id, name }`

      The configurations that were activated.

      - `id: optional string`

        The ID of the IP allowlist configuration.

      - `name: optional string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.config.deactivated": optional object { configs }`

    The details for events with this `type`.

    - `configs: optional array of object { id, name }`

      The configurations that were deactivated.

      - `id: optional string`

        The ID of the IP allowlist configuration.

      - `name: optional string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.created": optional object { id, allowed_ips, name }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the IP allowlist configuration.

    - `allowed_ips: optional array of string`

      The IP addresses or CIDR ranges included in the configuration.

    - `name: optional string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.deleted": optional object { id, allowed_ips, name }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the IP allowlist configuration.

    - `allowed_ips: optional array of string`

      The IP addresses or CIDR ranges that were in the configuration.

    - `name: optional string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.updated": optional object { id, allowed_ips }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the IP allowlist configuration.

    - `allowed_ips: optional array of string`

      The updated set of IP addresses or CIDR ranges in the configuration.

  - `"login.failed": optional object { error_code, error_message }`

    The details for events with this `type`.

    - `error_code: optional string`

      The error code of the failure.

    - `error_message: optional string`

      The error message of the failure.

  - `"login.succeeded": optional unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"logout.failed": optional object { error_code, error_message }`

    The details for events with this `type`.

    - `error_code: optional string`

      The error code of the failure.

    - `error_message: optional string`

      The error message of the failure.

  - `"logout.succeeded": optional unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"organization.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The organization ID.

    - `changes_requested: optional object { api_call_logging, api_call_logging_project_ids, description, 4 more }`

      The payload used to update the organization settings.

      - `api_call_logging: optional string`

        How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects`

      - `api_call_logging_project_ids: optional string`

        The list of project ids if api_call_logging is set to `enabled_for_selected_projects`

      - `description: optional string`

        The organization description.

      - `name: optional string`

        The organization name.

      - `threads_ui_visibility: optional string`

        Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.

      - `title: optional string`

        The organization title.

      - `usage_dashboard_visibility: optional string`

        Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`.

  - `project: optional object { id, name }`

    The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project.

    - `id: optional string`

      The project ID.

    - `name: optional string`

      The project title.

  - `"project.archived": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

  - `"project.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

    - `data: optional object { name, title }`

      The payload used to create the project.

      - `name: optional string`

        The project name.

      - `title: optional string`

        The title of the project as seen on the dashboard.

  - `"project.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

  - `"project.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

    - `changes_requested: optional object { title }`

      The payload used to update the project.

      - `title: optional string`

        The title of the project as seen on the dashboard.

  - `"rate_limit.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The rate limit ID

  - `"rate_limit.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The rate limit ID

    - `changes_requested: optional object { batch_1_day_max_input_tokens, max_audio_megabytes_per_1_minute, max_images_per_1_minute, 3 more }`

      The payload used to update the rate limits.

      - `batch_1_day_max_input_tokens: optional number`

        The maximum batch input tokens per day. Only relevant for certain models.

      - `max_audio_megabytes_per_1_minute: optional number`

        The maximum audio megabytes per minute. Only relevant for certain models.

      - `max_images_per_1_minute: optional number`

        The maximum images per minute. Only relevant for certain models.

      - `max_requests_per_1_day: optional number`

        The maximum requests per day. Only relevant for certain models.

      - `max_requests_per_1_minute: optional number`

        The maximum requests per minute.

      - `max_tokens_per_1_minute: optional number`

        The maximum tokens per minute.

  - `"role.assignment.created": optional object { id, principal_id, principal_type, 2 more }`

    The details for events with this `type`.

    - `id: optional string`

      The identifier of the role assignment.

    - `principal_id: optional string`

      The principal (user or group) that received the role.

    - `principal_type: optional string`

      The type of principal (user or group) that received the role.

    - `resource_id: optional string`

      The resource the role assignment is scoped to.

    - `resource_type: optional string`

      The type of resource the role assignment is scoped to.

  - `"role.assignment.deleted": optional object { id, principal_id, principal_type, 2 more }`

    The details for events with this `type`.

    - `id: optional string`

      The identifier of the role assignment.

    - `principal_id: optional string`

      The principal (user or group) that had the role removed.

    - `principal_type: optional string`

      The type of principal (user or group) that had the role removed.

    - `resource_id: optional string`

      The resource the role assignment was scoped to.

    - `resource_type: optional string`

      The type of resource the role assignment was scoped to.

  - `"role.created": optional object { id, permissions, resource_id, 2 more }`

    The details for events with this `type`.

    - `id: optional string`

      The role ID.

    - `permissions: optional array of string`

      The permissions granted by the role.

    - `resource_id: optional string`

      The resource the role is scoped to.

    - `resource_type: optional string`

      The type of resource the role belongs to.

    - `role_name: optional string`

      The name of the role.

  - `"role.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The role ID.

  - `"role.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The role ID.

    - `changes_requested: optional object { description, metadata, permissions_added, 4 more }`

      The payload used to update the role.

      - `description: optional string`

        The updated role description, when provided.

      - `metadata: optional unknown`

        Additional metadata stored on the role.

      - `permissions_added: optional array of string`

        The permissions added to the role.

      - `permissions_removed: optional array of string`

        The permissions removed from the role.

      - `resource_id: optional string`

        The resource the role is scoped to.

      - `resource_type: optional string`

        The type of resource the role belongs to.

      - `role_name: optional string`

        The updated role name, when provided.

  - `"scim.disabled": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the SCIM was disabled for.

  - `"scim.enabled": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The ID of the SCIM was enabled for.

  - `"service_account.created": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The service account ID.

    - `data: optional object { role }`

      The payload used to create the service account.

      - `role: optional string`

        The role of the service account. Is either `owner` or `member`.

  - `"service_account.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The service account ID.

  - `"service_account.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The service account ID.

    - `changes_requested: optional object { role }`

      The payload used to updated the service account.

      - `role: optional string`

        The role of the service account. Is either `owner` or `member`.

  - `"user.added": optional object { id, data }`

    The details for events with this `type`.

    - `id: optional string`

      The user ID.

    - `data: optional object { role }`

      The payload used to add the user to the project.

      - `role: optional string`

        The role of the user. Is either `owner` or `member`.

  - `"user.deleted": optional object { id }`

    The details for events with this `type`.

    - `id: optional string`

      The user ID.

  - `"user.updated": optional object { id, changes_requested }`

    The details for events with this `type`.

    - `id: optional string`

      The project ID.

    - `changes_requested: optional object { role }`

      The payload used to update the user.

      - `role: optional string`

        The role of the user. Is either `owner` or `member`.
