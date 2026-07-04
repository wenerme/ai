## Considerations

Consider the following steps before using the Weaviate database:

1. You must create, configure, and deploy your Weaviate database instance and collection. Follow the instructions in Create your Weaviate
collection to set up a collection based on your schema.
2. You must provide a Weaviate API key, which allows RAG Engine to interact with the Weaviate database. RAG Engine supports the API key-based `AuthN` and `AuthZ`, which connects to your Weaviate database and supports an HTTPS connection.
3. RAG Engine doesn't store and manage your Weaviate API key. Instead, you must do the following: Store your key in the Google Cloud Secret Manager. Grant your project's service account permissions to access your secret. Provide RAG Engine access to your secret's resource name. When you interact with your Weaviate database, RAG Engine accesses your secret resource using your service account.
4. RAG Engine corpus and the Weaviate collection have a one-to-one mapping. RAG files are stored in a Weaviate database collection. When a call is made to the `CreateRagCorpus` API or the `UpdateRagCorpus` API, the RAG corpus is associated to the database collection.
5. In addition to dense embeddings-based semantic searches, the hybrid search is also supported with RAG Engine through a Weaviate database. You can also adjust the weight between dense and sparse vector similarity in a hybrid search.

## Provision the Weaviate database

Before using the Weaviate database with RAG Engine, you must do the
following:

1. Configure and deploy your Weaviate database instance.
2. Prepare the HTTPS endpoint.
3. Create your Weaviate collection.
4. Use your API key to provision Weaviate using `AuthN` and `AuthZ`.
5. Provision your RAG Engine service account.

### Configure and deploy your Weaviate database instance

You must follow the
Weaviate official guide quickstart.
However, you can use the
Google Cloud Marketplace guide,
which is optional.

You can set up your Weaviate instance anywhere as long as the Weaviate endpoint
is accessible to configure and deploy in your project. You can then fully manage
your Weaviate database instance.

Because RAG Engine isn't involved in any stage of your Weaviate database
instance lifecycle, it is your responsibility to grant permissions to
RAG Engine so it can store and search for data in your Weaviate database.
It is also your responsibility to ensure that the data in your database can be
used by RAG Engine. For example, if you change your data, RAG Engine
isn't responsible for any unexpected behaviors because of those changes.

### Prepare the HTTPS endpoint

During Weaviate provisioning, ensure that you create an HTTPS endpoint. Although
HTTP connections are supported, we prefer that RAG Engine and Weaviate
database traffic use an HTTPS connection.

### Create your Weaviate collection

Because the RAG Engine corpus and the Weaviate collection have a one-to-one
mapping, you must create a collection in your Weaviate database before
associating your collection with the RAG Engine corpus. This one-time
association is made when you call the `CreateRagCorpus` API or the
`UpdateRagCorpus` API.

When creating a collection in Weaviate, you must use the following schema:

| Property name | Data type |
| --- | --- |
| `fileId` | `text` |
| `corpusId` | `text` |
| `chunkId` | `text` |
| `chunkDataType` | `text` |
| `chunkData` | `text` |
| `fileOriginalUri` | `text` |

### Use your API key to provision Weaviate using `AuthN` and `AuthZ`

Provisioning the Weaviate API key involves the following steps:

1. Create the Weaviate API key.
2. Configure Weaviate using your Weaviate API key.
3. Store your Weaviate API key in Secret Manager.

#### Create the API key

RAG Engine can only connect to your Weaviate database instances by using
your API key for authentication and authorization. You must follow the
Weaviate official guide to authentication
to configure the API key-based authentication in your Weaviate database
instance.

If creating the Weaviate API key requires identity information to associate with
that comes from RAG Engine, you must create your first corpus, and use your
RAG Engine service account as an identity.

#### Store your API key in Secret Manager

An API key holds Sensitive Personally Identifiable Information (SPII), which is
subject to legal requirements. If the SPII data is compromised or misused, an
individual might experience a significant risk or harm. To minimize risks to an
individual while using RAG Engine, don't store and manage your API key, and
avoid sharing the unencrypted API key.

To protect SPII, do the following:

1. Store your API key in Secret Manager.
2. Grant your RAG Engine service account the permissions to your secret(s), and manage the access control at the secret resource level. Navigate to your project's permissions. Enable the option Include Google-provided role grants. Find the service account, which has the format `service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com` Edit the service account's principals. Add the Secret Manager Secret Accessor role to the service account.
3. During the creation or update of the RAG corpus, pass the secret resource name to RAG Engine, and store the secret resource name.

When you make API requests to your Weaviate database instance(s),
RAG Engine uses each service account to read the API key that corresponds
to your secret resources in Secret Manager from your project(s).

### Provision your RAG Engine service account

When you create the first resource in your project, RAG Engine creates a
dedicated service account. You can find your service account from your project's
IAM page. The service account follows this
format:

`service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com`

For example, `service-123456789@gcp-sa-vertex-rag.iam.gserviceaccount.com`.

When integrating with the Weaviate database, your service account is used in the
following scenarios:

- You can use your service account to generate your Weaviate API key for authentication. In some cases, generating the API key doesn't require any user information, which means that a service account isn't required when generating the API key.
- You can bind your service account with the API key in your Weaviate database to configure the authentication (`AuthN`) and authorization (`AuthZ`). However, your service account isn't required.
- You can store the API key Secret Manager in your project, and you can grant your service account permissions to these secret resources.
- RAG Engine uses service accounts to access the API key from the Secret Manager in your projects.

