There are a few steps required before you can query an index:

1. Create an `IndexEndpoint` if needed, or reuse an existing `IndexEndpoint`.
2. Get the `IndexEndpoint` ID.
3. Deploy the index to the `IndexEndpoint`.

## Create an `IndexEndpoint`

### gcloud

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_NAME</var>: Display name of the index endpoint.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

> [!IMPORTANT]
> **Note:** To use a public endpoint, `--public-endpoint-enabled` must be specified.

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints create \
    --display-name=INDEX_ENDPOINT_NAME \
    --public-endpoint-enabled \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints create `
    --display-name=INDEX_ENDPOINT_NAME `
    --public-endpoint-enabled `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints create ^
    --display-name=INDEX_ENDPOINT_NAME ^
    --public-endpoint-enabled ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_NAME</var>: Display name of the index endpoint.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

> [!IMPORTANT]
> **Note:** To use a public endpoint, the `publicEndpointEnabled` field must be `true`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints
```

Request JSON body:

```
{
 "display_name": "INDEX_ENDPOINT_NAME",
 "publicEndpointEnabled": "true"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1.CreateIndexEndpointOperationMetadata",
    "genericMetadata": {
      "createTime": "2022-01-13T04:09:56.641107Z",
      "updateTime": "2022-01-13T04:09:56.641107Z"
    }
  }
}
```
You can poll for the status of the operation until the response includes `"done": true`.

### Terraform

