# Organization

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

# Admin API Keys

## List all organization and project API keys.

**get** `/organization/admin_api_keys`

List organization API keys

### Query Parameters

- `after: optional string`

  Return keys with IDs that come after this ID in the pagination order.

- `limit: optional number`

  Maximum number of keys to return.

- `order: optional "asc" or "desc"`

  Order results by creation time, ascending or descending.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of AdminAPIKey`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: object { id, created_at, name, 3 more }`

    - `id: optional string`

      The identifier, which can be referenced in API endpoints

    - `created_at: optional number`

      The Unix timestamp (in seconds) of when the user was created

    - `name: optional string`

      The name of the user

    - `object: optional string`

      The object type, which is always organization.user

    - `role: optional string`

      Always `owner`

    - `type: optional string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `last_used_at: optional number`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: optional string`

    The name of the API key

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "key_abc",
      "created_at": 1711471533,
      "object": "organization.admin_api_key",
      "owner": {
        "id": "sa_456",
        "created_at": 1711471533,
        "name": "My Service Account",
        "object": "organization.user",
        "role": "owner",
        "type": "user"
      },
      "redacted_value": "sk-admin...def",
      "last_used_at": 1711471534,
      "name": "Administration Key"
    }
  ],
  "has_more": false,
  "object": "list",
  "first_id": "key_abc",
  "last_id": "key_xyz"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys?after=key_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.admin_api_key",
      "id": "key_abc",
      "name": "Main Admin Key",
      "redacted_value": "sk-admin...def",
      "created_at": 1711471533,
      "last_used_at": 1711471534,
      "owner": {
        "type": "service_account",
        "object": "organization.service_account",
        "id": "sa_456",
        "name": "My Service Account",
        "created_at": 1711471533,
        "role": "member"
      }
    }
  ],
  "first_id": "key_abc",
  "last_id": "key_abc",
  "has_more": false
}
```

## Create admin API key

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Body Parameters

- `name: string`

### Returns

- `value: string`

  The value of the API key. Only shown on create.

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "New Admin Key"
        }'
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "object": "organization.admin_api_key",
  "owner": {
    "id": "sa_456",
    "created_at": 1711471533,
    "name": "My Service Account",
    "object": "organization.user",
    "role": "owner",
    "type": "user"
  },
  "redacted_value": "sk-admin...def",
  "last_used_at": 1711471534,
  "name": "Administration Key",
  "value": "sk-admin-1234abcd"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/admin_api_keys \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "New Admin Key"
  }'
```

#### Response

```json
{
  "object": "organization.admin_api_key",
  "id": "key_xyz",
  "name": "New Admin Key",
  "redacted_value": "sk-admin...xyz",
  "created_at": 1711471533,
  "last_used_at": 1711471534,
  "owner": {
    "type": "user",
    "object": "organization.user",
    "id": "user_123",
    "name": "John Doe",
    "created_at": 1711471533,
    "role": "owner"
  },
  "value": "sk-admin-1234abcd"
}
```

## Retrieve admin API key

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Path Parameters

- `key_id: string`

  The ID of the API key.

### Returns

- `AdminAPIKey object { id, created_at, object, 4 more }`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: object { id, created_at, name, 3 more }`

    - `id: optional string`

      The identifier, which can be referenced in API endpoints

    - `created_at: optional number`

      The Unix timestamp (in seconds) of when the user was created

    - `name: optional string`

      The name of the user

    - `object: optional string`

      The object type, which is always organization.user

    - `role: optional string`

      Always `owner`

    - `type: optional string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `last_used_at: optional number`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: optional string`

    The name of the API key

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/$KEY_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "object": "organization.admin_api_key",
  "owner": {
    "id": "sa_456",
    "created_at": 1711471533,
    "name": "My Service Account",
    "object": "organization.user",
    "role": "owner",
    "type": "user"
  },
  "redacted_value": "sk-admin...def",
  "last_used_at": 1711471534,
  "name": "Administration Key"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "organization.admin_api_key",
  "id": "key_abc",
  "name": "Main Admin Key",
  "redacted_value": "sk-admin...xyz",
  "created_at": 1711471533,
  "last_used_at": 1711471534,
  "owner": {
    "type": "user",
    "object": "organization.user",
    "id": "user_123",
    "name": "John Doe",
    "created_at": 1711471533,
    "role": "owner"
  }
}
```

## Delete admin API key

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Path Parameters

- `key_id: string`

  The ID of the API key to be deleted.

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.admin_api_key.deleted"`

  - `"organization.admin_api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/$KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "key_abc",
  "deleted": true,
  "object": "organization.admin_api_key.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/admin_api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "key_abc",
  "object": "organization.admin_api_key.deleted",
  "deleted": true
}
```

## Domain Types

### Admin API Key

- `AdminAPIKey object { id, created_at, object, 4 more }`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: object { id, created_at, name, 3 more }`

    - `id: optional string`

      The identifier, which can be referenced in API endpoints

    - `created_at: optional number`

      The Unix timestamp (in seconds) of when the user was created

    - `name: optional string`

      The name of the user

    - `object: optional string`

      The object type, which is always organization.user

    - `role: optional string`

      Always `owner`

    - `type: optional string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `last_used_at: optional number`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: optional string`

    The name of the API key

### Admin API Key Create Response

- `AdminAPIKeyCreateResponse = AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `value: string`

    The value of the API key. Only shown on create.

### Admin API Key Delete Response

- `AdminAPIKeyDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.admin_api_key.deleted"`

    - `"organization.admin_api_key.deleted"`

# Usage

## Audio speeches

**get** `/organization/usage/audio_speeches`

Get audio speeches usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or "model"`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/audio_speeches \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/audio_speeches?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.audio_speeches.result",
                    "characters": 45,
                    "num_model_requests": 1,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Audio transcriptions

**get** `/organization/usage/audio_transcriptions`

Get audio transcriptions usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or "model"`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/audio_transcriptions \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/audio_transcriptions?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.audio_transcriptions.result",
                    "seconds": 20,
                    "num_model_requests": 1,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Code interpreter sessions

**get** `/organization/usage/code_interpreter_sessions`

Get code interpreter sessions usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id"`

  Group the usage data by the specified fields. Support fields include `project_id`.

  - `"project_id"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/code_interpreter_sessions \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/code_interpreter_sessions?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.code_interpreter_sessions.result",
                    "num_sessions": 1,
                    "project_id": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Completions

**get** `/organization/usage/completions`

Get completions usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `batch: optional boolean`

  If `true`, return batch jobs only. If `false`, return non-batch jobs only. By default, return both.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or 3 more`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

  - `"batch"`

  - `"service_tier"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/completions \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/completions?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.completions.result",
                    "input_tokens": 1000,
                    "output_tokens": 500,
                    "input_cached_tokens": 800,
                    "input_audio_tokens": 0,
                    "output_audio_tokens": 0,
                    "num_model_requests": 5,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null,
                    "batch": null,
                    "service_tier": null
                }
            ]
        }
    ],
    "has_more": true,
    "next_page": "page_AAAAAGdGxdEiJdKOAAAAAGcqsYA="
}
```

## Embeddings

**get** `/organization/usage/embeddings`

