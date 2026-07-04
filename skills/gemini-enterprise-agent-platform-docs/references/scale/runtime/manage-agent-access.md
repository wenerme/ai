Managing access for deployed agents in Gemini Enterprise Agent Platform involves configuring
authentication and authorization for both the agent accessing external resources
and external clients accessing the agent. This document describes the available
authentication methods, including agent identity, service accounts, API keys,
and OAuth clients.

There are different types of authentication methods available for different modes of access:

| Authentication method | Use case | About this authentication method |
|---|---|---|
| [Agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#agent-identity) (preview) | Access data sources directly from within an agent. | An agent deployed with agent identity can access resources according to the IAM permissions you grant the agent. |
| [Service accounts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#roles) | Access data sources directly from within an agent. | Deployed agents have access to all resources that their service account has permission to access. |
| [API keys](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#secrets) | Send requests to endpoints using API keys from within an agent. | Check that the API that you want to use supports API keys before using this authentication method. |
| [OAuth client ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#oauth-clients-and-credentials) | Handle user accounts, registration, login, or authorization for the agent's end-users. | Requires your agent to request and receive consent from the user. |

## Agent identity

If you used agent identity to [set up the identity and permissions for your
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions), see [Use
agent identity with
Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity) for
information about how to manage access control to resources.

## Service accounts

If you used service accounts to [set up the identity and permissions for your
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions), agents that
you deploy on Agent Runtime run using either the *AI Platform
Reasoning Engine Service Agent* or your custom service account.

### AI Platform Reasoning Engine Service Agent

The *AI Platform Reasoning Engine Service Agent* service account uses the
format of
`service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`.

The service account has a *Gemini Enterprise Agent Platform
Reasoning Engine Service Agent* **role** (`roles/aiplatform.reasoningEngineServiceAgent`)
that grants the default permissions required for deployed agents. You can view
the full list of default permissions in the
[IAM documentation](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.reasoningEngineServiceAgent).

### List the roles of a deployed agent

### Console

1. Go to the **IAM** page.

   [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Select the project corresponding to your Google Cloud project.

3. Find the **Principal** which matches the
   [service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions)
   used as your agent identity.

4. The roles of the deployed agent can be found under the **Role** column.

> [!NOTE]
> **Note:** For *AI Platform Reasoning Engine Service Agent* service account, you need to select the "Include Google-provided role grants" to display the service account in the principals table.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize)
the `gcloud` CLI. Then run the following command:

    gcloud projects get-iam-policy PROJECT_ID_OR_NUMBER \
      --flatten="bindings[].members" \
      --filter="bindings.members:serviceAccount:PRINCIPAL" \
      --format="value(bindings.role)"

where

- `PROJECT_ID_OR_NUMBER` is the ID or number for your project, and
- `PRINCIPAL` is based on the [service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions) that was used when the agent is deployed on Runtime.

For details, visit the [IAM documentation](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access#iam-get-policy-gcloud) and
[CLI reference](https://docs.cloud.google.com/sdk/gcloud/reference/projects/get-iam-policy).

### Python

First, install the client library by running

    pip install google-api-python-client

Then [authenticate yourself](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication),
and run the following to list the roles of a deployed agent:

    from google.cloud import https://docs.cloud.google.com/python/docs/reference/cloudresourcemanager/latest
    from google.iam.v1 import iam_policy_pb2

    project_id = "PROJECT_ID"
    principal = "PRINCIPAL"

    crm_service = https://docs.cloud.google.com/python/docs/reference/cloudresourcemanager/latest.https://docs.cloud.google.com/python/docs/reference/cloudresourcemanager/latest/google.cloud.resourcemanager_v3.services.projects.ProjectsClient.html()
    policy = crm_service.https://docs.cloud.google.com/python/docs/reference/cloudresourcemanager/latest/google.cloud.resourcemanager_v3.services.projects.ProjectsClient.html#google_cloud_resourcemanager_v3_services_projects_ProjectsClient_get_iam_policy(iam_policy_pb2.GetIamPolicyRequest(
        resource=f"projects/{project_id}"
    ))
    for binding in policy.bindings:
        for member in binding.members:
            if principal in member:
                print(binding.role)

Where the `PRINCIPAL` is based on the
[service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions)
that was used when the agent is deployed on Runtime.

### Grant roles for a deployed agent

### Console (recommended)

1. Go to the **IAM** page.

   [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Select the project corresponding to your Google Cloud project.

3. Find the **Principal** which matches the
   [service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions)
   used as your agent identity.

4. Add the required roles to the **Principal** by clicking the edit button, adding the roles, before clicking the save button.

> [!NOTE]
> **Note:** For *AI Platform Reasoning Engine Service Agent* service account, you need to select the "Include Google-provided role grants" to display the service account in the principals table.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize)
the `gcloud` CLI. Then run the following command:

    gcloud projects add-iam-policy-binding PROJECT_ID --member=PRINCIPAL --role=ROLE_NAME

where

- `PRINCIPAL` is based on the [service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions) that was used when the agent is deployed on Runtime.
- `ROLE_NAME` is the name of the role that you want to grant. For a list of predefined roles, see [Understanding roles](https://docs.cloud.google.com/iam/docs/understanding-roles).

For details, visit the [IAM documentation](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access#iam-grant-single-role-gcloud) and
[CLI reference](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding).

### Python

We don't recommend writing your own Python code to grant or revoke roles for
deployed agents. Instead, we recommend either using Google Cloud console or `gcloud`
for one-off operations, or [Terraform](https://cloud.google.com/blog/topics/developers-practitioners/implementing-iam-access-control-code-hashicorp-terraform) for managing IAM
access control programmatically. If you want or need to do so in Python, consult the
[documentation for the IAM client library](https://docs.cloud.google.com/iam/docs/write-policy-client-libraries#client-libraries-usage-python).

### Revoke roles from a deployed agent

### Console (recommended)

1. Go to the **IAM** page.

   [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Select the project corresponding to your Google Cloud project.

3. Find the **Principal** which matches the
   [service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions)
   used as your agent identity.

4. Revoke the roles from the **Principal** by clicking the edit button, removing the corresponding roles, before clicking the save button.

> [!NOTE]
> **Note:** For *AI Platform Reasoning Engine Service Agent* service account, you need to select the "Include Google-provided role grants" to display the service account in the principals table.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize) the
`gcloud` CLI. Then run the following command:

    gcloud projects remove-iam-policy-binding PROJECT_ID --member=PRINCIPAL --role=ROLE_NAME

where

- `PRINCIPAL` is based on the [service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions) that was used when the agent is deployed on Runtime.
- `ROLE_NAME` is the name of the role that you want to revoke. For a list of predefined roles, see [Understanding roles](https://docs.cloud.google.com/iam/docs/understanding-roles).

For details, visit the [IAM documentation](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access#iam-revoke-single-role-gcloud) and
[CLI reference](https://docs.cloud.google.com/sdk/gcloud/reference/projects/remove-iam-policy-binding).

### Python

We don't recommend writing your own Python code to grant or revoke roles for
deployed agents. Instead, we recommend either using Google Cloud console or `gcloud`
for one-off operations, or [Terraform](https://cloud.google.com/blog/topics/developers-practitioners/implementing-iam-access-control-code-hashicorp-terraform) for managing IAM
access control programmatically. If you want or need to do so in Python, consult the
[documentation for the IAM client library](https://docs.cloud.google.com/iam/docs/write-policy-client-libraries#client-libraries-usage-python).

## API keys

API keys use secrets, which contain one or more secret versions, along with metadata such as
labels and replication information. The actual payload of a secret is stored
in a [secret version](https://docs.cloud.google.com/secret-manager/docs/add-secret-version). Secrets are
managed (via Secret Manager) at the
[project level](https://docs.cloud.google.com/secret-manager/docs/access-control#principle-of-least-privilege),
and can be shared across deployed agents. To list the secrets corresponding to an
agent in Secret Manager, you can add labels and use them for filtering.

### Create a secret

### Console

1. Go to the **Secret Manager** page.

   [Go to Secret Manager](https://console.cloud.google.com/security/secret-manager)
2. On the **Secret Manager** page, click **Create Secret**.

3. In the **Name** field, enter a name for the secret (for example, `my-secret`).

4. Optional: To also add a secret version when creating the initial secret, in the
   **Secret value** field, enter a value for the secret (for example, `abcd1234`).

5. Go to **Labels** , and then click **Add label**.

6. Enter a key and its corresponding value to create a label.

7. Click **Create secret**.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize) the
`gcloud` CLI. Then run the following commands:

    gcloud secrets create SECRET_ID --replication-policy="automatic"
    gcloud secrets versions add SECRET_ID --data-file="FILE_PATH"

where

- `SECRET_ID` is the ID of the secret or fully qualified identifier for the secret.
- `FILE_PATH` is the full path (including file name) to the file containing the version details.

For details, visit the Secret Manager documentation for creating a
[secret](https://docs.cloud.google.com/secret-manager/docs/creating-and-accessing-secrets#create-secret-gcloud)
and [secret version](https://docs.cloud.google.com/secret-manager/docs/add-secret-version#secretmanager-add-secret-version-gcloud),
or the CLI reference for creating a [secret](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/create)
and [secret version](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/add) respectively.

### Python

First, install the client library by running

    pip install google-cloud-secret-manager

Then [authenticate yourself](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication),
and run the following

    from google.cloud import secretmanager
    import google_crc32c

    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    secret = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_create_secret(request={
        "parent": "projects/PROJECT_ID",
        "secret_id": "SECRET_ID",
        "secret": {  # google.cloud.secretmanager_v1.types.Secret
            # Required. The replication policy cannot be changed after the Secret has been created.
            "replication": {"automatic": {}},
            # Optional. Labels to associate with the secret.
            "labels": {"type": "api_key", "provider": "anthropic"},
            # Optional. The secret's time-to-live in seconds with format (e.g.,
            # "900s" for 15 minutes). If specified, the secret versions will be
            # automatically deleted upon reaching the end of the TTL period.
            "ttl": "TTL",
        },
    })

    anthropic_api_key = "API_KEY"  # The secret to be stored.
    payload_bytes = anthropic_api_key.encode("UTF-8")
    # Optional. Calculate payload checksum.
    crc32c = google_crc32c.Checksum()
    crc32c.update(payload_bytes)

    version = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_add_secret_version(request={
        "parent": secret.name,
        "payload": {
            "data": payload_bytes,
            "data_crc32c": int(crc32c.hexdigest(), 16),  # Optional.
        },
    })
    print(f"Added secret version: {version.name}")

### Get a secret

### Console

1. Go to the **Secret Manager** page.

   [Go to Secret Manager](https://console.cloud.google.com/security/secret-manager)
2. On the **Secret Manager** page, click the name of a secret to describe.

3. The **Secret detail** page lists information about the secret.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize) the
`gcloud` CLI. Then run the following command:

    gcloud secrets versions describe VERSION_ID --secret=SECRET_ID

where

- `VERSION_ID` is the ID of the secret version, and
- `SECRET_ID` is the ID of the secret or fully qualified identifier for the secret.

For details, visit the [Secret Manager documentation](https://docs.cloud.google.com/secret-manager/docs/view-secret-version#secretmanager-get-secret-version-gcloud),
or the [CLI reference](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/describe).

### Python

First, install the client library by running

    pip install google-cloud-secret-manager

Then [authenticate yourself](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication),
and run the following

    from google.cloud import secretmanager

    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    name = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_secret_path("PROJECT_ID", "SECRET_ID")
    response = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_get_secret(request={"name": name})

### List secrets

### Console

1. Go to the **Secret Manager** page.

   [Go to Secret Manager](https://console.cloud.google.com/security/secret-manager)
2. In the Secrets table, click in the **Filter** field.

3. Choose a filter property and its corresponding value, for example `Location:asia-east1`.

4. The table is automatically filtered based on the values entered.

5. (Optional) To filter secret versions: select a secret to access its
   versions, and then use the **Filter** option in the **Versions** table.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize) the
`gcloud` CLI.

To list all the secrets of a project, run the following command:

    gcloud secrets list --filter="FILTER"

where `FILTER` is a string (e.g. `name:asecret OR name:bsecret`)
or regular expressions (e.g. `name ~ "secret_ab.*"`).

To list all the versions of a secret, run the following command:

    gcloud secrets versions list SECRET_ID

where `SECRET_ID` is the ID of the secret or fully qualified
identifier for the secret.

For details, visit the Secret Manager documentation for
[filtering secrets](https://docs.cloud.google.com/secret-manager/docs/filtering#secretmanager-filter-secret-gcloud) and
[listing secret versions](https://docs.cloud.google.com/secret-manager/docs/view-secret-version#secretmanager-list-secret-versions-gcloud),
or the CLI reference for listing [secrets](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/list)
and [secret versions](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/list) respectively.

### Python

First, install the client library by running

    pip install google-cloud-secret-manager

Then [authenticate yourself](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication),
and run the following

    from google.cloud import secretmanager
    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    for secret in client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_list_secrets(request={
        "parent": "projects/PROJECT_ID",
        "filter": "FILTER", # e.g. "labels.provider=anthropic"
    }):
        print(f"Found secret: {secret.name}")

### Update a secret

### Console

1. Go to the **Secret Manager** page.

   [Go to Secret Manager](https://console.cloud.google.com/security/secret-manager)
2. On the **Secret Manager** page, click the checkbox next to the name of the secret.

3. If the **Info Panel** is closed, click **Show Info Panel** to display it.

4. In the **Info Panel** , select the **Labels** tab.

5. Click **Add label** and enter a key and value for the label.

6. Click **Save**.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize) the
`gcloud` CLI. Then run the following command:

    gcloud secrets update SECRET_ID --update-labels=KEY=VALUE

where

- `SECRET_ID` is the ID of the secret or fully qualified identifier for the secret,
- `KEY` is the label key, and
- `VALUE` is the corresponding value of the label.

For details, visit the [Secret Manager documentation](https://docs.cloud.google.com/secret-manager/docs/edit-secrets#secretmanager-update-secret-gcloud) or the
[CLI reference](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/update).

### Python

First, install the client library by running

    pip install google-cloud-secret-manager

Then [authenticate yourself](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication),
and run the following

    from google.cloud import secretmanager
    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    name = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_secret_path("PROJECT_ID", "SECRET_ID")
    response = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_update_secret(request={
        "secret": {
            "name": name,
            "labels": {"type": "api_key", "provider": "anthropic"}, # updated labels
        },
        "update_mask": {"paths": ["labels"]},
    })
    print(f"Updated secret: {response.name}")

### Delete a secret

### Console

1. Go to the **Secret Manager** page.

   [Go to Secret Manager](https://console.cloud.google.com/security/secret-manager)
2. On the **Secret Manager** page, in the **Actions** column for the secret, click **View more**.

3. In the menu, select **Delete**.

4. In the **Delete secret** dialog, enter the name of the secret.

5. Click the **Delete secret** button.

### gcloud

First [install](https://docs.cloud.google.com/sdk/docs/install) and [initialize](https://docs.cloud.google.com/sdk/docs/initialize) the
`gcloud` CLI.

To delete a secret version, run the following command:

    gcloud secrets versions destroy VERSION_ID --secret=SECRET_ID

where

- `VERSION_ID` is the resource name of the secret version, and
- `SECRET_ID` is the ID of the secret or fully qualified identifier for the secret.

To delete a secret and all of its versions, run the following command:

    gcloud secrets delete SECRET_ID

where `SECRET_ID` is the ID of the secret or fully qualified identifier for the secret

For details, visit the Secret Manager documentation for
[deleting a secret](https://docs.cloud.google.com/secret-manager/docs/delete-secrets#secretmanager-delete-secret-gcloud) and
[destroying a secret version](https://docs.cloud.google.com/secret-manager/docs/destroy-secret-version#secretmanager-destroy-secret-version-gcloud), or the
CLI reference for [deleting a secret](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/delete) and
[destroying a secret version](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/destroy).

### Python

First, install the client library by running

    pip install google-cloud-secret-manager

Then [authenticate yourself](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication),
and run the following

    from google.cloud import secretmanager
    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    name = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_secret_path("PROJECT_ID", "SECRET_ID")
    client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_delete_secret(request={"name": name})

## OAuth clients and credentials

A client ID is used to identify a single agent to Google's OAuth servers. If
your agent runs on multiple platforms, each platform needs its own client ID. At a
high level, to integrate an OAuth-based agent, you do the following:

1. Create an OAuth client and credential.

2. Store the client ID and secret in Secret Manager. (See [Create a secret](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#create-secret)).

3. Access the secret in your agent [during development](https://docs.cloud.google.com/agent-builder/agent-engine/develop/custom#secret-manager).

> [!NOTE]
> **Note:** See [Setting up OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/) for more information. [Learn more](https://support.google.com/cloud/answer/6158849) about OAuth client types.

### Create an OAuth client credential

1. In the Google Cloud console, go to the **Google Auth Platform \> Clients** page.

   [Go to Google Auth Platform \> Clients](https://console.cloud.google.com/auth/clients)
2. (If needed) If the screen shows "Google Auth Platform not configured yet", click **Get Started** and fill out the **Project Configurations** . (They can be updated later on.) For details on production readiness, visit [OAuth 2.0 Policy compliance](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance).

3. Click **Create Client**.

4. Set **Application type** to `Web application`.

5. Set the name of the OAuth client to `OAUTH_CLIENT_DISPLAY_NAME`.

6. Under **Authorized redirect URIs** , add the URI for `REDIRECT_URI`.

7. Under Client Secrets, click the button for "download JSON". A
   `client_secret.json` file is downloaded with the following contents:

    {'web': {
        'client_id': "CLIENT_ID",
        'client_secret': "CLIENT_SECRET",
        'project_id': "PROJECT_ID",
        'redirect_uris': [REDIRECT_URIs],
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://www.googleapis.com/oauth2/v3/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'javascript_origins': "JAVASCRIPT_ORIGINS",  # Optional.
    }}

1. Store the client ID and secret in [Secret Manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#create-secret), for example,

    from google.cloud import secretmanager
    import google_crc32c
    import json

    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()
    secret = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_create_secret(request={
        "parent": "projects/PROJECT_ID",
        "secret_id": "OAUTH_SECRET_ID", # e.g. "oauth-client-demo"
        "secret": {
            "labels": {"type": "oauth_client"},
            "replication": {"automatic": {}},
        },
    })

    payload_bytes = json.dumps(cred).encode("UTF-8")
    crc32c = google_crc32c.Checksum()
    crc32c.update(payload_bytes)

    client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_add_secret_version(request={
        "parent": secret.name,
        "payload": {
            "data": payload_bytes,
            "data_crc32c": int(crc32c.hexdigest(), 16),
        },
    })

> [!NOTE]
> **Note:** You can verify that the OAuth client credential has been stored in Secret Manager through the [Google Cloud console](https://console.cloud.google.com/security/secret-manager).

### List OAuth clients

1. In the Google Cloud console, go to the **Google Auth Platform \> Clients** page, which lists OAuth client credentials.

   [Go to Google Auth Platform \> Clients](https://console.cloud.google.com/auth/clients)

### Delete an OAuth client

1. In the Google Cloud console, go to the **Google Auth Platform \> Clients** page.

   [Go to Google Auth Platform \> Clients](https://console.cloud.google.com/auth/clients)
2. Select the OAuth client credential(s) to be deleted, and click delete.

## Customer-managed encryption keys (CMEK)

By default, Google Cloud automatically encrypts data when it is at rest
using encryption keys managed by Google. If you have specific compliance or
regulatory requirements related to the keys that protect your data, you can use
[customer-managed encryption keys (CMEK)](https://docs.cloud.google.com/kms/docs/cmek) for your deployed
agents.

Refer to the [CMEK for Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/cmek)
documentation for general requirements and guidance on using CMEK with
Gemini Enterprise Agent Platform, including:

- Project setup (billing and enabled APIs)
- Creation of key rings and keys
- Required permission grants

To enable CMEK for your agent, you need to specify the `encryption_spec`
with your Cloud KMS key when creating an Agent Platform instance. Refer
to [Configure customer-managed encryption
keys](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#cmek) for code samples.

### Limitations

The following limitations apply when using CMEK with
Agent Runtime:

- **Multi-region keys are not allowed:** Only single-region keys are
  supported. The region of the key ring and the key has to be the same as your
  Agent Platform instance.

- **Encryption key cannot be updated for CMEK instances:** Once an agent is
  deployed with a CMEK key, the encryption key cannot be changed for that
  deployment. To use a new key, you must deploy a new Agent Platform instance.

- **Certain metadata and operational data not encrypted with your key:** CMEK
  encrypts the agent's core data at rest. However, certain metadata and
  runtime operational data are **not** encrypted with your key. Instead, they
  are encrypted using Google's default encryption. This includes:

  - Agent metadata:
    - Display names
    - Descriptions
  - Runtime operational data:
    - Service account emails
    - Agent object class method names
    - Environment variables

## VPC Service Controls (VPC-SC)

Agent Runtime supports [VPC Service Controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-service-controls)
to strengthen data security and mitigate the risks of data exfiltration.

When VPC Service Controls is configured, the deployed agent retains secure access
to Google APIs and services, such as BigQuery API, Cloud SQL Admin API, and
Agent Platform API, verifying seamless operation within your defined perimeter.
Critically, VPC Service Controls effectively blocks all public internet access,
confining data movement to your authorized network boundaries and significantly
enhancing your enterprise security posture.

> [!NOTE]
> **Note:** If you use Agent Runtime in a VPC-SC environment, you may need to configure additional ingress rules in your perimeter to allow ingress from the Agent Runtime Service Agent (`service-PROJECT_NUMBER
> @gcp-sa-aiplatform-re.iam.gserviceaccount.com`).

Available deployment options are listed in [Deploy an
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).
Depending on your deployment option, the following ingress rules need to be
configured:

- For pickle-based deployments, ingress to the `storage.googleapis.com` service and `artifactregistry.googleapis.com` service is required.
- For source-based deployments, git-based deployments, and bring your own Dockerfile (BYOD) deployments, ingress to the `artifactregistry.googleapis.com` service is required.
- For bring your own container (BYOC) deployments, no additional ingress rule is required.

### Limitations

VPC Service Controls isn't supported with Agent Gateway.

However, you can use custom organization policy constraints to restrict
which gateways can be associated with your agents. For more information,
see [Route traffic through
Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy).