The following sample uses the [`vertex_ai_index_endpoint`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vertex_ai_index_endpoint) Terraform resource to create an index endpoint.

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

    resource "google_vertex_ai_index_endpoint" "default" {
      display_name            = "sample-endpoint"
      description             = "A sample index endpoint with a public endpoint"
      region                  = "us-central1"
      public_endpoint_enabled = true
    }

    # Cloud Storage bucket name must be unique
    resource "random_id" "default" {
      byte_length = 8
    }

    # Create a Cloud Storage bucket
    resource "google_storage_bucket" "bucket" {
      name                        = "vertex-ai-index-bucket-${random_id.default.hex}"
      location                    = "us-central1"
      uniform_bucket_level_access = true
    }

    # Create index content
    resource "google_storage_bucket_object" "data" {
      name    = "contents/data.json"
      bucket  = google_storage_bucket.bucket.name
      content = <<EOF
    {"id": "42", "embedding": [0.5, 1.0], "restricts": [{"namespace": "class", "allow": ["cat", "pet"]},{"namespace": "category", "allow": ["feline"]}]}
    {"id": "43", "embedding": [0.6, 1.0], "restricts": [{"namespace": "class", "allow": ["dog", "pet"]},{"namespace": "category", "allow": ["canine"]}]}
    EOF
    }

    resource "google_vertex_ai_index" "default" {
      region       = "us-central1"
      display_name = "sample-index-batch-update"
      description  = "A sample index for batch update"
      labels = {
        foo = "bar"
      }

      metadata {
        contents_delta_uri = "gs://${google_storage_bucket.bucket.name}/contents"
        config {
          dimensions                  = 2
          approximate_neighbors_count = 150
          distance_measure_type       = "DOT_PRODUCT_DISTANCE"
          algorithm_config {
            tree_ah_config {
              leaf_node_embedding_count    = 500
              leaf_nodes_to_search_percent = 7
            }
          }
        }
      }
      index_update_method = "BATCH_UPDATE"

      timeouts {
        create = "2h"
        update = "1h"
      }
    }

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_create_index_endpoint(
        project: str, location: str, display_name: str
    ) -> None:
        """Create a vector search index endpoint.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            display_name (str): Required. The index endpoint display name
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create Index Endpoint
        index_endpoint = aiplatform.MatchingEngineIndexEndpoint.create(
            display_name=display_name,
            public_endpoint_enabled=True,
            description="Matching Engine Index Endpoint",
        )

        print(index_endpoint.name)

### Console

Use these instructions to create an index endpoint.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. A list of your active indexes is displayed.
3. On the top of the page, select the **Index endpoints** tab. Your index endpoints are displayed.
4. Click **Create new index endpoint**. The Create a new index endpoint panel opens.
5. Enter a display name for the index endpoint.
6. In the **Region** field, select a region from the drop-down.
7. In the **Access** field, select **Standard**.
8. Click **Create**.

## Deploy an index to an endpoint

> [!NOTE]
> **Note:** If your `DeployedIndex` uses fewer than two replicas per shard, then it is excluded from the [Agent Platform Service Level Agreement](https://cloud.google.com/terms/vector-search/sla). For your `DeployedIndex` to be covered by the SLA, you must set `minReplicaCount` to at least 2 or greater, and must be adequately provisioned for workload size. To be adequately provisioned we recommend adding additional replicas if CPU/Memory usage consistency operates 60%.

> [!IMPORTANT]
> **Important:** Initial deployment of an index to an endpoint typically takes between 20 and 30 minutes. A maximum of 20 indexes can be deployed on a single endpoint.

### gcloud

This example uses the [`gcloud ai index-endpoints deploy-index`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/index-endpoints/deploy-index) command.

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">DEPLOYED_INDEX_ENDPOINT_NAME</var>: Display name of the deployed index endpoint.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints deploy-index INDEX_ENDPOINT_ID \
    --deployed-index-id=DEPLOYED_INDEX_ID \
    --display-name=DEPLOYED_INDEX_ENDPOINT_NAME \
    --index=INDEX_ID \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints deploy-index INDEX_ENDPOINT_ID `
    --deployed-index-id=DEPLOYED_INDEX_ID `
    --display-name=DEPLOYED_INDEX_ENDPOINT_NAME `
    --index=INDEX_ID `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints deploy-index INDEX_ENDPOINT_ID ^
    --deployed-index-id=DEPLOYED_INDEX_ID ^
    --display-name=DEPLOYED_INDEX_ENDPOINT_NAME ^
    --index=INDEX_ID ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">DEPLOYED_INDEX_ENDPOINT_NAME</var>: Display name of the deployed index endpoint.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:deployIndex
```

Request JSON body:

```
{
 "deployedIndex": {
   "id": "DEPLOYED_INDEX_ID",
   "index": "projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID",
   "displayName": "DEPLOYED_INDEX_ENDPOINT_NAME"
 }
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:deployIndex"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:deployIndex" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeployIndexOperationMetadata",
   "genericMetadata": {
     "createTime": "2022-10-19T17:53:16.502088Z",
     "updateTime": "2022-10-19T17:53:16.502088Z"
   },
   "deployedIndexId": "DEPLOYED_INDEX_ID"
 }
}
```

### Terraform

The following sample uses the [`vertex_ai_index_endpoint_deployed_index`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vertex_ai_index_endpoint_deployed_index) Terraform resource to create a deployed index endpoint.

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

    provider "google" {
      region = "us-central1"
    }

    resource "google_vertex_ai_index_endpoint_deployed_index" "default" {
      depends_on        = [google_vertex_ai_index_endpoint.default]
      index_endpoint    = google_vertex_ai_index_endpoint.default.id
      index             = google_vertex_ai_index.default.id
      deployed_index_id = "deployed_index_id"
    }

    resource "google_vertex_ai_index_endpoint" "default" {
      display_name            = "sample-endpoint"
      description             = "A sample index endpoint with a public endpoint"
      region                  = "us-central1"
      public_endpoint_enabled = true
    }

    # Cloud Storage bucket name must be unique
    resource "random_id" "default" {
      byte_length = 8
    }

    # Create a Cloud Storage bucket
    resource "google_storage_bucket" "bucket" {
      name                        = "vertex-ai-index-bucket-${random_id.default.hex}"
      location                    = "us-central1"
      uniform_bucket_level_access = true
    }

    # Create index content
    resource "google_storage_bucket_object" "data" {
      name    = "contents/data.json"
      bucket  = google_storage_bucket.bucket.name
      content = <<EOF
    {"id": "42", "embedding": [0.5, 1.0], "restricts": [{"namespace": "class", "allow": ["cat", "pet"]},{"namespace": "category", "allow": ["feline"]}]}
    {"id": "43", "embedding": [0.6, 1.0], "restricts": [{"namespace": "class", "allow": ["dog", "pet"]},{"namespace": "category", "allow": ["canine"]}]}
    EOF
    }

    resource "google_vertex_ai_index" "default" {
      region       = "us-central1"
      display_name = "sample-index-batch-update"
      description  = "A sample index for batch update"
      labels = {
        foo = "bar"
      }

      metadata {
        contents_delta_uri = "gs://${google_storage_bucket.bucket.name}/contents"
        config {
          dimensions                  = 2
          approximate_neighbors_count = 150
          distance_measure_type       = "DOT_PRODUCT_DISTANCE"
          algorithm_config {
            tree_ah_config {
              leaf_node_embedding_count    = 500
              leaf_nodes_to_search_percent = 7
            }
          }
        }
      }
      index_update_method = "BATCH_UPDATE"

      timeouts {
        create = "2h"
        update = "1h"
      }
    }

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_deploy_index(
        project: str,
        location: str,
        index_name: str,
        index_endpoint_name: str,
        deployed_index_id: str,
    ) -> None:
        """Deploy a vector search index to a vector search index endpoint.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
            index_endpoint_name (str): Required. Index endpoint to deploy the index
              to.
            deployed_index_id (str): Required. The user specified ID of the
              DeployedIndex.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        # Create the index endpoint instance from an existing endpoint.
        index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Deploy Index to Endpoint
        index_endpoint = index_endpoint.deploy_index(
            index=index, deployed_index_id=deployed_index_id
        )

        print(index_endpoint.deployed_indexes)