Get embeddings usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or "model"`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/embeddings \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/embeddings?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.embeddings.result",
                    "input_tokens": 16,
                    "num_model_requests": 2,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Images

**get** `/organization/usage/images`

Get images usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or 3 more`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `size`, `source` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

  - `"size"`

  - `"source"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `sizes: optional array of "256x256" or "512x512" or "1024x1024" or 2 more`

  Return only usages for these image sizes. Possible values are `256x256`, `512x512`, `1024x1024`, `1792x1792`, `1024x1792` or any combination of them.

  - `"256x256"`

  - `"512x512"`

  - `"1024x1024"`

  - `"1792x1792"`

  - `"1024x1792"`

- `sources: optional array of "image.generation" or "image.edit" or "image.variation"`

  Return only usages for these sources. Possible values are `image.generation`, `image.edit`, `image.variation` or any combination of them.

  - `"image.generation"`

  - `"image.edit"`

  - `"image.variation"`

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/images \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/images?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.images.result",
                    "images": 2,
                    "num_model_requests": 2,
                    "size": null,
                    "source": null,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Moderations

**get** `/organization/usage/moderations`

Get moderations usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or "model"`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/moderations \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/moderations?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.moderations.result",
                    "input_tokens": 16,
                    "num_model_requests": 2,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Vector stores

**get** `/organization/usage/vector_stores`

Get vector stores usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id"`

  Group the usage data by the specified fields. Support fields include `project_id`.

  - `"project_id"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/vector_stores \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/usage/vector_stores?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.vector_stores.result",
                    "usage_bytes": 1024,
                    "project_id": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Costs

**get** `/organization/costs`

Get costs details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only costs for these API keys.

- `bucket_width: optional "1d"`

  Width of each time bucket in response. Currently only `1d` is supported, default to `1d`.

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "line_item" or "api_key_id"`

  Group the costs by the specified fields. Support fields include `project_id`, `line_item`, `api_key_id` and any combination of them.

  - `"project_id"`

  - `"line_item"`

  - `"api_key_id"`

- `limit: optional number`

  A limit on the number of buckets to be returned. Limit can range between 1 and 180, and the default is 7.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only costs for these projects.

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `num_sessions: number`

        The number of code interpreter sessions.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

      - `quantity: optional number`

        When `group_by=line_item`, this field provides the quantity of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/costs \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/costs?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.costs.result",
                    "amount": {
                        "value": 0.06,
                        "currency": "usd"
                    },
                    "line_item": null,
                    "project_id": null,
                    "api_key_id": null,
                    "quantity": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```

## Domain Types

### Usage Audio Speeches Response

- `UsageAudioSpeechesResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Audio Transcriptions Response

- `UsageAudioTranscriptionsResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Code Interpreter Sessions Response

- `UsageCodeInterpreterSessionsResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Completions Response

- `UsageCompletionsResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Embeddings Response

- `UsageEmbeddingsResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Images Response

- `UsageImagesResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Moderations Response

- `UsageModerationsResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Vector Stores Response

- `UsageVectorStoresResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

### Usage Costs Response

- `UsageCostsResponse object { data, has_more, next_page, object }`

  - `data: array of object { end_time, object, results, start_time }`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

      - `OrganizationUsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: optional boolean`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: optional number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: optional number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: optional number`

          The aggregated number of audio output tokens used.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: optional string`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult object { images, num_model_requests, object, 6 more }`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: optional string`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: optional string`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: optional string`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: optional string`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult object { object, usage_bytes, project_id }`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult object { num_sessions, object, project_id }`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationCostsResult object { object, amount, api_key_id, 3 more }`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount: optional object { currency, value }`

          The monetary value in its associated currency.

          - `currency: optional string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: optional number`

            The numeric value of the cost.

        - `api_key_id: optional string`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: optional string`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: optional string`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: optional number`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string`

  - `object: "page"`

    - `"page"`

# Invites

## List invites

**get** `/organization/invites`

Returns a list of invites in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of Invite`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: string`

    The email address of the individual to whom the invite was sent

  - `object: "organization.invite"`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: array of object { id, role }`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" or "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" or "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" or "expired" or "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: optional number`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: optional number`

    The Unix timestamp (in seconds) of when the invite expires.

- `has_more: boolean`

  The `has_more` property is used for pagination to indicate there are additional results.

- `object: "list"`

  The object type, which is always `list`

  - `"list"`

- `first_id: optional string`

  The first `invite_id` in the retrieved `list`

- `last_id: optional string`

  The last `invite_id` in the retrieved `list`

### Example

```http
curl https://api.openai.com/v1/organization/invites \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "email": "email",
      "object": "organization.invite",
      "projects": [
        {
          "id": "id",
          "role": "member"
        }
      ],
      "role": "owner",
      "status": "accepted",
      "accepted_at": 0,
      "expires_at": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/invites?after=invite-abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.invite",
      "id": "invite-abc",
      "email": "user@example.com",
      "role": "owner",
      "status": "accepted",
      "created_at": 1711471533,
      "expires_at": 1711471533,
      "accepted_at": 1711471533
    }
  ],
  "first_id": "invite-abc",
  "last_id": "invite-abc",
  "has_more": false
}
```

## Create invite

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Body Parameters

- `email: string`

  Send an email to this address

- `role: "reader" or "owner"`

  `owner` or `reader`

  - `"reader"`

  - `"owner"`

- `projects: optional array of object { id, role }`

  An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior.

  - `id: string`

    Project's public ID

  - `role: "member" or "owner"`

    Project membership role

    - `"member"`

    - `"owner"`

### Returns

- `Invite object { id, created_at, email, 6 more }`

  Represents an individual `invite` to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: string`

    The email address of the individual to whom the invite was sent

  - `object: "organization.invite"`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: array of object { id, role }`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" or "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" or "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" or "expired" or "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: optional number`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: optional number`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```http
curl https://api.openai.com/v1/organization/invites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "email": "email",
          "role": "reader"
        }'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "email": "email",
  "object": "organization.invite",
  "projects": [
    {
      "id": "id",
      "role": "member"
    }
  ],
  "role": "owner",
  "status": "accepted",
  "accepted_at": 0,
  "expires_at": 0
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/invites \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "email": "anotheruser@example.com",
      "role": "reader",
      "projects": [
        {
          "id": "project-xyz",
          "role": "member"
        },
        {
          "id": "project-abc",
          "role": "owner"
        }
      ]
  }'
```

#### Response

```json
{
  "object": "organization.invite",
  "id": "invite-def",
  "email": "anotheruser@example.com",
  "role": "reader",
  "status": "pending",
  "created_at": 1711471533,
  "expires_at": 1711471533,
  "accepted_at": null,
  "projects": [
    {
      "id": "project-xyz",
      "role": "member"
    },
    {
      "id": "project-abc",
      "role": "owner"
    }
  ]
}
```

## Retrieve invite

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Path Parameters

- `invite_id: string`

### Returns

- `Invite object { id, created_at, email, 6 more }`

  Represents an individual `invite` to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: string`

    The email address of the individual to whom the invite was sent

  - `object: "organization.invite"`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: array of object { id, role }`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" or "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" or "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" or "expired" or "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: optional number`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: optional number`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```http
curl https://api.openai.com/v1/organization/invites/$INVITE_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "email": "email",
  "object": "organization.invite",
  "projects": [
    {
      "id": "id",
      "role": "member"
    }
  ],
  "role": "owner",
  "status": "accepted",
  "accepted_at": 0,
  "expires_at": 0
}
```

### Example

```http
curl https://api.openai.com/v1/organization/invites/invite-abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.invite",
    "id": "invite-abc",
    "email": "user@example.com",
    "role": "owner",
    "status": "accepted",
    "created_at": 1711471533,
    "expires_at": 1711471533,
    "accepted_at": 1711471533
}
```

## Delete invite

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Path Parameters

- `invite_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.invite.deleted"`

  The object type, which is always `organization.invite.deleted`

  - `"organization.invite.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/invites/$INVITE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/invites/invite-abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.invite.deleted",
    "id": "invite-abc",
    "deleted": true
}
```

