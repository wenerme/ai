# Admin APIs

import {
  adminClientExamples,
  auditLogExamples,
  inviteUserExamples,
} from "./admin-apis-examples";

Admin APIs let you automate organization management workflows such as user invitations, audit log review, project administration, API key management, and rate limit operations. Use them for back-office automation, security workflows, and operational tooling that should run outside the dashboard.

For endpoint details, see the [Administration API reference](https://developers.openai.com/api/reference/administration/overview), including [Admin API keys](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys), [Invites](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/invites), [Users](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/users), [Projects](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects), and [Audit logs](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/audit_logs).

## Use an Admin API key with the SDK

To access these endpoints, [create an Admin API key](https://platform.openai.com/settings/organization/admin-keys). Admin API keys cannot be used for non-administration endpoints.

Support for Admin APIs was added in these SDK versions, which may require updating your SDK version:

- Node: `6.36.0`
- Python: `2.34.0`
- Go: `3.34.0`
- Ruby: `0.61.0`
- Java: `4.34.0`

Set `OPENAI_ADMIN_KEY`, then initialize the SDK for your language.

## Invite a user by email

Use the Invites endpoint to send an organization invitation to an email address.

## Retrieve audit logs

Use the Audit Logs endpoint to list recent user actions and configuration changes for the organization.