### Console

Use these instructions to deploy your index to an endpoint.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. A list of your active indexes is displayed.
3. Select the name of the index you want to deploy. The index details page opens.
4. From the index details page, click **Deploy to endpoint**. The index deployment panel opens.
5. Enter a display name - this name acts as an ID and can't be updated.
6. From the **Endpoint** drop-down, select the endpoint you want to deploy this index to. Note: The endpoint is unavailable if the index is already deployed to it.
7. Optional: In the **Machine type** field, select either standard or high-memory.
8. Optional. Select **Enable autoscaling** to automatically resize the number of nodes based on the demands of your workloads. The default number of replicas is 2 if autoscaling is disabled.
9. Click **Deploy** to deploy your index to the endpoint. Note: It takes around 30 minutes to be deployed.

> [!IMPORTANT]
> **Important:** If you use a public endpoint, you are required to use OAuth authentication. In this case, don't specify the `deployedIndexAuthConfig`, which is used for private endpoint authentication.

## Get the index domain name

After the index is deployed, you need the domain name to be able to use the
index for an online query. The value is available under
`publicEndpointDomainName`.

    curl -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`"  ${ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${REGION}/indexEndpoints/${INDEX_ENDPOINT_ID}

## Example Response

    {
      "name": "projects/181224308459/locations/us-central1/indexEndpoints/3370566089086861312",
      "displayName": "public-endpoint-test1",
      "deployedIndexes": [
        {
          "id": "test_index_public1",
          "index": "projects/181224308459/locations/us-central1/indexes/7733428228102029312",
          "displayName": "test_index_public1",
          "createTime": "2023-02-08T23:19:58.026843Z",
          "indexSyncTime": "2023-02-09T05:26:19.309417Z",
          "automaticResources": {
            "minReplicaCount": 2,
            "maxReplicaCount": 2
          },
          "deploymentGroup": "default"
        }
      ],
      "etag": "AMEw9yNkXQcSke8iqW9SYxfhj_hT9GCwPt1XlxVwJRSCxiXOYnG4CKrZM_X0oH-XN8tR",
      "createTime": "2023-02-08T22:44:20.285382Z",
      "updateTime": "2023-02-08T22:44:26.515162Z",
      "publicEndpointDomainName": "1957880287.us-central1-181224308459.vdb.vertexai.goog"
    }

## Enable autoscaling

Vector Search supports autoscaling, which can
automatically resize the number of nodes based on the demands of your
workloads. When demand is high, nodes are added to the node pool, which won't
exceed the maximum size you designate. When demand is low, the node pool scales
back down to a minimum size that you designate. You can check the actual nodes
in use and the changes by [monitoring the current replicas](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/monitor).

To enable autoscaling, specify the `maxReplicaCount` and
`minReplicaCount` when you deploy your index:

### gcloud

The following example uses the [`gcloud ai index-endpoints deploy-index`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/index-endpoints/deploy-index) command.

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">DEPLOYED_INDEX_NAME</var>: Display name of the deployed index.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">MIN_REPLICA_COUNT</var>: Minimum number of machine replicas the deployed index will be always deployed on. If specified, the value must be equal to or larger than 1.
- <var translate="no">MAX_REPLICA_COUNT</var>: Maximum number of machine replicas the deployed index could be deployed on.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints deploy-index INDEX_ENDPOINT_ID \
    --deployed-index-id=DEPLOYED_INDEX_ID \
    --display-name=DEPLOYED_INDEX_NAME \
    --index=INDEX_ID \
    --min-replica-count=MIN_REPLICA_COUNT \
    --max-replica-count=MAX_REPLICA_COUNT \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints deploy-index INDEX_ENDPOINT_ID `
    --deployed-index-id=DEPLOYED_INDEX_ID `
    --display-name=DEPLOYED_INDEX_NAME `
    --index=INDEX_ID `
    --min-replica-count=MIN_REPLICA_COUNT `
    --max-replica-count=MAX_REPLICA_COUNT `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints deploy-index INDEX_ENDPOINT_ID ^
    --deployed-index-id=DEPLOYED_INDEX_ID ^
    --display-name=DEPLOYED_INDEX_NAME ^
    --index=INDEX_ID ^
    --min-replica-count=MIN_REPLICA_COUNT ^
    --max-replica-count=MAX_REPLICA_COUNT ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">DEPLOYED_INDEX_NAME</var>: Display name of the deployed index.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">MIN_REPLICA_COUNT</var>: Minimum number of machine replicas the deployed index will be always deployed on. If specified, the value must be equal to or larger than 1.
- <var translate="no">MAX_REPLICA_COUNT</var>: Maximum number of machine replicas the deployed index could be deployed on.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:deployIndex
```