## Domain Types

### Invite

- `Invite object { id, created_at, email, 6 more }`

  Represents an individual `invite` to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: string`

    The email address of the individual to whom the invite was sent

  - `object: "organization.invite"`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: array of object { id, role }`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" or "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" or "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" or "expired" or "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: optional number`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: optional number`

    The Unix timestamp (in seconds) of when the invite expires.

### Invite Delete Response

- `InviteDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

# Users

## List users

**get** `/organization/users`

Lists all of the users in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `emails: optional array of string`

  Filter by the email address of users.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of OrganizationUser`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "added_at": 0,
      "object": "organization.user",
      "api_key_last_used_at": 0,
      "created": 0,
      "developer_persona": "developer_persona",
      "email": "email",
      "is_default": true,
      "is_scale_tier_authorized_purchaser": true,
      "is_scim_managed": true,
      "is_service_account": true,
      "name": "name",
      "projects": {
        "data": [
          {
            "id": "id",
            "name": "name",
            "role": "role"
          }
        ],
        "object": "list"
      },
      "role": "role",
      "technical_level": "technical_level",
      "user": {
        "id": "id",
        "object": "user",
        "banned": true,
        "banned_at": 0,
        "email": "email",
        "enabled": true,
        "name": "name",
        "picture": "picture"
      }
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/users?after=user_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.user",
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "added_at": 1711471533
        }
    ],
    "first_id": "user-abc",
    "last_id": "user-xyz",
    "has_more": false
}
```

## Retrieve user

**get** `/organization/users/{user_id}`

Retrieves a user by their identifier.

### Path Parameters

- `user_id: string`

### Returns

- `OrganizationUser object { id, added_at, object, 13 more }`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.user",
  "api_key_last_used_at": 0,
  "created": 0,
  "developer_persona": "developer_persona",
  "email": "email",
  "is_default": true,
  "is_scale_tier_authorized_purchaser": true,
  "is_scim_managed": true,
  "is_service_account": true,
  "name": "name",
  "projects": {
    "data": [
      {
        "id": "id",
        "name": "name",
        "role": "role"
      }
    ],
    "object": "list"
  },
  "role": "role",
  "technical_level": "technical_level",
  "user": {
    "id": "id",
    "object": "user",
    "banned": true,
    "banned_at": 0,
    "email": "email",
    "enabled": true,
    "name": "name",
    "picture": "picture"
  }
}
```

### Example

```http
curl https://api.openai.com/v1/organization/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Modify user

**post** `/organization/users/{user_id}`

Modifies a user's role in the organization.

### Path Parameters

- `user_id: string`

### Body Parameters

- `developer_persona: optional string`

  Developer persona metadata.

- `role: optional string`

  `owner` or `reader`

- `role_id: optional string`

  Role ID to assign to the user.

- `technical_level: optional string`

  Technical level metadata.

### Returns

- `OrganizationUser object { id, added_at, object, 13 more }`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.user",
  "api_key_last_used_at": 0,
  "created": 0,
  "developer_persona": "developer_persona",
  "email": "email",
  "is_default": true,
  "is_scale_tier_authorized_purchaser": true,
  "is_scim_managed": true,
  "is_service_account": true,
  "name": "name",
  "projects": {
    "data": [
      {
        "id": "id",
        "name": "name",
        "role": "role"
      }
    ],
    "object": "list"
  },
  "role": "role",
  "technical_level": "technical_level",
  "user": {
    "id": "id",
    "object": "user",
    "banned": true,
    "banned_at": 0,
    "email": "email",
    "enabled": true,
    "name": "name",
    "picture": "picture"
  }
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role": "owner"
  }'
```

#### Response

```json
{
    "object": "organization.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Delete user

**delete** `/organization/users/{user_id}`

Deletes a user from the organization.

### Path Parameters

- `user_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.user.deleted"`

  - `"organization.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.user.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.user.deleted",
    "id": "user_abc",
    "deleted": true
}
```

## Domain Types

### Organization User

- `OrganizationUser object { id, added_at, object, 13 more }`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

### User Delete Response

- `UserDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.user.deleted"`

    - `"organization.user.deleted"`

# Roles

## List user organization role assignments

**get** `/organization/users/{user_id}/roles`

Lists the organization roles assigned to a user within the organization.

### Path Parameters

- `user_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

- `limit: optional number`

  A limit on the number of organization role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned organization roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, created_by, 8 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

- `has_more: boolean`

  Whether additional assignments are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more assignments.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/users/user_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8ROLE01",
            "name": "API Group Manager",
            "permissions": [
                "api.groups.read",
                "api.groups.write"
            ],
            "resource_type": "api.organization",
            "predefined_role": false,
            "description": "Allows managing organization groups",
            "created_at": 1711471533,
            "updated_at": 1711472599,
            "created_by": "user_abc123",
            "created_by_user_obj": {
                "id": "user_abc123",
                "name": "Ada Lovelace",
                "email": "ada@example.com"
            },
            "metadata": {}
        }
    ],
    "has_more": false,
    "next": null
}
```

## Assign organization role to user

**post** `/organization/users/{user_id}/roles`

Assigns an organization role to a user within the organization.

### Path Parameters

- `user_id: string`

### Body Parameters

- `role_id: string`

  Identifier of the role to assign.

### Returns

- `object: "user.role"`

  Always `user.role`.

  - `"user.role"`

- `role: Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `user: OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role_id": "role_id"
        }'
```

#### Response

```json
{
  "object": "user.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  },
  "user": {
    "id": "id",
    "added_at": 0,
    "object": "organization.user",
    "api_key_last_used_at": 0,
    "created": 0,
    "developer_persona": "developer_persona",
    "email": "email",
    "is_default": true,
    "is_scale_tier_authorized_purchaser": true,
    "is_scim_managed": true,
    "is_service_account": true,
    "name": "name",
    "projects": {
      "data": [
        {
          "id": "id",
          "name": "name",
          "role": "role"
        }
      ],
      "object": "list"
    },
    "role": "role",
    "technical_level": "technical_level",
    "user": {
      "id": "id",
      "object": "user",
      "banned": true,
      "banned_at": 0,
      "email": "email",
      "enabled": true,
      "name": "name",
      "picture": "picture"
    }
  }
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/users/user_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8ROLE01"
  }'
