After you've created and deployed the index, you can run queries to get
the nearest neighbors.

Here are some examples for a match query to find the top nearest neighbors using
the k-nearest neighbors algorithm (k-NN).

## Example queries for public endpoint

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_find_neighbors(
        project: str,
        location: str,
        index_endpoint_name: str,
        deployed_index_id: str,
        queries: List[List[float]],
        num_neighbors: int,
    ) -> List[
        List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]
    ]:
        """Query the vector search index.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_endpoint_name (str): Required. Index endpoint to run the query
            against.
            deployed_index_id (str): Required. The ID of the DeployedIndex to run
            the queries against.
            queries (List[List[float]]): Required. A list of queries. Each query is
            a list of floats, representing a single embedding.
            num_neighbors (int): Required. The number of neighbors to return.

        Returns:
            List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]] - A list of nearest neighbors for each query.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index endpoint instance from an existing endpoint.
        my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Query the index endpoint for the nearest neighbors.
        return my_index_endpoint.find_neighbors(
            deployed_index_id=deployed_index_id,
            queries=queries,
            num_neighbors=num_neighbors,
        )

### Command-line

The `publicEndpointDomainName` listed below can be found at
[Deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-public) and is formatted as
`<number>.<region>-<number>.vdb.vertexai.goog`.

      $ curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://1957880287.us-central1-181224308459.vdb.vertexai.goog/v1/projects/181224308459/locations/us-central1/indexEndpoints/3370566089086861312:findNeighbors -d '{deployed_index_id: "test_index_public1", queries: [{datapoint: {datapoint_id: "0", feature_vector: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}, neighbor_count: 5}]}'

This curl example demonstrates how to call from `http(s)` clients,
although public endpoint supports dual protocol for restful and
`grpc_cli`.

      $ curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`" https://1957880287.us-central1-181224308459.vdb.vertexai.goog/v1/projects/${PROJECT_ID}/locations/us-central1/indexEndpoints/${INDEX_ENDPOINT_ID}:readIndexDatapoints -d '{deployed_index_id:"test_index_public1", ids: ["606431", "896688"]}'

This curl example demonstrates how to query with [token and numeric restricts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/filtering).

      $ curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`"  https://${PUBLIC_ENDPOINT_DOMAIN}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexEndpoints/${INDEX_ENDPOINT_ID}:findNeighbors -d '{deployed_index_id:"${DEPLOYED_INDEX_ID}", queries: [{datapoint: {datapoint_id:"x", feature_vector: [1, 1], "sparse_embedding": {"values": [111.0,111.1,111.2], "dimensions": [10,20,30]}, numeric_restricts: [{namespace: "int-ns", value_int: -2, op: "GREATER"}, {namespace: "int-ns", value_int: 4, op: "LESS_EQUAL"}, {namespace: "int-ns", value_int: 0, op: "NOT_EQUAL"}], restricts: [{namespace: "color", allow_list: ["red"]}]}}]}'

### Console

Use these instructions to query an index deployed to a public endpoint from the console.

1. In the Agent Platform section of the Google Cloud console, go to the **Deploy and Use** section. Select **Vector Search** .

   [Go to
   Vector Search](https://console.cloud.google.com/agent-platform/matching-engine/indexes)
2. Select the index you want to query. The **Index info** page opens.
3. Scroll down to the **Deployed indexes** section and select the deployed index you want to query. The **Deployed index info** page opens.
4. From the **Query index** section, select whether to query by a dense embedding value, a sparse embedding value, a hybrid embedding value (dense and sparse embeddings), or a specific data point.
5. Enter the query parameters for the type of query you selected. For example, if you're querying by a dense embedding, enter the embedding vector to query by.
6. Execute the query using the provided curl command, or by running with Cloud Shell.
7. If using Cloud Shell, select **Run in Cloud Shell**.
8. Run in Cloud Shell.
9. The results return nearest neighbors.

## Hybrid queries

[Hybrid search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/about-hybrid-search) uses both dense and
sparse embeddings for searches based on combination of keyword search and
semantic search.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_find_neighbors_hybrid_queries(
        project: str,
        location: str,
        index_endpoint_name: str,
        deployed_index_id: str,
        num_neighbors: int,
    ) -> List[
        List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]
    ]:
        """Query the vector search index using example hybrid queries.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_endpoint_name (str): Required. Index endpoint to run the query
            against.
            deployed_index_id (str): Required. The ID of the DeployedIndex to run
            the queries against.
            num_neighbors (int): Required. The number of neighbors to return.

        Returns:
            List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]] - A list of nearest neighbors for each query.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index endpoint instance from an existing endpoint.
        my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Query hybrid datapoints, sparse-only datapoints, and dense-only datapoints.
        hybrid_queries = [
            aiplatform.matching_engine.matching_engine_index_endpoint.HybridQuery(
                dense_embedding=[1, 2, 3],
                sparse_embedding_dimensions=[10, 20, 30],
                sparse_embedding_values=[1.0, 1.0, 1.0],
                rrf_ranking_alpha=0.5,
            ),
            aiplatform.matching_engine.matching_engine_index_endpoint.HybridQuery(
                dense_embedding=[1, 2, 3],
                sparse_embedding_dimensions=[10, 20, 30],
                sparse_embedding_values=[0.1, 0.2, 0.3],
            ),
            aiplatform.matching_engine.matching_engine_index_endpoint.HybridQuery(
                sparse_embedding_dimensions=[10, 20, 30],
                sparse_embedding_values=[0.1, 0.2, 0.3],
            ),
            aiplatform.matching_engine.matching_engine_index_endpoint.HybridQuery(
                dense_embedding=[1, 2, 3]
            ),
        ]

        return my_index_endpoint.find_neighbors(
            deployed_index_id=deployed_index_id,
            queries=hybrid_queries,
            num_neighbors=num_neighbors,
        )