Request JSON body:

```
{
 "deployedIndex": {
   "id": "DEPLOYED_INDEX_ID",
   "index": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID",
   "displayName": "DEPLOYED_INDEX_NAME",
   "automaticResources": {
     "minReplicaCount": MIN_REPLICA_COUNT,
     "maxReplicaCount": MAX_REPLICA_COUNT
   }
 }
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:deployIndex"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:deployIndex" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeployIndexOperationMetadata",
   "genericMetadata": {
     "createTime": "2023-10-19T17:53:16.502088Z",
     "updateTime": "2023-10-19T17:53:16.502088Z"
   },
   "deployedIndexId": "DEPLOYED_INDEX_ID"
 }
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_deploy_autoscaling_index(
        project: str,
        location: str,
        index_name: str,
        index_endpoint_name: str,
        deployed_index_id: str,
        min_replica_count: int,
        max_replica_count: int,
    ) -> None:
        """Deploy a vector search index to a vector search index endpoint.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
            index_endpoint_name (str): Required. Index endpoint to deploy the index
              to.
            deployed_index_id (str): Required. The user specified ID of the
              DeployedIndex.
            min_replica_count (int): Required. The minimum number of replicas to
              deploy.
            max_replica_count (int): Required. The maximum number of replicas to
              deploy.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        # Create the index endpoint instance from an existing endpoint.
        index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Deploy Index to Endpoint. Specifying min and max replica counts will
        # enable autoscaling.
        index_endpoint.deploy_index(
            index=index,
            deployed_index_id=deployed_index_id,
            min_replica_count=min_replica_count,
            max_replica_count=max_replica_count,
        )

### Console

You can only enable autoscaling from the console during index deployment.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. A list of your active indexes is displayed.
3. Select the name of the index you want to deploy. The index details page opens.
4. From the index details page, click **Deploy to endpoint**. The index deployment panel opens.
5. Enter a display name - this name acts as an ID and can't be updated.
6. From the **Endpoint** drop-down, select the endpoint you want to deploy this index to. Note: The endpoint is unavailable if the index is already deployed to it.
7. Optional: In the **Machine type** field, select either standard or high-memory.
8. Optional. Select **Enable autoscaling** to automatically resize the number of nodes based on the demands of your workloads. The default number of replicas is 2 if autoscaling is disabled.

- If both `minReplicaCount` and `maxReplicaCount` are not set, they are set to 2 by default.
- If only `maxReplicaCount` is set, `minReplicaCount` is set to 2 by default.
- If only `minReplicaCount` is set, `maxReplicaCount` is set to equal `minReplicaCount`.

> [!NOTE]
> **Note:** Google recommends that your `DeployedIndex` uses at least two replicas per shard. To do so, set `minReplicaCount` to 2.

## Mutate a `DeployedIndex`

You can use the `MutateDeployedIndex` API to update the deployment resources
(for example, `minReplicaCount` and `maxReplicaCount`) of an already deployed index.

- Users aren't allowed to change the `machineType` after the index is deployed.
- If `maxReplicaCount` isn't specified in the request, the `DeployedIndex` keeps using the existing `maxReplicaCount`.

### gcloud

The following example uses the [`gcloud ai index-endpoints mutate-deployed-index`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/index-endpoints/mutate-deployed-index) command.

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">MIN_REPLICA_COUNT</var>: Minimum number of machine replicas the deployed index will be always deployed on. If specified, the value must be equal to or larger than 1.
- <var translate="no">MAX_REPLICA_COUNT</var>: Maximum number of machine replicas the deployed index could be deployed on.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints mutate-deployed-index INDEX_ENDPOINT_ID \
    --deployed-index-id=DEPLOYED_INDEX_ID \
    --min-replica-count=MIN_REPLICA_COUNT \
    --max-replica-count=MAX_REPLICA_COUNT \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints mutate-deployed-index INDEX_ENDPOINT_ID `
    --deployed-index-id=DEPLOYED_INDEX_ID `
    --min-replica-count=MIN_REPLICA_COUNT `
    --max-replica-count=MAX_REPLICA_COUNT `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints mutate-deployed-index INDEX_ENDPOINT_ID ^
    --deployed-index-id=DEPLOYED_INDEX_ID ^
    --min-replica-count=MIN_REPLICA_COUNT ^
    --max-replica-count=MAX_REPLICA_COUNT ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">MIN_REPLICA_COUNT</var>: Minimum number of machine replicas the deployed index will be always deployed on. If specified, the value must be equal to or larger than 1.
- <var translate="no">MAX_REPLICA_COUNT</var>: Maximum number of machine replicas the deployed index could be deployed on.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:mutateDeployedIndex
```