## Set up your Google Cloud console environment

#### Click to learn how to set up your environment

Learn how to set up your environment by selecting one of the following
tabs:

### Python

1. In the Google Cloud console, activate Cloud Shell. Activate Cloud Shell At the bottom of the Google Cloud console, a
Cloud Shell
session starts and displays a command-line prompt. Cloud Shell is a shell environment
with the Google Cloud CLI
already installed and with values already set for
your current project. It can take a few seconds for the session to initialize. [!NOTE]
Note: If you are familiar with Gemini API in Google AI Studio, note that Gemini API for Agent Platform uses Identity and Access Management instead of API keys to manage access.

If you're using a local shell, then create local authentication credentials for your user
account:

```bash
gcloud auth application-default login

```

You don't need to do this if you're using Cloud Shell.

If an authentication error is returned, and you are using an external identity provider
(IdP), confirm that you have
signed in to the gcloud CLI with your federated identity.
3. Install or update the Agent Platform SDK for Python by
running the following command:

```
pip3 install --upgrade "google-cloud-aiplatform>=1.38"

```

### Node.js

1. In the Google Cloud console, activate Cloud Shell. Activate Cloud Shell At the bottom of the Google Cloud console, a
session starts and displays a command-line prompt. Cloud Shell is a shell environment
your current project. It can take a few seconds for the session to initialize. [!NOTE]
Note: If you are familiar with Gemini API in Google AI Studio, note that Gemini API for Agent Platform uses Identity and Access Management instead of API keys to manage access.

If you're using a local shell, then create local authentication credentials for your user

```

If an authentication error is returned, and you are using an external identity provider
3. Install or update the Agent Platform SDK for
Node.js by running the following command:

```
npm install @google-cloud/vertexai

```

### Java

1. In the Google Cloud console, activate Cloud Shell. Activate Cloud Shell At the bottom of the Google Cloud console, a
session starts and displays a command-line prompt. Cloud Shell is a shell environment
your current project. It can take a few seconds for the session to initialize. [!NOTE]
Note: If you are familiar with Gemini API in Google AI Studio, note that Gemini API for Agent Platform uses Identity and Access Management instead of API keys to manage access.

If you're using a local shell, then create local authentication credentials for your user

```

If an authentication error is returned, and you are using an external identity provider
3.
To add `google-cloud-vertexai` as a dependency, add the
appropriate code for your environment:

### Maven with BOM

Add the following HTML to your `pom.xml`:

```
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.google.cloud</groupId>
      <artifactId>libraries-bom</artifactId>
      <version>26.32.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
    <artifactId>google-cloud-vertexai</artifactId>

```

### Maven without BOM

```
  <version>0.4.0</version>

```

### Gradle without BOM

Add the following to your `build.gradle`

```
implementation 'com.google.cloud:google-cloud-vertexai:0.4.0'

```

### Go

1. In the Google Cloud console, activate Cloud Shell. Activate Cloud Shell At the bottom of the Google Cloud console, a
session starts and displays a command-line prompt. Cloud Shell is a shell environment
your current project. It can take a few seconds for the session to initialize. [!NOTE]
Note: If you are familiar with Gemini API in Google AI Studio, note that Gemini API for Agent Platform uses Identity and Access Management instead of API keys to manage access.

If you're using a local shell, then create local authentication credentials for your user

```

If an authentication error is returned, and you are using an external identity provider
3. Review the available Agent Platform API Go packages to determine
which package best meets your project's needs:

- Package
cloud.google.com/go/vertexai
(recommended)`vertexai` is a human authored package that provides access
to common capabilities and features. This package is recommended as the starting point for most developers
building with the Agent Platform API. To access capabilities and
features not yet covered by this package, use the auto-generated
`aiplatform` instead.
cloud.google.com/go/aiplatform`aiplatform` is an auto-generated package. This package is intended for projects that require access to
Agent Platform API capabilities and features not yet provided by the
human authored `vertexai` package.

1. Install the desired Go package based on your project's needs by running
one of the following commands:

```
# Human authored package. Recommended for most developers.
go get cloud.google.com/go/vertexai

# Auto-generated package.
go get cloud.google.com/go/aiplatform

```

### C#

1. In the Google Cloud console, activate Cloud Shell. Activate Cloud Shell At the bottom of the Google Cloud console, a
session starts and displays a command-line prompt. Cloud Shell is a shell environment
your current project. It can take a few seconds for the session to initialize. [!NOTE]
Note: If you are familiar with Gemini API in Google AI Studio, note that Gemini API for Agent Platform uses Identity and Access Management instead of API keys to manage access.

If you're using a local shell, then create local authentication credentials for your user

```

If an authentication error is returned, and you are using an external identity provider

### REST

1. In the Google Cloud console, activate Cloud Shell. Activate Cloud Shell At the bottom of the Google Cloud console, a
session starts and displays a command-line prompt. Cloud Shell is a shell environment
your current project. It can take a few seconds for the session to initialize. [!NOTE]
Note: If you are familiar with Gemini API in Google AI Studio, note that Gemini API for Agent Platform uses Identity and Access Management instead of API keys to manage access.
2. Configure environment variables by entering the following. Replace `PROJECT_ID` with the ID of your Google Cloud project.

