# Organization

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

# Admin API Keys

## List all organization and project API keys.

`client.admin.organization.adminAPIKeys.list(AdminAPIKeyListParamsquery?, RequestOptionsoptions?): CursorPage<AdminAPIKey>`

**get** `/organization/admin_api_keys`

List organization API keys

### Parameters

- `query: AdminAPIKeyListParams`

  - `after?: string | null`

    Return keys with IDs that come after this ID in the pagination order.

  - `limit?: number`

    Maximum number of keys to return.

  - `order?: "asc" | "desc"`

    Order results by creation time, ascending or descending.

    - `"asc"`

    - `"desc"`

### Returns

- `AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id?: string`

      The identifier, which can be referenced in API endpoints

    - `created_at?: number`

      The Unix timestamp (in seconds) of when the user was created

    - `name?: string`

      The name of the user

    - `object?: string`

      The object type, which is always organization.user

    - `role?: string`

      Always `owner`

    - `type?: string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `last_used_at?: number | null`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name?: string | null`

    The name of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const adminAPIKey of client.admin.organization.adminAPIKeys.list()) {
  console.log(adminAPIKey.id);
}
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

`client.admin.organization.adminAPIKeys.create(AdminAPIKeyCreateParamsbody, RequestOptionsoptions?): AdminAPIKeyCreateResponse`

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Parameters

- `body: AdminAPIKeyCreateParams`

  - `name: string`

### Returns

- `AdminAPIKeyCreateResponse extends AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `value: string`

    The value of the API key. Only shown on create.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.create({ name: 'New Admin Key' });

console.log(adminAPIKey);
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

`client.admin.organization.adminAPIKeys.retrieve(stringkeyID, RequestOptionsoptions?): AdminAPIKey`

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Parameters

- `keyID: string`

  The ID of the API key.

### Returns

- `AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id?: string`

      The identifier, which can be referenced in API endpoints

    - `created_at?: number`

      The Unix timestamp (in seconds) of when the user was created

    - `name?: string`

      The name of the user

    - `object?: string`

      The object type, which is always organization.user

    - `role?: string`

      Always `owner`

    - `type?: string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `last_used_at?: number | null`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name?: string | null`

    The name of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.retrieve('key_id');

console.log(adminAPIKey.id);
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

`client.admin.organization.adminAPIKeys.delete(stringkeyID, RequestOptionsoptions?): AdminAPIKeyDeleteResponse`

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Parameters

- `keyID: string`

  The ID of the API key to be deleted.

### Returns

- `AdminAPIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.admin_api_key.deleted"`

    - `"organization.admin_api_key.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.delete('key_id');

console.log(adminAPIKey.id);
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

- `AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id?: string`

      The identifier, which can be referenced in API endpoints

    - `created_at?: number`

      The Unix timestamp (in seconds) of when the user was created

    - `name?: string`

      The name of the user

    - `object?: string`

      The object type, which is always organization.user

    - `role?: string`

      Always `owner`

    - `type?: string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `last_used_at?: number | null`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name?: string | null`

    The name of the API key

### Admin API Key Create Response

- `AdminAPIKeyCreateResponse extends AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `value: string`

    The value of the API key. Only shown on create.

### Admin API Key Delete Response

- `AdminAPIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.admin_api_key.deleted"`

    - `"organization.admin_api_key.deleted"`

# Usage

## Audio speeches

`client.admin.organization.usage.audioSpeeches(UsageAudioSpeechesParamsquery, RequestOptionsoptions?): UsageAudioSpeechesResponse`

**get** `/organization/usage/audio_speeches`

Get audio speeches usage details for the organization.

### Parameters