Request JSON body:

```
{
  "deployedIndex": {
    "id": "DEPLOYED_INDEX_ID",
    "index": "projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID",
    "displayName": "DEPLOYED_INDEX_NAME",
    "min_replica_count": "MIN_REPLICA_COUNT",
    "max_replica_count": "MAX_REPLICA_COUNT"
  }
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:mutateDeployedIndex"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:mutateDeployedIndex" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
"name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID/operations/OPERATION_ID",
"metadata": {
  "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeployIndexOperationMetadata",
  "genericMetadata": {
    "createTime": "2020-10-19T17:53:16.502088Z",
    "updateTime": "2020-10-19T17:53:16.502088Z"
  },
  "deployedIndexId": "DEPLOYED_INDEX_ID"
}
}
```

### Terraform

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

For more information, see the
[Terraform provider reference documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs).

    provider "google" {
      region = "us-central1"
    }

    resource "google_vertex_ai_index_endpoint_deployed_index" "default" {
      depends_on        = [google_vertex_ai_index_endpoint.default]
      index_endpoint    = google_vertex_ai_index_endpoint.default.id
      index             = google_vertex_ai_index.default.id
      deployed_index_id = "deployed_index_for_mutate"
      # This example assumes the deployed index endpoint's resources configuration
      # differs from the values specified below. Terraform will mutate the deployed
      # index endpoint's resource configuration to match.
      automatic_resources {
        min_replica_count = 3
        max_replica_count = 5
      }
    }

    resource "google_vertex_ai_index_endpoint" "default" {
      display_name            = "sample-endpoint"
      description             = "A sample index endpoint with a public endpoint"
      region                  = "us-central1"
      public_endpoint_enabled = true
    }

    # Cloud Storage bucket name must be unique
    resource "random_id" "default" {
      byte_length = 8
    }

    # Create a Cloud Storage bucket
    resource "google_storage_bucket" "bucket" {
      name                        = "vertex-ai-index-bucket-${random_id.default.hex}"
      location                    = "us-central1"
      uniform_bucket_level_access = true
    }

    # Create index content
    resource "google_storage_bucket_object" "data" {
      name    = "contents/data.json"
      bucket  = google_storage_bucket.bucket.name
      content = <<EOF
    {"id": "42", "embedding": [0.5, 1.0], "restricts": [{"namespace": "class", "allow": ["cat", "pet"]},{"namespace": "category", "allow": ["feline"]}]}
    {"id": "43", "embedding": [0.6, 1.0], "restricts": [{"namespace": "class", "allow": ["dog", "pet"]},{"namespace": "category", "allow": ["canine"]}]}
    EOF
    }

    resource "google_vertex_ai_index" "default" {
      region       = "us-central1"
      display_name = "sample-index-batch-update"
      description  = "A sample index for batch update"
      labels = {
        foo = "bar"
      }

      metadata {
        contents_delta_uri = "gs://${google_storage_bucket.bucket.name}/contents"
        config {
          dimensions                  = 2
          approximate_neighbors_count = 150
          distance_measure_type       = "DOT_PRODUCT_DISTANCE"
          algorithm_config {
            tree_ah_config {
              leaf_node_embedding_count    = 500
              leaf_nodes_to_search_percent = 7
            }
          }
        }
      }
      index_update_method = "BATCH_UPDATE"

      timeouts {
        create = "2h"
        update = "1h"
      }
    }

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_mutate_deployed_index(
        project: str,
        location: str,
        index_endpoint_name: str,
        deployed_index_id: str,
        min_replica_count: int,
        max_replica_count: int,
    ) -> None:
        """Mutate the deployment resources of an already deployed index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_endpoint_name (str): Required. Index endpoint to run the query
              against.
            deployed_index_id (str): Required. The ID of the DeployedIndex to run
              the queries against.
            min_replica_count (int): Required. The minimum number of replicas to
              deploy.
            max_replica_count (int): Required. The maximum number of replicas to
              deploy.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index endpoint instance from an existing endpoint
        index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Mutate the deployed index
        index_endpoint.mutate_deployed_index(
            deployed_index_id=deployed_index_id,
            min_replica_count=min_replica_count,
            max_replica_count=max_replica_count,
        )

> [!NOTE]
> **Note:** Google recommends that your `DeployedIndex` uses at least two replicas per shard. To do so, set `minReplicaCount` to 2.

## Deployment settings that impact performance

The following deployment settings can affect latency, availability, and
cost when using Vector Search. This guidance applies to most cases.
However, always experiment with your configurations to make sure that they work
for your use case.

| Setting | Performance impact |
|---|---|
| Machine type | The hardware selection has a direct interaction with the shard size selected. Depending on shard choices you specified at index creation time, each machine type offers a tradeoff between performance and cost. Reference the pricing page to determine the hardware available and pricing. In general, performance increases in the following order: - E2 standard - E2 highmem - N1 standard - N2D standard |
| Minimum replica count | `minReplicaCount` reserves a minimum capacity for availability and latency to ensure that the system doesn't have cold start issues when traffic scales up quickly from low levels. If you have workloads that drop to low levels and then quickly increase to higher levels, consider setting `minReplicaCount` to a number that can accommodate the initial bursts of traffic. |
| Maximum replica count | `maxReplicaCount` primarily lets you control usage cost. You can choose to prevent increasing costs beyond a certain threshold, with the tradeoff of allowing increased latency and reducing availability. |

## List `IndexEndpoints`

To list your `IndexEndpoint` resources and view the information of
any associated `DeployedIndex` instances, run the following
code:

### gcloud

The following example uses the [`gcloud ai index-endpoints list` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/index-endpoints/list).

Before using any of the command data below,
make the following replacements:

- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints list \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints list `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints list ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "indexEndpoints": [
   {
     "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID",
     "displayName": "INDEX_ENDPOINT_DISPLAY_NAME",
     "deployedIndexes": [
       {
         "id": "DEPLOYED_INDEX_ID",
         "index": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID",
         "displayName": "DEPLOYED_INDEX_DISPLAY_NAME",
         "createTime": "2021-06-04T02:23:40.178286Z",
         "privateEndpoints": {
           "matchGrpcAddress": "GRPC_ADDRESS"
         },
         "indexSyncTime": "2022-01-13T04:22:00.151916Z",
         "automaticResources": {
           "minReplicaCount": 2,
           "maxReplicaCount": 10
         }
       }
     ],
     "etag": "AMEw9yP367UitPkLo-khZ1OQvqIK8Q0vLAzZVF7QjdZ5O3l7Zow-mzBo2l6xmiuuMljV",
     "createTime": "2021-03-17T04:47:28.460373Z",
     "updateTime": "2021-06-04T02:23:40.930513Z",
     "network": "VPC_NETWORK_NAME"
   }
 ]
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_list_index_endpoint(
        project: str, location: str
    ) -> List[aiplatform.MatchingEngineIndexEndpoint]:
        """List vector search index endpoints.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name

        Returns:
            List of aiplatform.MatchingEngineIndexEndpoint
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # List Index Endpoints
        return aiplatform.MatchingEngineIndexEndpoint.list()

