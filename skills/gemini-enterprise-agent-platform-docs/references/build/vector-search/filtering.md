> [!NOTE]
> To see an example of filtering vector matches in Agent Platform Vector Search,
> run the "Create Agent Platform Vector Search index" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/vector_search/sdk_vector_search_for_indexing.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fvector_search%2Fsdk_vector_search_for_indexing.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/vector_search/sdk_vector_search_for_indexing.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/vector_search/sdk_vector_search_for_indexing.ipynb)

In Vector Search, you can restrict vector matching searches
to a subset of the index by using Boolean rules. Boolean predicates tell
Vector Search which vectors in the index to ignore. On this page you'll
learn about how filtering works, see examples, and ways to efficiently query
your data based on vector similarity.

With Vector Search you can restrict results by categorical and numeric
restrictions.
Adding restrictions, or "filtering" your index results are useful for multiple
reasons, like the following examples:

- **Improved result relevance**: Vector Search is a
  powerful tool for finding semantically similar items. Filtering can be used to remove
  irrelevant results from the search results, such as items that are not in the
  correct language, category, price, or date range.

- **Reduced number of results**: Vector Search can return
  a large number of results, especially for large datasets. Filtering can be used
  to reduce the number of results to a more manageable number, while still returning
  the most relevant results.

- **Segmented results**: Filtering can be used to personalize the search results
  to the user's individual needs and preferences. For example, a user might want
  to filter the results to only include items that they have rated highly in the
  past or that fall into a specific price range.

## Vector attributes

In a vector similarity search over a database of vectors, each vector is
described by zero-or-more attributes. These attribute are known as *tokens* for
token restricts and *values* for numeric restricts. These restricts can apply
from each of several attribute categories, also known as *namespaces*.

In the following example application, vectors are tagged with a `color`, a
`price`, and a `shape`:

- `color`, `price`, and `shape` are *namespaces*.
- `red` and `blue` are *tokens* from the `color` namespace.
- `square` and `circle` are *tokens* from the `shape` namespace.
- `100` and `50` are *values* from the `price` namespace.

### Specify vector attributes

- To specify a "red circle": `{color: red}, {shape: circle}`.
- To specify a "red or blue square": `{color: red, blue}, {shape:
  square}`.
- To specify an object with no color, omit the "color" namespace in the `restricts` field.
- To specify numeric restricts for an object, note the namespace and the value in the appropriate field for the type. Int value should be specified in `value_int`, float value should be specified in `value_float`, and double value should be specified in `value_double`. Only one number type should be used for a given namespace.