```

#### Response

```json
{
    "object": "user.role",
    "user": {
        "object": "organization.user",
        "id": "user_abc123",
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "role": "owner",
        "added_at": 1711470000
    },
    "role": {
        "object": "role",
        "id": "role_01J1F8ROLE01",
        "name": "API Group Manager",
        "description": "Allows managing organization groups",
        "permissions": [
            "api.groups.read",
            "api.groups.write"
        ],
        "resource_type": "api.organization",
        "predefined_role": false
    }
}
```

## Unassign organization role from user

**delete** `/organization/users/{user_id}/roles/{role_id}`

Unassigns an organization role from a user within the organization.

### Path Parameters

- `user_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/users/user_abc123/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "user.role.deleted",
    "deleted": true
}
```

## Domain Types

### Role List Response

- `RoleListResponse object { id, created_at, created_by, 8 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse object { object, role, user }`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: array of string`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: string`

      The identifier, which can be referenced in API endpoints

    - `added_at: number`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: "organization.user"`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: optional number`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: optional number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: optional string`

      The developer persona metadata for the user.

    - `email: optional string`

      The email address of the user

    - `is_default: optional boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: optional boolean`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: optional boolean`

      Whether the user is managed through SCIM.

    - `is_service_account: optional boolean`

      Whether the user is a service account.

    - `name: optional string`

      The name of the user

    - `projects: optional object { data, object }`

      Projects associated with the user, if included.

      - `data: array of object { id, name, role }`

        - `id: optional string`

        - `name: optional string`

        - `role: optional string`

      - `object: "list"`

        - `"list"`

    - `role: optional string`

      `owner` or `reader`

    - `technical_level: optional string`

      The technical level metadata for the user.

    - `user: optional object { id, object, banned, 5 more }`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned: optional boolean`

      - `banned_at: optional number`

      - `email: optional string`

      - `enabled: optional boolean`

      - `name: optional string`

      - `picture: optional string`

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Groups

## List groups

**get** `/organization/groups`

Lists all groups in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: optional "asc" or "desc"`

  Specifies the sort order of the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of Group`

  Groups returned in the current page.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: string`

    The type of the group.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

- `has_more: boolean`

  Whether additional groups are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` if there are no more results.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "group_type": "group_type",
      "is_scim_managed": true,
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/groups?limit=20&order=asc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "group",
            "id": "group_01J1F8ABCDXYZ",
            "name": "Support Team",
            "created_at": 1711471533,
            "is_scim_managed": false
        }
    ],
    "has_more": false,
    "next": null
}
```

## Create group

**post** `/organization/groups`

Creates a new group in the organization.

### Body Parameters

- `name: string`

  Human readable name for the group.

### Returns

- `Group object { id, created_at, group_type, 2 more }`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: string`

    The type of the group.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```http
curl https://api.openai.com/v1/organization/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "x"
        }'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group_type",
  "is_scim_managed": true,
  "name": "name"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Support Team"
  }'
```

#### Response

```json
{
    "object": "group",
    "id": "group_01J1F8ABCDXYZ",
    "name": "Support Team",
    "created_at": 1711471533,
    "is_scim_managed": false
}
```

## Update group

**post** `/organization/groups/{group_id}`

Updates a group's information.

### Path Parameters

- `group_id: string`

### Body Parameters

- `name: string`

  New display name for the group.

### Returns

- `id: string`

  Identifier for the group.

- `created_at: number`

  Unix timestamp (in seconds) when the group was created.

- `is_scim_managed: boolean`

  Whether the group is managed through SCIM and controlled by your identity provider.

- `name: string`

  Updated display name for the group.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "x"
        }'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "is_scim_managed": true,
  "name": "name"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Escalations"
  }'
```

#### Response

```json
{
    "id": "group_01J1F8ABCDXYZ",
    "name": "Escalations",
    "created_at": 1711471533,
    "is_scim_managed": false
}
```

## Delete group

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Path Parameters

- `group_id: string`

### Returns

- `id: string`

  Identifier of the deleted group.

- `deleted: boolean`

  Whether the group was deleted.

- `object: "group.deleted"`

  Always `group.deleted`.

  - `"group.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "group.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.deleted",
    "id": "group_01J1F8ABCDXYZ",
    "deleted": true
}
```

## Domain Types

### Group

- `Group object { id, created_at, group_type, 2 more }`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: string`

    The type of the group.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Group Update Response

- `GroupUpdateResponse object { id, created_at, is_scim_managed, name }`

  Response returned after updating a group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Updated display name for the group.

### Group Delete Response

- `GroupDeleteResponse object { id, deleted, object }`

  Confirmation payload returned after deleting a group.

  - `id: string`

    Identifier of the deleted group.

  - `deleted: boolean`

    Whether the group was deleted.

  - `object: "group.deleted"`

    Always `group.deleted`.

    - `"group.deleted"`

# Users

## List group users

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Path Parameters

- `group_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

- `limit: optional number`

  A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: optional "asc" or "desc"`

  Specifies the sort order of users in the list.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of OrganizationGroupUser`

  Users in the current page.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string`

    The email address of the user.

  - `name: string`

    The name of the user.

- `has_more: boolean`

  Whether more users are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when no further users are available.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "user_abc123",
            "name": "Ada Lovelace",
            "email": "ada@example.com"
        }
    ],
    "has_more": false,
    "next": null
}
```

## Add group user

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Path Parameters

- `group_id: string`

### Body Parameters

- `user_id: string`

  Identifier of the user to add to the group.

### Returns

- `group_id: string`

  Identifier of the group the user was added to.

- `object: "group.user"`

  Always `group.user`.

  - `"group.user"`

- `user_id: string`

  Identifier of the user that was added.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "user_id": "user_id"
        }'
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "user_id": "user_abc123"
  }'
```

#### Response

```json
{
    "object": "group.user",
    "user_id": "user_abc123",
    "group_id": "group_01J1F8ABCDXYZ"
}
```

## Remove group user

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Path Parameters

- `group_id: string`

- `user_id: string`

### Returns

- `deleted: boolean`

  Whether the group membership was removed.

- `object: "group.user.deleted"`

  Always `group.user.deleted`.

  - `"group.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "group.user.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users/user_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.user.deleted",
    "deleted": true
}
```

## Domain Types

### Organization Group User

- `OrganizationGroupUser object { id, email, name }`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string`

    The email address of the user.

  - `name: string`

    The name of the user.

### User Create Response

- `UserCreateResponse object { group_id, object, user_id }`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### User Delete Response

- `UserDeleteResponse object { deleted, object }`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

# Roles

## List group organization role assignments

**get** `/organization/groups/{group_id}/roles`

Lists the organization roles assigned to a group within the organization.

### Path Parameters

- `group_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

- `limit: optional number`

  A limit on the number of organization role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned organization roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, created_by, 8 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

- `has_more: boolean`

  Whether additional assignments are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more assignments.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8ROLE01",
            "name": "API Group Manager",
            "permissions": [
                "api.groups.read",
                "api.groups.write"
            ],
            "resource_type": "api.organization",
            "predefined_role": false,
            "description": "Allows managing organization groups",
            "created_at": 1711471533,
            "updated_at": 1711472599,
            "created_by": "user_abc123",
            "created_by_user_obj": {
                "id": "user_abc123",
                "name": "Ada Lovelace",
                "email": "ada@example.com"
            },
            "metadata": {}
        }
    ],
    "has_more": false,
    "next": null
}
```

## Assign organization role to group

**post** `/organization/groups/{group_id}/roles`

Assigns an organization role to a group within the organization.

### Path Parameters

- `group_id: string`

### Body Parameters

- `role_id: string`

  Identifier of the role to assign.

### Returns

- `group: object { id, created_at, name, 2 more }`

  Summary information about a group returned in role assignment responses.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `name: string`

    Display name of the group.

  - `object: "group"`

    Always `group`.

    - `"group"`

  - `scim_managed: boolean`

    Whether the group is managed through SCIM.

- `object: "group.role"`

  Always `group.role`.

  - `"group.role"`

- `role: Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role_id": "role_id"
        }'
```

#### Response

```json
{
  "group": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "group",
    "scim_managed": true
  },
  "object": "group.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  }
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8ROLE01"
  }'