### Console

Use these instructions to view a list of your index endpoints.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. On the top of the page, select the **Index endpoint** tab.
3. All of the existing index endpoints are displayed.

For more information, see the reference documentation for
[`IndexEndpoint`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.indexEndpoints).

## Undeploy an index

To undeploy an index from endpoint, run the following code:

### gcloud

The following example uses the [`gcloud ai index-endpoints undeploy-index` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/index-endpoints/undeploy-index).

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints undeploy-index INDEX_ENDPOINT_ID \
    --deployed-index-id=DEPLOYED_INDEX_ID \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints undeploy-index INDEX_ENDPOINT_ID `
    --deployed-index-id=DEPLOYED_INDEX_ID `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints undeploy-index INDEX_ENDPOINT_ID ^
    --deployed-index-id=DEPLOYED_INDEX_ID ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">DEPLOYED_INDEX_ID</var>: A user specified string to uniquely identify the deployed index. It must start with a letter and contain only letters, numbers or underscores. See [DeployedIndex.id](https://cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.DeployedIndex) for format guidelines.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:undeployIndex
```

Request JSON body:

```
{
 "deployed_index_id": "DEPLOYED_INDEX_ID"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:undeployIndex"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID:undeployIndex" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.UndeployIndexOperationMetadata",
   "genericMetadata": {
     "createTime": "2022-01-13T04:09:56.641107Z",
     "updateTime": "2022-01-13T04:09:56.641107Z"
   }
 }
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_undeploy_index(
        project: str,
        location: str,
        index_endpoint_name: str,
        deployed_index_id: str,
    ) -> None:
        """Mutate the deployment resources of an already deployed index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_endpoint_name (str): Required. Index endpoint to run the query
              against.
            deployed_index_id (str): Required. The ID of the DeployedIndex to run
              the queries against.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index endpoint instance from an existing endpoint
        index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Undeploy the index
        index_endpoint.undeploy_index(
            deployed_index_id=deployed_index_id,
        )

### Console

Use these instructions to undeploy an index from an endpoint.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. A list of your active indexes is displayed.
3. Select the index you want to undeploy. The index details page opens.
4. Under the **Deployed indexes** section, identify the index version you want to undeploy.
5. Click the options menu that is in the same row as the index and select **Undeploy**.
6. A confirmation screen opens. Click **Undeploy**. Note: It can take up to 30 minutes to be undeployed.

> [!NOTE]
> **Note:** It takes 10 to 20 minutes for Google backend jobs to clean up the deployment. You can't reuse the `DeployedIndex` ID until after the deployment is cleaned up.

## Delete an `IndexEndpoint`

Before you delete an `IndexEndpoint`, you must
[undeploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-public#undeploy-index) the all indexes that are deployed to the endpoint.

### gcloud

The following example uses the [`gcloud ai index-endpoints delete` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/index-endpoints/delete).

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints delete INDEX_ENDPOINT_ID \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints delete INDEX_ENDPOINT_ID `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai index-endpoints delete INDEX_ENDPOINT_ID ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ENDPOINT_ID</var>: The ID of the index endpoint.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
DELETE https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method DELETE `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexEndpoints/INDEX_ENDPOINT_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeleteOperationMetadata",
   "genericMetadata": {
     "createTime": "2022-01-13T04:36:19.142203Z",
     "updateTime": "2022-01-13T04:36:19.142203Z"
   }
 },
 "done": true,
 "response": {
   "@type": "type.googleapis.com/google.protobuf.Empty"
 }
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_delete_index_endpoint(
        project: str, location: str, index_endpoint_name: str, force: bool = False
    ) -> None:
        """Delete a vector search index endpoint.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_endpoint_name (str): Required. Index endpoint to run the query
              against.
            force (bool): Required. If true, undeploy any deployed indexes on this
              endpoint before deletion.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index endpoint instance from an existing endpoint
        index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Delete the index endpoint
        index_endpoint.delete(force=force)

### Console

Use these instructions to delete an index endpoint.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. On the top of the page, select the **Index endpoint** tab.
3. All of the existing index endpoints are displayed.
4. Click the options menu that is in the same row as the index you want to delete and select **Delete**.
5. A confirmation screen opens. Click **Delete**. Your index endpoint is now deleted.

> [!NOTE]
> **Note:** It takes 10 to 20 minutes for Google backend jobs to clean up the deployment. You can't reuse the `DeployedIndex` ID until after the deployment is cleaned up.
