By default, sessions Identity and Access Management permissions are at the project-level. This
document describes how to use IAM Conditions to control more granular access
to Vertex AI Agent Engine Sessions resources.

## Overview

IAM Conditions lets you grant access to session and session event resources
only if specified conditions are met. You can control access to sessions based
on the `userId` string within the Session resource using the API attribute
`aiplatform.googleapis.com/sessionUserId` with an expression written in Common
Expression Language. User ID is an arbitrary string that is provided when
creating sessions, like `userId = "userA"`.

These conditional Identity and Access Management policies are created at the project level and
apply to all sessions and session events within a project. You can apply IAM
conditions to all kinds of principals, including users of your project and
service accounts.

IAM Conditions are useful for granting Identity and Access Management (IAM)
permissions to many related session resources simultaneously, including those
that don't exist yet. You can restrict access to your sessions and events so
that a user can only access their own information, or so developers can only
view certain Session resources without special permission grants.

## Before you begin

To set up conditional Identity and Access Management policies for sessions and session events, do
the following:

- **Review IAM Conditions** : Familiarize yourself with the [IAM Conditions overview](https://docs.cloud.google.com/iam/docs/conditions-overview).
- **Determine necessary roles** : Identify which [specialized Session IAM roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#session-roles) are appropriate for your use case to ensure the principle of least privilege.
- **Identify affected principals** : Identify who in your organization should receive which permissions. For example, consider the following:
  - Should users be able to see another user's sessions?
  - Should developers be able to see all sessions?
  - Should project administrators be able to see all sessions?
  - Should certain agent identities be able to access certain sessions?
- **Grant IAM roles** : Ensure you have the required roles that contain the necessary permissions you need to perform the tasks in this document.

  To get the permissions that
  you need to
  apply IAM Conditions to Vertex AI Agent Engine Session resources
  ,

  ask your administrator to grant you the
  following IAM roles:

  - For projects: Project IAM Admin (\`roles/resourcemanager.projectIamAdmin\`)

  For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

  These predefined roles contain

  the permissions required to
  apply IAM Conditions to Vertex AI Agent Engine Session resources
  . To see the exact permissions that are
  required, expand the **Required permissions** section:

  #### Required permissions

  The following permissions are required to
  apply IAM Conditions to Vertex AI Agent Engine Session resources
  :
  - Set conditional IAM access at the project level: \`resourcemanager.projects.setIamPolicy\`

  You might also be able to get
  these permissions
  with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
  other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).
  If you plan to use IAM Conditions across your organization, you also need [permissions to manage organization policies](https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints#required-roles).

## Creating conditional access for sessions

Grant conditional access to sessions by adding a condition to an Identity and Access Management
policy binding at the project level. The condition uses the
`api.getAttribute('aiplatform.googleapis.com/sessionUserId', "")` function to
inspect the user ID of the session resource. You define a user ID when you
[create a session](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-api#create-a-session).

For a detailed guide on creating IAM policies with conditions,
see [Conditions in allow
policies](https://docs.cloud.google.com/iam/docs/conditions-overview#allow-conditions).

To grant a single role to a principal, do the following:

### Console

1. In the Google Cloud console, go to the **IAM** page.

   [Go to IAM](https://console.cloud.google.com/projectselector/iam-admin/iam?supportedpurview=project,folder,organizationId)
2. Select your project.

3. Select a principal to grant a role to:

   - To grant a role to a principal who already has other roles on the
     resource, find a row containing the principal, click **Edit principal** in that row, and
     click **Add another role**.

     To grant a role to a [service
     agent](https://docs.cloud.google.com/iam/docs/service-account-types#service-agents), select the
     **Include Google-provided role grants** checkbox to see its
     email address.

     > [!NOTE]
     > **Note:** You cannot edit inherited roles when managing access to a resource. To edit inherited roles, go to the resource where the role was granted.

   - To grant a role to a principal who doesn't have any existing roles on
     the resource, click
     **Grant Access** , then enter a [principal
     identifier](https://docs.cloud.google.com/iam/docs/principal-identifiers). For example, `my-user@example.com` or
     `//iam.googleapis.com/locations/global/workforcePools/example-pool/group/example-group@example.com`.

4. Select a role to grant from the drop-down list. For best security practices,
   choose a role that includes only the permissions that your principal needs.
   You can choose one of the [specialized Session IAM
   roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#session-roles).

5. Add a condition to the role, using `aiplatform.googleapis.com/sessionUserId`
   as the API attribute. See the below [examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#examples) for some possible
   condition statements.

6. Click **Save**. The principal is granted the role on the resource.

### gcloud

1. In the Google Cloud console, activate Cloud Shell.

   [Activate Cloud Shell](https://console.cloud.google.com/?cloudshell=true)

   At the bottom of the Google Cloud console, a
   [Cloud Shell](https://docs.cloud.google.com/shell/docs/how-cloud-shell-works)
   session starts and displays a command-line prompt. Cloud Shell is a shell environment
   with the Google Cloud CLI
   already installed and with values already set for
   your current project. It can take a few seconds for the session to initialize.
2.
   The

   `https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding`

   command lets you quickly grant a role to a principal.

   Before using any of the command data below,
   make the following replacements:
   - `PROJECT_ID`: Your Google Cloud project ID. Project IDs
     are alphanumeric, like `my-project`.

   - `PRINCIPAL`: An identifier for the principal, or member,
     which usually has the following form:
     `PRINCIPAL_TYPE:ID`.
     For example, `user:my-user@example.com` or
     `principalSet://iam.googleapis.com/locations/global/workforcePools/example-pool/group/example-group@example.com`.
     For a full list of the values that `PRINCIPAL` can have, see [Principal identifiers](https://docs.cloud.google.com/iam/docs/principal-identifiers).

     For the principal type `user`, the domain name in the identifier must be
     a Google Workspace domain or a Cloud Identity domain. To learn how to set
     up a Cloud Identity domain, see the
     [overview of Cloud Identity](https://docs.cloud.google.com/identity/docs/overview).
   -
     `ROLE_NAME`: The name of the role that you want
     to revoke. Use one of the following formats:

     - Predefined roles: `roles/aiplatform.IDENTIFIER`
     - Project-level custom roles: `projects/PROJECT_ID/roles/IDENTIFIER`

     Select a role to grant from the drop-down list. For best security practices,
     choose a role that includes only the permissions that your principal needs.
     You can choose one of the
     [specialized Session IAM roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#session-roles).
   -
     `CONDITION`: Add a condition to the role, using
     `aiplatform.googleapis.com/sessionUserId` as the API attribute.
     See the below [examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#examples) for some possible condition statements.

   Execute the

   following

   command:

   #### Linux, macOS, or Cloud Shell

   ```bash
   gcloud projects add-iam-policy-binding PROJECT_ID \
       --member=PRINCIPAL --role=ROLE_NAME \
       --condition=CONDITION
   ```

   #### Windows (PowerShell)

   ```bash
   gcloud projects add-iam-policy-binding PROJECT_ID `
       --member=PRINCIPAL --role=ROLE_NAME `
       --condition=CONDITION
   ```

   #### Windows (cmd.exe)

   ```bash
   gcloud projects add-iam-policy-binding PROJECT_ID ^
       --member=PRINCIPAL --role=ROLE_NAME ^
       --condition=CONDITION
   ```

   The response contains the updated IAM policy.

### Terraform

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

For more information, see the
[Terraform provider reference documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs).

If you are using Terraform to set your IAM policies, you can include a condition
in the
[google_project_iam_member](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam#google_project_iam_member)
resource to restrict a member's access to sessions.

```terraform
resource "google_project_iam_member" "example" {
  project    = "PROJECT_ID"
  role       = "ROLE"
  member     = "MEMBER"
  condition {
    title       = "Session Access Condition"
    description = "IAM condition for Session"
    expression  = "CONDITION"
  }
}
```

Replace the following variables:

- `PROJECT_ID`: Your Google Cloud project ID. Project IDs are alphanumeric, like `my-project`.
- `ROLE`: The IAM role to grant, for example, `roles/aiplatform.sessionEditor`.
- `MEMBER`: The principal to grant the role to, for example, `user:developerA@corp.com`. For a full list of the values that `MEMBER` can have, see [Principal identifiers](https://docs.cloud.google.com/iam/docs/principal-identifiers).
- `CONDITION`: Your IAM condition statement using `aiplatform.googleapis.com/sessionUserId` as the API attribute. See the below [examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#examples) for some possible condition statements.

## Best practices for User Id-level permissions

When you build conditions for sessions, use the following best practices:

1. **Use specialized Session IAM roles** : Session IAM Conditions should
   only be used for roles that apply to sessions and session Events. You can
   use specialized roles such as `aiplatform.googleapis.com/sessionViewer`,
   `aiplatform.googleapis.com/sessionEditor`, and
   `aiplatform.googleapis.com/sessionUser` to prevent overly permissive access.
   See the [Specialized Session IAM Roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#session-roles)
   section for more details.

2. **Use positive conditions** : We recommend using positive conditions (such as
   checks for equality or the presence of prefixes) on
   `aiplatform.googleapis.com/sessionUserId` for greater accuracy. Since
   unsupported types and services are represented by an empty user ID, negative
   conditions (such as checks for inequality) might inadvertently match a wide
   range of resources, which can be overly permissive and allow for unexpected
   permission granting.

3. **Shorten conditions if possible** : We recommend using the shortest and
   simplest logic within your IAM condition expressions,
   especially if you plan on having a large amount of conditions.
   IAM allow policies have a size limitation, and simplifying
   conditions will prevent running into IAM limitations. See
   [Limitations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#limitations) for more details. For example, you can simplify
   checking for two different user IDs by combining the compound statement:
   `api.getAttribute('aiplatform.googleapis.com/sessionUserId', '') ==
   'sessionA' || api.getAttribute('aiplatform.googleapis.com/sessionUserId',
   '') == sessionB'` as it evaluates to the same result as the shorter
   statement `api.getAttribute('aiplatform.googleapis.com/sessionUserId', '')
   in ['sessionA', 'sessionB']`.

## Specialized Session IAM roles

It is critical to prevent overly permissive IAM policies when
using IAM Conditions. The following table lists specialized roles that you
can use when granting conditional IAM roles for session APIs:

| Role Name | Description | Included Permissions |
|---|---|---|
| `roles/aiplatform.sessionViewer` | Grants read-only access to sessions and listing events. | - `aiplatform.googleapis.com/sessions.get` - `aiplatform.googleapis.com/sessions.list` - `aiplatform.googleapis.com/sessionEvents.list` |
| `roles/aiplatform.sessionEditor` | Grants write access to sessions and appending events. | - `aiplatform.googleapis.com/sessions.create` - `aiplatform.googleapis.com/sessions.update` - `aiplatform.googleapis.com/sessions.delete` - `aiplatform.googleapis.com/sessionEvents.append` |
| `roles/aiplatform.sessionUser` | Grants full access to sessions and events, including all viewer and editor permissions. | Includes all permissions of both `sessionEditor` and `sessionViewer`. |

## Using IAM Conditions with Sessions

This section covers the following examples of using IAM Conditions with
Sessions:

1. [Grant read access to sessions with exact user ID match.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#example-1)

2. [Grant write access to sessions containing a specific prefix in the user
   ID.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#example-2)

3. [Grant full access to sessions containing one of two user IDs.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions#example-3)

### Grant read access to sessions with exact user ID match

The following condition grants the individual `userA@gmail.com` view access only
to sessions that have the exact user ID `userA`.

This means that the individual has the ability to get sessions and list the
session events, as long as the user ID is exactly `userA`. The user doesn't have
access to sessions with user ID such as `userB`.

```
{
  "members": ["user:userA@gmail.com"],
  "role": "roles/aiplatform.sessionViewer",
  "condition": {
    "title": "Session Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/sessionUserId', '') == 'userA'"
  }
}
```

### Grant write access to sessions containing a specific prefix in the user ID

The following condition grants the individual `developerA@corp.com` edit access
to any sessions that contain the user ID starting with `user`. You can use
`startsWith` for prefix checking and `endsWith` for suffix checking.

This means that the developer has the ability to create, update, and delete
sessions, along with appending events, with user IDs such as `userA` or
`user1234`.

```
{
  "members": ["user:developerA@corp.com"],
  "role": "roles/aiplatform.sessionEditor",
  "condition": {
    "title": "Session Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/sessionUserId', '').startsWith('user')"
  }
}
```

### Grant full access to sessions containing one of two user IDs

The following condition grants the group `group:engineering@corp.com` user
(viewer and editor) access to sessions that have only user IDs `userA` or
`user123`.

```
{
  "members": ["group:engineering@corp.com"],
  "role": "roles/aiplatform.sessionUser",
  "condition": {
    "title": "Session Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/sessionUserId', '') in ['userA', 'user123']"
  }
}
```

## Limitations

1. **Principal limit** : IAM policies are limited to 1500 unique
   principals. This limit can be managed by using Google groups. See more at
   [Limits on all
   principals](https://cloud.google.com/iam/docs/allow-policies#principal-limits).

2. **`ListSessions` API support** : The ListSessions API doesn't support IAM
   conditions. To grant ListSessions permissions, you must grant the principal
   an unconditional role, such as `aiplatform.googleapis.com/sessionViewer`,
   `aiplatform.googleapis.com/sessionUser`, or a relevant unconditional
   Gemini Enterprise Agent Platform role.