```

#### Response

```json
{
    "object": "group.role",
    "group": {
        "object": "group",
        "id": "group_01J1F8ABCDXYZ",
        "name": "Support Team",
        "created_at": 1711471533,
        "scim_managed": false
    },
    "role": {
        "object": "role",
        "id": "role_01J1F8ROLE01",
        "name": "API Group Manager",
        "description": "Allows managing organization groups",
        "permissions": [
            "api.groups.read",
            "api.groups.write"
        ],
        "resource_type": "api.organization",
        "predefined_role": false
    }
}
```

## Unassign organization role from group

**delete** `/organization/groups/{group_id}/roles/{role_id}`

Unassigns an organization role from a group within the organization.

### Path Parameters

- `group_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.role.deleted",
    "deleted": true
}
```

## Domain Types

### Role List Response

- `RoleListResponse object { id, created_at, created_by, 8 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse object { group, object, role }`

  Role assignment linking a group to a role.

  - `group: object { id, created_at, name, 2 more }`

    Summary information about a group returned in role assignment responses.

    - `id: string`

      Identifier for the group.

    - `created_at: number`

      Unix timestamp (in seconds) when the group was created.

    - `name: string`

      Display name of the group.

    - `object: "group"`

      Always `group`.

      - `"group"`

    - `scim_managed: boolean`

      Whether the group is managed through SCIM.

  - `object: "group.role"`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: array of string`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List organization roles

**get** `/organization/roles`

Lists the roles configured for the organization.

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: optional number`

  A limit on the number of roles to return. Defaults to 1000.

- `order: optional "asc" or "desc"`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of Role`

  Roles returned in the current page.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `has_more: boolean`

  Whether more roles are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no additional roles.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "description": "description",
      "name": "name",
      "object": "role",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/roles?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "role",
            "id": "role_01J1F8ROLE01",
            "name": "API Group Manager",
            "description": "Allows managing organization groups",
            "permissions": [
                "api.groups.read",
                "api.groups.write"
            ],
            "resource_type": "api.organization",
            "predefined_role": false
        }
    ],
    "has_more": false,
    "next": null
}
```

## Create organization role

**post** `/organization/roles`

Creates a custom role for the organization.

### Body Parameters

- `permissions: array of string`

  Permissions to grant to the role.

- `role_name: string`

  Unique name for the role.

- `description: optional string`

  Optional description of the role.

### Returns

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/organization/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "permissions": [
            "string"
          ],
          "role_name": "role_name"
        }'
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Group Manager",
      "permissions": [
          "api.groups.read",
          "api.groups.write"
      ],
      "description": "Allows managing organization groups"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8ROLE01",
    "name": "API Group Manager",
    "description": "Allows managing organization groups",
    "permissions": [
        "api.groups.read",
        "api.groups.write"
    ],
    "resource_type": "api.organization",
    "predefined_role": false
}
```

## Update organization role

**post** `/organization/roles/{role_id}`

Updates an existing organization role.

### Path Parameters

- `role_id: string`

### Body Parameters

- `description: optional string`

  New description for the role.

- `permissions: optional array of string`

  Updated set of permissions for the role.

- `role_name: optional string`

  New name for the role.

### Returns

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/organization/roles/$ROLE_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Group Manager",
      "permissions": [
          "api.groups.read",
          "api.groups.write"
      ],
      "description": "Allows managing organization groups"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8ROLE01",
    "name": "API Group Manager",
    "description": "Allows managing organization groups",
    "permissions": [
        "api.groups.read",
        "api.groups.write"
    ],
    "resource_type": "api.organization",
    "predefined_role": false
}
```

## Delete organization role

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Path Parameters

- `role_id: string`

### Returns

- `id: string`

  Identifier of the deleted role.

- `deleted: boolean`

  Whether the role was deleted.

- `object: "role.deleted"`

  Always `role.deleted`.

  - `"role.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "role.deleted",
    "id": "role_01J1F8ROLE01",
    "deleted": true
}
```

## Domain Types

### Role

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `RoleDeleteResponse object { id, deleted, object }`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

# Certificates

## List organization certificates

**get** `/organization/certificates`

List uploaded certificates for this organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/certificates \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.certificate"
    }
  ],
  "first_id": "cert_abc",
  "has_more": true,
  "last_id": "cert_abc",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/certificates \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
  "first_id": "cert_abc",
  "last_id": "cert_abc",
  "has_more": false
}
```

## Upload certificate

**post** `/organization/certificates`

Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.

### Body Parameters

- `certificate: string`

  The certificate content in PEM format

- `name: optional string`

  An optional name for the certificate

### Returns

- `Certificate object { id, certificate_details, created_at, 3 more }`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```http
curl https://api.openai.com/v1/organization/certificates \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate": "certificate"
        }'
```

#### Response

```json
{
  "id": "id",
  "certificate_details": {
    "content": "content",
    "expires_at": 0,
    "valid_at": 0
  },
  "created_at": 0,
  "name": "name",
  "object": "certificate",
  "active": true
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/certificates \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "name": "My Example Certificate",
  "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDeT...\\n-----END CERTIFICATE-----"
}'
```

#### Response

```json
{
  "object": "certificate",
  "id": "cert_abc",
  "name": "My Example Certificate",
  "created_at": 1234567,
  "certificate_details": {
    "valid_at": 12345667,
    "expires_at": 12345678
  }
}
```

## Get certificate

**get** `/organization/certificates/{certificate_id}`

Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.

### Path Parameters

- `certificate_id: string`

### Query Parameters

- `include: optional array of "content"`

  A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate.

  - `"content"`

### Returns

- `Certificate object { id, certificate_details, created_at, 3 more }`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```http
curl https://api.openai.com/v1/organization/certificates/$CERTIFICATE_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "certificate_details": {
    "content": "content",
    "expires_at": 0,
    "valid_at": 0
  },
  "created_at": 0,
  "name": "name",
  "object": "certificate",
  "active": true
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/certificates/cert_abc?include[]=content" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "certificate",
  "id": "cert_abc",
  "name": "My Example Certificate",
  "created_at": 1234567,
  "certificate_details": {
    "valid_at": 1234567,
    "expires_at": 12345678,
    "content": "-----BEGIN CERTIFICATE-----MIIDeT...-----END CERTIFICATE-----"
  }
}
```

## Modify certificate

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Path Parameters

- `certificate_id: string`

### Body Parameters

- `name: optional string`

  The updated name for the certificate

### Returns

- `Certificate object { id, certificate_details, created_at, 3 more }`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```http
curl https://api.openai.com/v1/organization/certificates/$CERTIFICATE_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "certificate_details": {
    "content": "content",
    "expires_at": 0,
    "valid_at": 0
  },
  "created_at": 0,
  "name": "name",
  "object": "certificate",
  "active": true
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/certificates/cert_abc \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "name": "Renamed Certificate"
}'
```

#### Response

```json
{
  "object": "certificate",
  "id": "cert_abc",
  "name": "Renamed Certificate",
  "created_at": 1234567,
  "certificate_details": {
    "valid_at": 12345667,
    "expires_at": 12345678
  }
}
```

## Delete certificate

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

### Path Parameters

- `certificate_id: string`

### Returns

- `id: string`

  The ID of the certificate that was deleted.

- `object: "certificate.deleted"`

  The object type, must be `certificate.deleted`.

  - `"certificate.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/certificates/cert_abc \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "certificate.deleted",
  "id": "cert_abc"
}
```

## Activate certificates for organization

**post** `/organization/certificates/activate`

Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

- `object: "organization.certificate.activation"`

  The organization certificate activation result type.

  - `"organization.certificate.activation"`

### Example