```
MODEL_ID="gemini-2.0-flash-001"
PROJECT_ID="PROJECT_ID"

```

1. Provision the endpoint:

```
gcloud beta services identity create --service=aiplatform.googleapis.com --project=${PROJECT_ID}

```

1. Optional: If you are using Cloud Shell and you are asked to authorize Cloud Shell, click
Authorize.

## Prepare your RAG corpus

To access data from your Weaviate database, RAG Engine must have access to
a RAG corpus. This section provides the steps for creating a single RAG corpus
and additional RAG corpora.

### Use `CreateRagCorpus` and `UpdateRagCorpus` APIs

You must specify the following fields when calling the `CreateRagCorpus` and
`UpdateRagCorpus` APIs:

- `rag_vector_db_config.weaviate` : After you call the `CreateRagCorpus` API, the vector database configuration is chosen. The vector database configuration contains all of the configuration fields. If the `rag_vector_db_config.weaviate` field isn't set, then `rag_vector_db_config.rag_managed_db` is set by default.
- `weaviate.http_endpoint`: The HTTPS or HTTP Weaviate endpoint is created during provisioning of the Weaviate database instance.
- `weaviate.collection_name`: The name of the collection that is created during the Weaviate instance provisioning. The name must start with a capital letter.
- `api_auth.api_key_config`: The configuration specifies to use an API key to authorize your access to the vector database.
- `api_key_config.api_key_secret_version`: The resource name of the secret that is stored in Secret Manager, which contains your Weaviate API key.

You can create and associate your RAG corpus to the Weaviate collection in your
database instance. However, you might need the service account to generate your
API key and to configure your Weaviate database instance. When you create your
first RAG corpus, the service account is generated. After you create your first
RAG corpus, the association between the Weaviate database and the API key might
not be ready for use in the creation of another RAG corpus.

Just in case your database and key aren't ready to be associated to your
RAG corpus, do the following to your RAG corpus:

1. Set the `weaviate` field in `rag_vector_db_config`. You can't change the associated vector database. Leave both the `http_endpoint` and the `collection_name` fields empty. Both fields can be updated at a later time.
2. If you don't have your API key stored in Secret Manager, then you
can leave the `api_auth` field empty. When you call the `UpdateRagCorpus`
API, you can update the `api_auth` field. Weaviate requires that the
following be done: Set the `api_key_config` in the `api_auth` field. Set the `api_key_secret_version` of your Weaviate API key in
Secret Manager. The `api_key_secret_version` field
uses the following format:`projects/{project}/secrets/{secret}/versions/{version}`
3. If you specify fields that can only be set one time, like `http_endpoint` or
`collection_name`, you can't change them unless you delete your RAG corpus,
and create your RAG corpus again. Other fields like the API key field,
`api_key_secret_version`, can be updated.
4. When you call `UpdateRagCorpus`, you can set the `vector_db` field. The
`vector_db` should be set to `weaviate` by your `CreateRagCorpus` API call.
Otherwise, the system chooses the RAG Managed Database option, which is
the default. This option can't be changed when you call the `UpdateRagCorpus`
API. When you call `UpdateRagCorpus` and the `vector_db` field is partially
set, you can update the fields that are marked as Changeable (also referred
to as mutable).

This table lists the `WeaviateConfig` mutable and immutable fields that are used
in your code.

| Field name | Mutable or Immutable |
| `http_endpoint` | Immutable once set |
| `collection_name` | Immutable once set |
| `api_key_authentication` | Mutable |

### Create the first RAG corpus

When the RAG Engine service account doesn't exist, do the following:

1. Create a RAG corpus in RAG Engine with an empty Weaviate configuration, which initiates RAG Engine provisioning to create a service account.
2. Choose a name for your RAG Engine service account that follows this format:`service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com` For example, `service-123456789@gcp-sa-vertex-rag.iam.gserviceaccount.com`.
3. Using your service account, access your secret that is stored in your project's Secret Manager, which contains your Weaviate API key.
4. Get the following information after Weaviate provisioning completes: Your Weaviate HTTPS or HTTP endpoint. The name of your Weaviate collection.
5. Call the `CreateRagCorpus` API to create a RAG corpus with an empty Weaviate configuration, and call the `UpdateRagCorpus` API to update the RAG corpus with the following information: Your Weaviate HTTPS or HTTP endpoint. The name of your Weaviate collection. The API key resource name.

### Create another RAG corpus

When the RAG Engine service account exists, do the following:

1. Get your RAG Engine service account from your project's permissions.
2. Enable the option "Include Google-provided role grants"
3. Choose a name for your RAG Engine service account that follows this format:`service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com`
4. Using your service account, access your secret that is stored in your project's Secret Manager, which contains your Weaviate API key.
5. During Weaviate provisioning, get the following information: The Weaviate HTTPS or HTTP endpoint. The name of your Weaviate collection.
6. Create a RAG corpus in RAG Engine, and connect with your Weaviate collection by doing one of the following: Make a `CreateRagCorpus` API call to create a RAG corpus with a populated Weaviate configuration, which is the preferred option. Make a `CreateRagCorpus` API call to create a RAG corpus with an empty Weaviate configuration, and make an `UpdateRagCorpus` API call to update the RAG corpus with the following information: Weaviate database HTTP endpoint Weaviate Collection name API key

