Memory Bank lets you control access to memories and memory revision resources based on their scope attributes. You can use [IAM Conditions](https://docs.cloud.google.com/iam/docs/conditions-overview) to define granular access controls, such as restricting access to specific users or groups based on criteria defined in the Common Expression Language.

This document describes how to create and apply conditional access policies for memories and revisions in your project.

For overview information on permissions, see [Review necessary roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#memory-roles).

## Overview

IAM Conditions let you grant access to memory and memory revision resources
only if specified conditions are met. You can control access to memories based
on the `scope` field within a memory resource using the API attribute
`"aiplatform.googleapis.com/memoryScope"` with an expression written in Common
Expression Language. Scope is an arbitrary dictionary that is provided when
creating or generating memories, like `{'user_id': '123'}`, that lets you
organize which memories belong to which group.

These conditional Identity and Access Management policies are created at the project level and
apply to all memories within a project. You can apply IAM
conditions to all kinds of principals, including users of your project and
service accounts.

IAM Conditions are useful for granting Identity and Access Management (IAM)
permissions to many related Memory Bank resources simultaneously,
including those that don't exist yet. You can restrict access to your memories
and revisions so that a user can only access their own information, or so
developers can only view certain Memory Bank resources without
special permission grants.

## Before you begin

To set up conditional IAM policies for memories and memory
revisions, do the following:

- **Review IAM Conditions** : Familiarize yourself with the [IAM Conditions overview](https://docs.cloud.google.com/iam/docs/conditions-overview).
- **Determine necessary roles** : Identify which [specialized Memory Bank
  IAM roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#memory-roles) are appropriate for your use case to ensure the principle of least privilege.
-
  **Identify affected principals**: Identify who in your
  organization should receive which permissions. For example, consider the
  following:

  - Whether developers should be able to see all memories.
  - Whether project administrators should be able to see all memories.
  - Whether certain agent identities can only access certain memories.
- **Grant IAM roles** : Ensure you have the required roles that contain the necessary permissions you need to perform the tasks in this document.

  To get the permissions that
  you need to
  apply IAM Conditions to Agent Platform Memory Bank resources,

  ask your administrator to grant you the
  following IAM roles:

  - For projects: Project IAM Admin (\`roles/resourcemanager.projectIamAdmin\`)

  For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

  These predefined roles contain

  the permissions required to
  apply IAM Conditions to Agent Platform Memory Bank resources. To see the exact permissions that are
  required, expand the **Required permissions** section:

  #### Required permissions

  The following permissions are required to
  apply IAM Conditions to Agent Platform Memory Bank resources:
  - Set conditional IAM access at the project level: \`resourcemanager.projects.setIamPolicy\`

  You might also be able to get
  these permissions
  with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
  other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).
  If you plan to use IAM Conditions across your organization, you also need [permissions to manage organization policies](https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints#required-roles).

## Creating conditional access for memories

Conditional access to memories is granted by adding a condition to an
IAM policy binding at the project level. The condition uses the
`api.getAttribute('aiplatform.googleapis.com/memoryScope', {})` function to
inspect the scope map of a memory resource. You define scope when you create or
generate a memory.

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
     **Grant Access** , then enter a
     [principal identifier](https://docs.cloud.google.com/iam/docs/principal-identifiers)
     ---for example,
     `my-user@example.com` or
     `//iam.googleapis.com/locations/global/workforcePools/example-pool/group/example-group@example.com`.

4. Select a role to grant from the drop-down list. For best security practices,
   choose a role that includes only the permissions that your principal needs.
   You can choose one of the [specialized Memory Bank
   IAM roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#memory-roles).

5. Add a condition to the role, using
   `aiplatform.googleapis.com/memoryScope` as the API attribute. See
   the below [examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#examples) for some possible condition statements.

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
     [specialized Memory Bank IAM roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#memory-roles).
   -
     `CONDITION`: Add a condition to the role, using
     `aiplatform.googleapis.com/memoryScope` as the API attribute.
     See the below [examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#examples) for some possible condition statements.

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
resource to restrict a member's access to memories.

```terraform
resource "google_project_iam_member" "example" {
  project    = "PROJECT_ID"
  role       = "ROLE"
  member     = "MEMBER"
  condition {
    title       = "Memory Access Condition"
    description = "IAM condition for Memory Bank"
    expression  = "CONDITION"
  }
}
```

Replace the following variables:

- `PROJECT_ID`: Your Google Cloud project ID.
  Project IDs are alphanumeric, like `my-project`.

- `ROLE`: The IAM role to grant, for example,
  `roles/aiplatform.memoryEditor`.

- `MEMBER`: The principal to grant the role to, for
  example, `user:developerA@corp.com`. For a full list of the
  values that `MEMBER` can have, see [Principal identifiers](https://docs.cloud.google.com/iam/docs/principal-identifiers).

- `CONDITION`: Your IAM condition statement using
  `aiplatform.googleapis.com/memoryScope` as the API attribute. See
  the below [examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#examples) for some possible condition
  statements.

## Best practices for scope-level permissions

When you build conditions for Memory Bank, use the following best
practices:

1. **Use specialized Memory Bank roles** :
   Memory Bank IAM Conditions should only be used for roles
   that apply to memories and memory revisions. You can use specialized roles
   such as `aiplatform.googleapis.com/memoryViewer`,
   `aiplatform.googleapis.com/memoryEditor`, and
   `aiplatform.googleapis.com/memoryUser` to prevent overly permissive access.
   See [Specialized Memory Bank IAM
   Roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#memory-roles) roles for more details.

2. **Use positive conditions** : We recommend using positive conditions (such as
   checks for equality or the presence of key-value pairs) on
   `aiplatform.googleapis.com/memoryScope` for greater accuracy. Since
   unsupported types and services are represented by an empty scope, negative
   conditions (such as checks for inequality) might inadvertently match a wide
   range of resources, which can be overly permissive and allow for unexpected
   permission granting.

3. **Shorten conditions if possible** : We recommend using the shortest and
   simplest logic within your IAM condition expressions,
   especially if you plan on having a large amount of conditions.
   IAM allow policies have a size limitation, and simplifying
   conditions prevents running into these IAM limitations. See
   [Limitations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#limitations) for more details. For example, you can omit
   checking the presence of a key in the expression `'user_id' in
   api.getAttribute('aiplatform.googleapis.com/memoryScope', {}) &&
   api.getAttribute('aiplatform.googleapis.com/memoryScope', {})['user_id'] ==
   'userA'` and use the shorter statement
   `api.getAttribute('aiplatform.googleapis.com/memoryScope', {})['user_id'] ==
   'userA'` instead. If the `user_id` key is missing, the longer expression
   evaluates to `false`, while the shorter expression results in an error.
   Because errors in IAM condition expressions cause access to
   be denied, both expressions produce the same outcome.

## Specialized Memory Bank IAM roles

It is critical to prevent overly permissive IAM policies when
using IAM Conditions. The following table lists specialized roles that you
can use when granting conditional IAM roles for
Memory Bank APIs:

| Role Name | Description | Included Permissions |
|---|---|---|
| `roles/aiplatform.memoryViewer` | Grants read-only access to memories and memory revisions. | - `aiplatform.googleapis.com/memories.get` - `aiplatform.googleapis.com/memories.list` - `aiplatform.googleapis.com/memories.retrieve` - `aiplatform.googleapis.com/memoryRevisions.list` - `aiplatform.googleapis.com/memoryRevisions.get` |
| `roles/aiplatform.memoryEditor` | Grants write and generate access to memories and rollback access to memory revisions. | - `aiplatform.googleapis.com/memories.create` - `aiplatform.googleapis.com/memories.update` - `aiplatform.googleapis.com/memories.delete` - `aiplatform.googleapis.com/memories.generate` - `aiplatform.googleapis.com/memoryRevisions.rollback` |
| `roles/aiplatform.memoryUser` | Grants full access to memories and revisions, including all viewer and editor permissions. | Includes all permissions of both `memoryEditor` and `memoryViewer`. |

## Using IAM Conditions with Memory Bank

This section covers the following examples of using IAM Conditions with
Memory Bank:

1. [Grant read access to memories with exact scope match.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#example-1)

2. [Grant write access to memories with scope containing a specific key-value
   pair.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#example-2)

3. [Grant full access to memories with scope containing specific
   keys.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#example-3)

4. [Grant full access to memories with scope containing a specific
   prefix.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#example-4)

5. [Grant full access to memories with scope of key with a set of allowed
   values.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions#example-5)

### Grant read access to memories with exact scope match

The following condition grants the individual `userA@gmail.com` view access only
to memories that have the exact scope `{"userId": "userA"}`.

This means that the member has the ability to get and retrieve memories, along
with listing and getting those memories' revisions, as long as the scope is
exactly `{"userId": "userA"}`. The user doesn't have access to memories with
scope such as `{'userId': 'userA', 'source': 'ADK'}`.

```
{
  "members": ["user:userA@gmail.com"],
  "role": "roles/aiplatform.memoryViewer",
  "condition": {
    "title": "Memory Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/memoryScope', {}) == {'userId': 'userA'}"
  }
}
```

### Grant write access to memories with scope containing a specific key-value pair

The following condition grants the individual `developerA@corp.com` edit access
to any memories that contain the key-value pair `'userId': 'userA'`.

This means that the user has the ability to create, update, delete, and generate
memories, and create and rollback those memories' revisions, with scopes such as
`{'userId': 'userA'}` and `{'userId': 'userA', 'source': 'ADK'}`.

```
{
  "members": ["user:developerA@corp.com"],
  "role": "roles/aiplatform.memoryEditor",
  "condition": {
    "title": "Memory Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/memoryScope', {})['userId'] == 'userA'"
  }
}
```

### Grant full access to memories with scope containing specific keys

The following condition grants the group `group:engineering@corp.com` user
(viewer and editor) access to memories that have the key `'admin_override'` or
`'public_access_flag'`.

This means members of the group have full read and write access to memories with
scopes such as `{'admin_override': 'true'}`, `{'admin_override': 'true',
'public_access_flag': 'false'}`, and `{'userId': 'userA', 'public_access_flag':
'false'}`.

```
{
  "members": ["group:engineering@corp.com"],
  "role": "roles/aiplatform.memoryUser",
  "condition": {
    "title": "Memory Access Condition",
    "expression": "('admin_override' in api.getAttribute('aiplatform.googleapis.com/memoryScope', {})) || ('public_access_flag' in api.getAttribute('aiplatform.googleapis.com/memoryScope', {}))"
  }
}
```

### Grant full access to memories with scope containing a specific prefix

The following condition grants the group `group:engineering@corp.com` user
(viewer and editor) access to memories that have the key `'userId'` with value
starting with `'user'`.You can use `'startsWith'` for prefix checking and
`'endsWith'` for suffix checking.

This means members of the group have full read and write access to memories with
scopes such as `{'userId': 'userA'}`, `{'userId': 'userB', 'public_access_flag':
'false'}`.

```
{
  "members": ["group:engineering@corp.com"],
  "role": "roles/aiplatform.memoryUser",
  "condition": {
    "title": "Memory Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/memoryScope', {})['userId'].startsWith('user')"
  }
}
```

### Grant full access to memories with scope of key with a set of allowed values

The following condition grants the group `group:engineering@corp.com` user
(viewer and editor) access to memories that have the key `'userId'` with values
of either `'userA'` or `'userB'`.

This means members of the group have full read and write access to memories with
scopes such as `{'userId': 'userA'}`, `{'userId': 'userB', 'public_access_flag':
'false'}`.

```
{
  "members": ["group:engineering@corp.com"],
  "role": "roles/aiplatform.memoryUser",
  "condition": {
    "title": "Memory Access Condition",
    "expression": "api.getAttribute('aiplatform.googleapis.com/memoryScope', {})['userId'] in ['userA', 'userB']"
  }
}
```

## Limitations

- **Principal limit** : IAM policies are limited to 1500 unique
  principals. This limit can be managed by using Google groups. See more at
  [Limits on all
  principals](https://docs.cloud.google.com/iam/docs/allow-policies#principal-limits).

- **API support** : IAM conditions are not supported by methods that operate
  against multiple scopes, like
  [`ListMemories`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#list-memories)
  and
  [`PurgeMemories`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/api-quickstart#purge-memories).
  To grant these permissions, you must grant the principal an unconditional
  role, such as `aiplatform.googleapis.com/memoryViewer`,
  `aiplatform.googleapis.com/memoryUser`, or a relevant unconditional
  Gemini Enterprise Agent Platform role.
