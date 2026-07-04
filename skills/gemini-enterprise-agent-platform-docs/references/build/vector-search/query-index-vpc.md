## Deployed with Private Service Connect automation

For `IndexEndpoints`
deployed with Private Service Connect automation,
the Python SDK will automatically map the Private Service Connect
network to the appropriate endpoint. If not using the Python SDK, you must
directly connect to the created IP address for your endpoint, following the
instructions for
querying a Private Service Connect manual deployment.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

For more information, see the
Python API reference documentation.

```
def vector_search_match_psc_automation(
    project: str,
    location: str,
    index_endpoint_name: str,
    deployed_index_id: str,
    queries: List[List[float]],
    num_neighbors: int,
    psc_network: str,
) -> List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]]:
    """Query the vector search index deployed with PSC automation.

    Args:
        project (str): Required. Project ID
        location (str): Required. The region name
        index_endpoint_name (str): Required. Index endpoint to run the query
        against. The endpoint must be a private endpoint.
        deployed_index_id (str): Required. The ID of the DeployedIndex to run
        the queries against.
        queries (List[List[float]]): Required. A list of queries. Each query is
        a list of floats, representing a single embedding.
        num_neighbors (int): Required. The number of neighbors to return.
        ip_address (str): Required. The IP address of the PSC endpoint. Obtained
        from the created compute address used in the fordwarding rule to the
        endpoint's service attachment.
        psc_network (str): The network the endpoint was deployed to via PSC
        automation configuration. The format is
        projects/{project_id}/global/networks/{network_name}.

    Returns:
        List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]] - A list of nearest neighbors for each query.
    """
    # Initialize the Vertex AI client
    aiplatform.init(project=project, location=location)

    # Create the index endpoint instance from an existing endpoint.
    my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
        index_endpoint_name=index_endpoint_name
    )

    # Query the index endpoint for matches.
    resp = my_index_endpoint.match(
        deployed_index_id=deployed_index_id,
        queries=queries,
        num_neighbors=num_neighbors,
        psc_network=psc_network
    return resp

```

## Deployed with Private Service Connect manual configuration

For Private Service Connect `IndexEndpoints`
deployed with a manually configured connection,
your endpoint is accessed using the IP address of the compute address forwarded
to your endpoint's Private Service Connect service attachment.

If not already known, you can obtain the IP address forwarded to the service
attachment URI using the `gcloud ai index-endpoints describe`
and `gcloud compute forwarding-rules list`
commands.

Make the following replacements:

- INDEX_ENDPOINT_ID: Fully qualified index endpoint ID.
- REGION: The region where your index endpoint is deployed.

```bash
SERVICE_ATTACHMENT_URI=`gcloud ai index-endpoints describe INDEX_ENDPOINT_ID \
  --region=REGION \
  --format="value(deployedIndexes.privateEndpoints.serviceAttachment)"`

gcloud compute forwarding-rules list --filter="TARGET:${SERVICE_ATTACHMENT_URI}"

```

The output will include the internal IP address to use when querying the
`IndexEndpoint`.

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```
def vector_search_match_psc_manual(
    ip_address: str,
) -> List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]]:
    """Query the vector search index deployed with PSC manual configuration.

        from the created compute address used in the forwarding rule to the

        List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]] - A list of nearest neighbors for each query.

    # Set the IP address of the PSC endpoint.
    my_index_endpoint.private_service_connect_ip_address = ip_address

        num_neighbors=num_neighbors

```

### Command-line

To query a `DeployedIndex`, connect to its `TARGET_IP` at port `10000` and call the `Match` or
`BatchMatch` method. Additionally, you can query using an specific embedding ID.

The following examples use the open source tool `grpc_cli` to send gRPC
requests to the deployed index server.
In the first example, you send a single query using the `Match` method.

```
./grpc_cli call ${TARGET_IP}:10000 google.cloud.aiplatform.container.v1.MatchService.Match 'deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [-0.1,..]'

```

In the second example, you combine two separate queries into the same `BatchMatch` request.

```
./grpc_cli call ${TARGET_IP}:10000 google.cloud.aiplatform.container.v1.MatchService.BatchMatch 'requests: [{deployed_index_id: "${DEPLOYED_INDEX_ID}", requests: [{deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [-0.1,..]}, {deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [-0.2,..]}]}]'

```

You must make calls to these APIs from a client running in the same
VPC that the service was peered with.

To run a query using an `embedding_id`, use the following example.

```
./grpc_cli call ${TARGET_IP}:10000  google.cloud.aiplatform.container.v1.MatchService.Match "deployed_index_id:'"test_index1"',embedding_id: '"606431"'"

```

In this example, you send a query using token and numeric restricts.

```
./grpc_cli call ${TARGET_IP}:10000 google.cloud.aiplatform.container.v1.MatchService.Match 'deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [1, 1], "sparse_embedding": {"values": [111.0,111.1,111.2], "dimensions": [10,20,30]}, numeric_restricts: [{name: "double-ns", value_double: 0.3, op: LESS_EQUAL}, {name: "double-ns", value_double: -1.2, op: GREATER}, {name: "double-ns", value_double: 0., op: NOT_EQUAL}], restricts: [{name: "color", allow_tokens: ["red"]}]'

```

To learn more, see Client libraries explained.

### Console

Use these instructions to query a VPC index from the console.