```http
curl https://api.openai.com/v1/organization/certificates/activate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.certificate"
    }
  ],
  "object": "organization.certificate.activation"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/certificates/activate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.certificate.activation",
  "data": [
    {
      "object": "organization.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```

## Deactivate certificates for organization

**post** `/organization/certificates/deactivate`

Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

- `object: "organization.certificate.deactivation"`

  The organization certificate deactivation result type.

  - `"organization.certificate.deactivation"`

### Example

```http
curl https://api.openai.com/v1/organization/certificates/deactivate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.certificate"
    }
  ],
  "object": "organization.certificate.deactivation"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/certificates/deactivate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.certificate.deactivation",
  "data": [
    {
      "object": "organization.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```

## Domain Types

### Certificate

- `Certificate object { id, certificate_details, created_at, 3 more }`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Certificate List Response

- `CertificateListResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Delete Response

- `CertificateDeleteResponse object { id, object }`

  - `id: string`

    The ID of the certificate that was deleted.

  - `object: "certificate.deleted"`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Certificate Activate Response

- `CertificateActivateResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Deactivate Response

- `CertificateDeactivateResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

# Projects

## List projects

**get** `/organization/projects`

Returns a list of projects.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `include_archived: optional boolean`

  If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of Project`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "organization.project",
      "archived_at": 0,
      "external_key_id": "external_key_id",
      "name": "name",
      "status": "status"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects?after=proj_abc&limit=20&include_archived=false \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "proj_abc",
            "object": "organization.project",
            "name": "Project example",
            "created_at": 1711471533,
            "archived_at": null,
            "status": "active"
        }
    ],
    "first_id": "proj-abc",
    "last_id": "proj-xyz",
    "has_more": false
}
```

## Create project

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Body Parameters

- `name: string`

  The friendly name of the project, this name appears in reports.

- `external_key_id: optional string`

  External key ID to associate with the project.

- `geography: optional string`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "name"
        }'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Project ABC"
  }'
```

#### Response

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project ABC",
    "created_at": 1711471533,
    "archived_at": null,
    "status": "active"
}
```

## Retrieve project

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Path Parameters

- `project_id: string`

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project example",
    "created_at": 1711471533,
    "archived_at": null,
    "status": "active"
}
```

## Modify project

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Path Parameters

- `project_id: string`

### Body Parameters

- `external_key_id: optional string`

  External key ID to associate with the project.

- `geography: optional string`

  Geography for the project.

- `name: optional string`

  The updated name of the project, this name appears in reports.

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Project DEF"
  }'
```

## Archive project

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Path Parameters

- `project_id: string`

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/archive \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/archive \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project DEF",
    "created_at": 1711471533,
    "archived_at": 1711471533,
    "status": "archived"
}
```

## Domain Types

### Project

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

# Users

## List project users

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectUser`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

- `has_more: boolean`

- `object: string`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "added_at": 0,
      "object": "organization.project.user",
      "role": "role",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "object": "object",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/users?after=user_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.user",
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "added_at": 1711471533
        }
    ],
    "first_id": "user-abc",
    "last_id": "user-xyz",
    "has_more": false
}
```

## Create project user

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `role: string`

  `owner` or `member`

- `email: optional string`

  Email of the user to add.

- `user_id: optional string`

  The ID of the user.

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role": "role"
        }'
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/users \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "user_id": "user_abc",
      "role": "member"
  }'
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Retrieve project user

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Modify project user

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Body Parameters

- `role: optional string`

  `owner` or `member`

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role": "owner"
  }'
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Delete project user

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.user.deleted"`

  - `"organization.project.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.user.deleted",
    "id": "user_abc",
    "deleted": true
}
```

## Domain Types

### Project User

- `ProjectUser object { id, added_at, object, 3 more }`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### User Delete Response

- `UserDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

# Roles

## List project user role assignments

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: optional number`

  A limit on the number of project role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, created_by, 8 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

- `has_more: boolean`

  Whether additional assignments are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more assignments.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/users/$USER_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/projects/proj_abc123/users/user_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8PROJ",
            "name": "API Project Key Manager",
            "permissions": [
                "api.organization.projects.api_keys.read",
                "api.organization.projects.api_keys.write"
            ],
            "resource_type": "api.project",
            "predefined_role": false,
            "description": "Allows managing API keys for the project",
            "created_at": 1711471533,
            "updated_at": 1711472599,
            "created_by": "user_abc123",
            "created_by_user_obj": {
                "id": "user_abc123",
                "name": "Ada Lovelace",
                "email": "ada@example.com"
            },
            "metadata": {}
        }
    ],
    "has_more": false,
    "next": null
}
```

## Assign project role to user

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Body Parameters

- `role_id: string`

  Identifier of the role to assign.

### Returns

- `object: "user.role"`

  Always `user.role`.

  - `"user.role"`

- `role: Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `user: OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/users/$USER_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role_id": "role_id"
        }'
```

#### Response

```json
{
  "object": "user.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  },
  "user": {
    "id": "id",
    "added_at": 0,
    "object": "organization.user",
    "api_key_last_used_at": 0,
    "created": 0,
    "developer_persona": "developer_persona",
    "email": "email",
    "is_default": true,
    "is_scale_tier_authorized_purchaser": true,
    "is_scim_managed": true,
    "is_service_account": true,
    "name": "name",
    "projects": {
      "data": [
        {
          "id": "id",
          "name": "name",
          "role": "role"
        }
      ],
      "object": "list"
    },
    "role": "role",
    "technical_level": "technical_level",
    "user": {
      "id": "id",
      "object": "user",
      "banned": true,
      "banned_at": 0,
      "email": "email",
      "enabled": true,
      "name": "name",
      "picture": "picture"
    }
  }
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/users/user_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8PROJ"
  }'
```

#### Response

```json
{
    "object": "user.role",
    "user": {
        "object": "organization.user",
        "id": "user_abc123",
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "role": "owner",
        "added_at": 1711470000
    },
    "role": {
        "object": "role",
        "id": "role_01J1F8PROJ",
        "name": "API Project Key Manager",
        "description": "Allows managing API keys for the project",
        "permissions": [
            "api.organization.projects.api_keys.read",
            "api.organization.projects.api_keys.write"
        ],
        "resource_type": "api.project",
        "predefined_role": false
    }
}
```

## Unassign project role from user

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Path Parameters

- `project_id: string`

- `user_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/users/$USER_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/users/user_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "user.role.deleted",
    "deleted": true
}
```

## Domain Types

### Role List Response

- `RoleListResponse object { id, created_at, created_by, 8 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse object { object, role, user }`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: array of string`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: string`

      The identifier, which can be referenced in API endpoints

    - `added_at: number`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: "organization.user"`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: optional number`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: optional number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: optional string`

      The developer persona metadata for the user.

    - `email: optional string`

      The email address of the user

    - `is_default: optional boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: optional boolean`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: optional boolean`

      Whether the user is managed through SCIM.

    - `is_service_account: optional boolean`

      Whether the user is a service account.

    - `name: optional string`

      The name of the user

    - `projects: optional object { data, object }`

      Projects associated with the user, if included.

      - `data: array of object { id, name, role }`

        - `id: optional string`

        - `name: optional string`

        - `role: optional string`

      - `object: "list"`

        - `"list"`

    - `role: optional string`

      `owner` or `reader`

    - `technical_level: optional string`

      The technical level metadata for the user.

    - `user: optional object { id, object, banned, 5 more }`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned: optional boolean`

      - `banned_at: optional number`

      - `email: optional string`

      - `enabled: optional boolean`

      - `name: optional string`

      - `picture: optional string`

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Service Accounts

## List project service accounts

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectServiceAccount`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "object": "organization.project.service_account",
      "role": "owner"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/service_accounts?after=custom_id&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.service_account",
            "id": "svc_acct_abc",
            "name": "Service Account",
            "role": "owner",
            "created_at": 1711471533
        }
    ],
    "first_id": "svc_acct_abc",
    "last_id": "svc_acct_xyz",
    "has_more": false
}
```

## Create project service account

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Path Parameters

- `project_id: string`

### Body Parameters

- `name: string`

  The name of the service account being created.

### Returns

- `id: string`

- `api_key: object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account.api_key"`

    The object type, which is always `organization.project.service_account.api_key`

    - `"organization.project.service_account.api_key"`

  - `value: string`

