# Rotate leaked tokens with GitLab Duo

Rotate a leaked GitLab personal access token, store the new value in GitLab Secrets Manager, and have GitLab Duo replace the hardcoded token.

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246577) in GitLab 19.6 as a [beta](../../../policy/development_stages_support.md#beta) [with a feature flag](../../../administration/feature_flags/_index.md) named `secrets_manager_pat_rotation`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

When secret detection finds an active GitLab personal access token in your code,
you can rotate the token from the vulnerability details page.
GitLab stores the new value in GitLab Secrets Manager, and GitLab Duo opens a merge request
that replaces the hardcoded token with a reference to the secret.
The new token value is never shown to you or sent to GitLab Duo.

## Prerequisites

- GitLab Secrets Manager must be [enabled](_index.md#enable-gitlab-secrets-manager) and active for the project.
- You must meet the [prerequisites for the GitLab Duo Agent Platform](../../../user/duo_agent_platform/_index.md#prerequisites).
- The [Developer Flow](../../../user/project/merge_requests/developer.md) must be
  [turned on](../../../user/duo_agent_platform/flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off)
  for the project.
- You must have the Security Manager, Maintainer, or Owner role for the project,
  or a custom role with the `admin_vulnerability` permission.
- You must have permission to [create secrets](_index.md#manage-secrets-permissions) in the project.
- The vulnerability must be a secret detection vulnerability for a GitLab personal access token
  with the active [token status](../../../user/application_security/vulnerabilities/validity_check.md).

### Who can rotate a token

- Administrators can rotate any user's token.
- Other users can rotate only their own tokens.

If you call the API with a [fine-grained personal access token](../../../auth/tokens/fine_grained_access_tokens.md),
the token must have both:

- The `Secret: Create` permission for the project.
- The `Personal Access Token: Rotate` permission for the user.

## Rotate a leaked token and fix the code

> [!warning]
> You can't undo a rotation. The leaked token is revoked as soon as the rotation runs,
> and any code or system that still uses the leaked value stops working.

To rotate a leaked token:

1. In the top bar, select  and find your project.
1. In the left sidebar, select  > .
1. Select the secret detection vulnerability.
1. In the upper-right corner, select  > .
1. Optional. Change the . The default name is `ROTATED_GITLAB_TOKEN_<vulnerability_id>`.
   The name must be unique in the project, 255 characters or fewer, and contain only letters,
   digits, and underscores (`_`).
1. Select .

To follow the merge request, select .
To view the stored secret, select .

You can also rotate the token with the
[`projectSecretCreateFromLeakedToken`](../../../api/graphql/reference/mutations.md#projectsecretcreatefromleakedtoken)
GraphQL mutation.
The mutation rotates the token and stores the secret, but does not start a GitLab Duo session.

## What happens when you rotate a token

When you rotate a leaked token, GitLab:

1. Revokes the leaked token and creates a new token with the same name and scopes.
   The new token has the same lifetime as the leaked token, counted from the rotation date.
1. Stores the new token value as a project secret, available to all environments and branches.
   The secret description contains the file and line where the token was leaked.
1. Changes the token status on the vulnerability to inactive.
1. Starts a [GitLab Duo session](../../../user/duo_agent_platform/sessions/_index.md) with the Developer Flow.
   The flow opens a merge request that:
   - Removes the hardcoded token from the file.
   - Adds a `secrets:` keyword with `gitlab_secrets_manager` to each CI/CD job that uses the token.

GitLab does not change the vulnerability state. After you review and merge the merge request,
[change the vulnerability status](../../../user/application_security/vulnerabilities/_index.md#change-the-status-of-a-vulnerability)
to .

If GitLab Duo can't start the session, the token is still rotated and stored.
To finish the fix, replace the hardcoded token yourself and
[use the secret in your CI/CD jobs](_index.md#use-secrets-in-job-scripts).

## GitLab Credits usage

This feature consumes [GitLab Credits](../../../subscriptions/gitlab_credits.md) for:

- The GitLab Duo Developer Flow session that opens the merge request.
- The stored secret, and each time a CI/CD job reads it. For more information, see
  [GitLab Secrets Manager credit usage](credit_usage.md).

## Troubleshooting

### Errors before the token is rotated

GitLab checks these conditions before it rotates the token.
If you get one of these errors, the leaked token is not changed.
Fix the cause, then try again.

| Error | Cause and action |
|-------|------------------|
| `Could not resolve a GitLab personal access token from this vulnerability` | The finding does not contain a token that matches an existing personal access token. Revoke the token manually. |
| `Personal access token not found` | The token no longer exists. |
| `Personal access token has expired` | The leaked token is expired, so it can't be used. You don't need to rotate it. |
| `Token already revoked` | The leaked token was already revoked, but its status on the vulnerability is still active. [Refresh the token status](../../../user/application_security/vulnerabilities/validity_check.md#refresh-secret-status). You don't need to rotate it. |
| `Rotation of legacy personal access tokens is disabled. Use a fine-grained token instead.` | Your instance requires fine-grained tokens, so legacy tokens can't be rotated. Revoke the leaked token manually and create a fine-grained token. |
| `Failed to revoke token` | GitLab couldn't revoke the leaked token, so nothing changed. Try again. |
| `You are not allowed to rotate this personal access token` | The token belongs to another user. Ask the token owner or an administrator to rotate it. |
| `Secrets manager is not active` | Enable GitLab Secrets Manager, or wait for it to finish provisioning. |
| `Secrets Manager cannot be written: entitlement state is <state>` | Your namespace can't write secrets, for example because the trial ended or credits ran out. See GitLab Secrets Manager credit usage. |
| `You are not allowed to create secrets in this project` | Ask a user with the Owner role to grant you permission to create secrets. |
| `A secret named '<name>' already exists` | Enter a different secret name. |
| `Maximum number of secrets for this project has been reached` | Delete secrets you no longer need. |
| `Another secret operation in progress` | Wait for the other operation to finish, then try again. |
| `You cannot perform write operations on an archived project or a project pending deletion.` | Unarchive the project, or cancel its deletion. |

### Error: `The token was rotated, but the new value could not be stored`

This error means the leaked token was revoked, but GitLab could not store the new value.
The message includes the reason the store failed.
Both variants mean the leaked token no longer works:

- `The token was rotated, but the new value could not be stored, so it was revoked. Create a new token manually.`

  GitLab revoked the new token, so no active token exists.
  To restore access, [create a personal access token](../../../user/profile/personal_access_tokens.md#create-a-personal-access-token)
  and [store it as a secret](_index.md#define-a-secret).

- `The token was rotated, but the new value could not be stored or revoked. Revoke the token named <name> manually.`

  The new token is still active, but nobody can retrieve its value.
  [Revoke the token](../../../user/profile/personal_access_tokens.md#revoke-a-personal-access-token)
  with the name in the message.
  Then create a token and store it as a secret.

Do not rotate the same vulnerability again. The leaked token is already revoked.

### Error: `Failed to complete the rotation`

GitLab couldn't confirm whether the rotation finished, for example because of a network error.
Before you try again, check whether the leaked token was revoked:

- If the token status on the vulnerability is active, refresh the token status.
  If the token is still active, try again.
- If the token was revoked, check the Secrets Manager for the secret. If the secret is missing,
  create a token and store the token as a secret.

### Error: `GitLab Duo could not start` or `GitLab Duo could not be reached`

The token was rotated and stored, but the GitLab Duo session did not start.
The message includes the secret name.

To fix this issue, [troubleshoot GitLab Duo](../../../user/duo_agent_platform/troubleshooting.md).
Then replace the hardcoded token yourself and use the secret in your CI/CD jobs.
