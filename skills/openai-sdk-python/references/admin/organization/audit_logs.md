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

  - `actor: Actor`

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
      "effective_at": 0,
      "type": "api_key.created",
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
  "first_id": "audit_log-defb456h8dks",
  "has_more": true,
  "last_id": "audit_log-hnbkd8s93s",
  "object": "list"
}
```

## Domain Types

### Audit Log List Response

- `class AuditLogListResponse: …`

  A log of a user action or configuration change within this organization.

  - `id: str`

    The ID of this log.

  - `actor: Actor`

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