- `created_at: number`

- `name: string`

- `object: "organization.project.service_account"`

  - `"organization.project.service_account"`

- `role: "member"`

  Service accounts can only have one role of type `member`

  - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "name"
        }'
```

#### Response

```json
{
  "id": "id",
  "api_key": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "organization.project.service_account.api_key",
    "value": "value"
  },
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "member"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/service_accounts \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Production App"
  }'
```

#### Response

```json
{
    "object": "organization.project.service_account",
    "id": "svc_acct_abc",
    "name": "Production App",
    "role": "member",
    "created_at": 1711471533,
    "api_key": {
        "object": "organization.project.service_account.api_key",
        "value": "sk-abcdefghijklmnop123",
        "name": "Secret Key",
        "created_at": 1711471533,
        "id": "key_abc"
    }
}
```

## Retrieve project service account

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `ProjectServiceAccount object { id, created_at, name, 2 more }`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "owner"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.service_account",
    "id": "svc_acct_abc",
    "name": "Service Account",
    "role": "owner",
    "created_at": 1711471533
}
```

## Delete project service account

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.service_account.deleted"`

  - `"organization.project.service_account.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.service_account.deleted",
    "id": "svc_acct_abc",
    "deleted": true
}
```

## Domain Types

### Project Service Account

- `ProjectServiceAccount object { id, created_at, name, 2 more }`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `ServiceAccountCreateResponse object { id, api_key, created_at, 3 more }`

  - `id: string`

  - `api_key: object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: number`

    - `name: string`

    - `object: "organization.project.service_account.api_key"`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account"`

    - `"organization.project.service_account"`

  - `role: "member"`

    Service accounts can only have one role of type `member`

    - `"member"`

### Service Account Delete Response

- `ServiceAccountDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

# API Keys

## List project API keys

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectAPIKey`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "last_used_at": 0,
      "name": "name",
      "object": "organization.project.api_key",
      "owner": {
        "service_account": {
          "id": "id",
          "created_at": 0,
          "name": "name",
          "role": "role"
        },
        "type": "user",
        "user": {
          "id": "id",
          "created_at": 0,
          "email": "email",
          "name": "name",
          "role": "role"
        }
      },
      "redacted_value": "redacted_value"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys?after=key_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.api_key",
            "redacted_value": "sk-abc...def",
            "name": "My API Key",
            "created_at": 1711471533,
            "last_used_at": 1711471534,
            "id": "key_abc",
            "owner": {
                "type": "user",
                "user": {
                    "id": "user_abc",
                    "name": "First Last",
                    "email": "user@example.com",
                    "role": "owner",
                    "created_at": 1711471533
                }
            }
        }
    ],
    "first_id": "key_abc",
    "last_id": "key_xyz",
    "has_more": false
}
```

## Retrieve project API key

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Path Parameters

- `project_id: string`

- `api_key_id: string`

### Returns

- `ProjectAPIKey object { id, created_at, last_used_at, 4 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "last_used_at": 0,
  "name": "name",
  "object": "organization.project.api_key",
  "owner": {
    "service_account": {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "role": "role"
    },
    "type": "user",
    "user": {
      "id": "id",
      "created_at": 0,
      "email": "email",
      "name": "name",
      "role": "role"
    }
  },
  "redacted_value": "redacted_value"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.api_key",
    "redacted_value": "sk-abc...def",
    "name": "My API Key",
    "created_at": 1711471533,
    "last_used_at": 1711471534,
    "id": "key_abc",
    "owner": {
        "type": "user",
        "user": {
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "created_at": 1711471533
        }
    }
}
```

## Delete project API key

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Path Parameters

- `project_id: string`

- `api_key_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.api_key.deleted"`

  - `"organization.project.api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.api_key.deleted",
    "id": "key_abc",
    "deleted": true
}
```

## Domain Types

### Project API Key

- `ProjectAPIKey object { id, created_at, last_used_at, 4 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

### API Key Delete Response

- `APIKeyDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

# Rate Limits

## List project rate limits

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `data: array of ProjectRateLimit`

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "max_requests_per_1_minute": 0,
      "max_tokens_per_1_minute": 0,
      "model": "model",
      "object": "project.rate_limit",
      "batch_1_day_max_input_tokens": 0,
      "max_audio_megabytes_per_1_minute": 0,
      "max_images_per_1_minute": 0,
      "max_requests_per_1_day": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/rate_limits?after=rl_xxx&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
          "object": "project.rate_limit",
          "id": "rl-ada",
          "model": "ada",
          "max_requests_per_1_minute": 600,
          "max_tokens_per_1_minute": 150000,
          "max_images_per_1_minute": 10
        }
    ],
    "first_id": "rl-ada",
    "last_id": "rl-ada",
    "has_more": false
}
```

## Modify project rate limit

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Path Parameters

- `project_id: string`

- `rate_limit_id: string`

### Body Parameters

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

### Returns

- `ProjectRateLimit object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

  Represents a project rate limit config.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits/$RATE_LIMIT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "max_requests_per_1_minute": 0,
  "max_tokens_per_1_minute": 0,
  "model": "model",
  "object": "project.rate_limit",
  "batch_1_day_max_input_tokens": 0,
  "max_audio_megabytes_per_1_minute": 0,
  "max_images_per_1_minute": 0,
  "max_requests_per_1_day": 0
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/rate_limits/rl_xxx \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "max_requests_per_1_minute": 500
  }'
```

#### Response

```json
{
    "object": "project.rate_limit",
    "id": "rl-ada",
    "model": "ada",
    "max_requests_per_1_minute": 600,
    "max_tokens_per_1_minute": 150000,
    "max_images_per_1_minute": 10
  }
```

## Domain Types

### Project Rate Limit

- `ProjectRateLimit object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

  Represents a project rate limit config.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

# Groups

## List project groups

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

- `limit: optional number`

  A limit on the number of project groups to return. Defaults to 20.

- `order: optional "asc" or "desc"`

  Sort order for the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of ProjectGroup`

  Project group memberships returned in the current page.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: string`

    The type of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

- `has_more: boolean`

  Whether additional project group memberships are available.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more results.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
      "group_type": "group_type",
      "object": "project.group",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc123/groups?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "project.group",
            "project_id": "proj_abc123",
            "group_id": "group_01J1F8ABCDXYZ",
            "group_name": "Support Team",
            "created_at": 1711471533
        }
    ],
    "has_more": false,
    "next": null
}
```

## Add project group

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `group_id: string`

  Identifier of the group to add to the project.

- `role: string`

  Identifier of the project role to grant to the group.

### Returns

- `ProjectGroup object { created_at, group_id, group_name, 3 more }`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: string`

    The type of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "group_id": "group_id",
          "role": "role"
        }'
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group_type",
  "object": "project.group",
  "project_id": "project_id"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/groups \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "group_id": "group_01J1F8ABCDXYZ",
      "role": "role_01J1F8PROJ"
  }'