## Examples

This section presents sample code that demonstrates how to set up your Weaviate
database, Secret Manager, the RAG corpus, and the RAG file. Sample code
is also provided to demonstrate how to import files, to retrieve context, to
generate content, and to delete the RAG corpus and RAG files.

To use the Model Garden RAG API notebook, see
Use Weaviate with Llama 3.

### Set up your Weaviate database

This code sample demonstrates how to set up your Weaviate data and the
Secret Manager.

### REST

```
# TODO(developer): Update the variables.
# The HTTPS/HTTP Weaviate endpoint you created during provisioning.
HTTP_ENDPOINT_NAME="https://your.weaviate.endpoint.com"

# Your Weaviate API Key.
WEAVIATE_API_KEY="example-api-key"

# Select your Weaviate collection name, which roughly corresponds to a Agent Platform Knowledge Engine Corpus.
# For example, "MyCollectionName"
# Note that the first letter needs to be capitalized.
# Otherwise, Weavaite will capitalize it for you.
WEAVIATE_COLLECTION_NAME="MyCollectionName"

# Create a collection in Weaviate which includes the required schema fields shown below.
echo '{
  "class": "'${WEAVIATE_COLLECTION_NAME}'",
  "properties": [
    { "name": "fileId", "dataType": [ "string" ] },
    { "name": "corpusId", "dataType": [ "string" ] },
    { "name": "chunkId", "dataType": [ "string" ] },
    { "name": "chunkDataType", "dataType": [ "string" ] },
    { "name": "chunkData", "dataType": [ "string" ] },
    { "name": "fileOriginalUri", "dataType": [ "string" ] }
  ]
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer "${WEAVIATE_API_KEY} \
    -d @- \
    ${HTTP_ENDPOINT_NAME}/v1/schema

```

### Set up your Secret Manager

To set up your Secret Manager, you must enable Secret Manager,
and set permissions.

#### Create Secret

To enable your Secret Manager, do the following:

### Console

1. Go to the Secret Manager page. Go to Secret Manager
2. Click + Create Secret.
3. Enter the Name of your secret. Secret names can only contain English
letters (A-Z), numbers (0-9), dashes (-), and underscores (_).
4. Specifying the following fields is optional: To upload the file with your secret, click Browse. Read the Replication policy. If you want to manually manage the locations for your secret, then check Manually manage locations for this secret. At least one region must be selected. Select your encryption option. If you want to manually set your rotation period, then check Set rotation
period. If you want to specify Publish or subscribe topic(s) to receive event notifications, click Add topics. By default, the secret never expires. If you want to set an expiration date, then check Set expiration date. By default, secret versions are destroyed upon request. To delay the destruction of secret versions, check Set duration for delayed
destruction. If you want to use labels to organize and categorize your secrets, then click + Add label. If you want to use annotations to attach non-identifying metadata to your secrets, then click + Add annotation.
5. Click Create secret.

### REST

```
# Create a secret in SecretManager.
curl "https://secretmanager.googleapis.com/v1/projects/${PROJECT_ID}/secrets?secretId=${SECRET_NAME}" \
    --request "POST" \
    --header "authorization: Bearer $(gcloud auth print-access-token)" \
    --header "content-type: application/json" \
    --data "{\"replication\": {\"automatic\": {}}}"

```

### Python

Before trying this sample, follow the Python setup instructions in the
Agent Platform quickstart using
client libraries.

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

Set up authentication for a local development environment.

```
# Import the Secret Manager client library.
from google.cloud import secretmanager

def create_secret(
    project_id: str, secret_id: str, ttl: Optional[str] = None
) -> secretmanager.Secret:
    """
    Create a new secret with the given name. A secret is a logical wrapper
    around a collection of secret versions. Secret versions hold the actual
    secret material.

     Args:
        project_id (str): The project ID where the secret is to be created.
        secret_id (str): The ID to assign to the new secret. This ID must be unique within the project.
        ttl (Optional[str]): An optional string that specifies the secret's time-to-live in seconds with
                             format (e.g., "900s" for 15 minutes). If specified, the secret
                             versions will be automatically deleted upon reaching the end of the TTL period.

    Returns:
        secretmanager.Secret: An object representing the newly created secret, containing details like the
                              secret's name, replication settings, and optionally its TTL.

    Example:
        # Create a secret with automatic replication and no TTL
        new_secret = create_secret("my-project", "my-new-secret")

        # Create a secret with a TTL of 30 days
        new_secret_with_ttl = create_secret("my-project", "my-timed-secret", "7776000s")

    # Create the Secret Manager client.
    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()

    # Build the resource name of the parent project.
    parent = f"projects/{project_id}"

    # Create the secret.
    response = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_create_secret(
        request={
            "parent": parent,
            "secret_id": secret_id,
            "secret": {"replication": {"automatic": {}}, "ttl": ttl},
        }
    )

    # Print the new secret name.
    print(f"Created secret: {response.name}")

```

#### Set permissions

You must grant Secret Manager permissions to your service account.

### Console

1. In the IAM & Admin section of your Google Cloud console, find your service
account account, and click the pencil icon to edit.
2. In the Role field, select Secret Manager Secret Accessor.

### Python

