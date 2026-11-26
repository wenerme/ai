# List branch rules for a project by using GraphQL

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

You can query for branch rules in a given project by using:

- GraphiQL.
- [`cURL`](getting_started.md#command-line).
- A [Caproni-managed](#use-caproni) development environment.

## Use GraphiQL

You can use GraphiQL to list the branch rules for a project.

1. Open GraphiQL:
   - For GitLab.com, use: `https://gitlab.com/-/graphql-explorer`
   - For GitLab Self-Managed, use: `https://gitlab.example.com/-/graphql-explorer`
1. Copy the following text and paste it in the left window.
   This query searches for a project by its full path, for example `gitlab-org/gitlab-docs`.
   It requests all configured branch rules for the project.

   ```graphql
   query {
     project(fullPath: "gitlab-org/gitlab-docs") {
       branchRules {
         nodes {
           name
           isDefault
           isProtected
           matchingBranchesCount
           createdAt
           updatedAt
           branchProtection {
             allowForcePush
             codeOwnerApprovalRequired
             mergeAccessLevels {
               nodes {
                 accessLevel
                 accessLevelDescription
                 user {
                   name
                 }
                 group {
                   name
                 }
               }
             }
             pushAccessLevels {
               nodes {
                 accessLevel
                 accessLevelDescription
                 user {
                   name
                 }
                 group {
                   name
                 }
               }
             }
             unprotectAccessLevels {
               nodes {
                 accessLevel
                 accessLevelDescription
                 user {
                   name
                 }
                 group {
                   name
                 }
               }
             }
           }
           externalStatusChecks {
             nodes {
               id
               name
               externalUrl
             }
           }
           approvalRules {
             nodes {
               id
               name
               type
               approvalsRequired
               eligibleApprovers {
                 nodes {
                   name
                 }
               }
             }
           }
         }
       }
     }
   }
   ```

1. Select **Play**.

If no branch rules are displayed, it might be because:

- No branch rules are configured.
- Your role doesn't have permission to view branch rules. Administrators have access to all resources.

## Use Caproni

Instead of requesting access, it may be easier for you to run the query using
[Caproni](https://gitlab-org.gitlab.io/caproni/gitlab/).

1. Sign in as the default admin, `root`, with the credentials from
   [the Caproni documentation](https://gitlab-org.gitlab.io/caproni/gitlab/fragments/gitlab/).
1. Ensure you have some branch rules configured for the `flightjs/Flight` project.
1. In your Caproni instance, open GraphiQL: `http://gitlab.caproni.test/-/graphql-explorer`.
1. Copy the query and paste it in the left window.
1. Replace the full path with the following path:

   ```graphql
   query {
     project(fullPath: "flightjs/Flight") {
   ```

1. Select **Play**.

## Related topics

- [GraphQL API reference](reference/_index.md)
