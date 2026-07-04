To configure indexes for similarity searches, you need to configure the
following fields.

For instructions on how to configure an index, see
[Configure index parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#index-metadata-file).

## `NearestNeighborSearch`

| Fields ||
|---|---|
| `contentsDeltaUri` | `string` Allows inserting, updating or deleting the contents of the Vector Search `Index`. The string must be a valid Cloud Storage directory path, such as `gs://BUCKET_NAME/PATH_TO_INDEX_DIR/`. If you set this field when calling `IndexService.UpdateIndex`, then no other `Index` field can be also updated as part of the same call. Learn [how to structure individual data files](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/setup#input-data-format). |
| `isCompleteOverwrite` | `boolean` If this field is set together with `contentsDeltaUri` when calling `IndexService.UpdateIndex`, then existing content of the `Index` will be replaced by the data from the `contentsDeltaUri`. When this field is set to true, the entire index is completely overwritten with the new metadata file that you provide. |
| `config` | [`NearestNeighborSearchConfig`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes#nearest-neighbor-search-config) The configuration of the Vector Search `Index`. |

## `NearestNeighborSearchConfig`

| Fields ||
|---|---|
| `dimensions` | `int32` Required. The number of dimensions of the input vectors. Used for dense embeddings only. |
| `approximateNeighborsCount` | `int32` Required if tree-AH algorithm is used. The default number of neighbors to find through approximate search before exact reordering is performed. Exact reordering is a procedure where results returned by an approximate search algorithm are reordered using a more expensive distance computation. |
| `ShardSize` | [`ShardSize`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes#shard-size) The size of each shard. When an index is large, it is sharded based on the specified shard size. During serving, each shard is served on a separate node and scales independently. |
| `distanceMeasureType` | [`DistanceMeasureType`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes#distance-measure-type) The distance measure used in nearest neighbor search. |
| `featureNormType` | [`FeatureNormType`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes#feature-norm-type) Type of normalization to be carried out on each vector. |
| `algorithmConfig` | `oneOf:` - [`TreeAhConfig`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes#tree-ah-config) - [`BruteForceConfig`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/configuring-indexes#brute-force-config) The configuration for the algorithms that Vector Search uses for efficient search. Used for dense embeddings only. - `TreeAhConfig`: Configuration options for using the tree-AH algorithm. For more information, see this blog [Scaling deep retrieval with TensorFlow Recommenders and Vector Search](https://cloud.google.com/blog/products/ai-machine-learning/scaling-deep-retrieval-tensorflow-two-towers-architecture) - `BruteForceConfig`: This option implements the standard linear search in the database for each query. There are no fields to configure for a brute force search. To select this algorithm, pass an empty object for `BruteForceConfig`. |

## `DistanceMeasureType`

| Enums ||
|---|---|
| `SQUARED_L2_DISTANCE` | Euclidean (L~2~) Distance |
| `L1_DISTANCE` | Manhattan (L~1~) Distance |
| `DOT_PRODUCT_DISTANCE` | Default value. Defined as a negative of the dot product. Note that a sparse index only supports dot product distance. |
| `COSINE_DISTANCE` | Cosine Distance. We strongly suggest using DOT_PRODUCT_DISTANCE + UNIT_L2_NORM instead of the COSINE distance. Our algorithms have been more optimized for the DOT_PRODUCT distance, and when combined with UNIT_L2_NORM, it offers the same ranking and mathematical equivalence as the COSINE distance. |

## `ShardSize`

| Enums ||
|---|---|
| `SHARD_SIZE_SMALL` | 2 GiB per shard |
| `SHARD_SIZE_MEDIUM` | 20 GiB per shard |
| `SHARD_SIZE_LARGE` | 50 GiB per shard |

## `FeatureNormType`

| Enums ||
|---|---|
| `UNIT_L2_NORM` | Unit L2 normalization type. |
| `NONE` | Default value. No normalization type is specified. |

## `TreeAhConfig`

These are the fields to select for the tree-AH algorithm.

| Fields ||
|---|---|
| `fractionLeafNodesToSearch` | `double` |
|   | The default fraction of leaf nodes that any query may be searched. Must be in range 0.0 - 1.0, exclusive. The default value is 0.05 if not set. |
| `leafNodeEmbeddingCount` | `int32` |
|   | Number of embeddings on each leaf node. The default value is 1000 if not set. |
| `leafNodesToSearchPercent` | `int32` |
|   | Deprecated, use `fractionLeafNodesToSearch`. The default percentage of leaf nodes that any query may be searched. Must be in range 1-100, inclusive. The default value is 10 (means 10%) if not set. |

## `BruteForceConfig`

This option implements the standard linear search in the database for
each query. There are no fields to configure for a brute force search.
To select this algorithm, pass an empty object for `BruteForceConfig`
to `algorithmConfig`.
