# Audit Logs

## List

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

- `data: array of object { id, actor, effective_at, 49 more }`

  - `id: string`

    The ID of this log.

  - `actor: object { api_key, session, type }`

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

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/audit_logs \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Costs

**get** `/organization/costs`

Get costs details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `bucket_width: optional "1d"`

  Width of each time bucket in response. Currently only `1d` is supported, default to `1d`.

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "line_item"`

  Group the costs by the specified fields. Support fields include `project_id`, `line_item` and any combination of them.

  - `"project_id"`

  - `"line_item"`

- `limit: optional number`

  A limit on the number of buckets to be returned. Limit can range between 1 and 180, and the default is 7.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only costs for these projects.

### Returns

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/costs \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

# Admin API Keys

## List

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

- `data: optional array of object { id, created_at, last_used_at, 5 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: string`

    The name of the API key

  - `object: string`

    The object type, which is always `organization.admin_api_key`

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

  - `value: optional string`

    The value of the API key. Only shown on create.

- `first_id: optional string`

- `has_more: optional boolean`

- `last_id: optional string`

- `object: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Body Parameters

- `name: string`

### Returns

- `id: string`

  The identifier, which can be referenced in API endpoints

- `created_at: number`

  The Unix timestamp (in seconds) of when the API key was created

- `last_used_at: number`

  The Unix timestamp (in seconds) of when the API key was last used

- `name: string`

  The name of the API key

- `object: string`

  The object type, which is always `organization.admin_api_key`

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

- `value: optional string`

  The value of the API key. Only shown on create.

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "New Admin Key"
        }'
```

## Retrieve

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Path Parameters

- `key_id: string`

  The ID of the API key.

### Returns

- `id: string`

  The identifier, which can be referenced in API endpoints

- `created_at: number`

  The Unix timestamp (in seconds) of when the API key was created

- `last_used_at: number`

  The Unix timestamp (in seconds) of when the API key was last used

- `name: string`

  The name of the API key

- `object: string`

  The object type, which is always `organization.admin_api_key`

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

- `value: optional string`

  The value of the API key. Only shown on create.

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/$KEY_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Path Parameters

- `key_id: string`

  The ID of the API key to be deleted.

### Returns

- `id: optional string`

- `deleted: optional boolean`

- `object: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/$KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

# Usage

## Get Audio Speeches

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/audio_speeches \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Audio Transcriptions

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/audio_transcriptions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Code Interpreter Sessions

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/code_interpreter_sessions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Completions

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Embeddings

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/embeddings \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Images

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/images \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Moderations

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/moderations \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Vector Stores

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

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult = object { input_tokens, num_model_requests, object, 10 more }`

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

    - `UsageEmbeddingsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageModerationsResult = object { input_tokens, num_model_requests, object, 4 more }`

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

    - `UsageImagesResult = object { images, num_model_requests, object, 6 more }`

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

    - `UsageAudioSpeechesResult = object { characters, num_model_requests, object, 4 more }`

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

    - `UsageAudioTranscriptionsResult = object { num_model_requests, object, seconds, 4 more }`

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

    - `UsageVectorStoresResult = object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult = object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult = object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/vector_stores \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