```
def iam_grant_access(
    project_id: str, secret_id: str, member: str
) -> iam_policy_pb2.SetIamPolicyRequest:
    Grant the given member access to a secret.

    client = secretmanager.SecretManagerServiceClient()

    # Build the resource name of the secret.
    name = client.secret_path(project_id, secret_id)

    # Get the current IAM policy.
    policy = client.get_iam_policy(request={"resource": name})

    # Add the given member with access permissions.
    policy.bindings.add(role="roles/secretmanager.secretAccessor", members=[member])

    # Update the IAM Policy.
    new_policy = client.set_iam_policy(request={"resource": name, "policy": policy})

    # Print data about the secret.
    print(f"Updated IAM policy on {secret_id}")

```

#### Add Secret Version

### REST

```
# TODO(developer): Update the variables.
# Select a resource name for your Secret, which contains your API Key.
SECRET_NAME="MyWeaviateApiKeySecret"

# Your Weaviate API Key.
# Encode your WEAVIATE_API_KEY using base 64.
SECRET_DATA=$(echo ${WEAVIATE_API_KEY} | base64)

# Create a new version of your secret which uses SECRET_DATA as payload
curl "https://secretmanager.googleapis.com/v1/projects/${PROJECT_ID}/secrets/${SECRET_NAME}:addVersion" \
    --data "{\"payload\": {\"data\": \"${SECRET_DATA}\"}}"

```

### Python

```
import google_crc32c  # type: ignore

def add_secret_version(
    project_id: str, secret_id: str, payload: str
) -> secretmanager.SecretVersion:
    Add a new secret version to the given secret with the provided payload.

    client = secretmanager.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html()

    # Build the resource name of the parent secret.
    parent = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_secret_path(project_id, secret_id)

    # Convert the string payload into a bytes. This step can be omitted if you
    # pass in bytes instead of a str for the payload argument.
    payload_bytes = payload.encode("UTF-8")

    # Calculate payload checksum. Passing a checksum in add-version request
    # is optional.
    crc32c = google_crc32c.Checksum()
    crc32c.update(payload_bytes)

    # Add the secret version.
    response = client.https://docs.cloud.google.com/python/docs/reference/secretmanager/latest/google.cloud.secretmanager_v1.services.secret_manager_service.SecretManagerServiceClient.html#google_cloud_secretmanager_v1_services_secret_manager_service_SecretManagerServiceClient_add_secret_version(
            "payload": {
                "data": payload_bytes,
                "data_crc32c": int(crc32c.hexdigest(), 16),
            },

    # Print the new secret version name.
    print(f"Added secret version: {response.name}")

```

### Use Weaviate with Llama 3

The Model Garden RAG API notebook demonstrates how to use the
Agent Platform SDK for Python with a Weaviate corpus and Llama 3 model. To use the
notebook, you must do the following:

1. Set up your Weaviate database.
2. Set up your Secret Manager.
3. Use the
Model Garden RAG API notebook.

For more examples, see Examples.

### Create a RAG corpus

This code sample demonstrates how to create a RAG corpus, and sets the Weaviate
instance as its vector database.

### REST

```
  # TODO(developer): Update the variables.
  PROJECT_ID = "YOUR_PROJECT_ID"
  # The HTTPS/HTTP Weaviate endpoint you created during provisioning.

  # Your Weaviate collection name, which roughly corresponds to a Agent Platform Knowledge Engine Corpus.
  # For example, "MyCollectionName"
  # Note that the first letter needs to be capitalized.
  # Otherwise, Weaviate will capitalize it for you.

  # The resource name of your Weaviate API Key your Secret.
  # The Secret Manager resource name containing the API Key for your Weaviate endpoint.
  # For example, projects/{project}/secrets/{secret}/versions/latest
  APIKEY_SECRET_VERSION="projects/${PROJECT_ID}/secrets/${SECRET_NAME}/versions/latest"

  # Select a Corpus display name.
  CORPUS_DISPLAY_NAME="SpecialCorpus"

  # Call CreateRagCorpus API and set all Vector DB Config parameters for Weaviate to create a new corpus associated to your selected Weaviate collection.
  curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora \
  -d '{
        "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
        "rag_vector_db_config" : {
                "weaviate": {
                      "http_endpoint": '\""${HTTP_ENDPOINT_NAME}"\"',
                      "collection_name": '\""${WEAVIATE_COLLECTION_NAME}"\"'
          "api_auth" : {
                  "api_key_config": {
                        "api_key_secret_version": '\""${APIKEY_SECRET_VERSION}"\"'
    }'

  # TODO(developer): Update the variables.
  # Get operation_id returned in CreateRagCorpus.
  OPERATION_ID="your-operation-id"

  # Poll Operation status until done = true in the response.
  curl -X GET \
  https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}

  # Call ListRagCorpora API to verify the RAG corpus is created successfully.
  curl -sS -X GET \
    "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora"

```

### Python

