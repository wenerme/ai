# Admin

# Organization

# Audit Logs

## List audit logs

`admin.organization.audit_logs.list(AuditLogListParams**kwargs)  -> SyncConversationCursorPage[AuditLogListResponse]`

**get** `/organization/audit_logs`

List user actions and configuration changes within this organization.

### Parameters

- `actor_emails: Optional[Sequence[str]]`

  Return only events performed by users with these emails.

- `actor_ids: Optional[Sequence[str]]`

  Return only events performed by these actors. Can be a user ID, a service account ID, or an api key tracking ID.

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `effective_at: Optional[EffectiveAt]`

  Return only events whose `effective_at` (Unix seconds) is in this range.

  - `gt: Optional[int]`

    Return only events whose `effective_at` (Unix seconds) is greater than this value.

  - `gte: Optional[int]`

    Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.

  - `lt: Optional[int]`

    Return only events whose `effective_at` (Unix seconds) is less than this value.

  - `lte: Optional[int]`

    Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.

- `event_types: Optional[List[Literal["api_key.created", "api_key.updated", "api_key.deleted", 48 more]]]`

  Return only events with a `type` in one of these values. For example, `project.created`. For all options, see the documentation for the [audit log object](https://platform.openai.com/docs/api-reference/audit-logs/object).

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

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `project_ids: Optional[Sequence[str]]`

  Return only events for these projects.

- `resource_ids: Optional[Sequence[str]]`

  Return only events performed on these targets. For example, a project ID updated.

### Returns

- `class AuditLogListResponse: …`

  A log of a user action or configuration change within this organization.

  - `id: str`

    The ID of this log.

  - `effective_at: int`

    The Unix timestamp (in seconds) of the event.

  - `type: Literal["api_key.created", "api_key.updated", "api_key.deleted", 48 more]`

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

  - `actor: Optional[Actor]`

    The actor who performed the audit logged action.

    - `api_key: Optional[ActorAPIKey]`

      The API Key used to perform the audit logged action.

      - `id: Optional[str]`

        The tracking id of the API key.

      - `service_account: Optional[ActorAPIKeyServiceAccount]`

        The service account that performed the audit logged action.

        - `id: Optional[str]`

          The service account id.

      - `type: Optional[Literal["user", "service_account"]]`

        The type of API key. Can be either `user` or `service_account`.

        - `"user"`

        - `"service_account"`

      - `user: Optional[ActorAPIKeyUser]`

        The user who performed the audit logged action.

        - `id: Optional[str]`

          The user id.

        - `email: Optional[str]`

          The user email.

    - `session: Optional[ActorSession]`

      The session in which the audit logged action was performed.

      - `ip_address: Optional[str]`

        The IP address from which the action was performed.

      - `user: Optional[ActorSessionUser]`

        The user who performed the audit logged action.

        - `id: Optional[str]`

          The user id.

        - `email: Optional[str]`

          The user email.

    - `type: Optional[Literal["session", "api_key"]]`

      The type of actor. Is either `session` or `api_key`.

      - `"session"`

      - `"api_key"`

  - `api_key_created: Optional[APIKeyCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The tracking ID of the API key.

    - `data: Optional[APIKeyCreatedData]`

      The payload used to create the API key.

      - `scopes: Optional[List[str]]`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `api_key_deleted: Optional[APIKeyDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The tracking ID of the API key.

  - `api_key_updated: Optional[APIKeyUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The tracking ID of the API key.

    - `changes_requested: Optional[APIKeyUpdatedChangesRequested]`

      The payload used to update the API key.

      - `scopes: Optional[List[str]]`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `certificate_created: Optional[CertificateCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The certificate ID.

    - `name: Optional[str]`

      The name of the certificate.

  - `certificate_deleted: Optional[CertificateDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The certificate ID.

    - `certificate: Optional[str]`

      The certificate content in PEM format.

    - `name: Optional[str]`

      The name of the certificate.

  - `certificate_updated: Optional[CertificateUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The certificate ID.

    - `name: Optional[str]`

      The name of the certificate.

  - `certificates_activated: Optional[CertificatesActivated]`

    The details for events with this `type`.

    - `certificates: Optional[List[CertificatesActivatedCertificate]]`

      - `id: Optional[str]`

        The certificate ID.

      - `name: Optional[str]`

        The name of the certificate.

  - `certificates_deactivated: Optional[CertificatesDeactivated]`

    The details for events with this `type`.

    - `certificates: Optional[List[CertificatesDeactivatedCertificate]]`

      - `id: Optional[str]`

        The certificate ID.

      - `name: Optional[str]`

        The name of the certificate.

  - `checkpoint_permission_created: Optional[CheckpointPermissionCreated]`

    The project and fine-tuned model checkpoint that the checkpoint permission was created for.

    - `id: Optional[str]`

      The ID of the checkpoint permission.

    - `data: Optional[CheckpointPermissionCreatedData]`

      The payload used to create the checkpoint permission.

      - `fine_tuned_model_checkpoint: Optional[str]`

        The ID of the fine-tuned model checkpoint.

      - `project_id: Optional[str]`

        The ID of the project that the checkpoint permission was created for.

  - `checkpoint_permission_deleted: Optional[CheckpointPermissionDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the checkpoint permission.

  - `external_key_registered: Optional[ExternalKeyRegistered]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the external key configuration.

    - `data: Optional[object]`

      The configuration for the external key.

  - `external_key_removed: Optional[ExternalKeyRemoved]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the external key configuration.

  - `group_created: Optional[GroupCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the group.

    - `data: Optional[GroupCreatedData]`

      Information about the created group.

      - `group_name: Optional[str]`

        The group name.

  - `group_deleted: Optional[GroupDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the group.

  - `group_updated: Optional[GroupUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the group.

    - `changes_requested: Optional[GroupUpdatedChangesRequested]`

      The payload used to update the group.

      - `group_name: Optional[str]`

        The updated group name.

  - `invite_accepted: Optional[InviteAccepted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the invite.

  - `invite_deleted: Optional[InviteDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the invite.

  - `invite_sent: Optional[InviteSent]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the invite.

    - `data: Optional[InviteSentData]`

      The payload used to create the invite.

      - `email: Optional[str]`

        The email invited to the organization.

      - `role: Optional[str]`

        The role the email was invited to be. Is either `owner` or `member`.

  - `ip_allowlist_config_activated: Optional[IPAllowlistConfigActivated]`

    The details for events with this `type`.

    - `configs: Optional[List[IPAllowlistConfigActivatedConfig]]`

      The configurations that were activated.

      - `id: Optional[str]`

        The ID of the IP allowlist configuration.

      - `name: Optional[str]`

        The name of the IP allowlist configuration.

  - `ip_allowlist_config_deactivated: Optional[IPAllowlistConfigDeactivated]`

    The details for events with this `type`.

    - `configs: Optional[List[IPAllowlistConfigDeactivatedConfig]]`

      The configurations that were deactivated.

      - `id: Optional[str]`

        The ID of the IP allowlist configuration.

      - `name: Optional[str]`

        The name of the IP allowlist configuration.

  - `ip_allowlist_created: Optional[IPAllowlistCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the IP allowlist configuration.

    - `allowed_ips: Optional[List[str]]`

      The IP addresses or CIDR ranges included in the configuration.

    - `name: Optional[str]`

      The name of the IP allowlist configuration.

  - `ip_allowlist_deleted: Optional[IPAllowlistDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the IP allowlist configuration.

    - `allowed_ips: Optional[List[str]]`

      The IP addresses or CIDR ranges that were in the configuration.

    - `name: Optional[str]`

      The name of the IP allowlist configuration.

  - `ip_allowlist_updated: Optional[IPAllowlistUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the IP allowlist configuration.

    - `allowed_ips: Optional[List[str]]`

      The updated set of IP addresses or CIDR ranges in the configuration.

  - `login_failed: Optional[LoginFailed]`

    The details for events with this `type`.

    - `error_code: Optional[str]`

      The error code of the failure.

    - `error_message: Optional[str]`

      The error message of the failure.

  - `login_succeeded: Optional[object]`

    This event has no additional fields beyond the standard audit log attributes.

  - `logout_failed: Optional[LogoutFailed]`

    The details for events with this `type`.

    - `error_code: Optional[str]`

      The error code of the failure.

    - `error_message: Optional[str]`

      The error message of the failure.

  - `logout_succeeded: Optional[object]`

    This event has no additional fields beyond the standard audit log attributes.

  - `organization_updated: Optional[OrganizationUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The organization ID.

    - `changes_requested: Optional[OrganizationUpdatedChangesRequested]`

      The payload used to update the organization settings.

      - `api_call_logging: Optional[str]`

        How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects`

      - `api_call_logging_project_ids: Optional[str]`

        The list of project ids if api_call_logging is set to `enabled_for_selected_projects`

      - `description: Optional[str]`

        The organization description.

      - `name: Optional[str]`

        The organization name.

      - `threads_ui_visibility: Optional[str]`

        Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.

      - `title: Optional[str]`

        The organization title.

      - `usage_dashboard_visibility: Optional[str]`

        Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`.

  - `project: Optional[Project]`

    The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project.

    - `id: Optional[str]`

      The project ID.

    - `name: Optional[str]`

      The project title.

  - `project_archived: Optional[ProjectArchived]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

  - `project_created: Optional[ProjectCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

    - `data: Optional[ProjectCreatedData]`

      The payload used to create the project.

      - `name: Optional[str]`

        The project name.

      - `title: Optional[str]`

        The title of the project as seen on the dashboard.

  - `project_deleted: Optional[ProjectDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

  - `project_updated: Optional[ProjectUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

    - `changes_requested: Optional[ProjectUpdatedChangesRequested]`

      The payload used to update the project.

      - `title: Optional[str]`

        The title of the project as seen on the dashboard.

  - `rate_limit_deleted: Optional[RateLimitDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The rate limit ID

  - `rate_limit_updated: Optional[RateLimitUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The rate limit ID

    - `changes_requested: Optional[RateLimitUpdatedChangesRequested]`

      The payload used to update the rate limits.

      - `batch_1_day_max_input_tokens: Optional[int]`

        The maximum batch input tokens per day. Only relevant for certain models.

      - `max_audio_megabytes_per_1_minute: Optional[int]`

        The maximum audio megabytes per minute. Only relevant for certain models.

      - `max_images_per_1_minute: Optional[int]`

        The maximum images per minute. Only relevant for certain models.

      - `max_requests_per_1_day: Optional[int]`

        The maximum requests per day. Only relevant for certain models.

      - `max_requests_per_1_minute: Optional[int]`

        The maximum requests per minute.

      - `max_tokens_per_1_minute: Optional[int]`

        The maximum tokens per minute.

  - `role_assignment_created: Optional[RoleAssignmentCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The identifier of the role assignment.

    - `principal_id: Optional[str]`

      The principal (user or group) that received the role.

    - `principal_type: Optional[str]`

      The type of principal (user or group) that received the role.

    - `resource_id: Optional[str]`

      The resource the role assignment is scoped to.

    - `resource_type: Optional[str]`

      The type of resource the role assignment is scoped to.

  - `role_assignment_deleted: Optional[RoleAssignmentDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The identifier of the role assignment.

    - `principal_id: Optional[str]`

      The principal (user or group) that had the role removed.

    - `principal_type: Optional[str]`

      The type of principal (user or group) that had the role removed.

    - `resource_id: Optional[str]`

      The resource the role assignment was scoped to.

    - `resource_type: Optional[str]`

      The type of resource the role assignment was scoped to.

  - `role_created: Optional[RoleCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The role ID.

    - `permissions: Optional[List[str]]`

      The permissions granted by the role.

    - `resource_id: Optional[str]`

      The resource the role is scoped to.

    - `resource_type: Optional[str]`

      The type of resource the role belongs to.

    - `role_name: Optional[str]`

      The name of the role.

  - `role_deleted: Optional[RoleDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The role ID.

  - `role_updated: Optional[RoleUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The role ID.

    - `changes_requested: Optional[RoleUpdatedChangesRequested]`

      The payload used to update the role.

      - `description: Optional[str]`

        The updated role description, when provided.

      - `metadata: Optional[object]`

        Additional metadata stored on the role.

      - `permissions_added: Optional[List[str]]`

        The permissions added to the role.

      - `permissions_removed: Optional[List[str]]`

        The permissions removed from the role.

      - `resource_id: Optional[str]`

        The resource the role is scoped to.

      - `resource_type: Optional[str]`

        The type of resource the role belongs to.

      - `role_name: Optional[str]`

        The updated role name, when provided.

  - `scim_disabled: Optional[ScimDisabled]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the SCIM was disabled for.

  - `scim_enabled: Optional[ScimEnabled]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the SCIM was enabled for.

  - `service_account_created: Optional[ServiceAccountCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The service account ID.

    - `data: Optional[ServiceAccountCreatedData]`

      The payload used to create the service account.

      - `role: Optional[str]`

        The role of the service account. Is either `owner` or `member`.

  - `service_account_deleted: Optional[ServiceAccountDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The service account ID.

  - `service_account_updated: Optional[ServiceAccountUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The service account ID.

    - `changes_requested: Optional[ServiceAccountUpdatedChangesRequested]`

      The payload used to updated the service account.

      - `role: Optional[str]`

        The role of the service account. Is either `owner` or `member`.

  - `user_added: Optional[UserAdded]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The user ID.

    - `data: Optional[UserAddedData]`

      The payload used to add the user to the project.

      - `role: Optional[str]`

        The role of the user. Is either `owner` or `member`.

  - `user_deleted: Optional[UserDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The user ID.

  - `user_updated: Optional[UserUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

    - `changes_requested: Optional[UserUpdatedChangesRequested]`

      The payload used to update the user.

      - `role: Optional[str]`

        The role of the user. Is either `owner` or `member`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.audit_logs.list()
page = page.data[0]
print(page.id)
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

## Domain Types

### Audit Log List Response

- `class AuditLogListResponse: …`

  A log of a user action or configuration change within this organization.

  - `id: str`

    The ID of this log.

  - `effective_at: int`

    The Unix timestamp (in seconds) of the event.

  - `type: Literal["api_key.created", "api_key.updated", "api_key.deleted", 48 more]`

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

  - `actor: Optional[Actor]`

    The actor who performed the audit logged action.

    - `api_key: Optional[ActorAPIKey]`

      The API Key used to perform the audit logged action.

      - `id: Optional[str]`

        The tracking id of the API key.

      - `service_account: Optional[ActorAPIKeyServiceAccount]`

        The service account that performed the audit logged action.

        - `id: Optional[str]`

          The service account id.

      - `type: Optional[Literal["user", "service_account"]]`

        The type of API key. Can be either `user` or `service_account`.

        - `"user"`

        - `"service_account"`

      - `user: Optional[ActorAPIKeyUser]`

        The user who performed the audit logged action.

        - `id: Optional[str]`

          The user id.

        - `email: Optional[str]`

          The user email.

    - `session: Optional[ActorSession]`

      The session in which the audit logged action was performed.

      - `ip_address: Optional[str]`

        The IP address from which the action was performed.

      - `user: Optional[ActorSessionUser]`

        The user who performed the audit logged action.

        - `id: Optional[str]`

          The user id.

        - `email: Optional[str]`

          The user email.

    - `type: Optional[Literal["session", "api_key"]]`

      The type of actor. Is either `session` or `api_key`.

      - `"session"`

      - `"api_key"`

  - `api_key_created: Optional[APIKeyCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The tracking ID of the API key.

    - `data: Optional[APIKeyCreatedData]`

      The payload used to create the API key.

      - `scopes: Optional[List[str]]`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `api_key_deleted: Optional[APIKeyDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The tracking ID of the API key.

  - `api_key_updated: Optional[APIKeyUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The tracking ID of the API key.

    - `changes_requested: Optional[APIKeyUpdatedChangesRequested]`

      The payload used to update the API key.

      - `scopes: Optional[List[str]]`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `certificate_created: Optional[CertificateCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The certificate ID.

    - `name: Optional[str]`

      The name of the certificate.

  - `certificate_deleted: Optional[CertificateDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The certificate ID.

    - `certificate: Optional[str]`

      The certificate content in PEM format.

    - `name: Optional[str]`

      The name of the certificate.

  - `certificate_updated: Optional[CertificateUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The certificate ID.

    - `name: Optional[str]`

      The name of the certificate.

  - `certificates_activated: Optional[CertificatesActivated]`

    The details for events with this `type`.

    - `certificates: Optional[List[CertificatesActivatedCertificate]]`

      - `id: Optional[str]`

        The certificate ID.

      - `name: Optional[str]`

        The name of the certificate.

  - `certificates_deactivated: Optional[CertificatesDeactivated]`

    The details for events with this `type`.

    - `certificates: Optional[List[CertificatesDeactivatedCertificate]]`

      - `id: Optional[str]`

        The certificate ID.

      - `name: Optional[str]`

        The name of the certificate.

  - `checkpoint_permission_created: Optional[CheckpointPermissionCreated]`

    The project and fine-tuned model checkpoint that the checkpoint permission was created for.

    - `id: Optional[str]`

      The ID of the checkpoint permission.

    - `data: Optional[CheckpointPermissionCreatedData]`

      The payload used to create the checkpoint permission.

      - `fine_tuned_model_checkpoint: Optional[str]`

        The ID of the fine-tuned model checkpoint.

      - `project_id: Optional[str]`

        The ID of the project that the checkpoint permission was created for.

  - `checkpoint_permission_deleted: Optional[CheckpointPermissionDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the checkpoint permission.

  - `external_key_registered: Optional[ExternalKeyRegistered]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the external key configuration.

    - `data: Optional[object]`

      The configuration for the external key.

  - `external_key_removed: Optional[ExternalKeyRemoved]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the external key configuration.

  - `group_created: Optional[GroupCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the group.

    - `data: Optional[GroupCreatedData]`

      Information about the created group.

      - `group_name: Optional[str]`

        The group name.

  - `group_deleted: Optional[GroupDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the group.

  - `group_updated: Optional[GroupUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the group.

    - `changes_requested: Optional[GroupUpdatedChangesRequested]`

      The payload used to update the group.

      - `group_name: Optional[str]`

        The updated group name.

  - `invite_accepted: Optional[InviteAccepted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the invite.

  - `invite_deleted: Optional[InviteDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the invite.

  - `invite_sent: Optional[InviteSent]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the invite.

    - `data: Optional[InviteSentData]`

      The payload used to create the invite.

      - `email: Optional[str]`

        The email invited to the organization.

      - `role: Optional[str]`

        The role the email was invited to be. Is either `owner` or `member`.

  - `ip_allowlist_config_activated: Optional[IPAllowlistConfigActivated]`

    The details for events with this `type`.

    - `configs: Optional[List[IPAllowlistConfigActivatedConfig]]`

      The configurations that were activated.

      - `id: Optional[str]`

        The ID of the IP allowlist configuration.

      - `name: Optional[str]`

        The name of the IP allowlist configuration.

  - `ip_allowlist_config_deactivated: Optional[IPAllowlistConfigDeactivated]`

    The details for events with this `type`.

    - `configs: Optional[List[IPAllowlistConfigDeactivatedConfig]]`

      The configurations that were deactivated.

      - `id: Optional[str]`

        The ID of the IP allowlist configuration.

      - `name: Optional[str]`

        The name of the IP allowlist configuration.

  - `ip_allowlist_created: Optional[IPAllowlistCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the IP allowlist configuration.

    - `allowed_ips: Optional[List[str]]`

      The IP addresses or CIDR ranges included in the configuration.

    - `name: Optional[str]`

      The name of the IP allowlist configuration.

  - `ip_allowlist_deleted: Optional[IPAllowlistDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the IP allowlist configuration.

    - `allowed_ips: Optional[List[str]]`

      The IP addresses or CIDR ranges that were in the configuration.

    - `name: Optional[str]`

      The name of the IP allowlist configuration.

  - `ip_allowlist_updated: Optional[IPAllowlistUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the IP allowlist configuration.

    - `allowed_ips: Optional[List[str]]`

      The updated set of IP addresses or CIDR ranges in the configuration.

  - `login_failed: Optional[LoginFailed]`

    The details for events with this `type`.

    - `error_code: Optional[str]`

      The error code of the failure.

    - `error_message: Optional[str]`

      The error message of the failure.

  - `login_succeeded: Optional[object]`

    This event has no additional fields beyond the standard audit log attributes.

  - `logout_failed: Optional[LogoutFailed]`

    The details for events with this `type`.

    - `error_code: Optional[str]`

      The error code of the failure.

    - `error_message: Optional[str]`

      The error message of the failure.

  - `logout_succeeded: Optional[object]`

    This event has no additional fields beyond the standard audit log attributes.

  - `organization_updated: Optional[OrganizationUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The organization ID.

    - `changes_requested: Optional[OrganizationUpdatedChangesRequested]`

      The payload used to update the organization settings.

      - `api_call_logging: Optional[str]`

        How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects`

      - `api_call_logging_project_ids: Optional[str]`

        The list of project ids if api_call_logging is set to `enabled_for_selected_projects`

      - `description: Optional[str]`

        The organization description.

      - `name: Optional[str]`

        The organization name.

      - `threads_ui_visibility: Optional[str]`

        Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.

      - `title: Optional[str]`

        The organization title.

      - `usage_dashboard_visibility: Optional[str]`

        Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`.

  - `project: Optional[Project]`

    The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project.

    - `id: Optional[str]`

      The project ID.

    - `name: Optional[str]`

      The project title.

  - `project_archived: Optional[ProjectArchived]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

  - `project_created: Optional[ProjectCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

    - `data: Optional[ProjectCreatedData]`

      The payload used to create the project.

      - `name: Optional[str]`

        The project name.

      - `title: Optional[str]`

        The title of the project as seen on the dashboard.

  - `project_deleted: Optional[ProjectDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

  - `project_updated: Optional[ProjectUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

    - `changes_requested: Optional[ProjectUpdatedChangesRequested]`

      The payload used to update the project.

      - `title: Optional[str]`

        The title of the project as seen on the dashboard.

  - `rate_limit_deleted: Optional[RateLimitDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The rate limit ID

  - `rate_limit_updated: Optional[RateLimitUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The rate limit ID

    - `changes_requested: Optional[RateLimitUpdatedChangesRequested]`

      The payload used to update the rate limits.

      - `batch_1_day_max_input_tokens: Optional[int]`

        The maximum batch input tokens per day. Only relevant for certain models.

      - `max_audio_megabytes_per_1_minute: Optional[int]`

        The maximum audio megabytes per minute. Only relevant for certain models.

      - `max_images_per_1_minute: Optional[int]`

        The maximum images per minute. Only relevant for certain models.

      - `max_requests_per_1_day: Optional[int]`

        The maximum requests per day. Only relevant for certain models.

      - `max_requests_per_1_minute: Optional[int]`

        The maximum requests per minute.

      - `max_tokens_per_1_minute: Optional[int]`

        The maximum tokens per minute.

  - `role_assignment_created: Optional[RoleAssignmentCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The identifier of the role assignment.

    - `principal_id: Optional[str]`

      The principal (user or group) that received the role.

    - `principal_type: Optional[str]`

      The type of principal (user or group) that received the role.

    - `resource_id: Optional[str]`

      The resource the role assignment is scoped to.

    - `resource_type: Optional[str]`

      The type of resource the role assignment is scoped to.

  - `role_assignment_deleted: Optional[RoleAssignmentDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The identifier of the role assignment.

    - `principal_id: Optional[str]`

      The principal (user or group) that had the role removed.

    - `principal_type: Optional[str]`

      The type of principal (user or group) that had the role removed.

    - `resource_id: Optional[str]`

      The resource the role assignment was scoped to.

    - `resource_type: Optional[str]`

      The type of resource the role assignment was scoped to.

  - `role_created: Optional[RoleCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The role ID.

    - `permissions: Optional[List[str]]`

      The permissions granted by the role.

    - `resource_id: Optional[str]`

      The resource the role is scoped to.

    - `resource_type: Optional[str]`

      The type of resource the role belongs to.

    - `role_name: Optional[str]`

      The name of the role.

  - `role_deleted: Optional[RoleDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The role ID.

  - `role_updated: Optional[RoleUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The role ID.

    - `changes_requested: Optional[RoleUpdatedChangesRequested]`

      The payload used to update the role.

      - `description: Optional[str]`

        The updated role description, when provided.

      - `metadata: Optional[object]`

        Additional metadata stored on the role.

      - `permissions_added: Optional[List[str]]`

        The permissions added to the role.

      - `permissions_removed: Optional[List[str]]`

        The permissions removed from the role.

      - `resource_id: Optional[str]`

        The resource the role is scoped to.

      - `resource_type: Optional[str]`

        The type of resource the role belongs to.

      - `role_name: Optional[str]`

        The updated role name, when provided.

  - `scim_disabled: Optional[ScimDisabled]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the SCIM was disabled for.

  - `scim_enabled: Optional[ScimEnabled]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The ID of the SCIM was enabled for.

  - `service_account_created: Optional[ServiceAccountCreated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The service account ID.

    - `data: Optional[ServiceAccountCreatedData]`

      The payload used to create the service account.

      - `role: Optional[str]`

        The role of the service account. Is either `owner` or `member`.

  - `service_account_deleted: Optional[ServiceAccountDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The service account ID.

  - `service_account_updated: Optional[ServiceAccountUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The service account ID.

    - `changes_requested: Optional[ServiceAccountUpdatedChangesRequested]`

      The payload used to updated the service account.

      - `role: Optional[str]`

        The role of the service account. Is either `owner` or `member`.

  - `user_added: Optional[UserAdded]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The user ID.

    - `data: Optional[UserAddedData]`

      The payload used to add the user to the project.

      - `role: Optional[str]`

        The role of the user. Is either `owner` or `member`.

  - `user_deleted: Optional[UserDeleted]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The user ID.

  - `user_updated: Optional[UserUpdated]`

    The details for events with this `type`.

    - `id: Optional[str]`

      The project ID.

    - `changes_requested: Optional[UserUpdatedChangesRequested]`

      The payload used to update the user.

      - `role: Optional[str]`

        The role of the user. Is either `owner` or `member`.

# Admin API Keys

## List all organization and project API keys.

`admin.organization.admin_api_keys.list(AdminAPIKeyListParams**kwargs)  -> SyncCursorPage[AdminAPIKey]`

**get** `/organization/admin_api_keys`

List organization API keys

### Parameters

- `after: Optional[str]`

  Return keys with IDs that come after this ID in the pagination order.

- `limit: Optional[int]`

  Maximum number of keys to return.

- `order: Optional[Literal["asc", "desc"]]`

  Order results by creation time, ascending or descending.

  - `"asc"`

  - `"desc"`

### Returns

- `class AdminAPIKey: …`

  Represents an individual Admin API key in an org.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: Literal["organization.admin_api_key"]`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id: Optional[str]`

      The identifier, which can be referenced in API endpoints

    - `created_at: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created

    - `name: Optional[str]`

      The name of the user

    - `object: Optional[str]`

      The object type, which is always organization.user

    - `role: Optional[str]`

      Always `owner`

    - `type: Optional[str]`

      Always `user`

  - `redacted_value: str`

    The redacted value of the API key

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: Optional[str]`

    The name of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.admin_api_keys.list()
page = page.data[0]
print(page.id)
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

## Create admin API key

`admin.organization.admin_api_keys.create(AdminAPIKeyCreateParams**kwargs)  -> AdminAPIKeyCreateResponse`

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Parameters

- `name: str`

### Returns

- `class AdminAPIKeyCreateResponse: …`

  Represents an individual Admin API key in an org.

  - `value: str`

    The value of the API key. Only shown on create.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
admin_api_key = client.admin.organization.admin_api_keys.create(
    name="New Admin Key",
)
print(admin_api_key)
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

## Retrieve admin API key

`admin.organization.admin_api_keys.retrieve(strkey_id)  -> AdminAPIKey`

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Parameters

- `key_id: str`

  The ID of the API key.

### Returns

- `class AdminAPIKey: …`

  Represents an individual Admin API key in an org.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: Literal["organization.admin_api_key"]`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id: Optional[str]`

      The identifier, which can be referenced in API endpoints

    - `created_at: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created

    - `name: Optional[str]`

      The name of the user

    - `object: Optional[str]`

      The object type, which is always organization.user

    - `role: Optional[str]`

      Always `owner`

    - `type: Optional[str]`

      Always `user`

  - `redacted_value: str`

    The redacted value of the API key

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: Optional[str]`

    The name of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
admin_api_key = client.admin.organization.admin_api_keys.retrieve(
    "key_id",
)
print(admin_api_key.id)
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

## Delete admin API key

`admin.organization.admin_api_keys.delete(strkey_id)  -> AdminAPIKeyDeleteResponse`

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Parameters

- `key_id: str`

  The ID of the API key to be deleted.

### Returns

- `class AdminAPIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.admin_api_key.deleted"]`

    - `"organization.admin_api_key.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
admin_api_key = client.admin.organization.admin_api_keys.delete(
    "key_id",
)
print(admin_api_key.id)
```

#### Response

```json
{
  "id": "key_abc",
  "deleted": true,
  "object": "organization.admin_api_key.deleted"
}
```

## Domain Types

### Admin API Key

- `class AdminAPIKey: …`

  Represents an individual Admin API key in an org.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: Literal["organization.admin_api_key"]`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id: Optional[str]`

      The identifier, which can be referenced in API endpoints

    - `created_at: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created

    - `name: Optional[str]`

      The name of the user

    - `object: Optional[str]`

      The object type, which is always organization.user

    - `role: Optional[str]`

      Always `owner`

    - `type: Optional[str]`

      Always `user`

  - `redacted_value: str`

    The redacted value of the API key

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: Optional[str]`

    The name of the API key

### Admin API Key Create Response

- `class AdminAPIKeyCreateResponse: …`

  Represents an individual Admin API key in an org.

  - `value: str`

    The value of the API key. Only shown on create.

### Admin API Key Delete Response

- `class AdminAPIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.admin_api_key.deleted"]`

    - `"organization.admin_api_key.deleted"`

# Usage

## Audio speeches

`admin.organization.usage.audio_speeches(UsageAudioSpeechesParams**kwargs)  -> UsageAudioSpeechesResponse`

**get** `/organization/usage/audio_speeches`

Get audio speeches usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only usage for these API keys.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "user_id", "api_key_id", "model"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: Optional[Sequence[str]]`

  Return only usage for these models.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

- `user_ids: Optional[Sequence[str]]`

  Return only usage for these users.

### Returns

- `class UsageAudioSpeechesResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.audio_speeches(
    start_time=0,
)
print(response.data)
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

## Audio transcriptions

`admin.organization.usage.audio_transcriptions(UsageAudioTranscriptionsParams**kwargs)  -> UsageAudioTranscriptionsResponse`

**get** `/organization/usage/audio_transcriptions`

Get audio transcriptions usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only usage for these API keys.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "user_id", "api_key_id", "model"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: Optional[Sequence[str]]`

  Return only usage for these models.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

- `user_ids: Optional[Sequence[str]]`

  Return only usage for these users.

### Returns

- `class UsageAudioTranscriptionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.audio_transcriptions(
    start_time=0,
)
print(response.data)
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

## Code interpreter sessions

`admin.organization.usage.code_interpreter_sessions(UsageCodeInterpreterSessionsParams**kwargs)  -> UsageCodeInterpreterSessionsResponse`

**get** `/organization/usage/code_interpreter_sessions`

Get code interpreter sessions usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`.

  - `"project_id"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

### Returns

- `class UsageCodeInterpreterSessionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.code_interpreter_sessions(
    start_time=0,
)
print(response.data)
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

## Completions

`admin.organization.usage.completions(UsageCompletionsParams**kwargs)  -> UsageCompletionsResponse`

**get** `/organization/usage/completions`

Get completions usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only usage for these API keys.

- `batch: Optional[bool]`

  If `true`, return batch jobs only. If `false`, return non-batch jobs only. By default, return both.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "user_id", "api_key_id", 3 more]]]`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

  - `"batch"`

  - `"service_tier"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: Optional[Sequence[str]]`

  Return only usage for these models.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

- `user_ids: Optional[Sequence[str]]`

  Return only usage for these users.

### Returns

- `class UsageCompletionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.completions(
    start_time=0,
)
print(response.data)
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

## Embeddings

`admin.organization.usage.embeddings(UsageEmbeddingsParams**kwargs)  -> UsageEmbeddingsResponse`

**get** `/organization/usage/embeddings`

Get embeddings usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only usage for these API keys.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "user_id", "api_key_id", "model"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: Optional[Sequence[str]]`

  Return only usage for these models.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

- `user_ids: Optional[Sequence[str]]`

  Return only usage for these users.

### Returns

- `class UsageEmbeddingsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.embeddings(
    start_time=0,
)
print(response.data)
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

## Images

`admin.organization.usage.images(UsageImagesParams**kwargs)  -> UsageImagesResponse`

**get** `/organization/usage/images`

Get images usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only usage for these API keys.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "user_id", "api_key_id", 3 more]]]`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `size`, `source` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

  - `"size"`

  - `"source"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: Optional[Sequence[str]]`

  Return only usage for these models.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

- `sizes: Optional[List[Literal["256x256", "512x512", "1024x1024", 2 more]]]`

  Return only usages for these image sizes. Possible values are `256x256`, `512x512`, `1024x1024`, `1792x1792`, `1024x1792` or any combination of them.

  - `"256x256"`

  - `"512x512"`

  - `"1024x1024"`

  - `"1792x1792"`

  - `"1024x1792"`

- `sources: Optional[List[Literal["image.generation", "image.edit", "image.variation"]]]`

  Return only usages for these sources. Possible values are `image.generation`, `image.edit`, `image.variation` or any combination of them.

  - `"image.generation"`

  - `"image.edit"`

  - `"image.variation"`

- `user_ids: Optional[Sequence[str]]`

  Return only usage for these users.

### Returns

- `class UsageImagesResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.images(
    start_time=0,
)
print(response.data)
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

## Moderations

`admin.organization.usage.moderations(UsageModerationsParams**kwargs)  -> UsageModerationsResponse`

**get** `/organization/usage/moderations`

Get moderations usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only usage for these API keys.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "user_id", "api_key_id", "model"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: Optional[Sequence[str]]`

  Return only usage for these models.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

- `user_ids: Optional[Sequence[str]]`

  Return only usage for these users.

### Returns

- `class UsageModerationsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.moderations(
    start_time=0,
)
print(response.data)
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

## Vector stores

`admin.organization.usage.vector_stores(UsageVectorStoresParams**kwargs)  -> UsageVectorStoresResponse`

**get** `/organization/usage/vector_stores`

Get vector stores usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`.

  - `"project_id"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

### Returns

- `class UsageVectorStoresResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.vector_stores(
    start_time=0,
)
print(response.data)
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

## Costs

`admin.organization.usage.costs(UsageCostsParams**kwargs)  -> UsageCostsResponse`

**get** `/organization/costs`

Get costs details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: Optional[Sequence[str]]`

  Return only costs for these API keys.

- `bucket_width: Optional[Literal["1d"]]`

  Width of each time bucket in response. Currently only `1d` is supported, default to `1d`.

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id", "line_item", "api_key_id"]]]`

  Group the costs by the specified fields. Support fields include `project_id`, `line_item`, `api_key_id` and any combination of them.

  - `"project_id"`

  - `"line_item"`

  - `"api_key_id"`

- `limit: Optional[int]`

  A limit on the number of buckets to be returned. Limit can range between 1 and 180, and the default is 7.

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only costs for these projects.

### Returns

- `class UsageCostsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.costs(
    start_time=0,
)
print(response.data)
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

## Domain Types

### Usage Audio Speeches Response

- `class UsageAudioSpeechesResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Audio Transcriptions Response

- `class UsageAudioTranscriptionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Code Interpreter Sessions Response

- `class UsageCodeInterpreterSessionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Completions Response

- `class UsageCompletionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Embeddings Response

- `class UsageEmbeddingsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Images Response

- `class UsageImagesResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Moderations Response

- `class UsageModerationsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Vector Stores Response

- `class UsageVectorStoresResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Usage Costs Response

- `class UsageCostsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

# Invites

## List invites

`admin.organization.invites.list(InviteListParams**kwargs)  -> SyncConversationCursorPage[Invite]`

**get** `/organization/invites`

Returns a list of invites in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: List[Project]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: str`

      Project's public ID

    - `role: Literal["member", "owner"]`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.invites.list()
page = page.data[0]
print(page.id)
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

## Create invite

`admin.organization.invites.create(InviteCreateParams**kwargs)  -> Invite`

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Parameters

- `email: str`

  Send an email to this address

- `role: Literal["reader", "owner"]`

  `owner` or `reader`

  - `"reader"`

  - `"owner"`

- `projects: Optional[Iterable[Project]]`

  An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior.

  - `id: str`

    Project's public ID

  - `role: Literal["member", "owner"]`

    Project membership role

    - `"member"`

    - `"owner"`

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: List[Project]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: str`

      Project's public ID

    - `role: Literal["member", "owner"]`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.create(
    email="email",
    role="reader",
)
print(invite.id)
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

## Retrieve invite

`admin.organization.invites.retrieve(strinvite_id)  -> Invite`

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Parameters

- `invite_id: str`

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: List[Project]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: str`

      Project's public ID

    - `role: Literal["member", "owner"]`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.retrieve(
    "invite_id",
)
print(invite.id)
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

## Delete invite

`admin.organization.invites.delete(strinvite_id)  -> InviteDeleteResponse`

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Parameters

- `invite_id: str`

### Returns

- `class InviteDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.invite.deleted"]`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.delete(
    "invite_id",
)
print(invite.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```

## Domain Types

### Invite

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: List[Project]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: str`

      Project's public ID

    - `role: Literal["member", "owner"]`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite expires.

### Invite Delete Response

- `class InviteDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.invite.deleted"]`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

# Users

## List users

`admin.organization.users.list(UserListParams**kwargs)  -> SyncConversationCursorPage[OrganizationUser]`

**get** `/organization/users`

Lists all of the users in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `emails: Optional[Sequence[str]]`

  Filter by the email address of users.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.users.list()
page = page.data[0]
print(page.id)
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

## Retrieve user

`admin.organization.users.retrieve(struser_id)  -> OrganizationUser`

**get** `/organization/users/{user_id}`

Retrieves a user by their identifier.

### Parameters

- `user_id: str`

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_user = client.admin.organization.users.retrieve(
    "user_id",
)
print(organization_user.id)
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

## Modify user

`admin.organization.users.update(struser_id, UserUpdateParams**kwargs)  -> OrganizationUser`

**post** `/organization/users/{user_id}`

Modifies a user's role in the organization.

### Parameters

- `user_id: str`

- `developer_persona: Optional[str]`

  Developer persona metadata.

- `role: Optional[str]`

  `owner` or `reader`

- `role_id: Optional[str]`

  Role ID to assign to the user.

- `technical_level: Optional[str]`

  Technical level metadata.

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_user = client.admin.organization.users.update(
    user_id="user_id",
)
print(organization_user.id)
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

## Delete user

`admin.organization.users.delete(struser_id)  -> UserDeleteResponse`

**delete** `/organization/users/{user_id}`

Deletes a user from the organization.

### Parameters

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.user.deleted"]`

    - `"organization.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.users.delete(
    "user_id",
)
print(user.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.user.deleted"
}
```

## Domain Types

### Organization User

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### User Delete Response

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.user.deleted"]`

    - `"organization.user.deleted"`

# Roles

## List user organization role assignments

`admin.organization.users.roles.list(struser_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/organization/users/{user_id}/roles`

Lists the organization roles assigned to a user within the organization.

### Parameters

- `user_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

- `limit: Optional[int]`

  A limit on the number of organization role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned organization roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.users.roles.list(
    user_id="user_id",
)
page = page.data[0]
print(page.id)
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

## Assign organization role to user

`admin.organization.users.roles.create(struser_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/organization/users/{user_id}/roles`

Assigns an organization role to a user within the organization.

### Parameters

- `user_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: Optional[int]`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: Optional[str]`

      The developer persona metadata for the user.

    - `email: Optional[str]`

      The email address of the user

    - `is_default: Optional[bool]`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: Optional[bool]`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: Optional[bool]`

      Whether the user is managed through SCIM.

    - `is_service_account: Optional[bool]`

      Whether the user is a service account.

    - `name: Optional[str]`

      The name of the user

    - `projects: Optional[Projects]`

      Projects associated with the user, if included.

      - `data: List[ProjectsData]`

        - `id: Optional[str]`

        - `name: Optional[str]`

        - `role: Optional[str]`

      - `object: Literal["list"]`

        - `"list"`

    - `role: Optional[str]`

      `owner` or `reader`

    - `technical_level: Optional[str]`

      The technical level metadata for the user.

    - `user: Optional[User]`

      Nested user details.

      - `id: str`

      - `object: Literal["user"]`

        - `"user"`

      - `banned: Optional[bool]`

      - `banned_at: Optional[int]`

      - `email: Optional[str]`

      - `enabled: Optional[bool]`

      - `name: Optional[str]`

      - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.users.roles.create(
    user_id="user_id",
    role_id="role_id",
)
print(role.object)
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

## Unassign organization role from user

`admin.organization.users.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/organization/users/{user_id}/roles/{role_id}`

Unassigns an organization role from a user within the organization.

### Parameters

- `user_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.users.roles.delete(
    role_id="role_id",
    user_id="user_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: Optional[int]`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: Optional[str]`

      The developer persona metadata for the user.

    - `email: Optional[str]`

      The email address of the user

    - `is_default: Optional[bool]`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: Optional[bool]`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: Optional[bool]`

      Whether the user is managed through SCIM.

    - `is_service_account: Optional[bool]`

      Whether the user is a service account.

    - `name: Optional[str]`

      The name of the user

    - `projects: Optional[Projects]`

      Projects associated with the user, if included.

      - `data: List[ProjectsData]`

        - `id: Optional[str]`

        - `name: Optional[str]`

        - `role: Optional[str]`

      - `object: Literal["list"]`

        - `"list"`

    - `role: Optional[str]`

      `owner` or `reader`

    - `technical_level: Optional[str]`

      The technical level metadata for the user.

    - `user: Optional[User]`

      Nested user details.

      - `id: str`

      - `object: Literal["user"]`

        - `"user"`

      - `banned: Optional[bool]`

      - `banned_at: Optional[int]`

      - `email: Optional[str]`

      - `enabled: Optional[bool]`

      - `name: Optional[str]`

      - `picture: Optional[str]`

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Groups

## List groups

`admin.organization.groups.list(GroupListParams**kwargs)  -> SyncNextCursorPage[Group]`

**get** `/organization/groups`

Lists all groups in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: Optional[Literal["asc", "desc"]]`

  Specifies the sort order of the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: str`

    The type of the group.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.groups.list()
page = page.data[0]
print(page.id)
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

## Create group

`admin.organization.groups.create(GroupCreateParams**kwargs)  -> Group`

**post** `/organization/groups`

Creates a new group in the organization.

### Parameters

- `name: str`

  Human readable name for the group.

### Returns

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: str`

    The type of the group.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.create(
    name="x",
)
print(group.id)
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

## Update group

`admin.organization.groups.update(strgroup_id, GroupUpdateParams**kwargs)  -> GroupUpdateResponse`

**post** `/organization/groups/{group_id}`

Updates a group's information.

### Parameters

- `group_id: str`

- `name: str`

  New display name for the group.

### Returns

- `class GroupUpdateResponse: …`

  Response returned after updating a group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Updated display name for the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.update(
    group_id="group_id",
    name="x",
)
print(group.id)
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

## Delete group

`admin.organization.groups.delete(strgroup_id)  -> GroupDeleteResponse`

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Parameters

- `group_id: str`

### Returns

- `class GroupDeleteResponse: …`

  Confirmation payload returned after deleting a group.

  - `id: str`

    Identifier of the deleted group.

  - `deleted: bool`

    Whether the group was deleted.

  - `object: Literal["group.deleted"]`

    Always `group.deleted`.

    - `"group.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.delete(
    "group_id",
)
print(group.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "group.deleted"
}
```

## Domain Types

### Group

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: str`

    The type of the group.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Group Update Response

- `class GroupUpdateResponse: …`

  Response returned after updating a group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Updated display name for the group.

### Group Delete Response

- `class GroupDeleteResponse: …`

  Confirmation payload returned after deleting a group.

  - `id: str`

    Identifier of the deleted group.

  - `deleted: bool`

    Whether the group was deleted.

  - `object: Literal["group.deleted"]`

    Always `group.deleted`.

    - `"group.deleted"`

# Users

## List group users

`admin.organization.groups.users.list(strgroup_id, UserListParams**kwargs)  -> SyncNextCursorPage[OrganizationGroupUser]`

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Parameters

- `group_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

- `limit: Optional[int]`

  A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: Optional[Literal["asc", "desc"]]`

  Specifies the sort order of users in the list.

  - `"asc"`

  - `"desc"`

### Returns

- `class OrganizationGroupUser: …`

  Represents an individual user returned when inspecting group membership.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: Optional[str]`

    The email address of the user.

  - `name: str`

    The name of the user.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.groups.users.list(
    group_id="group_id",
)
page = page.data[0]
print(page.id)
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

## Add group user

`admin.organization.groups.users.create(strgroup_id, UserCreateParams**kwargs)  -> UserCreateResponse`

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Parameters

- `group_id: str`

- `user_id: str`

  Identifier of the user to add to the group.

### Returns

- `class UserCreateResponse: …`

  Confirmation payload returned after adding a user to a group.

  - `group_id: str`

    Identifier of the group the user was added to.

  - `object: Literal["group.user"]`

    Always `group.user`.

    - `"group.user"`

  - `user_id: str`

    Identifier of the user that was added.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.groups.users.create(
    group_id="group_id",
    user_id="user_id",
)
print(user.group_id)
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```

## Remove group user

`admin.organization.groups.users.delete(struser_id, UserDeleteParams**kwargs)  -> UserDeleteResponse`

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Parameters

- `group_id: str`

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  Confirmation payload returned after removing a user from a group.

  - `deleted: bool`

    Whether the group membership was removed.

  - `object: Literal["group.user.deleted"]`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.groups.users.delete(
    user_id="user_id",
    group_id="group_id",
)
print(user.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "group.user.deleted"
}
```

## Domain Types

### Organization Group User

- `class OrganizationGroupUser: …`

  Represents an individual user returned when inspecting group membership.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: Optional[str]`

    The email address of the user.

  - `name: str`

    The name of the user.

### User Create Response

- `class UserCreateResponse: …`

  Confirmation payload returned after adding a user to a group.

  - `group_id: str`

    Identifier of the group the user was added to.

  - `object: Literal["group.user"]`

    Always `group.user`.

    - `"group.user"`

  - `user_id: str`

    Identifier of the user that was added.

### User Delete Response

- `class UserDeleteResponse: …`

  Confirmation payload returned after removing a user from a group.

  - `deleted: bool`

    Whether the group membership was removed.

  - `object: Literal["group.user.deleted"]`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

# Roles

## List group organization role assignments

`admin.organization.groups.roles.list(strgroup_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/organization/groups/{group_id}/roles`

Lists the organization roles assigned to a group within the organization.

### Parameters

- `group_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

- `limit: Optional[int]`

  A limit on the number of organization role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned organization roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.groups.roles.list(
    group_id="group_id",
)
page = page.data[0]
print(page.id)
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

## Assign organization role to group

`admin.organization.groups.roles.create(strgroup_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/organization/groups/{group_id}/roles`

Assigns an organization role to a group within the organization.

### Parameters

- `group_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.groups.roles.create(
    group_id="group_id",
    role_id="role_id",
)
print(role.group)
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

## Unassign organization role from group

`admin.organization.groups.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/organization/groups/{group_id}/roles/{role_id}`

Unassigns an organization role from a group within the organization.

### Parameters

- `group_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.groups.roles.delete(
    role_id="role_id",
    group_id="group_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List organization roles

`admin.organization.roles.list(RoleListParams**kwargs)  -> SyncNextCursorPage[Role]`

**get** `/organization/roles`

Lists the roles configured for the organization.

### Parameters

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: Optional[int]`

  A limit on the number of roles to return. Defaults to 1000.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.roles.list()
page = page.data[0]
print(page.id)
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

## Create organization role

`admin.organization.roles.create(RoleCreateParams**kwargs)  -> Role`

**post** `/organization/roles`

Creates a custom role for the organization.

### Parameters

- `permissions: Sequence[str]`

  Permissions to grant to the role.

- `role_name: str`

  Unique name for the role.

- `description: Optional[str]`

  Optional description of the role.

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.roles.create(
    permissions=["string"],
    role_name="role_name",
)
print(role.id)
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

## Update organization role

`admin.organization.roles.update(strrole_id, RoleUpdateParams**kwargs)  -> Role`

**post** `/organization/roles/{role_id}`

Updates an existing organization role.

### Parameters

- `role_id: str`

- `description: Optional[str]`

  New description for the role.

- `permissions: Optional[Sequence[str]]`

  Updated set of permissions for the role.

- `role_name: Optional[str]`

  New name for the role.

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.roles.update(
    role_id="role_id",
)
print(role.id)
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

## Delete organization role

`admin.organization.roles.delete(strrole_id)  -> RoleDeleteResponse`

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Parameters

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.roles.delete(
    "role_id",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

## Domain Types

### Role

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

# Certificates

## List organization certificates

`admin.organization.certificates.list(CertificateListParams**kwargs)  -> SyncConversationCursorPage[CertificateListResponse]`

**get** `/organization/certificates`

List uploaded certificates for this organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class CertificateListResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.certificates.list()
page = page.data[0]
print(page.id)
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

## Upload certificate

`admin.organization.certificates.create(CertificateCreateParams**kwargs)  -> Certificate`

**post** `/organization/certificates`

Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.

### Parameters

- `certificate: str`

  The certificate content in PEM format

- `name: Optional[str]`

  An optional name for the certificate

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
certificate = client.admin.organization.certificates.create(
    certificate="certificate",
)
print(certificate.id)
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

## Get certificate

`admin.organization.certificates.retrieve(strcertificate_id, CertificateRetrieveParams**kwargs)  -> Certificate`

**get** `/organization/certificates/{certificate_id}`

Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.

### Parameters

- `certificate_id: str`

- `include: Optional[List[Literal["content"]]]`

  A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate.

  - `"content"`

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
certificate = client.admin.organization.certificates.retrieve(
    certificate_id="certificate_id",
)
print(certificate.id)
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

## Modify certificate

`admin.organization.certificates.update(strcertificate_id, CertificateUpdateParams**kwargs)  -> Certificate`

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Parameters

- `certificate_id: str`

- `name: Optional[str]`

  The updated name for the certificate

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
certificate = client.admin.organization.certificates.update(
    certificate_id="certificate_id",
)
print(certificate.id)
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

## Delete certificate

`admin.organization.certificates.delete(strcertificate_id)  -> CertificateDeleteResponse`

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

### Parameters

- `certificate_id: str`

### Returns

- `class CertificateDeleteResponse: …`

  - `id: str`

    The ID of the certificate that was deleted.

  - `object: Literal["certificate.deleted"]`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
certificate = client.admin.organization.certificates.delete(
    "certificate_id",
)
print(certificate.id)
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```

## Activate certificates for organization

`admin.organization.certificates.activate(CertificateActivateParams**kwargs)  -> SyncPage[CertificateActivateResponse]`

**post** `/organization/certificates/activate`

Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateActivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.certificates.activate(
    certificate_ids=["cert_abc"],
)
page = page.data[0]
print(page.id)
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

## Deactivate certificates for organization

`admin.organization.certificates.deactivate(CertificateDeactivateParams**kwargs)  -> SyncPage[CertificateDeactivateResponse]`

**post** `/organization/certificates/deactivate`

Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.

### Parameters

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.certificates.deactivate(
    certificate_ids=["cert_abc"],
)
page = page.data[0]
print(page.id)
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

## Domain Types

### Certificate

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Certificate List Response

- `class CertificateListResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Delete Response

- `class CertificateDeleteResponse: …`

  - `id: str`

    The ID of the certificate that was deleted.

  - `object: Literal["certificate.deleted"]`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Certificate Activate Response

- `class CertificateActivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Deactivate Response

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

# Projects

## List projects

`admin.organization.projects.list(ProjectListParams**kwargs)  -> SyncConversationCursorPage[Project]`

**get** `/organization/projects`

Returns a list of projects.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `include_archived: Optional[bool]`

  If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.list()
page = page.data[0]
print(page.id)
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

## Create project

`admin.organization.projects.create(ProjectCreateParams**kwargs)  -> Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `name: str`

  The friendly name of the project, this name appears in reports.

- `external_key_id: Optional[str]`

  External key ID to associate with the project.

- `geography: Optional[str]`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.create(
    name="name",
)
print(project.id)
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

## Retrieve project

`admin.organization.projects.retrieve(strproject_id)  -> Project`

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Parameters

- `project_id: str`

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.retrieve(
    "project_id",
)
print(project.id)
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

## Modify project

`admin.organization.projects.update(strproject_id, ProjectUpdateParams**kwargs)  -> Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `project_id: str`

- `external_key_id: Optional[str]`

  External key ID to associate with the project.

- `geography: Optional[str]`

  Geography for the project.

- `name: Optional[str]`

  The updated name of the project, this name appears in reports.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.update(
    project_id="project_id",
)
print(project.id)
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

## Archive project

`admin.organization.projects.archive(strproject_id)  -> Project`

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Parameters

- `project_id: str`

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.archive(
    "project_id",
)
print(project.id)
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

## Domain Types

### Project

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

# Users

## List project users

`admin.organization.projects.users.list(strproject_id, UserListParams**kwargs)  -> SyncConversationCursorPage[ProjectUser]`

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: str`

    `owner` or `member`

  - `email: Optional[str]`

    The email address of the user

  - `name: Optional[str]`

    The name of the user

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.users.list(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Create project user

`admin.organization.projects.users.create(strproject_id, UserCreateParams**kwargs)  -> ProjectUser`

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Parameters

- `project_id: str`

- `role: str`

  `owner` or `member`

- `email: Optional[str]`

  Email of the user to add.

- `user_id: Optional[str]`

  The ID of the user.

### Returns

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: str`

    `owner` or `member`

  - `email: Optional[str]`

    The email address of the user

  - `name: Optional[str]`

    The name of the user

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.create(
    project_id="project_id",
    role="role",
)
print(project_user.id)
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

## Retrieve project user

`admin.organization.projects.users.retrieve(struser_id, UserRetrieveParams**kwargs)  -> ProjectUser`

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Parameters

- `project_id: str`

- `user_id: str`

### Returns

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: str`

    `owner` or `member`

  - `email: Optional[str]`

    The email address of the user

  - `name: Optional[str]`

    The name of the user

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.retrieve(
    user_id="user_id",
    project_id="project_id",
)
print(project_user.id)
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

## Modify project user

`admin.organization.projects.users.update(struser_id, UserUpdateParams**kwargs)  -> ProjectUser`

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role: Optional[str]`

  `owner` or `member`

### Returns

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: str`

    `owner` or `member`

  - `email: Optional[str]`

    The email address of the user

  - `name: Optional[str]`

    The name of the user

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.update(
    user_id="user_id",
    project_id="project_id",
)
print(project_user.id)
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

## Delete project user

`admin.organization.projects.users.delete(struser_id, UserDeleteParams**kwargs)  -> UserDeleteResponse`

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Parameters

- `project_id: str`

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.user.deleted"]`

    - `"organization.project.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.projects.users.delete(
    user_id="user_id",
    project_id="project_id",
)
print(user.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```

## Domain Types

### Project User

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: str`

    `owner` or `member`

  - `email: Optional[str]`

    The email address of the user

  - `name: Optional[str]`

    The name of the user

### User Delete Response

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.user.deleted"]`

    - `"organization.project.user.deleted"`

# Roles

## List project user role assignments

`admin.organization.projects.users.roles.list(struser_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: Optional[int]`

  A limit on the number of project role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.users.roles.list(
    user_id="user_id",
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Assign project role to user

`admin.organization.projects.users.roles.create(struser_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: Optional[int]`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: Optional[str]`

      The developer persona metadata for the user.

    - `email: Optional[str]`

      The email address of the user

    - `is_default: Optional[bool]`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: Optional[bool]`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: Optional[bool]`

      Whether the user is managed through SCIM.

    - `is_service_account: Optional[bool]`

      Whether the user is a service account.

    - `name: Optional[str]`

      The name of the user

    - `projects: Optional[Projects]`

      Projects associated with the user, if included.

      - `data: List[ProjectsData]`

        - `id: Optional[str]`

        - `name: Optional[str]`

        - `role: Optional[str]`

      - `object: Literal["list"]`

        - `"list"`

    - `role: Optional[str]`

      `owner` or `reader`

    - `technical_level: Optional[str]`

      The technical level metadata for the user.

    - `user: Optional[User]`

      Nested user details.

      - `id: str`

      - `object: Literal["user"]`

        - `"user"`

      - `banned: Optional[bool]`

      - `banned_at: Optional[int]`

      - `email: Optional[str]`

      - `enabled: Optional[bool]`

      - `name: Optional[str]`

      - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.users.roles.create(
    user_id="user_id",
    project_id="project_id",
    role_id="role_id",
)
print(role.object)
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

## Unassign project role from user

`admin.organization.projects.users.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.users.roles.delete(
    role_id="role_id",
    project_id="project_id",
    user_id="user_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: Optional[int]`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: Optional[str]`

      The developer persona metadata for the user.

    - `email: Optional[str]`

      The email address of the user

    - `is_default: Optional[bool]`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: Optional[bool]`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: Optional[bool]`

      Whether the user is managed through SCIM.

    - `is_service_account: Optional[bool]`

      Whether the user is a service account.

    - `name: Optional[str]`

      The name of the user

    - `projects: Optional[Projects]`

      Projects associated with the user, if included.

      - `data: List[ProjectsData]`

        - `id: Optional[str]`

        - `name: Optional[str]`

        - `role: Optional[str]`

      - `object: Literal["list"]`

        - `"list"`

    - `role: Optional[str]`

      `owner` or `reader`

    - `technical_level: Optional[str]`

      The technical level metadata for the user.

    - `user: Optional[User]`

      Nested user details.

      - `id: str`

      - `object: Literal["user"]`

        - `"user"`

      - `banned: Optional[bool]`

      - `banned_at: Optional[int]`

      - `email: Optional[str]`

      - `enabled: Optional[bool]`

      - `name: Optional[str]`

      - `picture: Optional[str]`

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Service Accounts

## List project service accounts

`admin.organization.projects.service_accounts.list(strproject_id, ServiceAccountListParams**kwargs)  -> SyncConversationCursorPage[ProjectServiceAccount]`

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.service_accounts.list(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Create project service account

`admin.organization.projects.service_accounts.create(strproject_id, ServiceAccountCreateParams**kwargs)  -> ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Parameters

- `project_id: str`

- `name: str`

  The name of the service account being created.

### Returns

- `class ServiceAccountCreateResponse: …`

  - `id: str`

  - `api_key: Optional[APIKey]`

    - `id: str`

    - `created_at: int`

    - `name: str`

    - `object: Literal["organization.project.service_account.api_key"]`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: str`

  - `created_at: int`

  - `name: str`

  - `object: Literal["organization.project.service_account"]`

    - `"organization.project.service_account"`

  - `role: Literal["member"]`

    Service accounts can only have one role of type `member`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
service_account = client.admin.organization.projects.service_accounts.create(
    project_id="project_id",
    name="name",
)
print(service_account.id)
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

## Retrieve project service account

`admin.organization.projects.service_accounts.retrieve(strservice_account_id, ServiceAccountRetrieveParams**kwargs)  -> ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `project_id: str`

- `service_account_id: str`

### Returns

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_service_account = client.admin.organization.projects.service_accounts.retrieve(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(project_service_account.id)
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

## Delete project service account

`admin.organization.projects.service_accounts.delete(strservice_account_id, ServiceAccountDeleteParams**kwargs)  -> ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Parameters

- `project_id: str`

- `service_account_id: str`

### Returns

- `class ServiceAccountDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.service_account.deleted"]`

    - `"organization.project.service_account.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
service_account = client.admin.organization.projects.service_accounts.delete(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(service_account.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```

## Domain Types

### Project Service Account

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `class ServiceAccountCreateResponse: …`

  - `id: str`

  - `api_key: Optional[APIKey]`

    - `id: str`

    - `created_at: int`

    - `name: str`

    - `object: Literal["organization.project.service_account.api_key"]`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: str`

  - `created_at: int`

  - `name: str`

  - `object: Literal["organization.project.service_account"]`

    - `"organization.project.service_account"`

  - `role: Literal["member"]`

    Service accounts can only have one role of type `member`

    - `"member"`

### Service Account Delete Response

- `class ServiceAccountDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.service_account.deleted"]`

    - `"organization.project.service_account.deleted"`

# API Keys

## List project API keys

`admin.organization.projects.api_keys.list(strproject_id, APIKeyListParams**kwargs)  -> SyncConversationCursorPage[ProjectAPIKey]`

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[OwnerServiceAccount]`

      The service account that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: str`

        The name of the service account.

      - `role: str`

        The service account's project role.

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[OwnerUser]`

      The user that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: str`

        The email address of the user.

      - `name: str`

        The name of the user.

      - `role: str`

        The user's project role.

  - `redacted_value: str`

    The redacted value of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.api_keys.list(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Retrieve project API key

`admin.organization.projects.api_keys.retrieve(strapi_key_id, APIKeyRetrieveParams**kwargs)  -> ProjectAPIKey`

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Parameters

- `project_id: str`

- `api_key_id: str`

### Returns

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[OwnerServiceAccount]`

      The service account that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: str`

        The name of the service account.

      - `role: str`

        The service account's project role.

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[OwnerUser]`

      The user that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: str`

        The email address of the user.

      - `name: str`

        The name of the user.

      - `role: str`

        The user's project role.

  - `redacted_value: str`

    The redacted value of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_api_key = client.admin.organization.projects.api_keys.retrieve(
    api_key_id="api_key_id",
    project_id="project_id",
)
print(project_api_key.id)
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

## Delete project API key

`admin.organization.projects.api_keys.delete(strapi_key_id, APIKeyDeleteParams**kwargs)  -> APIKeyDeleteResponse`

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Parameters

- `project_id: str`

- `api_key_id: str`

### Returns

- `class APIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.api_key.deleted"]`

    - `"organization.project.api_key.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
api_key = client.admin.organization.projects.api_keys.delete(
    api_key_id="api_key_id",
    project_id="project_id",
)
print(api_key.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

## Domain Types

### Project API Key

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[OwnerServiceAccount]`

      The service account that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: str`

        The name of the service account.

      - `role: str`

        The service account's project role.

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[OwnerUser]`

      The user that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: str`

        The email address of the user.

      - `name: str`

        The name of the user.

      - `role: str`

        The user's project role.

  - `redacted_value: str`

    The redacted value of the API key

### API Key Delete Response

- `class APIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.api_key.deleted"]`

    - `"organization.project.api_key.deleted"`

# Rate Limits

## List project rate limits

`admin.organization.projects.rate_limits.list_rate_limits(strproject_id, RateLimitListRateLimitsParams**kwargs)  -> SyncConversationCursorPage[ProjectRateLimit]`

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.rate_limits.list_rate_limits(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Modify project rate limit

`admin.organization.projects.rate_limits.update_rate_limit(strrate_limit_id, RateLimitUpdateRateLimitParams**kwargs)  -> ProjectRateLimit`

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Parameters

- `project_id: str`

- `rate_limit_id: str`

- `batch_1_day_max_input_tokens: Optional[int]`

  The maximum batch input tokens per day. Only relevant for certain models.

- `max_audio_megabytes_per_1_minute: Optional[int]`

  The maximum audio megabytes per minute. Only relevant for certain models.

- `max_images_per_1_minute: Optional[int]`

  The maximum images per minute. Only relevant for certain models.

- `max_requests_per_1_day: Optional[int]`

  The maximum requests per day. Only relevant for certain models.

- `max_requests_per_1_minute: Optional[int]`

  The maximum requests per minute.

- `max_tokens_per_1_minute: Optional[int]`

  The maximum tokens per minute.

### Returns

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_rate_limit = client.admin.organization.projects.rate_limits.update_rate_limit(
    rate_limit_id="rate_limit_id",
    project_id="project_id",
)
print(project_rate_limit.id)
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

## Domain Types

### Project Rate Limit

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

# Groups

## List project groups

`admin.organization.projects.groups.list(strproject_id, GroupListParams**kwargs)  -> SyncNextCursorPage[ProjectGroup]`

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

- `limit: Optional[int]`

  A limit on the number of project groups to return. Defaults to 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `group_type: str`

    The type of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.groups.list(
    project_id="project_id",
)
page = page.data[0]
print(page.group_id)
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

## Add project group

`admin.organization.projects.groups.create(strproject_id, GroupCreateParams**kwargs)  -> ProjectGroup`

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Parameters

- `project_id: str`

- `group_id: str`

  Identifier of the group to add to the project.

- `role: str`

  Identifier of the project role to grant to the group.

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `group_type: str`

    The type of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_group = client.admin.organization.projects.groups.create(
    project_id="project_id",
    group_id="group_id",
    role="role",
)
print(project_group.group_id)
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

## Remove project group

`admin.organization.projects.groups.delete(strgroup_id, GroupDeleteParams**kwargs)  -> GroupDeleteResponse`

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Parameters

- `project_id: str`

- `group_id: str`

### Returns

- `class GroupDeleteResponse: …`

  Confirmation payload returned after removing a group from a project.

  - `deleted: bool`

    Whether the group membership in the project was removed.

  - `object: Literal["project.group.deleted"]`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.projects.groups.delete(
    group_id="group_id",
    project_id="project_id",
)
print(group.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```

## Domain Types

### Project Group

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `group_type: str`

    The type of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Group Delete Response

- `class GroupDeleteResponse: …`

  Confirmation payload returned after removing a group from a project.

  - `deleted: bool`

    Whether the group membership in the project was removed.

  - `object: Literal["project.group.deleted"]`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

# Roles

## List project group role assignments

`admin.organization.projects.groups.roles.list(strgroup_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: Optional[int]`

  A limit on the number of project role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.groups.roles.list(
    group_id="group_id",
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Assign project role to group

`admin.organization.projects.groups.roles.create(strgroup_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.groups.roles.create(
    group_id="group_id",
    project_id="project_id",
    role_id="role_id",
)
print(role.group)
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

## Unassign project role from group

`admin.organization.projects.groups.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.groups.roles.delete(
    role_id="role_id",
    project_id="project_id",
    group_id="group_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List project roles

`admin.organization.projects.roles.list(strproject_id, RoleListParams**kwargs)  -> SyncNextCursorPage[Role]`

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: Optional[int]`

  A limit on the number of roles to return. Defaults to 1000.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.roles.list(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Create project role

`admin.organization.projects.roles.create(strproject_id, RoleCreateParams**kwargs)  -> Role`

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Parameters

- `project_id: str`

- `permissions: Sequence[str]`

  Permissions to grant to the role.

- `role_name: str`

  Unique name for the role.

- `description: Optional[str]`

  Optional description of the role.

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.roles.create(
    project_id="project_id",
    permissions=["string"],
    role_name="role_name",
)
print(role.id)
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

## Update project role

`admin.organization.projects.roles.update(strrole_id, RoleUpdateParams**kwargs)  -> Role`

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Parameters

- `project_id: str`

- `role_id: str`

- `description: Optional[str]`

  New description for the role.

- `permissions: Optional[Sequence[str]]`

  Updated set of permissions for the role.

- `role_name: Optional[str]`

  New name for the role.

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.roles.update(
    role_id="role_id",
    project_id="project_id",
)
print(role.id)
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

## Delete project role

`admin.organization.projects.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Parameters

- `project_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.roles.delete(
    role_id="role_id",
    project_id="project_id",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

## Domain Types

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

# Certificates

## List project certificates

`admin.organization.projects.certificates.list(strproject_id, CertificateListParams**kwargs)  -> SyncConversationCursorPage[CertificateListResponse]`

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class CertificateListResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.list(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

## Activate certificates for project

`admin.organization.projects.certificates.activate(strproject_id, CertificateActivateParams**kwargs)  -> SyncPage[CertificateActivateResponse]`

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `project_id: str`

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateActivateResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.activate(
    project_id="project_id",
    certificate_ids=["cert_abc"],
)
page = page.data[0]
print(page.id)
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

## Deactivate certificates for project

`admin.organization.projects.certificates.deactivate(strproject_id, CertificateDeactivateParams**kwargs)  -> SyncPage[CertificateDeactivateResponse]`

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Parameters

- `project_id: str`

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.deactivate(
    project_id="project_id",
    certificate_ids=["cert_abc"],
)
page = page.data[0]
print(page.id)
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

## Domain Types

### Certificate List Response

- `class CertificateListResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Activate Response

- `class CertificateActivateResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Deactivate Response

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`
