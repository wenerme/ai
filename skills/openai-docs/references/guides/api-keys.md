# API keys and service accounts

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

An API key is a secret credential that authenticates requests. A service account is a nonhuman identity that an application or automated workload can use. A service account can own API keys, so these are different parts of the same authentication setup.

Use a user-owned project key for your own development work. Use a service account for an application or automation that should have its own permissions and lifecycle. Use an Admin API key for organization management through the [Admin APIs](https://developers.openai.com/api/docs/guides/admin-apis).

## Choose the right identity

| Workload                                                                    | Identity and credential                                                                                      | Why                                                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Your own local development or exploration                                   | Your user account and a project API key                                                                      | Requests use your access to the project.                                        |
| A deployed application, scheduled job, or CI workflow                       | A project service account and its API key                                                                    | The workload has an identity separate from an individual developer.             |
| A workload with an identity provider that OpenAI supports                   | A project service account with [workload identity federation](https://developers.openai.com/api/docs/guides/workload-identity-federation) | The workload can authenticate without storing a long-lived OpenAI API key.      |
| Automation that creates projects or manages their service accounts and keys | An Admin API key                                                                                             | Organization management uses separate administrative endpoints and permissions. |

A user-owned key acts with its owner's access. Don't share one developer's key across a team or use that person's identity as the permanent identity of a production application.

A service account belongs to a project. Give each workload the identity and access it needs within that project. Separate projects can isolate resources, membership, and usage for different applications or environments; separate service accounts within a project can distinguish workloads without creating another project.

## Understand permissions and scope

An API key's permissions and its owner's permissions both matter. Key scopes can restrict what the key can do, but they don't grant permissions that the user or service account doesn't have. An unrestricted key still operates within its owner's effective permissions.

Assign a service account only the roles its workload needs, then restrict its keys where appropriate. See [permissions and roles](https://developers.openai.com/api/docs/guides/rbac) for the authorization model and [service accounts with Terraform](https://developers.openai.com/api/docs/guides/terraform/service-accounts) for a configuration that creates an identity, assigns a custom role, and issues a scoped key.

An Admin API key serves a different purpose from a project workload key. Keep the administrative credential in the trusted service that provisions and manages resources. Use the project's service-account credential for the application's model requests.

## Automate project and key management

For an application that provisions projects for its customers, a project service account gives each workload an identity that doesn't depend on the developer running the provisioning process. Your provisioning service uses the Admin APIs to manage the project and its service accounts; the provisioned application uses its own project credential.

The relevant administrative operations are:

| Operation                                                                                                                                                                             | Purpose                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Create a project](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/methods/create)                                                                     | Establish the project that owns the workload's resources and service account.                                                                    |
| [Create a service account](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/subresources/service_accounts/methods/create)                               | Create the workload's identity in that project. The `create_service_account_only` option creates it without default roles or an initial API key. |
| [Create a service account API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/subresources/service_accounts/subresources/api_keys/methods/create) | Issue a key for an existing service account, with key scopes and an expiration where needed.                                                     |
| [Manage project API keys](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/subresources/api_keys)                                                       | List, retrieve, update, or revoke existing project keys, including service-account keys.                                                         |

The project API key management endpoints don't create user-owned project keys on behalf of another person. For programmatic key creation, use a service account and its key creation endpoint.

Creating a service account without default roles doesn't grant it access to make model requests. Assign the required permissions before using its credentials. Organization and project key policies also apply to key creation; a service account doesn't bypass those policies.

## Manage credentials through their lifecycle

The API returns the full value of a service-account key only when you create the key. Store it in your secret manager and provide it to the workload on the server. Keep secret keys out of browser code, mobile apps, source control, logs, and customer-facing responses.

Set an expiration that complies with your organization's and project's policies. To rotate a key, issue a replacement, update the workload, verify that it works, and revoke the previous key. A service account's identity can remain the same while its keys change.

Review the workload's access when its responsibilities change, and revoke credentials when you retire it. See [production API key guidance](https://developers.openai.com/api/docs/guides/production-best-practices#api-keys) for key governance and expiration policies, and [workload identity federation](https://developers.openai.com/api/docs/guides/workload-identity-federation) for authentication without a stored API key.