With large search queries, updating your indexes is important to always
have the most accurate information. You can update your
Vector Search indexes in a few different ways:

- [Replace an entire index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index#replace-index)
- [Partially update a batch index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index#update-batch)
- [Partially update a streaming index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index#update-streaming)
- [Update index metadata](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index#update-metadata)

## Replace an entire index

To replace the content of an existing batch update or streaming `Index`,
use the `IndexService.UpdateIndex` method.

- Set `Index.metadata.contentsDeltaUri` to the Cloud Storage URI that includes the vectors you want to update.
- Set `Index.metadata.isCompleteOverwrite` to true. When set to true, the entire index is completely overwritten with the new metadata file that you provide.

### gcloud

1. [Update your index metadata file](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#index-metadata-file) to set `contentsDeltaUri` and `isCompleteOverwrite=true`.

2. Use the [`gcloud ai indexes update` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/indexes/update).

Before using any of the command data below,
make the following replacements:

- <var translate="no">LOCAL_PATH_TO_METADATA_FILE</var>: The local path to the metadata file.
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
gcloud ai indexes update INDEX_ID \
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes update INDEX_ID `
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes update INDEX_ID ^
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INPUT_DIR</var>: The Cloud Storage directory path of the index content.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID
```

Request JSON body:

```
{
 "metadata": {
   "contentsDeltaUri": "INPUT_DIR",
   "isCompleteOverwrite": true
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
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID"
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
    -Method PATCH `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.UpdateIndexOperationMetadata",
   "genericMetadata": {
     "createTime": "2022-01-12T23:56:14.480948Z",
     "updateTime": "2022-01-12T23:56:14.480948Z"
   }
 }
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

When invoking the method below, set `is_complete_overwrite=True` to fully replace the contents of the index.

    def vector_search_update_index_embeddings(
        project: str,
        location: str,
        index_name: str,
        gcs_uri: str,
        is_complete_overwrite: Optional[bool] = None,
    ) -> None:
        """Update a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
            gcs_uri (str): Required. The Google Cloud Storage uri for index content
            is_complete_overwrite (bool): Optional. If true, the index content will
              be overwritten wth the contents at gcs_uri.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        index.update_embeddings(
            contents_delta_uri=gcs_uri, is_complete_overwrite=is_complete_overwrite
        )

### Console

Use these instructions to update a batch index content.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Select the index you want to update. The **Index info** page opens.
3. Select **Edit Index**. An edit index pane opens.
4. In the Cloud Storage field, search and select the Cloud Storage folder where your vector data is stored.
5. Check the complete overwrite box to overwrite all the existing data.
6. Click **Update**
7. Click **Done** to close out the panel.

## Partially update a batch index

To update the embeddings of an existing batch `Index`, use the
`IndexService.UpdateIndex` method.

- Set `Index.metadata.contentsDeltaUri` to the Cloud Storage URI that includes the vectors you want to update.
- Set `Index.metadata.isCompleteOverwrite` to false.

Only the vectors specified in `Index.metadata.contentsDeltaUri` are updated,
inserted, or deleted. The other existing embeddings in the index remain.

### gcloud

1. [Update your index metadata file](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#index-metadata-file) to set `contentsDeltaUri`.

2. Use the [`gcloud ai indexes update` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/indexes/update).

Before using any of the command data below,
make the following replacements:

- <var translate="no">LOCAL_PATH_TO_METADATA_FILE</var>: The local path to the metadata file.
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
gcloud ai indexes update INDEX_ID \
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes update INDEX_ID `
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes update INDEX_ID ^
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INPUT_DIR</var>: The Cloud Storage directory path of the index content.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID
```

Request JSON body:

```
{
 "metadata": {
   "contentsDeltaUri": "INPUT_DIR",
   "isCompleteOverwrite": false
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
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID"
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
    -Method PATCH `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.UpdateIndexOperationMetadata",
   "genericMetadata": {
     "createTime": "2022-01-12T23:56:14.480948Z",
     "updateTime": "2022-01-12T23:56:14.480948Z"
   }
 }
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

When invoking the method below, set `is_complete_overwrite=False`.

    def vector_search_update_index_embeddings(
        project: str,
        location: str,
        index_name: str,
        gcs_uri: str,
        is_complete_overwrite: Optional[bool] = None,
    ) -> None:
        """Update a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
            gcs_uri (str): Required. The Google Cloud Storage uri for index content
            is_complete_overwrite (bool): Optional. If true, the index content will
              be overwritten wth the contents at gcs_uri.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        index.update_embeddings(
            contents_delta_uri=gcs_uri, is_complete_overwrite=is_complete_overwrite
        )

### Console

Use these instructions to update a batch index content.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Select the index you want to update. The **Index info** page opens.
3. Select **Edit Index**. An edit index pane opens.
4. In the Cloud Storage field, search and select the Cloud Storage folder where your vector data is stored.
5. Ensure the complete overwrite box is clear.
6. Click **Update**
7. Click **Done** to close out the panel.

If the `Index` has any associated deployments
(see the `Index.deployed_indexes` field), then when certain changes to the
original `Index` are done, the `DeployedIndex` is automatically updated
asynchronously in the background to reflect these changes.

To check whether the change has been propagated, compare the update index
operation finish time and the `DeployedIndex.index_sync_time`.

> [!NOTE]
> **Note:** For batch indexes, datapoint deletion is delayed until [compaction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index#index-compaction) occurs. In addition, datapoint updates to batch indexes temporarily increase the embedding count until compaction occurs.

## Partially update a streaming index

With streaming updates, you can update and query your index within a few seconds.
At this time, you can't use streaming updates on an existing batch update index,
you must create a new index. See [Create an index for streaming update](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index)
to learn more.

You are charged $0.45 per GB used for streaming updates.
To learn more about pricing, see the [Agent Platform pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).
Streaming updates are directly applied to the deployed indexes in memory,
which are then reflected in query results after a short delay.

> [!NOTE]
> **Note:** After you've created an index for streaming updates, you can't perform a batch update on this index. You can perform a complete overwrite to use the index or you can create a new index prepared for batch updates. See [Create an index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#create-index) to learn more.

### Upsert data points

Use these samples to see how to upsert a data point. Remember, `upsert-datapoints`
accepts JSON in array format only.

### Python

### Python

    def vector_search_upsert_datapoints(
        project: str,
        location: str,
        index_name: str,
        datapoints: Sequence[aiplatform.compat.types.index_v1beta1.IndexDatapoint],
    ) -> None:
        """Upsert datapoints to the index.

        Args:
          project (str): Required. The Project ID
          location (str): Required. The region name, e.g. "us-central1"
          index_name (str): Required. The index to update. A fully-qualified index
            resource name or a index ID.  Example:
            "projects/123/locations/us-central1/indexes/my_index_id" or
            "my_index_id".
          datapoints: Sequence[IndexDatapoint]: Required. The datapoints to be
            updated. For example:
            [IndexDatapoint(datapoint_id="1", feature_vector=[1.0, 2.0, 3.0]),
            IndexDatapoint(datapoint_id="2", feature_vector=[4.0, 5.0, 6.0])]
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index with stream_update
        # enabled
        my_index = aiplatform.MatchingEngineIndex(index_name=index_name)

        # Upsert the datapoints to the index
        my_index.upsert_datapoints(datapoints=datapoints)

### Curl

The throughput quota limit relates to the amount of data that is included in an upsert.
If the data point ID exists in the index, the embedding is updated, otherwise,
a new embedding is added.

      DATAPOINT_ID_1=
      DATAPOINT_ID_2=
      curl -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexes/${INDEX_ID}:upsertDatapoints \
      -d '{datapoints: [{datapoint_id: "'${DATAPOINT_ID_1}'", feature_vector: [...]},
      {datapoint_id: "'${DATAPOINT_ID_2}'", feature_vector: [...]}]}'

With hybrid search, sparse and dense emebdding representations for a
datapoint are supported. In an upsert operation, omitting a dense embedding deletes the dense
representation, and omitting a sparse embedding deletes the sparse representation.

This example updates both dense embeddings and sparse embeddings.

        curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`"  https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexes/${INDEX_ID}:upsertDatapoints -d '{datapoints: [{datapoint_id: "111", feature_vector: [0.111, 0.111], "sparse_embedding": {"values": [111.0,111.1,111.2], "dimensions": [10,20,30]}}]}'

This example updates dense embeddings and removes sparse embeddings.

          curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`"  https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexes/${INDEX_ID}:upsertDatapoints -d '{datapoints: [{datapoint_id: "111", feature_vector: [0.111, 0.111]}]}'

This example updates sparse embeddings and removes dense embeddings.

          curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`"  https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexes/${INDEX_ID}:upsertDatapoints -d '{datapoints: [{datapoint_id: "111",  "sparse_embedding": {"values": [111.0,111.1,111.2], "dimensions": [10,20,30]}}]}'

### Console

### Console

Use these instructions to update content to a streaming index.

1. In Google Cloud console, go to the **Vector Search** page.

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Select the index you want to update. The **Index info** page opens.
3. Click **Edit Index**. An edit index pane opens.
4. From the pane, select the **Upsert data point** tab for adding content.
5. Enter the data point ID.
6. Enter at least one type of embedding:
   - **Dense embedding** : Enter an array of comma-separated floating point values. The number of values must match the [index's dimensions.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes)
   - **Sparse embedding**:
     1. Enter sparse embedding dimensions as an array of comma-separated integers. The number of values doesn't have to match the index's dimensions.
     2. Enter values as an array of comma-separated floating point values. The number of values must match the number of sparse embedding dimensions.
7. Optional: To enable filtering by token restricts on this data point, click **Add token restrict**, and then enter a namespace and comma-separated strings as tokens.
8. Optional: To enable filtering by numeric restricts on this data point, click **Add numeric restrict**, enter a namespace, select a number type, and enter a value.
9. Optional: To help prevent many similar results, enter a crowding tag string.
10. Click **Upsert**.
11. Click **Done** to close out the panel.

The throughput quota limit relates to the amount of data that is included in an upsert.
If the data point ID exists in the index, the embedding is updated, otherwise,
a new embedding is added.

### Update embedding metadata

There are many reasons you might need to update streaming restricts or numeric
restricts. For example, when dealing with high-volume, fast-moving data, you might
want to prioritize certain data streams. Directly updating restricts or numeric
restricts lets you refine the focus in real-time, ensuring the most important
data is processed or highlighted immediately.

You can directly update data point restricts and numeric restricts inside a streaming
index without the compaction cost of full update.

To perform these metadata-only updates, you need to add the field `update_mask`
to the request. The value of `update_mask` must be set to `all_restricts`.
The restrict and numeric restrict values set in the data points should be
the new values you want to apply in the update.

The following example shows how to add restricts to two existing data points.

    DATAPOINT_ID_1=
    DATAPOINT_ID_2=

    curl -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexes/${INDEX_ID}:upsertDatapoints \
    -d '{datapoints:
    [{datapoint_id: "'${DATAPOINT_ID_1}'", feature_vector: [...],  restricts:[{namespace: "color", allow_list: ["red"]}]},
    {datapoint_id: "'${DATAPOINT_ID_2}'", feature_vector: [...],  restricts:[{namespace: "color", allow_list: ["red"]}]}
    ], update_mask: "all_restricts"}'

### Remove data points

You might need to remove data points from your streaming index. You can
do this using curl or from the Google Cloud console.

A key use case for deleting a data point from an index is to maintain
parity between the index and its real-world source. Consider a
bookseller who uses a vector embedding to represent their book inventory for
search and recommendation purposes. When a book is sold out or removed from
stock, deleting its corresponding data point from the index ensures that search
results and recommendations remain accurate and up-to-date.

### Curl

    curl -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{REGION}/indexes/{INDEX_ID}:removeDatapoints -d '{datapoint_ids: ["'{DATAPOINT_ID_1}'", "'{DATAPOINT_ID_2}'"]}'

### Console

### Console

Use these instructions to delete a data point from streaming index.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Select the streaming index you want to update. The **Index info** page opens.
3. Select **Edit Index**. An edit index pane opens.
4. From the pane, select the **Remove data points** tab.
5. Add up to 20 data points by providing a comma delimited list of data point IDs
6. Click **Remove**.
7. Click **Done** to close out the panel.

### Python

### Python

    def vector_search_remove_datapoints(
        project: str,
        location: str,
        index_name: str,
        datapoint_ids: Sequence[str],
    ) -> None:
        """Remove datapoints from a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
            datapoint_ids (Sequence[str]): Required. The datapoint IDs to remove.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        index.remove_datapoints(datapoint_ids=datapoint_ids)

## Update index metadata

`IndexService.UpdateIndex` can also be used to update the metadata fields
`display_name`, `description`, and `labels` for batch and streaming indexes. Note
that a single call to `UpdateIndex` can update the index embeddings *or* these
metadata fields, but not both at once.

### gcloud

1. [Update your index metadata file](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#index-metadata-file).

2. Use the [`gcloud ai indexes update` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/indexes/update).

Before using any of the command data below,
make the following replacements:

- <var translate="no">LOCAL_PATH_TO_METADATA_FILE</var>: The local path to the metadata file.
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
gcloud ai indexes update INDEX_ID \
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE \
    --region=LOCATION \
    --project=PROJECT_ID
```

#### Windows (PowerShell)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes update INDEX_ID `
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE `
    --region=LOCATION `
    --project=PROJECT_ID
```

#### Windows (cmd.exe)

> [!NOTE]
> **Note:** Ensure you have initialized the Google Cloud CLI with authentication and a project by running either [gcloud init](https://docs.cloud.google.com/sdk/gcloud/reference/init); or [gcloud auth login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) and [gcloud config set project](https://docs.cloud.google.com/sdk/gcloud/reference/config/set).

```bash
gcloud ai indexes update INDEX_ID ^
    --metadata-file=LOCAL_PATH_TO_METADATA_FILE ^
    --region=LOCATION ^
    --project=PROJECT_ID
```

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">INPUT_DIR</var>: The Cloud Storage directory path of the index content.
- <var translate="no">INDEX_ID</var>: The ID of the index.
- <var translate="no">LOCATION</var>: The region where you are using Agent Platform.
- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">PROJECT_NUMBER</var>: Your project's automatically generated [project number](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID
```

Request JSON body:

```
{
 "metadata": {
   "description": "Updated description",
   "display_name": "Updated display name"
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
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID"
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
    -Method PATCH `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/indexes/INDEX_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
 "name": "projects/PROJECT_NUMBER/locations/LOCATION/indexes/INDEX_ID/operations/OPERATION_ID",
 "metadata": {
   "@type": "type.googleapis.com/google.cloud.aiplatform.v1.UpdateIndexOperationMetadata",
   "genericMetadata": {
     "createTime": "2022-01-12T23:56:14.480948Z",
     "updateTime": "2022-01-12T23:56:14.480948Z"
   }
 }
}
```

### Python

    def vector_search_update_index_metadata(
        project: str,
        location: str,
        index_name: str,
        display_name: Optional[str] = None,
        description: Optional[str] = None,
        labels: Optional[Dict[str, str]] = None,
    ) -> None:
        """Update a vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_name (str): Required. The index to update. A fully-qualified index
              resource name or a index ID.  Example:
              "projects/123/locations/us-central1/indexes/my_index_id" or
              "my_index_id".
            display_name (str): Optional. The display name of the Index. The name
              can be up to 128 characters long and can be consist of any UTF-8
              characters.
            description (str): Optional. The description of the Index.
            labels (Dict[str, str]): Optional. The labels with user-defined
              metadata to organize your Indexs. Label keys and values can be no
              longer than 64 characters (Unicode codepoints), can only contain
              lowercase letters, numeric characters, underscores and dashes.
              International characters are allowed. See https://goo.gl/xmQnxf for
              more information on and examples of labels. No more than 64 user
              labels can be associated with one Index (System labels are excluded).
              System reserved label keys are prefixed with
              "aiplatform.googleapis.com/" and are immutable.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index instance from an existing index
        index = aiplatform.MatchingEngineIndex(index_name=index_name)

        index.update_metadata(
            display_name=display_name,
            description=description,
            labels=labels,
        )

### Console

Use these instructions to update index metadata (the console is limited to
updating `display_name` and `description`).

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search**

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Select the index you want to update. The **Index info** page opens.
3. Select **Edit Index**. An edit index pane opens.
4. Update the desired metadata fields.
5. Click **Update**
6. Click **Done** to close out the panel.

## Compaction

Periodically, your index is rebuilt to account for all new updates since your
last rebuild. This rebuild, or "compaction", improves query performance and
reliability. Compactions occur for both streaming updates and batch updates.

- **Streaming update**: Vector Search uses heuristics-based metrics to
  determine when to trigger compaction. If the oldest uncompacted data is five
  days old, compaction is always triggered. You are billed for the cost of
  rebuilding the index at the same rate of a batch update, in addition to the
  streaming update costs.

- **Batch update**: Occurs when the incremental dataset size is \> 20% of the base
  dataset size.

> [!NOTE]
> **Note:** These compactions occur automatically, and when they occur, you receive an email to your account inbox. If you created the index with a service account, you won't receive a compaction notice email.

## Rebuild and query your index

You can send match or batch match requests as usual with the grpc cli, the client library,
or the Agent Platform SDK for Python. When you rebuild the query you can expect to see your updates
within a few seconds. To learn how to query an index, see
[Query indexes to get nearest neighbors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/query-index-public-endpoint).

## Optional fields

When you create an index, there are some optional fields you can use to
fine-tune your queries.

### Upsert with restricts

Upserting your index and adding a restrict is a way of tagging your data points
so they are already identified for filtering at query time.
You might want to add restrict tags to limit the results that presents
on your data before a query is sent. For example, a customer wants to
run a query on an index, but wants to make sure the results only display items
that match "red" in a search for footwear. In the following example, the
index is being upserted and is filtering in all red shoes, but denying blue ones.
This ensures the search filters in the best specific options from a large and varied
index before running.

In addition to token restricts, the example uses numeric restricts. In this
case, the datapoint is associated with a price of 20, length of 0.3, and width
of 0.5. At the time of query, you can use these numeric restricts to filter the
results to limit the query results on the values of price, length, and width.
For example, this datapoint would appear in a query that filters for price \> 25,
length \< 1, and width \< 1.

To learn more about filtering, see [Vector Search for Indexing](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/vector_search/sdk_vector_search_for_indexing.ipynb).

### Python

    # Upsert datapoints
    _TEST_DATAPOINT_1 = aiplatform_v1.types.index.IndexDatapoint(
        datapoint_id="3",
        feature_vector=[0.00526886899, -0.0198396724],
        restricts=[
            aiplatform_v1.types.index.IndexDatapoint.Restriction(namespace="Color", allow_list=["red"])
        ],
        numeric_restricts=[
            aiplatform_v1.types.index.IndexDatapoint.NumericRestriction(
                namespace="cost",
                value_int=1,
            )
        ],
    )
    _TEST_DATAPOINT_2 =  aiplatform_v1.types.index.IndexDatapoint(
        datapoint_id="4",
        feature_vector=[0.00526886899, -0.0198396724],
        numeric_restricts=[
            aiplatform_v1.types.index.IndexDatapoint.NumericRestriction(
                namespace="cost",
                value_double=0.1,
            )
        ],
        crowding_tag=aiplatform_v1.types.index.IndexDatapoint.CrowdingTag(crowding_attribute="crowding"),
    )
    _TEST_DATAPOINT_3 = aiplatform_v1.types.index.IndexDatapoint(
        datapoint_id="5",
        feature_vector=[0.00526886899, -0.0198396724],
        numeric_restricts=[
            aiplatform_v1.types.index.IndexDatapoint.NumericRestriction(
                namespace="cost",
                value_float=1.1,
            )
        ],
    )

    _TEST_DATAPOINTS = [_TEST_DATAPOINT_1, _TEST_DATAPOINT_2, _TEST_DATAPOINT_3]

    my_streaming_index = my_streaming_index.upsert_datapoints(datapoints=_TEST_DATAPOINTS)

    # Dynamic metadata update
    _TEST_DATAPOINT_4 = aiplatform_v1.types.index.IndexDatapoint(
        datapoint_id="-2",
        numeric_restricts=[
            aiplatform_v1.types.index.IndexDatapoint.NumericRestriction(
                namespace="cost",
                value_float=1.1,
            )
        ],
    )
    my_streaming_index = my_streaming_index.upsert_datapoints(datapoints=[_TEST_DATAPOINT4], update_mask=["all_restricts"])

### curl

    curl -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://${ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/indexes/${INDEX_ID}:upsertDatapoints \
    -d '{
    datapoints: [
      {
        datapoint_id: "'${DATAPOINT_ID_1}'",
        feature_vector: [...],
        restricts: { namespace: "color", allow_list: ["red"], deny_list: ["blue"]},
        numeric_restricts: [{namespace: "price", value_int: 20}, {namespace: "length", value_float: 0.3}, {namespace: "width", value_double: 0.5}]
      }
    ]}'

### Upsert with crowding

The crowding tag limits similar results by improving result diversity.
Crowding is a constraint on a neighbor list produced by a nearest neighbor
search requiring that no more than some value, of a group of results, return the
same value of `crowding_attribute`. As an example, assume you were back online
shopping for shoes. You want to see a wide variety of colors in the results, but maybe
want them in a single style, like soccer cleats. You can ask that no more than 3 pairs of shoes with
the same color is returned by setting `per_crowding_attribute_num_neighbors` = 3
in your query, assuming you set crowding_attribute to the color of the shoes
when inserting the data point.

This field represents the allowed maximum number of matches with the same crowding tag.

    curl -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://${ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/indexes/${INDEX_ID}:upsertDatapoints \
    -d '{
    datapoints: [
      {
        datapoint_id: "'${DATAPOINT_ID_1}'",
        feature_vector: [...],
        restricts: { namespace: "type", allow_list: ["cleats"]}
        crowding_tag: { crowding_attribute: "red-shoe"},
      }
    ]}'

## What's next

- Learn about [Index configuration parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes).
- Learn how to [Monitor an index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/monitor).
