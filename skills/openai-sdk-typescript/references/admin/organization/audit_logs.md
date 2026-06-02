# Audit Logs

## List audit logs

`client.admin.organization.auditLogs.list(AuditLogListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<AuditLogListResponse>`

**get** `/organization/audit_logs`

List user actions and configuration changes within this organization.

### Parameters

- `query: AuditLogListParams`

  - `actor_emails?: Array<string>`

    Return only events performed by users with these emails.

  - `actor_ids?: Array<string>`

    Return only events performed by these actors. Can be a user ID, a service account ID, or an api key tracking ID.

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `effective_at?: EffectiveAt`

    Return only events whose `effective_at` (Unix seconds) is in this range.

    - `gt?: number`

      Return only events whose `effective_at` (Unix seconds) is greater than this value.

    - `gte?: number`

      Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.

    - `lt?: number`

      Return only events whose `effective_at` (Unix seconds) is less than this value.

    - `lte?: number`

      Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.

  - `event_types?: Array<"api_key.created" | "api_key.updated" | "api_key.deleted" | 54 more>`

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

    - `"workload_identity_provider.created"`

    - `"workload_identity_provider.updated"`

    - `"workload_identity_provider.deleted"`

    - `"workload_identity_provider_mapping.created"`

    - `"workload_identity_provider_mapping.updated"`

    - `"workload_identity_provider_mapping.deleted"`

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

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `project_ids?: Array<string>`

    Return only events for these projects.

  - `resource_ids?: Array<string>`

    Return only events performed on these targets. For example, a project ID updated.

### Returns