- `query: UsageAudioSpeechesParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | "model">`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageAudioSpeechesResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.audioSpeeches({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.audioTranscriptions(UsageAudioTranscriptionsParamsquery, RequestOptionsoptions?): UsageAudioTranscriptionsResponse`

**get** `/organization/usage/audio_transcriptions`

Get audio transcriptions usage details for the organization.

### Parameters

- `query: UsageAudioTranscriptionsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | "model">`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageAudioTranscriptionsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.audioTranscriptions({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.codeInterpreterSessions(UsageCodeInterpreterSessionsParamsquery, RequestOptionsoptions?): UsageCodeInterpreterSessionsResponse`

**get** `/organization/usage/code_interpreter_sessions`

Get code interpreter sessions usage details for the organization.

### Parameters

- `query: UsageCodeInterpreterSessionsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id">`

    Group the usage data by the specified fields. Support fields include `project_id`.

    - `"project_id"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

### Returns

- `UsageCodeInterpreterSessionsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.codeInterpreterSessions({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.completions(UsageCompletionsParamsquery, RequestOptionsoptions?): UsageCompletionsResponse`

**get** `/organization/usage/completions`

Get completions usage details for the organization.

### Parameters

- `query: UsageCompletionsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `batch?: boolean`

    If `true`, return batch jobs only. If `false`, return non-batch jobs only. By default, return both.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | 3 more>`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

    - `"batch"`

    - `"service_tier"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageCompletionsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.completions({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.embeddings(UsageEmbeddingsParamsquery, RequestOptionsoptions?): UsageEmbeddingsResponse`

**get** `/organization/usage/embeddings`

Get embeddings usage details for the organization.

### Parameters

- `query: UsageEmbeddingsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | "model">`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageEmbeddingsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.embeddings({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.images(UsageImagesParamsquery, RequestOptionsoptions?): UsageImagesResponse`

**get** `/organization/usage/images`

Get images usage details for the organization.

### Parameters

- `query: UsageImagesParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | 3 more>`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `size`, `source` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

    - `"size"`

    - `"source"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `sizes?: Array<"256x256" | "512x512" | "1024x1024" | 2 more>`

    Return only usages for these image sizes. Possible values are `256x256`, `512x512`, `1024x1024`, `1792x1792`, `1024x1792` or any combination of them.

    - `"256x256"`

    - `"512x512"`

    - `"1024x1024"`

    - `"1792x1792"`

    - `"1024x1792"`

  - `sources?: Array<"image.generation" | "image.edit" | "image.variation">`

    Return only usages for these sources. Possible values are `image.generation`, `image.edit`, `image.variation` or any combination of them.

    - `"image.generation"`

    - `"image.edit"`

    - `"image.variation"`

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageImagesResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.images({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.moderations(UsageModerationsParamsquery, RequestOptionsoptions?): UsageModerationsResponse`

**get** `/organization/usage/moderations`

Get moderations usage details for the organization.

### Parameters

- `query: UsageModerationsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | "model">`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageModerationsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.moderations({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.vectorStores(UsageVectorStoresParamsquery, RequestOptionsoptions?): UsageVectorStoresResponse`

**get** `/organization/usage/vector_stores`

Get vector stores usage details for the organization.

### Parameters

- `query: UsageVectorStoresParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id">`

    Group the usage data by the specified fields. Support fields include `project_id`.

    - `"project_id"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

### Returns

- `UsageVectorStoresResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.vectorStores({ start_time: 0 });

console.log(response.data);
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

## File search calls

`client.admin.organization.usage.fileSearchCalls(UsageFileSearchCallsParamsquery, RequestOptionsoptions?): UsageFileSearchCallsResponse`

**get** `/organization/usage/file_search_calls`

Get file search calls usage details for the organization.

### Parameters

- `query: UsageFileSearchCallsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | "vector_store_id">`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `vector_store_id` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"vector_store_id"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

  - `vector_store_ids?: Array<string>`

    Return only usage for these vector stores.

### Returns

- `UsageFileSearchCallsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.fileSearchCalls({ start_time: 0 });

console.log(response.data);
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

## Web search calls

`client.admin.organization.usage.webSearchCalls(UsageWebSearchCallsParamsquery, RequestOptionsoptions?): UsageWebSearchCallsResponse`

**get** `/organization/usage/web_search_calls`

Get web search calls usage details for the organization.

### Parameters

- `query: UsageWebSearchCallsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only usage for these API keys.

  - `bucket_width?: "1m" | "1h" | "1d"`

    Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

    - `"1m"`

    - `"1h"`

    - `"1d"`

  - `context_levels?: Array<"low" | "medium" | "high">`

    Return only web search usage for these context levels.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "user_id" | "api_key_id" | 2 more>`

    Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `context_level` or any combination of them.

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

    - `"context_level"`

  - `limit?: number`

    Specifies the number of buckets to return.

    - `bucket_width=1d`: default: 7, max: 31
    - `bucket_width=1h`: default: 24, max: 168
    - `bucket_width=1m`: default: 60, max: 1440

  - `models?: Array<string>`

    Return only usage for these models.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only usage for these projects.

  - `user_ids?: Array<string>`

    Return only usage for these users.

### Returns

- `UsageWebSearchCallsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.webSearchCalls({ start_time: 0 });

console.log(response.data);
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

`client.admin.organization.usage.costs(UsageCostsParamsquery, RequestOptionsoptions?): UsageCostsResponse`

**get** `/organization/costs`

Get costs details for the organization.

### Parameters

- `query: UsageCostsParams`

  - `start_time: number`

    Start time (Unix seconds) of the query time range, inclusive.

  - `api_key_ids?: Array<string>`

    Return only costs for these API keys.

  - `bucket_width?: "1d"`

    Width of each time bucket in response. Currently only `1d` is supported, default to `1d`.

    - `"1d"`

  - `end_time?: number`

    End time (Unix seconds) of the query time range, exclusive.

  - `group_by?: Array<"project_id" | "line_item" | "api_key_id">`

    Group the costs by the specified fields. Support fields include `project_id`, `line_item`, `api_key_id` and any combination of them.

    - `"project_id"`

    - `"line_item"`

    - `"api_key_id"`

  - `limit?: number`

    A limit on the number of buckets to be returned. Limit can range between 1 and 180, and the default is 7.

  - `page?: string`

    A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

  - `project_ids?: Array<string>`

    Return only costs for these projects.

### Returns

- `UsageCostsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const response = await client.admin.organization.usage.costs({ start_time: 0 });

console.log(response.data);
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

- `UsageAudioSpeechesResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Audio Transcriptions Response

- `UsageAudioTranscriptionsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Code Interpreter Sessions Response

- `UsageCodeInterpreterSessionsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Completions Response

- `UsageCompletionsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Embeddings Response

- `UsageEmbeddingsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Images Response

- `UsageImagesResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Moderations Response

- `UsageModerationsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Vector Stores Response

- `UsageVectorStoresResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage File Search Calls Response

- `UsageFileSearchCallsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Web Search Calls Response

- `UsageWebSearchCallsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

### Usage Costs Response

- `UsageCostsResponse`

  - `data: Array<Data>`

    - `end_time: number`

    - `object: "bucket"`

      - `"bucket"`

    - `results: Array<OrganizationUsageCompletionsResult | OrganizationUsageEmbeddingsResult | OrganizationUsageModerationsResult | 8 more>`

      - `OrganizationUsageCompletionsResult`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.completions.result"`

          - `"organization.usage.completions.result"`

        - `output_tokens: number`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch?: boolean | null`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens?: number`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens?: number`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens?: number`

          The aggregated number of audio output tokens used.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier?: string | null`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageEmbeddingsResult`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.embeddings.result"`

          - `"organization.usage.embeddings.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageModerationsResult`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: number`

          The aggregated number of input tokens used.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.moderations.result"`

          - `"organization.usage.moderations.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageImagesResult`

        The aggregated images usage details of the specific time bucket.

        - `images: number`

          The number of images processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.images.result"`

          - `"organization.usage.images.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size?: string | null`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source?: string | null`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioSpeechesResult`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: number`

          The number of characters processed.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_speeches.result"`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageAudioTranscriptionsResult`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of requests made to the model.

        - `object: "organization.usage.audio_transcriptions.result"`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: number`

          The number of seconds processed.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationUsageVectorStoresResult`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: "organization.usage.vector_stores.result"`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: number`

          The vector stores usage in bytes.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageCodeInterpreterSessionsResult`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: number`

          The number of code interpreter sessions.

        - `object: "organization.usage.code_interpreter_sessions.result"`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `OrganizationUsageFileSearchesResult`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: number`

          The count of file search calls.

        - `object: "organization.usage.file_searches.result"`

          - `"organization.usage.file_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id?: string | null`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `OrganizationUsageWebSearchesResult`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: number`

          The count of model requests.

        - `num_requests: number`

          The count of web search calls.

        - `object: "organization.usage.web_searches.result"`

          - `"organization.usage.web_searches.result"`

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level?: string | null`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model?: string | null`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id?: string | null`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `OrganizationCostsResult`

        The aggregated costs details of the specific time bucket.

        - `object: "organization.costs.result"`

          - `"organization.costs.result"`

        - `amount?: Amount`

          The monetary value in its associated currency.

          - `currency?: string`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value?: number`

            The numeric value of the cost.

        - `api_key_id?: string | null`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item?: string | null`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id?: string | null`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity?: number | null`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: number`

  - `has_more: boolean`

  - `next_page: string | null`

  - `object: "page"`

    - `"page"`

# Invites

## List invites

`client.admin.organization.invites.list(InviteListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Invite>`

**get** `/organization/invites`

Returns a list of invites in the organization.

### Parameters

- `query: InviteListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `Invite`

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

  - `projects: Array<Project>`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" | "expired" | "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at?: number | null`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at?: number | null`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const invite of client.admin.organization.invites.list()) {
  console.log(invite.id);
}
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

`client.admin.organization.invites.create(InviteCreateParamsbody, RequestOptionsoptions?): Invite`

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Parameters

- `body: InviteCreateParams`

  - `email: string`

    Send an email to this address

  - `role: "reader" | "owner"`

    `owner` or `reader`

    - `"reader"`

    - `"owner"`

  - `projects?: Array<Project>`

    An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior. If empty list is passed, the user will not be invited to any projects, including the default one.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

### Returns

- `Invite`

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

  - `projects: Array<Project>`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" | "expired" | "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at?: number | null`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at?: number | null`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const invite = await client.admin.organization.invites.create({ email: 'email', role: 'reader' });

console.log(invite.id);
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

`client.admin.organization.invites.retrieve(stringinviteID, RequestOptionsoptions?): Invite`

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Parameters

- `inviteID: string`

### Returns

- `Invite`

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

  - `projects: Array<Project>`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" | "expired" | "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at?: number | null`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at?: number | null`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const invite = await client.admin.organization.invites.retrieve('invite_id');

console.log(invite.id);
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

`client.admin.organization.invites.delete(stringinviteID, RequestOptionsoptions?): InviteDeleteResponse`

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Parameters

- `inviteID: string`

### Returns

- `InviteDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const invite = await client.admin.organization.invites.delete('invite_id');

console.log(invite.id);
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

- `Invite`

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

  - `projects: Array<Project>`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" | "expired" | "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at?: number | null`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at?: number | null`

    The Unix timestamp (in seconds) of when the invite expires.

### Invite Delete Response

- `InviteDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

# Users

## List users

`client.admin.organization.users.list(UserListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<OrganizationUser>`

**get** `/organization/users`

Lists all of the users in the organization.

### Parameters

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `emails?: Array<string>`

    Filter by the email address of users.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at?: number | null`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created?: number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona?: string | null`

    The developer persona metadata for the user.

  - `email?: string | null`

    The email address of the user

  - `is_default?: boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser?: boolean | null`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed?: boolean`

    Whether the user is managed through SCIM.

  - `is_service_account?: boolean`

    Whether the user is a service account.

  - `name?: string | null`

    The name of the user

  - `projects?: Projects | null`

    Projects associated with the user, if included.

    - `data: Array<Data>`

      - `id?: string | null`

      - `name?: string | null`

      - `role?: string | null`

    - `object: "list"`

      - `"list"`

  - `role?: string | null`

    `owner` or `reader`

  - `technical_level?: string | null`

    The technical level metadata for the user.

  - `user?: User`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned?: boolean | null`

    - `banned_at?: number | null`

    - `email?: string | null`

    - `enabled?: boolean | null`

    - `name?: string | null`

    - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationUser of client.admin.organization.users.list()) {
  console.log(organizationUser.id);
}
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

`client.admin.organization.users.retrieve(stringuserID, RequestOptionsoptions?): OrganizationUser`

**get** `/organization/users/{user_id}`

Retrieves a user by their identifier.

### Parameters

- `userID: string`

### Returns

- `OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at?: number | null`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created?: number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona?: string | null`

    The developer persona metadata for the user.

  - `email?: string | null`

    The email address of the user

  - `is_default?: boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser?: boolean | null`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed?: boolean`

    Whether the user is managed through SCIM.

  - `is_service_account?: boolean`

    Whether the user is a service account.

  - `name?: string | null`

    The name of the user

  - `projects?: Projects | null`

    Projects associated with the user, if included.

    - `data: Array<Data>`

      - `id?: string | null`

      - `name?: string | null`

      - `role?: string | null`

    - `object: "list"`

      - `"list"`

  - `role?: string | null`

    `owner` or `reader`

  - `technical_level?: string | null`

    The technical level metadata for the user.

  - `user?: User`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned?: boolean | null`

    - `banned_at?: number | null`

    - `email?: string | null`

    - `enabled?: boolean | null`

    - `name?: string | null`

    - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationUser = await client.admin.organization.users.retrieve('user_id');

console.log(organizationUser.id);
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

`client.admin.organization.users.update(stringuserID, UserUpdateParamsbody, RequestOptionsoptions?): OrganizationUser`

**post** `/organization/users/{user_id}`

Modifies a user's role in the organization.

### Parameters

- `userID: string`

- `body: UserUpdateParams`

  - `developer_persona?: string | null`

    Developer persona metadata.

  - `role?: string | null`

    `owner` or `reader`

  - `role_id?: string | null`

    Role ID to assign to the user.

  - `technical_level?: string | null`

    Technical level metadata.

### Returns

- `OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at?: number | null`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created?: number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona?: string | null`

    The developer persona metadata for the user.

  - `email?: string | null`

    The email address of the user

  - `is_default?: boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser?: boolean | null`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed?: boolean`

    Whether the user is managed through SCIM.

  - `is_service_account?: boolean`

    Whether the user is a service account.

  - `name?: string | null`

    The name of the user

  - `projects?: Projects | null`

    Projects associated with the user, if included.

    - `data: Array<Data>`

      - `id?: string | null`

      - `name?: string | null`

      - `role?: string | null`

    - `object: "list"`

      - `"list"`

  - `role?: string | null`

    `owner` or `reader`

  - `technical_level?: string | null`

    The technical level metadata for the user.

  - `user?: User`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned?: boolean | null`

    - `banned_at?: number | null`

    - `email?: string | null`

    - `enabled?: boolean | null`

    - `name?: string | null`

    - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationUser = await client.admin.organization.users.update('user_id');

console.log(organizationUser.id);
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

`client.admin.organization.users.delete(stringuserID, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/users/{user_id}`

Deletes a user from the organization.

### Parameters

- `userID: string`

### Returns

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.user.deleted"`

    - `"organization.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.users.delete('user_id');

console.log(user.id);
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

- `OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at?: number | null`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created?: number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona?: string | null`

    The developer persona metadata for the user.

  - `email?: string | null`

    The email address of the user

  - `is_default?: boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser?: boolean | null`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed?: boolean`

    Whether the user is managed through SCIM.

  - `is_service_account?: boolean`

    Whether the user is a service account.

  - `name?: string | null`

    The name of the user

  - `projects?: Projects | null`

    Projects associated with the user, if included.

    - `data: Array<Data>`

      - `id?: string | null`

      - `name?: string | null`

      - `role?: string | null`

    - `object: "list"`

      - `"list"`

  - `role?: string | null`

    `owner` or `reader`

  - `technical_level?: string | null`

    The technical level metadata for the user.

  - `user?: User`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned?: boolean | null`

    - `banned_at?: number | null`

    - `email?: string | null`

    - `enabled?: boolean | null`

    - `name?: string | null`

    - `picture?: string | null`

### User Delete Response

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.user.deleted"`

    - `"organization.user.deleted"`

# Roles

## List user organization role assignments

`client.admin.organization.users.roles.list(stringuserID, RoleListParamsquery?, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/organization/users/{user_id}/roles`

Lists the organization roles assigned to a user within the organization.

### Parameters

- `userID: string`

- `query: RoleListParams`

  - `after?: string`

    Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

  - `limit?: number`

    A limit on the number of organization role assignments to return.

  - `order?: "asc" | "desc"`

    Sort order for the returned organization roles.

    - `"asc"`

    - `"desc"`

### Returns

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const roleListResponse of client.admin.organization.users.roles.list('user_id')) {
  console.log(roleListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "assignment_sources": [
        {
          "principal_id": "principal_id",
          "principal_type": "principal_type"
        }
      ],
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

`client.admin.organization.users.roles.create(stringuserID, RoleCreateParamsbody, RequestOptionsoptions?): RoleCreateResponse`

**post** `/organization/users/{user_id}/roles`

Assigns an organization role to a user within the organization.

### Parameters

- `userID: string`

- `body: RoleCreateParams`

  - `role_id: string`

    Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

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

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.users.roles.create('user_id', { role_id: 'role_id' });

console.log(role.object);
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

## Retrieve user organization role

`client.admin.organization.users.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/organization/users/{user_id}/roles/{role_id}`

Retrieves an organization role assigned to a user.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `user_id: string`

    The ID of the user to inspect.

### Returns

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.users.roles.retrieve('role_id', {
  user_id: 'user_id',
});

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "assignment_sources": [
    {
      "principal_id": "principal_id",
      "principal_type": "principal_type"
    }
  ],
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
```

## Unassign organization role from user

`client.admin.organization.users.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/organization/users/{user_id}/roles/{role_id}`

Unassigns an organization role from a user within the organization.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `user_id: string`

    The ID of the user to modify.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.users.roles.delete('role_id', { user_id: 'user_id' });

console.log(role.deleted);
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

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

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

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

### Role Retrieve Response

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Groups

## List groups

`client.admin.organization.groups.list(GroupListParamsquery?, RequestOptionsoptions?): NextCursorPage<Group>`

**get** `/organization/groups`

Lists all groups in the organization.

### Parameters

- `query: GroupListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of the returned groups.

    - `"asc"`

    - `"desc"`

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const group of client.admin.organization.groups.list()) {
  console.log(group.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "group_type": "group",
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

`client.admin.organization.groups.create(GroupCreateParamsbody, RequestOptionsoptions?): Group`

**post** `/organization/groups`

Creates a new group in the organization.

### Parameters

- `body: GroupCreateParams`

  - `name: string`

    Human readable name for the group.

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.create({ name: 'x' });

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group",
  "is_scim_managed": true,
  "name": "name"
}
```

## Retrieve group

`client.admin.organization.groups.retrieve(stringgroupID, RequestOptionsoptions?): Group`

**get** `/organization/groups/{group_id}`

Retrieves a group.

### Parameters

- `groupID: string`

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.retrieve('group_id');

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group",
  "is_scim_managed": true,
  "name": "name"
}
```

## Update group

`client.admin.organization.groups.update(stringgroupID, GroupUpdateParamsbody, RequestOptionsoptions?): GroupUpdateResponse`

**post** `/organization/groups/{group_id}`

Updates a group's information.

### Parameters

- `groupID: string`

- `body: GroupUpdateParams`

  - `name: string`

    New display name for the group.

### Returns

- `GroupUpdateResponse`

  Response returned after updating a group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Updated display name for the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.update('group_id', { name: 'x' });

console.log(group.id);
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

`client.admin.organization.groups.delete(stringgroupID, RequestOptionsoptions?): GroupDeleteResponse`

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Parameters

- `groupID: string`

### Returns

- `GroupDeleteResponse`

  Confirmation payload returned after deleting a group.

  - `id: string`

    Identifier of the deleted group.

  - `deleted: boolean`

    Whether the group was deleted.

  - `object: "group.deleted"`

    Always `group.deleted`.

    - `"group.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.delete('group_id');

console.log(group.id);
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

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Group Update Response

- `GroupUpdateResponse`

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

- `GroupDeleteResponse`

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

`client.admin.organization.groups.users.list(stringgroupID, UserListParamsquery?, RequestOptionsoptions?): NextCursorPage<OrganizationGroupUser>`

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Parameters

- `groupID: string`

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

  - `limit?: number`

    A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of users in the list.

    - `"asc"`

    - `"desc"`

### Returns

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationGroupUser of client.admin.organization.groups.users.list('group_id')) {
  console.log(organizationGroupUser.id);
}
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

`client.admin.organization.groups.users.create(stringgroupID, UserCreateParamsbody, RequestOptionsoptions?): UserCreateResponse`

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Parameters

- `groupID: string`

- `body: UserCreateParams`

  - `user_id: string`

    Identifier of the user to add to the group.

### Returns

- `UserCreateResponse`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.create('group_id', {
  user_id: 'user_id',
});

console.log(user.group_id);
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```

## Retrieve group user

`client.admin.organization.groups.users.retrieve(stringuserID, UserRetrieveParamsparams, RequestOptionsoptions?): UserRetrieveResponse`

**get** `/organization/groups/{group_id}/users/{user_id}`

Retrieves a user in a group.

### Parameters

- `userID: string`

- `params: UserRetrieveParams`

  - `group_id: string`

    The ID of the group to inspect.

### Returns

- `UserRetrieveResponse`

  Details about a user returned from an organization group membership lookup.

  - `id: string`

    Identifier for the user.

  - `email: string | null`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: boolean | null`

    Whether the user is a service account.

  - `name: string`

    Display name of the user.

  - `picture: string | null`

    URL of the user's profile picture, if available.

  - `user_type: "user" | "tenant_user"`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.retrieve('user_id', {
  group_id: 'group_id',
});

console.log(user.id);
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "is_service_account": true,
  "name": "name",
  "picture": "picture",
  "user_type": "user"
}
```

## Remove group user

`client.admin.organization.groups.users.delete(stringuserID, UserDeleteParamsparams, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Parameters

- `userID: string`

- `params: UserDeleteParams`

  - `group_id: string`

    The ID of the group to update.

### Returns

- `UserDeleteResponse`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.delete('user_id', {
  group_id: 'group_id',
});

console.log(user.deleted);
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

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### User Create Response

- `UserCreateResponse`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### User Retrieve Response

- `UserRetrieveResponse`

  Details about a user returned from an organization group membership lookup.

  - `id: string`

    Identifier for the user.

  - `email: string | null`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: boolean | null`

    Whether the user is a service account.

  - `name: string`

    Display name of the user.

  - `picture: string | null`

    URL of the user's profile picture, if available.

  - `user_type: "user" | "tenant_user"`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### User Delete Response

- `UserDeleteResponse`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

# Roles

## List group organization role assignments

`client.admin.organization.groups.roles.list(stringgroupID, RoleListParamsquery?, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/organization/groups/{group_id}/roles`

Lists the organization roles assigned to a group within the organization.

### Parameters

- `groupID: string`

- `query: RoleListParams`

  - `after?: string`

    Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

  - `limit?: number`

    A limit on the number of organization role assignments to return.

  - `order?: "asc" | "desc"`

    Sort order for the returned organization roles.

    - `"asc"`

    - `"desc"`

### Returns

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const roleListResponse of client.admin.organization.groups.roles.list('group_id')) {
  console.log(roleListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "assignment_sources": [
        {
          "principal_id": "principal_id",
          "principal_type": "principal_type"
        }
      ],
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

`client.admin.organization.groups.roles.create(stringgroupID, RoleCreateParamsbody, RequestOptionsoptions?): RoleCreateResponse`

**post** `/organization/groups/{group_id}/roles`

Assigns an organization role to a group within the organization.

### Parameters

- `groupID: string`

- `body: RoleCreateParams`

  - `role_id: string`

    Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a group to a role.

  - `group: Group`

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

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.groups.roles.create('group_id', {
  role_id: 'role_id',
});

console.log(role.group);
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

## Retrieve group organization role

`client.admin.organization.groups.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/organization/groups/{group_id}/roles/{role_id}`

Retrieves an organization role assigned to a group.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `group_id: string`

    The ID of the group to inspect.

### Returns

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.groups.roles.retrieve('role_id', {
  group_id: 'group_id',
});

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "assignment_sources": [
    {
      "principal_id": "principal_id",
      "principal_type": "principal_type"
    }
  ],
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
```

## Unassign organization role from group

`client.admin.organization.groups.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/organization/groups/{group_id}/roles/{role_id}`

Unassigns an organization role from a group within the organization.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `group_id: string`

    The ID of the group to modify.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.groups.roles.delete('role_id', {
  group_id: 'group_id',
});

console.log(role.deleted);
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

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse`

  Role assignment linking a group to a role.

  - `group: Group`

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

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Retrieve Response

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List organization roles

`client.admin.organization.roles.list(RoleListParamsquery?, RequestOptionsoptions?): NextCursorPage<Role>`

**get** `/organization/roles`

Lists the roles configured for the organization.

### Parameters

- `query: RoleListParams`

  - `after?: string`

    Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

  - `limit?: number`

    A limit on the number of roles to return. Defaults to 1000.

  - `order?: "asc" | "desc"`

    Sort order for the returned roles.

    - `"asc"`

    - `"desc"`

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const role of client.admin.organization.roles.list()) {
  console.log(role.id);
}
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

`client.admin.organization.roles.create(RoleCreateParamsbody, RequestOptionsoptions?): Role`

**post** `/organization/roles`

Creates a custom role for the organization.

### Parameters

- `body: RoleCreateParams`

  - `permissions: Array<string>`

    Permissions to grant to the role.

  - `role_name: string`

    Unique name for the role.

  - `description?: string | null`

    Optional description of the role.

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.roles.create({
  permissions: ['string'],
  role_name: 'role_name',
});

console.log(role.id);
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

## Retrieve organization role

`client.admin.organization.roles.retrieve(stringroleID, RequestOptionsoptions?): Role`

**get** `/organization/roles/{role_id}`

Retrieves an organization role.

### Parameters

- `roleID: string`

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.roles.retrieve('role_id');

console.log(role.id);
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

`client.admin.organization.roles.update(stringroleID, RoleUpdateParamsbody, RequestOptionsoptions?): Role`

**post** `/organization/roles/{role_id}`

Updates an existing organization role.

### Parameters

- `roleID: string`

- `body: RoleUpdateParams`

  - `description?: string | null`

    New description for the role.

  - `permissions?: Array<string> | null`

    Updated set of permissions for the role.

  - `role_name?: string | null`

    New name for the role.

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.roles.update('role_id');

console.log(role.id);
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

`client.admin.organization.roles.delete(stringroleID, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Parameters

- `roleID: string`

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.roles.delete('role_id');

console.log(role.id);
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

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

# Data Retention

## Retrieve organization data retention

`client.admin.organization.dataRetention.retrieve(RequestOptionsoptions?): OrganizationDataRetention`

**get** `/organization/data_retention`

Retrieves organization data retention controls.

### Returns

- `OrganizationDataRetention`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" | "modified_abuse_monitoring" | "enhanced_zero_data_retention" | "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationDataRetention = await client.admin.organization.dataRetention.retrieve();

console.log(organizationDataRetention.object);
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```

## Update organization data retention

`client.admin.organization.dataRetention.update(DataRetentionUpdateParamsbody, RequestOptionsoptions?): OrganizationDataRetention`

**post** `/organization/data_retention`

Updates organization data retention controls.

### Parameters

- `body: DataRetentionUpdateParams`

  - `retention_type: "zero_data_retention" | "modified_abuse_monitoring" | "enhanced_zero_data_retention" | "enhanced_modified_abuse_monitoring"`

    The desired organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Returns

- `OrganizationDataRetention`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" | "modified_abuse_monitoring" | "enhanced_zero_data_retention" | "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationDataRetention = await client.admin.organization.dataRetention.update({
  retention_type: 'zero_data_retention',
});

console.log(organizationDataRetention.object);
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```

## Domain Types

### Organization Data Retention

- `OrganizationDataRetention`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" | "modified_abuse_monitoring" | "enhanced_zero_data_retention" | "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

# Spend Alerts

## List organization spend alerts

`client.admin.organization.spendAlerts.list(SpendAlertListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<OrganizationSpendAlert>`

**get** `/organization/spend_alerts`

Lists organization spend alerts.

### Parameters

- `query: SpendAlertListParams`

  - `after?: string`

    Cursor for pagination. Provide the ID of the last spend alert from the previous response to fetch the next page.

  - `before?: string`

    Cursor for pagination. Provide the ID of the first spend alert from the previous response to fetch the previous page.

  - `limit?: number`

    A limit on the number of spend alerts to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for the returned spend alerts.

    - `"asc"`

    - `"desc"`

### Returns

- `OrganizationSpendAlert`

  Represents a spend alert configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationSpendAlert of client.admin.organization.spendAlerts.list()) {
  console.log(organizationSpendAlert.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "currency": "USD",
      "interval": "month",
      "notification_channel": {
        "recipients": [
          "string"
        ],
        "type": "email",
        "subject_prefix": "subject_prefix"
      },
      "object": "organization.spend_alert",
      "threshold_amount": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Create organization spend alert

`client.admin.organization.spendAlerts.create(SpendAlertCreateParamsbody, RequestOptionsoptions?): OrganizationSpendAlert`

**post** `/organization/spend_alerts`

Creates an organization spend alert.

### Parameters

- `body: SpendAlertCreateParams`

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Returns

- `OrganizationSpendAlert`

  Represents a spend alert configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationSpendAlert = await client.admin.organization.spendAlerts.create({
  currency: 'USD',
  interval: 'month',
  notification_channel: { recipients: ['string'], type: 'email' },
  threshold_amount: 0,
});

console.log(organizationSpendAlert.id);
```

#### Response

```json
{
  "id": "id",
  "currency": "USD",
  "interval": "month",
  "notification_channel": {
    "recipients": [
      "string"
    ],
    "type": "email",
    "subject_prefix": "subject_prefix"
  },
  "object": "organization.spend_alert",
  "threshold_amount": 0
}
```

## Update organization spend alert

`client.admin.organization.spendAlerts.update(stringalertID, SpendAlertUpdateParamsbody, RequestOptionsoptions?): OrganizationSpendAlert`

**post** `/organization/spend_alerts/{alert_id}`

Updates an organization spend alert.

### Parameters

- `alertID: string`

- `body: SpendAlertUpdateParams`

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Returns

- `OrganizationSpendAlert`

  Represents a spend alert configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationSpendAlert = await client.admin.organization.spendAlerts.update('alert_id', {
  currency: 'USD',
  interval: 'month',
  notification_channel: { recipients: ['string'], type: 'email' },
  threshold_amount: 0,
});

console.log(organizationSpendAlert.id);
```

#### Response

```json
{
  "id": "id",
  "currency": "USD",
  "interval": "month",
  "notification_channel": {
    "recipients": [
      "string"
    ],
    "type": "email",
    "subject_prefix": "subject_prefix"
  },
  "object": "organization.spend_alert",
  "threshold_amount": 0
}
```

## Delete organization spend alert

`client.admin.organization.spendAlerts.delete(stringalertID, RequestOptionsoptions?): OrganizationSpendAlertDeleted`

**delete** `/organization/spend_alerts/{alert_id}`

Deletes an organization spend alert.

### Parameters

- `alertID: string`

### Returns

- `OrganizationSpendAlertDeleted`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "organization.spend_alert.deleted"`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationSpendAlertDeleted = await client.admin.organization.spendAlerts.delete(
  'alert_id',
);

console.log(organizationSpendAlertDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.spend_alert.deleted"
}
```

## Domain Types

### Organization Spend Alert

- `OrganizationSpendAlert`

  Represents a spend alert configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Organization Spend Alert Deleted

- `OrganizationSpendAlertDeleted`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "organization.spend_alert.deleted"`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

# Certificates

## List organization certificates

`client.admin.organization.certificates.list(CertificateListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<CertificateListResponse>`

**get** `/organization/certificates`

List uploaded certificates for this organization.

### Parameters

- `query: CertificateListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `CertificateListResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateListResponse of client.admin.organization.certificates.list()) {
  console.log(certificateListResponse.id);
}
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

`client.admin.organization.certificates.create(CertificateCreateParamsbody, RequestOptionsoptions?): Certificate`

**post** `/organization/certificates`

Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.

### Parameters

- `body: CertificateCreateParams`

  - `certificate: string`

    The certificate content in PEM format

  - `name?: string`

    An optional name for the certificate

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.create({
  certificate: 'certificate',
});

console.log(certificate.id);
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

`client.admin.organization.certificates.retrieve(stringcertificateID, CertificateRetrieveParamsquery?, RequestOptionsoptions?): Certificate`

**get** `/organization/certificates/{certificate_id}`

Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.

### Parameters

- `certificateID: string`

- `query: CertificateRetrieveParams`

  - `include?: Array<"content">`

    A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate.

    - `"content"`

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.retrieve('certificate_id');

console.log(certificate.id);
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

`client.admin.organization.certificates.update(stringcertificateID, CertificateUpdateParamsbody, RequestOptionsoptions?): Certificate`

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Parameters

- `certificateID: string`

- `body: CertificateUpdateParams`

  - `name?: string`

    The updated name for the certificate

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.update('certificate_id');

console.log(certificate.id);
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

`client.admin.organization.certificates.delete(stringcertificateID, RequestOptionsoptions?): CertificateDeleteResponse`

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

### Parameters

- `certificateID: string`

### Returns

- `CertificateDeleteResponse`

  - `id: string`

    The ID of the certificate that was deleted.

  - `object: "certificate.deleted"`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.delete('certificate_id');

console.log(certificate.id);
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```

## Activate certificates for organization

`client.admin.organization.certificates.activate(CertificateActivateParamsbody, RequestOptionsoptions?): Page<CertificateActivateResponse>`

**post** `/organization/certificates/activate`

Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `body: CertificateActivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateActivateResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateActivateResponse of client.admin.organization.certificates.activate({
  certificate_ids: ['cert_abc'],
})) {
  console.log(certificateActivateResponse.id);
}
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

`client.admin.organization.certificates.deactivate(CertificateDeactivateParamsbody, RequestOptionsoptions?): Page<CertificateDeactivateResponse>`

**post** `/organization/certificates/deactivate`

Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.

### Parameters

- `body: CertificateDeactivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateDeactivateResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateDeactivateResponse of client.admin.organization.certificates.deactivate(
  { certificate_ids: ['cert_abc'] },
)) {
  console.log(certificateDeactivateResponse.id);
}
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

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Certificate List Response

- `CertificateListResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Delete Response

- `CertificateDeleteResponse`

  - `id: string`

    The ID of the certificate that was deleted.

  - `object: "certificate.deleted"`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Certificate Activate Response

- `CertificateActivateResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Deactivate Response

- `CertificateDeactivateResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

# Projects

## List projects

`client.admin.organization.projects.list(ProjectListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Project>`

**get** `/organization/projects`

Returns a list of projects.

### Parameters

- `query: ProjectListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `include_archived?: boolean`

    If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const project of client.admin.organization.projects.list()) {
  console.log(project.id);
}
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

`client.admin.organization.projects.create(ProjectCreateParamsbody, RequestOptionsoptions?): Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `body: ProjectCreateParams`

  - `name: string`

    The friendly name of the project, this name appears in reports.

  - `external_key_id?: string | null`

    External key ID to associate with the project.

  - `geography?: string | null`

    Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.create({ name: 'name' });

console.log(project.id);
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

`client.admin.organization.projects.retrieve(stringprojectID, RequestOptionsoptions?): Project`

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Parameters

- `projectID: string`

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.retrieve('project_id');

console.log(project.id);
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

`client.admin.organization.projects.update(stringprojectID, ProjectUpdateParamsbody, RequestOptionsoptions?): Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `projectID: string`

- `body: ProjectUpdateParams`

  - `external_key_id?: string | null`

    External key ID to associate with the project.

  - `geography?: string | null`

    Geography for the project.

  - `name?: string | null`

    The updated name of the project, this name appears in reports.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.update('project_id');

console.log(project.id);
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

`client.admin.organization.projects.archive(stringprojectID, RequestOptionsoptions?): Project`

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Parameters

- `projectID: string`

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.archive('project_id');

console.log(project.id);
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

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

# Users

## List project users

`client.admin.organization.projects.users.list(stringprojectID, UserListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectUser>`

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Parameters

- `projectID: string`

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectUser`

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

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectUser of client.admin.organization.projects.users.list('project_id')) {
  console.log(projectUser.id);
}
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

`client.admin.organization.projects.users.create(stringprojectID, UserCreateParamsbody, RequestOptionsoptions?): ProjectUser`

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Parameters

- `projectID: string`

- `body: UserCreateParams`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    Email of the user to add.

  - `user_id?: string | null`

    The ID of the user.

### Returns

- `ProjectUser`

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

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.create('project_id', {
  role: 'role',
});

console.log(projectUser.id);
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

`client.admin.organization.projects.users.retrieve(stringuserID, UserRetrieveParamsparams, RequestOptionsoptions?): ProjectUser`

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Parameters

- `userID: string`

- `params: UserRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectUser`

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

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.retrieve('user_id', {
  project_id: 'project_id',
});

console.log(projectUser.id);
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

`client.admin.organization.projects.users.update(stringuserID, UserUpdateParamsparams, RequestOptionsoptions?): ProjectUser`

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Parameters

- `userID: string`

- `params: UserUpdateParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `role?: string | null`

    Body param: `owner` or `member`

### Returns

- `ProjectUser`

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

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.update('user_id', {
  project_id: 'project_id',
});

console.log(projectUser.id);
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

`client.admin.organization.projects.users.delete(stringuserID, UserDeleteParamsparams, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Parameters

- `userID: string`

- `params: UserDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.projects.users.delete('user_id', {
  project_id: 'project_id',
});

console.log(user.id);
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

- `ProjectUser`

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

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### User Delete Response

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

# Roles

## List project user role assignments

`client.admin.organization.projects.users.roles.list(stringuserID, RoleListParamsparams, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Parameters

- `userID: string`

- `params: RoleListParams`

  - `project_id: string`

    Path param: The ID of the project to inspect.

  - `after?: string`

    Query param: Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

  - `limit?: number`

    Query param: A limit on the number of project role assignments to return.

  - `order?: "asc" | "desc"`

    Query param: Sort order for the returned project roles.

    - `"asc"`

    - `"desc"`

### Returns

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const roleListResponse of client.admin.organization.projects.users.roles.list(
  'user_id',
  { project_id: 'project_id' },
)) {
  console.log(roleListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "assignment_sources": [
        {
          "principal_id": "principal_id",
          "principal_type": "principal_type"
        }
      ],
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

`client.admin.organization.projects.users.roles.create(stringuserID, RoleCreateParamsparams, RequestOptionsoptions?): RoleCreateResponse`

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Parameters

- `userID: string`

- `params: RoleCreateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `role_id: string`

    Body param: Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

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

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.users.roles.create('user_id', {
  project_id: 'project_id',
  role_id: 'role_id',
});

console.log(role.object);
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

## Retrieve project user role

`client.admin.organization.projects.users.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Retrieves a project role assigned to a user.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `project_id: string`

    The ID of the project to inspect.

  - `user_id: string`

    The ID of the user to inspect.

### Returns

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.users.roles.retrieve('role_id', {
  project_id: 'project_id',
  user_id: 'user_id',
});

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "assignment_sources": [
    {
      "principal_id": "principal_id",
      "principal_type": "principal_type"
    }
  ],
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
```

## Unassign project role from user

`client.admin.organization.projects.users.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to modify.

  - `user_id: string`

    The ID of the user whose project role assignment should be removed.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.users.roles.delete('role_id', {
  project_id: 'project_id',
  user_id: 'user_id',
});

console.log(role.deleted);
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

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

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

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

### Role Retrieve Response

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Service Accounts

## List project service accounts

`client.admin.organization.projects.serviceAccounts.list(stringprojectID, ServiceAccountListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectServiceAccount>`

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Parameters

- `projectID: string`

- `query: ServiceAccountListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectServiceAccount of client.admin.organization.projects.serviceAccounts.list(
  'project_id',
)) {
  console.log(projectServiceAccount.id);
}
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

`client.admin.organization.projects.serviceAccounts.create(stringprojectID, ServiceAccountCreateParamsbody, RequestOptionsoptions?): ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Parameters

- `projectID: string`

- `body: ServiceAccountCreateParams`

  - `name: string`

    The name of the service account being created.

### Returns

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey | null`

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

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.create(
  'project_id',
  { name: 'name' },
);

console.log(serviceAccount.id);
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

`client.admin.organization.projects.serviceAccounts.retrieve(stringserviceAccountID, ServiceAccountRetrieveParamsparams, RequestOptionsoptions?): ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectServiceAccount = await client.admin.organization.projects.serviceAccounts.retrieve(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(projectServiceAccount.id);
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

## Update project service account

`client.admin.organization.projects.serviceAccounts.update(stringserviceAccountID, ServiceAccountUpdateParamsparams, RequestOptionsoptions?): ProjectServiceAccount`

**post** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Updates a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountUpdateParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `name?: string`

    Body param: The updated service account name.

  - `role?: "member" | "owner"`

    Body param: The updated service account role.

    - `"member"`

    - `"owner"`

### Returns

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectServiceAccount = await client.admin.organization.projects.serviceAccounts.update(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(projectServiceAccount.id);
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

`client.admin.organization.projects.serviceAccounts.delete(stringserviceAccountID, ServiceAccountDeleteParamsparams, RequestOptionsoptions?): ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.delete(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(serviceAccount.id);
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

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey | null`

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

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

# API Keys

## List project API keys

`client.admin.organization.projects.apiKeys.list(stringprojectID, APIKeyListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectAPIKey>`

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Parameters

- `projectID: string`

- `query: APIKeyListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

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

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectAPIKey of client.admin.organization.projects.apiKeys.list('project_id')) {
  console.log(projectAPIKey.id);
}
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

`client.admin.organization.projects.apiKeys.retrieve(stringapiKeyID, APIKeyRetrieveParamsparams, RequestOptionsoptions?): ProjectAPIKey`

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Parameters

- `apiKeyID: string`

- `params: APIKeyRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

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

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectAPIKey = await client.admin.organization.projects.apiKeys.retrieve('api_key_id', {
  project_id: 'project_id',
});

console.log(projectAPIKey.id);
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

`client.admin.organization.projects.apiKeys.delete(stringapiKeyID, APIKeyDeleteParamsparams, RequestOptionsoptions?): APIKeyDeleteResponse`

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Parameters

- `apiKeyID: string`

- `params: APIKeyDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `APIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const apiKey = await client.admin.organization.projects.apiKeys.delete('api_key_id', {
  project_id: 'project_id',
});

console.log(apiKey.id);
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

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

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

- `APIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

# Rate Limits

## List project rate limits

`client.admin.organization.projects.rateLimits.listRateLimits(stringprojectID, RateLimitListRateLimitsParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectRateLimit>`

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Parameters

- `projectID: string`

- `query: RateLimitListRateLimitsParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. The default is 100.

### Returns

- `ProjectRateLimit`

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

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectRateLimit of client.admin.organization.projects.rateLimits.listRateLimits(
  'project_id',
)) {
  console.log(projectRateLimit.id);
}
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

`client.admin.organization.projects.rateLimits.updateRateLimit(stringrateLimitID, RateLimitUpdateRateLimitParamsparams, RequestOptionsoptions?): ProjectRateLimit`

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Parameters

- `rateLimitID: string`

- `params: RateLimitUpdateRateLimitParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `batch_1_day_max_input_tokens?: number`

    Body param: The maximum batch input tokens per day. Only relevant for certain models.

  - `max_audio_megabytes_per_1_minute?: number`

    Body param: The maximum audio megabytes per minute. Only relevant for certain models.

  - `max_images_per_1_minute?: number`

    Body param: The maximum images per minute. Only relevant for certain models.

  - `max_requests_per_1_day?: number`

    Body param: The maximum requests per day. Only relevant for certain models.

  - `max_requests_per_1_minute?: number`

    Body param: The maximum requests per minute.

  - `max_tokens_per_1_minute?: number`

    Body param: The maximum tokens per minute.

### Returns

- `ProjectRateLimit`

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

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectRateLimit = await client.admin.organization.projects.rateLimits.updateRateLimit(
  'rate_limit_id',
  { project_id: 'project_id' },
);

console.log(projectRateLimit.id);
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

- `ProjectRateLimit`

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

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

# Model Permissions

## Retrieve project model permissions

`client.admin.organization.projects.modelPermissions.retrieve(stringprojectID, RequestOptionsoptions?): ProjectModelPermissions`

**get** `/organization/projects/{project_id}/model_permissions`

Returns model permissions for a project.

### Parameters

- `projectID: string`

### Returns

- `ProjectModelPermissions`

  Represents the model allowlist or denylist policy for a project.

  - `mode: "allow_list" | "deny_list"`

    Whether the project uses an allowlist or a denylist.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: Array<string>`

    The model IDs included in the model permissions policy.

  - `object: "project.model_permissions"`

    The object type, which is always `project.model_permissions`.

    - `"project.model_permissions"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectModelPermissions = await client.admin.organization.projects.modelPermissions.retrieve(
  'project_id',
);

console.log(projectModelPermissions.model_ids);
```

#### Response

```json
{
  "mode": "allow_list",
  "model_ids": [
    "string"
  ],
  "object": "project.model_permissions"
}
```

## Modify project model permissions

`client.admin.organization.projects.modelPermissions.update(stringprojectID, ModelPermissionUpdateParamsbody, RequestOptionsoptions?): ProjectModelPermissions`

**post** `/organization/projects/{project_id}/model_permissions`

Updates model permissions for a project.

### Parameters

- `projectID: string`

- `body: ModelPermissionUpdateParams`

  - `mode: "allow_list" | "deny_list"`

    The model permissions mode to apply.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: Array<string>`

    The model IDs included in this permissions policy.

### Returns

- `ProjectModelPermissions`

  Represents the model allowlist or denylist policy for a project.

  - `mode: "allow_list" | "deny_list"`

    Whether the project uses an allowlist or a denylist.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: Array<string>`

    The model IDs included in the model permissions policy.

  - `object: "project.model_permissions"`

    The object type, which is always `project.model_permissions`.

    - `"project.model_permissions"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectModelPermissions = await client.admin.organization.projects.modelPermissions.update(
  'project_id',
  { mode: 'allow_list', model_ids: ['string'] },
);

console.log(projectModelPermissions.model_ids);
```

#### Response

```json
{
  "mode": "allow_list",
  "model_ids": [
    "string"
  ],
  "object": "project.model_permissions"
}
```

## Delete project model permissions

`client.admin.organization.projects.modelPermissions.delete(stringprojectID, RequestOptionsoptions?): ProjectModelPermissionsDeleted`

**delete** `/organization/projects/{project_id}/model_permissions`

Deletes model permissions for a project.

### Parameters

- `projectID: string`

### Returns

- `ProjectModelPermissionsDeleted`

  Confirmation payload returned after deleting project model permissions.

  - `deleted: boolean`

    Whether the project model permissions were deleted.

  - `object: "project.model_permissions.deleted"`

    The object type, which is always `project.model_permissions.deleted`.

    - `"project.model_permissions.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectModelPermissionsDeleted =
  await client.admin.organization.projects.modelPermissions.delete('project_id');

console.log(projectModelPermissionsDeleted.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "project.model_permissions.deleted"
}
```

## Domain Types

### Project Model Permissions

- `ProjectModelPermissions`

  Represents the model allowlist or denylist policy for a project.

  - `mode: "allow_list" | "deny_list"`

    Whether the project uses an allowlist or a denylist.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: Array<string>`

    The model IDs included in the model permissions policy.

  - `object: "project.model_permissions"`

    The object type, which is always `project.model_permissions`.

    - `"project.model_permissions"`

### Project Model Permissions Deleted

- `ProjectModelPermissionsDeleted`

  Confirmation payload returned after deleting project model permissions.

  - `deleted: boolean`

    Whether the project model permissions were deleted.

  - `object: "project.model_permissions.deleted"`

    The object type, which is always `project.model_permissions.deleted`.

    - `"project.model_permissions.deleted"`

# Hosted Tool Permissions

## Retrieve project hosted tool permissions

`client.admin.organization.projects.hostedToolPermissions.retrieve(stringprojectID, RequestOptionsoptions?): ProjectHostedToolPermissions`

**get** `/organization/projects/{project_id}/hosted_tool_permissions`

Returns hosted tool permissions for a project.

### Parameters

- `projectID: string`

### Returns

- `ProjectHostedToolPermissions`

  Represents hosted tool permissions for a project.

  - `code_interpreter: CodeInterpreter`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `file_search: FileSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `image_generation: ImageGeneration`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `mcp: Mcp`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `web_search: WebSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectHostedToolPermissions =
  await client.admin.organization.projects.hostedToolPermissions.retrieve('project_id');

console.log(projectHostedToolPermissions.code_interpreter);
```

#### Response

```json
{
  "code_interpreter": {
    "enabled": true
  },
  "file_search": {
    "enabled": true
  },
  "image_generation": {
    "enabled": true
  },
  "mcp": {
    "enabled": true
  },
  "web_search": {
    "enabled": true
  }
}
```

## Modify project hosted tool permissions

`client.admin.organization.projects.hostedToolPermissions.update(stringprojectID, HostedToolPermissionUpdateParamsbody, RequestOptionsoptions?): ProjectHostedToolPermissions`

**post** `/organization/projects/{project_id}/hosted_tool_permissions`

Updates hosted tool permissions for a project.

### Parameters

- `projectID: string`

- `body: HostedToolPermissionUpdateParams`

  - `code_interpreter?: CodeInterpreter | null`

    The code interpreter permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `file_search?: FileSearch | null`

    The file search permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `image_generation?: ImageGeneration | null`

    The image generation permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `mcp?: Mcp | null`

    The MCP permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `web_search?: WebSearch | null`

    The web search permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

### Returns

- `ProjectHostedToolPermissions`

  Represents hosted tool permissions for a project.

  - `code_interpreter: CodeInterpreter`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `file_search: FileSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `image_generation: ImageGeneration`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `mcp: Mcp`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `web_search: WebSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectHostedToolPermissions =
  await client.admin.organization.projects.hostedToolPermissions.update('project_id');

console.log(projectHostedToolPermissions.code_interpreter);
```

#### Response

```json
{
  "code_interpreter": {
    "enabled": true
  },
  "file_search": {
    "enabled": true
  },
  "image_generation": {
    "enabled": true
  },
  "mcp": {
    "enabled": true
  },
  "web_search": {
    "enabled": true
  }
}
```

## Domain Types

### Project Hosted Tool Permissions

- `ProjectHostedToolPermissions`

  Represents hosted tool permissions for a project.

  - `code_interpreter: CodeInterpreter`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `file_search: FileSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `image_generation: ImageGeneration`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `mcp: Mcp`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `web_search: WebSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

# Groups

## List project groups

`client.admin.organization.projects.groups.list(stringprojectID, GroupListParamsquery?, RequestOptionsoptions?): NextCursorPage<ProjectGroup>`

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Parameters

- `projectID: string`

- `query: GroupListParams`

  - `after?: string`

    Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

  - `limit?: number`

    A limit on the number of project groups to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for the returned groups.

    - `"asc"`

    - `"desc"`

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectGroup of client.admin.organization.projects.groups.list('project_id')) {
  console.log(projectGroup.group_id);
}
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
      "group_type": "group",
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

`client.admin.organization.projects.groups.create(stringprojectID, GroupCreateParamsbody, RequestOptionsoptions?): ProjectGroup`

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Parameters

- `projectID: string`

- `body: GroupCreateParams`

  - `group_id: string`

    Identifier of the group to add to the project.

  - `role: string`

    Identifier of the project role to grant to the group.

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectGroup = await client.admin.organization.projects.groups.create('project_id', {
  group_id: 'group_id',
  role: 'role',
});

console.log(projectGroup.group_id);
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group",
  "object": "project.group",
  "project_id": "project_id"
}
```

## Retrieve project group

`client.admin.organization.projects.groups.retrieve(stringgroupID, GroupRetrieveParamsparams, RequestOptionsoptions?): ProjectGroup`

**get** `/organization/projects/{project_id}/groups/{group_id}`

Retrieves a project's group.

### Parameters

- `groupID: string`

- `params: GroupRetrieveParams`

  - `project_id: string`

    Path param: The ID of the project to inspect.

  - `group_type?: "group" | "tenant_group"`

    Query param: The type of group to retrieve.

    - `"group"`

    - `"tenant_group"`

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectGroup = await client.admin.organization.projects.groups.retrieve('group_id', {
  project_id: 'project_id',
});

console.log(projectGroup.group_id);
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group",
  "object": "project.group",
  "project_id": "project_id"
}
```

## Remove project group

`client.admin.organization.projects.groups.delete(stringgroupID, GroupDeleteParamsparams, RequestOptionsoptions?): GroupDeleteResponse`

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Parameters

- `groupID: string`

- `params: GroupDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `GroupDeleteResponse`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.projects.groups.delete('group_id', {
  project_id: 'project_id',
});

console.log(group.deleted);
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

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Group Delete Response

- `GroupDeleteResponse`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

# Roles

## List project group role assignments

`client.admin.organization.projects.groups.roles.list(stringgroupID, RoleListParamsparams, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Parameters

- `groupID: string`

- `params: RoleListParams`

  - `project_id: string`

    Path param: The ID of the project to inspect.

  - `after?: string`

    Query param: Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

  - `limit?: number`

    Query param: A limit on the number of project role assignments to return.

  - `order?: "asc" | "desc"`

    Query param: Sort order for the returned project roles.

    - `"asc"`

    - `"desc"`

### Returns

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const roleListResponse of client.admin.organization.projects.groups.roles.list(
  'group_id',
  { project_id: 'project_id' },
)) {
  console.log(roleListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "assignment_sources": [
        {
          "principal_id": "principal_id",
          "principal_type": "principal_type"
        }
      ],
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

`client.admin.organization.projects.groups.roles.create(stringgroupID, RoleCreateParamsparams, RequestOptionsoptions?): RoleCreateResponse`

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Parameters

- `groupID: string`

- `params: RoleCreateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `role_id: string`

    Body param: Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a group to a role.

  - `group: Group`

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

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.groups.roles.create('group_id', {
  project_id: 'project_id',
  role_id: 'role_id',
});

console.log(role.group);
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

## Retrieve project group role

`client.admin.organization.projects.groups.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Retrieves a project role assigned to a group.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `project_id: string`

    The ID of the project to inspect.

  - `group_id: string`

    The ID of the group to inspect.

### Returns

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.groups.roles.retrieve('role_id', {
  project_id: 'project_id',
  group_id: 'group_id',
});

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "assignment_sources": [
    {
      "principal_id": "principal_id",
      "principal_type": "principal_type"
    }
  ],
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
```

## Unassign project role from group

`client.admin.organization.projects.groups.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to modify.

  - `group_id: string`

    The ID of the group whose project role assignment should be removed.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.groups.roles.delete('role_id', {
  project_id: 'project_id',
  group_id: 'group_id',
});

console.log(role.deleted);
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

- `RoleListResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse`

  Role assignment linking a group to a role.

  - `group: Group`

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

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Retrieve Response

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List project roles

`client.admin.organization.projects.roles.list(stringprojectID, RoleListParamsquery?, RequestOptionsoptions?): NextCursorPage<Role>`

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Parameters

- `projectID: string`

- `query: RoleListParams`

  - `after?: string`

    Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

  - `limit?: number`

    A limit on the number of roles to return. Defaults to 1000.

  - `order?: "asc" | "desc"`

    Sort order for the returned roles.

    - `"asc"`

    - `"desc"`

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const role of client.admin.organization.projects.roles.list('project_id')) {
  console.log(role.id);
}
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

`client.admin.organization.projects.roles.create(stringprojectID, RoleCreateParamsbody, RequestOptionsoptions?): Role`

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Parameters

- `projectID: string`

- `body: RoleCreateParams`

  - `permissions: Array<string>`

    Permissions to grant to the role.

  - `role_name: string`

    Unique name for the role.

  - `description?: string | null`

    Optional description of the role.

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.roles.create('project_id', {
  permissions: ['string'],
  role_name: 'role_name',
});

console.log(role.id);
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

## Retrieve project role

`client.admin.organization.projects.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): Role`

**get** `/projects/{project_id}/roles/{role_id}`

Retrieves a project role.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.roles.retrieve('role_id', {
  project_id: 'project_id',
});

console.log(role.id);
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

`client.admin.organization.projects.roles.update(stringroleID, RoleUpdateParamsparams, RequestOptionsoptions?): Role`

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Parameters

- `roleID: string`

- `params: RoleUpdateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `description?: string | null`

    Body param: New description for the role.

  - `permissions?: Array<string> | null`

    Body param: Updated set of permissions for the role.

  - `role_name?: string | null`

    Body param: New name for the role.

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.roles.update('role_id', {
  project_id: 'project_id',
});

console.log(role.id);
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

`client.admin.organization.projects.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.roles.delete('role_id', {
  project_id: 'project_id',
});

console.log(role.id);
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

- `RoleDeleteResponse`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

# Data Retention

## Retrieve project data retention

`client.admin.organization.projects.dataRetention.retrieve(stringprojectID, RequestOptionsoptions?): ProjectDataRetention`

**get** `/organization/projects/{project_id}/data_retention`

Retrieves project data retention controls.

### Parameters

- `projectID: string`

### Returns

- `ProjectDataRetention`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" | "none" | "zero_data_retention" | 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectDataRetention = await client.admin.organization.projects.dataRetention.retrieve(
  'project_id',
);

console.log(projectDataRetention.object);
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```

## Update project data retention

`client.admin.organization.projects.dataRetention.update(stringprojectID, DataRetentionUpdateParamsbody, RequestOptionsoptions?): ProjectDataRetention`

**post** `/organization/projects/{project_id}/data_retention`

Updates project data retention controls.

### Parameters

- `projectID: string`

- `body: DataRetentionUpdateParams`

  - `retention_type: "organization_default" | "none" | "zero_data_retention" | 3 more`

    The desired project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Returns

- `ProjectDataRetention`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" | "none" | "zero_data_retention" | 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectDataRetention = await client.admin.organization.projects.dataRetention.update(
  'project_id',
  { retention_type: 'organization_default' },
);

console.log(projectDataRetention.object);
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```

## Domain Types

### Project Data Retention

- `ProjectDataRetention`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" | "none" | "zero_data_retention" | 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

# Spend Alerts

## List project spend alerts

`client.admin.organization.projects.spendAlerts.list(stringprojectID, SpendAlertListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectSpendAlert>`

**get** `/organization/projects/{project_id}/spend_alerts`

Lists project spend alerts.

### Parameters

- `projectID: string`

- `query: SpendAlertListParams`

  - `after?: string`

    Cursor for pagination. Provide the ID of the last spend alert from the previous response to fetch the next page.

  - `before?: string`

    Cursor for pagination. Provide the ID of the first spend alert from the previous response to fetch the previous page.

  - `limit?: number`

    A limit on the number of spend alerts to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for the returned spend alerts.

    - `"asc"`

    - `"desc"`

### Returns

- `ProjectSpendAlert`

  Represents a spend alert configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "project.spend_alert"`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectSpendAlert of client.admin.organization.projects.spendAlerts.list(
  'project_id',
)) {
  console.log(projectSpendAlert.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "currency": "USD",
      "interval": "month",
      "notification_channel": {
        "recipients": [
          "string"
        ],
        "type": "email",
        "subject_prefix": "subject_prefix"
      },
      "object": "project.spend_alert",
      "threshold_amount": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Create project spend alert

`client.admin.organization.projects.spendAlerts.create(stringprojectID, SpendAlertCreateParamsbody, RequestOptionsoptions?): ProjectSpendAlert`

**post** `/organization/projects/{project_id}/spend_alerts`

Creates a project spend alert.

### Parameters

- `projectID: string`

- `body: SpendAlertCreateParams`

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Returns

- `ProjectSpendAlert`

  Represents a spend alert configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "project.spend_alert"`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendAlert = await client.admin.organization.projects.spendAlerts.create(
  'project_id',
  {
    currency: 'USD',
    interval: 'month',
    notification_channel: { recipients: ['string'], type: 'email' },
    threshold_amount: 0,
  },
);

console.log(projectSpendAlert.id);
```

#### Response

```json
{
  "id": "id",
  "currency": "USD",
  "interval": "month",
  "notification_channel": {
    "recipients": [
      "string"
    ],
    "type": "email",
    "subject_prefix": "subject_prefix"
  },
  "object": "project.spend_alert",
  "threshold_amount": 0
}
```

## Update project spend alert

`client.admin.organization.projects.spendAlerts.update(stringalertID, SpendAlertUpdateParamsparams, RequestOptionsoptions?): ProjectSpendAlert`

**post** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Updates a project spend alert.

### Parameters

- `alertID: string`

- `params: SpendAlertUpdateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `currency: "USD"`

    Body param: The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    Body param: The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Body param: Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `threshold_amount: number`

    Body param: The alert threshold amount, in cents.

### Returns

- `ProjectSpendAlert`

  Represents a spend alert configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "project.spend_alert"`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendAlert = await client.admin.organization.projects.spendAlerts.update('alert_id', {
  project_id: 'project_id',
  currency: 'USD',
  interval: 'month',
  notification_channel: { recipients: ['string'], type: 'email' },
  threshold_amount: 0,
});

console.log(projectSpendAlert.id);
```

#### Response

```json
{
  "id": "id",
  "currency": "USD",
  "interval": "month",
  "notification_channel": {
    "recipients": [
      "string"
    ],
    "type": "email",
    "subject_prefix": "subject_prefix"
  },
  "object": "project.spend_alert",
  "threshold_amount": 0
}
```

## Delete project spend alert

`client.admin.organization.projects.spendAlerts.delete(stringalertID, SpendAlertDeleteParamsparams, RequestOptionsoptions?): ProjectSpendAlertDeleted`

**delete** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Deletes a project spend alert.

### Parameters

- `alertID: string`

- `params: SpendAlertDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `ProjectSpendAlertDeleted`

  Confirmation payload returned after deleting a project spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "project.spend_alert.deleted"`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendAlertDeleted = await client.admin.organization.projects.spendAlerts.delete(
  'alert_id',
  { project_id: 'project_id' },
);

console.log(projectSpendAlertDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "project.spend_alert.deleted"
}
```

## Domain Types

### Project Spend Alert

- `ProjectSpendAlert`

  Represents a spend alert configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "project.spend_alert"`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Project Spend Alert Deleted

- `ProjectSpendAlertDeleted`

  Confirmation payload returned after deleting a project spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "project.spend_alert.deleted"`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`

# Certificates

## List project certificates

`client.admin.organization.projects.certificates.list(stringprojectID, CertificateListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<CertificateListResponse>`

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Parameters

- `projectID: string`

- `query: CertificateListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `CertificateListResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateListResponse of client.admin.organization.projects.certificates.list(
  'project_id',
)) {
  console.log(certificateListResponse.id);
}
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

`client.admin.organization.projects.certificates.activate(stringprojectID, CertificateActivateParamsbody, RequestOptionsoptions?): Page<CertificateActivateResponse>`

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `projectID: string`

- `body: CertificateActivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateActivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateActivateResponse of client.admin.organization.projects.certificates.activate(
  'project_id',
  { certificate_ids: ['cert_abc'] },
)) {
  console.log(certificateActivateResponse.id);
}
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

`client.admin.organization.projects.certificates.deactivate(stringprojectID, CertificateDeactivateParamsbody, RequestOptionsoptions?): Page<CertificateDeactivateResponse>`

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Parameters

- `projectID: string`

- `body: CertificateDeactivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateDeactivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateDeactivateResponse of client.admin.organization.projects.certificates.deactivate(
  'project_id',
  { certificate_ids: ['cert_abc'] },
)) {
  console.log(certificateDeactivateResponse.id);
}
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

- `CertificateListResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Activate Response

- `CertificateActivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Deactivate Response

- `CertificateDeactivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`