For information about the schema used to specify this data, see
[Specify namespaces and tokens in the input data](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/filtering#specify-namespaces-tokens-or-values).

### Queries

- Queries express an AND logical operator across namespaces and an OR logical operator within each namespace. A query that specifies `{color: red, blue}, {shape: square, circle}`, matches all database points that satisfy `(red || blue) && (square || circle)`.
- A query that specifies `{color: red}`, matches all `red` objects of any kind, with no restriction on `shape`.
- Numeric restricts in queries require `namespace`, one of number values from `value_int`, `value_float`, and `value_double`, and operator `op`.
- Operator `op` is one of `LESS`, `LESS_EQUAL`, `EQUAL`, `GREATER_EQUAL`, and `GREATER`. For example, if the `LESS_EQUAL` operator is used, datapoints are eligible if their value is smaller or equal to the value used in the query.

The following code examples identify vector attributes in the sample
application:

    [
      {
        "namespace": "price",
        "value_int": 20,
        "op": "LESS"
      },
      {
        "namespace": "length",
        "value_float": 0.3,
        "op": "GREATER_EQUAL"
      },
      {
        "namespace": "width",
        "value_double": 0.5,
        "op": "EQUAL"
      }
    ]

### Denylist

To enable more advanced scenarios, Google supports a form of negation known as
*denylist tokens*. When a query denylists a token, matches are excluded for any
datapoint that has the denylisted token. If a query namespace has only
denylisted tokens, all points not explicitly denylisted, match, in exactly the
same way that an empty namespace matches with all points.

Datapoints can also denylist a token, excluding matches with any query
specifying that token.

For example, define the following data points with the specified tokens:

```
A: {}                  // empty set matches everything
B: {red}               // only a 'red' token
C: {blue}              // only a 'blue' token
D: {orange}            // only an 'orange' token
E: {red, blue}         // multiple tokens
F: {red, !blue}        // deny the 'blue' token
G: {red, blue, !blue}  // An unlikely edge-case
H: {!blue}             // deny-only (similar to empty-set)
```

The system behaves as follows:

- Empty query namespaces are match-all wildcards. For example, Q:`{}` matches DB:`{color:red}`.
- Empty datapoint namespaces are not match-all wildcards. For example,
  Q:`{color:red}` doesn't match DB:`{}`.

  ![Query and database points.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/build/vector-search/images/query-vs-database-points.png)

### Specify namespaces and tokens or values in the input data

For information about how to structure your input data overall, see [Input data
format and structure](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/format-structure).

The following tabs show how to specify the namespaces and tokens
associated with each input vector.

### JSON

- For each vector's record, add a field called `restricts`, to
  contain an array of objects, each of which is a namespace.

  - Each object must have a field named `namespace`. This field is the `TokenNamespace.namespace`, namespace.
  - The value of the field `allow`, if present, is an array of strings. This array of strings is the `TokenNamespace.string_tokens` list.
  - The value of the field `deny`, if present, is an array of strings. This array of strings is the `TokenNamespace.string_denylist_tokens` list.

The following are two example records in JSON format:

    [
      {
        "id": "42",
        "embedding": [
          0.5,
          1
        ],
        "restricts": [
          {
            "namespace": "class",
            "allow": [
              "cat",
              "pet"
            ]
          },
          {
            "namespace": "category",
            "allow": [
              "feline"
            ]
          }
        ]
      },
      {
        "id": "43",
        "embedding": [
          0.6,
          1
        ],
        "sparse_embedding": {
          "values": [
            0.1,
            0.2
          ],
          "dimensions": [
            1,
            4
          ]
        },
        "restricts": [
          {
            "namespace": "class",
            "allow": [
              "dog",
              "pet"
            ]
          },
          {
            "namespace": "category",
            "allow": [
              "canine"
            ]
          }
        ]
      }
    ]

- For each vector's record, add a field called `numeric_restricts`, to
  contain an array of objects, each of which is a numeric restrict.

  - Each object must have a field named `namespace`. This field is the `NumericRestrictNamespace.namespace`, namespace.
  - Each object must have one of `value_int`, `value_float`, and `value_double`.
  - Each object must not have a field named `op`. This field is only for query.

The following are two example records in JSON format:

    [
      {
        "id": "42",
        "embedding": [
          0.5,
          1
        ],
        "numeric_restricts": [
          {
            "namespace": "size",
            "value_int": 3
          },
          {
            "namespace": "ratio",
            "value_float": 0.1
          }
        ]
      },
      {
        "id": "43",
        "embedding": [
          0.6,
          1
        ],
        "sparse_embedding": {
          "values": [
            0.1,
            0.2
          ],
          "numeric_restricts": [
            {
              "namespace": "weight",
              "value_double": 0.3
            }
          ]
        }
      }
    ]

### Avro

Avro records use the following schema:

    {
      "type": "record",
      "name": "FeatureVector",
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "embedding",
          "type": {
            "type": "array",
            "items": "float"
          }
        },
        {
          "name": "sparse_embedding",
          "type": [
            "null",
            {
              "type": "record",
              "name": "sparse_embedding",
              "fields": [
                {
                  "name": "values",
                  "type": {
                    "type": "array",
                    "items": "float"
                  }
                },
                {
                  "name": "dimensions",
                  "type": {
                    "type": "array",
                    "items": "long"
                  }
                }
              ]
            }
          ]
        },
        {
          "name": "restricts",
          "type": [
            "null",
            {
              "type": "array",
              "items": {
                "type": "record",
                "name": "Restrict",
                "fields": [
                  {
                    "name": "namespace",
                    "type": "string"
                  },
                  {
                    "name": "allow",
                    "type": [
                      "null",
                      {
                        "type": "array",
                        "items": "string"
                      }
                    ]
                  },
                  {
                    "name": "deny",
                    "type": [
                      "null",
                      {
                        "type": "array",
                        "items": "string"
                      }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          "name": "numeric_restricts",
          "type": [
            "null",
            {
              "type": "array",
              "items": {
                "name": "NumericRestrict",
                "type": "record",
                "fields": [
                  {
                    "name": "namespace",
                    "type": "string"
                  },
                  {
                    "name": "value_int",
                    "type": [ "null", "int" ],
                    "default": null
                  },
                  {
                    "name": "value_float",
                    "type": [ "null", "float" ],
                    "default": null
                  },
                  {
                    "name": "value_double",
                    "type": [ "null", "double" ],
                    "default": null
                  }
                ]
              }
            }
          ],
          "default": null
        },
        {
          "name": "crowding_tag",
          "type": [
            "null",
            "string"
          ]
        }
      ]
    }

### CSV

- Token restricts

  - For each vector's record, add comma separated pairs of format
    `name=value` to specify token namespace restricts. The same name may be
    repeated if there are multiple values in a namespace.

    For example, `color=red,color=blue` represents this `TokenNamespace`:

        {
          "namespace": "color"
          "string_tokens": ["red", "blue"]
        }

  - For each vector's record, add comma separated pairs of format
    `name=!value` to specify excluded value for token namespace restricts.

    For example, `color=!red` represents this `TokenNamespace`:

        {
          "namespace": "color"
          "string_blacklist_tokens": ["red"]
        }

- Numeric restricts

  - For each vector's record, add comma separated pairs of format
    `#name=numericValue` with number type suffix to specify numeric
    namespace restricts.

    Number type suffix is `i` for int, `f` for float,
    and `d` for double. The same name shouldn't be repeated as there should
    be a single value associated per namespace.

    For example, `#size=3i` represents this `NumericRestrictNamespace`:

        {
          "namespace": "size"
          "value_int": 3
        }

    `#ratio=0.1f` represents this `NumericRestrictNamespace`:

        {
          "namespace": "ratio"
          "value_float": 0.1
        }

    `#weight=0.3d` represents this `NumericRestriction`:

        {
          "namespace": "weight"
          "value_double": 0.3
        }

  - Here is an example data point with `id: "6"`, `embedding: [7, -8.1]`, `sparse_embedding:
    {values: [0.1, -0.2, 0.5]`, `dimensions: [40, 901, 1111]}}`, crowding tag of `test`, token allowlist of `color: red, blue`, token denylist of `color: purple`, and numeric restrict of `ratio` with float `0.1`:

        6,7,-8.1,40:0.1,901:-0.2,1111:0.5,crowding_tag=test,color=red,color=blue,color=!purple,
        ratio=0.1f

### What's next

- Learn [how to query your indexes to find their nearest neighbors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/query-index-public-endpoint).