## Queries with filtering and crowding

[Filtering vector matches](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/filtering) lets you restrict
your nearest neighbor results to specific categories. Filters can also designate
categories to exclude from your results.

[Per-crowding neighbor limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/update-rebuild-index#upsert-crowding)
can increase result diversity by limiting the number of results returned from
any single [crowding tag](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/format-structure) in your
index data.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    def vector_search_find_neighbors_filtering_crowding(
        project: str,
        location: str,
        index_endpoint_name: str,
        deployed_index_id: str,
        queries: List[List[float]],
        num_neighbors: int,
        filter: List[aiplatform.matching_engine.matching_engine_index_endpoint.Namespace],
        numeric_filter: List[
            aiplatform.matching_engine.matching_engine_index_endpoint.NumericNamespace
        ],
        per_crowding_attribute_neighbor_count: int,
    ) -> List[
        List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]
    ]:
        """Query the vector search index with filtering and crowding.

        Args:
            project (str): Required. Project ID
            location (str): Required. The region name
            index_endpoint_name (str): Required. Index endpoint to run the query
            against.
            deployed_index_id (str): Required. The ID of the DeployedIndex to run
            the queries against.
            queries (List[List[float]]): Required. A list of queries. Each query is
            a list of floats, representing a single embedding.
            num_neighbors (int): Required. The number of neighbors to return.
            filter (List[Namespace]): Required. A list of Namespaces for filtering
            the matching results. For example,
            [Namespace("color", ["red"], []), Namespace("shape", [], ["square"])]
            will match datapoints that satisfy "red color" but not include
            datapoints with "square shape".
            numeric_filter (List[NumericNamespace]): Required. A list of
            NumericNamespaces for filtering the matching results. For example,
            [NumericNamespace(name="cost", value_int=5, op="GREATER")] will limit
            the matching results to datapoints with cost greater than 5.
            per_crowding_attribute_neighbor_count (int): Required. The maximum
            number of returned matches with the same crowding tag.

        Returns:
            List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]] - A list of nearest neighbors for each query.
        """
        # Initialize the Vertex AI client
        aiplatform.init(project=project, location=location)

        # Create the index endpoint instance from an existing endpoint.
        my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name=index_endpoint_name
        )

        # Query the index endpoint for the nearest neighbors.
        return my_index_endpoint.find_neighbors(
            deployed_index_id=deployed_index_id,
            queries=queries,
            num_neighbors=num_neighbors,
            filter=filter,
            numeric_filter=numeric_filter,
            per_crowding_attribute_neighbor_count=per_crowding_attribute_neighbor_count,
        )