```
from vertexai.preview import rag
import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# weaviate_http_endpoint = "weaviate-http-endpoint"
# weaviate_collection_name = "weaviate-collection-name"
# weaviate_api_key_secret_manager_version = "projects/{PROJECT_ID}/secrets/{SECRET_NAME}/versions/latest"
# display_name = "test_corpus"
# description = "Corpus Description"

# Initialize Vertex AI API once per session
https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="us-central1")

# Configure embedding model (Optional)
embedding_model_config = rag.EmbeddingModelConfig(
    publisher_model="publishers/google/models/text-embedding-004"

# Configure Vector DB
vector_db = rag.Weaviate(
    weaviate_http_endpoint=weaviate_http_endpoint,
    collection_name=weaviate_collection_name,
    api_key=weaviate_api_key_secret_manager_version,

corpus = rag.create_corpus(
    display_name=display_name,
    description=description,
    embedding_model_config=embedding_model_config,
    vector_db=vector_db,
print(corpus)
# Example response:
# RagCorpus(name='projects/1234567890/locations/us-central1/ragCorpora/1234567890',
# display_name='test_corpus', description='Corpus Description', embedding_model_config=...
# ...

```

### Use the RAG file

The RAG API handles
the file upload, import, listing, and deletion.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT_ID: .
- LOCATION: The region to process the request.
- RAG_CORPUS_ID: The ID of the `RagCorpus` resource.
- INPUT_FILE: The path of a local file.
- FILE_DISPLAY_NAME: The display name of the `RagFile`.
- RAG_FILE_DESCRIPTION: The description of the `RagFile`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/media:upload