```

#### Response

```json
{
    "object": "project.group",
    "project_id": "proj_abc123",
    "group_id": "group_01J1F8ABCDXYZ",
    "group_name": "Support Team",
    "created_at": 1711471533
}
```

## Remove project group

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Returns

- `deleted: boolean`

  Whether the group membership in the project was removed.

- `object: "project.group.deleted"`

  Always `project.group.deleted`.

  - `"project.group.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc123/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "project.group.deleted",
    "deleted": true
}
```

## Domain Types

### Project Group

- `ProjectGroup object { created_at, group_id, group_name, 3 more }`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: string`

    The type of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Group Delete Response

- `GroupDeleteResponse object { deleted, object }`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

# Roles

## List project group role assignments

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: optional number`

  A limit on the number of project role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, created_by, 8 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

- `has_more: boolean`

  Whether additional assignments are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more assignments.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/projects/proj_abc123/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8PROJ",
            "name": "API Project Key Manager",
            "permissions": [
                "api.organization.projects.api_keys.read",
                "api.organization.projects.api_keys.write"
            ],
            "resource_type": "api.project",
            "predefined_role": false,
            "description": "Allows managing API keys for the project",
            "created_at": 1711471533,
            "updated_at": 1711472599,
            "created_by": "user_abc123",
            "created_by_user_obj": {
                "id": "user_abc123",
                "name": "Ada Lovelace",
                "email": "ada@example.com"
            },
            "metadata": {}
        }
    ],
    "has_more": false,
    "next": null
}
```

## Assign project role to group

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Body Parameters

- `role_id: string`

  Identifier of the role to assign.

### Returns

- `group: object { id, created_at, name, 2 more }`

  Summary information about a group returned in role assignment responses.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `name: string`

    Display name of the group.

  - `object: "group"`

    Always `group`.

    - `"group"`

  - `scim_managed: boolean`

    Whether the group is managed through SCIM.

- `object: "group.role"`

  Always `group.role`.

  - `"group.role"`

- `role: Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role_id": "role_id"
        }'
```

#### Response

```json
{
  "group": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "group",
    "scim_managed": true
  },
  "object": "group.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  }
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8PROJ"
  }'
```

#### Response

```json
{
    "object": "group.role",
    "group": {
        "object": "group",
        "id": "group_01J1F8ABCDXYZ",
        "name": "Support Team",
        "created_at": 1711471533,
        "scim_managed": false
    },
    "role": {
        "object": "role",
        "id": "role_01J1F8PROJ",
        "name": "API Project Key Manager",
        "description": "Allows managing API keys for the project",
        "permissions": [
            "api.organization.projects.api_keys.read",
            "api.organization.projects.api_keys.write"
        ],
        "resource_type": "api.project",
        "predefined_role": false
    }
}
```

## Unassign project role from group

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/groups/group_01J1F8ABCDXYZ/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.role.deleted",
    "deleted": true
}
```

## Domain Types

### Role List Response

- `RoleListResponse object { id, created_at, created_by, 8 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse object { group, object, role }`

  Role assignment linking a group to a role.

  - `group: object { id, created_at, name, 2 more }`

    Summary information about a group returned in role assignment responses.

    - `id: string`

      Identifier for the group.

    - `created_at: number`

      Unix timestamp (in seconds) when the group was created.

    - `name: string`

      Display name of the group.

    - `object: "group"`

      Always `group`.

      - `"group"`

    - `scim_managed: boolean`

      Whether the group is managed through SCIM.

  - `object: "group.role"`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: array of string`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List project roles

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: optional number`

  A limit on the number of roles to return. Defaults to 1000.

- `order: optional "asc" or "desc"`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of Role`

  Roles returned in the current page.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `has_more: boolean`

  Whether more roles are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no additional roles.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "description": "description",
      "name": "name",
      "object": "role",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/projects/proj_abc123/roles?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "role",
            "id": "role_01J1F8PROJ",
            "name": "API Project Key Manager",
            "description": "Allows managing API keys for the project",
            "permissions": [
                "api.organization.projects.api_keys.read",
                "api.organization.projects.api_keys.write"
            ],
            "resource_type": "api.project",
            "predefined_role": false
        }
    ],
    "has_more": false,
    "next": null
}
```

## Create project role

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `permissions: array of string`

  Permissions to grant to the role.

- `role_name: string`

  Unique name for the role.

- `description: optional string`

  Optional description of the role.

### Returns

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "permissions": [
            "string"
          ],
          "role_name": "role_name"
        }'
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Project Key Manager",
      "permissions": [
          "api.organization.projects.api_keys.read",
          "api.organization.projects.api_keys.write"
      ],
      "description": "Allows managing API keys for the project"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8PROJ",
    "name": "API Project Key Manager",
    "description": "Allows managing API keys for the project",
    "permissions": [
        "api.organization.projects.api_keys.read",
        "api.organization.projects.api_keys.write"
    ],
    "resource_type": "api.project",
    "predefined_role": false
}
```

## Update project role

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Path Parameters

- `project_id: string`

- `role_id: string`

### Body Parameters

- `description: optional string`

  New description for the role.

- `permissions: optional array of string`

  Updated set of permissions for the role.

- `role_name: optional string`

  New name for the role.

### Returns

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles/$ROLE_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Project Key Manager",
      "permissions": [
          "api.organization.projects.api_keys.read",
          "api.organization.projects.api_keys.write"
      ],
      "description": "Allows managing API keys for the project"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8PROJ",
    "name": "API Project Key Manager",
    "description": "Allows managing API keys for the project",
    "permissions": [
        "api.organization.projects.api_keys.read",
        "api.organization.projects.api_keys.write"
    ],
    "resource_type": "api.project",
    "predefined_role": false
}
```

## Delete project role

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Path Parameters

- `project_id: string`

- `role_id: string`

### Returns

- `id: string`

  Identifier of the deleted role.

- `deleted: boolean`

  Whether the role was deleted.

- `object: "role.deleted"`

  Always `role.deleted`.

  - `"role.deleted"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "role.deleted",
    "id": "role_01J1F8PROJ",
    "deleted": true
}
```

## Domain Types

### Role Delete Response

- `RoleDeleteResponse object { id, deleted, object }`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

# Certificates

## List project certificates

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.project.certificate"
    }
  ],
  "first_id": "cert_abc",
  "has_more": true,
  "last_id": "cert_abc",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
  "first_id": "cert_abc",
  "last_id": "cert_abc",
  "has_more": false
}
```

## Activate certificates for project

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `object: "organization.project.certificate.activation"`

  The project certificate activation result type.

  - `"organization.project.certificate.activation"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/activate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.project.certificate"
    }
  ],
  "object": "organization.project.certificate.activation"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates/activate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.project.certificate.activation",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.project.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```

## Deactivate certificates for project

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `object: "organization.project.certificate.deactivation"`

  The project certificate deactivation result type.

  - `"organization.project.certificate.deactivation"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/deactivate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.project.certificate"
    }
  ],
  "object": "organization.project.certificate.deactivation"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates/deactivate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.project.certificate.deactivation",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.project.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```

## Domain Types

### Certificate List Response

- `CertificateListResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Activate Response

- `CertificateActivateResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Deactivate Response

- `CertificateDeactivateResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`