### Command-line

The `PUBLIC_ENDPOINT_DOMAIN` listed below can be found at
[deployed index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-public) and is formatted as
`<number>.<region>-<number>.vdb.vertexai.goog`.

This curl example demonstrates how to query with [token and numeric restricts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/filtering).

      $ curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer `gcloud auth print-access-token`"  https://${PUBLIC_ENDPOINT_DOMAIN}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/indexEndpoints/${INDEX_ENDPOINT_ID}:findNeighbors -d '{deployed_index_id:"${DEPLOYED_INDEX_ID}", queries: [{datapoint: {datapoint_id:"x", feature_vector: [1, 1], "sparse_embedding": {"values": [111.0,111.1,111.2], "dimensions": [10,20,30]}, numeric_restricts: [{namespace: "int-ns", value_int: -2, op: "GREATER"}, {namespace: "int-ns", value_int: 4, op: "LESS_EQUAL"}, {namespace: "int-ns", value_int: 0, op: "NOT_EQUAL"}], restricts: [{namespace: "color", allow_list: ["red"]}]}}]}'

## Query-time settings that impact performance

The following query-time parameters can affect latency, availability, and
cost when using Vector Search. This guidance applies to most cases.
However, always experiment with your configurations to make sure that they work
for your use case.

For parameter definitions, see [Index configuration
parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes).

| Parameter | About | Performance impact |
|---|---|---|
| `approximateNeighborsCount` | Tells the algorithm the number of approximate results to retrieve from each shard. The value of `approximateNeighborsCount` should always be greater than the value of `setNeighborsCount`. If the value of `setNeighborsCount` is small, 10 times that value is recommended for `approximateNeighborsCount`. For larger `setNeighborsCount` values, a smaller multiplier can be used. The corresponding REST API name for this field is **`approximate_neighbor_count`**. | Increasing the value of `approximateNeighborsCount` can affect performance in the following ways: - Recall: Increased - Latency: Potentially increased - Availability: No impact - Cost: Can increase because more data is processed during a search Decreasing the value of `approximateNeighborsCount` can affect performance in the following ways: - Recall: Decreased - Latency: Potentially decreases - Availability: No impact - Cost: Can decrease cost because less data is processed during a search |
| `setNeighborCount` | Specifies the number of results that you want the query to return. The corresponding REST API name for this field is **`neighbor_count`**. | Values less than or equal to 300 remain performant in most use cases. For larger values, test for your specific use case. |
| `fractionLeafNodesToSearch` | Controls the percentage of leaf nodes to visit when searching for nearest neighbors. This is related to the `leafNodeEmbeddingCount` in that the more embeddings per leaf node, the more data examined per leaf. The corresponding REST API name for this field is **`fraction_leaf_nodes_to_search_override`**. | *Increasing* the value of `fractionLeafNodesToSearch` can affect performance in the following ways: - Recall: Increased - Latency: Increased - Availability: No impact - Cost: Can increase because higher latency occupies more machine resources *Decreasing* the value of `fractionLeafNodesToSearch` can affect performance in the following ways: - Recall: Decreased - Latency: Decreased - Availability: No impact - Cost: Can decrease because lower latency occupies fewer machine resources |
