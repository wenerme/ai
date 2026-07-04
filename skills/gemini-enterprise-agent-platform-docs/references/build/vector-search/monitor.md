Gemini Enterprise Agent Platform provides two metrics for monitoring the `IndexEndpoint` of a
deployed index:

- `aiplatform.googleapis.com/matching_engine/current_shards`

  The number of shards of the `DeployedIndex`. As data is added and deleted,
  Vector Search automatically reshards the index to
  achieve optimal performance. This metric indicates the current number of
  shards of the deployed index.
- `aiplatform.googleapis.com/matching_engine/current_replicas`

  The total number of active replica servers being used by the
  `DeployedIndex`. To match query volume,
  Vector Search automatically turns up
  or down replica servers based on the minimum and maximum replica settings
  specified when deploying the index.

  If the index has multiple shards, each shard can be served by using a
  different number of replica servers. This metric is the total number of
  replica servers across all shards of the given index.

### What's next

- Learn [how to query your indexes to find their
  nearest neighbors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/query-index-public-endpoint).
- Learn [how to select, query, and display these metrics in
  Metrics Explorer](https://docs.cloud.google.com/monitoring/charts/metrics-selector).