- `AuditLogListResponse`

  A log of a user action or configuration change within this organization.

  - `id: string`

    The ID of this log.

  - `effective_at: number`

    The Unix timestamp (in seconds) of the event.

  - `type: "api_key.created" | "api_key.updated" | "api_key.deleted" | 54 more`

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

    - `"workload_identity_provider.created"`

    - `"workload_identity_provider.updated"`

    - `"workload_identity_provider.deleted"`

    - `"workload_identity_provider_mapping.created"`

    - `"workload_identity_provider_mapping.updated"`

    - `"workload_identity_provider_mapping.deleted"`

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

  - `actor?: Actor | null`

    The actor who performed the audit logged action.

    - `api_key?: APIKey`

      The API Key used to perform the audit logged action.

      - `id?: string`

        The tracking id of the API key.

      - `service_account?: ServiceAccount`

        The service account that performed the audit logged action.

        - `id?: string`

          The service account id.

      - `type?: "user" | "service_account"`

        The type of API key. Can be either `user` or `service_account`.

        - `"user"`

        - `"service_account"`

      - `user?: User`

        The user who performed the audit logged action.

        - `id?: string`

          The user id.

        - `email?: string`

          The user email.

    - `session?: Session`

      The session in which the audit logged action was performed.

      - `ip_address?: string`

        The IP address from which the action was performed.

      - `user?: User`

        The user who performed the audit logged action.

        - `id?: string`

          The user id.

        - `email?: string`

          The user email.

    - `type?: "session" | "api_key"`

      The type of actor. Is either `session` or `api_key`.

      - `"session"`

      - `"api_key"`

  - `"api_key.created"?: APIKeyCreated`

    The details for events with this `type`.

    - `id?: string`

      The tracking ID of the API key.

    - `data?: Data`

      The payload used to create the API key.

      - `scopes?: Array<string>`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"api_key.deleted"?: APIKeyDeleted`

    The details for events with this `type`.

    - `id?: string`

      The tracking ID of the API key.

  - `"api_key.updated"?: APIKeyUpdated`

    The details for events with this `type`.

    - `id?: string`

      The tracking ID of the API key.

    - `changes_requested?: ChangesRequested`

      The payload used to update the API key.

      - `scopes?: Array<string>`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"certificate.created"?: CertificateCreated`

    The details for events with this `type`.

    - `id?: string`

      The certificate ID.

    - `name?: string`

      The name of the certificate.

  - `"certificate.deleted"?: CertificateDeleted`

    The details for events with this `type`.

    - `id?: string`

      The certificate ID.

    - `certificate?: string`

      The certificate content in PEM format.

    - `name?: string`

      The name of the certificate.

  - `"certificate.updated"?: CertificateUpdated`

    The details for events with this `type`.

    - `id?: string`

      The certificate ID.

    - `name?: string`

      The name of the certificate.

  - `"certificates.activated"?: CertificatesActivated`

    The details for events with this `type`.

    - `certificates?: Array<Certificate>`

      - `id?: string`

        The certificate ID.

      - `name?: string`

        The name of the certificate.

  - `"certificates.deactivated"?: CertificatesDeactivated`

    The details for events with this `type`.

    - `certificates?: Array<Certificate>`

      - `id?: string`

        The certificate ID.

      - `name?: string`

        The name of the certificate.

  - `"checkpoint.permission.created"?: CheckpointPermissionCreated`

    The project and fine-tuned model checkpoint that the checkpoint permission was created for.

    - `id?: string`

      The ID of the checkpoint permission.

    - `data?: Data`

      The payload used to create the checkpoint permission.

      - `fine_tuned_model_checkpoint?: string`

        The ID of the fine-tuned model checkpoint.

      - `project_id?: string`

        The ID of the project that the checkpoint permission was created for.

  - `"checkpoint.permission.deleted"?: CheckpointPermissionDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the checkpoint permission.

  - `"external_key.registered"?: ExternalKeyRegistered`

    The details for events with this `type`.

    - `id?: string`

      The ID of the external key configuration.

    - `data?: unknown`

      The configuration for the external key.

  - `"external_key.removed"?: ExternalKeyRemoved`

    The details for events with this `type`.

    - `id?: string`

      The ID of the external key configuration.

  - `"group.created"?: GroupCreated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the group.

    - `data?: Data`

      Information about the created group.

      - `group_name?: string`

        The group name.

  - `"group.deleted"?: GroupDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the group.

  - `"group.updated"?: GroupUpdated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the group.

    - `changes_requested?: ChangesRequested`

      The payload used to update the group.

      - `group_name?: string`

        The updated group name.

  - `"invite.accepted"?: InviteAccepted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the invite.

  - `"invite.deleted"?: InviteDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the invite.

  - `"invite.sent"?: InviteSent`

    The details for events with this `type`.

    - `id?: string`

      The ID of the invite.

    - `data?: Data`

      The payload used to create the invite.

      - `email?: string`

        The email invited to the organization.

      - `role?: string`

        The role the email was invited to be. Is either `owner` or `member`.

  - `"ip_allowlist.config.activated"?: IPAllowlistConfigActivated`

    The details for events with this `type`.

    - `configs?: Array<Config>`

      The configurations that were activated.

      - `id?: string`

        The ID of the IP allowlist configuration.

      - `name?: string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.config.deactivated"?: IPAllowlistConfigDeactivated`

    The details for events with this `type`.

    - `configs?: Array<Config>`

      The configurations that were deactivated.

      - `id?: string`

        The ID of the IP allowlist configuration.

      - `name?: string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.created"?: IPAllowlistCreated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the IP allowlist configuration.

    - `allowed_ips?: Array<string>`

      The IP addresses or CIDR ranges included in the configuration.

    - `name?: string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.deleted"?: IPAllowlistDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the IP allowlist configuration.

    - `allowed_ips?: Array<string>`

      The IP addresses or CIDR ranges that were in the configuration.

    - `name?: string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.updated"?: IPAllowlistUpdated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the IP allowlist configuration.

    - `allowed_ips?: Array<string>`

      The updated set of IP addresses or CIDR ranges in the configuration.

  - `"login.failed"?: LoginFailed`

    The details for events with this `type`.

    - `error_code?: string`

      The error code of the failure.

    - `error_message?: string`

      The error message of the failure.

  - `"login.succeeded"?: unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"logout.failed"?: LogoutFailed`

    The details for events with this `type`.

    - `error_code?: string`

      The error code of the failure.

    - `error_message?: string`

      The error message of the failure.

  - `"logout.succeeded"?: unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"organization.updated"?: OrganizationUpdated`

    The details for events with this `type`.

    - `id?: string`

      The organization ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the organization settings.

      - `api_call_logging?: string`

        How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects`

      - `api_call_logging_project_ids?: string`

        The list of project ids if api_call_logging is set to `enabled_for_selected_projects`

      - `description?: string`

        The organization description.

      - `name?: string`

        The organization name.

      - `threads_ui_visibility?: string`

        Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.

      - `title?: string`

        The organization title.

      - `usage_dashboard_visibility?: string`

        Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`.

  - `project?: Project`

    The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project.

    - `id?: string`

      The project ID.

    - `name?: string`

      The project title.

  - `"project.archived"?: ProjectArchived`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

  - `"project.created"?: ProjectCreated`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

    - `data?: Data`

      The payload used to create the project.

      - `name?: string`

        The project name.

      - `title?: string`

        The title of the project as seen on the dashboard.

  - `"project.deleted"?: ProjectDeleted`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

  - `"project.updated"?: ProjectUpdated`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the project.

      - `title?: string`

        The title of the project as seen on the dashboard.

  - `"rate_limit.deleted"?: RateLimitDeleted`

    The details for events with this `type`.

    - `id?: string`

      The rate limit ID

  - `"rate_limit.updated"?: RateLimitUpdated`

    The details for events with this `type`.

    - `id?: string`

      The rate limit ID

    - `changes_requested?: ChangesRequested`

      The payload used to update the rate limits.

      - `batch_1_day_max_input_tokens?: number`

        The maximum batch input tokens per day. Only relevant for certain models.

      - `max_audio_megabytes_per_1_minute?: number`

        The maximum audio megabytes per minute. Only relevant for certain models.

      - `max_images_per_1_minute?: number`

        The maximum images per minute. Only relevant for certain models.

      - `max_requests_per_1_day?: number`

        The maximum requests per day. Only relevant for certain models.

      - `max_requests_per_1_minute?: number`

        The maximum requests per minute.

      - `max_tokens_per_1_minute?: number`

        The maximum tokens per minute.

  - `"role.assignment.created"?: RoleAssignmentCreated`

    The details for events with this `type`.

    - `id?: string`

      The identifier of the role assignment.

    - `principal_id?: string`

      The principal (user or group) that received the role.

    - `principal_type?: string`

      The type of principal (user or group) that received the role.

    - `resource_id?: string`

      The resource the role assignment is scoped to.

    - `resource_type?: string`

      The type of resource the role assignment is scoped to.

  - `"role.assignment.deleted"?: RoleAssignmentDeleted`

    The details for events with this `type`.

    - `id?: string`

      The identifier of the role assignment.

    - `principal_id?: string`

      The principal (user or group) that had the role removed.

    - `principal_type?: string`

      The type of principal (user or group) that had the role removed.

    - `resource_id?: string`

      The resource the role assignment was scoped to.

    - `resource_type?: string`

      The type of resource the role assignment was scoped to.

  - `"role.created"?: RoleCreated`

    The details for events with this `type`.

    - `id?: string`

      The role ID.

    - `permissions?: Array<string>`

      The permissions granted by the role.

    - `resource_id?: string`

      The resource the role is scoped to.

    - `resource_type?: string`

      The type of resource the role belongs to.

    - `role_name?: string`

      The name of the role.

  - `"role.deleted"?: RoleDeleted`

    The details for events with this `type`.

    - `id?: string`

      The role ID.

  - `"role.updated"?: RoleUpdated`

    The details for events with this `type`.

    - `id?: string`

      The role ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the role.

      - `description?: string`

        The updated role description, when provided.

      - `metadata?: unknown`

        Additional metadata stored on the role.

      - `permissions_added?: Array<string>`

        The permissions added to the role.

      - `permissions_removed?: Array<string>`

        The permissions removed from the role.

      - `resource_id?: string`

        The resource the role is scoped to.

      - `resource_type?: string`

        The type of resource the role belongs to.

      - `role_name?: string`

        The updated role name, when provided.

  - `"scim.disabled"?: ScimDisabled`

    The details for events with this `type`.

    - `id?: string`

      The ID of the SCIM was disabled for.

  - `"scim.enabled"?: ScimEnabled`

    The details for events with this `type`.

    - `id?: string`

      The ID of the SCIM was enabled for.

  - `"service_account.created"?: ServiceAccountCreated`

    The details for events with this `type`.

    - `id?: string`

      The service account ID.

    - `data?: Data`

      The payload used to create the service account.

      - `role?: string`

        The role of the service account. Is either `owner` or `member`.

  - `"service_account.deleted"?: ServiceAccountDeleted`

    The details for events with this `type`.

    - `id?: string`

      The service account ID.

  - `"service_account.updated"?: ServiceAccountUpdated`

    The details for events with this `type`.

    - `id?: string`

      The service account ID.

    - `changes_requested?: ChangesRequested`

      The payload used to updated the service account.

      - `role?: string`

        The role of the service account. Is either `owner` or `member`.

  - `"user.added"?: UserAdded`

    The details for events with this `type`.

    - `id?: string`

      The user ID.

    - `data?: Data`

      The payload used to add the user to the project.

      - `role?: string`

        The role of the user. Is either `owner` or `member`.

  - `"user.deleted"?: UserDeleted`

    The details for events with this `type`.

    - `id?: string`

      The user ID.

  - `"user.updated"?: UserUpdated`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the user.

      - `role?: string`

        The role of the user. Is either `owner` or `member`.

  - `"workload_identity_provider_mapping.created"?: WorkloadIdentityProviderMappingCreated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider mapping ID.

    - `data?: unknown`

      The payload used to create the workload identity provider mapping.

    - `identity_provider_id?: string`

      The workload identity provider ID.

  - `"workload_identity_provider_mapping.deleted"?: WorkloadIdentityProviderMappingDeleted`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider mapping ID.

    - `identity_provider_id?: string`

      The workload identity provider ID.

    - `project_id?: string`

      The project ID.

    - `service_account_id?: string`

      The mapped service account ID.

  - `"workload_identity_provider_mapping.updated"?: WorkloadIdentityProviderMappingUpdated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider mapping ID.

    - `changes_requested?: unknown`

      The payload used to update the workload identity provider mapping.

    - `identity_provider_id?: string`

      The workload identity provider ID.

  - `"workload_identity_provider.created"?: WorkloadIdentityProviderCreated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider ID.

    - `data?: unknown`

      The payload used to create the workload identity provider.

  - `"workload_identity_provider.deleted"?: WorkloadIdentityProviderDeleted`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider ID.

    - `name?: string`

      The workload identity provider name.

  - `"workload_identity_provider.updated"?: WorkloadIdentityProviderUpdated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider ID.

    - `changes_requested?: unknown`

      The payload used to update the workload identity provider.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const auditLogListResponse of client.admin.organization.auditLogs.list()) {
  console.log(auditLogListResponse.id);
}
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
      },
      "workload_identity_provider_mapping.created": {
        "id": "id",
        "data": {},
        "identity_provider_id": "identity_provider_id"
      },
      "workload_identity_provider_mapping.deleted": {
        "id": "id",
        "identity_provider_id": "identity_provider_id",
        "project_id": "project_id",
        "service_account_id": "service_account_id"
      },
      "workload_identity_provider_mapping.updated": {
        "id": "id",
        "changes_requested": {},
        "identity_provider_id": "identity_provider_id"
      },
      "workload_identity_provider.created": {
        "id": "id",
        "data": {}
      },
      "workload_identity_provider.deleted": {
        "id": "id",
        "name": "name"
      },
      "workload_identity_provider.updated": {
        "id": "id",
        "changes_requested": {}
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

- `AuditLogListResponse`

  A log of a user action or configuration change within this organization.

  - `id: string`

    The ID of this log.

  - `effective_at: number`

    The Unix timestamp (in seconds) of the event.

  - `type: "api_key.created" | "api_key.updated" | "api_key.deleted" | 54 more`

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

    - `"workload_identity_provider.created"`

    - `"workload_identity_provider.updated"`

    - `"workload_identity_provider.deleted"`

    - `"workload_identity_provider_mapping.created"`

    - `"workload_identity_provider_mapping.updated"`

    - `"workload_identity_provider_mapping.deleted"`

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

  - `actor?: Actor | null`

    The actor who performed the audit logged action.

    - `api_key?: APIKey`

      The API Key used to perform the audit logged action.

      - `id?: string`

        The tracking id of the API key.

      - `service_account?: ServiceAccount`

        The service account that performed the audit logged action.

        - `id?: string`

          The service account id.

      - `type?: "user" | "service_account"`

        The type of API key. Can be either `user` or `service_account`.

        - `"user"`

        - `"service_account"`

      - `user?: User`

        The user who performed the audit logged action.

        - `id?: string`

          The user id.

        - `email?: string`

          The user email.

    - `session?: Session`

      The session in which the audit logged action was performed.

      - `ip_address?: string`

        The IP address from which the action was performed.

      - `user?: User`

        The user who performed the audit logged action.

        - `id?: string`

          The user id.

        - `email?: string`

          The user email.

    - `type?: "session" | "api_key"`

      The type of actor. Is either `session` or `api_key`.

      - `"session"`

      - `"api_key"`

  - `"api_key.created"?: APIKeyCreated`

    The details for events with this `type`.

    - `id?: string`

      The tracking ID of the API key.

    - `data?: Data`

      The payload used to create the API key.

      - `scopes?: Array<string>`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"api_key.deleted"?: APIKeyDeleted`

    The details for events with this `type`.

    - `id?: string`

      The tracking ID of the API key.

  - `"api_key.updated"?: APIKeyUpdated`

    The details for events with this `type`.

    - `id?: string`

      The tracking ID of the API key.

    - `changes_requested?: ChangesRequested`

      The payload used to update the API key.

      - `scopes?: Array<string>`

        A list of scopes allowed for the API key, e.g. `["api.model.request"]`

  - `"certificate.created"?: CertificateCreated`

    The details for events with this `type`.

    - `id?: string`

      The certificate ID.

    - `name?: string`

      The name of the certificate.

  - `"certificate.deleted"?: CertificateDeleted`

    The details for events with this `type`.

    - `id?: string`

      The certificate ID.

    - `certificate?: string`

      The certificate content in PEM format.

    - `name?: string`

      The name of the certificate.

  - `"certificate.updated"?: CertificateUpdated`

    The details for events with this `type`.

    - `id?: string`

      The certificate ID.

    - `name?: string`

      The name of the certificate.

  - `"certificates.activated"?: CertificatesActivated`

    The details for events with this `type`.

    - `certificates?: Array<Certificate>`

      - `id?: string`

        The certificate ID.

      - `name?: string`

        The name of the certificate.

  - `"certificates.deactivated"?: CertificatesDeactivated`

    The details for events with this `type`.

    - `certificates?: Array<Certificate>`

      - `id?: string`

        The certificate ID.

      - `name?: string`

        The name of the certificate.

  - `"checkpoint.permission.created"?: CheckpointPermissionCreated`

    The project and fine-tuned model checkpoint that the checkpoint permission was created for.

    - `id?: string`

      The ID of the checkpoint permission.

    - `data?: Data`

      The payload used to create the checkpoint permission.

      - `fine_tuned_model_checkpoint?: string`

        The ID of the fine-tuned model checkpoint.

      - `project_id?: string`

        The ID of the project that the checkpoint permission was created for.

  - `"checkpoint.permission.deleted"?: CheckpointPermissionDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the checkpoint permission.

  - `"external_key.registered"?: ExternalKeyRegistered`

    The details for events with this `type`.

    - `id?: string`

      The ID of the external key configuration.

    - `data?: unknown`

      The configuration for the external key.

  - `"external_key.removed"?: ExternalKeyRemoved`

    The details for events with this `type`.

    - `id?: string`

      The ID of the external key configuration.

  - `"group.created"?: GroupCreated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the group.

    - `data?: Data`

      Information about the created group.

      - `group_name?: string`

        The group name.

  - `"group.deleted"?: GroupDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the group.

  - `"group.updated"?: GroupUpdated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the group.

    - `changes_requested?: ChangesRequested`

      The payload used to update the group.

      - `group_name?: string`

        The updated group name.

  - `"invite.accepted"?: InviteAccepted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the invite.

  - `"invite.deleted"?: InviteDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the invite.

  - `"invite.sent"?: InviteSent`

    The details for events with this `type`.

    - `id?: string`

      The ID of the invite.

    - `data?: Data`

      The payload used to create the invite.

      - `email?: string`

        The email invited to the organization.

      - `role?: string`

        The role the email was invited to be. Is either `owner` or `member`.

  - `"ip_allowlist.config.activated"?: IPAllowlistConfigActivated`

    The details for events with this `type`.

    - `configs?: Array<Config>`

      The configurations that were activated.

      - `id?: string`

        The ID of the IP allowlist configuration.

      - `name?: string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.config.deactivated"?: IPAllowlistConfigDeactivated`

    The details for events with this `type`.

    - `configs?: Array<Config>`

      The configurations that were deactivated.

      - `id?: string`

        The ID of the IP allowlist configuration.

      - `name?: string`

        The name of the IP allowlist configuration.

  - `"ip_allowlist.created"?: IPAllowlistCreated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the IP allowlist configuration.

    - `allowed_ips?: Array<string>`

      The IP addresses or CIDR ranges included in the configuration.

    - `name?: string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.deleted"?: IPAllowlistDeleted`

    The details for events with this `type`.

    - `id?: string`

      The ID of the IP allowlist configuration.

    - `allowed_ips?: Array<string>`

      The IP addresses or CIDR ranges that were in the configuration.

    - `name?: string`

      The name of the IP allowlist configuration.

  - `"ip_allowlist.updated"?: IPAllowlistUpdated`

    The details for events with this `type`.

    - `id?: string`

      The ID of the IP allowlist configuration.

    - `allowed_ips?: Array<string>`

      The updated set of IP addresses or CIDR ranges in the configuration.

  - `"login.failed"?: LoginFailed`

    The details for events with this `type`.

    - `error_code?: string`

      The error code of the failure.

    - `error_message?: string`

      The error message of the failure.

  - `"login.succeeded"?: unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"logout.failed"?: LogoutFailed`

    The details for events with this `type`.

    - `error_code?: string`

      The error code of the failure.

    - `error_message?: string`

      The error message of the failure.

  - `"logout.succeeded"?: unknown`

    This event has no additional fields beyond the standard audit log attributes.

  - `"organization.updated"?: OrganizationUpdated`

    The details for events with this `type`.

    - `id?: string`

      The organization ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the organization settings.

      - `api_call_logging?: string`

        How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects`

      - `api_call_logging_project_ids?: string`

        The list of project ids if api_call_logging is set to `enabled_for_selected_projects`

      - `description?: string`

        The organization description.

      - `name?: string`

        The organization name.

      - `threads_ui_visibility?: string`

        Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.

      - `title?: string`

        The organization title.

      - `usage_dashboard_visibility?: string`

        Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`.

  - `project?: Project`

    The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project.

    - `id?: string`

      The project ID.

    - `name?: string`

      The project title.

  - `"project.archived"?: ProjectArchived`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

  - `"project.created"?: ProjectCreated`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

    - `data?: Data`

      The payload used to create the project.

      - `name?: string`

        The project name.

      - `title?: string`

        The title of the project as seen on the dashboard.

  - `"project.deleted"?: ProjectDeleted`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

  - `"project.updated"?: ProjectUpdated`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the project.

      - `title?: string`

        The title of the project as seen on the dashboard.

  - `"rate_limit.deleted"?: RateLimitDeleted`

    The details for events with this `type`.

    - `id?: string`

      The rate limit ID

  - `"rate_limit.updated"?: RateLimitUpdated`

    The details for events with this `type`.

    - `id?: string`

      The rate limit ID

    - `changes_requested?: ChangesRequested`

      The payload used to update the rate limits.

      - `batch_1_day_max_input_tokens?: number`

        The maximum batch input tokens per day. Only relevant for certain models.

      - `max_audio_megabytes_per_1_minute?: number`

        The maximum audio megabytes per minute. Only relevant for certain models.

      - `max_images_per_1_minute?: number`

        The maximum images per minute. Only relevant for certain models.

      - `max_requests_per_1_day?: number`

        The maximum requests per day. Only relevant for certain models.

      - `max_requests_per_1_minute?: number`

        The maximum requests per minute.

      - `max_tokens_per_1_minute?: number`

        The maximum tokens per minute.

  - `"role.assignment.created"?: RoleAssignmentCreated`

    The details for events with this `type`.

    - `id?: string`

      The identifier of the role assignment.

    - `principal_id?: string`

      The principal (user or group) that received the role.

    - `principal_type?: string`

      The type of principal (user or group) that received the role.

    - `resource_id?: string`

      The resource the role assignment is scoped to.

    - `resource_type?: string`

      The type of resource the role assignment is scoped to.

  - `"role.assignment.deleted"?: RoleAssignmentDeleted`

    The details for events with this `type`.

    - `id?: string`

      The identifier of the role assignment.

    - `principal_id?: string`

      The principal (user or group) that had the role removed.

    - `principal_type?: string`

      The type of principal (user or group) that had the role removed.

    - `resource_id?: string`

      The resource the role assignment was scoped to.

    - `resource_type?: string`

      The type of resource the role assignment was scoped to.

  - `"role.created"?: RoleCreated`

    The details for events with this `type`.

    - `id?: string`

      The role ID.

    - `permissions?: Array<string>`

      The permissions granted by the role.

    - `resource_id?: string`

      The resource the role is scoped to.

    - `resource_type?: string`

      The type of resource the role belongs to.

    - `role_name?: string`

      The name of the role.

  - `"role.deleted"?: RoleDeleted`

    The details for events with this `type`.

    - `id?: string`

      The role ID.

  - `"role.updated"?: RoleUpdated`

    The details for events with this `type`.

    - `id?: string`

      The role ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the role.

      - `description?: string`

        The updated role description, when provided.

      - `metadata?: unknown`

        Additional metadata stored on the role.

      - `permissions_added?: Array<string>`

        The permissions added to the role.

      - `permissions_removed?: Array<string>`

        The permissions removed from the role.

      - `resource_id?: string`

        The resource the role is scoped to.

      - `resource_type?: string`

        The type of resource the role belongs to.

      - `role_name?: string`

        The updated role name, when provided.

  - `"scim.disabled"?: ScimDisabled`

    The details for events with this `type`.

    - `id?: string`

      The ID of the SCIM was disabled for.

  - `"scim.enabled"?: ScimEnabled`

    The details for events with this `type`.

    - `id?: string`

      The ID of the SCIM was enabled for.

  - `"service_account.created"?: ServiceAccountCreated`

    The details for events with this `type`.

    - `id?: string`

      The service account ID.

    - `data?: Data`

      The payload used to create the service account.

      - `role?: string`

        The role of the service account. Is either `owner` or `member`.

  - `"service_account.deleted"?: ServiceAccountDeleted`

    The details for events with this `type`.

    - `id?: string`

      The service account ID.

  - `"service_account.updated"?: ServiceAccountUpdated`

    The details for events with this `type`.

    - `id?: string`

      The service account ID.

    - `changes_requested?: ChangesRequested`

      The payload used to updated the service account.

      - `role?: string`

        The role of the service account. Is either `owner` or `member`.

  - `"user.added"?: UserAdded`

    The details for events with this `type`.

    - `id?: string`

      The user ID.

    - `data?: Data`

      The payload used to add the user to the project.

      - `role?: string`

        The role of the user. Is either `owner` or `member`.

  - `"user.deleted"?: UserDeleted`

    The details for events with this `type`.

    - `id?: string`

      The user ID.

  - `"user.updated"?: UserUpdated`

    The details for events with this `type`.

    - `id?: string`

      The project ID.

    - `changes_requested?: ChangesRequested`

      The payload used to update the user.

      - `role?: string`

        The role of the user. Is either `owner` or `member`.

  - `"workload_identity_provider_mapping.created"?: WorkloadIdentityProviderMappingCreated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider mapping ID.

    - `data?: unknown`

      The payload used to create the workload identity provider mapping.

    - `identity_provider_id?: string`

      The workload identity provider ID.

  - `"workload_identity_provider_mapping.deleted"?: WorkloadIdentityProviderMappingDeleted`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider mapping ID.

    - `identity_provider_id?: string`

      The workload identity provider ID.

    - `project_id?: string`

      The project ID.

    - `service_account_id?: string`

      The mapped service account ID.

  - `"workload_identity_provider_mapping.updated"?: WorkloadIdentityProviderMappingUpdated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider mapping ID.

    - `changes_requested?: unknown`

      The payload used to update the workload identity provider mapping.

    - `identity_provider_id?: string`

      The workload identity provider ID.

  - `"workload_identity_provider.created"?: WorkloadIdentityProviderCreated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider ID.

    - `data?: unknown`

      The payload used to create the workload identity provider.

  - `"workload_identity_provider.deleted"?: WorkloadIdentityProviderDeleted`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider ID.

    - `name?: string`

      The workload identity provider name.

  - `"workload_identity_provider.updated"?: WorkloadIdentityProviderUpdated`

    The details for events with this `type`.

    - `id?: string`

      The workload identity provider ID.

    - `changes_requested?: unknown`

      The payload used to update the workload identity provider.