```

Request JSON body:

```
{
 "rag_file": {
  "display_name": "FILE_DISPLAY_NAME",
  "description": "RAG_FILE_DESCRIPTION"

```

To send your request, choose one of these options:

#### curl

Save the request body in a file named `INPUT_FILE`,
and execute the following command:

```
     -H "Content-Type: application/json; charset=utf-8" \
     -d @INPUT_FILE \
     "https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/media:upload"

```

#### PowerShell

```
$headers = @{  }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile INPUT_FILE `
    -Uri "https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/media:upload" | Select-Object -Expand Content

```

A successful response returns the `RagFile` resource. The last component of the `RagFile.name` field is the server-generated `rag_file_id`.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

For more information, see the
Python API reference documentation.

```
from vertexai import rag
import vertexai

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"
# path = "path/to/local/file.txt"
# display_name = "file_display_name"
# description = "file description"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

rag_file = rag.upload_file(
    corpus_name=corpus_name,
    path=path,
print(rag_file)
# RagFile(name='projects/[PROJECT_ID]/locations/us-central1/ragCorpora/1234567890/ragFiles/09876543',
#  display_name='file_display_name', description='file description')

```

#### Import RAG files

Files and folders can be imported from Drive or Cloud Storage.

### REST

Use `response.metadata` to view partial failures, request time, and response
time in the SDK's `response` object.

- GCS_URIS: A list of Cloud Storage locations. Example: `gs://my-bucket1, gs://my-bucket2`.
- DRIVE_RESOURCE_ID: The ID of the Drive resource. Examples:`https://drive.google.com/file/d/ABCDE``https://drive.google.com/corp/drive/u/0/folders/ABCDEFG`
- DRIVE_RESOURCE_TYPE: Type of the Drive resource. Options:`RESOURCE_TYPE_FILE` - File`RESOURCE_TYPE_FOLDER` - Folder
- CHUNK_SIZE: Optional: Number of tokens each chunk should have.
- CHUNK_OVERLAP: Optional: Number of tokens overlap between chunks.

```
POST https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import

```

```
  "import_rag_files_config": {
    "gcs_source": {
      "uris": GCS_URIS
    "google_drive_source": {
      "resource_ids": {
        "resource_id": DRIVE_RESOURCE_ID,
        "resource_type": DRIVE_RESOURCE_TYPE

```

Save the request body in a file named `request.json`,

```
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import"

```

```

    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import" | Select-Object -Expand Content

```

A successful response returns the `ImportRagFilesOperationMetadata` resource.

The following sample demonstrates how to import a file from
Cloud Storage. Use the `max_embedding_requests_per_min` control field
to limit the rate at which RAG Engine calls the embedding model during the
`ImportRagFiles` indexing process. The field has a default value of `1000` calls
per minute.

```
// Cloud Storage bucket/file location.
// Such as "gs://rag-e2e-test/"
GCS_URIS=YOUR_GCS_LOCATION

// Enter the QPM rate to limit RAG's access to your embedding model
// Example: 1000
EMBEDDING_MODEL_QPM_RATE=MAX_EMBEDDING_REQUESTS_PER_MIN_LIMIT

// ImportRagFiles
// Import a single Cloud Storage file or all files in a Cloud Storage bucket.
// Input: ENDPOINT, PROJECT_ID, RAG_CORPUS_ID, GCS_URIS
// Output: ImportRagFilesOperationMetadataNumber
// Use ListRagFiles to find the server-generated rag_file_id.
https://${ENDPOINT}/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/ragCorpora/${RAG_CORPUS_ID}/ragFiles:import \
      "uris": '\""${GCS_URIS}"\"'
    "rag_file_chunking_config": {
      "chunk_size": 512
    "max_embedding_requests_per_min": '"${EMBEDDING_MODEL_QPM_RATE}"'

// Poll the operation status.
// The response contains the number of files imported.
OPERATION_ID=OPERATION_ID
poll_op_wait ${OPERATION_ID}

```

Drive. Use the `max_embedding_requests_per_min` control field to
limit the rate at which RAG Engine calls the embedding model during the

```
// Google Drive folder location.
FOLDER_RESOURCE_ID=YOUR_GOOGLE_DRIVE_FOLDER_RESOURCE_ID

// Import all files in a Google Drive folder.
// Input: ENDPOINT, PROJECT_ID, RAG_CORPUS_ID, FOLDER_RESOURCE_ID
https://${ENDPOINT}/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/ragCorpora/${RAG_CORPUS_ID}/ragFiles:import \
        "resource_id": '\""${FOLDER_RESOURCE_ID}"\"',
        "resource_type": "RESOURCE_TYPE_FOLDER"

```

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"
# paths = ["https://drive.google.com/file/123", "gs://my_bucket/my_files_dir"]  # Supports Google Cloud Storage and Google Drive Links

# Initialize Vertex AI API once per session

response = rag.import_files(
    paths=paths,
    transformation_config=rag.TransformationConfig(
        rag.ChunkingConfig(chunk_size=512, chunk_overlap=100)
    ),
    import_result_sink="gs://sample-existing-folder/sample_import_result_unique.ndjson",  # Optional, this has to be an existing storage bucket folder, and file name has to be unique (non-existent).
    max_embedding_requests_per_min=900,  # Optional
print(f"Imported {response.imported_rag_files_count} files.")
# Example response:
# Imported 2 files.

```

#### Get a RAG file

### REST

- RAG_FILE_ID: The ID of the `RagFile` resource.

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID

```

Execute the following command:

```
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID"

```

```

    -Method GET `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID" | Select-Object -Expand Content

```

A successful response returns the `RagFile` resource.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# file_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}/ragFiles/{rag_file_id}"

# Initialize Vertex AI API once per session

rag_file = rag.get_file(name=file_name)
# Example response:
# RagFile(name='projects/1234567890/locations/us-central1/ragCorpora/11111111111/ragFiles/22222222222',
# display_name='file_display_name', description='file description')

```

#### List RAG files

### REST

- PAGE_SIZE: The standard list page size. You may adjust the number of `RagFiles` to return per page by updating the `page_size` parameter.
- PAGE_TOKEN: The standard list page token. Obtained typically using `ListRagFilesResponse.next_page_token` of the previous `VertexRagDataService.ListRagFiles` call.

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles?page_size=PAGE_SIZE&page_token=PAGE_TOKEN

```

```
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles?page_size=PAGE_SIZE&page_token=PAGE_TOKEN"

```

```

    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles?page_size=PAGE_SIZE&page_token=PAGE_TOKEN" | Select-Object -Expand Content

```

You should receive a successful status code (2xx) along with a list of `RagFiles` under the given `RAG_CORPUS_ID`.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"

# Initialize Vertex AI API once per session

files = rag.list_files(corpus_name=corpus_name)
for file in files:
    print(file.display_name)
    print(file.name)
# Example response:
# g-drive_file.txt
# projects/1234567890/locations/us-central1/ragCorpora/111111111111/ragFiles/222222222222
# g_cloud_file.txt
# projects/1234567890/locations/us-central1/ragCorpora/111111111111/ragFiles/333333333333

```

#### Delete a RAG file

### REST

- RAG_FILE_ID: The ID of the `RagFile` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}/ragFiles/{rag_file_id}`.

```
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID

```

```
curl -X DELETE \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID"

```

```

    -Method DELETE `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID" | Select-Object -Expand Content

```

A successful response returns the `DeleteOperationMetadata` resource.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# file_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}/ragFiles/{rag_file_id}"

# Initialize Vertex AI API once per session

rag.delete_file(name=file_name)
print(f"File {file_name} deleted.")
# Example response:
# Successfully deleted the RagFile.
# File projects/1234567890/locations/us-central1/ragCorpora/1111111111/ragFiles/2222222222 deleted.

```

### Retrieve context

When a user asks a question or provides a prompt, the retrieval component in RAG
searches through its knowledge base to find information that is relevant to the
query.

### REST

- RAG_CORPUS_RESOURCE: The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- VECTOR_DISTANCE_THRESHOLD: Only contexts with a vector distance smaller than the threshold are returned.
- TEXT: The query text to get relevant contexts.
- SIMILARITY_TOP_K: The number of top contexts to retrieve.

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts

```

```
 "vertex_rag_store": {
    "rag_resources": {
      "rag_corpus": "RAG_CORPUS_RESOURCE",
    "vector_distance_threshold": 0.8
  "query": {
   "text": "TEXT",
   "similarity_top_k": SIMILARITY_TOP_K

```

```
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts"

```

```

    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts" | Select-Object -Expand Content

```

You should receive a successful status code (2xx) and a list of related `RagFiles`.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/[PROJECT_ID]/locations/us-central1/ragCorpora/[rag_corpus_id]"

# Initialize Vertex AI API once per session

response = rag.retrieval_query(
    rag_resources=[
        rag.RagResource(
            rag_corpus=corpus_name,
            # Optional: supply IDs from `rag.list_files()`.
            # rag_file_ids=["rag-file-1", "rag-file-2", ...],
    ],
    text="Hello World!",
    rag_retrieval_config=rag.RagRetrievalConfig(
        top_k=10,
        filter=rag.utils.resources.Filter(vector_distance_threshold=0.5),
print(response)
# Example response:
# contexts {
#   contexts {
#     source_uri: "gs://your-bucket-name/file.txt"
#     text: "....
#   ....

```

### Generates content

A prediction controls the LLM method that generates content.

### REST

- MODEL_ID: LLM model for content generation. Example: `gemini-2.5-flash`
- GENERATION_METHOD: LLM method for content generation. Options: `generateContent`, `streamGenerateContent`
- INPUT_PROMPT: The text sent to the LLM for content generation. Try to use a prompt relevant to the uploaded rag Files.
- RAG_CORPUS_RESOURCE: The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- SIMILARITY_TOP_K: Optional: The number of top contexts to retrieve.
- VECTOR_DISTANCE_THRESHOLD: Optional: Contexts with a vector distance smaller than the threshold are returned.

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD

```

```
 "contents": {
  "role": "user",
  "parts": {
    "text": "INPUT_PROMPT"
 "tools": {
  "retrieval": {
   "disable_attribution": false,
    "similarity_top_k": SIMILARITY_TOP_K,
    "vector_distance_threshold": VECTOR_DISTANCE_THRESHOLD

```

```
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD"

```

```

    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD" | Select-Object -Expand Content

```

A successful response returns the generated content with citations.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```
from vertexai.generative_models import GenerativeModel, Tool

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"

# Initialize Vertex AI API once per session

rag_retrieval_tool = Tool.from_retrieval(
    retrieval=rag.Retrieval(
        source=rag.VertexRagStore(

rag_model = GenerativeModel(
    model_name="gemini-2.0-flash-001", tools=[rag_retrieval_tool]
response = rag_model.generate_content("Why is the sky blue?")
print(response.text)
# Example response:
#   The sky appears blue due to a phenomenon called Rayleigh scattering.
#   Sunlight, which contains all colors of the rainbow, is scattered
#   by the tiny particles in the Earth's atmosphere....
#   ...

```

## Hybrid search

Hybrid search is supported with Weaviate database, which combines both semantic
and keyword searches to improve the relevance of search results. During the
retrieval of search results, a combination of similarity scores from semantic (a
dense vector) and keyword matching (a sparse vector) produces the final ranked
results.

### Hybrid search using the RAG Engine retrieval API

This is an example of how to enable a hybrid search using the RAG Engine
retrieval API.

### REST

```
  # TODO(developer): Update the variables.
  # The HTTPS/HTTP Weaviate endpoint you created during provisioning.

  # Your Weaviate collection name, which roughly corresponds to a Agent Platform Knowledge Engine Corpus.
  # For example, "MyCollectionName"
  # Note that the first letter needs to be capitalized.
  # Otherwise, Weaviate will capitalize it for you.

  # The resource name of your Weaviate API Key your Secret.
  # The Secret Manager resource name containing the API Key for your Weaviate endpoint.
  # For example, projects/{project}/secrets/{secret}/versions/latest
  APIKEY_SECRET_VERSION="projects/${PROJECT_ID}/secrets/${SECRET_NAME}/versions/latest"

  # Select a Corpus display name.

  # Call CreateRagCorpus API and set all Vector DB Config parameters for Weaviate to create a new corpus associated to your selected Weaviate collection.
  https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora \

  # TODO(developer): Update the variables.
  # Get operation_id returned in CreateRagCorpus.

  # Poll Operation status until done = true in the response.
  https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}

  # Call ListRagCorpora API to verify the RAG corpus is created successfully.
    "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora"

```

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/[PROJECT_ID]/locations/us-central1/ragCorpora/[rag_corpus_id]"

# Initialize Vertex AI API once per session

# Example response:
# contexts {
#   contexts {
#     source_uri: "gs://your-bucket-name/file.txt"
#     text: "....
#   ....

```

### Use hybrid search and RAG Engine for grounded generation

This is an example of how to use hybrid search and RAG Engine for grounded
generation.

### REST

```
  # TODO(developer): Update the variables.
  # The HTTPS/HTTP Weaviate endpoint you created during provisioning.

  # Your Weaviate collection name, which roughly corresponds to a Agent Platform Knowledge Engine Corpus.
  # For example, "MyCollectionName"
  # Note that the first letter needs to be capitalized.
  # Otherwise, Weaviate will capitalize it for you.

  # The resource name of your Weaviate API Key your Secret.
  # The Secret Manager resource name containing the API Key for your Weaviate endpoint.
  # For example, projects/{project}/secrets/{secret}/versions/latest
  APIKEY_SECRET_VERSION="projects/${PROJECT_ID}/secrets/${SECRET_NAME}/versions/latest"

  # Select a Corpus display name.

  # Call CreateRagCorpus API and set all Vector DB Config parameters for Weaviate to create a new corpus associated to your selected Weaviate collection.
  https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora \

  # TODO(developer): Update the variables.
  # Get operation_id returned in CreateRagCorpus.

  # Poll Operation status until done = true in the response.
  https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}

  # Call ListRagCorpora API to verify the RAG corpus is created successfully.
    "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora"

```

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"

# Initialize Vertex AI API once per session

# Example response:
#   The sky appears blue due to a phenomenon called Rayleigh scattering.
#   Sunlight, which contains all colors of the rainbow, is scattered
#   by the tiny particles in the Earth's atmosphere....
#   ...

```

## What's next

- Use Pinecone with RAG Engine on Gemini Enterprise Agent Platform