1. In the Agent Platform section of the Google Cloud console, go to the Deploy and Use section. Select Vector Search Go to
Vector Search
2. Select the VPC index you want to query. The Index info page opens.
3. Scroll down to the Deployed indexes section and select the deployed index you want to query. The Deployed index info page opens.
4. From the Query index section, select your query parameters. You can choose to query by a vector, or a specific data point.
5. Execute the query using the open source tool grpc_cli, or by using the Agent Platform SDK for Python.

## Deployed with VPC Network Peering

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

Note: The Python SDK automatically looks up the IP address for an
`IndexEndpoint` deployed with VPC Network Peering.

```
def vector_search_match_hybrid_queries(
) -> List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]]:
    """Query the vector search index.

        List[List[aiplatform.matching_engine.matching_engine_index_endpoint.MatchNeighbor]] - A list of nearest neighbors for each query.

    # Example queries containing hybrid datapoints, sparse-only datapoints, and
    # dense-only datapoints.
    hybrid_queries = [
        aiplatform.matching_engine.matching_engine_index_endpoint.HybridQuery(
            dense_embedding=[1, 2, 3],
            sparse_embedding_dimensions=[10, 20, 30],
            sparse_embedding_values=[1.0, 1.0, 1.0],
            rrf_ranking_alpha=0.5,
        ),
            sparse_embedding_values=[0.1, 0.2, 0.3],
            dense_embedding=[1, 2, 3]
    ]

        queries=hybrid_queries,

```

### Command-line

Each `DeployedIndex` has a `TARGET_IP`, which you can retrieve in your list of `IndexEndpoints`.

To query a `DeployedIndex`, connect to its `TARGET_IP` at port `10000` and call the `Match` or

```
./grpc_cli call ${TARGET_IP}:10000 google.cloud.aiplatform.container.v1.MatchService.Match 'deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [-0.1,..]'

```

In the second example, you combine two separate queries into the same `BatchMatch` request.

```
./grpc_cli call ${TARGET_IP}:10000 google.cloud.aiplatform.container.v1.MatchService.BatchMatch 'requests: [{deployed_index_id: "${DEPLOYED_INDEX_ID}", requests: [{deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [-0.1,..]}, {deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [-0.2,..]}]}]'

```

```
./grpc_cli call ${TARGET_IP}:10000  google.cloud.aiplatform.container.v1.MatchService.Match "deployed_index_id:'"test_index1"',embedding_id: '"606431"'"

```

```
./grpc_cli call ${TARGET_IP}:10000 google.cloud.aiplatform.container.v1.MatchService.Match 'deployed_index_id: "${DEPLOYED_INDEX_ID}", float_val: [1, 1], "sparse_embedding": {"values": [111.0,111.1,111.2], "dimensions": [10,20,30]}, numeric_restricts: [{name: "double-ns", value_double: 0.3, op: LESS_EQUAL}, {name: "double-ns", value_double: -1.2, op: GREATER}, {name: "double-ns", value_double: 0., op: NOT_EQUAL}], restricts: [{name: "color", allow_tokens: ["red"]}]'

```

### Console

1. In the Agent Platform section of the Google Cloud console, go to the Deploy and Use section. Select Vector Search Go to
3. Scroll down to the Deployed indexes section and select the deployed index you want to query. The Deployed index info page opens.
4. From the Query index section, select your query parameters. You can choose to query by a vector, or a specific data point.
5. Execute the query using the open source tool grpc_cli, or by using the Agent Platform SDK for Python.

## Query-time settings that impact performance

The following query-time parameters can affect latency, availability, and
cost when using Vector Search. This guidance applies to most cases.
However, always experiment with your configurations to make sure that they work
for your use case.

For parameter definitions, see Index configuration
parameters.

| Parameter | About | Performance impact |
| --- | --- | --- |
| `approximateNeighborsCount` | Tells the algorithm the number of approximate results to retrieve from each shard. The value of `approximateNeighborsCount` should always be greater than the value of `setNeighborsCount`. If the value of `setNeighborsCount` is small, 10 times that value is recommended for `approximateNeighborsCount`. For larger `setNeighborsCount` values, a smaller multiplier can be used. The corresponding REST API name for this field is `approximate_neighbor_count`. | Increasing the value of `approximateNeighborsCount` can affect performance in the following ways: - Recall: Increased - Latency: Potentially increased - Availability: No impact - Cost: Can increase because more data is processed during a search Decreasing the value of `approximateNeighborsCount` can affect performance in the following ways: - Recall: Decreased - Latency: Potentially decreases - Availability: No impact - Cost: Can decrease cost because less data is processed during a search |
| `setNeighborCount` | Specifies the number of results that you want the query to return. The corresponding REST API name for this field is `neighbor_count`. | Values less than or equal to 300 remain performant in most use cases. For larger values, test for your specific use case. |
| `fractionLeafNodesToSearch` | Controls the percentage of leaf nodes to visit when searching for nearest neighbors. This is related to the `leafNodeEmbeddingCount` in that the more embeddings per leaf node, the more data examined per leaf. The corresponding REST API name for this field is `fraction_leaf_nodes_to_search_override`. | Increasing the value of `fractionLeafNodesToSearch` can affect performance in the following ways: - Recall: Increased - Latency: Increased - Availability: No impact - Cost: Can increase because higher latency occupies more machine resources Decreasing the value of `fractionLeafNodesToSearch` can affect performance in the following ways: - Recall: Decreased - Latency: Decreased - Availability: No impact - Cost: Can decrease because lower latency occupies fewer machine resources |

## What's next

- Learn how to Update and rebuild your index
- Learn how to Filter vector matches
- Learn how to Monitor an index
