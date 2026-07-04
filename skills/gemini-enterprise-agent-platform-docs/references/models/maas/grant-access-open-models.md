For you to enable open models and make a prompt request, a Google Cloud
administrator must [set the required permissions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/grant-access-open-models#set-permissions) and [verify
the organization policy allows the use of required
APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/grant-access-open-models#set-organization-policy).

## Set required permissions to use open models

The following roles and permissions are required to use open models:

- You must have the Consumer Procurement Entitlement Manager
  Identity and Access Management (IAM) role. Anyone who's been granted this role can
  enable open models in Model Garden.

- You must have the `aiplatform.endpoints.predict` permission. This permission
  is included in the Agent Platform User IAM role. For more
  information, see [Gemini Enterprise Agent Platform
  User](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/gemini-enterprise-agent-platform/general/access-control#aiplatform.user) and
  [Access control](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/access-control#permissions).

### Console

1. To grant the Consumer Procurement Entitlement Manager IAM
   roles to a user, go to the **IAM** page.

   [Go to IAM](https://console.cloud.google.com/projectselector/iam-admin/iam)
2. In the **Principal** column, find the user
   [principal](https://docs.cloud.google.com/iam/docs/overview#concepts_related_identity) for which you
   want to enable access to open models, and then click
   **Edit principal** in that row.

3. In the **Edit access** pane, click
   **Add another role**.

4. In **Select a role** , select **Consumer Procurement Entitlement Manager**.

5. In the **Edit access** pane, click
   **Add another role**.

6. In **Select a role** , select **Agent Platform User**.

7. Click **Save**.

### gcloud

1. In the Google Cloud console, activate Cloud Shell.

   [Activate Cloud Shell](https://console.cloud.google.com/?cloudshell=true)
2. Grant the Consumer Procurement Entitlement Manager role that's required
   to enable open models in Model Garden

       gcloud projects add-iam-policy-binding  PROJECT_ID \
       --member=PRINCIPAL --role=roles/consumerprocurement.entitlementManager

3. Grant the Agent Platform User role that includes the
   `aiplatform.endpoints.predict` permission which is required to make
   prompt requests:

       gcloud projects add-iam-policy-binding  PROJECT_ID \
       --member=PRINCIPAL --role=roles/aiplatform.user

   Replace `PRINCIPAL` with the identifier for
   the principal. The identifier takes the form
   `user|group|serviceAccount:email` or `domain:domain`---for
   example, `user:cloudysanfrancisco@gmail.com`,
   `group:admins@example.com`,
   `serviceAccount:test123@example.domain.com`, or
   `domain:example.domain.com`.

   The output is a list of policy bindings that includes the following:

       -   members:
         -   user:PRINCIPAL
         role: roles/roles/consumerprocurement.entitlementManager

   For more information, see
   [Grant a single role](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role)
   and
   [`gcloud projects add-iam-policy-binding`](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding).

## Set the organization policy for open model access

To enable open models, your organization policy must allow the following
API: Cloud Commerce Consumer Procurement API - `cloudcommerceconsumerprocurement.googleapis.com`

If your organization sets an organization policy to
[restrict service usage](https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources),
then an organization administrator must verify that
`cloudcommerceconsumerprocurement.googleapis.com` is allowed by
[setting the organization policy](https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources#setting_the_organization_policy).

Also, if you have an organization policy that restricts model usage in
Model Garden, the policy must allow access to open models. For more
information, see [Control model
access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access).

## What's next

- Learn how to make a [Call MaaS APIs for open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/call-open-model-apis).
