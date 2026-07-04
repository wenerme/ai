The following sections describe how to configure, create, list, and delete your
indexes.

## Index overview

An index is a file or files consisting of your embedding vectors. These vectors
are made from large amounts of data you want to deploy and query with Vector Search.
With Vector Search, you can create two types of indexes,
depending on how you plan to update them with your data. You can create an index designed for
[batch updates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#create-index-batch), or an index designed for [streaming your updates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#create-stream-index).

A batch index is for when you want to update your index in a batch, with data
which has been stored over a set amount of time, like systems which are
processed weekly or monthly. A streaming index is when you want index data
to be updated as new data is added to your data store, for example, if you
have a bookstore and want to show new inventory online as soon as possible. Which
type you choose is important, since setup and requirements are different.

## Configure index parameters

Before you [create an
index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.indexes/create),
configure the parameters for your index.

For example, create a file named `index_metadata.json`:

```json
{
  "contentsDeltaUri": "gs://BUCKET_NAME/path",
  "config": {
    "dimensions": 100,
    "approximateNeighborsCount": 150,
    "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
    "shardSize": "SHARD_SIZE_MEDIUM",
    "algorithm_config": {
      "treeAhConfig": {
        "leafNodeEmbeddingCount": 5000,
        "fractionLeafNodesToSearch": 0.03
      }
    }
  }
}
```

You can find the definition for each of these fields in
[Index configuration parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes).

## Create an index

### Index size

Index data is split into equal parts called shards for processing. When you
create an index, you must specify the size of the shards to use. The supported
sizes, for dense and sparse embeddings combined, are as follows:

- `SHARD_SIZE_SMALL`: 2 GiB per shard.
- `SHARD_SIZE_MEDIUM`: 20 GiB per shard.
- `SHARD_SIZE_LARGE`: 50 GiB per shard.

For sparse embeddings, the supported sizes are 20% of the shard byte size.

The machine types that you can use to deploy your index
([using public endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-public) or
[using VPC endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-vpc))
depends on the shard size of the index. The following table shows the shard
sizes that each machine type supports:

| Machine type | `SHARD_SIZE_SMALL` | `SHARD_SIZE_MEDIUM` | `SHARD_SIZE_LARGE` |
|---|---|---|---|
| `n1-standard-16` | Yes | Yes |   |
| `n1-standard-32` | Yes | Yes | Yes |
| `e2-standard-2` | Yes (default) |   |   |
| `e2-standard-16` | Yes | Yes (default) |   |
| `e2-highmem-16` | Yes | Yes | Yes (default) |
| `n2d-standard-32` | Yes | Yes | Yes |

To learn how shard size and machine type affect pricing, see the
[Gemini Enterprise Agent Platform pricing page](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing#vector-search). To learn how
shard size impacts performance, see
[Configuration parameters that impact performance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#performance-parameters).

### Create an index for batch update

Use these instructions to create and deploy your index. If you don't have your
embeddings ready yet, you can skip to [Create an empty batch index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#create-empty-index-batch).
With this option, no embeddings data is required at index creation time.

> [!NOTE]
> **Note:** The `dimensions` field is relevant only to dense embeddings.

To [create an
index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.indexes/create):

### gcloud

Before using any of the command data below,
make the following replacements:

- <var translate="no">LOCAL_PATH_TO_METADATA_FILE</var>: The local path to the metadata file.
- <var translate="no">INDEX_NAME</var>: Display name for the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes create \
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE \
    --display-name=INDEX_NAME \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes create `
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE `
    --display-name=INDEX_NAME `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes create ^
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE ^
    --display-name=INDEX_NAME ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

You should receive a response similar to the following:

```
You can poll for the status of the operation for the response
to include "done": true. Use the following example to poll the status.

  $ gcloud ai operations describe 1234567890123456789 --project=my-test-project --region=us-central1
```

See [gcloud ai operations](https://docs.cloud.google.com/sdk/gcloud/reference/ai/operations/describe) to learn
more about the `describe` command.

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INPUT_DIR</var>: The Cloud Storage directory path of the index content.
- <var translate="no">INDEX_NAME</var>: Display name for the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes
```

Request JSON body:

```
{
  "display_name": "INDEX_NAME",
  "metadata": {
    "contentsDeltaUri": "INPUT_DIR",
    "config": {
      "dimensions": 100,
      "approximateNeighborsCount": 150,
      "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
      "algorithm_config": {
        "treeAhConfig": {
          "leafNodeEmbeddingCount": 500,
          "leafNodesToSearchPercent": 7
        }
      }
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1.CreateIndexOperationMetadata",
    "genericMetadata": {
      "createTime": "2022-01-08T01:21:10.147035Z",
      "updateTime": "2022-01-08T01:21:10.147035Z"
    }
  }
}
```

### Terraform

The following sample uses the [`google_vertex_ai_index`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vertex_ai_index) Terraform resource to create an index for batch updates.

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

    # Cloud Storage bucket name must be unique
    resource "random_id" "bucket_name_suffix" {
      byte_length = 8
    }

    # Create a Cloud Storage bucket
    resource "google_storage_bucket" "bucket" {
      name                        = "vertex-ai-index-bucket-${random_id.bucket_name_suffix.hex}"
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

    def vector_search_create_index(
        project: str, location: str, display_name: str, gcs_uri: Optional[str] = None
    ) -> aiplatform.MatchingEngineIndex:
        """Create a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            display_name (str): Required. The index display name
            gcs_uri (str): Optional. The Google Cloud Storage uri for index content

        Returns:
            The created MatchingEngineIndex.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create Index
        index = aiplatform.MatchingEngineIndex.create_tree_ah_index(
            display_name=display_name,
            contents_delta_uri=gcs_uri,
            description="Matching Engine Index",
            dimensions=100,
            approximate_neighbors_count=150,
            leaf_node_embedding_count=500,
            leaf_nodes_to_search_percent=7,
            index_update_method="BATCH_UPDATE",  # Options: STREAM_UPDATE, BATCH_UPDATE
            distance_measure_type=aiplatform.matching_engine.matching_engine_index_config.DistanceMeasureType.DOT_PRODUCT_DISTANCE,
        )

        return index

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Java API
reference documentation](https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreateIndexRequest.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.IndexUpdateMethod.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Value.html;
    import com.google.protobuf.util.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html;
    import java.util.concurrent.TimeUnit;

    public class CreateIndexSample {

      public static void main(String[] args) throws Exception {
        // TODO(developer): Replace these variables before running the sample.
        String project = "YOUR_PROJECT_ID";
        String location = "YOUR_LOCATION";
        String displayName = "YOUR_INDEX_DISPLAY_NAME";
        String contentsDeltaUri = "gs://YOUR_BUCKET/";
        String metadataJson =
            String.format(
                "{\n"
                    + "  \"contentsDeltaUri\": \"%s\",\n"
                    + "  \"config\": {\n"
                    + "    \"dimensions\": 100,\n"
                    + "        \"approximateNeighborsCount\": 150,\n"
                    + "        \"distanceMeasureType\": \"DOT_PRODUCT_DISTANCE\",\n"
                    + "        \"shardSize\": \"SHARD_SIZE_MEDIUM\",\n"
                    + "        \"algorithm_config\": {\n"
                    + "      \"treeAhConfig\": {\n"
                    + "        \"leafNodeEmbeddingCount\": 5000,\n"
                    + "            \"fractionLeafNodesToSearch\": 0.03\n"
                    + "      }\n"
                    + "    }\n"
                    + "  }\n"
                    + "}",
                contentsDeltaUri);

        createIndexSample(project, location, displayName, metadataJson);
      }

      public static https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html createIndexSample(
          String project, String location, String displayName, String metadataJson) throws Exception {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html indexServiceClient =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html.create(
                https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html.newBuilder()
                    .setEndpoint(location + "-aiplatform.googleapis.com:443")
                    .build())) {
          https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Value.html.Builder metadataBuilder = https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Value.html.newBuilder();
          https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html.parser().merge(metadataJson, metadataBuilder);

          https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreateIndexRequest.html request =
              https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreateIndexRequest.html.newBuilder()
                  .setParent(https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html.of(project, location).toString())
                  .setIndex(
                      https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html.newBuilder()
                          .setDisplayName(displayName)
                          .setMetadata(metadataBuilder)
                          .https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.Builder.html#com_google_cloud_aiplatform_v1_Index_Builder_setIndexUpdateMethod_com_google_cloud_aiplatform_v1_Index_IndexUpdateMethod_(https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.IndexUpdateMethod.html.BATCH_UPDATE))
                  .build();

          return indexServiceClient.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html#com_google_cloud_aiplatform_v1_IndexServiceClient_createIndexAsync_com_google_cloud_aiplatform_v1_CreateIndexRequest_(request).get(5, TimeUnit.MINUTES);
        }
      }
    }

### Console

Use these instructions to create an index for batch updates.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Click **Create new index** to open the **Index** pane. The **Create a new index** pane appears.
3. In the **Display name** field, provide a name to uniquely identify your index.
4. In the **Description** field, provide a description for what the index is for.
5. In the **Region** field, select a region from the drop-down.
6. In the Cloud Storage field, search and select the Cloud Storage folder where your vector data is stored.
7. In the **Algorithm type** drop-down, select the algorithm type that Vector Search uses for efficient search. If you select the treeAh algorithm, enter the approximate neighbors count.
8. In the **Dimensions** field, enter the number of dimensions of your input vectors.
9. In the **Update method** field, select **Batch**.
10. In the **Shard size** field, select from the drop-down the shard size you want.
11. Click **Create**. Your new index appears in your list of indexes once it's ready. Note: Build time can take up to an hour to complete.

#### Create an empty batch index

To create and deploy your index right away, you can create an empty batch index.
With this option, no embeddings data is required at index creation time.

To create an empty index, the request is almost identical to creating an index
for batch updates. The difference is you remove the `contentsDeltaUri` field,
since you aren't linking a data location. Here's an empty batch index example:

#### Empty index request example

```
{
  "display_name": INDEX_NAME,
  "indexUpdateMethod": "BATCH_UPDATE",
  "metadata": {
    "config": {
      "dimensions": 100,
      "approximateNeighborsCount": 150,
      "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
      "algorithm_config": {
        "treeAhConfig": {
          "leafNodeEmbeddingCount": 500,
          "fractionLeafNodesToSearch": 0.07
        }
      }
    }
  }
}

```

### Create an index for streaming updates

Use these instructions to create and deploy your streaming index. If you don't
have your embeddings ready yet, skip to [Create an empty index for streaming updates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#create-stream-index-empty).
With this option, no embeddings data is required at index creation time.

> [!NOTE]
> **Note:** The `dimensions` field is relevant only to dense embeddings.

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_NAME</var>: Display name for the index.
- <var translate="no">DESCRIPTION</var>: A description of the index.
- <var translate="no">INPUT_DIR</var>: The Cloud Storage directory path of the index content.
- <var translate="no">DIMENSIONS</var>: Number of dimensions of the embedding vector.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.

HTTP method and URL:

```
POST https://ENDPOINT-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes
```

Request JSON body:

```
{
  displayName: "INDEX_NAME",
  description: "DESCRIPTION",
  metadata: {
     contentsDeltaUri: "INPUT_DIR",
     config: {
        dimensions: "DIMENSIONS",
        approximateNeighborsCount: 150,
        distanceMeasureType: "DOT_PRODUCT_DISTANCE",
        algorithmConfig: {treeAhConfig: {leafNodeEmbeddingCount: 10000, leafNodesToSearchPercent: 2}}
     },
  },
  indexUpdateMethod: "STREAM_UPDATE"
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
     "https://ENDPOINT-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes"
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
    -Uri "https://ENDPOINT-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "name": "projects/PROJECT_NUMBER/locations/LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.ui.CreateIndexOperationMetadata",
    "genericMetadata": {
      "createTime": "2023-12-05T23:17:45.416117Z",
      "updateTime": "2023-12-05T23:17:45.416117Z",
      "state": "RUNNING",
      "worksOn": [
        "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID"
      ]
    }
  }
}
```

### Terraform

The following sample uses the [`google_vertex_ai_index`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vertex_ai_index) Terraform resource to create an index for streaming updates.

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

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

    resource "google_vertex_ai_index" "streaming_index" {
      region       = "us-central1"
      display_name = "sample-index-streaming-update"
      description  = "A sample index for streaming update"
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
      index_update_method = "STREAM_UPDATE"

      timeouts {
        create = "2h"
        update = "1h"
      }
    }

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_create_streaming_index(
        project: str, location: str, display_name: str, gcs_uri: Optional[str] = None
    ) -> aiplatform.MatchingEngineIndex:
        """Create a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            display_name (str): Required. The index display name
            gcs_uri (str): Optional. The Google Cloud Storage uri for index content

        Returns:
            The created MatchingEngineIndex.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create Index
        index = aiplatform.MatchingEngineIndex.create_tree_ah_index(
            display_name=display_name,
            contents_delta_uri=gcs_uri,
            description="Matching Engine Index",
            dimensions=100,
            approximate_neighbors_count=150,
            leaf_node_embedding_count=500,
            leaf_nodes_to_search_percent=7,
            index_update_method="STREAM_UPDATE",  # Options: STREAM_UPDATE, BATCH_UPDATE
            distance_measure_type=aiplatform.matching_engine.matching_engine_index_config.DistanceMeasureType.DOT_PRODUCT_DISTANCE,
        )

        return index

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Java API
reference documentation](https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreateIndexRequest.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.IndexUpdateMethod.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Value.html;
    import com.google.protobuf.util.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html;
    import java.util.concurrent.TimeUnit;

    public class CreateStreamingIndexSample {

      public static void main(String[] args) throws Exception {
        // TODO(developer): Replace these variables before running the sample.
        String project = "YOUR_PROJECT_ID";
        String location = "YOUR_LOCATION";
        String displayName = "YOUR_INDEX_DISPLAY_NAME";
        String contentsDeltaUri = "gs://YOUR_BUCKET/";
        String metadataJson =
            String.format(
                "{\n"
                    + "  \"contentsDeltaUri\": \"%s\",\n"
                    + "  \"config\": {\n"
                    + "    \"dimensions\": 100,\n"
                    + "        \"approximateNeighborsCount\": 150,\n"
                    + "        \"distanceMeasureType\": \"DOT_PRODUCT_DISTANCE\",\n"
                    + "        \"shardSize\": \"SHARD_SIZE_MEDIUM\",\n"
                    + "        \"algorithm_config\": {\n"
                    + "      \"treeAhConfig\": {\n"
                    + "        \"leafNodeEmbeddingCount\": 5000,\n"
                    + "            \"fractionLeafNodesToSearch\": 0.03\n"
                    + "      }\n"
                    + "    }\n"
                    + "  }\n"
                    + "}",
                contentsDeltaUri);

        createStreamingIndexSample(project, location, displayName, metadataJson);
      }

      public static https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html createStreamingIndexSample(
          String project, String location, String displayName, String metadataJson) throws Exception {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html indexServiceClient =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html.create(
                https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html.newBuilder()
                    .setEndpoint(location + "-aiplatform.googleapis.com:443")
                    .build())) {
          https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Value.html.Builder metadataBuilder = https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Value.html.newBuilder();
          https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html.parser().merge(metadataJson, metadataBuilder);

          https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreateIndexRequest.html request =
              https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreateIndexRequest.html.newBuilder()
                  .setParent(https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html.of(project, location).toString())
                  .setIndex(
                      https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html.newBuilder()
                          .setDisplayName(displayName)
                          .setMetadata(metadataBuilder)
                          .https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.Builder.html#com_google_cloud_aiplatform_v1_Index_Builder_setIndexUpdateMethod_com_google_cloud_aiplatform_v1_Index_IndexUpdateMethod_(https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.IndexUpdateMethod.html.STREAM_UPDATE))
                  .build();

          return indexServiceClient.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html#com_google_cloud_aiplatform_v1_IndexServiceClient_createIndexAsync_com_google_cloud_aiplatform_v1_CreateIndexRequest_(request).get(5, TimeUnit.MINUTES);
        }
      }
    }

### Console

Use these instructions to create an index for streaming updates in the Google Cloud console.

To [create an index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.indexes/create) available
for Streaming Updates requires similar steps to setting up a Batch Update index,
except you need to set `indexUpdateMethod` to `STREAM_UPDATE`.

1. In the Agent Platform section of the Google Cloud console, go to
   the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Click **Create new index** to open the **Index** pane. The **Create a new index** pane appears.
3. In the **Display name** field, provide a name to uniquely identify your index.
4. In the **Description** field, provide a description for what the index is for.
5. In the **Region** field, select a region from the drop-down.
6. In the Cloud Storage field, search and select the Cloud Storage folder where your vector data is stored.
7. In the **Algorithm type** drop-down, select the algorithm type that Vector Search will use to perform your search. If you select the treeAh algorithm, enter the approximate neighbors count.
8. In the **Dimensions** field, enter the number of dimensions of your input vectors.
9. In the **Update method** field, select **Stream**.
10. In the **Shard size** field, select from the drop-down the shard size you want.
11. Click **Create**. Your new index appears in your list of indexes once it's ready. Note: Build time can take up to an hour to complete.

#### Create an empty index for streaming updates

To create and deploy your index right away, you can create an empty index for streaming.
With this option, no embeddings data is required at index creation time.

To create an empty index, the request is almost identical to creating an index
for streaming. The difference is you remove the `contentsDeltaUri` field,
since you aren't linking a data location. Here's an empty streaming index example:

#### Empty index request example

```
{
  "display_name": INDEX_NAME,
  "indexUpdateMethod": "STREAM_UPDATE",
  "metadata": {
    "config": {
      "dimensions": 100,
      "approximateNeighborsCount": 150,
      "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
      "algorithm_config": {
        "treeAhConfig": {
          "leafNodeEmbeddingCount": 500,
          "leafNodesToSearchPercent": 7
        }
      }
    }
  }
}

```

## List indexes

### gcloud

Before using any of the command data below,
make the following replacements:

- <var translate="no">INDEX_NAME</var>: Display name for the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

Execute the

following

command:

#### Linux, macOS, or Cloud Shell

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes list \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes list `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes list ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

You should receive a response similar to the following:

```
You can poll for the status of the operation for the response
to include "done": true. Use the following example to poll the status.

  $ gcloud ai operations describe 1234567890123456789 --project=my-test-project --region=us-central1
```

See [gcloud ai operations](https://docs.cloud.google.com/sdk/gcloud/reference/ai/operations/describe) to learn
more about the `describe` command.

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_NAME</var>: Display name for the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "indexes": [
   {
     "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID",
     "displayName": "INDEX_NAME",
     "metadataSchemaUri": "gs://google-cloud-aiplatform/schema/matchingengine/metadata/nearest_neighbor_search_1.0.0.yaml",
     "metadata": {
       "config": {
         "dimensions": 100,
         "approximateNeighborsCount": 150,
         "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
         "featureNormType": "NONE",
         "algorithmConfig": {
           "treeAhConfig": {
             "maxLeavesToSearch": 50,
             "leafNodeCount": 10000
           }
         }
       }
     },
     "etag": "AMEw9yNU8YX5IvwuINeBkVv3yNa7VGKk11GBQ8GkfRoVvO7LgRUeOo0qobYWuU9DiEc=",
     "createTime": "2020-11-08T21:56:30.558449Z",
     "updateTime": "2020-11-08T22:39:25.048623Z"
   }
 ]
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_list_index(
        project: str, location: str
    ) -> List[aiplatform.MatchingEngineIndex]:
        """List vector search indexes.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name

        Returns:
            List of aiplatform.MatchingEngineIndex
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # List Indexes
        return aiplatform.MatchingEngineIndex.list()

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Java API
reference documentation](https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.ListIndexesPagedResponse.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html;

    public class ListIndexesSample {

      public static void main(String[] args) throws Exception {
        // TODO(developer): Replace these variables before running the sample.
        String project = "YOUR_PROJECT_ID";
        String location = "YOUR_LOCATION";

        for (https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.Index.html index : listIndexesSample(project, location).iterateAll()) {
          System.out.println(index.getName());
        }
      }

      public static https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.ListIndexesPagedResponse.html listIndexesSample(String project, String location)
          throws Exception {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html indexServiceClient =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html.create(
                https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html.newBuilder()
                    .setEndpoint(location + "-aiplatform.googleapis.com:443")
                    .build())) {
          String parent = https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html.of(project, location).toString();
          return indexServiceClient.listIndexes(parent);
        }
      }
    }

### Console

Use these instructions to view a list of your indexes.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. A list of your active indexes is displayed.

## Tuning the index

Tuning the index requires setting the configuration parameters that impact the
performance of deployed indexes, especially recall and latency. These
parameters are set when you first create the index. You can
[use brute-force indexes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#brute-force-index) to measure recall.

### Configuration parameters that impact performance

The following configuration parameters can be set at index creation time and
can affect recall, latency, availability, and cost when using
Vector Search. This guidance applies to most cases. However, always
experiment with your configurations to make sure that they work for your use
case.

For parameter definitions, see [Index configuration parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes).

| Parameter | About | Performance impact |
|---|---|---|
| `shardSize` | Controls the amount of data on each machine. When choosing a shard size, estimate how large your dataset will be in the future. If the size of your dataset has an upper bound, pick the appropriate shard size to accommodate it. If there is no upper bound or if your use case is extremely sensitive to latency variability, choosing a large shard size is recommended. | If you configure for a larger number of *smaller* shards, a larger number of candidate results are processed during search. More shards can affect performance in the following ways: - Recall: Increased - Latency: Potentially increased, more variability - Availability: Shard outages affect a smaller percentage of data - Cost: Can increase if the same machine type is used with more shards If you configure for a smaller number of *larger* shards, fewer candidate results are processed during search. Fewer shards can affect performance in the following ways: - Recall: Decreased - Latency: Reduced, less variability - Availability: Shard outages affect a larger percentage of data - Cost: Can decrease if the same machine type is used with fewer shards |
| `distanceMeasureType` | Determines the algorithm used for distance calculation between data points and the query vector. | The following `distanceMeasureType` settings can help reduce query latency: - `DOT_PRODUCT_DISTANCE` is most optimized for reducing latency - `DOT_PRODUCT_DISTANCE` combined with setting `FeatureNormType` to `UNIT_L2_NORM` is recommended for cosine similarity |
| `leafNodeEmbeddingCount` | The number of embeddings for each leaf node. By default, this number is set to 1000. Generally, changing the value of `leafNodeEmbeddingCount` has less effect than changing the value of other parameters. | *Increasing* the number of embeddings for each leaf node can reduce latency but reduce recall quality. It can affect performance in the following ways: - Recall: Decreased due to less targeted search - Latency: Reduced, as long as the value is not \>15k for most use cases - Availability: No impact - Cost: Can decrease because fewer replicas are needed for the same QPS *Decreasing* the number of embeddings for each leaf node can affect performance in the following ways: - Recall: Can increase because more targeted leafs are collected - Latency: Increased - Availability: No impact - Cost: Can increase because more replicas are needed for the same QPS |

### Using a brute-force index to measure recall

To get the exact nearest neighbors, use indexes with the brute-force algorithm.
The brute-force algorithm provides 100% recall at the expense of higher latency.
Using a brute-force index to measure recall is usually not a good choice for
production serving, but you might find it useful for evaluating the recall of
various indexing options offline.

To create an index with the brute-force algorithm, specify
`brute_force_config` in the index metadata:

```sh
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer `gcloud auth print-access-token`" \
https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/indexes \
-d '{
    displayName: "'${DISPLAY_NAME}'",
    description: "'${DESCRIPTION}'",
    metadata: {
       contentsDeltaUri: "'${INPUT_DIR}'",
       config: {
          dimensions: 100,
          approximateNeighborsCount: 150,
          distanceMeasureType: "DOT_PRODUCT_DISTANCE",
          featureNormType: "UNIT_L2_NORM",
          algorithmConfig: {
             bruteForceConfig: {}
          }
       },
    },
}'
```

## Delete an index

> [!NOTE]
> **Note:** You can't delete the `index` until all its `index.deployed_indexes` have been undeployed.

### gcloud

Before using any of the command data below,
make the following replacements:

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
gcloud ai indexes delete INDEX_ID \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes delete INDEX_ID `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes delete INDEX_ID ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
DELETE https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeleteOperationMetadata",
    "genericMetadata": {
      "createTime": "2022-01-08T02:35:56.364956Z",
      "updateTime": "2022-01-08T02:35:56.364956Z"
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

    def vector_search_delete_index(
        project: str, location: str, index_name: str
    ) -> None:
        """Delete a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        # Delete the index
        index.delete()

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Java API
reference documentation](https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexName.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html;
    import java.util.concurrent.TimeUnit;

    public class DeleteIndexSample {

      public static void main(String[] args) throws Exception {
        // TODO(developer): Replace these variables before running the sample.
        String project = "YOUR_PROJECT_ID";
        String location = "YOUR_LOCATION";
        String indexId = "YOUR_INDEX_ID";

        deleteIndexSample(project, location, indexId);
      }

      public static void deleteIndexSample(String project, String location, String indexId)
          throws Exception {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html indexServiceClient =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html.create(
                https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceSettings.html.newBuilder()
                    .setEndpoint(location + "-aiplatform.googleapis.com:443")
                    .build())) {
          String indexName = https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexName.html.of(project, location, indexId).toString();
          indexServiceClient.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.IndexServiceClient.html#com_google_cloud_aiplatform_v1_IndexServiceClient_deleteIndexAsync_com_google_cloud_aiplatform_v1_DeleteIndexRequest_(indexName).get(5, TimeUnit.MINUTES);
        }
      }
    }

### Console

Use these instructions to delete one or more indexes.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. A list of your active indexes is displayed.
3. To delete an index, go to the options menu that is in the same row as the index and select **Delete**.

## What's next

- Learn about [Index configuration parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes)
- Learn how to [Deploy and manage public index endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-public)
- Learn how to [Deploy and manage index endpoints in a VPC network](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-vpc)
- Learn how to [Update and rebuild your index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index)
- Learn how to [Monitor an index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/monitor)
