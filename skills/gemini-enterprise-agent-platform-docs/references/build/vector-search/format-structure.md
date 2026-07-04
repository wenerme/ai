To build a new index or update an existing index, provide vectors to
Vector Search in the format and structure described in
the following sections.

### Prerequisites

Store your input data in a [Cloud Storage bucket](https://docs.cloud.google.com/storage/docs/creating-buckets),
in your Google Cloud project.

Input data files should be organized as follows:

- Each batch of input data files should be under a single Cloud Storage directory.
- Data files should be placed directly under `batch_root` and named with the following suffixes: `.csv`, `.json`, and `.avro`.
- There is a limit of 5000 objects (files) in the batch root directory.
- Each data file is interpreted as a set of records. The format of the record is determined by the suffix of the filename and those format requirements are described. See [Data file formats](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/format-structure#data-file-formats).
- Each record should have an `id`, a feature vector, and your optional fields supported by Gemini Enterprise Agent Platform Feature Store, like restricts and crowding.
- A subdirectory named `delete` may be present. Each file directly under `batch_root`/`delete` is taken as a text file of `id` records with one `id` in each line.
- All other subdirectories are not allowed.
- [Transcoding of gzip-compressed files](https://docs.cloud.google.com/storage/docs/transcoding) isn't supported as input data.

### Input data processing

- All records from all data files, including those under `delete`, consist of a single batch of input.
- The relative ordering of records within a data file is not important.
- A single ID should only appear once in a batch. If there is a duplicate with the same ID, it displays as one vector count.
- An ID cannot appear both in a regular data file and a delete data file.
- All IDs from a data file under delete causes it to be removed from the next index version.
- Records from regular data files is included in the next version, overwriting a value in an older index version.

The following are examples of dense, sparse, and hybrid embeddings:

- Dense embeddings:

      {"id": "1", "embedding": [1,1,1]}
      {"id": "2", "embedding": [2,2,2]}

- Sparse embeddings:

      {"id": "3", "sparse_embedding": {"values": [0.1, 0.2], "dimensions": [1, 4]}}
      {"id": "4", "sparse_embedding": {"values": [-0.4, 0.2, -1.3], "dimensions": [10, 20, 20]}}

- Hybrid embeddings:

      {"id": "5", "embedding": [5, 5, -5], "sparse_embedding": {"values": [0.1], "dimensions": [500]}}
      {"id": "6", "embedding": [6, 7, -8.1], "sparse_embedding": {"values": [0.1, -0.2], "dimensions": [40, 901]}}

The following is an example of a valid input data file organization:

    batch_root/
      feature_file_1.csv
      feature_file_2.csv
      delete/
        delete_file.txt

The `feature_file_1.csv` and `feature_file_2.csv` files contain records in CSV
format. The `delete_file.txt` file contains a list of record IDs to be deleted
from the next index version.

### Data file formats

### JSON

- Encode the JSON file using UTF-8.
- Each line of the JSON file will be interpreted as a separate JSON object.
- Each record must contain an `id` field to specify the ID of the vector.
- Each record must contain at least one of `embedding` or `sparse_embedding`.
- The `embedding` field is an array of `N` floating point numbers that represents the feature vector, where `N` is the dimension of the feature vector that was configured when the index was created. This field can be used for dense embeddings only.
  - `configs.dimensions`, which is specified at index creation time, must be the same length as `embeddings`. `configs.dimensions` applies only to `embedding`, not to `sparse_embedding`.
- The `sparse_embedding` field is an object with `values` and `dimensions` fields. The `values` field is a list of floating point numbers that represents the feature vector and the `dimensions` field is a list of integers that represent the dimension in which the corresponding value is located. For example, a sparse embedding that looks like `[0,0.1,0,0,0.2]` can be represented as `"sparse_embedding": {"values": [0.1, 0.2], "dimensions": [1,4]}`. This field can be used for sparse embeddings only.
  - The length of `sparse_embedding.values` must be the same length as `sparse_embedding.dimensions`. They don't need to be the same length as `configs.dimensions`, which is [specified at index creation time](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index#index-metadata-file) and doesn't apply to `sparse_embedding`.
- An optional `restricts` field can be included that specifies an array of `TokenNamespace` objects in restricts. For each object:
  - Specify a `namespace` field that is the `TokenNamespace.namespace`.
  - An optional `allow` field can be set to an array of strings which are the list of `TokenNamespace.string_tokens`.
  - An optional `deny` field can be set to an array of strings which are the list of `TokenNamespace.string_blacklist_tokens`.
  - The value of the field `crowding_tag`, if present, must be a string.
- An optional `numeric_restricts` field can be included that specifies an array of `NumericRestrictNamespace`. For each object:
  - Specify a `namespace` field that is the `NumericRestrictNamespace.namespace`.
  - One of the value fields `value_int`, `value_float`, and `value_double`.
  - It must not have a field named op. This field is only for queries.

### Avro

- Use a valid [Avro](https://avro.apache.org/docs/1.2.0/) file.
- To represent a sparse-only datapoint, provide a sparse embedding in the `sparse_embedding` field and enter an empty list in the `embedding` field.
- Make records that conform to the following schema:

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

- Format: `ID,N feature vector values,Any number of dimension:value sparse values,name=value lists`
- Encode the CSV file using UTF-8.
- Each line of the CSV must contain exactly one record.
- The first value in each line must be the vector ID, which must be a valid UTF-8 string.
- Following the ID, at least one of dense embedding or sparse embedding must be specified.
- For a dense embedding, the next `N` values represent the feature vector, where `N` is the dimension of the feature vector that was configured when the index was created.
- For a sparse embedding, any number of `dimension:value` can be specified, in which `value` is parsed as a float and `dimension` is parsed as a `long`.
- For a hybrid embedding that has both dense and sparse embeddings, dense embeddings must be specified before sparse embeddings.
- Feature vector values must be floating point literals as defined in the [Java language spec](https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.2).
- Additional values may be in the form `name=value`.
- The name `crowding_tag` is interpreted as the crowding tag and may only appear once in the record.
- All other `name=value` pairs are interpreted as token namespace restricts.
  The same name may be repeated if there are multiple values in a
  namespace.

  For example, `color=red,color=blue` represents this `TokenNamespace`:

      {
        "namespace": "color"
        "string_tokens": ["red", "blue"]
      }

- If value starts with `!`, the rest of the string is interpreted as an
  excluded value.

  For example, `color=!red` represents this `TokenNamespace`:

      {
        "namespace": "color"
        "string_blacklist_tokens": ["red"]
      }

- `#name=numericValue` pairs with number type suffix is interpreted as
  numeric namespace restricts. Number type suffix is `i` for int, `f` for
  float, and `d` for double. The same name shouldn't be repeated as there
  should be a single value associated per namespace.

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

- The following example is a datapoint with `id: "6"`, `embedding: [7,
  -8.1]`, `sparse_embedding: {values: [0.1, -0.2, 0.5], dimensions: [40,
  901, 1111]}`, crowding tag `test`, token allowlist of `color: red, blue`,
  token denylist of `color: purple`, and numeric restrict of `ratio` with
  float `0.1`:

      6,7,-8.1,40:0.1,901:-0.2,1111:0.5,crowding_tag=test,color=red,color=blue,color=!purple,ratio=0.1f

## What's next

- Learn how to [Create and manage your index](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index)
