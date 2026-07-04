## Prerequisites

Before you use the Python samples on this page, install and initialize the
Agent Platform SDK in your local Python environment.

1. Run the following command to install the Agent Platform SDK for Example Store. pip install --upgrade google-cloud-aiplatform>=1.87.0

2. Use the following code sample to import and initialize the SDK for Example Store. import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
from vertexai.preview import example_stores

https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(
 project="PROJECT_ID",
 location="LOCATION"
)
Replace the following: PROJECT_ID: Your project ID. LOCATION: Your region. Only `us-central1` is supported.

## Create an Example Store instance

Use the following samples to create an Example Store instance for a specified project
and location. Note that creating an Example Store instance takes a few minutes.

### Python

Before trying this sample, follow the Python setup instructions in the
Agent Platform quickstart using
client libraries.

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

Set up authentication for a local development environment.

```
import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

my_example_store = example_stores.ExampleStore.create(
    example_store_config=example_stores.ExampleStoreConfig(
        vertex_embedding_model="EMBEDDING_MODEL"

```

Replace the following:

- PROJECT_ID: Your project ID.
- LOCATION: The region where you want to create the example store. The only region supported is `us-central1`.
- EMBEDDING_MODEL: Embedding model that the Example Store instance uses to determine which examples are relevant to users' queries. Example Store supports the following embedding models:`text-embedding-005``text-multilingual-embedding-002`

### REST

To create an `ExampleStore`
resource, send a `POST` request by using the
`exampleStores.create`
method.

Before using any of the request data,
make the following replacements:

- LOCATION: The region where you want to create the Example Store instance. The only region supported is `us-central1`.
- DISPLAY_NAME: The name of the Example Store instance.
- EMBEDDING_MODEL: Embedding model that the Example Store instance uses to determine which examples are relevant to users' queries. Example Store supports the following embedding models:`textembedding-gecko@003``text-embedding-004``text-multilingual-embedding-002`

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores

```

Request JSON body:

```
{
  "display_name": "DISPLAY_NAME",
  "example_store_config": {"vertex_embedding_model": EMBEDDING_MODEL}
}

```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` , or by using Cloud Shell, which automatically logs you into the `gcloud` CLI . You can check the currently active account by running `gcloud auth list`.

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores"

```

#### PowerShell

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` . You can check the currently active account by running `gcloud auth list`.

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores" | Select-Object -Expand Content

```

You should receive a JSON response similar to the following, where EXAMPLE_STORE_ID
represents the ID of the Example Store instance.

#### Response

```
  "name": "projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID/operations/",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.CreateExampleStoreOperationMetadata",
    "genericMetadata": {
      "createTime": "2024-10-10T02:06:10.417111Z",
      "updateTime": "2024-10-10T02:06:10.417111Z"

```

## Reuse an existing Example Store instance

Use the following sample to reuse an existing Example Store instance for a specified
project and location.

### Python

```

example_store = example_stores.ExampleStore(
    "EXAMPLE_STORE_NAME")

```

- LOCATION: The region where you want to create the example store. The only region supported is `us-central1`.
- EXAMPLE_STORE_NAME: Name of the Example Store instance you want to reuse.

## What's next

- Upload examples to the Example Store instance.
